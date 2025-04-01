//board
let board;
let context;
const getWidth = document.getElementById('board');
const boardWidth = getWidth.offsetWidth;
const getHeight = document.getElementById('board');
const boardHeight = getHeight.offsetHeight;
console.log(boardWidth);
console.log(boardHeight);

//charlie
let charlieWidth = 34;
let charlieHeight = 24;
let charlieX = boardWidth/2;
let charlieY = boardHeight/2;

let charlie = {
    x: charlieX,
    y: charlieY,
    width: charlieWidth,
    height: charlieHeight
}

window.onload = function() {
    board = document.querySelector("#board");
    context = board.getContext("2d");

    //add charlie
    context.fillStyle = "red";
    context.fillRect(charlie.x, charlie.y, charlie.width, charlie.height)
}