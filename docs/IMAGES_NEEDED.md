# Custom Images Needed for New Articles

## Image Generation Required

The following articles need custom images generated (image generation tool hit rate limits). Please generate these using nano banana pro or your preferred tool.

### 1. Battery Storage Article
**File:** `src/content/energy/battery-storage-record-2025.md`

**Current Image:** Unsplash (DUPLICATE - reused from another article)

**Prompt for nano banana pro:**
```
Modern large-scale battery energy storage system facility with rows of industrial battery containers, solar panels in background, clean energy infrastructure, professional photography style, bright daylight, wide angle view, tech journalism aesthetic
```

**Save as:** `public/images/battery-storage-infrastructure.webp`

**Update article line 11 to:**
```yaml
image: "/images/battery-storage-infrastructure.webp"
```

---

### 2. Tech Stocks Article
**File:** `src/content/markets/tech-stocks-ai-bubble-2025.md`

**Current Image:** Unsplash (DUPLICATE - reused)

**Prompt:**
```
Financial trading floor with multiple screens showing tech stock charts and AI company logos, modern office environment, professional traders analyzing data, blue and green color scheme, business photography style, dynamic composition
```

**Save as:** `public/images/tech-stocks-trading.webp`

**Update article line 11 to:**
```yaml
image: "/images/tech-stocks-trading.webp"
```

---

### 3. Agentic AI Article
**File:** `src/content/ai/agentic-ai-rise-2025.md`

**Current Image:** Unsplash (DUPLICATE - reused from gemini article)

**Prompt:**
```
Abstract visualization of autonomous AI agents working together, interconnected nodes and pathways, futuristic digital interface, holographic displays showing decision trees, purple and blue gradient, tech illustration style, clean and modern
```

**Save as:** `public/images/agentic-ai-concept.webp`

**Update article line 11 to:**
```yaml
image: "/images/agentic-ai-concept.webp"
```

---

### 4. EV Competition Article
**File:** `src/content/evs/byd-tesla-competition-2025.md`

**Current Image:** Unsplash (DUPLICATE - reused from EV tax credit article)

**Prompt:**
```
Modern electric vehicle charging at high-tech charging station, sleek BYD or Tesla-style EV, futuristic charging infrastructure, clean urban environment, professional automotive photography, golden hour lighting, wide angle shot
```

**Save as:** `public/images/ev-charging-station.webp`

**Update article line 11 to:**
```yaml
image: "/images/ev-charging-station.webp"
```

---

### 5. Amazon AI Investment Article
**File:** `src/content/tech/amazon-ai-investment-2025.md`

**Current Image:** Unsplash (NASA photo - not specific enough)

**Prompt:**
```
Massive modern data center interior with rows of server racks, blue LED lighting, high-tech infrastructure, clean and organized, professional technology photography, wide perspective showing scale, Amazon AWS aesthetic
```

**Save as:** `public/images/aws-data-center.webp`

**Update article line 11 to:**
```yaml
image: "/images/aws-data-center.webp"
```

---

### 6. Black Friday Deals Article
**File:** `src/content/picks/best-black-friday-tech-deals-2025.md`

**Current Image:** Unsplash (generic Black Friday image)

**Prompt:**
```
Flat lay composition of popular tech gadgets - smart speaker, wireless earbuds, streaming device, power bank - arranged on clean white background with subtle Black Friday sale tags, product photography style, professional lighting, top-down view
```

**Save as:** `public/images/black-friday-tech-deals.webp`

**Update article line 11 to:**
```yaml
image: "/images/black-friday-tech-deals.webp"
```

---

## Image Optimization

After generating images with nano banana pro, optimize for web:

```bash
# If using ImageMagick or similar
convert input.png -quality 85 -resize 1200x630 output.webp

# Or use online tools to:
# - Convert to WebP format
# - Resize to 1200x630px (optimal for social sharing)
# - Compress to ~85% quality
# - Keep file size under 200KB
```

---

## Quick Update Script

After generating and optimizing all images, update the articles:

```bash
# Update Energy article
sed -i '' 's|image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200"|image: "/images/battery-storage-infrastructure.webp"|' src/content/energy/battery-storage-record-2025.md

# Update Markets article  
sed -i '' 's|image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200"|image: "/images/tech-stocks-trading.webp"|' src/content/markets/tech-stocks-ai-bubble-2025.md

# Update AI article
sed -i '' 's|image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200"|image: "/images/agentic-ai-concept.webp"|' src/content/ai/agentic-ai-rise-2025.md

# Update EVs article
sed -i '' 's|image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200"|image: "/images/ev-charging-station.webp"|' src/content/evs/byd-tesla-competition-2025.md

# Update Tech article
sed -i '' 's|image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200"|image: "/images/aws-data-center.webp"|' src/content/tech/amazon-ai-investment-2025.md

# Update Picks article
sed -i '' 's|image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200"|image: "/images/black-friday-tech-deals.webp"|' src/content/picks/best-black-friday-tech-deals-2025.md
```

---

## Image Credits

Update `imageCredit` field in each article to:
```yaml
imageCredit: "AI Generated Image"
```
