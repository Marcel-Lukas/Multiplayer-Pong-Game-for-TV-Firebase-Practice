function goFullscreen() {
  const element = document.documentElement;
  
  if (element.requestFullscreen) {
      element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) { // Für Safari
      element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // Für ältere IE-Versionen
      element.msRequestFullscreen();
  } else {
      alert("Vollbildmodus wird nicht unterstützt.");
  }
}


["a", "b", "right", "down", "up", "left", "start", "select"].forEach(id => {
  document.getElementById(id).addEventListener("click", goFullscreen);
});
