const { getConnection } = require("./db");

let modelMap;

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

exports.modelMap = modelMap;

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
