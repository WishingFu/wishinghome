/**
 * 点的构造函数
 */
function Point(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
	return this;
}
/**
 * 调用analysisLine完成一组连续直线的绘制
 * @param points 待绘制点数组,数组元素为Point({x: "", y: ""})结构
 * @param cc canvas上下文cc
 * @param ms 绘制总时长(建议最小值为 点数*16.7ms)
 */
function analysisLines(points, cc, ms) {
	var en = 0;
	var ltnInter = setInterval(function() {
		if(en >= points.length - 1) {
			clearInterval(ltnInter);
			return;
		}
		analysisLine(points[en], points[en + 1], cc, ms / points.length);
		en = en + 1;
	}, ms / points.length);
}

/**
 * canvas-->从点a到b的线性动画
 * @param a 起始点a,元素为Point({x: "", y: ""})结构
 * @param b 终止点b,元素为Point({x: "", y: ""})结构
 * @param c canvas上下文c
 * @param ms 画线时长ms
 */
function analysisLine(a, b, c, ms) {
	var ax = a.x; var ay = a.y; var bx = b.x; var by = b.y; var dx = bx - ax; var dy = by - ay;
	var px = dx / ms * 16.7; var py = dy / ms * 16.7; var nx = ax; var ny = ay; 
	var lineInter = setInterval(function() {
		if(nx >= bx) {
			clearInterval(lineInter);
		}
		var desx; var desy;
		cc.beginPath();
		cc.moveTo(nx, ny);
		if(nx + px > bx || ny + py > by) {
			desx = bx; nx = bx; desy = by; ny = by;
		} else {
			desx = nx + px; desy = ny + py; ny = desy; nx = desx;
		}							
		cc.lineTo(desx, desy);
		cc.closePath();
		cc.stroke();
	}, 16.7);
}
/**
 * 绘制一组单独存在的点
 * @param points 待绘制点数组,数组元素为Point({x: "", y: "", r: ""})结构
 * @param bc canvas上下文 bc
 * @param ms 绘制总时长(建议最小值为 点数*16.7ms)
 */
function analysisPoints(points, bc, ms) {
	var sn = 0;
	var pInter = setInterval(function() {
		if(sn === points.length - 1) {
			clearInterval(pInter);
			return;
		}
		bc.beginPath();
		bc.moveTo(points[sn].x, points[sn].y);
		bc.arc(points[sn].x, points[sn].y, points[sn].r, 0, Math.PI * 2, false);
		bc.closePath();
		bc.fill();
		sn++;
	}, ms / points.length);
}
/**
 * 清除canvas的所有内容
 * @param c 待清除的canvas;
 */
function clearCanvas(c) {
	c.clearRect(0, 0, c.canvas.width, c.canvas.height);
}