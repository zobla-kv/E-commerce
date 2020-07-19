const emailField = document.getElementById("email");
const reset = document.getElementById("reset");
const response = document.getElementById("response");
const passwordField = document.getElementById("password");
const pwReset = document.getElementById("pwReset");
const pwResponse = document.getElementById("pwResponse");

if (reset)
  reset.addEventListener("click", () => {
    event.preventDefault();
    const email = emailField.value;
    fetch("http://localhost:4000/resetPassword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => (response.innerHTML = data.message));
  });

if (pwReset)
  pwReset.addEventListener("click", () => {
    event.preventDefault();
    const password = passwordField.value;
    fetch(document.location.href, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => res.json())
      .then((data) => (pwResponse.innerHTML = data.message));
  });
