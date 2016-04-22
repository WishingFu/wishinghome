var fs = require("fs");
function execute(pathname, request, response) {
	pathname = "./" + pathname.replace(/\/\w+\//, "");
	fs.readFile(pathname + "/index.html", function(err, data){
		console.log("-------------------------Html File Request-------------------");
		console.log("----Request Path : " + pathname + "/index.html---------------");
		if(err) {
			response.writeHead(404, {'Content-Type': 'text/html'});
			response.write("<h3>The request URL " + pathname + " was not found on this server.</h3>");
			response.end();
			return false;
		}
		response.setHeader("Content-Type", "text/html");
		response.write(data);
		response.end();
		console.log("-----------------------Html File Request End-----------------");
	})
}

console.log("Routed here html file request...");
exports.execute = execute;