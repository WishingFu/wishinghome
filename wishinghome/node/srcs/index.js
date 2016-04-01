var width = window.innerWidth;
var height = window.innerHeight;
var canvas;
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
		if(e.originalEvent.deltaY > 0) {
			scrollToNext();
		} else if(e.originalEvent.deltaY < 0) {
			scrollToPrevious();
		}
	})
	
	$("#canvas").css("background-color", "white");
	canvas = document.getElementById("canvas");
	c = canvas.getContext("2d");
	initC();
	timeInterval = setInterval(function() {
		c.clearRect(0, 0, 600, 400);
		drawClockByTimeNow();
	}, 100);
});
var timeInterval;
function scrollToNext() {
	if(scroll_flag) {
		return;
	}
	scroll_flag = true;
	if(page_index < pages.length - 1) {
		$(pages[page_index]).css("display", "none");
		$(pages[page_index + 1]).css("display", "block");
		page_index++;
		if(typeof timeInterval === "undefined") {
			
		}
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
	c.globalAlpha = 0.8;
	c.lineWidth = 5;
	c.shadowOffsetX = 5;
	c.shadowOffsetY = 3;
	c.shadowBlur = 3;
}

var s_angle;
var m_angle;
var h_angle;
function drawClockByTimeNow() {
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
	c.translate(canvas.width / 2, canvas.height / 2);
	c.rotate(- Math.PI / 2);
	c.moveTo(0, 0);
	c.arc(0, 0, 4, 0, 2 * Math.PI, false);
	c.fill();
	c.moveTo(0, 0);
	c.lineTo(100 * Math.cos(s_angle), 100 * Math.sin(s_angle));
	c.moveTo(0, 0);
	c.lineTo(80 * Math.cos(m_angle), 80 * Math.sin(m_angle));
	c.moveTo(0, 0);
	c.lineTo(60 * Math.cos(h_angle), 60 * Math.sin(h_angle));
	
	c.closePath();
	c.stroke();
	c.restore();
}