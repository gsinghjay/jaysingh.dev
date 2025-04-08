import React from 'react';
import Section from '../layout/Section';
import InfoCard from '../ui/InfoCard';
import { ExpertiseData } from '../../data/portfolioData';
import { ThemeColor } from '../../utils/colorUtils';

interface ExpertiseProps {
  data: ExpertiseData;
}

/**
 * Renders the Expertise section using data passed as props.
 * 
 * @param {ExpertiseProps} props - The component props containing expertise data.
 * @returns {JSX.Element} The Expertise section component.
 */
const Expertise: React.FC<ExpertiseProps> = ({ data }) => {

  // Determine narrative signal based on theme color
  const getNarrativeSignal = (themeColor: ThemeColor): 'technical' | null => {
    return themeColor === 'accentGreen' ? 'technical' : null;
  };

  return (
    <Section
      id={data.id}
      title={data.title}
      description={data.description}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Areas of expertise">
        {data.areas.map((area, index) => (
          <InfoCard
            key={index}
            title={area.title}
            description={area.description || ''} // Ensure description is always a string
            icon={area.icon}
            skills={area.skills}
            themeColor={area.themeColor}
            intensityLevel={area.intensityLevel}
            ariaLabelledById={`expertise-area-${index}`}
            titleNarrativeSignal={getNarrativeSignal(area.themeColor)}
          />
        ))}
      </div>
    </Section>
  );
};

export default Expertise; 