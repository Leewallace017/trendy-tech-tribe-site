/**
 * Affiliate link utilities for Trendy Tech Tribe
 */

const AMAZON_AFFILIATE_ID = 'trendytecht0a-20';

/**
 * Ensures an Amazon URL has the affiliate tracking ID
 * @param url - The Amazon product URL
 * @returns URL with affiliate tag appended
 */
export function addAmazonAffiliateTag(url: string): string {
  try {
    const urlObj = new URL(url);

    // Only process Amazon URLs
    if (!urlObj.hostname.includes('amazon.')) {
      return url;
    }

    // Add or update the tag parameter
    urlObj.searchParams.set('tag', AMAZON_AFFILIATE_ID);

    return urlObj.toString();
  } catch (error) {
    console.error('Invalid URL provided to addAmazonAffiliateTag:', url);
    return url;
  }
}

/**
 * Validates that an Amazon URL has the correct affiliate tag
 * @param url - The Amazon product URL to validate
 * @returns true if the URL has the correct affiliate tag
 */
export function hasAffiliateTag(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('tag') === AMAZON_AFFILIATE_ID;
  } catch (error) {
    return false;
  }
}

/**
 * Processes an array of affiliate products to ensure all Amazon URLs have tracking
 * @param products - Array of affiliate products
 * @returns Products with affiliate tags added to Amazon URLs
 */
export function processAffiliateProducts(products: Array<{ name: string; url: string; price?: string }>) {
  return products.map(product => ({
    ...product,
    url: addAmazonAffiliateTag(product.url)
  }));
}

/**
 * Gets the current price disclaimer text
 * @param date - The date the price was checked (defaults to today)
 * @returns Disclaimer text for price display
 */
export function getPriceDisclaimer(date?: string): string {
  const priceDate = date || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `Price as of ${priceDate}. Check Amazon for current price.`;
}
