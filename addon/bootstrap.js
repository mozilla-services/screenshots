/* exported startup */

function startup(data, reason) {
  data.webExtension.startup().then((api) => {
    const {browser} = api;
    browser.runtime.onMessage.addListener(handleMessage);
  });
}

function shutdown(data, reason) {}
function install(data, reason) {}
function uninstall(data, reason) {}

function handleMessage() {}
