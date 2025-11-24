/**
 * Test if ASINs actually work by fetching their pages
 */

const asins = {
  'Anker Soundcore Space A40': 'B0B1LPNDGF',
  'JBL Live Pro 2': 'B09V9P5Q6W',
  '1MORE Evo': 'B09Q31SGTP',
  'Beats Flex': 'B08L6ZYW21',
  'Soundcore Liberty 4 NC': 'B0BZV7M23Q'
};

async function testASIN(name: string, asin: string) {
  const url = `https://amazon.com/dp/${asin}`;

  console.log(`\n📦 Testing: ${name}`);
  console.log(`ASIN: ${asin}`);
  console.log(`URL: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    console.log(`HTTP Status: ${response.status}`);

    if (!response.ok) {
      console.log('❌ Failed - HTTP error');
      return;
    }

    const html = await response.text();

    // Check for error indicators
    const notFoundIndicators = [
      "Sorry, we couldn't find that page",
      'Page Not Found',
      'Looking for something?',
      'Dogs of Amazon',
    ];

    const hasError = notFoundIndicators.some(indicator => html.includes(indicator));

    // Check for product elements
    const hasProductTitle = html.includes('id="productTitle"') || html.includes('product-title');
    const hasAddToCart = html.includes('add-to-cart') || html.includes('Add to Cart');

    console.log(`Has error message: ${hasError}`);
    console.log(`Has product title: ${hasProductTitle}`);
    console.log(`Has add to cart: ${hasAddToCart}`);

    if (hasError || (!hasProductTitle && !hasAddToCart)) {
      console.log('❌ INVALID - Product not found');
    } else {
      console.log('✅ VALID - Product exists');
    }

  } catch (error) {
    console.log(`❌ Error: ${error}`);
  }
}

async function main() {
  for (const [name, asin] of Object.entries(asins)) {
    await testASIN(name, asin);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

main().catch(console.error);
