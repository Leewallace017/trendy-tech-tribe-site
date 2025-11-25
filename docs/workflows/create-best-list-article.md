---
description: Complete workflow for creating best-list articles with visual ASIN verification
---

# Create Best-List Article Workflow

This workflow ensures all best-list articles are created with accurate, verified Amazon affiliate links.

## Phase 1: Research & Planning

### Step 1: Topic Selection
- [ ] Choose product category with affiliate potential
- [ ] Verify products are available on Amazon
- [ ] Check competition (what exists already)
- [ ] Confirm target audience interest

### Step 2: Research with Perplexity (RECOMMENDED)
**Use Perplexity for fast, accurate research:**

```bash
# Compare top products in category
npm run perplexity -- compare "product1" "product2" "product3"

# Get specific product details and ASINs
npm run perplexity -- products "product name"

# Find review sources
npm run perplexity -- sources "best [category] 2025"
```

**What you get from Perplexity:**
- [ ] Detailed product comparisons with specs
- [ ] Pros and cons for each product
- [ ] Amazon ASINs
- [ ] Credible review sources with URLs
- [ ] Current pricing context
- [ ] Real user feedback context

**Manual Research (if needed):**
- [ ] Read manufacturer specs for each product
- [ ] Amazon customer reviews
- [ ] Tech review sites (CNET, Wirecutter, etc.)
- [ ] YouTube reviews

### Step 3: ASIN Collection (CRITICAL)
**From Perplexity:**
- [ ] Run: `npm run perplexity -- products "product name"` for each product
- [ ] Extract ASINs from Perplexity output
- [ ] Format: `https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20`

**Manual Method (backup):**
- [ ] For each product, extract ASIN from Amazon URL
- [ ] Create list of all ASINs to verify
- [ ] **DO NOT PROCEED** until ASINs are collected

## Phase 2: Visual ASIN Verification (MANDATORY)

**⚠️ CRITICAL: Complete this BEFORE writing the article!**

### Step 4: Visual Browser Verification
For EACH product/ASIN:

1. **Open in Browser**:
   ```
   https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20
   ```

2. **Verify Checklist**:
   - [ ] Page loads successfully (not 404)
   - [ ] Product is "In Stock" or "Available"
   - [ ] Product name matches your research
   - [ ] Product specs match what you plan to write
   - [ ] Affiliate tag visible in URL: `?tag=trendytecht0a-20`
   - [ ] Product is current model (not discontinued)

3. **Take Screenshot**:
   - [ ] Screenshot showing URL bar with affiliate tag
   - [ ] Screenshot showing product title and availability
   - [ ] Save as: `asin-verification-[product-name].png`

4. **Document Results**:
   ```
   Product: [Name]
   ASIN: [ASIN]
   Status: ✅ Valid / ❌ Invalid
   Price: $[range] (for your reference only - don't publish)
   Notes: [Any issues or observations]
   ```

### Step 5: Handle Invalid ASINs
If any ASIN is invalid:
- [ ] Search Amazon for current replacement product
- [ ] Find new ASIN for current model
- [ ] Repeat verification process
- [ ] Update your product list

**🛑 STOP: Do not proceed to writing until ALL ASINs are verified!**

## Phase 3: Article Creation

### Step 6: Use Template
- [ ] Copy `docs/templates/best-list-template.md`
- [ ] Save as: `src/content/picks/best-[category]-2025.md`
- [ ] Update frontmatter with verified ASINs

### Step 7: Write Content
Follow template structure:
- [ ] Quick Picks section (top recommendations)
- [ ] What to Look For (buying criteria)
- [ ] Detailed product reviews (5-7 products)
- [ ] Comparison table
- [ ] Buying guide
- [ ] FAQs
- [ ] Final verdict

**Writing Rules**:
- ❌ NO specific prices ($79, $149, etc.)
- ✅ USE price ranges (under $100, $100-200 range)
- ✅ USE verified specs from manufacturer sites
- ✅ CITE review sources
- ✅ BE honest about pros AND cons

