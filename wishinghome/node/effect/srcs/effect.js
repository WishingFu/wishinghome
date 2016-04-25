"use strict"
$(document).ready(function() {
	$("body").dynamicPages({
		dpages: ["article", "shake"]
	});
	$().onePageScroll();
	$(".page").inpageScroll("init");
	$("#page_2").inpageScroll("init", {
		onpageend : function() {
			$.ajax({
				url : "../hf/effect/article",
				type: "get",
				success: function(data) {
					console.log("page 2 end");
					$("#page_2").append(data);
					$("#page_2").inpageScroll("resize");
				}
			})
		}
	})
	// $("#clock").clock();
	// var mcanvas = $("#mcanvas")[0];
	// var mc = mcanvas.getContext("2d");
	// setInterval(function() {
	// 	mc.clearRect(0, 0, mcanvas.width, mcanvas.height);
	// 	something(mc);
	// }, 5);
	$(".article").change(function(e) {
		console.log($("input[name='testFile']"));
	})
});

function something(mc) {
	var m = mc.canvas;
	var t = (new Date().getMilliseconds()) / 1000 * Math.PI ;
	var s = - Math.cos( 2 * t );
	var o = s * Math.PI / 6;
	var ac = Math.asin(15 / 200);
	var abs = Math.abs(o - Math.PI / 2);
	drawMovingBall(mc, o);
}

function drawMovingBall(mc, o) {
	var m = mc.canvas;
	mc.save();
	mc.translate(m.width / 2, 100);
	mc.rotate(o);
	drawBall(mc);
	mc.restore();
}
function drawBall(mc) {
	mc.beginPath();
	mc.moveTo(0, 0);
	mc.arc(0, 0, 4, 0, 2 * Math.PI, false);
	mc.moveTo(0, 0);
	mc.lineTo(0, 200);
	mc.moveTo(0, 200);
	mc.arc(0, 200, 15, 0, 2 * Math.PI, false);
	mc.closePath();
	mc.stroke();
	mc.fill();
}

function testFileUpload() {
	var data = new FormData($("#test_form")[0]);
	$.ajax({
		url : "./file_upload/",
		processData: false,
		type: "post",
		dataType: "json",
		data : data,
		success: function(data) {
			alert(data.result);
		}
	});
}

function openModalTest() {	
	$(".modal").modal(true);
}

function restartSanke() {
	snakeF.contentWindow.gameInit();
}

// $("#left").vertical_tree_menu({
// 		menus : [
// 		{
// 			text : 1,
// 			link : "#",
// 			subs : [{
// 				text : "1 - 1",
// 				link : "#",
// 				subs : [{
// 					text : "1 - 1 - 1",
// 					link : "#"
// 				}, {
// 					text : "1 - 1 - 2",
// 					link : "#"
// 				}]
// 			}, {
// 				text : "1 - 2",
// 				link : "#",
// 				subs : [{
// 					text : "1 - 2 - 1",
// 					link : "#"
// 				}]
// 			}]
// 		}, {
// 			text : 2,
// 			link : "#",
// 			subs : [{
// 				text : "2 - 1",
// 				link : "#"
// 			}, {
// 				text : "2 - 2",
// 				link : "#"
// 			}]
// 		}, {
// 			text : 3,
// 			link : "#",
// 		}]
// 	});