var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius =10;
var x =canvas.width/2;
var y =canvas.height-30;
var dx=1;
var dy=2;
var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed= false;

//bricks in a 2d array  
var brickRowCount =8;
var brickColumnCount= 9;
var brickWidth =45;
var brickHeight=10;
var brickPadding=3;
var brickOffsetTop=20;
var brickOffsetLeft=25;

var score =0;


var bricks = [];
for(var c=0; c < brickColumnCount; c++){    
    bricks[c]= [];
    for(var r=0; r < brickRowCount; r++){
        bricks[c][r]={x: 0, y: 0, status:1};  
        //status가1이면 벽돌을그리고 아니면(공에 맞으면) 안그린다
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);  
//디폴트가 false

function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }
}

//relativeX 

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }
    else if(e.key == "Left"|| e.key == "ArrowLeft"){
        leftPressed = true;
    }
}
function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}


function collisionDetection(){
    for(var c=0; c < brickColumnCount; c++){
        for(var r=0; r< brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1){
            if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){

                dy = -dy;
                b.status = 0;
                score++;

                //Winning message
                if(score == brickRowCount*brickColumnCount){
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();
                    clearInterval(interval);

                  //reloads the page and starts the game again once the alert button is clicked.
                }
            }
            }
        }
    }
}

function drawScore(){

    ctx.font = "16px Arial";
    ctx.fillStyle ="black";
    ctx.fillText("Score: "+score, 8, 20);
}


function drawBall(){
    //drawing code\
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle="green";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}


//making bricks loop
function drawBricks() {
    for(var c=0; c < brickColumnCount; c++){  
        for(var r=0; r < brickRowCount; r++){
if(bricks[c][r].status == 1){
            var brickX = (c * (brickWidth+ brickPadding)) + brickOffsetLeft;
            var brickY = (r * (brickHeight+brickPadding)) + brickOffsetTop;
            //벽돌 위치 지정
 
            bricks[c][r].x= brickX;
            bricks[c][r].y= brickY;

            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle="blue";
            ctx.fill();
            ctx.closePath();
}
        }
        }
    }

function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
  

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius ){
        dx=-dx;
    }
    if(y + dy < ballRadius){
    dy = -dy;

}
else if( y + dy > canvas.height-ballRadius){
    if(x> paddleX && x < paddleX + paddleWidth){
        dy = -dy;
    }
    else{
 //   alert("GAME OVER");
   document.location.reload();
    clearInterval(interval);
}
}


    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX += 7;

    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }

    x += dx;
    y += dy;

    }

var interval = setInterval(draw,10);
