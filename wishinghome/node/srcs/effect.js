$(document).ready(function() {
	$(document).onePageScroll();
	$("#left").vertical_tree_menu({
		menus : [
		{
			text : 1,
			link : "#",
			func : "openModalTest();",
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
});

function openModalTest() {	
	$(".modal").modal(true);
}