#!/usr/bin/env tsx
/**
 * Unified Link Verification Script
 *
 * Verifies links in markdown content files.
 *
 * Usage:
 *   npm run verify-links                  # Verify ALL content files
 *   npm run verify-links src/path/to/doc.md  # Verify specific file
 */

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import {
    checkLinks,
    extractUrlsFromFrontmatter,
    extractAmazonLinksFromContent,
    validateAmazonAffiliateTags
} from '../src/utils/linkVerification';

interface ArticleResult {
    file: string;
    totalLinks: number;
    brokenLinks: number;
    urls: string[];
    amazonLinks: string[];
    missingAffiliateTags: string[];
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

async function verifyArticleLinks(filePath: string, verbose = false): Promise<ArticleResult> {
    const content = await readFile(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(content);

    // Extract all links
    const frontmatterUrls = extractUrlsFromFrontmatter(frontmatter);
    const frontmatterAmazonLinks = frontmatterUrls.filter(url => url.includes('amazon.com'));
    const bodyAmazonLinks = extractAmazonLinksFromContent(body);
    const allAmazonLinks = [...new Set([...frontmatterAmazonLinks, ...bodyAmazonLinks])];

    // Check affiliate tags
    const affiliateCheck = validateAmazonAffiliateTags(allAmazonLinks);

    if (verbose) {
        console.log(`\nChecking ${filePath.split('/').pop()}...`);
        if (allAmazonLinks.length > 0) {
            console.log(`  Found ${allAmazonLinks.length} Amazon link(s)`);
            if (affiliateCheck.missing.length > 0) {
                console.log(`  ❌ ${affiliateCheck.missing.length} missing affiliate tags`);
            }
        }
    }

    // Verify all URLs (including non-Amazon)
    const allUrls = frontmatterUrls; // Add body links if needed in future

    if (allUrls.length === 0) {
        if (verbose) console.log('  ⚠️  No links found to verify');
        return {
            file: filePath,
            totalLinks: 0,
            brokenLinks: 0,
            urls: [],
            amazonLinks: [],
            missingAffiliateTags: []
        };
    }

    const results = await checkLinks(allUrls);
    const broken = results.filter(r => r.status !== 'valid');

    if (verbose) {
        if (broken.length > 0) {
            console.log(`  ❌ ${broken.length} broken link(s)`);
            broken.forEach(link => {
                console.log(`     ${link.url} (${link.status})`);
            });
        } else {
            console.log(`  ✅ All ${allUrls.length} links valid`);
        }
    }

    return {
        file: filePath,
        totalLinks: allUrls.length,
        brokenLinks: broken.length,
        urls: broken.map(b => b.url),
        amazonLinks: allAmazonLinks,
        missingAffiliateTags: affiliateCheck.missing
    };
}

async function main() {
    const targetArg = process.argv[2];
    const isSingleFile = !!targetArg;

    console.log(`🔍 Starting link verification (${isSingleFile ? 'Single File' : 'All Files'})...\n`);
    console.log('='.repeat(60));

    let filesToCheck: string[] = [];

    if (isSingleFile) {
        filesToCheck = [targetArg];
    } else {
        const contentDir = join(process.cwd(), 'src/content');
        filesToCheck = await getAllContentFiles(contentDir);
    }

    console.log(`Found ${filesToCheck.length} file(s) to check\n`);

    const results: ArticleResult[] = [];

    for (const file of filesToCheck) {
        try {
            const result = await verifyArticleLinks(file, true);
            results.push(result);
        } catch (error) {
            console.error(`Error checking ${file}:`, error);
        }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('\n📊 SUMMARY REPORT\n');
    console.log('='.repeat(60));

    const totalLinks = results.reduce((sum, r) => sum + r.totalLinks, 0);
    const totalBroken = results.reduce((sum, r) => sum + r.brokenLinks, 0);
    const totalMissingTags = results.reduce((sum, r) => sum + r.missingAffiliateTags.length, 0);

    const articlesWithIssues = results.filter(r => r.brokenLinks > 0 || r.missingAffiliateTags.length > 0);

    console.log(`Total files: ${results.length}`);
    console.log(`Total links: ${totalLinks}`);
    console.log(`Broken links: ${totalBroken} ${totalBroken > 0 ? '❌' : '✅'}`);
    console.log(`Missing tags: ${totalMissingTags} ${totalMissingTags > 0 ? '❌' : '✅'}`);

    if (articlesWithIssues.length > 0) {
        console.log('\n❌ ISSUES FOUND:\n');
        articlesWithIssues.forEach(article => {
            console.log(`\n📄 ${article.file.split('/').slice(-2).join('/')}`);

            if (article.brokenLinks > 0) {
                console.log(`  Broken Links:`);
                article.urls.forEach(url => console.log(`    ❌ ${url}`));
            }

            if (article.missingAffiliateTags.length > 0) {
                console.log(`  Missing Affiliate Tags:`);
                article.missingAffiliateTags.forEach(url => console.log(`    🏷️  ${url}`));
            }
        });

        console.log('\n' + '='.repeat(60));
        console.log('⚠️  ACTION REQUIRED: Fix issues before publishing');
        process.exit(1);
    } else {
        console.log('\n' + '='.repeat(60));
        console.log('✅ ALL CHECKS PASSED');
        process.exit(0);
    }
}

main().catch(console.error);
