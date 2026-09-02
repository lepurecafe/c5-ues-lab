# Rasterline System

> **ID:** `pack:rasterline`  
> **Version:** 0.3.0  
> **Purpose:** Figma Make 원본의 시각 언어와 선형 UX 표현을, 재현·검토 가능한 단일 Markdown 계약으로 보존한다.  
> **Visual source:** [Figma Make — Rasterline System v0.2.0](https://www.figma.com/make/25ksFgXdwfLJn0m1TJvZRf/%EB%94%94%EB%8D%94%EB%9E%8C%EC%A6%88-%EC%8A%A4%ED%83%80%EC%9D%BC-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EC%98%A4%ED%83%80-%EC%98%A4%ED%95%B4---Copy-?t=QIbiTwrQsLAiN5xl-1)  
> **Source inspected:** 2026-08-24, Figma Make version 6  
> **Status:** source inventory and key validation states verified; screen-reader/manual assistive-tech test and end-to-end completion/recovery run remain pending.

## 0. How to use this document

This is the **canonical Markdown design-pack contract**. It is not a replacement for the editable Figma source or evidence that a production implementation works.

Every requirement has one of three evidence labels:

| Label | Meaning | Implementation rule |
| --- | --- | --- |
| **Observed** | directly visible in the inspected Figma Make source | reproduce it unless a documented adapter constraint prevents it |
| **Derived** | a rule added to preserve an observed visual/UX intent across implementations | follow it, or record a reviewed exception |
| **Unresolved** | source does not expose enough evidence for an exact value or behavior | do not invent a value and present it as source truth; measure or declare an adapter decision |

Rasterline is a **Design Pack**. It owns expression: type, color, density, texture, component anatomy, and motion tone. Product Binding and UX Preset still own goals, data, selection policy, validation, recovery, and outcome meaning.

---

## 1. Source inventory and coverage gate

An implementation or derivative document is not Rasterline-complete until every observed row has a destination or a declared gap.

| Source area | Observed source contents | Required destination in this contract |
| --- | --- | --- |
| Foundation | 8 colors, typography roles, 11-value spacing scale | §§3–4 |
| Components | buttons, badges, cards, inputs, progress, dividers | §5 |
| Linear UX | horizontal/vertical steps, four-step onboarding, principles | §6 |
| Texture & motion | 8 texture labels, 3 hover examples, 2 composition examples | §§7–8 |
| Shell | grid-backed hero, tab rail, code-indexed sections, system footer | §2 |

### 1.1 Completeness test

Before calling a Markdown conversion complete, answer all three questions for each row above.

1. Is every visible token, variant, state, sample, and label listed?
2. Can an implementer distinguish source fact from a new policy decision?
3. Does the document say how elements are assembled into a screen, not only what they are called?

If any answer is no, record `GAP: {source area} — {missing evidence}` in the implementation handoff.

---

## 2. Visual composition grammar

### 2.1 Page shell

**Observed:** The source uses a dark, full-width application canvas with thin separators, a grid-textured hero field, a narrow tab rail, and code-indexed sections. It reads like an archival operational console rather than a rounded consumer dashboard.

| Region | Observed anatomy | Rasterline rule |
| --- | --- | --- |
| Canvas | near-black field; hairline divisions | use a dark full-bleed base and visible structural boundaries |
| Hero field | grid texture; large Korean system title; small mono system line; right-aligned descriptive copy | establish identity before component inventory; preserve the asymmetrical title/info relationship |
| Hero title | first line warm foreground, second line has acid-accent emphasis | make one bounded identity emphasis; do not turn all prominent type into accent |
| Status lockup | `ACTIVE` plus date in a bordered mono treatment | status is readable text, not decorative color alone |
| Tab rail | `F-01`, `C-02`, `U-03`, `T-04` codes with Korean labels | navigation is a persistent indexed rail, not a pill group |
| Section header | bracketed number, Korean title, English technical sidecar | use this three-part hierarchy for major sections |
| Footer | small mono system attribution | close the sheet with a quiet provenance/status line |

### 2.2 Layout rules

1. **Derived:** Prefer rails, lines, grids, and open fields over nested rounded containers.
2. **Derived:** A highlighted object must remain one dominant object in its local region; avoid competing acid borders, fills, and labels.
3. **Observed:** Foundation swatches appear as a continuous structural row, not isolated marketing cards.
4. **Observed:** Component demonstrations are grouped by numbered specimen section: `[01]`, `[02]`, and so on.
5. **Unresolved:** Exact desktop width, hero height, column ratio, and breakpoint values are not available from the inspected source. Any numeric adapter choice must be named in the implementation rather than backfilled into this document as a source value.

### 2.3 Information density

Rasterline pairs a large display gesture with compact mono metadata. Body explanation is short; the density comes from structured labels, not verbose copy. Do not add decorative dashboards, metric cards, or status chips that have no decision or system meaning.

---

## 3. Foundation

### 3.1 Color tokens

All values below are **Observed**.

| Token | Value | Source role | Use |
| --- | --- | --- | --- |
| `--background` | `#0A0A0A` | Background | primary canvas |
| `--foreground` | `#F0ECE0` | Foreground | primary text and high-emphasis border |
| `--accent` | `#E8FF00` | Accent | bounded active/selected signal |
| `--card` | `#111111` | Card | raised structural surface |
| `--secondary` | `#1A1A1A` | Secondary | secondary surface |
| `--muted` | `#1F1F1F` | Muted | quiet surface/fill |
| `--muted-foreground` | `#6B6560` | Muted FG | secondary metadata only pending contrast verification |
| `--border` | `#2A2A2A` | Border | resting border and separator |

#### Color constraints

- **Derived:** `--accent` is for the current primary emphasis, active state, or a single bounded status signal. It is not general decoration.
- **Derived:** Pair selection, progress, error, warning, and completion color with text, symbol, order, or shape.
- **Derived:** Essential copy uses `--foreground`. The source's muted text value must be contrast-tested at actual size before it carries essential meaning.
- **Observed:** Texture is a grid/raster construction; gradients are not a default Rasterline primitive.

### 3.2 Typography roles

**Observed families:** Space Mono for headings and labels; DM Sans for body text.

| Role | Observed scale label | Family | Source example | Intended use |
| --- | --- | --- | --- | --- |
| Display | `6XL–8XL` | Space Mono | system title | identity moment only |
| H1 | `4XL–5XL` | Space Mono | 헤딩 원 | major title |
| H2 | `2XL–3XL` | Space Mono | 헤딩 투 | major section |
| H3 | `LG–XL` | Space Mono | 헤딩 쓰리 | group title |
| H4 | `BASE` | Space Mono | 헤딩 포 | local title |
| Body | `BASE` | DM Sans | explanatory paragraph | readable explanation/input support |
| Caption | `XS` | DM Sans | metadata copy | auxiliary information |
| Mono | `SM` | Space Mono | `01_SYSTEM_STATUS = ACTIVE` | IDs, counters, labels, status |

#### Type constraints

- **Derived:** Use mono labels to classify or index; do not render long explanatory paragraphs in all caps or monospaced type.
- **Derived:** Korean fallback font must preserve compact, squared display rhythm without making body copy monospaced. Name the fallback in the target implementation.
- **Observed in v0.2:** the implemented display through mono scales, including their visible `clamp()` bounds, line-height, and tracking, are recorded in §3.5.
- **Unresolved:** Web-font loading and Korean fallback strategy are not exposed in the inspected UI; record them as an adapter decision in a production target.

### 3.3 Spacing

**Observed scale:** `4`, `8`, `12`, `16`, `24`, `32`, `40`, `48`, `64`, `80`, `96` px.

| Relationship | Use these source scale values |
| --- | --- |
| tightly coupled icon/label | 4–8 px |
| compact control/list interior | 12–16 px |
| component padding or related group | 16–24 px |
| section grouping | 32–48 px |
| major break | 64–96 px |

**Derived:** Do not introduce arbitrary intermediate spacing values unless the adapter records why the source scale is insufficient.

### 3.4 Shape, border, and surface

| Element | Observed/derived contract |
| --- | --- |
| Corners | **Observed visual character:** squared or visually sharp; avoid soft consumer-card rounding |
| Resting boundary | **Observed:** dark border separates surfaces and rails |
| Attention boundary | **Observed:** transparent-to-foreground border transition is demonstrated |
| Active boundary | **Observed:** grid plus accent border is demonstrated for an emphasized card |
| Texture | **Derived:** it sits behind content and never replaces a plain high-contrast reading path |

### 3.5 v0.2 implementation additions

The following values and behavior are **Observed** in the improved Figma Make implementation.

| Addition | Value or rule | Purpose |
| --- | --- | --- |
| `--readable-muted` | `#9A9590` | readable helper, hint, and caption text; source reports approximately AA 7:1 |
| `--success`, `--danger`, `--warn` | semantic state tokens | removes hard-coded status colors from components |
| Display | `clamp(48px, …, 96px)` / `lh 1.0` / `ls -0.03em` | system identity |
| H1 | `clamp(36px, …, 56px)` / `lh 1.1` / `ls -0.02em` | major title |
| H2 | `clamp(24px, …, 36px)` / `lh 1.3` | section title |
| H3 | `clamp(16px, …, 22px)` / `ls +0.08em` | compact section label |
| H4 | `16px` / `fw 500` | local title |
| Body | `16px` / `lh 1.7` | main readable copy |
| BodySm | `14px` / `lh 1.6` | helper and compact UI copy |
| Caption | `11px` / `ls +0.18em` / uppercase | metadata and section separation |
| Mono | `13px` / accent color | system IDs and status |

**Observed rule:** `--muted-foreground` remains decorative/meta-only. Any copy that must be read uses `--readable-muted` or `--foreground`.

---

## 4. Content notation and naming

### 4.1 Structural labels

Use the source convention below where it clarifies hierarchy.

```text
F-01  Foundation
C-02  Components
U-03  UX Patterns
T-04  Texture & Motion

[01]  Section index
[A-01] Card specimen
[S-01] Composition specimen
[DEMO] / [INFO]  bounded annotation
```

**Derived:** Codes identify system regions or specimens; they must not be used as ornament on every paragraph.

### 4.2 Status vocabulary

**Observed:** `ACTIVE`, `RUNNING`, `IDLE`, `WARN`, percent, fraction, delta, count, and date are all represented as compact system information.

| Status type | Required companion |
| --- | --- |
| Health (`RUNNING`, `IDLE`, `WARN`) | affected module/object and a text value |
| Progress (`42%`, `3/8`) | what is progressing and, when relevant, what remains |
| Change (`+12.4%`, `−10`) | metric, direction, and time/comparison basis |
| Current selection | textual selected identity, not accent color alone |

---

## 5. Component contracts

### 5.1 Button

**Observed variants:** `PRIMARY`, `SECONDARY`, `GHOST`, `ACCENT`, `DANGER`.  
**Observed sizes:** `SMALL`, `MEDIUM`, `LARGE`.  
**Observed states:** `DISABLED`, `DISABLED ACCENT`.

| Variant | Observed visual role | Derived semantic constraint |
| --- | --- | --- |
| Primary | high-emphasis bordered action | one dominant safe next action per decision moment |
| Secondary | lower-emphasis available action | remains visibly actionable |
| Ghost | minimally framed utility action | cannot conceal destructive or irreversible behavior |
| Accent | acid-highlighted action | do not present several competing accent CTAs |
| Danger | danger-marked action | reveal consequence and provide confirmation/undo proportional to cost |
| Disabled | unavailable visual state | explain the missing condition and shortest repair path |

**Required anatomy:** action label; variant; size; enabled/disabled state; visible focus state; accessible name. Optional icon/status must not displace the action label.

**Unresolved:** exact padding, font size, icon position, focus ring geometry, and disabled opacity are not exposed by the inspected source.

### 5.2 Badge and label

**Observed variants:** `DEFAULT`, `ACCENT`, `MUTED`, `ERROR`, `SUCCESS`, `OUTLINE`.  
**Observed specimens:** `01`, `ITEM`, `07`, `ACTIVE`, `42`, `ARCHIVE`, and step numbers `✓`, `02`, `03`, `04`.

| Kind | Use |
| --- | --- |
| Status badge | short categorical system state |
| Count badge | an explicit count with nearby object meaning |
| Step number | sequence position or completion state |
| Outline label | quiet classification where fill would compete |

**Derived:** A badge never supplies the only error, success, selection, or risk information.

### 5.3 Card

| ID | Observed name | Observed treatment | Contract |
| --- | --- | --- | --- |
| `[A-01]` | 기본 / Basic | no texture | default structured content grouping |
| `[A-02]` | 망점 / Halftone Dots | halftone overlay | bounded atmospheric or secondary emphasis |
| `[A-03]` | 격자 / Grid + Accent | grid texture and accent border | deliberately active/selected or highlighted group |

**Derived:** Card texture must never reduce critical data or action readability. Do not use every card variant simultaneously in one local decision surface.

### 5.4 Input

**Observed forms:** basic text; prefix (`https://`); error (`이 필드는 필수입니다`); hint (`영문 소문자와 숫자만 사용`); select with `선택하세요`, `옵션 A/B/C`; textarea.

| State/form | Must communicate |
| --- | --- |
| Resting text | visible label and expected value form |
| Fixed prefix | whether prefix is immutable and what part is editable |
| Hint | permitted format before the user fails validation |
| Error | affected field, cause, and shortest repair action; retain safe input |
| Select | current value or intentional empty state |
| Textarea | expected kind/length of free-form input when relevant |

### 5.5 Progress indicator

**Observed specimens:** `시스템 로드 42%`, `메모리 사용률 42%`, `단계 진행 3/8`, `−10`, `+10`, `42%`.

| Data form | Required text equivalent |
| --- | --- |
| Percent | label + numeric percent |
| Fraction | current + total + unit when ambiguous |
| Delta | metric, sign, comparison period |

### 5.6 Divider

**Observed:** labeled section divider and `OR` separator.

**Derived:** A divider signals grouping/alternative, not disabled state or unavailable functionality.

### 5.7 v0.2 component evidence

| Area | Verified improvement |
| --- | --- |
| Button | visible keyboard focus; `Danger + Confirm` specimen; disabled accent and disabled danger states |
| Input | `useId`-based `label/htmlFor/id` connection; `aria-describedby`; `aria-invalid`; error uses `role="alert"` |
| Progress | percent, fraction, and signed delta; `role="progressbar"` |
| Badge | text/symbol companions for RUNNING, IDLE, WARN, UNKNOWN; semantic color variables |
| Card | halftone specimen declares `opacity 0.07`; input, dense data, charts, and important status are prohibited over texture |
| Divider | solid, dashed, dots, and thick variants in addition to labeled/OR use |

---

## 6. Linear UX contracts

### 6.1 Step indicator

**Observed horizontal sequence:** `초기화 → 구성 → 검증 → 배포` with `✓`, `02`, `03`, `04` and previous/next actions.  
**Observed vertical sequence:** same steps plus `시스템 준비`, `환경 설정`, `무결성 확인`, `시스템 가동` descriptions.

| State | Visual evidence required |
| --- | --- |
| Complete | completed marker plus step label |
| Current | current position distinct from complete/future without relying only on color |
| Future | ordinal and title remain perceptible |
| Vertical detail | one-line purpose where the step needs context |
| Navigation | visible previous/next affordance and declared direct-navigation policy |

### 6.2 Onboarding wizard

**Observed step labels:** `01 / 신원`, `02 / 시스템`, `03 / 프로토콜`, `04 / 확인`.  
**Observed first step:** `신원 등록` with system handle (`@`), lower-case/underscore constraint, real name, and role choices: Engineer, Designer, Product Manager, Researcher, Other.  
**Observed interaction claim in source:** direct step movement, previous/next navigation, form-data preservation, completion confirmation.

#### Required state contract

```text
draft
  → editing(step n)
  → invalid(step n) → repair → editing(step n)
  → valid(step n)
  → review
  → confirming
  → complete
  ↘ cancelled / saved / error → recover → editing or review
```

| Transition | Required visible consequence |
| --- | --- |
| select a permitted step | current marker, shown form, retained safe data |
| next with invalid data | field-level cause and repair route; no silent data loss |
| previous | prior data remains present |
| irreversible confirm | consequence stated before commitment |
| complete | completion evidence and next safe action |
| interrupt/cancel | state-preservation or explicit loss consequence based on Product Binding |

### 6.3 Source principles

| Source principle | Rasterline projection |
| --- | --- |
| 명확한 진입점 | current mode and first safe action are visible at entry |
| 불가역 경고 | irreversible action names consequence and uses confirmation when appropriate |
| 점진적 공개 | complexity is staged without obscuring earlier choice consequences |
| 탈출 경로 | cancellation, save, fallback, or recovery is explicit when interruption has cost |

### 6.4 v0.2 onboarding policy

| Concern | Observed rule |
| --- | --- |
| Required identity data | system handle matches lower-case / number / underscore rule; real name required |
| Direct navigation | completed steps are reachable directly; incomplete steps cannot be skipped |
| Validation | Next on empty identity fields produces field-local error text without erasing input |
| Confirmation | final confirmation checkbox gates completion |
| Cancellation | cancellation enters a loss-warning panel with confirm/return choice |
| Completion | completion confirmation and next action are included in the pattern |

---

## 7. Texture and motion

### 7.1 Texture inventory

**Observed patterns:** `DOTS SM`, `DOTS MD`, `DOTS LG`, `ACCENT DOTS`, `GRID`, `SCANLINES`, `GRID + DOTS`, `ACCENT GRID`.

| Pattern | Intended expression | Guardrail |
| --- | --- | --- |
| Dots SM/MD/LG | raster depth at different visual intensities | keep behind text and do not apply to dense form fields |
| Accent Dots | bounded identity/selection emphasis | one local focal area only |
| Grid | archival structural field | preserve readable negative space |
| Scanlines | technical surface texture | avoid small text, charts, and essential input regions |
| Grid + Dots | high-character specimen/feature field | reserve for bounded non-critical content |
| Accent Grid | active frame | pair with explicit active/selected text |

**Unresolved:** dot diameter, pitch, opacity, grid cell size, scanline thickness, blend mode, and responsive texture scaling require source-CSS extraction. Do not copy a generic CSS pattern and call it source-faithful.

### 7.2 Hover and transition inventory

| Source example | Observed property direction | Semantic use |
| --- | --- | --- |
| Border transition | `BORDER-TRANSPARENT → BORDER-FOREGROUND` | attention/focus-ready surface |
| Accent transition | `FOREGROUND → ACCENT ON HOVER` | bounded active emphasis |
| Background inversion | `BG FILL ON HOVER` | direct discrete-control affordance |

**Derived rules:**

- Hover is additive; keyboard focus and touch activation require an equivalent visible treatment.
- Motion confirms an attention/state change. It does not run continuously as decoration.
- Meaningful motion requires a reduced-motion/no-motion alternative.
- **Unresolved:** exact duration, easing, and affected CSS property list are not visible in the source.

### 7.3 v0.2 accessibility and responsive evidence

- **Observed:** global `prefers-reduced-motion` support.
- **Observed:** all buttons expose visible `:focus-visible` treatment; tab rail uses `aria-current="page"` and navigation has an accessible label.
- **Observed:** mobile protection uses a small-screen breakpoint, flex wrapping, and horizontal-overflow prevention.
- **Verified at 390px:** the rendered preview's internal document width did not exceed its client width.

---

## 8. Composition recipes

Recipes preserve visual meaning that cannot be recovered from a token list alone.

### 8.1 `[S-01]` Stat Tile

**Observed fields:** `총 시스템 이벤트`, `84,291`, `+12.4%`, `최근 30일 기준`.

| Field | Hierarchy | Requirement |
| --- | --- | --- |
| metric label | mono/quiet | identify what is measured |
| main value | dominant | readable without relying on delta color |
| delta | compact signal | preserve sign and comparison meaning |
| time basis | quiet metadata | identify the comparison window |

### 8.2 `[S-02]` System Status

**Observed fields:** `프로세스 상태`; `CORE ENGINE / RUNNING`; `DATA PIPELINE / RUNNING`; `AUTH MODULE / IDLE`; `CACHE LAYER / WARN`.

| Element | Requirement |
| --- | --- |
| panel title | names the status domain |
| row label | names the affected module/object |
| state word | explicit readable health state |
| non-healthy state | implementation provides an inspection or recovery route when applicable |

### 8.3 Assembly constraint

**Derived:** These recipes are compositions, not new component primitives. Reuse the documented label, value, divider, badge/status, and surface grammar; do not make a separate visual language for statistics or health panels.

### 8.4 v0.2 additional compositions

| ID | Observed composition | Required state coverage |
| --- | --- | --- |
| `[S-03]` | Form Validation Panel | field-local validation, retained input, successful submission state |
| `[S-04]` | Wizard Completion | deploy/progress cue, completion evidence, next safe action |

---

## 8.5 Remaining verification gaps

| Gap | Why it remains a gap |
| --- | --- |
| Screen-reader/manual assistive-tech test | ARIA attributes are present, but no manual assistive-tech run was observed |
| Full completion/recovery run | field validation was manually exercised; every later confirmation, cancel, and completion branch was not re-run in this audit |
| Exact motion constants | reduced-motion support is visible, but exact timing/easing tokens were not exposed in the inspected preview |

---

## 9. Accessibility, responsiveness, and evidence boundary

The inspected Figma source is visual/interactive reference, not proof of production accessibility or responsive quality.

| Requirement | Status |
| --- | --- |
| state is not color-only | Derived requirement; implementation must verify |
| keyboard focus and keyboard operation | Unresolved in source; implementation must verify |
| reduced motion | Unresolved in source; implementation must provide |
| touch target size | Unresolved in source; adapter must declare/test |
| small-viewport hierarchy | Unresolved in source; adapter must preserve current step and primary action first |
| text contrast | source values observed; actual-size contrast must be measured |
| error, loading, empty, capability failure | not exhaustively represented in the static source; Product Binding and UX Preset must supply them |

---

## 10. Handoff checklist

### Source fidelity

- [ ] All 8 color tokens are represented with the observed values.
- [ ] All 8 texture labels are either implemented, intentionally omitted with reason, or retained as unavailable.
- [ ] All 5 button variants, 3 sizes, and 2 disabled specimens are documented/implemented.
- [ ] Badge, card, input, progress, divider, horizontal step, vertical step, and wizard specimens have a destination.
- [ ] Hero, indexed tab rail, three-part section header, and footer grammar are represented when producing a full-system preview.
- [ ] Both composition recipes contain every observed field.

### Truthfulness

- [ ] Every new rule is marked Derived rather than presented as a Figma-observed fact.
- [ ] Every unavailable numeric/detail value is marked Unresolved.
- [ ] The implementation reports adapter choices for unresolved typography, texture, motion, and responsive values.

### Runtime and access

- [ ] Keyboard, focus, touch, reduced motion, contrast, and responsive behavior have target-specific evidence.
- [ ] Wizard state transitions preserve data, expose validation, and provide recovery/exit behavior.
- [ ] Status and progress retain text equivalents.

Run and record [runtime-evidence.md](runtime-evidence.md) to close the source's remaining screen-reader, cancellation/recovery, completion, and motion-adaptation gaps.

---

## 11. Change protocol

When Figma, this Markdown contract, and an implementation differ, resolve in this order:

```text
Safety and accessibility
→ Product Binding and UX Preset behavior
→ Observed Figma source fact
→ Derived Rasterline expression rule
→ Adapter convenience
```

Do not silently change a source fact into an implementation convenience. Add a dated `GAP` or `ADAPTER DECISION` note that identifies the affected section, why it changed, and what evidence would close the gap.
