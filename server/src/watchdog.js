const config = require("./config").getProperties();
const mozlog = require("./logging").mozlog("watchdog");
const { captureRavenException } = require("./ravenclient");
const db = require("./db");
const { Shot } = require("./servershot");
const util = require("util");
const { URL } = require("url");
const fetch = require("node-fetch");
const Hawk = require("hawk");
const FormData = require("form-data");
const genUuid = require("nodify-uuid");

const isEnabled = config.watchdog.enable;
validateConfiguration();

function validateConfiguration() {
  if (!isEnabled) {
    return;
  }

  let isConfigValid = true;

  if (!config.watchdog.id || !config.watchdog.key || !config.watchdog.algorithm) {
    mozlog.warn("watchdog-invalid-config", {msg: "Watchdog credentials configuration values are missing."});
    isConfigValid = false;
  }

  if (!config.watchdog.submissionUrl) {
    mozlog.warn("watchdog-invalid-config", {msg: "Watchdog submission URL configuration value is missing."});
    isConfigValid = false;
  } else {
    try {
      new URL(config.watchdog.submissionUrl);
    } catch (e) {
      mozlog.warn("watchdog-invalid-config", {msg: "Watchdog submission URL is not a valid URL.", err: e});
      isConfigValid = false;
    }
  }

  if (!isConfigValid) {
    mozlog.info("watchdog-config-exit", {msg: "Watchdog is enabled but not properly configured."});
    process.exit(2);
  }

}

let positiveEmailList;
if (config.watchdog.positiveEmail) {
  positiveEmailList = config.watchdog.positiveEmail.split(";");
}

let intervalSize = config.watchdog.submissionInterval;
if (intervalSize <= 1) {
  intervalSize = 1;
}
let odometer = 0;
function isAtInterval() {
  if (intervalSize === 1) {
    return true;
  }

  const atInterval = odometer === 0;
  odometer = (odometer + 1) % intervalSize;
  return atInterval;
}

function shouldSubmitShot() {
  return isEnabled && isAtInterval();
}

function getSubmissionId() {
  return db.select(
    "SELECT nextval(pg_get_serial_sequence('watchdog_submissions', 'id')) AS new_id",
  ).then(rows => {
    if (rows.length) {
      return rows[0].new_id;
    }
    throw new Error("Unable to retrieve a new Watchdog submission id.");
  });
}

function getSubmission(id) {
  return db.select(
    "SELECT * FROM watchdog_submissions WHERE id = $1", [id]
  ).then(rows => {
    if (rows.length) {
      return rows[0];
    }
    const err =  new Error("Unable to find a Watchdog submission.");
    err.watchdogSubmissionId = String(id);
    throw err;
  });
}

const credentials = {
  id: config.watchdog.id,
  key: config.watchdog.key,
  algorithm: config.watchdog.algorithm
};

exports.submit = function(shot) {
  if (!shouldSubmitShot()) {
    return;
  }

  const imageUrl = shot.getClip(shot.clipNames()[0]).image.url;
  const imageId = imageUrl.split("/").pop();
  const form = new FormData();

  Shot.getRawBytesForClip(
    imageId
  ).then((obj) => {
    if (obj === null) {
      const err = new Error("Unable to fetch image for Watchdog submission.");
      err.imageId = String(imageId);
      throw err;
    }
    form.append("image", obj.data, {
      filename: imageId,
      contentType: obj.contentType
    });

    return getSubmissionId();
  }).then(submissionId => {
    const uuid = util.promisify(genUuid.generate);
    return uuid(genUuid.V_RANDOM).then(nonce => ({submissionId, nonce}));
  }).then(({submissionId, nonce}) => {
    const callbackUrl = `${shot.backend}/watchdog/${submissionId}?nonce=${nonce}`;
    form.append("positive_uri", callbackUrl);
    form.append("negative_uri", callbackUrl);

    if (positiveEmailList) {
      for (const addr of positiveEmailList) {
        form.append("positive_email[]", addr);
      }
    }

    const req = {method: "POST", body: form};
    const authHeader = Hawk.client.header(config.watchdog.submissionUrl, req.method, {credentials});
    req.headers = Object.assign(
      {Accept: "application/json", Authorization: authHeader.header},
      form.getHeaders());
    return fetch(config.watchdog.submissionUrl, req)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        const err = new Error("Received error response from Watchdog.");
        err.watchdogSubmissionId = String(submissionId);
        err.responseStatus = res.status;
        err.responseStatusText = res.statusText;
        throw err;
      }).then(respJson => ({submissionId, nonce, request_id: respJson.id}));
  }).then(({submissionId, nonce, request_id}) => {
    return db.insert(
      `INSERT INTO watchdog_submissions (id, shot_id, request_id, nonce)
       VALUES ($1, $2, $3, $4)`,
      [submissionId, shot.id, request_id, nonce.toString()]
    );
  }).catch(e => {
    captureRavenException(e);
    mozlog.error("watchdog-failed-submission", {err: e});
  });
};

exports.handleResult = function(req) {
  getSubmission(req.params.submissionId).then(record => {
    if (record.request_id !== req.body.watchdog_id) {
      const err = new Error("Received mismatching Watchdog ID in callback.");
      err.watchdogSubmissionId = String(record.id);
      throw err;
    }
    if (req.query.nonce !== record.nonce) {
      const err = new Error("Received mismatching nonce in a Watchdog callback.");
      err.watchdogSubmissionId = String(record.id);
      throw err;
    }
    if (record.positive_result !== null) {
      const err = new Error("Watchdog submission already has a result.");
      err.watchdogSubmissionId = String(record.id);
      throw err;
    }

    if (req.body.positive) {
      handlePositive(record);
    } else {
      handleNegative(record);
    }
  }).catch(e => {
    captureRavenException(e);
    mozlog.error("watchdog-failed-callback", {err: e});
  });
};

function handleNegative(record) {
  return db.update("UPDATE watchdog_submissions SET positive_result = FALSE WHERE id = $1", [record.id]);
}

function handlePositive(record) {
  return db.transaction(client => {
    return db.queryWithClient(
      client,
      `UPDATE data
       SET expire_time = NULL, deleted = FALSE, block_type = 'watchdog'
       WHERE id = $1`,
      [record.shot_id]
    ).then(() => db.queryWithClient(
      client,
      "UPDATE watchdog_submissions SET positive_result = TRUE WHERE id = $1",
      [record.id]
    ));
  });
}
