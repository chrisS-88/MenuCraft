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
const sectionH3 = document.querySelector(".title-appear");

addSectionBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const section = document.createElement("div");
  section.classList.add("section");
  sectionH3.classList.remove("hidden");
  section.innerHTML = `
  <div class="bg-blue-500 rounded-lg p-3 mb-3">
    <input type="text" placeholder="Section Name" class="input-style w-2/3">
    <div class="w-full bg-blue-300 h-px my-2"></div>
    
      <div class="item">
        <div class="name-price-row">
          <input type="text" placeholder="Item Name" class="input-style name w-2/3">
          <input type="text" placeholder="Price" class="input-style price ">
        </div>
          <textarea placeholder="Description" class="input-style desc"></textarea>
      </div>
      <button type="button" class="add-item-btn">+ Add Item</button>
    </div>
  </div>
  `;
  sectionsDiv.appendChild(section);

  // ADD ITEM

  const addItemBtn = section.querySelector(".add-item-btn");

  addItemBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const itemsDiv = section.querySelector(".item");
    const itemRow = document.createElement("div");

    itemRow.innerHTML = `
      <div class="item">
        <div class="name-price-row">
          <input type="text" placeholder="Item Name" class="input-style name w-2/3">
          <input type="text" placeholder="Price" class="input-style price ">
        </div>
          <textarea placeholder="Description" class="input-style desc"></textarea>
      </div>
    `;
    itemsDiv.appendChild(itemRow);
  });
});

// CAPTURE FORM INPUT

const collectMenuData = () => {
  // grab restaurant name
  const restaurantName = (document.getElementById("restaurant-name")?.value || "").trim();

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
    const itemRow = section.querySelectorAll(".item");
    itemRow.forEach((row) => {
      const namePriceRow = row.querySelector(".name-price-row");
      const name = namePriceRow?.querySelector(".name").value.trim() || "";
      const price = parseFloat(namePriceRow?.querySelector(".price")?.value) || 0;
      const desc = row.querySelector(".desc").value.trim() || "";

      // const description = row.querySelector(".item textarea");

      // const name = (namePriceRow[0]?.value || "").trim();
      // const price = parseFloat(namePriceRow[1]?.value || "");
      // const desc = (description[0]?.value || "").trim();

      if (name || price || desc) {
        items.push({ name, price, desc });
      }
    });

    if (sectionName || items.length) {
      restaurant.sections.push({ name: sectionName, items });
    }
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
