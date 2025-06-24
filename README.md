# 🎸 SDE-3000 EVH Editor

A modern, web-based MIDI editor for the **Boss SDE-3000 EVH** digital delay pedal. Control your delay parameters, manage memory slots, and fine-tune your sound with a sleek, mobile-ready interface.

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_App-blue?style=for-the-badge)](https://JayNightmare.github.io/SDE3000-EVH-Editor)
[![PWA Ready](https://img.shields.io/badge/📱_PWA-Ready-green?style=for-the-badge)](https://JayNightmare.github.io/SDE3000-EVH-Editor)
[![MIDI Web API](https://img.shields.io/badge/🎹_MIDI-Web_API-purple?style=for-the-badge)](https://webaudio.github.io/web-midi-api/)

</div>

## 🎯 Project Aim

The SDE-3000 EVH Editor bridges the gap between classic hardware and modern digital workflows. Our mission is to provide musicians with:

- **Intuitive Control**: Replace complex button combinations with visual, real-time parameter adjustment
- **Mobile Accessibility**: Control your pedal from any device, anywhere
- **Preset Management**: Organize and backup your delay settings with ease
- **Modern Interface**: Enjoy a beautiful, responsive design that works on all screen sizes

## ✨ What It Provides

### 🎛️ **Real-Time MIDI Control**

- Direct parameter manipulation via web sliders
- Instant feedback and parameter updates
- Full SysEx message support for the SDE-3000 EVH
- Bidirectional communication (read/write parameters)

### 💾 **Memory Management**

- Access all 6 memory slots
- Read current pedal settings
- Write modified parameters back to the pedal
- Visual indication of active memory slot

### 📱 **Progressive Web App**

- **Install on any device** - Add to home screen for native app experience
- **Offline capable** - Works without internet after initial load
- **Cross-platform** - Runs on desktop, mobile, and tablet
- **Responsive design** - Optimized for all screen sizes

### 🎨 **Modern Dark Theme**

- Beautiful dark blue gradient design
- Glass morphism effects and smooth animations
- High contrast for excellent readability
- Professional, studio-ready appearance

### 🔧 **Developer-Friendly**

- Open source and customizable
- Modern React architecture
- Comprehensive test suite
- Automated deployment and quality checks

## 🎸 **Supported Hardware**

- **Boss SDE-3000 EVH** digital delay pedal
- Any MIDI interface (USB MIDI, Audio interface with MIDI I/O)
- Modern web browser with MIDI Web API support

## 🌐 **Browser Compatibility**

| Browser     | Support    | Notes                                   |
| ----------- | ---------- | --------------------------------------- |
| **Chrome**  | ✅ Full    | Recommended - Best MIDI Web API support |
| **Edge**    | ✅ Full    | Excellent performance and features      |
| **Opera**   | ✅ Full    | Complete MIDI Web API implementation    |
| **Firefox** | ⚠️ Limited | MIDI Web API behind flag (about:config) |
| **Safari**  | ❌ None    | No MIDI Web API support                 |

## 🚀 **Quick Start**

### Option 1: Use the Live App

1. Visit [**Live Demo**](https://JayNightmare.github.io/SDE3000-EVH-Editor)
2. Connect your SDE-3000 EVH via MIDI
3. Grant MIDI permissions when prompted
4. Start controlling your pedal!

### Option 2: Install as PWA

1. Open the app in a supported browser
2. Click the **"Install App"** button
3. Add to your home screen/desktop
4. Launch like any native app

### Option 3: Run Locally

```bash
# Clone the repository
git clone https://github.com/JayNightmare/SDE3000-EVH-Editor.git
cd SDE3000-EVH-Editor

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🎚️ **Features Overview**

### Parameter Control

- **Delay Time** - Precise timing adjustment
- **Feedback** - Control regeneration amount
- **Mix Level** - Balance dry/wet signal
- **Input Level** - Set input gain
- **Output Level** - Control overall output
- **High Cut** - Shape high frequency response
- And more SDE-3000 EVH specific parameters...

### Memory Operations

- **Slot Selection** - Choose from 6 memory locations
- **Read Preset** - Load settings from pedal
- **Write Preset** - Save current parameters to pedal
- **Bulk Operations** - Write all parameters at once

### Interface Features

- **Visual Feedback** - See parameter values in real-time
- **Touch-Friendly** - Optimized for mobile and tablet use
- **Keyboard Navigation** - Full accessibility support
- **Status Indicators** - Connection and operation feedback

## 📋 **Requirements**

### Hardware

- Boss SDE-3000 EVH digital delay pedal
- MIDI interface or USB MIDI cable
- Computer, tablet, or smartphone

### Software

- Modern web browser (Chrome, Edge, or Opera recommended)
- Internet connection (for initial load only)

## 🛠️ **Technical Stack**

- **Frontend**: React 18 with Hooks
- **Styling**: CSS3 with custom properties and Tailwind CSS
- **MIDI**: Web MIDI API for device communication
- **PWA**: Service Worker for offline functionality
- **Build**: Create React App with custom optimizations
- **Deployment**: GitHub Pages with automated CI/CD

## 📱 **Installation & Usage**

### Desktop Installation

1. Open Chrome/Edge and visit the app
2. Look for the install icon in the address bar
3. Click "Install" to add to your applications
4. Launch from your app menu

### Mobile Installation

1. Open the app in Chrome/Edge mobile
2. Tap the "Install App" button
3. Add to home screen when prompted
4. Launch like any native app

### MIDI Setup

1. Connect SDE-3000 EVH to your device via MIDI
2. Power on the pedal
3. Open the app and grant MIDI permissions
4. The app will automatically detect your pedal

## 🤝 **Contributing**

We welcome contributions! See our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Install dependencies
npm ci

# Start development server
npm start

# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎵 **Acknowledgments**

- Boss/Roland for creating the amazing SDE-3000 EVH
- The Web MIDI API specification contributors
- The React and open source community
- Musicians who provided feedback and testing

---

<div align="center">

**[🌐 Live Demo](https://JayNightmare.github.io/SDE3000-EVH-Editor)** • **[📱 Install PWA](https://JayNightmare.github.io/SDE3000-EVH-Editor)** • **[🐛 Report Bug](https://github.com/JayNightmare/SDE3000-EVH-Editor/issues)** • **[✨ Request Feature](https://github.com/JayNightmare/SDE3000-EVH-Editor/issues)**

_Made with ❤️ for the guitar community_

</div>

---

## 📚 **Create React App Documentation**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
