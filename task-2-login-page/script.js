function togglePassword() {
  const passwordField = document.getElementById("password");
  const eyeClosed = document.getElementById("eyeClosed");
  const eyeOpen = document.getElementById("eyeOpen");

  // Toggle password visibility
  if (passwordField.type === "password") {
    passwordField.type = "text";
    eyeClosed.style.display = "none";
    eyeOpen.style.display = "inline";
  } else {
    passwordField.type = "password";
    eyeClosed.style.display = "inline";
    eyeOpen.style.display = "none";
  }
}
