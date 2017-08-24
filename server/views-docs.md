## Views

This documents the structure-in-progress for handling views in Screenshots, and with isomorphic React rendering generally.

### Goals

We want:

1. To keep the dependency graph separated out for the browser and the server.  Things to be used in the browser should never depend on the server or even refer to it (so server-oriented code isn't bundled).  Things to be used on the server should not import browser-oriented code.
2. Some code should be shared between server and browser.
3. We want to gracefully handle the *model* between server and browser.
4. Only the server needs to know how to *instantiate* the model.
5. Only the browser needs to know how to *update* the model (the server will simply reinstantiate).
6. The model should represent everything we need to know about rendering the page.
  7. Except for some transient states created for the purposes of user-input.

### Components

There are five components of a typical page:

#### 1. The declaration (`page.js`):

This is declarative, and represents the "page", essentially all the components listed below.  It is usable from the browser and client.

Must export `page` (an instance of `reactruntime.Page`)

#### 2. The server model (`model.js`):

This instantiates the model based on a request.  The model is JSONable.  It also implements data-oriented routines, such as page-specific database queries.

This must export `createModel(req)`.  This should look like:

```javascript
exports.createModel = function (req) {
  return db.doSomething().then((result) =>
    return {
      someValue: result
      title: "A page"
    };
  };
};
```

Besides `title` nothing is required in the model.

#### 3. The server controller (`server.js`):

This handles routing and responding to the initial request.  This instantiates the model (from `model.js`) and uses that to render the page.  This also implements any API endpoints that are used by the browser to update data (though the actual updating typically will take place in `model.js`).

This must export `app` (an Express application that will be mounted).

#### 4. The view (`view.js`):

This is shared between the server and the browser.  It is a module that exports React components for the head and body.  It has event handlers; these handlers should parse any input (e.g., extract the value of a form field), but to *do* anything they simply call `controller.onSomething(value)`.

This must export `HeadFactory` and `BodyFactory` (see `reactruntime.HeadTemplate` for how these should work).

#### 5. The browser controller (`controller.js`):

This handles events, managing the model on the browser side, making requests to APIs, and generally all the logic in the browser.  It effectively manages the model on the browser (there is not a separate module for this).

This must *assign* `window.controller` (instead of exporting, like `window.controller = exports`), and must export `launch(model)`.  The basic form of the code should be:

```javascript
const page = require("./page").page;

let model;

exports.launch = function (m) {
  model = m;
  render();
};

function render() {
  page.render(model);
}

exports.onSomething = function (value) {
  model.something = value;
  render();
};

window.controller = exports;
```

### Helpers/glue

To put these all together we have several modules:

#### `reactruntime`

This is used primarily in the browser, though it is also used on the server.

##### `reactruntime.Page`

This class is what you instantiate to get `page.page`.  Currently it is fairly minimal:

```javascript
exports.page = new Page({
  dir: __dirname
});
```

Everything else is implied by the standard module names in the directory.

##### `reactruntime.HeadTemplate` / `reactruntime.BodyTemplate`

This is the component you should used in your own `view.HeadFactory`:

```javascript
const {HeadTemplate, BodyTemplate} = require("../../reactruntime");
class Head extends React.Component {
  render() {
    return (
      <HeadTemplate {...this.props}>
        <script src={this.props.staticLink("/static/js/controller.js")}></script>
        <link href={this.props.staticLink("/static/css/mypage.css")} />
      </HeadTemplate>
    );
  }
}
class Body extends React.Component {
  render() {
    return (
      <BodyTemplate {...this.props}>
        Some markup
      </BodyTemplate>
    );
  }
}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
```

#### `reactrender.render`

This is used on the server side, like:

```javascript
const reactrender = require("reactrender");

app.get("/something", function (req, res) {
  const page = require("./page").page;
  reactrender.render(req, res, page);
});
```

This handles calling the model instantiation, instantiating the views, and gluing that all together into a page.

It also sets up `this.props.staticLink` on the client and server.

### Making

The make process is kind of crude, mostly because how browserify fits in is pretty crude.  A problem with respect to browserify is that `require()` with dynamic arguments does not work well (even if the module is actually available in the bundle).  You'll note a superfluous require in `reactruntime` to work around this problem.

Also each browserify bundle is independently enumerated and handled in the `Makefile`.  

I'm thinking of scanning for `server/src/pages/*/page.js` and generating Makefile statements from that, but that makes me somewhat sad.
