module.exports = {
  ci: {
    collect: {
      // Use static server to serve built site
      staticDistDir: './_site',
      // Test multiple pages
      url: [
        'http://localhost/',
        'http://localhost/blog/',
        'http://localhost/projects/',
        'http://localhost/resume/',
        'http://localhost/contact/',
      ],
      // Number of runs per URL for consistency
      numberOfRuns: 3,
      // Lighthouse settings
      settings: {
        // Mobile emulation (default)
        preset: 'desktop',
        // Also run mobile tests
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    assert: {
      assertions: {
        // Category scores - require minimum 95%
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],

        // Core Web Vitals (AC6)
        'first-contentful-paint': ['error', { maxNumericValue: 1000 }], // < 1.0s
        'largest-contentful-paint': ['error', { maxNumericValue: 1500 }], // < 1.5s
        'total-blocking-time': ['error', { maxNumericValue: 100 }], // < 100ms
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }], // < 0.1

        // Page weight budgets (AC7, AC8)
        'resource-summary:document:size': ['error', { maxNumericValue: 51200 }], // 50KB HTML
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 51200 }], // 50KB CSS (AC8)
        'resource-summary:script:size': ['error', { maxNumericValue: 51200 }], // 50KB JS
      },
    },
    upload: {
      // Use temporary public storage for CI artifacts
      target: 'temporary-public-storage',
    },
  },
};
