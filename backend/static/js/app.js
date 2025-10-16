/**
 * app.js: JS code for the EduCraft AI Voice Assistant
 */

/**
 * Global Variables
 */
const sessionId = Math.random().toString().substring(10);
let eventSource = null;
let is_audio = false;
let currentSubject = "general";
let currentMessageId = null;

// DOM Elements
const subjectsGrid = document.getElementById("subjectsGrid");
const chatInterface = document.getElementById("chatInterface");
const chatMessages = document.getElementById("chatMessages");
const chatSubject = document.getElementById("chatSubject");
const backButton = document.getElementById("backButton");
const voiceToggle = document.getElementById("voiceToggle");
const voiceControls = document.getElementById("voiceControls");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const startAudioButton = document.getElementById("startAudioButton");
const voiceStatus = document.getElementById("voiceStatus");
const loadingOverlay = document.getElementById("loadingOverlay");

// Subject mapping for display names
const subjectNames = {
    "math": "Mathematics",
    "social_science": "Social Science", 
    "chemistry": "Chemistry",
    "biology": "Biology",
    "english": "English",
    "physics": "Physics"
};

/**
 * Subject Selection and Navigation
 */
function initializeSubjectSelection() {
    const subjectCards = document.querySelectorAll('.subject-card');
    
    subjectCards.forEach(card => {
        card.addEventListener('click', () => {
            const subject = card.dataset.subject;
            selectSubject(subject);
        });
    });
    
    // Back button handler
    backButton.addEventListener('click', () => {
        showSubjectsGrid();
    });
    
    // Voice toggle handler
    voiceToggle.addEventListener('click', () => {
        toggleVoiceMode();
    });
}

function selectSubject(subject) {
    currentSubject = subject;
    showLoadingOverlay();
    
    // Update chat interface
    chatSubject.textContent = subjectNames[subject] || subject;
    
    // Connect to the appropriate agent
    connectSSE();
}

function showSubjectsGrid() {
    subjectsGrid.style.display = 'grid';
    chatInterface.style.display = 'none';
    
    // Disconnect current session
    if (eventSource) {
        eventSource.close();
        eventSource = null;
    }
    
    // Reset state
    currentSubject = "general";
    is_audio = false;
    voiceControls.style.display = 'none';
    voiceToggle.textContent = '🎤 Voice';
}

function showChatInterface() {
    subjectsGrid.style.display = 'none';
    chatInterface.style.display = 'flex';
    hideLoadingOverlay();
}

function showLoadingOverlay() {
    loadingOverlay.style.display = 'flex';
}

function hideLoadingOverlay() {
    loadingOverlay.style.display = 'none';
}

function toggleVoiceMode() {
    is_audio = !is_audio;
    
    if (is_audio) {
        voiceControls.style.display = 'block';
        voiceToggle.textContent = '📝 Text';
        voiceToggle.style.background = 'rgba(255, 255, 255, 0.3)';
    } else {
        voiceControls.style.display = 'none';
        voiceToggle.textContent = '🎤 Voice';
        voiceToggle.style.background = 'rgba(255, 255, 255, 0.2)';
    }
    
    // Reconnect with new mode
    if (eventSource) {
        eventSource.close();
        connectSSE();
    }
}

/**
 * SSE (Server-Sent Events) handling
 */
