/* globals browser */

"use strict";

window.callBackground = function (funcName, ...args) {
  return browser.runtime.sendMessage({funcName, args}).then((result) => {
    if (result.type === "success") {
      return result.value;
    } else if (result.type === "error") {
      let exc = new Error(result.message);
      exc.name = "BackgroundError";
      throw exc;
    } else {
      console.error("Unexpected background result:", result);
      let exc = new Error(`Bad response type from background page: ${result.type || undefined}`);
      exc.resultType = result.type || "undefined";
      throw exc;
    }
  });
};
null;
