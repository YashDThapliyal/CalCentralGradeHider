# CalCentral Grade Blur

A browser extension that automatically blurs grades on CalCentral (UC Berkeley's student portal)

This Chrome extension automatically blurs your grades on CalCentral, with the option to toggle visibility using a keyboard shortcut or button.

### Features
- Automatically blurs grades on load
- Toggle grades on/off with:
  - `Ctrl + Shift + Y` (Windows/Linux)
  - `Cmd + Shift + Y` (Mac)
- Floating (👁/🙈) button in the top-right corner to toggle for easy toggling

### 🛠 Install (Manual)
1. Clone this repo or [download as ZIP](https://github.com/YashDThapliyal/CalCentralGradeHider/archive/refs/heads/main.zip)
2. Go to `chrome://extensions`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the folder

### How It Works

The extension uses a MutationObserver to detect when grade elements load on the page, then automatically applies a blur filter. Users can toggle the blur state using either the visual button or keyboard shortcut.

### Privacy

This extension runs entirely in your browser and doesn't collect or transmit any data. All functionality is local to your device.


---

This project is not affiliated with UC Berkeley or CalCentral.

