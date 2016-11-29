const system = require("sdk/system");

exports.copyInstructions = function () {
  if (system.platform === "darwin") {
    return "Press ⌘-V to paste";
  } else {
    return "Press Ctrl-V to paste";
  }
};
