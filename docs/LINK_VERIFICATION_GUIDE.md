# Link Verification System - Complete Guide

## 🚨 The Problem

**Previously generated content contains many broken links:**
- 5 out of 12 articles have broken links (42% failure rate)
- 8 total broken links found across all content
- Issues include:
  - Made-up/speculative Amazon ASINs
  - URLs to articles that don't exist
  - Outdated/moved links
  - Paywalled content that blocks automated checking

**This is now MANDATORY to fix before any article is published.**

---

## ✅ The Solution

A comprehensive link verification system with:

1. **Automated Link Checker** - Verifies all links work
2. **Single Article Verification** - Quick check before publishing
3. **Pre-Publish Validation** - Complete article quality check
4. **Updated Documentation** - Strict requirements

---

## 🛠️ Available Tools

### 1. Verify Single Article (Use This Before Publishing!)

```bash
npm run verify-article src/content/picks/article-name.md
```

**What it does:**
- ✅ Checks all Amazon affiliate links are valid products
- ✅ Verifies all source URLs return 200 OK
- ❌ Flags any 404s, timeouts, or broken links
- 📊 Provides detailed report with fix recommendations

**Example output:**
```
🔍 Verifying links in article...

Found 7 link(s) to verify:
1. https://amazon.com/dp/B0B1LVC5BW?tag=trendytecht0a-20
2. https://www.nytimes.com/wirecutter/reviews/best-wireless-earbuds/

RESULTS:
✅ https://amazon.com/dp/B0B1LVC5BW?tag=trendytecht0a-20
❌ https://www.rtings.com/headphones/reviews/best/earbuds-in-ear-headphones-under-100
   Status: invalid
   HTTP Code: 404
   → Link not found (404). Verify the URL is correct.
```

### 2. Verify All Articles

```bash
npm run verify-links
```

**What it does:**
- Scans all content files in `src/content/`
- Checks every link in every article
- Provides comprehensive report
- Exits with error if any broken links found

**Use this to:**
- Audit all existing content
- Find broken links after bulk changes
- Regular maintenance checks

### 3. Pre-Publish Validation (Comprehensive Check)

```bash
npm run pre-publish src/content/picks/article-name.md
```

**What it does:**
- ✅ Verifies all required frontmatter fields
- ✅ Checks all Amazon links have affiliate tags
- ✅ Validates all links work
- ✅ Confirms content structure
- ✅ Checks SEO field lengths
- ⚠️  Provides warnings for best practices

**Use this as final check before publishing.**

---

## 📋 Current Status of Content

**Last checked:** November 23, 2025

### ✅ Articles with Valid Links (7/12)
- `ai/gemini-vs-chatgpt-user-battle-2025.md`
- `energy/solar-overtakes-coal-globally-2025.md`
- `evs/ev-tax-credit-gone-2025.md`
- `evs/rivian-production-cuts-2025.md`
- `markets/nvidia-earnings-q3-2025-ai-bubble.md`
- `markets/tech-stocks-plunge-despite-nvidia-earnings-2025.md`
- `tech/google-gemini-3-launch-november-2025.md`

### ❌ Articles with Broken Links (5/12)

#### 1. `ai/apple-google-gemini-siri-deal-2025.md`
**Broken link:** Bloomberg article (403 Forbidden)
```
https://www.bloomberg.com/news/articles/2025-11-05/apple-plans-to-use-1-2-trillion-parameter-google-gemini-model-to-power-new-siri
```
**Issue:** Speculative URL - article doesn't exist or is paywalled
**Fix:** Use WebSearch to find real Bloomberg article or use different source

#### 2. `energy/us-battery-storage-record-2025.md`
**Broken link:** EIA.gov (Timeout)
```
https://www.eia.gov/todayinenergy/detail.php?id=64586
```
**Issue:** Made-up article ID that doesn't exist
**Fix:** Search EIA.gov for real battery storage report

