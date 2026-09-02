# men I trust — Design QA

> Result: **passed**  
> Reviewed: 2026-08-24  
> Scope: desktop landing-page implementation, first viewport and core interactions

## Comparison input

- **Source:** `../assets/selected-brand-direction.png` (1487 × 1058)
- **Implementation capture:** `implementation-desktop-top.png` (1280 × 720)
- **Normalized comparison:** `design-comparison.png` (source and implementation, each normalized to 900 px wide)
- **Viewport / state:** in-app desktop browser, 1280 × 720, landing-page top state. The source is a brand-direction moodboard, not a page mockup; this is a deliberate system-translation review rather than a pixel-copy review.

## Visual comparison

| Surface | Assessment | Evidence |
| --- | --- | --- |
| Typography | Pass | The oversized condensed Korean headline, compact utility labels, and restrained wordmark preserve the source's technical editorial hierarchy. The editable HTML wordmark is intentionally cleaner than text embedded in the generated moodboard. |
| Layout / hierarchy | Pass | The asymmetric copy-to-product split, generous paper space, thin rules, and sharp section boundaries project the moodboard into a usable web entry point. |
| Color / material | Pass | Paper/ivory ground, midnight navy, cool steel information tone, and sparse amber accents match the selected Field Manual palette. |
| Imagery | Pass | The hero still life and object crops keep the limestone, navy packaging, brushed-steel, and amber-material language without copying any automotive imagery. |
| Copy / brand voice | Pass | Korean copy replaces moodboard-only phrases with a clear grooming promise and next action, while keeping the concise, factual tone. |

## Interaction and accessibility checks

- The three routine tabs change the recommendation title, description, and ordered steps; the active tab exposes `aria-selected` and the result region is announced with `aria-live`.
- The consultation form requires an email, accepts a grooming concern, and exposes a visible success status after submission.
- Primary navigation uses semantic anchors, images have Korean alternative text, form labels are connected, focus states use the amber token, and reduced-motion preference disables transitions.
- `npm run build` and `npm run test:sites` completed successfully after implementation.

## Finding ledger

| Priority | Finding | Resolution / next action |
| --- | --- | --- |
| P3 | The in-app browser retained a fixed desktop capture size when a mobile viewport was requested. | Responsive breakpoints at 850 px and 480 px are implemented, but a real mobile viewport capture should be added before production release. |

No P0, P1, or P2 visual mismatches remain in this initial-branding scope.

## Comparison history

| Pass | Scope | Outcome |
| --- | --- | --- |
| 1 | Selected Field Manual moodboard → desktop landing page | Passed; no corrective visual iteration required. |
