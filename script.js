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
        localStorage.removeItem("timerEndTime");
        timerLink.textContent = "Timer";
      }
    } else {
      timerLink.textContent = "Timer";
    }
  }

  setInterval(updateTimerText, 1000);

  const container = document.querySelector(".container");
  container.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("delete-button")) {
      const box = target.parentElement;
      box.remove();
      const boxId = box.querySelector("h2").id;
      localStorage.removeItem(boxId);
    }
  });

  //Saving

  window.onload = function () {
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

    const numBoxes = parseInt(localStorage.getItem("numBoxes")) || 4;

    for (let i = 5; i <= numBoxes; i++) {
      createNewBox();
    }

    showTimeLeftOnIndex();
  };

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

  function createNewBox() {
    const container = document.querySelector(".container");

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

    container.appendChild(newBox);

    localStorage.setItem("numBoxes", newBoxId);
    saveValue(newBox.querySelector("h2"));
  }

  const addBoxButton = document.getElementById("add-box-button");
  addBoxButton.addEventListener("click", function () {
    createNewBox();
    saveValue(addBoxButton);
  });

  document.addEventListener("DOMContentLoaded", function () {
    const addButtonState = localStorage.getItem("add-box-button");
    if (addButtonState === "hidden") {
      addBoxButton.style.display = "none";
    }
  });
});
