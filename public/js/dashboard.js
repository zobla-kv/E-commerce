import {
  addSearchFunctionality as search,
  addPageSwitchFunctionality as pageSwitch,
  addLogOutButtonFunctionality as logout,
  addCartFunctionality as cart,
  tl as animation,
} from "../exports.js";

const navbar = document.getElementById("navbar");
navbar.style.display = "flex";

search();
pageSwitch();
logout();
cart();

const addProduct = document.getElementById("addProduct");
const addButton = document.getElementById("resetButton");
const nameField = document.getElementById("nameInput");
const priceField = document.getElementById("priceInput");
const genderField = document.getElementById("genderInput");
const pictureField = document.getElementById("pictureInput");
const response = document.getElementById("response");
const orders = document.getElementById("orders");
const body = document.getElementsByTagName("body")[0];
const table = document.getElementById("ordersContainer");
const remove = document.getElementsByClassName("remove");
const removeBtns = Array.from(remove);

addButton.addEventListener("click", () => {
  const formData = new FormData();
  const name = nameField.value;
  const price = priceField.value;
  const gender = genderField.value;
  const img = pictureField.files[0];

  formData.append("name", name);
  formData.append("price", price);
  formData.append("gender", gender);
  formData.append("img", img);

  fetch("http://localhost:4000/dashboard", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => (response.innerHTML = data.message));
});

let dropdownActive = false;
let ordersDropdownActive = false;

addProduct.addEventListener("click", () => {
  dropdownActive === false ? animateDrop() : animateLift(event.target);
});

orders.addEventListener("click", () => {
  ordersDropdownActive === false
    ? animateOrdersDrop()
    : animateOrdersLift(event.target);
});

const tl = animation;

//prettier-ignore
function animateDrop() {
  tl.fromTo(addProduct, 0.5, {}, { height: '340px'})
    .fromTo(orders, 0.5, {marginTop: '230px'}, { marginTop: '540px'},"-=0.5")
  dropdownActive = true;
}

//prettier-ignore
function animateLift(e) {
  if(e.tagName !== 'INPUT' && e.tagName !== 'BUTTON'){
    tl.fromTo(addProduct, 0.5, {}, {height: '5vh'})
      .fromTo(orders, 0.5, {marginTop: '560px'}, { marginTop: '230px'}, "-=0.5")
    dropdownActive = false;
  }
}

let ordersContainerHeight = 100;
for (let i = 0; i < table.rows.length; i++) ordersContainerHeight += 50;

function animateOrdersDrop() {
  tl.fromTo(orders, 0.5, {}, { height: ordersContainerHeight });
  ordersDropdownActive = true;
}

//prettier-ignore
function animateOrdersLift(e) {
  if(e.tagName !== 'BUTTON'){
    tl.fromTo(orders, 0.5, {}, {height: '5vh'})
    ordersDropdownActive = false;
  }
}

// prettier - ignore;
for (let i = 0; i < removeBtns.length; i++)
  removeBtns[i].addEventListener("click", function () {
    const order = this.parentNode.parentNode.children[0].innerHTML;
    fetch("http://localhost:4000/dashboard", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ order }),
    })
      .then((res) => res.json())
      .then(() => {
        const row = this.parentNode.parentNode;
        row.parentNode.removeChild(row);
      });
  });
