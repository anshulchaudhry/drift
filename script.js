const startButton = document.querySelector(".start-button");
const timer = document.querySelector(".timer");
const driftWave = document.querySelector(".drift-wave");
const driftGlow = document.querySelector(".drift-glow");

let totalTime = 20 * 60;
let remainingTime = totalTime;
let timerInterval = null;
let isRunning = false;

function updateTimer() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    timer.innerHTML = `
        <span>${String(minutes).padStart(2, "0")}</span>
        <span class="colon">:</span>
        <span>${String(seconds).padStart(2, "0")}</span>
    `;
}

function updateDrift() {
    const progress = 1 - remainingTime / totalTime;

    // Makes the visual atmosphere appear gradually from the beginning
    const visualProgress = Math.pow(progress, 0.55);

    driftWave.style.height = `${visualProgress * 100}%`;
    driftGlow.style.opacity = visualProgress * 0.8;
}

function startTimer() {
    isRunning = true;
    startButton.textContent = "Pause";

    timerInterval = setInterval(() => {
        remainingTime--;

        updateTimer();
        updateDrift();

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            startButton.textContent = "Complete";
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startButton.textContent = "Continue";
}

startButton.addEventListener("click", () => {
    if (remainingTime <= 0) {
        return;
    }

    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

updateTimer();