var ball;
var ballImg;
var bg;
var db,position;

function preload(){
    ballImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
    bg = loadImage("bg.png");
    //bg.scale(700,500);
}
function setup(){
    db = firebase.database(); 
    createCanvas(windowWidth,windowHeight);
    ball = createSprite(100,350,10,10);
    ball.addAnimation("hello",ballImg);
    ball.scale = 1
    var path = db.ref("ball/height");
    path.on("value",readPosition,showError);
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        updateHeight(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        updateHeight(1,0);

    }
    else if(keyDown(UP_ARROW)){
        updateHeight(0,-1);       
        ball.scale = ball.scale - 0.001
    }
    else if(keyDown(DOWN_ARROW)){
        updateHeight(0,+1);
    }
    drawSprites();
}

function updateHeight(x,y){
    db.ref('ball/height').set({
        'x' : position.x + x,
        'y' : position.y + y
    });
    
}
function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("this is an error ;)");
}