/**
 * HTML to Markdown converter using node-html-markdown
 */

// Import the node-html-markdown package
const { NodeHtmlMarkdown } = require('node-html-markdown');

// Create an instance of NodeHtmlMarkdown with custom options
const nhm = new NodeHtmlMarkdown({
  // Custom options for better conversion of Vulkan man pages
  use: {
    headingAnchor: false, // Don't add anchors to headings
    codeBlockStyle: 'fenced' // Use fenced code blocks
  },
  // Customize heading levels
  headingStyle: 'atx', // Use # style headings
  // Preserve emphasis
  strongDelimiter: '**',
  emDelimiter: '*',
  // Handle code blocks and inline code
  codeBlockStyle: 'fenced',
  // Handle line breaks
  lineBreakStyle: 'soft'
});

/**
 * Convert HTML content to Markdown format.
 *
 * @param {string} html - The HTML content to convert
 * @returns {string} The converted Markdown content
 */
function htmlToMarkdown(html) {
  if (!html) return '';

  // First, remove any style, script, and link tags and their content
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<link[^>]*>/gi, '');

  // Remove meta tags
  html = html.replace(/<meta[^>]*>/gi, '');

  // Remove comments
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  // Remove doctype
  html = html.replace(/<!DOCTYPE[^>]*>/i, '');

  // Try to extract the main content
  // For man pages, we want to focus on the article content
  const articleMatch = html.match(/<article[^>]*class="doc"[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch && articleMatch[1]) {
    html = articleMatch[1];
  } else {
    // If we can't find an article with class="doc", look for any article
    const anyArticleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (anyArticleMatch && anyArticleMatch[1]) {
      html = anyArticleMatch[1];
    } else {
      // If we can't find any article, look for the body content
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch && bodyMatch[1]) {
        html = bodyMatch[1];
      }
    }
  }

  // Extract the title if available
  let title = '';
  const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (titleMatch && titleMatch[1]) {
    title = titleMatch[1].trim();
  }

  // Convert HTML to Markdown using node-html-markdown
  let markdown = nhm.translate(html);

  // If we extracted a title and it's not already at the beginning of the markdown
  if (title && !markdown.startsWith('# ' + title)) {
    markdown = '# ' + title + '\n\n' + markdown;
  }

  return markdown;
}

module.exports = { htmlToMarkdown };
