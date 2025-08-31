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

const collectMenuData = () => {
  // grab restaurant name
  const restaurantName = document.getElementById("restauraunt-name").value;

  // grab all sections
  const sectionDivs = document.querySelectorAll("#sections .section");
  // start object
  let restaurant = { name: restaurantName || "Untitled Restaurant".trim(), sections: [] };
  // loop through sections
  sectionDivs.forEach((section) => {
    const sectionNameInput = section.querySelector("input");
    const sectionName = sectionNameInput?.value || "Untitled Section".trim();

    const items = [];
    // loop items inside section
    const itemRow = section.querySelectorAll(".items div");
    itemRow.forEach((row) => {
      const inputs = row.querySelectorAll("input");
      const description = row.querySelectorAll("textarea");
      const name = inputs[0].value;
      const price = inputs[1].value;
      const desc = description[0].value;

      items.push({ name, price, desc });
    });

    restaurant.sections.push({ name: sectionName, items });
  });
  // TEMP
  const objOutput = document.querySelector(".object-output");
  const node = document.createTextNode(JSON.stringify(restaurant, null, 4));

  objOutput.appendChild(node);
};

document.addEventListener("DOMContentLoaded", () => {
  initSplash(0);

  const generatMenuBtn = document.getElementById("generate-menu");
  generatMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    collectMenuData();
  });
});
