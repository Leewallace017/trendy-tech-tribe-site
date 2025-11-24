import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.SCRAPINGBEE_API_KEY;

async function searchAmazon(query: string) {
  const params = new URLSearchParams({
    api_key: API_KEY!,
    query: query,
    light_request: 'true',
    domain: 'com',
    start_page: '1',
    pages: '1'
  });

  const url = `https://app.scrapingbee.com/api/v1/amazon/search?${params}`;
  const response = await fetch(url);
  const data = await response.json();

  console.log(`\n📦 Search: ${query}\n`);

  if (data.products && Array.isArray(data.products)) {
    data.products.slice(0, 3).forEach((item: any, index: number) => {
      console.log(`${index + 1}. ASIN: ${item.asin}`);
      console.log(`   Title: ${item.name || item.title || 'N/A'}`);
      console.log(`   Price: $${item.price || 'N/A'}`);
      console.log(`   URL: https://amazon.com/dp/${item.asin}?tag=trendytecht0a-20`);
      console.log('');
    });
  }
}

searchAmazon('Logitech MX Master 3S').catch(console.error);
