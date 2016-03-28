var width = window.innerWidth - 100;
var height = window.innerHeight - 100;
var canvas = document.getElementById("mouse");
var c = canvas.getContext("2d");
canvas.width = width;
canvas.height = height;
c.fillRect(0, 0, width, height);
c.fill();
var s_draw = {
	graphType : "circle",
	strokeStyle : "rgba(0,0,0,0.5)",
	fillStyle : "dark",
	continous : true
}
c.strokeStyle = "rgba(255,255,255,0.3)";
var s_circle = {
	r : 10,
}
var s_line = {

}
function changeColor(color) {
	c.strokeStyle = "rgba(0,0,0,0.3)";
}


canvas.onclick = function(e) {
	draw(e);
}
var leftDown = false;
canvas.onmousedown = function(e) {
	if(e.button === 0) {
		leftDown = true;
	}
}
canvas.onmouseup = function(e) {
	if(e.button === 0) {
		leftDown = false;
	}
}
// c.beginPath();
canvas.onmousemove = function(e) {
	if(s_draw.continous && leftDown) {
		draw(e);
	}
}

function drawText() {
	c.font = "15px sans-serif";
	c.fillText("The game has started...", 200, 100);
}

function draw(e) {
	switch(s_draw.graphType) {
		case "line" : drawLine(e); break;
		case "circle" : drawCircle(e); break;
	}
}

function drawLine(e) {
	c.lineTo(e.offsetX, e.offsetY);
	c.closePath();
	c.stroke();
}


function endPath() {
	c.closePath();
}







function drawPoint(e) {
	var nx = e.offsetX;
	var ny = e.offsetY;
	c.beginPath();
	c.arc(nx, ny, 2 , 0 , 2 * Math.PI, false);
	c.closePath();
	c.stroke();
}

function drawCircle(e) {
	var nx = e.offsetX;
	var ny = e.offsetY;
	var randomR = Math.round(Math.random() * 20 + 1);
	var randomEa = Math.random() * 2;
	var randomBa = Math.random() * 2
	c.beginPath();
	c.arc(nx, ny, randomR , randomBa * Math.PI , randomEa * Math.PI, false);
	// c.rect(nx - randomA, ny - randomA, 2 * randomA, 2 * randomA);
	c.stroke();
}

function drawCircles(e) {
	var mx = e.offsetX;
	var my = e.offsetY;

	var r = 100;
	c.beginPath();
	c.arc(mx, my, r, 0, 2 * Math.PI, false);
	c.closePath();
	c.stroke();

	var nm = 20;
	var n = 0;
	var recpc = 2 * Math.PI / nm;
	while(n < nm) {
		var cx = r * Math.cos(recpc * n);
		var cy = r * Math.sin(recpc * n);
		var cr = Math.round(Math.random() * 30 + 1);
		c.beginPath();
		c.arc(mx + cx, my + cy, cr, 0, 2 * Math.PI, false);
		c.closePath();
		c.stroke();
		n++;
	}
}

var circles = [];
function drawMovingCircles(e) {
	var mx = e.offsetX;
	var my = e.offsetY;
	var r = Math.round(Math.random() * 30 + 1);
	c.beginPath();
	c.arc(mx, my, r, 0, 2 * Math.PI, false);
	circles.push({
		x : mx,
		y : my,
		r : r,
		ba : 0,
		ea : 2 * Math.PI,
		d : false
	})
}

function drawCircleByCircle(circle) {
	c.arc(circle.x, circle.y, circle.r, circle.ba, circle.ea, circle.d);
}