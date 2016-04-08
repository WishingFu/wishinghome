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
				h = getMenuHtml(menus);
			}
			$(this).html(h);
		},
	})

	function getMenuHtml(menus) {
		if(!menus || !menus.length) {
			return "";
		}
		var h = '<ul class="menu-vertical-list">';
		for(var j = 0; j < menus.length; j++) {
			var text = menus[j].text;
			var func = menus[j].func;
			var link = menus[j].link;
			var subs = menus[j].subs;
			if(!func) {
				func = "";
			}
			if(!link) {
				link = "#";
			}
			if(subs && typeof subs === "object" && subs.length > 0) {
				h += '<li><a href="' + link + '" onclick="' + func + '"> ' + text + ' </a>';
				h +=	getMenuHtml(subs);
				h += '</li>';
			} else {
				h += '<li><a href="' + link + '" onclick="' + func + '"> ' + text + ' </a></li>';
			}
		}
		h += "</ul>";
		return h;
	}
})(jQuery);