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

  convertAnyDataUrls(client, json, possibleClipsToInsert) {
    let clips = possibleClipsToInsert.map((name) => this.getClip(name));
    let unedited = [];
    let toInsert = [];
    for (let clip of clips) {
      if (clip.image) {
        if (! clip.isDataUrl()) {
          toInsert.push(clip);
        } else {
          unedited.push(clip.id);
        }
      }
    }
    let promise = Promise.resolve();
    if (unedited.length) {
      let deleteSql = `DELETE FROM images WHERE shotid = $1
      AND clipid NOT IN (${db.markersForArgs(2, unedited.length)})`;
      promise = db.queryWithClient(
        client,
        deleteSql,
        [this.id].concat(unedited)
      );
    }
    return promise.then(() => {
      return Promise.all(
        toInsert.map((clipId) => {
          let clip = this.getClip(clipId);
          let uid = uuid.v4();
          let data = clip.imageBinary();
          return db.queryWithClient(
            client,
            "DELETE FROM images WHERE shotid = $1 AND clipid = $2",
            [this.id, clipId]
          ).then((rows) => {
            return db.queryWithClient(
              client,
              "INSERT INTO images (id, shotid, clipid, image, contenttype) VALUES ($1, $2, $3, $4, $5)",
              [uid, this.id, clipId, data.data, data.contentType]);
          }).then((rows) => {
            let clip = this.getClip(clipId);
            clip.image.url = linker.imageLinkWithHost(uid);
            return {updateClipUrl: {clipId: clipId, url: clip.image.url}};
          });
        })
      );
    });
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

  get oembedUrl() {
    return this.backend + "/oembed?url=" + encodeURIComponent(this.viewUrl);
  }

  get contentUrl() {
    return "//" + config.contentHost + ":" + config.contentPort + "/content/" + this.id;
  }

  insert() {
    let json = this.asJson();
    let possibleClipsToInsert = this.clipNames();
    return db.transaction((client) => {
      return db.queryWithClient(
        client, "SELECT id FROM data WHERE id = $1", [this.id]
      ).then((rows) => {
        if (rows.rowCount) {
          // duplicate key
          return false;
        }

        // If the key doesn't already exist, go through the clips being inserted and
        // check to see if we need to store any data: url encoded images
        return this.convertAnyDataUrls(client, json, possibleClipsToInsert).then((oks) => {
          let head = json.head;
          let body = json.body;
          json.head = null;
          json.body = null;
          return db.queryWithClient(
            client,
            `INSERT INTO data (id, deviceid, value, head, body)
             VALUES ($1, $2, $3, $4, $5)`,
            [this.id, this.ownerId, JSON.stringify(json), head, body]
          ).then((rowCount) => {
            return oks;
          });
        });
      });
    });
  }

  update() {
    let json = this.asJson();
    let possibleClipsToInsert = this.clipNames();
    return db.transaction((client) => {
      return this.convertAnyDataUrls(client, json, possibleClipsToInsert).then((oks) => {
        let head = json.head;
        let body = json.body;
        json.head = "";
        json.body = "";
        return db.queryWithClient(
          client,
          `UPDATE data SET value = $1, head = $2, body = $3 WHERE id = $4 AND deviceid = $5`,
          [JSON.stringify(json), head, body, this.id, this.ownerId]
        ).then((rowCount) => {
          if (! rowCount) {
            throw new Error("No row updated");
          }
          return oks;
        });
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
}

Shot.prototype.Clip = ServerClip;

Shot.get = function (backend, id) {
  return Shot.getRawValue(id).then((rawValue) => {
    if (! rawValue) {
      return null;
    }
    let json = JSON.parse(rawValue.value);
    return new Shot(rawValue.userid, backend, id, json);
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
    `SELECT value, deviceid FROM data WHERE id = $1`,
    [id]
  ).then((rows) => {
    if (! rows.length) {
      return null;
    }
    let row = rows[0];
    return {
      userid: row.deviceid,
      value: row.value
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
    console.info("Index query:", Date.now() - timeStart, "ms total; device query:", timeMid - timeStart, "ms");
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
