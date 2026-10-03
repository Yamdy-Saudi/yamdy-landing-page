# Landing page architecture

> Current complete page: [COMPLETE_PAGE_REVIEW.md](COMPLETE_PAGE_REVIEW.md). Marketing/product rules and current content qualifications: [COMPONENT_LANGUAGE.md](COMPONENT_LANGUAGE.md). The earlier stage descriptions below are historical.

> Current review milestone: [V2_STAGE_REVIEW.md](V2_STAGE_REVIEW.md). The page renders navigation plus the approved hero, green dilemma, ordered system, operating loop and interactive demo. See [PERFORMANCE.md](PERFORMANCE.md) for the offline GLB pipeline. The ten-section architecture below documents the superseded version.

The public website preserves TanStack Start, React 19, Vite, Tailwind 4 and strict TypeScript. It is separate from the authenticated application. No authenticated application code or data was accessed or modified.

## Components and sections

`src/routes/index.tsx` renders `LandingPage`. Dedicated components implement Navigation, Hero, ChaosControl, ProductExplanation, ProductLoop, RecommendationDemo, ControlCenter, Results, Flywheel, SaudiContext, FinalCTA and Footer. Primitives holds the source logo, CTA link and sketch SVGs. Scene handles viewport visibility, motion eligibility, lazy loading and an error boundary. YamdyScene contains the shared Canvas and separate brain/flywheel geometry branches.

The ten-section narrative explains the delivery-channel problem, decision layer, human approval, execution and learning. Product fragments are labeled concepts or illustrative views because no product screenshots were supplied. HungerStation is the only named current integration.

## Brand and typography

Full-strength displayed screenshot swatches were sampled directly: green `#258948`, cream `#f9e6c9`, purple `#7b5ba6`, charcoal `#221e1f`; white `#ffffff`. Centralized CSS tokens in src/styles.css also include accessible dark green `#176136`, tints, borders, radii and easing. See CONTENT_SOURCES for the PDF's contradictory RGB text.

Montserrat 400/500/600/700 is self-hosted through the OFL-licensed @fontsource/montserrat package, with font-display swap. GE SS Two was not provided as a licensed asset and is not shipped. Arabic uses system Segoe UI/Tahoma fallback. HTML direction, logical margins, start/end alignment and RTL navigation/sidebar overrides provide a localization foundation. This is an English site, not a finished Arabic translation. The original Arabic/English logo is preserved.

## Motion and 3D

Three signature experiences:

1. Brain: bevelled extruded arches inspired by logo geometry, delivery signals and an approval card. Small pointer rotations without continuous spinning. SVG renders immediately beneath the lazy Canvas.
2. Chaos to control: eight operation cards converge into a stable grid using scrubbed ScrollTrigger on desktop. Mobile has sequential entrances into its organized board. No scroll trapping or pinning.
3. Experiment flywheel: SVG orbit plus lazy 3D torus assembly. Both turn with accelerating easing as the section crosses the viewport. Explanatory labels remain static.

Normal desktop motion lazily imports GSAP after the initial render. It uses power2 easing for hero entries, heading transforms, progressive flow steps and a drawn conceptual pilot line. Mobile uses lightweight CSS entrances triggered by IntersectionObserver, without downloading GSAP or Three. CSS provides button feedback and state transitions. Text remains fully opaque. GSAP matchMedia/context collects and reverts timelines and triggers. Demo timers cancel on status changes/unmount, observers disconnect, geometry is reused and disposed.

## Mobile, reduced motion and errors

Breakpoints: 640, 900 and 1150 pixels. Mobile has stacked storytelling, SVG sculpture/orbit, compact workflow tabs, two-column operations and feature controls, full-width demo and mobile navigation. No touch-dependent hover feature or horizontal panning.

Below 900px or with prefers-reduced-motion, 3D never mounts. Reduced motion disables GSAP scrub/reveal, CSS animation and smooth scrolling. Static compositions retain all meaning. Demo publication states still announce with shortened delays. The error boundary contains WebGL construction failures; context loss reveals the static brain fallback. The flywheel retains its SVG. Headlines and CTAs are server-rendered before JavaScript or 3D.

## Accessibility

One h1; semantic main/header/nav/footer/sections; labeled sections; skip link; logo alt text; decorative SVG hiding; visible focus outlines. Workflow tabs have roving tabindex, selected state, labeled panel and Up/Down/Home/End keyboard navigation. Feature controls expose pressed states. Demo input has a real label, native numeric constraints and additional validation. Publication updates use a polite live region. Demo outcomes are identified as illustrative, simulated and variable.

## CTA and analytics

All signup/Get started/Start with Yamdy and Sign in links point to `https://app.yamdy.net` in the same tab. Internal navigation uses native anchors. No duplicate authentication.

src/lib/analytics.ts emits provider-neutral yamdy:analytics CustomEvents. It stores no identifiers/cookies and sends no network requests. Events: landing_cta_click, hero_start_click, signin_click, nav_click, interactive_demo_started, interactive_demo_approved, product_section_view, results_section_view, final_cta_click. Section views fire once per mount using IntersectionObserver. Properties contain only location/section or the demo scenario. A future analytics provider can subscribe at the application boundary.

## SEO and social artwork

Root metadata includes accurate title/description, canonical https://yamdy.net/, Open Graph, Twitter large-image metadata, theme color and brand favicons. JSON-LD includes Organization and SoftwareApplication without invented reviews, pricing or ratings. robots.txt and sitemap.xml cover the real root URL only.

public/og-yamdy.png is dedicated 1200x630 artwork, not a screenshot. scripts/generate-brand-assets.py reproducibly generates it and the favicon/Apple touch icon with Pillow/fonttools/brotli and the installed licensed Montserrat font.

## Performance

3D is a dynamically imported chunk, gated by desktop, motion preference and viewport proximity. Offscreen scenes unmount. Canvas uses frameloop demand, capped DPR 1.5, low-power preference, simple lights/materials and no textures/postprocessing. Pointer updates mutate transforms and invalidate frames without React state. Scene spaces and logo dimensions are reserved. No loader blocks first paint, no stock images, video, analytics vendor or redundant animation library.

The optional Three/Fiber chunk is approximately 242 KB gzip and is excluded from mobile/reduced-motion initial loading. Tailwind source scanning targets the actual route and landing components; the stylesheet is 9.56 KB gzip. The main client shell is inherited from TanStack Start. An expected large lazy-chunk build warning remains. See QA.md for measured Lighthouse results.

Run `npm run build`, then `npm run preview` to serve the generated Cloudflare worker locally at http://127.0.0.1:4173. The preview uses Wrangler because the inherited Vite preview path does not match this worker output. Wrangler is pinned to an audited release that meets the existing Bun minimum-release-age policy. Both npm and Bun lockfiles are supplied. The bundled font license is public/brand/Montserrat-OFL.txt.

## Content inputs still needed

- Missing pitch deck for independent verification of the brief's reported pilot result and business positioning. The qualified +30% early-pilot claim is sourced to the supplied brief, not the logo guide.
- Authoritative Privacy/Terms URLs or approved legal content. Dead links and invented legal pages are omitted.
- Product screenshots and verified module availability for replacing conceptual fragments with actual UI.
- Licensed GE SS Two plus approved Arabic copy for full localization.
- Analytics provider choice, if desired; hooks are ready.

No deployment, remote changes, or git history rewrite was performed.
