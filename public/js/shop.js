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
    if(selectedBrandFilters.length === 0) displayAll()
}

function displaySelectedBrands() {
  items.forEach((e) => {
    const brand = e.children[1].innerHTML.split(" ")[0];
    if (selectedBrandFilters.includes(brand)) e.style.display = "block";
    else e.style.display = "none";
  });
}

function displayAll() {
  items.forEach((e) => (e.style.display = "block"));
}

for (let i = 0; i < genderFilters.length; i++)
  genderFilters[i].addEventListener("change", function () {
    if (this.checked)
      applyGenderFilter(selectedGenderFilters, genderFilterKeywords, i);
    else removeGenderFilter(selectedGenderFilters, genderFilterKeywords, i);
  });

// prettier-ignore
function applyGenderFilter(selectedGenderFilters, genderFilterKeywords,i) {
  selectedGenderFilters.push(genderFilterKeywords[i]);
  displaySelectedGenders()
}

function removeGenderFilter(selectedGenderFilters, genderFilterKeywords, i) {
  const index = selectedGenderFilters.findIndex(
    (e, i) => e === genderFilterKeywords[i]
  );
  selectedGenderFilters.splice(index, 1);
  displaySelectedGenders();
  if (selectedGenderFilters.length === 0) displayAll();
}

// prettier-ignore
function displaySelectedGenders() {
  items.forEach((e) => {
    const gender = e.children[1].innerHTML.substr(
      e.children[1].innerHTML.length - 1
    );
    if (e.style.display === "block" && !selectedGenderFilters.includes(gender)) {
      e.style.display = "none";
      console.log("fired");
    }
  });
}

// prettier-ignore

clearSearch.addEventListener("click", () => {
  if (searchInput.value !== "") {
    searchInput.value = "";
    sessionStorage.setItem("searchTerm", "all");
    page.performHttpRequest("search", "all");
  }
});
