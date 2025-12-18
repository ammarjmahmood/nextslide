// Content script for Voice Slide Navigator

let recognition = null;
let isListening = false;
let overlay = null;
let lastCommandTime = 0;
const COMMAND_COOLDOWN = 2000; // 2 seconds between commands
let isMinimized = false;

// Initialize speech recognition
function initSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        console.error('Speech recognition not supported in this browser');
        return null;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const rec = new SpeechRecognition();

    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onresult = (event) => {
        const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('')
            .toLowerCase()
            .trim();

        const now = Date.now();

        // Check for "next slide" or just "next"
        if (transcript.includes('next slide') || transcript === 'next') {
            // Only trigger if cooldown period has passed
            if (now - lastCommandTime >= COMMAND_COOLDOWN) {
                console.log('Voice command detected: next slide');
                lastCommandTime = now;
                navigateToNextSlide();
                showCommandFeedback('▶ Next Slide');
            } else {
                console.log('Command ignored - cooldown active');
            }
        }
        // Check for "back", "previous slide", or "go back"
        else if (transcript.includes('previous slide') || transcript === 'back' || transcript.includes('go back') || transcript === 'previous') {
            // Only trigger if cooldown period has passed
            if (now - lastCommandTime >= COMMAND_COOLDOWN) {
                console.log('Voice command detected: previous slide');
                lastCommandTime = now;
                navigateToPreviousSlide();
                showCommandFeedback('◀ Previous Slide');
            } else {
                console.log('Command ignored - cooldown active');
            }
        }
    };

    rec.onerror = (event) => {
        // 'no-speech' is expected when user isn't talking, don't log as error
        if (event.error === 'no-speech') {
            console.log('Waiting for speech...');
            // Restart recognition if it stopped due to no speech
            if (isListening) {
                setTimeout(() => {
                    try {
                        rec.start();
                    } catch (e) {
                        // Already started
                    }
                }, 100);
            }
        } else {
            // Log other errors
            console.error('Speech recognition error:', event.error);
        }
    };

    rec.onend = () => {
        // Restart recognition if still listening
        if (isListening) {
            try {
                rec.start();
            } catch (e) {
                console.log('Recognition already started');
            }
        }
    };

    return rec;
}

// Navigate to next slide
function navigateToNextSlide() {
    // Simulate right arrow key press
    const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        code: 'ArrowRight',
        keyCode: 39,
        which: 39,
        bubbles: true,
        cancelable: true
    });

    document.dispatchEvent(event);
    document.body.dispatchEvent(event);

    // Also try dispatching to active element
    if (document.activeElement) {
        document.activeElement.dispatchEvent(event);
    }
}

// Navigate to previous slide
function navigateToPreviousSlide() {
    // Simulate left arrow key press
    const event = new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        code: 'ArrowLeft',
        keyCode: 37,
        which: 37,
        bubbles: true,
        cancelable: true
    });

    document.dispatchEvent(event);
    document.body.dispatchEvent(event);

    // Also try dispatching to active element
    if (document.activeElement) {
        document.activeElement.dispatchEvent(event);
    }
}

// Show visual feedback when command is recognized
function showCommandFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'voice-nav-feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
    }, 1500);
}

// Create overlay indicator
function createOverlay() {
    if (overlay) return;

    overlay = document.createElement('div');
    overlay.className = 'voice-nav-overlay';
    overlay.innerHTML = `
    <div class="voice-nav-indicator" id="voice-indicator">
      <div class="voice-nav-minimize" id="minimize-btn" title="Minimize">−</div>
      <div class="voice-nav-content">
        <div class="voice-nav-pulse"></div>
        <div class="voice-nav-text">🎤</div>
      </div>
    </div>
  `;
    document.body.appendChild(overlay);

    // Add minimize button handler
    const minimizeBtn = overlay.querySelector('#minimize-btn');
    const indicator = overlay.querySelector('#voice-indicator');

    minimizeBtn.addEventListener('click', () => {
        isMinimized = !isMinimized;
        if (isMinimized) {
            indicator.classList.add('minimized');
            minimizeBtn.textContent = '+';
            minimizeBtn.title = 'Expand';
        } else {
            indicator.classList.remove('minimized');
            minimizeBtn.textContent = '−';
            minimizeBtn.title = 'Minimize';
        }
    });
}

// Remove overlay indicator
function removeOverlay() {
    if (overlay) {
        overlay.remove();
        overlay = null;
    }
}

// Start listening
function startListening() {
    if (!recognition) {
        recognition = initSpeechRecognition();
    }

    if (!recognition) {
        alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
        return;
    }

    isListening = true;
    createOverlay();

    try {
        recognition.start();
        console.log('Voice navigation started');
    } catch (e) {
        console.log('Recognition already started');
    }
}

// Stop listening
function stopListening() {
    isListening = false;
    removeOverlay();

    if (recognition) {
        recognition.stop();
        console.log('Voice navigation stopped');
    }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleListening') {
        if (request.isListening) {
            startListening();
        } else {
            stopListening();
        }
        sendResponse({ success: true });
    }
    return true;
});

// Initialize on page load
console.log('Voice Slide Navigator content script loaded');
