# Yamdy V2 performance investigation

Measured on the local production Cloudflare preview with Lighthouse 13.5, installed Chrome, fresh audit profiles, October 3, 2026 (local time). Desktop uses the Lighthouse desktop preset; mobile uses its default simulated slow connection and 4× CPU slowdown. These are lab results, not deployed Core Web Vitals or field INP. Audits ran sequentially, after build/tests completed.

## Findings and actual results

| Metric                | Original desktop | Final desktop | Final mobile |
| --------------------- | ---------------: | ------------: | -----------: |
| Performance           |               60 |            98 |           83 |
| Accessibility         |               95 |           100 |          100 |
| FCP                   |          1.189 s |       0.571 s |      2.128 s |
| LCP                   |          1.365 s |       0.615 s |      2.345 s |
| Total blocking time   |           877 ms |       69.5 ms |       462 ms |
| CLS                   |         0.000411 |      0.000405 |     0.000084 |
| Maximum potential FID |           593 ms |        293 ms |      1191 ms |

Maximum potential FID is a synthetic estimate, **not INP**. No field INP measurement is available. The original browser audit was desktop only, so there is no matched original-mobile comparison.

The first load combined synchronous SVGLoader parsing, shape triangulation and ExtrudeGeometry creation with React Three Fiber initialization, shader/first-frame preparation and realtime shadows. The original unindexed geometry contained 49,008 vertices / 16,336 triangles at curveSegments 18. The original Three scene consumed about 688 ms of script time in the audit. Main-thread tasks also included React hydration (593 ms), GSAP initialization (339 ms), document processing (232 ms), and another React task (151 ms); attributing the entire freeze to extrusion alone would be inaccurate. A separate Node measurement of the old extrusion was 265 ms; that is supporting evidence, **not a browser timing**.

The final extended desktop trace includes GLB loading and a successful first frame. From enhancement request: model loaded at +516.6 ms, compilation started at +523.7 ms, first frame at +680.0 ms, ready at +683.6 ms. Compile-to-first-frame took 156.3 ms wall time, including asynchronous GPU work. Deferred main-thread tasks above 50 ms were 58.0, 116.2, 135.3, and 66.6 ms. The earlier GLB + R3F revision still produced a 207.7 ms deferred task, motivating the smaller imperative renderer.

**The strict ~50 ms task target is not fully met.** SVG extrusion is gone and measured desktop blocking fell substantially, but vendor evaluation / WebGL setup still produces cold tasks. Throttled mobile React hydration remains material even though mobile downloads neither Three.js, GLB, nor GSAP. LCP and CLS meet the requested lab targets; immediate native links/static hero and smooth manual scroll were verified. Further hydration/vendor reductions require additional work; no claim of guaranteed INP <200 ms or zero dropped frames is made.

## Asset pipeline

```
brand/yamdy-logo.svg
    → npm run generate:logo
    → public/models/yamdy-logo.glb
    → public/models/yamdy-logo.stats.json
```

Generator: `scripts/generate-yamdy-logo-model.mjs`. It parses the official compound SVG in Node, preserves its 12 shapes and 4 holes, extrudes at depth 16 with curveSegments 8 / one step / no bevel, corrects reflected triangle winding, merges and indexes matching vertices, then writes a valid binary GLB. Source SHA-256 is recorded in the stats. The source paths are unchanged; only curve tessellation is reduced. Inspect the rendered logo after regeneration if the official SVG changes.

- GLB: **309,228 bytes** (309.2 decimal KB / 302.0 KiB); gzip comparison 92,724 bytes. Actual HTTP compression depends on hosting and is not assumed.
- **10,984 indexed vertices, 7,296 triangles**, one GLB mesh with two material primitives (front/sides); GLTFLoader exposes two renderable parts.
- No texture, animation, UV, HDR, decoder or unused asset payload. Meshopt/Draco were omitted: adding decoder startup was unnecessary for this small untextured model.
- No SVGLoader, ExtrudeGeometry, shape triangulation or geometry generation executes in the browser. GLB binary decoding / GPU upload remain necessary.

