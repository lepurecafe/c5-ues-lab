# Industrial Swiss System

> **ID:** `pack:industrial-swiss`  
> **Version:** 1.0.0  
> **Source reference:** [Figma Make — Design System for Supreme Carhartt](https://www.figma.com/make/bGRtYeF5OdBLHeWRW3qDGg/Design-System-for-Supreme-Carhartt?t=cNiVNf4Ilicmgbuq-1)  
> **Source inspected:** 2026-08-24, Figma Make version 2  
> **Evidence level:** visual inventory and visible flow rules captured; runtime assistive-technology and complete checkout recovery tests remain release gates.

> **Preview:** [preview.html](preview.html) demonstrates the token field, grid, catalog, operations surface, and local flow state. It creates no order and is not evidence of commerce integration.

## 0. Intent, scope, and rights boundary

Industrial Swiss System combines **Swiss grid discipline**, **workwear material honesty**, and **streetwear-scale graphic hierarchy**. It produces dense but calm commerce and operational surfaces: hard edges, large condensed type, canvas-like grounds, specimen-label metadata, and deliberately limited color.

This is a reusable visual-system document, not a claim of affiliation. “Supreme × Carhartt” in the source is a **visual reference and sample context only**. It does not grant a trademark, logo, product-image, collaboration, origin, pricing, or merchandising right. Replace all brand marks, product imagery, SKU, origin, price, and availability examples with approved product data before publication.

| This pack owns | This pack does not own |
| --- | --- |
| visual hierarchy, layout geometry, component expression, surface/material language, token roles | product taxonomy, inventory truth, pricing, legal claims, payment, fulfillment, user permissions, recovery/business rules |

### Use when

- a product has an authorized workwear, industrial, archival, skate/street, or catalog voice;
- dense catalog, inventory, or operations data needs a confident hierarchy;
- sharp geometry and direct action language are appropriate for the audience.

### Do not use when

- the product requires soft, therapeutic, playful, or luxury-minimal expression;
- brand, product, provenance, or image rights are not cleared;
- a reduced-information or highly conversational interface is the primary experience.

---

## 1. Visual grammar

### 1.1 Governing rules

| Principle | Contract | Anti-pattern |
| --- | --- | --- |
| Grid first | Align every major region to the 12-column system; let type and data determine height. | decorative cards that ignore the grid. |
| Material honesty | Use canvas, stone, ink, stamp, label, and hairline cues as restrained structural signals. | faux distress, noisy textures, or a texture behind critical copy. |
| Graphic hierarchy | Condensed display type makes the primary message unmistakable; mono labels make metadata scannable. | multiple competing headlines or mono body paragraphs. |
| Bounded signal | Red carries urgent primary action; gold is a limited collaboration/quality accent. | using red, gold, or color alone to communicate status. |
| Hard utility | Corners, borders, tables, and controls are precise and functional. | glassmorphism, soft shadows, pills, or gratuitous rounded panels. |

### 1.2 Page architecture

**Observed source anatomy:** a compact utility header (`S×C / DS-01`), anchor navigation, oversized collection/title block, token and component specimens, fashion catalog cards, web/operations data, physical-label examples, and a four-step linear flow.

| Region | Required content | Layout rule |
| --- | --- | --- |
| Utility header | pack ID, current section, navigation | compact, sticky only if it does not obscure focused content |
| Hero / collection lead | season or context, display headline, one-sentence rationale | 12-column alignment; one dominant headline |
| Reference rail | section anchors / section code | no hidden state; active section has text, not color alone |
| Specimen field | token, type, component, or grid example | show token/value/usage together |
| Product catalog | image, title, SKU, size/options, price, availability, action | product decisions stay adjacent to product data |
| Operations surface | metric, delta, table/list, timestamp/context | numbers get labels and comparison basis |
| Physical artifact | tag, stamp, shipping or garment-label system | sample content must be clearly non-production |
| Linear flow | current step, prior completion, next action, recovery | incomplete steps are never silently bypassed |

### 1.3 Content voice

- Write labels as factual catalog language: `SKU`, `SIZE`, `STATUS`, `UNITS SOLD`, `ARCHIVE`.
- Use short, direct action verbs: `ADD TO CART`, `CONTINUE`, `SAVE`, `REMOVE`.
- Use mono for codes, dates, inventory values, and secondary technical detail—not for explanatory body copy.
- Treat product copy, origin, materials, sustainability, availability, and price as data requiring a source of truth. Never fabricate them to complete a composition.

---

## 2. Foundation tokens

### 2.1 Raw color inventory

| Token | Value | Visual role |
| --- | --- | --- |
| `--ground` | `#1A1713` | deepest ink / page ground |
| `--ground-soft` | `#221E19` | lower-contrast dark region |
| `--ground-raised` | `#2A2520` | dark raised surface |
| `--canvas` | `#F2EDE5` | primary warm reading canvas |
| `--canvas-dark` | `#E0D8CC` | recessed canvas / quiet fill |
| `--signal-red` | `#E8111A` | primary action, urgent signal |
| `--signal-red-dark` | `#B50D14` | pressed/dark red context |
| `--work-gold` | `#C69B4E` | bounded quality/collaboration accent |
| `--work-gold-dark` | `#8B6914` | dark gold context |
| `--stone` | `#7A7060` | secondary text / supporting border |
| `--stone-light` | `#A89F92` | quiet metadata / low-emphasis divider |

### 2.2 Semantic token contract

Do not bind components directly to a raw brand/reference color. The adapter below permits a legally cleared brand palette to replace the raw layer without changing component meaning.

| Semantic token | Default mapping | Required use |
| --- | --- | --- |
| `--color-page` | `var(--canvas)` | default light page |
| `--color-page-inverse` | `var(--ground)` | inverse region |
| `--color-surface` | `var(--canvas)` | card/form/table surface |
| `--color-surface-raised` | `var(--ground-raised)` | inverse utility surface |
| `--color-text` | `var(--ground)` | primary text on canvas |
| `--color-text-inverse` | `var(--canvas)` | primary text on dark ground |
| `--color-text-muted` | `var(--stone)` | supporting copy only |
| `--color-border` | `var(--stone-light)` | default divider/control border |
| `--color-action-primary` | `var(--signal-red)` | primary commit action |
| `--color-action-primary-pressed` | `var(--signal-red-dark)` | pressed primary action |
| `--color-accent` | `var(--work-gold)` | bounded non-semantic accent |
| `--color-focus` | `var(--signal-red)` | visible focus indicator |
| `--color-success` | **PRODUCT-DEFINED** | confirmed/success state; never infer from gold |
| `--color-warning` | **PRODUCT-DEFINED** | warning state; pair with icon/text |
| `--color-danger` | `var(--signal-red)` or **PRODUCT-DEFINED** | destructive action, always named |

### 2.3 Type roles

| Role | Source family | Scale in source | Rules |
| --- | --- | --- | --- |
| Display | `Barlow Condensed` | `96 / 72 / 48 / 32px` | collection name, hero, section masthead; uppercase only where language remains legible |
| Body | `DM Sans` | `18 / 14px` | product description, helper copy, forms, tables; preserve comfortable line length |
| Mono | `Space Mono` | `12 / 11px` | SKU, price metadata, token values, labels, timestamp; do not use for long prose |

**Implementation floor:** provide metrically compatible fallbacks and test Korean/CJK, diacritics, long product names, currency, and localization before fixing line breaks. Text is content, not a decorative texture.

### 2.4 Geometry, spacing, layers, and motion

| Family | Values / contract |
| --- | --- |
| Spacing scale | `4, 8, 12, 16, 24, 32, 48, 64, 80, 96px` |
| Grid | 12 columns, `24px` gutters, `1400px` max content width |
| Core splits | `3/4/6/12` columns per row; catalog/utility patterns may use `3 + 5 + 4` or `8 + 4` |
| Corner language | squared or near-squared; no pill controls unless the component semantics require a chip |
| Borders | visible hairline first; shadows are secondary and sparse |
| Layer order | base < sticky header < popover < modal < toast; define numeric tokens in the implementation |
| Motion | purposeful opacity/position feedback only; no looping ornamental motion; all nonessential motion respects `prefers-reduced-motion` |

### 2.5 Surface and image policy

- Warm canvas is the main reading ground; deepest ground is reserved for high-contrast inverse regions and catalog authority.
- Canvas grain, workwear weave, label/stamp, and grid lines may appear only at low contrast and outside text-selection, form-entry, data-reading, and status-critical zones.
- A product image requires descriptive alt text. If the image does not load, retain title, SKU, price/status, and action in a stable layout.
- Never use a logo or recognizable brand mark as decorative texture without authorization.

---

## 3. Components and state contract

### 3.1 Component coverage

| Component | Source variants / inventory | Required states |
| --- | --- | --- |
| Button | primary, secondary, ghost, utility, destructive; `XS/SM/MD/LG/XL` | default, hover, focus-visible, pressed, disabled, loading; destructive confirmation where irreversible |
| Badge | `NEW DROP`, `COLLAB`, `LIMITED`, `SOLD OUT`, `FW2024`, `ARCHIVE` | semantic label remains text; color is supplemental |
| Text input | access code, email | label, hint, entered, invalid, valid, disabled, loading lock |
| Select | category: outerwear, bottoms, tops/fleece, accessories, workwear | closed, open, keyboard navigation, selected, invalid, disabled |
| Checkbox / toggle | stock filter, archive filter, authenticity acknowledgement, drop alert | unchecked, checked, focus-visible, disabled; Space toggles native control |
| Notification | drop alert, in stock, sold out | severity/title/body/action/dismiss behavior; announcement policy |
| Product card | image, title, SKU, options, price, action | loading, available, low stock if product supports it, sold out, unavailable/error |
| Data stat | value, label, delta | positive/negative/neutral expressed with sign/text, not color alone |
| Table/list row | inventory/order/catalog record | dense, empty, loading, error, selected if selectable |

### 3.2 Button decision rule

| Variant | May do | Must not do |
| --- | --- | --- |
| Primary red | one highest-commitment action in a local decision group | appear multiple times with equal priority |
| Secondary | safe alternate route | imitate destructive action |
| Ghost | low-emphasis navigation or reversible utility | become the only discoverable completion path |
| Utility | inspect/copy/filter/compact action | hide a high-risk change |
| Destructive | delete/remove/reset after explicit consequence | execute immediately or rely on red alone |

### 3.3 Form and feedback contract

```text
resting → input → local validation → valid
                         ↓
                  invalid: text + icon + field association
                         ↓
submit → processing lock → success / recoverable failure / blocking failure
```

| State | Required behavior |
| --- | --- |
| Invalid | Keep entered value; connect concise error through `aria-describedby`; move focus only when it helps recovery. |
| Processing | prevent duplicate commits, preserve context, announce progress, and expose a safe cancel only if the operation is actually cancellable. |
| Recoverable failure | explain what failed, what remains intact, and the next action (`retry`, `edit`, or `contact support`). |
| Blocking failure | prevent false confirmation; keep form/data unless a clear policy says otherwise. |
| Success | show durable confirmation and the next likely task, not only a transient toast. |

### 3.4 Inventory and status semantics

`SOLD OUT`, `ARCHIVE`, `IN STOCK`, and `DROP ALERT` are operational states, not decorative labels.

- `SOLD OUT`: disable purchase commit, preserve product information, and offer a meaningful alternate route only when it exists (restock alert, related item, or back to catalog).
- `ARCHIVE`: state whether the product is discoverable, purchasable, or read-only; do not leave this to styling.
- `IN STOCK`: must use the inventory source of truth and include refresh/uncertainty behavior where relevant.
- `DROP ALERT`: requires consent, channel selection, frequency, unsubscribe, and confirmation—never a fake toggle.

---

## 4. Composition recipes

### 4.1 Collection / catalog lead

| Assemble | Rule |
| --- | --- |
| Context label + display headline | place season/context above or beside the headline, not inside an image |
| 12-column composition | reserve wide uninterrupted space for the display, then align product/data blocks to columns |
| Signal red | one clear primary route, such as browse or early access—not a decorative banner |
| Metadata | season, category, and availability use mono labels with readable values |

### 4.2 Product card and product-detail module

| Required order | Contract |
| --- | --- |
| 1. Image | alt text identifies product/view; image failure keeps non-image information usable |
| 2. Identity | product name + stable SKU (if the product actually has one) |
| 3. Decision inputs | size/options + availability before the purchase commit |
| 4. Commercial facts | current price/currency, promotions/tax disclosures per market, fulfillment context where required |
| 5. Action + feedback | add/notify/unavailable route has immediate visible and announced result |

**Source specimen values are illustrative only:** `SXC-2024-001` / `$368` and similar values must never pass into production as implied merchandise data.

### 4.3 Operations console

Use the source’s stat rhythm—`Total SKUs`, `Active Listings`, `Units Sold`, `Avg Order`—only as a structure.

| Metric contract | Example rule |
| --- | --- |
| Definition | a label has an unambiguous calculation/source and reporting period |
| Delta | show direction, magnitude, and comparison baseline (`+12 vs. prior week`) |
| Freshness | show update timestamp/status where a stale value would change a decision |
| Empty/error | state cause, retained filters, and recovery/action |
| Table | responsive column priority, row label, sort/filter state, and no-color-only status |

### 4.4 Physical artifact system

Applicable artifacts include hang tag, box stamp/shipping label, and garment label. They inherit display/mono contrast, the grid, and controlled stamp language—but are not automatically a license to print reference branding.

| Artifact | Required content contract |
| --- | --- |
| Hang tag | authorized product name, SKU/identifier, material/care/provenance claims only when verified, required market labels |
| Shipping label | recipient/privacy-safe order data, carrier/service data, machine-readable code with fallback human text |
| Garment label | actual composition, country-of-origin, care, size, legal manufacturer/importer information as applicable |

### 4.5 Web data surface

- Preserve column alignment and mono data labels at desktop scale.
- At narrow widths, transform a row into labeled record fields; never rely on horizontal scrolling as the only way to understand a record.
- Keep filters, sorting, selection count, bulk actions, and error state visibly separate from row content.

---

## 5. Linear commerce flow

The source models a strict four-step path: **Browse → Select → Configure → Confirm**. A visual system may express the flow but cannot invent its business rules; bind the state model below to the product’s real cart, inventory, payment, and fulfillment policy.

### 5.1 State model

| Step | Entry condition | Commit | Exit / recovery |
| --- | --- | --- | --- |
| Browse | catalog is reachable | select a product | preserve filters/scroll position on return |
| Select | product exists and is viewable | choose valid variant/quantity | unavailable variant explains state and offers valid alternatives |
| Configure | selection is valid | provide required delivery/payment/options | field-local validation; saved data policy is explicit |
| Confirm | all required data and final price are current | irreversible order/place action | durable receipt/ID; pending/failure/retry/support routes |

### 5.2 Progress behavior

- The current step is named in text and has `aria-current="step"` where applicable.
- A future step is not interactive until its entry condition is satisfied; disabled state explains why.
- A completed prior step may be revisited only if the product policy permits it. If changing it invalidates later work, warn before discard and name what will be recalculated.
- A progress indicator is orientation, not proof of a completed transaction.

### 5.3 Availability race condition

```text
variant selected → inventory recheck at commit
  ├─ available → reserve/continue according to policy
  └─ unavailable → retain context + announce conflict + offer retry/alternative/back
```

Never show an optimistic “confirmed” state before the server/authority confirms the order. If quantity or price changes after selection, disclose the old/new value and require the appropriate reconfirmation.

---

## 6. Accessibility and responsive floor

### 6.1 Non-negotiable accessibility requirements

- Use semantic native controls wherever possible; labels remain programmatically associated with inputs.
- `:focus-visible` is always visible at least as clearly as hover. Do not remove outlines without a tested replacement.
- Do not use color, texture, or a product image as the only status cue.
- Provide text alternatives for images; meaningful product imagery identifies view/detail, while decorative texture is ignored by assistive technology.
- Toasts/stock updates have a proportional live-announcement policy; do not interrupt typing with routine telemetry.
- Respect `prefers-reduced-motion`; motion cannot be the only success/failure confirmation.
- Test keyboard path through header, anchors, catalog filters, product options, form errors, confirmation, and dismissal/recovery.

### 6.2 Responsive contract

| Range | Layout behavior |
| --- | --- |
| `≥ 1400px` | cap content at `1400px`; maintain 12-column rhythm |
| `768–1399px` | retain grid logic; reduce nonessential columns before reducing text below readability |
| `< 768px` | stack hero/catalog regions; product decisions remain adjacent; table rows become labeled records; no critical horizontal overflow |
| Any width | display type may scale with `clamp()` but must not clip; controls maintain touch target and visible focus |

### 6.3 Contrast and localization gate

- Validate actual foreground/background pairs after brand substitution; raw token names do not prove accessible contrast.
- Test long names, sale/regular price pairs, out-of-stock wording, Korean/CJK and other target locales, currency formats, and right-to-left support if in scope.
- Treat uppercase labels as a language decision, not a universal style rule.

---

## 7. Implementation adapter

The following pseudo-token layer preserves the system while allowing a licensed product implementation to swap reference-specific styling.

```css
:root {
  --color-page: #F2EDE5;
  --color-text: #1A1713;
  --color-action-primary: #E8111A;
  --color-focus: #E8111A;
  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --grid-columns: 12;
  --grid-gutter: 24px;
  --content-max: 1400px;
}

.is-focusable:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto; transition-duration: 0.01ms; animation-duration: 0.01ms; }
}
```

This is a translation guide, not production CSS. The consuming product must define semantic success/warning values, focus contrast, z-index numbers, font-loading behavior, and its actual business-state bindings.

---

## 8. Evidence, gaps, and release gate

### 8.1 Evidence register

| Item | Status | Basis |
| --- | --- | --- |
| visual stance and section architecture | OBSERVED | Figma Make preview |
| 11 raw colors, spacing values, 12-column geometry, type families/scales | OBSERVED | Figma Make token/type/grid specimens |
| component inventory and source flow labels | OBSERVED | Figma Make component/flow specimens |
| semantic mapping, recovery model, status truth policy, responsive/accessibility floor | ADDED | MD hardening for portable implementation |
| real collaboration rights, inventory, order/payment, origin/care data | EXTERNAL REQUIRED | product/brand/legal/data owners |
| screen-reader, keyboard, contrast, real-device, and full purchase recovery evidence | RELEASE REQUIRED | target implementation QA |

### 8.2 Completion rubric

This document targets a **10/10 portable design-pack contract**, not a claim that every target implementation is already 10/10. A target may use that rating only when all relevant checks below have evidence.

- [ ] Raw and semantic tokens are implemented; approved brand substitutions are recorded.
- [ ] Desktop and narrow-width layouts preserve the 12-column logic without critical overflow.
- [ ] Every listed component has default, focus, disabled, loading, invalid/error, and recovery behavior where applicable.
- [ ] Product cards expose truthful identity, price, availability, image fallback, variant constraints, and commit feedback.
- [ ] `SOLD OUT`, `ARCHIVE`, `IN STOCK`, and alert subscription behavior are connected to real policies/data.
- [ ] Browse → Select → Configure → Confirm is tested, including unavailable inventory, changed price, payment/order failure, retry, cancellation, and final receipt.
- [ ] Keyboard-only and manual screen-reader paths are recorded; focus order and live announcements are accepted.
- [ ] Contrast is measured on the shipped color pairs and localization/content stress cases pass.
- [ ] All printed/product/brand/origin/material claims and imagery are approved by the responsible owner.
- [ ] No source sample SKU, price, claim, or reference mark has leaked into production without authorization.

### 8.3 Change policy

Changes to visual expression may alter color, typeface, texture, image treatment, and composition **only if they preserve** the semantic state, action priority, error/recovery meaning, and access requirements above. A brand refresh must update raw tokens through the semantic adapter rather than changing behavior component by component.

### 8.4 Runtime evidence

[validation-plan.md](validation-plan.md) supplies the executable commerce, operations, accessibility, responsive, and rights/data sign-off matrix. It must be completed against a real target implementation before a 10/10 implementation claim.
