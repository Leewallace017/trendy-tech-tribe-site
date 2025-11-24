# AI Image Generation Setup Guide

## Overview

This guide will help you set up AI image generation for your article workflow. You'll be able to generate custom images on-demand instead of relying solely on Unsplash or waiting for press release photos.

## Why Use AI Images?

**Pros:**
- ✅ Custom images exactly matching your article topic
- ✅ No copyright/attribution concerns
- ✅ Consistent quality and style
- ✅ Available 24/7, no searching required
- ✅ Wide format optimized for article headers (1792x1024)

**When to Use:**
- No suitable press release photo available
- Unsplash doesn't have what you need
- Want a specific concept/visualization
- Need consistency across multiple related articles

**When NOT to Use:**
- Need real product photos (use press release images)
- Need real people (use Unsplash)
- Company already provided images

## Quick Start

### 1. Setup (One-time)

```bash
# 1. Copy the example environment file
cp .env.example .env

# 2. Edit .env and add your API key
# Use your text editor to add one of these:
```

Add to `.env`:
```
# For OpenAI (best quality, recommended)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx

# OR for Replicate (cheaper alternative)
REPLICATE_API_TOKEN=r8_xxxxxxxxxxxxx
```

### 2. Get Your API Key

#### Option A: OpenAI DALL-E 3 (Recommended)

**Best for:** Highest quality images

**Cost:** ~$0.04-0.12 per image

**Steps:**
1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-proj-`)
5. Add to `.env` as `OPENAI_API_KEY=sk-proj-xxxxx`
6. Add $5-10 credits to your account

#### Option B: Replicate (Budget-Friendly)

**Best for:** Lower cost, still good quality

**Cost:** ~$0.005 per image (25x cheaper than DALL-E)

**Steps:**
1. Go to https://replicate.com/account/api-tokens
2. Sign in with GitHub
3. Copy your API token (starts with `r8_`)
4. Add to `.env` as `REPLICATE_API_TOKEN=r8_xxxxx`
5. Add $5 credits (will last a long time)

### 3. Generate Your First Image

```bash
npm run generate-image "Tesla Cybertruck driving through city"
```

The script will:
1. Generate the image
2. Download it to `public/images/articles/`
3. Output the exact frontmatter to copy/paste

## Usage Examples

### Basic Usage

```bash
# Simple prompt
npm run generate-image "AI robot coding on laptop"

# With style
npm run generate-image "Solar panels on roof" --style photorealistic

# With provider
npm run generate-image "5G tower" --provider replicate

# Custom filename
npm run generate-image "EV charging station" --output ev-charging-night
```

### Real Article Examples

**EV Article:**
```bash
npm run generate-image "modern electric vehicle charging at urban charging station at sunset"
```

**AI Article:**
```bash
npm run generate-image "futuristic AI data center with glowing servers"
```

**Energy Article:**
```bash
npm run generate-image "large scale solar farm with mountains in background"
```

**Tech Product:**
```bash
npm run generate-image "sleek smartphone on minimalist desk with tech accessories"
```

### Style Options

Add `--style <type>` to customize:

- `photorealistic` (default) - Real photo look
- `digital-art` - Modern illustration style
- `minimalist` - Clean, simple design
- `editorial` - News article style
- `futuristic` - Sci-fi, cutting-edge look

Example:
```bash
npm run generate-image "quantum computer" --style futuristic
```

## Workflow Integration

### Writing New Article

1. **Choose your topic** (e.g., "Tesla Model 2 Production Starts")

2. **Generate image:**
   ```bash
   npm run generate-image "Tesla Model 2 compact electric sedan in production facility"
   ```

3. **Copy the output:**
   ```yaml
   image: "/images/articles/tesla-model-2-compact-electric-sedan-1234567.png"
   imageAlt: "Tesla Model 2 compact electric sedan in production facility"
   imageCredit: "AI Generated Image"
   ```

4. **Paste into your article frontmatter**

5. **Write your article**

6. **Build and preview:**
   ```bash
   npm run dev
   ```

## Tips for Better Images

### Writing Good Prompts

**Good prompts:**
- ✅ "Modern electric vehicle charging at urban station during sunset"
- ✅ "AI robot arm assembling electronic components in factory"
- ✅ "Residential home with solar panels on roof, sunny day"

**Poor prompts:**
- ❌ "Tesla" (too vague)
- ❌ "cool tech stuff" (not specific)
- ❌ "iPhone 15" (can't do specific products)

### Prompt Formula

```
[Main Subject] + [Action/Context] + [Environment] + [Lighting/Mood]
```

Examples:
- "Autonomous delivery robot navigating city sidewalk at dusk"
- "Wind turbines generating power on rolling hills during golden hour"
- "Scientist examining AI chip under microscope in modern lab"

### What Works Well

✅ Generic tech concepts (robots, servers, chips)
✅ Environments (factories, labs, cities)
✅ Abstract representations (networks, data, energy)
✅ Nature + tech combinations (solar + nature, EVs + landscape)

### What Doesn't Work

❌ Specific branded products (exact iPhone model, specific car)
❌ Real people/celebrities
❌ Text in images (logos, signs)
❌ Very specific technical details

## Troubleshooting

### "OPENAI_API_KEY not found"

**Problem:** Your `.env` file isn't set up

**Solution:**
```bash
# Make sure .env exists
ls -la .env

