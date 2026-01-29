import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Project, Page } from '../types';
import Tag from './Tag';
import Card from './Card';
import MermaidDiagram from './MermaidDiagram';
import DiagramImage from './DiagramImage';
import DocumentDownload from './DocumentDownload';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onNavigate?: (page: Page, id?: string) => void;
}

export default function ProjectDetail({ project, onBack, onNavigate }: ProjectDetailProps) {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const sections = [
    { id: 'overview', label: 'Overview', show: true },
    { id: 'diagram', label: 'Architecture', show: !!(project.diagramContent || project.diagramImageUrl) },
    { id: 'challenge', label: 'Challenge', show: !!project.challenge },
    { id: 'solution', label: 'Solution', show: !!project.solution },
    { id: 'impact', label: 'Impact', show: !!project.impact },
    { id: 'features', label: 'Key Features', show: !!(project.keyFeatures && project.keyFeatures.length > 0) },
  ].filter(section => section.show);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="max-w-6xl mx-auto px-6 relative">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white border-4 border-black font-bold uppercase text-sm hover:bg-lime-300 transition-all duration-150 active:translate-y-1 mb-8"
          style={{ boxShadow: '6px 6px 0 #000' }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = '3px 3px 0 #000';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = '6px 6px 0 #000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '6px 6px 0 #000';
          }}
        >
          <ArrowLeft size={20} />
          BACK TO PROJECTS
        </button>

        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
          <div className="lg:col-start-1">

        <div className="mb-8">
          <p className="text-neutral-500 font-bold text-sm uppercase mb-2">
            PROJECT {project.id.split('-').map((_, i) => String(i + 1).padStart(2, '0')).join('')}
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {project.title.split(' ').map((word, i) => {
              if (i === 0) {
                return (
                  <span key={i}>
                    <span className="bg-lime-400">{word}</span>{' '}
                  </span>
                );
              }
              return word + ' ';
            })}
          </h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
          {(project.githubUrl || project.liveUrl || project.documentationUrl) && (
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white border-4 border-black font-bold uppercase text-sm hover:bg-lime-400 hover:text-black transition-all duration-150"
                  style={{ boxShadow: '4px 4px 0 #000' }}
                >
                  <Github size={20} />
                  VIEW CODE
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black border-4 border-black font-bold uppercase text-sm hover:bg-lime-400 transition-all duration-150"
                  style={{ boxShadow: '4px 4px 0 #000' }}
                >
                  <ExternalLink size={20} />
                  LIVE DEMO
                </a>
              )}
              {project.documentationUrl && (
                <DocumentDownload url={project.documentationUrl} />
              )}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div id="overview" className="scroll-mt-24">
            <Card>
              <h2 className="text-2xl font-black mb-4 uppercase">Overview</h2>
              <p className="text-lg leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </Card>
          </div>

          {(project.diagramContent || project.diagramImageUrl) && (
            <div id="diagram" className="scroll-mt-24">
              {project.diagramType === 'mermaid' && project.diagramContent && (
                <MermaidDiagram content={project.diagramContent} label={project.diagramLabel} />
              )}
              {project.diagramType === 'image' && project.diagramImageUrl && (
                <DiagramImage
                  src={project.diagramImageUrl}
                  alt={project.imageAlt}
                  label={project.diagramLabel}
                />
              )}
            </div>
          )}

          {project.challenge && (
            <div id="challenge" className="scroll-mt-24">
              <Card className="border-red-400">
                <h2 className="text-2xl font-black mb-4 uppercase bg-red-400 inline-block px-2">
                  Challenge
                </h2>
                <p className="text-lg leading-relaxed">{project.challenge}</p>
              </Card>
            </div>
          )}

          {project.solution && (
            <div id="solution" className="scroll-mt-24">
              <Card className="border-blue-400">
                <h2 className="text-2xl font-black mb-4 uppercase bg-blue-400 inline-block px-2">
                  Solution
                </h2>
                <p className="text-lg leading-relaxed">{project.solution}</p>
              </Card>
            </div>
          )}

          {project.impact && (
            <div id="impact" className="scroll-mt-24">
              <Card className="border-lime-400">
                <h2 className="text-2xl font-black mb-4 uppercase bg-lime-400 inline-block px-2">
                  Impact
                </h2>
                <p className="text-lg leading-relaxed">{project.impact}</p>
              </Card>
            </div>
          )}

          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div id="features" className="scroll-mt-24">
              <Card className="border-yellow-400">
                <h2 className="text-2xl font-black mb-4 uppercase bg-yellow-400 inline-block px-2">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.keyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-black text-white px-2 py-1 font-bold text-xs mt-1">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-lg leading-relaxed flex-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white border-4 border-black font-bold uppercase text-sm hover:bg-lime-400 hover:text-black transition-all duration-150 active:translate-y-1"
            style={{ boxShadow: '6px 6px 0 #000' }}
            onMouseDown={(e) => {
              e.currentTarget.style.boxShadow = '3px 3px 0 #000';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.boxShadow = '6px 6px 0 #000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '6px 6px 0 #000';
            }}
          >
            <ArrowLeft size={20} />
            BACK TO ALL PROJECTS
          </button>
        </div>
          </div>

          <aside className="hidden lg:block lg:col-start-2">
            <div className="sticky top-24">
              <div className="bg-white border-4 border-black p-4" style={{ boxShadow: '6px 6px 0 #000' }}>
                <h3 className="text-sm font-black uppercase mb-4 bg-lime-400 inline-block px-2 py-1">
                  TABLE OF CONTENTS
                </h3>
                <nav>
                  <ul className="space-y-2">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => scrollToSection(section.id)}
                          className={`text-left w-full px-3 py-2 text-sm font-bold uppercase border-2 border-black transition-all duration-150 ${
                            activeSection === section.id
                              ? 'bg-lime-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                              : 'bg-white hover:bg-gray-100'
                          }`}
                        >
                          {section.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
