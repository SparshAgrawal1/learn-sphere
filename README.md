# Learn Sphere Vista

A modern, immersive educational platform with interactive learning experiences, AI-powered tutoring, and a visually stunning user interface.

![Learn Sphere Vista](https://via.placeholder.com/1200x630?text=Learn+Sphere+Vista)

## 🌟 Overview

Learn Sphere Vista is a next-generation educational platform designed to transform how students interact with learning content. Featuring a sleek, modern UI with glassmorphic design elements, 3D visualizations, and AI-powered tutoring, the platform creates an engaging and personalized learning experience across multiple subjects.

## ✨ Key Features

- **Interactive Dashboard**: A visually stunning 3D dashboard with subject cards and real-time progress tracking
- **Subject-Specific Learning Environments**: Customized visual themes and interactive elements for each subject
- **AI Learning Assistant**: Contextual AI tutor that answers questions and provides personalized guidance
- **Interactive Lessons**: Engaging content with both interactive and PDF viewing modes
- **Progress Tracking**: Visual representation of learning progress with intelligent insights
- **Knowledge Assessment**: Built-in testing to evaluate understanding and unlock new content
- **Responsive Design**: Seamless experience across desktop and mobile devices

## 🏗️ Project Structure

### Core Components

#### Pages

- **Dashboard (`/src/pages/SubjectDashboard.tsx`)**
  - The main subject dashboard with 3D visualization, AI insights, and topic timeline
  - Features subject-specific backgrounds, animated elements, and progress tracking
  
- **Topic Page (`/src/pages/EnhancedTopicPage.tsx`)**
  - Displays individual topic content with navigation, interactive content, and AI tutor
  - Includes assessment capabilities and progress tracking

- **Learning Page (`/src/pages/Learning.tsx`)**
  - Manages curriculum data and routing for different subjects and topics

#### Learning Components

- **Content Frame (`/src/components/learning/ContentFrame.tsx`)**
  - Displays interactive lesson content or PDF versions
  - Features a modern header with progress tracking and navigation controls

- **Navigation Panel (`/src/components/learning/ModernNavigationPanel.tsx`)**
  - Provides topic navigation with visual indicators for progress and completion status
  - Shows connected learning path with locked/unlocked states

- **AI Tutor Panel (`/src/components/learning/AITutorPanel.tsx`)**
  - Interactive chat interface for AI-powered tutoring
  - Features suggested questions and real-time typing indicators

- **Assessment Panel (`/src/components/learning/AssessmentPanel.tsx`)**
  - Knowledge testing with multiple-choice questions
  - Provides immediate feedback and unlocks new content based on performance

#### Dashboard Components

- **AI Insights Panel (`/src/components/dashboard/AIInsightsPanel.tsx`)**
  - Provides intelligent insights about learning progress and recommendations
  - Identifies critical path topics, blocked content, and suggested next steps

- **Topic Timeline (`/src/components/dashboard/TopicTimeline.tsx`)**
  - Visual representation of the learning journey with progress indicators
  - Shows completed, in-progress, and upcoming topics

- **Subject Background Elements (`/src/components/dashboard/SubjectBackgroundElements.tsx`)**
  - Subject-specific animated symbols and decorative elements

#### Visual Components

- **Enhanced Background (`/src/components/landing/EnhancedBackground.tsx`)**
  - Creates sophisticated background with grid patterns, noise texture, and animated particles

- **Enhanced 3D Floor (`/src/components/landing/Enhanced3DFloor.tsx`)**
  - Generates a 3D perspective floor with grid pattern and animated pulse waves

- **Logo (`/src/components/landing/Logo.tsx`)**
  - Animated logo component with customizable variants

## 🎨 Design System

The platform features a consistent design language across all components:

- **Glassmorphic UI**: Frosted glass effect with subtle transparency and blur
- **Dark Theme**: Rich dark backgrounds with vibrant accent colors for each subject
- **3D Elements**: Perspective floors, floating cards, and depth effects
- **Dynamic Lighting**: Accent lights, shadows, and ambient glow effects
- **Animated Particles**: Floating particles that match subject colors
- **Grid Patterns**: Subtle grid backgrounds that create depth and structure
- **Subject-Specific Themes**:
  - Mathematics: Green (#10B981) with mathematical symbols
  - Science: Amber (#F59E0B) with scientific illustrations
  - English: Purple (#8B5CF6) with literary elements
  - Social Studies: Red (#EF4444) with historical symbols
  - Hindi: Cyan (#06B6D4) with Devanagari script
  - Sanskrit: Pink (#EC4899) with classical symbols

## 📚 Curriculum Structure

The platform organizes content hierarchically:

- **Subjects**: Main knowledge areas (Mathematics, Science, etc.)
- **Topics**: Major concepts within each subject
- **Subtopics**: Specific lessons within each topic
- **Assessments**: Knowledge checks to evaluate understanding

## 🧠 AI Learning Assistant

The AI tutor provides:

- **Contextual Help**: Answers specific to the current topic
- **Concept Explanations**: Simplified breakdowns of complex ideas
- **Examples**: Practical applications and demonstrations
- **Progress Guidance**: Recommendations based on learning patterns

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or Bun

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd learn-sphere-vista

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:8080` (or another port if 8080 is in use).

## 🔧 Technologies Used

- **React**: UI component library
- **TypeScript**: Type-safe JavaScript
- **Framer Motion**: Animation library
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Lucide Icons**: Modern icon set

## 🌐 Browser Support

The application is optimized for modern browsers:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by the Learn Sphere Vista team.