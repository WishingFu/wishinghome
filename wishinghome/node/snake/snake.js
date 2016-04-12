﻿var swidth = window.innerWidth;
var sheight = window.innerHeight;
var canvas = document.getElementById("snake");
var input_difficulty = document.querySelector("#difficulty");
var input_score = document.querySelector("#scores");
var input_eatedFoods = document.querySelector("#eatedFoods");
var reInitButton = document.querySelector("#reInit");
sheight = 500;
swidth = 500;

var c = canvas.getContext("2d");
c.strokeStyle = "green";
c.lineWidth = 1;
c.shadowOffsetX = 5;
c.shadowOffsetY = 5;
c.shadowBlur = 2;

//游戏设置
var rows = 50;
var cols = 50;
var newUserLength = 4;
var blockLength = Math.floor((sheight / rows) <= (swidth / cols) ? (sheight / rows) : (swidth / cols));
var rowLength = rows * blockLength;
var colLength = cols * blockLength;
var direction = ["up", "right", "down", "left"];

// canvas.width = colLength;
// canvas.height = rowLength;
//游戏数据
var user;
var difficulty;
var directionNow;
var head;
var food;
var moveInterval;
var score;
var pause = false;
var eatedFoods;
//开始游戏
gameInit();

function gameInit() {
	user = [];
	food = [];
	eatedFoods = 0;
	directionNow = direction[0]
	head = [Math.floor(rows / 2), Math.floor(cols / 2)];
	score = 0;
	difficulty = 0;
	input_difficulty.value = difficulty;
	input_score.value = score;
	input_eatedFoods.value = eatedFoods;
	//游戏初始化
	for(var i = 0; i < newUserLength; i++) {
		user[i] = [];
	}
	//蛇头为2,身为1,食物为3,空白为0
	for(var i = 0; i < newUserLength; i++) {
		if(i === 0) {
			user[i] = [Math.floor(rows / 2), Math.floor(cols / 2), 2];
		} else {
			user[i] = [Math.floor(rows / 2) - i, Math.floor(cols / 2), 1];
		}
	}
	//绘制初始的蛇
	drawSnake();
	executeFood();
	//开始运动
	// moveSnakeInterval();
	pause = false;
	pauseGame();
}

var directionPause;
function pauseGame() {
	if(pause) {
		directionNow = directionPause;
		moveSnakeInterval();
		pause = false;
	} else {
		directionPause = directionNow;
		clearInterval(moveInterval);
		pause = true;
	}
}
function reInit() {
	reInitButton.blur();
	clearInterval(moveInterval);
	gameInit();
}

//监听键盘
document.onkeyup = function(evt) {
	switch(evt.keyCode) {
		case 32 : pauseGame(); break;
		case 38 : directionNow === direction[2] ? true : directionNow = direction[0]; break;
		case 39 : directionNow === direction[3] ? true : directionNow = direction[1]; break;
		case 40 : directionNow === direction[0] ? true : directionNow = direction[2]; break;
		case 37 : directionNow === direction[1] ? true : directionNow = direction[3]; break;
	}
};
window.onblur = function() {
	pause = false;
	pauseGame();
}

//计算碰撞
function executeOver() {
	var hx = head[0];
	var hy = head[1];
	if((hx < 0 || hx >= cols) || (hy < 0 || hy >= rows)) {
		gameOver();
	}
	for (var i = 1; i < user.length; i++) {
		if(user[i][0] === hx && user[i][1] === hy ) {
			gameOver();
		}
	}
	if(head[0] === food[0] && head[1] === food[1]) {
		clearInterval(moveInterval)
		executeFood();
		user[0][2] = 1;
		var newHead = [food[0], food[1], 2];
		user.unshift(newHead);
		executeScores();
		moveSnakeInterval();
	}
}

function executeScores() {
	score += (difficulty + 1) * 10;
	eatedFoods += 1;
	if(eatedFoods % 10 === 0) {
		difficulty += 1;
	}
	input_difficulty.value = difficulty;
	input_score.value = score;
	input_eatedFoods.value = eatedFoods;
}

function moveSnakeInterval() {
	moveInterval = setInterval(function() {
		moveSnake();
	}, 100 - difficulty * 10);
}

function moveSnake() {
	var newHead = [];
	switch(directionNow) {
		case direction[0] : newHead = [head[0], head[1] - 1, 2]; break;
		case direction[1] : newHead = [head[0] + 1, head[1], 2]; break;
		case direction[2] : newHead = [head[0], head[1] + 1, 2]; break;
		case direction[3] : newHead = [head[0] - 1, head[1], 2]; break;
	}

	head = newHead;
	user[0][2] = 1;
	user.unshift(newHead);
	user.pop(user.length - 1);
	
	drawSnake(); 
	executeOver();
}

function isUsableFood(food) {
	for (var i = 0; i < user.length; i++) {
		if(food[0] === user[i][0] && food[1] === user[i][1]) {
			return false;
		}
	}
	return true;
}

function executeFood() {
	var newFood = [Math.floor(Math.random() * cols), Math.floor(Math.random() * rows)];
	while(!isUsableFood(newFood)) {
		newFood = [Math.floor(Math.random() * cols), Math.floor(Math.random() * rows)];
	}
	food = newFood;
	drawFood();
}

function drawFood() {
	c.fillStyle = "green";
	c.fillRect(food[0] / cols * colLength, food[1] / rows * rowLength, blockLength, blockLength);
	c.fill();
}

function drawSnake() {
	c.clearRect(0, 0, swidth, sheight);
	for (var i = 0; i < user.length; i++) {
		if(user[i][2] === 1) {
			c.fillStyle = "black";
		} else if(user[i][2] === 2) {
			c.fillStyle = "orange";
		}
		c.fillRect(user[i][0] / cols * colLength, user[i][1] / rows * rowLength, blockLength, blockLength);
	}
	drawFood();
}

function gameOver() {
	clearInterval(moveInterval);
}