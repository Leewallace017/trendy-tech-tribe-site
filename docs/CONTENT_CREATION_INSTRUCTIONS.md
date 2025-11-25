# Content Creation Instructions for AI Assistants

**Version:** 2.0 - Perplexity Integrated
**Last Updated:** November 24, 2025

This is the primary guide for AI assistants creating content for Trendy Tech Tribe.

---

## 🎯 Quick Start Workflow

### For News/Analysis Articles (5-10 min)

1. **Research with Perplexity**:
   ```bash
   npm run perplexity -- research "topic with date context"
   npm run perplexity -- sources "topic"
   ```

2. **Create article** using [quick-take-template.md](templates/quick-take-template.md)

3. **Verify sources** work: `npm run verify-article src/content/[category]/[article].md`

### For Product Reviews/Best-Lists (15-20 min)

1. **Research products with Perplexity**:
   ```bash
   npm run perplexity -- compare "product1" "product2" "product3"
   npm run perplexity -- products "specific product for ASIN"
   ```

2. **Create article** using [best-list-template.md](templates/best-list-template.md)

3. **Verify ASINs**: `npm run verify-asins`

---

## 🔍 Research Workflow (Perplexity First)

### Primary Research Tool: Perplexity API

**Perplexity provides:**
- Real-time, current information (Nov 2025)
- Credible sources with citations
- Accurate Amazon ASINs
- Product comparisons
- Better than manual web scraping

### Research Commands

#### 1. General Topic Research
```bash
npm run perplexity -- research "topic description with date"
```
**Use for:** Background information, current events, market analysis

**Example:**
```bash
npm run perplexity -- research "Apple AI features November 2025"
npm run perplexity -- research "EV tax credit changes 2025"
```

#### 2. Find Article Sources
```bash
npm run perplexity -- sources "article topic"
```
**Use for:** Finding credible sources for news articles

**Returns:** 5-7 high-quality sources with URLs from major publications

**Example:**
```bash
npm run perplexity -- sources "Meta antitrust ruling November 2025"
```

#### 3. Product Research & ASINs
```bash
npm run perplexity -- products "product name"
```
**Use for:** Finding Amazon products with correct ASINs

**Returns:** ASIN, specs, features, price range, affiliate URL

**Example:**
```bash
npm run perplexity -- products "Sony WH-1000XM5 headphones"
```

#### 4. Product Comparisons
```bash
npm run perplexity -- compare "product1" "product2" "product3"
```
**Use for:** Creating best-list articles and comparisons

**Returns:** Detailed comparison table with specs, pros/cons, ASINs

**Example:**
```bash
npm run perplexity -- compare "iPhone 16 Pro" "Samsung S24 Ultra" "Google Pixel 9 Pro"
```

---

## 📝 Article Creation Process

### Step 1: Choose Template

Templates in `docs/templates/`:
- **quick-take-template.md** - News/analysis (800-1200 words)
- **best-list-template.md** - Product roundups (1500-2500 words)
- **deep-dive-template.md** - Detailed analysis (2500-4000 words)
- **opinion-template.md** - Editorial (1200-2000 words)
- **product-review-template.md** - Single product review (1200-2000 words)

### Step 2: Research with Perplexity

**For news articles:**
```bash
# Get research
npm run perplexity -- research "topic with November 2025 date"

# Get credible sources
npm run perplexity -- sources "topic"
```

**For product articles:**
```bash
# Compare products
npm run perplexity -- compare "product1" "product2" "product3"

# Get specific ASINs
npm run perplexity -- products "product name"
```

### Step 3: Create Article

1. Copy appropriate template to `src/content/[category]/`
2. Fill in frontmatter with Perplexity research results
3. Write content following template structure
4. Add sources from Perplexity to `sources:` array
5. Add Amazon ASINs to `affiliateProducts:` array (for product articles)

### Step 4: Verification

**For all articles:**
```bash
npm run verify-article src/content/[category]/[article-name].md
```

**For product articles:**
```bash
npm run verify-asins
```
Then manually test each ASIN in browser.

---

## 🛒 Amazon Affiliate Rules (CRITICAL)

### Link Format (Always)
```
✅ CORRECT: https://www.amazon.com/dp/B09B8V1LZ3?tag=trendytecht0a-20
❌ WRONG: https://amazon.com/dp/B09B8V1LZ3?tag=trendytecht0a-20 (missing www.)
❌ WRONG: https://www.amazon.com/dp/B09B8V1LZ3 (missing affiliate tag)
```

