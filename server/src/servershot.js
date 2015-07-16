const { AbstractShot } = require("../shared/shot");
const db = require("./db");

class Shot extends AbstractShot {

  constructor(ownerId, backend, id, attrs) {
    super(backend, id, attrs);
    this.ownerId = ownerId;
  }

  convertAnyDataUrls(client, json, possibleClipsToInsert) {
    return Promise.all(
      possibleClipsToInsert.map((clipId) => {
        let clip = this.getClip(clipId);
        let imageId = `${this.id}/${clipId}`;
        let data;
        try {
          data = clip.imageBinary();
        } catch (e) {
          if (e.message !== "Bad clip URL") {
            throw e;
          }
          // It's already in the db, and the clip has an http url
          return true;
        }
        return db.upsertWithClient(
          client,
          "INSERT INTO images (image, id) SELECT $1, $2",
          "UPDATE images SET image = $1 WHERE id = $2",
          [data.data, imageId]
        ).then((rows) => {
          let clip = this.getClip(clipId);
          let imageId = `${this.id}/${clipId}`;
          // TODO don't hardcode localhost
          clip.image.url = `http://localhost:10080/images/${imageId}`;
          return rows;
        });
      })
    );
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
          return db.queryWithClient(
            client,
            `INSERT INTO data (id, deviceid, value)
             VALUES ($1, $2, $3)`,
            [this.id, this.ownerId, JSON.stringify(json)]
          ).then((rows) => {
            return true;
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
        return db.queryWithClient(
          client,
          `UPDATE data SET value = $1 WHERE id = $2 AND deviceid = $3`,
          [JSON.stringify(json), this.id, this.ownerId]
        ).then((rowCount) => {
          if (! rowCount) {
            throw new Error("No row updated");
          }
        });
      });
    });
  }

}

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

ServerClip.getRawBytesForClip = function (id, domain, clipId) {
  let key = `${id}/${domain}/${clipId}`;
  return db.select("SELECT image FROM images WHERE id = $1", [key]).then((rows) => {
    if (! rows.length) {
      return null;
    } else {
      return rows[0].image;
    }
  });
};

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
       ORDER BY data.created
      `,
      ids
    );
  }).then((rows) => {
    console.info("Index query:", Date.now() - timeStart, "ms total; device query:", timeMid - timeStart, "ms");
    let result = [];
    for (let i=0; i<rows.length; i++) {
      let row = rows[i];
      let json = JSON.parse(row.value);
      let shot = new Shot(row.deviceid, backend, row.id, json);
      result.push(shot);
    }
    return result;
  });
};
