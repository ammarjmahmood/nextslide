// Background service worker for Voice Slide Navigator

let isListening = false;

// Listen for keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-listening') {
    toggleListening();
  }
});

// Toggle listening state
async function toggleListening() {
  isListening = !isListening;
  
  // Store state
  await chrome.storage.local.set({ isListening });
  
  // Update icon
  updateIcon();
  
  // Send message to active tab
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      chrome.tabs.sendMessage(tab.id, {
        action: 'toggleListening',
        isListening: isListening
      });
    }
  } catch (error) {
    console.log('Could not send message to tab:', error);
  }
}

// Update extension icon based on state
function updateIcon() {
  const iconPath = isListening ? 'icons/icon-active' : 'icons/icon';
  chrome.action.setIcon({
    path: {
      16: `${iconPath}16.png`,
      48: `${iconPath}48.png`,
      128: `${iconPath}128.png`
    }
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStatus') {
    sendResponse({ isListening });
  } else if (request.action === 'toggleListening') {
    toggleListening();
    sendResponse({ isListening });
  }
  return true;
});

// Initialize state on install
chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.local.set({ isListening: false });
  updateIcon();
});