### Pricing Rules (MANDATORY)
```
❌ NEVER: List specific prices ($79, $149, $199.99, etc.)
❌ NEVER: "Only $79!" or "Just $149"
❌ NEVER: Price in comparison tables

✅ ALWAYS: Use price ranges
  - "under $100"
  - "$100-200 range"
  - "around $150"
  - "mid-range pricing"

✅ ALWAYS: Include disclaimer
  - "Prices change frequently"
  - "Check Amazon for current price"
```

### ASIN Verification Process

**Use Perplexity to find ASINs:**
```bash
npm run perplexity -- products "product name"
```

**Then verify each ASIN manually:**
1. Open: `https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20`
2. Check: Page loads, product available, matches description
3. Screenshot: Save proof showing URL bar with affiliate tag

**Run verification script:**
```bash
npm run verify-asins
```

**NEVER publish product articles without:**
- [ ] Valid ASINs from Perplexity or manual verification
- [ ] All ASINs tested in browser
- [ ] Affiliate tag on ALL Amazon links
- [ ] Price ranges only (no specific prices)

---

## 📋 Article Templates

### News/Quick-Take Article Structure
```markdown
## What Happened
[2-3 sentences: The core news]

## Key Details
- Bullet points of important facts
- Dates, numbers, names
- From Perplexity research

## Why It Matters
[2-3 paragraphs: Impact and significance]

## The Backstory
[Context and history]

## What's Next
[Future implications]

## The Bottom Line
[1-2 sentence summary]

## Sources
[From Perplexity sources command]
```

### Best-List Article Structure
```markdown
## Quick Picks
- **Best Overall**: Product name
- **Best Value**: Product name
- **Best Premium**: Product name

## What to Look For
[Buying criteria from Perplexity comparison]

## Our Top Picks
### 1. Product Name - Best Overall
[Detailed review with specs from Perplexity]
[View on Amazon](amazon-link-with-asin)

### 2. Product Name - Runner Up
[Continue for 5-7 products]

## Comparison Table
[From Perplexity compare results]

## Buying Guide
[Education section]

## FAQs
[Common questions]

## Final Verdict
[Summary and recommendations]

## Sources
[Research sources]
```

---

## ✅ Pre-Publishing Checklist

### For All Articles
- [ ] Date is current (today or future, never past)
- [ ] Research from Perplexity is current (November 2025)
- [ ] Sources in frontmatter from `npm run perplexity -- sources`
- [ ] Source links verified with `npm run verify-article`
- [ ] No made-up quotes or fake sources
- [ ] Image relevant to article
- [ ] Image credit included
- [ ] Template structure followed

### For Product Articles (Additional)
- [ ] ASINs found via `npm run perplexity -- products`
- [ ] Product comparison from `npm run perplexity -- compare`
- [ ] All ASINs verified in browser
- [ ] Affiliate tag on ALL Amazon links: `?tag=trendytecht0a-20`
- [ ] Amazon URLs include "www."
- [ ] NO specific prices anywhere
- [ ] Price ranges only
- [ ] `npm run verify-asins` passed

---

## 🚫 Common Mistakes to Avoid

### Research Mistakes
❌ Using outdated information (pre-November 2025)
❌ Not using Perplexity for current research
❌ Making up sources or quotes
❌ Speculation without labeling as such
❌ Single-source claims

✅ Use Perplexity for all research
✅ Verify facts across multiple sources
✅ Include publication dates
✅ Label opinions clearly

### Amazon Mistakes
❌ Skipping ASIN verification
❌ Missing affiliate tag: `?tag=trendytecht0a-20`
❌ Missing "www." in URLs
❌ Listing specific prices
❌ Using unverified ASINs

✅ Use Perplexity to find ASINs
✅ Test every ASIN in browser
✅ Use price ranges only
✅ Include affiliate tag always

### Template Mistakes
❌ Skipping template sections
❌ Using wrong template
❌ Past dates on articles
❌ Generic/irrelevant images

✅ Follow template structure
✅ Current or future dates only
✅ Relevant, specific images

---

## 📁 File Organization

### Content Directories
```
src/content/
  ├── tech/         # Tech & Innovation
  ├── ai/           # AI & Automation
  ├── evs/          # EVs & Mobility
  ├── energy/       # Energy & Policy
  ├── markets/      # Markets & Money
  └── picks/        # Picks & Reviews (product content)
```

### Naming Convention
```
[topic-slug]-[year].md

Examples:
- best-wireless-earbuds-2025.md
- apple-ai-features-2025.md
- ev-tax-credit-changes-2025.md
```

