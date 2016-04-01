var url = require("url");

/*
	pathname ==> "/mod/params";
*/
function route(request, response) {
	var pathname = url.parse(request.url).pathname;
	if(pathname.indexof("/") !== -1) {
		var paths = pathname.split("/");
		var lastPath = paths[paths.length - 1];
		if(lastPath.indexof(".") !== -1) {
			var requestType = lastPath.split(".")[1];
			if(typeof requestType === "undefined" || requestType === "") {
				//TODO
			} else if(requestType === ""){

			}
		} else {
			var mod = require("./" + params[1]);
			mod.execute(request, response);
		}
	}
}

exports.route = route;