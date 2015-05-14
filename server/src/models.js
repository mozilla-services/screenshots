const Keygrip = require('keygrip');
const { getConnection, constr } = require("./db");

let modelMap, userMap;

const createSQL = `
CREATE TABLE IF NOT EXISTS users (
  id varchar(200) PRIMARY KEY,
  secret varchar(200) NOT NULL,
  nickname TEXT,
  avatarurl TEXT
);

CREATE TABLE IF NOT EXISTS data (
  id varchar(120) PRIMARY KEY,
  userid varchar(200) REFERENCES users (id),
  created TIMESTAMP DEFAULT NOW(),
  value text
);

CREATE TABLE IF NOT EXISTS signing_keys (
  created TIMESTAMP DEFAULT NOW(),
  key TEXT
);
`;


/** Create all the tables */
function createTables() {
  getConnection().then(function ([client, done]) {
    console.log("creating tables on", constr);
    client.query(createSQL,
      [],
      function (err, result) {
        if (err) {
          console.log("tables created with err", err);
        }
        done();
        // test put and get. FIXME remove this later
        modelMap.put("test_row", {value: JSON.stringify({hello: "world"})}).then(
          function () {
            modelMap.get("test_row", ["value"]).then(
              function (result) {
                let obj = JSON.parse(result.value);
                console.log(
                  "put/get test_row success?",
                  obj.hello === "world");
              }
            ).then(loadKeys);
          }
        );
      }
    );
  }).catch(function (error) {
    if (error.code === "ECONNREFUSED") {
      console.warn(`Could not connect to database on ${constr}`);
    } else {
      console.warn("Failed to create table:", error);
    }
  });
}

createTables();

/** Loads the random signing key from the database, or generates a new key
    if none are found */
function loadKeys() {
  return getConnection().then(function ([client, done]) {
    client.query(
      `SELECT key FROM signing_keys ORDER BY CREATED`,
      [],
      function (err, result) {
        if (err) {
          console.warn("Could not select signing key:", err);
          done();
          return;
        }
        if (result.rows.length) {
          let textKeys = [];
          for (let i=0; i<result.rows.length; i++) {
            textKeys.push(result.rows[i].key);
          }
          exports.keys = new Keygrip(textKeys);
          done();
        } else {
          done();
          makeKey().then(function (key) {
            client.query(
              `INSERT INTO signing_keys (created, key) VALUES (NOW(), $1)`,
              [key],
              function (err, result) {
                if (err) {
                  console.warn("Could not create signing key:", err);
                  done();
                  return;
                }
                exports.keys = new Keygrip([key]);
                console.log("created new secret key");
                done();
              }
            );
          }).catch(function (err) {
            console.warn("Error creating signing key:", err);
          });
        }
      });
    }
  ).catch(function (err) {
    console.warn("Could not load signing key because of connection error:", err);
  });
}

/** Returns a promise that generates a new largish ASCII random key */
function makeKey() {
  return new Promise(function (resolve, reject) {
    require('crypto').randomBytes(48, function(err, buf) {
      if (err) {
        reject(err);
        return;
      }
      resolve(buf.toString('base64'));
    });
  });
}

class Model {
  constructor(table) {
    this.table = table;
  }

  get(id, attrs) {
    let sqlAttrs = attrs.map((a) => '"' + a + '"');
    return getConnection().then(([client, done]) => {
      return new Promise((resolve, reject) => {
        client.query(
          `SELECT (${sqlAttrs.join(", ")}) FROM ${this.table} WHERE id = $1`,
          [id],
          function (err, result) {
            if (err) {
              reject(err);
            } else {
              if (result.rows.length) {
                resolve(result.rows[0]);
              } else {
                resolve(null);
              }
            }
            done();
          }
        );
      });
    }).catch(function (err) {
      if (err.code == "ECONNREFUSED") {
        console.warn("Error connecting to database");
      } else {
        console.warn("Error in Model.get():", err);
      }
      throw err;
    });
  }

