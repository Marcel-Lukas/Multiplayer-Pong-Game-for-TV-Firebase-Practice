
const BASE_URL = "https://remotestoragetest-e613a-default-rtdb.europe-west1.firebasedatabase.app/";


async function getData(path = "") {
  const response = await fetch(`${BASE_URL}${path}.json`);
  const data = await response.json();
  return data;
}


async function fetchPressedValues() {
  const startData   = await getData("startBtn");
  const selectData  = await getData("selectBtn");
  const crossData   = await getData("cross");
  const buttonData  = await getData("button");

}


function startUpdatingValues(intervalMs = 40) {
  fetchPressedValues();
  setInterval(() => {
    fetchPressedValues();
  }, intervalMs);
}




let ctx = ca.getContext('2d');
let p1 = 200;
let p2 = 200;
let key = {};
let ball = {
    x: 360,
    y: 240,
    speedX: 5,
    speedY: 0
};
let scoreP1 = 0;
let scoreP2 = 0;
let lastScoredPlayer = null;
let hitSound = document.getElementById('hit-sound');
let scoreSound = document.getElementById('score-sound');
let muteCheckbox = document.getElementById('checkbox');

let ballImage = new Image();
ballImage.src = './src/img/ball.png';

let isPaused = false;

document.addEventListener('keydown', e => key[e.keyCode] = true);
document.addEventListener('keyup', e => key[e.keyCode] = false);

document.querySelector('.pause').addEventListener('click', () => {
    isPaused = !isPaused;
});

draw();
setInterval(loop, 1000 / 60);

function draw() {
    ctx.fillStyle = 'rgb(15, 90, 30)';
    ctx.fillRect(0, 0, 720, 480);
    ctx.fillStyle = 'white';
    ctx.fillRect(10, p1, 10, 80);
    ctx.fillRect(700, p2, 10, 80);
    
    ctx.drawImage(ballImage, ball.x, ball.y, 20, 20);

    requestAnimationFrame(draw);
}

function loop() {
    if (isPaused) return;

    if (key[38]) {
        p2 = Math.max(p2 - 5, 0);
    }

    if (key[40]) {
        p2 = Math.min(p2 + 5, 400);
    }

    if (key[87]) {
        p1 = Math.max(p1 - 5, 0);
    }

    if (key[83]) {
        p1 = Math.min(p1 + 5, 400);
    }

    ball.x = ball.x + ball.speedX;
    ball.y = ball.y + ball.speedY;

    if (ball.x < 20 && ball.speedX < 0) {
        if (ball.y > p1 && ball.y < p1 + 80) {
            ball.speedX = -ball.speedX * 1.1;
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
            ball.speedX = -ball.speedX * 1.1;
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