#### 3. `picks/best-tech-gifts-under-100-holiday-2025.md`
**Broken links (2):**
```
https://amazon.com/dp/B09HM94VDS?tag=trendytecht0a-20  (Logitech MX Master 3S)
https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics  (Amazon Best Sellers)
```
**Issue:**
- First ASIN may be wrong/outdated
- Best Sellers page blocks automated checking (but may work in browser)
**Fix:**
- Verify ASIN on Amazon.com
- Test Best Sellers link manually or replace with alternative source

#### 4. `picks/best-wireless-earbuds-under-100-2025.md`
**Broken links (3):**
```
https://amazon.com/dp/B0B1LVC5BW?tag=trendytecht0a-20  (Anker Soundcore Space A40)
https://amazon.com/dp/B0BZV4QFP8?tag=trendytecht0a-20  (Soundcore Liberty 4 NC)
https://www.rtings.com/headphones/reviews/best/earbuds-in-ear-headphones-under-100
```
**Issue:**
- Amazon ASINs may be wrong or products discontinued
- RTINGS URL is 404 (wrong path)
**Fix:**
- Search Amazon for real products and copy actual ASINs
- Find correct RTINGS review URL

#### 5. `tech/meta-avoids-breakup-antitrust-2025.md`
**Broken link:** Washington Post (Timeout)
```
https://www.washingtonpost.com/technology/2025/11/20/meta-google-apple-amazon-antitrust/
```
**Issue:** Speculative URL that doesn't exist
**Fix:** Use WebSearch to find real Washington Post article

---

## 🔧 How to Fix Broken Links

### For Amazon Products

**WRONG - Guessed ASIN:**
```yaml
- name: "Anker PowerCore"
  url: "https://amazon.com/dp/B0XXXXXXXXX?tag=trendytecht0a-20"
```

**RIGHT - Real ASIN:**
1. Go to Amazon.com
2. Search for exact product: "Anker PowerCore 20000mAh"
3. Open product page
4. Copy ASIN from URL: `amazon.com/dp/B00X5RV14Y`
5. Add affiliate tag: `https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20`

```yaml
- name: "Anker PowerCore 20,000mAh"
  url: "https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20"
```

### For Source Articles

**WRONG - Speculative URL:**
```yaml
sources:
  - title: "Bloomberg - Apple Gemini Deal"
    url: "https://www.bloomberg.com/news/articles/2025-11-05/apple-plans..."
```

**RIGHT - Real URL from WebSearch:**
1. Use WebSearch: "Apple Google Gemini deal November 2025"
2. Find real published article
3. Copy actual URL from search results
4. Verify URL loads in browser
5. Add to frontmatter

```yaml
sources:
  - title: "The Verge - Apple partners with Google on Gemini"
    url: "https://www.theverge.com/2025/11/5/23445678/apple-google-gemini-partnership"
```

---

## 📝 Updated Workflow for Creating Articles

### Step 1: Research with Real Sources
```bash
# Use WebSearch to find real news
WebSearch: "topic name November 2025"
```

### Step 2: Write Article with Real URLs
- Copy source URLs directly from WebSearch results
- Find real Amazon products and copy ASINs
- Never guess or make up URLs

### Step 3: Verify Links BEFORE Publishing
```bash
npm run verify-article src/content/[category]/[article-name].md
```

### Step 4: Fix Any Broken Links
- Replace made-up URLs with real ones
- Verify Amazon ASINs on Amazon.com
- Re-run verification until all pass

### Step 5: Final Pre-Publish Check
```bash
npm run pre-publish src/content/[category]/[article-name].md
```

### Step 6: Only Publish if All Checks Pass
```
✅ ALL CHECKS PASSED - READY TO PUBLISH
```

---

## 🚫 NEVER Do This

❌ **Make up Amazon ASINs**
```yaml
url: "https://amazon.com/dp/B0FAKE1234?tag=trendytecht0a-20"
```

