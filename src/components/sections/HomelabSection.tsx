import React from 'react';
import Section from '../layout/Section';
import InfoCard from '../ui/InfoCard';
import { HomelabData } from '../../data/portfolioData';
import { ThemeColor } from '../../utils/colorUtils';

interface HomelabSectionProps {
  data: HomelabData;
}

/**
 * Renders the Homelab section using data passed as props.
 * 
 * @param {HomelabSectionProps} props - The component props containing homelab data.
 * @returns {JSX.Element} The Homelab section component.
 */
const HomelabSection: React.FC<HomelabSectionProps> = ({ data }) => {

  // Determine narrative signal based on theme color
  const getNarrativeSignal = (themeColor: ThemeColor): 'technical' | null => {
    return themeColor === 'accentGreen' ? 'technical' : null;
  };

  return (
    <Section
      id={data.id}
      title={data.title}
      description={data.description}
      bgColorClass="bg-[#0D1117]" // Specific background for this section
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list" aria-label="Homelab technical components">
        {data.sections.map((section, index) => (
          <InfoCard
            key={index}
            title={section.title}
            description={section.description}
            icon={section.icon}
            tags={section.tags}
            themeColor={section.themeColor}
            intensityLevel={section.intensityLevel}
            ariaLabelledById={`homelab-section-${index}`}
            titleNarrativeSignal={getNarrativeSignal(section.themeColor)}
          />
        ))}
      </div>
      {/* Commented out phases section remains removed as it was already commented out */}
    </Section>
  );
};

export default HomelabSection; 