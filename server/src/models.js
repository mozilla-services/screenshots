let user = process.env["DB_USER"] || process.env["USER"],
  pass = process.env["DB_PASS"],
  host = process.env['DB_HOST'] || "localhost";

pass = (pass && ":" + pass) || "";

let pg = require("pg"),
  constr = `postgres://${user}${pass}@${host}/${user}`;

function getConnection() {
  return new Promise(function (resolve, reject) {
    pg.connect(constr, function (err, client, done) {
      if (err) {
        reject(err);
      } else {
        resolve([client, done]);
      }
    });
  });
}

console.log("creating tables on", constr);

getConnection().then(function ([client, done]) {
  client.query("CREATE TABLE IF NOT EXISTS data " +
    "(id varchar(20) PRIMARY KEY, value text);" +
    "CREATE TABLE IF NOT EXISTS meta " +
    "(id varchar(20) PRIMARY KEY, value text);",
    [],
    function (err, result) {
      console.log("tables created with err", err);
      done();
      // test put and get. FIXME remove this later
      modelMap.put("asdf", JSON.stringify({hello: "world"})).then(
        function () {
          modelMap.get("asdf").then(
            function (result) {
              let obj = JSON.parse(result);
              console.log(
                "put/get asdf success?",
                obj.hello === "world");
            }
          );
        }
      );
    }
  );
});


class Model {
  constructor(table) {
    this.table = table;
  }

  get(id) {
    return getConnection().then(([client, done]) => {
      return new Promise((resolve, reject) => {
        client.query(
          "SELECT (value) FROM " + this.table + " WHERE id = $1",
          [id],
          function (err, result) {
            if (err) {
              reject(err);
            } else {
              if (result.rows.length) {
                resolve(result.rows[0].value);
              } else {
                resolve(null);
              }
            }
            done();
          }
        );
      });
    }).catch(function (err) {
      console.log("Error in Model.get:", err);
    });
  }

  put(id, value) {
    return getConnection().then(([client, done]) => {
      return new Promise((resolve, reject) => {
        function rollback(err) {
          client.query('ROLLBACK', function() {
            client.end();
          });
        };

        client.query(
          "BEGIN",
          (err, result) => {
            if (err) return rollback();
            client.query(
              "LOCK TABLE " + this.table + " IN SHARE ROW EXCLUSIVE MODE",
              (err, result) => {
                if (err) return rollback();
                client.query(
                  "WITH upsert AS " +
                  "(UPDATE " + this.table + " SET value = $2 WHERE id = $1 returning *) " +
                  "INSERT INTO " + this.table + " (id, value) SELECT $1, $2 " +
                  "WHERE NOT EXISTS (SELECT * FROM upsert);",
                  [id, value],
                  (err, result) => {
                    if (err) return rollback(err);
                    client.query("COMMIT", (err, result) => {
                      if (err) return rollback();
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
    }).catch(function (err) {
      console.log("Error in Model.put:", err);
    });
  }
}

let modelMap = new Model("data"),
  metaMap = new Model("meta");

exports.modelMap = modelMap;
exports.metaMap = metaMap;

exports.modelMap = modelMap;
exports.metaMap = metaMap;

exports.main = function main(state) {
  return new Promise(function (resolve, reject) {
    resolve({hello: "world"});
  });
}

exports.shot = function shot(state) {
  let key = state.params.shotId + "/" + state.params.shotDomain;

  return Promise.all(
    [modelMap.get(key), metaMap.get(key)]
  ).then(
    ([data, meta]) => Promise.resolve({data: JSON.parse(data), meta: JSON.parse(meta), identifier: key})
  );
}

exports.content = function content(state) {
  let key = state.params.contentId + "/" + state.params.contentDomain;

  return modelMap.get(key).then(
    data => Promise.resolve({data: JSON.parse(data), identifier: key})
  );
}

exports.summary = exports.main;
exports.tag = exports.main;
exports.data = exports.main;
exports.meta = exports.main;
exports.tags = exports.main;
exports.newframe = exports.main;
