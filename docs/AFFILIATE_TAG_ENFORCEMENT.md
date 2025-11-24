# Affiliate Tag Enforcement System

## Overview

Your affiliate tag `trendytecht0a-20` is now **automatically verified** on every Amazon link in your content - both in frontmatter AND article body.

---

## What's Enforced

### ✅ Your Affiliate Tag
```
?tag=trendytecht0a-20
```

This MUST be on EVERY Amazon link, including:
- Frontmatter `affiliateProducts` URLs
- Inline Amazon links in article body (markdown links)
- Bare Amazon URLs in content

### Where Links Are Checked

1. **Frontmatter:**
```yaml
affiliateProducts:
  - name: "Anker PowerCore"
    url: "https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20"  ✅
```

2. **Article Body:**
```markdown
Check price on [Amazon](https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20)  ✅
```

3. **Bare URLs:**
```markdown
https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20  ✅
```

---

## How Verification Works

### Automated Checks

When you run `npm run verify-article [file]`, the script:

1. **🏷️  Checks Amazon Affiliate Tags**
   - Extracts ALL Amazon links from frontmatter
   - Extracts ALL Amazon links from article body
   - Validates each has `?tag=trendytecht0a-20`
   - Reports any missing tags

2. **🔗 Verifies Links Work**
   - Checks each URL returns 200 OK
   - Flags 404s and broken links
   - Detects timeouts and errors

3. **📊 Summary Report**
   - Shows total Amazon links found
   - Count with correct affiliate tag
   - Count missing affiliate tag
   - List of all issues to fix

---

## Example Output

```bash
$ npm run verify-article src/content/picks/article.md

🔍 Verifying links in article...

🏷️  Checking Amazon affiliate tags...

Found 5 Amazon link(s):

✅ 5 link(s) with correct tag (trendytecht0a-20)

------------------------------------------------------------

📊 SUMMARY:

Total links: 7
Valid: 2 ✅
Broken: 5 ❌

Amazon links: 5 total
  With affiliate tag: 5 ✅      ← All have your tag!
  Missing affiliate tag: 0 ❌
```

---

## Common Issues & Fixes

### ❌ Missing Affiliate Tag

**Problem:**
```yaml
affiliateProducts:
  - name: "Anker PowerCore"
    url: "https://amazon.com/dp/B00X5RV14Y"  # Missing tag!
```

**Error:**
```
❌ 1 link(s) MISSING affiliate tag:
   https://amazon.com/dp/B00X5RV14Y

⚠️  All Amazon links MUST include ?tag=trendytecht0a-20
```

**Fix:**
```yaml
affiliateProducts:
  - name: "Anker PowerCore"
    url: "https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20"  ✅
```

### ❌ Wrong Tag

**Problem:**
```markdown
[Buy on Amazon](https://amazon.com/dp/B00X5RV14Y?tag=wrong-tag-20)
```

**Error:**
```
❌ AMAZON LINKS MISSING AFFILIATE TAG:
  ❌ https://amazon.com/dp/B00X5RV14Y?tag=wrong-tag-20
     → Add ?tag=trendytecht0a-20
```

**Fix:**
```markdown
[Buy on Amazon](https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20)  ✅
```

### ❌ Inline Links in Body

The verification now scans **the entire article body** for Amazon links:

**Problem:**
```markdown
## Best Pick

The Anker PowerCore is available on
[Amazon](https://amazon.com/dp/B00X5RV14Y).  ← Missing tag!
```

**Will be flagged as:**
```
❌ 1 link(s) MISSING affiliate tag:
   https://amazon.com/dp/B00X5RV14Y
```

**Fix:**
```markdown
The Anker PowerCore is available on
[Amazon](https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20).  ✅
```

---

## Verification Commands

### Single Article (Use Before Publishing)
```bash
npm run verify-article src/content/picks/article.md
```
- Checks affiliate tags in frontmatter + body
- Verifies all links work
- Shows detailed errors

### All Articles
```bash
npm run verify-links
```
- Scans all content files
- Checks all links
- Comprehensive report

### Pre-Publish Complete Check
```bash
npm run pre-publish src/content/picks/article.md
```
- Frontmatter validation
- Affiliate tag enforcement
- Link verification
- Content structure checks
- SEO validation

---

## Enforcement Rules

### 🚫 WILL NOT PASS VALIDATION

```yaml
# Missing tag entirely
url: "https://amazon.com/dp/B00X5RV14Y"

# Wrong tag
url: "https://amazon.com/dp/B00X5RV14Y?tag=other-tag-20"

# No tag parameter
url: "https://amazon.com/Anker-PowerCore/dp/B00X5RV14Y"
```

### ✅ WILL PASS VALIDATION

```yaml
# Correct tag
url: "https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20"

# With additional parameters (tag must be present)
url: "https://amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20&ref=nav"

# Different Amazon domains (all checked)
url: "https://www.amazon.com/dp/B00X5RV14Y?tag=trendytecht0a-20"
url: "https://amazon.co.uk/dp/B00X5RV14Y?tag=trendytecht0a-20"
```

---

## Technical Details

### Functions Added

**In `src/utils/linkVerification.ts`:**

```typescript
// Extracts all Amazon links from article markdown
extractAmazonLinksFromContent(content: string): string[]

// Validates affiliate tag is correct
validateAmazonAffiliateTags(
  urls: string[],
  affiliateTag: string = 'trendytecht0a-20'
): { valid: string[]; missing: string[] }
```

### What Gets Scanned

1. **Frontmatter:**
   - `affiliateProducts[].url`
   - `sources[].url` (if Amazon)

2. **Article Body:**
   - Markdown links: `[text](https://amazon.com/...)`
   - Bare URLs: `https://amazon.com/...`
   - Any string matching `amazon.com`

3. **Validation:**
   - Parses URL query parameters
   - Checks `tag` parameter equals `trendytecht0a-20`
   - Reports any missing or incorrect tags

---

## Updated Workflow

### Every Article MUST:

1. **Write article** with Amazon links
2. **Add affiliate tag** to all Amazon URLs
3. **Run verification:**
   ```bash
   npm run verify-article src/content/picks/article.md
   ```
4. **Fix any errors:**
   - Add missing `?tag=trendytecht0a-20`
   - Fix broken ASINs
   - Replace wrong URLs
5. **Re-run verification** until all pass:
   ```
   ✅ ALL LINKS VERIFIED - READY TO PUBLISH
   ```
6. **Only then publish**

---

## Benefits

✅ **No missed commissions** - Every Amazon link has your tag
✅ **Automated enforcement** - Can't publish without tag
✅ **Body scanning** - Catches inline links too
✅ **Clear errors** - Shows exactly which links need fixing
✅ **Fast check** - Runs in seconds before every publish

---

## Integration

The affiliate tag check is integrated into:

- ✅ `npm run verify-article` - Single article verification
- ✅ `npm run verify-links` - All articles verification
- ✅ `npm run pre-publish` - Complete pre-publish validation

**No article can pass validation without the correct affiliate tag on all Amazon links.**

---

## Success Criteria

An article is ready to publish when:

```bash
$ npm run verify-article src/content/picks/article.md

✅ 5 link(s) with correct tag (trendytecht0a-20)
✅ All 7 links verified
✅ Amazon links: 5 total
    With affiliate tag: 5 ✅
    Missing affiliate tag: 0 ❌

✅ ALL LINKS VERIFIED - READY TO PUBLISH
```

---

**Your affiliate tag `trendytecht0a-20` is now enforced on every Amazon link, everywhere.**
