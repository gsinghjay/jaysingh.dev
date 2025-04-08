/**
 * Utility functions and types for working with theme colors.
 * Theme colors are mapped to Metro-inspired colors and include descriptions
 * of their core traits for consistent usage across components.
 */

export type ThemeColor = 'primary' | 'accentGreen' | 'accentPurple' | 'accentOrange';

export interface ThemeColorConfig {
  colorClass: string;
  description: string;
}

export const themeColorMap: Record<ThemeColor, ThemeColorConfig> = {
  primary: {
    colorClass: 'metro-blue',
    description: 'Leadership, structure, organization'
  },
  accentGreen: {
    colorClass: 'metro-green',
    description: 'Knowledge, wisdom, analytical thinking'
  },
  accentPurple: {
    colorClass: 'metro-purple',
    description: 'Innovation, experimentation, bringing ideas to life'
  },
  accentOrange: {
    colorClass: 'metro-orange',
    description: 'Self-discovery, adventure, pushing boundaries'
  }
};

/**
 * Get the Metro color class associated with a theme color
 * @param themeColor The theme color
 * @returns The corresponding Metro color class
 */
export const getThemeColorClass = (themeColor: ThemeColor): string => {
  return themeColorMap[themeColor]?.colorClass || 'metro-blue';
};

/**
 * Get the description associated with a theme color
 * @param themeColor The theme color
 * @returns The corresponding description
 */
export const getThemeColorDescription = (themeColor: ThemeColor): string => {
  return themeColorMap[themeColor]?.description || '';
}; 