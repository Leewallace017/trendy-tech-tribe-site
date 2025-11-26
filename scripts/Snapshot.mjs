import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

// Resolve project directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const browser = await puppeteer.launch();
const page = await browser.newPage();

// Create /screenshots folder inside your project
const screenshotsDir = path.join(__dirname, "../screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Function to enable dark mode (since site is dark mode only)
async function enableDarkMode() {
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await new Promise(resolve => setTimeout(resolve, 500));
}

// Capture homepage
await page.goto("http://localhost:4321", {
  waitUntil: "networkidle0"
});
await enableDarkMode();

const homeFilePath = path.join(screenshotsDir, `homepage-${Date.now()}.png`);
await page.screenshot({
  path: homeFilePath,
  fullPage: true
});
console.log("Saved homepage screenshot to:", homeFilePath);

// Capture a Category Page (AI)
await page.goto("http://localhost:4321/ai", {
  waitUntil: "networkidle0"
});
await enableDarkMode();

const categoryFilePath = path.join(screenshotsDir, `category-${Date.now()}.png`);
await page.screenshot({
  path: categoryFilePath,
  fullPage: true
});
console.log("Saved category screenshot to:", categoryFilePath);

// Capture an Article Page (Black Friday)
await page.goto("http://localhost:4321/picks/best-amazon-black-friday-tech-deals-2025", {
  waitUntil: "networkidle0"
});
await enableDarkMode();

const articleFilePath = path.join(screenshotsDir, `article-${Date.now()}.png`);
async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Create /screenshots folder inside your project
  const screenshotsDir = path.join(__dirname, "../screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Function to enable dark mode (since site is dark mode only)
  async function enableDarkMode() {
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Capture homepage
  await page.goto("http://localhost:4321", {
    waitUntil: "networkidle0"
  });
  await enableDarkMode();

  const homeFilePath = path.join(screenshotsDir, `homepage-${Date.now()}.png`);
  await page.screenshot({
    path: homeFilePath,
    fullPage: true
  });
  console.log("Saved homepage screenshot to:", homeFilePath);

  // Capture a Category Page (AI)
  await page.goto("http://localhost:4321/ai", {
    waitUntil: "networkidle0"
  });
  await enableDarkMode();

  const categoryFilePath = path.join(screenshotsDir, `category-${Date.now()}.png`);
  await page.screenshot({
    path: categoryFilePath,
    fullPage: true
  });
  console.log("Saved category screenshot to:", categoryFilePath);

  // Capture an Article Page (Black Friday)
  await page.goto("http://localhost:4321/picks/best-amazon-black-friday-tech-deals-2025", {
    waitUntil: "networkidle0"
  });
  await enableDarkMode();

  const articleFilePath = path.join(screenshotsDir, `article-${Date.now()}.png`);
  await page.screenshot({
    path: articleFilePath,
    fullPage: true
  });
  console.log("Saved article screenshot to:", articleFilePath);

  await browser.close();
}

main().catch(console.error);