window.onload = function () {
  showTimeLeftOnIndex();
};

window.addEventListener("DOMContentLoaded", function () {
  const timerLink = document.getElementById("timer-link");

  function updateTimerText() {
    const savedTime = localStorage.getItem("timerEndTime");

    if (savedTime) {
      const endTime = parseInt(savedTime, 10);
      const timeLeft = Math.max(endTime - new Date().getTime(), 0);

      if (timeLeft > 0) {
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        const timeString = `${String(minutes).padStart(2, "0")}:${String(
          seconds
        ).padStart(2, "0")}`;
        timerLink.textContent = `Timer (${timeString})`;
      } else {
        localStorage.removeItem("timerEndTime"); // Clear invalid or expired timer data
        timerLink.textContent = "Timer"; // Set default text when timer expires
      }
    } else {
      timerLink.textContent = "Timer"; // Set default text when no timer is set
    }
  }

  // Update timer text every second
  setInterval(updateTimerText, 1000);
});

// Function to create a new box
function createNewBox() {
  const container = document.querySelector(".container");

  // Create a new box div
  const newBox = document.createElement("div");
  newBox.className = "box";
  newBox.innerHTML = `
    <button class="delete-button">-</button>
    <h2 contenteditable="true">New Box</h2>
    <div class="note-container">
      <textarea class="note" placeholder="Write your notes here..."></textarea>
    </div>
  `;

  // Append the new box to the container
  container.appendChild(newBox);
}

// Add event listener to the container to handle delete button clicks
const container = document.querySelector(".container");
container.addEventListener("click", function (event) {
  const target = event.target;

  // Check if the clicked element is a delete button
  if (target.classList.contains("delete-button")) {
    const box = target.parentElement;
    box.remove(); // Remove the clicked box from the DOM
  }
});

// Add event listener to the "Add Box" button
const addBoxButton = document.getElementById("add-box-button");
addBoxButton.addEventListener("click", createNewBox);
document.addEventListener("DOMContentLoaded", function () {
  fadeInContent();
});

function fadeInContent() {
  let opacity = 0;
  const targetOpacity = 1;
  const duration = 1000; // Animation duration in milliseconds

  const animationInterval = setInterval(function () {
    document.querySelector(".content").style.opacity = opacity;
    opacity += targetOpacity / (duration / 100); // Calculate opacity increment

    if (opacity >= targetOpacity) {
      clearInterval(animationInterval); // Stop the animation when target opacity is reached
    }
  }, 100); // Update opacity every 100 milliseconds
}
