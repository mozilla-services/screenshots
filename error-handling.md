# Error Handling

Specifically in the addon it is challenging to handle error handling in all the many execution environments that exist.  To handle this we need to be careful to catch errors wherever they happen and let them emerge in some sensible way.

Errors should take the form of:

```javascript
{
  name: "ERROR_NAME",
  message: "description for programmer",
  help: "description for the user",
  helpHtml: "rich description for the user"
}
```

The `name` should be stable, and is what you might check against when you think you may be able to handle some kinds of errors.  The `help` and optional `helpHtml` keys are something that can be shown to the user.  These may be useful to rewrite as errors are caught and re-raised.

These error objects must frequently cross process boundaries, so we can't expect any special object representation, only a raw JSONable object.

## Where to send errors

Errors should all propagate to the addon.  (Question: should they?  Alternately some could go to the addon, and others could be handled in content when you are viewing a pageshot page.)

Errors come in in several ways:

### Content

Content that has a helper associated with it should call:

```javascript
var event = document.createEvent("CustomEvent");
event.initCustomEvent("error", true, true, errorObject);
document.dispatchEvent(event);
```

A page worker should be attached to the page that will catch that event and route it to the addon.

### framescript

A framescript should return a value like:

```javascript
sendAsyncMessage("pageshot@messageName:return", {
  error: {
    name: "ERROR", ...
  }
});
```

This should be handled by `lib/framescripter.js`

### worker

An addon worker should do:

```javascript
self.port.emit("alertError", {name: "ERROR", ...});
```

### Addons

If code in an addon receives an error and cannot handle it, it should call:

```javascript
require("errors").unhandled(errorObject);
```

Generally you should use `watchPromise()` if you call `promise.then(success)` and don't include any failure handler.  You should call `watchWorker(worker)` on every worker you create.  And you should add `watchFunction()` around any function that is called in an event handler.  These are all examples of cases when your code is either being called by something that won't handle errors (like a Jetpack event invoker), or we need to wire up processes, or we are clearly ignoring a value.

Generally if you return a promise, you don't need this error handling if you simply call `.reject()` properly.  We should be on the lookout for cases when a promise return value is entirely ignored, as that's harder to detect than an incomplete invocation of `.then(success)`

## Helpers

Everything described here can be a bit challenging.  Some helpers exist:

```javascript
const { watchPromise, watchFunction, watchWorker, watchRun } = require("errors");

// Adds a .reject() handler to the promise
watchPromise(deferred.promise);

// Wraps the function (preserving this and arguments), catches any errors, and if
// a promise is returned it wraps the promise
{
  method: watchFunction(function () {
    return deferred.promise;
  })
}

// Watches the worker, listening for `worker.port.on("error")`, returns the worker
watchWorker(worker);

// Executes the function immediately, catching any errors:
watchRun(function () {
  // ...
}, this);
```
