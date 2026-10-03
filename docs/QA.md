# Landing page QA

> Current complete page: [COMPLETE_PAGE_REVIEW.md](COMPLETE_PAGE_REVIEW.md). Marketing/product rules and current content qualifications: [COMPONENT_LANGUAGE.md](COMPONENT_LANGUAGE.md). The earlier stage descriptions below are historical.

> These results describe the superseded ten-section page. Current five-section review: [V2_STAGE_REVIEW.md](V2_STAGE_REVIEW.md), measured audits and limits: [PERFORMANCE.md](PERFORMANCE.md).

Validated locally on 2026-10-02 against the generated Cloudflare worker, served by `npm run preview` at http://127.0.0.1:4173. No deployment or authenticated-app modification was performed.

## Automated verification

- Production build: passes. The optional Three/Fiber lazy chunk triggers the expected size advisory; the inherited Vite configuration also reports plugin advisories.
- Strict TypeScript: passes.
- ESLint: zero errors; six existing fast-refresh warnings in the unused UI template components.
- Vitest: two files, five tests pass. Recommendation tests cover explicit approval before publication, edited price and event payload, ignore/reset; existing routing tests also pass.
- npm dependency audit: zero vulnerabilities. Wrangler 4.145.0 is pinned; npm and Bun lockfiles are synchronized while preserving Bun's existing minimum release age policy.

## Lighthouse mobile

Lighthouse 13.5.0, headless Chrome, default mobile simulated throttling, local production build:

| Category / metric | Result |
| --- | --- |
| Performance | 93 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| First contentful paint | 2.5 s |
| Largest contentful paint | 2.7 s |
| Total blocking time | 80 ms |
| Cumulative layout shift | 0.016 |

These are local lab measurements, not field performance guarantees. The final subsequent CSS adjustment only changes workflow columns below 360px; the audited mobile viewport is 412px. Reports are generated under ignored `tmp/`.

## Browser and visual review

- Desktop hero, complete narrative, pilot graph, control center and flywheel inspected in the actual browser. Final captures: qa/desktop-hero.jpg and qa/desktop-page.jpg.
- Responsive widths 1440, 390 and 320 checked. Document width stays within viewport width; no horizontal page overflow. Below 360px, workflow uses three columns for readable labels.
- Mobile has zero Canvas elements. Static brand geometry remains visible. Mobile navigation opens/closes and responds to Escape.
- Demo approve, edit to SAR 37, publish/live, ignore and reset exercised. Only explicit approval advances to publication. Simulated outcomes are labeled.
- Workflow keyboard navigation exercised: ArrowDown changes selected tab, focus and associated panel. Focus styles and semantic labels inspected.
- Fresh production browser console has no errors. Three/Fiber emits a non-blocking upstream THREE.Clock deprecation warning on desktop.
- Server-rendered content contains all ten sections and seven links to https://app.yamdy.net; headline and primary CTA do not depend on Canvas.
- Reduced-motion media branches and cleanup inspected: no GSAP motion or Canvas mounts; CSS motion and smooth scrolling are disabled. WebGL error boundary/context-loss fallback inspected in code. Full assistive-technology testing and physical low-end-device testing remain outside this local validation.

## Source and release handoff

The supplied PDF is a logo guide, not a pitch deck. The +30% single-client early-pilot result is qualified and sourced to the user brief; independent deck verification is pending. Feature views are clearly conceptual. See CONTENT_SOURCES.md for every factual claim and remaining input, and LANDING_PAGE.md for architecture and run commands.

Before public release, provide the actual pitch deck/verified capabilities, approved legal URLs, and any desired Arabic translation or analytics provider. No fabricated legal destinations, endorsements or extra live integrations are included.
