# State Management Patterns

**Generated:** 2026-01-29
**Project:** jaysingh.dev

## Overview

The application uses React's built-in `useState` and `useEffect` hooks for state management. No external state management library is used.

## Application State (App.tsx)

```typescript
// Navigation state
const [currentPage, setCurrentPage] = useState<Page>('home');
const [selectedItemId, setSelectedItemId] = useState<string | undefined>();

// Content state
const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
const [projects, setProjects] = useState<Project[]>([]);
const [loading, setLoading] = useState(true);
```

### State Flow

```
┌─────────────────────────────────────────────────────────────┐
│ App Component                                                │
├─────────────────────────────────────────────────────────────┤
│ State:                                                       │
│ • currentPage: 'home' | 'blog' | 'projects' | 'resume' | 'contact'
│ • selectedItemId: string | undefined                         │
│ • blogPosts: BlogPost[]                                      │
│ • projects: Project[]                                        │
│ • loading: boolean                                           │
├─────────────────────────────────────────────────────────────┤
│ Effects:                                                     │
│ • On mount: Load content from JSON files                     │
│ • On hash change: Update currentPage and selectedItemId      │
├─────────────────────────────────────────────────────────────┤
│ Handlers:                                                    │
│ • handleNavigate(page, id?) → Update state + URL hash        │
└─────────────────────────────────────────────────────────────┘
         │
         ▼ Props passed down
┌─────────────────────────────────────────────────────────────┐
│ Page Components                                              │
│ • Receive: data arrays, selectedId, onNavigate callback      │
│ • No local persistent state (UI-only state like filters)     │
└─────────────────────────────────────────────────────────────┘
```

## Local Component State

### Projects.tsx - Filter State
```typescript
const [activeFilter, setActiveFilter] = useState<FilterType>('all');
// Filter options: 'all' | 'personal' | 'work' | 'github' | 'docs' | 'diagrams'
```

### BlogDetail.tsx - UI State
```typescript
const [activeSection, setActiveSection] = useState<string>('');
const [scrollPercentage, setScrollPercentage] = useState<number>(0);
```

### ProjectDetail.tsx - UI State
```typescript
const [activeSection, setActiveSection] = useState<string>('overview');
```

### MermaidDiagram.tsx - Viewer State
```typescript
const [showFullscreen, setShowFullscreen] = useState(false);
const [copied, setCopied] = useState(false);
const [zoom, setZoom] = useState(100);
const [pan, setPan] = useState({ x: 0, y: 0 });
const [isDragging, setIsDragging] = useState(false);
const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
```

### CodeBlock.tsx - UI State
```typescript
const [copied, setCopied] = useState(false);
```

### Contact.tsx - Form State
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: '',
});
const [showSuccess, setShowSuccess] = useState(false);
```

## Data Loading Pattern

```typescript
// Content loader utility: src/utils/content-loader.ts

// Fetch from static JSON (build-time generated)
export async function loadBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch('/blog-posts.json');
  return response.json();
}

export async function loadProjects(): Promise<Project[]> {
  const response = await fetch('/projects.json');
  return response.json();
}

// Import JSON directly (bundled)
import resumeData from '../data/resume.json';
import skillsData from '../data/skills.json';
import profileData from '../data/profile.json';
```

## URL Synchronization

```typescript
// Hash-based routing sync
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1); // Remove '#'
    const [page, id] = hash.split('/');
    if (page) {
      setCurrentPage(page as Page);
      setSelectedItemId(id);
    }
  };

  handleHashChange(); // Initial load
  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}, []);
```

## Migration Notes for 11ty

| React Pattern | 11ty Equivalent |
|--------------|-----------------|
| `useState` for navigation | File-based routing (no JS needed) |
| `useState` for content | 11ty data cascade (build-time) |
| `useState` for filters | Client-side JS or URL params |
| `useState` for UI | Client-side JS (keep) |
| `useEffect` for data loading | 11ty collections (build-time) |
| `useEffect` for scroll tracking | Vanilla JS (keep) |
| Hash-based routing | Clean URLs (11ty default) |
