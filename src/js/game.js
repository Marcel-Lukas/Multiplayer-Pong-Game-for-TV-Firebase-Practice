const CANVAS_WIDTH = 1300;
const CANVAS_HEIGHT = 600;
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 30;
const MAX_SPEED = 10;
const FETCH_INTERVAL = 101; // Fetch data interval in ms

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

let ballImage = new Image();
ballImage.src = './src/img/ball.png';

let hitSound = document.getElementById('hit-sound');
let scoreSound = document.getElementById('score-sound');
let muteCheckbox = document.getElementById('checkbox');

let isPaused = false;
let lastFetchTime = 0;

const API_URL_PLAYER1 = "https://remotestoragetest-e613a-default-rtdb.europe-west1.firebasedatabase.app/player1/";
const API_URL_PLAYER2 = "https://remotestoragetest-e613a-default-rtdb.europe-west1.firebasedatabase.app/player2/";


class Player {
    constructor(y) {
        this.y = y;
        this.score = 0;
    }

    move(direction) {
        if (direction === "up") this.y = Math.max(this.y - 5, 0);
        if (direction === "down") this.y = Math.min(this.y + 5, CANVAS_HEIGHT - PADDLE_HEIGHT);
    }
}


class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = CANVAS_WIDTH / 2;
        this.y = CANVAS_HEIGHT / 2;
        this.speedX = Math.random() > 0.5 ? 5 : -5;
        this.speedY = 0;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y <= 0 || this.y >= CANVAS_HEIGHT - BALL_SIZE) {
            this.speedY = -this.speedY;
        }
    }
}


let player1 = new Player(CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2);
let player2 = new Player(CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2);
let ball = new Ball();



let lastPauseStateFetchTime = 0; 

function updatePauseState() {
    const currentTime = Date.now();
    if (currentTime - lastPauseStateFetchTime > FETCH_INTERVAL) {
        Promise.all([
            fetchPlayerData(API_URL_PLAYER1, "startBtn/action"),
            fetchPlayerData(API_URL_PLAYER2, "startBtn/action")
        ]).then(([actionPlayer1, actionPlayer2]) => {
            if (actionPlayer1 === "pause" || actionPlayer2 === "pause") {
                isPaused = true;
            }
            if (actionPlayer1 === "start" || actionPlayer2 === "start") {
                isPaused = false;
            }
        }).catch(error => {
            console.error("Error updating pause state:", error);
        });
        lastPauseStateFetchTime = currentTime;
    }
}



function playSound(sound) {
  sound.play();
}


async function fetchPlayerData(url, path = "") {
    try {
        const response = await fetch(`${url}${path}.json`);
        if (!response.ok) throw new Error("Failed to fetch");
        return await response.json();
    } catch (error) {
        console.error("Error fetching player data:", error);
        return null;
    }
}


function updateGame() {
    const currentTime = Date.now();

    updatePauseState();

    if (isPaused) return;

    if (currentTime - lastFetchTime > FETCH_INTERVAL) {

        fetchPlayerData(API_URL_PLAYER1, "cross/action").then(action => {
            if (action === "up") player1.move("up");
            if (action === "down") player1.move("down");
        });

        fetchPlayerData(API_URL_PLAYER2, "cross/action").then(action => {
            if (action === "up") player2.move("up");
            if (action === "down") player2.move("down");
        });

        lastFetchTime = currentTime;
    }

    ball.update();

    // Kollision und Punktelogik
    if (ball.x <= PADDLE_WIDTH + 10 && ball.speedX < 0) {
        if (ball.y > player1.y && ball.y < player1.y + PADDLE_HEIGHT) {
            ball.speedX = Math.min(-ball.speedX * 1.05, MAX_SPEED);
            ball.speedY = (ball.y - player1.y - PADDLE_HEIGHT / 2) * 0.1;
            playSound(hitSound);
        } else {
            player2.score++;
            ball.reset();
            playSound(scoreSound);
        }
    }

    if (ball.x >= CANVAS_WIDTH - PADDLE_WIDTH - 10 - BALL_SIZE && ball.speedX > 0) {
        if (ball.y > player2.y && ball.y < player2.y + PADDLE_HEIGHT) {
            ball.speedX = Math.max(-ball.speedX * 1.05, -MAX_SPEED);
            ball.speedY = (ball.y - player2.y - PADDLE_HEIGHT / 2) * 0.1;
            playSound(hitSound);
        } else {
            player1.score++;
            ball.reset();
            playSound(scoreSound);
        }
    }
}


function draw() {
    ctx.fillStyle = 'rgb(15, 90, 30)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = 'white';
    ctx.fillRect(10, player1.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(CANVAS_WIDTH - 20, player2.y, PADDLE_WIDTH, PADDLE_HEIGHT);

    ctx.drawImage(ballImage, ball.x, ball.y, BALL_SIZE, BALL_SIZE);

    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText(`1 Player: ${player1.score}`, 20, 33);
    ctx.fillText(`2 Player: ${player2.score}`, CANVAS_WIDTH - 170, 33);

    requestAnimationFrame(draw);
}


function gameLoop() {
    updateGame();
    requestAnimationFrame(gameLoop);
}


draw();
gameLoop();
