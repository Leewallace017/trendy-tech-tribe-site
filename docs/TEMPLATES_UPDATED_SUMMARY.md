# Article Templates - Update Summary

## ✅ All 5 Templates Updated

**Date:** November 22, 2025

All article templates have been updated with:
1. ✅ **Pricing compliance** (Amazon Associates rules)
2. ✅ **Intelligent image sourcing guidance** (context-aware decisions)
3. ✅ **Current dates** (November 2025)
4. ✅ **Web research requirements**

---

## What Changed in Each Template

### 1. Product Review Template
**File:** `/templates/product-review-template.md`

**Key Changes:**
- ❌ **REMOVED**: `price: "$XXX"` field from frontmatter (Amazon violation)
- ❌ **REMOVED**: Specific prices from body text
- ✅ **ADDED**: "View Current Price on Amazon" CTAs
- ✅ **ADDED**: Value Proposition section (Amazon-compliant)
- ✅ **ADDED**: Image decision guide:
  - 1st: Actual product image from Amazon
  - 2nd: Manufacturer press release
  - 3rd: AI-generated product shot
  - LAST: Specific Unsplash (not generic!)

**Example pricing section:**
```markdown
## Value Proposition

The [Product] is positioned in the [budget/mid/premium] segment.

[View Current Pricing on Amazon →](affiliate-link)

**For Context:**
- Competitors typically range from $X-Y
- Previous model launched around $Z
- Pricing varies by retailer

*Note: Prices on Amazon update frequently.*
```

---

### 2. Best-List Template
**File:** `/templates/best-list-template.md`

**Key Changes:**
- ❌ **REMOVED**: Price fields from all product entries
- ❌ **REMOVED**: Price column from comparison table
- ✅ **ADDED**: "Price Range" column (Budget/Mid/Premium)
- ✅ **ADDED**: Price Ranges Explained section
- ✅ **ADDED**: Image decision guide:
  - 1st: Hero product (Best Overall) from Amazon
  - 2nd: Composite of top products
  - 3rd: AI-generated comparison layout
  - LAST: Specific category image from Unsplash

**Comparison Table Example:**
```markdown
| Feature | Product 1 | Product 2 | Product 3 |
|---------|-----------|-----------|-----------|
| Spec 1 | X | Y | Z |
| **Price Range** | Mid | Budget | Premium |
| **Best For** | Most users | Budget buyers | Premium buyers |
```

---

### 3. Quick-Take Template
**File:** `/templates/quick-take-template.md`

**Key Changes:**
- ✅ **ADDED**: Web research requirements
- ✅ **ADDED**: Real quote verification
- ✅ **ADDED**: Image decision guide for NEWS:
  - 1st: Official press release image
  - 2nd: AI-generated conceptual image
  - 3rd: Specific Unsplash (company/product specific)
  - NEVER: Generic stock photos
- ✅ **UPDATED**: Date to current (2025-11-22)
- ✅ **ADDED**: Fact-checking checklist

**Image Example:**
```markdown
For Google Gemini 3 news:
1st choice: Google's official press image
2nd choice: AI-generated "Google AI visualization"
3rd choice: Unsplash "Google office" NOT "technology"
```

---

### 4. Deep-Dive Template
**File:** `/templates/deep-dive-template.md`

**Key Changes:**
- ✅ **ADDED**: Image decision guide for ANALYSIS:
  - 1st: AI-generated conceptual visualization
  - 2nd: Infographic or data visualization
  - 3rd: Specific conceptual Unsplash
  - AVOID: Generic tech stock photos
- ✅ **UPDATED**: Date to current
- ✅ **ADDED**: 5+ sources requirement

**Image Example:**
```markdown
For AI agents deep-dive:
1st: AI-generated "neural network diagram, tech illustration"
2nd: Custom infographic showing agent workflow
3rd: Unsplash "data center servers" NOT "technology"
```

---

### 5. Opinion Template
**File:** `/templates/opinion-template.md`

**Key Changes:**
- ✅ **ADDED**: Image decision guide for OPINION:
  - 1st: AI-generated thematic/conceptual
  - 2nd: Relevant news image if about specific event
  - 3rd: Conceptual Unsplash (debate/ethics themes)
- ✅ **UPDATED**: Date to current
- ✅ **ADDED**: Source verification notes

