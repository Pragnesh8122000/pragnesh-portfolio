# Flow Index: complete portfolio design and build brief

Build Pragnesh Prajapati's backend engineer portfolio as a working React website from this brief. Use the attached Flow Index dark and light boards as visual references, not as images to embed. Implement the final copy below without inventing facts. Finish with working source, build instructions and screenshots.

## 1. Concept and scope

A backend flow becomes a staggered pile of six interface tabs: Client / request, Gateway / API, Events / workers, Cache / data, Delivery and Observe. A thin accent side rail connects them. The whole site uses tab headers, numbered stages, offset backing edges and connector lines.

The hero has the headline on the left and tab pile on the right. On scroll, tabs slide forward one by one, briefly grow, and settle. A compact flow index persists as progress navigation through the work sections. Sections remain readable in normal document flow.

No hardware objects, server racks, computer renders, terminal windows, blueprint backgrounds, serif type, stock photos, generic gradient backgrounds or unrelated illustrations. No WebGL, scroll-jacking or fake contact form.

The stages are a navigation metaphor for separate work and projects. They are not one claimed production architecture. WebRTC backend integration at Justdial is the only end-to-end ownership claim. Monitoring and its MTTD metric belong to Justdial. The 10K RPS metric belongs to Mypcot.

## 2. Implementation choice

Use React, TypeScript, Vite, Tailwind CSS and GSAP ScrollTrigger. Use CSS perspective and translate3d for depth and small inline SVGs for connectors. This is a static portfolio: no backend service is needed.

Choose Vite for a new project. If this is an existing Next.js project, keep Next.js and isolate motion in client components. Use current compatible dependency versions and record them in the lockfile. Do not invent APIs or require experimental browser features.

Keep content in one typed data file, theme values in one token file and motion in scoped hooks. Use native anchors for navigation. Theme changes must not remount sections or reset scroll.

## 3. Design tokens

The background, surface, heading and accent values below were sampled from the supplied hero images. Supporting border, secondary text and depth values are chosen to match them. The outer near-black and pale-blue presentation-board grounds are not part of the website.

```ts
export const palettes = {
  dark: {
    background: '#151519',
    surface: '#25242B',
    surfaceRaised: '#2C2B33',
    text: '#F1F5FA',
    muted: '#A5B3C2',
    accent: '#FF806D',
    accentHover: '#FF9888',
    accentSoft: '#4A2925',
    border: '#44424B',
    rule: '#343238',
    buttonText: '#151519',
    depthEdge: '#85483F',
    shadow: 'rgba(0, 0, 0, 0.32)',
    railGlow: 'rgba(255, 128, 109, 0.20)'
  },
  light: {
    background: '#FAF5EE',
    surface: '#FFFFFF',
    surfaceRaised: '#FFFFFF',
    text: '#262329',
    muted: '#526A7B',
    accent: '#BD4935',
    accentHover: '#A83C2C',
    accentSoft: '#F6D8D0',
    border: '#DDD3C9',
    rule: '#E7DED4',
    buttonText: '#FFFFFF',
    depthEdge: '#F5BEB2',
    shadow: 'rgba(38, 35, 41, 0.16)',
    railGlow: 'rgba(189, 73, 53, 0.12)'
  }
} as const;

export const geometry = {
  spacing: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
  radius: { chip: 3, button: 5, tab: 8, card: 6 },
  pageMax: 1304,
  desktopGutter: 68,
  mobileGutter: 24,
  headerHeight: 80,
  indexHeight: 56,
  mobileHeaderHeight: 64,
  mobileIndexHeight: 104,
  compactBreakpoint: 768,
  wideBreakpoint: 1100
} as const;
```

Map these semantic tokens through the theme provider or Tailwind configuration. Avoid scattering raw color values across components.

### Type

Font stack: `Arial, Helvetica, ui-sans-serif, system-ui, sans-serif`. No font download or icon font is needed.

Sizes are font size / line height, desktop first and mobile second:

- Wordmark: 26/32px and 22/28px, weight 700, tracking -0.05em.
- Hero: 72/76px and 44/46px, weight 700, tracking -0.045em.
- Section title: 30/38px and 26/32px, weight 500, tracking -0.035em.
- Feature title: 24/30px and 22/28px, weight 500, tracking -0.025em.
- WebRTC statement: 38/42px and 30/34px, weight 700.
- Metric: 38/44px and 28/34px, weight 700, tracking -0.04em.
- Contact headline: 56/60px and 38/42px, weight 500.
- Body: 16/26px and 16/25px, weight 400.
- Metadata: 13/20px on both.
- Eyebrow: 11/16px, weight 700, tracking 0.12em.
- Flow tab title: 17/22px and 14/20px, weight 700.
- Flow chip: 12/18px and 11/16px, weight 600.

At 320px, hero may use 40/43px. Never shrink body text to reproduce tiny board labels. Uppercase is only for eyebrows and small category labels.

### Depth and controls

- Tab surfaces: 1px border, 8px radius, ruled title row.
- Feature cards: 6px radius and a solid accent backing edge offset 6px right and down.
- Project cards: 2px accent top border with the same backing edge.
- Dark tab shadow: `0 16px 24px rgba(0, 0, 0, 0.32)`.
- Light tab shadow: `0 14px 22px rgba(38, 35, 41, 0.16)`.
- Rail: 2px accent line, restrained 12px glow. No glow around every card.
- Section dividers: 1px rule color across the viewport.
- Buttons: minimum 44px tall, 20px horizontal padding, 5px radius.
- Focus: 2px accent outline with 3px offset.
- Mobile targets: at least 44px in both dimensions.

## 4. Page structure, layout and final copy

Order: header, hero, compact index, metrics, Justdial features, WebRTC, Mypcot delivery, projects, experience, stack, contact and footer.

At 1440px use a centered 1304px content area with 68px gutters. At 1100px and below use 32px gutters and a single-column hero. Below 768px use 24px gutters. At 320px use 20px. Section padding is 64px vertically on desktop and 48px on mobile. Title-to-content gap is 24px. No fixed total page height.

### Header

Desktop: 80px high, wordmark left, Work / About / Contact centered, theme toggle right, bottom rule. Wordmark is `pragnesh.` with the dot in accent. Work links to `#work`, About to `#experience`, Contact to `#contact`.

Mobile: 64px high, wordmark left and toggle right. Add a second 44px navigation row for Work / About / Contact. This is a usability addition to the board. No hamburger menu. Header is not sticky.

Toggle displays the current theme, `Dark` or `Light`, with an accessible action label such as `Switch to light theme`. Honor system preference on first visit and save explicit choices locally. Apply the initial theme before paint.

### Hero

Desktop: minimum height 730px below header, two columns, 560px left and flexible right, 64px gap. Center both groups vertically. Left copy max width 560px; paragraph max width 490px. Right scene max width 620px.

Mobile: text, actions and identity first, then pile. Top padding 48px, bottom 40px, 40px before pile. Do not scale an entire desktop scene including text.

Final copy:

- Eyebrow: `BACKEND ENGINEER / NODE.JS + TYPESCRIPT`
- Headline lines: `Behind the API.` / `Through the` / `whole flow.`
- First line primary text; remaining lines accent.
- Paragraph: `I build APIs, event pipelines and backend systems with Node.js and TypeScript.`
- Primary action: `Explore my work`, links to `#work`.
- Secondary action: `View resume`, links to owner-supplied PDF.
- Identity: `Pragnesh Prajapati`.
- Scene caption: `Illustrative flow. Explore the work below.`

Use 28px between eyebrow and headline, 32px before paragraph, 32px before actions, 24px before identity. Do not add a years-of-experience total or current home location. Employment locations appear below.

### Hero pile geometry

Scene: 620px wide maximum, 580px high. Six semantic stage links. Each tab is nominally 490px wide and 84px high with a 34px title row and 50px chip row. Perspective 1200px. Base rotateY -7 degrees and rotateX 3 degrees. Nested wrappers separate positioning, scroll motion and hover.

Base offsets, with X / Y / rotateZ:

