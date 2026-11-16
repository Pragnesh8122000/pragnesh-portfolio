# pragnesh-portfolio

Static portfolio for Pragnesh Prajapati, built from the Flow Index brief.
React 19, TypeScript, Vite, Tailwind CSS v4 and GSAP ScrollTrigger. No backend.

## Run and build

```bash
npm install
npm run dev       # http://localhost:5173
npm test          # content, link and structure tests (Vitest)
npm run build     # typecheck + production bundle in dist/
npm run preview   # serve dist/ at http://localhost:4173
```

## Edit content

All copy, metrics and destinations live in `src/content/portfolio.ts`.

Destinations are in the `links` object. A value that is empty, `#` or still a
`[PLACEHOLDER]` is never rendered as a link:

- In development, an unset link shows a muted "Add link before publishing" note.
- In production, unset optional project links (`aiBestie`, `vaidyaAssist`) are hidden;
  unset required links show as "unavailable".

The resume is served from `public/resume.pdf`. Replace that file to update it.

## Theme

Colors and geometry live in `src/design/tokens.ts`. A Vite plugin (`vite.config.ts`)
turns the palettes into CSS variables inlined in `index.html`, and a small inline
script sets `data-theme` before first paint: an explicit choice saved in
`localStorage` wins, otherwise the system preference is used. Tailwind maps the
variables to semantic colors (`bg-bg`, `text-ink`, `text-muted`, `bg-accent`, ...)
in `src/styles/globals.css`.

One rule holds in both themes: yellow is signal, never text. It marks the rail, the
packet, the active index entry, status lights and the primary button. Text is ink or
muted ink, so contrast never depends on the accent.

The typeface is Bricolage Grotesque (latin subset, variable weight), self-hosted from
`@fontsource-variable/bricolage-grotesque` and preloaded by a Vite plugin. A
width-matched Arial fallback keeps the swap from re-wrapping text.

## Motion

Three pieces, all optional on top of a complete page:

- Hero tab entrance: CSS keyframes in `src/styles/flow.css`, so it starts with first paint.
- Request trace and diagram signals: `src/hooks/flowMotion.ts` (GSAP + ScrollTrigger).
  `useFlowMotion.ts` loads it as a separate chunk when the browser is idle. A packet
  runs down the hero rail once and again on "Send a request"; each diagram flashes
  once in data-flow order when it scrolls into view.
- Index marker: a CSS transition in `flow.css`, positioned by `FlowIndex.tsx`.

All of it runs only at 768px and wider without a reduced-motion preference (the index
marker also moves on phones, without animation under reduced motion).
`useActiveStage.ts` picks the active index entry and `useAnchorScroll.ts` animates
in-page jumps. Do not add CSS `scroll-behavior: smooth`: it smooths scripted scrolls
too, which made Chrome stop reporting LCP.

## Screenshots

```bash
npm run build && npm run preview &
npm run screenshots   # writes screenshots/ for 1440px and 440px in both themes
```

Set `WIDTHS=320,768,1024` to capture other widths, or `CHROME_PATH` to use a
specific Chromium build. The script fails if it finds horizontal overflow, a
wrong theme or console errors.

## Deploy

`dist/` is a plain static site. Upload it to any static host (Vercel, Netlify,
GitHub Pages, S3 + CloudFront). No server or environment variables are needed.
