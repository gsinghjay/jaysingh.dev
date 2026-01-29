import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const contentDir = path.join(projectRoot, 'content');
const publicDir = path.join(projectRoot, 'public');

function convertMarkdownToContentBlocks(markdown) {
  const blocks = [];
  const lines = markdown.split('\n');
  let currentBlock = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```mermaid')) {
      let mermaidContent = '';
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        mermaidContent += lines[i] + '\n';
        i++;
      }
      blocks.push({
        type: 'diagram',
        content: mermaidContent.trim(),
        metadata: { diagramType: 'mermaid' }
      });
      continue;
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim() || 'text';
      let codeContent = '';
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeContent += lines[i] + '\n';
        i++;
      }
      blocks.push({
        type: 'code',
        content: codeContent.trimEnd(),
        metadata: { language }
      });
      continue;
    }

    if (line.startsWith('![') && line.includes('](')) {
      const match = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        blocks.push({
          type: 'image',
          content: match[2],
          metadata: { alt: match[1] }
        });
        continue;
      }
    }

    if (line.startsWith('> ')) {
      if (!currentBlock || currentBlock.type !== 'callout') {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = {
          type: 'callout',
          content: line.slice(2) + '\n',
          metadata: {}
        };
      } else {
        currentBlock.content += line.slice(2) + '\n';
      }
      continue;
    }

    if (line.trim() === '' && currentBlock?.type === 'callout') {
      blocks.push(currentBlock);
      currentBlock = null;
      continue;
    }

    if (!currentBlock || currentBlock.type !== 'text') {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = {
        type: 'text',
        content: line + '\n',
        metadata: {}
      };
    } else {
      currentBlock.content += line + '\n';
    }
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return blocks;
}

function processBlogPosts() {
  const blogDir = path.join(contentDir, 'blog');
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  const posts = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
    const { data, content: markdown } = matter(content);

    const contentBlocks = convertMarkdownToContentBlocks(markdown);

    posts.push({
      id: data.id,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      tags: data.tags || [],
      readTime: data.readTime,
      featured: data.featured || false,
      relatedProjectIds: data.relatedProjectIds || [],
      contentBlocks,
      content: markdown
    });
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(
    path.join(publicDir, 'blog-posts.json'),
    JSON.stringify(posts, null, 2)
  );

  console.log(`✓ Processed ${posts.length} blog posts`);
}

function processProjects() {
  const projectsDir = path.join(contentDir, 'projects');
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));
  const projects = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(projectsDir, file), 'utf8');
    const { data, content: markdown } = matter(content);

    const sections = markdown.split('## ');
    let longDescription = '';
    let challenge = '';
    let solution = '';
    let impact = '';

    sections.forEach(section => {
      const trimmed = section.trim();
      if (trimmed.startsWith('Challenge')) {
        challenge = trimmed.replace('Challenge', '').trim();
      } else if (trimmed.startsWith('Solution')) {
        solution = trimmed.replace('Solution', '').trim();
      } else if (trimmed.startsWith('Impact')) {
        impact = trimmed.replace('Impact', '').trim();
      } else if (trimmed && !trimmed.startsWith('Challenge') && !trimmed.startsWith('Solution') && !trimmed.startsWith('Impact')) {
        longDescription = trimmed;
      }
    });

    projects.push({
      id: data.id,
      title: data.title,
      description: data.description,
      technologies: data.technologies || [],
      liveUrl: data.liveUrl || null,
      githubUrl: data.githubUrl || null,
      imageAlt: data.imageAlt,
      featured: data.featured || false,
      projectType: data.projectType || 'personal',
      diagramType: data.diagramType,
      diagramContent: data.diagramContent,
      diagramImageUrl: data.diagramImageUrl,
      diagramLabel: data.diagramLabel,
      longDescription,
      challenge,
      solution,
      impact,
      keyFeatures: data.keyFeatures || []
    });
  }

  fs.writeFileSync(
    path.join(publicDir, 'projects.json'),
    JSON.stringify(projects, null, 2)
  );

  console.log(`✓ Processed ${projects.length} projects`);
}

console.log('Building content...');
processBlogPosts();
processProjects();
console.log('✓ Content build complete');
