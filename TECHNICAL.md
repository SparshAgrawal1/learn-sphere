# Learn Sphere Vista - Technical Documentation

This document provides detailed technical information about the Learn Sphere Vista educational platform, including architecture, component design, and implementation details.

## Architecture Overview

Learn Sphere Vista follows a component-based architecture using React and TypeScript. The application is structured around several key modules:

1. **Pages**: Top-level components that represent entire views
2. **Components**: Reusable UI elements organized by functionality
3. **Hooks**: Custom React hooks for shared logic
4. **Lib**: Utility functions and helpers

## Key Components and Implementation Details

### Dashboard System

#### SubjectDashboard.tsx

The dashboard is built with a sophisticated 3D visualization system:

- **3D Model Integration**: Uses a custom `spline-viewer` web component rendered via `dangerouslySetInnerHTML` to display interactive 3D models
- **Dynamic Backgrounds**: Implements subject-specific backgrounds with SVG illustrations, gradient overlays, and animated particles
- **Floating Cards**: Uses Framer Motion for animated, floating card components with glassmorphic styling
- **3D Floor Effect**: Creates a perspective floor with CSS transforms and dynamic grid patterns

```tsx
// Example of 3D floor implementation
<div className="absolute bottom-0 left-0 right-0 h-1/3 z-0 pointer-events-none"
  style={{
    background: `radial-gradient(ellipse 80% 50% at center bottom, 
      rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.15) 0%, 
      rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.08) 40%, 
      rgba(${accentRGB.r}, ${accentRGB.g}, ${accentRGB.b}, 0.03) 70%,
      transparent 100%
    )`,
    transform: 'perspective(1000px) rotateX(75deg)',
    transformOrigin: 'center bottom'
  }}
/>
```

#### AIInsightsPanel.tsx

This component provides intelligent insights about the student's learning journey:

- **Critical Path Analysis**: Identifies essential topics that are prerequisites for future learning
- **Blocked Content Detection**: Highlights content that is currently inaccessible due to incomplete prerequisites
- **Progress Analytics**: Analyzes completion rates and time spent on topics
- **Personalized Recommendations**: Suggests next steps based on learning patterns

### Learning System

#### EnhancedTopicPage.tsx

The main topic page orchestrates multiple components:

- **Conditional Rendering**: Dynamically loads appropriate content based on URL parameters
- **State Management**: Manages multiple states including active subtopic, PDF mode, assessment state, and mobile navigation
- **Subject Theming**: Applies subject-specific colors, illustrations, and animations
- **Inter-component Communication**: Coordinates between navigation, content, and AI tutor components

```tsx
// Example of dynamic theme color selection
const getThemeColor = () => {
  const currentSubjectId = subjectId || topic?.subjectId;
  
  switch (currentSubjectId) {
    case 'mathematics': return { accent: '#10B981', bg: '#064e3b' };
    case 'science': return { accent: '#F59E0B', bg: '#78350f' };
    case 'english': return { accent: '#8B5CF6', bg: '#4c1d95' };
    case 'social': return { accent: '#EF4444', bg: '#7f1d1d' };
    case 'hindi': return { accent: '#06B6D4', bg: '#155e75' };
    case 'sanskrit': return { accent: '#EC4899', bg: '#831843' };
    default: return { accent: '#3B82F6', bg: '#1e40af' };
  }
};
```

#### ContentFrame.tsx

This component handles the display of lesson content:

- **Iframe Integration**: Uses iframes to load HTML content while maintaining styling consistency
- **Mode Switching**: Toggles between interactive and PDF viewing modes
- **Progress Tracking**: Displays and updates completion percentage
- **Navigation Controls**: Provides controls for moving between subtopics

#### ModernNavigationPanel.tsx

Provides navigation through the learning content:

- **Visual Learning Path**: Displays topics with visual connections between them
- **Status Indicators**: Shows completion status with icons and color coding
- **Progress Visualization**: Includes progress bars for each topic and overall progress
- **Conditional Rendering**: Adapts display based on completion and lock status

#### AITutorPanel.tsx

An AI-powered tutoring interface:

- **Chat Interface**: Implements a modern chat UI with user and AI messages
- **Real-time Indicators**: Shows typing animation when AI is generating responses
- **Suggested Questions**: Provides contextual question suggestions
- **Minimizable Design**: Can be collapsed to save space while learning

### Visual System

#### Glassmorphic UI

The platform uses a consistent glassmorphic design language:

```tsx
// Example of glassmorphic card styling
<motion.div 
  className="rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 p-4"
  style={{
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
  }}
>
  {/* Card content */}
</motion.div>
```

#### Animation System

Animations are implemented using Framer Motion:

- **Entrance Animations**: Fade and slide effects when components mount
- **Hover/Tap Animations**: Interactive feedback for clickable elements
- **Continuous Animations**: Subtle, ongoing animations for background elements
- **Staggered Animations**: Sequenced animations for lists and groups

```tsx
// Example of staggered animations
{messages.map((message, index) => (
  <motion.div
    key={message.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
  >
    {/* Message content */}
  </motion.div>
))}
```

#### Responsive Design

The platform adapts to different screen sizes:

- **Mobile Navigation**: Special navigation for small screens with toggleable panels
- **Responsive Layouts**: Flex and grid layouts that adjust to available space
- **Conditional Rendering**: Different components shown based on screen size
- **Touch Optimization**: Larger touch targets on mobile devices

## Data Flow

### Curriculum Data

The platform uses a structured data model for curriculum:

```typescript
interface SubTopic {
  id: string;
  title: string;
  progress: number;
  isLocked: boolean;
  isCompleted: boolean;
  questions?: Question[];
}

interface Topic {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  subtopics: SubTopic[];
  description: string;
}
```

### State Management

State is managed using React's built-in hooks:

- **useState**: For component-level state
- **useEffect**: For side effects like data fetching and DOM manipulation
- **useRef**: For persistent references to DOM elements
- **useParams**: For accessing URL parameters

### Inter-component Communication

Components communicate through:

- **Props**: Direct parent-to-child communication
- **Callback Functions**: Child-to-parent communication
- **URL Parameters**: Global state accessible via React Router

## Performance Optimizations

The application includes several performance optimizations:

- **Chunk Splitting**: Code splitting via dynamic imports
- **Lazy Loading**: Components loaded only when needed
- **Memoization**: Prevents unnecessary re-renders
- **Asset Optimization**: Optimized images and SVGs
- **Build Optimization**: Terser minification and dependency pre-bundling

## Browser Compatibility

The application is designed to work in modern browsers with these features:

- **CSS Grid and Flexbox**: For modern layouts
- **CSS Variables**: For theme customization
- **Backdrop Filter**: For glassmorphic effects (with fallbacks)
- **Web Animations API**: For performance-optimized animations
- **Intersection Observer**: For scroll-based effects

## Future Enhancements

Planned technical improvements:

1. **Server-Side Rendering**: Improve initial load performance
2. **PWA Support**: Enable offline access to learning content
3. **Real-time Collaboration**: Add collaborative features
4. **Advanced Analytics**: Implement learning pattern analysis
5. **Accessibility Improvements**: Enhance screen reader support and keyboard navigation

---

This technical documentation is intended for developers working on the Learn Sphere Vista platform. For user documentation, please refer to the README.md file.

