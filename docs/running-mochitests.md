# Running Mochitests

Firefox Screenshots is developed in GitHub, but on each release we export into the Firefox
source tree.

Currently the only way to run the mochitests is by exporting the add-on to
mozilla-central and running them there.

Here's how to run them:

* Follow the [Export to Firefox](https://github.com/mozilla-services/screenshots/blob/master/docs/export-to-firefox.md)
document.
* Build Firefox, then run the tests:

```sh
$ cd ~/src/gecko
$ ./mach build
$ ./mach test browser/extensions/screenshots/
```

You can run a single test by providing the full path to the test.

For debugging, it is usually best to add a `debugger;` statement in the code, then
run the test with:

```sh
$ ./mach mochitest --jsdebugger browser/extensions/screenshots/test/browser/browser_test_name.js
```

You'll need to click the "Run Test" button, and then the test should run but
stop on the `debugger;` statement.
