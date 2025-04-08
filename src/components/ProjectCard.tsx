import React from 'react';
import Typography from './Typography';
import { Archetype, getArchetypeColor } from '../utils/archetypeUtils';
import { IntensityLevel, getOpacityByIntensity } from '../utils/intensityUtils';
import { ProjectStat } from '../data/portfolioData'; // Import ProjectStat type

interface ProjectCardProps {
  /** The main title of the project */
  title: string;
  /** The description text */
  description: string;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** List of tags or technologies */
  tags: string[];
  /** Optional list of statistics */
  stats?: ProjectStat[];
  /** The brand archetype for background color */
  archetype: Archetype;
  /** Intensity level for the background color */
  intensityLevel?: IntensityLevel;
  /** Unique ID for accessibility labelling */
  ariaLabelledById: string;
  /** Narrative signal for the title */
  titleNarrativeSignal?: 'achievement' | 'future' | null;
}

/**
 * Reusable card component specifically for displaying projects, including optional stats.
 * 
 * @param {ProjectCardProps} props - The component props
 * @returns {JSX.Element} The project card component
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  icon,
  tags,
  stats,
  archetype,
  intensityLevel = 3,
  ariaLabelledById,
  titleNarrativeSignal = null,
}) => {
  /**
   * Get background color class based on archetype and intensity
   * @returns CSS classes for background color with appropriate intensity
   */
  const getBgColorClass = (): string => {
    const colorName = getArchetypeColor(archetype);
    const intensityClass = getOpacityByIntensity(intensityLevel);
    return `bg-${colorName} ${intensityClass}`;
  };

  return (
    <article 
      className={`bg-slate-800 transform hover:translate-y-[-4px] transition-transform relative overflow-hidden shadow-md`}
      aria-labelledby={ariaLabelledById}
      role="listitem"
    >
      <div className={`relative px-4 py-3 border-b border-white/20 flex items-center justify-start gap-3 ${getBgColorClass()}`}>
        <div 
          className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-30"
          aria-hidden="true"
        ></div>

        <div className="relative flex items-center justify-start gap-3 w-full">
          {icon && (
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              {React.cloneElement(icon as React.ReactElement, { className: "w-full h-full" })}
            </div>
          )}
          <Typography 
            variant="h5"
            id={ariaLabelledById}
            className="font-medium"
            narrativeSignal={titleNarrativeSignal}
            disableNarrativeBorders={true}
            archetype="default"
          >
            {title}
          </Typography>
        </div>
      </div>

      <div className="p-4 relative">
        <Typography 
          variant="body"
          archetype="default"
          className="mb-3"
        >
          {description}
        </Typography>
        
        {stats && (
          <div className="grid grid-cols-3 gap-2 mb-3" role="group" aria-label="Project statistics">
            {stats.map((stat, statIndex) => (
              <div key={statIndex} className="bg-slate-700 p-2 text-center">
                <Typography variant="h5" className="font-medium text-sm" archetype="default" align="center">{stat.value}</Typography>
                <Typography variant="caption" align="center" className="text-xs text-gray-300">{stat.label}</Typography>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2" role="list" aria-label="Project technologies">
          {tags.map((tag, tagIndex) => (
            <Typography 
              key={tagIndex} 
              variant="label" 
              className="bg-slate-700 px-3 py-1 text-xs"
              archetype="default"
              component="span"
              {...{ role: "listitem" }}
            >
              {tag}
            </Typography>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard; 