"use strict"
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
	$.inpage = {
		scrolls : {
			divs : [],
			configs : []
		},
		pages : [],
		page_index : -1,
		scroll_index : -1,
		basePercentage : 100,
		transB : new Date(),
		height : 0,
	}
	$.fn.extend({
		vertical_tree_menu : function(options) {
			var menus = options.menus;
			var h = "";
			if(menus && typeof menus === "object" && menus.length > 0) {
				h = getMenuHtml(menus);
			}
			$(this).html(h);
		},
		dynamicPages : function(options) {
			dpages = options.dpages;
		},
		inpageScroll : function(method, options) {
			$(this).each(function() {
				var $this = $(this);
				switch(method) {
					case "init" : +function(options) {
						// -------------------init---------------------
						var config;
						if(!$this.attr("data-scroll-index")) {
							$.inpage.scrolls.divs.push($this);
							$this.attr("data-scroll-index", $.inpage.scrolls.divs.length - 1);
							//----------------config params-------------------
							//---------- ppws : px per wheel scroll ----------
							//----------pn : this scroll position now---------
							//----------pm : this scroll position max---------
							//---------------wh : window height --------------
							//-----tb : this scroll transform begins time-----
							var defaults = {
								ppws : 80,
								onpageend : function(){console.log("default page end")},
								onpagebegin : function(){},
								pn : 0, pm : 0, wh : 0, tb : new Date(),
							}	
							config = $.extend({}, defaults, options);
							$.inpage.scrolls.configs.push(config);
						} else {
							var index = $this.attr("data-scroll-index");
							$.inpage.scrolls.configs[index] = $.extend({}, $.inpage.scrolls.configs[index], options);
							config = $.inpage.scrolls.configs[index];
						}
						$this.css("transition", "all 0.3s ease-out");	
						config.wh = $.inpage.height;
						config.pm = Number($this.css("height").replace("px", "")) - config.wh;
						$this.off("wheel");
						// ---------------------event-------------------
						$this.on("wheel", function(e) {
							var config = $.inpage.scrolls.configs[$this.attr("data-scroll-index")];
							if(new Date().getTime() - config.tb.getTime() < 0) {
								return;
							}
							config.tb = new Date();
							if(config.pm > 0) {
								if(e.originalEvent.deltaY > 0 && config.pn < config.pm - config.ppws) {
									config.pn += config.ppws;
									$this.css("transform", "translateY(-" + config.pn + "px)");
								} else if(e.originalEvent.deltaY > 0 && config.pn < config.pm) {
									config.pn = config.pm;
									$this.css("transform", "translateY(-" + config.pn + "px)");
									if(config.onpageend && typeof config.onpageend === "function") {
										config.onpageend(); scrollToNext();
									}
								} else if(e.originalEvent.deltaY < 0 && config.pn > config.ppws) {
									config.pn -= config.ppws;
									$this.css("transform", "translateY(-" + config.pn + "px)");
								} else if(e.originalEvent.deltaY < 0 && config.pn > 0) {
									config.pn = 0;
									$this.css("transform", "translateY(0)");
									if(config.onpagebegin && typeof config.onpagebegin === "function") {
										config.onpagebegin(); scrollToPrevious();
									}
								} else if(config.pn == 0){
									if(config.onpageend && typeof config.onpageend === "function") {
										config.onpagebegin(); scrollToPrevious();
									}
								} else if(config.pn < config.wh || config.pn === config.pm) {
									if(config.onpageend && typeof config.onpageend === "function") {
										config.onpageend(); scrollToNext();
									}
								}
							} else if (config.pm <= 0 && e.originalEvent.deltaY < 0) {
								if(config.onpagebegin && typeof config.onpagebegin === "function") {
									config.onpagebegin();scrollToPrevious();
								}
							} else {
								if(config.onpageend && typeof config.onpageend === "function") {
									config.onpageend(); scrollToNext();
								}
							}
						});
					}(options); break;
					// -----------------------------------------------------------------------
					case "resize" : +function(options) {
						var config = $.inpage.scrolls.configs[$this.attr("data-scroll-index")];
						config.wh = $.inpage.height;
						config.pm = Number($this.css("height").replace("px", "")) - $.inpage.height;
						if(config.pn > config.pm) {
							config.pn = config.pm;
							$this.css("transform", "translateY(-" + config.pn + "px)");
						}
					}(options); break;
					case "destroy" : +function(options) {
						$this.off("wheel");
					}(options); break;
				}
			});
		},
		onePageScroll : function() {
			$.inpage.pages = $(".page");	
			
			for(var i = 0; i < $.inpage.pages.length; i++) {
				if($($.inpage.pages[i]).hasClass("active")) $.inpage.index = i;
				$($.inpage.pages[i]).css("top", 100 * i + "%");
				$($.inpage.pages[i]).css("transition", "all 0.5s ease-out");
			}
			if($.inpage.page_index == -1) $.inpage.page_index = 0;
		},
		scrollToNext : function() {
			scrollToNext();
		},
		scrollToPrevious : function() {
			scrollToPrevious();
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
			var defaults = {

			}
			$.extend({}, defaults, options);
		},
		clock : function(options) {
			var defaults = {

			}
			var config = $.extend({}, defaults, options);
			clock = $(this)[0];
			c = clock.getContext("2d");
			initCanvas(c);
			timeInterval = setInterval(function() {
				c.clearRect(0, 0, 550, 500);
				drawClockByTimeNow(c);
			}, 100);
		}
	})
	// Clock------------------------
	function initCanvas(c) {
		c.strokeStyle = "rgba(152, 34, 155, 0.5)";
		c.shadowColor = "black";
		c.globalAlpha = 0.8;
		c.lineWidth = 5;
		c.shadowOffsetX = 5;
		c.shadowOffsetY = 3;
		c.shadowBlur = 3;
	}

	function drawClockByTimeNow(c) {
		var now = new Date();
		var h = now.getHours();
		var m = now.getMinutes();
		var s = now.getSeconds();
		var M = now.getMilliseconds();
		
		s_angle = ( s + M / 1000 ) * 2 * Math.PI / 60;
		m_angle = ( m + s / 60 ) * 2 * Math.PI / 60;
		h_angle = ( h + m / 60 ) * 2 * Math.PI / 12;
		
		c.save();
		c.beginPath();
		c.translate(clock.width / 2, clock.height / 2);
		c.rotate(- Math.PI / 2);
		c.moveTo(0, 0);
		c.arc(0, 0, 4, 0, 2 * Math.PI, false);
		c.fill();
		c.moveTo(0, 0);
		c.lineTo(100* Math.cos(s_angle), 100* Math.sin(s_angle));
		c.moveTo(0, 0);
		c.lineTo(80 * Math.cos(m_angle), 80 * Math.sin(m_angle));
		c.moveTo(0, 0);
		c.lineTo(60 * Math.cos(h_angle), 60 * Math.sin(h_angle));
		
		c.closePath();
		c.stroke();
		c.restore();
	}
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
	// End clock ----------------------
	// Scroll in one page -------------
	function scrollToNext() {
		if(new Date().getTime() - $.inpage.transB.getTime() < 500) {
			return;
		}
		if($.inpage.page_index < $.inpage.pages.length - 1) {
			$.inpage.page_index++;
			$("body").css("transform", "translateY(-" + $.inpage.basePercentage * (Number($.inpage.page_index)) + "%)");
			$.inpage.transB = new Date();	
		}
	}

	function scrollToPrevious() {
		if(new Date().getTime() - $.inpage.transB.getTime() < 500) {
			return;
		}
		if($.inpage.page_index > 0) {
			$.inpage.page_index--;
			$("body").css("transform", "translateY(-" + $.inpage.basePercentage * (Number($.inpage.page_index)) + "%)");
			$.inpage.transB = new Date();
		}
	}
	// End -----------------------------
	// Init ----------------------------
	$(window).resize(function(e) {
		init();
		for(var i in $.inpage.scrolls.divs)
			$.inpage.scrolls.divs[i].inpageScroll("resize");
	});
	function init() {
		$.inpage.height = window.innerHeight;
		$(".page").css("min-height", $.inpage.height);
		$(".page").css("height", "auto");
		$(".modal").css("height", $.inpage.height);
		$(".page-modal").css("height", $.inpage.height);
		$("body").css("transition", "all 0.7s ease-out");
		$("body").css("height", $.inpage.height);
	}
	$(".close-modal").click(function() {
		$(this).parent(".modal").modal(false);
	});
	$(".open-modal").click(function() {
		var modal = $(this).attr("data-modal");
		$(".modal[data-modal='" + modal + "']").modal(true);
	});
	init();
	// End -----------------------------
}(jQuery);