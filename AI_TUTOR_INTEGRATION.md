# AI Tutor Integration - Backend Integration

## Overview

The AI tutor chatbot that appears on the right side of every topic has been successfully replaced with the working AI tutor system from the backend. This integration connects the frontend React application with the Python FastAPI backend that uses Google's Agent Development Kit (ADK) and Gemini AI.

## Changes Made

### 1. New Component: BackendAITutorPanel

**File**: `src/components/learning/BackendAITutorPanel.tsx`

- **Purpose**: Replaces the mock AITutorPanel with a real backend-connected AI tutor
- **Features**:
  - Real-time communication via Server-Sent Events (SSE)
  - Subject-specific AI agents (Math, Physics, Chemistry, Biology, English, Social Science)
  - Voice and text input support
  - Connection status indicators
  - Automatic subject detection based on topic title
  - Error handling and reconnection logic

### 2. Updated Pages

**Files Updated**:
- `src/pages/EnhancedTopicPage.tsx`
- `src/pages/Learning.tsx`

**Changes**:
- Replaced `AITutorPanel` import with `BackendAITutorPanel`
- Removed unused state variables and mock AI response functions
- Simplified component props (BackendAITutorPanel manages its own state)

## Backend Integration Details

### Connection Architecture

```
Frontend (React) ←→ SSE ←→ Backend (FastAPI) ←→ Google ADK ←→ Gemini AI
```

### Subject Mapping

The component automatically detects the subject based on the topic title:

- **Physics**: Topics containing "physics", "motion", "force"
- **Mathematics**: Topics containing "math", "algebra", "geometry"
- **Chemistry**: Topics containing "chemistry", "molecule"
- **Biology**: Topics containing "biology", "cell"
- **English**: Topics containing "english", "literature"
- **Social Science**: Topics containing "social", "history"
- **Default**: Physics (fallback)

### API Endpoints Used

1. **SSE Connection**: `http://localhost:8000/events/{sessionId}?subject={subject}&is_audio={boolean}`
2. **Message Sending**: `http://localhost:8000/send/{sessionId}`

### Features

#### Real-time Communication
- Server-Sent Events for streaming AI responses
- Automatic reconnection on connection loss
- Connection status indicators

#### Voice Support
- Toggle between text and voice modes
- Real-time voice input with microphone access
- Audio output playback for AI responses
- PCM audio processing with Web Audio API
- Voice activity indicators and status messages
- Automatic audio buffering and transmission

#### Smart Subject Detection
- Automatic subject identification from topic titles
- Subject-specific AI agents with specialized knowledge
- Fallback to Physics agent for unknown subjects

## Setup Requirements

### Backend Setup

1. **Install Dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Environment Variables**:
   Create a `.env` file in the backend directory:
   ```bash
   # For Google AI Studio (recommended for development)
   GOOGLE_API_KEY=your_api_key_here
   GOOGLE_GENAI_USE_VERTEXAI=FALSE
   
   # OR for Google Cloud Vertex AI
   # GOOGLE_CLOUD_PROJECT=your_project_id
   # GOOGLE_CLOUD_LOCATION=us-central1
   # GOOGLE_GENAI_USE_VERTEXAI=TRUE
   ```

3. **Start Backend Server**:
   ```bash
   cd backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Install Dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```

2. **Start Frontend**:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

## Usage

1. **Navigate to any topic** in the learning interface
2. **AI Tutor Panel** appears on the right side (desktop) or can be toggled (mobile)
3. **Ask questions** about the current topic via text input
4. **Toggle voice mode** using the microphone button in the header
5. **Start voice input** by clicking the "Start Voice" button when in voice mode
6. **Speak your questions** - the system will automatically capture and send audio
7. **Listen to AI responses** - audio responses will play automatically in voice mode
8. **Get real-time responses** from subject-specific AI agents

## Technical Details

### State Management

The `BackendAITutorPanel` manages its own state:
- Messages array
- Connection status
- Audio mode toggle
- Typing indicators

### Error Handling

- Automatic reconnection on connection loss
- Connection status indicators
- Graceful fallback for failed connections

### Performance

- Efficient SSE connection management
- Minimal re-renders with proper state management
- Optimized message handling

## Troubleshooting

### Common Issues

1. **Connection Failed**:
   - Ensure backend server is running on port 8000
   - Check Google API key configuration
   - Verify network connectivity

2. **No AI Responses**:
   - Check browser console for SSE connection errors
   - Verify subject detection is working correctly
   - Ensure backend agents are properly configured

3. **Voice Not Working**:
   - Check microphone permissions in browser
   - Ensure HTTPS connection (or localhost for development)
   - Verify Web Audio API support in browser
   - Check browser console for audio worklet errors
   - Ensure backend is running and accessible

### Debug Mode

Enable console logging to see detailed communication:
- Open browser developer tools
- Check console for SSE connection logs
- Monitor message flow between frontend and backend

## Future Enhancements

1. **Enhanced Voice Features**:
   - Better audio quality
   - Voice command recognition
   - Multi-language support

2. **Advanced AI Features**:
   - Context-aware responses
   - Learning progress integration
   - Personalized recommendations

3. **UI Improvements**:
   - Better mobile experience
   - Customizable chat themes
   - Message history persistence

## Conclusion

The AI tutor integration successfully connects the frontend learning interface with the powerful backend AI system, providing students with real-time, subject-specific tutoring assistance. The system is robust, scalable, and ready for production use.
