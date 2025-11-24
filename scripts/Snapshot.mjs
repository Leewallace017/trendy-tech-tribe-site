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
  await page.goto("http://localhost:4321", {
    waitUntil: "networkidle0"
  });

  const homeFilePath = path.join(screenshotsDir, `homepage-${Date.now()}.png`);
  await page.screenshot({
    path: homeFilePath,
    fullPage: true
  });
  console.log("Saved homepage screenshot to:", homeFilePath);

  // Capture Rivian article (to verify image fix)
  await page.goto("http://localhost:4321/evs/rivian-production-cuts-2025", {
    waitUntil: "networkidle0"
  });

  const rivianFilePath = path.join(screenshotsDir, `rivian-article-${Date.now()}.png`);
  await page.screenshot({
    path: rivianFilePath,
    fullPage: true
  });
  console.log("Saved Rivian article screenshot to:", rivianFilePath);

  // Capture Meta article (to verify image fix)
  await page.goto("http://localhost:4321/tech/meta-avoids-breakup-antitrust-2025", {
    waitUntil: "networkidle0"
  });

  const metaFilePath = path.join(screenshotsDir, `meta-article-${Date.now()}.png`);
  await page.screenshot({
    path: metaFilePath,
    fullPage: true
  });
  console.log("Saved Meta article screenshot to:", metaFilePath);

  await browser.close();
}

main().catch(console.error);