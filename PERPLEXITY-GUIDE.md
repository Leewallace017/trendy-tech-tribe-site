# Perplexity Research Tool Guide

Your Perplexity API integration is now set up and ready to use! This tool provides better research capabilities and more reliable sources than web scraping alone.

## What It Does

The Perplexity tool gives you four powerful research modes:

1. **Research Mode** - Get detailed information about any topic with citations
2. **Products Mode** - Find Amazon products with ASINs and specs
3. **Sources Mode** - Get credible article sources from major publications
4. **Compare Mode** - Compare multiple products for review articles

## Usage Examples

### 1. Research a Topic

Perfect for gathering information before writing an article:

```bash
npm run perplexity -- research "Google Gemini 3 launch November 2025"
npm run perplexity -- research "Apple AI features 2025"
npm run perplexity -- research "EV tax credit changes 2025"
```

**Output:** Detailed research summary with citations from credible sources

### 2. Find Amazon Products

Get accurate ASINs for your affiliate links:

```bash
npm run perplexity -- products "Anker Soundcore Space A40"
npm run perplexity -- products "Sony WH-1000XM5 headphones"
npm run perplexity -- products "Apple AirPods Pro 2"
```

**Output:**
- Full product name
- Amazon ASIN
- Key features and specs
- Typical price range
- Direct Amazon URLs with your affiliate tag

### 3. Get Article Sources

Find credible sources for news articles:

```bash
npm run perplexity -- sources "Apple Google Gemini Siri partnership"
npm run perplexity -- sources "Nvidia earnings Q3 2025"
npm run perplexity -- sources "Solar energy overtakes coal globally"
```

**Output:**
- 5-7 high-quality sources
- Publication name and article title
- Full URLs (prioritizes non-paywalled content)
- Brief description of each source
- Publication dates

### 4. Compare Products

Perfect for creating "Best of" guides:

```bash
npm run perplexity -- compare "Anker Space A40" "JBL Live Pro 2" "1MORE Evo"
npm run perplexity -- compare "iPhone 16 Pro" "Samsung S24 Ultra" "Google Pixel 9 Pro"
```

**Output:**
- Side-by-side comparison table
- Specs, pros/cons for each product
- Best use cases
- Typical prices
- Amazon ASINs when available
- Overall rating context with citations

## Workflow Integration

### For News Articles

1. **Research the topic**:
   ```bash
   npm run perplexity -- research "Your article topic here"
   ```

2. **Get credible sources**:
   ```bash
   npm run perplexity -- sources "Your article topic"
   ```

3. Add the URLs to your article's frontmatter `sources:` field

4. Verify sources work:
   ```bash
   npm run verify-article src/content/category/your-article.md
   ```

### For Product Reviews ("Picks" Articles)

1. **Compare products**:
   ```bash
   npm run perplexity -- compare "Product 1" "Product 2" "Product 3"
   ```

2. **Get individual product details**:
   ```bash
   npm run perplexity -- products "Specific product name"
   ```

3. Add ASINs to your article's `affiliateProducts:` field with your affiliate tag:
   ```yaml
   affiliateProducts:
     - name: "Product Name"
       url: "https://www.amazon.com/dp/ASINHERE?tag=trendytecht0a-20"
   ```

4. Verify ASINs work:
   ```bash
   npm run verify-asins
   ```

## Why Perplexity is Better

### vs. Web Scraping (ScrapingBee)

**Perplexity Advantages:**
- Real-time, up-to-date information
- Intelligent synthesis from multiple sources
- Built-in citations and source verification
- No rate limiting or bot detection issues
- Better at understanding context and nuance
- Can answer complex questions

**ScrapingBee Advantages:**
- Direct access to specific websites
- Good for structured data extraction
- Visual page scraping capability

**Best Practice:** Use both together
- Use Perplexity for research and finding information
- Use ScrapingBee for specific tasks like verifying ASINs on Amazon directly

## Tips for Best Results

### Product Search Tips

Be specific with product names:
- ✅ "Anker Soundcore Space A40 wireless earbuds"
- ✅ "Sony WH-1000XM5 over-ear headphones"
- ❌ "good headphones" (too vague)
- ❌ "earbuds" (not specific enough)

### Research Tips

Include dates for current events:
- ✅ "Google Gemini 3 launch November 2025"
- ✅ "Apple earnings Q4 2025"
- ❌ "Google AI" (too broad)

### Source Finding Tips

Be descriptive about your article topic:
- ✅ "Apple Google Gemini Siri partnership deal details"
- ✅ "Meta antitrust breakup ruling November 2025"
- ❌ "tech news" (too vague)

## Cost & Rate Limits

Perplexity API pricing (as of 2025):
- **Sonar model**: $1 per 1M tokens (used by default)
- **Sonar Pro**: $3 per 1M tokens (higher quality)

Your current script uses the standard `sonar` model for cost efficiency.

**Estimated costs:**
- Research query: ~$0.001-0.005
- Product search: ~$0.002-0.008
- Comparison: ~$0.005-0.015

**Very affordable** - probably $5-10/month for regular usage.

## Troubleshooting

### "PERPLEXITY_API_KEY not found"
Make sure your [.env](.env) file contains:
```
PERPLEXITY_API_KEY=your-api-key-here
```

### API Error 401 (Unauthorized)
Your API key may be invalid or expired. Check your Perplexity dashboard.

### API Error 429 (Rate Limited)
You've exceeded your rate limit. Wait a minute and try again, or upgrade your plan.

### No ASINs Found
The product may not be available on Amazon, or Perplexity couldn't find specific ASIN information. Try:
- Using the full, exact product name
- Using ScrapingBee's Amazon search as fallback
- Searching Amazon manually

## Next Steps

You can now:
- Create a new article and use Perplexity to research it
- Update existing articles with better sources from Perplexity
- Find accurate ASINs for product recommendations
- Generate comparison content for review articles

**Pro tip:** Bookmark this guide and keep it handy as you create content!
