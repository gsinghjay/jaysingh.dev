import yaml from 'js-yaml';
import type { BlogPost, Project, Profile, Resume, Skills } from '../types';

export async function loadBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch('/blog-posts.json');
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export async function loadProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/projects.json');
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

export async function loadYamlConfig<T>(filename: string): Promise<T> {
  try {
    const response = await fetch(`/content/config/${filename}`);
    const text = await response.text();
    return yaml.load(text) as T;
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    throw error;
  }
}

export async function loadProfile(): Promise<Profile> {
  return loadYamlConfig<Profile>('profile.yaml');
}

export async function loadResume(): Promise<Resume> {
  return loadYamlConfig<Resume>('resume.yaml');
}

export async function loadSkills(): Promise<Skills> {
  return loadYamlConfig<Skills>('skills.yaml');
}