function connectSSE() {
    const sse_url = `http://${window.location.host}/events/${sessionId}?subject=${currentSubject}&is_audio=${is_audio}`;
    const send_url = `http://${window.location.host}/send/${sessionId}`;
    
    // Connect to SSE endpoint
    eventSource = new EventSource(sse_url);

    // Handle connection open
    eventSource.onopen = function () {
        console.log("SSE connection opened for subject:", currentSubject);
        showChatInterface();
        
        // Enable the Send button
        sendButton.disabled = false;
        addSubmitHandler();
    };

    // Handle incoming messages
    eventSource.onmessage = function (event) {
        // Parse the incoming message
        const message_from_server = JSON.parse(event.data);
        console.log("[AGENT TO CLIENT] ", message_from_server);

        // Check if the turn is complete
        if (message_from_server.turn_complete && message_from_server.turn_complete == true) {
            currentMessageId = null;
            return;
        }

        // Check for interrupt message
        if (message_from_server.interrupted && message_from_server.interrupted === true) {
            // Stop audio playback if it's playing
            if (audioPlayerNode) {
                audioPlayerNode.port.postMessage({ command: "endOfAudio" });
            }
            return;
        }

        // If it's audio, play it
        if (message_from_server.mime_type == "audio/pcm" && audioPlayerNode) {
            audioPlayerNode.port.postMessage(base64ToArray(message_from_server.data));
        }

        // If it's a text, display it
        if (message_from_server.mime_type == "text/plain") {
            // Add a new message for a new turn
            if (currentMessageId == null) {
                currentMessageId = Math.random().toString(36).substring(7);
                const messageDiv = document.createElement("div");
                messageDiv.id = currentMessageId;
                messageDiv.className = "message assistant";
                chatMessages.appendChild(messageDiv);
            }

            // Add message text to the existing message element
            const messageDiv = document.getElementById(currentMessageId);
            messageDiv.textContent += message_from_server.data;

            // Scroll down to the bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    };

    // Handle connection close
    eventSource.onerror = function (event) {
        console.log("SSE connection error or closed.");
        sendButton.disabled = true;
        eventSource.close();
        setTimeout(function () {
            console.log("Reconnecting...");
            connectSSE();
        }, 5000);
    };
}

// Add submit handler to the form
function addSubmitHandler() {
    messageForm.onsubmit = function (e) {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            // Display user message
            const userMessageDiv = document.createElement("div");
            userMessageDiv.className = "message user";
            userMessageDiv.textContent = message;
            chatMessages.appendChild(userMessageDiv);
            
            // Clear input
            messageInput.value = "";
            
            // Send message to agent
            sendMessage({
                mime_type: "text/plain",
                data: message,
            });
            console.log("[CLIENT TO AGENT] " + message);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        return false;
    };
}

// Send a message to the server via HTTP POST
async function sendMessage(message) {
    const send_url = `http://${window.location.host}/send/${sessionId}`;
    
    try {
        const response = await fetch(send_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        });
        
        if (!response.ok) {
            console.error('Failed to send message:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Decode Base64 data to Array
function base64ToArray(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Audio handling
 */

let audioPlayerNode;
let audioPlayerContext;
let audioRecorderNode;
let audioRecorderContext;
let micStream;

// Audio buffering for 0.2s intervals
let audioBuffer = [];
let bufferTimer = null;

// Import the audio worklets
import { startAudioPlayerWorklet } from "./audio-player.js";
import { startAudioRecorderWorklet } from "./audio-recorder.js";

// Start audio
function startAudio() {
  // Start audio output
  startAudioPlayerWorklet().then(([node, ctx]) => {
    audioPlayerNode = node;
    audioPlayerContext = ctx;
  });
  // Start audio input
  startAudioRecorderWorklet(audioRecorderHandler).then(
    ([node, ctx, stream]) => {
      audioRecorderNode = node;
      audioRecorderContext = ctx;
      micStream = stream;
    }
  );
}

// Start the audio only when the user clicked the button
// (due to the gesture requirement for the Web Audio API)
startAudioButton.addEventListener("click", () => {
    startAudioButton.disabled = true;
    startAudio();
    voiceStatus.textContent = "Voice input active - speak now!";
    voiceStatus.style.color = "#28a745";
});

// Audio recorder handler
function audioRecorderHandler(pcmData) {
  // Add audio data to buffer
  audioBuffer.push(new Uint8Array(pcmData));
  
  // Start timer if not already running
  if (!bufferTimer) {
    bufferTimer = setInterval(sendBufferedAudio, 200); // 0.2 seconds
  }
}

// Send buffered audio data every 0.2 seconds
function sendBufferedAudio() {
  if (audioBuffer.length === 0) {
    return;
  }
  
  // Calculate total length
  let totalLength = 0;
  for (const chunk of audioBuffer) {
    totalLength += chunk.length;
  }
  
  // Combine all chunks into a single buffer
  const combinedBuffer = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of audioBuffer) {
    combinedBuffer.set(chunk, offset);
    offset += chunk.length;
  }
  
  // Send the combined audio data
  sendMessage({
    mime_type: "audio/pcm",
    data: arrayBufferToBase64(combinedBuffer.buffer),
  });
  console.log("[CLIENT TO AGENT] sent %s bytes", combinedBuffer.byteLength);
  
  // Clear the buffer
  audioBuffer = [];
}

// Stop audio recording and cleanup
function stopAudioRecording() {
  if (bufferTimer) {
    clearInterval(bufferTimer);
    bufferTimer = null;
  }
  
  // Send any remaining buffered audio
  if (audioBuffer.length > 0) {
    sendBufferedAudio();
  }
}

// Encode an array buffer with Base64
function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize subject selection
    initializeSubjectSelection();
    
    console.log("EduCraft AI Voice Assistant initialized");
});
