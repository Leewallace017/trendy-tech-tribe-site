# Deprecated Scripts

**Last Updated:** November 24, 2025

These scripts are deprecated in favor of the Perplexity Research Tool (`perplexity-research.ts`).

---

## Deprecated Scripts (Use Perplexity Instead)

### ❌ search-sources.ts
**Replaced by:** `npm run perplexity -- sources "topic"`

**Why deprecated:**
- ScrapingBee only returns Google search results
- Perplexity provides better sources with citations
- Perplexity includes analysis and context
- Perplexity is more reliable and current

**Migration:**
```bash
# OLD WAY (deprecated)
tsx scripts/search-sources.ts

# NEW WAY (recommended)
npm run perplexity -- sources "Apple Google Gemini Siri partnership"
```

---

### ❌ find-amazon-asins.ts
**Replaced by:** `npm run perplexity -- products "product name"`

**Why deprecated:**
- Perplexity provides more accurate ASINs
- Includes product specs and features
- Provides price context
- Better at finding current models

**Migration:**
```bash
# OLD WAY (deprecated)
tsx scripts/find-amazon-asins.ts

# NEW WAY (recommended)
npm run perplexity -- products "Anker Soundcore Space A40"
```

---

### ❌ search-1more.ts, search-logitech.ts
**Replaced by:** `npm run perplexity -- products "product name"`

**Why deprecated:**
- Product-specific scripts not maintainable
- Perplexity handles all products
- Single tool for all research needs

**Migration:**
```bash
# OLD WAY (deprecated)
tsx scripts/search-1more.ts

# NEW WAY (recommended)
npm run perplexity -- products "1MORE Evo earbuds"
```

---

### ⚠️ test-asins.ts, debug-amazon.ts
**Status:** Keep for manual debugging only

**When to use:**
- Debugging specific ASIN issues
- Testing ScrapingBee API directly
- Troubleshooting Amazon API problems

**Not for:** Regular content creation workflow

---

## Active Scripts (Still in Use)

### ✅ perplexity-research.ts
**The primary research tool.** Use for:
- Research: `npm run perplexity -- research "topic"`
- Sources: `npm run perplexity -- sources "topic"`
- Products: `npm run perplexity -- products "product"`
- Compare: `npm run perplexity -- compare "p1" "p2" "p3"`

### ✅ verify-asins.js
Extracts and lists all ASINs from articles for manual verification.
```bash
npm run verify-asins
```

### ✅ verify-article-links.ts
Verifies all links in a specific article work correctly.
```bash
npm run verify-article src/content/category/article.md
```

### ✅ verify-all-links.ts
Verifies all links across all articles.
```bash
npm run verify-links
```

### ✅ pre-publish-check.ts
Runs all verification checks before publishing.
```bash
npm run pre-publish
```

### ✅ audit-source-links.ts
Audits all source links for broken URLs.
```bash
npm run audit-sources
```

### ✅ generate-image.js
Generates AI images for articles using DALL-E.
```bash
npm run generate-image
```

---

## Cleanup Recommendations

**Can be deleted (fully replaced by Perplexity):**
- search-sources.ts
- find-amazon-asins.ts
- search-1more.ts
- search-logitech.ts

**Keep for debugging only:**
- test-asins.ts
- debug-amazon.ts

**Active and maintained:**
- perplexity-research.ts ⭐ PRIMARY TOOL
- verify-*.ts (all verification scripts)
- generate-image.js

---

## Migration Guide

### For Research Tasks

**Old workflow:**
```bash
# Multiple different scripts
tsx scripts/search-sources.ts
tsx scripts/find-amazon-asins.ts
tsx scripts/search-1more.ts
# Edit hard-coded search terms in each script
# Run separately and manually combine results
```

**New workflow (Perplexity):**
```bash
# Single unified tool
npm run perplexity -- research "topic"
npm run perplexity -- sources "topic"
npm run perplexity -- products "product"
npm run perplexity -- compare "p1" "p2" "p3"
# All results with citations, no editing needed
```

### For Content Creation

**Before (ScrapingBee only):**
1. Edit search-sources.ts with your queries
2. Run `tsx scripts/search-sources.ts`
3. Manually pick best sources from results
4. Edit find-amazon-asins.ts with product names
5. Run `tsx scripts/find-amazon-asins.ts`
6. Manually verify each ASIN
7. Write article
8. Verify links

**Now (Perplexity first):**
1. `npm run perplexity -- research "topic"` - Get context
2. `npm run perplexity -- sources "topic"` - Get sources
3. `npm run perplexity -- products "product"` - Get ASINs
4. Write article with research results
5. `npm run verify-asins` - Verify ASINs
6. `npm run verify-article` - Verify links

**Time savings:** 50-70% faster with Perplexity

---

## Why Perplexity is Better

### vs. ScrapingBee Search
| Feature | ScrapingBee | Perplexity |
|---------|-------------|------------|
| Source quality | Raw search results | Curated, credible sources |
| Context | None | Full analysis |
| Citations | No | Yes, automatic |
| Current info | Depends on search | Real-time (Nov 2025) |
| Cost | Per search | Per query, similar |
| Ease of use | Edit scripts | Command-line args |

### vs. Manual Research
| Task | Manual Time | Perplexity Time |
|------|-------------|-----------------|
| Find sources | 15-20 min | 1-2 min |
| Product research | 20-30 min | 2-3 min |
| ASIN lookup | 10-15 min | 1 min |
| Product comparison | 30-45 min | 2-3 min |

---

## Questions?

See: [../PERPLEXITY-GUIDE.md](../PERPLEXITY-GUIDE.md) for complete Perplexity documentation.
