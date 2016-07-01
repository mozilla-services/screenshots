var main = require("../lib/main");

exports["test main"] = function(assert) {
  assert.pass(main.getBackend(), "getBackend returned something");
  assert.pass("Unit test running!");
};

exports["test fail"] = function(assert) {
  assert.pass(false, "This should fail");
};

/*exports["test main async"] = function(assert, done) {
  assert.pass("async Unit test running!");
  done();
};*/

require("sdk/test").run(exports);
