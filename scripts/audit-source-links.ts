#!/usr/bin/env tsx
/**
 * Source Links Audit Script
 *
 * Specifically checks source links (not affiliate products) across all articles
 * Usage: npm run audit-sources
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { checkLinks } from '../src/utils/linkVerification';

interface SourceAuditResult {
  file: string;
  totalSources: number;
  brokenSources: number;
  brokenUrls: Array<{ title: string; url: string; error: string }>;
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

async function auditSourceLinks(filePath: string): Promise<SourceAuditResult> {
  const content = await readFile(filePath, 'utf-8');
  const { data: frontmatter } = matter(content);

  const sources = frontmatter.sources || [];

  if (sources.length === 0) {
    return {
      file: filePath,
      totalSources: 0,
      brokenSources: 0,
      brokenUrls: []
    };
  }

  const sourceUrls = sources.map((s: any) => s.url);

  console.log(`\nChecking ${sources.length} source(s) in ${filePath.split('/').pop()}...`);

  const results = await checkLinks(sourceUrls);
  const broken = results.filter(r => r.status !== 'valid');

  const brokenWithTitles = broken.map(b => {
    const source = sources.find((s: any) => s.url === b.url);
    return {
      title: source?.title || 'Unknown',
      url: b.url,
      error: b.statusCode ? `${b.status} (${b.statusCode})` : `${b.status}: ${b.error}`
    };
  });

  if (broken.length > 0) {
    console.log(`❌ ${broken.length} broken source(s)`);
    brokenWithTitles.forEach(b => {
      console.log(`   "${b.title}"`);
      console.log(`   ${b.url}`);
      console.log(`   Error: ${b.error}`);
    });
  } else {
    console.log(`✅ All sources valid`);
  }

  return {
    file: filePath,
    totalSources: sources.length,
    brokenSources: broken.length,
    brokenUrls: brokenWithTitles
  };
}

async function main() {
  console.log('🔍 Starting source links audit...\n');
  console.log('='.repeat(60));

  const contentDir = join(process.cwd(), 'src/content');
  const files = await getAllContentFiles(contentDir);

  console.log(`\nFound ${files.length} article(s) to check\n`);

  const results: SourceAuditResult[] = [];

  for (const file of files) {
    const result = await auditSourceLinks(file);
    results.push(result);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 SOURCE LINKS AUDIT SUMMARY\n');
  console.log('='.repeat(60));

  const totalArticles = results.length;
  const articlesWithSources = results.filter(r => r.totalSources > 0);
  const articlesWithoutSources = results.filter(r => r.totalSources === 0);
  const articlesWithBrokenSources = results.filter(r => r.brokenSources > 0);
  const totalSources = results.reduce((sum, r) => sum + r.totalSources, 0);
  const totalBroken = results.reduce((sum, r) => sum + r.brokenSources, 0);

  console.log(`\nTotal articles: ${totalArticles}`);
  console.log(`Articles with sources: ${articlesWithSources.length}`);
  console.log(`Articles WITHOUT sources: ${articlesWithoutSources.length} ⚠️`);
  console.log(`\nTotal source links: ${totalSources}`);
  console.log(`Broken source links: ${totalBroken}`);
  console.log(`Articles with broken sources: ${articlesWithBrokenSources.length}`);

  if (articlesWithoutSources.length > 0) {
    console.log('\n⚠️  ARTICLES MISSING SOURCES:\n');
    articlesWithoutSources.forEach(article => {
      console.log(`  - ${article.file.split('/').slice(-2).join('/')}`);
    });
  }

  if (articlesWithBrokenSources.length > 0) {
    console.log('\n❌ ARTICLES WITH BROKEN SOURCE LINKS:\n');
    articlesWithBrokenSources.forEach(article => {
      console.log(`\n${article.file.split('/').slice(-2).join('/')}`);
      console.log(`  ${article.brokenSources} broken source(s):\n`);

      article.brokenUrls.forEach(broken => {
        console.log(`  📰 "${broken.title}"`);
        console.log(`     URL: ${broken.url}`);
        console.log(`     Error: ${broken.error}\n`);
      });
    });

    console.log('='.repeat(60));
    console.log('\n🔧 HOW TO FIX BROKEN SOURCE LINKS:\n');
    console.log('1. Use WebSearch to find the correct URL for each source');
    console.log('2. Update frontmatter with real, working URLs');
    console.log('3. Never guess or make up source URLs');
    console.log('4. Verify URL works in browser before adding');
    console.log('5. Re-run this audit after fixing\n');
    console.log('='.repeat(60) + '\n');

    process.exit(1);
  } else {
    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL SOURCE LINKS VALID');
    console.log('='.repeat(60) + '\n');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Error running source audit:', error);
  process.exit(1);
});
