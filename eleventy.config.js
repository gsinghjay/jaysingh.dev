import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function(eleventyConfig) {
  // Ignore non-content directories
  eleventyConfig.ignores.add("_bmad/**");
  eleventyConfig.ignores.add("_bmad-output/**");
  eleventyConfig.ignores.add("src/**");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("docs/**");
  eleventyConfig.ignores.add("scripts/**");

  // Ignore existing React-era content (will be migrated in future story)
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

  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("public");

  // Blog posts collection
  eleventyConfig.addCollection("posts", collection => {
    return collection.getFilteredByGlob("content/blog/*.md");
  });

  // Projects collection
  eleventyConfig.addCollection("projects", collection => {
    return collection.getFilteredByGlob("content/projects/*.md");
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
