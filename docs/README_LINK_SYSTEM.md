# Complete Link Verification & Affiliate Tag System

## 🎯 Summary

**Problem Solved:** Dead links and missing affiliate tags in content
**Solution:** Automated verification system that checks EVERY link and EVERY Amazon affiliate tag before publishing

---

## ✅ What's Now Enforced

### 1. All Links Must Work (Affiliates + Sources)
- **Amazon affiliate links**: Real product ASINs, no 404s
- **Source links**: Real article URLs, accessible, no paywalls preferred
- No broken URLs (404, 403, timeout)
- No speculative/made-up links
- Verified with automated checking

### 2. All Amazon Links Must Have Your Tag
```
?tag=trendytecht0a-20
```
Checked in:
- Frontmatter `affiliateProducts`
- Article body markdown links
- Bare URLs anywhere in content

### 3. All Source URLs Must Be Real
- Found with WebSearch (not guessed)
- Must return 200 OK status
- Must be actual published articles
- Prefer free/accessible sources over paywalled

---

## 🛠️ New Tools Available

### 1. Quick Article Check (Use This Most Often)
```bash
npm run verify-article src/content/picks/article-name.md
```

**What it does:**
- ✅ Checks all Amazon links have `?tag=trendytecht0a-20`
- ✅ Verifies all affiliate product URLs work
- ✅ Verifies all source URLs work (no 404s, 403s)
- ✅ Scans both frontmatter AND article body
- ✅ Shows exactly what to fix
- ✅ Runs in ~10 seconds

**When to use:** Before every publish (MANDATORY)

### 1b. Source Links Audit
```bash
npm run audit-sources
```

**What it does:**
- Focuses specifically on source links
- Shows which sources are broken
- Lists source titles + URLs + errors
- Helps identify paywalled sources
- Separate report from affiliate links

**When to use:** When fixing source link issues, quarterly maintenance

### 2. Full Site Audit
```bash
npm run verify-links
```

**What it does:**
- Scans all articles in `src/content/`
- Checks every link in every file
- Comprehensive report of all issues
- Shows which files have problems

**When to use:** Weekly maintenance, after bulk changes

### 3. Complete Pre-Publish Validation
```bash
npm run pre-publish src/content/picks/article-name.md
```

**What it does:**
- All link verification
- All affiliate tag checking
- Frontmatter validation
- Content structure checks
- SEO field lengths
- Complete article quality check

**When to use:** Final check before publishing important content

---

## 📊 Current Status

**As of November 23, 2025:**

- **12 articles total**
- **7 articles** have all valid links ✅
- **5 articles** have broken links ❌
- **8 broken links** identified:
  - **5 broken Amazon affiliate links** (wrong ASINs)
  - **3 broken source links** (404s, paywalled, or speculative URLs)

### Broken Source Links (3):

