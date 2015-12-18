/* Note: do not use ES6 features here, we need to use this module from the build system before translation */
const convict = require("convict");
const envc = require("envc");
const path = require("path");

// Populate `process.env` with overrides from environment-specific `.env`
// files as a side effect. See `https://npmjs.org/envc` for more info.
envc({booleans: true});

var conf = convict({
  port: {
    doc: "The PageShot server port",
    format: "port",
    default: 10080,
    env: "PORT",
    arg: "port"
  },
  siteOrigin: {
    doc: "The server public origin (except protocol)",
    format: String,
    default: "localhost:10080",
    env: "SITE_ORIGIN",
    arg: "siteOrigin"
  },
  contentPort: {
    doc: "The content server port",
    format: "port",
    default: 10081,
    env: "CONTENT_PORT",
    arg: "contentPort"
  },
  contentOrigin: {
    doc: "The content server public origin (except protocol)",
    format: String,
    default: "localhost:10081",
    env: "CONTENT_ORIGIN",
    arg: "contentOrigin"
  },
  useSinglePort: {
    doc: "If true, use the main site port for the content server, and ignore contentPort and contentOrigin",
    format: Boolean,
    default: false,
    env: "USE_SINGLE_PORT",
    arg: "useSinglePort"
  },
  useS3: {
    doc: "If true, store files in s3. If false, store them locally",
    format: Boolean,
    default: false,
    env: "USE_S3",
    arg: "useS3"
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
      env: "RDS_USERNAME",
      arg: "db-user"
    },
    password: {
      doc: "The Postgres password",
      format: String,
      default: "",
      env: "RDS_PASSWORD",
      arg: "db-pass"
    },
    host: {
      doc: "The Postgres server host and port",
      format: String,
      default: "localhost:5432",
      env: "RDS_HOSTNAME",
      arg: "db-host"
    },
    dbname: {
      doc: "The Postgres database",
      format: String,
      default: "",
      env: "RDS_NAME",
      arg: "db-name"
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
  },
  exportBase: {
    doc: "File location to keep exports",
    format: String,
    default: path.join(path.dirname(__dirname), "export-files"),
    env: "EXPORT_BASE",
    arg: "export-base"
  },
  exportKeepTime: {
    doc: "Minutes to keep an export",
    format: "int",
    default: 60,
    env: "EXPORT_KEEP_TIME",
    arg: "export-keep-time"
  },
  // This is mostly configurable for debugging purposes:
  checkDeletedInterval: {
    doc: "Frequency in seconds to check for items that should be purged",
    format: "int",
    default: 60,
    env: "CHECK_DELETED_INTERVAL",
    arg: "check-deleted-interval"
  },
  expiredRetentionTime: {
    doc: "Amount of time to keep an expired shot, in seconds",
    format: "int",
    default: 60*60*24*14, // 14 days
    env: "EXPIRED_RETENTION_TIME",
    arg: "expired-retention-time"
  },
  defaultExpiration: {
    doc: "Default expiration time, in seconds",
    format: "int",
    default: 60*60*24*14, // 14 days
    env: "DEFAULT_EXPIRATION",
    arg: "default-expiration"
  },
  allowExport: {
    doc: "Whether to allow exporting shots",
    format: Boolean,
    default: false,
    env: "ALLOW_EXPORT",
    arg: "allow-export"
  }
});

conf.validate({ strict: true });

module.exports = conf;
