// Comprehensive curriculum data structure based on FinalContent folder
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
// Define the comprehensive curriculum based on FinalContent structure
export const curriculum: ClassContent = {
  '9th': [
    {
      id: 'Science',
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
          id: 'Physics',
        name: 'Physics',
        icon: Flame,
        color: '#F59E0B',
        topics: [
            {
              id: 'Motion',
              name: 'Motion',
              progress: 95,
              completed: true,
              contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/index.html',
              subtopics: [
                {
                  id: '7.1_motion',
                  name: 'Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.1_motion.html',
                  progress: 100,
                  completed: true
                },
                {
                  id: '7.2_measuring-the-rate-of-motion',
                  name: 'Measuring the Rate of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.2_measuring-the-rate-of-motion.html',
                  progress: 95,
                  completed: true
                },
                {
                  id: '7.3_Rate-of-Change-of-Velocity',
                  name: 'Rate of Change of Velocity',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.3_Rate-of-Change-of-Velocity.html',
                  progress: 90,
                  completed: true
                },
                {
                  id: '7.4_Graphical-representation-of-motion',
                  name: 'Graphical Representation of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.4_Graphical-representation-of-motion.html',
                  progress: 85,
                  completed: true
                },
                {
                  id: '7.5_equations-of-motion',
                  name: 'Equations of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/7.5_equations-of-motion.html',
                  progress: 80,
                  completed: true
                },
                {
                  id: 'uniform-circular-motion-interactive',
                  name: 'Uniform Circular Motion (Interactive)',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Motion/uniform-circular-motion-interactive(need-changes).html',
                  progress: 75,
                  completed: false
                }
              ]
            },
            {
              id: 'Force and Laws of Motion',
              name: 'Force and Laws of Motion',
              progress: 90,
              completed: true,
              contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/index.html',
              subtopics: [
                {
                  id: '8.1_balanced_and_unbalanced_forces',
                  name: 'Balanced and Unbalanced Forces',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/8.1_balanced_and_unbalanced_forces.html',
                  progress: 95,
                  completed: true
                },
                {
                  id: '8.2_First_law_of_motion',
                  name: 'First Law of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/8.2_First_law_of_motion.html',
                  progress: 90,
                  completed: true
                },
                {
                  id: '8.3_inertia_and_mass',
                  name: 'Inertia and Mass',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/8.3_inertia_and_mass.html',
                  progress: 85,
                  completed: true
                },
                {
                  id: '8.4_second_law_of_motion',
                  name: 'Second Law of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/8.4_second_law_of_motion.html',
                  progress: 80,
                  completed: true
                },
                {
                  id: '8.4.1_derivation_2nd_law_of_motion',
                  name: 'Derivation of Second Law of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/8.4.1_derivation_2nd_law_of_motion.html',
                  progress: 75,
                  completed: false
                },
                {
                  id: '8.5_third_law_of_motion',
                  name: 'Third Law of Motion',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Force and Laws of Motion/8.5_third_law_of_motion.html',
                  progress: 70,
                  completed: false
                }
              ]
            },
            {
              id: 'Gravitation',
              name: 'Gravitation',
              progress: 85,
              completed: true,
              contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/index.html',
              subtopics: [
                {
                  id: '9.1_Gravitation',
                  name: 'Gravitation',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.1_Gravitation.html',
                  progress: 90,
                  completed: true
                },
                {
                  id: '9.2_freefall',
                  name: 'Free Fall',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.2_freefall.html',
                  progress: 85,
                  completed: true
                },
                {
                  id: '9.3_Mass_9.4_Weight',
                  name: 'Mass and Weight',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.3_Mass_9.4_Weight.html',
                  progress: 80,
                  completed: true
                },
                {
                  id: '9.5_Thrust_and_Pressure',
                  name: 'Thrust and Pressure',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.5_Thrust_and_Pressure.html',
                  progress: 75,
                  completed: false
                },
                {
                  id: '9.6_Archimedes_Principle',
                  name: 'Archimedes Principle',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Gravitation/9.6_Archimedes_Principle.html',
                  progress: 70,
                  completed: false
                }
              ]
            },
            {
              id: 'Work and Energy',
              name: 'Work and Energy',
              progress: 75,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Physics/Work and Energy/index.html',
              subtopics: [
                {
                  id: '10.1_work',
                  name: 'Work',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Work and Energy/10.1_work.html',
                  progress: 80,
                  completed: true
                },
                {
                  id: '10.2_energy',
                  name: 'Energy',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Work and Energy/10.2_energy.html',
                  progress: 75,
                  completed: false
                },
                {
                  id: '10.3_Rate_of_Doing_Work',
                  name: 'Rate of Doing Work',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Work and Energy/10.3_Rate_of_Doing_Work.html',
                  progress: 70,
                  completed: false
      }
    ]
  },
  { 
              id: 'Sound',
              name: 'Sound',
    progress: 70,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Physics/Sound/index.html',
              subtopics: [
                {
                  id: '11.1_Production_of_Sound',
                  name: 'Production of Sound',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Sound/11.1_Production_of_Sound.html',
                  progress: 75,
                  completed: false
                },
                {
                  id: '11.2_PROPOGATION_OF_SOUND',
                  name: 'Propagation of Sound',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Sound/11.2_PROPOGATION_OF_SOUND.html',
                  progress: 70,
                  completed: false
                },
                {
                  id: '11.3_Reflection_of_SOUND',
                  name: 'Reflection of Sound',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Sound/11.3_Reflection_of_SOUND.html',
                  progress: 65,
                  completed: false
                },
                {
                  id: '11.4_Range_of_Hearing',
                  name: 'Range of Hearing',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Sound/11.4_Range_of_Hearing.html',
                  progress: 60,
                  completed: false
                },
                {
                  id: '11.5_Applications_of_UltraSound',
                  name: 'Applications of Ultrasound',
                  contentPath: '/FinalContent/Class 9th/Science/Physics/Sound/11.5_Applications_of_UltraSound.html',
                  progress: 55,
                  completed: false
                }
              ]
            }
          ]
        },
        {
          id: 'Chemistry',
        name: 'Chemistry',
        icon: Atom,
        color: '#F59E0B',
        topics: [
            {
              id: 'Matter In Our Surroundings',
              name: 'Matter In Our Surroundings',
              progress: 65,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/index.html',
              subtopics: [
                {
                  id: '1_Physical_Nature_of_Matter',
                  name: 'Physical Nature of Matter',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/1_Physical Nature of Matter.html',
                  progress: 70,
                  completed: false
                },
                {
                  id: '2_Characteristics_of_Particles_of_Matter',
                  name: 'Characteristics of Particles of Matter',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/2_Characteristics of Particles of Matter.html',
                  progress: 65,
                  completed: false
                },
                {
                  id: '3_states_of_matter_fixed',
                  name: 'States of Matter',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/3_states_of_matter_fixed (1).html',
                  progress: 60,
                  completed: false
                },
                {
                  id: '4_Can_Matter_Change_its_State',
                  name: 'Can Matter Change its State?',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/4_Can Matter Change its State_.html',
                  progress: 55,
                  completed: false
                },
                {
                  id: '5_evaporation',
                  name: 'Evaporation',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Matter In Our Surroundings/5_evaporation.html',
                  progress: 50,
                  completed: false
                }
              ]
            },
            {
              id: 'IS MATTER AROUND US PURE_',
              name: 'Is Matter Around Us Pure?',
              progress: 60,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Chemistry/IS MATTER AROUND US PURE_/index.html',
              subtopics: [
                {
                  id: 'mixtures-interactive',
                  name: 'Mixtures (Interactive)',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/IS MATTER AROUND US PURE_/mixtures-interactive (3).html',
                  progress: 60,
                  completed: false
      }
    ]
  },
  { 
              id: 'ATOMS AND MOLECULES',
              name: 'Atoms and Molecules',
              progress: 55,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/index.html',
              subtopics: [
                {
                  id: '3.1_Laws_of_Chemical_Combination',
                  name: 'Laws of Chemical Combination',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.1 Laws of Chemical Combination.html',
    progress: 60,
                  completed: false
                },
                {
                  id: '3.1.2_Law_of_Constant_Proportions',
                  name: 'Law of Constant Proportions',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.1.2 Law of Constant Proportions.html',
                  progress: 55,
                  completed: false
                },
                {
                  id: '3.2_What_is_an_Atom',
                  name: 'What is an Atom',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.2 What is an Atom.html',
                  progress: 50,
                  completed: false
                },
                {
                  id: '3.2.1_Modern_Symbols_of_Atoms',
                  name: 'Modern Symbols of Atoms',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.2.1 Modern Symbols of Atoms.html',
                  progress: 45,
                  completed: false
                },
                {
                  id: '3.3_What_is_a_Molecule',
                  name: 'What is a Molecule',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.3 What is a Molecule.html',
                  progress: 40,
                  completed: false
                },
                {
                  id: '3.4_Writing_Chemical_Formulae',
                  name: 'Writing Chemical Formulae',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.4 Writing Chemical Formulae .html',
                  progress: 35,
                  completed: false
                },
                {
                  id: '3.5_Molecular_Mass',
                  name: 'Molecular Mass',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/ATOMS AND MOLECULES/3.5 Molecular Mass .html',
                  progress: 30,
                  completed: false
                }
              ]
            },
            {
              id: 'Structure of an atom',
              name: 'Structure of the Atom',
              progress: 50,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/index.html',
              subtopics: [
                {
                  id: '4.1_charged_particles',
                  name: 'Charged Particles',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/4.1_charged_particles.html',
                  progress: 55,
                  completed: false
                },
                {
                  id: '4.2_atomic_models',
                  name: 'Atomic Models',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/4.2_atomic_models.html',
                  progress: 50,
                  completed: false
                },
                {
                  id: '4.3_electron_distribution',
                  name: 'Electron Distribution',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/4.3_electron_distribution.html',
                  progress: 45,
                  completed: false
                },
                {
                  id: '4.4_valency',
                  name: 'Valency',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/4.4_valency.html',
                  progress: 40,
                  completed: false
                },
                {
                  id: '4.5_atomic_number_mass',
                  name: 'Atomic Number and Mass',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/4.5_atomic_number_mass.html',
                  progress: 35,
                  completed: false
                },
                {
                  id: '4.6_isotopes_isobars',
                  name: 'Isotopes and Isobars',
                  contentPath: '/FinalContent/Class 9th/Science/Chemistry/Structure of an atom/4.6_isotopes_isobars.html',
                  progress: 30,
                  completed: false
                }
              ]
            }
          ]
        },
        {
          id: 'Biology',
        name: 'Biology',
        icon: Dna,
        color: '#F59E0B',
        topics: [
            {
              id: 'Fundamental Unit of Life',
              name: 'Cell—The Fundamental Unit of Life',
              progress: 45,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/index.html',
              subtopics: [
                {
                  id: 'cell_discovery_interactive',
                  name: 'Cell Discovery (Interactive)',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_discovery_interactive.html',
                  progress: 50,
                  completed: false
                },
                {
                  id: 'cell_division_exhibit',
                  name: 'Cell Division Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_division_exhibit.html',
                  progress: 45,
                  completed: false
                },
                {
                  id: 'cell_membrane_transport',
                  name: 'Cell Membrane Transport',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_membrane_transport.html',
                  progress: 40,
                  completed: false
                },
                {
                  id: 'cell_wall_plasmolysis',
                  name: 'Cell Wall and Plasmolysis',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/cell_wall_plasmolysis.html',
                  progress: 35,
                  completed: false
                },
                {
                  id: 'energy_organelles_exhibit',
                  name: 'Energy Organelles Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/energy_organelles_exhibit.html',
                  progress: 30,
                  completed: false
                },
                {
                  id: 'nucleus_genetic_exhibit',
                  name: 'Nucleus and Genetic Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/nucleus_genetic_exhibit.html',
                  progress: 25,
                  completed: false
                },
                {
                  id: 'organelle_systems_exhibit',
                  name: 'Organelle Systems Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Fundamental Unit of Life/organelle_systems_exhibit.html',
                  progress: 20,
                  completed: false
                }
              ]
            },
            {
              id: 'Tissues',
              name: 'Tissues',
              progress: 40,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/index.html',
              subtopics: [
                {
                  id: 'complex_tissues_protection',
                  name: 'Complex Tissues Protection',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/complex_tissues_protection.html',
                  progress: 45,
                  completed: false
                },
                {
                  id: 'epithelial_connective_tissues',
                  name: 'Epithelial and Connective Tissues',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/epithelial_connective_tissues.html',
                  progress: 40,
                  completed: false
                },
                {
                  id: 'muscular_tissues_interactive',
                  name: 'Muscular Tissues (Interactive)',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/muscular_tissues_interactive.html',
                  progress: 35,
                  completed: false
                },
                {
                  id: 'nervous_tissue_interactive',
                  name: 'Nervous Tissue (Interactive)',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/nervous_tissue_interactive.html',
                  progress: 30,
                  completed: false
                },
                {
                  id: 'plant_tissues_exhibit',
                  name: 'Plant Tissues Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/plant_tissues_exhibit.html',
                  progress: 25,
                  completed: false
                },
                {
                  id: 'simple_permanent_tissues',
                  name: 'Simple Permanent Tissues',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Tissues/simple_permanent_tissues.html',
                  progress: 20,
                  completed: false
                }
              ]
            },
            {
              id: 'Improvement in Food Resources',
              name: 'Improvement in Food Resources',
              progress: 30,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/index.html',
              subtopics: [
                {
                  id: 'animal_husbandry_exhibit',
                  name: 'Animal Husbandry Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/animal_husbandry_exhibit.html',
                  progress: 35,
                  completed: false
                },
                {
                  id: 'crop_breeding_exhibit',
                  name: 'Crop Breeding Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/crop_breeding_exhibit.html',
                  progress: 30,
                  completed: false
                },
                {
                  id: 'fisheries_beekeeping_exhibit',
                  name: 'Fisheries and Beekeeping Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/fisheries_beekeeping_exhibit.html',
                  progress: 25,
                  completed: false
                },
                {
                  id: 'food_security_exhibit',
                  name: 'Food Security Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/food_security_exhibit.html',
                  progress: 20,
                  completed: false
                },
                {
                  id: 'irrigation_protection_exhibit',
                  name: 'Irrigation and Protection Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/irrigation_protection_exhibit.html',
                  progress: 15,
                  completed: false
                },
                {
                  id: 'nutrient_soil_exhibit',
                  name: 'Nutrient and Soil Exhibit',
                  contentPath: '/FinalContent/Class 9th/Science/Biology/Improvement in Food Resources/nutrient_soil_exhibit.html',
                  progress: 10,
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
    color: '#8B5CF6',
    themeColor: 'violet',
    progress: 80,
    natureElement: 'tree',
    description: 'Master language skills through literature and creative expression',
    position: { x: 0, y: 25, z: 0 },
    chapters: [
      {
          id: 'Beehive – Main textbook (prose and poetry)',
          name: 'Beehive – Main textbook (prose and poetry)',
        icon: BookText,
        color: '#8B5CF6',
        topics: [
            {
              id: 'The Fun they Had',
              name: 'The Fun they Had',
              progress: 95,
              completed: true,
              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/The Fun they Had/index.html'
            },
            {
              id: 'The Sound of Music',
              name: 'The Sound of Music',
              progress: 90,
              completed: true,
              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/The Sound of Music/index.html'
            },
            {
              id: 'The little girl',
              name: 'The Little Girl',
              progress: 85,
              completed: true,
              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/The little girl/index.html'
            },
            {
              id: 'A Truly Beautiful mind',
              name: 'A Truly Beautiful Mind',
              progress: 80,
              completed: true,
              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/A Truly Beautiful mind/index.html'
            },
            {
              id: 'The Snake and the Mirror',
              name: 'The Snake and the Mirror',
              progress: 75,
              completed: false,
              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/The Snake and the Mirror/index.html'
            },
            {
              id: 'My Childhood',
              name: 'My Childhood',
              progress: 70,
              completed: false,
              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/My Childhood/my-childhood-lesson/index.html'
            },
            {
              id: 'Reach for the Top',
              name: 'Reach for the Top',
              progress: 65,
              completed: false,
              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/Reach for the Top/index.html'
            },
            {
              id: 'Kathmandu',
              name: 'Kathmandu',
              progress: 60,
              completed: false,
              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/Kathmandu/index.html'
            },
            {
              id: 'If I were you',
              name: 'If I Were You',
              progress: 55,
              completed: false,
              contentPath: '/FinalContent/Class 9th/English/Beehive – Main textbook (prose and poetry)/If I were you/index.html'
            }
          ]
        },
        {
          id: 'Moments – Supplementary reader (short stories)',
          name: 'Moments – Supplementary reader (short stories)',
        icon: BookCopy,
        color: '#8B5CF6',
          topics: []
        }
      ]
    },
    {
      id: 'Social Science',
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
          id: 'Democratic Politics',
          name: 'Democratic Politics',
          icon: Users,
          color: '#EF4444',
        topics: [
            {
              id: 'What is Democracy Why Democracy',
              name: 'What is Democracy? Why Democracy?',
              progress: 40,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/What is Democracy Why Democracy/index.html'
            },
            {
              id: 'Constitutional Design',
              name: 'Constitutional Design',
              progress: 35,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Constitutional Design/index.html'
            },
            {
              id: 'Electoral Politics',
              name: 'Electoral Politics',
              progress: 30,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Electoral Politics/index.html'
            },
            {
              id: 'Working of Institutions',
              name: 'Working of Institutions',
              progress: 25,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Working of Institutions/index.html'
            },
            {
              id: 'Demoratic Rights',
              name: 'Democratic Rights',
              progress: 20,
              completed: false,
              contentPath: '/FinalContent/Class 9th/Social Science/Democratic Politics/Demoratic Rights/index.html'
            }
          ]
        },
        {
          id: 'Economics',
          name: 'Economics',
          icon: Coins,
          color: '#EF4444',
          topics: []
        },
        {
          id: 'History',
        name: 'History',
        icon: Landmark,
        color: '#EF4444',
          topics: []
      }
    ]
  },
  { 
      id: 'Hindi',
    name: 'Hindi', 
    icon: Languages,
    color: '#06B6D4',
    themeColor: 'cyan',
    progress: 70,
    natureElement: 'river',
    description: 'Explore the richness of Hindi language and literature',
    position: { x: -17.5, y: 17.5, z: 0 },
      chapters: []
    },
    {
      id: 'Mathematics',
      name: 'Mathematics',
      icon: Calculator,
      color: '#10B981',
      themeColor: 'emerald',
      progress: 75,
      natureElement: 'leaf',
      description: 'Explore the world of numbers, patterns, and problem-solving',
      position: { x: 0, y: -25, z: 0 },
      chapters: []
    }
  ],
  '10th': [
    {
      id: 'Science',
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
          id: 'Physics',
          name: 'Physics',
          icon: Flame,
          color: '#F59E0B',
        topics: [
            {
              id: 'Light Refraction',
              name: 'Light - Reflection and Refraction',
              progress: 95,
              completed: true,
              contentPath: '/FinalContent/Class 10th/Science/Physics/Light Refraction/index.html',
              subtopics: [
                {
                  id: '1_reflection-of-light',
                  name: 'Reflection of Light',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Light Refraction/1_reflection-of-light.html',
                  progress: 100,
                  completed: true
                },
                {
                  id: '2_spherical-mirrors',
                  name: 'Spherical Mirrors',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Light Refraction/2 - spherical-mirrors.html',
                  progress: 95,
                  completed: true
                },
                {
                  id: '3_Refraction_glass_slab',
                  name: 'Refraction through Glass Slab',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Light Refraction/3_Refraction_glass_slab.html',
                  progress: 90,
                  completed: true
                },
                {
                  id: '4_Refraction',
                  name: 'Refraction',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Light Refraction/4 - ( 9.3.2 - 3) Refraction.html',
                  progress: 85,
                  completed: true
                }
              ]
            },
            {
              id: 'Human Eye and the Colourful World',
              name: 'Human Eye and the Colourful World',
              progress: 90,
              completed: true,
              contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/index.html',
              subtopics: [
                {
                  id: '1_The_Human_Eye',
                  name: 'The Human Eye',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/1_The Human Eye.html',
                  progress: 95,
                  completed: true
                },
                {
                  id: '2_DEFECTS_OF_VISION_AND_THEIR_CORRECTION',
                  name: 'Defects of Vision and Their Correction',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/2_DEFECTS OF VISION AND THEIR CORRECTION.html',
                  progress: 90,
                  completed: true
                },
                {
                  id: '3_REFRACTION_OF_LIGHT_THROUGH_A_PRISM',
                  name: 'Refraction of Light Through a Prism',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/3_REFRACTION OF LIGHT THROUGH A PRISM.html',
                  progress: 85,
                  completed: true
                },
                {
                  id: '4_DISPERSION_OF_WHITE_LIGHT_BY_A_GLASS_PRISM',
                  name: 'Dispersion of White Light by a Glass Prism',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/4_DISPERSION OF WHITE LIGHT BY A GLASS PRISM ASS PRISMASS PRISM.html',
                  progress: 80,
                  completed: true
                },
                {
                  id: '5_atmospheric_refraction',
                  name: 'Atmospheric Refraction',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/5_atmospheric_refraction.html',
                  progress: 75,
                  completed: false
                },
                {
                  id: '6_scattering_light',
                  name: 'Scattering of Light',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Human Eye and the Colourful World/6_scattering_light.html',
                  progress: 70,
                  completed: false
                }
              ]
            },
            {
              id: 'Electricity',
              name: 'Electricity',
              progress: 85,
              completed: true,
              contentPath: '/FinalContent/Class 10th/Science/Physics/Electricity/index.html',
              subtopics: [
                {
                  id: 'Electricity_Part_1_latest',
                  name: 'Electricity Part 1',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Electricity/Electricity Part 1_latest.html',
                  progress: 90,
                  completed: true
                },
                {
                  id: 'Electricity_Part2_latest',
                  name: 'Electricity Part 2',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Electricity/Electricity Part2_latest.html',
                  progress: 85,
                  completed: true
                },
                {
                  id: 'Electricity_Part3_latest',
                  name: 'Electricity Part 3',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Electricity/Electricity Part3_latest.html',
                  progress: 80,
                  completed: true
                },
                {
                  id: 'Electricity_Part4_latest',
                  name: 'Electricity Part 4',
                  contentPath: '/FinalContent/Class 10th/Science/Physics/Electricity/Electricity Part4_latest.html',
                  progress: 75,
                  completed: false
                }
              ]
            },
            {
              id: 'Magnetic Effects of Electric Current',
              name: 'Magnetic Effects of Electric Current',
              progress: 80,
              completed: true,
              contentPath: '/FinalContent/Class 10th/Science/Physics/Magnetic Effects of Electric Current/index.html'
            }
          ]
        },
        {
          id: 'Chemistry',
          name: 'Chemistry',
          icon: Atom,
          color: '#F59E0B',
        topics: [
            {
              id: 'Carbon and its Compound',
              name: 'Carbon and its Compounds',
              progress: 75,
              completed: false,
              contentPath: '/FinalContent/Class 10th/Science/Chemistry/Carbon and its Compound/index.html',
              subtopics: [
                {
                  id: 'Versatile_nature_of_Carbon',
                  name: 'Versatile Nature of Carbon',
                  contentPath: '/FinalContent/Class 10th/Science/Chemistry/Carbon and its Compound/Versatile_nature_of_Carbon.html',
                  progress: 80,
                  completed: true
                },
                {
                  id: 'Covalent_bond_and_carbon',
                  name: 'Covalent Bond and Carbon',
                  contentPath: '/FinalContent/Class 10th/Science/Chemistry/Carbon and its Compound/Covalent_bond_and_carbon.html',
                  progress: 75,
                  completed: false
                },
                {
                  id: 'Important_carbon_compund',
                  name: 'Important Carbon Compounds',
                  contentPath: '/FinalContent/Class 10th/Science/Chemistry/Carbon and its Compound/Important_carbon_compund.html',
                  progress: 70,
                  completed: false
                },
                {
                  id: 'Chemical_properties_of_carbon_compunds',
                  name: 'Chemical Properties of Carbon Compounds',
                  contentPath: '/FinalContent/Class 10th/Science/Chemistry/Carbon and its Compound/Chemical_properties_of_carbon_compunds.html',
                  progress: 65,
                  completed: false
                }
              ]
            },
            {
              id: 'Metal and Non-metals',
              name: 'Metals and Non-metals',
              progress: 70,
              completed: false,
              contentPath: '/FinalContent/Class 10th/Science/Chemistry/Metal and Non-metals/index.html'
            }
          ]
        },
        {
          id: 'Biology',
          name: 'Biology',
          icon: Dna,
          color: '#F59E0B',
        topics: [
            {
              id: 'Life Processes',
              name: 'Life Processes',
              progress: 65,
              completed: false,
              contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/index.html',
              subtopics: [
                {
                  id: 'life_processes_exhibit',
                  name: 'Life Processes Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/life_processes_exhibit.html',
                  progress: 70,
                  completed: false
                },
                {
                  id: 'heterotrophic_nutrition_exhibit',
                  name: 'Heterotrophic Nutrition Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/heterotrophic_nutrition_exhibit.html',
                  progress: 65,
                  completed: false
                },
                {
                  id: 'human_digestive_system_exhibit',
                  name: 'Human Digestive System Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/human_digestive_system_exhibit.html',
                  progress: 60,
                  completed: false
                },
                {
                  id: 'human_digestion_process_exhibit',
                  name: 'Human Digestion Process Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/human_digestion_process_exhibit.html',
                  progress: 55,
                  completed: false
                },
                {
                  id: 'photosynthesis_exhibit',
                  name: 'Photosynthesis Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/photosynthesis_exhibit.html',
                  progress: 50,
                  completed: false
                },
                {
                  id: 'photosynthesis_experiments_exhibit',
                  name: 'Photosynthesis Experiments Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/photosynthesis_experiments_exhibit.html',
                  progress: 45,
                  completed: false
                },
                {
                  id: 'plant_transport_exhibit',
                  name: 'Plant Transport Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/plant_transport_exhibit.html',
                  progress: 40,
                  completed: false
                },
                {
                  id: 'transpiration_translocation_exhibit',
                  name: 'Transpiration and Translocation Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/transpiration_translocation_exhibit.html',
                  progress: 35,
                  completed: false
                },
                {
                  id: 'human_respiratory_system_exhibit',
                  name: 'Human Respiratory System Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/human_respiratory_system_exhibit.html',
                  progress: 30,
                  completed: false
                },
                {
                  id: 'cellular_respiration_exhibit',
                  name: 'Cellular Respiration Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/cellular_respiration_exhibit (1).html',
                  progress: 25,
                  completed: false
                },
                {
                  id: 'respiratory_pathways_exhibit',
                  name: 'Respiratory Pathways Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/respiratory_pathways_exhibit.html',
                  progress: 20,
                  completed: false
                },
                {
                  id: 'gas_transport_exhibit',
                  name: 'Gas Transport Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/gas_transport_exhibit.html',
                  progress: 15,
                  completed: false
                },
                {
                  id: 'circulatory_system_exhibit',
                  name: 'Circulatory System Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/circulatory_system_exhibit (1).html',
                  progress: 10,
                  completed: false
                },
                {
                  id: 'blood_vessels_exhibit',
                  name: 'Blood Vessels Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/blood_vessels_exhibit.html',
                  progress: 5,
                  completed: false
                },
                {
                  id: 'excretory_system_exhibit',
                  name: 'Excretory System Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/excretory_system_exhibit.html',
                  progress: 0,
                  completed: false
                },
                {
                  id: 'excretion_regulation_exhibit',
                  name: 'Excretion and Regulation Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Life Processes/excretion_regulation_exhibit.html',
                  progress: 0,
                  completed: false
                }
              ]
            },
            {
              id: 'Control and Coordination',
              name: 'Control and Coordination',
              progress: 60,
              completed: false,
              contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/index.html',
              subtopics: [
                {
                  id: 'control_coordination_exhibit',
                  name: 'Control and Coordination Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/control_coordination_exhibit.html',
                  progress: 65,
                  completed: false
                },
                {
                  id: 'human_brain_structure_exhibit',
                  name: 'Human Brain Structure Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/human_brain_structure_exhibit.html',
                  progress: 60,
                  completed: false
                },
                {
                  id: 'neuron_structure_function_exhibit',
                  name: 'Neuron Structure and Function Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/neuron_structure_function_exhibit.html',
                  progress: 55,
                  completed: false
                },
                {
                  id: 'nervous_tissue_protection_exhibit',
                  name: 'Nervous Tissue Protection Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/nervous_tissue_protection_exhibit.html',
                  progress: 50,
                  completed: false
                },
                {
                  id: 'reflex_actions_exhibit',
                  name: 'Reflex Actions Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/reflex_actions_exhibit.html',
                  progress: 45,
                  completed: false
                },
                {
                  id: 'muscle_tissue_exhibit',
                  name: 'Muscle Tissue Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/muscle_tissue_exhibit.html',
                  progress: 40,
                  completed: false
                },
                {
                  id: 'animal_hormones_exhibit',
                  name: 'Animal Hormones Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/animal_hormones_exhibit.html',
                  progress: 35,
                  completed: false
                },
                {
                  id: 'plant_coordination_exhibit',
                  name: 'Plant Coordination Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/plant_coordination_exhibit.html',
                  progress: 30,
                  completed: false
                },
                {
                  id: 'plant_hormones_exhibit',
                  name: 'Plant Hormones Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Control and Coordination/plant_hormones_exhibit.html',
                  progress: 25,
                  completed: false
      }
    ]
  },
  { 
              id: 'Reproduction',
              name: 'How do Organisms Reproduce?',
    progress: 55,
              completed: false,
              contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/index.html',
              subtopics: [
                {
                  id: 'reproduction-dna-exhibit',
                  name: 'Reproduction and DNA Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/reproduction-dna-exhibit.html',
                  progress: 60,
                  completed: false
                },
                {
                  id: 'asexual-fission-exhibit',
                  name: 'Asexual Fission Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/asexual-fission-exhibit.html',
                  progress: 55,
                  completed: false
                },
                {
                  id: 'budding-vegetative-exhibit',
                  name: 'Budding and Vegetative Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/budding-vegetative-exhibit.html',
                  progress: 50,
                  completed: false
                },
                {
                  id: 'fragmentation-regeneration-exhibit',
                  name: 'Fragmentation and Regeneration Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/fragmentation-regeneration-exhibit.html',
                  progress: 45,
                  completed: false
                },
                {
                  id: 'spore-formation-exhibit',
                  name: 'Spore Formation Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/spore-formation-exhibit.html',
                  progress: 40,
                  completed: false
                },
                {
                  id: 'sexual_reproduction_exhibit',
                  name: 'Sexual Reproduction Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/sexual_reproduction_exhibit.html',
                  progress: 35,
                  completed: false
                },
                {
                  id: 'flowering_plant_reproduction_exhibit',
                  name: 'Flowering Plant Reproduction Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/flowering_plant_reproduction_exhibit.html',
                  progress: 30,
                  completed: false
                },
                {
                  id: 'male_reproductive_system_exhibit',
                  name: 'Male Reproductive System Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/male_reproductive_system_exhibit.html',
                  progress: 25,
                  completed: false
                },
                {
                  id: 'female_reproductive_system_exhibit',
                  name: 'Female Reproductive System Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/female_reproductive_system_exhibit.html',
                  progress: 20,
                  completed: false
                },
                {
                  id: 'fertilization_pregnancy_birth_exhibit',
                  name: 'Fertilization, Pregnancy and Birth Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/fertilization_pregnancy_birth_exhibit.html',
                  progress: 15,
                  completed: false
                },
                {
                  id: 'reproductive_health_contraception_exhibit',
                  name: 'Reproductive Health and Contraception Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Reproduction/reproductive_health_contraception_exhibit.html',
                  progress: 10,
                  completed: false
                }
              ]
            },
            {
              id: 'Hereditary',
              name: 'Heredity and Evolution',
              progress: 50,
              completed: false,
              contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/index.html',
              subtopics: [
                {
                  id: 'inherited_traits_exhibit',
                  name: 'Inherited Traits Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/inherited_traits_exhibit.html',
                  progress: 55,
                  completed: false
                },
                {
                  id: 'mendel_monohybrid_exhibit',
                  name: 'Mendel Monohybrid Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/mendel_monohybrid_exhibit.html',
                  progress: 50,
                  completed: false
                },
                {
                  id: 'dihybrid_crosses_exhibit',
                  name: 'Dihybrid Crosses Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/dihybrid_crosses_exhibit.html',
                  progress: 45,
                  completed: false
                },
                {
                  id: 'gamete_formation_exhibit',
                  name: 'Gamete Formation Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/gamete_formation_exhibit.html',
                  progress: 40,
                  completed: false
                },
                {
                  id: 'sex_determination_exhibit',
                  name: 'Sex Determination Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/sex_determination_exhibit (2).html',
                  progress: 35,
                  completed: false
                },
                {
                  id: 'molecular_basis_exhibit',
                  name: 'Molecular Basis Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/molecular_basis_exhibit.html',
                  progress: 30,
                  completed: false
                },
                {
                  id: 'variation_heredity_exhibit',
                  name: 'Variation and Heredity Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Hereditary/variation_heredity_exhibit.html',
                  progress: 25,
                  completed: false
                }
              ]
            },
            {
              id: 'Our Environment',
              name: 'Our Environment',
              progress: 45,
              completed: false,
              contentPath: '/FinalContent/Class 10th/Science/Biology/Our Environment/index.html',
              subtopics: [
                {
                  id: 'ecosystem_exhibit',
                  name: 'Ecosystem Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Our Environment/ecosystem_exhibit.html',
                  progress: 50,
                  completed: false
                },
                {
                  id: 'food_chains_exhibit',
                  name: 'Food Chains Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Our Environment/food_chains_exhibit.html',
                  progress: 45,
                  completed: false
                },
                {
                  id: 'environmental_impact_exhibit',
                  name: 'Environmental Impact Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Our Environment/environmental_impact_exhibit.html',
                  progress: 40,
                  completed: false
                },
                {
                  id: 'waste_management_exhibit',
                  name: 'Waste Management Exhibit',
                  contentPath: '/FinalContent/Class 10th/Science/Biology/Our Environment/waste_management_exhibit.html',
                  progress: 35,
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
    color: '#8B5CF6',
    themeColor: 'violet',
    progress: 80,
    natureElement: 'tree',
    description: 'Master language skills through literature and creative expression',
    position: { x: 0, y: 25, z: 0 },
    chapters: [
      {
          id: 'First Flight – Main textbook (prose and poetry)',
          name: 'First Flight – Main textbook (prose and poetry)',
        icon: BookText,
        color: '#8B5CF6',
        topics: [
            {
              id: 'A letter to God',
              name: 'A Letter to God',
              progress: 95,
              completed: true,
              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/A letter to God/index.html'
            },
            {
              id: 'Nelson Mandela long Walk to Freedom',
              name: 'Nelson Mandela: Long Walk to Freedom',
              progress: 90,
              completed: true,
              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/Nelson Mandela long Walk to Freedom/index.html'
            },
            {
              id: 'Two Stories about Flying',
              name: 'Two Stories about Flying',
              progress: 85,
              completed: true,
              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/Two Stories about Flying/index.html'
            },
            {
              id: 'From Diary of Anne Frank',
              name: 'From the Diary of Anne Frank',
              progress: 80,
              completed: true,
              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/From Diary of Anne Frank/index.html'
            },
            {
              id: 'The Sermon at Benares ',
              name: 'The Sermon at Benares',
              progress: 75,
              completed: false,
              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/The Sermon at Benares /index.html'
            },
            {
              id: 'Mijbil the Otter',
              name: 'Mijbil the Otter',
              progress: 70,
              completed: false,
              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/Mijbil the Otter/index.html'
            },
            {
              id: 'Madam rides the Bus',
              name: 'Madam Rides the Bus',
              progress: 65,
              completed: false,
              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/Madam rides the Bus/index.html'
            },
            {
              id: 'The Proposal',
              name: 'The Proposal',
              progress: 60,
              completed: false,
              contentPath: '/FinalContent/Class 10th/English/First Flight – Main textbook (prose and poetry)/The Proposal/index.html'
            }
          ]
        },
        {
          id: 'Footprints Without Feet – Supplementary reader (short stories)',
          name: 'Footprints Without Feet – Supplementary reader (short stories)',
          icon: BookCopy,
        color: '#8B5CF6',
          topics: []
        }
      ]
    },
    {
      id: 'Social Science',
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
          id: 'Economics',
          name: 'Economics',
          icon: Coins,
          color: '#EF4444',
        topics: [
            {
              id: 'Development',
              name: 'Development',
              progress: 70,
              completed: false,
              contentPath: '/FinalContent/Class 10th/Social Science/Economics/Development/index.html'
            },
            {
              id: 'Sectors of the Indian Economy',
              name: 'Sectors of the Indian Economy',
              progress: 65,
              completed: false,
              contentPath: '/FinalContent/Class 10th/Social Science/Economics/Sectors of the Indian Economy/index.html'
            },
            {
              id: 'Money and Credit',
              name: 'Money and Credit',
              progress: 60,
              completed: false,
              contentPath: '/FinalContent/Class 10th/Social Science/Economics/Money and Credit/index.html'
            },
            {
              id: 'Globalization and Indian Economy',
              name: 'Globalization and the Indian Economy',
              progress: 55,
              completed: false,
              contentPath: '/FinalContent/Class 10th/Social Science/Economics/Globalization and Indian Economy/index.html'
            },
            {
              id: 'Consumer Rights',
              name: 'Consumer Rights',
              progress: 50,
              completed: false,
              contentPath: '/FinalContent/Class 10th/Social Science/Economics/Consumer Rights/index.html'
            }
          ]
        },
        {
          id: 'Democratic Politics',
          name: 'Democratic Politics',
          icon: Users,
          color: '#EF4444',
          topics: []
        },
        {
          id: 'History',
          name: 'History',
          icon: Landmark,
          color: '#EF4444',
          topics: []
      }
    ]
  },
  { 
      id: 'Hindi',
    name: 'Hindi', 
    icon: Languages,
    color: '#06B6D4',
    themeColor: 'cyan',
    progress: 70,
    natureElement: 'river',
    description: 'Explore the richness of Hindi language and literature',
    position: { x: -17.5, y: 17.5, z: 0 },
      chapters: []
    },
    {
      id: 'Mathematics',
      name: 'Mathematics',
      icon: Calculator,
      color: '#10B981',
      themeColor: 'emerald',
      progress: 75,
      natureElement: 'leaf',
      description: 'Explore the world of numbers, patterns, and problem-solving',
      position: { x: 0, y: -25, z: 0 },
      chapters: []
    }
  ]
};

// Legacy curriculum for backward compatibility - using first class (9th) as default
export const legacyCurriculum: Subject[] = curriculum['9th'];

// Helper functions for the new class-based curriculum
export const getClassCurriculum = (classLevel: string): Subject[] => {
  return curriculum[classLevel] || curriculum['9th'];
};

export const getClassSubjectById = (classLevel: string, id: string): Subject | undefined => {
  const classCurriculum = getClassCurriculum(classLevel);
  return classCurriculum.find(subject => subject.id === id);
};

// Legacy helper functions for backward compatibility
export const getSubjectById = (id: string): Subject | undefined => {
  return legacyCurriculum.find(subject => subject.id === id);
};

export const getChapterById = (subjectId: string, chapterId: string): Chapter | undefined => {
  const subject = getSubjectById(subjectId);
  return subject?.chapters.find(chapter => chapter.id === chapterId);
};

export const getTopicById = (subjectId: string, chapterId: string, topicId: string): Topic | undefined => {
  const chapter = getChapterById(subjectId, chapterId);
  return chapter?.topics.find(topic => topic.id === topicId);
};

// Export the class-based curriculum as default
export default curriculum;