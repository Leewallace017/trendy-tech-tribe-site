#!/usr/bin/env tsx
/**
 * Pre-Publish Validation Script
 *
 * Comprehensive check before publishing content.
 * Verifies: frontmatter, links, formatting, affiliate tags
 *
 * Usage: npm run pre-publish src/content/picks/article-name.md
 */

import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import {
  checkLinks,
  extractUrlsFromFrontmatter,
  extractAmazonLinksFromContent,
  validateAmazonAffiliateTags
} from '../src/utils/linkVerification';

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

async function validateArticle(filePath: string): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  console.log('🔍 Running pre-publish validation...\n');
  console.log(`File: ${filePath}\n`);
  console.log('='.repeat(60));

  // Read file
  const content = await readFile(filePath, 'utf-8');
  const { data: frontmatter, content: body } = matter(content);

  // Check required frontmatter fields
  console.log('\n1️⃣ Checking frontmatter...');
  const requiredFields = [
    'title',
    'date',
    'author',
    'category',
    'tags',
    'type',
    'summary',
    'seoTitle',
    'seoDescription',
    'image'
  ];

  requiredFields.forEach(field => {
    if (!frontmatter[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Validate specific fields
  if (frontmatter.author !== 'Trendy Tech Tribe Staff') {
    warnings.push(`Author should be "Trendy Tech Tribe Staff", got: "${frontmatter.author}"`);
  }

  if (frontmatter.seoTitle && frontmatter.seoTitle.length > 60) {
    warnings.push(`SEO title too long: ${frontmatter.seoTitle.length} chars (max 60)`);
  }

  if (frontmatter.seoDescription && frontmatter.seoDescription.length > 160) {
    warnings.push(`SEO description too long: ${frontmatter.seoDescription.length} chars (max 160)`);
  }

  if (!frontmatter.tags || frontmatter.tags.length < 3) {
    warnings.push('Should have at least 3 tags');
  }

  if (!frontmatter.sources || frontmatter.sources.length === 0) {
    errors.push('No sources provided (all articles need sources)');
  }

  console.log(errors.length === 0 && warnings.length === 0 ? '✅ Passed' : `⚠️  Found ${errors.length} errors, ${warnings.length} warnings`);

  // Check affiliate links (both frontmatter and body)
  console.log('\n2️⃣ Checking Amazon affiliate links...');

  const frontmatterAmazonLinks = extractUrlsFromFrontmatter(frontmatter)
    .filter(url => url.includes('amazon.com'));
  const bodyAmazonLinks = extractAmazonLinksFromContent(body);
  const allAmazonLinks = [...new Set([...frontmatterAmazonLinks, ...bodyAmazonLinks])];

  if (allAmazonLinks.length > 0) {
    const affiliateCheck = validateAmazonAffiliateTags(allAmazonLinks);

    if (affiliateCheck.missing.length > 0) {
      affiliateCheck.missing.forEach(url => {
        errors.push(`Amazon link missing affiliate tag: ${url}`);
      });
      console.log(`❌ ${affiliateCheck.missing.length} Amazon link(s) missing affiliate tag`);
    } else {
      console.log(`✅ All ${allAmazonLinks.length} Amazon link(s) have correct affiliate tag`);
    }
  } else {
    console.log('ℹ️  No Amazon links found');
  }

  // Verify all links
  console.log('\n3️⃣ Verifying all links (this may take a moment)...');
  const urls = extractUrlsFromFrontmatter(frontmatter);

  if (urls.length === 0) {
    warnings.push('No links found to verify');
    console.log('⚠️  No links to verify');
  } else {
    const results = await checkLinks(urls);
    const broken = results.filter(r => r.status !== 'valid');

    if (broken.length > 0) {
      broken.forEach(link => {
        errors.push(`Broken link: ${link.url} (${link.status}${link.statusCode ? `: ${link.statusCode}` : ''})`);
      });
      console.log(`❌ ${broken.length} broken link(s) found`);
    } else {
      console.log(`✅ All ${urls.length} link(s) verified`);
    }
  }

  // Check content structure
  console.log('\n4️⃣ Checking content structure...');
  let structureIssues = 0;

  if (body.length < 500) {
    warnings.push('Article seems very short (less than 500 characters)');
    structureIssues++;
  }

  if (!body.includes('## ')) {
    warnings.push('No H2 headings found (## Heading)');
    structureIssues++;
  }

  if (!body.includes('## Sources') && (!frontmatter.sources || frontmatter.sources.length === 0)) {
    warnings.push('No sources section found in content');
    structureIssues++;
  }

  console.log(structureIssues === 0 ? '✅ Structure looks good' : `⚠️  ${structureIssues} structural issue(s)`);

  return {
    passed: errors.length === 0,
    errors,
    warnings
  };
}

async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('❌ Error: No file path provided\n');
    console.log('Usage: npm run pre-publish <path-to-article>\n');
    console.log('Example:');
    console.log('  npm run pre-publish src/content/picks/best-wireless-earbuds-under-100-2025.md\n');
    process.exit(1);
  }

  const result = await validateArticle(filePath);

  console.log('\n' + '='.repeat(60));
  console.log('\n📊 VALIDATION SUMMARY\n');
  console.log('='.repeat(60));

  if (result.errors.length > 0) {
    console.log('\n❌ ERRORS (must fix):\n');
    result.errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error}`);
    });
  }

  if (result.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS (should fix):\n');
    result.warnings.forEach((warning, index) => {
      console.log(`  ${index + 1}. ${warning}`);
    });
  }

  console.log('\n' + '='.repeat(60));

  if (result.passed && result.warnings.length === 0) {
    console.log('✅ ALL CHECKS PASSED - READY TO PUBLISH');
    console.log('='.repeat(60) + '\n');
    process.exit(0);
  } else if (result.passed) {
    console.log('⚠️  PASSED WITH WARNINGS - Review before publishing');
    console.log('='.repeat(60) + '\n');
    process.exit(0);
  } else {
    console.log('❌ VALIDATION FAILED - Fix errors before publishing');
    console.log('='.repeat(60) + '\n');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Error running validation:', error.message);
  process.exit(1);
});
