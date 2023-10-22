document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.querySelector(".logo-container").style.display = "none";
    window.location.href = "index.html"; // Redirect to the main content page
  }, 3000); // Wait for 1 second (1000 milliseconds) before redirecting
});
