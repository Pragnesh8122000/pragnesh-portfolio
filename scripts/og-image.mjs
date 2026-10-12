// Renders the social preview (public/og.png, 1200x630) and the iOS home-screen icon
// (public/apple-touch-icon.png, 180x180) from HTML so they match the site's palette.
// Usage: node scripts/og-image.mjs   (set CHROME_PATH if Playwright's browser is not installed)
import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

const favicon = await readFile('public/favicon.svg', 'utf8');

const og = `<!doctype html><html><head><style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #FAF5EE; color: #262329;
    font-family: Arial, Helvetica, sans-serif; padding: 72px 84px; display: flex; flex-direction: column;
    justify-content: space-between; position: relative; }
  .edge { position: absolute; right: -70px; top: 90px; width: 440px; height: 470px; border-radius: 10px;
    background: #F5BEB2; transform: rotate(-6deg); }
  .tab { position: absolute; right: 30px; top: 120px; width: 380px; border: 1px solid #DDD3C9; border-radius: 8px;
    background: #fff; box-shadow: 0 14px 22px rgba(38,35,41,.16); transform: rotate(-6deg); padding: 22px 26px; }
  .tab p { font-size: 15px; font-weight: 700; letter-spacing: .12em; color: #BD4935; }
  .tab b { display: block; margin-top: 14px; font-size: 64px; letter-spacing: -.04em; color: #BD4935; }
  .tab span { font-size: 18px; color: #526A7B; }
  .k { font-size: 22px; font-weight: 700; letter-spacing: .12em; color: #BD4935; position: relative; }
  h1 { font-size: 84px; line-height: 88px; letter-spacing: -.045em; position: relative; }
  h1 span { display: block; color: #BD4935; }
  .chips { display: flex; gap: 12px; position: relative; }
  .chips i { font-style: normal; font-size: 22px; font-weight: 700; padding: 6px 16px; border: 1px solid #DDD3C9;
    border-radius: 5px; background: #fff; }
</style></head><body>
  <div class="edge"></div>
  <div class="tab"><p>KAFKA LEAD PIPELINE</p><b>120K+</b><span>leads a day · Justdial</span></div>
  <p class="k">BACKEND ENGINEER · 3.5+ YEARS</p>
  <h1>Pragnesh<br/>Prajapati<span>Behind the API.</span></h1>
  <div class="chips"><i>Node.js</i><i>TypeScript</i><i>AWS</i><i>Kafka</i><i>Redis</i></div>
</body></html>`;

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(og);
await page.screenshot({ path: 'public/og.png' });

await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<body style="margin:0;background:#BD4935">${favicon.replace('<svg ', '<svg width="180" height="180" ')}</body>`);
await page.screenshot({ path: 'public/apple-touch-icon.png' });
await browser.close();
console.log('Wrote public/og.png and public/apple-touch-icon.png');
