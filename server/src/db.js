const config = require("./config").getProperties();

const pg = require("pg");
const mozlog = require("./logging").mozlog("db");
const logQueryLimit = config.db.logQueryLimit;

let user = encodeURIComponent(config.db.user);
let dbname = encodeURIComponent(config.db.dbname || config.db.user);
let credentials = config.db.password ? `${user}:${encodeURIComponent(config.db.password)}` : user;
let constr = `postgres://${credentials}@${config.db.host}/${dbname}`;

pg.on("error", function(error) {
  mozlog.error("db-error", {
    msg: "Error in database:",
    err: error
  });
});

function getConnection() {
  return new Promise(function(resolve, reject) {
    pg.connect(constr, function(err, client, done) {
      if (err) {
        reject(err);
      } else {
        resolve([client, done]);
      }
    });
  });
}

exports.queryWithClient = function(client, ...params) {
  let timer = initTiming();
  return new Promise((resolve, reject) => {
    // Babel only supports spreads as the final element of a list; i.e.,
    // `[...params, value]` is invalid.
    params.push(function afterQuery(err, result) {
      timer();
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
    client.query(...params);
  });
};

// FIXME: make these so they don't need to be exported
exports.getConnection = getConnection;
exports.constr = constr;

exports.select = function(sql, args) {
  let timer = initTiming();
  return getConnection().then(function([client, done]) {
    return exports.queryWithClient(client, sql, args).then(({rows}) => {
      done();
      timer();
      return rows;
    }, (error) => {
      done();
      throw error;
    });
  });
};

exports.insert = function(sql, args) {
  let timer = initTiming();
  return getConnection().then(function([client, done]) {
    return exports.queryWithClient(client, sql, args).then(() => {
      done();
      timer();
      return true;
    }).catch(err => {
      done();
      if (err.code == '23505') {
        // constraint error, duplicate key
        return false;
      }
      throw err;
    });
  });
};

exports.update = function(sql, args) {
  let timer = initTiming();
  return exports.exec(sql, args).then((result) => {
    timer();
    return result.rowCount;
  });
};

exports.upsertWithClient = function(client, insertSql, updateSql, params) {
  return exports.queryWithClient(
    client,
    `WITH upsert AS (${updateSql} RETURNING *)
      ${insertSql}
    WHERE NOT EXISTS (SELECT * FROM upsert)`,
    params
  );
};

exports.transaction = function(func) {
  return getConnection().then(function([client, done]) {
    return exports.queryWithClient(client, `BEGIN`).then(() => func(client)).then(result => {
      // Commit and return the original transaction result.
      return exports.queryWithClient(client, `COMMIT`).then(() => {
        done();
        return result;
      });
    }).catch(txnErr => {
      // Roll back the transaction and re-throw the original error.
      return exports.queryWithClient(client, `ROLLBACK`).then(() => {
        done();
        throw txnErr;
      }, err => {
        done(err);
        throw err;
      });
    });
  });
};

// These happen to have the same logic:
exports.del = exports.update;

exports.exec = function(sql, args) {
  let timer = initTiming();
  return getConnection().then(function([client, done]) {
    return exports.queryWithClient(client, sql, args).then(result => {
      done();
      timer();
      return result;
    }, err => {
      done();
      throw err;
    });
  });
};

exports.markersForArgs = function(starting, numberOfArgs) {
  let result = [];
  for (var i = starting; i < starting + numberOfArgs; i++) {
    result.push("$" + i);
  }
  return result.join(", ");
};

function doNothing() {
}

function initTiming() {
  if (!logQueryLimit) {
    return doNothing;
  }
  let caller = getCallerPosition(2);
  if (caller == "skip") {
    // This happens when getCallerPosition detects we shouldn't time this function call
    return doNothing;
  }
  let start = Date.now();
  return function() {
    let time = Date.now() - start;
    if (time >= logQueryLimit) {
      mozlog.info("db-timing", {caller, time});
    }
  };
}

const skipCaller = /\/server\/db.js:/;
const abortTiming = /\/server\/db.js:/;

function getCallerPosition(stacklevel) {
  // Obviously the caller knows its position, so we really
  // want the caller of the caller of this function
  let exc = new Error();
  let lines = exc.stack.split("\n");
  let index = stacklevel + 2;
  while (lines[index] && skipCaller.test(lines[index])) {
    if (abortTiming.test(lines[index])) {
      // This is a case where this function is being called by another function
      // inside this module; when that happens we know this call is already
      // being logged, and don't need to log it
      return "skip";
    }
    index++;
  }
  let caller = lines[index];
  if (!caller) {
    return "unknown";
  }
  return caller.replace(/^ */, "")
}
