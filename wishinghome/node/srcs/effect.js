$(document).ready(function() {
	$(document).onePageScroll();
	$("#clock").clock();
	$("#left").vertical_tree_menu({
		menus : [
		{
			text : 1,
			link : "#",
			subs : [{
				text : "1 - 1",
				link : "#",
				subs : [{
					text : "1 - 1 - 1",
					link : "#"
				}, {
					text : "1 - 1 - 2",
					link : "#"
				}]
			}, {
				text : "1 - 2",
				link : "#",
				subs : [{
					text : "1 - 2 - 1",
					link : "#"
				}]
			}]
		}, {
			text : 2,
			link : "#",
			subs : [{
				text : "2 - 1",
				link : "#"
			}, {
				text : "2 - 2",
				link : "#"
			}]
		}, {
			text : 3,
			link : "#",
		}]
	});

	var mcanvas = $("#mcanvas")[0];
	var mc = mcanvas.getContext("2d");
	
});

function openModalTest() {	
	$(".modal").modal(true);
}

function restartSanke() {
	snakeF.contentWindow.gameInit();
}
