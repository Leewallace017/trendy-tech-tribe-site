#!/usr/bin/env tsx
/**
 * Link Verification Script
 *
 * Checks all links in all content files and reports broken links.
 * Run with: npm run verify-links
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { checkLinks, printLinkReport, extractUrlsFromFrontmatter } from '../src/utils/linkVerification';

interface ArticleResult {
  file: string;
  totalLinks: number;
  brokenLinks: number;
  urls: string[];
}

async function getAllContentFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const subFiles = await getAllContentFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function verifyArticleLinks(filePath: string): Promise<ArticleResult> {
  const content = await readFile(filePath, 'utf-8');
  const { data: frontmatter } = matter(content);

  const urls = extractUrlsFromFrontmatter(frontmatter);

  if (urls.length === 0) {
    return {
      file: filePath,
      totalLinks: 0,
      brokenLinks: 0,
      urls: []
    };
  }

  console.log(`\nChecking ${urls.length} links in ${filePath.split('/').pop()}...`);

  const results = await checkLinks(urls);
  const broken = results.filter(r => r.status !== 'valid');

  if (broken.length > 0) {
    console.log(`❌ Found ${broken.length} broken link(s):`);
    broken.forEach(link => {
      console.log(`   ${link.url}`);
      console.log(`   Status: ${link.status} ${link.statusCode ? `(${link.statusCode})` : ''}`);
      if (link.error) console.log(`   Error: ${link.error}`);
    });
  } else {
    console.log(`✅ All links valid`);
  }

  return {
    file: filePath,
    totalLinks: urls.length,
    brokenLinks: broken.length,
    urls: broken.map(b => b.url)
  };
}

async function main() {
  console.log('🔍 Starting link verification for all content files...\n');
  console.log('='.repeat(60));

  const contentDir = join(process.cwd(), 'src/content');
  const files = await getAllContentFiles(contentDir);

  console.log(`\nFound ${files.length} content file(s) to check\n`);

  const results: ArticleResult[] = [];

  for (const file of files) {
    const result = await verifyArticleLinks(file);
    results.push(result);
  }

  // Summary report
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 SUMMARY REPORT\n');
  console.log('='.repeat(60));

  const totalArticles = results.length;
  const totalLinks = results.reduce((sum, r) => sum + r.totalLinks, 0);
  const totalBroken = results.reduce((sum, r) => sum + r.brokenLinks, 0);
  const articlesWithBroken = results.filter(r => r.brokenLinks > 0);

  console.log(`\nTotal articles checked: ${totalArticles}`);
  console.log(`Total links checked: ${totalLinks}`);
  console.log(`Total broken links: ${totalBroken}`);
  console.log(`Articles with broken links: ${articlesWithBroken.length}`);

  if (articlesWithBroken.length > 0) {
    console.log('\n❌ FILES WITH BROKEN LINKS:\n');
    articlesWithBroken.forEach(article => {
      console.log(`\n${article.file.split('/').slice(-2).join('/')}`);
      console.log(`  Broken links (${article.brokenLinks}):`);
      article.urls.forEach(url => {
        console.log(`    - ${url}`);
      });
    });

    console.log('\n' + '='.repeat(60));
    console.log('⚠️  ACTION REQUIRED: Fix broken links before publishing');
    console.log('='.repeat(60) + '\n');

    process.exit(1);
  } else {
    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL LINKS VERIFIED - READY TO PUBLISH');
    console.log('='.repeat(60) + '\n');

    process.exit(0);
  }
}

main().catch(error => {
  console.error('Error running link verification:', error);
  process.exit(1);
});
