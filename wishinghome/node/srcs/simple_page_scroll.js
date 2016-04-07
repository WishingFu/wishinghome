var width = window.innerWidth;
var height = window.innerHeight;
var pages;
var page_index;
var basePercentage;
var transB = new Date();
$(document).ready(function() {
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
	
	$("html").on("wheel", function(e) {
		if(e.originalEvent.deltaY > 0) {
			scrollToNext();
		} else if(e.originalEvent.deltaY < 0) {
			scrollToPrevious();
		}
	})
	$("body").css("transition", "all 0.5s ease-out");
	$(".page-modal").css("height", height);
});

function scrollToNext() {
	if(new Date().getTime() - transB.getTime() < 500) {
		return;
	}
	scroll_flag = true;
	if(page_index < pages.length - 1) {
		console.log(page_index);
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