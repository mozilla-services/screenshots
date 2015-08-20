const { AbstractShot } = require("../shared/shot");
const renderOembedString = require("./views/oembed.js").renderString;
const db = require("./db");
const uuid = require("uuid");
const linker = require("./linker");
const config = require("./config").root();

class Shot extends AbstractShot {

  constructor(ownerId, backend, id, attrs) {
    super(backend, id, attrs);
    this.ownerId = ownerId;
  }

  oembedJson({maxheight, maxwidth}) {
    let body = renderOembedString({shot: this, maxheight, maxwidth, backend: this.backend});
    return {
      // Attributes we could set, but don't (yet):
      //author_name: "",
      //author_url: "",
      //cache_age: "",
      //thumbnail_url: "",
      //thumbnail_width: "",
      //thumbnail_height: "",
      type: "rich",
      version: "1.0",
      title: this.title,
      provider_name: "PageShot",
      provider_url: this.backend,
      html: body,
      // I don't really understand how these relate to maxheight/maxwidth, or how we should set them:
      height: 300,
      width: 400
    };
  }

  get contentUrl() {
    return "//" + config.contentOrigin + "/content/" + this.id;
  }

  insert() {
    return db.transaction((client) => {
      return db.queryWithClient(
        client, "SELECT id FROM data WHERE id = $1", [this.id]
      ).then((rows) => {
        if (rows.rowCount) {
          // duplicate key
          return false;
        }

        let clipRewrites = new ClipRewrites(this);
        clipRewrites.rewriteShotUrls();
        let oks = [];
        let json = this.asJson();
        let head = json.head;
        let body = json.body;
        json.head = null;
        json.body = null;
        oks.push({setHead: null});
        oks.push({setBody: null});
        return db.queryWithClient(
          client,
          `INSERT INTO data (id, deviceid, value, head, body, url)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [this.id, this.ownerId, JSON.stringify(json), head, body, json.url]
        ).then((rowCount) => {
          return clipRewrites.commit(client);
        }).then(() => {
          return oks;
        }).catch((err) => {
          if (err.code == '23505') {
            // This is a duplicate key error, means the insert failed
            clipRewrites.revertShotUrls();
            return false;
          }
          throw err;
        });
      });
    });
  }

  update() {
    let clipRewrites = new ClipRewrites(this);
    clipRewrites.rewriteShotUrls();
    let json = this.asJson();
    let oks = [];
    return db.transaction((client) => {
      let head = json.head;
      let body = json.body;
      json.head = null;
      json.body = null;
      if (head !== null) {
        oks.push({setHead: null});
      }
      if (body !== null) {
        oks.push({setBody: null});
      }
      let promise;
      if (head === null && body === null) {
        promise = db.queryWithClient(
          client,
          `UPDATE data SET value = $1
          WHERE id = $2 AND deviceid = $3`,
          [JSON.stringify(json), this.id, this.ownerId]
        );
      } else {
        promise = db.queryWithClient(
          client,
          `UPDATE data SET value = $1, head = $2, body = $3
          WHERE id = $4 AND deviceid = $5`,
          [JSON.stringify(json), head, body, this.id, this.ownerId]
        );
      }
      return promise.then((rowCount) => {
        if (! rowCount) {
          throw new Error("No row updated");
        }
        return clipRewrites.commit(client);
      }).then(() => {
        return oks;
      });
    });
  }

}

Shot.getRawBytesForClip = function (uid) {
  return db.select(
    "SELECT image, contenttype FROM images WHERE id = $1", [uid]
  ).then((rows) => {
    if (! rows.length) {
      return null;
    } else {
      return {data: rows[0].image, contentType: rows[0].contenttype};
    }
  });
};

exports.Shot = Shot;

class ServerClip extends AbstractShot.prototype.Clip {
  imageBinary() {
    if (! (this.image && this.image.url)) {
      throw new Error("Not an image clip");
    }
    let url = this.image.url;
    let match = (/^data:([^;]*);base64,/).exec(url);
    if (! match) {
      throw new Error("Bad clip URL");
    }
    let imageData = url.substr(match[0].length);
    imageData = new Buffer(imageData, 'base64');
    return {
      contentType: match[1],
      data: imageData
    };
  }

  setUrlFromBinary(binaryData) {
    let url = "data:" + binaryData.contentType + ";base64,";
    url += binaryData.data.toString("base64");
    this.image.url = url;
  }
}

Shot.prototype.Clip = ServerClip;

Shot.get = function (backend, id) {
  return Shot.getRawValue(id).then((rawValue) => {
    if (! rawValue) {
      return null;
    }
    let json = JSON.parse(rawValue.value);
    let shot = new Shot(rawValue.userid, backend, id, json);
    shot.urlIfDeleted = rawValue.url;
    shot.expireTime = rawValue.expireTime;
    shot.deleted = rawValue.deleted;
    return shot;
  });
};

Shot.getFullShot = function (backend, id) {
  if (! id) {
    throw new Error("Empty id: " + id);
  }
  return db.select(
    `SELECT value, deviceid, head, body FROM data
    WHERE data.id = $1`,
    [id]
  ).then((rows) => {
    if (! rows.length) {
      return null;
    }
    let row = rows[0];
    let json = JSON.parse(row.value);
    let shot = new Shot(row.userid, backend, id, json);
    shot.head = row.head;
    shot.body = row.body;
    return shot;
  });
};

Shot.getRawValue = function (id) {
  if (! id) {
    throw new Error("Empty id: " + id);
  }
  return db.select(
    `SELECT value, deviceid, url, expire_time, deleted FROM data WHERE id = $1`,
    [id]
  ).then((rows) => {
    if (! rows.length) {
      return null;
    }
    let row = rows[0];
    return {
      userid: row.deviceid,
      value: row.value,
      url: row.url,
      expireTime: row.expire_time,
      deleted: row.deleted
    };
  });
};

Shot.getShotsForDevice = function (backend, deviceId) {
  if (! deviceId) {
    throw new Error("Empty deviceId: " + deviceId);
  }
  let timeStart = Date.now();
  let timeMid;
  return db.select(
    `SELECT DISTINCT devices.id
     FROM devices, devices AS devices2
     WHERE devices.id = $1
           OR (devices.accountid = devices2.accountid
               AND devices2.id = $1)
    `,
    [deviceId]
  ).then((rows) => {
    timeMid = Date.now();
    let ids = [];
    let idNums = [];
    for (let i=0; i<rows.length; i++) {
      ids.push(rows[i].id);
      idNums.push("$" + (i+1));
    }
    return db.select(
      `SELECT data.id, data.value, data.deviceid
       FROM data
       WHERE data.deviceid IN (${idNums.join(", ")})
       ORDER BY data.created DESC
      `,
      ids
    );
  }).then((rows) => {
    let result = [];
    for (let i=0; i<rows.length; i++) {
      let row = rows[i];
      let json = JSON.parse(row.value);
      if (json === null) {
        console.warn("Unable to parse json for row", row.deviceid, row.id, row.value);
      } else {
        let shot = new Shot(row.deviceid, backend, row.id, json);
        result.push(shot);
      }
    }
    return result;
  });
};

Shot.deleteEverythingForDevice = function (backend, deviceId) {
  return db.select(
    `SELECT DISTINCT devices.id
     FROM devices, devices AS devices2
     WHERE devices.id = $1
           OR (devices.accountid = devices2.accountid
               AND devices2.id = $1)
    `,
    [deviceId]
  ).then((rows) => {
    let ids = [];
    for (let i=0; i<rows.length; i++) {
      ids.push(rows[i].id);
    }
    let deleteSql = `DELETE FROM devices WHERE
     id IN (${db.markersForArgs(1, ids.length)})`;
    return db.update(
      deleteSql,
      ids
    );

  });
};

class ClipRewrites {

  constructor(shot) {
    this.shot = shot;
    this.committed = false;
    this.unedited = [];
    this.toInsertClipIds = [];
    this.toInsert = {};
    for (let name of this.shot.clipNames()) {
      let clip = this.shot.getClip(name);
      if (clip.image && clip.isDataUrl()) {
        this.toInsertClipIds.push(clip.id);
        let imageId = uuid.v4();
        this.toInsert[clip.id] = {
          uuid: imageId,
          url: linker.imageLinkWithHost(imageId),
          binary: clip.imageBinary()
        };
      } else {
        this.unedited.push(clip.id);
      }
    }
  }

  rewriteShotUrls() {
    for (let clipId of this.toInsertClipIds) {
      let url = this.toInsert[clipId].url;
      let clip = this.shot.getClip(clipId);
      clip.image.url = url;
    }
  }

  revertShotUrls() {
    for (let clipId of this.toInsertClipIds) {
      let data = this.toInsert[clipId];
      let clip = this.shot.getClip(clipId);
      clip.setUrlFromBinary(data.binary);
    }
  }

  commands() {
    let commands = [];
    for (let clipId of this.toInsertClipIds) {
      let url = this.toInsert[clipId].url;
      commands.push({updateClipUrl: {clipId, url}});
    }
    return commands;
  }

  commit(client) {
    if (! this.toInsertClipIds.length) {
      return Promise.resolve();
    }
    let query;
    if (this.unedited.length) {
      query = `DELETE FROM images
               WHERE shotid = $1
                    AND clipid NOT IN (${db.markersForArgs(2, this.unedited.length)})
              `;
    } else {
      query = `DELETE FROM images WHERE shotid = $1`;
    }
    return db.queryWithClient(
      client,
      query,
      [this.shot.id].concat(this.unedited)
    ).then(() => {
      return Promise.all(
        this.toInsertClipIds.map((clipId) => {
          let data = this.toInsert[clipId];
          return db.queryWithClient(
            client,
            `INSERT INTO images (id, shotid, clipid, image, contenttype)
             VALUES ($1, $2, $3, $4, $5)
            `,
            [data.uuid, this.shot.id, clipId, data.binary.data, data.binary.contentType]);
        })
      );
    }).then(() => {
      this.committed = true;
    });
  }

}
