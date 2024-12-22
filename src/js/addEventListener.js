let intervalId = null;

function startAction(action) {
  if (!intervalId) {
    intervalId = setInterval(action, 44);
  }
}

function stopAction() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function bindButtonEvents(buttonId, action) {
  const button = document.getElementById(buttonId);
  button.addEventListener("mousedown", () => startAction(action));
  button.addEventListener("mouseup", stopAction);
  button.addEventListener("mouseleave", stopAction);
  button.addEventListener("touchstart", () => startAction(action), { passive: true });
  button.addEventListener("touchend", stopAction, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  bindButtonEvents("up", upCross);
  bindButtonEvents("down", downCross);
  bindButtonEvents("left", leftCross);
  bindButtonEvents("right", rightCross);
  bindButtonEvents("a", aBtn);
  bindButtonEvents("b", bBtn);
});