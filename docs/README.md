# Content Creation Master Guide

**Last Updated:** November 24, 2025

This guide consolidates all content creation instructions for Trendy Tech Tribe.

## Quick Start

1. **Choose workflow:**
   - Single article: Use [`REAL_CONTENT_WORKFLOW.md`](./REAL_CONTENT_WORKFLOW.md)
   - Multiple articles: Use [`workflows/write-multiple-articles.md`](./workflows/write-multiple-articles.md)
   - Best-list article: Use [`workflows/create-best-list-article.md`](./workflows/create-best-list-article.md)

2. **Select template** from [`templates/`](./templates/) directory

3. **Follow verification steps** before publishing

---

## Core Principles

### Always Use Real Research
- Web search for current news (last 7 days)
- Verify facts across 3+ sources
- Never make up quotes, statistics, or sources
- Use actual dates from research

### Current Dates Only
- Article date: TODAY or later (never past dates)
- Event dates: Actual dates from research
- Example: `date: "2025-11-24"` for article published today

### Source Everything
- Include sources in frontmatter
- Add Sources section at end of article
- Verify all URLs load successfully
- Cross-reference facts across multiple sources

### Follow Templates
- Templates in [`templates/`](./templates/) directory
- Don't skip sections
- Maintain consistent structure
- Use appropriate template for content type

---

## Article Types & Templates

### Quick-Take (News/Analysis)
**Template:** [`templates/quick-take-template.md`](./templates/quick-take-template.md)

**Use for:** Breaking news, company announcements, market analysis

**Structure:**
- What Happened
- Key Details
- Why It Matters
- The Backstory
- Expert Reactions
- What's Next
- Our Take
- The Bottom Line

**Time:** 5-10 minutes per article

---

### Best-List (Product Roundups)
**Template:** [`templates/best-list-template.md`](./templates/best-list-template.md)

**Use for:** Product recommendations, buying guides, comparisons

**Structure:**
- Quick Picks
- What to Look For
- Detailed Product Reviews
- Comparison Table
- Buying Guide
- FAQs
- Final Verdict

**Time:** 15-20 minutes per article

**CRITICAL:** Must verify all Amazon ASINs before publishing (see Amazon Guidelines below)

---

### Deep-Dive (Detailed Analysis)
**Template:** [`templates/deep-dive-template.md`](./templates/deep-dive-template.md)

**Use for:** Complex topics requiring detailed explanation

**Time:** 20-30 minutes per article

---

### Opinion (Editorial)
**Template:** [`templates/opinion-template.md`](./templates/opinion-template.md)

**Use for:** Editorial perspective on trends, controversial topics

**Time:** 15-20 minutes per article

---

## Amazon Affiliate Guidelines

### Link Format
✅ **CORRECT:**
```
https://www.amazon.com/dp/B09B8V1LZ3?tag=trendytecht0a-20
```

❌ **WRONG:**
```
https://amazon.com/dp/B09B8V1LZ3?tag=trendytecht0a-20  (missing www.)
https://www.amazon.com/dp/B09B8V1LZ3  (missing affiliate tag)
```

### Pricing Rules
❌ **NEVER:**
- List specific prices ($79, $149, etc.)
- Show prices in comparison tables
- Make price comparisons with exact numbers

✅ **ALWAYS:**
- Use price ranges (under $100, $100-200 range)
- Use "Check price on Amazon" CTAs
- Include disclaimer that prices change
- Add `?tag=trendytecht0a-20` to ALL Amazon links

### ASIN Verification (MANDATORY for Product Articles)

**Before publishing ANY article with Amazon links:**

1. **Extract ASINs** from article
2. **Test each ASIN** in browser:
   ```
   https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20
   ```
3. **Verify:**
   - Page loads (not 404)
   - Product is in stock/available
   - Product name matches article
   - Affiliate tag visible in URL

