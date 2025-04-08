/**
 * Utility functions and types for working with brand archetypes.
 * Archetypes are mapped to Metro-inspired colors and include descriptions
 * of their core traits for consistent usage across components.
 */

export type Archetype = 'explorer' | 'creator' | 'ruler' | 'sage';

export interface ArchetypeConfig {
  color: string;
  description: string;
}

export const archetypeMap: Record<Archetype, ArchetypeConfig> = {
  explorer: {
    color: 'metro-orange',
    description: 'Self-discovery, adventure, pushing boundaries'
  },
  creator: {
    color: 'metro-purple',
    description: 'Innovation, experimentation, bringing ideas to life'
  },
  ruler: {
    color: 'metro-blue',
    description: 'Leadership, structure, organization'
  },
  sage: {
    color: 'metro-green',
    description: 'Knowledge, wisdom, analytical thinking'
  }
};

/**
 * Get the Metro color associated with an archetype
 * @param archetype The brand archetype
 * @returns The corresponding Metro color
 */
export const getArchetypeColor = (archetype: Archetype): string => {
  return archetypeMap[archetype]?.color || 'metro-blue';
}; 