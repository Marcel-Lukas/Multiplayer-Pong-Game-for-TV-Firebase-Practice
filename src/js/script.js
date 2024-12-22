
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


async function fetchPressedValuesPlayer1() {

  const startData   = await getDataPlayer1("startBtn");
  const selectData  = await getDataPlayer1("selectBtn");
  const crossData   = await getDataPlayer1("cross");
  const buttonData  = await getDataPlayer1("button");

  const displayDiv = document.getElementById("pressedValues1");

  displayDiv.innerHTML = `
    <p><b><u>Player 1</u></b></p>
    <p>Steuerkreuz: ${crossData?.action || "off"}</p>
    <p>Button: ${buttonData?.action || "off"}</p>
    <p>Start: ${startData?.action || "off"}</p>
    <p>Select: ${selectData?.action || "off"}</p>
  `;
}

async function fetchPressedValuesPlayer2() {

  const startData   = await getDataPlayer2("startBtn");
  const selectData  = await getDataPlayer2("selectBtn");
  const crossData   = await getDataPlayer2("cross");
  const buttonData  = await getDataPlayer2("button");

  const displayDiv = document.getElementById("pressedValues2");

  displayDiv.innerHTML = `
    <p><b><u>Player 2</u></b></p>
    <p>Steuerkreuz: ${crossData?.action || "off"}</p>
    <p>Button: ${buttonData?.action || "off"}</p>
    <p>Start: ${startData?.action || "off"}</p>
    <p>Select: ${selectData?.action || "off"}</p>
  `;
}


function startUpdatingValues(intervalMs = 40) {
  fetchPressedValuesPlayer1();
  fetchPressedValuesPlayer2();
  setInterval(() => {
    fetchPressedValuesPlayer1();
    fetchPressedValuesPlayer2();
  }, intervalMs);
}

startUpdatingValues();