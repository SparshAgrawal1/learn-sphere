// Comprehensive curriculum data structure based on curriculum.md
import { 
  Calculator, 
  Microscope, 
  BookOpen, 
  Globe, 
  Languages, 
  BookMarked,
  Binary,
  Sigma,
  Ruler,
  LineChart,
  Atom,
  Flame,
  Dna,
  Landmark,
  Mountain,
  CloudRain,
  Users,
  Building2,
  Coins,
  Pen,
  BookText,
  BookCopy,
  PenTool,
  Scroll,
  ScrollText,
  FileText
} from 'lucide-react';

export interface Topic {
  id: string;
  name: string;
  progress: number;
  completed: boolean;
  description?: string;
  subtopics?: string[];
  icon?: any;
  color?: string;
}

export interface Chapter {
  id: string;
  name: string;
  topics: Topic[];
  icon?: any;
  color?: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: any;
  color: string;
  themeColor: string;
  progress: number;
  natureElement: string;
  description: string;
  chapters: Chapter[];
  position: { x: number; y: number; z: number };
}

// Define the comprehensive curriculum
export const curriculum: Subject[] = [
  { 
    id: 'mathematics',
    name: 'Mathematics', 
    icon: Calculator,
    color: '#10B981',
    themeColor: 'emerald',
    progress: 75,
    natureElement: 'leaf',
    description: 'Explore the world of numbers, patterns, and problem-solving',
    position: { x: 0, y: -25, z: 0 },
    chapters: [
      {
        id: 'number-systems',
        name: 'Number Systems',
        icon: Binary,
        color: '#10B981',
        topics: [
          { id: 'real-numbers', name: 'Real Numbers', progress: 95, completed: true, 
            subtopics: ['Natural numbers', 'Integers', 'Rational numbers', 'Irrational numbers'] },
          { id: 'irrational-numbers', name: 'Irrational Numbers', progress: 90, completed: true,
            subtopics: ['√2', '√3', 'π'] },
          { id: 'decimals', name: 'Recurring & Terminating Decimals', progress: 85, completed: true },
          { id: 'operations', name: 'Operations on Real Numbers', progress: 80, completed: true },
          { id: 'exponents', name: 'Laws of Exponents', progress: 75, completed: false },
          { id: 'rationalization', name: 'Rationalization', progress: 70, completed: false },
        ]
      },
      {
        id: 'algebra',
        name: 'Algebra',
        icon: Sigma,
        color: '#10B981',
        topics: [
          { id: 'polynomials', name: 'Polynomials', progress: 65, completed: false,
            subtopics: ['Definitions', 'Degree', 'Zeroes', 'Remainder & Factor theorem'] },
          { id: 'factorization', name: 'Factorization & Algebraic Identities', progress: 60, completed: false },
          { id: 'linear-equations', name: 'Linear Equations in Two Variables', progress: 55, completed: false },
          { id: 'parallel-lines', name: 'Lines Parallel to Axes', progress: 50, completed: false },
        ]
      },
      {
        id: 'coordinate-geometry',
        name: 'Coordinate Geometry',
        icon: Ruler,
        color: '#10B981',
        topics: [
          { id: 'cartesian-plane', name: 'Cartesian Plane', progress: 45, completed: false,
            subtopics: ['Coordinates', 'Terms', 'Plotting points'] },
        ]
      },
      {
        id: 'geometry',
        name: 'Geometry',
        icon: Ruler,
        color: '#10B981',
        topics: [
          { id: 'euclids-geometry', name: 'Introduction to Euclid\'s Geometry', progress: 40, completed: false },
          { id: 'lines-angles', name: 'Lines and Angles', progress: 35, completed: false },
          { id: 'triangles', name: 'Triangles', progress: 30, completed: false },
          { id: 'quadrilaterals', name: 'Quadrilaterals', progress: 25, completed: false },
          { id: 'circles', name: 'Circles', progress: 20, completed: false },
        ]
      },
      {
        id: 'mensuration',
        name: 'Mensuration',
        icon: Ruler,
        color: '#10B981',
        topics: [
          { id: 'areas', name: 'Areas', progress: 15, completed: false },
          { id: 'surface-volumes', name: 'Surface Areas and Volumes', progress: 10, completed: false },
        ]
      },
      {
        id: 'statistics',
        name: 'Statistics',
        icon: LineChart,
        color: '#10B981',
        topics: [
          { id: 'data-collection', name: 'Collection and Presentation of Data', progress: 5, completed: false },
          { id: 'graphical-representation', name: 'Graphical Representation', progress: 0, completed: false },
        ]
      }
    ]
  },
  { 
    id: 'science',
    name: 'Science', 
    icon: Microscope,
    color: '#F59E0B',
    themeColor: 'amber',
    progress: 70,
    natureElement: 'flower',
    description: 'Discover the natural world through observation and experimentation',
    position: { x: 25, y: 0, z: 0 },
    chapters: [
      {
        id: 'physics',
        name: 'Physics',
        icon: Flame,
        color: '#F59E0B',
        topics: [
          { id: 'motion', name: 'Motion', progress: 95, completed: true,
            subtopics: ['Distance', 'Displacement', 'Velocity', 'Acceleration'] },
          { id: 'force-laws', name: 'Force and Laws of Motion', progress: 90, completed: true,
            subtopics: ['Newton\'s Laws', 'Inertia', 'Mass', 'Momentum'] },
          { id: 'gravitation', name: 'Gravitation', progress: 85, completed: true,
            subtopics: ['Universal law', 'Acceleration due to gravity', 'Mass', 'Weight'] },
          { id: 'floatation', name: 'Floatation', progress: 80, completed: true,
            subtopics: ['Thrust', 'Pressure', 'Buoyancy', 'Archimedes\' Principle'] },
          { id: 'work-energy', name: 'Work, Energy, and Power', progress: 75, completed: false },
          { id: 'sound', name: 'Sound', progress: 70, completed: false },
        ]
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        icon: Atom,
        color: '#F59E0B',
        topics: [
          { id: 'matter-surroundings', name: 'Matter in Our Surroundings', progress: 65, completed: false },
          { id: 'matter-pure', name: 'Is Matter Around Us Pure?', progress: 60, completed: false },
          { id: 'atoms-molecules', name: 'Atoms and Molecules', progress: 55, completed: false },
          { id: 'atom-structure', name: 'Structure of the Atom', progress: 50, completed: false },
        ]
      },
      {
        id: 'biology',
        name: 'Biology',
        icon: Dna,
        color: '#F59E0B',
        topics: [
          { id: 'cell', name: 'Cell—The Fundamental Unit of Life', progress: 45, completed: false },
          { id: 'tissues', name: 'Tissues', progress: 40, completed: false },
          { id: 'health-diseases', name: 'Health and Diseases', progress: 35, completed: false },
          { id: 'food-resources', name: 'Improvement in Food Resources', progress: 30, completed: false },
        ]
      }
    ]
  },
  { 
    id: 'social',
    name: 'Social Science', 
    icon: Globe,
    color: '#EF4444',
    themeColor: 'red',
    progress: 60,
    natureElement: 'mountain',
    description: 'Understand human societies, history, and our relationship with the earth',
    position: { x: -25, y: 0, z: 0 },
    chapters: [
      {
        id: 'history',
        name: 'History',
        icon: Landmark,
        color: '#EF4444',
        topics: [
          { id: 'french-revolution', name: 'The French Revolution', progress: 95, completed: true },
          { id: 'socialism', name: 'Socialism in Europe and the Russian Revolution', progress: 90, completed: true },
          { id: 'nazism', name: 'Nazism and the Rise of Hitler', progress: 85, completed: true },
          { id: 'forest-society', name: 'Forest Society and Colonialism', progress: 80, completed: true },
          { id: 'pastoralists', name: 'Pastoralists in the Modern World', progress: 75, completed: false },
        ]
      },
      {
        id: 'geography',
        name: 'Geography',
        icon: Mountain,
        color: '#EF4444',
        topics: [
          { id: 'india-location', name: 'India—Size and Location', progress: 70, completed: false },
          { id: 'physical-features', name: 'Physical Features of India', progress: 65, completed: false },
          { id: 'drainage', name: 'Drainage', progress: 60, completed: false },
          { id: 'climate', name: 'Climate', progress: 55, completed: false },
          { id: 'vegetation-wildlife', name: 'Natural Vegetation and Wildlife', progress: 50, completed: false },
          { id: 'population', name: 'Population', progress: 45, completed: false },
        ]
      },
      {
        id: 'political-science',
        name: 'Political Science',
        icon: Users,
        color: '#EF4444',
        topics: [
          { id: 'democracy', name: 'What is Democracy? Why Democracy?', progress: 40, completed: false },
          { id: 'constitutional-design', name: 'Constitutional Design', progress: 35, completed: false },
          { id: 'electoral-politics', name: 'Electoral Politics', progress: 30, completed: false },
          { id: 'institutions', name: 'Working of Institutions', progress: 25, completed: false },
          { id: 'democratic-rights', name: 'Democratic Rights', progress: 20, completed: false },
        ]
      },
      {
        id: 'economics',
        name: 'Economics',
        icon: Coins,
        color: '#EF4444',
        topics: [
          { id: 'village-palampur', name: 'The Story of Village Palampur', progress: 15, completed: false },
          { id: 'people-resource', name: 'People as Resource', progress: 10, completed: false },
          { id: 'poverty', name: 'Poverty as a Challenge', progress: 5, completed: false },
          { id: 'food-security', name: 'Food Security in India', progress: 0, completed: false },
        ]
      }
    ]
  },
  { 
    id: 'english',
    name: 'English', 
    icon: BookOpen,
    color: '#8B5CF6',
    themeColor: 'violet',
    progress: 80,
    natureElement: 'tree',
    description: 'Master language skills through literature and creative expression',
    position: { x: 0, y: 25, z: 0 },
    chapters: [
      {
        id: 'reading',
        name: 'Reading',
        icon: BookText,
        color: '#8B5CF6',
        topics: [
          { id: 'unseen-passages', name: 'Unseen Passages', progress: 95, completed: true },
          { id: 'vocabulary', name: 'Vocabulary', progress: 90, completed: true },
        ]
      },
      {
        id: 'writing-grammar',
        name: 'Writing and Grammar',
        icon: Pen,
        color: '#8B5CF6',
        topics: [
          { id: 'writing-skills', name: 'Writing Skills', progress: 85, completed: true,
            subtopics: ['Descriptive paragraph writing', 'Creative writing'] },
          { id: 'grammar', name: 'Grammar', progress: 80, completed: true,
            subtopics: ['Tenses', 'Modals', 'Determiners', 'Subject-verb concord', 'Reported speech'] },
        ]
      },
      {
        id: 'literature',
        name: 'Literature',
        icon: BookCopy,
        color: '#8B5CF6',
        topics: [
          { id: 'beehive-prose', name: 'Beehive (Prose)', progress: 75, completed: false },
          { id: 'beehive-poetry', name: 'Beehive (Poetry)', progress: 70, completed: false },
          { id: 'moments', name: 'Moments (Supplementary Reader)', progress: 65, completed: false },
        ]
      }
    ]
  },
  { 
    id: 'hindi',
    name: 'Hindi', 
    icon: Languages,
    color: '#06B6D4',
    themeColor: 'cyan',
    progress: 70,
    natureElement: 'river',
    description: 'Explore the richness of Hindi language and literature',
    position: { x: -17.5, y: 17.5, z: 0 },
    chapters: [
      {
        id: 'grammar',
        name: 'Grammar',
        icon: PenTool,
        color: '#06B6D4',
        topics: [
          { id: 'prefixes-suffixes', name: 'उपसर्ग (Prefixes) and प्रत्यय (Suffixes)', progress: 95, completed: true },
          { id: 'compound-words', name: 'समास (Compound Words)', progress: 90, completed: true },
          { id: 'figures-of-speech', name: 'अलंकार (Figures of Speech)', progress: 85, completed: true },
        ]
      },
      {
        id: 'literature-a',
        name: 'Literature (Course A)',
        icon: Scroll,
        color: '#06B6D4',
        topics: [
          { id: 'kshitij-prose', name: 'Kshitij-1 (Prose)', progress: 80, completed: true },
          { id: 'kshitij-poetry', name: 'Kshitij-1 (Poetry)', progress: 75, completed: false },
          { id: 'kritika', name: 'Kritika-1', progress: 70, completed: false },
        ]
      },
      {
        id: 'literature-b',
        name: 'Literature (Course B)',
        icon: ScrollText,
        color: '#06B6D4',
        topics: [
          { id: 'sparsh-prose', name: 'Sparsh-1 (Prose)', progress: 65, completed: false },
          { id: 'sparsh-poetry', name: 'Sparsh-1 (Poetry)', progress: 60, completed: false },
          { id: 'sanchayan', name: 'Sanchayan-1', progress: 55, completed: false },
        ]
      }
    ]
  },
  { 
    id: 'sanskrit',
    name: 'Sanskrit', 
    icon: BookMarked,
    color: '#EC4899',
    themeColor: 'pink',
    progress: 55,
    natureElement: 'sun',
    description: 'Learn the ancient language of wisdom and knowledge',
    position: { x: 17.5, y: 17.5, z: 0 },
    chapters: [
      {
        id: 'reading-comprehension',
        name: 'Reading Comprehension',
        icon: BookText,
        color: '#EC4899',
        topics: [
          { id: 'unseen-passages-sanskrit', name: 'अपठित अवबोधनम् (Unseen Passages)', progress: 95, completed: true },
        ]
      },
      {
        id: 'writing-skills',
        name: 'Writing Skills',
        icon: FileText,
        color: '#EC4899',
        topics: [
          { id: 'letter-writing', name: 'पत्र लेखनम् (Letter Writing)', progress: 90, completed: true },
          { id: 'picture-description', name: 'चित्र वर्णनम् (Picture Description)', progress: 85, completed: true },
        ]
      },
      {
        id: 'applied-grammar',
        name: 'Applied Grammar',
        icon: PenTool,
        color: '#EC4899',
        topics: [
          { id: 'sandhi', name: 'सन्धिः (Sandhi)', progress: 80, completed: true },
          { id: 'word-forms', name: 'शब्द रूप (Word Forms)', progress: 75, completed: false },
          { id: 'verb-forms', name: 'धातु रूप (Verb Forms)', progress: 70, completed: false },
          { id: 'compound-words-sanskrit', name: 'समास (Compound Words)', progress: 65, completed: false },
          { id: 'cases', name: 'कारक और विभक्ति (Cases)', progress: 60, completed: false },
        ]
      },
      {
        id: 'literature-sanskrit',
        name: 'Literature',
        icon: Scroll,
        color: '#EC4899',
        topics: [
          { id: 'shemushi', name: 'Shemushi Prathamo Bhaga', progress: 55, completed: false,
            subtopics: [
              'Bharti Vasantgeetih', 'Swarnkak', 'Godohanam', 'Kalptaruh', 'Suktimouktikam',
              'Bhranto Baal', 'Pratyabhigyanam', 'Lauhtula', 'Siktasetuh', 'Jatayo Shaurayam',
              'Paryavarnam', 'Vangmanah Pranaswarupam'
            ] 
          },
        ]
      }
    ]
  }
];

// Helper function to get a subject by ID
export const getSubjectById = (id: string): Subject | undefined => {
  return curriculum.find(subject => subject.id === id);
};

// Helper function to get a chapter by ID within a subject
export const getChapterById = (subjectId: string, chapterId: string): Chapter | undefined => {
  const subject = getSubjectById(subjectId);
  return subject?.chapters.find(chapter => chapter.id === chapterId);
};

// Helper function to get a topic by ID within a subject and chapter
export const getTopicById = (subjectId: string, chapterId: string, topicId: string): Topic | undefined => {
  const chapter = getChapterById(subjectId, chapterId);
  return chapter?.topics.find(topic => topic.id === topicId);
};

export default curriculum;