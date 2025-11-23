# Image Sourcing Guide - Relevant & Legal Images

## The Problem with Generic Stock Photos

❌ **Don't:** Use the same generic tech images for every article
❌ **Don't:** Use unrelated images (e.g., random laptop for an article about earbuds)
❌ **Don't:** Reuse the same image across multiple articles

✅ **Do:** Find specific, relevant images for each topic
✅ **Do:** Use actual product images when reviewing products
✅ **Do:** Generate custom AI images for unique content

---

## Image Sourcing Priority Order

### 1. **Actual Product Images** (Best for Reviews/Best-Lists)

**Where to get them:**
- Amazon product page (with proper disclaimer)
- Manufacturer press kits (usually free for editorial use)
- Official product photos from company website

**How to use:**
```yaml
image: "https://m.media-amazon.com/images/I/[product-image-id].jpg"
imageCredit: "Product image courtesy of Amazon / [Manufacturer]"
```

**Legal note:** Amazon product images can be used in Associates content

### 2. **AI-Generated Images** (Best for Original Content)

**Tools:**
- **Replicate (Stable Diffusion)**: ~$0.002-0.01 per image
- **DALL-E 3**: ~$0.04 per image
- **Midjourney**: ~$10/month subscription

**Prompts by Category:**

**Tech & Innovation:**
```
"Modern [product/tech] in futuristic setting, professional product
photography, clean background, vibrant colors, tech journalism style"
```

**AI & Automation:**
```
"Abstract visualization of artificial intelligence, neural networks,
digital brain, blue and purple gradient, professional tech illustration"
```

**EVs & Mobility:**
```
"Modern electric vehicle [specific model or type], outdoor setting,
charging station, professional automotive photography, golden hour lighting"
```

**Energy & Policy:**
```
"Large-scale solar farm / wind turbines / battery storage facility,
aerial view, professional photography, blue sky background"
```

**Markets & Money:**
```
"Financial charts, stock market data visualization, modern clean
design, professional business photography, blue and green accents"
```

**Picks & Reviews:**
```
"[Specific product] product photography, white background, studio
lighting, detailed close-up, professional ecommerce style"
```

### 3. **Unsplash (Specific Searches)**

**Better search strategies:**

**Instead of:** "technology"
**Search for:** "wireless earbuds close up" or "person using earbuds"

**Instead of:** "electric car"
**Search for:** "Tesla Model Y charging" or "EV charging station"

**Instead of:** "AI"
**Search for:** "robot hand typing" or "data visualization screen"

**Find Specific Images:**
```
Article Topic → Unsplash Search
─────────────────────────────────
Steam Deck review → "handheld gaming console"
Solar power news → "solar panel farm aerial"
Nvidia earnings → "computer chip macro photography"
Best keyboards → "mechanical keyboard RGB"
Bitcoin ETF → "Bitcoin coin gold"
```

### 4. **Press Release Images**

**Where to find:**
- Company newsrooms (e.g., tesla.com/news, nvidia.com/news)
- PR Newswire
- Business Wire
- Company media kits

**How to use:**
```yaml
image: "https://company-cdn.com/press-image.jpg"
imageCredit: "Image courtesy of [Company Name] Press Release"
```

**Verify:** Check the press kit license allows editorial use

---

## Image Selection Checklist

For every article, ask:

- [ ] **Is this image directly related to the topic?**
- [ ] **Is it high quality and professional?** (1200px+ width)
- [ ] **Have I used this exact image before?** (avoid reuse)
- [ ] **Do I have legal right to use it?**
- [ ] **Is the attribution correct?**
- [ ] **Does it match the article tone?** (serious vs playful)

---

## Specific Guidelines by Article Type

### **Product Reviews:**
**Best:** Actual product photo from Amazon/manufacturer
**Second:** AI-generated product render
**Avoid:** Generic category images

**Example:**
- ✅ Photo of actual Steam Deck OLED
- ❌ Generic handheld gaming device stock photo

### **Best Lists:**
**Best:** Composite image showing multiple products
**Second:** Hero product image
**Avoid:** Unrelated tech imagery

**Example for "Best Wireless Earbuds":**
- ✅ Photo of actual earbuds from the list
- ✅ AI-generated comparison layout
- ❌ Generic "person listening to music" stock photo

### **Deep Dives:**
**Best:** Conceptual/illustrative image matching theme
**Second:** Data visualization or infographic
**Avoid:** Random tech stock photos

