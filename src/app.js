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
  <div class="bg-slate-300 rounded-lg p-3 mb-5">
    <input type="text" placeholder="Section Name" class="input-style w-2/3 mb-8">
    
      <div class="item bg-slate-200 py-2 px-5 rounded-md my-4">
        <div class="flex justify-between items-center mb-5 pt-2">
          <span class="font-medium tracking-wide">Item 1</span>
          <button class="py-1 px-6 rounded-md bg-red-400 ">x</button>
        </div>
        <div class="name-price-row flex gap-2 align-middle">
          <input type="text" placeholder="Item Name" class="input-style name flex-auto">
          <input type="text" placeholder="Price" class="input-style price w-1/5  ">
        </div>
          <textarea placeholder="Description(optional)" class="input-style desc w-full"></textarea>
      </div>
      <button type="button" class="add-item-btn px-4 py-2 rounded-md  bg-sky-400 hover:bg-sky-500">+ Add Item</button>
    </div>
  </div>
  `;
  sectionsDiv.appendChild(section);

  // ADD ITEM

  const addItemBtn = section.querySelector(".add-item-btn");
  // ASSIGN COUNT FOR ITEM COUNT
  let count = 1;
  addItemBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const itemsDiv = section.querySelector(".item");
    const itemRow = document.createElement("div");

    // INCREMENT THE ITEM COUNT
    count++;

    itemRow.innerHTML = `
      <div class="item">
        <div class="flex justify-between items-center mt-3 mb-5 border-t-1 pt-4">
          <span class="font-medium tracking-wide">Item ${count}</span>
          <button class="delete-item-btn py-1 px-6 rounded-md bg-red-400 ">x</button>
        </div>
        
        <div class="name-price-row flex gap-2">
          <input type="text" placeholder="Item Name" class="input-style name flex-auto">
          <input type="text" placeholder="Price" class="input-style price w-1/5  ">
        </div>
          <textarea placeholder="Description(optional)" class="input-style desc w-full"></textarea>
      </div>
    `;
    itemsDiv.appendChild(itemRow);

    const deleteBtn = itemRow.querySelector(".delete-item-btn");
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      itemRow.remove();
    });
  });
});

// DELETE ITEMS

const removeItem = (e) => {};

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

      if (name || price || desc) {
        items.push({ name, price, desc });
      }
    });

    if (sectionName || items.length) {
      restaurant.sections.push({ name: sectionName, items });
    }
  });

  // SAVE OBJECT IN LOCAL

  localStorage.setItem("menu", JSON.stringify(restaurant));

  // TEMP-----
  const objOutput = document.querySelector(".object-output");
  const node = document.createTextNode(JSON.stringify(restaurant, null, 4));

  objOutput.appendChild(node);
  // -----TEMP
};

document.addEventListener("DOMContentLoaded", () => {
  initSplash(0);

  const generatMenuBtn = document.getElementById("generate-menu");
  generatMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    collectMenuData();
  });
});