❌ **Guess article URLs**
```yaml
url: "https://techcrunch.com/2025/11/18/probably-exists/"
```

❌ **Use placeholder links**
```yaml
url: "https://example.com/source"
url: "#"
```

❌ **Skip link verification**
```bash
# DON'T skip this step!
# npm run verify-article article.md
```

❌ **Publish with broken links**
```
❌ Found 3 broken links
# "I'll fix them later" ← NO!
```

---

## ✅ ALWAYS Do This

✅ **Use WebSearch to find real URLs**
```typescript
WebSearch("Google Gemini 3 launch November 2025")
// Get REAL article URLs from results
```

✅ **Search Amazon for real products**
```
1. Go to Amazon.com
2. Search for product
3. Copy ASIN from product page URL
```

✅ **Verify links before publishing**
```bash
npm run verify-article src/content/picks/article-name.md
```

✅ **Fix ALL broken links**
```
Keep running verify-article until:
✅ ALL LINKS VERIFIED - READY TO PUBLISH
```

✅ **Test links manually if script fails**
```
If automated check fails but link works in browser:
1. Open URL in browser to confirm it works
2. Document that it's a false positive
3. Consider using alternative source
```

---

## 🔍 Link Verification Technical Details

### How It Works

The link checker:
1. Extracts all URLs from article frontmatter
2. Sends HTTP HEAD request to each URL
3. If HEAD fails (405/403), tries GET request
4. Checks if response is 200 OK
5. Reports any failures with status codes

### Known Limitations

**Some sites block automated checkers:**
- Bloomberg (403 Forbidden)
- Washington Post (paywall)
- Some Amazon pages (anti-bot measures)

**Solutions:**
- Manually verify the link works in a browser
- Use alternative sources
- For Amazon: ensure ASIN is correct by testing in browser

### False Positives

If link verification reports broken but link works in browser:
1. ✅ Manually verify link works
2. ✅ Document in article comments
3. ✅ Consider alternative source if possible
4. ⚠️ Note that readers may experience same issue

---

## 📊 Maintenance Schedule

**Before every publish:**
```bash
npm run verify-article [your-article].md
```

**Weekly:**
```bash
npm run verify-links
# Check all content for broken links
```

**Monthly:**
```bash
npm run verify-links
# Fix any broken links from outdated sources
# Update Amazon ASINs if products discontinued
```

---

## 🎯 Success Criteria

An article is ready to publish when:

- [x] All required frontmatter fields complete
- [x] All Amazon links have real ASINs
- [x] All Amazon links include `?tag=trendytecht0a-20`
- [x] All source URLs are real, published articles
- [x] `npm run verify-article` shows ✅ ALL LINKS VERIFIED
- [x] No broken links (404, timeout, error)
- [x] Content structure passes validation
- [x] SEO fields are correct length

**Zero tolerance for broken links.**

---

## 📚 Quick Reference

```bash
# Single article check (use this most often)
npm run verify-article src/content/picks/article-name.md

# All articles check
npm run verify-links

# Complete pre-publish validation
npm run pre-publish src/content/picks/article-name.md

# Build site
npm run build

# Run locally
npm run dev
```

---

## 🆘 Troubleshooting

**Problem:** "No links found in article frontmatter"
**Solution:** Add sources array to frontmatter with real URLs

**Problem:** "Broken link: 404"
**Solution:** URL doesn't exist. Find real URL with WebSearch

**Problem:** "Broken link: 403"
**Solution:** Site blocks automated checking. Verify manually in browser

**Problem:** "Broken link: timeout"
**Solution:** Site is slow or URL doesn't exist. Try in browser first

**Problem:** "Amazon link 405 error"
**Solution:** Now handled automatically - script retries with GET request

---

**Last Updated:** November 23, 2025
**Status:** 5 articles need link fixes before publishing
