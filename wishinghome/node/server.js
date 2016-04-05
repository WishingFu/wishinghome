var http = require("http");
var url = require("url");
function start(port, router) {
	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		router.route(pathname, request, response);
	}).listen(port);
}

exports.start = start;