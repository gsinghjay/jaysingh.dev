import { useState } from 'react';
import { Github, FileText, Network } from 'lucide-react';
import Card from '../components/Card';
import Tag from '../components/Tag';
import ProjectDetail from '../components/ProjectDetail';
import { Project, Page } from '../types';

interface ProjectsProps {
  projects: Project[];
  selectedProjectId?: string;
  onNavigate?: (page: Page, id?: string) => void;
}

type FilterType = 'all' | 'personal' | 'work' | 'github' | 'docs' | 'diagrams';

export default function Projects({ projects, selectedProjectId, onNavigate }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId)
    : null;

  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={() => onNavigate?.('projects')}
        onNavigate={onNavigate}
      />
    );
  }

  const handleProjectClick = (projectId: string) => {
    onNavigate?.('projects', projectId);
  };

  const filterProjects = (projects: Project[]) => {
    switch (activeFilter) {
      case 'personal':
        return projects.filter(p => p.projectType === 'personal');
      case 'work':
        return projects.filter(p => p.projectType === 'work');
      case 'github':
        return projects.filter(p => p.githubUrl);
      case 'docs':
        return projects.filter(p => p.documentationUrl);
      case 'diagrams':
        return projects.filter(p => p.diagramContent || p.diagramImageUrl);
      default:
        return projects;
    }
  };

  const filteredProjects = filterProjects(projects);

  const filters = [
    { id: 'all' as FilterType, label: 'ALL PROJECTS' },
    { id: 'personal' as FilterType, label: 'PERSONAL' },
    { id: 'work' as FilterType, label: 'WORK' },
    { id: 'github' as FilterType, label: 'HAS GITHUB' },
    { id: 'docs' as FilterType, label: 'HAS DOCS' },
    { id: 'diagrams' as FilterType, label: 'HAS DIAGRAMS' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-8">
        THINGS I'VE <span className="bg-lime-400 px-2">BUILT</span>
      </h1>

      <div className="flex flex-wrap gap-3 mb-12">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 border-4 border-black font-bold text-sm uppercase transition-all duration-150 ${
              activeFilter === filter.id
                ? 'bg-lime-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredProjects.map((project, index) => (
          <Card
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">PROJECT {String(index + 1).padStart(2, '0')}</span>
                {project.projectType && (
                  <span className={`px-2 py-1 border-2 border-black text-xs font-bold ${
                    project.projectType === 'personal'
                      ? 'bg-pink-300'
                      : 'bg-cyan-300'
                  }`}>
                    {project.projectType.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <div className="bg-black text-white p-1 border-2 border-black" title="GitHub Available">
                      <Github className="w-4 h-4" />
                    </div>
                  )}
                  {project.documentationUrl && (
                    <div className="bg-green-400 p-1 border-2 border-black" title="Documentation Available">
                      <FileText className="w-4 h-4" />
                    </div>
                  )}
                  {(project.diagramContent || project.diagramImageUrl) && (
                    <div className="bg-blue-400 p-1 border-2 border-black" title="Architecture Diagram Available">
                      <Network className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <span className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  →
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-black mb-2 group-hover:text-lime-600 transition-colors duration-150">
              {project.title}
            </h2>
            <p className="text-base text-neutral-600 mb-4 line-clamp-3">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-2xl font-bold text-neutral-500">NO PROJECTS FOUND</p>
          <p className="text-neutral-400 mt-2">Try a different filter</p>
        </div>
      )}
    </div>
  );
}
