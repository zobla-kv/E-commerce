import * as page from "../exports.js";

page.addSearchFunctionality();
page.addPageSwitchFunctionality();
page.addLoginButtonFunctionality();
page.addLoginSubmitFunctionality();
page.addRegButtonFunctionality();
page.addRegSubmitFunctionality();
page.removeCover();

if (sessionStorage.getItem("pageChanger") === "navbar")
  sessionStorage.setItem("searchTerm", "all");

page.performSearch(sessionStorage.getItem("searchTerm"));

const itemImg = document.getElementById("itemImg");
const itemName = document.getElementById("itemName");
const itemPrice = document.getElementById("itemPrice");
const clearSearch = document.getElementById("clearSearch");

itemImg.src = "../assets/img/item1.jpg";
itemName.innerHTML = "Adidas ZX 500 ultra";
itemPrice.innerHTML = "$50";

clearSearch.addEventListener("click", () => {
  if (sessionStorage.getItem("searchTerm") === "all") return;
  sessionStorage.setItem("searchTerm", "all");
  page.performSearch(sessionStorage.getItem("searchTerm"));
});
