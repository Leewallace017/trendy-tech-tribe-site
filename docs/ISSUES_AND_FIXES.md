# Issues Found & Fixes Needed

## Issues Identified

### 1. ❌ Pricing Violations in Articles
**Problem:** Sample articles contain specific prices like "$549" which violates Amazon Associates rules about static pricing.

**Amazon's Rule:** Prices change frequently, and showing outdated prices is prohibited. You must either:
- Use dynamic pricing (Amazon PA-API)
- Show price ranges
- Use "Check price on Amazon" CTAs
- Include disclaimers with dates

**Examples of violations in sample articles:**
- Steam Deck OLED: "Price: $549 (512GB) / $649 (1TB)"
- Best Earbuds: "$79", "$50", "$100", "$80" throughout
- Multiple articles with specific dollar amounts

### 2. ❌ Generic/Reused Images
**Problem:** Articles use generic Unsplash stock photos not specific to the topic.

**Examples:**
- VR headset article using generic VR image
- Product reviews using category images, not actual products
- Same tech imagery across multiple articles

### 3. ❌ No Image Generation/Scraping Tools
**Problem:** Manual image sourcing is slow and results in generic choices.

**Need:**
- MCP server for AI image generation
- MCP server or script for Amazon product image extraction
- Better Unsplash search strategies

---

## Fixes Required

### Fix 1: Update Pricing in All Articles

**Action Items:**
- [ ] Remove specific prices from article body text
- [ ] Replace with "Check price on Amazon" CTAs
- [ ] Or use price ranges ("mid-$500 range")
- [ ] Update templates to avoid pricing violations
- [ ] Add proper disclaimers if any prices mentioned

**Example fix for Steam Deck article:**

**Before:**
```markdown
**Price:** $549 (512GB) / $649 (1TB)
```

**After:**
```markdown
**Pricing:** Positioned in the premium handheld gaming segment, the Steam Deck OLED offers excellent value for PC gaming on the go.

[Check current price on Amazon →](affiliate-link)

*Note: Pricing varies by configuration (512GB/1TB) and availability.*
```

### Fix 2: Replace Generic Images

**Action Items:**
- [ ] Get actual product images from Amazon for product reviews
- [ ] Use AI generation for news/analysis articles
- [ ] Search Unsplash with specific terms, not generic "technology"
- [ ] Ensure each article has unique, relevant image
- [ ] Track images used to prevent reuse

**Example fixes:**

**Steam Deck OLED Review:**
- ❌ Current: Generic handheld gaming stock photo
- ✅ Fixed: Actual Steam Deck OLED product image from Amazon

**Best Wireless Earbuds:**
- ❌ Current: Generic earbuds on table
- ✅ Fixed: Composite image of the actual products reviewed or hero product image

**GPT-5 Agents Article:**
- ❌ Current: Generic AI/robot image
- ✅ Fixed: AI-generated visualization of agent architecture or workflow

### Fix 3: Set Up Image Tools

**Action Items:**
- [ ] Install Replicate MCP for AI image generation
- [ ] Create or install Amazon product scraping tool
- [ ] Set up image optimization workflow
- [ ] Create image tracking system

---

## Priority Order

### 🔴 **High Priority (Do First):**
1. **Fix pricing violations** - Risk of Amazon Associates account suspension
2. **Update templates** - Prevent future violations
3. **Document pricing policy** - Already created (AMAZON_PRICING_RULES.md)

### 🟡 **Medium Priority (Do Soon):**
1. **Set up image generation MCP** - Improves article quality
2. **Replace images in sample articles** - Better examples
3. **Create image sourcing workflow** - Faster article creation

### 🟢 **Low Priority (Nice to Have):**
1. **Amazon PA-API integration** - Dynamic pricing (requires approval)
2. **Automated image optimization** - Smaller file sizes
3. **Image library management** - Track usage

---

## Recommended Solutions

### For Pricing:

