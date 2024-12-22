const BASE_URL = "https://remotestoragetest-e613a-default-rtdb.europe-west1.firebasedatabase.app/";
const PLAYER_PATH = "player2";

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

async function triggerAction(path, action, delay = 46) {
  await postData(path, { action: action });
  
  setTimeout(() => {
    postData(path, { action: "off" });
  }, delay);
}

function startBtn() {
  triggerAction(`${PLAYER_PATH}/startBtn`, "start");
}

function selectBtn() {
  triggerAction(`${PLAYER_PATH}/selectBtn`, "select");
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
