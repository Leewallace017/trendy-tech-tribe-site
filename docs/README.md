# Trendy Tech Tribe - Documentation Hub

**Last Updated:** November 24, 2025

Welcome to the Trendy Tech Tribe documentation. Everything you need to create, verify, and publish content.

---

## 🚀 Quick Start

### For AI Assistants
**Start here:** [CONTENT_CREATION_INSTRUCTIONS.md](CONTENT_CREATION_INSTRUCTIONS.md)
The complete guide for creating content using Perplexity AI.

### For Humans
1. Review [CONTENT_CREATION_GUIDE.md](CONTENT_CREATION_GUIDE.md) for overview
2. Choose a template from [`templates/`](templates/)
3. Follow the [Perplexity Guide](../PERPLEXITY-GUIDE.md) for research

---

## 📚 Core Documentation

### Content Creation
- **[CONTENT_CREATION_INSTRUCTIONS.md](CONTENT_CREATION_INSTRUCTIONS.md)** ⭐ PRIMARY GUIDE
  Complete workflow for AI assistants with Perplexity integration

- **[CONTENT_CREATION_GUIDE.md](CONTENT_CREATION_GUIDE.md)**
  Human-readable overview of content creation process

- **[Perplexity Guide](../PERPLEXITY-GUIDE.md)**
  How to use Perplexity AI for research, sources, and Amazon products

### Templates
- **[best-list-template.md](templates/best-list-template.md)** - Product roundups
- **[quick-take-template.md](templates/quick-take-template.md)** - News articles
- **[deep-dive-template.md](templates/deep-dive-template.md)** - Long-form analysis
- **[opinion-template.md](templates/opinion-template.md)** - Editorial pieces
- **[product-review-template.md](templates/product-review-template.md)** - Single product reviews

### Amazon Affiliate Guidelines
- **[AMAZON_PRICING_RULES.md](AMAZON_PRICING_RULES.md)**
  Pricing rules and compliance (NO specific prices!)

- **[ASIN_VERIFICATION_GUIDE.md](ASIN_VERIFICATION_GUIDE.md)**
  How to verify Amazon ASINs work correctly

- **[AFFILIATE_TAG_ENFORCEMENT.md](AFFILIATE_TAG_ENFORCEMENT.md)**
  Ensuring affiliate tags are present

### Verification & Quality
- **[LINK_VERIFICATION_GUIDE.md](LINK_VERIFICATION_GUIDE.md)**
  How to verify all links work

- **[SOURCE_LINKS_GUIDE.md](SOURCE_LINKS_GUIDE.md)**
  Guidelines for credible sources

---

## 🔧 Tools & Commands

### Research (Perplexity)
```bash
# General research
npm run perplexity -- research "topic with date"

# Find article sources
npm run perplexity -- sources "topic"

# Find Amazon products/ASINs
npm run perplexity -- products "product name"

# Compare products
npm run perplexity -- compare "product1" "product2" "product3"
```

### Verification
```bash
# Verify article sources
npm run verify-article src/content/[category]/[file].md

# Verify Amazon ASINs
npm run verify-asins

# Full pre-publish check
npm run pre-publish

# Audit all source links
npm run audit-sources
```

### Development
```bash
# Run dev server
npm run dev

# Build site
npm run build

# Generate AI image
npm run generate-image
```

---

## 📋 Workflows

### Creating Best-List Articles
1. Research with Perplexity: `npm run perplexity -- compare "products"`
2. Get ASINs: `npm run perplexity -- products "product"`
3. Use template: [best-list-template.md](templates/best-list-template.md)
4. Verify ASINs: `npm run verify-asins`
5. Publish

**Full workflow:** [create-best-list-article.md](workflows/create-best-list-article.md)

### Creating News Articles
1. Research: `npm run perplexity -- research "topic"`
2. Get sources: `npm run perplexity -- sources "topic"`
3. Use template: [quick-take-template.md](templates/quick-take-template.md)
4. Verify: `npm run verify-article`
5. Publish

### Monthly Maintenance
- **[monthly-asin-audit.md](workflows/monthly-asin-audit.md)**
  Verify all Amazon links still work

---

## ✅ Quality Checklist

### Every Article Must Have:
- [ ] Current date (today or future, never past)
- [ ] Research from Perplexity (November 2025)
- [ ] Verified sources with URLs
- [ ] Relevant image with credit
- [ ] Followed template structure
- [ ] No spelling/grammar errors

### Product Articles Must Also Have:
- [ ] ASINs from Perplexity or manual verification
- [ ] All ASINs tested in browser
- [ ] Affiliate tag on ALL links: `?tag=trendytecht0a-20`
- [ ] Price ranges only (NO specific prices)
- [ ] Screenshots of ASIN verification

---

## 🚫 Common Mistakes

### Research
❌ Using outdated information
❌ Not using Perplexity first
❌ Making up sources or quotes
❌ Single-source claims

### Amazon
❌ Specific prices ($79, $149)
❌ Missing affiliate tag
❌ Missing "www." in URL
❌ Unverified ASINs

### Templates
❌ Skipping sections
❌ Using past dates
❌ Generic images
❌ Wrong category

---

## 📁 File Structure

```
src/content/
  ├── tech/         # Tech & Innovation
  ├── ai/           # AI & Automation
  ├── evs/          # EVs & Mobility
  ├── energy/       # Energy & Policy
  ├── markets/      # Markets & Money
  └── picks/        # Picks & Reviews (products)

docs/
  ├── templates/    # Article templates
  ├── workflows/    # Step-by-step workflows
  ├── *.md          # Guides and documentation
  └── README.md     # This file

scripts/
  ├── perplexity-research.ts    # Perplexity research tool
  ├── verify-*.ts               # Verification scripts
  └── *.ts                      # Other utilities
```

---

## 🔗 Key Links

- **Perplexity Guide:** [../PERPLEXITY-GUIDE.md](../PERPLEXITY-GUIDE.md) ⭐
- **Main Instructions:** [CONTENT_CREATION_INSTRUCTIONS.md](CONTENT_CREATION_INSTRUCTIONS.md)
- **Amazon Rules:** [AMAZON_PRICING_RULES.md](AMAZON_PRICING_RULES.md)
- **Templates:** [templates/](templates/)

---

## 🆘 Help & Troubleshooting

### Perplexity Not Working
Check: `.env` contains `PERPLEXITY_API_KEY=...`

### ASINs Invalid
1. Try: `npm run perplexity -- products "product name"`
2. Test in browser manually
3. Search Amazon for replacement if needed

### Links Broken
1. Use: `npm run perplexity -- sources "topic"`
2. Verify each URL loads
3. Replace with working alternatives

### Article Not Showing
1. Check YAML frontmatter is valid
2. Verify category matches directory
3. Check date format: `YYYY-MM-DD`
4. Run: `npm run build` to see errors

---

## 📊 Performance Targets

### Creation Time
- News article: 5-10 minutes
- Best-list: 15-20 minutes
- Deep-dive: 30-45 minutes

### Quality Metrics
- All sources verified
- All ASINs working
- All affiliate tags present
- No specific prices
- Template structure followed

---

## 🎯 Success Criteria

A well-created article:
- ✅ Uses Perplexity for research
- ✅ Has working, credible sources
- ✅ Follows template structure
- ✅ Passes verification scripts
- ✅ Provides real value to readers

---

**Remember:** Start with Perplexity. It's your primary research tool for everything.
