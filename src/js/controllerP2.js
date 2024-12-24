const BASE_URL = "https://remotestoragetest-e613a-default-rtdb.europe-west1.firebasedatabase.app/";
const PLAYER_PATH = "player2";

let startState = "start";
let selectState = "selectA";

const actionDelay = 333; // Action switch Delay in ms
const throttleTiming = 175; // Throttle Delay in ms

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

async function triggerAction(path, action) {
  await postData(path, { action: action });
}

let activeAction = null;

function startAction(action, path) {
  if (activeAction !== action) {
    activeAction = action;
    triggerAction(path, action);
  }
}

function stopAction(path) {
  if (activeAction) {
    triggerAction(path, "off");
    activeAction = null;
  }
}

function bindButtonEvents(buttonId, action, path) {
  const button = document.getElementById(buttonId);

  button.addEventListener("mousedown", () => startAction(action, path));
  button.addEventListener("mouseup", () => stopAction(path));
  button.addEventListener("mouseleave", () => stopAction(path));
  button.addEventListener("touchstart", () => startAction(action, path), { passive: true });
  button.addEventListener("touchend", () => stopAction(path), { passive: true });
}

function startBtn() {
  triggerAction(`${PLAYER_PATH}/startBtn`, startState);
  startState = startState === "start" ? "pause" : "start";
}

function selectBtn() {
  triggerAction(`${PLAYER_PATH}/selectBtn`, selectState);
  selectState = selectState === "selectA" ? "selectM" : "selectA";
}

document.addEventListener("DOMContentLoaded", () => {
  bindButtonEvents("up", "up", `${PLAYER_PATH}/cross`);
  bindButtonEvents("down", "down", `${PLAYER_PATH}/cross`);
  bindButtonEvents("left", "left", `${PLAYER_PATH}/cross`);
  bindButtonEvents("right", "right", `${PLAYER_PATH}/cross`);
  bindButtonEvents("a", "a", `${PLAYER_PATH}/button`);
  bindButtonEvents("b", "b", `${PLAYER_PATH}/button`);
});