4. **Run script** (if available):
   ```bash
   npm run verify-asins
   ```

**DO NOT publish with unverified ASINs!**

---

## Image Guidelines

### Priority Order

**For News/Quick-Take Articles:**
1. Official press release image
2. AI-generated conceptual image
3. Specific Unsplash search (not generic!)

**For Best-List Articles:**
1. Hero product image (Best Overall pick)
2. Composite of top 3-4 products
3. AI-generated product comparison
4. Specific category image from Unsplash

### Never Use:
- Completely unrelated stock photos
- Generic images that don't connect to story
- Images used in other articles
- Low-quality or pixelated images

### Image Credits:
- Official images: "Image courtesy of [Company Name]"
- AI-generated: "AI Generated Image"
- Unsplash: "Photo by [Name] on Unsplash"

---

## Verification Checklist

Before publishing ANY article:

### Content Quality
- [ ] Date is current (today or future, never past)
- [ ] All facts verified across 3+ sources
- [ ] Quotes are real (not made up)
- [ ] Statistics from verified sources
- [ ] No speculation presented as fact

### Sources & Links
- [ ] Source URLs in frontmatter
- [ ] Sources section at end of article
- [ ] All source links tested and working
- [ ] No broken or 404 links

### Amazon Compliance (if applicable)
- [ ] All Amazon links include `?tag=trendytecht0a-20`
- [ ] All Amazon URLs use `https://www.amazon.com` (with www.)
- [ ] NO specific prices anywhere
- [ ] Price ranges only
- [ ] ALL ASINs verified in browser

### Template Compliance
- [ ] Correct template used
- [ ] All required sections included
- [ ] Structure maintained
- [ ] Image relevant to topic

---

## Common Mistakes to Avoid

❌ **Content Mistakes:**
- Using past dates for articles
- Making up sources or quotes
- Copying existing articles without new information
- Speculation without labeling it as such

❌ **Amazon Mistakes:**
- Skipping ASIN verification
- Including specific prices
- Missing affiliate tags
- Using amazon.com without www.

❌ **Template Mistakes:**
- Skipping required sections
- Using wrong template for content type
- Generic/unrelated images
- Inconsistent formatting

---

## Workflows

### Single Article
See: [`REAL_CONTENT_WORKFLOW.md`](./REAL_CONTENT_WORKFLOW.md)

### Multiple Articles (Bulk Creation)
See: [`workflows/write-multiple-articles.md`](./workflows/write-multiple-articles.md)

### Best-List Article
See: [`workflows/create-best-list-article.md`](./workflows/create-best-list-article.md)

### Monthly ASIN Audit
See: [`workflows/monthly-asin-audit.md`](./workflows/monthly-asin-audit.md)

---

## Additional Resources

- **Link Verification:** [`LINK_VERIFICATION_GUIDE.md`](./LINK_VERIFICATION_GUIDE.md)
- **ASIN Verification:** [`ASIN_VERIFICATION_GUIDE.md`](./ASIN_VERIFICATION_GUIDE.md)
- **Amazon Pricing:** [`AMAZON_PRICING_RULES.md`](./AMAZON_PRICING_RULES.md)
- **Affiliate Tags:** [`AFFILIATE_TAG_ENFORCEMENT.md`](./AFFILIATE_TAG_ENFORCEMENT.md)
- **Image Sourcing:** [`IMAGE_SOURCING_GUIDE.md`](./IMAGE_SOURCING_GUIDE.md)
- **AI Images:** [`AI_IMAGE_SETUP.md`](./AI_IMAGE_SETUP.md)

---

## Quick Reference

**Templates:** `docs/templates/`
**Workflows:** `docs/workflows/`
**Current Date:** November 24, 2025 (always use current or future dates)
**Affiliate Tag:** `?tag=trendytecht0a-20`
**Amazon URL Format:** `https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20`

---

**Need help?** Check the specific guides linked above or review the templates for examples.
