/* browser: true */
/* global $, ga */

$(function () {
  $(".installer").click(function () {
    ga('send', 'event', 'website', 'click-install', {useBeacon: true});
  });
});
