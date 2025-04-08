import React from 'react';
import Section from '../layout/Section';
import TimelineItem from '../ui/TimelineItem';
import TransitionMarker from '../layout/TransitionMarker';
import { JourneyData } from '../../data/portfolioData';
import { Archetype } from '../../utils/archetypeUtils';

interface JourneyProps {
  data: JourneyData;
}

/**
 * Renders the Journey section timeline.
 * 
 * @param {JourneyProps} props - The component props containing journey data.
 * @returns {JSX.Element} The Journey section component.
 */
const Journey: React.FC<JourneyProps> = ({ data }) => {

  // Determine narrative signal based on archetype and title (example logic from original)
  const getNarrativeSignal = (archetype: Archetype, title: string): 'discovery' | 'achievement' | 'transition' | null => {
    if (archetype === 'explorer') return 'discovery';
    if (archetype === 'ruler') return 'achievement';
    if (archetype === 'creator' && title.includes('Professional')) return 'transition';
    return null;
  };

  return (
    <Section
      id={data.id}
      title={data.title}
      description={data.description}
      // Uses default background bg-slate-900
    >
      {/* Two-column grid on medium screens and up */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-6" role="list" aria-label="Journey timeline">
        {data.stages.map((stage, index) => (
          <TimelineItem
            key={index}
            title={stage.title}
            description={stage.description}
            year={stage.year}
            keySkills={stage.keySkills}
            archetype={stage.archetype}
            ariaLabelledById={`journey-stage-${index}`}
            titleNarrativeSignal={getNarrativeSignal(stage.archetype, stage.title)}
            disableNarrativeBorders={true}
            isCurrent={stage.isCurrent}
          />
        ))}
      </div>

      {/* Single column layout with transition markers on mobile */}
      <div className="md:hidden space-y-6" role="list" aria-label="Journey timeline">
        {data.stages.map((stage, index) => (
          <React.Fragment key={`mobile-${index}`}>
            <TimelineItem
              title={stage.title}
              description={stage.description}
              year={stage.year}
              keySkills={stage.keySkills}
              archetype={stage.archetype}
              ariaLabelledById={`journey-mobile-stage-${index}`}
              titleNarrativeSignal={getNarrativeSignal(stage.archetype, stage.title)}
              disableNarrativeBorders={false}
              isCurrent={stage.isCurrent}
            />
            {/* Conditionally render TransitionMarker between items if showTransitions is true */}
            {data.showTransitions && index < data.stages.length - 1 && (
              <TransitionMarker
                fromArchetype={stage.archetype}
                toArchetype={data.stages[index + 1].archetype} 
                intensityLevel={3} // Keep this for TransitionMarker as it's likely still needed for backgrounds
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </Section>
  );
};

export default Journey; 