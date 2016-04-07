var path = require("path");
var fs = require("fs");
var contentType = require("./mimes").mime;
/*	pathname ==> "/mod/params" */
function route(pathname, request, response) {
	try {
		var extname = path.extname(pathname);
		if(pathname === "/") {
			this.route("./index.html", request, response);
		} else if(extname !== "" && extname !== ".") {
			console.log(pathname);
			// extname = extname.indexOf("?") === -1 ? extname : extname.substring(0, extname.indexOf("?"));
			fs.readFile("./" + pathname, function(err, data){
				if(err) {
					response.writeHead(404, {'Content-Type': 'text/plain'});
					response.write("This request URL " + pathname + " was not found on this server.");
					response.end();
					return false;
				}
				response.setHeader("Content-Type", contentType[extname]);
				response.write(data);
				response.end();
			})
		} else if(extname === "."){
			pathname = pathname.substring(0, pathname.length - 1);
			this.route(pathname, request, response);
		} else {
			var requireType = path.basename(pathname);
			var mod = require("./" + pathname.split("/")[1]);
			mod.execute(pathname, request, response);
		}
	} catch(e) {
		console.log(e);
		response.writeHead(500, {'Content-Type': 'text/plain'});
        response.write("There is something wrong happened..");
        response.end();
	}
}

exports.route = route;