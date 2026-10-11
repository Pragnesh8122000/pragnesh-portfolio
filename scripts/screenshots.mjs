// Captures hero and full-page screenshots in both themes and reports layout problems.
// Usage: npm run build && npx vite preview --port 4173 & node scripts/screenshots.mjs
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const base = process.env.BASE_URL ?? 'http://localhost:4173/';
const out = process.env.OUT_DIR ?? 'screenshots';
const widths = (process.env.WIDTHS ?? '1440,440').split(',').map(Number);
const themes = ['dark', 'light'];

await mkdir(out, { recursive: true });
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
let problems = 0;

for (const width of widths) {
  for (const theme of themes) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme });
    const page = await context.newPage();
    const errors = [];
    page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const applied = await page.evaluate(() => document.documentElement.dataset.theme);
    if (overflow > 0 || applied !== theme || errors.length) {
      problems++;
      console.log(`${width} ${theme}: overflow=${overflow}px theme=${applied} errors=${JSON.stringify(errors)}`);
    }

    await page.screenshot({ path: `${out}/hero-${width}-${theme}.png` });
    // Scroll through once so scroll-driven states settle, then capture the whole page from the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${out}/full-${width}-${theme}.png`, fullPage: true });
    await context.close();
  }
}

await browser.close();
console.log(problems ? `${problems} viewport/theme combination(s) had problems` : 'No overflow, theme or console problems');
process.exitCode = problems ? 1 : 0;
