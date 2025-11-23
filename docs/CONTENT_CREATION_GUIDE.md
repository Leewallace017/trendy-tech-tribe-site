# Content Creation Guide - Trendy Tech Tribe

## Quick Start

This guide provides everything you need to create high-quality, SEO-optimized articles with proper affiliate integration and fact-checking.

---

## Article Templates

All templates are located in `/templates/`:

1. **best-list-template.md** - Product comparison/roundup articles
2. **product-review-template.md** - Individual product reviews
3. **deep-dive-template.md** - In-depth analysis (2500-4000 words)
4. **quick-take-template.md** - Timely news commentary (800-1200 words)
5. **opinion-template.md** - Editorial perspective pieces

---

## Content Creation Workflow

### 1. Choose Your Topic & Template

- Review the [CONTENT_CALENDAR_WEEK1.md](./CONTENT_CALENDAR_WEEK1.md) for planned articles
- Select the appropriate template based on article type
- Copy template to the correct content directory:
  - `/src/content/tech/` - Tech & Innovation
  - `/src/content/ai/` - AI & Automation
  - `/src/content/evs/` - EVs & Mobility
  - `/src/content/energy/` - Energy & Policy
  - `/src/content/markets/` - Markets & Money
  - `/src/content/picks/` - Picks & Reviews

### 2. Research & Fact-Checking

**Required for every article:**

✅ Verify claims across **3+ reputable sources**
✅ Check facts against primary sources (company websites, official reports, academic papers)
✅ For product articles: verify current pricing and availability
✅ Cross-reference statistics and data points
✅ Document all sources in the `sources` frontmatter array

**Good Source Examples:**
- Official company press releases
- Peer-reviewed research papers
- Established tech publications (The Verge, Ars Technica, Bloomberg)
- Government/regulatory websites (.gov sites)
- Financial data platforms (Yahoo Finance, Bloomberg)

**Avoid:**
- Single-source claims
- Unverified social media posts
- Competitor blogs without verification
- Outdated data (prefer sources within 30 days for news, 1 year for evergreen)

### 3. Image Sourcing

**Three approved methods:**

1. **Unsplash** (free stock photos)
   - Browse https://unsplash.com/
   - Copy image URL: `https://images.unsplash.com/photo-XXXXX`
   - Note photographer name for attribution
   - Set `imageCredit: "Photo by [Name] on Unsplash"`

2. **AI Generation** (DALL-E, Midjourney, etc.)
   - Generate custom images for unique content
   - Set `imageCredit: "AI Generated Image"`

3. **Press Release Images**
   - Official product photos from manufacturer press kits
   - Verify license allows editorial use
   - Set `imageCredit: "Image courtesy of [Company Name]"`

**Always include:**
- `image: "URL"`
- `imageAlt: "Descriptive alt text for accessibility"`
- `imageCredit: "Proper attribution"`

### 4. Amazon Affiliate Integration

**For product-focused articles (reviews, best-lists):**

All Amazon links MUST include your affiliate tracking ID: `trendytecht0a-20`

**Proper Amazon URL format:**
```
https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20
```

**In frontmatter:**
```yaml
affiliateProducts:
  - name: "Product Name"
    url: "https://www.amazon.com/dp/B0XXXXXXXX?tag=trendytecht0a-20"
    price: "$XX"  # Optional, use "Price varies" if unknown
```

**Important Amazon Rules:**
- ✅ Always include pricing disclaimer: "as of [date]"
- ✅ Never make false claims about products
- ✅ Disclose affiliate relationship (handled by footer)
- ✅ Check links work before publishing
- ❌ Don't use affiliate links in a deceptive manner
- ❌ Don't guarantee specific prices (they change)

**Using the Affiliate Helper:**
```typescript
import { addAmazonAffiliateTag, processAffiliateProducts } from '@/utils/affiliate';

// Automatically add tracking ID to URL
const affiliateUrl = addAmazonAffiliateTag('https://amazon.com/dp/B0ABC123');
```

### 5. Link Verification

**Before publishing, verify ALL links work:**

```bash
# Manual check: click every link in your article

# Or use the link verification utility:
```

```typescript
import { validateArticleLinks } from '@/utils/linkVerification';

// In your build process or testing:
const result = await validateArticleLinks(frontmatter);
if (!result.valid) {
  console.error('Broken links found:', result.brokenLinks);
}
```

**Link Checklist:**
- ✅ All Amazon product links load correctly
- ✅ Source URLs return 200 status
- ✅ No broken or 404 links
- ✅ External links open in correct pages
- ✅ Affiliate tracking ID present in Amazon URLs

### 6. Frontmatter Requirements

**Every article must have:**

```yaml
---
title: "Compelling, SEO-friendly title"
date: "YYYY-MM-DD"
author: "Trendy Tech Tribe Staff"  # Always this value
category: "[One of the 6 categories]"
tags: ["3-5", "relevant", "keywords"]
type: "[Article type: quick-take, deep-dive, product-review, best-list, opinion]"
summary: "1-2 sentence summary for previews"
seoTitle: "SEO-optimized title (50-60 characters)"
seoDescription: "Meta description for search engines (150-160 characters)"
image: "https://image-url.com/photo.jpg"
imageAlt: "Descriptive alt text"
imageCredit: "Photo attribution"
featured: false  # Set true for hero section display
affiliateProducts: []  # Populate for product content
sources:
  - title: "Source Title"
    url: "https://source-url.com"
---
```

**Common mistakes to avoid:**
- ❌ Missing author field (defaults to "Trendy Tech Tribe Staff" but should be explicit)
- ❌ Wrong category name (must match exactly one of the 6)
- ❌ Empty tags array
- ❌ Missing SEO fields
- ❌ No image credit

