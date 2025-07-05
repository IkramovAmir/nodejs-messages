const elForm = document.querySelector(".js-form");
const elEmail = elForm.querySelector(".js-email-login");
const elPassword = elForm.querySelector(".js-password-login");
const elRegister = document.querySelector(".register");

elForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    let email = elEmail.value.trim();
    let password = elPassword.value.trim();
    let res = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({email, password})
    });

    let data = await res.json();
    if (data.success) {
        window.location.href = "/index.html";
    } else {
        alert("User is not found!");
    }
});

elRegister.addEventListener("click", (evt) => {
    evt.preventDefault();

    window.location.href = "/register.html"
});