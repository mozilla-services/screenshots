/*! This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

/* jshint forin:true, noarg:false, noempty:true, eqeqeq:true, bitwise:true,
  strict:true, undef:true, curly:false, browser:true,
  unused:true,
  indent:2, maxerr:50, devel:true, node:true, boss:true, white:true,
  globalstrict:true, nomen:false, newcap:true, esnext: true, moz: true  */

/*global exports, require */

"use strict";


/**
 * Notification Module
 *
 * Usage:
 *
 * ```
 * let nb = require("notificationbox");
 *
 * // top bar nofitication
 * nb.banner({msg: "top notification!"})
 *
 * // bottom bar n
 * nb.banner({
 *   msg: "bottom notification!",
 *   nb: notification.notificationbox(null,isBottom);
 * })
 * ```
 *
 * Buttons:
 *
 *
 * ```
 * let nb = require("notificationbox");
 * let buttonText = "amazing";
 * let button = notification.buttonMaker[buttonText]({
 *   callback: function(nb, b) {
 *     console.log("I was pressed.");
 *   }
 * }));
 * nb.banner({
 *   msg: "top notification!",
 *   buttons:  [button]
 * })
 * ```
 *
 * All options:
 *
 * ```
 * let nb = require("notificationbox");
 *
 * let buttons = [notification.buttonMaker[buttonText]({
 *   callback: function(nb, b) {
 *     console.log("I was pressed.");
 *   }
 * }))];
 *
 * let bar = notification.notificationbox(null,isBottom); // bottom!
 *
 *
 * let P = notification.banner({
 *   msg: "some text",
 *   id: null,   // id of the dom element
 *   icon: "chrome://global/skin/icons/question-large.png",
 *   priority: null,
 *   buttons: buttons,
 *   callback: function () {  // cb on close!
 *     console.log("closed");
 *   },
 *   nb: nb
 * });
 *
 * ```
 * @module main
 *
 */

const chrome = require("chrome");
const { emit, on, once, off } = require('sdk/event/core');
const { EventTarget } = require('sdk/event/target');
const timers = require("sdk/timers");
const { validateOptions: valid } = require("sdk/deprecated/api-utils");
const windowUtils = require("sdk/window/utils");
const { getMostRecentBrowserWindow } = windowUtils;
const { uuid } = require('sdk/util/uuid');
const { Class, mix } = require('sdk/core/heritage');

const validNumber = { is: ['number', 'undefined', 'null'] };

const USE_PER_WINDOW_NOTIFICATIONS = false;

/** get a top or bottom notifcation box (banner) element.
 *
 * @param {chrome_window} win top-level chromewindow.  if null get most recent.
 * @param {bool} bottom bottom or top bar
 * @return {element} notificationbox dom element
 * @memberOf main
 * @name notificationbox
 */
const notificationbox = function (win, bottom){
  // https://developer.mozilla.org/en/XUL/notificationbox#Notification_box_events
  // bottom:  http://mxr.mozilla.org/mozilla-central/source/browser/base/content/browser-data-submission-info-bar.js
  // TODO, this is SO MESSED UP.  GRL doesn't get xul vs most
  // recent vs whatever.
  if (bottom) {
    //return win.document.getElementById("global-notificationbox"); // bottom
    win = win || getMostRecentBrowserWindow();
    let nb = win.gDataNotificationInfoBar._notificationBox;
    return nb;
  } else {
    let wm = chrome.Cc["@mozilla.org/appshell/window-mediator;1"]
                     .getService(chrome.Ci.nsIWindowMediator);
    win = win || wm.getMostRecentWindow("navigator:browser");  // is this dupe?
    let nb = win.document.getElementById("high-priority-global-notificationbox");
    if (USE_PER_WINDOW_NOTIFICATIONS && nb) {
      return nb; // 33+?
    } else {
      return win.gBrowser.getNotificationBox();
    }
  }
};

/* callback should register on AlertShow, AlertClose, TODO!

    see:  aboutRights; telemetry notifications (good examples) live at:
    at http://mxr.mozilla.org/mozilla-central/source/browser/components/nsBrowserGlue.js

    TODO... hideclose?

    Note:  in desktop fx, there is no event fired on close.  We fake this.
*/


/** construct and append a new banner message
 *
 *
 *  Options object:
 *
 *  - msg:
 *  - id
 *  - priority
 *  - buttons
 *  - callback
 *  - nb
 *
 * See:  https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/Method/appendNotification
 * See:  https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/notificationbox
 *
 * @param {Object} options contruction options.
 * @return {element} notificationbox dom element
 * @memberOf main
 * @name banner
 */

const banner = new Class({
  extends:  EventTarget,
  initialize: function initialize(options) {
    let defaults =  {
      onKill:  function (data) {
        let note = this.nb.getNotificationWithValue(this.id);
        this.nb.removeNotification( this.notice );
        emit(this,"AlertKilled", note);
      },
      onSoftkill:  function (data) {
        let note = this.nb.getNotificationWithValue(this.id);
        this.nb.removeNotification(this.notice);
        emit(this,"AlertSoftKilled", note);
      },
    };

    let { msg, id, icon, priority, buttons, callback, nb} = options;
    if (! buttons) buttons = [];
    if (! id) id =  "banner_" + uuid();
    if (! icon) icon = null; //'chrome://browser/skin/Info.png';
    if (nb) {
      this.nb = nb;
    } else {
      this.nb = notificationbox();
    }
    if ((typeof priority) === "string") {
        priority = nb[priority] || 1;  // TODO, throw here?
    } else {
        if (! priority) priority = 1;
    }

    EventTarget.prototype.initialize.call(this,defaults);

    // our AlertClose
    let that = this;
    if (callback === undefined) {
      callback = function(message) {
        if (message === "removed") {
          emit(that,'AlertClose',that.notice);
        } else {
          console.log(message, that)
          emit(that, message, that.notice);
        }
        return false;
      };
    }
    this.notice = this.nb.appendNotification(msg, id, icon,
        priority, buttons, callback);
  },
  type: 'Banner'
});

/*
    notification box buttons with standard names.

    TODO... allow for translations... browserBundle.GetStringFromName

    buttons just get a label, not an image, alas!

    Example of usage:

        banner({msg:"I want to do something", buttons=[buttonMaker.yes(
            {callback: function(nb,b) {doSomethingInAddonScope()})
            ]
        })

    Don't like the default labels?  Override them!

        banner({msg:"if you want this...", buttons=[buttonMaker.yes(
            {label: "click here"})
            ]
        })

    Or:

        banner({msg: "want to", buttons=[buttonMaker['click here?']()]});

*/
const buttonMaker = {
};

// this is gross... https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/NoSuchMethod
// but generates buttons with odd labels.  Only on *call* though!
buttonMaker.__noSuchMethod__ = function(method, args) {
  let newargs = mix({"label": method},args[0]);
  return this['yes'](newargs);
};


/*! make some standard buttons */
['yes','no','more','cancel','always','never','details'].forEach(
  function(label){
    let defaults = {
      label:     label,
      accessKey: null,
      popup:     null,
      callback:  function(aNotificationBar, aButton) {
        // TODO, a sensible default action?  maybe observer emit?
      }
    };
    let f = function(options) {
      if (!options) options = {};
      return mix(defaults,options); // TODO, sorry this is gross!
    };
    buttonMaker[label] = f;
});


/** all exports */
exports.notificationbox = notificationbox;
exports.banner = banner;
exports.buttonMaker = buttonMaker;
