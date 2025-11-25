---
description: Strict workflow for creating new articles to ensure correct placement and formatting
---

# Create New Article Workflow

Use this workflow whenever you are creating a new article. Follow these steps STRICTLY to avoid errors.

## Phase 1: Preparation

### Step 1: Determine Category and Collection
Map the article's category to the correct source directory. **This is critical.**

| Category | Collection Folder |
| :--- | :--- |
| **Tech & Innovation** | `src/content/tech/` |
| **AI & Automation** | `src/content/ai/` |
| **EVs & Mobility** | `src/content/evs/` |
| **Energy & Policy** | `src/content/energy/` |
| **Markets & Money** | `src/content/markets/` |
| **Picks & Reviews** | `src/content/picks/` |

**STOP**: If you are about to write to `src/content/articles/`, **YOU ARE WRONG**. That directory should not exist.

### Step 2: Select the Correct Template
Choose the template that matches the article type:

- **News/Quick Take**: `docs/templates/quick-take-template.md`
- **Product Review**: `docs/templates/product-review-template.md`
- **Best List/Guide**: `docs/templates/best-list-template.md`
- **Deep Dive/Analysis**: `docs/templates/deep-dive-template.md`
- **Opinion**: `docs/templates/opinion-template.md`

**Action**: Read the selected template file using `view_file` before writing any code.

## Phase 2: Creation

### Step 3: Draft the Content
- Create the file in the **correct collection folder** identified in Step 1.
- Ensure the `category` frontmatter matches the Category name exactly.
- Follow the template structure precisely.

### Step 4: Verify Frontmatter
Check that the frontmatter includes:
- `title`
- `date` (Current date)
- `category` (Must match the folder mapping)
- `type` (Must match the template type)
- `image` (Local path to generated image)

## Phase 3: Verification

### Step 5: Verify File Location
// turbo
Run this command to verify the file exists in the correct location:
```bash
ls -l "src/content/[collection]/[filename].md"
```

### Step 6: Verify Rendering
- Navigate to the article URL: `http://localhost:4321/[collection]/[slug]`
- Take a screenshot to confirm it renders correctly.
