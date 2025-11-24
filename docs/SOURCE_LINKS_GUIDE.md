# Source Links Verification Guide

## 🔍 Current Status

**Source Links Audit Results (November 23, 2025):**

- ✅ **26 total source links** across 12 articles
- ❌ **3 broken source links** (11.5% failure rate)
- ❌ **3 articles** need fixes

---

## ❌ Broken Source Links Found

### 1. AI Article - Bloomberg Source

**File:** `ai/apple-google-gemini-siri-deal-2025.md`

**Broken Source:**
```yaml
sources:
  - title: "Apple plans to use 1.2 trillion parameter Google Gemini model to power new Siri"
    url: "https://www.bloomberg.com/news/articles/2025-11-05/apple-plans-to-use-1-2-trillion-parameter-google-gemini-model-to-power-new-siri"
```

**Error:** 403 Forbidden (Paywall or speculative URL)

**Fix:**
1. Use WebSearch: `"Apple Google Gemini Siri November 2025"`
2. Find alternative free sources (The Verge, TechCrunch, Reuters)
3. Or find the real Bloomberg article if it exists
4. Update frontmatter with working URL

### 2. Product Review - RTINGS Source

**File:** `picks/best-wireless-earbuds-under-100-2025.md`

**Broken Source:**
```yaml
sources:
  - title: "Budget Earbuds Reviews - RTINGS"
    url: "https://www.rtings.com/headphones/reviews/best/earbuds-in-ear-headphones-under-100"
```

**Error:** 404 Not Found (Wrong URL path)

**Fix:**
1. Go to RTINGS.com
2. Search for "best earbuds under $100"
3. Copy the correct URL from browser
4. Update frontmatter

**Likely correct URL:**
```
https://www.rtings.com/headphones/reviews/best/wireless-earbuds-under-100
```

### 3. Tech Article - Washington Post Source

**File:** `tech/meta-avoids-breakup-antitrust-2025.md`

**Broken Source:**
```yaml
sources:
  - title: "Meta, Google, Apple, Amazon antitrust efforts face challenges"
    url: "https://www.washingtonpost.com/technology/2025/11/20/meta-google-apple-amazon-antitrust/"
```

**Error:** 403 Forbidden (Paywall or speculative URL)

**Fix:**
1. Use WebSearch: `"Meta antitrust November 2025"`
2. Find alternative free sources (Reuters, The Verge, CNBC)
3. Or verify WaPo article exists and is accessible
4. Update frontmatter with working URL

---

## 🛠️ How to Fix Source Links

### Step 1: Identify Broken Sources

Run the audit:
```bash
npm run audit-sources
```

Output will show:
```
❌ ARTICLES WITH BROKEN SOURCE LINKS:

ai/apple-google-gemini-siri-deal-2025.md
  1 broken source(s):

  📰 "Apple plans to use..."
     URL: https://www.bloomberg.com/...
     Error: invalid (403)
```

### Step 2: Use WebSearch to Find Real URLs

**For each broken link:**

1. **Extract the topic** from the source/product title
2. **Use WebSearch** to find real articles or Amazon products
3. **For sources:** Choose reputable, accessible sources
4. **For Amazon:** Search Amazon.com and copy ASIN from product page
5. **Copy the exact URL** from search results or browser

**Example:**

```typescript
// Broken source about Apple-Google Gemini deal
WebSearch("Apple Google Gemini Siri deal November 2025")

// Results might include:
// - The Verge: https://www.theverge.com/2025/11/5/...
// - TechCrunch: https://techcrunch.com/2025/11/05/...
// - Reuters: https://www.reuters.com/technology/...

// Pick one that's accessible (not paywalled)
```

### Step 3: Update Article Frontmatter

Replace the broken URL with the real one:

**Before (Broken):**
```yaml
sources:
  - title: "Apple plans to use 1.2 trillion parameter Google Gemini model to power new Siri"
    url: "https://www.bloomberg.com/news/articles/2025-11-05/apple-plans-to-use-1-2-trillion-parameter-google-gemini-model-to-power-new-siri"
```

**After (Fixed):**
```yaml
sources:
  - title: "Apple brings Google Gemini to Siri"
    url: "https://www.theverge.com/2025/11/5/23456789/apple-google-gemini-siri-partnership"
```

### Step 4: Verify the Fix

```bash
npm run verify-article src/content/ai/apple-google-gemini-siri-deal-2025.md
```

Should show:
```
✅ All links verified
✅ ALL LINKS VERIFIED - READY TO PUBLISH
```

### Step 5: Re-run Full Audit

```bash
npm run audit-sources
```

Should decrease broken count:
```
Broken source links: 2  (was 3)
```

---

## 🚨 Common Source Link Problems

### Problem 1: Paywalled Sites (403 Forbidden)

**Sites that often block:**
- Bloomberg
- Wall Street Journal
- Financial Times
- Washington Post (sometimes)
- New York Times (sometimes)

**Solution:**
- Use alternative free sources
- Reuters, AP News, The Verge, TechCrunch, CNBC, etc.
- These are often more accessible to readers too

**Example:**
```yaml
# Instead of paywalled Bloomberg:
- title: "Bloomberg - Company XYZ announces..."

# Use free alternative:
- title: "Reuters - Company XYZ announces..."
  url: "https://www.reuters.com/technology/..."
```

### Problem 2: Wrong URL Path (404)

**Common issues:**
- Typo in URL
- Article moved/renamed
- Using old URL structure
- Guessed URL that doesn't exist

**Solution:**
1. Search the site directly
2. Copy exact URL from browser address bar
3. Test URL in browser before adding