---

## 🔧 Available Tools

### Research Tools
```bash
# Primary research
npm run perplexity -- research "topic"

# Find sources
npm run perplexity -- sources "topic"

# Find products/ASINs
npm run perplexity -- products "product name"

# Compare products
npm run perplexity -- compare "product1" "product2" "product3"
```

### Verification Tools
```bash
# Verify article links
npm run verify-article src/content/[category]/[file].md

# Verify Amazon ASINs
npm run verify-asins

# Full pre-publish check
npm run pre-publish
```

### Image Generation
```bash
# Generate AI image for article
npm run generate-image
```

---

## 📊 Quality Standards

### Research Quality
- Use Perplexity for all current information
- Verify facts across 3+ sources
- Include source URLs in frontmatter
- Add "Sources" section at article end
- Publication dates for all sources

### Writing Quality
- Clear, concise, professional tone
- Active voice preferred
- Short paragraphs (2-4 sentences)
- Subheadings every 200-300 words
- Bullet points for lists

### SEO Requirements
- Primary keyword in first paragraph
- Keyword in 1-2 subheadings
- Natural keyword density (1-2%)
- Internal links to related articles
- Meta description 150-160 characters

### Length Targets
- Quick-take: 800-1200 words
- Best-list: 1500-2500 words
- Product-review: 1200-2000 words
- Deep-dive: 2500-4000 words
- Opinion: 1200-2000 words

---

## 🎓 Complete Example: Creating a Best-List Article

### Step 1: Research Products
```bash
# Compare top products
npm run perplexity -- compare "Anker Space A40" "JBL Live Pro 2" "1MORE Evo"

# Get specific ASINs
npm run perplexity -- products "Anker Soundcore Space A40"
npm run perplexity -- products "JBL Live Pro 2"
npm run perplexity -- products "1MORE Evo"

# Find review sources
npm run perplexity -- sources "best wireless earbuds 2025"
```

### Step 2: Create Article
```bash
# Copy template
cp docs/templates/best-list-template.md src/content/picks/best-wireless-earbuds-2025.md

# Edit file with Perplexity research results
```

### Step 3: Add Content
- Use Perplexity comparison data for product details
- Add ASINs from Perplexity products command
- Include sources from Perplexity sources command
- Follow template structure
- Use price ranges only

### Step 4: Verify
```bash
# Verify ASINs
npm run verify-asins

# Test each ASIN manually
open "https://www.amazon.com/dp/B0B1LPNDGF?tag=trendytecht0a-20"

# Verify article links
npm run verify-article src/content/picks/best-wireless-earbuds-2025.md
```

### Step 5: Publish
```bash
git add src/content/picks/best-wireless-earbuds-2025.md
git commit -m "feat: add best wireless earbuds 2025 with verified ASINs"
git push
```

**Total Time:** 15-20 minutes with Perplexity

---

## 🆘 Troubleshooting

### "Perplexity API not working"
Check: `.env` file contains `PERPLEXITY_API_KEY=...`

### "ASIN doesn't work"
1. Try Perplexity: `npm run perplexity -- products "product name"`
2. Verify in browser: `https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20`
3. If invalid, search Amazon manually for replacement

### "Source links broken"
1. Use Perplexity: `npm run perplexity -- sources "topic"`
2. Verify each URL loads
3. Replace broken links with alternatives from Perplexity

### "Article not showing on site"
1. Check frontmatter YAML is valid
2. Verify category matches directory
3. Ensure date format: `YYYY-MM-DD`
4. Run `npm run build` to catch errors

---

## 📚 Additional Documentation

**Quick reference:** [PERPLEXITY-GUIDE.md](../PERPLEXITY-GUIDE.md)
**Templates:** `docs/templates/`
**Workflows:** `docs/workflows/`
**Amazon rules:** [AMAZON_PRICING_RULES.md](AMAZON_PRICING_RULES.md)
**ASIN guide:** [ASIN_VERIFICATION_GUIDE.md](ASIN_VERIFICATION_GUIDE.md)

---

## 🎯 Success Criteria

A well-created article has:
- ✅ Current, verified research from Perplexity
- ✅ Working source links
- ✅ Verified Amazon ASINs (for product content)
- ✅ Affiliate tags on all Amazon links
- ✅ Price ranges only (no specific prices)
- ✅ Followed template structure
- ✅ Relevant image with credit
- ✅ Current or future date
- ✅ Professional, helpful content

---

**Remember:** Perplexity is your primary research tool. Use it first for all research, sources, products, and comparisons.
