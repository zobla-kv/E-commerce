import * as page from "./exports.js";

page.addSearchFunctionality();
page.addPageSwitchFunctionality();
page.addLoginButtonFunctionality();
page.addLoginSubmitFunctionality();
page.addRegButtonFunctionality();
page.addRegSubmitFunctionality();
page.addLogOutButtonFunctionality();
page.removeCover();

const searchInput = document.getElementById("searchInput");

if (sessionStorage.getItem("pageChanger") === "navbar")
  sessionStorage.setItem("searchTerm", "all");
else {
  searchInput.value = sessionStorage.getItem("searchTerm");
  if (searchInput.value === "all") searchInput.value = "";
}

page.performHttpRequest("search", sessionStorage.getItem("searchTerm"));

const itemImg = document.getElementById("itemImg");
const itemName = document.getElementById("itemName");
const itemPrice = document.getElementById("itemPrice");
const clearSearch = document.getElementById("clearSearch");

const navbar = document.getElementById("navbar");
navbar.style.display = "flex";

itemImg.src = "../assets/img/item1.jpg";
itemName.innerHTML = "Adidas ZX 500 ultra";
itemPrice.innerHTML = "$50";

clearSearch.addEventListener("click", () => {
  if (searchInput.value !== "") {
    searchInput.value = "";
    sessionStorage.setItem("searchTerm", "all");
    page.performHttpRequest("search", "all");
  }
});
