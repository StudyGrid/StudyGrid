let timerInterval;
let endTime;
let audio;

// Load saved timer data from localStorage if available
window.addEventListener("load", function () {
  const savedTime = localStorage.getItem("timerEndTime");
  if (savedTime) {
    endTime = parseInt(savedTime, 10);
    const remainingTime = endTime - new Date().getTime();
    if (remainingTime > 0) {
      // Start the timer immediately upon page load
      startTimer(remainingTime);
    } else {
      // Timer has ended, clear the saved state
      localStorage.removeItem("timerEndTime");
    }
  }

  // Initialize audio element
  audio = new Audio("alarm.mp3"); // Replace 'alarm.mp3' with the path to your sound file
});

function startTimer(initialTime) {
  // Clear the existing timer, if any
  clearInterval(timerInterval);

  if (!initialTime) {
    const inputMinutes = parseInt(document.getElementById("timer-input").value);
    if (isNaN(inputMinutes) || inputMinutes <= 0) {
      alert("bro insert a valid number.");
      return;
    }
    endTime = new Date().getTime() + inputMinutes * 60 * 1000;
  }

  // Immediately update the timer text when starting the timer
  updateTimer();

  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = new Date().getTime();
  const timeLeft = endTime - currentTime;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "Time's up!";
    // Play sound effect
    audio.play();
    // Show browser notification
    showNotification("Time's up!");
    // Clear the saved timer state when the timer ends
    localStorage.removeItem("timerEndTime");
    return;
  }

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const timerElement = document.getElementById("timer");
  timerElement.textContent = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Save the remaining time in localStorage
  localStorage.setItem("timerEndTime", endTime.toString());
}

function showNotification(message) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(message);
  } else if ("Notification" in window && Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }
}

function showTimeLeftOnIndex() {
  if (endTime) {
    const currentTime = new Date().getTime();
    const timeLeft = Math.max(endTime - currentTime, 0);

    if (timeLeft > 0) {
      const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);
      const timeString = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
      document.getElementById(
        "timer-link"
      ).textContent = `Timer (${timeString})`;
    } else {
      document.getElementById("timer-link").textContent = `Timer`;
    }
  }
}
