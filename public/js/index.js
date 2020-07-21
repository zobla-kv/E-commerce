const navbar = document.getElementById("navbar");
const navbarItems = document.getElementsByClassName("navbarItemsContainer");
const welcomeContainer = document.getElementById("welcomeContainer");
const welcomeCentral = document.getElementById("welcomeCentral");
const welcomeLeft = document.getElementById("welcomeLeft");
const welcomeRight = document.getElementById("welcomeRight");
const checkItOut = document.getElementById("welcomeButton");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const slideShow = document.getElementById("slideShow");
const slideShowPrice = document.getElementById("slideShowPrice");
const slider1 = document.getElementById("sliderOne");
const slider2 = document.getElementById("sliderTwo");
const slider3 = document.getElementById("sliderThree");
const sliders = [slider1, slider2, slider3];

import * as page from "./exports.js";

page.addSearchFunctionality();
page.addPageSwitchFunctionality();
page.addLoginButtonFunctionality();
page.addLoginSubmitFunctionality();
page.addRegButtonFunctionality();
page.addRegSubmitFunctionality();
page.addLogOutButtonFunctionality();
page.addCartFunctionality();
page.removeCover();

const slideShowImages = [
  "../assets/img/slideshow1.png",
  "../assets/img/slideshow2.png",
  "../assets/img/slideshow3.png",
  "../assets/img/slideshow4.png",
];

const slideShowPrices = ["$69", "$80", "$49", "$129"];

let slideIndex = 0;
let opacity = 1;

checkItOut.addEventListener("click", () => {
  window.location.href = "http://localhost:4000/shop/";
});

if (slideShow)
  slideShow.style.backgroundImage = `url(${slideShowImages[slideIndex]})`;
if (slideShowPrice) slideShowPrice.innerHTML = slideShowPrices[slideIndex];

leftArrow.addEventListener("click", () => {
  slideIndex--;
  if (slideIndex < 0) slideIndex = slideShowImages.length - 1;
  changeSlideShowImage();
});

rightArrow.addEventListener("click", () => {
  slideIndex++;
  if (slideIndex > slideShowImages.length - 1) slideIndex = 0;
  changeSlideShowImage();
});

function changeSlideShowImage() {
  let a = setInterval(() => {
    opacity -= 0.01;
    slideShow.style.opacity = opacity;
    if (opacity < 0) {
      clearInterval(a);
      slideShow.style.backgroundImage = `url(${slideShowImages[slideIndex]})`;
      slideShowPrice.innerHTML = slideShowPrices[slideIndex];
      let b = setInterval(() => {
        opacity += 0.01;
        slideShow.style.opacity = opacity;
        if (opacity > 1) clearInterval(b);
      }, 5);
    }
  }, 5);
}

(function setSliderPosition() {
  if (window.innerWidth > 730) {
    slider1.style.marginLeft = "-50%";
    slider2.style.marginLeft = "100%";
    slider3.style.marginLeft = "-50%";
  } else {
    for (let i = 0; i < sliders.length; i++) sliders[i].style.marginLeft = "0%";
  }
})();

window.addEventListener("scroll", () => {
  if (window.innerWidth > 730) {
    let addPx = 50;
    if (window.scrollY > slider1.offsetTop + addPx)
      slider1.style.marginLeft = "0";
    if (window.scrollY > slider2.offsetTop + addPx)
      slider2.style.marginLeft = "50%";
    if (window.scrollY > slider3.offsetTop + addPx)
      slider3.style.marginLeft = "0";
  }
});

const tl = page.tl;

if (!sessionStorage.getItem("firstVisit")) {
  setTimeout(() => {
    navbar.style.display = "flex";
    welcomeContainer.style.display = "flex";

    tl.fromTo(
      welcomeContainer,
      1,
      { width: "0" },
      { width: "64%", ease: Power2.easeInOut }
    )
      .fromTo(welcomeCentral, 1, { opacity: "0" }, { opacity: "1" })
      .fromTo(welcomeLeft, 1, { opacity: "0" }, { opacity: "1" }, "-=0.4")
      .fromTo(welcomeRight, 1, { opacity: "0" }, { opacity: "1" }, "-=0.5")
      .fromTo(navbar, 1, { opacity: "0" }, { opacity: "1" }, "-=0.5")
      .fromTo(
        navbarItems,
        1,
        { marginLeft: "-2%" },
        { marginLeft: "0%" },
        "-=1.2"
      )
      .fromTo(slideShowPrice, 1, { scale: "0" }, { scale: "1" });
  }, 1000);
  sessionStorage.setItem("firstVisit", "true");
} else {
  navbar.style.display = "flex";
  welcomeContainer.style.display = "flex";
}
