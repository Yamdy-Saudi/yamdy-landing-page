# Final art-direction polish — October 3, 2026

The approved nine-section composition is retained. This pass changes Orders semantics, the Riyadh operating visual and the shared handwritten arrow treatment. It adds no sections or WebGL scenes.

| Before                                     | After                                                                                               | Why                                                                |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Orders had a detached downward arrow       | `↓ declining?`, with “what changed?” attached to Orders                                             | Expresses an unexplained decline without inventing a metric        |
| Riyadh was an abstract placeholder         | Restaurant, Delivery Channel and the actual Yamdy mark connected across an editorial street network | Explains operating proximity through meaningful restaurant signals |
| Arrowheads could appear before their lines | Shared open SVG arrowhead; existing annotations immediately legible                                 | Keeps annotation targets readable during entry and resizing        |

## Anchors and composition

`EditorialNote.tsx` exposes `HandwrittenArrow`: unique marker, shared open arrowhead and normalized path length. Notes retain their handwriting and section colors. Orders' note is nested inside its label, so its arrow follows the exact target. Pricing and Promo notes land on their boxes; reconciliation's note lands on its box. Tablet and mobile Orders positions avoid the reconciliation note.

`RiyadhOperations.tsx` derives the restaurant–Yamdy annotation endpoint from the connection's quadratic midpoint. Mobile uses separate vertical geometry and targets the delivery-channel–Yamdy connection in the restaurant-to-Yamdy chain. SVG viewBox coordinates scale together; no viewport pixel offsets. Pulses follow the connection paths, with visible endpoint anchors.

The right column grows approximately 20% at 1440px; desktop section height increases only about 37px. Supporting phrases have individual green rules. The bilingual pin remains secondary. Mobile has a separate vertical diagram and wrapped details. No new external logos, photos or maps.

## Motion and profiling

The 1.4-second entrance draws streets, introduces nodes, draws routes, sends one set of pulses and introduces the pin and note, then settles. It reuses the shared reveal observer. No new ScrollTrigger, resize listener, animation frame loop, dependency, font or image. Reduced motion shows the complete static diagram. Existing four desktop ScrollTriggers and optimized hero enhancement remain unchanged.

Profiling caught an initial-layout regression: first mobile audits scored 75 with 631–658ms TBT. A trace identified 646ms and 278ms layout events. The map now uses layout/style containment, `content-visibility: auto`, and an explicit responsive aspect ratio matching its SVG viewBox. Height stays reserved while offscreen drawing is deferred. Final sequential production audits, with browser QA idle:

| Metric        |  Desktop |   Mobile |
| ------------- | -------: | -------: |
| Performance   |      100 |       93 |
| Accessibility |      100 |      100 |
| LCP           |   0.596s |   2.639s |
| TBT           |      0ms |     10ms |
| CLS           | 0.000405 | 0.000084 |

Previous complete-page scores: 99/93; LCP 0.811/2.621s; TBT 0/6ms. Lab samples vary; mobile LCP still exceeds 2.5s. These results do not establish field INP or guarantee absence of every startup long task. All intermediate/final samples are in `qa/polish-performance-summary.json`; raw traces stay in ignored `tmp/polish-*`.

Initial shared plus route JS is 129.86KB gzip versus approximately 128.6KB previously. Optional Three remains 154.18KB gzip; GSAP 45.13KB. Model stays 309,228 bytes / 10,984 vertices / 7,296 triangles. No runtime SVG extrusion was reintroduced.

## QA

Complete-page review at 1440×900 covered hero, dilemma, decision system, loop, demo, proof, compounding, Riyadh and CTA. Approved backgrounds, product fragments, radii, grid and typography remain. Existing annotations were audited and their startup delay removed. No new cards, repeated decorative widgets or content claims.

Responsive review: 1920×1080, 1440×900, 1366×768, 1024×768 and 390×844. DOM width checks found no horizontal overflow. The 1024px note overlap and Orders contrast were corrected. Final containment was visually checked on desktop/mobile and produced negligible CLS in the audits.

- Typecheck passes.
- Lint: zero errors; six inherited UI-template fast-refresh warnings.
- Seven tests pass across two files.
- Final production build passes; inherited plugin and optional Three chunk advisories remain.
- `git diff --check` passes.

Requested screenshots:

- `qa/polish-problem-1440.jpg`
- `qa/polish-riyadh-1440.jpg`
- `qa/polish-riyadh-map-390.jpg`
- `qa/polish-riyadh-cta-transition-1440.jpg`

Additional responsive/chapter captures use the `qa/polish-` prefix. Local preview is left on Riyadh. No commit, push, deployment or history rewrite.
