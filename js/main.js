var requestAnimationFrame = window.requestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.msRequestAnimationFrame;
var c = null;
var ctx = null;
var start = null;
var ball = null;
var tileWidth = 0;
var tileHeight = 0;
var mapWidth = 0;
var mapHeight = 0;
var centerGameMapX = 0;
var centerGameMapY = 0;
var obstacles = [];
var gameMap = [];

window.onload = function(){
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
	start = document.getElementById('start');
	tileWidth = 100;
	tileHeight = 100;

	start.addEventListener('click', startGame);
	levelOne();
};

function Ball(x, y, radius, color, headingDirection){
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.startAngle = 0;
	this.endAngle = Math.PI*2;
	this.antiClockwise = false;
	this.headingDirection = headingDirection;
	this.color = color;

	this.update = function(){
		this.draw();
	};

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.antiClockwise);
		ctx.fillStyle = '#222';
		ctx.fill();
		ctx.closePath();
	};
}

function Obstacle(x, y, width, height, material, tilt, color){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.material = material;
	this.tilt = tilt;
	this.color = color;

	this.update = function(){
		this.draw();
	};

	this.draw = function(){
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	};
}

function detectBoundary(){
	var speed = 1;

	if(Math.abs(ball.x)+ball.radius > canvas.width){
		ball.headingDirection = 'left';
	}else if(Math.abs(ball.x)-ball.radius < 0){
		ball.headingDirection = 'right';
	}

	if(Math.abs(ball.y)+ball.radius > canvas.height){
		ball.headingDirection = 'up';
	}else if(Math.abs(ball.y)-ball.radius < 0){
		ball.headingDirection = 'down';
	}

	switch(ball.headingDirection){
		case 'left':
			ball.x -= speed;
			break;
		case 'right':
			ball.x += speed;
			break;
		case 'up':
			ball.y -= speed;
			break;
		case 'down':
			ball.y += speed;
			break;
		default:
	}
}

function detectObstacle(){
	console.log("ball y: " + (ball.y+ball.radius) + "  ||||  " + "obstacle y: " + (obstacles[0].y+obstacles[0].height) );

	if(Math.abs(ball.y)-ball.radius < obstacles[0].y+obstacles[0].height){
		ball.headingDirection = 'down';
	}
}

function renderGameMap(){
	ctx.strokeStyle = '#900';
	var i = 0;

	for(var y = 0; y < mapHeight; y++){
		for(var x = 0; x < mapWidth; x++){
			if(gameMap[i++] != 0){
				ctx.strokeRect(x*tileWidth+centerGameMapX, y*tileHeight+centerGameMapY, tileWidth, tileHeight);
			}
		}
	}
}

function levelOne(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	var b = {
		radius: 10, 
		x: canvas.width/2, 
		y: canvas.height - 10*2, 
		startAngle: 0, 
		endAngle: Math.PI*2, 
		antiClockwise: false, 
		headingDirection: 'up',
		color: '#222'
	};

	var obstacle_1 = {
		x: canvas.width/2 - 15,
		y: canvas.height/2 - 5, 
		width: 30,
		height: 10,
		material: '',
		tilt: 'right',
		color: '#222'
	};

	mapWidth = 3;
	mapHeight = 3;
	centerGameMapX = canvas.width/2 - (tileWidth*mapWidth)/2;
	centerGameMapY = canvas.height/2 - (tileHeight*mapHeight)/2;
	gameMap = [
		1, 1, 1,
		1, 1, 1,
		1, 1, 1
	];

	renderGameMap();
	ball = new Ball(b.x, b.y, b.radius, b.color, b.headingDirection);
	obstacles[0] = new Obstacle(obstacle_1.x, obstacle_1.y, obstacle_1.width, obstacle_1.height, obstacle_1.material, obstacle_1.tilt, obstacle_1.color);

	ball.update();
	//obstacles[0].update();
}

function startGame(){
	if(ctx == null){
		return;
	}

	detectBoundary();
	detectObstacle();

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	renderGameMap();
	ball.update();
	//obstacles[0].update();

	requestAnimationFrame(startGame);
}



