1. `01 Client / request`: 0 / 18px / -4deg. Chips `HTTP`, `JWT`, `Request`.
2. `02 Gateway / API`: 26 / 112px / -2deg. Chips `Node.js`, `Express`, `10+ services`.
3. `03 Events / workers`: 52 / 206px / -1deg. Chips `Kafka`, `Consume`, `Process`.
4. `04 Cache / data`: 26 / 300px / 0deg. Chips `Redis`, `PostgreSQL`, `MongoDB`.
5. `05 Delivery`: 0 / 394px / 2deg. Chips `ECS`, `Docker`, `CI/CD`.
6. `06 Observe`: 26 / 488px / 3deg. Chips `Logs`, `Alerts`, `Health`.

Place small accent arrows between chips and an accent dot on each title row's right edge. Rail X is 558px, from Y 40px to 562px, with branches to the six tabs. Rail is decorative and aria-hidden.

At 440px viewport, content width is 392px: tabs about 330px wide and 76px high, X offsets 0, 12, 24, 12, 0, 12, Y offsets 0, 86, 172, 258, 344, 430. Rail sits 10px from the container's right edge. Scene minimum height 530px including caption space. At 320px use tab width equal to content width minus 34px and X offsets 0, 8, 16, 8, 0, 8. If chips wrap, grow tab heights and Y spacing together. Text must not clip.

Use the stage link targets defined below. Skills grouped in the hero are not assertions about any one employer's system. In particular, do not claim PostgreSQL and MongoDB were used in the IRO platform.

### Compact flow index

Place immediately after hero. Sticky at top 0, opaque theme background, z-index 30, top and bottom rules. Put it in a wrapper containing metrics and work through projects so it releases before experience.

Desktop height 56px with six inline links. Mobile height 104px with two rows of three links. Labels and targets:

- `01 Request` → `#projects`
- `02 API` → `#gateway`
- `03 Events` → `#events`
- `04 Data` → `#data`
- `05 Delivery` → `#delivery`
- `06 Observe` → `#observe`

Active link uses accentSoft background, accent text, stronger weight and underline. Set aria-current to location. Accessible description: `These stages link to separate examples from my work and projects.` Request maps to personal builds, where request behavior is described.

Content order is editorial: Observe appears with Justdial before Mypcot Delivery. Track the visible anchor, not a presumed increasing stage number.

### Metrics band

Desktop: three equal columns, 32px gaps, 40px vertical padding. Mobile: three rows, value left and label right, 16px vertical padding per row. Wrap labels rather than compress text. No count-up animation.

- `120-130K` with `Leads per day · Justdial`.
- `10K RPS` with `API throughput · Mypcot`.
- `-35%` with `Peak API response time · Justdial`.

### Justdial features

Section ID `work`. Badge `01 / 04`. Title `Follow the backend.` Metadata `JUSTDIAL / JAN 2026 TO PRESENT`.

Introduction: `Gateway, events, cache and monitoring. Separate systems, shown through one visual language.`

Four full-width stacked tabs, 20px gaps. Desktop: 28px stage header, 24px body padding, min-height 150px, copy left and metric in a 160px right column. Mobile: title, paragraph and metric vertically stacked. Backing edge stays inside gutters. Cards are not links to invented detail pages.

Card 1, ID `gateway`:
- Header: `01 / REQUEST TO API`
- Title: `One gateway. 10+ services.`
- Body: `Built a Node.js and Express API gateway routing requests to 10+ services.`
- Metric: `10+`, label `Services`.

Card 2, ID `events`:
- Header: `02 / EVENTS TO WORKERS`
- Title: `Lead data, handled daily.`
- Body: `Built a Kafka consumer processing lead data from the DB team: 120-130K leads per day, around 10K per city.`
- Metric: `120-130K`, label `Leads per day`.

Card 3, ID `data`:
- Header: `03 / CACHE AND PERFORMANCE`
- Title: `A faster IRO platform.`
- Body: `Used Redis caching and load balancing for the IRO platform, reducing peak API response time by 35%.`
- Metric: `-35%`, label `Peak API response time`.

Card 4, ID `observe`:
- Header: `04 / LOGS AND MONITORING`
- Title: `Catch errors sooner.`
- Body: `Built error-log monitoring across 7 servers, reducing mean time to detect by 40%.`
- Metric: `-40%`, label `Mean time to detect`.

Do not add availability, revenue or latency numbers. Monitoring stays under Justdial.

### WebRTC calling

Badge `E2E`. Title `WebRTC calling.` Metadata `JUSTDIAL`.

