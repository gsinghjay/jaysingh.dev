import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BlogPost, Project, Page, ContentBlock as ContentBlockType } from '../types';
import Tag from './Tag';
import Card from './Card';
import ContentBlock from './ContentBlock';
import ReadingProgress from './ReadingProgress';
import SocialShare from './SocialShare';
import RelatedProjects from './RelatedProjects';

interface BlogDetailProps {
  post: BlogPost;
  projects: Project[];
  onBack: () => void;
  onNavigate: (page: Page, id?: string) => void;
}

const getCategoryFromTags = (tags: string[]): string => {
  if (tags.some(t => t.toLowerCase().includes('opinion'))) return 'OPINION';
  if (tags.some(t => t.toLowerCase().includes('technical'))) return 'TECHNICAL';
  if (tags.some(t => t.toLowerCase().includes('tutorial'))) return 'TUTORIAL';
  return 'GENERAL';
};

export default function BlogDetail({ post, projects, onBack, onNavigate }: BlogDetailProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  const contentBlocks = post.contentBlocks || [];
  const headings = contentBlocks
    .filter((block) => block.type === 'heading')
    .map((block) => ({
      id: block.content.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      label: block.content,
      level: block.metadata?.level || 2,
    }));

  const relatedProjects = post.relatedProjectIds
    ? projects.filter((p) => post.relatedProjectIds?.includes(p.id))
    : [];

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((heading) => ({
        id: heading.id,
        element: document.getElementById(heading.id),
      }));

      const currentHeading = headingElements.find(({ element }) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (currentHeading) {
        setActiveSection(currentHeading.id);
      }

      // Calculate scroll percentage
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const percentage = scrollableHeight > 0 ? Math.round((scrollTop / scrollableHeight) * 100) : 0;
      setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

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

  const renderLegacyContent = () => {
    if (!post.content) return null;
    return post.content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="text-lg leading-relaxed text-neutral-700 mb-6">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="min-h-screen bg-cream py-16">
      <ReadingProgress />
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
          BACK TO POSTS
        </button>

        <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-8">
          <div className="lg:col-start-1">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <Tag variant="category">{getCategoryFromTags(post.tags)}</Tag>
                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <span>{post.date}</span>
                  {post.lastUpdated && post.lastUpdated !== post.date && (
                    <span>Updated: {post.lastUpdated}</span>
                  )}
                  <span className="font-bold">{post.readTime}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black mb-6">
                {post.title.split(' ').map((word, i) => {
                  if (i === 0) {
                    return (
                      <span key={i}>
                        <span className="bg-pink-400">{word}</span>{' '}
                      </span>
                    );
                  }
                  return word + ' ';
                })}
              </h1>

              {post.author && (
                <div className="flex items-center gap-3 mb-6 p-4 bg-white border-4 border-black" style={{ boxShadow: '4px 4px 0 #000' }}>
                  {post.author.avatar && (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 border-2 border-black"
                    />
                  )}
                  <div>
                    <p className="font-bold">{post.author.name}</p>
                    {post.author.bio && (
                      <p className="text-sm text-neutral-600">{post.author.bio}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>

            <Card size="lg">
              <div className="prose max-w-none">
                {contentBlocks.length > 0
                  ? contentBlocks.map((block, index) => (
                      <ContentBlock key={index} block={block} index={index} />
                    ))
                  : renderLegacyContent()}
              </div>
            </Card>

            <div className="mt-8">
              <SocialShare title={post.title} />
            </div>

            {relatedProjects.length > 0 && (
              <RelatedProjects projects={relatedProjects} onNavigate={onNavigate} />
            )}

            <div className="mt-12 flex justify-center">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white border-4 border-black font-bold uppercase text-sm hover:bg-pink-400 hover:text-black transition-all duration-150 active:translate-y-1"
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
                BACK TO ALL POSTS
              </button>
            </div>
          </div>

          {headings.length > 0 && (
            <aside className="hidden lg:block lg:col-start-2">
              <div className="sticky top-24">
                <div className="bg-white border-4 border-black p-4" style={{ boxShadow: '6px 6px 0 #000' }}>
                  <div className="mb-4">
                    <h3 className="text-sm font-black uppercase bg-pink-400 inline-block px-2 py-1">
                      TABLE OF CONTENTS
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-600">PROGRESS</span>
                      <span className="text-lg font-black text-black">{scrollPercentage}%</span>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-2">
                      {headings.map((heading) => (
                        <li key={heading.id}>
                          <button
                            onClick={() => scrollToSection(heading.id)}
                            className={`text-left w-full py-2 text-sm font-bold uppercase border-2 border-black transition-all duration-150 ${
                              activeSection === heading.id
                                ? 'bg-pink-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                : 'bg-white hover:bg-gray-100'
                            }`}
                            style={{ paddingLeft: `${12 + (heading.level - 2) * 8}px`, paddingRight: '12px' }}
                          >
                            {heading.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
