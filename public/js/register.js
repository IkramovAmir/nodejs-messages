const elForm = document.querySelector(".js-form");
const elUsername = elForm.querySelector(".js-username-register");
const elEmail = elForm.querySelector(".js-email-register");
const elPassword = elForm.querySelector(".js-password-register");

elForm.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    let username = elUsername.value.trim();
    let email = elEmail.value.trim();
    let password = elPassword.value.trim();

    let res = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({username, email, password})
    });

    let data = await res.json();
    console.log()
    if (data.success) {
        window.location.href = "/index.html";
    } else {
        alert("User exist!")
    };
});