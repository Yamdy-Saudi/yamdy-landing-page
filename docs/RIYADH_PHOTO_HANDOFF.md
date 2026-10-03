# Riyadh photographic section — asset handoff

Only the Saudi F&B section was replaced. Concept 3 was inspected directly; its typography and overlays were implemented as real HTML/SVG rather than using the reference as a flat image.

| Before                         | After                                                                | Why                                                       |
| ------------------------------ | -------------------------------------------------------------------- | --------------------------------------------------------- |
| Abstract three-node street map | 43% editorial / 57% edge-bleeding photographic environment           | Makes restaurant operations the setting                   |
| Conceptual SVG labels          | Three compact contextual HTML overlays with measured SVG connections | Preserves readable copy and accurate responsive endpoints |

## Photograph still required

`public/images/riyadh-restaurant-operator.webp` is currently a **temporary copy of the existing `yamdy-kitchen.webp`**: 1536×1024, 87,644 bytes. It shows a restaurant pass and delivery packaging, but **does not show an operator or laptop**. It is not the final Concept 3 photograph. Alt text accurately describes the temporary image.

Supply an approved/licensed or generated clean photograph showing a Saudi restaurant operator in white thobe and red/white shemagh or ghutra, candidly using a laptop/tablet at a warm restaurant pass, with staff/service activity behind him. Match Concept 3's atmosphere, natural skin tones and foreground human presence. No rendered marketing copy, floating UI, external aggregator logos or futuristic imagery in the photograph. Keep the face away from upper contextual-label areas and the device below the intelligence overlay. Aim for 1536px or greater width and an optimized WebP/AVIF around 100–250KB. Replace the placeholder and review crop/label placement at desktop/mobile; update the alt text and dimensions to match.

The kitchen placeholder cannot deliver Concept 3's human/operator relationship. That art-direction requirement remains pending the photograph, as allowed by the brief's missing-image fallback.

## Product source and overlays

Stitch was inspected read-only: **4. Home / Opportunity Inbox**, project `8813799588670496359`, screen `ddebc44b01c54535bfd0d894df7f0a86`. Its IBM Plex hierarchy, green action semantics, purple opportunity treatment and approval-first recommendation behavior were reviewed. No dashboard metrics were copied as customer evidence.

The placeholder has no laptop screen, so no perspective-mapped screen UI was fabricated. When the final photo arrives, use a small authentic Opportunity Inbox fragment if its screen geometry permits a stable mapping; keep essential copy in HTML.

`RiyadhRestaurantScene.tsx` supplies the photograph, location pin, Restaurant and Delivery Channel icon labels, real Yamdy logo/Intelligence label, service-action endpoint and one handwritten note. All essential labels are HTML. One ResizeObserver batches element-edge measurements into a single frame; a one-shot class observer waits for the existing shared reveal event before any offscreen geometry measurement. There is no scroll listener or continuous render loop. Connections terminate on actual overlay edges; the note targets the mathematically calculated midpoint of the Yamdy-to-action curve.

The finite 1.55-second entrance uses CSS opacity and SVG stroke/pulse motion. Reduced motion renders static labels and connections. The photo is lazy/async/low-priority, with dimensions and responsive sizing; no preload, new font, dependency or WebGL. Photo and overlays use layout/style containment. The extra photograph costs 87.6KB when this section is approached; its separate placeholder URL may require a second transfer even if the demo kitchen has loaded.

Removed `RiyadhOperations.tsx`, both old map compositions, abstract streets, map pulse/draw animation definitions and legacy `local-motif`/`ops-*` CSS. Other page components, colors, navigation and spacing remain unchanged.

## Verification

1440×900 and 390×844 browser captures: `qa/polish-photo-riyadh-1440.jpg` and `qa/polish-photo-riyadh-390.jpg`. Mobile has no horizontal overflow. Typecheck and production build pass. Lint has zero errors and six inherited fast-refresh warnings. Seven existing tests pass. Performance results are recorded in `qa/riyadh-photo-performance.json`; initial profiling caught offscreen connector measurement, which was deferred to the reveal event before final profiling.

No commit, push or deployment. The final operator photograph remains the explicit handoff item.

Final sequential Lighthouse: desktop/mobile performance **100/93**, accessibility **100/100**, LCP **0.617/2.613s**, TBT **0/0ms**, CLS **0.000036/0.000084**. Mobile LCP remains slightly above 2.5s. Compared with the previous polish's 100/93, this preserves the lab performance scores; samples vary and do not establish field INP. Route JavaScript decreases from 38,817 to 37,481 bytes; the shared 370,406-byte initial chunk, optional Three and GSAP are unchanged. One new lazy 87,644-byte photograph is the principal added transfer. No new WebGL scene or perpetual motion.
