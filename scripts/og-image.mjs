// Renders the social preview (public/og.png, 1200x630) and the iOS home-screen icon
// (public/apple-touch-icon.png, 180x180) from HTML so they match the site's palette.
// Usage: node scripts/og-image.mjs   (set CHROME_PATH if Playwright's browser is not installed)
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

const favicon = await readFile('public/favicon.svg', 'utf8');

const font = await readFile(
  'node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2'
);

const og = `<!doctype html><html><head><style>
  @font-face { font-family: Bricolage; font-weight: 200 800;
    src: url(data:font/woff2;base64,${font.toString('base64')}) format('woff2'); }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #11131A; color: #ECEEF3;
    font-family: Bricolage, Arial, sans-serif; padding: 72px 84px; display: flex; flex-direction: column;
    justify-content: space-between; position: relative; }
  .rail { position: absolute; right: 96px; top: 0; bottom: 0; width: 4px; background: #FFD02B; }
  .packet { position: absolute; right: 86px; top: 286px; width: 24px; height: 24px; border-radius: 6px;
    background: #FFD02B; box-shadow: 0 0 0 5px #11131A, 0 0 40px 6px rgba(255,208,43,.35); }
  .tab { position: absolute; right: 98px; top: 150px; width: 400px; border: 1px solid #363B4B; border-radius: 12px;
    background: #1A1D27; box-shadow: 0 16px 24px rgba(0,0,0,.4); transform: rotate(-4deg); transform-origin: right center;
    padding: 22px 26px; }
  .tab p { font-size: 18px; font-weight: 600; color: #A0A8B8; }
  .tab b { display: block; margin-top: 10px; font-size: 68px; line-height: 72px; letter-spacing: -.04em; }
  .tab span { font-size: 18px; color: #A0A8B8; }
  .k { font-size: 24px; font-weight: 600; color: #A0A8B8; position: relative; }
  h1 { font-size: 88px; line-height: 86px; font-weight: 700; letter-spacing: -.04em; position: relative; }
  .chips { display: flex; gap: 12px; position: relative; }
  .chips i { font-style: normal; font-size: 22px; font-weight: 600; padding: 6px 16px; border: 1px solid #363B4B;
    border-radius: 6px; background: #232735; }
</style></head><body>
  <div class="rail"></div>
  <div class="tab"><p>Kafka lead pipeline</p><b>120K+</b><span>leads a day · Justdial</span></div>
  <div class="packet"></div>
  <p class="k">Backend engineer, 3.5+ years</p>
  <h1>Pragnesh<br/>Prajapati</h1>
  <div class="chips"><i>Node.js</i><i>TypeScript</i><i>AWS</i><i>Kafka</i><i>Redis</i></div>
</body></html>`;

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });

await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<body style="margin:0;background:#14161C">${favicon.replace('<svg ', '<svg width="180" height="180" ')}</body>`);
await page.screenshot({ path: 'public/apple-touch-icon.png' });
await browser.close();
console.log('Wrote public/og.png and public/apple-touch-icon.png');
