---
description: Streamlined workflow for writing multiple articles efficiently
---

# Write Multiple Articles Workflow

Use this workflow when asked to "write six articles" or similar bulk content creation requests.

## Phase 1: Planning & Research (5-10 minutes)

### Step 1: Check Existing Content
- [ ] List existing articles in each category to avoid duplicates
- [ ] Note recent topics covered to ensure new articles are differentiated
- [ ] **CRITICAL**: New articles must have new information/angles, not just rehash existing content

### Step 2: Web Research for Current Topics
Run parallel web searches for each category:
```
"[category] news last 7 days"
"[category] November 2025 latest"  
"[category] announcement this week"
```

Document findings:
- Topic title
- Key facts (with dates)
- 3-5 source URLs
- Why this is newsworthy NOW

### Step 3: Select Templates
- Quick-take: News, announcements, analysis (most articles)
- Best-list: Product roundups, buying guides
- Deep-dive: Complex topics needing detailed explanation
- Opinion: Editorial perspective on trends

### Step 4: Create Implementation Plan
Document in `implementation_plan.md`:
- Article topics with justification
- Template for each
- Key sources identified
- Verification plan

**Get user approval before proceeding to writing**

## Phase 2: Execution (Write Articles)

### Step 5: Write Articles Using Templates
For each article:
- [ ] Copy appropriate template from `docs/templates/`
- [ ] Use current date (TODAY or later, never past dates)
- [ ] Include 3-5 verified sources in frontmatter
- [ ] Add Sources section at end
- [ ] Follow template structure exactly

**Quick-take articles (5-10 min each):**
- What Happened (facts only)
- Key Details (bullet points)
- Why It Matters (analysis)
- The Backstory (context)
- Expert Reactions (real quotes)
- What's Next (timeline)
- Our Take (editorial)
- The Bottom Line (summary)

**Best-list articles (15-20 min each):**
- Research products on Amazon FIRST
- Extract ASINs from product URLs
- Verify each ASIN loads and product is in stock
- NO specific prices (use ranges only)
- Include comparison table
- Add buying guide section

### Step 6: ASIN Verification (Best-List Only)
**MANDATORY before publishing product articles:**
- [ ] Extract all ASINs from article
- [ ] Open each in browser: `https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20`
- [ ] Verify product page loads (not 404)
- [ ] Verify product is available
- [ ] Verify product name matches article
- [ ] Run `npm run verify-asins` if script exists

### Step 7: Generate Custom Images
**MANDATORY - Do not reuse images from other articles:**
- [ ] Check if image URL is already used in another article
- [ ] Generate custom image using nano banana pro or generate_image tool
- [ ] Use specific prompts related to article topic
- [ ] Optimize for web (WebP format, 1200x630px, <200KB)
- [ ] Save to `public/images/` directory
- [ ] Update article frontmatter with local path

**Image Priority:**
1. Official press release images
2. Custom AI-generated images (nano banana pro)
3. Specific Unsplash searches (verify not already used)

**Never:**
- Reuse images from other articles
- Use generic stock photos
- Use unrelated images

## Phase 3: Verification

### Step 8: Quality Check
For ALL articles:
- [ ] Date is current (today or future)
- [ ] All facts from verified sources
- [ ] No made-up quotes or statistics  
- [ ] Source URLs in frontmatter AND at end
- [ ] No specific Amazon prices
- [ ] Images relevant to topic

### Step 9: Link Verification
- [ ] All source URLs load successfully
- [ ] Amazon affiliate links include `?tag=trendytecht0a-20`
- [ ] Amazon URLs use `https://www.amazon.com` (with www.)

## Phase 4: Documentation Updates

### Step 10: Update Workflow (If Needed)
After completing bulk article creation:
- [ ] Note any inefficiencies in process
- [ ] Update this workflow with improvements
- [ ] Clean up outdated docs (see Step 11)

### Step 11: Clean Up Docs
Consolidate and remove outdated documentation:
- [ ] Merge similar guides
- [ ] Delete superseded documents
- [ ] Update dates on remaining docs
- [ ] Ensure no conflicting information

---

## Key Principles

**Avoid Duplicate Content:**
- Check existing articles before selecting topics
- New articles need new information, not just rewrites
- Similar topics OK if there are new developments/angles

**Use Real Research:**
- Web search for current news (last 7 days)
- Verify facts across 3+ sources
- Never make up quotes, statistics, or sources
- Use actual dates from research

**Follow Templates:**
- Templates ensure consistency and quality
- Don't skip sections
- Maintain the structure

**Verify Everything:**
- Source links must work
- Amazon ASINs must be valid
- Dates must be current
- Facts must be accurate

---

## Time Estimates

- **6 Quick-take articles**: 30-60 minutes total
- **6 Mixed articles** (5 quick-take + 1 best-list): 45-75 minutes total
- **Planning & research**: 5-10 minutes
- **Verification**: 10-15 minutes
- **Total for 6 articles**: 60-90 minutes

---

## Common Mistakes to Avoid

❌ Using past dates (articles should be current)
❌ Making up sources or quotes
❌ Copying existing article topics without new information
❌ Skipping ASIN verification for product articles
❌ Including specific Amazon prices
❌ Using generic/unrelated images
❌ Forgetting affiliate tags on Amazon links

✅ Current dates (today or future)
✅ Real sources with working URLs
✅ New topics or fresh angles on existing topics
✅ Verified ASINs for all products
✅ Price ranges only
✅ Relevant, specific images
✅ All Amazon links include `?tag=trendytecht0a-20`
