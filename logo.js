document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.querySelector(".logo-container").style.display = "none";
    window.location.href = "home.html"; // Redirect to the main content page
  }, 3000); // Wait for 1 second (1000 milliseconds) before redirecting
});

document.addEventListener("DOMContentLoaded", function () {
  // Check if the user has visited the logo page before
  const hasVisitedLogoPage = localStorage.getItem("hasVisitedLogoPage");

  if (!hasVisitedLogoPage) {
    // If not, mark the page as visited and wait for 1 second before redirecting
    localStorage.setItem("hasVisitedLogoPage", true);
    setTimeout(function () {
      window.location.href = "index.html"; // Redirect to the main content page
    }, 1000); // Wait for 1 second (1000 milliseconds) before redirecting
  } else {
    // If the user has visited the logo page before, redirect immediately
    window.location.href = "home.html"; // Redirect to the main content page
  }
});
