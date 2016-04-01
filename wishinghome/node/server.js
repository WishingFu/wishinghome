var http = require("http");

function start(port, router) {
	http.createServer(function(request, response) {
		response.writeHead(200, {"content-type" : "text/html"});
		router.route(request, response);
		response.write("Hello world");
		response.end();
	}).listen(port);
}

exports.start = start;