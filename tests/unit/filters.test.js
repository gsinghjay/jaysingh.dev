/**
 * Unit tests for 11ty filters
 * Uses Node.js built-in test runner (Node 18+)
 * Run with: node --test tests/unit/filters.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert';
import { readingTime, WORDS_PER_MINUTE, findProjectsByIds } from '../../lib/filters.js';

describe('readingTime filter', () => {
  describe('edge cases - null/undefined/empty', () => {
    test('returns "1 min read" for null content', () => {
      assert.strictEqual(readingTime(null), '1 min read');
    });

    test('returns "1 min read" for undefined content', () => {
      assert.strictEqual(readingTime(undefined), '1 min read');
    });

    test('returns "1 min read" for empty string', () => {
      assert.strictEqual(readingTime(''), '1 min read');
    });

    test('returns "1 min read" for only HTML tags', () => {
      assert.strictEqual(readingTime('<div></div><p></p>'), '1 min read');
    });

    test('returns "1 min read" for only whitespace', () => {
      assert.strictEqual(readingTime('   \n\t  '), '1 min read');
    });
  });

  describe('minimum value enforcement', () => {
    test('returns "1 min read" for very short content (< 200 words)', () => {
      const shortContent = 'Hello world this is a short post.';
      assert.strictEqual(readingTime(shortContent), '1 min read');
    });

    test('returns "1 min read" for exactly 1 word', () => {
      assert.strictEqual(readingTime('Hello'), '1 min read');
    });

    test('returns "1 min read" for 199 words', () => {
      const words = Array(199).fill('word').join(' ');
      assert.strictEqual(readingTime(words), '1 min read');
    });
  });

  describe('word count calculation', () => {
    test('returns "1 min read" for exactly 200 words', () => {
      const words = Array(200).fill('word').join(' ');
      assert.strictEqual(readingTime(words), '1 min read');
    });

    test('returns "2 min read" for 201 words', () => {
      const words = Array(201).fill('word').join(' ');
      assert.strictEqual(readingTime(words), '2 min read');
    });

    test('returns "2 min read" for 400 words', () => {
      const words = Array(400).fill('word').join(' ');
      assert.strictEqual(readingTime(words), '2 min read');
    });

    test('returns "3 min read" for 401 words', () => {
      const words = Array(401).fill('word').join(' ');
      assert.strictEqual(readingTime(words), '3 min read');
    });

    test('returns "5 min read" for 1000 words', () => {
      const words = Array(1000).fill('word').join(' ');
      assert.strictEqual(readingTime(words), '5 min read');
    });
  });

  describe('HTML stripping', () => {
    test('strips simple HTML tags and counts remaining words', () => {
      const html = '<p>Hello</p> <div>world</div>';
      assert.strictEqual(readingTime(html), '1 min read');
    });

    test('strips nested HTML tags', () => {
      const html = '<div><p><span>Hello world</span></p></div>';
      assert.strictEqual(readingTime(html), '1 min read');
    });

    test('handles HTML with attributes', () => {
      const html = '<div class="foo" id="bar">Hello world</div>';
      assert.strictEqual(readingTime(html), '1 min read');
    });

    test('handles self-closing tags', () => {
      const html = 'Hello<br/>world<img src="test.png"/>end';
      assert.strictEqual(readingTime(html), '1 min read');
    });

    test('counts words inside code blocks', () => {
      // 201 words inside pre tag should be 2 min read
      const codeWords = Array(201).fill('code').join(' ');
      const html = `<pre><code>${codeWords}</code></pre>`;
      assert.strictEqual(readingTime(html), '2 min read');
    });
  });

  describe('whitespace handling', () => {
    test('handles multiple spaces between words', () => {
      const content = 'Hello    world';
      assert.strictEqual(readingTime(content), '1 min read');
    });

    test('handles tabs and newlines', () => {
      const content = 'Hello\t\tworld\n\nnext line';
      assert.strictEqual(readingTime(content), '1 min read');
    });

    test('handles mixed whitespace', () => {
      const content = '  Hello   world  \n\t  foo  ';
      assert.strictEqual(readingTime(content), '1 min read');
    });
  });

  describe('WORDS_PER_MINUTE constant', () => {
    test('is set to 200', () => {
      assert.strictEqual(WORDS_PER_MINUTE, 200);
    });
  });
});

describe('findProjectsByIds filter', () => {
  // Mock projects collection matching 11ty structure
  const mockProjects = [
    { data: { id: 'project-a', title: 'Project A', description: 'Description A' } },
    { data: { id: 'project-b', title: 'Project B', description: 'Description B' } },
    { data: { id: 'project-c', title: 'Project C', description: 'Description C' } },
  ];

  describe('edge cases - null/undefined/empty', () => {
    test('returns empty array for null projectIds', () => {
      assert.deepStrictEqual(findProjectsByIds(null, mockProjects), []);
    });

    test('returns empty array for undefined projectIds', () => {
      assert.deepStrictEqual(findProjectsByIds(undefined, mockProjects), []);
    });

    test('returns empty array for empty projectIds array', () => {
      assert.deepStrictEqual(findProjectsByIds([], mockProjects), []);
    });

    test('returns empty array for null projects collection', () => {
      assert.deepStrictEqual(findProjectsByIds(['project-a'], null), []);
    });

    test('returns empty array for undefined projects collection', () => {
      assert.deepStrictEqual(findProjectsByIds(['project-a'], undefined), []);
    });

    test('returns empty array when projectIds is not an array', () => {
      assert.deepStrictEqual(findProjectsByIds('project-a', mockProjects), []);
    });

    test('returns empty array for empty projects collection', () => {
      assert.deepStrictEqual(findProjectsByIds(['project-a'], []), []);
    });
  });

  describe('valid ID matching', () => {
    test('returns single matching project', () => {
      const result = findProjectsByIds(['project-a'], mockProjects);
      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0].data.id, 'project-a');
    });

    test('returns multiple matching projects in order', () => {
      const result = findProjectsByIds(['project-b', 'project-a'], mockProjects);
      assert.strictEqual(result.length, 2);
      assert.strictEqual(result[0].data.id, 'project-b');
      assert.strictEqual(result[1].data.id, 'project-a');
    });

    test('returns all projects when all IDs match', () => {
      const result = findProjectsByIds(['project-a', 'project-b', 'project-c'], mockProjects);
      assert.strictEqual(result.length, 3);
    });
  });

  describe('invalid ID handling (AC #6)', () => {
    test('gracefully ignores non-existent project ID', () => {
      const result = findProjectsByIds(['non-existent'], mockProjects);
      assert.deepStrictEqual(result, []);
    });

    test('returns only valid matches when mixed with invalid IDs', () => {
      const result = findProjectsByIds(['project-a', 'invalid', 'project-b'], mockProjects);
      assert.strictEqual(result.length, 2);
      assert.strictEqual(result[0].data.id, 'project-a');
      assert.strictEqual(result[1].data.id, 'project-b');
    });

    test('handles all invalid IDs gracefully', () => {
      const result = findProjectsByIds(['invalid1', 'invalid2'], mockProjects);
      assert.deepStrictEqual(result, []);
    });

    test('handles duplicate IDs (returns duplicates)', () => {
      const result = findProjectsByIds(['project-a', 'project-a'], mockProjects);
      assert.strictEqual(result.length, 2);
      assert.strictEqual(result[0].data.id, 'project-a');
      assert.strictEqual(result[1].data.id, 'project-a');
    });
  });

  describe('projects with missing data', () => {
    test('handles projects without data property', () => {
      const projectsWithMissing = [
        { data: { id: 'valid', title: 'Valid' } },
        { noData: true },
        null,
      ];
      const result = findProjectsByIds(['valid'], projectsWithMissing);
      assert.strictEqual(result.length, 1);
      assert.strictEqual(result[0].data.id, 'valid');
    });
  });
});
