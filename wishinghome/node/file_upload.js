function execute(pathname, request, response) {
	request.on("data", (data) => {
		console.log(new String(data));
	});
	response.writeHead(200, {
		"Content-Type" : "text/plain"
	});
	response.write('{"result" : "succeed..."}');
	response.end();
}
console.log("Routed here file upload...");
exports.execute = execute;