
function init() {
  renderChat();
  // deleteData();
}

const BASE_URL = "https://remotestoragetest-e613a-default-rtdb.europe-west1.firebasedatabase.app/";

async function loadData(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  return await response.json();
}

async function postData(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}


document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
});


function send() {
  const nickname = document.getElementById('nickname').value.trim();
  const message = document.getElementById('message').value.trim();
  const errorMessagesDiv = document.getElementById('error-messages');
  const messagesCon = document.getElementById("error-con");

  function showError(message) {
    errorMessagesDiv.textContent = message;
    messagesCon.classList.remove("d-none");

    setTimeout(() => {
      messagesCon.classList.add("d-none");
    }, 3333);
  }

  if (!nickname && !message) {
    showError("Bitte trage einen Nicknamen ein und schreibe eine Nachricht, bevor du sie mit Enter absendest!");
  } else if (!nickname) {
    showError("Nicknamen bitte noch eintragen!");
  } else if (!message) {
    showError("Nachricht darf nicht leer sein!");
  } else {
    postData("chatData", {
      nickname: nickname,
      message: message,
      timestamp: new Date().toISOString(),
    }).then(() => {
      renderChat();
      document.getElementById('message').value = "";
    }).catch(error => {
      console.error("Fehler:", error);
    });
  }
}


document.getElementById('message').addEventListener('keydown', function(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    send();
  }
});

function renderChat() {
  const outputElement = document.getElementById('output');

  loadData("chatData")
    .then(data => {
      if (data) {

        const messages = Object.values(data).sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        outputElement.innerHTML = messages.map(msg => `
          <p><strong>${msg.nickname}:</strong> ${msg.message}</p>
        `).join('');
      } else {
        outputElement.innerHTML = "<p id='new-chat-message'><b>Alle Daten gelöscht!</b><br>Neuer Chat...</p>";
      }
    })
    .catch(error => {
      console.error("Fehler beim Laden der Daten:", error);
    });
}


function endChat() {
  deleteData();
  setTimeout(function() {
    location.reload();
  }, 88);
}



async function deleteData(path="") {
  let response = await fetch(BASE_URL + path + ".json",{
    method: "DELETE",
  });
  return responseToJson = await response.json();
}



function continuousScrollPage() {
  window.scrollBy(0, 200);
}

let scrollIntervalPage = setInterval(continuousScrollPage, 100);



function continuousScrollChat() {
  const element = document.getElementById("output");
  if (element) {

    element.scrollTop += 33;

  }
}

let scrollIntervalChat = setInterval(continuousScrollChat, 333);
