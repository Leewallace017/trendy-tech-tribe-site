# Trendy Tech Tribe - Project Context

**Last Updated**: 2025-11-25
**Version**: 4.0.0 (Optimized for Astro 5.0)

---

## 1. Project Overview

### Purpose
Trendy Tech Tribe is a modern tech publication website covering technology news, insights, and reviews.
**Domain**: trendytechtribe.com (Local: http://localhost:4322)

### Technologies
- **Framework**: Astro 5.0 (with Content Layer API)
- **Language**: TypeScript (strict mode)
- **Content**: MDX with Content Collections (glob loaders)
- **Styling**: Vanilla CSS (Variables in `global.css`)
- **Testing**: Puppeteer (Visual), Link Verification Scripts
- **Deployment**: Vercel
- **Build Optimizations**: HTML compression, CSS inlining, Lightning CSS minification

### Content Pillars
1. **Tech & Innovation** (`/tech`)
2. **AI & Automation** (`/ai`)
3. **EVs & Mobility** (`/evs`)
4. **Energy & Policy** (`/energy`)
5. **Markets & Money** (`/markets`)
6. **Picks & Reviews** (`/picks`)

---

## 2. Critical Workflows

### Content Creation
**Workflow**: `.agent/workflows/create-content.md`
**Key Rules**:
-   **Visual Verification**: ALL links must be visually verified in a browser.
-   **Images**: Use `npm run generate-image` for hero images.
-   **Affiliate Links**: Must use tag `trendytecht0a-20`.

### Image Generation
**Command**: `npm run generate-image "description"`
**Providers**: OpenAI gpt-image-1 (Quality).
**Setup**: keys in `.env`.

### Link Verification
**Command**: `npm run verify-article src/content/[category]/[file].md`
**Rule**: No article is published with broken links or guessed ASINs.

---

## 3. Design System

### Colors
- **Primary**: `#ee1ef6` (Magenta)
- **Secondary**: `#07fa2f` (Neon Green)
- **Accent**: `#00d4ff` (Cyan)
- **Background**: `#ffffff` (Light) / `#111827` (Dark)

### Layout
- **Max Width**: 1200px
- **Article Width**: 750px
- **Font**: System Sans-Serif

---

## 4. File Structure

```
/
├── src/
│   ├── content/           # MDX Articles (organized by category)
│   ├── content.config.ts  # Content Layer API configuration (Astro v5)
│   ├── components/        # Astro Components
│   ├── layouts/           # Page Layouts
│   ├── pages/             # Routes
│   ├── styles/            # global.css
│   └── assets/            # Optimized assets
│       └── images/        # Article hero images
├── public/
│   └── images/            # Static assets (logos, etc.)
├── .agent/
│   └── workflows/         # Active workflows (create-content.md)
├── docs/
│   ├── CONTEXT.md         # This file
│   └── templates/         # Article templates
└── scripts/               # Automation scripts (images, snapshots, verification)
```

> **Note**: Content collections now use the Astro v5 Content Layer API with glob loaders for improved build performance (5x faster for Markdown, 25-50% less memory usage).

---

## 5. Content Schema

### Frontmatter
```yaml
---
title: string
date: YYYY-MM-DD
category: [Tech & Innovation, AI & Automation, etc.]
tags: [tag1, tag2]
type: [quick-take, deep-dive, product-review, best-list, opinion]
summary: string
seoTitle: string
seoDescription: string
image: ../../assets/images/articles/filename.png
imageAlt: string
featured: boolean
affiliateProducts:
  - name: string
    url: string
    price: string
---
```

---

## 6. Automation & Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start local server |
| `npm run build` | Build for production |
| `npm run generate-image "prompt"` | Generate AI image |
| `npm run verify-article [path]` | Check links in article |
| `node scripts/Snapshot.mjs` | Run visual regression tests |

---

## 7. Amazon Affiliate Rules
- **Tracking ID**: `trendytecht0a-20`
- **Format**: `https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20`
- **ASINs**: Must be real, verified ASINs. Never guess.

---

**End of Context**
