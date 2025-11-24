#!/usr/bin/env node

/**
 * AI Image Generation Script for Trendy Tech Tribe
 *
 * Supports multiple AI image providers:
 * - OpenAI DALL-E 3 (best quality, paid)
 * - Replicate Stable Diffusion (good quality, pay-per-use)
 * - Local Stable Diffusion (free, requires setup)
 *
 * Usage:
 *   node scripts/generate-image.js "prompt" [--provider openai|replicate]
 *   npm run generate-image "prompt" [--provider openai|replicate]
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  outputDir: path.join(__dirname, '..', 'public', 'images', 'articles'),
  providers: {
    openai: {
      name: 'OpenAI DALL-E 3',
      apiUrl: 'https://api.openai.com/v1/images/generations',
      requiresKey: 'OPENAI_API_KEY',
      defaultSize: '1792x1024', // Wide format for article headers
      defaultQuality: 'hd'
    },
    replicate: {
      name: 'Replicate (SDXL)',
      apiUrl: 'https://api.replicate.com/v1/predictions',
      requiresKey: 'REPLICATE_API_TOKEN',
      model: 'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b'
    }
  }
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  let prompt = '';
  let provider = process.env.DEFAULT_IMAGE_PROVIDER || 'openai';
  let style = 'photorealistic';
  let outputName = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--provider' || args[i] === '-p') {
      provider = args[++i];
    } else if (args[i] === '--style' || args[i] === '-s') {
      style = args[++i];
    } else if (args[i] === '--output' || args[i] === '-o') {
      outputName = args[++i];
    } else if (!args[i].startsWith('--')) {
      prompt = args[i];
    }
  }

  if (!prompt) {
    console.error('❌ Error: Prompt is required');
    printHelp();
    process.exit(1);
  }

  return { prompt, provider, style, outputName };
}

function printHelp() {
  console.log(`
🎨 Trendy Tech Tribe - AI Image Generator

USAGE:
  node scripts/generate-image.js "your prompt" [options]
  npm run generate-image "your prompt" [options]

OPTIONS:
  --provider, -p    AI provider to use (openai, replicate) [default: openai]
  --style, -s       Image style (photorealistic, digital-art, minimalist) [default: photorealistic]
  --output, -o      Custom output filename (without extension)
  --help, -h        Show this help message

EXAMPLES:
  # Generate with OpenAI DALL-E 3 (best quality)
  npm run generate-image "Tesla Cybertruck in downtown city"

  # Generate with Replicate
  npm run generate-image "AI robot coding" --provider replicate

  # Custom style
  npm run generate-image "Solar panels on house" --style digital-art

  # Custom output name
  npm run generate-image "EV charging station" --output ev-charging-2025

SETUP:
  1. Copy .env.example to .env
  2. Add your API key(s):
     - OPENAI_API_KEY=sk-...  (for OpenAI)
     - REPLICATE_API_TOKEN=r8_...  (for Replicate)
  3. Run the script!

PROVIDERS:
  openai     - DALL-E 3 (best quality, ~$0.04-0.12 per image)
  replicate  - Stable Diffusion XL (good quality, ~$0.005 per image)

The generated image will be saved to: public/images/articles/
The script will output the URL to use in your article frontmatter.
  `);
}

// Load environment variables from .env file
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

// Enhance prompt with style
function enhancePrompt(basePrompt, style) {
  const styleEnhancements = {
    photorealistic: 'professional photography, high quality, sharp focus, realistic lighting, 8k resolution',
    'digital-art': 'digital art, modern, clean design, vibrant colors, professional illustration',
    minimalist: 'minimalist design, clean, simple, professional, tech-focused',
    editorial: 'editorial photography, news article style, professional, journalistic',
    futuristic: 'futuristic, cutting-edge technology, modern, sleek design'
  };

  const enhancement = styleEnhancements[style] || styleEnhancements.photorealistic;
  return `${basePrompt}, ${enhancement}. Tech article header image, wide format, suitable for technology news website.`;
}

// Generate image with OpenAI DALL-E 3
async function generateWithOpenAI(prompt, config) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY not found in environment variables. Add it to your .env file.');
  }

  console.log('🎨 Generating image with OpenAI DALL-E 3...');
  console.log(`📝 Prompt: ${prompt}\n`);

  const requestBody = JSON.stringify({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: config.defaultSize,
    quality: config.defaultQuality,
    response_format: 'url'
  });

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    const req = https.request(config.apiUrl, options, (res) => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`OpenAI API error (${res.statusCode}): ${data}`));
          return;
        }

        try {
          const response = JSON.parse(data);
          if (response.data && response.data[0] && response.data[0].url) {
            resolve({
              url: response.data[0].url,
              revisedPrompt: response.data[0].revised_prompt
            });
          } else {
            reject(new Error('Unexpected response format from OpenAI'));
          }
        } catch (error) {
          reject(new Error(`Failed to parse OpenAI response: ${error.message}`));
        }
      });
    });

    req.on('error', error => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.write(requestBody);
    req.end();
  });
}

// Generate image with Replicate (Stable Diffusion)
async function generateWithReplicate(prompt, config) {
  const apiToken = process.env.REPLICATE_API_TOKEN;

  if (!apiToken) {
    throw new Error('REPLICATE_API_TOKEN not found in environment variables. Add it to your .env file.');
  }

  console.log('🎨 Generating image with Replicate (Stable Diffusion XL)...');
  console.log(`📝 Prompt: ${prompt}\n`);

  const requestBody = JSON.stringify({
    version: config.model,
    input: {
      prompt: prompt,
      width: 1792,
      height: 1024,
      num_outputs: 1,
      scheduler: "DPMSolverMultistep",
      num_inference_steps: 50,
      guidance_scale: 7.5
    }
  });

  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiToken}`,
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    const req = https.request(config.apiUrl, options, (res) => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', async () => {
        if (res.statusCode !== 201) {
          reject(new Error(`Replicate API error (${res.statusCode}): ${data}`));
          return;
        }

        try {
          const prediction = JSON.parse(data);

          // Poll for completion
          console.log('⏳ Waiting for image generation to complete...');
          const result = await pollReplicatePrediction(prediction.id, apiToken);

          if (result.output && result.output[0]) {
            resolve({
              url: result.output[0],
              revisedPrompt: prompt
            });
          } else {
            reject(new Error('No output from Replicate'));
          }
        } catch (error) {
          reject(new Error(`Failed to process Replicate response: ${error.message}`));
        }
      });
    });

    req.on('error', error => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.write(requestBody);
    req.end();
  });
}

// Poll Replicate prediction status
function pollReplicatePrediction(predictionId, apiToken, maxAttempts = 60) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const poll = () => {
      attempts++;

      if (attempts > maxAttempts) {
        reject(new Error('Timeout waiting for image generation'));
        return;
      }

      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Token ${apiToken}`
        }
      };

      https.get(`https://api.replicate.com/v1/predictions/${predictionId}`, options, (res) => {
        let data = '';

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const prediction = JSON.parse(data);

            if (prediction.status === 'succeeded') {
              resolve(prediction);
            } else if (prediction.status === 'failed') {
              reject(new Error(`Generation failed: ${prediction.error}`));
            } else {
              // Still processing, poll again
              setTimeout(poll, 1000);
            }
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error.message}`));
          }
        });
      }).on('error', error => {
        reject(new Error(`Poll request failed: ${error.message}`));
      });
    };

    poll();
  });
}

// Download image from URL
async function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    console.log('⬇️  Downloading image...');

    const file = fs.createWriteStream(outputPath);

    https.get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', (error) => {
      fs.unlink(outputPath, () => {});
      reject(new Error(`Download failed: ${error.message}`));
    });
  });
}

// Generate filename from prompt
function generateFilename(prompt, customName = null) {
  if (customName) {
    return `${customName}.png`;
  }

  const slug = prompt
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 50);

  const timestamp = Date.now();
  return `${slug}-${timestamp}.png`;
}

// Main function
async function main() {
  try {
    loadEnv();

    const { prompt, provider, style, outputName } = parseArgs();

    // Validate provider
    const providerConfig = CONFIG.providers[provider];
    if (!providerConfig) {
      console.error(`❌ Unknown provider: ${provider}`);
      console.error(`Available providers: ${Object.keys(CONFIG.providers).join(', ')}`);
      process.exit(1);
    }

    // Enhance prompt with style
    const enhancedPrompt = enhancePrompt(prompt, style);

    // Generate image based on provider
    let result;
    if (provider === 'openai') {
      result = await generateWithOpenAI(enhancedPrompt, providerConfig);
    } else if (provider === 'replicate') {
      result = await generateWithReplicate(enhancedPrompt, providerConfig);
    } else {
      throw new Error(`Provider ${provider} not implemented yet`);
    }

    // Create output directory if it doesn't exist
    if (!fs.existsSync(CONFIG.outputDir)) {
      fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }

    // Generate filename and download
    const filename = generateFilename(prompt, outputName);
    const outputPath = path.join(CONFIG.outputDir, filename);

    await downloadImage(result.url, outputPath);

    // Success output
    console.log('\n✅ Image generated successfully!\n');
    console.log('📁 File saved to:', outputPath);
    console.log('🔗 Relative path:', `/images/articles/${filename}`);
    console.log('\n📋 Use this in your article frontmatter:\n');
    console.log(`image: "/images/articles/${filename}"`);
    console.log(`imageAlt: "${prompt}"`);
    console.log(`imageCredit: "AI Generated Image"`);

    if (result.revisedPrompt && result.revisedPrompt !== enhancedPrompt) {
      console.log(`\n💡 OpenAI revised your prompt to:\n"${result.revisedPrompt}"`);
    }

    console.log('\n✨ Ready to add to your article!\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n💡 Tips:');
    console.error('  - Make sure you have set up your .env file with API keys');
    console.error('  - Check that your API key is valid and has credits');
    console.error('  - Try a different provider with --provider flag');
    console.error('\nRun with --help for more information\n');
    process.exit(1);
  }
}

main();
