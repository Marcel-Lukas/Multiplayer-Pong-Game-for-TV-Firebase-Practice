const BASE_URL = "https://remotestoragetest-e613a-default-rtdb.europe-west1.firebasedatabase.app/";
const PLAYER_PATH = "player1";

let startState = "start";
let selectState = "selectA";

const actionDelay = 111; // Action switch Delay in ms
const throttleTiming = 66; // Throttle Delay in ms


function throttle(func, limit) {
  let lastExecution = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastExecution >= limit) {
      func(...args);
      lastExecution = now;
    }
  };
}

async function postData(path = "", data = {}) {
  let response = await fetch(`${BASE_URL}${path}.json`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function triggerAction(path, action, delay = actionDelay) {
  await postData(path, { action: action });

  setTimeout(() => {
    postData(path, { action: "off" });
  }, delay);
}


const triggerActionThrottled = throttle(triggerAction, throttleTiming);

function startBtn() {
  triggerActionThrottled(`${PLAYER_PATH}/startBtn`, startState);
  startState = startState === "start" ? "pause" : "start";
}

function selectBtn() {
  triggerActionThrottled(`${PLAYER_PATH}/selectBtn`, selectState);
  selectState = selectState === "selectA" ? "selectM" : "selectA";
}

function upCross() {
  triggerActionThrottled(`${PLAYER_PATH}/cross`, "up");
}

function downCross() {
  triggerActionThrottled(`${PLAYER_PATH}/cross`, "down");
}

function leftCross() {
  triggerActionThrottled(`${PLAYER_PATH}/cross`, "left");
}

function rightCross() {
  triggerActionThrottled(`${PLAYER_PATH}/cross`, "right");
}

function bBtn() {
  triggerActionThrottled(`${PLAYER_PATH}/button`, "b");
}

function aBtn() {
  triggerActionThrottled(`${PLAYER_PATH}/button`, "a");
}