Desktop grid uses 56% / 44% of available width after a 40px gap. Mobile: text then diagram with 24px gap. Diagram is three slim stacked tabs with connectors and accent left edges.

Final copy:
- Eyebrow: `BACKEND INTEGRATION / OWNED END TO END`
- Statement: `From integration to a working call.`
- Body: `Owned the backend integration of a WebRTC calling service end to end, using a third-party provider.`
- Diagram labels: `Calling service`, `Backend integration`, `Third-party provider`.
- Caption: `Illustrative integration view.`

No provider name, invented volume or detailed signaling, media or TURN topology.

### Mypcot delivery

Section ID `delivery`. Badge `05`. Title `Ship the system.` Metadata `MYPCOT / MAY 2024 TO DEC 2025`.

Top diagram: `Monolith` → `Service boundaries` → `AWS ECS + SQS/SNS`. Three slim horizontal tabs on desktop, vertical on mobile. It is an illustrative migration summary.

Below diagram: two columns with 32px gap, stacked on mobile with 28px gap.

Left copy:
- Heading: `Independent deployments.`
- Body: `Migrated a monolith to AWS ECS with SQS and SNS.`

Right copy:
- Heading: `Build. Test. Deploy.`
- Body: `Built CI/CD pipelines with GitHub Actions and Docker, reducing deployment time by 80%.`
- Metric: `-80%`, label `Deployment time`.

Ruled API row below:
- Title: `REST / GraphQL`
- Body: `Built REST and GraphQL APIs handling 10K requests per second.`
- Metric: `10K RPS`.

Do not add Lambda to the migration or new improvement metrics.

### Personal projects

Section ID `projects`. Badge `BUILDS`. Title `Systems of my own.` Desktop: two equal cards, 24px gap, min-height 320px. Mobile: vertical cards, natural heights. Use tab headers, accent top borders and offset backing edges.

AI Bestie:
- Label: `01 / AI BESTIE`
- Heading: `A conversation that keeps flowing.`
- Chips: `JWT`, `SSE`, `Rate limits`.
- Body: `SSE streaming, JWT authentication and per-user rate limits.`
- Optional configured link: `Explore AI Bestie`.

Vaidya Assist:
- Label: `02 / VAIDYA ASSIST`
- Heading: `Context in. Useful answers out.`
- Chips: `Query`, `RAG`, `Answer`.
- Body: `A RAG healthcare assistant with doctor discovery.`
- Optional configured link: `Explore Vaidya Assist`.

Do not add appointment booking, diagnosis, medical accuracy, model names, users or source links. Do not imply commercial deployment.

### Experience

Section ID `experience`. Badge `PATH`. Title `The work so far.`

Desktop ruled rows: employer 28%, role/location 42%, dates 30% right-aligned. Mobile stacks employer, role/location and dates. Newest first:

- `Justdial` / `SDE 1 · Bengaluru` / `Jan 2026 to present`.
- `Mypcot` / `Software Engineer · Mumbai` / `May 2024 to Dec 2025`.
- `Weboccult` / `Backend Engineer · Ahmedabad` / `Jan 2023 to May 2024`.

No invented employer logos or new job claims.

### Stack and tools

Section ID `stack`. Badge `TOOLS`. Title `What powers the flow.` Desktop label column 230px, tools in remaining width. Mobile labels above wrapping tools. Three ruled rows:

- `API / SERVICES`: `Node.js · TypeScript · Express · REST · GraphQL`.
- `EVENTS / DATA`: `Kafka · Redis · PostgreSQL · MongoDB`.
- `DELIVERY / QUALITY`: `AWS · Docker · GitHub Actions · Jest · JMeter · k6`.

These are skills, not claims that every project uses every tool.

### Contact and footer

Section ID `contact`. Eyebrow `NEXT REQUEST`. Headline: `Let's build` then accent `what comes next.` Links: `Email me`, `GitHub`, `LinkedIn`. Use 64px vertical padding desktop and 48px mobile.

Footer: `Pragnesh Prajapati` left and `Backend engineer` right, stacked on mobile. Below its rule show this visible disclaimer:

> The stage labels are a navigation metaphor for separate work and projects, not one shared production architecture. The diagrams are illustrative.

Do not put round numbers or internal build commentary on the site.

## 5. Owner-fill configuration

