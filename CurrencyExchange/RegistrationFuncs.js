 const register = document.getElementById("Register");

        // Add a submit event listener to the form
        register.addEventListener("click", function (event) {
            // Prevent the default form submission
            event.preventDefault();

            // Validate the form fields (you can add more validation logic as needed)
            const firstName = document.getElementById("first_name").value;
            const lastName = document.getElementById("last_name").value;
            const email = document.getElementById("email").value;
            const mobile = document.getElementById("mobile").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("password_confirmation").value;

            if (
                firstName.trim() === "" ||
                lastName.trim() === "" ||
                email.trim() === "" ||
                mobile.trim() === "" ||
                password.trim() === "" ||
                confirmPassword.trim() === ""
            ) {
                alert("Please fill in all fields.");
            } else if (password !== confirmPassword) {
                alert("Passwords do not match.");
            } else {
                // Redirect to Mainpage.html if the form is valid
                window.location.href = "Mainpage.html";
            }
        });