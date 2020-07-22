import {
  addSearchFunctionality as search,
  addPageSwitchFunctionality as pageSwitch,
  addLogOutButtonFunctionality as logout,
  addCartFunctionality as cart,
} from "../exports.js";

const navbar = document.getElementById("navbar");
navbar.style.display = "flex";

search();
pageSwitch();
logout();
cart();

const table = document.getElementById("itemsContainer");
const totalPrice = document.getElementById("total");
const placeOrder = document.getElementById("placeAndResponse");
const numOfItems = document.getElementById('numOfItems');
const remove = document.getElementsByClassName("remove");
const removeBtns = Array.from(remove);

let placeOrderHeight = 0;

if (table.rows.length > 2) {
  placeOrder.style.display = "block";
  for (let i = 0; i < removeBtns.length; i++) placeOrderHeight += 35;
}

placeOrder.style.marginTop = placeOrderHeight + "px";

// prettier-ignore
for (let i = 0; i < removeBtns.length; i++)
  removeBtns[i].addEventListener("click", function () {
    const productName = this.parentNode.parentNode.children[0].innerHTML.split(">")[1].split("<")[0];
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

        if(table.rows.length === 2) orderButton.style.display = 'none'
        else {
          placeOrderHeight -= 50;
          placeOrder.style.marginTop = placeOrderHeight + 'px'
        }    
  })
});

const orderButton = document.getElementById("placeOrder");

orderButton.addEventListener("click", () => {
  fetch("http://localhost:4000/cart", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      response.innerHTML = data.message;
      orderButton.style.display = "none";
      deleteRows().then(() => {
        response.style.position = "absolute";
        response.style.top = "-30px";
        response.style.left = "23px";
      });
      setTimeout(() => {
        response.style.display = "none";
      }, 3000);
    });
});


function deleteRows() {
  return new Promise((resolve) => {
    for (let i = 0; i < removeBtns.length; i++) {
      removeBtns[i].click();
      numOfItems.innerHTML--;
    }
    setTimeout(() => {
      resolve();
    }, 300);
  });
}
