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
	$(".page-modal").modal(true);
	$(".modal-content").css("animation", "show-modal 0.5s ease-out");
}