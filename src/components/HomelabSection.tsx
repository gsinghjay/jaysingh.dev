import React from 'react';
import Section from './Section';
import InfoCard from './InfoCard';
import { HomelabData } from '../data/portfolioData';
import { Archetype } from '../utils/archetypeUtils'; // Keep for narrative signal logic if needed

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

  // Determine narrative signal based on archetype (example)
  const getNarrativeSignal = (archetype: Archetype): 'technical' | null => {
    return archetype === 'sage' ? 'technical' : null;
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
            archetype={section.archetype}
            ariaLabelledById={`homelab-section-${index}`}
            titleNarrativeSignal={getNarrativeSignal(section.archetype)}
          />
        ))}
      </div>
      {/* Commented out phases section remains removed as it was already commented out */}
    </Section>
  );
};

export default HomelabSection; 