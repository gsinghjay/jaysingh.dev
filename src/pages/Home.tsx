import Button from '../components/Button';
import Card from '../components/Card';
import Tag from '../components/Tag';
import { BlogPost, Project, Page } from '../types';

interface HomeProps {
  featuredPosts: BlogPost[];
  featuredProjects: Project[];
  onNavigate: (page: Page, id?: string) => void;
}

export default function Home({ featuredPosts, featuredProjects, onNavigate }: HomeProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">
      <Card size="lg">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div
            className="w-32 h-32 flex-shrink-0 bg-lime-400 border-4 border-black flex items-center justify-center text-6xl"
            style={{ boxShadow: '4px 4px 0 #000' }}
          >
            👋
          </div>

          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              I BUILD <span className="bg-yellow-400 px-2">STUFF</span> FOR THE WEB
            </h1>
            <p className="text-lg text-neutral-600 mb-6">
              Full-stack developer. No frameworks religion. Just working software.
            </p>
            <div className="flex flex-wrap gap-2">
              <Tag>React</Tag>
              <Tag>Python</Tag>
              <Tag>PostgreSQL</Tag>
              <Tag>Node</Tag>
              <Tag>TypeScript</Tag>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Button variant="lime" onClick={() => onNavigate('projects')}>
          VIEW WORK
        </Button>
        <Button variant="pink" onClick={() => onNavigate('blog')}>
          READ BLOG
        </Button>
        <Button variant="yellow" onClick={() => onNavigate('contact')}>
          HIRE ME
        </Button>
      </div>

      {featuredPosts.length > 0 && (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <Tag variant="category">LATEST POST</Tag>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span>{featuredPosts[0].date}</span>
              <span className="font-bold">{featuredPosts[0].readTime}</span>
            </div>
          </div>

          <h2
            className="text-2xl font-black mb-3 hover:text-pink-600 cursor-pointer transition-colors duration-150"
            onClick={() => onNavigate('blog', featuredPosts[0].id)}
          >
            {featuredPosts[0].title}
          </h2>
          <p className="text-base text-neutral-600 mb-4 line-clamp-2">
            {featuredPosts[0].excerpt}
          </p>

          <button
            onClick={() => onNavigate('blog', featuredPosts[0].id)}
            className="font-bold text-black hover:underline"
          >
            READ MORE →
          </button>
        </Card>
      )}

      {featuredProjects.length > 0 && (
        <div>
          <h2 className="text-3xl font-black mb-6">
            FEATURED <span className="bg-lime-400 px-2">WORK</span>
          </h2>
          <div className="space-y-6">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <div
                key={project.id}
                onClick={() => onNavigate('projects', project.id)}
                className="cursor-pointer group"
              >
                <Card>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-neutral-500">PROJECT 0{index + 1}</span>
                    <span className="text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      →
                    </span>
                  </div>

                  <h3 className="text-3xl font-black mb-2 group-hover:text-lime-600 transition-colors duration-150">
                    {project.title}
                  </h3>
                  <p className="text-base text-neutral-600 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
