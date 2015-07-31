/* browser: true */
/* global $, ga */

$(function () {
  $(".installer").click(function () {
    ga('send', 'event', 'click', 'install', {useBeacon: true});
  });
});
