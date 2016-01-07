const { AbstractShot } = require("../shared/shot");
const renderOembedString = require("./views/oembed.js").renderString;
const db = require("./db");
const uuid = require("uuid");
const linker = require("./linker");
const config = require("./config").root();
const fs = require("fs");

let ClipRewrites;

let s3bucket;
let put;
let get;
let del;

if (! config.useS3) {
  if (!fs.existsSync("data")){
      fs.mkdirSync("data");
  }

  get = (uid, contentType) => {
    if (uid.indexOf("/") !== -1 && uid.indexOf(".") !== -1) {
      return Promise.reject("Invalid uid");
    }
    return new Promise((resolve, reject) => {
      fs.readFile("data/" + uid, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({data: data, contentType: contentType});
        }
      });
    });
  };
  put = (uid, body, comment) => {
    if (uid.indexOf("/") !== -1 && uid.indexOf(".") !== -1) {
      return Promise.reject("Invalid uid");
    }
    return new Promise((resolve, reject) => {
      fs.writeFile("data/" + uid, body, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  del = (uid) => {
    if (uid.indexOf("/") !== -1 && uid.indexOf(".") !== -1) {
      return Promise.reject("Invalid uid");
    }
    return new Promise((resolve, reject) => {
      fs.unlink("data/" + uid, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    });
  }
} else {
  const AWS = require('aws-sdk');

  s3bucket = new AWS.S3({params: {Bucket: 'pageshot-images-bucket'}});

  get = (uid, contentType) => {
    return new Promise((resolve, reject) => {
      s3bucket.createBucket(() => {
        var params = {Key: uid};
        s3bucket.getObject(params, function (err, data) {
          if (err) {
            console.error("Error downloading data: ", err);
            reject(err);
          } else {
            resolve({data: data.Body, contentType: contentType});
          }
        });
      });
    });
  };

  put = (uid, body, comment) => {
    return new Promise((resolve, reject) => {
      s3bucket.createBucket(() => {
        var params = {Key: uid, Body: body};
        s3bucket.upload(params, function (err, result) {
          if (err) {
            reject(err);
            console.error("Error uploading data (" + comment + "):", uid, err);
          } else {
            resolve();
          }
        });
      });
    });
  };

  del = (uid) => {
    return new Promise((resolve, reject) => {
      s3bucket.createBucket(() => {
        var params = {Key: uid};
        s3bucket.deleteObject(params, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  };
}

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
        let oks = clipRewrites.commands();
        let json = this.asJson();
        let head = json.head;
        let body = json.body;
        let title = this.title;
        json.head = null;
        json.body = null;
        oks.push({setHead: null});
        oks.push({setBody: null});
        return db.queryWithClient(
          client,
          `INSERT INTO data (id, deviceid, value, head, body, url, title)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [this.id, this.ownerId, JSON.stringify(json), head, body, json.url, title]
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
    let oks = clipRewrites.commands();
    let json = this.asJson();
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
          `UPDATE data SET value = $1, url = $2, title=$3
          WHERE id = $4 AND deviceid = $5`,
          [JSON.stringify(json), this.url, this.title, this.id, this.ownerId]
        );
      } else {
        promise = db.queryWithClient(
          client,
          `UPDATE data SET value = $1, url=$2, title=$3, head = $4, body = $5
          WHERE id = $6 AND deviceid = $7`,
          [JSON.stringify(json), this.url, this.title, head, body, this.id, this.ownerId]
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
    "SELECT url, contenttype FROM images WHERE id = $1", [uid]
  ).then((rows) => {
    if (! rows.length) {
      return null;
    } else {
      return get(uid, rows[0].contenttype);
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
    if (! json.url && rawValue.url) {
      json.url = rawValue.url;
    }
    let jsonTitle = json.userTitle || json.ogTitle || (json.openGraph && json.openGraph.title) || json.docTitle;
    if (! jsonTitle) {
      json.docTitle = rawValue.title;
    }
    let shot = new Shot(rawValue.userid, backend, id, json);
    shot.urlIfDeleted = rawValue.url;
    shot.expireTime = rawValue.expireTime;
    shot.deleted = rawValue.deleted;
    return shot;
  });
};

// FIXME: What is the difference between Shot.getFullShot and Shot.get?
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
    `SELECT value, deviceid, url, title, expire_time, deleted FROM data WHERE id = $1`,
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
      title: row.title,
      expireTime: row.expire_time,
      deleted: row.deleted
    };
  });
};

Shot.getShotsForDevice = function (backend, deviceId) {
  if (! deviceId) {
    throw new Error("Empty deviceId: " + deviceId);
  }
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
    let idNums = [];
    for (let i=0; i<rows.length; i++) {
      ids.push(rows[i].id);
      idNums.push("$" + (i+1));
    }
    return db.select(
      `SELECT data.id, data.value, data.deviceid
       FROM data
       WHERE data.deviceid IN (${idNums.join(", ")})
             AND NOT data.deleted
             AND (expire_time IS NULL OR expire_time > NOW())
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
        let shot;
        try {
          shot = new Shot(row.deviceid, backend, row.id, json);
        } catch (e) {
          console.warn("Error instantiating shot:", e);
          continue;
        }
        result.push(shot);
      }
    }
    return result;
  });
};

Shot.setExpiration = function (backend, shotId, deviceId, expiration) {
  if (expiration === 0) {
    return db.update(
      `UPDATE data
       SET expire_time = NULL
       WHERE id = $1
             AND deviceid = $2
      `,
      [shotId, deviceId]
    );
  } else {
    if (typeof expiration != "number") {
      throw new Error("Bad expiration type");
    } else if (expiration < 0) {
      throw new Error("Expiration less than zero");
    }
    expiration = Math.floor(expiration / 1000);
    return db.update(
      `UPDATE data
       SET expire_time = NOW() + ($1 || ' SECONDS')::INTERVAL
       WHERE id = $2
             AND deviceid = $3
      `,
      [expiration, shotId, deviceId]
    );
  }
};

Shot.deleteShot = function (backend, shotId, deviceId) {
  return db.update(
    `DELETE FROM data
     WHERE id = $1
           AND deviceid = $2
    `,
    [shotId, deviceId]
  );
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

ClipRewrites = class ClipRewrites {

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
    this.toInsertThumbnail = null;
    this.oldFullScreenThumbnail = this.shot.fullScreenThumbnail;

    let url = this.shot.fullScreenThumbnail;
    let match = (/^data:([^;]*);base64,/).exec(url);
    if (match) {
      let imageData = url.substr(match[0].length);
      imageData = new Buffer(imageData, 'base64');
      let imageId = uuid.v4();
      this.toInsertThumbnail = {
        contentType: match[1],
        binary: imageData,
        uuid: imageId,
        url: linker.imageLinkWithHost(imageId)
      };
    }
  }

  rewriteShotUrls() {
    for (let clipId of this.toInsertClipIds) {
      let url = this.toInsert[clipId].url;
      let clip = this.shot.getClip(clipId);
      clip.image.url = url;
    }
    if (this.toInsertThumbnail !== null) {
      this.shot.fullScreenThumbnail = this.toInsertThumbnail.url;
    }
  }

  revertShotUrls() {
    for (let clipId of this.toInsertClipIds) {
      let data = this.toInsert[clipId];
      let clip = this.shot.getClip(clipId);
      clip.setUrlFromBinary(data.binary);
    }
    this.shot.fullScreenThumbnail = this.oldFullScreenThumbnail;
  }

  commands() {
    let commands = [];
    if (this.toInsertThumbnail !== null) {
      commands.push({updateThumbnailUrl: this.toInsertThumbnail.url});
    }
    for (let clipId of this.toInsertClipIds) {
      let url = this.toInsert[clipId].url;
      commands.push({updateClipUrl: {clipId, url}});
    }
    return commands;
  }

  commit(client) {
    let query;
    let unedited = this.unedited;
    if (unedited.length) {
      query = `SELECT id FROM images WHERE shotid = $1
        AND clipid NOT IN (${db.markersForArgs(2, this.unedited.length)})`;
    } else {
      query = `SELECT id FROM images WHERE shotid = $1`;
    }
    let promise = db.queryWithClient(
      client,
      query,
      [this.shot.id].concat(this.unedited)
    ).then((result) => {

      // Fire and forget attempts to delete from s3
      for (let i = 0; i < result.rows.length; i++) {
        del(result.rows[i].id);
      }

      if (unedited.length) {
        query = `DELETE FROM images
               WHERE shotid = $1
                    AND clipid NOT IN (${db.markersForArgs(2, this.unedited.length)})
              `;
      } else {
        query = "DELETE FROM images WHERE shotid = $1";
      }
      return db.queryWithClient(client, query, [this.shot.id].concat(this.unedited));
    });
    return promise.then(() => {
      return Promise.all(
        this.toInsertClipIds.map((clipId) => {
          let data = this.toInsert[clipId];

          put(data.uuid, data.binary.data, "image");

          return db.queryWithClient(
            client,
            `INSERT INTO images (id, shotid, clipid, url, contenttype)
             VALUES ($1, $2, $3, $4, $5)
            `,
            [data.uuid, this.shot.id, clipId, data.url, data.binary.contentType]);
        })
      );
    }).then(() => {
      if (this.toInsertThumbnail === null) {
        return Promise.resolve();
      }

      put(this.toInsertThumbnail.uuid, this.toInsertThumbnail.binary, "thumbnail");

      return db.queryWithClient(
        client,
        `INSERT INTO images (id, shotid, clipid, url, contenttype)
        VALUES ($1, $2, $3, $4, $5)
        `,
        // Since we don't have a clipid for the thumbnail and the column is NOT NULL,
        // Use the thumbnail uuid as the clipid. This allows figuring out which
        // images are thumbnails, too.
        [this.toInsertThumbnail.uuid, this.shot.id, this.toInsertThumbnail.uuid,
        this.toInsertThumbnail.url, this.toInsertThumbnail.contentType]);
    }).then(() => {
      this.committed = true;
    });
  }

};

Shot.cleanDeletedShots = function () {
  let retention = config.expiredRetentionTime;
  // FIXME: active shots with no clips appear to be 404, but all deleted shots have
  // no clips (because we delete that data).  But we don't do a hard delete of shots
  // with no clip, meaning they become more visible only after they've expired
  return db.transaction((client) => {
    return db.queryWithClient(
      client,
      `
        UPDATE data
        SET value = '{}', head = NULL, body = NULL, deleted = TRUE
        WHERE expire_time + ($1 || ' SECONDS')::INTERVAL < CURRENT_TIMESTAMP
              AND NOT deleted
      `,
      [retention]
    ).then((result) => {
      return db.queryWithClient(
        client,
        `
          DELETE FROM images
          USING data
          WHERE images.shotid = data.id
                AND data.expire_time + ($1 || ' SECONDS')::INTERVAL < CURRENT_TIMESTAMP
                AND NOT data.deleted
        `,
        [retention]
      ).then(() => {
        return result.rowCount;
      });
    });
  });
};

Shot.prototype.atob = require("atob");
Shot.prototype.btoa = require("btoa");
