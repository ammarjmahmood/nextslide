// Popup script for Voice Slide Navigator

async function updateStatus() {
    try {
        const response = await chrome.runtime.sendMessage({ action: 'getStatus' });
        const statusIndicator = document.getElementById('status-indicator');
        const statusText = document.getElementById('status-text');

        if (response.isListening) {
            statusIndicator.classList.remove('inactive');
            statusIndicator.classList.add('active');
            statusText.textContent = 'Listening';
        } else {
            statusIndicator.classList.remove('active');
            statusIndicator.classList.add('inactive');
            statusText.textContent = 'Inactive';
        }
    } catch (error) {
        console.error('Error updating status:', error);
    }
}

// Update status when popup opens
document.addEventListener('DOMContentLoaded', () => {
    updateStatus();

    // Update every second while popup is open
    setInterval(updateStatus, 1000);
});
