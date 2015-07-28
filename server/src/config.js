const convict = require("convict");
const envc = require("envc");

// Populate `process.env` with overrides from environment-specific `.env`
// files as a side effect. See `https://npmjs.org/envc` for more info.
envc();

let conf = convict({
  port: {
    doc: "The PageShot server port",
    format: "port",
    default: 10080,
    env: "PORT",
    arg: "port"
  },
  contentPort: {
    doc: "The content server port",
    format: "port",
    default: 10080,
    env: "CONTENT_PORT",
    arg: "contentPort"
  },
  contentHost: {
    doc: "The content server host",
    format: String,
    default: "localhost",
    env: "CONTENT_HOST",
    arg: "contentHost"
  },
  oAuth: {
    oAuthServer: {
      doc: "The FxA OAuth server base URL",
      format: String,
      default: "https://oauth-stable.dev.lcip.org/v1",
      env: "OAUTH_SERVER",
      arg: "oauth-server",
    },
    contentServer: {
      doc: "The FxA content server base URL",
      format: String,
      default: "https://stable.dev.lcip.org",
      env: "CONTENT_SERVER",
      arg: "content-server",
    },
    profileServer: {
      doc: "The FxA profile server base URL",
      format: String,
      default: "https://stable.dev.lcip.org/profile/v1",
      env: "PROFILE_SERVER",
      arg: "profile-server",
    },
    clientId: {
      doc: "The OAuth client ID",
      format: String,
      default: "",
      env: "CLIENT_ID",
      arg: "client-id"
    },
    clientSecret: {
      doc: "The OAuth client secret",
      format: String,
      default: "",
      env: "CLIENT_SECRET",
      arg: "client-secret"
    }
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
    },
    dbname: {
      doc: "The Postgres database",
      format: String,
      default: "",
      env: "DB_NAME",
      arg: "dn-name"
    }
  },
  productName: {
    doc: "Override the 'PageShot' product name",
    format: String,
    default: "PageShot",
    env: "PRODUCT_NAME",
    arg: "product-name"
  },
  gaId: {
    doc: "Give the Google Analytics code",
    format: String,
    default: "",
    env: "GA_ID",
    arg: "ga-id"
  }
});

conf.validate({ strict: true });

module.exports = conf;
