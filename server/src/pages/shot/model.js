const { createProxyUrl } = require("../../proxy-url");

exports.createModel = function (req) {
  let serverModel = {
    title: "A"
  };
  let jsonModel = Object.assign(
    {},
    serverModel
  );
  return Promise.resolve({serverModel, jsonModel});
};
