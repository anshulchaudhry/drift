const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");
const timer = document.querySelector(".timer");
const driftWave = document.querySelector(".drift-wave");
const driftGlow = document.querySelector(".drift-glow");

const modeButtons = document.querySelectorAll(".mode");
const modeLabel = document.querySelector(".mode-label");
const sessionNumber = document.querySelector(".session-number");

const modes = {
    focus: {
        label: "FOCUS",
        duration: 25 * 60
    },
    "short-break": {
        label: "SHORT BREAK",
        duration: 5 * 60
    },
    "long-break": {
        label: "LONG BREAK",
        duration: 15 * 60
    }
};

let totalTime = 25 * 60;
let remainingTime = totalTime;
let timerInterval = null;
let isRunning = false;
let completedSessions = 0;
let currentMode = "focus";

function updateTimer() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    timer.innerHTML = `
        <span>${String(minutes).padStart(2, "0")}</span>
        <span class="colon">:</span>
        <span>${String(seconds).padStart(2, "0")}</span>
    `;
}

function updateSession() {
    sessionNumber.textContent = `${String(completedSessions + 1).padStart(2, "0")} / 04`;
}

function updateDrift() {
    const progress = 1 - remainingTime / totalTime;

    // Makes the visual atmosphere appear gradually from the beginning
    const visualProgress = Math.pow(progress, 0.55);

    driftWave.style.height = `${visualProgress * 100}%`;
    driftGlow.style.opacity = visualProgress * 0.8;
}

function switchMode(modeName) {
    const selectedMode = modes[modeName];

    // Stop the current timer if it is running
    clearInterval(timerInterval);
    isRunning = false;

    currentMode = modeName;

    // Update the timer values
    totalTime = selectedMode.duration;
    remainingTime = totalTime;

    // Update the UI
    modeLabel.textContent = selectedMode.label;
    startButton.textContent = "Begin";
    resetButton.style.display = "none";

    modeButtons.forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.mode === modeName
        );
    });

    updateTimer();
    updateDrift();
}

function startTimer() {
    isRunning = true;
    startButton.textContent = "Pause";
    resetButton.style.display = "block";

    timerInterval = setInterval(() => {
        remainingTime--;

        updateTimer();
        updateDrift();

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            isRunning = false;

        if (currentMode === "focus" && completedSessions < 3) {
            completedSessions++;
            updateSession();
        }

        if (currentMode === "focus") {
            startButton.textContent = "Take a break →";
        } else {
            startButton.textContent = "Back to focus →";
        } 

        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startButton.textContent = "Continue";
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;

    remainingTime = totalTime;

    startButton.textContent = "Begin";
    resetButton.style.display = "none";

    updateTimer();
    updateDrift();
}

startButton.addEventListener("click", () => {
    if (remainingTime <= 0) {
        if (currentMode === "focus") {
            switchMode("short-break");
        } else {
            switchMode("focus");
        }

        return;
    }

    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetButton.addEventListener("click", resetTimer);

modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        switchMode(button.dataset.mode);
    });
});

updateTimer();