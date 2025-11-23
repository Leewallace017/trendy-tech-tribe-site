# Amazon Associates Pricing Rules - Compliance Guide

## What Amazon Allows and Doesn't Allow

### ❌ **NOT ALLOWED:**
1. **Static prices in content** without clear disclaimers and dates
2. **Guaranteed prices** - "This product is $79"
3. **Outdated prices** - Must be updated or removed
4. **Price comparisons** without disclaimers
5. **"Best price" claims** without verification

### ✅ **ALLOWED:**
1. **Price ranges** - "typically priced between $50-100"
2. **Historical context** - "was priced at $549 at launch"
3. **With disclaimers** - "Price as of [date], check Amazon for current price"
4. **Dynamic pricing** via Amazon Product Advertising API
5. **"Check price on Amazon" CTAs** (safest option)

---

## Recommended Approaches

### **Option 1: No Specific Prices (Safest)**

**Instead of:**
> "The Steam Deck OLED costs $549"

**Use:**
> "The Steam Deck OLED is competitively priced for handheld gaming PCs. [Check current price on Amazon](affiliate-link)"

**Or:**
> "Pricing starts in the mid-$500 range, making it accessible compared to gaming laptops."

### **Option 2: Price Ranges**

**Instead of:**
> "Best wireless earbuds under $100: Soundcore Space A40 ($79)"

**Use:**
> "Best wireless earbuds under $100: Soundcore Space A40 (typically $70-90)"

### **Option 3: Dated Prices with Disclaimers**

**If you must include specific prices:**

```markdown
**Price:** Around $549 (as checked January 28, 2025)

*Note: Prices on Amazon change frequently. [Check current price](affiliate-link) for the most up-to-date pricing.*
```

### **Option 4: Frontmatter Only**

**Keep prices in YAML frontmatter only:**
```yaml
affiliateProducts:
  - name: "Product Name"
    url: "amazon-url"
    price: "$549"  # This can be used in product cards
```

**In article content:**
```markdown
[Check current price on Amazon](affiliate-link)
```

---

## Best Practices for Different Article Types

### **Product Reviews:**
```markdown
## Pricing & Value

The [Product Name] is positioned in the premium mid-range segment.
At the time of writing, it's priced competitively against alternatives
like [Competitor 1] and [Competitor 2].

[Check current price on Amazon →](affiliate-link)

For context, similar products in this category typically range from
$400-700 depending on configuration and sales.
```

### **Best Lists:**
```markdown
### 1. Product Name - Best Overall

**Value Proposition:** Mid-range pricing with flagship features

While prices fluctuate, this typically sits in the $70-90 range,
making it excellent value compared to $150+ competitors.

[View on Amazon →](affiliate-link)
```

### **Quick Takes (News):**
```markdown
## Pricing Strategy

The company announced a starting price around $45,000, positioning
it between budget and premium competitors. This represents a
significant reduction from their previous model's $75,000+ pricing.

Final pricing may vary by market and configuration.
```

---

## Updated Affiliate Disclaimer Language

**In Product Cards/CTAs:**
```html
<a href="affiliate-link">View on Amazon</a>
<small>Prices updated frequently. We may earn from qualifying purchases.</small>
```

**In Article Footers:**
```markdown
---
*Pricing information was accurate at time of publication but may
have changed. Please check Amazon for the most current pricing.
As an Amazon Associate, we earn from qualifying purchases.*
```

---

## Alternative: Amazon Product Advertising API

**For dynamic, always-current pricing:**

### Pros:
- Always shows current prices
- Automatically updates
- Fully compliant with Amazon rules
- Can show stock status

### Cons:
- Requires approval (need 3+ qualifying sales in 180 days)
- API rate limits (1 request/second free tier)
- More complex implementation
- Prices must be refreshed every 24 hours

### Implementation (if approved):
```typescript
// Example API call
import { ProductAdvertisingAPI } from 'amazon-pa-api';

const api = new ProductAdvertisingAPI({
  accessKey: 'YOUR_ACCESS_KEY',
  secretKey: 'YOUR_SECRET_KEY',
  partnerId: 'trendytecht0a-20'
});

const product = await api.getItems({
  itemIds: ['B0XXXXXXXX'],
  resources: ['ItemInfo.Title', 'Offers.Listings.Price']
});

// Use product.Items[0].Offers.Listings[0].Price.Amount
```

---

## Action Items: Fix Existing Articles

**We need to update the 12 sample articles to remove static pricing.**

**Replace:**
- `$549` → `mid-$500 range` or `Check price on Amazon`
- `Price: $79` → `[View current price](link)`
- Specific dollar amounts → Price ranges or CTAs

---

## Template Updates Needed

**Update all templates to use:**

```markdown
## Pricing

[Product Name] is positioned in the [budget/mid-range/premium] segment.

[Check current price on Amazon →](affiliate-link)

*Note: Amazon prices update frequently. Link shows current pricing.*
```

---

## Quick Reference

**Safe Phrases to Use:**
- ✅ "Check current price on Amazon"
- ✅ "Typically priced in the $X-Y range"
- ✅ "Competitively priced for its category"
- ✅ "View latest pricing on Amazon"
- ✅ "Starting at approximately $X (subject to change)"

**Avoid:**
- ❌ "The price is $X"
- ❌ "Costs exactly $X"
- ❌ "Best price available"
- ❌ "Cheapest option at $X"
- ❌ Old prices without update dates

---

## Summary

**Safest approach for compliance:**
1. **Never** put specific prices in article body text
2. **Use** "Check price on Amazon" CTAs with affiliate links
3. **Use** price ranges when necessary ($50-100)
4. **Include** disclaimers if you mention any pricing
5. **Update** or remove any pricing info older than 30 days

This protects you from Amazon Associates violations and potential account suspension.
