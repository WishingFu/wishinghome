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
+function($) {
	$.fn.extend({
		vertical_tree_menu : function(options) {
			var menus = options.menus;
			var h = "";
			if(menus && typeof menus === "object" && menus.length > 0) {
				h = getMenuHtml(menus);
			}
			$(this).html(h);
		},
		onePageScroll : function() {
			pages = [];
			page_index = -1;
			basePercentage = 0;
			transB = new Date();

			$("html").css("overflow", "hidden");
			pages = $(".page");
			var pages_length = pages.length;
			basePercentage = 100 / pages_length;
			for(var i = 0; i < pages_length; i++) {
				if($(pages[i]).hasClass("active")) {
					page_index = i;
				}
				$(pages[i]).css("height", height);
				$(pages[i]).css("transition", "all 0.5s ease-out");
			}
			if(page_index == -1) page_index = 0;
			$("body").css("transform", "translateY(-" + basePercentage * (Number(page_index)) + "%)");
			$("html").off("wheel");
			$("html").on("wheel", function(e) {
				if(e.originalEvent.deltaY > 0) {
					scrollToNext();
				} else if(e.originalEvent.deltaY < 0) {
					scrollToPrevious();
				}
			})
		},
		modal : function(flag) {
			if(flag) {
				$(this).children(".modal-content").css("animation", "show-modal 0.56s ease-out");
				$(this).css("display", "block");
			} else {
				$(".modal-content").css("animation", "close-modal 0.56s ease-out");
				setTimeout(function() {
					$(".modal").css("display", "none");
				}, 500);
			}
		},
		list : function(options) {
			defaults = {

			}
			$.extend({}, this.defaults, options);

		}
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
			if(subs && typeof subs === "object" && subs.length) {
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
	//scroll in one page --------------
	function scrollToNext() {
		if(new Date().getTime() - transB.getTime() < 500) {
			return;
		}
		scroll_flag = true;
		if(page_index < pages.length - 1) {
			page_index++;
			$("body").css("transform", "translateY(-" + basePercentage * (Number(page_index)) + "%)");
			transB = new Date();	
		}
	}

	function scrollToPrevious() {
		if(new Date().getTime() - transB.getTime() < 500) {
			return;
		}
		scroll_flag = true;
		if(page_index > 0) {
			page_index--;
			$("body").css("transform", "translateY(-" + basePercentage * (Number(page_index)) + "%");
			transB = new Date();
		}
	}
	// ---------------------------------
	// INIT-----------------------------
	$(window).resize(function(e) {
		init();
		$(document).onePageScroll();
	});
	function init() {
		width = window.innerWidth;
		height = window.innerHeight;
		$(".modal").css("height", height);
		$(".page-modal").css("height", height);
		$("body").css("transition", "all 0.7s ease-out");
	}
	$(".close-modal").click(function() {
		$(this).parent(".modal").modal(false);
	});
	$(".open-modal").click(function() {
		var modal = $(this).attr("data-modal");
		$(".modal[data-modal='" + modal + "']").modal(true);
	});
	init();
	// ---------------------------------
}(jQuery);