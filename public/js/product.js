import * as page from "../exports.js";

const navbar = document.getElementById("navbar");
navbar.style.display = "flex";

let name = document.getElementById("value").innerText;
const gender = document.getElementById("genderValue");
const price = document.getElementById("price").innerText;

const priceValue = price.split(":")[1].split(" ")[1].replace(/\s/g, "");

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

if (quantity) quantity.innerHTML = 1;

if (increase)
  increase.addEventListener("click", () => {
    if (quantity.innerHTML < 5) quantity.innerHTML++;
  });

if (decrease)
  decrease.addEventListener("click", () => {
    if (quantity.innerHTML > 1) quantity.innerHTML--;
  });

if (addToCart)
  addToCart.addEventListener("click", () => {
    const data = {
      name,
      gender: gender.innerHTML,
      price: Number(priceValue),
      quantity: Number(quantity.innerHTML),
    };
    fetch("http://localhost:4000/cart", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        response.innerHTML = data.message;
        clearResponseMessage();
      });
  });

function clearResponseMessage() {
  setTimeout(() => {
    response.innerHTML = "";
  }, 3000);
}
