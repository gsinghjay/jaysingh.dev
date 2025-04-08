/**
 * Utility functions and types for emotional intensity scaling.
 * Intensity levels create a consistent visual hierarchy across components
 * based on the importance of information being presented.
 */

export type IntensityLevel = 1 | 2 | 3 | 4;

export interface IntensityConfig {
  opacity: string;
  description: string;
}

export const intensityMap: Record<IntensityLevel, IntensityConfig> = {
  1: {
    opacity: 'bg-opacity-20',
    description: 'Background information, everyday skills'
  },
  2: {
    opacity: 'bg-opacity-40',
    description: 'Notable accomplishments, specialized skills'
  },
  3: {
    opacity: 'bg-opacity-80',
    description: 'Major achievements, pivotal projects'
  },
  4: {
    opacity: '',
    description: 'Life-changing decisions, defining moments'
  }
};

/**
 * Get the background opacity class for a given intensity level
 * @param level The emotional intensity level (1-4)
 * @returns The corresponding Tailwind opacity class
 */
export const getOpacityByIntensity = (level: IntensityLevel): string => {
  return intensityMap[level]?.opacity || '';
};

/**
 * Get the description for a given intensity level
 * @param level The emotional intensity level (1-4)
 * @returns Description of when to use this intensity level
 */
export const getIntensityDescription = (level: IntensityLevel): string => {
  return intensityMap[level]?.description || '';
}; 