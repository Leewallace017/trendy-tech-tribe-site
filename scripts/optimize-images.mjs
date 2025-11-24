import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');

// Define image sizes for responsive images
const SIZES = {
  small: 640,
  medium: 1024,
  large: 1920
};

// Quality settings
const WEBP_QUALITY = 85;
const AVIF_QUALITY = 80;

async function optimizeImage(inputPath, outputDir, filename) {
  const nameWithoutExt = basename(filename, extname(filename));

  console.log(`\nOptimizing: ${filename}`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`  Original: ${metadata.width}x${metadata.height} (${metadata.format})`);

    // Create output directory if it doesn't exist
    await mkdir(outputDir, { recursive: true });

    // Generate WebP versions at different sizes
    for (const [sizeName, width] of Object.entries(SIZES)) {
      // Skip if original is smaller than target size
      if (metadata.width < width) continue;

      const outputPath = join(outputDir, `${nameWithoutExt}-${sizeName}.webp`);

      await sharp(inputPath)
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      const stats = await sharp(outputPath).metadata();
      console.log(`  ✓ Created ${sizeName} WebP: ${stats.width}x${stats.height}`);
    }

    // Also create a full-size WebP
    const fullSizeOutput = join(outputDir, `${nameWithoutExt}.webp`);
    await sharp(inputPath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(fullSizeOutput);

    const fullStats = await sharp(fullSizeOutput).metadata();
    console.log(`  ✓ Created full-size WebP: ${fullStats.width}x${fullStats.height}`);

    return true;
  } catch (error) {
    console.error(`  ✗ Error optimizing ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');

  // Optimize specific large images
  const imagesToOptimize = [
    {
      input: join(projectRoot, 'public/join-the-tribe.png'),
      output: join(projectRoot, 'public/images/optimized'),
      filename: 'join-the-tribe.png'
    },
    {
      input: join(projectRoot, 'public/images/articles/modern-electric-pickup-truck-in-automotive-product-1763945221811.png'),
      output: join(projectRoot, 'public/images/optimized/articles'),
      filename: 'modern-electric-pickup-truck-in-automotive-product-1763945221811.png'
    }
  ];

  let successCount = 0;
  let failCount = 0;

  for (const { input, output, filename } of imagesToOptimize) {
    const result = await optimizeImage(input, output, filename);
    if (result) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\n✅ Optimization complete!`);
  console.log(`   Successful: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log(`\nOptimized images saved to public/images/optimized/`);
}

main().catch(console.error);
