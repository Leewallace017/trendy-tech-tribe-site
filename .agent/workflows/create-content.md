---
description: Streamlined workflow for creating new articles with visual verification
---

# Create Content Workflow

Use this workflow for creating all new articles.

## Phase 1: Preparation

### 1. Determine Category & Template
- **Tech & Innovation** -> `src/content/tech/`
- **AI & Automation** -> `src/content/ai/`
- **EVs & Mobility** -> `src/content/evs/`
- **Energy & Policy** -> `src/content/energy/`
- **Markets & Money** -> `src/content/markets/`
- **Picks & Reviews** -> `src/content/picks/`

**Templates**:
- `docs/templates/quick-take-template.md` (News)
- `docs/templates/product-review-template.md` (Reviews)
- `docs/templates/best-list-template.md` (Best of lists)
- `docs/templates/deep-dive-template.md` (Analysis)

### 2. Research & Product Selection (For "Best List" / Reviews)
2.  **Agent**: Research topics/products using the local Perplexity tool: `npm run perplexity -- research "topic"`. This tool provides more specific, sourced details (e.g., specific battery chemistry tips, niche competitor names) compared to generic web search.
3.  **User**: Selects products and provides specific links (Affiliate/Amazon).
4.  **Agent**: **VISUALLY VERIFY** every link provided by the user.
    -   Use `open_browser_url` to open the link.
    -   Confirm the product page loads and matches the product name.
    -   Take a screenshot if necessary to confirm price/availability.

## Phase 2: Creation

### 3. Draft Content
- Create file in the correct directory.
- **Frontmatter**: Ensure `category`, `title`, `date`, and `image` are correct.
- **Images**:
    -   Use `generate_image` tool with **16:9 aspect ratio** (1792x1008 or 1600x900).
    -   **FALLBACK**: If `generate_image` fails (e.g., 429 Rate Limit), use the local script: `npm run generate-image "prompt" -- --model dall-e-3 --size 1792x1024 --output filename`.
    -   Save to `public/images/articles/`. Do not use placeholders.
    -   **Standard**: All hero images should be 16:9 aspect ratio for consistent display.
- **Links**: Insert the verified links from Phase 1.

### 4. Visual Verification (Self-Correction)
-   **Render Check**:
    -   Start dev server: `npm run dev`
    -   Open article in browser: `http://localhost:4321/[category]/[slug]`
    -   Verify layout, images, and formatting.
-   **Link Check**:
    -   **CRITICAL**: Visually verify every link in the article.
    -   Open the local preview (`npm run dev`).
    -   Click on EVERY link and citation to ensure it opens the correct page.
    -   Verify Amazon links specifically (ensure they don't lead to a 404 or "dog page").

### 5. Review and Refine
-   Read through the article to ensure flow and clarity.
-   Check for any formatting issues.

## Phase 3: Finalize
-   **Lint/Format**: Ensure no validation errors.
-   **Commit**: Ready for review.
