/**
 * Custom HTML to Markdown converter for Vulkan man pages
 */

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

  // Replace common HTML elements with Markdown equivalents
  let markdown = html
    // Handle paragraphs
    .replace(/<p[^>]*>(.*?)<\/p>/gs, '$1\n\n')

    // Handle headings (h1-h6)
    .replace(/<h1[^>]*>(.*?)<\/h1>/gs, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gs, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gs, '### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gs, '#### $1\n\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gs, '##### $1\n\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gs, '###### $1\n\n')

    // Handle strong/bold
    .replace(/<(strong|b)>(.*?)<\/(strong|b)>/gs, '**$2**')

    // Handle emphasis/italic
    .replace(/<(em|i)>(.*?)<\/(em|i)>/gs, '*$2*')

    // Handle code blocks
    .replace(/<pre><code[^>]*>(.*?)<\/code><\/pre>/gs, '```\n$1\n```\n\n')
    .replace(/<pre[^>]*>(.*?)<\/pre>/gs, '```\n$1\n```\n\n')

    // Handle inline code
    .replace(/<code>(.*?)<\/code>/gs, '`$1`')

    // Handle unordered lists
    .replace(/<ul[^>]*>(.*?)<\/ul>/gs, function (match, list) {
      return list.replace(/<li[^>]*>(.*?)<\/li>/gs, '* $1\n') + '\n';
    })

    // Handle ordered lists
    .replace(/<ol[^>]*>(.*?)<\/ol>/gs, function (match, list) {
      let index = 1;
      return list.replace(/<li[^>]*>(.*?)<\/li>/gs, function (match, item) {
        return (index++) + '. ' + item + '\n';
      }) + '\n';
    })

    // Handle links
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gs, '[$2]($1)')

    // Handle images
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gs, '![$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*>/gs, '![]($1)')

    // Handle line breaks
    .replace(/<br\s*\/?>/gs, '\n')

    // Handle horizontal rules
    .replace(/<hr\s*\/?>/gs, '---\n\n')

    // Handle blockquotes
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gs, '> $1\n\n')

    // Handle divs and spans (treat as paragraphs if they contain text)
    .replace(/<div[^>]*>(.*?)<\/div>/gs, '$1\n\n')
    .replace(/<span[^>]*>(.*?)<\/span>/gs, '$1')

    // Handle tables (basic support)
    .replace(/<table[^>]*>([\s\S]*?)<\/table>/gs, function (match, tableContent) {
      let markdown = '';

      // Extract header row
      const headerMatch = tableContent.match(/<thead[^>]*>([\s\S]*?)<\/thead>/s);
      if (headerMatch) {
        const headerCells = headerMatch[1].match(/<th[^>]*>([\s\S]*?)<\/th>/gs) || [];
        if (headerCells.length > 0) {
          markdown += '| ' + headerCells.map((cell) => cell.replace(/<th[^>]*>([\s\S]*?)<\/th>/s, '$1').trim()).join(' | ') + ' |\n';
          markdown += '| ' + headerCells.map(() => '---').join(' | ') + ' |\n';
        }
      }

      // Extract body rows
      const bodyMatch = tableContent.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/s);
      if (bodyMatch) {
        const rows = bodyMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/gs) || [];
        rows.forEach((row) => {
          const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/gs) || [];
          if (cells.length > 0) {
            markdown += '| ' + cells.map((cell) => cell.replace(/<td[^>]*>([\s\S]*?)<\/td>/s, '$1').trim()).join(' | ') + ' |\n';
          }
        });
      }

      return markdown + '\n';
    })

    // Clean up any remaining HTML tags
    .replace(/<[^>]*>/g, '')

    // Fix extra newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // If we extracted a title and it's not already at the beginning of the markdown
  if (title && !markdown.startsWith('# ' + title)) {
    markdown = '# ' + title + '\n\n' + markdown;
  }

  return markdown;
}

module.exports = { htmlToMarkdown };
