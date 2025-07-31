document.addEventListener("DOMContentLoaded", () => {
  // Form elements
  const clearAllLink = document.getElementById("clear-all");
  const mortgageForm = document.getElementById("mortgage-form");
  const calculateBtn = document.getElementById("calculate-btn");

  // Modal elements
  const openModalBtn = document.getElementById("open-modal-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modalOverlay = document.getElementById("modal-overlay");

  const clearForm = () => {
    mortgageForm.reset();
  };

  const openModal = () => {
    modalOverlay.classList.add("active");
  };

  const closeModal = () => {
    modalOverlay.classList.remove("active");
  };

  // --- Event Listeners ---

  // Form listeners
  clearAllLink.addEventListener("click", (event) => {
    event.preventDefault();
    clearForm();
  });

  calculateBtn.addEventListener("click", () => {
    // Calculation logic would go here
  });

  // Modal listeners
  openModalBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);

  // Close modal when clicking on the overlay background
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
});
