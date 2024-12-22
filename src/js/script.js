
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

  const displayDiv = document.getElementById("pressedValues");

  displayDiv.innerHTML = `
    <p>Start: ${startData?.action || "off"}</p>
    <p>Select: ${selectData?.action || "off"}</p>
    <p>Cross: ${crossData?.action || "off"}</p>
    <p>Button: ${buttonData?.action || "off"}</p>
  `;
}


function startUpdatingValues(intervalMs = 40) {
  fetchPressedValues();
  setInterval(() => {
    fetchPressedValues();
  }, intervalMs);
}
