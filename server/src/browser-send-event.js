/* This module exists because on some browsers we find that ga-analytics doesn't get loaded */

if (typeof window != "undefined" && window.sendEvent) {
  module.exports = window.sendEvent;
} else {
  module.exports = function () {
    if (window.sendEvent) {
      window.sendEvent.apply(null, arguments);
    } else {
      console.log.apply(console, ["missing sendEvent("].concat(Array.from(arguments).concat([")"])));
    }
  };
}
