# Broken Links Summary - Action Required

**Audit Date:** November 23, 2025

---

## 📊 Overview

**Total Broken Links: 8**
- **3 Broken Source Links** (news articles, reviews)
- **5 Broken Affiliate Product Links** (Amazon ASINs)

**Articles Affected: 5 of 12** (42%)

---

## ❌ Broken Source Links (3)

### 1. AI Article - Bloomberg Source

**File:** [ai/apple-google-gemini-siri-deal-2025.md](../src/content/ai/apple-google-gemini-siri-deal-2025.md)

**Broken Source:**
```yaml
sources:
  - title: "Apple plans to use 1.2 trillion parameter Google Gemini model to power new Siri"
    url: "https://www.bloomberg.com/news/articles/2025-11-05/apple-plans-to-use-1-2-trillion-parameter-google-gemini-model-to-power-new-siri"
```

**Error:** 403 Forbidden (Paywall or URL doesn't exist)

**How to Fix:**
1. Run: `WebSearch("Apple Google Gemini Siri November 2025")`
2. Find alternative free source (The Verge, TechCrunch, Reuters)
3. Update frontmatter with real URL
4. Verify with: `npm run verify-article src/content/ai/apple-google-gemini-siri-deal-2025.md`

---

### 2. Product Review - RTINGS Source

**File:** [picks/best-wireless-earbuds-under-100-2025.md](../src/content/picks/best-wireless-earbuds-under-100-2025.md)

**Broken Source:**
```yaml
sources:
  - title: "Budget Earbuds Reviews - RTINGS"
    url: "https://www.rtings.com/headphones/reviews/best/earbuds-in-ear-headphones-under-100"
```

**Error:** 404 Not Found (Wrong URL path)

**How to Fix:**
1. Go to rtings.com and search for "best wireless earbuds under $100"
2. Copy correct URL from browser
3. Likely correct URL: `https://www.rtings.com/headphones/reviews/best/wireless-earbuds-under-100`
4. Update frontmatter
5. Verify with: `npm run verify-article src/content/picks/best-wireless-earbuds-under-100-2025.md`

---

### 3. Tech Article - Washington Post Source

**File:** [tech/meta-avoids-breakup-antitrust-2025.md](../src/content/tech/meta-avoids-breakup-antitrust-2025.md)

**Broken Source:**
```yaml
sources:
  - title: "Meta, Google, Apple, Amazon antitrust efforts face challenges"
    url: "https://www.washingtonpost.com/technology/2025/11/20/meta-google-apple-amazon-antitrust/"
```

**Error:** 403 Forbidden (Paywall or URL doesn't exist)

**How to Fix:**
1. Run: `WebSearch("Meta antitrust breakup November 2025")`
2. Find alternative free source (Reuters, CNBC, The Verge)
3. Update frontmatter with real URL
4. Verify with: `npm run verify-article src/content/tech/meta-avoids-breakup-antitrust-2025.md`

---

## ❌ Broken Affiliate Product Links (5)

### 4. Tech Gifts Article - 2 Broken Amazon Links

**File:** [picks/best-tech-gifts-under-100-holiday-2025.md](../src/content/picks/best-tech-gifts-under-100-holiday-2025.md)

**Broken Products:**
1. Logitech MX Master 3S - `https://amazon.com/dp/B09HM94VDS?tag=trendytecht0a-20` (404)
2. Amazon Best Sellers page - `https://www.amazon.com/Best-Sellers-Electronics/zgbs/electronics` (405)

**How to Fix:**
1. Search Amazon.com for "Logitech MX Master 3S"
2. Copy correct ASIN from product page URL
3. Update frontmatter with real ASIN + your tag
4. For Best Sellers link - either remove or replace with working alternative
5. Verify with: `npm run verify-article src/content/picks/best-tech-gifts-under-100-holiday-2025.md`

---

### 5. Wireless Earbuds Article - 4 Broken Links

**File:** [picks/best-wireless-earbuds-under-100-2025.md](../src/content/picks/best-wireless-earbuds-under-100-2025.md)

**Broken Amazon Products:**
1. Anker Soundcore Space A40 - `https://amazon.com/dp/B0B1LVC5BW?tag=trendytecht0a-20` (404)
2. JBL Live Pro 2 - `https://amazon.com/dp/B0B66F2ZBF?tag=trendytecht0a-20` (404)
3. 1MORE Evo - `https://amazon.com/dp/B09B7JKC9V?tag=trendytecht0a-20` (404)
4. Beats Flex - `https://amazon.com/dp/B08T13J5W3?tag=trendytecht0a-20` (404)

**Note:** Only Liberty 4 NC ASIN is correct: `B0BZV4QFP8`

**How to Fix:**
1. Search Amazon.com for each product by name
2. Open product page
3. Copy ASIN from URL (the part after `/dp/`)
4. Update frontmatter:
   ```yaml
   affiliateProducts:
     - name: "Anker Soundcore Space A40"
       url: "https://amazon.com/dp/[REAL-ASIN]?tag=trendytecht0a-20"
   ```
5. Verify with: `npm run verify-article src/content/picks/best-wireless-earbuds-under-100-2025.md`

---

### 6. Battery Storage Article - 1 Timeout

**File:** [energy/us-battery-storage-record-2025.md](../src/content/energy/us-battery-storage-record-2025.md)

**Broken Source:**
```yaml
sources:
  - title: "EIA - Battery Storage Report"
    url: "https://www.eia.gov/todayinenergy/detail.php?id=64586"
```

**Error:** Timeout (URL may not exist or is slow)

**How to Fix:**
1. Visit eia.gov and search for "battery storage 2025"
2. Find the actual report
3. Copy correct URL
4. Update frontmatter
5. Verify with: `npm run verify-article src/content/energy/us-battery-storage-record-2025.md`

---

## ✅ Verification Commands

### Check specific article
```bash
npm run verify-article src/content/[category]/[filename].md
```

### Check all source links only
```bash
npm run audit-sources
```

### Check all links (sources + affiliates)
```bash
npm run verify-links
```

---

## 📋 Fix Checklist

**For Source Links:**
- [ ] Run `WebSearch` to find real article URL
- [ ] Prefer free sources over paywalled (Reuters, The Verge, etc.)
- [ ] Copy exact URL from search results
- [ ] Test URL in browser manually
- [ ] Update frontmatter `sources` array
- [ ] Re-run verification

**For Amazon Links:**
- [ ] Search Amazon.com for exact product name
- [ ] Open product page
- [ ] Copy ASIN from URL (`/dp/XXXXXXXXXX`)
- [ ] Add your affiliate tag: `?tag=trendytecht0a-20`
- [ ] Update frontmatter `affiliateProducts` array
- [ ] Re-run verification

---

## 🎯 Target State

**After fixes:**
```bash
$ npm run verify-links

Total articles checked: 12
Total links checked: 36
Total broken links: 0 ✅
Articles with broken links: 0 ✅

✅ ALL LINKS VERIFIED - READY TO PUBLISH
```

---

## 📝 Step-by-Step Fix Process

### Step 1: Pick an Article
Start with easiest fixes first (RTINGS URL is simple path fix)

### Step 2: Fix the Links
Follow the "How to Fix" instructions above

### Step 3: Verify the Fix
```bash
npm run verify-article src/content/[category]/[filename].md
```

### Step 4: Repeat
Move to next broken article

### Step 5: Final Check
```bash
npm run verify-links
```

Should show **0 broken links**

---

## 🔧 Tools Available

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm run verify-article [file]` | Check single article | Before publishing |
| `npm run audit-sources` | Check only source links | Fixing source issues |
| `npm run verify-links` | Check all links in all articles | Weekly maintenance |
| `npm run pre-publish [file]` | Complete article validation | Final pre-publish check |

---

## 📚 Documentation

- **[SOURCE_LINKS_GUIDE.md](SOURCE_LINKS_GUIDE.md)** - Detailed source link fixing guide
- **[LINK_VERIFICATION_GUIDE.md](LINK_VERIFICATION_GUIDE.md)** - Complete verification system docs
- **[README_LINK_SYSTEM.md](README_LINK_SYSTEM.md)** - System overview

---

## ⚠️ Priority

**Fix these 8 broken links before publishing any new content.**

The verification system will block publishing until all links are fixed.

---

Last Updated: November 23, 2025