**Option A: No Specific Prices (Safest)**
```markdown
Competitively priced in the mid-range segment.
[View current price on Amazon →](affiliate-link)
```

**Option B: Price Ranges**
```markdown
Typically priced between $70-90, offering excellent value.
[Check latest pricing →](affiliate-link)
```

**Option C: Dated with Disclaimer**
```markdown
**Pricing Note:** Around $549 as of January 2025. Amazon prices
update frequently - [check current price](affiliate-link) for
most accurate information.
```

**Recommended:** **Option A** (safest, Amazon-compliant, no maintenance)

### For Images:

**Option A: MCP-Based (Best)**
1. Use Replicate MCP for AI generation ($10-20/month)
2. Use custom Amazon MCP for product images (free)
3. Results in unique, relevant images

**Option B: Manual with Better Strategy (Free)**
1. Extract product images from Amazon manually
2. Use specific Unsplash searches
3. Track images to prevent reuse
4. More time-consuming but free

**Option C: Hybrid**
1. Product reviews → Amazon product images (free)
2. News/analysis → AI generation (paid)
3. Quick articles → Better Unsplash searches (free)

**Recommended:** **Option C** (balanced cost/quality)

---

## Updated Article Creation Workflow

**Before writing:**
1. ✅ Choose topic
2. ✅ Research (3+ sources)
3. ✅ **Get specific image** (product/AI/specific Unsplash)
4. ✅ Note: **NO specific pricing** in content

**During writing:**
1. ✅ Use template (updated for pricing compliance)
2. ✅ For products: "Check price on Amazon" CTAs
3. ✅ Price ranges OK, specific prices NOT OK
4. ✅ Unique, relevant image

**Before publishing:**
1. ✅ Verify all links work
2. ✅ Check image hasn't been reused
3. ✅ Confirm no static pricing violations
4. ✅ Test build

---

## Templates Need Updates

**All templates should be updated to:**

1. **Remove price fields** from frontmatter (or mark optional)
2. **Add pricing disclaimer sections** with CTAs
3. **Improve image sourcing instructions**
4. **Add image uniqueness checks**

**Example template pricing section:**
```markdown
## Pricing & Availability

[Product Name] is positioned in the [budget/mid/premium] tier.
[View current pricing and availability on Amazon →](AFFILIATE_LINK)

*Prices on Amazon update frequently. The link above shows real-time pricing.*
```

---

## Action Plan

### Week 1: Fix Violations
- [ ] Update all 12 sample articles (remove specific prices)
- [ ] Update all 5 templates (pricing compliance)
- [ ] Document pricing policy (✅ Done - AMAZON_PRICING_RULES.md)

### Week 2: Improve Images
- [ ] Set up Replicate MCP for image generation
- [ ] Create Amazon image scraper script
- [ ] Replace images in sample articles
- [ ] Document image workflow (✅ Done - IMAGE_SOURCING_GUIDE.md)

### Week 3: Optimize Workflow
- [ ] Test new workflow on 5-10 new articles
- [ ] Refine based on what works
- [ ] Scale to daily publishing goal

---

## Files Created to Help

1. **AMAZON_PRICING_RULES.md** - Detailed compliance guide
2. **IMAGE_SOURCING_GUIDE.md** - How to get relevant images
3. **MCP_TOOLS_SETUP.md** - Setting up image generation & scraping
4. **This file** - Summary of issues and fixes

---

## Questions to Decide

1. **Pricing approach:** Option A (no prices), B (ranges), or C (dated)?
   - **Recommendation:** Option A (safest)

2. **Image tools:** MCP setup (paid) or manual (free)?
   - **Recommendation:** Hybrid (Amazon manual, AI for special articles)

3. **Fix sample articles?** Or just update templates for future?
   - **Recommendation:** Fix samples (they're your portfolio)

4. **Apply for Amazon PA-API?** (dynamic pricing)
   - **Recommendation:** Wait until you have consistent sales

Let me know which options you prefer and I can help implement!
