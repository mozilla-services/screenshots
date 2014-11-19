$(function () {
  if (window.IS_NEWPAGE) {
    return;
  }
  interfaceReady();
});

function interfaceReady() {
  var iface = $('<div id="pageshot-interface">?<br>?</div>');
  $(document.body).append(iface);
}
