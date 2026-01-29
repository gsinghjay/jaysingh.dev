import { ExternalLink } from 'lucide-react';
import { Project, Page } from '../types';
import Tag from './Tag';
import Card from './Card';

interface RelatedProjectsProps {
  projects: Project[];
  onNavigate: (page: Page, id?: string) => void;
}

export default function RelatedProjects({ projects, onNavigate }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-black uppercase mb-6">
        <span className="bg-pink-400 px-2">Related Projects</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            onClick={() => onNavigate('projects', project.id)}
          >
            <h3 className="text-xl font-black mb-3 hover:text-pink-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
              {project.technologies.length > 4 && (
                <Tag>+{project.technologies.length - 4}</Tag>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2 font-bold text-sm text-black">
              VIEW PROJECT <ExternalLink size={16} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
