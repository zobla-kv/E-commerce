const navbarItems = document.getElementsByClassName("items");
const welcomeContainer = document.getElementById("welcomeContainer");
const welcomeCentral = document.getElementById("welcomeCentral");
const welcomeLeft = document.getElementById("welcomeLeft");
const welcomeRight = document.getElementById("welcomeRight");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const slideShow = document.getElementById("slideShow");
const slideShowPrice = document.getElementById("slideShowPrice");
const slider1 = document.getElementById("sliderOne");
const slider2 = document.getElementById("sliderTwo");
const slider3 = document.getElementById("sliderThree");
const sections = document.getElementsByTagName("section");
const loginButton = document.getElementById("loginButton");
const loginForm = document.getElementById("loginForm");
const loginSubmit = document.getElementById("loginSubmit");
const regButton = document.getElementById("regButton");
const regForm = document.getElementById("regForm");
const regSubmit = document.getElementById("regSubmit");
const regEmail = document.getElementById("emailInput");
const regUsername = document.getElementById("regUsername");
const regPassword = document.getElementById("regPassword");
const regPasswordRepeat = document.getElementById("regPasswordRepeat");
const signValErr = document.getElementsByClassName("signUpValidationError");

let activeForm = null;

loginSubmit.addEventListener("click", () => {
  event.preventDefault();
});

regSubmit.addEventListener("click", () => {
  event.preventDefault();
  const email = regEmail.value;
  const username = regUsername.value;
  const password = regPassword.value;
  const repeatedPassword = regPasswordRepeat.value;
  // prettier-ignore
  const validation = validateSignupForm(email,username,password,repeatedPassword);
  switch (validation) {
    case "email":
      signValErr["emailErr"].innerHTML = "email is not valid";
      break;
    case "username":
      clearSignUpErrorMessages();
      signValErr["usernameErr"].innerHTML = "username too short";
      break;
    case "password":
      clearSignUpErrorMessages();
      signValErr["passwordErr"].innerHTML = "password too short";
      break;
    case "passwordRepeat":
      clearSignUpErrorMessages();
      signValErr["repeatPasswordError"].innerHTML = "password don't match";
      break;
    default:
      document.location.href = "http://127.0.0.1:5500/public/";
  }
});

function clearSignUpErrorMessages() {
  for (let i = 0; i < signValErr.length; i++) signValErr[i].innerHTML = "";
}

loginButton.addEventListener("click", () => {
  addBlur();
  displayForm(loginForm);
  loginSubmit.focus();
  activeForm = loginForm;
});

regButton.addEventListener("click", () => {
  addBlur();
  displayForm(regForm);
  regSubmit.focus();
  activeForm = regForm;
});

window.addEventListener("click", () => {
  if (event.target.id === "pageCover") {
    removePageCover();
    removeBlur(activeForm);
  }
});

function addBlur() {
  let cover = document.createElement("div");
  cover.setAttribute("id", "pageCover");
  document.body.appendChild(cover);
  let startTime = 0;
  for (let i = 0; i < sections.length; i++) {
    // prettier-ignore
    tl.fromTo( sections[i],0.5,{ filter: "blur(0px)" },{ filter: "blur(15px)" }, `-=${startTime}`);
    if (i == 1) startTime = 0.5;
    else startTime += 0.5;
  }
}

function displayForm(element) {
  element.style.display = "block";
  tl.fromTo(element, 0.5, { opacity: "0" }, { opacity: "1" });
}

function removePageCover() {
  document.body.removeChild(document.getElementById("pageCover"));
}

function removeBlur(element) {
  tl.fromTo(element, 0.3, { opacity: "1" }, { opacity: "0" });
  let startTime = 0;
  for (let i = 0; i < sections.length; i++) {
    // prettier-ignore
    tl.fromTo( sections[i],0.3,{ filter: "blur(15px)" },{ filter: "blur(0px)" }, `-=${startTime}`);
    if (i == 1) startTime = 0.3;
    else startTime += 0.3;
  }
  setTimeout(() => {
    element.style.display = "none";
  }, 300);
}

function validateSignupForm(email, username, password, repeatedPassword) {
  if (email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) === null)
    return "email";
  if (username.length < 6) return "username";
  if (password.length < 6) return "password";
  if (repeatedPassword !== password) return "passwordRepeat";
}

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
  addPx = 40;
  // window.scrollY + window.innerHeight; // bottom of the page
  if (window.scrollY > slider1.offsetTop + addPx)
    slider1.style.marginLeft = "0";
  if (window.scrollY > slider2.offsetTop + addPx)
    slider2.style.marginLeft = "50%";
  if (window.scrollY > slider3.offsetTop + addPx)
    slider3.style.marginLeft = "0";
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

/// timelinemax ///

const tl = new TimelineMax();

// tl.fromTo(navbarItems, 1, { marginLeft: "-10%" }, { marginLeft: "0%" })
//   //prettier-ignore
//   .fromTo(navbarItems, 1, { opacity: "0" }, { opacity: "1" }, "-=0.5")
//   // prettier-ignore
//   .fromTo(
//     welcomeContainer,
//     1,
//     { height: "0" },
//     { height: "60vh", ease: Power2.easeInOut },
//     "-=0.2"
//   )
//   //prettier-ignore
//   .fromTo(welcomeCentral, 1, { opacity: "0" }, { opacity: "1" })
//   .fromTo(welcomeLeft, 1, { opacity: "0" }, { opacity: "1" }, "+=0.3")
//   .fromTo(welcomeRight, 1, { opacity: "0" }, { opacity: "1" }, "-=0.3")
//   .fromTo(slideShowPrice, 1, { scale: "0" }, { scale: "1" });
