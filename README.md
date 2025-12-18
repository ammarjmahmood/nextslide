# 🎤 Voice Slide Navigator

A Chrome extension that lets you navigate presentation slides using voice commands. Just say "next slide" to advance!

## Features

- 🎙️ **Voice Control**: Say "next slide" to advance slides
- ⌨️ **Keyboard Activation**: Toggle listening with `Ctrl+Shift+S` (or `⌘+Shift+S` on Mac)
- 👁️ **Visual Feedback**: See when the extension is listening with an on-screen indicator
- 🌐 **Universal Compatibility**: Works with Google Slides, PowerPoint Online, PDF presentations, and more
- 🔒 **Privacy Focused**: Voice recognition runs locally in your browser

## Installation

### From Source (Developer Mode)

1. **Clone or download** this repository
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top-right corner)
4. **Click "Load unpacked"**
5. **Select the extension folder** (the directory containing `manifest.json`)

## How to Use

1. **Open a presentation** in your browser (Google Slides, PowerPoint Online, etc.)
2. **Enter fullscreen mode** (usually `F` key or fullscreen button)
3. **Press `Ctrl+Shift+S`** (Windows/Linux) or **`⌘+Shift+S`** (Mac) to activate voice listening
4. **Say "next slide"** to advance or **"back"** to go to previous slide
5. **Press the shortcut again** to stop listening

## Voice Commands

- **"next slide"** or **"next"** - Advance to next slide
- **"back"**, **"previous"**, **"previous slide"**, or **"go back"** - Go to previous slide

## Visual Indicators

- **Green indicator** in top-right corner = Actively listening
- **Brief "Next Slide" message** in center = Command recognized
- **Extension icon color**:
  - Purple = Inactive
  - Green = Listening

## Supported Platforms

- ✅ Google Slides
- ✅ Microsoft PowerPoint Online
- ✅ PDF presentations in Chrome
- ✅ Most web-based presentation tools
- ✅ Any site that responds to arrow key navigation

## Permissions

The extension requires these permissions:
- **activeTab**: To interact with the current presentation
- **scripting**: To inject voice recognition functionality
- **storage**: To remember listening state

## Privacy & Security

- All voice recognition happens **locally** in your browser using the Web Speech API
- **No audio is sent to external servers**
- The extension only listens when you activate it
- Works completely offline once installed

## Troubleshooting

### Voice commands not working?
- Ensure you're using **Chrome** or **Edge** (Speech API required)
- Check that your **microphone is enabled** in browser settings
- Grant **microphone permission** when prompted
- Speak clearly and say **"next slide"** or just **"next"**

### Slides not advancing?
- Make sure you're in **fullscreen mode**
- Try clicking on the slide first to ensure focus
- Some presentation platforms may require specific focus

### Extension not activating?
- Check the extension is **enabled** in `chrome://extensions/`
- Verify the **keyboard shortcut** in Extension shortcuts settings
- Try reloading the page

## Development

### Tech Stack
- Manifest V3 (latest Chrome extension format)
- Web Speech API (voice recognition)
- Vanilla JavaScript (no dependencies)

### File Structure
```
nextslide/
├── manifest.json           # Extension configuration
├── background.js           # Service worker (manages state)
├── content.js             # Content script (voice recognition)
├── content-styles.css     # Overlay styling
├── popup.html             # Extension popup UI
├── popup.js               # Popup logic
├── popup-styles.css       # Popup styling
└── icons/                 # Extension icons
    ├── icon16.png
    ├── icon48.png
    ├── icon128.png
    ├── icon-active16.png
    ├── icon-active48.png
    └── icon-active128.png
```

### Building Icons
Run the included Python script to regenerate icons:
```bash
python3 generate_icons.py
```

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

MIT License - feel free to use and modify as needed.

## Acknowledgments

Built with the Web Speech API and Chrome Extension Manifest V3.

---

**Made for presenters who want hands-free control** 🎯
