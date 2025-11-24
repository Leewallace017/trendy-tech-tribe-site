/**
 * Optimizes image URLs for better performance
 */

/**
 * Optimizes Unsplash image URLs by adjusting size parameters
 * @param url - Original Unsplash image URL
 * @param width - Desired width (defaults to 800 for cards)
 * @returns Optimized URL with updated parameters
 */
export function optimizeUnsplashUrl(url: string, width: number = 800): string {
  if (!url.includes('unsplash.com')) {
    return url;
  }

  try {
    const urlObj = new URL(url);

    // Update width parameter
    urlObj.searchParams.set('w', width.toString());

    // Calculate height to maintain aspect ratio (assuming 16:9 for card images)
    const height = Math.round(width * 0.5625);
    urlObj.searchParams.set('h', height.toString());

    // Add quality parameter for additional optimization
    urlObj.searchParams.set('q', '80');

    // Add auto format
    urlObj.searchParams.set('auto', 'format');

    return urlObj.toString();
  } catch (e) {
    // If URL parsing fails, return original
    return url;
  }
}

/**
 * Generates responsive srcset for Unsplash images
 * @param url - Original Unsplash image URL
 * @returns srcset string with multiple sizes
 */
export function getUnsplashSrcset(url: string): string {
  if (!url.includes('unsplash.com')) {
    return '';
  }

  const sizes = [400, 600, 800, 1200];
  return sizes
    .map(size => `${optimizeUnsplashUrl(url, size)} ${size}w`)
    .join(', ');
}
