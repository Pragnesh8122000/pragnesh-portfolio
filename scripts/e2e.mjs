// Browser checks against a running preview: navigation, focus, mobile layout, hydration, theme and motion.
// Usage: npm run build && npx vite preview --port 4173 & npm run e2e
// Set BASE_URL for another host and CHROME_PATH to use a specific browser.
import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://localhost:4173/';
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const results = [];
const check = (name, ok, extra = '') => results.push({ ok, line: `${ok ? 'PASS' : 'FAIL'} ${name}${ok ? '' : ` ${extra}`}` });

const viewports = [
  { w: 1440, h: 900, theme: 'dark' },
  { w: 768, h: 1024, theme: 'light' },
  { w: 390, h: 844, theme: 'dark' },
  { w: 320, h: 640, theme: 'light' }
];

for (const { w, h, theme } of viewports) {
  const context = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: theme, hasTouch: w < 768 });
  const page = await context.newPage();
  const problems = [];
  page.on('console', (m) => ['error', 'warning'].includes(m.type()) && problems.push(m.text()));
  page.on('pageerror', (e) => problems.push(e.message));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Index jump lands on its target, marks it active, updates the hash and moves focus.
  await page.click('.flow-index-link[href="#data"]');
  await page.waitForTimeout(1400);
  const jump = await page.evaluate(() => {
    const index = document.querySelector('[data-flow-index]').getBoundingClientRect();
    const target = document.getElementById('data').getBoundingClientRect();
    const current = document.querySelector('.flow-index-link[aria-current]');
    const marker = document.querySelector('.flow-index-marker').getBoundingClientRect();
    const box = current?.getBoundingClientRect();
    return {
      gap: Math.round(target.top - index.bottom),
      current: current?.getAttribute('href'),
      hash: location.hash,
      focus: document.activeElement?.id,
      markerOnEntry: !!box && Math.abs(marker.left - box.left) < 2 && Math.abs(marker.width - box.width) < 2,
      entryVisible: !!box && box.left >= 0 && box.right <= innerWidth
    };
  });
  check(
    `${w}px index jump`,
    jump.gap >= 0 && jump.gap < 40 && jump.current === '#data' && jump.hash === '#data' && jump.focus === 'data' && jump.markerOnEntry && jump.entryVisible,
    JSON.stringify(jump)
  );

  // Case studies belong to no index entry, so nothing should stay lit while reading them.
  await page.evaluate(() => document.getElementById('case-kafka').scrollIntoView());
  await page.waitForTimeout(900);
  check(`${w}px index clears in case studies`, (await page.locator('.flow-index-link[aria-current]').count()) === 0);

  if (w < 768) {
    const toggle = page.locator('#data .card-toggle');
    await page.evaluate(() => document.getElementById('data').scrollIntoView());
    await toggle.click();
    check(`${w}px work row toggle`, (await toggle.getAttribute('aria-expanded')) === 'true' && (await page.locator('#data .card-more').isVisible()));
    await page.evaluate(() => document.getElementById('projects').scrollIntoView());
    await page.waitForTimeout(900);
    const last = await page.evaluate(() => {
      const c = document.querySelector('.flow-index-link[aria-current]');
      const r = c?.getBoundingClientRect();
      return { href: c?.getAttribute('href'), visible: !!r && r.left >= 0 && r.right <= innerWidth };
    });
    check(`${w}px index follows scroll to last entry`, last.href === '#projects' && last.visible, JSON.stringify(last));
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(3500);
    await page.click('.flow-tab[href="#events"]');
    await page.waitForTimeout(1200);
    check(`${w}px hero stage jump`, await page.evaluate(() => document.querySelector('.flow-index-link[aria-current]')?.getAttribute('href') === '#events'));
  }

  // Keyboard: the first Tab reaches the skip link and Enter moves focus into <main>.
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.keyboard.press('Tab');
  const skip = await page.evaluate(() => document.activeElement?.textContent);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  check(`${w}px skip link`, skip === 'Skip to content' && (await page.evaluate(() => document.activeElement?.id === 'main')), String(skip));

  const small = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a, button'))
      .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 43.5; })
      .map((el) => `${el.textContent.trim().slice(0, 24)}:${Math.round(el.getBoundingClientRect().height)}`)
  );
  check(`${w}px tap targets are 44px or taller`, small.length === 0, small.join(' | '));

  await page.click('button[aria-label^="Switch to"]');
  check(`${w}px theme toggle`, await page.evaluate((t) => document.documentElement.dataset.theme !== t, theme));

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  check(`${w}px no horizontal overflow, console errors or hydration warnings`, overflow <= 0 && problems.length === 0, `${overflow}px ${problems.join(' ; ')}`);
  await context.close();
}

// Reduced motion: no trace, no replay button, content intact.
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  const r = await page.evaluate(() => ({
    replay: getComputedStyle(document.querySelector('.flow-replay')).display,
    packet: getComputedStyle(document.querySelector('.flow-packet')).opacity,
    tab: getComputedStyle(document.querySelector('.flow-enter')).opacity,
    ready: document.querySelector('[data-flow-motion]') !== null
  }));
  check('reduced motion shows content and runs no trace', r.replay === 'none' && r.packet === '0' && r.tab === '1' && !r.ready, JSON.stringify(r));
  await context.close();
}

// Prerender: the content is in the served HTML before any script runs.
{
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'load' });
  const r = await page.evaluate(() => ({ h1: document.querySelector('h1')?.textContent ?? '', rows: document.querySelectorAll('.work-row').length }));
  check('content renders with JavaScript off', r.h1.includes('Behind the API') && r.rows > 0, JSON.stringify(r));
  await context.close();
}

await browser.close();
console.log(results.map((r) => r.line).join('\n'));
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `${failed} of ${results.length} checks failed` : `All ${results.length} checks passed`);
process.exitCode = failed ? 1 : 0;
