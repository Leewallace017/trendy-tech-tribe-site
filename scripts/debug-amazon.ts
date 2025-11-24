const url = 'https://amazon.com/dp/B0B1LPNDGF';

async function debug() {
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'follow',
    signal: AbortSignal.timeout(10000),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });

  const html = await response.text();

  console.log('Status:', response.status);
  console.log('Has productTitle:', html.includes('id="productTitle"'));
  console.log('Has product-title:', html.includes('product-title'));
  console.log('Has add-to-cart:', html.includes('add-to-cart'));
  console.log('Has Add to Cart:', html.includes('Add to Cart'));
  console.log('Has error:', html.includes("Sorry, we couldn't find that page"));

  // Search for product title in HTML
  const titleMatch = html.match(/id="productTitle"[^>]*>([^<]+)</);
  if (titleMatch) {
    console.log('\nFound product title:', titleMatch[1].trim());
  }
}

debug();
