# Voice Features - AI Tutor Integration

## Overview

The AI tutor now includes full voice functionality, similar to the backend Physics interface. Users can interact with the AI tutor using both text and voice, with real-time audio input and output.

## Voice Features

### 🎤 **Voice Input**
- **Real-time Audio Capture**: Uses Web Audio API to capture microphone input
- **PCM Audio Processing**: Converts audio to 16-bit PCM format for backend compatibility
- **Automatic Buffering**: Audio is buffered and sent every 0.2 seconds for real-time processing
- **Voice Activity Detection**: Visual indicators show when voice input is active

### 🔊 **Voice Output**
- **AI Audio Responses**: AI responses are played back as audio when in voice mode
- **PCM Audio Playback**: Uses Web Audio API worklets for high-quality audio output
- **Automatic Playback**: Audio responses play automatically without user intervention
- **Audio Interruption**: Can interrupt ongoing audio playback for new responses

### 🎛️ **Voice Controls**
- **Mode Toggle**: Switch between text and voice modes using the microphone button
- **Start/Stop Voice**: Dedicated voice input controls with visual feedback
- **Status Indicators**: Real-time status messages show voice input state
- **Connection Status**: Voice features respect backend connection status

## How to Use Voice Features

### 1. **Enable Voice Mode**
- Click the microphone button in the AI tutor header
- The button will change to show voice mode is active

### 2. **Start Voice Input**
- Click the "Start Voice" button in the voice controls section
- Grant microphone permissions when prompted
- The button will show "Stop Voice" and a pulsing indicator

### 3. **Speak Your Question**
- Speak clearly into your microphone
- The system will automatically capture and send your audio
- Visual feedback shows voice input is active

### 4. **Listen to AI Response**
- AI responses will be played back as audio automatically
- You can continue the conversation by speaking again
- Text responses are still visible in the chat

### 5. **Stop Voice Input**
- Click "Stop Voice" to end the current voice session
- You can switch back to text mode or restart voice input

## Technical Implementation

### Audio Worklets
- **PCM Recorder Processor**: Captures microphone input and converts to PCM
- **PCM Player Processor**: Plays back AI audio responses
- **Web Audio API**: Provides low-latency audio processing

### Audio Format
- **Input**: 16kHz sample rate, mono channel, 16-bit PCM
- **Output**: 24kHz sample rate, stereo, 16-bit PCM
- **Transmission**: Base64 encoded audio data over HTTP/SSE

### Backend Integration
- **Audio Endpoints**: Uses same endpoints as text but with audio MIME types
- **Real-time Streaming**: Audio is streamed in chunks for low latency
- **Subject-Specific**: Voice responses use the same subject-specific AI agents

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 66+
- ✅ Firefox 76+
- ✅ Safari 14.1+
- ✅ Edge 79+

### Requirements
- **HTTPS**: Required for microphone access (except localhost)
- **Web Audio API**: Must be supported
- **Audio Worklets**: Required for PCM processing
- **Microphone Access**: User must grant permissions

## Troubleshooting Voice Issues

### Microphone Not Working
1. **Check Permissions**: Ensure microphone access is granted
2. **Browser Settings**: Check browser microphone settings
3. **Hardware**: Verify microphone is working in other applications
4. **HTTPS**: Ensure you're using HTTPS (or localhost for development)

### No Audio Output
1. **Volume**: Check system and browser volume settings
2. **Audio Context**: Ensure Web Audio API is supported
3. **Backend**: Verify backend is sending audio data
4. **Console**: Check browser console for audio worklet errors

### Poor Audio Quality
1. **Microphone**: Use a good quality microphone
2. **Environment**: Reduce background noise
3. **Network**: Ensure stable internet connection
4. **Browser**: Try a different browser if issues persist

## Voice Best Practices

### For Users
- **Speak Clearly**: Enunciate words clearly for better recognition
- **Reduce Noise**: Use in a quiet environment when possible
- **Wait for Response**: Allow AI to finish speaking before asking next question
- **Use Headphones**: Prevents audio feedback and improves quality

### For Developers
- **Error Handling**: Always handle audio permission denials gracefully
- **Fallback**: Provide text alternatives when voice fails
- **Performance**: Monitor audio buffer sizes and processing times
- **Testing**: Test voice features across different browsers and devices

## Future Enhancements

### Planned Features
- **Voice Commands**: Special voice commands for navigation
- **Multi-language**: Support for multiple languages
- **Voice Profiles**: Personalized voice settings
- **Offline Mode**: Basic voice processing without internet

### Advanced Features
- **Noise Cancellation**: Built-in noise reduction
- **Voice Cloning**: Custom AI voice options
- **Emotion Detection**: AI responses based on user emotion
- **Accessibility**: Enhanced accessibility features

## Conclusion

The voice features provide a natural, hands-free way to interact with the AI tutor, making learning more accessible and engaging. The implementation follows web standards and provides a robust foundation for future voice enhancements.
