This is the root of the add-on.  This add-on is an [Embedded Extension](https://developer.mozilla.org/Add-ons/WebExtensions/Embedded_WebExtensions), which means we have a [Bootstrap Extension](https://developer.mozilla.org/Add-ons/Bootstrapped_extensions) that wraps a [WebExtension](https://developer.mozilla.org/Add-ons/WebExtensions).

The bootstrap extension lives in this directory (in `bootstrap.js`), along with `install.rdf` that describes this add-on.  The WebExtension lives in `webextension/`.  We try to do everything we can in the WebExtension and only do things in bootstrap.js that can't be done from a WebExtension.

Note in normal development you don't need to run the bootstrap portion.  That is, if you run:

```sh
$ ./bin/run-addon
```

then only the WebExtension will be run.  This is easier to debug, and supports reloading.  If you are developing something in `bootstrap.js` you must run:

```sh
$ ./bin/run-addon --bootstrap
```

You have to hit ^C and restart if you change code.
