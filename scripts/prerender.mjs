// Renders the page to HTML at build time and writes it into dist/engineering/index.html, so first paint
// and crawlers get real content before any JavaScript runs. Run by `npm run build`.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const serverEntry = pathToFileURL(new URL('../dist-server/entry-server.js', import.meta.url).pathname).href;
const { render } = await import(serverEntry);

const htmlPath = new URL('../dist/engineering/index.html', import.meta.url).pathname;
const html = await readFile(htmlPath, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/engineering/index.html`);

await writeFile(htmlPath, html.replace(marker, `<div id="root">${render()}</div>`));
await rm(new URL('../dist-server', import.meta.url).pathname, { recursive: true, force: true });
console.log('Prerendered dist/engineering/index.html');
