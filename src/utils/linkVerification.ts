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
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

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
