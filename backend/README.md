# EduCraft AI - Voice-Powered Interactive Learning

An AI-powered educational platform that provides voice-enabled tutoring across multiple subjects using Google's Agent Development Kit (ADK) and Gemini AI.

## Features

- **Multi-Subject Support**: Specialized AI tutors for Mathematics, Social Science, Chemistry, Biology, English, and Physics
- **Voice Interaction**: Real-time voice input and output for natural conversation
- **Modern UI**: Beautiful, responsive interface inspired by EduCraft AI
- **Real-time Streaming**: Bidirectional communication with AI agents
- **Subject-Specific Expertise**: Each subject has a specialized AI agent with domain knowledge

## Subjects Available

- 🧮 **Mathematics** - Numbers, patterns, algebra, geometry, calculus
- 🌍 **Social Science** - Society, economics, politics, human relationships  
- 🧪 **Chemistry** - Composition, structure, and properties of matter
- 🧬 **Biology** - Life sciences from cells to ecosystems
- 📚 **English** - Literature, language, and communication
- ⚛️ **Physics** - Fundamental laws governing the universe

## Setup Instructions

### Prerequisites

- Python 3.8+
- Google AI Studio API key or Google Cloud Vertex AI access
- Modern web browser with Web Audio API support

### Installation

1. **Clone and navigate to the app directory:**
   ```bash
   cd examples/python/snippets/streaming/adk-streaming/app
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the app directory:
   ```bash
   # For Google AI Studio (recommended for development)
   GOOGLE_API_KEY=your_api_key_here
   GOOGLE_GENAI_USE_VERTEXAI=FALSE
   
   # OR for Google Cloud Vertex AI
   # GOOGLE_CLOUD_PROJECT=your_project_id
   # GOOGLE_CLOUD_LOCATION=us-central1
   # GOOGLE_GENAI_USE_VERTEXAI=TRUE
   ```

4. **Run the application:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Open your browser:**
   Navigate to `http://localhost:8000`

## Usage

1. **Select a Subject**: Click on any subject card to start a conversation with that subject's AI tutor
2. **Text Chat**: Type your questions and get instant responses
3. **Voice Mode**: Click the voice toggle to enable voice input/output
4. **Natural Conversation**: Ask questions, request explanations, or get help with problems

## Architecture

### Backend Components

- **FastAPI Server**: Handles HTTP requests and WebSocket connections
- **ADK Agents**: Specialized AI agents for each subject using Gemini 2.0 Flash
- **SSE Streaming**: Server-Sent Events for real-time communication
- **Audio Processing**: PCM audio handling for voice interactions

### Frontend Components

- **Subject Selection**: Interactive grid of subject cards
- **Chat Interface**: Real-time messaging with AI tutors
- **Voice Controls**: Web Audio API integration for voice input/output
- **Responsive Design**: Modern, mobile-friendly interface

### AI Agents

Each subject has a specialized agent with:
- Domain-specific knowledge and instructions
- Google Search integration for real-time information
- Optimized prompts for educational content
- Voice and text interaction capabilities

## API Endpoints

- `GET /` - Main application interface
- `GET /events/{user_id}?subject={subject}&is_audio={boolean}` - SSE endpoint for agent communication
- `POST /send/{user_id}` - Send messages to agents

## Development

### Adding New Subjects

1. Create a new agent file: `{subject}_agent/agent.py`
2. Add the agent to `SUBJECT_AGENTS` in `main.py`
3. Update the frontend subject grid in `index.html`
4. Add subject name mapping in `app.js`

### Customizing Agents

Modify the agent instructions in each `{subject}_agent/agent.py` file to customize:
- Teaching style and approach
- Subject-specific terminology
- Problem-solving methods
- Interaction patterns

## Browser Compatibility

- Chrome 66+ (recommended)
- Firefox 60+
- Safari 14+
- Edge 79+

Voice features require:
- HTTPS connection (or localhost)
- Microphone permissions
- Web Audio API support

## Troubleshooting

### Common Issues

1. **Voice not working**: Ensure HTTPS or localhost, check microphone permissions
2. **Connection errors**: Verify API key and network connectivity
3. **Audio quality**: Check microphone settings and browser audio permissions

### Debug Mode

Enable console logging by opening browser developer tools to see detailed communication logs.

## License

This project is licensed under the Apache 2.0 License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please see the main ADK documentation for contribution guidelines.

---

**Powered by Google's Agent Development Kit and Gemini AI**
