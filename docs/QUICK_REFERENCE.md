# Quick Reference - Daily Content Creation

## Pre-Writing Checklist

- [ ] Choose topic (newsworthy or evergreen)
- [ ] Select appropriate template
- [ ] Identify 3+ reputable sources (with REAL, working URLs)
- [ ] Generate or find suitable image (see Image Workflow below)
- [ ] For product articles: find REAL Amazon product ASINs (not guessed)

---

## Required Frontmatter

```yaml
---
title: "Compelling Title (60 chars max)"
date: "YYYY-MM-DD"
author: "Trendy Tech Tribe Staff"
category: "[Tech & Innovation|AI & Automation|EVs & Mobility|Energy & Policy|Markets & Money|Picks & Reviews]"
tags: ["3-5", "relevant", "keywords"]
type: "[quick-take|deep-dive|product-review|best-list|opinion]"
summary: "1-2 sentence preview"
seoTitle: "SEO Title 50-60 chars"
seoDescription: "Meta description 150-160 chars"
image: "https://image-url.com"
imageAlt: "Descriptive alt text"
imageCredit: "Photo by Name on Unsplash"
featured: false
affiliateProducts:  # If applicable
  - name: "Product Name"
    url: "https://amazon.com/dp/ASIN?tag=trendytecht0a-20"
    price: "$XX"
sources:
  - title: "Source Name"
    url: "https://source-url.com"
---
```

---

## Amazon Affiliate URLs

**Always use this format:**
```
https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20
```

**Your Tracking ID:** `trendytecht0a-20`

**CRITICAL REQUIREMENTS:**
- ✅ Use REAL product ASINs from Amazon search
- ✅ Include `?tag=trendytecht0a-20` on every Amazon link
- ✅ Verify link works before adding to article
- ❌ Never guess or make up ASINs
- ❌ Never use placeholder links like `B0XXXXXXXXX`

**How to find real ASINs:**
1. Search for product on Amazon.com
2. Open product page
3. Look in URL: `amazon.com/dp/B09B8V1LZ3` ← that's the ASIN
4. Copy exact ASIN into your link

---

## Image Workflow

### Option 1: AI Generated Images (Recommended)

**When to use:** No press release photo available, Unsplash doesn't have what you need

**Generate an image:**
```bash
npm run generate-image "your image description"
```

**Examples:**
```bash
# For a Tesla article
npm run generate-image "Tesla electric vehicle charging at modern station"

# For an AI article
npm run generate-image "AI robot working on computer coding"

# With custom style
npm run generate-image "Solar panels on residential roof" --style photorealistic

# With Replicate (cheaper)
npm run generate-image "5G network technology" --provider replicate
```

The script will:
1. Generate the image using AI (DALL-E 3 or Stable Diffusion)
2. Download it to `/public/images/articles/`
3. Give you the exact frontmatter to copy/paste

**Setup (first time only):**
1. Copy `.env.example` to `.env`
2. Add your API key (OpenAI or Replicate)
3. Get keys at:
   - OpenAI: https://platform.openai.com/api-keys (~$0.04-0.12/image)
   - Replicate: https://replicate.com/account/api-tokens (~$0.005/image)

### Option 2: Unsplash Photos

**When to use:** Need real photos, product shots, people

1. Search Unsplash.com for your topic
2. Copy the image URL
3. Note the photographer name

### Option 3: Press Release Images

**When to use:** Company announcements, product launches

1. Check company press kit or blog post
2. Download image to `/public/images/articles/`
3. Credit the company

---

## Image Attribution Format

**AI Generated:**
```yaml
image: "/images/articles/tesla-ev-charging-1234567.png"
imageAlt: "Tesla electric vehicle charging at modern station"
imageCredit: "AI Generated Image"
```

**Unsplash:**
```yaml
image: "https://images.unsplash.com/photo-..."
imageAlt: "Descriptive alt text"
imageCredit: "Photo by [Photographer Name] on Unsplash"
```

**Press Release:**
```yaml
image: "/images/articles/company-product-photo.jpg"
imageAlt: "Descriptive alt text"
imageCredit: "Image courtesy of [Company Name]"
```

---

