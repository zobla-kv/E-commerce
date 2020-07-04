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
const pages = document.getElementsByClassName("pages");
const sections = document.getElementsByTagName("section");

export const tl = new TimelineMax();

export function addPageSwitchFunctionality() {
  for (let i = 0; i < pages.length; i++)
    pages[i].addEventListener("click", () => {
      if (event.target.innerText === "Home")
        document.location.href = "http://127.0.0.1:5500/public/";
      else
        document.location.href =
          "http://127.0.0.1:5500/public/" +
          event.target.innerText.toLowerCase();
    });
}

export function addLoginSubmitFunctionality() {
  loginSubmit.addEventListener("click", () => {
    event.preventDefault();
  });
}

export let activeForm = null;

export function addRegSubmitFunctionality() {
  regSubmit.addEventListener("click", () => {
    event.preventDefault();
    // prettier-ignore
    const validation = validateSignupForm(regEmail.value,regUsername.value,regPassword.value,regPasswordRepeat.value);
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
        signValErr["repeatPasswordError"].innerHTML = "passwords don't match";
        break;
      default:
        document.location.href = "http://127.0.0.1:5500/public/";
    }
  });
}

export function clearSignUpErrorMessages() {
  for (let i = 0; i < signValErr.length; i++) signValErr[i].innerHTML = "";
}

export function addLoginButtonFunctionality() {
  loginButton.addEventListener("click", () => {
    addBlur();
    displayForm(loginForm);
    loginSubmit.focus();
    activeForm = loginForm;
  });
}

export function addRegButtonFunctionality() {
  regButton.addEventListener("click", () => {
    addBlur();
    displayForm(regForm);
    regSubmit.focus();
    activeForm = regForm;
  });
}

export function removeCover() {
  window.addEventListener("click", () => {
    if (event.target.id === "pageCover") {
      removePageCover();
      removeBlur(activeForm);
      clearInputs();
    }
  });
}

export function addBlur() {
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

export function displayForm(element) {
  element.style.display = "block";
  tl.fromTo(element, 0.5, { opacity: "0" }, { opacity: "1" });
}

export function removePageCover() {
  document.body.removeChild(document.getElementById("pageCover"));
}

export function removeBlur(element) {
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

// prettier-ignore
export function validateSignupForm(email, username, password, repeatedPassword) {
  if (email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) === null)
    return "email";
  if (username.length < 6) return "username";
  if (password.length < 6) return "password";
  if (repeatedPassword !== password) return "passwordRepeat";
}

export function clearInputs() {
  regEmail.value = "";
  regUsername.value = "";
  regPassword.value = "";
  regPasswordRepeat.value = "";
  clearSignUpErrorMessages();
}