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

/**
 * Validate blog post frontmatter according to schema
 * @param {object} frontmatter - The frontmatter object to validate
 * @param {string} filePath - The file path for error messages
 * @returns {{ valid: boolean, errors: string[] }} Validation result
 */
export function validateBlogPost(frontmatter, filePath) {
  const errors = [];
  // Required fields per AC2: id, title, date, excerpt, tags, readTime
  const requiredFields = ['id', 'title', 'date', 'excerpt', 'tags', 'readTime'];

  // Check required fields
  for (const field of requiredFields) {
    if (frontmatter[field] === undefined || frontmatter[field] === null) {
      errors.push(`Missing required field '${field}' in ${filePath}`);
    }
  }

  // Type validations (only if field exists)
  if (frontmatter.id !== undefined && frontmatter.id !== null) {
    if (typeof frontmatter.id !== 'string') {
      errors.push(`Field 'id' must be a string in ${filePath}`);
    } else if (frontmatter.id.trim() === '') {
      errors.push(`Field 'id' cannot be empty in ${filePath}`);
    }
  }

  if (frontmatter.title !== undefined && frontmatter.title !== null) {
    if (typeof frontmatter.title !== 'string') {
      errors.push(`Field 'title' must be a string in ${filePath}`);
    } else if (frontmatter.title.trim() === '') {
      errors.push(`Field 'title' cannot be empty in ${filePath}`);
    }
  }

  if (frontmatter.date !== undefined && frontmatter.date !== null) {
    // Handle Date objects (from YAML parsing) and strings
    if (frontmatter.date instanceof Date) {
      // Date objects are valid if they represent a valid date
      if (isNaN(frontmatter.date.getTime())) {
        errors.push(`Field 'date' must be a valid date in ${filePath}`);
      }
    } else {
      const dateStr = String(frontmatter.date);
      // Validate YYYY-MM-DD format for string dates
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(dateStr)) {
        errors.push(`Field 'date' must be in YYYY-MM-DD format in ${filePath}`);
      }
    }
  }

  if (frontmatter.excerpt !== undefined && frontmatter.excerpt !== null) {
    if (typeof frontmatter.excerpt !== 'string') {
      errors.push(`Field 'excerpt' must be a string in ${filePath}`);
    } else if (frontmatter.excerpt.trim() === '') {
      errors.push(`Field 'excerpt' cannot be empty in ${filePath}`);
    }
  }

  if (frontmatter.tags !== undefined && frontmatter.tags !== null) {
    if (!Array.isArray(frontmatter.tags)) {
      errors.push(`Field 'tags' must be an array in ${filePath}`);
    } else if (frontmatter.tags.length === 0) {
      errors.push(`Field 'tags' must have at least one item in ${filePath}`);
    }
  }

  if (frontmatter.readTime !== undefined && frontmatter.readTime !== null) {
    if (typeof frontmatter.readTime !== 'string') {
      errors.push(`Field 'readTime' must be a string in ${filePath}`);
    } else if (frontmatter.readTime.trim() === '') {
      errors.push(`Field 'readTime' cannot be empty in ${filePath}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
