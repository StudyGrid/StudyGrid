window.onload = function () {
  // Retrieve and set saved values for existing boxes and their content
  for (let i = 1; i <= 4; i++) {
    const titleElement = document.getElementById(`Title${i}`);
    const noteElement = document.querySelector(
      `#Title${i} + .note-container textarea`
    );

    const savedTitle = localStorage.getItem(`Title${i}`);
    const savedNote = localStorage.getItem(`Note${i}`);
    const savedContent = localStorage.getItem(`Content${i}`);

    if (savedTitle) {
      titleElement.innerText = savedTitle;
    }
    if (savedNote) {
      noteElement.value = savedNote;
    }
    if (savedContent) {
      const boxContent = document.querySelector(
        `#Title${i} + .note-container .note`
      );
      boxContent.value = savedContent;
    }
  }

  // Retrieve the number of boxes from localStorage
  const numBoxes = parseInt(localStorage.getItem("numBoxes")) || 4;

  // Create new boxes based on the saved number
  for (let i = 5; i <= numBoxes; i++) {
    createNewBox();
  }

  showTimeLeftOnIndex();
};

// Add event listeners for input fields to save their values
const titleElements = document.querySelectorAll('[contenteditable="true"]');
const noteElements = document.querySelectorAll(".note");

titleElements.forEach((titleElement) => {
  titleElement.addEventListener("input", function () {
    saveValue(this);
  });
});

noteElements.forEach((noteElement) => {
  noteElement.addEventListener("input", function () {
    saveValue(this);
  });
});

// Function to handle saving values to localStorage
function saveValue(element) {
  const id = element.id;
  const value = element.innerText || element.value;
  localStorage.setItem(id, value);
}

// Add event listeners for text inside the boxes to save their content
const boxContents = document.querySelectorAll(".note");
boxContents.forEach((contentElement) => {
  contentElement.addEventListener("input", function () {
    const boxId = this.parentElement.previousElementSibling.id;
    const contentValue = this.value;
    localStorage.setItem(
      `Content${boxId.charAt(boxId.length - 1)}`,
      contentValue
    );
  });
});

// Function to create a new box
function createNewBox() {
  const container = document.querySelector(".container");

  // Create a new box div
  const newBoxId = document.querySelectorAll(".box").length + 1;
  const newBox = document.createElement("div");
  newBox.className = "box";
  newBox.innerHTML = `
    <button class="delete-button">-</button>
    <h2 contenteditable="true" id="Title${newBoxId}">New Box</h2>
    <div class="note-container">
      <textarea class="note" placeholder="Write your notes here..."></textarea>
    </div>
  `;

  // Append the new box to the container
  container.appendChild(newBox);

  // Save the new number of boxes to localStorage
  localStorage.setItem("numBoxes", newBoxId);
  // Save the state of the new box to localStorage
  saveValue(newBox.querySelector("h2"));
}

// Add event listener to the "Add Box" button
const addBoxButton = document.getElementById("add-box-button");
addBoxButton.addEventListener("click", function () {
  createNewBox();
  saveValue(addBoxButton); // Save the state of the "Add Box" button
});

document.addEventListener("DOMContentLoaded", function () {
  // Load the state of the "Add Box" button
  const addButtonState = localStorage.getItem("add-box-button");
  if (addButtonState === "hidden") {
    addBoxButton.style.display = "none";
  }
});

// ... (the rest of your code remains unchanged)

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
