#!/usr/bin/env python3
"""
EduCraft AI Voice Assistant - Startup Script
"""

import os
import sys
import subprocess
from pathlib import Path

def check_requirements():
    """Check if required packages are installed"""
    try:
        import fastapi
        import uvicorn
        import google.adk
        print("✅ All required packages are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing required package: {e}")
        print("Please run: pip install -r requirements.txt")
        return False

def check_env_file():
    """Check if .env file exists"""
    env_file = Path(".env")
    if env_file.exists():
        print("✅ .env file found")
        return True
    else:
        print("❌ .env file not found")
        print("Please create a .env file with your Google API key:")
        print("GOOGLE_API_KEY=your_api_key_here")
        print("GOOGLE_GENAI_USE_VERTEXAI=FALSE")
        return False

def main():
    """Main startup function"""
    print("🚀 Starting EduCraft AI Voice Assistant...")
    print("=" * 50)
    
    # Check requirements
    if not check_requirements():
        sys.exit(1)
    
    # Check environment file
    if not check_env_file():
        sys.exit(1)
    
    print("\n🌐 Starting server...")
    print("📱 Open your browser to: http://localhost:8000")
    print("🎤 Voice features work best in Chrome/Edge")
    print("⏹️  Press Ctrl+C to stop the server")
    print("=" * 50)
    
    # Start the server
    try:
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "main:app", 
            "--reload", 
            "--host", "0.0.0.0", 
            "--port", "8000"
        ])
    except KeyboardInterrupt:
        print("\n👋 Server stopped. Goodbye!")

if __name__ == "__main__":
    main()
