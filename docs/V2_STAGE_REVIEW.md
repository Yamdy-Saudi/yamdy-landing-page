# Yamdy V2 — stage two review

The approved hero typography, cream split composition, exact Yamdy sculpture and green Daily Delivery Dilemma remain. This milestone adds only Not a Pipe / A Brain, the Yamdy Loop, and the interactive recommendation demo. Results, flywheel, Saudi F&B, final CTA and footer remain unmounted. No app, Stitch design, deployment, commit or published history was modified.

## Story and composition

- Hero input is PRICE / SAR 42. A labeled packet travels along the baseline, meets the mark, briefly pulses, then the recommendation emerges from the output anchor. Its vertical rail originates at the far side of the baseline. Small decorative captions were removed; useful labels were enlarged.
- The hero's baseline expands and moves into the full-width divider during a short unpinned scroll, with a green wipe. No multi-screen pin or scroll trap.
- Chaos begins with RESTAURANT and a simple storefront node, without Yamdy visible. Six signals connect to its actual circular perimeter with cream paths and endpoint dots. They converge slightly; Yamdy appears only during the final fifth of the transition.
- Annotation SVGs live inside their targets. Their arrow endpoint lands on the target's top edge, or the recommendation's left edge. Resizing and transforming the target moves its annotation with it. Connectors use actual element bounds, ResizeObserver and coalesced animation frames; no fixed diagram coordinates.
- Cream process: HungerStation → Restaurant data → Yamdy intelligence → Recommendation → Human approval → Execution → Result. One moving signal, one product recommendation fragment, no feature grid.
- Muted editorial loop: seven stages around one Classic Burger experiment. A single traversal changes the current stage and returns to Observe. Native buttons let visitors take over and step through at their pace.
- Dark recommendation context: authentic purple intelligence spine, price comparison, approval controls and status progression. Approve → Publishing → Live, then explicitly illustrative Orders / Conversion / estimated revenue impact. Edit validates price; Cancel restores the prior price; Ignore never publishes. The app CTA appears after completion. This demo makes no API calls to a restaurant.

## Sources

Brand sources remain the official SVG, ten-page logo guide and 17-page pitch deck already inspected. Montserrat and the guide's cream / green / purple / charcoal identity are preserved. These workflow values are illustrative, never pilot evidence or guarantees.

Stitch project **Yamdy SaaS Onboarding Experience**, 8813799588670496359, inspected read-only for this milestone:

- 4. Home / Opportunity Inbox — ddebc44b01c54535bfd0d894df7f0a86
- 5. AI Opportunity Detail — cf947dee5ebb4fc1abdd4d4865a6f92b
- 10. Pricing Intelligence — 4b3cd48b44ba4ff0a5dd03efbc8b7dd7

Retrieved HTML inspected for #604791 intelligence, #ebdcff tints, #006235 action states, 8px corners, price comparison hierarchy, status chips and approval buttons. Marketing keeps the brand's Montserrat; whole dashboards and unsupported screen metrics are excluded.

## Progressive enhancement

See PERFORMANCE.md for profiling and regeneration. Browser SVG parsing / extrusion are removed. A build-time script produces one binary GLB mesh with two material primitives. The hero uses one small demand-rendered Three.js Canvas; R3F's additional reconciler is no longer loaded by this page. There are no realtime shadows, textures, environment maps or postprocessing. Shader compilation precedes first render and an 800ms crossfade over the exact static SVG. Failure or context loss restores the SVG.

Mobile / low-memory / fewer than four logical CPUs / data-saver / reduced-motion use the intentional SVG composition. Mobile also skips GSAP: lightweight CSS input/output motion and coalesced native convergence retain the story. Reduced motion stops entrance, scrubbing and connector drift. CTA links remain native HTML and point to https://app.yamdy.net.

## Review and validation

Production scroll and screenshot review: 1440×900, 1920×1080, 1366×768 and 390×844. Captures are docs/qa/v2-*. Keyboard approval, editing, canceling, ignore/reset and loop controls checked. Typecheck and production build pass; lint has zero errors and six existing UI-template warnings; seven tests pass. No production console errors observed.

Results and Why Yamdy navigation entries remain inactive because those sections are outside the approved scope. The preview uses a compatibility-date override when local UTC is still October 2 but the generated build date is October 3.

Stopped at Section 5, pending review.
