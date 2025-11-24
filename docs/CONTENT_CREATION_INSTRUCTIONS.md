# Content Creation Instructions - Visual ASIN Verification

## 🎯 Overview

All content with Amazon affiliate links now requires **mandatory visual verification** before publishing. This ensures every link works correctly and generates affiliate revenue.

## 📋 What Changed

### 1. **Updated Best-List Template**
Location: `docs/templates/best-list-template.md`

**New Requirements:**
- ✅ Visual browser testing of ALL ASINs required
- ✅ Screenshot proof mandatory for each product
- ✅ Verification must show affiliate tag in URL bar
- ⚠️ Articles cannot be published without visual verification

### 2. **Enhanced ASIN Verification Guide**
Location: `docs/ASIN_VERIFICATION_GUIDE.md`

**New Process:**
1. Extract ASINs using `npm run verify-asins`
2. Open each ASIN in browser with affiliate tag
3. Take screenshots showing:
   - URL bar with affiliate tag
   - Product title and image
   - "In Stock" status
4. Save screenshots as proof

### 3. **New Content Creation Workflow**
Location: `docs/workflows/create-best-list-article.md`

**Complete step-by-step workflow including:**
- Research and planning
- **Visual ASIN verification (before writing)**
- Article creation
- Pre-publishing checks
- Post-deployment verification

## 🚀 How to Create Content Now

### Quick Start (5 Steps)

1. **Research Products**
   - Find products on Amazon
   - Extract ASINs from URLs
   - Document product specs

2. **Verify ASINs Visually** ⭐ **NEW REQUIREMENT**
   ```bash
   # For each product, open in browser:
   https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20
   
   # Verify:
   ✅ Page loads (not 404)
   ✅ Product is in stock
   ✅ Product matches your research
   ✅ Affiliate tag visible in URL
   
   # Take screenshot showing all of the above
   ```

3. **Write Article**
   - Use template: `docs/templates/best-list-template.md`
   - Use ONLY verified ASINs
   - No specific prices (use ranges)

4. **Pre-Publishing Verification**
   ```bash
   npm run verify-asins  # Check all ASINs in article
   ```
   - Click every Amazon link in preview
   - Verify all redirect correctly

5. **Publish & Monitor**
   ```bash
   git add src/content/picks/[article].md
   git commit -m "feat: add [article name]"
   git push
   ```
   - Test links on live site after deployment
   - Add to monthly audit list

## 📸 Screenshot Requirements

**For each product, save screenshot showing:**

1. **URL bar** - Must show:
   - `https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20`
   - Affiliate tag clearly visible

2. **Product details** - Must show:
   - Product title matching article
   - Product image
   - "In Stock" or "Add to Cart" button

3. **File naming**:
   ```
   asin-verification-[product-name]-[date].png
   
   Example:
   asin-verification-echo-dot-5th-gen-2025-11-24.png
   ```

## ⚠️ Critical Rules

### DO NOT Publish Without:
- [ ] Visual verification of ALL ASINs
- [ ] Screenshots saved as proof
- [ ] All links tested in browser
- [ ] Affiliate tags confirmed present

### Always Remember:
- ❌ NO specific prices ($79, $149, etc.)
- ✅ USE price ranges (under $100, $100-200 range)
- ✅ ALWAYS include `?tag=trendytecht0a-20`
- ✅ ALWAYS use `https://www.amazon.com` (with "www.")

## 🔧 Tools Available

### ASIN Extraction Script
```bash
npm run verify-asins
```
Shows all ASINs in your articles for manual verification.

### Quick ASIN Test
```
https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20
```
Open this URL for each ASIN to verify it works.

### Templates
- Best-list articles: `docs/templates/best-list-template.md`
- How-to guides: `docs/templates/how-to-template.md`

### Documentation
- ASIN Verification: `docs/ASIN_VERIFICATION_GUIDE.md`
- Amazon Pricing Rules: `docs/AMAZON_PRICING_RULES.md`
- Content Workflow: `docs/workflows/create-best-list-article.md`
- Monthly Audit: `docs/workflows/monthly-asin-audit.md`

## 📅 Ongoing Maintenance

### Monthly (1st of each month)
Run ASIN audit workflow:
```bash
npm run verify-asins
```
Follow: `docs/workflows/monthly-asin-audit.md`

### Before Each Article
1. Verify ASINs visually
2. Take screenshots
3. Test all links
4. Save proof

### After Publishing
1. Test links on live site
2. Verify affiliate tags work
3. Add to audit list

## ✅ Success Checklist

Before you start writing, verify you have:
- [ ] Read `docs/workflows/create-best-list-article.md`
- [ ] Understand visual verification requirement
- [ ] Know how to extract ASINs
- [ ] Know how to test ASINs in browser
- [ ] Know screenshot requirements
- [ ] Have affiliate tag memorized: `?tag=trendytecht0a-20`

## 🎓 Example Workflow

**Creating "Best Wireless Earbuds 2025":**

1. **Research** (30 min)
   - Find 5-7 products on Amazon
   - Read reviews, specs
   - Extract ASINs

2. **Visual Verification** (10 min) ⭐
   ```
   Product 1: Sony WF-1000XM5
   ASIN: B0C33XXS56
   URL: https://www.amazon.com/dp/B0C33XXS56?tag=trendytecht0a-20
   Status: ✅ Valid, In Stock
   Screenshot: ✅ Saved
   
   Product 2: Anker Soundcore Liberty 4
   ASIN: B0BZV7M23Q
   URL: https://www.amazon.com/dp/B0BZV7M23Q?tag=trendytecht0a-20
   Status: ✅ Valid, In Stock
   Screenshot: ✅ Saved
   
   [... repeat for all products]
   ```

3. **Write Article** (60 min)
   - Use template
   - Include verified ASINs only
   - Follow pricing rules

4. **Pre-Publish Check** (5 min)
   ```bash
   npm run verify-asins
   # Click all links in preview
   ```

5. **Publish** (2 min)
   ```bash
   git add src/content/picks/best-wireless-earbuds-2025.md
   git commit -m "feat: add best wireless earbuds 2025 article"
   git push
   ```

6. **Post-Deploy** (5 min)
   - Visit live article
   - Click all Amazon links
   - Verify they work

**Total Time: ~2 hours for quality article with verified links**

## 🆘 Need Help?

**ASIN doesn't work?**
- See: `docs/ASIN_VERIFICATION_GUIDE.md` → "Common ASIN Issues"

**Not sure about pricing rules?**
- See: `docs/AMAZON_PRICING_RULES.md`

**First time creating content?**
- Follow: `docs/workflows/create-best-list-article.md` step-by-step

**Product discontinued?**
- Search Amazon for current replacement
- Get new ASIN
- Verify visually
- Update article

---

## 🎉 You're Ready!

With these new processes, every article you create will have:
- ✅ Working Amazon affiliate links
- ✅ Accurate product information
- ✅ Proof of verification
- ✅ Better user experience
- ✅ More affiliate revenue

**Start creating content with confidence!**
