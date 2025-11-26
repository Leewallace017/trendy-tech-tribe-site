import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

// Configuration
const CONTENT_DIR = 'src/content';
const TIMEOUT_MS = 5000;
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
};

async function verifyLinks() {
    console.log(`${colors.blue}Starting link verification...${colors.reset}\n`);

    const files = await glob(`${CONTENT_DIR}/**/*.md`);
    let totalLinks = 0;
    let brokenLinks = 0;
    let warningLinks = 0;

    for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');
        const links = extractLinks(content);

        if (links.length === 0) continue;

        console.log(`Checking ${path.basename(file)} (${links.length} links)`);

        for (const link of links) {
            totalLinks++;
            const status = await checkLink(link.url);

            if (status.type === 'error') {
                console.log(`  ${colors.red}✖ ${status.code} - ${link.url}${colors.reset}`);
                brokenLinks++;
            } else if (status.type === 'warning') {
                console.log(`  ${colors.yellow}⚠ ${status.code} - ${link.url} (${status.message})${colors.reset}`);
                warningLinks++;
            } else {
                // console.log(`  ${colors.green}✔ ${link.url}${colors.reset}`);
            }
        }
    }

    console.log(`\n${colors.blue}Verification complete.${colors.reset}`);
    console.log(`Total links checked: ${totalLinks}`);
    console.log(`Broken links: ${brokenLinks}`);
    console.log(`Warnings: ${warningLinks}`);
}

function extractLinks(content) {
    const regex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
    const links = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        links.push({
            text: match[1],
            url: match[2]
        });
    }
    return links;
}

async function checkLink(url) {
    // Skip localhost links
    if (url.includes('localhost')) {
        return { type: 'success', code: 200 };
    }

    // Handle Amazon links (often block bots, so treat 403/503 as warnings or assume valid if format looks ok)
    const isAmazon = url.includes('amazon.com') || url.includes('amzn.to');

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

        const response = await fetch(url, {
            method: 'HEAD', // Try HEAD first
            headers: { 'User-Agent': USER_AGENT },
            signal: controller.signal
        });

        clearTimeout(timeout);

        if (response.ok) {
            return { type: 'success', code: response.status };
        } else if (response.status === 405 || response.status === 403) {
            // Some sites block HEAD or bots, try GET
            const controllerGet = new AbortController();
            const timeoutGet = setTimeout(() => controllerGet.abort(), TIMEOUT_MS);

            const responseGet = await fetch(url, {
                method: 'GET',
                headers: { 'User-Agent': USER_AGENT },
                signal: controllerGet.signal
            });
            clearTimeout(timeoutGet);

            if (responseGet.ok) {
                return { type: 'success', code: responseGet.status };
            }
            // If Amazon returns 403/503, it's likely bot protection, not a broken link
            if (isAmazon && (responseGet.status === 403 || responseGet.status === 503)) {
                return { type: 'warning', code: responseGet.status, message: 'Amazon bot protection likely' };
            }

            return { type: 'error', code: responseGet.status };
        } else {
            if (isAmazon && (response.status === 503)) {
                return { type: 'warning', code: response.status, message: 'Amazon bot protection likely' };
            }
            return { type: 'error', code: response.status };
        }

    } catch (error) {
        if (error.name === 'AbortError') {
            return { type: 'warning', code: 'TIMEOUT', message: 'Request timed out' };
        }
        // Network errors
        return { type: 'error', code: 'ERR', message: error.message };
    }
}

verifyLinks().catch(console.error);
