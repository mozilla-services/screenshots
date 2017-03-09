/* globals browser */

window.callBackground = function (funcName, ...args) {
  return browser.runtime.sendMessage({funcName, args}).then((result) => {
    if (result.type === "success") {
      return result.value;
    } else if (result.type === "error") {
      throw new Error(result.name);
    } else {
      console.error("Unexpected background result:", result);
      let exc = new Error("Bad response from background page");
      exc.resultType = result.type || "undefined";
      throw exc;
    }
  });
};
null;
