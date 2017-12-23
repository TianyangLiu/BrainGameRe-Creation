var requestAnimationFrame = window.requestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.msRequestAnimationFrame;
var c, ctx, start = null;
var ball = {x: 10, y: 10, radius: 10, startAngle: 0, endAngle: Math.PI*2, antiClockwise: false, headingDirection: 'left'}

window.onload = function(){
	c = document.getElementById('myCanvas');
	ctx = c.getContext('2d');
	start = document.getElementById('start');

	start.addEventListener('click', startGame);

	ctx.fillStyle = '#000';
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, ball.startAngle, ball.endAngle, ball.antiClockwise);
	ctx.closePath();
	ctx.fill();
};

function startGame(){
	detectBoundary();

	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillStyle = '#000';
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, ball.startAngle, ball.endAngle, ball.antiClockwise);
	ctx.closePath();
	ctx.fill();

	requestAnimationFrame(startGame);
}

function detectBoundary(){
	if(Math.abs(ball.x)+ball.radius >= c.width){
		ball.headingDirection = 'left';
	}else if(Math.abs(ball.x) <= Math.abs(ball.radius/3)){
		ball.headingDirection = 'right';
	}

	if(Math.abs(ball.y)+ball.radius >= c.height){
		ball.headingDirection = 'up';
	}else if(Math.abs(ball.y)  <= Math.abs(ball.radius/3)){
		ball.headingDirection = 'down';
	}

	switch(ball.headingDirection){
		case 'left':
			ball.x-=4;
			break;
		case 'right':
			ball.x+=4;
			break;
		case 'up':
			ball.y-=4;
			break;
		case 'down':
			ball.y+=4;
			break;
		default:
	}


}