**Example for "GPT-5 Agent Focus":**
- ✅ AI robot/neural network visualization
- ✅ Diagram of agent architecture
- ❌ Generic "futuristic tech" image

### **Quick Takes (News):**
**Best:** Related to the specific news item
**Second:** Company logo/product if relevant
**Avoid:** Generic tech imagery

**Example for "Meta Quest 4 Leaked":**
- ✅ Meta Quest headset (current or previous model)
- ✅ VR headset in use
- ❌ Random VR/tech stock photo

---

## Amazon Product Image Extraction

**Manual Method:**
1. Go to Amazon product page
2. Right-click main product image → "Copy image address"
3. Use URL: `https://m.media-amazon.com/images/I/[ID].jpg`

**MCP Method (if set up):**
```
Use amazon-products MCP tool with ASIN
→ Returns product.image URL
→ Use in article frontmatter
```

**Automated Script:**
```javascript
// Save as scripts/get-amazon-image.js
import axios from 'axios';
import * as cheerio from 'cheerio';

const getProductImage = async (asin) => {
  const url = `https://www.amazon.com/dp/${asin}`;
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const image = $('#landingImage').attr('src');
  console.log(`Image URL: ${image}`);
  return image;
};

// Usage: node scripts/get-amazon-image.js B0ABC123
getProductImage(process.argv[2]);
```

---

## Image Optimization

**Before using any image:**

1. **Resize:** Max width 1920px (Unsplash, AI images often huge)
2. **Compress:** Use TinyPNG or ImageOptim (50-70% size reduction)
3. **Format:** JPEG for photos, PNG for graphics with transparency
4. **Dimensions:** Aim for 16:9 aspect ratio (hero images)

**Quick resize command:**
```bash
# Requires ImageMagick
convert input.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 output.jpg
```

---

## Attribution Requirements

### **Unsplash:**
```yaml
imageCredit: "Photo by [Photographer Name] on Unsplash"
```
Required by Unsplash license

### **AI Generated:**
```yaml
imageCredit: "AI Generated Image"
```
No photographer to credit

### **Amazon Product:**
```yaml
imageCredit: "Product image courtesy of Amazon.com"
```
or
```yaml
imageCredit: "Product image courtesy of [Manufacturer Name]"
```

### **Press Release:**
```yaml
imageCredit: "Image courtesy of [Company Name]"
```

### **Company Website:**
```yaml
imageCredit: "Image courtesy of [Company Name]"
```

---

## Fixing the Sample Articles

**Current issues:**
1. Generic/reused Unsplash images
2. Not specific to the actual products
3. Same images across different articles

**Action needed:**
- [ ] Replace generic images with product-specific ones
- [ ] Use AI generation for unique article headers
- [ ] Get actual product images from Amazon for reviews

---

## Updated Workflow for New Articles

**For Product Reviews:**
1. Find ASIN of product
2. Get product image from Amazon (manual or MCP)
3. Or: Generate AI render of product
4. Verify image quality and relevance
5. Add proper attribution

**For News/Analysis:**
1. Identify key visual element (company, product, concept)
2. Generate AI image with specific prompt
3. Or: Find highly specific Unsplash image
4. Ensure image hasn't been used before
5. Add proper attribution

**For Best Lists:**
1. Get image of #1 product (best overall)
2. Or: Create composite of top 3 products
3. Or: Generate comparison-style AI image
4. Avoid generic category photos

---

## Image Library Management

**Create a tracking file:**
```markdown
# images-used.md

## Article → Image Mapping

- tesla-model-2-china.md → unsplash.com/photo-ABC123 (Tesla charging)
- steam-deck-oled-review.md → amazon product image B0CQY3WPB7
- best-earbuds-under-100.md → AI generated (earbuds composite)
```

**Prevents:**
- Reusing same images
- Forgetting attributions
- Copyright issues

---

## Quick Reference

**When in doubt:**
1. **Product review?** → Get actual product image
2. **News article?** → AI generate or specific Unsplash search
3. **Best list?** → Hero product or composite image
4. **Generic tech?** → Avoid! Be specific.

**Never:**
- Use copyrighted images without permission
- Reuse the same image across articles
- Use irrelevant images just to have something
- Skip attribution

---

## Next Steps

1. Set up image generation MCP (Replicate recommended)
2. Create Amazon image scraping script or MCP
3. Review and replace images in sample articles
4. Implement image tracking system

Let me know if you want help setting up any of these tools!
