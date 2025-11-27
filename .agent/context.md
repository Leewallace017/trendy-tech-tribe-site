# Agent Context - READ THIS FIRST

> **CRITICAL**: This file MUST be read at the start of EVERY new conversation before taking any actions.

## Required Reading (In Order)

When starting ANY new conversation, read these files in this order:

1. **This file** (`/.agent/context.md`) - Quick reference and critical rules
2. **Project Context** (`/docs/CONTEXT.md`) - Full project overview, tech stack, file structure
3. **Content Workflow** (`/.agent/workflows/create-content.md`) - Content creation process
4. **Relevant Template** (`/docs/templates/*.md`) - Based on content type:
   - `best-list-template.md` - For product roundups
   - `deep-dive-template.md` - For in-depth analysis
   - `opinion-template.md` - For opinion pieces
   - `product-review-template.md` - For single product reviews
   - `quick-take-template.md` - For news/quick takes

**Optional**: `/docs/NEWSLETTER_GUIDE.md` - Only if working on newsletters

## Quick Reference

- **Image Generation**: `npm run generate-image "prompt"` - Uses OpenAI gpt-image-1
- **Affiliate Tag**: `trendytecht0a-20` - Required on ALL Amazon links
- **Amazon URL Format**: `https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20` (with "www.")
- **Dev Server**: `npm run dev` (runs on localhost:4321)

## Critical Rules

### 1. Image Generation
- **ALWAYS use**: `npm run generate-image "description"`
- **NEVER use**: Third-party APIs like Pollinations.ai or other random services
- **Provider**: OpenAI gpt-image-1 (configured in `.env`)
- **Fallback**: OpenAI DALL-E 3 (via the npm script)

### 2. Amazon Affiliate Links
- **Format**: `https://www.amazon.com/dp/[ASIN]?tag=trendytecht0a-20`
- **NEVER**: Include specific prices in articles (violates Amazon TOS)
- **USE**: Price ranges only (e.g., "Under $100", "$100-200 range")
- **VERIFY**: All ASINs must be real and tested in browser

### 3. Content Creation
- **ALWAYS**: Follow `/.agent/workflows/create-content.md`
- **ALWAYS**: Use templates from `/docs/templates/`
- **ALWAYS**: Verify links visually in browser before publishing

### 4. Documentation Priority
When starting a new conversation:
1. Read this file first (`/.agent/context.md`)
2. Read `/docs/CONTEXT.md` for project overview
3. Read relevant workflow from `/.agent/workflows/`
4. Read relevant template from `/docs/templates/`

## Common Mistakes to Avoid

❌ Using random image generation APIs  
❌ Including specific prices in articles  
❌ Skipping link verification  
❌ Not following templates  
❌ Forgetting affiliate tags  

✅ Use `npm run generate-image`  
✅ Use price ranges only  
✅ Verify all links in browser  
✅ Follow templates exactly  
✅ Always include `?tag=trendytecht0a-20`  

## File Structure

```
/
├── .agent/
│   ├── context.md          # THIS FILE - Read first!
│   └── workflows/          # Content creation workflows
├── docs/
│   ├── CONTEXT.md          # Full project documentation
│   └── templates/          # Article templates
├── src/content/            # All articles (by category)
└── public/images/articles/ # All generated images
```

---

**Last Updated**: 2025-11-26  
**Version**: 1.0
