# Quick Reference - Daily Content Creation

## Pre-Writing Checklist

- [ ] Choose topic (newsworthy or evergreen)
- [ ] Select appropriate template
- [ ] Identify 3+ reputable sources
- [ ] Find suitable image (Unsplash/AI/press release)
- [ ] For product articles: verify current Amazon pricing

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

**Never forget the `?tag=` parameter!**

---

## Image Attribution Format

**Unsplash:**
```yaml
imageCredit: "Photo by [Photographer Name] on Unsplash"
```

**AI Generated:**
```yaml
imageCredit: "AI Generated Image"
```

**Press Release:**
```yaml
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

**Links:**
- [ ] All Amazon links include `?tag=trendytecht0a-20`
- [ ] Clicked every link to verify works
- [ ] Source URLs in frontmatter array
- [ ] No broken/404 links

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

❌ **Missing affiliate tracking ID** on Amazon links
❌ **Wrong category name** (must match exactly)
❌ **No image credit** (copyright risk)
❌ **Single source** for facts (need 3+)
❌ **Broken links** (always test)
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
# Build site
npm run build

# Run locally
npm run dev

# Check for errors
npm run astro check
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
