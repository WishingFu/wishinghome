var width = window.innerWidth;
var height = window.innerHeight;
var c;
var pages;
var page_index;
var scroll_flag = false;

$(document).ready(function() {
	pages = $(".page");
	for(var i = 0; i < pages.length; i++) {
		if($(pages[i]).hasClass("active")) {
			page_index = i;
			break;
		}
	}
	$(".page").each(function() {
		$(this).css("width", width);
		$(this).css("height", height);
	})
	
	$(".page").on("wheel", function(e) {
		e.originalEvent.deltaY
		if(e.originalEvent.deltaY > 0) {
			scrollToNext();
		} else if(e.originalEvent.deltaY < 0) {
			scrollToPrevious();
		}
	})
	
	$("#canvas").css("background-color", "white");
	c = document.getElementById("canvas").getContext("2d");
	initC();
});
var angle = 1;
function scrollToNext() {
	if(scroll_flag) {
		return;
	}
	scroll_flag = true;
	if(page_index < pages.length - 1) {
		$(pages[page_index]).css("display", "none");
		$(pages[page_index + 1]).css("display", "block");
		page_index++;
		setInterval(function() {
			c.clearRect(0, 0, 600, 400);
			c.save();
			c.beginPath();
			c.translate(300, 200);
			c.rotate(angle * Math.PI / 30);
			c.moveTo(0, 0);
			c.arc(0, 0, 3, 0, 2 * Math.PI, false);
			c.closePath();
			c.stroke();
			c.beginPath();
			c.lineTo(0, 100);
			c.closePath();
			c.stroke();
			c.restore();
			angle++;
		}, 1000);
	}
	scroll_flag = false;
}

function scrollToPrevious() {
	if(scroll_flag) {
		return;
	}
	scroll_flag = true;
	if(page_index > 0) {
		$(pages[page_index]).css("display", "none");
		$(pages[page_index - 1]).css("display", "block");
		page_index--;
	}
	scroll_flag = false;
}
function initC() {
	c.strokeStyle = "rgba(152, 34, 155, 0.5)";
	c.shadowColor = "black";
	c.lineWidth = 5;
	c.shadowOffsetX = 7;
	c.shadowOffsetY = 5;
	c.shadowBlur = 3;
}