### 7. Writing Guidelines

**Tone & Style:**
- Clear, concise, professional
- Avoid hyperbole and excessive superlatives
- Use active voice
- Short paragraphs (2-4 sentences)
- Subheadings every 200-300 words
- Bullet points for lists

**SEO Best Practices:**
- Include primary keyword in first paragraph
- Use keyword in 1-2 subheadings
- Natural keyword density (1-2%)
- Internal links to other articles when relevant
- External links to authoritative sources

**Length Targets:**
- Quick-take: 800-1200 words
- Best-list: 1500-2500 words
- Product-review: 1200-2000 words
- Deep-dive: 2500-4000 words
- Opinion: 1200-2000 words

### 8. Quality Checklist

Before publishing, verify:

**Content Quality:**
- [ ] Claims verified across 3+ sources
- [ ] No spelling/grammar errors
- [ ] Compelling introduction and conclusion
- [ ] Clear value proposition (what does reader learn?)
- [ ] Proper headings hierarchy (H2, H3, not skipping levels)

**Technical:**
- [ ] All frontmatter fields completed
- [ ] Author set to "Trendy Tech Tribe Staff"
- [ ] Category and type are correct
- [ ] Tags are relevant and specific
- [ ] Image has proper credit and alt text

**Monetization:**
- [ ] Amazon affiliate links include tracking ID (if applicable)
- [ ] All product links verified working
- [ ] Pricing includes disclaimer
- [ ] Sources array populated with working URLs

**SEO:**
- [ ] SEO title 50-60 characters
- [ ] SEO description 150-160 characters
- [ ] Primary keyword in title and first paragraph
- [ ] Subheadings optimized for search intent

---

## Content Strategy Tips

### Article Timing

**News/Quick-takes:**
- Publish within 24-48 hours of news breaking
- Update if new developments emerge
- Focus on analysis, not just reporting

**Product Reviews:**
- Publish when product launches or shortly after
- Update with long-term testing notes after 1-3 months
- Compare with newer alternatives periodically

**Best-Lists:**
- Update quarterly or when significant new products launch
- Add "Updated [Month Year]" to title
- Remove discontinued products

**Deep-Dives:**
- Evergreen content - focus on timeless analysis
- Update annually with new data
- Reference current events but don't depend on them

### Keyword Research

Before writing, check:
1. **Google Trends** - Is topic trending?
2. **Search Volume** - Use tools like Ahrefs/SEMrush (if available)
3. **Competition** - Can you rank for this keyword?
4. **User Intent** - What are people actually looking for?

### Internal Linking

- Link to 2-3 related articles per piece
- Use descriptive anchor text
- Link to category pages
- Create topic clusters (multiple articles on related topics)

---

## AI & Automation Tools

### Recommended Writing Aids

- **Grammarly/Hemingway** - Grammar and readability
- **ChatGPT/Claude** - Research assistance, outline generation
- **Perplexity** - Fact-checking and source finding
- **DALL-E/Midjourney** - Custom image generation

### When to Use AI

✅ Generating article outlines
✅ Researching background information
✅ Checking grammar and style
✅ Creating custom images
✅ Summarizing long sources

❌ Don't rely on AI for:
- Final article text without heavy editing
- Fact-checking (AI hallucinates)
- Product recommendations (AI can't test products)
- Original analysis and opinions

---

## Publishing Workflow

1. **Write** article using template
2. **Research** and verify all facts
3. **Source images** with proper attribution
4. **Add affiliate links** (if product content)
5. **Verify all links** work
6. **Review frontmatter** completeness
7. **Proofread** for errors
8. **Build site** locally to test
9. **Commit and push** to GitHub
10. **Verify** article displays correctly on live site

---

## Measuring Success

### Key Metrics to Track

- **Page Views** - Overall traffic
- **Time on Page** - Engagement quality
- **Bounce Rate** - Content relevance
- **Affiliate Clicks** - Monetization potential
- **Social Shares** - Viral potential
- **Rankings** - SEO performance

### Google Analytics Setup

(Once you have 20+ articles, apply for AdSense and set up GA4)

Track:
- Top performing articles
- Traffic sources
- User behavior flow
- Conversion rates (affiliate clicks)

---

## Common Issues & Solutions

### "My affiliate links aren't working"

✓ Verify you added the tracking ID: `?tag=trendytecht0a-20`
✓ Check the ASIN is correct in the URL
✓ Test the link in an incognito window
✓ Confirm you're approved for Amazon Associates

### "Article not showing up on site"

✓ Check frontmatter is valid YAML (no syntax errors)
✓ Verify category name matches exactly
✓ Ensure date is in correct format (YYYY-MM-DD)
✓ Run `npm run build` to catch errors
✓ Check file is in correct content directory

### "Images not loading"

✓ Verify image URL is accessible (try in browser)
✓ Check for HTTPS (not HTTP)
✓ Ensure imageCredit and imageAlt are present
✓ Test Unsplash URLs (they sometimes change)

### "Links marked as broken but they work"

✓ Some sites block automated requests (like link checkers)
✓ Manually verify if checker flags false positives
✓ Check if site requires authentication
✓ Try the URL in different browser/incognito

---

## Next Steps

1. Review existing articles in `/src/content/` for examples
2. Choose a template from `/templates/`
3. Follow the Content Calendar for topic ideas
4. Start with Quick-takes (fastest to write)
5. Build up to Deep-dives and Best-lists

**Goal**: Publish 6 articles/day (one per category) consistently.

**Reality Check**: This is aggressive. Start with 2-3 articles/day and scale up as you develop a workflow.

---

Last Updated: January 28, 2025
