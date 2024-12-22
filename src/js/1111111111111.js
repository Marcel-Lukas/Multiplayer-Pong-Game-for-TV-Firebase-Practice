
function init() {
  // deleteData();
}

const BASE_URL = "https://remotestoragetest-e613a-default-rtdb.europe-west1.firebasedatabase.app/";


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


async function triggerAction(path, action, delay = 22) {

  await postData(path, { action: action });
  
  setTimeout(() => {
    postData(path, { action: "off" });
  }, delay);
}


function startBtn() {
  console.log("Start Button");
  triggerAction("startBtn", "start");
}

function selectBtn() {
  console.log("Select Button");
  triggerAction("selectBtn", "select");
}



function upCross() {
  console.log("Up");
  triggerAction("cross", "up");
}

function downCross() {
  console.log("Down");
  triggerAction("cross", "down");
}

function leftCross() {
  console.log("Left");
  triggerAction("cross", "left");
}

function rightCross() {
  console.log("Right");
  triggerAction("cross", "right");
}



function bBtn() {
  console.log("B Button");
  triggerAction("button", "b");
}

function aBtn() {
  console.log("A Button");
  triggerAction("button", "a");
}

