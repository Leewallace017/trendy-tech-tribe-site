# Amazon ASIN Verification Guide

This guide ensures all Amazon product links in articles use valid ASINs and remain functional over time.

## What is an ASIN?

**ASIN** (Amazon Standard Identification Number) is a 10-character alphanumeric unique identifier assigned by Amazon to products. Example: `B09B8V1LZ3`

## Why ASIN Verification Matters

Invalid ASINs lead to:
- Broken affiliate links (lost revenue)
- Poor user experience (404 errors)
- Reduced article credibility
- Wasted reader trust

## How to Find an ASIN

### Method 1: From Product URL
The ASIN is in the product URL after `/dp/`:
```
https://www.amazon.com/dp/B09B8V1LZ3
                          ^^^^^^^^^^
                          This is the ASIN
```

### Method 2: From Product Page
1. Scroll down to "Product Information" section
2. Look for "ASIN: B09B8V1LZ3"

### Method 3: From Search Results
Right-click on a product → "Copy link address" → Extract ASIN from URL

## Pre-Publishing ASIN Verification Checklist

**Before publishing ANY article with Amazon links, complete this checklist:**

- [ ] **Step 1: Extract all ASINs** from your article
  - Search your markdown file for `amazon.com/dp/`
  - List each unique ASIN

- [ ] **Step 2: Verify each ASIN manually**
  - Open `https://www.amazon.com/dp/[ASIN]` in browser
  - Confirm product page loads (not 404 error)
  - Verify product matches your article description
  - Check product is "In Stock" or "Available"

- [ ] **Step 3: Verify affiliate tag present**
  - Each Amazon URL should end with `?tag=trendytecht0a-20`
  - Format: `https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20`

- [ ] **Step 4: Test final links**
  - Click each Amazon link in your article preview
  - Verify they redirect to correct product pages
  - Confirm affiliate tag is preserved after redirect

## Common ASIN Issues & Solutions

### Issue: "Sorry, we couldn't find that page"

**Cause**: ASIN is invalid, product discontinued, or regional restriction

**Solution**:
1. Search Amazon for the product by name
2. Find the current listing
3. Extract the new ASIN
4. Update your article

### Issue: Product shows "Currently unavailable"

**Cause**: Temporary stock issue or permanent discontinuation

**Solution**:
- **Temporary**: Keep ASIN, add note about potential stock issues
- **Permanent**: Replace with similar alternative product

### Issue: Wrong product appears

**Cause**: ASIN was copied incorrectly or product listing changed

**Solution**:
1. Verify you copied the full 10-character ASIN
2. Double-check product title matches your article
3. If mismatch, find correct product and update ASIN

## Best Practices for Selecting Products

### Choose Stable Products

✅ **Good choices**:
- Established brands (Apple, Anker, Logitech)
- Current generation products (not last-gen clearance)
- Products with thousands of reviews
- Items marked "Amazon's Choice" or "Best Seller"

❌ **Avoid**:
- Third-party sellers with few reviews
- Products marked "Only X left in stock"
- Clearance or discontinued items
- Regional-specific products

### Verify Product Longevity

Before featuring a product:
1. Check release date (prefer products released within last 2 years)
2. Look for successor models (avoid if newer version exists)
3. Check review velocity (active reviews = active product)

## Monthly ASIN Audit Process

**Run this audit on the 1st of each month:**

### Step 1: Extract All ASINs
```bash
npm run verify-asins
```
This generates a list of all ASINs in your articles.

### Step 2: Manual Verification
For each ASIN in the report:
1. Open `https://www.amazon.com/dp/[ASIN]`
2. Mark as ✅ Valid or ❌ Invalid

### Step 3: Fix Invalid ASINs
For each invalid ASIN:
1. Search Amazon for product by name
2. Find current listing or suitable replacement
3. Update article with new ASIN
4. Test updated link

### Step 4: Document Results
Create audit log:
```
Date: 2025-11-24
Articles Checked: 15
ASINs Verified: 47
Invalid ASINs Found: 2
ASINs Updated: 2
```

## Regional ASIN Considerations

### US vs International ASINs

ASINs can differ by region:
- US: `amazon.com` → ASIN `B09B8V1LZ3`
- UK: `amazon.co.uk` → Different ASIN
- DE: `amazon.de` → Different ASIN

**Our Standard**: Always use **US Amazon** (`amazon.com`) ASINs

### Checking Regional Availability

If concerned about international readers:
1. Copy ASIN from US Amazon
2. Search for product on `amazon.co.uk` or `amazon.de`
3. Note if product is available internationally (optional)

## Troubleshooting

### "The ASIN I found doesn't work"

1. **Verify you copied the full ASIN** (exactly 10 characters)
2. **Check for spaces or extra characters**
3. **Try the ASIN in incognito/private browsing** (clears cache)
4. **Verify you're on amazon.com** (not .co.uk or .de)

### "Product has multiple ASINs"

This happens when products have variants (colors, sizes):
1. Choose the most popular variant (check review count)
2. Or choose the default/base variant
3. Mention variant availability in article if relevant

### "ASIN worked yesterday, broken today"

Products can be delisted quickly:
1. Check if product was recalled or discontinued
2. Search for replacement product
3. Update article immediately
4. Consider adding "Last verified: [date]" to articles

## Quick Reference

### Valid ASIN Format
- Exactly 10 characters
- Alphanumeric (letters and numbers)
- Example: `B09B8V1LZ3`

### Valid Amazon Affiliate URL Format
```
https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20
```

### ASIN Verification URL
```
https://www.amazon.com/dp/[ASIN]
```

## Tools & Resources

- **ASIN Extraction Script**: `npm run verify-asins`
- **Amazon Product Lookup**: `https://www.amazon.com/dp/[ASIN]`
- **Article Templates**: `docs/article-templates/`
- **Amazon Pricing Rules**: `docs/AMAZON_PRICING_RULES.md`

## Questions?

If you encounter an ASIN issue not covered here:
1. Document the issue and solution
2. Update this guide
3. Share with the team

---

**Last Updated**: 2025-11-24  
**Next Review**: 2025-12-24
