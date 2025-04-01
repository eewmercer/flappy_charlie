//board
let board;
const boardWidth = 3840;
const boardHeight = 2160;
let context;

//charlie
let charlieWidth = 300;
let charlieHeight = 300;
let charlieX = boardWidth/5;
let charlieY = boardHeight/2.5;

let charlie = {
    x: charlieX,
    y: charlieY,
    width: charlieWidth,
    height: charlieHeight
}

//walls
let wallArray = [];
let topWallWidth = 500;
let topWallHeight = 1000;
let topWallX = boardWidth;
let topWallY = 0;

let wallImage;

//physics
let velocityX = -20; //walls moving left speed


window.onload = function() {
    board = document.querySelector("#board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //add charlie
    context.fillStyle = "red";
    context.fillRect(charlie.x, charlie.y, charlie.width, charlie.height)

    //load images
    // charlieImage = new Image();
    // charlieImage.src = "";
    // charlieImage.onload = function() {
    //     context.drawImage(charlieImage, charlie.x, charlie.y, charlie.width, charlie.height)
    // }

    wallImage = new Image();
    wallImage.src = "wallImage.svg"

    requestAnimationFrame(update);
    setInterval(placeWalls, 1500);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //draw charlie again
    context.fillRect(charlie.x, charlie.y, charlie.width, charlie.height)

    //walls
    for (let i = 0; i < wallArray.length; i++) {
        let wall = wallArray[i];
        wall.x += velocityX;
        context.drawImage(wall.img, wall.x, wall.y, wall.width, wall.height)
    }
}

function placeWalls() {
    let topWall = {
        img: wallImage,
        x: topWallX,
        y: topWallY,
        width: topWallWidth,
        height: topWallHeight,
        passed: false
    }

    wallArray.push(topWall);
}