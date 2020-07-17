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

const remove = document.getElementsByClassName("remove");
const table = document.getElementById("itemsContainer");
const totalPrice = document.getElementById("total");

const removeBtns = Array.from(remove);

// prettier-ignore
for (let i = 0; i < removeBtns.length; i++)
  removeBtns[i].addEventListener("click", function () {
    const productName = this.parentNode.parentNode.children[0].innerHTML.split(">")[1].split("<")[0];;
    fetch('http://localhost:4000/cart', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({productName})
    }).then(res => res.json())
      .then((data)=> {
        const row = this.parentNode.parentNode;
        row.parentNode.removeChild(row);
        totalPrice.innerHTML = `= ${data.newPrice} $`;
  })
});
