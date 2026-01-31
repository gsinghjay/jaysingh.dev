/**
 * Custom 11ty filters
 * Extracted for testability and reuse
 */

// Reading speed in words per minute (average adult reading speed)
export const WORDS_PER_MINUTE = 200;

/**
 * Calculate estimated reading time from HTML content
 * @param {string} content - HTML content to analyze
 * @returns {string} Formatted reading time (e.g., "5 min read")
 */
export function readingTime(content) {
  if (!content) return "1 min read";

  // Strip HTML tags to get plain text
  const text = content.replace(/<[^>]*>/g, '');

  // Count words (split by whitespace, filter empty strings)
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Calculate minutes at configured WPM
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  // Minimum 1 minute
  const readTime = Math.max(1, minutes);

  return `${readTime} min read`;
}

/**
 * Find projects by their IDs from a projects collection
 * Used for related projects lookup at build time
 * @param {string[]|null|undefined} projectIds - Array of project IDs to find
 * @param {object[]|null|undefined} projects - Projects collection from 11ty
 * @returns {object[]} Array of matching project objects, invalid IDs gracefully ignored
 */
export function findProjectsByIds(projectIds, projects) {
  if (!projectIds || !Array.isArray(projectIds) || !projects) {
    return [];
  }

  return projectIds
    .map(id => projects.find(p => p.data?.id === id))
    .filter(p => p !== undefined);
}
