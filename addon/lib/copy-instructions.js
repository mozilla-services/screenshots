const system = require("sdk/system");

exports.copyInstructions = function () {
  if (system.platform === "darwin") {
    return "Click ⌘-V to paste";
  } else {
    return "Click Ctrl-V to paste";
  }
};
