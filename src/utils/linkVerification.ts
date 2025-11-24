/**
 * Link verification utilities for quality control
 */

export interface LinkCheckResult {
  url: string;
  status: 'valid' | 'invalid' | 'error';
  statusCode?: number;
  error?: string;
}

/**
 * Checks if a URL is accessible
 * @param url - The URL to check
 * @returns Result object with status information
 */
export async function checkLink(url: string): Promise<LinkCheckResult> {
  try {
    // For Amazon links, we need to do a GET request to check the actual content
    const isAmazonLink = url.includes('amazon.com');

    if (isAmazonLink) {
      // Always GET for Amazon to check page content
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(10000),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      if (!response.ok) {
        return {
          url,
          status: 'invalid',
          statusCode: response.status
        };
      }

      // Check if Amazon is showing a "product not found" page
      const html = await response.text();

      // Amazon shows these messages when a product doesn't exist
      const notFoundIndicators = [
        'Sorry, we couldn\'t find that page',
        'Page Not Found',
        'Looking for something?',
        'Dogs of Amazon', // Amazon's 404 page has this
        'requested URL was not found',
      ];

      const pageNotFound = notFoundIndicators.some(indicator =>
        html.includes(indicator)
      );

      // Check if it's a valid product page (has typical product elements)
      const hasProductTitle = html.includes('id="productTitle"') || html.includes('product-title');
      const hasAddToCart = html.includes('add-to-cart') || html.includes('Add to Cart');

      if (pageNotFound || (!hasProductTitle && !hasAddToCart)) {
        return {
          url,
          status: 'invalid',
          statusCode: 200,
          error: 'Amazon product not found (ASIN may be incorrect or product discontinued)'
        };
      }

      return {
        url,
        status: 'valid',
        statusCode: response.status
      };
    }

    // For non-Amazon links, use HEAD request first (faster)
    let response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0; +https://trendytechtribe.com)'
      }
    });

    // If HEAD fails with 405 (Method Not Allowed) or 403, try GET request
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(10000),
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0; +https://trendytechtribe.com)'
        }
      });
    }

    return {
      url,
      status: response.ok ? 'valid' : 'invalid',
      statusCode: response.status
    };
  } catch (error) {
    return {
      url,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Checks multiple links and returns results
 * @param urls - Array of URLs to check
 * @returns Array of link check results
 */
export async function checkLinks(urls: string[]): Promise<LinkCheckResult[]> {
  const results = await Promise.all(urls.map(url => checkLink(url)));
  return results;
}

/**
 * Extracts all URLs from article frontmatter
 * @param frontmatter - Article frontmatter object
 * @returns Array of all URLs found in the article metadata
 */
export function extractUrlsFromFrontmatter(frontmatter: any): string[] {
  const urls: string[] = [];

  // Extract affiliate product URLs
  if (frontmatter.affiliateProducts && Array.isArray(frontmatter.affiliateProducts)) {
    frontmatter.affiliateProducts.forEach((product: any) => {
      if (product.url && product.url !== '#') {
        urls.push(product.url);
      }
    });
  }

  // Extract source URLs
  if (frontmatter.sources && Array.isArray(frontmatter.sources)) {
    frontmatter.sources.forEach((source: any) => {
      if (source.url) {
        urls.push(source.url);
      }
    });
  }

  return urls;
}

/**
 * Extracts all Amazon links from markdown content
 * @param content - Markdown content string
 * @returns Array of Amazon URLs found in the content
 */
export function extractAmazonLinksFromContent(content: string): string[] {
  const amazonUrls: string[] = [];

  // Match markdown links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+amazon\.com[^\)]+)\)/gi;
  let match;

  while ((match = markdownLinkRegex.exec(content)) !== null) {
    amazonUrls.push(match[2]);
  }

  // Match bare URLs
  const bareUrlRegex = /https?:\/\/[^\s]+amazon\.com[^\s]*/gi;
  const bareMatches = content.match(bareUrlRegex) || [];

  // Filter out duplicates and URLs already captured
  bareMatches.forEach(url => {
    // Clean up URL (remove trailing punctuation)
    const cleanUrl = url.replace(/[,\.\)\]]+$/, '');
    if (!amazonUrls.includes(cleanUrl)) {
      amazonUrls.push(cleanUrl);
    }
  });

  return amazonUrls;
}

/**
 * Validates Amazon URLs have the correct affiliate tag
 * @param urls - Array of Amazon URLs to check
 * @param affiliateTag - Expected affiliate tag (default: trendytecht0a-20)
 * @returns Object with valid/invalid URLs
 */
export function validateAmazonAffiliateTags(
  urls: string[],
  affiliateTag: string = 'trendytecht0a-20'
): { valid: string[]; missing: string[] } {
  const valid: string[] = [];
  const missing: string[] = [];

  urls.forEach(url => {
    try {
      const urlObj = new URL(url);
      const tag = urlObj.searchParams.get('tag');

      if (tag === affiliateTag) {
        valid.push(url);
      } else {
        missing.push(url);
      }
    } catch (error) {
      missing.push(url);
    }
  });

  return { valid, missing };
}

/**
 * Validates all links in an article
 * @param frontmatter - Article frontmatter object
 * @returns Validation results with any broken links
 */
export async function validateArticleLinks(frontmatter: any): Promise<{
  valid: boolean;
  brokenLinks: LinkCheckResult[];
  totalLinks: number;
}> {
  const urls = extractUrlsFromFrontmatter(frontmatter);
  const results = await checkLinks(urls);
  const brokenLinks = results.filter(r => r.status !== 'valid');

  return {
    valid: brokenLinks.length === 0,
    brokenLinks,
    totalLinks: urls.length
  };
}

/**
 * Prints a formatted report of link validation results
 * @param results - Link check results
 */
export function printLinkReport(results: LinkCheckResult[]): void {
  console.log('\n=== Link Verification Report ===\n');

  const valid = results.filter(r => r.status === 'valid');
  const invalid = results.filter(r => r.status === 'invalid');
  const errors = results.filter(r => r.status === 'error');

  console.log(`Total links checked: ${results.length}`);
  console.log(`✓ Valid: ${valid.length}`);
  console.log(`✗ Invalid: ${invalid.length}`);
  console.log(`⚠ Errors: ${errors.length}`);

  if (invalid.length > 0) {
    console.log('\nInvalid links:');
    invalid.forEach(r => {
      console.log(`  - ${r.url} (Status: ${r.statusCode})`);
    });
  }

  if (errors.length > 0) {
    console.log('\nError checking links:');
    errors.forEach(r => {
      console.log(`  - ${r.url} (${r.error})`);
    });
  }

  console.log('\n==============================\n');
}
