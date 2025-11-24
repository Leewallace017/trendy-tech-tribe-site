/**
 * Search for article sources using ScrapingBee Google Search API
 */
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const API_KEY = process.env.SCRAPINGBEE_API_KEY;

if (!API_KEY) {
  console.error('❌ SCRAPINGBEE_API_KEY not found in .env file');
  process.exit(1);
}

interface SearchResult {
  title: string;
  url: string;
  description?: string;
}

async function searchGoogle(query: string): Promise<SearchResult[]> {
  const params = new URLSearchParams({
    api_key: API_KEY!,
    search: query,
    language: 'en'
  });

  const url = `https://app.scrapingbee.com/api/v1/google?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`ScrapingBee API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Parse organic search results
    if (data.organic_results && Array.isArray(data.organic_results)) {
      return data.organic_results.map((item: any) => ({
        title: item.title || '',
        url: item.url || item.link || '',
        description: item.snippet || item.description || ''
      }));
    }

    return [];
  } catch (error) {
    console.error(`Error searching for "${query}":`, error);
    return [];
  }
}

async function main() {
  const searches = [
    'Apple Google Gemini Siri partnership November 2025',
    'Meta antitrust breakup November 2025',
    'EIA battery storage report 2025'
  ];

  for (const query of searches) {
    console.log(`\n🔍 Searching: ${query}`);
    console.log('═'.repeat(70));

    const results = await searchGoogle(query);

    if (results.length === 0) {
      console.log('❌ No results found\n');
      continue;
    }

    console.log(`✅ Found ${results.length} result(s):\n`);

    // Show top 5 results
    results.slice(0, 5).forEach((result, index) => {
      console.log(`${index + 1}. ${result.title}`);
      console.log(`   URL: ${result.url}`);
      if (result.description) {
        console.log(`   ${result.description.substring(0, 100)}...`);
      }
      console.log('');
    });

    // Wait to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n✅ Search complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Choose the best accessible sources (avoid paywalls)');
  console.log('2. Update article frontmatter with the URLs');
  console.log('3. Run: npm run verify-article <file>');
}

main().catch(console.error);
