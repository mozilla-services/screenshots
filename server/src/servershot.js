const { AbstractShot } = require("../shared/shot");
const renderOembedString = require("./oembed-view.js").renderString;
const db = require("./db");
const uuid = require("uuid");
const linker = require("./linker");
const config = require("./config").getProperties();
const fs = require("fs");
const mozlog = require("./logging").mozlog("servershot");
const validUrl = require("valid-url");

const SEARCHABLE_VERSION = 1;

const PNG_HEADER_BASE64 = "iVBORw0KGgo=";
const PNG_HEADER = Buffer.from(PNG_HEADER_BASE64, "base64");

function assertPng(dataUrl) {
  const urlHeader = "data:image/png;base64,";
  if (!dataUrl.startsWith(urlHeader)) {
    mozlog.warn("invalid-data-url", {msg: "Invalid data: URL submitted", prefix: dataUrl.substr(0, urlHeader.length + 10)});
    throw new Error('invalid data url');
  }
  // only decode enough to get the header
  // we're lucky that 9 bytes is exactly 12 base64 characters
  const base64Header = dataUrl.substr(urlHeader.length, PNG_HEADER_BASE64.length);
  if (base64Header.length < PNG_HEADER_BASE64.length) {
    mozlog.warn("invalid-data-image", {msg: "Invalid PNG image submitted", prefix: dataUrl.substr(0, urlHeader.length + PNG_HEADER_BASE64.length)});
    throw new Error('invalid image');
  }
  const header = Buffer.from(base64Header, "base64"); // 9 bytes
  if (!PNG_HEADER.equals(header.slice(0, 8))) {
    mozlog.warn("invalid-data-image-decoded", {msg: "Invalid PNG image (after base64 decoding)"});
    throw new Error('invalid png');
  }
}

let ClipRewrites;

let s3bucket;
let put;
let get;
let del;

