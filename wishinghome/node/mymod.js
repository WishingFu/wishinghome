function execute(pathname, request, response) {
	response.writeHead(200, {
		"Content-Type" : "text/plain"
	});
	response.write('"numbers" : "2"');
	response.end();
}
console.log("Routed here mymod...");
exports.execute = execute;