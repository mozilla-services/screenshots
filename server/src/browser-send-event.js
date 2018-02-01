/* This module exists because on some browsers we find that ga-analytics doesn't get loaded */

let sentEvent = false;

if (typeof window != "undefined" && window.sendEvent) {
  module.exports = window.sendEvent;
} else {
  module.exports = function() {
    if (window.sendEvent) {
      window.sendEvent.apply(null, arguments);
    } else {
      // eslint-disable-next-line no-console
      console.log.apply(console, ["missing sendEvent("].concat(Array.from(arguments).concat([")"])));
      if (!sentEvent) {
        // Initialization to send events can take a while:
        setTimeout(() => {
          const event = new CustomEvent("error-no-sendEvent");
          document.dispatchEvent(event);
        }, 3000);
        sentEvent = true;
      }
    }
  };
}
