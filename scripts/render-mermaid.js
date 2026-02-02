#!/usr/bin/env node
/**
 * Mermaid SVG Generator
 * Scans project content files for mermaid frontmatter and generates SVGs
 * Also scans blog posts for inline ```mermaid code blocks
 *
 * Story 3.3: Implement Mermaid Diagram Rendering
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PROJECTS_DIR = '_content/projects';
const BLOG_DIR = '_content/blog';
const OUTPUT_DIR = '_site/diagrams';
const TEMP_DIR = '.mermaid-temp';
const MANIFEST_FILE = '_site/diagrams/manifest.json';

// Regex to match ```mermaid code blocks in markdown
const MERMAID_BLOCK_REGEX = /```mermaid\n([\s\S]*?)```/g;

async function main() {
  console.log('🎨 Mermaid SVG Generator');
  console.log('========================');

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  let generated = 0;
  let skipped = 0;
  let errors = 0;
  const manifest = {};

  // Process project files (frontmatter-based diagrams)
  console.log('\n📁 Processing Projects (frontmatter)...');
  const projectStats = await processProjects(manifest);
  generated += projectStats.generated;
  skipped += projectStats.skipped;
  errors += projectStats.errors;

  // Process blog posts (inline mermaid code blocks)
  console.log('\n📝 Processing Blog Posts (inline)...');
  const blogStats = await processInlineContent(manifest, BLOG_DIR, 'blog');
  generated += blogStats.generated;
  skipped += blogStats.skipped;
  errors += blogStats.errors;

  // Process project files (inline mermaid code blocks in content)
  console.log('\n📁 Processing Projects (inline)...');
  const projectInlineStats = await processInlineContent(manifest, PROJECTS_DIR, 'project');
  generated += projectInlineStats.generated;
  skipped += projectInlineStats.skipped;
  errors += projectInlineStats.errors;

  // Write manifest file for Eleventy transform
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
  console.log(`\n📋 Manifest written: ${MANIFEST_FILE}`);

  // Cleanup temp directory
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });

  console.log('');
  console.log(`📊 Summary: ${generated} generated, ${skipped} skipped${errors > 0 ? `, ${errors} errors` : ''}`);
}

/**
 * Process project files with diagramContent in frontmatter
 */
async function processProjects(manifest) {
  let generated = 0;
  let skipped = 0;
  let errors = 0;

  if (!fs.existsSync(PROJECTS_DIR)) {
    console.log(`⚠️  Projects directory not found: ${PROJECTS_DIR}`);
    return { generated, skipped, errors };
  }

  const projectFiles = fs.readdirSync(PROJECTS_DIR)
    .filter(f => f.endsWith('.md'));

  for (const file of projectFiles) {
    const filePath = path.join(PROJECTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    // Skip if no diagram content or not mermaid type
    if (!data.diagramContent) {
      skipped++;
      continue;
    }

    // Skip if diagramType is not mermaid (or missing - default to mermaid for backwards compat)
    if (data.diagramType && data.diagramType !== 'mermaid') {
      skipped++;
      continue;
    }

    // Skip if no id field
    if (!data.id) {
      console.warn(`⚠️  Skipping ${file}: missing 'id' field in frontmatter`);
      skipped++;
      continue;
    }

    // Skip if diagramContent is empty
    if (typeof data.diagramContent !== 'string' || data.diagramContent.trim() === '') {
      console.warn(`⚠️  Skipping ${file}: empty diagramContent field`);
      skipped++;
      continue;
    }

    const projectId = data.id;
    const tempInput = path.join(TEMP_DIR, `${projectId}.mmd`);
    const outputSvg = path.join(OUTPUT_DIR, `${projectId}.svg`);

    // Write mermaid code to temp file
    fs.writeFileSync(tempInput, data.diagramContent);

    try {
      // Generate SVG using mmdc with transparent background and Neubrutalist theme
      execSync(`npx mmdc -i "${tempInput}" -o "${outputSvg}" -b transparent -c mermaid-config.json`, {
        stdio: 'pipe'
      });
      console.log(`✅ Generated: ${outputSvg}`);
      generated++;
    } catch (error) {
      console.error(`❌ Error rendering ${projectId}: ${error.message}`);
      errors++;
    }
  }

  return { generated, skipped, errors };
}

/**
 * Process content files with inline ```mermaid code blocks
 * Supports both blog posts and project content
 */
async function processInlineContent(manifest, contentDir, prefix) {
  let generated = 0;
  let skipped = 0;
  let errors = 0;

  if (!fs.existsSync(contentDir)) {
    console.log(`⚠️  Directory not found: ${contentDir}`);
    return { generated, skipped, errors };
  }

  const files = fs.readdirSync(contentDir)
    .filter(f => f.endsWith('.md'));

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Skip if no id field
    if (!data.id) {
      console.warn(`⚠️  Skipping ${file}: missing 'id' field in frontmatter`);
      skipped++;
      continue;
    }

    // Find all mermaid code blocks in content
    const matches = [...content.matchAll(MERMAID_BLOCK_REGEX)];

    if (matches.length === 0) {
      skipped++;
      continue;
    }

    const contentId = data.id;
    manifest[contentId] = [];

    for (let i = 0; i < matches.length; i++) {
      const mermaidCode = matches[i][1].trim();

      if (!mermaidCode) {
        console.warn(`⚠️  Skipping empty mermaid block in ${file}`);
        continue;
      }

      const diagramId = `${prefix}-${contentId}-${i}`;
      const tempInput = path.join(TEMP_DIR, `${diagramId}.mmd`);
      const outputSvg = path.join(OUTPUT_DIR, `${diagramId}.svg`);

      // Write mermaid code to temp file
      fs.writeFileSync(tempInput, mermaidCode);

      try {
        // Generate SVG using mmdc with transparent background and Neubrutalist theme
        execSync(`npx mmdc -i "${tempInput}" -o "${outputSvg}" -b transparent -c mermaid-config.json`, {
          stdio: 'pipe'
        });
        console.log(`✅ Generated: ${outputSvg}`);
        manifest[contentId].push({
          index: i,
          svgPath: `/diagrams/${diagramId}.svg`,
          originalCode: mermaidCode
        });
        generated++;
      } catch (error) {
        console.error(`❌ Error rendering ${diagramId}: ${error.message}`);
        errors++;
      }
    }
  }

  return { generated, skipped, errors };
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
