// FIXME: make sure page is fully loaded?
var data = documentStaticData();
self.port.emit("data", data);