```ts
export const links = {
  email: '[YOUR_EMAIL]',
  github: '[YOUR_GITHUB_URL]',
  linkedin: '[YOUR_LINKEDIN_URL]',
  resume: '[YOUR_RESUME_PDF_PATH]',
  aiBestie: '[AI_BESTIE_URL_OPTIONAL]',
  vaidyaAssist: '[VAIDYA_ASSIST_URL_OPTIONAL]'
};
```

These are placeholders, not real destinations. Never use them as href values and never use `#` as a fake external link. In development, render unavailable actions with a muted `Add link before publishing` note. In public builds, hide unavailable optional project links. Required contact and resume actions must have real values or be clearly unavailable before release.

The owner supplies the real resume PDF. Do not generate a substitute from portfolio text. Email uses mailto. External links use new-tab protection and an accessible new-tab hint. Keep all copy and metrics in `src/content/portfolio.ts`.

## 6. Interaction specification

### Hero and scroll

Register ScrollTrigger once. Use a scoped hook with cleanup and matchMedia branches. Animate transforms and opacity only. Essential content starts visible.

Desktop entrance: tab starts 16px lower and 24px farther back, reaches base pose in 450ms; stagger 70ms. Left text has no delayed reveal.

As hero exits, sequence the six tabs over its final 35% of exit progress: translateZ 18px, lift 4px, scale to 1.02, then settle to base pose. Use one scrubbed timeline with no pinning and no extra scroll distance.

The compact index is already in document flow. Fade its indicators from quiet to normal opacity as the hero exits. This suggests the pile settling into the index without cloning focusable elements or literally moving text between sections.

For each numbered work card, at top reaching 75% viewport height, slide from X -8px to 0, translateZ to 12px, scale to 1.015 over 350ms. Settle scale to 1 when leaving the reading band. The narrative stays visible throughout. Give card motion parents a shallow perspective so translateZ has depth.

### Active stage and navigation

Use IntersectionObserver for gateway, events, data, observe, delivery and projects. The target most central below the index wins. Retain the last stage when none is visible inside the work wrapper; clear it on hero entry. Active state follows actual content order.

Use native anchor scrolling. Set scroll-margin-top to index height plus 20px. Use smooth scrolling only without reduced motion. Direct hashes and browser Back must work. Do not hide anchor headings under sticky navigation.

### Hover, theme and mobile

Desktop pointer hover on hero tabs: additional Z 16px and Y -3px, 180ms ease-out. No continuous mouse-follow tilt. Focus uses outline without required movement. Text links underline; buttons use accentHover. Other cards lift by at most 2px only if they have a real action.

Mobile below 768px: static staggered pile, tap stages to navigate, ordinary vertical scroll. Disable scroll-driven 3D sequences. No pinned scene, drag interaction, horizontal carousel or tap-to-open required narrative.

Reduced motion: no entrance stagger, scroll transforms, smooth scrolling, pulse or hover lift. Keep static depth, all content, stage selection, sticky index and theme control functional. Cleanup must prevent duplicate triggers after remounts.

## 7. Components and file structure

```text
src/
  main.tsx
  App.tsx
  content/portfolio.ts
  design/tokens.ts
  styles/globals.css
  styles/flow.css
  components/
    ThemeProvider.tsx
    ThemeToggle.tsx
    SiteHeader.tsx
    Hero.tsx
    FlowPile.tsx
    FlowTab.tsx
    FlowRail.tsx
    FlowIndex.tsx
    MetricsBand.tsx
    SectionHeading.tsx
    FeatureTab.tsx
    JustdialWork.tsx
    WebRTCIntegration.tsx
    DeliveryWork.tsx
    ProjectTab.tsx
    PersonalBuilds.tsx
    Experience.tsx
    StackTools.tsx
    Contact.tsx
    SiteFooter.tsx
    ConfiguredLink.tsx
  hooks/
    useFlowMotion.ts
    useActiveStage.ts
    useReducedMotion.ts
  tests/
    portfolio.spec.ts
    links.spec.ts
public/
  resume.pdf
```

The resume path is intended only; do not create a fake PDF. ThemeProvider owns persistence and initial theme. FlowPile owns geometry; FlowRail reads the same geometry and has no pointer events. FlowIndex owns sticky layout. FeatureTab provides repeated header and backing-edge treatment. ConfiguredLink validates destinations. Motion and stage-observation hooks must not modify content.

