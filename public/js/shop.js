import * as page from "./exports.js";

page.addSearchFunctionality();
page.addPageSwitchFunctionality();
page.addLoginButtonFunctionality();
page.addLoginSubmitFunctionality();
page.addRegButtonFunctionality();
page.addRegSubmitFunctionality();
page.addLogOutButtonFunctionality();
page.removeCover();

const navbar = document.getElementById("navbar");
navbar.style.display = "flex";

const search = document.getElementById("search");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const nikeFilter = document.getElementById("nikeFilter");
const adidasFilter = document.getElementById("adidasFilter");
const pumaFilter = document.getElementById("pumaFilter");
const reebokFilter = document.getElementById("reebokFilter");
const maleFilter = document.getElementById("maleFilter");
const femaleFilter = document.getElementById("femaleFilter");
const products = document.getElementsByClassName("product");
const shopItemsContainer = document.getElementById("shopItemsContainer");
const latestFilter = document.getElementById("latestFilter");
const priceFilter = document.getElementById("priceFilter");

if (sessionStorage.getItem("pageChanger") === "navbar")
  sessionStorage.setItem("searchTerm", "all");
else searchInput.value = sessionStorage.getItem("searchTerm");
if (searchInput.value === "all") searchInput.value = "";

const brandFilters = [nikeFilter, adidasFilter, pumaFilter, reebokFilter];
const brandFilterKeywords = ["Nike", "Adidas", "Puma", "Reebok"];
const selectedBrandFilters = [];

const genderFilters = [maleFilter, femaleFilter];
const genderFilterKeywords = ["M", "F"];
const selectedGenderFilters = [];

const allFilters = [
  ...brandFilters,
  ...genderFilters,
  latestFilter,
  priceFilter,
];

const items = Array.from(products);
const regularSortedItems = [...items];

for (let i = 0; i < regularSortedItems.length; i++)
  regularSortedItems[i].addEventListener("click", () => {
    document.location.href =
      "/shop/products/" + regularSortedItems[i].innerText.split("-")[0];
  });

items.forEach((e) => (e.style.display = "block"));

performSearch(sessionStorage.getItem("searchTerm"));

//prettier-ignore
function performSearch(searchTerm) {
  if (searchTerm === "all") {
    for (let i = 0; i < items.length; i++) items[i].style.display = "block";
  } else {
    items.forEach((e) => {
      if (e.innerText.split("-")[0].toLowerCase().includes(searchTerm.toLowerCase())) {
        e.style.display = "block";
      } else {
        e.style.display = "none";
      }
    });
  }
}

function clearFilters() {
  for (let i = 0; i < allFilters.length; i++)
    if (allFilters[i].checked === true) allFilters[i].click();
  allFilters[6].click();
  searchInput.value = "";
}

// prettier-ignore
const productNames = items.map((e) => e.children[1].innerHTML.split("-")[0].toLowerCase());
const sortedProductNames = [];

// prettier-ignore

// prettier-ignore
for (let i = 0; i < brandFilters.length; i++)
  brandFilters[i].addEventListener("change", function () {
    if (this.checked) applyBrandFilter(selectedBrandFilters, brandFilterKeywords, i);
    else removeBrandFilter(selectedBrandFilters, brandFilterKeywords, i);
  });

function applyBrandFilter(selectedBrandFilters, brandFilterKeywords, i) {
  selectedBrandFilters.push(brandFilterKeywords[i]);
  displaySelectedBrands();
}

// prettier-ignore
function removeBrandFilter(selectedBrandFilters, brandFilterKeywords,i){;
    const index = selectedBrandFilters.findIndex((e) => e === brandFilterKeywords[i]);
    selectedBrandFilters.splice(index, 1);
    displaySelectedBrands()
    if(selectedBrandFilters.length === 0) displayAll(selectedGenderFilters, 'gender')
}

// prettier-ignore
function displaySelectedBrands() {
  sessionStorage.setItem('searchTerm', 'all')
  searchInput.value = ''
  items.forEach((e) => {
    const brand = e.children[1].innerHTML.split(" ")[0];
    const gender = e.children[1].innerHTML.substr(e.children[1].innerHTML.length - 1);
    if (selectedBrandFilters.includes(brand))
      if (selectedGenderFilters.length > 0) {
        if (selectedGenderFilters.includes(gender)) e.style.display = "block";
      } else {
        e.style.display = "block";
      }
    else e.style.display = "none";
  });
}

// prettier-ignore
function displayAll(selectedFilter, type) {
  if(selectedFilter.length === 0) items.forEach(e => e.style.display = 'block')
  else {
    if(type === 'brand'){
      items.forEach((e) => {
        const brand = e.children[1].innerHTML.split(" ")[0]
        if(e.style.display === 'none' && selectedFilter.includes(brand)) 
          e.style.display = 'block';
        else e.style.display = 'none'
      })
    }
    else {
      items.forEach((e) => {
        const gender = e.children[1].innerHTML.substr(e.children[1].innerHTML.length - 1)
        if(e.style.display === 'none' && selectedFilter.includes(gender)) {
          e.style.display = 'block';
        }
        else e.style.display = 'none'
      })
    }
  }
}

// prettier-ignore
for(let i=0;i<genderFilters.length;i++)
genderFilters[i].addEventListener('change', function(){
  if(this.checked){
    selectedGenderFilters.push(genderFilterKeywords[i]);
    sessionStorage.setItem('searchTerm', 'all')
    searchInput.value = ''
    items.forEach(e => {
      const gender = e.children[1].innerHTML.substr(e.children[1].innerHTML.length - 1)
      const brand = e.children[1].innerHTML.split(" ")[0];
      if (selectedGenderFilters.includes(gender))
        if (selectedBrandFilters.length > 0) {
          if (selectedBrandFilters.includes(brand)) e.style.display = "block"; 
        } else {
          e.style.display = "block";
        }
      else {
        e.style.display = "none";
      }
    })
  }
  else{
    const index = selectedGenderFilters.findIndex((e) => e === genderFilterKeywords[i]);
    selectedGenderFilters.splice(index, 1);
    items.forEach(e => {
      const gender = e.children[1].innerHTML.substr(e.children[1].innerHTML.length - 1)
      if(e.style.display === 'block' && selectedGenderFilters.includes(gender)) return
      else e.style.display = 'none';
    })
  }
  if(selectedGenderFilters.length === 0) displayAll(selectedBrandFilters, 'brand')
})

// sort

// prettier-ignore
priceFilter.addEventListener("change", function () {
  if (this.checked) {
    items.sort(function (a, b) {
      return (Number(b.children[2].innerHTML.split(" ")[0]) - Number(a.children[2].innerHTML.split(" ")[0]));
    });
    for (let i = 0; i < items.length; i++){
      shopItemsContainer.appendChild(items[i]);
      sortedProductNames.push(items[i].innerText.split("-")[0]);
    }
  }
});

latestFilter.addEventListener("change", function () {
  if (this.checked)
    for (let i = 0; i < regularSortedItems.length; i++)
      shopItemsContainer.appendChild(regularSortedItems[i]);
});

clearSearch.addEventListener("click", () => {
  clearFilters();
  for (let i = 0; i < items.length; i++) {
    shopItemsContainer.appendChild(items[i]);
    items[i].style.display = "block";
  }
});
