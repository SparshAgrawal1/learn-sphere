// Class-specific curriculum data structure
import curriculum, { Subject, getClassCurriculum as getCurriculum, getClassSubjectById as getSubject } from './curriculum';

// Re-export the curriculum and helper functions from the main curriculum file
export const classCurriculum = curriculum;

// Helper function to get curriculum for a specific class
export const getClassCurriculum = (classLevel: string | null): Subject[] => {
  if (!classLevel || (classLevel !== '9th' && classLevel !== '10th')) {
    return curriculum['9th']; // Default to 9th grade if no valid class is specified
  }
  return getCurriculum(classLevel);
};

// Helper function to get a subject by ID for a specific class
export const getClassSubjectById = (classLevel: string | null, id: string): Subject | undefined => {
  if (!classLevel || (classLevel !== '9th' && classLevel !== '10th')) {
    return curriculum['9th'].find(subject => subject.id === id);
  }
  return getSubject(classLevel, id);
};

export default curriculum;
