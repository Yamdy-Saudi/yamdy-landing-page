# Complete landing page review — October 3, 2026

The approved first five compositions are retained: cream hero, green dilemma, cream decision system, neutral operating loop, photographic product demo. The page now continues through green pilot proof, cream compounding flywheel, local Saudi editorial section, bold green final CTA and minimal footer. Navigation Results and Why Yamdy anchors are active. All app CTAs point to https://app.yamdy.net.

Component rules, card reduction method, three Stitch references, source claims, generated imagery and legal TODOs: [COMPONENT_LANGUAGE.md](COMPONENT_LANGUAGE.md). Actual performance evidence and limitations: [PERFORMANCE.md](PERFORMANCE.md).

## Validation

- Strict typecheck passes; production build passes.
- Seven tests pass across two files, including approval-before-publication, price editing, invalid edits, ignoring/reset and reduced-motion behavior.
- Lint: zero errors, six inherited fast-refresh warnings in UI template files.
- Actual browser review: 1920×1080, 1440×900, 1366×768, 1024×768 and 390×844. Complete-page captures plus section viewport captures are saved under `docs/qa/complete-*.jpg`. Viewport captures are authoritative for motion state; full-page captures can show different offscreen animation states.
- No horizontal overflow or offscreen headings/actions in DOM boundary checks. Mobile demo's long headline and flywheel labels were corrected; mobile suppresses the nonessential hero decision annotation. Circular identity is retained, with wrapped side labels and a smaller center logo.
- Keyboard Edit → Cancel, Approve → Approved → Publishing → Live, Ignore → Try again verified in the browser. Mobile navigation opens with Enter, Results navigates and closes the menu. The demo is illustrative and sends no change to a restaurant.
- Existing target-attached annotations and measured SVG connectors remain in the approved dilemma. The desktop diagram remains connected at the 1024px breakpoint.
- New proof small text and mobile handwritten note were corrected following Lighthouse contrast findings.

## Motion and loading audit

There is exactly one eligible WebGL scene, in the hero; the GLB and renderer are unchanged from the optimized milestone. Mobile uses the actual SVG, not a blank placeholder. No new Three imports, realtime shadow maps, environment textures or render loops were introduced.

Desktop has four existing ScrollTriggers (hero rail, chaos convergence, ordered signal, operating-loop traveler). New compounding motion is a 2.5-second CSS SVG stroke draw, once on entry. It reuses the shared IntersectionObserver and unobserves revealed targets; it adds no ScrollTrigger, observer or resize listener. Reduced motion draws the complete static loop immediately. Existing resize/scroll connector updates coalesce into RAF; mobile convergence batches layout reads before writes. Cleanup disconnects observers/listeners and reverts desktop timelines.

IBM Plex Sans 400/600 is self-hosted only for authentic product UI, uses swap and adds approximately 46.8KB WOFF2. It is not preloaded, though the browser may request it early because the panel is present in server HTML. The photographic WebP is lazy and is not the hero LCP resource. Initial shared plus route JS is approximately 128.6KB gzip versus 126.7KB at the prior five-section milestone; optional Three (~154.2KB gzip) and GSAP (~45.1KB gzip) remain split.

Remaining content item: legal page publication. Performance lab results do not establish field INP or guarantee absence of cold vendor/hydration tasks on every device. No deployment or git history rewrite was performed.