## JavaScript and rendering

Production build gzip comparison: initial shared + route JS approximately **122.1 KB → 126.7 KB**. The small increase carries three additional sections and working demo controls. This is a build-size comparison, not all network bytes or an assertion that hydration is free. Three.js was already split in the original build, but its enhancement was initiated immediately; it is now scheduled after the static page.

Optional Three scene chunk: approximately **255.4 KB → 154.2 KB gzip** (final raw 613.9 KB). R3F is no longer imported by the page. GSAP remains a separate ~45.1 KB gzip chunk and is skipped on mobile/reduced-motion. CSS is ~9.5 KB gzip. Local Montserrat fonts remain; the 600 face is preloaded and font-display is swap. Font and layout costs are included in the audit, without introducing a remote font request.

The final scene uses matte Lambert materials, ambient light, one key and one fill. Original 1024px realtime shadow generation was removed; CSS supplies the soft shadow. There are no environment maps before or after, no large HDR, contact shadows, bloom, SSAO or postprocessing. DPR is capped at 1.5. The renderer has no perpetual animation loop: coalesced RAF renders occur only for ready/resize/scroll/pointer changes. Pointer updates are throttled to 32 ms with about ±3° tilt. Model geometry is cached for offscreen remounts; renderer/materials/listeners are disposed on unmount.

GSAP first-load entrance timelines were replaced with CSS, avoiding forced layout work at hydration. Desktop scroll choreography is concise and unpinned (~0.85 viewport for the hero baseline transition). Mobile convergence uses coalesced native updates; reduced motion remains static.

## SVG → 3D policy

The exact official SVG renders in server HTML with a reserved frame and no spinner, loading text, skeleton or empty canvas. Desktop framing aligns its scale with the orthographic model. An idle callback (timeout 3500 ms; timer fallback 1800 ms) schedules a dynamic import only on qualifying visible desktop devices. The model loads asynchronously, materials are prepared, `renderer.compileAsync(scene, camera)` completes, and the first rendered frame precedes the ready class. SVG and canvas crossfade over 800 ms. No ready signal means the SVG stays visible. Context loss restores it; restoration recompiles before revealing the canvas.

Eligibility uses viewport ≥900 px, no reduced-motion preference, ≥4 logical CPUs, ≥4 GB reported device memory when available, and no data-saver signal. It does not use user-agent sniffing. Mobile and low-capability devices keep the intentional SVG composition, and the final mobile network audit confirms zero scene/model/GSAP requests. Unsupported WebGL or failed imports retain the SVG. During QA a deliberately stopped preview caused an old chunk request to fail: fallback remained complete; that diagnostic is distinct from errors in the final running build.

## Reproduction and evidence

