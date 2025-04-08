import React from 'react';
import { Server, Code2, Cloud, Database, Terminal, Brain, Settings, Book, Linkedin, Github, Network } from 'lucide-react';
import { ThemeColor } from '../utils/colorUtils';
import { IntensityLevel } from '../utils/intensityUtils';

// --- Common Interfaces ---

interface ContentSection {
  id: string;
  title: string;
  description: string;
}

interface CardItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  tags?: string[];
  themeColor: ThemeColor;
  intensityLevel?: IntensityLevel;
}

// --- Hero ---

export interface HeroData {
  title: string;
  description: string;
  tags: string[];
  primaryThemeColor: ThemeColor;
  intensityLevel?: IntensityLevel;
}

export const heroData: HeroData = {
  title: 'Building Systems, Driving Innovation',
  description: 'A journey through tech entrepreneurship, system administration, and web development. Currently pursuing Information Technology while building the future with AI.',
  tags: ['Full Stack Developer', 'Systems Engineer', 'Tech Entrepreneur'],
  primaryThemeColor: 'primary',
  intensityLevel: 2
};

// --- Journey ---

export interface JourneyStage extends CardItem {
  year?: string;
  keySkills?: string[];
  isCurrent?: boolean;
}

export interface JourneyData extends ContentSection {
  stages: JourneyStage[];
  showTransitions?: boolean;
}

export const journeyData: JourneyData = {
  id: 'journey',
  title: 'My Technical Journey',
  description: 'My path has been one of continuous expansion—from gaming communities to enterprise systems, each step building upon previous foundations while creating new capabilities.',
  stages: [
    {
      title: 'Early Passion (Age 8-10)',
      description: 'Started with gaming communities, learning web hosting basics through cPanel, MySQL, and phpMyAdmin. Built and managed community forums using vBulletin and XenForo.',
      themeColor: 'primary',
      intensityLevel: 2,
      year: '2003-2005',
      keySkills: ['Basic Linux', 'cPanel', 'MySQL', 'Community Management', 'Basic Networking']
    },
    {
      title: 'Server Hosting (Age 10-16)',
      description: 'Progressed to VPS management, running game servers (TF2, Counter-Strike) and web services. Mastered Linux (CentOS, Debian), Apache, SSH, and server security.',
      themeColor: 'primary',
      intensityLevel: 2,
      year: '2005-2010',
      keySkills: ['Linux Administration', 'Apache/Nginx', 'Network Security', 'Virtualization']
    },
    {
      title: 'Entrepreneurship (Age 16-20)',
      description: 'Founded Simple Server Hosting, LLC. Built and managed 1U/2U servers in Chicago data centers. Handled everything from hardware procurement to client management.',
      themeColor: 'primary',
      intensityLevel: 2,
      year: '2010-2014',
      keySkills: ['Business Operations', 'Hardware Management', 'Client Relations', 'System Architecture']
    },
    {
      title: 'Professional Growth',
      description: 'Transitioned through retail management to IT support. Currently pursuing Information Technology while developing web applications and automation solutions.',
      themeColor: 'primary',
      intensityLevel: 2,
      year: '2014-Present',
      keySkills: ['Containerization', 'CI/CD Pipelines', 'Cloud Infrastructure', 'System Design'],
      isCurrent: true
    }
  ],
  showTransitions: true
};

// --- Expertise ---

export interface ExpertiseArea extends CardItem {
  skills: string[];
}

export interface ExpertiseData extends ContentSection {
  areas: ExpertiseArea[];
}

