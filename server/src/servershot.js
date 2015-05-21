const { AbstractShot } = require("../../shared/dist/shot");
const db = require("./db");

class Shot extends AbstractShot {

  constructor(ownerId, backend, id, attrs) {
    super(backend, id, attrs);
    this.ownerId = ownerId;
  }

  insert() {
    let value = JSON.stringify(this.asJson());
    return db.insert(
      `INSERT INTO data (id, userid, value)
       VALUES ($1, $2, $3)`,
      [this.id, this.ownerId, value]
    );
  }

  update() {
    let value = JSON.stringify(this.asJson());
    return db.update(
      `UPDATE data SET value = $1 WHERE id = $2 AND userid = $3`,
      [value, this.id, this.ownerId]
    ).then((rowCount) => {
      if (! rowCount) {
        throw new Error("No row updated");
      }
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
    `SELECT value, userid FROM data WHERE id = $1`,
    [id]
  ).then((rows) => {
    if (! rows.length) {
      return null;
    }
    let row = rows[0];
    return {
      userid: row.userid,
      value: row.value
    };
  });
};
