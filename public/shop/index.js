import * as page from "../exports.js";
page.addPageSwitchFunctionality();
page.addLoginButtonFunctionality();
page.addLoginSubmitFunctionality();
page.addRegButtonFunctionality();
page.addRegSubmitFunctionality();
page.removeCover();

const itemImg = document.getElementById("itemImg");
const itemName = document.getElementById("itemName");
const itemPrice = document.getElementById("itemPrice");

itemImg.src = "../assets/img/item1.jpg";
itemName.innerHTML = "Adidas ZX 500 ultra";
itemPrice.innerHTML = "$50";
