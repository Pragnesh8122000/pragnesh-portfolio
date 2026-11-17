// Lab measurements on a throttled mobile profile: FCP, LCP, CLS, long tasks and bytes transferred.
// Usage: npm run build && npx vite preview --port 4173 & npm run perf
// Numbers are medians of RUNS (default 5) on this machine, not field data; compare runs from the same machine only.
import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://localhost:4173/';
const runCount = Number(process.env.RUNS ?? 5);
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const runs = [];

for (let i = 0; i < runCount; i++) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  // Close to Lighthouse's "slow 4G" with a 4x CPU slowdown.
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.addInitScript(() => {
    window.__m = { lcp: 0, cls: 0, long: 0, tbt: 0 };
    new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__m.lcp = e.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__m.long++; window.__m.tbt += Math.max(0, e.duration - 50); } }).observe({ type: 'longtask', buffered: true });
  });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  // Scroll the whole page so layout shifts that only happen while scrolling are counted.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  runs.push(
    await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const res = performance.getEntriesByType('resource');
      return {
        ...window.__m,
        fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? 0,
        transfer: nav.transferSize + res.reduce((s, r) => s + r.transferSize, 0),
        requests: res.length + 1
      };
    })
  );
  await context.close();
}
await browser.close();

const median = (key) => runs.map((r) => r[key]).sort((a, b) => a - b)[Math.floor(runs.length / 2)];
console.log(
  JSON.stringify({
    runs: runCount,
    fcp_ms: Math.round(median('fcp')),
    lcp_ms: Math.round(median('lcp')),
    cls: Number(median('cls').toFixed(4)),
    tbt_ms: Math.round(median('tbt')),
    long_tasks: median('long'),
    transfer_kb: Number((median('transfer') / 1024).toFixed(1)),
    requests: median('requests')
  })
);
