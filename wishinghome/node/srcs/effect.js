$(document).ready(function() {
	// $(".menu_block").click(function(e) {
	// 	$(".menu_block_content").css("display", "block");
	// })
	// $(".menu_block_content").mouseout(function(e) {
	// 	$(this).css("display", "none");
	// })

	// $(".page").each(function() {
	// 	var width = $(this).css("width");
	// 	var margin = max_width - width;
	// 	var margin_percent = margin / max_width / 2;
	// 	$(this).css("margin", "0px " + margin_percent + "%");
	// })

	$(".glyphicon-circle-arrow-left").click(function() {
		$(".modal-content").css("animation", "close-modal 0.56s ease-out");
		setTimeout(function() {
			$(".modal").modal(false);
		}, 500);
	});

	$("#left").vertical_tree_menu({
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
	});
});
(function($){
	$.fn.extend({
		modal : function(flag) {
			if(flag) {
				$(this).css("display", "block");
			} else {
				$(this).css("display", "none");
			}
		},
	})
})(jQuery);


function openModalTest() {	
	$(".modal-content").css("animation", "show-modal 0.5s ease-out");
	$(".modal").modal(true);
}