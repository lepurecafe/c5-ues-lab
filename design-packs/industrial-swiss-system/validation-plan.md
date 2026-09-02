# Industrial Swiss — Runtime validation plan

> This plan operationalizes [industrial-swiss-system.md](industrial-swiss-system.md) §§3, 5, 6, and 8. It does not assert that a checkout, trademark, inventory, or product data integration exists.

## Evidence hierarchy

| Evidence | It can prove | It cannot prove |
| --- | --- | --- |
| Figma/source screenshot | visual inventory and composition | business truth, accessibility, runtime recovery |
| static test/build | code path and token use | human usability or live inventory behavior |
| target runtime trace | observed result on a real build | broad accessibility coverage by itself |
| keyboard + screen reader run | input/focus/announcement behavior | commercial/legal authorization |
| data/legal sign-off | approved claims and source-of-truth policy | visual/interaction quality |

## Commerce test matrix

| ID | Scenario | Expected result | Evidence to retain |
| --- | --- | --- | --- |
| COM-01 | Browse, filter, select product, return | filters and scroll/selection context follow stated policy | runtime capture + assertion |
| COM-02 | Select unavailable variant | purchase is blocked; context retained; alternative/back route named | UI capture + accessibility check |
| COM-03 | Inventory changes at commit | no false confirmation; new state/value disclosed; retry/alternative/back present | mocked authority trace + UI capture |
| COM-04 | Price changes at confirmation | old/new price and reconfirmation behavior shown | fixture + UI capture |
| COM-05 | Duplicate commit | only one order attempt is submitted while processing | network/mock assertion |
| COM-06 | Payment/order failure | entered safe data/context retained; retry/contact route explained | fixture + UI capture |
| COM-07 | Confirmed order | durable receipt/identifier and next action; toast is supplemental | runtime capture |
| COM-08 | Drop alert consent | channel, frequency, unsubscribe, and confirmed consent are explicit | interaction capture + policy link |

## Catalog and operations test matrix

| ID | Scenario | Expected result |
| --- | --- | --- |
| CAT-01 | Image missing | product identity, SKU, availability, price, and action remain usable; alt/fallback is meaningful |
| CAT-02 | Long/localized text | no clipping; price/currency and product name remain unambiguous |
| OPS-01 | empty/loading/error table | cause, retained filters, freshness, and recovery are visible |
| OPS-02 | metric delta | label, signed change, baseline, and timestamp/source shown; not color-only |
| OPS-03 | narrow layout | rows become labeled records before critical data becomes horizontally inaccessible |

## Accessibility and responsive runs

- [ ] Keyboard-only: header, anchors, catalog filter, card action, variant, form error, confirm/cancel, toast dismissal/recovery.
- [ ] Screen reader: heading hierarchy, image alternative, labels/errors, current step, dialog focus/consequence, stock/order announcements.
- [ ] Visual: actual contrast pairs and focus indicator measured after brand adapter is applied.
- [ ] Responsive: `390px`, `768px`, `1400px+`; no critical horizontal overflow or clipped display text.
- [ ] Reduced motion: all success/failure/progress information persists without animation.

## Brand, data, and physical-artifact sign-off

- [ ] Product imagery and marks are licensed for the target placement.
- [ ] SKU, price, availability, materials, origin, care, tax, fulfillment, and inventory claims have named authorities.
- [ ] Hang tag, shipping label, and garment-label content is reviewed for applicable market/legal requirements.
- [ ] Reference samples (`SXC-*`, sample prices, “Made in USA” style content) are removed or replaced with approved data.

## Exit record

| Build / URL | Test fixture | Pass / gap | Owner | Evidence link |
| --- | --- | --- | --- | --- |
| YYYY-MM-DD | COM-01 through COM-08 | pending | product/engineering | — |