# If not, copy from example
cp .env.example .env

# Then edit and add your key
```

### "Insufficient credits" or "Billing error"

**Problem:** Your API account needs credits

**Solution:**
1. Go to https://platform.openai.com/account/billing
2. Add credits ($5-10 is plenty to start)
3. Wait a few minutes for activation

### Image quality isn't good enough

**Problem:** Using wrong provider or style

**Solution:**
```bash
# Try OpenAI (better quality than Replicate)
npm run generate-image "your prompt" --provider openai

# Try different style
npm run generate-image "your prompt" --style photorealistic
```

### "Request failed" or timeout

**Problem:** API is slow or down

**Solution:**
1. Wait 30 seconds and try again
2. Check https://status.openai.com or Replicate status
3. Try the other provider

## Cost Management

### OpenAI Pricing

- Standard quality: ~$0.04 per image
- HD quality (default): ~$0.08 per image
- Our script uses HD quality (1792x1024)

**Budget estimates:**
- 10 articles/month = ~$0.80/month
- 50 articles/month = ~$4.00/month
- 100 articles/month = ~$8.00/month

### Replicate Pricing

- ~$0.005 per image
- 25x cheaper than OpenAI
- Slightly lower quality but still good

**Budget estimates:**
- 100 articles/month = ~$0.50/month
- 500 articles/month = ~$2.50/month

### Which Provider Should I Use?

**Use OpenAI if:**
- You want the absolute best quality
- Budget isn't a major concern
- Generating < 50 images/month

**Use Replicate if:**
- You're on a tight budget
- Generating many images
- Quality is "good enough"

**Pro tip:** Set default in `.env`:
```
DEFAULT_IMAGE_PROVIDER=replicate
```

Then override for important articles:
```bash
npm run generate-image "important topic" --provider openai
```

## Advanced Usage

### Batch Generation

If you need multiple images:

```bash
# Generate multiple variations
npm run generate-image "EV charging station night" --output ev-night
npm run generate-image "EV charging station day" --output ev-day
npm run generate-image "EV charging station sunset" --output ev-sunset
```

### Integration with Templates

You can add image generation commands to your article templates as comments:

```markdown
---
title: "Your Title"
# Image: npm run generate-image "relevant description based on title"
---
```

### Checking Costs

**OpenAI:**
1. Go to https://platform.openai.com/usage
2. View your usage history
3. Each image generation shows cost

**Replicate:**
1. Go to https://replicate.com/account/billing
2. View predictions history
3. See per-image costs

## Best Practices

1. **Generate images early** in your writing process so they're ready
2. **Use descriptive prompts** - more detail = better results
3. **Start with Replicate** to test, use OpenAI for final
4. **Keep a prompt library** - save prompts that worked well
5. **Version control images** - commit to git so you don't lose them
6. **Test locally** - always preview before publishing

## Support

### Need Help?

1. Run the script with `--help`:
   ```bash
   npm run generate-image --help
   ```

2. Check the troubleshooting section above

3. Review your `.env` file setup

4. Check API provider status pages

### Still Stuck?

Common issues:
- Make sure `.env` exists and has your key
- Verify API key is valid (no extra spaces)
- Check you have credits in your account
- Try the other provider
- Simplify your prompt

## Summary

You now have a professional AI image generation workflow:

✅ Two AI providers (quality vs. cost)
✅ Simple command-line interface
✅ Automatic download and organization
✅ Copy/paste ready frontmatter
✅ Multiple style options
✅ Cost-effective pricing

**Next steps:**
1. Set up your `.env` with an API key
2. Generate your first test image
3. Integrate into your article workflow
4. Start creating better content faster!

---

**Quick Command Reference:**

```bash
# Basic
npm run generate-image "your prompt"

# With options
npm run generate-image "prompt" --provider replicate --style digital-art

# Help
npm run generate-image --help
```

Happy generating! 🎨
