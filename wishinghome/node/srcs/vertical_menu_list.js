/*
	options ==> {
		... : ...,
		menus : [
		{
			text : 1,
			link : "#",
			subs : [{
				text : "1 - 1",
				link : "#"
			} , {
				text : "1 - 2",
				link : "#"
			}]
		} , {
			text : 2,
			link : "#",
			subs : [{
				text : "2 - 1",
				link : "#"
			},{
				text : "2 - 2",
				link : "#"
			}]
		}]
	}
*/
(function($){
	$.fn.extend({
		vertical_tree_menu : function(options) {
			var menus = options.menus;
			var h = "";
			if(menus && typeof menus === "object" && menus.length > 0) {
				h = getMenuHtml(h, menus);
			}
			console.log(h);
			$(this).html(h);
		},
	})

	function getMenuHtml(h, menus) {
		if(!menus || !menus.length) {
			return "";
		}
		h = '<ul class="menu-vertical-list">';
		for(var j = 0; j < menus.length; j++) {
			var text = menus[j].text;
			var link = menus[j].link;
			if(typeof link === "function") {
				var subs = menus[j].subs;
				if(subs && typeof subs === "object" && subs.length > 0) {
					h += '<li><a href="#" onclick="' + link + '"> ' + text + ' </a>';
					h +=	getMenuHtml(h, subs);
					h += '</li>';
				} else {
					h += '<li><a href="#" onclick="' + link + '"> ' + text + ' </a></li>';
				}
			} else if(typeof link === "string") {
				var subs = menus[j].subs;
				if(subs && typeof subs === "object" && subs.length > 0) {
					h += '<li><a href="' + link + '"> ' + text + ' </a>';
					h +=	getMenuHtml(h, subs);
					h += '</li>';
				} else { 
					h += '<li><a href="' + link + '"> ' + text + ' </a></li>';
				}
			}
		}
		h += "</ul>";
		return h;
	}
})(jQuery);