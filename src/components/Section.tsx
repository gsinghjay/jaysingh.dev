import React, { ReactNode } from 'react';
import Typography from './Typography';
import { Archetype } from '../utils/archetypeUtils';

interface SectionProps {
  /** The ID for the section element, used for navigation */
  id: string;
  /** The main title of the section */
  title: string;
  /** The introductory description for the section */
  description: string;
  /** The archetype for the title text color */
  titleArchetype?: Archetype | 'default' | 'muted';
  /** The archetype for the description text color */
  descriptionArchetype?: Archetype | 'default' | 'muted';
  /** Background color class for the section (e.g., 'bg-slate-900', 'bg-[#0D1117]') */
  bgColorClass?: string;
  /** Additional CSS classes for the section element */
  className?: string;
  /** The content specific to this section */
  children: ReactNode;
}

/**
 * A generic component to create a standard section layout with title, description,
 * and content area.
 * 
 * @param {SectionProps} props - The component props
 * @returns {JSX.Element} The section component
 */
const Section: React.FC<SectionProps> = ({
  id,
  title,
  description,
  titleArchetype = 'default',
  descriptionArchetype = 'muted',
  bgColorClass = 'bg-[#0D1117]', // Changed default background
  className = '',
  children,
}) => {
  return (
    <section className={`${bgColorClass} py-10 ${className}`} id={id}>
      <div className="container mx-auto px-4">
        {/* Section Header Wrapper - Steam HUD Style */}
        <div className="bg-slate-700 bg-opacity-30 p-4 rounded-lg mb-6">
          <Typography 
            variant="h3"
            id={`${id}-title`} 
            className="mb-3"
            archetype={titleArchetype}
          >
            {title}
          </Typography>
          <Typography
            variant="body-lg"
            archetype={descriptionArchetype}
            className="max-w-3xl"
          >
            {description}
          </Typography>
        </div>
        
        {/* Section Content */}
        <div className="mt-6">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section; 