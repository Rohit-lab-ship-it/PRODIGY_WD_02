let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
const display = document.getElementById('display');
const laps = document.getElementById('laps');

document.getElementById('startBtn').onclick = function() {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    running = true;
  }
};

document.getElementById('pauseBtn').onclick = function() {
  if (running) {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    running = false;
  }
};

document.getElementById('resetBtn').onclick = function() {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  display.textContent = "00:00:00";
  running = false;
  laps.innerHTML = '';
};

document.getElementById('lapBtn').onclick = function() {
  if (running) {
    const li = document.createElement('li');
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
};

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  const centiseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / 60000));
  display.textContent =
    `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
}

function pad(number) {
  return number.toString().padStart(2, '0');
}