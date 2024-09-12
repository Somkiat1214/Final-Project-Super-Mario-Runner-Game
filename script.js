let board;
let boardWidth = 500;
let boardHeight = 300;
let context;

let playerWidth = 60;
let playerHeight = 85;
let playerX = 50;
let playerY = boardHeight - playerHeight;
let playerImg;
let player = {
    x: playerX,
    y: playerY,
    width: playerWidth,
    height: playerHeight
}
let gameOver = false;
let score = 0;
let time = 0;

let boxImg = new Image();
let boxWidth = 80;
let boxHeight = 80;
let boxX = 700;
let boxY = boardHeight - boxHeight;

let boxesArray = [];
const BASESPEED = -3; 
let boxSpeed = BASESPEED;

let velocityY = 0;
const gravity = 0.27; 
const BASEVELOCITY = 0;
let lives = 3;


window.onload = function () {
    board = document.getElementById('board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    playerImg = new Image();
    playerImg.src = "./Image/main.png";
    playerImg.onload = function () {
        context.drawImage(playerImg, player.x, player.y, player.width, player.height);
    }

    boxImg.src = "./Image/a3.png";

    requestAnimationFrame(update);

    document.addEventListener("keydown", moveplayer);
    

    setTimeout(createBox, Math.random() * 2000 + 1000);
}

function update() {
    requestAnimationFrame(update);

    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

 
    velocityY += gravity;
    player.y = Math.min(player.y + velocityY, playerY);
    context.drawImage(playerImg, player.x, player.y, player.width, player.height);

    for (let i = 0; i < boxesArray.length; i++) {
        let box = boxesArray[i];
        box.x += boxSpeed;
        context.drawImage(box.img, box.x, box.y, box.width, box.height);


        if (onCollision(player, box)) {
            lives--;
            gameOver = true;
            context.font = "normal bold 40px Arial";
            context.textAlign = "center";
            context.fillText("Game Over!", boardWidth / 2, boardHeight / 2);
            context.font = "normal bold 30px Arial";
            context.fillText("Final Score: " + score, boardWidth / 2, 200);
            context.fillText("Lives: "+lives, boardWidth / 2, 240);
            return;
        }
    }

    score++;
    context.font = "normal bold 20px Arial";
    context.textAlign = "left";
    context.fillText("Score: " + score, 10, 30);

    time += 0.01;
    context.font = "normal bold 20px Arial";
    context.textAlign = "right";
    context.fillText("Time: " + time.toFixed(1), boardWidth - 10, 30);

    if (time >= 60) {
        gameOver = true;
        context.font = "normal bold 40px Arial";
        context.textAlign = "center";
        context.fillText("Time's Up!", boardWidth / 2, boardHeight / 2);
        context.font = "normal bold 30px Arial";
        context.fillText("Final Score: " + score, boardWidth / 2, 200);
    }
    context.font = "normal bold 20px Arial";
    context.textAlign = "left";
    context.fillText("Lives: " + lives, 10, 50);
}

function moveplayer(e) {
    if (gameOver) {
        return;
    }

    if (e.code == "Space" && player.y == playerY) {
        velocityY = -10;
    }
}

function createBox() {
    if (gameOver) {
        return;
    }
    let box = {
        img: boxImg,
        x: boxX,
        y: boxY,
        width: boxWidth,
        height: boxHeight,
        speed: boxSpeed 
    }

    boxesArray.push(box);
    if (boxesArray.length > 5) {
        boxesArray.shift(); 
    }
    setTimeout(createBox, Math.random() * 2000 + 1000);
}

function onCollision(obj1, obj2) {
    return obj1.x < (obj2.x + obj2.width) &&
        (obj1.x + obj1.width) > obj2.x &&
        obj1.y < (obj2.y + obj2.height) &&
        (obj1.y + obj1.height) > obj2.y;
}

function restart() {
    // รีเซ็ตค่าต่างๆ ให้กลับไปเป็นค่าเริ่มต้น
    if (lives > 0) {
        score = 0;
        time = 0;
        velocityY = BASEVELOCITY;
        player.y = playerY; // รีเซ็ตตำแหน่งของผู้เล่น
        boxesArray = []; // ล้างกล่องทั้งหมด
        gameOver = false; // ตั้งค่า gameOver เป็น false
        boxSpeed = BASESPEED;


        // เริ่มเกมใหม่
        requestAnimationFrame(update);
        setTimeout(createBox, Math.random() * 2000 + 1000);
    }
}
