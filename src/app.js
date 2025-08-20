// SPLASH SCREEN
const showSplash = () => {
  const splashScreen = document.getElementById("splash");
  splashScreen.style.display = "flex-1";
  splashScreen.style.opacity = "1";
};

const hideSplash = () => {
  const splashScreen = document.getElementById("splash");
  splashScreen.classList.add("fade-out");

  setTimeout(() => {
    splashScreen.style.display = "none";
    document.getElementById("main-content").style.opacity = "1";
  }, 300);
};

const initSplash = (timeout = 3000) => {
  showSplash();
  setTimeout(hideSplash, timeout);
};

// CAPTURE FORM INPUT

const menuData = {
  restaurauntName: "",
  sections: [],
};

document.addEventListener("DOMContentLoaded", () => {
  initSplash(0);
});
