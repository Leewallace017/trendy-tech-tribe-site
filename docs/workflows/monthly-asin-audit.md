# Monthly ASIN Audit Workflow

This workflow ensures all Amazon product links remain valid and functional over time.

## When to Run

**Schedule**: 1st of every month  
**Duration**: ~30-60 minutes depending on article count  
**Priority**: High (prevents broken affiliate links)

## Prerequisites

- Access to project repository
- Web browser for manual verification
- Text editor for updating articles

## Workflow Steps

### Step 1: Extract All ASINs

Run the ASIN extraction script:

```bash
npm run verify-asins
```

This will generate a report showing:
- Total Amazon links found
- Unique ASINs count
- Files containing Amazon links
- Invalid URL formats (missing "www.")
- Verification checklist for each ASIN

**Expected Output**: Console report with checklist of all ASINs to verify

---

### Step 2: Manual ASIN Verification

For each ASIN in the report:

1. **Open Test URL** in browser:
   ```
   https://www.amazon.com/dp/[ASIN]
   ```

2. **Check Status**:
   - ✅ **Valid**: Product page loads, product is available
   - ❌ **Invalid**: 404 error or "page not found"
   - ⚠️ **Unavailable**: Page loads but shows "Currently unavailable"

3. **Mark Status** in the report printout or spreadsheet

---

### Step 3: Fix Invalid ASINs

For each invalid or unavailable ASIN:

#### Option A: Find Updated ASIN (Same Product)

1. Search Amazon for the exact product name
2. Look for the same product from the same manufacturer
3. Extract new ASIN from URL
4. Update article with new ASIN

#### Option B: Replace with Alternative Product

1. Search for similar products in same category
2. Check reviews and ratings (prefer 4+ stars, 1000+ reviews)
3. Verify product is currently available
4. Update article with new product and ASIN

#### Option C: Remove Product

If no suitable replacement exists:
1. Remove product section from article
2. Update "Quick Picks" section
3. Update comparison table
4. Renumber remaining products

---

### Step 4: Update Articles

For each article with invalid ASINs:

1. **Open article file** in text editor

2. **Update ASIN** in all locations:
   - Frontmatter `affiliateProducts` section
   - Product section body links
   - Comparison table (if applicable)
   - Final recommendations section

3. **Update product details** if replacing with alternative:
   - Product name
   - Key features
   - Pros/cons
   - Rating (if changed)

4. **Verify affiliate tag** is present:
   ```
   ?tag=trendytecht0a-20
   ```

5. **Save changes**

---

### Step 5: Re-verify Fixed ASINs

After making updates:

1. Run verification script again:
   ```bash
   npm run verify-asins
   ```

2. Manually test each updated ASIN

3. Confirm all ASINs now show ✅ Valid

---

### Step 6: Document Audit Results

Create audit log entry in `docs/audit-logs/YYYY-MM-DD-asin-audit.md`:

```markdown
# ASIN Audit - [Date]

## Summary
- **Articles Checked**: X
- **Total ASINs**: X
- **Invalid ASINs Found**: X
- **ASINs Updated**: X
- **Products Replaced**: X
- **Products Removed**: X

## Invalid ASINs Fixed

### Article: [Article Title]
- **Old ASIN**: B0XXXXXXXX (404 error)
- **New ASIN**: B0YYYYYYYY
- **Action**: Updated to current model
- **Product**: [Product Name]

### Article: [Article Title]
- **Old ASIN**: B0XXXXXXXX (unavailable)
- **Action**: Replaced with alternative
- **Old Product**: [Old Product Name]
- **New Product**: [New Product Name]
- **New ASIN**: B0ZZZZZZZZ

## Notes
[Any observations, patterns, or recommendations for future audits]
```

---

### Step 7: Commit and Deploy

1. **Review changes**:
   ```bash
   git diff
   ```

2. **Commit updates**:
   ```bash
   git add .
   git commit -m "chore: monthly ASIN audit - fixed X invalid ASINs"
   ```

3. **Push to repository**:
   ```bash
   git push
   ```

4. **Deploy** (if not auto-deployed):
   ```bash
   npm run build
   vercel --prod
   ```

---

## Troubleshooting

### Issue: Script shows "Invalid URL format" warnings

**Cause**: Amazon URLs missing "www."

**Fix**:
1. Open affected files
2. Find URLs like `https://amazon.com/dp/...`
3. Replace with `https://www.amazon.com/dp/...`
4. Re-run verification script

---

### Issue: Product page loads but shows different product

**Cause**: Amazon merged or redirected ASIN

**Fix**:
1. Check if redirected product is suitable replacement
2. If yes: Update article description to match
3. If no: Search for original product or find alternative

---

### Issue: Many ASINs invalid in single article

**Cause**: Article may be outdated or products discontinued

**Fix**:
1. Consider updating entire article with current products
2. Or archive article if category is no longer relevant
3. Update article date if refreshing content

---

## Best Practices

### During Audit

- ✅ **Use incognito/private browsing** to avoid cached pages
- ✅ **Check product availability** not just page existence
- ✅ **Verify product matches description** in article
- ✅ **Update article dates** if making significant changes
- ✅ **Test affiliate tags** work correctly

### After Audit

- ✅ **Document all changes** in audit log
- ✅ **Review updated articles** in preview before deploying
- ✅ **Monitor analytics** for any traffic changes post-update
- ✅ **Share findings** with team if patterns emerge

---

## Quick Reference

### Commands
```bash
# Extract all ASINs
npm run verify-asins

# Build and test locally
npm run build
npm run preview

# Deploy to production
vercel --prod
```

### ASIN Test URL Format
```
https://www.amazon.com/dp/[ASIN]
```

### Valid Amazon Affiliate URL Format
```
https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20
```

---

## Related Documentation

- [ASIN Verification Guide](../ASIN_VERIFICATION_GUIDE.md)
- [Amazon Pricing Rules](../AMAZON_PRICING_RULES.md)
- [Article Templates](../templates/)

---

**Last Updated**: 2025-11-24  
**Next Scheduled Audit**: [1st of next month]
