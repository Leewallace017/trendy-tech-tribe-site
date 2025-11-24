# Trendy Tech Tribe - Project Context

**Last Updated**: 2025-11-22 16:45 PST
**Version**: 2.0.0

---

## 1. Project Overview

### Purpose
Trendy Tech Tribe is a modern tech publication website covering technology news, insights, and reviews. The site focuses on delivering high-quality content across six core content pillars with SEO optimization and a clean, modern design.

### Technologies
- **Framework**: Astro 5.0 (Static Site Generator)
- **Language**: TypeScript (strict mode)
- **Content**: MDX with Content Collections
- **Schema Validation**: Zod
- **Additional Integrations**: @astrojs/mdx, @astrojs/sitemap
- **Testing**: Puppeteer (visual regression/screenshots)
- **Deployment**: Vercel
- **Version Control**: Git

### Domain
- Production: trendytechtribe.com
- Local Dev Server: http://localhost:4322

### Content Pillars (6 Categories)
1. **Tech & Innovation** (`/tech`) - Emerging tech, devices, platforms
2. **AI & Automation** (`/ai`) - AI models, tools, platforms, regulation
3. **EVs & Mobility** (`/evs`) - Electric vehicles, charging, industry news
4. **Energy & Policy** (`/energy`) - Clean energy, grid tech, policy
5. **Markets & Money** (`/markets`) - Tech stocks, earnings, market analysis
6. **Picks & Reviews** (`/picks`) - Product reviews, recommendations, best lists

---

## 2. File Structure

```
/
├── src/
│   ├── content/
│   │   ├── config.ts              # Content Collections schema (Zod validation)
│   │   ├── tech/                  # Tech & Innovation articles (*.md)
│   │   ├── ai/                    # AI & Automation articles (*.md)
│   │   ├── evs/                   # EVs & Mobility articles (*.md)
│   │   ├── energy/                # Energy & Policy articles (*.md)
│   │   ├── markets/               # Markets & Money articles (*.md)
│   │   └── picks/                 # Picks & Reviews articles (*.md)
│   ├── layouts/
│   │   ├── BaseLayout.astro       # Base HTML structure, meta tags, SEO
│   │   └── ArticleLayout.astro    # Article template with hero image, JSON-LD
│   ├── components/
│   │   ├── Header.astro           # Site header with navigation
│   │   └── Footer.astro           # Site footer with categories, links
│   ├── pages/
│   │   ├── index.astro            # Homepage (featured post + category grids)
│   │   ├── [category]/
│   │   │   ├── index.astro        # Category landing page
│   │   │   └── [slug].astro       # Individual article page
│   │   └── tags/
│   │       └── [tag].astro        # Tag archive pages
│   └── styles/
│       └── global.css             # Global styles, CSS custom properties, design system
├── public/
│   ├── images/
│   │   └── logos/
│   │       ├── logo.svg           # Site logo (neon green #07fa2f + magenta #ee1ef6)
│   │       ├── logo-new.png       # Alternative logo format
│   │       └── logo-icon.png      # Logo icon variant
│   └── ads.txt                    # AdSense verification
├── docs/
│   ├── templates/                 # Content templates for articles
│   ├── CONTENT_CALENDAR_WEEK1.md  # Content planning
│   ├── LOGO-DESIGN-PLAN.md        # Logo design documentation
│   └── *.md                       # Other documentation files
├── scripts/
│   ├── Snapshot.mjs               # Puppeteer script for visual testing
│   └── SnapshotDarkMode.mjs       # Dark mode screenshot script
├── screenshots/                   # Puppeteer screenshot output directory
├── package.json                   # Dependencies and scripts
├── astro.config.mjs               # Astro configuration
├── tsconfig.json                  # TypeScript configuration
└── claude.context.md              # This file (project memory)
```

---

## 3. Content Schema

### Article Frontmatter (All Collections)
```yaml
---
title: string                      # Article headline
date: string                       # ISO date format (YYYY-MM-DD)
category: enum                     # One of 6 categories (display name)
tags: array<string>                # Relevant tags for article
type: enum                         # quick-take | deep-dive | product-review | best-list | opinion
summary: string                    # One-sentence summary (for cards/meta)
seoTitle: string                   # Custom SEO title (fallback: title)
seoDescription: string             # Meta description (required)
image: string                      # Hero image URL (Unsplash or hosted)
imageAlt: string?                  # Optional alt text (fallback: title)
featured: boolean                  # Default: false (featured posts show in hero)
affiliateProducts: array?          # Optional affiliate product links
  - name: string
    url: string
    price: string?
---
```

**CRITICAL**: Do NOT include a `slug` field in frontmatter. Astro auto-generates slugs from filenames.

### URL Structure
- Articles: `/{category}/{slug}`
- Category pages: `/{category}`
- Tag pages: `/tags/{tag-slug}`
- Homepage: `/`

---

## 4. Design System