if (!config.useS3) {
  if (!fs.existsSync("data")) {
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
          resolve({data, contentType});
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
      });
    });
  };
} else {
  const AWS = require('aws-sdk');

  s3bucket = new AWS.S3({params: {Bucket: config.s3BucketName}});

  get = (uid, contentType) => {
    return new Promise((resolve, reject) => {
      s3bucket.createBucket(() => {
        var params = {Key: uid};
        s3bucket.getObject(params, function(err, data) {
          if (err) {
            mozlog.error("error-downloading-data", {err});
            reject(err);
          } else {
            resolve({data: data.Body, contentType});
          }
        });
      });
    });
  };

  put = (uid, body, comment) => {
    return new Promise((resolve, reject) => {
      s3bucket.createBucket(() => {
        var params = {Key: uid, Body: body, ContentType: "image/png"};
        s3bucket.upload(params, function(err, result) {
          if (err) {
            reject(err);
            mozlog.error("error-uploading-data", {comment, uid, err});
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
        s3bucket.deleteObject(params, function(err, result) {
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
      // author_name: "",
      // author_url: "",
      // cache_age: "",
      // thumbnail_url: "",
      // thumbnail_width: "",
      // thumbnail_height: "",
      type: "rich",
      version: "1.0",
      title: this.title,
      provider_name: "Firefox Screenshots",
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
        let title = this.title;
        oks.push({setHead: null});
        oks.push({setBody: null});
        let searchable = this._makeSearchableText(7);
        let url = json.fullUrl || json.url || json.origin;
        return db.queryWithClient(
          client,
          `INSERT INTO data (id, deviceid, value, url, title, searchable_version, searchable_text)
           VALUES ($1, $2, $3, $4, $5, $6, ${searchable.query})`,
          [this.id, this.ownerId, JSON.stringify(json), url, title, searchable.version].concat(searchable.args)
        ).then((result) => {
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
      let promise;
      let searchable = this._makeSearchableText(7);
      promise = db.queryWithClient(
        client,
        `UPDATE data SET value = $1, url = $2, title=$3, searchable_version = $4, searchable_text = ${searchable.query}
        WHERE id = $5 AND deviceid = $6`,
        [JSON.stringify(json), this.url, this.title, searchable.version, this.id, this.ownerId].concat(searchable.args)
      );
      return promise.then((result) => {
        if (!result.rowCount) {
          clipRewrites.revertShotUrls();
          return false;
        }
        return clipRewrites.commit(client).then(() => {
          return true;
        });
      }).then((updated) => {
        return updated ? oks : null;
      });
    });
  }

  upgradeSearch() {
    let searchable = this._makeSearchableText(3);
    return db.transaction((client) => {
      return db.queryWithClient(
        client,
        `UPDATE data SET searchable_version = $1, searchable_text = ${searchable.query}
         WHERE id = $2`,
        [searchable.version, this.id].concat(searchable.args)
      );
    });
  }

  _makeSearchableText(argStart) {
    let queryParts = [];
    let texts = [];
    function addText(t) {
      texts.push(t);
      return "$" + (texts.length + argStart - 1);
    }
    function addWeight(t, weight, name) {
      if (Array.isArray(t)) {
        t = t.filter((i) => i).join(" ");
      }
      if (!t) {
        return;
      }
      if (!['A', 'B', 'C', 'D'].includes(weight)) {
        throw new Error("Bad weight, should be A, B, C, or D");
      }
      queryParts.push(`setweight(to_tsvector(${addText(t)}), '${weight}') /* ${name} */`);
    }
    if (this.url) {
      let domain = this.url.replace(/^.{0,4000}:/, "").replace(/\/.{0,4000}$/, "");
      addWeight(domain, 'B', 'domain');
    }
    addWeight(this.title, 'A', 'title');
    if (this.openGraph) {
      let openGraphProps = `
        site_name description
        article:author article:section article:tag
        book:author book:tag
        profile:first_name profile:back_name profile:username
      `.split(/\s+/g);
      addWeight(openGraphProps.map((n) => this.openGraph[n]), 'B', 'openGraph');
    }
    if (this.twitterCard) {
      let twitterProps = `
        site title description
      `.split(/\s+/g);
      addWeight(twitterProps.map((n) => this.twitterCard[n]), 'A', 'twitterCard');
      for (let clipId of this.clipNames()) {
        let clip = this.getClip(clipId);
        addWeight(clip.image && clip.image.text, 'A', 'clip text');
      }
    }
    return {
      query: queryParts.join(' || '),
      args: texts,
      // Update this version if you update the algorithm:
      version: SEARCHABLE_VERSION
    };
  }

}

Shot.getRawBytesForClip = function(uid) {
  return db.select(
    `SELECT images.url, images.contenttype, data.deviceid
     FROM images
      JOIN data ON images.shotid = data.id
     WHERE images.id = $1
      AND (data.expire_time IS NULL OR data.expire_time > NOW())
      AND data.block_type = 'none'
      AND NOT data.deleted`, [uid]
  ).then((rows) => {
    if (!rows.length) {
      return null;
    }
    return get(uid, rows[0].contenttype)
      .then(result => {
        result.ownerId = rows[0].deviceid;
        return result;
      });
  });
};

exports.Shot = Shot;

class ServerClip extends AbstractShot.prototype.Clip {
  constructor(shot, id, json) {
    super(shot, id, json);
    if (this.isDataUrl()) {
      assertPng(json.image.url);
    }
  }

  imageBinary() {
    if (!(this.image && this.image.url)) {
      throw new Error("Not an image clip");
    }
    let url = this.image.url;
    let match = (/^data:([^;]*);base64,/).exec(url);
    if (!match) {
      if (!url) {
        mozlog.warn("empty-clip-url", {msg: "Submitted with empty clip URL"});
        throw new Error("Empty clip URL");
      } else {
        mozlog.warn("bad-clip-url", {msg: "Submitted with bad clip URL", urlPrefix: url.substr(0, 10) + "..."});
        throw new Error("Bad clip URL");
      }
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

Shot.get = function(backend, id, deviceId, accountId) {
  return Shot.getRawValue(id, deviceId, accountId).then((rawValue) => {
    if (!rawValue) {
      return null;
    }
    let json = JSON.parse(rawValue.value);
    let jsonTitle = json.userTitle || (json.openGraph && json.openGraph.title) || json.docTitle;
    json.docTitle = jsonTitle || rawValue.title;
    if (!json.url && rawValue.url) {
      json.url = rawValue.url;
    }
    let shot = new Shot(rawValue.userid, backend, id, json);
    shot.urlIfDeleted = rawValue.url;
    shot.accountId = rawValue.accountId;
    shot.expireTime = rawValue.expireTime;
    shot.deleted = rawValue.deleted;
    shot.blockType = rawValue.blockType;
    return shot;
  });
};

// FIXME: What is the difference between Shot.getFullShot and Shot.get?
Shot.getFullShot = function(backend, id) {
  if (!id) {
    throw new Error("Empty id: " + id);
  }
  return db.select(
    `SELECT value, deviceid FROM data
    WHERE data.id = $1`,
    [id]
  ).then((rows) => {
    if (!rows.length) {
      return null;
    }
    let row = rows[0];
    let json = JSON.parse(row.value);
    let shot = new Shot(row.userid, backend, id, json);
    return shot;
  });
};

Shot.getRawValue = function(id, deviceId, accountId) {
  if (!id) {
    throw new Error("Empty id: " + id);
  }
  let query = `SELECT value, deviceid, url, title, expire_time, deleted, block_type, devices.accountid
  FROM data, devices WHERE data.deviceid = devices.id AND data.id = $1`;
  let params = [id];
  if (accountId) {
    query += ` AND devices.accountid = $2`;
    params.push(accountId);
  } else if (deviceId) {
    query += ` AND deviceid = $2`;
    params.push(deviceId);
  }
  return db.select(
    query,
    params
  ).then((rows) => {
    if (!rows.length) {
      return null;
    }
    let row = rows[0];
    return {
      userid: row.deviceid,
      value: row.value,
      url: row.url,
      title: row.title,
      expireTime: row.expire_time,
      deleted: row.deleted,
      blockType: row.block_type,
      accountId: row.accountid
    };
  });
};

Shot.checkOwnership = function(shotId, deviceId, accountId) {
  return db.select(
    `SELECT data.id
     FROM data, devices
     WHERE data.id = $1 AND (devices.id = $2 OR devices.accountid = $3)
         AND data.deviceid = devices.id
     `,
      [shotId, deviceId, accountId]
  ).then((rows) => {
      return !!rows.length;
  })
};

Shot.getShotsForDevice = function(backend, deviceId, accountId, searchQuery) {
  if (!deviceId) {
    throw new Error("Empty deviceId: " + deviceId);
  }
  // accountId is null if not set, treated as NULL in the SQL query
  return db.select(
    `SELECT DISTINCT devices.id
     FROM devices
     WHERE devices.id = $1 OR devices.accountid = $2
    `,
    [deviceId, accountId]
  ).then((rows) => {
    searchQuery = searchQuery || null;
    let ids = [];
    let idNums = [];
    for (let i = 0; i < rows.length; i++) {
      ids.push(rows[i].id);
      idNums.push("$" + (i + (searchQuery ? 3 : 1)));
    }
    if (!ids.length) {
      // This happens if the id doesn't exist in the database
      return [];
    }
    let sql;
    let args;
    if (searchQuery) {
      sql = `
        SELECT data.id, data.value, data.deviceid, ts_rank_cd(data.searchable_text, query) AS rank
        FROM data, plainto_tsquery($1) AS query
        WHERE data.deviceid IN (${idNums.join(", ")})
              AND NOT data.deleted
              AND (expire_time IS NULL OR expire_time > NOW())
              AND (data.searchable_text @@ query
                   OR url ILIKE $2
                   OR title ILIKE $2)
        ORDER BY rank DESC, data.created DESC
        `;
      let likeQuery = "%" + searchQuery.replace(/%/g, "%%") + "%";
      args = [searchQuery, likeQuery].concat(ids);
    } else {
      sql = `
      SELECT data.id, data.value, data.deviceid
      FROM data
      WHERE data.deviceid IN (${idNums.join(", ")})
            AND NOT data.deleted
            AND (expire_time IS NULL OR expire_time > NOW())
      ORDER BY data.created DESC
      `;
      args = ids;
    }
    return db.select(sql, args);
  }).then((rows) => {
    let result = [];
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      let json = JSON.parse(row.value);
      if (json === null) {
        mozlog.warn("error-parsing-json", {
          deviceid: row.deviceid,
          rowid: row.id,
          rowvalue: row.value
        });
      } else {
        let shot;
        try {
          shot = new Shot(row.deviceid, backend, row.id, json);
        } catch (e) {
          mozlog.warn("error-instantiating-shot", {err: e});
          continue;
        }
        result.push(shot);
      }
    }
    return result;
  });
};

Shot.setExpiration = function(backend, shotId, deviceId, expiration, accountId) {
  return db.select(
    `SELECT devices.id
     FROM data, devices
     WHERE data.id = $1 AND (devices.id = $2 OR devices.accountid = $3)
         AND data.deviceid = devices.id
    `,
    [shotId, deviceId, accountId]
  ).then((rows) => {
    let id = rows[0].id;
    if (expiration === 0) {
      return db.update(
        `UPDATE data
         SET expire_time = NULL
         WHERE id = $1
               AND deviceid = $2
        `,
        [shotId, id]
      );
    }
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
      [expiration, shotId, id]
    );
  })
};

Shot.deleteShot = function(backend, shotId, deviceId, accountId) {
  let id;
  return db.select(
    `SELECT devices.id
     FROM data, devices
     WHERE data.id = $1 AND (devices.id = $2 OR devices.accountid = $3)
        AND data.deviceid = devices.id
      `,
      [shotId, deviceId, accountId]
  ).then((rows) => {
    id = rows[0].id;
    return Shot.get(backend, shotId, id)
    .then((shot) => {
      const clipRewrites = new ClipRewrites(shot);
      clipRewrites.clear();
      return db.transaction((client) => {
        return clipRewrites.commit(client);
      });
    })
    .then(() => {
      return db.update(
        `DELETE FROM data
         WHERE id = $1
               AND deviceid = $2
        `,
        [shotId, id]
      );
    });
  })
};

Shot.deleteEverythingForDevice = function(backend, deviceId) {
  return db.select(
    `SELECT images.id
     FROM images JOIN data
     ON images.shotid = data.id
     WHERE data.deviceid = $1`,
    [deviceId]
  ).then((rows) => {
      rows.forEach((row) => del(row.id))
    }
  ).then(() => {
    return db.select(
      `SELECT DISTINCT devices.id
       FROM devices, devices AS devices2
       WHERE devices.id = $1
             OR (devices.accountid = devices2.accountid
                 AND devices2.id = $1)
      `,
      [deviceId]);
    }
  ).then((rows) => {
    let ids = [];
    for (let i = 0; i < rows.length; i++) {
      ids.push(rows[i].id);
    }
    if (!ids.length) {
      ids = [deviceId];
    }
    let deleteSql = `DELETE FROM data WHERE
     deviceid IN (${db.markersForArgs(1, ids.length)})`;
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
        let imageId = uuid.v4() + ".png";
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
    if (!validUrl.isWebUri(this.shot.url)) {
      this.shot.fullUrl = "";
      this.shot.origin = "";
    }
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

  clear() {
    this.unedited = [];
    this.toInsert = {};
    this.toInsertClipIds = [];
    this.toInsertThumbnail = null;
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
            `INSERT INTO images (id, shotid, clipid, url, contenttype, size)
             VALUES ($1, $2, $3, $4, $5, $6)
            `,
            [data.uuid, this.shot.id, clipId, data.url, data.binary.contentType, data.binary.data.length]);
        })
      );
    }).then(() => {
      if (this.toInsertThumbnail === null) {
        return Promise.resolve();
      }

      put(this.toInsertThumbnail.uuid, this.toInsertThumbnail.binary, "thumbnail");

      return db.queryWithClient(
        client,
        `INSERT INTO images (id, shotid, clipid, url, contenttype, size)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        // Since we don't have a clipid for the thumbnail and the column is NOT NULL,
        // Use the thumbnail uuid as the clipid. This allows figuring out which
        // images are thumbnails, too.
        [this.toInsertThumbnail.uuid, this.shot.id, this.toInsertThumbnail.uuid,
        this.toInsertThumbnail.url, this.toInsertThumbnail.contentType, this.toInsertThumbnail.binary.data.length]);
    }).then(() => {
      this.committed = true;
    });
  }

};

Shot.cleanDeletedShots = function() {
  let retention = config.expiredRetentionTime;
  return db.transaction((client) => {
    return Promise.resolve().then(() => {
      return db.queryWithClient(
        client,
        `
          SELECT images.id AS id
          FROM images, data
          WHERE images.shotid = data.id
                AND data.expire_time + ($1 || ' SECONDS')::INTERVAL < CURRENT_TIMESTAMP
                AND NOT data.deleted
        `,
        [retention]
      );
    }).then((result) => {
      for (let row of result.rows) {
        del(row.id);
      }
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
      );
    }).then((result) => {
      return db.queryWithClient(
        client,
        `
          UPDATE data
          SET value = '{}', deleted = TRUE
          WHERE expire_time + ($1 || ' SECONDS')::INTERVAL < CURRENT_TIMESTAMP
                AND NOT deleted
        `,
        [retention]
      );
    }).then((result) => {
      return result.rowCount;
    });
  });
};

Shot.upgradeSearch = function() {
  let batchSize = config.upgradeSearchBatchSize;
  return db.select(
    `SELECT id FROM data
     WHERE searchable_version IS NULL OR searchable_version < $1
     ORDER BY created DESC
     LIMIT $2
    `,
    [SEARCHABLE_VERSION, batchSize]).then((rows) => {
      if (!rows.length) {
        return;
      }
      let index = 0;
      return new Promise((resolve, reject) => {
        function run() {
          if (index >= rows.length) {
            return resolve();
          }
          Shot.get("upgrade_search_only", rows[index].id).then((shot) => {
            // This shouldn't really happen, but apparently can...
            if (!shot) {
              return;
            }
            return shot.upgradeSearch();
          }).then(() => {
            index++;
            run();
          }).catch(reject);
        }
        run();
      }).then(() => {
        mozlog.info("upgraded-rows", {
          msg: `Upgraded ${rows.length} records to SEARCHABLE_VERSION ${SEARCHABLE_VERSION}`
        });
        setTimeout(Shot.upgradeSearch.bind(Shot), 10000);
      });
    });
};

Shot.prototype.atob = require("atob");
Shot.prototype.btoa = require("btoa");