**Image Example:**
```markdown
For "AI Bubble" opinion:
1st: AI-generated "bubble bursting, tech economy concept"
2nd: Stock market chart if opinion is data-driven
3rd: Unsplash "balance scales" for ethics debate
```

---

## Image Sourcing Decision Tree

**The system is now intelligent** - different article types use different image strategies:

### Product Reviews & Best-Lists
**Priority:** Actual products > AI-generated products > Specific Unsplash
- **Why:** Readers want to see what they're buying
- **Example:** Steam Deck review should show actual Steam Deck, not "gaming device"

### News/Quick-Takes
**Priority:** Press release > AI conceptual > Specific Unsplash
- **Why:** News should use official imagery when available
- **Example:** Google Gemini launch uses Google's press image, not generic "AI"

### Deep-Dives/Analysis
**Priority:** AI conceptual > Data viz > Specific Unsplash
- **Why:** Analysis benefits from abstract conceptual imagery
- **Example:** Battery storage analysis uses AI "energy grid visualization"

### Opinion Pieces
**Priority:** AI thematic > Event-specific > Conceptual Unsplash
- **Why:** Opinions need distinctive imagery signaling commentary
- **Example:** AI ethics opinion uses "balance scales, tech concept"

---

## Amazon Pricing Compliance

### ❌ NEVER Do This:
```yaml
affiliateProducts:
  - name: "Product"
    price: "$549"  # VIOLATION!
```

```markdown
**Price:** $549  # VIOLATION!
```

### ✅ ALWAYS Do This:
```yaml
affiliateProducts:
  - name: "Product"
    url: "https://amazon.com/dp/XXX?tag=trendytecht0a-20"
    # NO price field!
```

```markdown
[View Current Price on Amazon →](link)

**For Context:** Positioned in the mid-$500 range.
```

---

## Template Usage Guide

### When to Use Each Template

**Product Review:**
- Individual product analysis
- Hands-on testing or review synthesis
- 1200-2000 words
- Heavy on specs and comparisons

**Best-List:**
- Product roundups (3-10 items)
- Comparison/buying guides
- 1500-2500 words
- Focus on helping readers choose

**Quick-Take:**
- Breaking news (within 24-48 hours)
- Quick analysis of events
- 800-1200 words
- What happened + why it matters

**Deep-Dive:**
- Comprehensive topic analysis
- Trend exploration
- 2500-4000 words
- Requires significant research

**Opinion:**
- Editorial commentary
- Controversial takes
- 1200-2000 words
- Strong point of view backed by facts

---

## Pre-Publishing Checklist (All Templates)

Every template now includes:

- [ ] **Date is current** (Nov 22, 2025 or later, never past!)
- [ ] **Web search performed** for real information
- [ ] **3+ sources** verified and cited
- [ ] **All facts cross-referenced**
- [ ] **Quotes are real** (not made up)
- [ ] **All links work** (clicked each one)
- [ ] **Image is relevant** (specific to article, not generic)
- [ ] **Image credit correct**
- [ ] **NO pricing violations** (for product content)

---

## Quick Reference

**Dates:**
- ✅ Use: `2025-11-22` (today or later)
- ❌ Never: Past dates or `YYYY-MM-DD`

**Pricing:**
- ✅ Use: "Check price on Amazon" CTAs
- ✅ Use: Price ranges ("$X-Y range")
- ❌ Never: Specific prices ("$549")

**Images:**
- ✅ Product reviews: Actual product images
- ✅ News: Press release or AI conceptual
- ✅ Analysis: AI conceptual or data viz
- ❌ Never: Generic unrelated stock photos
- ❌ Never: Reuse same image across articles

**Research:**
- ✅ Always: Web search for current info
- ✅ Always: 3+ sources minimum
- ✅ Always: Real quotes with attribution
- ❌ Never: Made-up facts or statistics
- ❌ Never: Fictional events or data

---

## Next Steps

1. **Use updated templates** for all new articles
2. **Delete old fictional articles** from January 2025
3. **Test workflow** with one real article
4. **Set up MCP tools** for image generation (optional but recommended)

---

**All templates are now production-ready with:**
- Amazon Associates compliance
- Intelligent image sourcing
- Current dates
- Real research requirements
- Context-aware decision guides

Last Updated: November 22, 2025
