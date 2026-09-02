# Design QA — 1M Electric Study

## Result

**final result: passed**

The implementation was compared against the accepted `SIGNAL SEQUENCE` concept at the desktop first viewport and against its mobile and tri-fold projections. No actionable P0, P1, or P2 issue remains.

## Evidence

- Accepted concept: `public/assets/accepted-concept.png` (1536 × 1024)
- Desktop implementation: `qa-website-hero.png` (1600 × 1000 Browser/IAB capture)
- Mobile implementation: `qa-website-mobile.png` (390 × 844 Browser/IAB capture)
- Pamphlet outside: `pamphlet-outside.png` (1122 × 794 render of A4 landscape sheet)
- Pamphlet inside: `pamphlet-inside.png` (1122 × 794 render of A4 landscape sheet)
- Browser console: no warnings or errors
- Desktop layout: `scrollWidth 1600 == clientWidth 1600`; no horizontal overflow

## Fidelity ledger

| Surface | Concept evidence | Render evidence | Result |
|---|---|---|---|
| Information hierarchy | Large 1M, yellow ELECTRIC STUDY, short value line, 01→06 sequence | Same hierarchy and sequence in the desktop first viewport | Passed |
| Typography | Heavy Korean/display type plus mono archive labels | Noto Sans KR/DM Sans with IBM Plex Mono labels; control type is explicit | Passed |
| Color and geometry | `#0A0A0A`, `#F0ECE0`, `#E8FF00`, one-pixel rules, square controls | Tokens match; no rounded cards, glow, or unrelated gradients | Passed |
| Hero imagery | Badge-free satin-black compact performance coupe, rear-three-quarter crop | Dedicated generated EV asset with exhaust removed and no badge | Passed |
| Container model | Open bands, sequence rail, editorial folds rather than card grid | Same open-band and ruled-rail structure on web and print | Passed |
| Responsive continuation | Six narrow mobile sequence views and compact navigation | 390 × 844 view preserves hierarchy; menu opens and every section remains reachable | Passed |
| Form states | Input, validation, completion shown in the concept | Invalid, loading, and success states verified in Browser/IAB | Passed |
| Print projection | Outside/inside A4 tri-fold with sequence meaning preserved | Two exact-ratio rendered pages plus print CSS and print controls | Passed |

## Above-the-fold copy diff

Allowed and rendered: `1M ELECTRIC STUDY`, `UNOFFICIAL CONCEPT`, `정체성 / 전환 / 주행 감각 / 구조`, `소식 받기`, `익숙한 균형. 새로운 동력.`, `비공식 콘셉트 디자인`, three principles, and six sequence labels. No unapproved marketing claim was added.

## Interaction and accessibility checks

- Desktop and mobile navigation scroll to the selected sequence section.
- Mobile menu exposes all six sections and closes after a selection.
- Email field has an accessible label, invalid state, inline recovery message, loading state, and success announcement.
- Keyboard focus is visible on the email field; buttons use semantic elements.
- Images have descriptive alternative text; reduced-motion preference disables nonessential animation.
- Target specifications are explicitly identified as concept targets.

## Intentional deviations

- The web hero uses a wider, larger vehicle crop than the small desktop frame inside the concept board because the production projection is a full 1600 × 1000 viewport. Copy order, focal balance, palette, and navigation anatomy remain unchanged.
- The generated vehicle is original and badge-free rather than reproducing official BMW brand marks.
- Mailing-list submission is a local prototype state; no personal data leaves the browser.

## Final checklist

- [x] Source and implementation opened and visually compared in one QA pass
- [x] Fonts, spacing, color, imagery, copy, controls, and icons inspected
- [x] Desktop and 390 px mobile viewport inspected
- [x] Pamphlet outside and inside rendered and inspected
- [x] Core update-request path verified from error through success
- [x] Build and Sites packaging checks passed
