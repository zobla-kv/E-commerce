const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const slideShow = document.getElementById("slideShow");
const slideShowPrice = document.getElementById("slideShowPrice");
const slider1 = document.getElementById("sliderOne");
const slider2 = document.getElementById("sliderTwo");
const slider3 = document.getElementById("sliderThree");

const slideShowImages = [
  "./assets/img/slideshow1.png",
  "./assets/img/slideshow2.png",
  "./assets/img/slideshow3.png",
  "./assets/img/slideshow4.png",
];

const slideShowPrices = ["$69", "$80", "$49", "$129"];

let slideIndex = 0;
let opacity = 1;

slideShow.style.backgroundImage = `url(${slideShowImages[slideIndex]})`;
slideShowPrice.innerHTML = slideShowPrices[slideIndex];

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

window.addEventListener("scroll", () => {
  let bottomOfThePage = window.scrollY + window.innerHeight;
  if (bottomOfThePage > slider1.offsetTop) slider1.style.marginLeft = "0";
  if (bottomOfThePage > slider2.offsetTop) slider2.style.marginLeft = "50%";
  if (bottomOfThePage > slider3.offsetTop) slider3.style.marginLeft = "0";
});

function changeSlideShowImage() {
  console.log(slideIndex);
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
