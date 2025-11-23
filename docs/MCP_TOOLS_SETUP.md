# MCP Tools Setup Guide

## Recommended MCP Servers for Content Creation

### 1. Image Generation MCP Servers

#### Option A: Replicate MCP (Stable Diffusion, DALL-E alternatives)
```json
{
  "mcpServers": {
    "replicate": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-replicate"],
      "env": {
        "REPLICATE_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

**Setup:**
1. Get API key from https://replicate.com
2. Add to MCP config
3. Generate images with prompts like: "Modern electric vehicle charging station, professional photography style"

#### Option B: DALL-E via OpenAI (if you have API access)
```json
{
  "mcpServers": {
    "openai-images": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-openai"],
      "env": {
        "OPENAI_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

### 2. Amazon Product Scraping MCP

#### Custom Amazon MCP Server
Create a local MCP server for Amazon product data:

**File: `~/mcp-servers/amazon-products/index.js`**
```javascript
#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from "axios";
import * as cheerio from "cheerio";

const server = new Server({
  name: "amazon-products",
  version: "1.0.0"
});

// Tool to fetch Amazon product data
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "get_amazon_product",
      description: "Fetch product details from Amazon (title, image, features)",
      inputSchema: {
        type: "object",
        properties: {
          asin: {
            type: "string",
            description: "Amazon ASIN (product ID)"
          }
        },
        required: ["asin"]
      }
    }
  ]
}));

server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "get_amazon_product") {
    const { asin } = request.params.arguments;

    try {
      // Fetch Amazon product page
      const response = await axios.get(`https://www.amazon.com/dp/${asin}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; ContentBot/1.0)'
        }
      });

      const $ = cheerio.load(response.data);

      // Extract product data
      const title = $('#productTitle').text().trim();
      const image = $('#landingImage').attr('src') || $('#imgBlkFront').attr('src');
      const features = [];
      $('#feature-bullets li').each((i, el) => {
        const feature = $(el).text().trim();
        if (feature) features.push(feature);
      });

      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            asin,
            title,
            image,
            features,
            url: `https://www.amazon.com/dp/${asin}?tag=trendytecht0a-20`
          }, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Error fetching product: ${error.message}`
        }],
        isError: true
      };
    }
  }
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

**Setup:**
```bash
cd ~/mcp-servers
mkdir amazon-products
cd amazon-products
npm init -y
npm install @modelcontextprotocol/sdk axios cheerio
chmod +x index.js
```

**Add to MCP Config:**
```json
{
  "mcpServers": {
    "amazon-products": {
      "command": "node",
      "args": ["/Users/williamwallace/mcp-servers/amazon-products/index.js"]
    }
  }
}
```

### 3. Alternative: Use Existing Web Scraping MCP

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

This can scrape any website including Amazon product pages.

---

## Image Generation Workflow with MCP

### Once MCP is set up:

**For Article Images:**
```
Prompt: "Generate a professional hero image for an article about [topic].
Style: Modern tech journalism, 16:9 aspect ratio, vibrant colors"
```

**For Product Reviews:**
```
Prompt: "Product photography of [product name] on white background,
professional lighting, high detail"
```

**For Category Headers:**
```
Prompt: "Abstract background representing [category theme],
gradient colors, modern tech aesthetic"
```

---

## Amazon Product Data Workflow

### With Amazon MCP:

1. **Get Product ASIN** from Amazon URL (the B0XXXXX part)
2. **Use MCP tool** to fetch:
   - Product title
   - Main image URL
   - Key features
   - Affiliate URL with your tag

3. **Use in Article:**
   - Image goes in frontmatter `image` field
   - Features go in review section
   - Affiliate URL in `affiliateProducts` array

---

## Cost Considerations

### Image Generation:
- **Replicate (Stable Diffusion)**: ~$0.002-0.01 per image
- **DALL-E 3**: ~$0.04 per image (1024x1024)
- **Free Alternative**: Use Unsplash with better search terms

### Amazon Scraping:
- **Custom MCP**: Free (but may break if Amazon changes HTML)
- **Amazon Product API**: Free tier available, but requires approval
- **Puppeteer MCP**: Free (runs locally)

---

## Quick MCP Setup Commands

```bash
# Install MCP CLI if needed
npm install -g @modelcontextprotocol/cli

# Test an MCP server
mcp test <server-name>

# List available tools
mcp tools <server-name>
```

---

## Recommended Setup for Your Workflow

**Minimum:**
1. **Replicate MCP** for image generation ($10-20/month for occasional use)
2. **Puppeteer MCP** for Amazon scraping (free)

**Optimal:**
1. **Replicate MCP** for custom images
2. **Custom Amazon MCP** (code provided above) for product data
3. **Unsplash as fallback** for quick articles

---

## Next Steps

1. Choose image generation method (Replicate recommended)
2. Set up Amazon scraping MCP
3. Update workflow to generate/fetch images per article
4. Test with 2-3 articles before scaling

Let me know which MCP servers you want to set up and I can help configure them!
