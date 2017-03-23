# Error Handling

In Screenshots we try to capture all unexpected failures for the purpose of reporting (and hopefully for fixing!)

## Catching

To do this we have to wrap anything that *won't* report the error.  That means:

* Any callbacks or event listeners
* Any promises that aren't returned and where there's not another explicit `.catch()` handler

Not everything has to be wrapped!  You can assume that any function you write in Screenshots will normally be called by another Screenshots function, and it's the caller's responsibility to catch an exception.  Similarly if you return a Promise, it is the caller's responsibility to catch errors from the Promise.

*At the point* where you pass a Screenshots function to some code that will call the function, but *doesn't* know how to report errors (such as adding an event listener), then you have to wrap that function.  Also, if you know a promise won't be returned and will be thrown away after it completes, you must wrap that promise.

Also, if there are recoverable but unexpected errors you can report an error explicitly.

### The `catcher` module

The [catcher](../addon/webextension/catcher.js) module is loaded in both the content/worker process and in the background page.  Errors from the content process are sent to the background page, but this should be transparent to you.

#### `catcher.watchFunction`

If you have a function that should be watched, use `catcher.watchFunction(func)`:

```js
document.addEventListener("click", catcher.watchFunction(myCallback));
```

This wraps the function (but does not call it!) so that any exceptions are reported and then re-thrown.

Note that this will erase implicit `this` bindings, so you may need to do:

```js
document.addEventListener("click", catcher.watchFunction(this.onClick.bind(this)));
```

Also note that this changes the identity of a function, so sometimes you have to be even more explicit:

```js
let watchedMyCallback = catcher.watchFunction(myCallback);
document.addEventListener("click", watchedMyCallback);
// later...
document.removeListener("click", watchedMyCallback);
```

#### `catcher.watchPromise`

If something is the last caller of a promise, then it should watch any promises.  For example:

```js
function myCallback() {
  catcher.watchPromise(startSomething().then(() => {
    return nextThing();
  }).then((result) => {
    if (! result.ok) {
      throw new Error("Something went wrong!");
    }
  }));
}
```

Put `catcher.watchPromise()` around the entire promise chain.  Throw errors in any handler and it will get reported.

#### `catcher.unhandled`

If you want to report an error but continue on, you should use something like this:

```js
function doStuff(foo) {
  try {
    someOtherFunction({context: foo});
  } catch (e) {
    if (e.name == "STRANGE_ERROR") {
      catcher.unhandled(e, {context: foo});
    }
  }
}
```

If you don't have an exception object, create a new one with `new Error("Error Name")`

The second argument is additional information you can add to the report.

## Formatting a good error

Each error should be an exception.  If you get a natural exception then use that, but if you are creating one:

**Use a fixed error string.**  E.g., `new Error("Response failed")`, not `new Error("Error for " + url + " failed")`.  Sentry groups errors based on the exception string.

**Use an error object**, not a string.  I.e., never do `throw "there was an error"`.  This is always good practice!

**Add extra information**, either to the exception object, or as a second argument when calling `catcher.unhandled(exc, extraInfo)`.

When adding information to an exception object, simply add attributes, such as:

```js
let exc = new Error("Error in request");
exc.responseStatusCode = req.status;
exc.headerNames = Object.keys(headers);
```

Note that any information will be serialized as JSON.  Specifically `undefined` will be lost in JSON serialization.

If you add `exc.popupMessage = "Something happened"` then that detail will be added.  Be careful about localization here.

Add `exc.noPopup = true` if you don't want the user notified about the error (but the error will still be sent to Sentry).
