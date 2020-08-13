const compose = (...functions) => (data) =>
  functions.reduceRight((value, func) => func(value), data);

let description = document.getElementById("description");
let carbs = document.getElementById("carbs");
let calories = document.getElementById("calories");
let protein = document.getElementById("protein");

const addBtn = document.querySelector(".addButton");

addBtn.addEventListener("click", (e) => {
  description.value === "" ? description.classList.add("is-invalid") : null;
  carbs.value === "" ? carbs.classList.add("is-invalid") : null;
  calories.value === "" ? calories.classList.add("is-invalid") : null;
  protein.value === "" ? protein.classList.add("is-invalid") : null;

  if (description.value && carbs.value && calories.value && protein.value) {
    console.log("ok");
  }
});

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
