var width = window.innerWidth;
var height = window.innerHeight;

$(document).ready(function() {
	$(".page").each(function() {
		$(this).css("width", width);
		$(this).css("height", height);
	})
})