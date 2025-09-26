import React from 'react';

// Math Topic Icons
export const MathIcons = {
  'Number Systems': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 5L6.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 6.5L8 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17.5 5L17.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 6.5L19 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 16L6.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 17.5L19 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'Algebra - Polynomials': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 18L9 6L15 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 14H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 6L17 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Linear Equations': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6L21 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 18L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  'Coordinate Geometry': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3L12 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 3" />
      <circle cx="17" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  'Euclid\'s Geometry': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3L12 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 5L19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'Lines and Angles': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 20L20 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 20L20 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 11L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 17A 8 8 0 0 1 17 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 2" />
    </svg>
  ),
  'Triangles': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L20 18H4L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 10L8 18H16L12 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Quadrilaterals': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5L19 5L19 19L5 19L5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8L16 8L16 16L8 16L8 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 5L8 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M19 5L16 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M19 19L16 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M5 19L8 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  'Circles': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3L12 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
      <path d="M3 12L21 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="1 3" />
    </svg>
  ),
};

// Science Topic Icons
export const ScienceIcons = {
  'Motion': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 8L21 12L17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 10V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'Force and Laws of Motion': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="10" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 14H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 10L21 14L17 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 8H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Gravitation': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 11V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 2" />
      <path d="M8 17L16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 7H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'Floatation': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12C3 12 6 8 12 8C18 8 21 12 21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 16C3 16 6 20 12 20C18 20 21 16 21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 3" />
      <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  'Work and Energy': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L19 14H5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 14V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 18H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'Sound': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 11C3 7.22876 3 5.34315 4.17157 4.17157C5.34315 3 7.22876 3 11 3H13C16.7712 3 18.6569 3 19.8284 4.17157C21 5.34315 21 7.22876 21 11V13C21 16.7712 21 18.6569 19.8284 19.8284C18.6569 21 16.7712 21 13 21H11C7.22876 21 5.34315 21 4.17157 19.8284C3 18.6569 3 16.7712 3 13V11Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 12V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

// English Topic Icons
export const EnglishIcons = {
  'Reading Skills': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 19V5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 4V20" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 16H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 16H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'Grammar - Determiners': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 17H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 14V17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Grammar - Tenses': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 4L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 4L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

// Social Science Topic Icons
export const SocialScienceIcons = {
  'The French Revolution': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L14 9H19L15 12L17 17L12 14L7 17L9 12L5 9H10L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 21H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 21V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 21V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'Socialism in Europe': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 21V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 21V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 7L12 3L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21V17C9 15.8954 9.89543 15 11 15H13C14.1046 15 15 15.8954 15 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 9V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

// Hindi Topic Icons
export const HindiIcons = {
  'अपठित बोध - गद्य': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 19V5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'व्याकरण - उपसर्ग': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 7L9 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 7L15 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

// Sanskrit Topic Icons
export const SanskritIcons = {
  'अपठित अवबोधनम्': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 19V5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 4L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 3" />
    </svg>
  ),
  'संस्कृत व्याकरणम्': (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 3" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 3" />
      <path d="M7 7L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 7L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

// Default Topic Icon
export const DefaultTopicIcon = (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Get topic icon based on subject and topic name
export const getTopicIcon = (subjectId: string, topicName: string) => {
  switch (subjectId) {
    case 'mathematics':
      return MathIcons[topicName as keyof typeof MathIcons] || DefaultTopicIcon;
    case 'science':
      return ScienceIcons[topicName as keyof typeof ScienceIcons] || DefaultTopicIcon;
    case 'english':
      return EnglishIcons[topicName as keyof typeof EnglishIcons] || DefaultTopicIcon;
    case 'social':
      return SocialScienceIcons[topicName as keyof typeof SocialScienceIcons] || DefaultTopicIcon;
    case 'hindi':
      return HindiIcons[topicName as keyof typeof HindiIcons] || DefaultTopicIcon;
    case 'sanskrit':
      return SanskritIcons[topicName as keyof typeof SanskritIcons] || DefaultTopicIcon;
    default:
      return DefaultTopicIcon;
  }
};

// Status Icons
export const CompletedIcon = (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const InProgressIcon = (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 8L16 12L10 16V8Z" fill="currentColor" />
  </svg>
);

export const NotStartedIcon = (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <path d="M12 7V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 15V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M7 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);



