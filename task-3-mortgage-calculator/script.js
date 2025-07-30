document.addEventListener("DOMContentLoaded", () => {
  const clearAllLink = document.getElementById("clear-all");
  const mortgageForm = document.getElementById("mortgage-form");
  const calculateBtn = document.getElementById("calculate-btn");

  const clearForm = () => {
    mortgageForm.reset();
  };

  clearAllLink.addEventListener("click", (event) => {
    event.preventDefault();
    clearForm();
  });

  calculateBtn.addEventListener("click", () => {
    console.log("Calculate button clicked. Form data would be processed here.");
  });
});
