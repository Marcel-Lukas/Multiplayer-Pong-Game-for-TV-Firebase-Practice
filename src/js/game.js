let ctx = ca.getContext('2d');
let p1 = 200;
let p2 = 200;
let ball = { x: 360, y: 240, speedX: 5, speedY: 0 };
let scoreP1 = 0;
let scoreP2 = 0;
let lastScoredPlayer = null;
let hitSound = document.getElementById('hit-sound');
let scoreSound = document.getElementById('score-sound');
let muteCheckbox = document.getElementById('checkbox');

let ballImage = new Image();
ballImage.src = './src/img/ball.png';

let isPaused = false;

const API_URL_PLAYER1 = "https://remotestoragetest-e613a-default-rtdb.europe-west1.firebasedatabase.app/player1/";
const API_URL_PLAYER2 = "https://remotestoragetest-e613a-default-rtdb.europe-west1.firebasedatabase.app/player2/";

async function getDataPlayer1(path = "") {
    const response = await fetch(`${API_URL_PLAYER1}${path}.json`);
    const dataP1 = await response.json();
    return dataP1;
}

async function getDataPlayer2(path = "") {
    const response = await fetch(`${API_URL_PLAYER2}${path}.json`);
    const dataP2 = await response.json();
    return dataP2;
}

document.querySelector('.pause').addEventListener('click', () => {
    isPaused = !isPaused;
});

draw();
setInterval(loop, 1000 / 26);

function draw() {
    ctx.fillStyle = 'rgb(15, 90, 30)';
    ctx.fillRect(0, 0, 720, 480);
    ctx.fillStyle = 'white';
    ctx.fillRect(10, p1, 10, 80);
    ctx.fillRect(700, p2, 10, 80);
    
    ctx.drawImage(ballImage, ball.x, ball.y, 20, 20);

    requestAnimationFrame(draw);
}

let lastFetchTime = 0;
const fetchInterval = 46;

async function loop() {
    if (isPaused) return;

    const currentTime = Date.now();
    if (currentTime - lastFetchTime > fetchInterval) {
        const player1Data = await getDataPlayer1("cross/action");
        const player2Data = await getDataPlayer2("cross/action");

        if (player2Data === "up") {
            p2 = Math.max(p2 - 5, 0);
        }
        if (player2Data === "down") {
            p2 = Math.min(p2 + 5, 400);
        }
        if (player1Data === "up") {
            p1 = Math.max(p1 - 5, 0);
        }
        if (player1Data === "down") {
            p1 = Math.min(p1 + 5, 400);
        }

        lastFetchTime = currentTime;
    }

    ball.x = ball.x + ball.speedX;
    ball.y = ball.y + ball.speedY;

    if (ball.x < 20 && ball.speedX < 0) {
        if (ball.y > p1 && ball.y < p1 + 80) {
            ball.speedX = -ball.speedX * 1.05;
            ball.speedY = (ball.y - p1 - 40) * 0.1;
            playSound(hitSound);
        } else {
            scoreP2++;
            document.getElementById('score-p2').textContent = scoreP2;
            playSound(scoreSound);
            lastScoredPlayer = 2;
            resetBall();
        }
    }

    if (ball.x > 690 && ball.speedX > 0) {
        if (ball.y > p2 && ball.y < p2 + 80) {
            ball.speedX = -ball.speedX * 1.05;
            ball.speedY = (ball.y - p2 - 40) * 0.1;
            playSound(hitSound);
        } else {
            scoreP1++;
            document.getElementById('score-p1').textContent = scoreP1;
            playSound(scoreSound);
            lastScoredPlayer = 1;
            resetBall();
        }
    }

    if (ball.y < 0 || ball.y > 480) {
        ball.speedY = -ball.speedY;
    }
}

function resetBall() {
    ball = {
        x: 360,
        y: 240,
        speedX: lastScoredPlayer === 1 ? 5 : -5,
        speedY: 0
    };
}

function playSound(sound) {
    if (!muteCheckbox.checked) {
        sound.play();
    }
}