export const expertiseData: ExpertiseData = {
  id: 'expertise',
  title: 'Technical Expertise',
  description: 'Building complex systems requires both breadth of knowledge and depth of specialization. My expertise spans infrastructure management to application development, with particular focus on automation and integration.',
  areas: [
    {
      title: 'Infrastructure Architecture',
      description: '', // Description seems unused in the original component for areas
      icon: <Server className="w-12 h-12 text-white mb-6" aria-hidden="true" />,
      skills: [
        'Linux (CentOS, Debian, Ubuntu)',
        'Virtualization (OpenVZ, KVM, Proxmox)',
        'Network Configuration & Security',
        'High-Availability System Design'
      ],
      themeColor: 'primary',
      intensityLevel: 2
    },
    {
      title: 'Development & Integration',
      description: '',
      icon: <Code2 className="w-12 h-12 text-white mb-6" aria-hidden="true" />,
      skills: [
        'Full Stack Web Development',
        'API Design & Implementation',
        'Database Optimization',
        'JAMstack Architecture'
      ],
      themeColor: 'primary',
      intensityLevel: 2
    },
    {
      title: 'DevOps & Automation',
      description: '',
      icon: <Cloud className="w-12 h-12 text-white mb-6" aria-hidden="true" />,
      skills: [
        'CI/CD Pipeline Implementation',
        'Container Orchestration',
        'Infrastructure as Code',
        'Monitoring & Observability'
      ],
      themeColor: 'primary',
      intensityLevel: 2
    }
  ]
};

// --- Projects ---

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project extends CardItem {
  stats?: ProjectStat[];
}

export interface ProjectsData extends ContentSection {
  completedProjects: Project[];
  inDevelopmentProjects: Project[];
}

export const projectsData: ProjectsData = {
  id: 'projects',
  title: 'System Building & Architecture',
  description: 'I don\'t just use technology—I build comprehensive systems that solve complex problems. My projects demonstrate the ability to architect solutions from infrastructure to user experience.',
  completedProjects: [
    {
      title: 'Simple Server Hosting, LLC',
      description: 'Built and scaled a successful hosting company from the ground up, managing all technical infrastructure and business operations before successful acquisition.',
      icon: <Server className="w-12 h-12 text-white mb-6" />,
      tags: ['Virtualization', 'Business Development', 'Client Management'],
      themeColor: 'primary',
      intensityLevel: 2,
      stats: [
        { value: '130+', label: 'Clients' },
        { value: '100+', label: 'Servers' },
        { value: '3', label: 'Data Centers' }
      ]
    },
    {
      title: 'Gaming Communities',
      description: 'Built and managed multiple gaming communities with custom web interfaces, game servers, and donation systems.',
      icon: <Terminal className="w-12 h-12 text-white mb-6" />,
      tags: ['Community', 'Development', 'Gaming'],
      themeColor: 'primary',
      intensityLevel: 2,
      stats: [
        { value: '5', label: 'Locations' },
        { value: '2000+', label: 'Concurrent Players' },
        { value: '1M+', label: 'Players Tracked' }
      ]
    }
  ],
  inDevelopmentProjects: [
    {
      title: 'Containerized Application Platform',
      description: 'Building containerized web applications with Flask and FastAPI, creating modular components that can be deployed and scaled independently while maintaining consistent development environments.',
      icon: <Database className="w-12 h-12 text-white mb-6" />,
      tags: ['Docker', 'Kubernetes', 'Python'],
      themeColor: 'primary',
      intensityLevel: 2
    },
    {
      title: 'QA Automation Framework',
      description: 'Developing comprehensive testing architecture with pytest and playwright, creating automated validation of complex application behavior with detailed reporting and CI/CD integration.',
      icon: <Terminal className="w-12 h-12 text-white mb-6" />,
      tags: ['Python', 'Testing', 'Automation'],
      themeColor: 'primary',
      intensityLevel: 2
    }
  ]
};

// --- Homelab ---

export type TechSection = CardItem;

export interface HomelabData extends ContentSection {
  sections: TechSection[];
}

