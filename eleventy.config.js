import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function(eleventyConfig) {
  // Ignore non-content directories
  eleventyConfig.ignores.add("_bmad/**");
  eleventyConfig.ignores.add("_bmad-output/**");
  eleventyConfig.ignores.add("src/**");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("docs/**");
  eleventyConfig.ignores.add("scripts/**");

  // React-era content (has Prometheus/Jinja2 syntax that conflicts with Nunjucks)
  // Will be migrated in future story with proper escaping
  eleventyConfig.ignores.add("content/blog/**");
  eleventyConfig.ignores.add("content/projects/**");
  eleventyConfig.ignores.add("content/config/**");

  // Ignore public directory templates (passthrough copy only)
  eleventyConfig.ignores.add("public/**");

  // Ignore React SPA entry point
  eleventyConfig.ignores.add("index.html");

  // Ignore Claude Code configuration
  eleventyConfig.ignores.add(".claude/**");

  // Syntax highlighting for code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // Date filter for formatting dates
  eleventyConfig.addFilter("date", (dateObj, format) => {
    if (!dateObj) return '';
    const date = new Date(dateObj);
    if (format === '%Y-%m-%d') {
      return date.toISOString().split('T')[0];
    }
    if (format === '%B %d, %Y') {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return date.toLocaleDateString();
  });

  // Filter to get items where a data attribute is truthy
  eleventyConfig.addFilter("where", (array, key) => {
    if (!array) return [];
    return array.filter(item => {
      const keys = key.split('.');
      let value = item;
      for (const k of keys) {
        value = value?.[k];
      }
      return !!value;
    });
  });

  // Filter to take first N items
  eleventyConfig.addFilter("take", (array, count) => {
    if (!array) return [];
    return array.slice(0, count);
  });

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("public");
  eleventyConfig.addPassthroughCopy("js");

  // Blog posts collection (using _content directory for 11ty-compatible content)
  eleventyConfig.addCollection("posts", collection => {
    return collection.getFilteredByGlob("_content/blog/*.md");
  });

  // Projects collection (using _content directory for 11ty-compatible content)
  eleventyConfig.addCollection("projects", collection => {
    return collection.getFilteredByGlob("_content/projects/*.md");
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
