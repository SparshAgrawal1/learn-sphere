// Utility functions for handling YouTube video URLs and embedding

/**
 * Checks if a URL is a YouTube video URL
 * @param url - The URL to check
 * @returns boolean indicating if it's a YouTube video URL
 */
export const isYouTubeURL = (url: string): boolean => {
  if (!url) return false;
  
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  return youtubeRegex.test(url);
};

/**
 * Extracts the video ID from a YouTube URL
 * @param url - The YouTube URL
 * @returns The video ID or null if not found
 */
export const extractYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

/**
 * Converts a YouTube URL to an embeddable format
 * @param url - The original YouTube URL
 * @returns The embeddable YouTube URL or null if invalid
 */
export const getYouTubeEmbedUrl = (url: string): string | null => {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;
  
  return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&modestbranding=1`;
};

/**
 * Gets YouTube video thumbnail URL
 * @param url - The YouTube URL
 * @param quality - Thumbnail quality ('default', 'hqdefault', 'maxresdefault')
 * @returns The thumbnail URL or null if invalid
 */
export const getYouTubeThumbnail = (url: string, quality: 'default' | 'hqdefault' | 'maxresdefault' = 'hqdefault'): string | null => {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;
  
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};