export const homelabData: HomelabData = {
  id: 'homelab',
  title: 'Technical Playground',
  description: 'My homelab serves as both practical infrastructure and an experimental environment for testing cutting-edge technologies before implementing them professionally. The entire environment is defined as code, enabling rapid reconstruction if needed.',
  sections: [
    {
      title: 'Virtualization',
      description: 'Proxmox hypervisor cluster with N+1 redundancy, running both KVM virtual machines and LXC containers with centralized storage backed by ZFS for data integrity.',
      icon: <Server className="w-12 h-12 text-white mb-6" aria-hidden="true" />,
      tags: ['Proxmox', 'ZFS', 'Clustering'],
      themeColor: 'primary',
      intensityLevel: 2
    },
    {
      title: 'Container Orchestration',
      description: 'Lightweight Kubernetes cluster (K3s) with declarative application deployment through GitOps principles, enabling production-like experimentation.',
      icon: <Cloud className="w-12 h-12 text-white mb-6" aria-hidden="true" />,
      tags: ['Kubernetes', 'GitOps', 'ArgoCD'],
      themeColor: 'primary',
      intensityLevel: 2
    },
    {
      title: 'Observability Stack',
      description: 'Comprehensive monitoring with Prometheus for metrics, Loki for logs, and Grafana for visualization, implementing SRE best practices.',
      icon: <Network className="w-12 h-12 text-white mb-6" aria-hidden="true" />,
      tags: ['Prometheus', 'Grafana', 'Alerting'],
      themeColor: 'primary',
      intensityLevel: 2
    }
  ]
};

// --- Future ---

export type FutureGoal = CardItem;

export interface FutureData extends ContentSection {
  goals: FutureGoal[];
}

export const futureData: FutureData = {
  id: 'future',
  title: 'Future Aspirations',
  description: 'My path forward integrates formal education with practical application, focusing on emerging technologies while building upon established foundations.',
  goals: [
    {
      title: 'AI Engineering',
      description: 'Pursuing expertise in AI product development and integration. Focus on practical applications and business solutions.',
      icon: <Brain className="w-12 h-12 text-white mb-6" aria-hidden="true" />,
      themeColor: 'primary',
      intensityLevel: 2
    },
    {
      title: 'Career Transition',
      description: 'Moving from retail to full-time tech, focusing on DevOps and AI engineering roles while completing my degree.',
      icon: <Settings className="w-12 h-12 text-white mb-6" aria-hidden="true" />,
      themeColor: 'primary',
      intensityLevel: 2
    },
    {
      title: 'Education',
      description: 'Completing B.S. in Information Technology at NJIT. Pursuing additional certifications in AI and cloud technologies.',
      icon: <Book className="w-12 h-12 text-white mb-6" aria-hidden="true" />,
      themeColor: 'primary',
      intensityLevel: 2
    }
  ]
};

// --- Contact ---

export interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

export interface ContactData extends ContentSection {
  connectDescription: string;
  socialLinks: SocialLink[];
  email: string;
  primaryThemeColor: ThemeColor;
}

export const contactData: ContactData = {
  id: 'contact',
  title: "Let's Connect",
  description: "I'm open to collaboration and knowledge exchange in DevOps, AI engineering, and system architecture. Whether you're interested in discussing technical challenges or exploring potential partnerships, I'd welcome the conversation.",
  connectDescription: "Looking for opportunities to apply my technical expertise in DevOps and system architecture. Open to collaboration and knowledge exchange with experienced professionals.",
  socialLinks: [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/jaysinghdev',
      icon: <Linkedin size={20} className="mr-2 text-white" aria-hidden="true" />
    },
    {
      name: 'GitHub',
      url: 'https://github.com/jaysinghdev',
      icon: <Github size={20} className="mr-2 text-white" aria-hidden="true" />
    }
  ],
  email: 'contact@jaysingh.dev',
  primaryThemeColor: 'primary'
};


// --- Navigation ---
export interface NavLink {
  href: string;
  label: string;
  className?: string;
}

// This needs getThemeColor, so might be better defined near Navigation or passed in
// For now, define structure here
export const navLinksData: Omit<NavLink, 'className'>[] = [
  { href: "#journey", label: "Journey" },
  { href: "#expertise", label: "Expertise" },
  { href: "#projects", label: "Projects" },
  { href: "#homelab", label: "Homelab" },
  { href: "#future", label: "Future" },
  { href: "#contact", label: "Contact" },
  { href: "/typography", label: "Typography" } // Highlight handled in Navigation component
]; 