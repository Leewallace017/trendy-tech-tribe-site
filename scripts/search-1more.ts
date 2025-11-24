const SCRAPING_BEE_API_KEY = 'X0DMMQG690EMHWHMMQY2LDX8C5VPVT0APFMUOQROQJ4FCQAJ6CJ1X8L0TAG7ZR9BMEPTQJY8RXGFOPJ5';

async function searchAmazon(query: string) {
  const params = new URLSearchParams({
    api_key: SCRAPING_BEE_API_KEY,
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
    data.products.slice(0, 5).forEach((item: any, index: number) => {
      console.log(`${index + 1}. ASIN: ${item.asin}`);
      console.log(`   Title: ${item.name || item.title || 'N/A'}`);
      console.log(`   Price: $${item.price || 'N/A'}`);
      console.log(`   Rating: ${item.rating || 'N/A'}`);
      console.log('');
    });
  }
}

searchAmazon('1MORE Evo True Wireless ANC').catch(console.error);
