/* exported startup */

function startup(data, reason) {
  data.webExtension.startup().then((api) => {
    const {browser} = api;
    browser.runtime.onMessage.addListener(handleMessage);
  });
}

function install() {
}

function handleMessage() {
}
