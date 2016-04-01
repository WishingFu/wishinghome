var server = require("./server");
var route = require("./router");
server.start(8888, route);