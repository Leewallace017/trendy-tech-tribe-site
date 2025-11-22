import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

// Resolve project directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Create /screenshots folder inside your project
  const screenshotsDir = path.join(__dirname, "screenshots");
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Function to enable dark mode
  async function enableDarkMode() {
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Capture homepage in dark mode
  await page.goto("http://localhost:4322", {
    waitUntil: "networkidle0"
  });
  await enableDarkMode();

  const homeFilePath = path.join(screenshotsDir, `homepage-dark-${Date.now()}.png`);
  await page.screenshot({
    path: homeFilePath,
    fullPage: true
  });
  console.log("Saved dark mode homepage screenshot to:", homeFilePath);

  // Capture an article page with hero image in dark mode
  await page.goto("http://localhost:4322/tech/apple-vision-pro-spatial-personas", {
    waitUntil: "networkidle0"
  });
  await enableDarkMode();

  const articleFilePath = path.join(screenshotsDir, `article-dark-${Date.now()}.png`);
  await page.screenshot({
    path: articleFilePath,
    fullPage: true
  });
  console.log("Saved dark mode article screenshot to:", articleFilePath);

  // Capture a category page in dark mode
  await page.goto("http://localhost:4322/ai", {
    waitUntil: "networkidle0"
  });
  await enableDarkMode();

  const categoryFilePath = path.join(screenshotsDir, `category-dark-${Date.now()}.png`);
  await page.screenshot({
    path: categoryFilePath,
    fullPage: true
  });
  console.log("Saved dark mode category screenshot to:", categoryFilePath);

  await browser.close();
}

main().catch(console.error);
