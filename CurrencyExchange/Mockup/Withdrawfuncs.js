


document.getElementById("withdraw-submit").addEventListener("click", function () {
    // Get the withdrawal amount input field
    const withdrawAmountInput = document.getElementById("withdraw-amount");

    // Check if a valid amount is entered (greater than 0)
    const withdrawAmount = parseFloat(withdrawAmountInput.value);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        alert("Please enter a valid withdrawal amount.");
    }

    else {
        // Display a success message and redirect to the home page
        alert("Withdrawal successful!");
        event.preventDefault();
          window.location.href = "Mainpage.html";
    }
});