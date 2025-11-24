import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * ASIN Verification Script
 * 
 * Extracts all Amazon ASINs from markdown files and generates a report
 * for manual verification. This helps identify all ASINs that need checking
 * during monthly audits or before publishing.
 * 
 * Usage: npm run verify-asins
 */

// Configuration
const CONTENT_DIRS = [
    path.join(__dirname, '../src/content/blog'),
    path.join(__dirname, '../src/content/picks'),
    path.join(__dirname, '../src/content/news')
];

const AMAZON_URL_REGEX = /https?:\/\/(www\.)?amazon\.com\/dp\/([A-Z0-9]{10})/gi;
const ASIN_REGEX = /[A-Z0-9]{10}/;

/**
 * Extract ASINs from markdown content
 */
function extractASINs(content, filePath) {
    const asins = [];
    let match;

    while ((match = AMAZON_URL_REGEX.exec(content)) !== null) {
        const asin = match[2];
        const lineNumber = content.substring(0, match.index).split('\n').length;

        asins.push({
            asin,
            url: match[0],
            file: filePath,
            line: lineNumber,
            hasWWW: !!match[1]
        });
    }

    return asins;
}

/**
 * Recursively find all markdown files in directory
 */
function findMarkdownFiles(dir) {
    const files = [];

    if (!fs.existsSync(dir)) {
        return files;
    }

    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            files.push(...findMarkdownFiles(fullPath));
        } else if (item.endsWith('.md')) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Main execution
 */
function main() {
    console.log('🔍 Amazon ASIN Verification Report\n');
    console.log('='.repeat(80));
    console.log('\n');

    const allASINs = [];
    const uniqueASINs = new Set();
    const invalidURLs = [];

    // Process all content directories
    for (const contentDir of CONTENT_DIRS) {
        const markdownFiles = findMarkdownFiles(contentDir);

        for (const file of markdownFiles) {
            const content = fs.readFileSync(file, 'utf-8');
            const asins = extractASINs(content, file);

            for (const asinData of asins) {
                allASINs.push(asinData);
                uniqueASINs.add(asinData.asin);

                // Check for missing www.
                if (!asinData.hasWWW) {
                    invalidURLs.push(asinData);
                }
            }
        }
    }

    // Summary statistics
    console.log('📊 Summary\n');
    console.log(`Total Amazon links found: ${allASINs.length}`);
    console.log(`Unique ASINs: ${uniqueASINs.size}`);
    console.log(`Files with Amazon links: ${new Set(allASINs.map(a => a.file)).size}`);
    console.log(`Invalid URLs (missing www.): ${invalidURLs.length}`);
    console.log('\n');

    // Invalid URL warnings
    if (invalidURLs.length > 0) {
        console.log('⚠️  INVALID URL FORMAT DETECTED\n');
        console.log('The following URLs are missing "www." and may not work correctly:\n');

        for (const invalid of invalidURLs) {
            const relativePath = path.relative(process.cwd(), invalid.file);
            console.log(`❌ ${relativePath}:${invalid.line}`);
            console.log(`   ASIN: ${invalid.asin}`);
            console.log(`   Current: ${invalid.url}`);
            console.log(`   Should be: https://www.amazon.com/dp/${invalid.asin}?tag=trendytecht0a-20`);
            console.log('');
        }

        console.log('='.repeat(80));
        console.log('\n');
    }

    // ASIN verification checklist
    console.log('✅ ASIN Verification Checklist\n');
    console.log('Manually verify each ASIN by opening the URL in your browser:\n');

    const asinsByFile = {};
    for (const asinData of allASINs) {
        if (!asinsByFile[asinData.file]) {
            asinsByFile[asinData.file] = [];
        }
        asinsByFile[asinData.file].push(asinData);
    }

    for (const [file, asins] of Object.entries(asinsByFile)) {
        const relativePath = path.relative(process.cwd(), file);
        console.log(`\n📄 ${relativePath}`);
        console.log('-'.repeat(80));

        for (const asinData of asins) {
            console.log(`\n[ ] ASIN: ${asinData.asin}`);
            console.log(`    Line: ${asinData.line}`);
            console.log(`    Test URL: https://www.amazon.com/dp/${asinData.asin}`);
            console.log(`    Status: ___ (✅ Valid / ❌ Invalid / ⚠️  Unavailable)`);
        }
    }

    console.log('\n\n');
    console.log('='.repeat(80));
    console.log('\n📖 Next Steps:\n');
    console.log('1. Open each "Test URL" in your browser');
    console.log('2. Mark status as ✅ Valid, ❌ Invalid, or ⚠️  Unavailable');
    console.log('3. For invalid ASINs, find replacement products on Amazon');
    console.log('4. Update the markdown files with correct ASINs');
    console.log('5. Re-run this script to verify fixes\n');
    console.log('📚 See docs/ASIN_VERIFICATION_GUIDE.md for detailed instructions\n');
    console.log('='.repeat(80));
    console.log('\n');

    // Exit with error code if invalid URLs found
    if (invalidURLs.length > 0) {
        process.exit(1);
    }
}

// Run the script
main();
