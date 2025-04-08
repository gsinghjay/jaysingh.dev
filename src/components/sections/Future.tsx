import React from 'react';
import Section from '../layout/Section';
import InfoCard from '../ui/InfoCard';
import { FutureData } from '../../data/portfolioData';

interface FutureProps {
  data: FutureData;
}

/**
 * Renders the Future Aspirations section using data passed as props.
 * 
 * @param {FutureProps} props - The component props containing future goals data.
 * @returns {JSX.Element} The Future section component.
 */
const Future: React.FC<FutureProps> = ({ data }) => {
  return (
    <Section
      id={data.id}
      title={data.title}
      description={data.description}
      // Uses default background bg-slate-900
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list" aria-label="Future goals">
        {data.goals.map((goal, index) => (
          <InfoCard
            key={index}
            title={goal.title}
            description={goal.description}
            icon={goal.icon}
            archetype={goal.archetype}
            ariaLabelledById={`future-goal-${index}`}
            titleNarrativeSignal="future" // Apply 'future' signal to all goals
          />
        ))}
      </div>
    </Section>
  );
};

export default Future; 