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

const updateProfile = document.getElementById("updateProfile");
const resetButton = document.getElementById("resetButton");
const password = document.getElementById("repeatInput");
const response = document.getElementById("response");

resetButton.addEventListener("click", () => {
  const data = { password: password.value };
  fetch("http://localhost:4000/profile", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => (response.innerHTML = data.message));
});

let dropdownActive = false;

if (updateProfile)
  updateProfile.addEventListener("click", () => {
    dropdownActive === false ? animateDrop() : animateLift(event.target);
  });

const tl = animation;

//prettier-ignore
function animateDrop() {
  tl.fromTo(updateProfile, 0.5, {}, { height: '250px'});
  dropdownActive = true;
}

//prettier-ignore
function animateLift(e) {
  if(e.tagName !== 'INPUT' && e.tagName !== 'BUTTON'){
    tl.fromTo(updateProfile, 0.5, {}, {height: '5vh'})
    dropdownActive = false;
  }
}
