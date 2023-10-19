const addButton = document.getElementById("Add");
const withdrawButton = document.getElementById("Withdraw");

addButton.addEventListener("click", function (event) {
    // Prevent the default form submission
    event.preventDefault();
    window.location.href = "AddMoney.html"; // Redirect to AddMoney.html
});

withdrawButton.addEventListener("click", function (event) {
    // Prevent the default form submission
    event.preventDefault();
    window.location.href = "Withdraw.html"; // Redirect to WithdrawMoney.html
});

// Get a reference to the balance amount element by its id
const balanceAmount = document.getElementById("balanceAmount");

// You can now update its content using JavaScript
const newBalance = "$6,500.00"; // This is just an example, you can use any value you want
balanceAmount.textContent = newBalance;