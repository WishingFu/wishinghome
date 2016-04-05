function execute(pathname, request, response) {
	response.writeHead(200, {
		"Content-Type" : "application/json"
	});
	response.write('{"numbers" : "2"}');
	response.end();
}

console.log("Routed here data...");
exports.execute = execute;