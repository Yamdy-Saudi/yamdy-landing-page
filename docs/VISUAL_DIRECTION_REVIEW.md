# Yamdy editorial direction review

This initial direction was approved. The current stage continues through Section 5; see [V2_STAGE_REVIEW.md](V2_STAGE_REVIEW.md) and [PERFORMANCE.md](PERFORMANCE.md). The initial review below is historical.

This review milestone renders only navigation, the new hero, and the beginning of Chaos → Control. Later sections and the footer are unmounted, awaiting explicit visual approval. No application or Stitch design was modified; no deployment or commit was made.

## Sources inspected

- All ten pages of brand/Yamdy_Final_3.pdf: original logo design guide, confirmed Montserrat, exact displayed green/cream/purple/charcoal swatches.
- All 17 pages of brand/Yamdy — Pitch Deck.pdf: full-green editorial compositions, meaningful sketch language, hero positioning on page 1, operational fragmentation on page 5, approval model on page 7. The deck describes the AI product as in build. This prototype labels its UI as a product design reference.
- brand/Asset 4.png, palette screenshot, and the newly supplied brand/yamdy-logo.svg inspected. Public SVG is an unchanged copy.
- Stitch project 8813799588670496359, Yamdy SaaS Onboarding Experience, read-only. Referenced screens: 5. AI Opportunity Detail (cf947dee5ebb4fc1abdd4d4865a6f92b), 10. Pricing Intelligence (4b3cd48b44ba4ff0a5dd03efbc8b7dd7), and 17. Approvals & Activity (05837a83362f4adba94d4abf36ac47e9). Retrieved HTML and opportunity screenshot inspected. Reference details: compact price comparison, purple intelligence accent, restrained 8px curvature, green approval status. Marketing typography remains the guide's Montserrat; no whole dashboard or speculative product capability is imported.

## Exact logo construction

YamdyScene imports brand/yamdy-logo.svg as raw text and passes it to Three.js SVGLoader. Each parsed ShapePath uses toShapes(), the current replacement for deprecated SVGLoader.createShapes(). This yields 12 shapes with 4 holes from the supplied compound path. Each becomes ExtrudeGeometry with 16 source units of depth, no bevel, and 18 curve segments. The extrusions total 49,008 vertices. A shared bounding box centers all shapes. Uniform scale preserves proportions; negative Y scale converts SVG coordinates to Three coordinates. No path, letter, dot, baseline, or wordmark is manually redrawn or substituted.

Front and side materials use centralized brand green and accessible darker green, with high roughness and zero metalness. The scene has soft restrained lighting and a shallow shadow receiver. Initial orientation is roughly 5.7° X / −7.4° Y; pointer offset is clamped to ±3°. Scroll approaches a frontal view. It never continuously spins.

The exact public SVG provides the server-rendered fallback. Mobile/reduced motion do not mount WebGL. The former invented arches, spheres, toruses and fallback geometry have been removed from YamdyScene and Scene.

## Composition and motion

Cream hero, 46/54 desktop split, large three-line headline, baseline-aligned signal rail. Only two annotations point to observation and the recommendation. An initial GSAP timeline settles after navigation/eyebrow, headline, logo, signals, price movement and recommendation emerge. Arrow strokes draw once. A short unpinned scroll transition brings signals inward and extends the baseline motif into a full-width green divider.

The green problem section contains six loose typographic fragments rather than an equal card grid. Sizes, outlines and initial rotations differ. Scroll moves fragments only 18% of the distance toward the central restaurant/Yamdy point: this is the beginning of convergence, not the completed workflow. Numeric signals breathe by 2px with slow CSS motion. Reduced motion disables both CSS and GSAP motion.

Brand tokens remain #258948, #f9e6c9, #7b5ba6 and #221e1f. The green surface mixes 2% black for small white-text contrast; large headings retain cream. The approval fragment uses the inspected Stitch intelligence palette rather than inventing dashboard styling.

## Technical handoff

TanStack Start/React/Vite preserved (this repository is not Next.js). SEO, self-hosted fonts, analytics abstraction, app destinations, keyboard/mobile navigation, SSR content and error boundary remain. No packages were added for this redesign.

Results and Why Yamdy remain visible but aria-disabled in this limited preview, because their sections await approval. Product targets the hero and How it works targets the green section. Both Sign in and Start with Yamdy still use https://app.yamdy.net.

The former later-section component files are retained but unmounted; their visuals and code do not enter the page bundle. Existing older ten-section docs and QA describe the prior version, not approval of this direction.

Production build: route chunk 4.23 KB gzip (previously 11.65), CSS about 6.3 KB gzip (previously 9.56), lazy exact-logo Three/Fiber chunk about 255.4 KB gzip (previously 241.90). GSAP/ScrollTrigger is a separate lazy 44.94 KB gzip chunk, skipped under reduced motion. One demand-rendered Canvas maximum, DPR capped at 1.5, offscreen unmount, no textures/postprocessing. These are bundle measurements, not a new Lighthouse score.

Strict typecheck and production build pass. ESLint: zero errors, six existing UI-template fast-refresh warnings. Five existing tests pass. Browser QA covers 1440×900, 1920×1080 and 390×844, official logo/fallback identity, scroll transition, green contrast/composition, overflow, console errors and mobile navigation including Escape. Fresh production console has no errors. Three/Fiber's upstream Clock deprecation remains non-blocking. Supplied and public SVG SHA-256 hashes match. Captures are in docs/qa/editorial-*.

Pending: review and approve this direction before any later section work. The pitch deck's current agency/in-build distinction must govern future product copy. Earlier missing-deck TODO is now resolved.
