import * as page from "../exports.js";

const navbar = document.getElementById("navbar");
navbar.style.display = "flex";

const gender = document.getElementById("genderValue");

if (gender.innerHTML === "M") gender.innerHTML = "male";
else gender.innerHTML = "female";

page.addSearchFunctionality();
page.addPageSwitchFunctionality();
page.addLoginButtonFunctionality();
page.addLoginSubmitFunctionality();
page.addRegButtonFunctionality();
page.addRegSubmitFunctionality();
page.addLogOutButtonFunctionality();
page.removeCover();

const quantity = document.getElementById("quantity");
const increase = document.getElementById("increase");
const decrease = document.getElementById("decrease");
const addToCart = document.getElementById("add");
const response = document.getElementById("response");

quantity.innerHTML = 1;

increase.addEventListener("click", () => {
  if (quantity.innerHTML < 5) quantity.innerHTML++;
});

decrease.addEventListener("click", () => {
  if (quantity.innerHTML > 1) quantity.innerHTML--;
});
