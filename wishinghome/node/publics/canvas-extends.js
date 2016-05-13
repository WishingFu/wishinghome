"use strict"
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
 * 调用analysisLines完成多组连续直线的绘制
 * @param pList 点元素的二位数组
 * @param cc
 * @param ms
 */
function analysisLinesGroup(pList, cc, ms) {
	var pn = 0;
	var plInter = setInterval(function() {
		if(pn >= pList.length) {
			clearInterval(plInter);
			return;
		}
		analysisLines(pList[pn], cc, Math.floor(ms / pList.length));
		pn = pn + 1;
	}, Math.ceil(ms / pList.length));
}
/**
 * 调用analysisPoints完成多组点的绘制<br>
 * 	通常配合analysisLinesGroup的点元素数组<br>
 * 	因为点本身就是独立的,没有连续的概念,不需要特别分组
 * @param pList
 * @param cc
 * @param ms
 */
function analysisPointsGroup(pList, cc, ms) {
	var pn = 0;
	var plInter = setInterval(function() {
		if(pn >= pList.length) {
			clearInterval(plInter);
			return;
		}
		analysisPoints(pList[pn], cc, Math.floor(ms / pList.length));
		pn = pn + 1;
	}, Math.ceil(ms / pList.length));
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
		analysisLine(points[en], points[en + 1], cc, Math.floor(ms / points.length));
		en = en + 1;
	}, Math.ceil(ms / points.length));
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
		if((dx > 0 && nx >= bx) || (dx < 0 && nx <= bx) || (dy > 0 && ny >= by) || (dy < 0 && ny <= by)) {
			clearInterval(lineInter);
		}
		cc.beginPath();
		cc.moveTo(nx, ny);
		if((dx > 0 && (nx + px > bx)) || (dx < 0 && (nx + px < bx)) || (dy > 0 && (ny + py > by)) || (dy < 0 && (ny + py < by))) {
			nx = bx; ny = by;
		} else {
			ny = ny + py; nx = nx + px;
		}							
		cc.lineTo(nx, ny);
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
		if(sn >= points.length) {
			clearInterval(pInter);
			return;
		}
		bc.beginPath();
		bc.moveTo(points[sn].x, points[sn].y);
		bc.arc(points[sn].x, points[sn].y, points[sn].r, 0, Math.PI * 2, false);
		bc.closePath();
		bc.fill();
		sn++;
	}, Math.floor(ms / points.length));
}
/**
 * 清除canvas的所有内容
 * @param c 待清除的canvas;
 */
function clearCanvas(c) {
	c.clearRect(0, 0, c.canvas.width, c.canvas.height);
}
/**
 * 以圆为基准绘制<b>正多边形</b>
 * @param n 多边形边数,大于等于3,非整数向下取整
 * @param r 基准圆半径
 * @param type 多边形与圆的关系,true则圆为外接圆,false则圆为内切圆
 * @param theta 多变形旋转角度
 * @param c canvas上下文
 */
function analysisPolygon(p, n, r, type, theta, c) {
	if(n < 3) {
		throw new Error("非法参数n-->多边形边数!需大于等于3.")
	}
	n = Math.floor(n);
	var pth = Math.PI * 2 / n;
	if(type) {
		c.save();
		c.translate(p.x, p.y);
		c.rotate(theta);
		c.moveTo(r, 0);
		for(var i = 0; i - n; i++) {
			c.lineTo(r * Math.cos(i * pth), r * Math.sin(i * pth));
		}
		c.lineTo(r, 0);
		c.closePath();
		c.stroke();
		c.restore();
	}
}