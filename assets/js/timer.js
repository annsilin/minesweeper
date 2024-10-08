let timerInterval;
let startTime = 0;
let timerOn = false;

function startTimer() {
  startTime = new Date().getTime(); // Get the current time
  timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
}

function calculateTime() {
  const currentTime = new Date().getTime(); // Get the current time
  const elapsedTime = new Date(currentTime - startTime); // Calculate elapsed time

  // Format the time as hh:mm:ss
  const hours = String(elapsedTime.getUTCHours()).padStart(2, "0");
  const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, "0");
  const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, "0");
  return {hours, minutes, seconds}
}

function updateTimer() {
  let time = calculateTime();

  timerHTML.textContent = `${time.hours}:${time.minutes}:${time.seconds}`;
}

function stopTimer() {
  clearInterval(timerInterval);
  timerOn = false;
  let time = calculateTime();

  return `${time.hours}:${time.minutes}:${time.seconds}`;
}

function resetTimer() {
  stopTimer();
  startTime = 0;
  timerHTML.textContent = "00:00:00";
}

/* Helper function for event listener */
function timerEvent() {
  if (!timerOn) {
    timerOn = true;
    startTimer();
  }
}
