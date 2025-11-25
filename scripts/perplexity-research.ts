/**
 * Perplexity AI Research Script
 * Uses Perplexity API for better research and Amazon product sourcing
 */
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

if (!PERPLEXITY_API_KEY) {
  console.error('❌ PERPLEXITY_API_KEY not found in .env file');
  process.exit(1);
}

interface PerplexityResponse {
  id: string;
  model: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  citations?: string[];
}

/**
 * Query Perplexity AI for research
 */
async function askPerplexity(query: string, systemPrompt?: string): Promise<PerplexityResponse> {
  const url = 'https://api.perplexity.ai/chat/completions';

  const messages: any[] = [];

  if (systemPrompt) {
    messages.push({
      role: 'system',
      content: systemPrompt
    });
  }

  messages.push({
    role: 'user',
    content: query
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'sonar', // or 'sonar-pro' for better quality
      messages: messages,
      temperature: 0.2, // Lower temperature for more factual responses
      return_citations: true,
      return_images: false
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Perplexity API error: ${response.status} ${response.statusText}\n${error}`);
  }

  return await response.json();
}

/**
 * Research article topic with sources
 */
async function researchTopic(topic: string): Promise<void> {
  console.log(`\n🔍 Researching: ${topic}`);
  console.log('═'.repeat(70));

  const systemPrompt = `You are a tech journalist researching article topics.
Provide factual, up-to-date information with specific details, dates, and numbers.
Focus on credible sources like major tech news sites, official announcements, and industry reports.
Format your response with clear sections and cite specific sources.`;

  try {
    const result = await askPerplexity(topic, systemPrompt);
    const content = result.choices[0].message.content;

    console.log('\n📄 Research Results:\n');
    console.log(content);

    if (result.citations && result.citations.length > 0) {
      console.log('\n\n📚 Sources:');
      result.citations.forEach((citation, index) => {
        console.log(`${index + 1}. ${citation}`);
      });
    }

  } catch (error) {
    console.error('❌ Research failed:', error);
  }
}

/**
 * Find Amazon products with ASINs
 */
async function findAmazonProducts(productQuery: string): Promise<void> {
  console.log(`\n🔍 Finding Amazon products: ${productQuery}`);
  console.log('═'.repeat(70));

  const systemPrompt = `You are helping find Amazon products.
For each product, provide:
1. Full product name
2. Amazon ASIN (the unique product ID)
3. Key features
4. Typical price range
5. Amazon product URL using the ASIN

Format your response as a structured list. Be specific about ASINs.`;

  const query = `Find the following products on Amazon and provide their exact ASINs:
${productQuery}

For each product, include: name, ASIN, key specs, and typical price.`;

  try {
    const result = await askPerplexity(query, systemPrompt);
    const content = result.choices[0].message.content;

    console.log('\n📦 Product Results:\n');
    console.log(content);

    if (result.citations && result.citations.length > 0) {
      console.log('\n\n📚 Sources:');
      result.citations.forEach((citation, index) => {
        console.log(`${index + 1}. ${citation}`);
      });
    }

    // Extract ASINs from the response
    const asinRegex = /\b[A-Z0-9]{10}\b/g;
    const asins = content.match(asinRegex);

    if (asins && asins.length > 0) {
      console.log('\n\n🔢 Extracted ASINs:');
      asins.forEach(asin => {
        console.log(`   ${asin} → https://amazon.com/dp/${asin}?tag=trendytecht0a-20`);
      });
    }

  } catch (error) {
    console.error('❌ Product search failed:', error);
  }
}

/**
 * Get article sources
 */
async function getArticleSources(articleTopic: string): Promise<void> {
  console.log(`\n🔍 Finding sources for: ${articleTopic}`);
  console.log('═'.repeat(70));

  const systemPrompt = `You are a fact-checker finding credible sources for tech articles.
Provide 5-7 high-quality sources that cover this topic.
Prioritize:
- Major tech news sites (TechCrunch, The Verge, Ars Technica, etc.)
- Official company announcements and press releases
- Industry reports and studies
- Avoid paywalled sources when possible

For each source, provide:
1. Article/page title
2. Publication/website
3. Full URL
4. Brief description of what information it contains
5. Publication date if available`;

  try {
    const result = await askPerplexity(
      `Find credible sources for an article about: ${articleTopic}`,
      systemPrompt
    );
    const content = result.choices[0].message.content;

    console.log('\n📰 Source Recommendations:\n');
    console.log(content);

    if (result.citations && result.citations.length > 0) {
      console.log('\n\n📚 Direct Citations:');
      result.citations.forEach((citation, index) => {
        console.log(`${index + 1}. ${citation}`);
      });
    }

  } catch (error) {
    console.error('❌ Source search failed:', error);
  }
}

/**
 * Compare products for reviews
 */
async function compareProducts(products: string[]): Promise<void> {
  console.log(`\n🔍 Comparing products`);
  console.log('═'.repeat(70));

  const systemPrompt = `You are a tech product reviewer creating comparison content.
Provide detailed, factual comparisons based on specs, features, and real reviews.
Include pros/cons for each product.
Cite specific sources for claims (e.g., battery life, ratings).`;

  const query = `Compare these products for a buying guide:
${products.map((p, i) => `${i + 1}. ${p}`).join('\n')}

For each product provide:
- Key specifications
- Pros and cons
- Best use cases
- Typical price
- Amazon ASIN if available
- Overall rating context`;

  try {
    const result = await askPerplexity(query, systemPrompt);
    const content = result.choices[0].message.content;

    console.log('\n📊 Comparison Results:\n');
    console.log(content);

    if (result.citations && result.citations.length > 0) {
      console.log('\n\n📚 Sources:');
      result.citations.forEach((citation, index) => {
        console.log(`${index + 1}. ${citation}`);
      });
    }

  } catch (error) {
    console.error('❌ Comparison failed:', error);
  }
}

/**
 * Main function - examples of different research modes
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('\n🤖 Perplexity Research Tool\n');
    console.log('Usage:');
    console.log('  npm run perplexity -- research "topic"');
    console.log('  npm run perplexity -- products "product search"');
    console.log('  npm run perplexity -- sources "article topic"');
    console.log('  npm run perplexity -- compare "product1" "product2" "product3"');
    console.log('\nExamples:');
    console.log('  npm run perplexity -- research "Google Gemini 3 launch November 2025"');
    console.log('  npm run perplexity -- products "Anker Soundcore Space A40"');
    console.log('  npm run perplexity -- sources "Apple Google Gemini Siri partnership"');
    console.log('  npm run perplexity -- compare "Anker Space A40" "JBL Live Pro 2" "1MORE Evo"');
    process.exit(0);
  }

  const mode = args[0];

  switch (mode) {
    case 'research':
      if (args[1]) {
        await researchTopic(args[1]);
      } else {
        console.error('❌ Please provide a research topic');
      }
      break;

    case 'products':
      if (args[1]) {
        await findAmazonProducts(args[1]);
      } else {
        console.error('❌ Please provide a product search query');
      }
      break;

    case 'sources':
      if (args[1]) {
        await getArticleSources(args[1]);
      } else {
        console.error('❌ Please provide an article topic');
      }
      break;

    case 'compare':
      if (args.length > 1) {
        await compareProducts(args.slice(1));
      } else {
        console.error('❌ Please provide products to compare');
      }
      break;

    default:
      console.error(`❌ Unknown mode: ${mode}`);
      console.log('Valid modes: research, products, sources, compare');
  }
}

main().catch(console.error);
