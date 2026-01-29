export interface ContentBlock {
  type: 'text' | 'heading' | 'code' | 'diagram' | 'image' | 'callout' | 'divider';
  content: string;
  metadata?: {
    language?: string;
    diagramType?: 'mermaid';
    level?: 2 | 3 | 4;
    calloutType?: 'info' | 'warning' | 'tip' | 'important';
    imageUrl?: string;
    imageAlt?: string;
    caption?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content?: string;
  contentBlocks?: ContentBlock[];
  tags: string[];
  readTime: string;
  featured: boolean;
  relatedProjectIds?: string[];
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  lastUpdated?: string;
  coverImage?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  imageAlt: string;
  featured: boolean;
  longDescription?: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  keyFeatures?: string[];
  projectType?: 'personal' | 'work';
  documentationUrl?: string;
  diagramType?: 'mermaid' | 'image';
  diagramContent?: string;
  diagramImageUrl?: string;
  diagramLabel?: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  availability: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  database: string[];
  devops: string[];
  observability: string[];
  security: string[];
  testing: string[];
  tools: string[];
  architecture: string[];
  cloud: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  responsibilities: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Resume {
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
}

export type Page = 'home' | 'blog' | 'projects' | 'resume' | 'contact';
