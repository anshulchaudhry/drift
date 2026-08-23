# Drift

A cozy, minimal Pomodoro timer built with HTML, CSS, and vanilla JavaScript, later packaged as a macOS desktop application using Electron.

## Features

* 25-minute Focus sessions
* 5-minute Short Breaks
* 15-minute Long Breaks
* Start, pause, continue, and reset functionality
* Manual completion transitions between sessions
* Session progression tracking
* Keyboard shortcuts
* Atmospheric Drift visual effect
* Timer completion alarm
* Native macOS desktop application
* Custom Drift app icon

## Keyboard Shortcuts

| Key     | Action                                           |
| ------- | ------------------------------------------------ |
| `Space` | Begin / Pause / Continue / completion transition |
| `R`     | Reset                                            |
| `1`     | Switch to Focus                                  |
| `2`     | Switch to Short Break                            |
| `3`     | Switch to Long Break                             |

## Built With

* HTML
* CSS
* JavaScript
* Electron
* Electron Forge

## Run Locally

Clone the repository and install the dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

## Package the App

To package Drift as a desktop application:

```bash
npm run package
```

To create a distributable:

```bash
npm run make
```

## Project Structure

```text
pomodoro-app/
├── index.html
├── style.css
├── script.js
├── main.js
├── forge.config.js
├── package.json
├── sounds/
│   └── drift-alarm.mp3
├── Drift-icon.png
└── Drift.icns
```
