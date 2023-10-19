// JavaScript
// Get a reference to the login button and the input fields
const loginButton = document.getElementById("Login");
const regButton = document.getElementById("Register");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Add a click event listener to the login button
loginButton.addEventListener("click", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Check if both email and password fields are filled in
    if (emailInput.value.trim() !== "" && passwordInput.value.trim() !== "") {
        // Redirect to Mainpage.html if both fields are filled
        window.location.href = "Mainpage.html";
    } else {
        // Display an error message or handle the case when fields are not filled
        alert("Please fill in both email and password fields.");
    }
});

regButton.addEventListener("click", function (event) {
    // Prevent the default form submission
    event.preventDefault();
    window.location.href = "Registration.html";
});




