const convict = require("convict");
const envc = require("envc");

// Populate `process.env` with overrides from environment-specific `.env`
// files as a side effect. See `https://npmjs.org/envc` for more info.
envc({
  booleans: true,
  numbers: true
});

let conf = convict({
  port: {
    doc: "The PageShot server port",
    format: "port",
    default: 10080,
    env: "PORT",
    arg: "port"
  },
  db: {
    user: {
      doc: "The Postgres user",
      format: String,
      default: process.env.USER,
      env: "DB_USER",
      arg: "db-user"
    },
    password: {
      doc: "The Postgres password",
      format: String,
      default: "",
      env: "DB_PASS",
      arg: "db-pass"
    },
    host: {
      doc: "The Postgres server host and port",
      format: String,
      default: "localhost:5432",
      env: "DB_HOST",
      arg: "db-host"
    }
  },
  productName: {
    doc: "Override the 'PageShot' product name",
    format: String,
    default: "PageShot",
    env: "PRODUCT_NAME",
    arg: "product-name"
  }
});

conf.validate({ strict: true });

module.exports = conf;
