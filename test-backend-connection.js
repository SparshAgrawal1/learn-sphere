/**
 * Simple test script to verify backend connection
 * Run with: node test-backend-connection.js
 */

const http = require('http');

const testBackendConnection = async () => {
  console.log('🔍 Testing backend connection...\n');
  
  const sessionId = Math.random().toString().substring(10);
  const testUrl = `http://localhost:8000/events/${sessionId}?subject=physics&is_audio=false`;
  
  console.log(`📡 Connecting to: ${testUrl}`);
  
  try {
    // Test basic connectivity
    const response = await fetch('http://localhost:8000/');
    if (response.ok) {
      console.log('✅ Backend server is running and accessible');
    } else {
      console.log('❌ Backend server responded with error:', response.status);
      return;
    }
    
    // Test SSE endpoint
    console.log('📡 Testing SSE endpoint...');
    const eventSource = new EventSource(testUrl);
    
    eventSource.onopen = () => {
      console.log('✅ SSE connection established successfully');
      
      // Send a test message
      setTimeout(async () => {
        try {
          const sendResponse = await fetch(`http://localhost:8000/send/${sessionId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mime_type: "text/plain",
              data: "Hello, this is a test message"
            })
          });
          
          if (sendResponse.ok) {
            console.log('✅ Test message sent successfully');
          } else {
            console.log('❌ Failed to send test message:', sendResponse.status);
          }
        } catch (error) {
          console.log('❌ Error sending test message:', error.message);
        }
      }, 1000);
    };
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('📨 Received message from AI:', data);
      
      if (data.turn_complete) {
        console.log('✅ AI response completed successfully');
        eventSource.close();
        console.log('\n🎉 Backend integration test completed successfully!');
        process.exit(0);
      }
    };
    
    eventSource.onerror = (error) => {
      console.log('❌ SSE connection error:', error);
      eventSource.close();
      process.exit(1);
    };
    
    // Timeout after 10 seconds
    setTimeout(() => {
      console.log('⏰ Test timeout - closing connection');
      eventSource.close();
      process.exit(1);
    }, 10000);
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure the backend server is running: uvicorn main:app --reload --host 0.0.0.0 --port 8000');
    console.log('2. Check if port 8000 is available');
    console.log('3. Verify your Google API key is configured in the .env file');
    process.exit(1);
  }
};

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  console.log('🌐 Running in browser environment');
  testBackendConnection();
} else {
  console.log('🖥️  Running in Node.js environment');
  console.log('Note: This test requires a browser environment for EventSource');
  console.log('Please run this test in a browser console or use the frontend application');
}
