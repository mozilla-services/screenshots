const config = require("./config").getProperties();
const mozlog = require("./logging").mozlog("server");
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
      throw new Error(`Unable to fetch ${imageId} for Watchdog submission.`);
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
      .then(res => res.json())
      .then(respJson => ({submissionId, nonce, request_id: respJson.id}));
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
