import { useState, useEffect } from 'react';
import { Page, BlogPost, Project } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import ResumePage from './pages/Resume';
import Contact from './pages/Contact';
import { loadBlogPosts, loadProjects } from './utils/content-loader';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [posts, projectsList] = await Promise.all([
          loadBlogPosts(),
          loadProjects()
        ]);
        setBlogPosts(posts);
        setProjects(projectsList);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const [page, id] = hash.split('/');
      if (page) {
        setCurrentPage(page as Page);
        setSelectedItemId(id);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: Page, id?: string) => {
    setCurrentPage(page);
    setSelectedItemId(id);
    window.location.hash = id ? `${page}/${id}` : page;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-2xl font-black">LOADING...</div>
      </div>
    );
  }

  const featuredPosts = blogPosts.filter((post) => post.featured).slice(0, 3);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentPage === 'home' && (
          <Home
            featuredPosts={featuredPosts}
            featuredProjects={featuredProjects}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'blog' && (
          <Blog
            posts={blogPosts}
            projects={projects}
            selectedPostId={selectedItemId}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'projects' && (
          <Projects
            projects={projects}
            selectedProjectId={selectedItemId}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'resume' && <ResumePage />}
        {currentPage === 'contact' && <Contact />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
