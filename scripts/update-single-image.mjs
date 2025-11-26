#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONTENT_DIR = path.join(__dirname, '../src/content');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Global style guideline
const STYLE_GUIDELINE = "Modern editorial tech style tailored to the article's subject, using a color palette and mood that fit the theme. Clean lighting, polished details, and one subtle whimsical touch that enhances the message without distracting from it.";

/**
 * Generate image using OpenAI DALL-E 3
 */
async function generateImageWithOpenAI(prompt) {
    console.log('  → Generating with OpenAI DALL-E 3...');
    console.log(`  → Prompt: ${prompt.substring(0, 150)}...`);

    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'dall-e-3',
            prompt: prompt,
            n: 1,
            size: '1792x1024', // Closest to 16:9 ratio (1.75:1)
            quality: 'hd',
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenAI API request failed');
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    console.log('  ✓ Image generated, downloading...');

    // Download the image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    return Buffer.from(imageBuffer);
}

/**
 * Parse frontmatter from markdown file
 */
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (!match) return null;

    const frontmatterText = match[1];
    const frontmatter = {};

    // Simple YAML parser
    const lines = frontmatterText.split('\n');

    for (const line of lines) {
        if (line.trim().startsWith('-')) continue;

        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
            frontmatter[key] = value;
        }
    }

    return frontmatter;
}

/**
 * Main function
 */
async function main() {
    const args = process.argv.slice(2);

    if (args.length < 3) {
        console.log('Usage: node update-single-image.mjs <article-path> <image-prompt> <new-image-name>');
        console.log('Example: node update-single-image.mjs ai/agentic-ai-rise-2025.md "AI neural networks" agentic-ai-2025');
        process.exit(1);
    }

    const [articlePath, imagePrompt, imageName] = args;

    console.log('='.repeat(60));
    console.log('AI Image Generator');
    console.log('='.repeat(60));
    console.log(`\nArticle: ${articlePath}`);
    console.log(`Image name: ${imageName}\n`);

    if (!OPENAI_API_KEY) {
        console.error('ERROR: OPENAI_API_KEY not found in environment');
        process.exit(1);
    }

    try {
        // Read article
        const fullPath = path.join(CONTENT_DIR, articlePath);
        const content = await fs.readFile(fullPath, 'utf-8');
        const frontmatter = parseFrontmatter(content);

        console.log(`Title: ${frontmatter.title}`);
        console.log(`Summary: ${frontmatter.summary}\n`);

        // Create full prompt
        const fullPrompt = `Create a 16:9 editorial hero image for an article titled "${frontmatter.title}". ${frontmatter.summary} ${imagePrompt}. ${STYLE_GUIDELINE}`;

        // Generate image
        const imageBuffer = await generateImageWithOpenAI(fullPrompt);

        // Save image
        const filename = `${imageName}.png`;
        const filepath = path.join(PUBLIC_IMAGES_DIR, filename);
        await fs.writeFile(filepath, imageBuffer);
        console.log(`  ✓ Image saved: /images/${filename}`);

        // Update article
        const newImagePath = `/images/${filename}`;
        const altText = `${frontmatter.title} - editorial illustration`;

        const updatedContent = content
            .replace(/image: ".*?"/, `image: "${newImagePath}"`)
            .replace(/image: '.*?'/, `image: "${newImagePath}"`)
            .replace(/imageAlt: ".*?"/, `imageAlt: "${altText}"`)
            .replace(/imageAlt: '.*?'/, `imageAlt: "${altText}"`);

        await fs.writeFile(fullPath, updatedContent, 'utf-8');
        console.log(`  ✓ Article updated\n`);

        console.log('='.repeat(60));
        console.log('SUCCESS!');
        console.log('='.repeat(60));

    } catch (error) {
        console.error(`\n✗ Error: ${error.message}`);
        process.exit(1);
    }
}

main();
