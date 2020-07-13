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
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const nikeFilter = document.getElementById("nikeFilter");
const adidasFilter = document.getElementById("adidasFilter");
const pumaFilter = document.getElementById("pumaFilter");
const reebokFilter = document.getElementById("reebokFilter");
const maleFilter = document.getElementById("maleFilter");
const femaleFilter = document.getElementById("femaleFilter");
const products = document.getElementsByClassName("product");

if (sessionStorage.getItem("pageChanger") === "navbar")
  sessionStorage.setItem("searchTerm", "all");
else {
  searchInput.value = sessionStorage.getItem("searchTerm");
  if (searchInput.value === "all") searchInput.value = "";
}

const brandFilters = [nikeFilter, adidasFilter, pumaFilter, reebokFilter];
const brandFilterKeywords = ["Nike", "Adidas", "Puma", "Reebok"];
const selectedBrandFilters = [];

const genderFilters = [maleFilter, femaleFilter];
const genderFilterKeywords = ["M", "F"];
const selectedGenderFilters = [];

const items = Array.from(products);

items.forEach((e) => (e.style.display = "block"));

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

function displaySelectedBrands() {
  items.forEach((e) => {
    const brand = e.children[1].innerHTML.split(" ")[0];
    const gender = e.children[1].innerHTML.substr(
      e.children[1].innerHTML.length - 1
    );
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
const shopItemsContainer = document.getElementById("shopItemsContainer");
const latestFilter = document.getElementById("latestFilter");
const priceFilter = document.getElementById("priceFilter");
const regularSortedItems = [...items];

priceFilter.addEventListener("change", function () {
  if (this.checked) {
    items.sort(function (a, b) {
      return (
        Number(b.children[2].innerHTML.split(" ")[0]) -
        Number(a.children[2].innerHTML.split(" ")[0])
      );
    });
    for (let i = 0; i < items.length; i++)
      shopItemsContainer.appendChild(items[i]);
  }
});

latestFilter.addEventListener("change", function () {
  if (this.checked)
    for (let i = 0; i < regularSortedItems.length; i++)
      shopItemsContainer.appendChild(regularSortedItems[i]);
});

clearSearch.addEventListener("click", () => {
  if (searchInput.value !== "") {
    searchInput.value = "";
    sessionStorage.setItem("searchTerm", "all");
    page.performHttpRequest("search", "all");
  }
});
