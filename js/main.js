const compose = (...functions) => (data) =>
  functions.reduceRight((value, func) => func(value), data);

let description = document.getElementById("description");
let carbs = document.getElementById("carbs");
let calories = document.getElementById("calories");
let protein = document.getElementById("protein");
let list = [];
const addBtn = document.querySelector(".addButton");

const attrsToString = (obj = {}) => {
  const keys = Object.assign(obj);
  const attrs = [];

  for (let i = 0; i < keys.length; i++) {
    let attr = keys[i];
    attrs.push(`${attr}='${obj[attr]}'`);
  }
  const string = attrs.join("");
  return string;
};

const tagAttrs = (obj) => (content = "") =>
  `<${obj.tag}${obj.attrs ? "" : ""}${attrsToString(obj.attrs)}> ${content}</${
    obj.tag
  }>`;

const tag = (t) => {
  if (typeof t === "string") {
    return tagAttrs({ tag: t });
  }
  return tagAttrs(t);
};

const tableRowTag = tag("tr");
const tableRow = (items) => compose(tableRowTag, tableCells)(items);

const tableCell = tag("td");
const tableCells = (items) => items.map(tableCell).join("");

const trashIcon = tag({ tag: "i", attrs: { class: "fas fa-trash-alt" } })("");

addBtn.addEventListener("click", (e) => {
  description.value === "" ? description.classList.add("is-invalid") : null;
  carbs.value === "" ? carbs.classList.add("is-invalid") : null;
  calories.value === "" ? calories.classList.add("is-invalid") : null;
  protein.value === "" ? protein.classList.add("is-invalid") : null;

  if (description.value && carbs.value && calories.value && protein.value) {
    add();
  }
});

const add = () => {
  const newItem = {
    description: description.value,
    calories: parseInt(calories.value),
    carbs: parseInt(carbs.value),
    protein: parseInt(protein.value),
  };

  list.push(newItem);
  cleanInputs();
  updateTotals();
  renderItems();
};

const updateTotals = () => {
  let calories = 0,
    carbs = 0,
    protein = 0;

  list.map((item) => {
    (calories += item.calories),
      (carbs += item.carbs),
      (protein += item.protein);
  });

  document.getElementById("totalCalories").innerHTML = calories;
  document.getElementById("totalCarbs").innerHTML = carbs;
  document.getElementById("totalProtein").innerHTML = protein;
};

const cleanInputs = () => {
  description.value = "";
  calories.value = "";
  carbs.value = "";
  protein.value = "";
};

const renderItems = () => {
  const listWrapper = document.querySelector("tbody");

  listWrapper.innerHTML = "";

  list.map((item, index) => {
    const removeButton = tag({
      tag: "button",
      attrs: {
        class: "btn btn-outline-danger",
        onclick: `removeItem(${index}) `,
      },
    })(trashIcon);
    listWrapper.innerHTML += tableRow([
      item.description,
      item.calories,
      item.carbs,
      item.protein,
      removeButton,
    ]);
  });
};

const removeItem = (index) => {
  list.splice(index, 1);

  updateTotals();
  renderItems();
};

description.addEventListener("keypress", (e) => {
  description.classList.remove("is-invalid");
});
carbs.addEventListener("keypress", (e) => {
  carbs.classList.remove("is-invalid");
});
calories.addEventListener("keypress", (e) => {
  calories.classList.remove("is-invalid");
});
protein.addEventListener("keypress", (e) => {
  protein.classList.remove("is-invalid");
});
