# Yamdy component language

Current implementation: `src/yamdy-components.css`, imported by `src/styles.css`. This refines the approved compositions; it adds no external design system.

## Editorial marketing

Montserrat, cream / green / charcoal, large prices and numbers, thin rules, crossed-out values, explicit recommendation language, target-attached handwritten arrows. Unboxed grouping is the default; enclosing surfaces have 0–8px corners. Purple is a restrained annotation or underline. No sparkle, wand, brain or robot icon appears in the rendered marketing sections.

The hero recommendation is typography on the output side of the existing logo rail. Its previous white panel, colored edge, lavender icon and generous rounded padding are removed. The process recommendation is stage 04 with one SAR 42 → SAR 39 value. The other process stages use numbers, values or simple approval/execution marks, without boxed wells. The loop remains an editorial operating composition.

## Actual product

The interactive demo is the single software panel. It derives its IBM Plex Sans typography, neutral Pricing Opportunity pill, green action, neutral secondary controls, price comparison band and 12px panel / 8px button radii from Stitch. Those product radii are deliberately distinct from marketing rules. Approval, editing, cancellation, ignoring, reset and simulated publication remain functional with keyboard input and live status announcements. No invented confidence score is displayed.

Read-only Stitch references, project `8813799588670496359` (Yamdy SaaS Onboarding Experience):

- AI Opportunity Detail: `cf947dee5ebb4fc1abdd4d4865a6f92b` — primary focused decision component.
- Home / Opportunity Inbox: `ddebc44b01c54535bfd0d894df7f0a86` — opportunity hierarchy and status semantics.
- Pricing Intelligence: `4b3cd48b44ba4ff0a5dd03efbc8b7dd7` — pricing hierarchy and comparison treatment.

Only fragments are reproduced, not complete screens. Reference exports inspected locally are in ignored `tmp/stage3-ref-*.html` and `tmp/stage3-opportunity-reference.png`.

## Card reduction method

Compare large recommendation-panel wrappers in the ready state: hero output (1), process recommendation (1), demo outer workspace (1), nested demo recommendation (1). Before: **4**. After: **1**, the authentic demo workspace. **75% fewer large card wrappers.** Small product chips, price band, buttons and diagram signal outlines are excluded consistently; this is not a claim that every bordered shape was removed. Six boxed process value/icon wells and the completion/ignore state boxes were also flattened. All added proof, strategic notes, Saudi context and CTA content is unboxed.

## Content and assets

Pitch deck page 10 supports +30% profit in one month, repricing/bundles and first pilot Segment C. The proof explicitly identifies an agency engagement, one client and no future guarantee. Its hand-drawn bars show relative change, not a fabricated time series. Page 8 supports experiment velocity, aggregator access and building above middleware; page 1 supports Riyadh positioning.

The demo background is an AI-generated illustrative kitchen, not a customer venue or evidence. Built-in image generation prompt: contemporary independent Saudi casual-dining kitchen pass, stainless steel, warm amber lamps, charcoal walls, unbranded kraft delivery bags and burger/fries, restrained green accents; left negative space, right kitchen detail, muted charcoal; no people, skyline, flags, logos, readable text, screens or corporate imagery. Original: `C:/Users/ahmad/.codex/generated_images/01a0fcc9-f4d7-7350-bd71-5d2a6aa61286/exec-50263e8f-ff17-4ec5-922a-9dacb9834b6c.png`. Format-only WebP conversion: 1536×1024, quality 82, method 6, **87,644 bytes**, `public/images/yamdy-kitchen.webp`; lazy, async decoding, low fetch priority. No logo or product UI is baked into the picture.

TODO: publish approved Privacy and Terms pages and then replace the footer's inert, labeled pending-publication text with verified routes. No guessed legal URLs are shipped.
