# Korean Commercial Design System

> **ID:** `pack:korean-commercial`  
> **Version:** 2.0  
> **Visual source:** [Figma Make — Commercial Design System v2.0](https://www.figma.com/make/QmLXgxef4NpLJEtmRSoy7p/Commercial-Design-System--Copy-?t=Q6II0BPaRW6k0m2Q-1)  
> **Source inspected:** 2026-08-24, Figma Make version 3  
> **Status:** visual, token, validation-error, and small-viewport evidence checked. The canonical document is now supported by focused foundation/component/pattern/flow-QA documents; screen-reader manual QA and target runtime evidence remain open.

## 0. Intent and boundary

Korean Commercial Design System translates the **structural logic** of dancheong color, bojagi patchwork geometry, and hanji fibre-like surface hierarchy into a sharp, commercial interface language. It is not a generic “Korean-looking” skin and must not use cultural motifs as arbitrary decoration.

| Owns | Does not own |
| --- | --- |
| visual character, token hierarchy, geometry, surface, typography, component expression | product goals, data model, business rules, selection policy, recovery policy |

### Use when

- a product has an authentic Korean cultural/heritage relationship;
- an enterprise or editorial interface benefits from strong grid rhythm and high information clarity;
- direct pigment-like color and angular geometry fit the brand.

### Do not use when

- soft lifestyle/children-oriented expression is the product requirement;
- the product has no legitimate relationship to Korean visual culture and would apply it mechanically;
- dark-mode-only tooling is the dominant environment.

---

## 1. Visual grammar

### 1.1 Core composition

**Observed:** A warm hanji field and a red grid field form an asymmetrical split hero. A Korean serif display title occupies the warm left field; a bojagi patchwork composition anchors the red right field. A narrow five-color strip closes the hero.

| Element | Contract |
| --- | --- |
| Hero split | left `58%` hanji-texture / Korean serif headline; right `42%` dancheong-red / bojagi SVG |
| Mobile hero | stack vertically; red block follows the reading block |
| Hero type | `clamp(2.8rem, 6vw, 5.5rem)`; weight `800` |
| Accent strip | `6px` five-color strip |
| Geometry | 2px sharp corners; asymmetric grid; no rounded hero card |
| Navigation | thin sticky horizontal rail with numbered section codes; mobile may collapse to numbers only |

**Derived:** Bojagi geometry should organize space and state; it should not become a decorative wallpaper behind critical text.

### 1.2 Information character

- Korean serif display establishes a deliberate editorial/cultural voice.
- Noto Sans KR carries readable Korean UI/body content.
- JetBrains Mono carries token names, section numbers, and technical metadata.
- The design uses direct pigment blocks and hairlines, not soft gradients or floating glass panels.

---

## 2. Foundation

### 2.1 Raw visual tokens

| Token | Value | Role |
| --- | --- | --- |
| `--dancheong-red` | `#C8352A` | primary action, focus ring, emphasis |
| `--dancheong-blue` | `#1B4F8C` | secondary action, informational state |
| `--dancheong-green` | `#2A6B52` | success, nature-adjacent context |
| `--dancheong-gold` | `#C8952A` | decorative accent, warning highlight |
| `--dancheong-black` | `#1A1210` | body text, deep background |
| `--hanji-warm` | `#F4EFE4` | page canvas |
| `--hanji-mid` | `#E8DFD0` | muted/secondary surface |
| `--hanji-dark` | `#C8BFAE` | border, divider, hairline |

### 2.2 Semantic tokens

| Token | Value | Use |
| --- | --- | --- |
| `--background` | `var(--hanji-warm)` | page background |
| `--foreground` | `var(--dancheong-black)` | primary text |
| `--primary` | `var(--dancheong-red)` | primary action |
| `--secondary` | `var(--dancheong-blue)` | secondary action |
| `--accent` | `var(--dancheong-gold)` | bounded accent |
| `--muted` | `var(--hanji-mid)` | muted surface/disabled field |
| `--border` | `var(--hanji-dark)` | hairline |
| `--radius` | `2px` | sharp geometry |
| `--success` | `var(--dancheong-green)` | successful state |
| `--success-surface` | `#EDF4F0` | successful feedback surface |
| `--warning` | `var(--dancheong-gold)` | warning state |
| `--warning-surface` | `#FBF3E4` | warning feedback surface |
| `--error` | `var(--dancheong-red)` | error/destructive state |
| `--error-surface` | `#FBEAE9` | error feedback surface |

**Derived caution:** when warning needs to be semantically independent from decorative accent, introduce an adapter-level warning token rather than using gold as the sole cue. Always pair warning with text/icon/placement.

### 2.3 Spacing, elevation, motion, and layer tokens

| Family | Observed values | Use |
| --- | --- | --- |
| Spacing | `4, 8, 16, 24, 32, 48, 80px` | component gaps through section padding |
| `--shadow-sm` | `0 1px 2px rgba(26,18,16,0.06)` | subtle card lift |
| `--shadow-md` | `0 4px 12px rgba(26,18,16,0.08)` | floating panel |
| `--shadow-lg` | `0 8px 24px rgba(26,18,16,0.12)` | toast/overlay |
| `--duration-fast` | `100ms` | hover micro-interaction |
| `--duration-base` | `150ms` | standard transition |
| `--duration-slow` | `300ms` | toast/page transition |
| `--ease-standard` | `cubic-bezier(0.2,0,0,1)` | standard easing |
| `--z-sticky / overlay / toast` | `200 / 300 / 400` | navigation / overlay / notification order |

### 2.4 Interaction constants

| State | Observed rule |
| --- | --- |
| Focus | 2px solid dancheong red, 2px offset, always visible |
| Hover | `filter: brightness(0.91)`; do not switch meaning by color alone |
| Active | `translateY(1px)` plus `brightness(0.84)` |
| Loading | spinner + changed label; dependent inputs disabled |
| Error | field-local text + icon + color |
| Destructive | explicit confirmation → action → toast |
| Disabled | reason in helper text or title attribute |
| Reduced motion | global `prefers-reduced-motion` support |

---

## 3. Component and state contract

### 3.1 Coverage status

| Area | Status | Evidence |
| --- | --- | --- |
| raw + semantic colors | DEFINED | 8 raw values plus semantic/state mapping |
| type, spacing, shadow, motion, z-index | ADDED | token reference table |
| buttons and input validation | ADDED | working registration demo |
| checkbox, toggle, radio, field error, toast | ADDED | component/state inventory |
| card and badge | DEFINED/ADDED | specimens and states |
| modal/dialog | GAP | overlay behavior needs product decision |
| progress/step indicator | GAP | depends on product flow |
| tooltip | GAP | needs product decision |
| screen-reader manual test | GAP | manual QA required |

### 3.2 Required interaction components

| Component | Minimum states |
| --- | --- |
| Button | primary/secondary/destructive; sm/md/lg; default/hover/focus/pressed/disabled/loading/success where applicable |
| Input | resting, hint, invalid, valid, disabled; connected label and error description |
| Checkbox / Toggle / Radio | keyboard-operable, selected/unselected/disabled, visible focus |
| Toast | semantic status, readable text, non-blocking recovery/context |
| Empty state | cause, primary next action, no decorative dead end |
| Confirmation | consequence, cancel, confirm, post-action feedback |

### 3.3 Registration flow

**Observed fields:** Name, email, role radio group, agreement checkbox.

```text
empty → submit attempt → field validation error
      → valid → loading → success confirmation → edit or destructive reset
                                            ↘ reset confirmation → toast
```

| Step | Required visible consequence |
| --- | --- |
| Invalid submit | field-local errors for name, email, role, agreement; error uses text + icon + color |
| Loading | spinner and “processing” label; dependent inputs disabled |
| Success | submitted data summary and edit route |
| Reset | explicit reconfirmation; cancellation leaves data intact; execution announces via toast |

---

## 4. Composition recipes

| Recipe | Assembly rule | Do not |
| --- | --- | --- |
| Information Surface | warm page field, thin dark header, mono labels, sharp bordered data group | turn it into a soft card grid |
| Hanji Form Flow | hanji canvas, sharp field frames, field-local validation, direct pigment primary CTA | bury validation in a global alert |
| Hero Split Canvas | 58/42 hanji/red composition, serif title, bojagi SVG, five-color strip | center content in a rounded hero container |
| Status Surface | state label, text explanation, clear focus/next action, quiet hairlines | convey health via color only |

---

## 5. Accessibility and responsive floor

- Form label → input IDs and `aria-invalid` are required.
- Toast uses `aria-live="polite"`.
- Skip link becomes visible on focus.
- Checkbox/toggle support keyboard Space/Enter.
- At `≤768px`, multi-column grids become one column; type uses `clamp()`; text must not overflow.
- **Verified at 390px:** the preview document width did not exceed its client width.
- This is not proof of a manual screen-reader run; keep that as a release gate.

---

## 6. Provenance and change policy

| Label | Meaning |
| --- | --- |
| DEFINED | source design rule already established |
| ADDED | improvement incorporated into v2.0 |
| GAP | deliberately unresolved product/brand or manual-QA decision |

Any implementation must retain the Korean cultural rationale, raw-token provenance, and semantic role. Do not replace the pack with generic “East Asian” ornament, arbitrary patterning, or a beige lifestyle theme.

### Release gate

- [ ] All listed GAP items are either closed or explicitly excluded for the target product.
- [ ] Warning semantics are distinguishable from decorative gold.
- [ ] The full registration recovery/reset path has runtime evidence.
- [ ] Manual screen-reader testing is recorded.
- [ ] The pack’s cultural use case is appropriate for the product and approved by its owner.

### Operating documents

Use [README.md](README.md) for the document map. The supporting documents make the pack maintainable without replacing this canonical contract:

- [foundation.md](foundation.md) — token adapter, type, geometry, surface constraints
- [components.md](components.md) — component state, dialog, progress, and tooltip contracts
- [patterns.md](patterns.md) — hero, form, status, and cultural-integrity recipes
- [flows-and-qa.md](flows-and-qa.md) — registration recovery and release evidence matrix
