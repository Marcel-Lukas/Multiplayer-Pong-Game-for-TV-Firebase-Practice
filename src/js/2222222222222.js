
function init() {
  // deleteData();
}

const BASE_URL = "https://remotestoragetest-e613a-default-rtdb.europe-west1.firebasedatabase.app/";

async function postData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}



function startBtn() {
  console.log("Start Button");
  postData("startBtn", { action: "start" });
  postData("startBtn", { action: "off" });
}

function selectBtn() {
  console.log("Select Button");
  postData("selectBtn", { action: "select" });
  postData("selectBtn", { action: "off" });
}




function upCross() {
  console.log("Up");
  postData("cross", { action: "up" });
  postData("cross", { action: "off" });
}

function downCross() {
  console.log("Down");
  postData("cross", { action: "down" });
  postData("cross", { action: "off" });
}

function leftCross() {
  console.log("Left");
  postData("cross", { action: "left" });
  postData("cross", { action: "off" });
}

function rightCross() {
  console.log("Right");
  postData("cross", { action: "right" });
  postData("cross", { action: "off" });
}



function bBtn() {
  console.log("B Button");
  postData("button", { action: "b" });
  postData("button", { action: "off" });
}

function aBtn() {
  console.log("A Button");
  postData("button", { action: "a" });
  postData("button", { action: "off" });
}


