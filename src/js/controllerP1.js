const BASE_URL = "https://remotestoragetest-e613a-default-rtdb.europe-west1.firebasedatabase.app/";
const PLAYER_PATH = "player1";

let startState = "start";
let selectState = "selectA";

let actionDelay = 111; // Action switch delay in ms

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


function startBtn() {
  triggerAction(`${PLAYER_PATH}/startBtn`, startState);
  startState = startState === "start" ? "pause" : "start";
}

function selectBtn() {
  triggerAction(`${PLAYER_PATH}/selectBtn`, selectState);
  selectState = selectState === "selectA" ? "selectM" : "selectA";
}

function upCross() {
  triggerAction(`${PLAYER_PATH}/cross`, "up");
}

function downCross() {
  triggerAction(`${PLAYER_PATH}/cross`, "down");
}

function leftCross() {
  triggerAction(`${PLAYER_PATH}/cross`, "left");
}

function rightCross() {
  triggerAction(`${PLAYER_PATH}/cross`, "right");
}

function bBtn() {
  triggerAction(`${PLAYER_PATH}/button`, "b");
}

function aBtn() {
  triggerAction(`${PLAYER_PATH}/button`, "a");
}

