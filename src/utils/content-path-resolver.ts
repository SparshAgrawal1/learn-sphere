/**
 * Utility functions to resolve content paths based on class selection
 */

/**
 * Resolves a content path based on the selected class
 * @param subjectId - The subject identifier (e.g., 'Science', 'Mathematics')
 * @param topicId - The topic identifier (e.g., 'Physics/Gravitation')
 * @param lessonId - The specific lesson file (e.g., '9.1_Gravitation.html')
 * @returns The full path to the content
 */
export const resolveContentPath = (
  selectedClass: string | null, 
  subjectId: string, 
  topicId: string, 
  lessonId: string
): string => {
  if (!selectedClass) {
    throw new Error('No class selected. Please select a class first.');
  }
  
  // Map the class to the corresponding folder in FinalContent
  const classFolder = selectedClass === '9th' ? 'Class 9th' : 'Class 10th';
  
  // Construct the path based on the subject, topic, and lesson
  return `/FinalContent/${classFolder}/${subjectId}/${topicId}/${lessonId}`;
};

/**
 * Checks if a content path exists for the given class and subject/topic combination
 * @param selectedClass - The selected class ('9th' or '10th')
 * @param subjectId - The subject identifier
 * @param topicId - The topic identifier
 * @returns Boolean indicating if content exists
 */
export const contentExists = async (
  selectedClass: string | null,
  subjectId: string,
  topicId: string
): Promise<boolean> => {
  if (!selectedClass) return false;
  
  try {
    const classFolder = selectedClass === '9th' ? 'Class 9th' : 'Class 10th';
    const path = `/FinalContent/${classFolder}/${subjectId}/${topicId}`;
    
    // Try to fetch the directory listing
    const response = await fetch(path);
    return response.status === 200;
  } catch (error) {
    console.error('Error checking content existence:', error);
    return false;
  }
};

/**
 * Gets the appropriate content path for a specific lesson
 * Handles the case where the content might be in different locations for different classes
 */
export const getLessonContentPath = (
  selectedClass: string | null,
  subjectId: string,
  topicId: string,
  lessonId: string,
  fallbackPath?: string
): string => {
  if (!selectedClass) {
    return fallbackPath || '';
  }
  
  try {
    return resolveContentPath(selectedClass, subjectId, topicId, lessonId);
  } catch (error) {
    console.error('Error resolving content path:', error);
    return fallbackPath || '';
  }
};