## Article Length Guidelines

| Type | Word Count | Time to Write |
|------|------------|---------------|
| Quick-take | 800-1200 | 1-2 hours |
| Best-list | 1500-2500 | 3-4 hours |
| Product-review | 1200-2000 | 2-3 hours |
| Deep-dive | 2500-4000 | 4-6 hours |
| Opinion | 1200-2000 | 2-3 hours |

---

## Pre-Publish Checklist

**Content Quality:**
- [ ] Facts verified across 3+ sources
- [ ] No spelling/grammar errors
- [ ] Clear intro and conclusion
- [ ] Proper heading hierarchy (H2, H3)

**Technical:**
- [ ] All frontmatter fields complete
- [ ] Author = "Trendy Tech Tribe Staff"
- [ ] Category matches exactly
- [ ] 3-5 relevant tags
- [ ] Image credit included

**🚨 LINK VERIFICATION (MANDATORY):**
- [ ] **RUN LINK CHECKER:** `npm run verify-article src/content/[category]/[file].md`
- [ ] All links return ✅ (no ❌ broken links)
- [ ] All Amazon ASINs are real products (not guessed)
- [ ] All source URLs are real, published articles (not speculative)
- [ ] All Amazon links include `?tag=trendytecht0a-20`
- [ ] Fixed ALL broken links and re-ran checker
- [ ] **NO ARTICLE PUBLISHED WITH BROKEN LINKS**

**SEO:**
- [ ] SEO title 50-60 characters
- [ ] SEO description 150-160 characters
- [ ] Primary keyword in first paragraph
- [ ] Alt text on image

**Build Test:**
- [ ] Run `npm run build` successfully
- [ ] No TypeScript errors
- [ ] Article displays correctly locally

---

## File Naming

**Format:** `descriptive-slug-with-hyphens.md`

**Examples:**
- ✅ `tesla-model-2-china-production.md`
- ✅ `best-wireless-earbuds-under-100-2025.md`
- ❌ `article1.md`
- ❌ `Tesla Model 2.md` (no spaces!)

---

## Category Paths

```
/src/content/tech/        → Tech & Innovation
/src/content/ai/          → AI & Automation
/src/content/evs/         → EVs & Mobility
/src/content/energy/      → Energy & Policy
/src/content/markets/     → Markets & Money
/src/content/picks/       → Picks & Reviews
```

---

## Common Mistakes to Avoid

❌ **Broken/dead links** (run `npm run verify-article` first!)
❌ **Made-up Amazon ASINs** (use real product IDs only)
❌ **Speculative source URLs** (URLs that don't actually exist)
❌ **Missing affiliate tracking ID** on Amazon links
❌ **Wrong category name** (must match exactly)
❌ **No image credit** (copyright risk)
❌ **Single source** for facts (need 3+)
❌ **Not running link verification before publishing**
❌ **Empty tags array**
❌ **SEO fields too long** (title 50-60, description 150-160)
❌ **Wrong date format** (must be YYYY-MM-DD)

---

## Git Workflow

```bash
# After writing article
git add .
git commit -m "Add: [article title]"
git push
```

**Commit Message Format:**
- Add: [title] - New article
- Update: [title] - Edit existing
- Fix: [title] - Correct errors

---

## Quick Commands

```bash
# Verify all links in a specific article (RUN BEFORE PUBLISHING!)
npm run verify-article src/content/picks/article-name.md

# Verify all links in all articles
npm run verify-links

# Build site
npm run build

# Run locally
npm run dev

# Check for errors
npm run astro check

# Generate AI image
npm run generate-image "description of image"
```

---

## Daily Goal

**Realistic:** 1-2 quality articles
**Ambitious:** 3-4 articles
**Aspirational:** 6 articles (one per category)

**Start small, scale up as workflow improves.**

---

## Need Help?

1. Check existing articles in `/src/content/` for examples
2. Review templates in `/templates/`
3. Read `/CONTENT_CREATION_GUIDE.md` for detailed instructions
4. See `/IMPLEMENTATION_SUMMARY.md` for system overview

---

**Remember:** Quality > Quantity. One great article beats three mediocre ones.

---

Last Updated: January 28, 2025
