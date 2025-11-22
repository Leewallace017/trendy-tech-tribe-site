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

  // Capture homepage
  await page.goto("http://localhost:4322", {
    waitUntil: "networkidle0"
  });

  const homeFilePath = path.join(screenshotsDir, `homepage-${Date.now()}.png`);
  await page.screenshot({
    path: homeFilePath,
    fullPage: true
  });
  console.log("Saved homepage screenshot to:", homeFilePath);

  // Capture an article page with hero image
  await page.goto("http://localhost:4322/tech/apple-vision-pro-spatial-personas", {
    waitUntil: "networkidle0"
  });

  const articleFilePath = path.join(screenshotsDir, `article-${Date.now()}.png`);
  await page.screenshot({
    path: articleFilePath,
    fullPage: true
  });
  console.log("Saved article screenshot to:", articleFilePath);

  // Capture a category page
  await page.goto("http://localhost:4322/ai", {
    waitUntil: "networkidle0"
  });

  const categoryFilePath = path.join(screenshotsDir, `category-${Date.now()}.png`);
  await page.screenshot({
    path: categoryFilePath,
    fullPage: true
  });
  console.log("Saved category screenshot to:", categoryFilePath);

  await browser.close();
}

main().catch(console.error);