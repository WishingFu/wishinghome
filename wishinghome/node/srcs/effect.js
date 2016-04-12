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
	something(mc);
});

function openModalTest() {	
	$(".modal").modal(true);
}

function restartSanke() {
	snakeF.contentWindow.gameInit();
}

function something(mc) {
	mc.strokeStyle = "black";
	mc.lineWidth = 2;
	mc.fillStyle = "black";

	var m = mc.canvas;
	mc.save();
	mc.beginPath();
	mc.moveTo(m.width / 2, 100);
	mc.arc(m.width / 2, 100, 4, 0, 2 * Math.PI, false);
	mc.moveTo(m.width / 2, 100);
	mc.lineTo(m.width / 2, 300);
	mc.moveTo(m.width / 2, 300);
	mc.arc(m.width / 2, 300, 15, 0, 2 * Math.PI, false);
	mc.closePath();
	mc.stroke();
	mc.fill();
	mc.restore();

	var bounds = [5 / 4 * Math.PI, 7 / 4 * Math.PI];
	movingBall(mc, bounds);
}

function movingBall(mc, bounds) {
	direct = true;
	if(direct) {
		
	}
}
