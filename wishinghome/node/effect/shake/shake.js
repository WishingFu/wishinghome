$(function(){
	var mcanvas = $("#mcanvas")[0];
	var mc = mcanvas.getContext("2d");
	mc.strokeStyle = "black";
	mc.lineWidth = 1;
	mc.fillStyle = "black";
	setInterval(function() {
		mc.clearRect(0, 0, mcanvas.width, mcanvas.height);
		something(mc);
	}, 5);
})

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