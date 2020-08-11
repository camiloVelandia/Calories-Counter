const compose = (...functions) => (data) =>
  functions.reduceRight((value, func) => func(value), data);

let description = document.getElementById("description");
let carbs = document.getElementById("carbs");
let calories = document.getElementById("calories");
let protein = document.getElementById("protein");
