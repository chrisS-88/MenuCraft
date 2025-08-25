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

// ADD SECTIONS
// ADD SECTION

const sectionsDiv = document.getElementById("sections");
const addSectionBtn = document.getElementById("add-section-btn");

addSectionBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const section = document.createElement("div");
  section.classList.add("section");
  section.innerHTML = `
    <input type="text" placeholder="Section Name">
    <div class="items"></div>
    <button type="button" class="add-item-btn">+ Add Item</button>
  `;
  sectionsDiv.appendChild(section);

  // ADD ITEM

  const addItemBtn = section.querySelector(".add-item-btn");

  addItemBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const itemsDiv = section.querySelector(".items");
    const itemRow = document.createElement("div");

    itemRow.innerHTML = `
      <input type="text" placeholder="Item Name">
      <input type="text" placeholder="Price">
      <textarea type="text" placeholder="Description"></textarea>
    `;
    itemsDiv.appendChild(itemRow);
  });
});

// CAPTURE FORM INPUT

const menuData = {
  restaurauntName: "",
  sections: [],
};

document.addEventListener("DOMContentLoaded", () => {
  initSplash(0);
});