### Step 8: Add Affiliate Links
- [ ] Use ONLY verified ASINs from Step 4
- [ ] Format: `https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20`
- [ ] Include "www." in all URLs
- [ ] Add affiliate tag to ALL Amazon links
- [ ] Use "View on Amazon" as link text

### Step 9: Add Images
Priority order:
1. Hero product image from Amazon (Best Overall pick)
2. Composite of top 3-4 products
3. AI-generated product comparison
4. Specific category image from Unsplash

- [ ] Image shows actual products from article
- [ ] Image credit included
- [ ] Alt text descriptive and SEO-friendly

## Phase 4: Pre-Publishing Verification

### Step 10: Run ASIN Verification Script
```bash
npm run verify-asins
```

- [ ] Script shows all ASINs in article
- [ ] All ASINs match your verified list from Step 4
- [ ] No unexpected ASINs appear

### Step 11: Final Visual Verification
**Even if you verified before, verify again!**

Open article in browser and click EVERY "View on Amazon" link:
- [ ] Link 1: [Product name] - ✅ Works
- [ ] Link 2: [Product name] - ✅ Works
- [ ] Link 3: [Product name] - ✅ Works
- [ ] Link 4: [Product name] - ✅ Works
- [ ] Link 5: [Product name] - ✅ Works

For each link:
- [ ] Redirects to correct product
- [ ] Affiliate tag present in final URL
- [ ] Product available for purchase

### Step 12: Complete Pre-Publishing Checklist
From template:
- [ ] Web search for latest product reviews
- [ ] All products verified on Amazon
- [ ] Specs verified against manufacturer sites
- [ ] Multiple reviews consulted (3+ sources)
- [ ] Affiliate tracking ID in ALL Amazon URLs
- [ ] Amazon URLs use CORRECT format (with "www.")
- [ ] NO specific prices anywhere
- [ ] Price ranges only
- [ ] Image shows actual products
- [ ] Comparison table accurate
- [ ] All source links work
- [ ] Date is current
- [ ] **VISUAL ASIN VERIFICATION COMPLETE** ✅

## Phase 5: Publishing

### Step 13: Commit Changes
```bash
git add src/content/picks/best-[category]-2025.md
git commit -m "feat: add best [category] 2025 article with verified ASINs"
```

### Step 14: Push to Deploy
```bash
git push
```

### Step 15: Post-Deployment Verification
After Vercel deploys (1-2 minutes):
- [ ] Visit live article URL
- [ ] Click EVERY Amazon link on live site
- [ ] Verify all links work correctly
- [ ] Verify affiliate tags present

### Step 16: Monitor & Maintain
- [ ] Add to monthly ASIN audit list
- [ ] Set reminder to review in 30 days
- [ ] Monitor for product discontinuations
- [ ] Update if better products released

---

## Quick Reference: ASIN Verification Commands

**Extract ASINs from article:**
```bash
npm run verify-asins
```

**Test single ASIN in browser:**
```
https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20
```

**Correct Amazon URL format:**
```
✅ https://www.amazon.com/dp/B09B8V1LZ3?tag=trendytecht0a-20
❌ https://amazon.com/dp/B09B8V1LZ3?tag=trendytecht0a-20 (missing www.)
```

---

## Troubleshooting

**ASIN shows as invalid:**
- Product may be discontinued - search for current model
- ASIN may be region-specific - verify you're on Amazon.com
- Product may be temporarily out of stock - check back later

**Affiliate tag not showing:**
- Verify URL format includes `?tag=trendytecht0a-20`
- Check for typos in tag
- Ensure "www." is in URL

**Product specs don't match:**
- Amazon may show different variant
- Check for multiple product versions
- Verify you have correct ASIN for specific model

---

## Success Criteria

✅ Article published with:
- All Amazon links verified and working
- All affiliate tags present and correct
- No specific prices mentioned
- Accurate product information
- Professional, helpful content
- Screenshots saved as proof of verification

❌ Do NOT publish if:
- Any ASIN is unverified
- Any link returns 404
- Any product is unavailable
- Affiliate tags are missing
- Specific prices are mentioned
