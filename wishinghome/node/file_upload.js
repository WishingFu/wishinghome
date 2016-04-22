var fs = require("fs");
function execute(pathname, request, response) {
	var cha;
	var begin;
	var end;
	request.on("data", (data) => {
		if(err) throw err;
	});
	response.writeHead(200, {
		"Content-Type" : "text/plain"
	});
	response.write('{"result" : "succeed..."}');
	response.end();
}

console.log("Routed here file upload...");
exports.execute = execute;