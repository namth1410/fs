document.addEventListener("DOMContentLoaded", function () {
  const amountButtons = document.querySelectorAll(".amount-button");
  const customAmountInput = document.getElementById("custom-amount");
  const generateQrButton = document.getElementById("generate-qr");

  let selectedAmount = 0;

  amountButtons.forEach((button) => {
    button.addEventListener("click", function () {
      amountButtons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      selectedAmount = parseInt(button.getAttribute("data-amount"));
      customAmountInput.value = "";
      updateGenerateQrButtonState();
    });
  });

  customAmountInput.addEventListener("input", function () {
    amountButtons.forEach((btn) => btn.classList.remove("selected"));
    selectedAmount = parseInt(customAmountInput.value);
    updateGenerateQrButtonState();
  });

  function updateGenerateQrButtonState() {
    if (selectedAmount >= 35000) {
      generateQrButton.classList.add("active");
      generateQrButton.disabled = false;
    } else {
      generateQrButton.classList.remove("active");
      generateQrButton.disabled = true;
    }
  }

  generateQrButton.addEventListener("click", function () {
    if (selectedAmount >= 35000) {
      fetch(`${process.env.PAYOS_HOST}/create-payment-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: selectedAmount }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.checkoutUrl) {
            window.location.href = data.checkoutUrl;
          } else {
            alert("Failed to create payment link.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to create payment link.");
        });
    }
  });
});
