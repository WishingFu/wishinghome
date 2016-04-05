function execute(request, response) {
	response.writeHead(200, {

	});
	response.write("Hello, this is mymod", "UTF-8");
	response.end();
}

console.log("Routed here mymod...");
exports.execute = execute;