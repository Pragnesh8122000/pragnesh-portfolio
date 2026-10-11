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
variables to semantic colors (`bg-bg`, `text-ink`, `text-muted`, `text-accent`, ...)
in `src/styles/globals.css`.

## Motion

`src/hooks/useFlowMotion.ts` runs only at 768px and wider without a
reduced-motion preference: hero tab entrance, the tab sequence as the hero
scrolls away, the index pip fade and work-card growth. Content is fully visible
without it. `useActiveStage.ts` drives the sticky index highlight.

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
