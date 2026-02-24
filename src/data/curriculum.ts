import { 
  Calculator, 
  Microscope, 
  BookOpen, 
  Globe, 
  Languages, 
  Flame,
  Sigma
} from 'lucide-react';

export interface Subtopic {
  id: string;
  name: string;
  contentPath: string;
  progress?: number;
  completed?: boolean;
}

export interface Topic {
  id: string;
  name: string;
  progress: number;
  completed: boolean;
  description?: string;
  subtopics?: Subtopic[];
  icon?: any;
  color?: string;
  contentPath?: string;
  contentType?: 'html' | 'video' | 'url';
  pdfPath?: string;
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

export interface ClassContent {
  [key: string]: Subject[];
}

export const curriculum: ClassContent = {
  '9th': [
    {
      id: 'Science',
      name: 'Science',
      icon: Microscope,
      color: '#1E3A5F',
      themeColor: 'navy',
      progress: 0,
      natureElement: 'atom',
      description: 'Explore physics, chemistry, and biology through interactive simulations',
      position: { x: 25, y: 0, z: 0 },
      chapters: [
        {
          id: 'Physics',
          name: 'Physics',
          icon: Flame,
          color: '#1E3A5F',
          topics: [
            {
              id: 'Motion',
              name: 'Motion',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.1_motion.html',
              pdfPath: '/FinalContent/Class 9th/Science/Physics/Motion/Motion.pdf',
              subtopics: [
                {
                  id: 'motion-intro',
                  name: 'Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.1_motion.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'rate-of-motion',
                  name: 'Measuring the Rate of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.2_measuring-the-rate-of-motion.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'rate-of-change',
                  name: 'Rate of Change of Velocity',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.3_Rate-of-Change-of-Velocity.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'graphical-motion',
                  name: 'Graphical Representation of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.4_Graphical-representation-of-motion.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'equations-motion',
                  name: 'Equations of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.5_equations-of-motion.html',
                  progress: 0,
                  completed: false
                }
              ]
            }
          ]
        },
        {
          id: 'Biology',
          name: 'Biology',
          icon: Microscope,
          color: '#059669',
          topics: [
            {
              id: 'Fundamental-Unit-of-Life',
              name: 'Fundamental Unit of Life',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_discovery_interactive.html',
              pdfPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/The fundamental unit of life.pdf',
              subtopics: [
                {
                  id: 'cell-discovery',
                  name: 'Cell Discovery',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_discovery_interactive.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'cell-membrane',
                  name: 'Cell Membrane & Transport',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_membrane_transport.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'cell-wall',
                  name: 'Cell Wall & Plasmolysis',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_wall_plasmolysis.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'nucleus-genetics',
                  name: 'Nucleus & Genetics',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/nucleus_genetic_exhibit.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'energy-organelles',
                  name: 'Energy Organelles',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/energy_organelles_exhibit.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'organelle-systems',
                  name: 'Organelle Systems',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/organelle_systems_exhibit.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'cell-division',
                  name: 'Cell Division',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_division_exhibit.html',
                  progress: 0,
                  completed: false
                }
              ]
            }
          ]
        },
        {
          id: 'Chemistry',
          name: 'Chemistry',
          icon: Flame,
          color: '#0891B2',
          topics: [
            {
              id: 'Atoms-and-Molecules',
              name: 'Atoms and Molecules',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.2 What is an Atom.html',
              pdfPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/Atoms and Molecules.pdf',
              subtopics: [
                {
                  id: 'laws-chemical-combination',
                  name: 'Laws of Chemical Combination',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.1 Laws of Chemical Combination.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'law-constant-proportions',
                  name: 'Law of Constant Proportions',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.1.2 Law of Constant Proportions.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'what-is-atom',
                  name: 'What is an Atom?',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.2 What is an Atom.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'modern-symbols-atoms',
                  name: 'Modern Symbols of Atoms',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.2.1 Modern Symbols of Atoms.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'what-is-molecule',
                  name: 'What is a Molecule?',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.3 What is a Molecule.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'chemical-formulae',
                  name: 'Writing Chemical Formulae',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.4 Writing Chemical Formulae .html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'molecular-mass',
                  name: 'Molecular Mass',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.5 Molecular Mass .html',
                  progress: 0,
                  completed: false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'Mathematics',
      name: 'Mathematics',
      icon: Calculator,
      color: '#0891B2',
      themeColor: 'teal',
      progress: 0,
      natureElement: 'geometry',
      description: 'Master mathematical concepts through visual problem-solving',
      position: { x: -25, y: 0, z: 0 },
      chapters: [
        {
          id: 'Number-Systems',
          name: 'Number Systems',
          icon: Sigma,
          color: '#0891B2',
          topics: [
            {
              id: 'Number-Systems-Topic',
              name: 'Number Systems',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Mathematics/Number Systems/Number Systems.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Number Systems/Number System.pdf',
              subtopics: [
                {
                  id: 'number-systems-intro',
                  name: 'Number Systems',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Number Systems/Number Systems.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'irrational-numbers',
                  name: 'Irrational Numbers',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Number Systems/Irrational Numbers.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'decimal-expansions',
                  name: 'Decimal Expansions',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Number Systems/Decimal Expansions.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'real-numbers',
                  name: 'Real Numbers',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Number Systems/Real Numbers.html',
                  progress: 0,
                  completed: false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'English',
      name: 'English',
      icon: BookOpen,
      color: '#F97316',
      themeColor: 'yellow',
      progress: 0,
      natureElement: 'quill',
      description: 'Enhance language skills through literature and creative expression',
      position: { x: 0, y: 25, z: 0 },
      chapters: [
        {
          id: 'Beehive',
          name: 'Beehive — Prose',
          icon: BookOpen,
          color: '#F97316',
          topics: [
            {
              id: 'The-Fun-They-Had',
              name: 'The Fun They Had',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/English/Beehive \u2013 Main textbook (prose and poetry)/The Fun they Had/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Beehive \u2013 Main textbook (prose and poetry)/The Fun they Had/The fun they had.pdf',
              subtopics: []
            }
          ]
        }
      ]
    },
    {
      id: 'Hindi',
      name: 'Hindi',
      icon: Languages,
      color: '#059669',
      themeColor: 'pink',
      progress: 0,
      natureElement: 'script',
      description: 'Dive into Hindi literature, grammar, and creative writing',
      position: { x: 0, y: -25, z: 0 },
      chapters: [
        {
          id: 'Sparsh',
          name: 'स्पर्श (Sparsh)',
          icon: Languages,
          color: '#059669',
          topics: [
            {
              id: 'Dukh-Ka-Adhikar',
              name: 'दुःख का अधिकार',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Hindi/\u0938\u094d\u092a\u0930\u094d\u0936 \u092d\u093e\u0917 1/\u0926\u0941\u0903\u0916 \u0915\u093e \u0905\u0927\u093f\u0915\u093e\u0930/index.html',
              pdfPath: '/FinalContent/Class 9th/Hindi/\u0938\u094d\u092a\u0930\u094d\u0936 \u092d\u093e\u0917 1/\u0926\u0941\u0903\u0916 \u0915\u093e \u0905\u0927\u093f\u0915\u093e\u0930/dukh ka adhikar.pdf',
              subtopics: []
            }
          ]
        }
      ]
    },
    {
      id: 'Social-Science',
      name: 'Social Science',
      icon: Globe,
      color: '#F97316',
      themeColor: 'teal',
      progress: 0,
      natureElement: 'globe',
      description: 'Understand history, geography, and civics through interactive exploration',
      position: { x: -15, y: 15, z: 0 },
      chapters: [
        {
          id: 'Democratic-Politics',
          name: 'Democratic Politics',
          icon: Globe,
          color: '#F97316',
          topics: [
            {
              id: 'What-is-Democracy',
              name: 'What is Democracy? Why Democracy?',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/What is Democracy Why Democracy/index.html',
              pdfPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/What is Democracy Why Democracy/What is democracy why democracy.pdf',
              subtopics: []
            }
          ]
        }
      ]
    }
  ]
};

export const legacyCurriculum: Subject[] = curriculum['9th'];

export const getClassCurriculum = (classLevel: string): Subject[] => {
  return curriculum[classLevel] || curriculum['9th'];
};

export const getClassSubjectById = (classLevel: string, id: string): Subject | undefined => {
  const classCurriculum = getClassCurriculum(classLevel);
  return classCurriculum.find(s => s.id === id || s.id.toLowerCase() === id.toLowerCase());
};

export const getSubjectById = (id: string): Subject | undefined => {
  return legacyCurriculum.find(s => s.id === id || s.id.toLowerCase() === id.toLowerCase());
};

export const getChapterById = (subjectId: string, chapterId: string): Chapter | undefined => {
  const subject = getSubjectById(subjectId);
  return subject?.chapters.find(ch => ch.id === chapterId);
};

export const getTopicById = (subjectId: string, chapterId: string, topicId: string): Topic | undefined => {
  const chapter = getChapterById(subjectId, chapterId);
  return chapter?.topics.find(t => t.id === topicId);
};

export default curriculum;