  put(id, props) {
    if (! id) {
      throw new Error("Must have id");
    }
    let propSetSQL = [];
    let propSelectSQL = [];
    let propNames = [];
    // id is treated differently from other properties:
    let propValues = [id];
    for (let attr in props) {
      if (attr.search(/^[a-zA-Z_]+$/) == -1) {
        throw new Error("Bad attr: " + JSON.stringify(attr));
      }
      if (attr == "id") {
        throw new Error("Cannot include id attr in map");
      }
      propNames.push('"' + attr + '"');
      let number = propSetSQL.length+2;
      propSetSQL.push('"' + attr + '" = $' + number);
      propSelectSQL.push("$" + number);
      propValues.push(props[attr]);
    }
    return getConnection().then(([client, done]) => {
      return new Promise((resolve, reject) => {
        function rollback(err) {
          console.error("DB Query was rolled back:", err);
          client.query('ROLLBACK', function() {
            client.end();
          });
        }

        client.query(
          "BEGIN",
          (err, result) => {
            if (err) { return rollback(err); }
            client.query(
              "LOCK TABLE " + this.table + " IN SHARE ROW EXCLUSIVE MODE",
              (err, result) => {
                if (err) { return rollback(err); }
                let query = `
                  WITH upsert AS
                  (UPDATE ${this.table} SET ${propSetSQL.join(", ")} WHERE id = $1 returning *)
                  INSERT INTO ${this.table} ("id", ${propNames.join(", ")}) SELECT $1, ${propSelectSQL.join(", ")}
                  WHERE NOT EXISTS (SELECT * FROM upsert)`;
                //console.log("PUT QUERY", query);
                client.query(query,
                  propValues,
                  (err, result) => {
                    if (err) { return rollback(err); }
                    client.query("COMMIT", (err, result) => {
                      if (err) { return rollback(err); }
                      resolve();
                      done();
                      //let pool = pg.pools.all[Object.keys(pg.pools.all)[0]];
                      //console.log("pool size", pool.getPoolSize(), pool.availableObjectsCount());
                    });
                  }
                );
              }
            );
          }
        );
      });
    });
  }

  insert(id, props) {
    if (! id) {
      throw new Error("No id given to INSERT");
    }
    let propNames = [];
    let propNums = [];
    let propValues = [id];
    for (let attr in props) {
      let count = propNames.length + 2;
      propNames.push('"' + attr + '"');
      propNums.push('$' + count);
      propValues.push(props[attr]);
    }
    return getConnection().then(([client, done]) => {
      return new Promise((resolve, reject) => {
        client.query(`
          INSERT INTO ${this.table} (id, ${propNames.join(", ")})
          VALUES ($1, ${propNums.join(", ")})`,
          propValues,
          (err, result) => {
            if (err && err.code == '23505') {
              // constraint error, duplicate key
              resolve(false);
            } else if (err) {
              reject(err);
            } else {
              resolve(true);
            }
            done();
          }
        );
      });
    });
  }
}

modelMap = new Model("data");
userMap = new Model("users");

exports.modelMap = modelMap;
exports.userMap = userMap;

exports.main = function main(state) {
  return new Promise(function (resolve, reject) {
    // There's no dynamic data needed to render the homepage
    resolve({});
  });
};

exports.shot = function shot(state) {
  let key = state.params.shotId + "/" + state.params.shotDomain;

  return modelMap.get(key, ["value"]).then(
    (data) => {
      if (! data) {
        return Promise.reject(new Error("No data or returned from model"));
      }

      return Promise.resolve({
          shot: JSON.parse(data.value),
          backend: state.backend,
          id: key});
    }
  );
};

exports.content = function content(state) {
  let key = state.params.contentId + "/" + state.params.contentDomain;

  return modelMap.get(key, ["value"]).then(
    data => Promise.resolve({data: JSON.parse(data.value), identifier: key})
  );
};
