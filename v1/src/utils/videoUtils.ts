/**
 * Converts a Google Drive sharing link to an embeddable link
 * @param url - The Google Drive sharing URL
 * @returns The embeddable URL or null if invalid
 */
export const convertToEmbeddableUrl = (url: string | null): string | null => {
  if (!url) return null;
  
  // Extract file ID from Google Drive URL
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch) {
    const fileId = fileIdMatch[1];
    // Use embed instead of preview for better control
    return `https://drive.google.com/file/d/${fileId}/preview?usp=sharing`;
  }
  
  // If it's already an embeddable URL or different format, return as is
  if (url.includes('/preview') || url.includes('embed')) {
    return url;
  }
  
  // For other video platforms or direct video URLs
  return url;
};

/**
 * Checks if a URL is a valid video URL
 * @param url - The URL to check
 * @returns boolean indicating if it's a valid video URL
 */
export const isValidVideoUrl = (url: string | null): boolean => {
  if (!url) return false;
  
  // Check for Google Drive URLs
  if (url.includes('drive.google.com')) return true;
  
  // Check for other video platforms
  if (url.includes('youtube.com') || url.includes('youtu.be')) return true;
  if (url.includes('vimeo.com')) return true;
  
  // Check for direct video file extensions
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
  return videoExtensions.some(ext => url.toLowerCase().includes(ext));
};