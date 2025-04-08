import React from 'react';
import Typography from './Typography';
import { Archetype, getArchetypeColor } from '../../utils/archetypeUtils';
import { IntensityLevel, getOpacityByIntensity } from '../../utils/intensityUtils';

interface TimelineItemProps {
  /** The main title of the timeline stage */
  title: string;
  /** The description text */
  description: string;
  /** The time period (e.g., year range) - No longer displayed directly */
  year?: string;
  /** List of key skills developed during this stage */
  keySkills?: string[];
  /** The brand archetype for background color */
  archetype: Archetype;
  /** Intensity level for the background color */
  intensityLevel?: IntensityLevel;
  /** Unique ID for accessibility labelling */
  ariaLabelledById: string;
  /** Narrative signal for the title */
  titleNarrativeSignal?: 'discovery' | 'achievement' | 'transition' | 'technical' | 'future' | null;
  /** Should disable borders for narrative signal (used in cards) */
  disableNarrativeBorders?: boolean;
  /** Flag indicating if this is the current/latest stage */
  isCurrent?: boolean;
}

/**
 * Reusable component for displaying an item in a timeline, like a journey stage.
 * 
 * @param {TimelineItemProps} props - The component props
 * @returns {JSX.Element} The timeline item component
 */
const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  description,
  keySkills,
  archetype,
  intensityLevel = 3,
  ariaLabelledById,
  titleNarrativeSignal = null,
  disableNarrativeBorders = false,
  isCurrent = false,
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

  // Extract age range if present in the title
  const titleText = title.includes('(Age') || title.includes('(Present')
    ? title.replace(/\s*\(Age \d+-\d+\)|\s*\(Present\)/, '')
    : title;
  const ageRangeMatch = title.match(/\(Age \d+-\d+\)|\(Present\)/);
  const ageRangeText = ageRangeMatch ? ageRangeMatch[0].replace(/[()]/g, '') : null;

  // Function to handle key skills that may have code tags in them
  return (
    <div
      className={`bg-slate-800 transform hover:translate-y-[-4px] transition-transform relative overflow-hidden shadow-md`}
      role="listitem"
      aria-labelledby={ariaLabelledById}
    >
      {/* Header Section - Added relative positioning for the pattern overlay */}
      <div className={`relative px-6 py-4 border-b border-white/20 flex items-center justify-between ${getBgColorClass()}`}>
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-30"
          aria-hidden="true"
        ></div>
        
        {/* Header Content - Needs to be relative to stack above pattern */}  
        <div className="relative flex items-center justify-between w-full">
          <Typography
            variant="h3"
            id={ariaLabelledById}
            className="text-lg sm:text-xl md:text-xl font-medium mr-3"
            narrativeSignal={titleNarrativeSignal}
            disableNarrativeBorders={disableNarrativeBorders}
            archetype="default"
          >
            {titleText}
          </Typography>
          {/* Tags need to be inside the relative wrapper too */}  
          <div> 
            {isCurrent ? (
              <span className="inline-block bg-white/20 text-white px-3 py-1 text-xs font-medium rounded-sm whitespace-nowrap" aria-label="Current stage">
                Present
              </span>
            ) : ageRangeText ? (
              <span className="inline-block bg-white/20 px-3 py-1 text-xs font-medium rounded-sm whitespace-nowrap" aria-label="Age range">
                {ageRangeText}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Main Content Area - Keep flat background inherited from outer div */}
      <div className="p-6 relative">
        <Typography 
          variant="body"
          archetype="default"
          className="mb-4"
        >
          {description}
        </Typography>

        {/* Key skills section */}
        {keySkills && keySkills.length > 0 && (
          <div className="key-learning mt-4">
            <Typography 
              variant="body-sm" 
              weight="medium" 
              className="uppercase mb-2"
              archetype="muted"
            >
              KEY SKILLS DEVELOPED
            </Typography>
            <div className="flex flex-wrap gap-2" role="list" aria-label={`Skills for ${titleText}`}>
              {keySkills.map((skill, skillIndex) => (
                <Typography
                  key={skillIndex}
                  variant="label"
                  component="span"
                  className="bg-white/20 px-3 py-1"
                  archetype="default"
                  {...{ role: "listitem" }}
                >
                  {skill}
                </Typography>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineItem; 