1. `ai/apple-google-gemini-siri-deal-2025.md` - Bloomberg URL (403 - paywall/doesn't exist)
2. `picks/best-wireless-earbuds-under-100-2025.md` - RTINGS URL (404 - wrong path)
3. `tech/meta-avoids-breakup-antitrust-2025.md` - Washington Post URL (403 - paywall/doesn't exist)

### Broken Affiliate Links (5):

4. `picks/best-tech-gifts-under-100-holiday-2025.md` - 2 wrong Amazon ASINs
5. `picks/best-wireless-earbuds-under-100-2025.md` - 3 wrong Amazon ASINs
6. `energy/us-battery-storage-record-2025.md` - 1 timeout (EIA URL)

See [SOURCE_LINKS_GUIDE.md](SOURCE_LINKS_GUIDE.md) and [LINK_VERIFICATION_GUIDE.md](LINK_VERIFICATION_GUIDE.md) for detailed fixes.

---

## 📝 Updated Workflow

### Every New Article:

```bash
# 1. Research with WebSearch (get REAL URLs)
WebSearch: "topic name November 2025"

# 2. Write article with real URLs and ASINs

# 3. Add affiliate tag to ALL Amazon links
# frontmatter:
affiliateProducts:
  - url: "https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20"

# article body:
[Buy on Amazon](https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20)

# 4. Verify before publishing
npm run verify-article src/content/picks/article.md

# 5. Fix ALL errors shown

# 6. Re-run until this appears:
# ✅ ALL LINKS VERIFIED - READY TO PUBLISH

# 7. Only then publish/commit
```

---

## 🚨 Mandatory Rules

### ❌ NEVER Do This:

```yaml
# Made-up ASIN
url: "https://amazon.com/dp/B0FAKE1234?tag=trendytecht0a-20"

# Missing affiliate tag
url: "https://amazon.com/dp/B00X5RV14Y"

# Guessed source URL
url: "https://techcrunch.com/2025/11/18/probably-exists/"

# Skip verification
# git commit -m "Add article"  ← NO! Verify first!
```

### ✅ ALWAYS Do This:

```yaml
# Real ASIN from Amazon search
url: "https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20"

# Real URL from WebSearch
url: "https://techcrunch.com/2025/11/18/actual-article-url/"

# Verify before commit
npm run verify-article src/content/picks/article.md
# (wait for ✅ ALL LINKS VERIFIED)
git commit -m "Add article"
```

---

## 📚 Documentation

Detailed guides available:

1. **[SOURCE_LINKS_GUIDE.md](SOURCE_LINKS_GUIDE.md)** ⭐ NEW
   - **How to fix broken source links**
   - Current 3 broken sources identified
   - Avoiding paywalled sources
   - Best practices for sources

2. **[LINK_VERIFICATION_GUIDE.md](LINK_VERIFICATION_GUIDE.md)**
   - Complete system documentation
   - All broken links list (8 total)
   - How to fix each type of issue
   - Technical details

3. **[AFFILIATE_TAG_ENFORCEMENT.md](AFFILIATE_TAG_ENFORCEMENT.md)**
   - How affiliate tag checking works
   - Common issues and fixes
   - Enforcement rules
   - Example outputs

4. **[REAL_CONTENT_WORKFLOW.md](REAL_CONTENT_WORKFLOW.md)**
   - Step-by-step content creation process
   - **Step 6: VERIFY ALL LINKS (MANDATORY)**
   - Quality checklist
   - Web research strategies

5. **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)**
   - Daily workflow
   - Pre-publish checklist with link verification
   - Common mistakes to avoid
   - Quick commands

---

## 🔧 Technical Implementation

### New Utility Functions

**`src/utils/linkVerification.ts`:**
- `extractAmazonLinksFromContent()` - Scans article body for Amazon URLs
- `validateAmazonAffiliateTags()` - Checks tag is `trendytecht0a-20`
- Enhanced `checkLink()` - Handles Amazon's anti-bot measures

**`src/utils/affiliate.ts`:** (existing)
- `hasAffiliateTag()` - Validates affiliate tag present
- `addAmazonAffiliateTag()` - Auto-adds tag to URLs
- `AMAZON_AFFILIATE_ID` constant - `trendytecht0a-20`

### New Scripts

**`scripts/verify-article-links.ts`:**
- Single article verification
- Affiliate tag checking (frontmatter + body)
- Link validation
- Detailed error reporting

**`scripts/verify-all-links.ts`:**
- All content verification
- Comprehensive site audit
- Summary reports

**`scripts/pre-publish-check.ts`:**
- Complete article validation
- Frontmatter, links, structure, SEO
- One-stop pre-publish check

---

## 📈 Benefits

### Before This System:
- ❌ 42% of articles had broken links
- ❌ No automated affiliate tag verification
- ❌ Manual link checking (prone to errors)
- ❌ Links found broken after publishing

### After This System:
- ✅ Automated verification in ~10 seconds
- ✅ 100% affiliate tag coverage enforced
- ✅ Broken links caught before publishing
- ✅ Comprehensive error reporting
- ✅ Can't publish with issues (exit code 1)

---

## 🎓 Quick Start

**First time using the system:**

```bash
# 1. Install dependencies (already done)
npm install

# 2. Test on an existing article
npm run verify-article src/content/picks/best-wireless-earbuds-under-100-2025.md

# 3. Read the output carefully
# It will show:
# - Amazon affiliate tag status
# - Broken links
# - What to fix

# 4. For your next article:
# - Write content
# - Add real URLs with WebSearch
# - Add affiliate tags to Amazon links
# - Run verify-article
# - Fix issues
# - Publish only when verified
```

---

## ⚠️ Important Notes

### Amazon Link Checking

Some Amazon links may show 404 even though they work in browser:
- **Reason:** Anti-bot protection
- **Solution:** Verify ASIN is correct by testing in browser
- **The ASIN is what matters** - if it works in browser, it's fine

### Paywalled Sources

Sites like Bloomberg, WSJ may timeout or 403:
- **Reason:** Paywall blocks automated checking
- **Solution:** Manually verify link works in browser
- **Better:** Use alternative free sources when possible

### Verification Speed

- Single article: ~10 seconds
- All articles (12): ~30 seconds
- Network-dependent (timeout = 10 seconds per link)

---

## 🎯 Success Metrics

**An article is ready to publish when:**

```bash
$ npm run verify-article src/content/picks/article.md

✅ 5 link(s) with correct tag (trendytecht0a-20)
✅ All links verified
✅ ALL LINKS VERIFIED - READY TO PUBLISH
```

**Exit code 0** = Ready to publish
**Exit code 1** = Fix issues first

---

## 🔄 Maintenance

### Weekly:
```bash
npm run verify-links
```
Check all content for broken links (sites change, articles move)

### Before Every Publish:
```bash
npm run verify-article src/content/[category]/[file].md
```
Verify the specific article you're about to publish

### Monthly:
Review and fix any broken links in older content

---

## 📞 Need Help?

**Check documentation:**
1. [LINK_VERIFICATION_GUIDE.md](LINK_VERIFICATION_GUIDE.md) - Troubleshooting
2. [AFFILIATE_TAG_ENFORCEMENT.md](AFFILIATE_TAG_ENFORCEMENT.md) - Tag issues
3. [REAL_CONTENT_WORKFLOW.md](REAL_CONTENT_WORKFLOW.md) - Workflow steps

**Common issues:**
- Broken links → See LINK_VERIFICATION_GUIDE.md
- Missing affiliate tag → See AFFILIATE_TAG_ENFORCEMENT.md
- Content workflow → See REAL_CONTENT_WORKFLOW.md

---

## ✨ Summary

**You now have:**

✅ Automated link verification
✅ Affiliate tag enforcement (`trendytecht0a-20`)
✅ Article body scanning
✅ Broken link detection
✅ Pre-publish validation
✅ Comprehensive error reporting
✅ Can't publish with issues

**Zero tolerance for:**
- Broken links
- Missing affiliate tags
- Made-up URLs/ASINs

**Every article is now verified before publishing.**

---

Last Updated: November 23, 2025