### Color Palette
**Light Theme**:
- Primary: `#ee1ef6` (magenta - from logo)
- Secondary: `#07fa2f` (neon green - from logo)
- Accent: `#00d4ff` (cyan)
- Text: `#1f2937` (dark gray)
- Text Light: `#6b7280` (medium gray)
- Background: `#ffffff` (white)
- Background Alt: `#f9fafb` (light gray)
- Border: `#e5e7eb` (subtle gray)

**Dark Theme** (`[data-theme="dark"]`):
- Primary: `#ff6bff` (lighter magenta)
- Secondary: `#5cff80` (lighter green)
- Accent: `#00e4ff` (lighter cyan)
- Text: `#f9fafb` (off-white)
- Text Light: `#d1d5db` (light gray)
- Background: `#111827` (dark slate)
- Background Alt: `#1f2937` (medium slate)
- Border: `#374151` (dark gray)

### Spacing Scale
- `--space-xs`: 0.5rem
- `--space-sm`: 1rem
- `--space-md`: 1.5rem
- `--space-lg`: 2rem
- `--space-xl`: 3rem
- `--space-2xl`: 4rem

### Typography
- Sans: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`
- Serif: `Georgia, Cambria, 'Times New Roman', Times, serif`

### Layout Constraints
- Max Width: `1200px` (container)
- Max Width Article: `750px` (readable content)
- Image Aspect Ratio: `16:9` (post thumbnails)

---

## 5. Coding Standards

### Astro Components
- Use TypeScript for type safety
- Define Props interface at top of component
- Destructure props in frontmatter
- Scoped styles in `<style>` blocks
- Use semantic HTML5 elements

### Content Collections
- Schema defined in `src/content/config.ts`
- Use Zod for validation
- All collections share same schema (articleSchema)
- Slugs are auto-generated by Astro (no manual slug field)

### SEO Best Practices
- Every page has unique `<title>` and meta description
- Open Graph tags for social sharing
- JSON-LD structured data for articles
- Canonical URLs
- Alt text for all images
- Sitemap auto-generated

### File Naming Conventions
- Astro components: `PascalCase.astro` (e.g., `ArticleLayout.astro`)
- Content files: `kebab-case.md` (e.g., `ai-agents-guide-2025.md`)
- CSS files: `lowercase.css` (e.g., `global.css`)
- Utility scripts: `camelCase.mjs` (e.g., `scripts/Snapshot.mjs`)

### CSS Conventions
- Use CSS custom properties (defined in `global.css`)
- Mobile-first responsive design
- Transitions for hover states (0.2s default)
- Dark mode support via `[data-theme="dark"]` selectors

---

## 6. Automation Rules

### When to Take Action Independently
1. **File edits**: Read file first, then make surgical edits (no asking)
2. **Running scripts**: Execute `npm run dev`, `node scripts/Snapshot.mjs`, git commands
3. **Creating content**: Sample articles, markdown files (when instructed)
4. **Bug fixes**: Fix obvious errors (validation errors, typos, broken imports)
5. **Style tweaks**: CSS adjustments matching established design system

### When to Ask for Confirmation
1. **Major architecture changes**: Changing routing, schema, or file structure
2. **Deleting files**: Removing existing content or components
3. **Breaking changes**: Modifications that could break existing functionality
4. **New dependencies**: Adding npm packages
5. **Ambiguous requests**: Multiple valid interpretations of task

### Proactive Behaviors
- Use TodoWrite tool for multi-step tasks (3+ steps)
- Run Puppeteer screenshots after visual changes
- Verify dev server is running before testing
- Check for validation errors after schema changes
- Suggest SEO improvements when creating content

---

## 7. Output Guidelines

### Communication Style
- **Concise**: Short, direct responses (CLI-appropriate)
- **No emojis**: Unless explicitly requested by user
- **Technical accuracy**: Prioritize correctness over validation
- **Markdown formatting**: Use headers, code blocks, lists
- **File references**: Use markdown links: `[filename.ts:42](src/filename.ts#L42)`

### Code Output
- Always show relevant line numbers when referencing code
- Use syntax highlighting in code blocks
- Explain "why" for non-obvious changes
- Document breaking changes clearly
- Use semantic git commit messages

### Error Handling
- Read full error messages before attempting fixes
- Explain root cause, not just symptoms
- Test fixes before marking tasks complete
- Clear Astro cache when needed (restart dev server)

---

## 8. Visual Testing Workflow

### Puppeteer Screenshot Protocol
1. **When to capture screenshots**:
   - After theme/color changes
   - After layout modifications
   - After adding new components
   - When user requests visual verification
   - Before major deployments

2. **How to run**:
   ```bash
   node scripts/Snapshot.mjs
   ```

3. **What gets captured**:
   - Homepage (full page)
   - Sample article page (full page)
   - Sample category page (full page)

4. **Output location**:
   - Directory: `/screenshots/`
   - Naming: `{page-type}-{timestamp}.png`
   - Auto-created if doesn't exist

5. **After capturing**:
   - Use Read tool to view screenshots
   - Analyze visual output
   - Iterate on design as needed

### Dev Server
- **Start**: `npm run dev` (runs in background)
- **Port**: 4322
- **URL**: http://localhost:4322
- **Hot reload**: Enabled for most changes
- **Cache**: Restart server if content collection changes not reflected

---

## 9. Git Workflow

### Commit Message Format
- Use semantic commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- Be descriptive but concise
- Include Claude Code signature:
  ```
  {Commit message}

  🤖 Generated with [Claude Code](https://claude.com/claude-code)

  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

### Git Safety Rules
- NEVER update git config
- NEVER run destructive commands without explicit user request
- NEVER skip hooks (--no-verify, --no-gpg-sign)
- NEVER force push to main/master
- Check authorship before amending commits
- Only commit when user explicitly requests

---

## 10. Known Issues & Solutions

### Issue: Slug Validation Errors
**Problem**: `slug: Required` error when loading content collections
**Cause**: Schema had `slug` field, but Astro auto-generates slugs
**Solution**: Remove `slug` from schema and all frontmatter files

### Issue: Astro Cache Stale
**Problem**: Content changes not reflected in browser
**Cause**: Astro caches content collections
**Solution**: Restart dev server (`npm run dev`)

### Issue: Path with Spaces
**Problem**: Working directory contains spaces
**Cause**: macOS iCloud folder path
**Solution**: Always quote paths in bash commands

---

## 11. Assumptions & Decisions

### Content Strategy
- **Featured posts**: First post with `featured: true` appears in hero section
- **Homepage**: Shows latest 3 posts per category
- **Newsletter CTA**: Positioned between category sections (after EVs)
- **Affiliate support**: Schema supports optional product links (not yet implemented in UI)
- **Tag navigation**: Supported in schema (tag pages to be built)

### Article Types & Usage
- `quick-take`: News, updates, short analysis (300-600 words)
- `deep-dive`: Comprehensive analysis, tutorials (1500+ words)
- `product-review`: Detailed product evaluation (800-1200 words)
- `best-list`: Curated recommendations, comparisons (1000-1500 words)
- `opinion`: Editorial, commentary (600-1000 words)

### Image Strategy
- **Homepage thumbnails**: 16:9 aspect ratio, object-fit: cover
- **Article hero images**: Full-width, max 1200px, rounded corners
- **Hover effects**: Subtle zoom (1.05x) on post card images
- **Placeholder source**: Unsplash (to be replaced with hosted images)
- **Alt text**: Falls back to article title if not provided

### SEO Decisions
- `seoTitle` optional (falls back to `title`)
- `seoDescription` required (used in meta tags and social cards)
- Canonical URLs point to production domain
- Open Graph images use article `image` field
- JSON-LD Article schema on all article pages

---

## 12. Future Enhancement Backlog

### Planned Features (Not Yet Implemented)
- [ ] Tag archive pages (`/tags/[tag]`)
- [ ] Newsletter signup form (ConvertKit integration)
- [ ] Affiliate product UI (currently schema-only)
- [ ] Dark mode toggle (styles ready, need UI control)
- [ ] Search functionality
- [ ] Related posts section
- [ ] Author profiles (currently Organization in schema)
- [ ] Comments system
- [ ] RSS feeds
- [ ] Analytics integration

### Content Needs
- [ ] About page (`/about`)
- [ ] Newsletter page (`/newsletter`)
- [ ] Contact page (`/contact`)
- [ ] Privacy policy (`/privacy`)
- [ ] Replace Unsplash placeholders with hosted images
- [ ] Create more sample content (currently 1 per category)

---

## 13. Instructions for Future Sessions

### At Start of Every New Chat
1. **Load this file**: Read `claude.context.md` completely
2. **Check for updates**: Review changelog at bottom of file
3. **Verify environment**: Confirm working directory, git status
4. **Check dev server**: Look for running background processes

### When Making Changes
1. **Read before edit**: Always read files before modifying
2. **Follow standards**: Adhere to coding standards in this document
3. **Update context**: If you make architectural changes, update this file
4. **Log updates**: Add entry to changelog (Section 14)

### When User Requests Updates to This File
1. Make requested changes
2. Add changelog entry with date and summary
3. Increment version number (semantic versioning)
4. Update "Last Updated" date at top

---

## 14. Changelog

### Version 1.0.0 (2025-11-22)
- **Initial context file created**
- Documented complete project structure
- Established coding standards and automation rules
- Recorded design system (theme colors matching logo)
- Set up visual testing workflow with Puppeteer
- Documented known issues and solutions
- Created future enhancement backlog

---

## 15. Quick Reference

### Common Commands
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run visual tests
node scripts/Snapshot.mjs

# Git commit
git add . && git commit -m "message"
```

### Key File Paths
- Content schema: `src/content/config.ts`
- Global styles: `src/styles/global.css`
- Homepage: `src/pages/index.astro`
- Article layout: `src/layouts/ArticleLayout.astro`
- Article template: `src/pages/{category}/[slug].astro`

### Color Codes (Quick Copy)
- Primary (magenta): `#ee1ef6`
- Secondary (green): `#07fa2f`
- Accent (cyan): `#00d4ff`

---

**END OF CONTEXT FILE**

*This file serves as the persistent memory for Claude when working on the Trendy Tech Tribe project. Always reference this document at the start of new sessions and update it when making significant project changes.*
