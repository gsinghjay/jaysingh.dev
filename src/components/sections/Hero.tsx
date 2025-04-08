import React from 'react';
import Typography from '../ui/Typography';
import { HeroData } from '../../data/portfolioData';
import { getArchetypeColor } from '../../utils/archetypeUtils';
import { getOpacityByIntensity } from '../../utils/intensityUtils';

interface HeroProps {
  data: HeroData;
}

/**
 * Renders the Hero section using data passed as props.
 * 
 * @param {HeroProps} props - The component props containing hero data.
 * @returns {JSX.Element} The Hero section component.
 */
const Hero: React.FC<HeroProps> = ({ data }) => {
  /**
   * Get background color class based on archetype and intensity
   * @returns CSS class for the background color with appropriate intensity
   */
  const getBgColorClass = (): string => {
    const colorName = getArchetypeColor(data.primaryArchetype);
    // Use intensity level from data, defaulting to 3 if not provided
    const intensity = data.intensityLevel || 3;
    return `bg-${colorName} ${getOpacityByIntensity(intensity)}`;
  };

  return (
    // Note: The outer div acts as the section wrapper here, not using the Section component
    <div className={`${getBgColorClass()} pt-24 relative`} id="hero"> {/* Added id="hero" */}
      {/* Background pattern */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:10px_10px] opacity-30"
        aria-hidden="true"
      ></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <Typography 
          variant="h2" 
          className="mb-6"
          id="hero-title"
          archetype="default" // Title typically white/default against colored bg
        >
          {data.title}
        </Typography>
        <Typography 
          variant="body-lg"
          archetype="default" // Description typically white/default
          className="max-w-3xl"
        >
          {data.description}
        </Typography>
        <div className="mt-8 flex flex-wrap gap-4" role="list" aria-label="Professional categories">
          {data.tags.map((tag: string, index: number) => (
            <Typography 
              key={index}
              variant="label"
              className="bg-white/20 px-4 py-2"
              component="span"
              archetype="default"
              {...{ role: "listitem" }}
            >
              {tag}
            </Typography>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero; 