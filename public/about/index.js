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

for (let i = 0; i < pages.length; i++)
  pages[i].addEventListener("click", () => {
    if (event.target.innerText === "Home")
      document.location.href = "http://127.0.0.1:5500/public/";
    else
      document.location.href =
        "http://127.0.0.1:5500/public/" + event.target.innerText.toLowerCase();
  });
