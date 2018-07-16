const config = require("./config").getProperties();

exports.mozlog = require("mozlog")({
  app: "screenshots-server",
  fmt: "pretty",
  level: config.log.level,
  debug: config.log.lint
});

exports.installConsoleHandler = function() {
  const console_mozlog = exports.mozlog("console");
  // We can't prevent any third party libraries from writing to the console,
  // so monkey patch it so they play nice with mozlog.
  function logFactory(level) {
    const logger = console_mozlog[level].bind(console_mozlog);
    return function() {
      let msg = "";
      let stack = undefined;
      for (let i = 0; i < arguments.length; i++) {
        const arg = arguments[i];
        if (msg) {
          msg += " ";
        }
        if (typeof arg === "string") {
          msg += arg;
        } else {
          if (arg && arg.stack) {
            if (stack) {
              stack = stack + "\n\n" + arg.stack;
            } else {
              stack = arg.stack;
            }
          }
          msg += JSON.stringify(arg);
        }
      }
      logger(level, {msg, stack});
    };
  }

  console.debug = logFactory("debug");
  console.info = logFactory("info");
  console.warn = logFactory("warn");
  console.error = logFactory("error");
};
