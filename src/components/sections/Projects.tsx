import React, { useState } from 'react';
import Section from '../layout/Section';
import ProjectCard from '../ui/ProjectCard';
import { ProjectsData, Project } from '../../data/portfolioData';
import { getThemeColorClass } from '../../utils/colorUtils'; // For tab styling
import { getOpacityByIntensity } from '../../utils/intensityUtils'; // For intensity level

interface ProjectsProps {
  data: ProjectsData;
}

/**
 * Renders the Projects section with tabs for completed and in-development projects.
 * 
 * @param {ProjectsProps} props - The component props containing projects data.
 * @returns {JSX.Element} The Projects section component.
 */
const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'completed' | 'development'>('completed');

  /**
   * Get narrative signal based on project type
   * @param isCompleted Whether the project is completed or in development
   * @returns The appropriate narrative signal
   */
  const getProjectNarrativeSignal = (isCompleted: boolean): 'achievement' | 'future' => {
    return isCompleted ? 'achievement' : 'future';
  };

  /**
   * Get button classes for tab styling
   * @param isActive Whether the tab is active
   * @returns CSS classes for tab button
   */
  const getTabButtonClass = (isActive: boolean): string => {
    // Using 'primary' theme color for active tab styling with correct intensity level
    if (isActive) {
      const colorClass = getThemeColorClass('primary');
      const intensityClass = getOpacityByIntensity(2); // Use intensity level 2 to match the rest of the components
      return `px-6 py-2 bg-${colorClass} ${intensityClass} text-white`;
    }
    return 'px-6 py-2 bg-slate-800 text-gray-300';
  };

  const renderProjectList = (projects: Project[], isCompleted: boolean, panelId: string) => (
    <div 
      id={panelId}
      role="tabpanel"
      aria-labelledby={`tab-${isCompleted ? 'completed' : 'development'}`}
      hidden={activeTab !== (isCompleted ? 'completed' : 'development')}
    >
      {activeTab === (isCompleted ? 'completed' : 'development') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              icon={project.icon}
              tags={project.tags || []}
              stats={project.stats}
              themeColor={project.themeColor}
              intensityLevel={project.intensityLevel}
              ariaLabelledById={`project-${isCompleted ? 'completed' : 'development'}-${index}`}
              titleNarrativeSignal={getProjectNarrativeSignal(isCompleted)}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Section
      id={data.id}
      title={data.title}
      description={data.description}
      // Uses default background bg-slate-900
    >
      {/* Project Navigation - Accessible Tabs */}
      <div role="tablist" aria-label="Project categories" className="flex mb-8">
        <button 
          role="tab"
          id="tab-completed"
          aria-selected={activeTab === 'completed'}
          aria-controls="panel-completed"
          className={getTabButtonClass(activeTab === 'completed')}
          onClick={() => setActiveTab('completed')}
        >
          Completed Projects
        </button>
        <button 
          role="tab"
          id="tab-development"
          aria-selected={activeTab === 'development'}
          aria-controls="panel-development"
          className={getTabButtonClass(activeTab === 'development')}
          onClick={() => setActiveTab('development')}
        >
          In Development
        </button>
      </div>

      {/* Tab Panels */}
      {renderProjectList(data.completedProjects, true, 'panel-completed')}
      {renderProjectList(data.inDevelopmentProjects, false, 'panel-development')}

    </Section>
  );
};

export default Projects;
