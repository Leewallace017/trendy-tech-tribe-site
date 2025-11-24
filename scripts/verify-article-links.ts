#!/usr/bin/env tsx
/**
 * Single Article Link Verification Script
 *
 * Checks all links in a specific article file.
 * Usage: npm run verify-article src/content/picks/article-name.md
 */

import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import {
  checkLinks,
  extractUrlsFromFrontmatter,
  extractAmazonLinksFromContent,
  validateAmazonAffiliateTags
} from '../src/utils/linkVerification';

async function verifyArticle(filePath: string) {
  console.log('🔍 Verifying links in article...\n');
  console.log(`File: ${filePath}\n`);
  console.log('='.repeat(60));

  const fileContent = await readFile(filePath, 'utf-8');
  const { data: frontmatter, content: body } = matter(fileContent);

  // Check affiliate tags first
  console.log('\n🏷️  Checking Amazon affiliate tags...\n');

  const frontmatterAmazonLinks = extractUrlsFromFrontmatter(frontmatter)
    .filter(url => url.includes('amazon.com'));
  const bodyAmazonLinks = extractAmazonLinksFromContent(body);
  const allAmazonLinks = [...new Set([...frontmatterAmazonLinks, ...bodyAmazonLinks])];

  if (allAmazonLinks.length > 0) {
    const affiliateCheck = validateAmazonAffiliateTags(allAmazonLinks);

    console.log(`Found ${allAmazonLinks.length} Amazon link(s):\n`);

    if (affiliateCheck.valid.length > 0) {
      console.log(`✅ ${affiliateCheck.valid.length} link(s) with correct tag (trendytecht0a-20)`);
    }

    if (affiliateCheck.missing.length > 0) {
      console.log(`❌ ${affiliateCheck.missing.length} link(s) MISSING affiliate tag:\n`);
      affiliateCheck.missing.forEach(url => {
        console.log(`   ${url}`);
      });
      console.log('\n⚠️  All Amazon links MUST include ?tag=trendytecht0a-20\n');
    }
  } else {
    console.log('No Amazon links found\n');
  }

  console.log('-'.repeat(60));

  const urls = extractUrlsFromFrontmatter(frontmatter);

  if (urls.length === 0) {
    console.log('\n⚠️  No links found in article frontmatter');
    console.log('\nMake sure your article includes:');
    console.log('  - affiliateProducts (if applicable)');
    console.log('  - sources (required for all articles)');
    console.log('='.repeat(60) + '\n');
    process.exit(1);
  }

  console.log(`\nFound ${urls.length} link(s) to verify:\n`);

  // Show what we're checking
  urls.forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });

  console.log('\n' + '-'.repeat(60));
  console.log('Checking links (this may take a moment)...\n');

  const results = await checkLinks(urls);

  // Print detailed results
  const valid = results.filter(r => r.status === 'valid');
  const broken = results.filter(r => r.status !== 'valid');

  console.log('RESULTS:\n');

  results.forEach((result, index) => {
    const icon = result.status === 'valid' ? '✅' : '❌';
    const shortUrl = result.url.length > 70 ? result.url.substring(0, 67) + '...' : result.url;

    console.log(`${icon} ${shortUrl}`);

    if (result.status !== 'valid') {
      console.log(`   Status: ${result.status}`);
      if (result.statusCode) console.log(`   HTTP Code: ${result.statusCode}`);
      if (result.error) console.log(`   Error: ${result.error}`);
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log('\n📊 SUMMARY:\n');

  console.log(`Total links: ${urls.length}`);
  console.log(`Valid: ${valid.length} ✅`);
  console.log(`Broken: ${broken.length} ❌`);

  if (allAmazonLinks.length > 0) {
    const summaryAffiliateCheck = validateAmazonAffiliateTags(allAmazonLinks);
    console.log(`\nAmazon links: ${allAmazonLinks.length} total`);
    console.log(`  With affiliate tag: ${summaryAffiliateCheck.valid.length} ✅`);
    console.log(`  Missing affiliate tag: ${summaryAffiliateCheck.missing.length} ❌`);
  }

  const finalAffiliateCheck = validateAmazonAffiliateTags(allAmazonLinks);

  if (broken.length > 0 || finalAffiliateCheck.missing.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('⚠️  ACTION REQUIRED\n');
    console.log('The following links are broken and must be fixed:\n');

    if (broken.length > 0) {
      console.log('BROKEN LINKS:\n');
      broken.forEach(link => {
        console.log(`  ❌ ${link.url}`);
        if (link.statusCode === 404) {
          console.log('     → Link not found (404). Verify the URL is correct.');
        } else if (link.error?.includes('timeout')) {
          console.log('     → Timeout. The site may be slow or blocking requests.');
        } else if (link.status === 'error') {
          console.log(`     → ${link.error}`);
        }
      });
    }

    if (finalAffiliateCheck.missing.length > 0) {
      console.log('\nAMAZON LINKS MISSING AFFILIATE TAG:\n');
      finalAffiliateCheck.missing.forEach(url => {
        console.log(`  ❌ ${url}`);
        console.log(`     → Add ?tag=trendytecht0a-20`);
      });
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n🔧 RECOMMENDATIONS:\n');
    console.log('1. Add ?tag=trendytecht0a-20 to ALL Amazon links');
    console.log('2. Verify Amazon ASINs are correct product IDs');
    console.log('3. Check that source URLs are real, published articles');
    console.log('4. Use WebSearch to find correct URLs for sources');
    console.log('5. Never make up or guess URLs - always verify they exist');
    console.log('6. Re-run this script after fixing links\n');
    console.log('='.repeat(60) + '\n');

    process.exit(1);
  } else {
    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL LINKS VERIFIED - READY TO PUBLISH');
    console.log('='.repeat(60) + '\n');
    process.exit(0);
  }
}

const filePath = process.argv[2];

if (!filePath) {
  console.error('❌ Error: No file path provided\n');
  console.log('Usage: npm run verify-article <path-to-article>\n');
  console.log('Example:');
  console.log('  npm run verify-article src/content/picks/best-wireless-earbuds-under-100-2025.md\n');
  process.exit(1);
}

verifyArticle(filePath).catch(error => {
  console.error('❌ Error verifying article:', error.message);
  process.exit(1);
});
