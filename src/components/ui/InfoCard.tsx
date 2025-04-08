import React from 'react';
import Typography from './Typography';
import { Archetype, getArchetypeColor } from '../../utils/archetypeUtils';
import { IntensityLevel, getOpacityByIntensity } from '../../utils/intensityUtils';

interface InfoCardProps {
  /** The main title of the card */
  title: string;
  /** The description text */
  description: string;
  /** Optional icon to display */
  icon?: React.ReactNode;
  /** Optional list of tags or skills */
  tags?: string[];
  /** List of skills (specific for Expertise) */
  skills?: string[];
  /** The brand archetype for background color */
  archetype: Archetype;
  /** Intensity level for the background color */
  intensityLevel?: IntensityLevel;
  /** Unique ID for accessibility labelling */
  ariaLabelledById: string;
  /** Narrative signal for the title */
  titleNarrativeSignal?: 'discovery' | 'achievement' | 'transition' | 'technical' | 'future' | null;
}

/**
 * Reusable card component for displaying information items like expertise areas,
 * homelab sections, or future goals.
 * 
 * @param {InfoCardProps} props - The component props
 * @returns {JSX.Element} The info card component
 */
const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  icon,
  tags,
  skills,
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
            archetype="default"
            narrativeSignal={titleNarrativeSignal}
          >
            {title}
          </Typography>
        </div>
      </div>

      <div className="p-4 relative">
        {description && (
          <Typography 
            variant="body"
            archetype="default"
            className="mb-3"
          >
            {description}
          </Typography>
        )}
        {skills && skills.length > 0 && (
           <ul 
             className="text-gray-100 space-y-1 mb-3 list-disc list-inside text-sm"
             aria-label={`Skills in ${title}`}
           >
             {skills.map((skill, skillIndex) => (
               <li key={skillIndex}>{skill}</li>
             ))}
           </ul>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2" role="list" aria-label={`${title} technologies or tags`}>
            {tags.map((tag, tagIndex) => (
              <Typography
                key={tagIndex}
                variant="label"
                component="span"
                className="bg-white/20 px-3 py-1 text-xs"
                archetype="default"
                {...{ role: "listitem" }}
              >
                {tag}
              </Typography>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default InfoCard; 