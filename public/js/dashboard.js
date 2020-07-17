import * as page from "../exports.js";

const navbar = document.getElementById("navbar");
navbar.style.display = "flex";

page.addSearchFunctionality();
page.addPageSwitchFunctionality();
page.addLoginButtonFunctionality();
page.addLoginSubmitFunctionality();
page.addRegButtonFunctionality();
page.addRegSubmitFunctionality();
page.addLogOutButtonFunctionality();
page.addCartFunctionality();
page.removeCover();

const addProduct = document.getElementById("updateProfile");
const addButton = document.getElementById("resetButton");
const nameField = document.getElementById("nameInput");
const priceField = document.getElementById("priceInput");
const genderField = document.getElementById("genderInput");
const pictureField = document.getElementById("pictureInput");
const response = document.getElementById("response");

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

addProduct.addEventListener("click", () => {
  dropdownActive === false ? animateDrop() : animateLift(event.target);
});

const tl = page.tl;

//prettier-ignore
function animateDrop() {
  tl.fromTo(addProduct, 0.5, {}, { height: '340px'});
  dropdownActive = true;
}

//prettier-ignore
function animateLift(e) {
  if(e.tagName !== 'INPUT' && e.tagName !== 'BUTTON'){
    tl.fromTo(updateProfile, 0.5, {}, {height: '5vh'})
    dropdownActive = false;
  }
}
