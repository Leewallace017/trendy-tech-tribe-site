/**
 * Find correct Amazon ASINs using ScrapingBee API
 */

const SCRAPING_BEE_API_KEY = 'X0DMMQG690EMHWHMMQY2LDX8C5VPVT0APFMUOQROQJ4FCQAJ6CJ1X8L0TAG7ZR9BMEPTQJY8RXGFOPJ5';

interface AmazonSearchResult {
  asin: string;
  title: string;
  price?: string;
  rating?: string;
  url: string;
}

async function searchAmazon(query: string): Promise<AmazonSearchResult[]> {
  const params = new URLSearchParams({
    api_key: SCRAPING_BEE_API_KEY,
    query: query,
    light_request: 'true',
    sort_by: 'bestsellers',
    domain: 'com',
    start_page: '1',
    pages: '1'
  });

  const url = `https://app.scrapingbee.com/api/v1/amazon/search?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`ScrapingBee API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Parse results and extract ASINs
    if (data.products && Array.isArray(data.products)) {
      return data.products.map((item: any) => ({
        asin: item.asin || '',
        title: item.name || item.title || '',
        price: item.price ? `$${item.price}` : '',
        rating: item.rating || '',
        url: `https://amazon.com/dp/${item.asin}`
      }));
    }

    return [];
  } catch (error) {
    console.error(`Error searching for "${query}":`, error);
    return [];
  }
}

async function main() {
  const products = [
    'Anker Soundcore Space A40',
    'JBL Live Pro 2',
    '1MORE Evo earbuds',
    'Beats Flex wireless earphones',
    'Soundcore Liberty 4 NC'
  ];

  console.log('🔍 Searching Amazon for correct ASINs...\n');

  for (const product of products) {
    console.log(`\n📦 Searching: ${product}`);
    console.log('─'.repeat(60));

    const results = await searchAmazon(product);

    if (results.length === 0) {
      console.log('❌ No results found');
      continue;
    }

    console.log(`✅ Found ${results.length} result(s):\n`);

    results.slice(0, 3).forEach((result, index) => {
      console.log(`${index + 1}. ASIN: ${result.asin}`);
      console.log(`   Title: ${result.title}`);
      if (result.price) console.log(`   Price: ${result.price}`);
      if (result.rating) console.log(`   Rating: ${result.rating}`);
      console.log(`   URL: https://amazon.com/dp/${result.asin}?tag=trendytecht0a-20`);
      console.log('');
    });

    // Wait a bit to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

main().catch(console.error);
