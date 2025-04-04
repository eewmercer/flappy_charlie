//board
let board;
const boardWidth = 3840;
const boardHeight = 2160;
let context;

//background
let background = new Image();
background.src = 'background.svg'

//charlie
let charlieWidth = 400;
let charlieHeight = 400;
let charlieX = boardWidth/5;
let charlieY = boardHeight/2.5;

let charlie = {
    x: charlieX,
    y: charlieY,
    width: charlieWidth,
    height: charlieHeight
}

charlieImage = new Image();
charlieImage.src = "charlieImage.png";

//walls
let wallArray = [];
let wallWidth = 500;
let wallHeight = 1200;
let wallX = boardWidth;
let topWallY = 0;

let topWallImage;

//physics
let velocityX = -20;
let velocityY = 0;
let gravity = 0.6;

let gameOver = false;
let score = 0;

//button size
var rect = {
    x: 1550,
    y: boardHeight/1.5,
    width: 800,
    height: 350,
  };

function moveCharlieTouchScreen() {
    velocityY = -15;
}

function moveCharlieKeyboard(e) {
    if (e.code === 'Space') {
        velocityY = -15;
    }
}

function Playbutton(rect) {
    context.beginPath();
    context.rect(rect.x, rect.y, rect.width, rect.height);
    context.fillStyle = '#BA0C2F';
    context.fill();
    context.lineWidth = 10;
    context.strokeStyle = 'white';
    context.stroke();
    context.closePath();
    context.font = '150px Pixelify Sans';
    context.fillStyle = 'white';
    context.fillText('Restart', rect.x + 70, rect.y + 230); //rect.x + rect.width / 4
}

function getMousePos(board, e) {
    var rect = board.getBoundingClientRect();
    const scaleX = board.width / rect.width;  
    const scaleY = board.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }
  
function isInside(pos, rect) {
return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}

window.onload = function() {
    board = document.querySelector("#board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //add background
    background.onload = function() {
        context.drawImage(background, 0, 0, board.width, board.height);
    }

    //load images
    charlieImage.onload = function() {
        context.drawImage(charlieImage, charlie.x, charlie.y, charlie.width, charlie.height)
    }

    topWallImage = new Image();
    topWallImage.src = "topWallImage.svg"

    bottomWallImage = new Image();
    bottomWallImage.src = "bottomWallImage.svg"

    //button click event
    board.addEventListener('click', function(e) {
        if (!gameOver) return;

        var mousePos = getMousePos(board, e);
        console.log("Mouse pos:", mousePos);
        console.log("Button rect:", rect);

        if (isInside(mousePos, rect)) {
            location.reload();
        } 
    }, false);

    requestAnimationFrame(update);
    setInterval(placeWalls, 1500);
    document.addEventListener("touchstart", moveCharlieTouchScreen);
    document.addEventListener("keydown", moveCharlieKeyboard);
}

function update() {
    requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    //draw background again
    context.drawImage(background, 0, 0, board.width, board.height);

    //draw charlie again
    velocityY+= gravity;
    charlie.y = Math.max(charlie.y + velocityY, 0);
    context.drawImage(charlieImage, charlie.x, charlie.y, charlie.width, charlie.height)

    if (charlie.y > board.height) {
        gameOver = true;
    }

    //walls
    for (let i = 0; i < wallArray.length; i++) {
        let wall = wallArray[i];
        wall.x += velocityX;
        context.drawImage(wall.img, wall.x, wall.y, wall.width, wall.height)

        if (!wall.passed && charlie.x > wall.x + wall.width) {
            score += 0.5;
            wall.passed = true;
        }

        if (detectCollision(charlie, wall)) {
            gameOver = true;
        }
    }

    //clear walls
    while (wallArray.length > 0 && wallArray[0].x < -wallWidth) {
        wallArray.shift();
    }

    //score
    context.fillStyle = "white";
    context.font = "400px Pixelify Sans"
    context.fillText(score, 1800, board.height/4);

    if (gameOver) {
        context.fillText("GAME OVER", board.width/4, board.height/2)
        Playbutton(rect);
    }
}

function placeWalls() {
    if (gameOver) {
        return;
    }

    let randomWallY = topWallY - wallHeight/4 - Math.random() * (wallHeight/2);
    let openingSpace = board.height/3;

    let topWall = {
        img: topWallImage,
        x: wallX,
        y: randomWallY,
        width: wallWidth,
        height: wallHeight,
        passed: false
    }

    wallArray.push(topWall);

    let bottomWall = {
        img: bottomWallImage,
        x: wallX,
        y: randomWallY + wallHeight + openingSpace,
        width: wallWidth,
        height: wallHeight,
        passed: false
    }

    wallArray.push(bottomWall)
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}