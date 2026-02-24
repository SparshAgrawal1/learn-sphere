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
      color: '#FF6B35',
      themeColor: 'orange',
      progress: 0,
      natureElement: 'atom',
      description: 'Explore physics, chemistry, and biology through interactive simulations',
      position: { x: 25, y: 0, z: 0 },
      chapters: [
        {
          id: 'Physics',
          name: 'Physics',
          icon: Flame,
          color: '#FF6B35',
          topics: [
            {
              id: 'Gravitation',
              name: 'Gravitation',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.1_Gravitation.html',
              pdfPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/Gravitation.pdf',
              subtopics: [
                {
                  id: 'gravitation-intro',
                  name: 'Gravitation',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.1_Gravitation.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'free-fall',
                  name: 'Free Fall',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.2_freefall.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'mass-weight',
                  name: 'Mass and Weight',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.3_Mass_9.4_Weight.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'thrust-pressure',
                  name: 'Thrust and Pressure',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.5_Thrust_and_Pressure.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'archimedes-principle',
                  name: "Archimedes' Principle",
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.6_Archimedes_Principle.html',
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
          color: '#0D9B96',
          topics: [
            {
              id: 'Tissues',
              name: 'Tissues',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/plant_tissues_exhibit.html',
              pdfPath: '/FinalContent/Class 9th/Science/Biology/Tissues/Tissues.pdf',
              subtopics: [
                {
                  id: 'plant-tissues',
                  name: 'Plant Tissues',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/plant_tissues_exhibit.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'simple-permanent-tissues',
                  name: 'Simple Permanent Tissues',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/simple_permanent_tissues.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'complex-tissues',
                  name: 'Complex Tissues',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/complex_tissues_protection.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'epithelial-connective',
                  name: 'Epithelial & Connective Tissues',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/epithelial_connective_tissues.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'muscular-tissues',
                  name: 'Muscular Tissues',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/muscular_tissues_interactive.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'nervous-tissue',
                  name: 'Nervous Tissue',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/nervous_tissue_interactive.html',
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
          color: '#F9C326',
          topics: [
            {
              id: 'Matter-In-Our-Surroundings',
              name: 'Matter In Our Surroundings',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/1_Physical Nature of Matter.html',
              pdfPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/Matter in our Surroundings.pdf',
              subtopics: [
                {
                  id: 'physical-nature',
                  name: 'Physical Nature of Matter',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/1_Physical Nature of Matter.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'characteristics-particles',
                  name: 'Characteristics of Particles of Matter',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/2_Characteristics of Particles of Matter.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'states-of-matter',
                  name: 'States of Matter',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/3_states_of_matter_fixed (1).html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'matter-change-state',
                  name: 'Can Matter Change its State?',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/4_Can Matter Change its State_.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'evaporation',
                  name: 'Evaporation',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/5_evaporation.html',
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
      color: '#0D9B96',
      themeColor: 'teal',
      progress: 0,
      natureElement: 'geometry',
      description: 'Master mathematical concepts through visual problem-solving',
      position: { x: -25, y: 0, z: 0 },
      chapters: [
        {
          id: 'Polynomials',
          name: 'Polynomials',
          icon: Sigma,
          color: '#0D9B96',
          topics: [
            {
              id: 'Polynomials-Topic',
              name: 'Polynomials',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Polynomials.html',
              pdfPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Polynomials.pdf',
              subtopics: [
                {
                  id: 'polynomials-intro',
                  name: 'Polynomials',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Polynomials.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'polynomial-types',
                  name: 'Types of Polynomials',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Polynomial Types.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'zeros-polynomials',
                  name: 'Zeros of Polynomials',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Zeros of Polynomials.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'factorization',
                  name: 'Factorization of Polynomials',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Factorization of Polynomials.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'algebraic-identities',
                  name: 'Algebraic Identities',
                  contentPath: '/FinalContent/Class 9th/Mathematics/Polynomials/Algebraic Identities.html',
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
      color: '#F9C326',
      themeColor: 'yellow',
      progress: 0,
      natureElement: 'quill',
      description: 'Enhance language skills through literature and creative expression',
      position: { x: 0, y: 25, z: 0 },
      chapters: [
        {
          id: 'Moments',
          name: 'Moments — Short Stories',
          icon: BookOpen,
          color: '#F9C326',
          topics: [
            {
              id: 'The-Happy-Prince',
              name: 'The Happy Prince',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/English/Moments \u2013 Supplementary reader (short stories)/The Happy Prince/index.html',
              pdfPath: '/FinalContent/Class 9th/English/Moments \u2013 Supplementary reader (short stories)/The Happy Prince/The Happy Prince.pdf',
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
      color: '#EC4899',
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
          color: '#EC4899',
          topics: [
            {
              id: 'Agni-Path',
              name: 'अग्नि पथ',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Hindi/\u0938\u094d\u092a\u0930\u094d\u0936 \u092d\u093e\u0917 1/\u0905\u0917\u094d\u0928\u093f \u092a\u0925/index.html',
              pdfPath: '/FinalContent/Class 9th/Hindi/\u0938\u094d\u092a\u0930\u094d\u0936 \u092d\u093e\u0917 1/\u0905\u0917\u094d\u0928\u093f \u092a\u0925/agni path.pdf',
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
      color: '#14C4BE',
      themeColor: 'teal',
      progress: 0,
      natureElement: 'globe',
      description: 'Understand history, geography, and civics through interactive exploration',
      position: { x: -15, y: 15, z: 0 },
      chapters: [
        {
          id: 'Economics',
          name: 'Economics',
          icon: Globe,
          color: '#14C4BE',
          topics: [
            {
              id: 'Food-Security-in-India',
              name: 'Food Security in India',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Social Science/Economics/Food Security in India/index.html',
              pdfPath: '/FinalContent/Class 9th/Social Science/Economics/Food Security in India/Food Security in India.pdf',
              subtopics: []
            }
          ]
        },
        {
          id: 'Democratic-Politics',
          name: 'Democratic Politics',
          icon: Globe,
          color: '#FF6B35',
          topics: [
            {
              id: 'Electoral-Politics',
              name: 'Electoral Politics',
              progress: 0,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Electoral Politics/index.html',
              pdfPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Electoral Politics/Electoral Politics.pdf',
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
