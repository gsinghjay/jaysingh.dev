import Card from '../components/Card';
import Tag from '../components/Tag';
import BlogDetail from '../components/BlogDetail';
import { BlogPost, Project, Page } from '../types';

interface BlogProps {
  posts: BlogPost[];
  projects: Project[];
  selectedPostId?: string;
  onNavigate: (page: Page, id?: string) => void;
}

const getCategoryFromTags = (tags: string[]): string => {
  if (tags.some(t => t.toLowerCase().includes('opinion'))) return 'OPINION';
  if (tags.some(t => t.toLowerCase().includes('technical'))) return 'TECHNICAL';
  if (tags.some(t => t.toLowerCase().includes('tutorial'))) return 'TUTORIAL';
  return 'GENERAL';
};

export default function Blog({ posts, projects, selectedPostId, onNavigate }: BlogProps) {
  const selectedPost = posts.find((post) => post.id === selectedPostId);

  if (selectedPost) {
    return (
      <BlogDetail
        post={selectedPost}
        projects={projects}
        onBack={() => onNavigate('blog')}
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black mb-12">
        WORDS & <span className="bg-pink-400 px-2">THOUGHTS</span>
      </h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} onClick={() => onNavigate('blog', post.id)}>
            <div className="flex justify-between items-center mb-4">
              <Tag variant="category">{getCategoryFromTags(post.tags)}</Tag>
              <div className="flex items-center gap-4 text-sm text-neutral-500">
                <span>{post.date}</span>
                <span className="font-bold">{post.readTime}</span>
              </div>
            </div>

            <h2 className="text-2xl font-black mb-3 hover:text-pink-600 transition-colors duration-150">
              {post.title}
            </h2>
            <p className="text-base text-neutral-600 mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            <button className="font-bold text-black hover:underline">
              READ MORE →
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