Use nested wrappers so positioning, scroll and hover do not overwrite each other's transforms. Use grid for layout and flex for chips. Keep hero and card stacking contexts below the sticky index.

## 8. Quality requirements

- One h1, h2 for sections and h3 for cards. Use semantic landmarks and a skip link.
- Decorative connectors are aria-hidden. No essential text inside SVG or images.
- Normal text contrast at least 4.5:1; large text at least 3:1. Use primary text when muted colors fail.
- Keyboard order is logical. Enter activates anchors, Space toggles theme. Focus is visible in both themes.
- No information depends on hover. No page-wide horizontal overflow.
- Body text stays 16px. Controls are at least 44px. Dates, attribution and metric labels remain visible.
- No perpetual glow animations, analytics, tracking widgets or contact collection by default.
- Page title: `Pragnesh Prajapati | Backend Engineer`.
- Description: `Backend engineer working with Node.js, TypeScript, APIs, event pipelines and backend systems.`
- No invented canonical URL or profile structured-data links.
- No console errors, broken assets or fake live buttons.

## 9. Ordered build plan and acceptance criteria

### Step 1: Scaffold and content

Create the React/TypeScript Vite app, install Tailwind and GSAP, define content and link types, build all semantic sections without motion.

Acceptance: app runs; every final copy block above is present; one data file drives both layouts; no invented facts or destinations.

### Step 2: Tokens and themes

Implement palette, typography, spacing, borders, shadows and theme toggle with persistence and pre-paint initialization.

Acceptance: both themes match the supplied foundation colors; switching preserves scroll; reload preserves explicit choice; first visit respects system preference.

### Step 3: Static layout

Build hero, metrics, work tabs, integration diagram, delivery, projects, experience, tools, contact and footer.

Acceptance: 1440px has text-left/pile-right hero and two project columns; 440px stacks cleanly; tabs and backing edges continue across the page; no tiny body text.

### Step 4: Pile and rail

Implement DOM stage links, geometry, chip rows and aligned rail. Use separate mobile dimensions.

Acceptance: all six tabs readable at 1440px and 440px; keyboard activation works; no machine objects; 320px has no clipping or connector overflow.

### Step 5: Index and anchors

Implement sticky work wrapper, anchor mapping, scroll offsets and active stage observation.

Acceptance: index releases before experience; mobile has two rows of three targets; Observe-to-Delivery transition reflects actual page order; direct hash headings remain visible.

### Step 6: Motion

Add entrance, sequential forward movement, active card growth, settling and hover. Implement reduced-motion and mobile branches first.

Acceptance: no extra scroll distance; content never waits on animation; no duplicate triggers on remount; mobile scroll is natural; reduced motion is fully usable.

### Step 7: Responsive and accessibility checks

Test 320, 390, 440, 768, 1024 and 1440px in both themes, plus 200% text zoom and keyboard navigation. Fix wrapping by changing geometry, not shrinking body text.

Acceptance: no clipped chips, dates or metrics; no page overflow; visible focus; readable contrast; touch targets at least 44px; theme persistence works.

### Step 8: Visual and factual audit

Capture actual full-page and hero screenshots at 1440px and 440px in both themes. Compare rendered pixels with the attached boards and fix spacing, alignment, contrast and collisions.

Acceptance: four viewport/theme combinations reviewed visually; all sections appear; charcoal/coral and warm-white/rust match; no unrelated motifs; WebRTC is sole E2E claim, monitoring is Justdial, 10K RPS is Mypcot.

### Step 9: Owner configuration and release

List unresolved values, add owner-supplied contact links and resume, hide missing optional project links, validate destinations and build production bundle. Write README with run, build, content editing, theme and static deployment instructions.

Acceptance: production build passes; no placeholder is a live URL; real PDF opens if configured; required destinations are real or clearly unavailable; no backend dependency.

## 10. Expected completion report

Return working source, run/build instructions, files added, desktop/mobile screenshots in both themes, checks performed and unresolved owner-fill values. Separate implemented behavior from untested behavior. Do not claim ready to publish while required destinations remain unresolved.