```
npm run generate:logo
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

If the local UTC date precedes Nitro's generated compatibility date, preview with `node node_modules/wrangler/bin/wrangler.js dev --config .output/server/wrangler.json --local --port 4173 --compatibility-date=2026-10-02` for this local review. No deployment was performed.

Lighthouse command (set CHROME_PATH to installed Chrome):

```
node node_modules/lighthouse/cli/index.js http://127.0.0.1:4173/ --only-categories=performance,accessibility --preset=desktop --chrome-flags="--headless --no-sandbox" --output=json --output-path=tmp/v2-verified-desktop.json --save-assets --quiet
```

Omit `--preset=desktop` for the mobile audit. Quote the categories argument in PowerShell. Raw JSON, trace and DevTools logs are retained locally in ignored `tmp/v2-before*`, `tmp/v2-verified-desktop*`, and `tmp/v2-verified-mobile*`. Compact tracked results: `docs/qa/performance-summary.json`. Trace markers: yamdy:enhancement-requested / model-loaded / compile-start / first-frame / 3d-ready.

Production browser scroll inspected at 1440×900, 1920×1080, 1366×768 and 390×844, including viewport changes. No horizontal overflow, misplaced arrowheads or text overlap in reviewed captures. Small clipped annotation lettering and oversized desktop framing were corrected. Keyboard edit/cancel/ignore/reset/approve/live and loop selection were verified. Screenshots: `docs/qa/v2-*.jpg`, including complete page captures. Typecheck/build pass, seven tests pass, lint zero errors with six existing UI-template fast-refresh warnings. Vite's >500 KB warning concerns the optional split Three chunk.

This milestone ends at the interactive recommendation demo. See `V2_STAGE_REVIEW.md` for visual and Stitch source details.

## Complete-page milestone — October 3, 2026

Current page scope is nine sections plus footer; earlier tables above describe the five-section milestone. Component changes and responsive evidence: COMPLETE_PAGE_REVIEW.md and COMPONENT_LANGUAGE.md.

Final sequential Lighthouse audits, fresh profiles on the same local production preview:

| Metric                | Complete desktop | Complete mobile |
| --------------------- | ---------------: | --------------: |
| Performance           |               99 |              93 |
| Accessibility         |              100 |             100 |
| FCP                   |          0.741 s |         2.522 s |
| LCP                   |          0.811 s |         2.621 s |
| Total blocking time   |             0 ms |            6 ms |
| CLS                   |         0.000405 |        0.000086 |
| Maximum potential FID |            39 ms |           62 ms |

Desktop versus prior milestone: performance 98 → 99, LCP 0.615 → 0.811 s. Mobile: performance 83 → 93, LCP 2.345 → 2.621 s, TBT 462 → 6 ms. Single-run lab results vary; the LCP increase is real in these runs and the mobile 2.5 s target is narrowly missed. Maximum potential FID is not field INP.

The final desktop trace confirms model loading, compileAsync and the first frame: model +418.0 ms, compile +419.6 ms, first frame +489.9 ms, ready +491.1 ms relative to enhancement request. No post-request renderer-main RunTask exceeded 50 ms in this capture. Initial tasks of 284.5 ms and 87.9 ms remain before the enhancement request; mobile has a 216.4 ms pre-enhancement task. Therefore low Lighthouse TBT does **not** prove that all startup tasks are under 50 ms. The earlier cold deferred tasks documented above remain valid evidence of hardware/run variability. No guarantee of zero freeze or INP under 200 ms is made.

Mobile network audit confirms no Three scene, GLB, GSAP or kitchen request during initial-load collection. Desktop loads the deferred scene/GLB/GSAP successfully and requests the lazy kitchen when the audit brings lower content into range. Native links and the static SVG are available in server HTML. The optimized model remains 309,228 bytes / 10,984 vertices / 7,296 triangles; no new runtime extrusion or WebGL scene.

Initial shared + route JavaScript is ~128.6KB gzip, ~1.9KB above the prior five-section page. Optional Three remains ~154.2KB gzip, GSAP ~45.1KB, final CSS ~12.4KB. Added IBM Plex Sans WOFF2 is ~46.8KB and is not preloaded. Browser may discover it early from server-rendered product content. Kitchen is 87,644 bytes, lazy/async/low-priority, with explicit dimensions. Only four existing desktop ScrollTriggers remain; the new compounding draw reuses the shared observer and runs once via CSS.

Reproduce with the earlier Lighthouse command, output paths `tmp/complete-verified-desktop.json` and `tmp/complete-verified-mobile.json`. Raw traces and DevTools logs stay in ignored tmp. Tracked compact evidence: `docs/qa/complete-performance-summary.json`. Intermediate audits detected proof text contrast and a mobile annotation; both were corrected before the final 100/100 accessibility runs. Typecheck, build and seven tests pass; lint has zero errors and six inherited warnings.
