# Klipped PWA

A minimalist plain text scratchpad Progressive Web App designed with privacy in mind.

## Features

- **Privacy-focused**: All data stored locally in your browser
- **Minimalist design**: Clean, distraction-free interface
- **Auto-save**: Your text is automatically saved as you type
- **Cross-platform**: Works on desktop, tablet, and mobile
- **Offline capable**: Service worker enables offline functionality
- **Installable**: Can be installed as a PWA on your device
- **Dark/Light mode**: Respects your system theme preference
- **No dependencies**: Pure HTML, CSS, and JavaScript

## Development

### Running locally
```bash
npm start
```
This starts a simple HTTP server on port 8080.

### Building for production
```bash
npm run build
```
This copies all files from `src/` to `www/` for deployment.

## Project Structure

```
src/
├── index.html      # Main HTML file
├── style.css       # All CSS styles
├── app.js          # Main application logic
├── manifest.json   # PWA manifest
├── sw.js          # Service worker
└── assets/        # Images and icons
```

## About

Klipped has been lovingly crafted to be the app you always needed by your side. It's a virtual post-it note where you can store ideas, paste content from your clipboard, and delete text when you're done. No clutter of files being saved, and no need to worry about saving your text - it will be there next time you open the app.

This PWA version has been rewritten in pure JavaScript for maximum simplicity and performance.
