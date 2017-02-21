/* globals browser */

window.callBackground = function (funcName, ...args) {
  return browser.runtime.sendMessage({funcName, args}).then((result) => {
    if (result.type === "success") {
      return result.value;
    } else if (result.type === "error") {
      throw new Error(result.name);
    } else {
      console.error("Unexpected background result:", result);
    }
  });
};
null;