**Example:**
```yaml
# Wrong (404):
url: "https://www.rtings.com/headphones/reviews/best/earbuds-in-ear-headphones-under-100"

# Correct:
url: "https://www.rtings.com/headphones/reviews/best/wireless-earbuds-under-100"
```

### Problem 3: Speculative URLs

**Red flags:**
- URL looks "reasonable" but doesn't exist
- Made up article slug
- Assumed URL structure
- Date-based path that doesn't match

**Example of speculative URL:**
```yaml
# This LOOKS right but doesn't exist:
url: "https://techcrunch.com/2025/11/18/google-launches-gemini-3/"

# Actual URL might be:
url: "https://techcrunch.com/2025/11/18/google-launches-gemini-3-with-new-coding-app-and-record-benchmark-scores/"
```

**Solution:**
- ALWAYS use WebSearch
- Copy exact URL from results
- Never guess URLs

### Problem 4: Outdated/Moved Articles

**Sites reorganize content:**
- URLs change
- Articles get archived
- Pages move to new paths

**Solution:**
1. Search the site for the article title
2. Find the current URL
3. Update to new URL
4. If article is gone, find alternative source

---

## ✅ Best Practices for Source Links

### 1. Use WebSearch for Every Source

**NEVER guess URLs:**
```yaml
# ❌ BAD - Guessed URL
url: "https://blog.google/products/gemini-3/"

# ✅ GOOD - Found with WebSearch
url: "https://blog.google/products/gemini/gemini-3/"
```

### 2. Prefer Free/Accessible Sources

**Prioritize sources your readers can access:**

**Tier 1 (Best):**
- Official company blogs
- Reuters, AP News
- The Verge, TechCrunch, Ars Technica
- CNBC, CNN Business
- Government sites (.gov)

**Tier 2 (Good):**
- New York Times (soft paywall)
- Wirecutter, The Information
- Industry blogs

**Tier 3 (Use Sparingly):**
- Bloomberg (hard paywall)
- Wall Street Journal (hard paywall)
- Financial Times (hard paywall)

### 3. Verify Every URL

**Before adding to frontmatter:**
1. Copy URL from WebSearch or browser
2. Open in new tab to verify it loads
3. Check it's the right article
4. Add to frontmatter
5. Run verification script

### 4. Test Links After Adding

**After writing article:**
```bash
npm run verify-article src/content/[category]/[file].md
```

Should show:
```
Found 3 link(s) to verify:
1. https://www.reuters.com/...
2. https://techcrunch.com/...
3. https://blog.google/...

✅ All 3 links verified
```

### 5. Keep Sources Current

**Quarterly maintenance:**
```bash
npm run audit-sources
```

Check for:
- Moved articles (404s)
- Changed paywalls
- Dead sites
- Better alternatives

---

## 📋 Source Link Checklist

**For every article, before publishing:**

- [ ] All sources listed in frontmatter `sources` array
- [ ] Each source has `title` and `url`
- [ ] URLs found with WebSearch (not guessed)
- [ ] URLs tested in browser (manually clicked)
- [ ] Preferably free/accessible sources
- [ ] Run `npm run verify-article [file]`
- [ ] All source links show ✅ (no ❌)
- [ ] No 403, 404, or timeout errors

---

## 🔧 Quick Fix Commands

### Check Single Article
```bash
npm run verify-article src/content/ai/article.md
```

### Check All Sources
```bash
npm run audit-sources
```

### Check Everything (sources + affiliates)
```bash
npm run verify-links
```

### Pre-Publish Validation
```bash
npm run pre-publish src/content/ai/article.md
```

---

## 📊 Why Source Links Matter

### SEO Benefits
- External links to authoritative sources boost credibility
- Search engines reward well-sourced content
- Reduces bounce rate (readers trust sourced articles)

### Legal Protection
- Proper attribution prevents plagiarism claims
- Shows due diligence in fact-checking
- Demonstrates journalistic standards

### Reader Trust
- Readers can verify your claims
- Builds authority and credibility
- Broken links erode trust

### Amazon Affiliate Compliance
- FTC requires disclosure of sources
- Transparency builds trust for affiliate links
- Proper sourcing = more conversions

---

## 🎯 Success Metrics

**Target Status:**
- ✅ **0 broken source links**
- ✅ **100% accessibility** (prefer free sources)
- ✅ **3+ sources per article** minimum
- ✅ **Primary sources** when possible

**Current Status:**
- ❌ 3 broken source links (need fixes)
- ✅ 26 total sources (good coverage)
- ✅ 12/12 articles have sources
- ⚠️  Some paywalled sources (could be better)

---

## 🔄 Maintenance Schedule

**Before Every Publish:**
```bash
npm run verify-article [file]
```

**Weekly:**
```bash
npm run audit-sources
```

**Monthly:**
```bash
npm run verify-links  # Full site audit
```

Fix any broken source links found.

---

## 📚 Resources

**Finding Good Sources:**
- [Google News](https://news.google.com)
- [Reuters](https://www.reuters.com/technology)
- [TechCrunch](https://techcrunch.com)
- [The Verge](https://www.theverge.com)
- [Ars Technica](https://arstechnica.com)

**Avoiding Paywalls:**
- Prefer official company blogs
- Use Reuters/AP for news
- Check tech blogs (TechCrunch, The Verge)
- Government sources for data/stats

---

**Next Steps:**

1. Fix the 3 broken source links identified above
2. Run `npm run audit-sources` to verify fixes
3. Make source verification part of every publish workflow

---

Last Updated: November 23, 2025
