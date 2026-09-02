# 90s BMW System

> **ID:** `pack:90s-bmw-system`  
> **Version:** `0.1.0`  
> **Status:** `experimental`  
> **Canonical source:** this Markdown contract  
> **Visual source:** [Figma Make — 90s BMW Design System](https://www.figma.com/make/X5ajlclkcJOOEJ7VNwsdld/90s-BMW-Design-System?t=Q3m1RSRQGFq8a9rJ-1)  
> **Source inspected:** 2026-08-24, Figma Make Version 1 / preview label `v0.9.2`  
> **Evidence status:** color, typography, component inventory, instrument/status specimens, and source CSS inspected; exact spacing scale, responsive behavior, motion, print production, and assistive-technology behavior remain unresolved.

## 0. How to use this document

This is the canonical Markdown contract for the Design Pack. It preserves the source character while making the pack portable across products, UX Presets, media, and implementation frameworks. It is not a production-ready component library and does not prove runtime behavior.

Every requirement uses one of three evidence labels.

| Label | Meaning | Implementation rule |
| --- | --- | --- |
| **Observed** | directly visible in the inspected Figma Make preview or source CSS | reproduce unless a documented adapter constraint prevents it |
| **Derived** | added to preserve the observed character or required UX meaning across contexts | follow or record a reviewed exception |
| **Unresolved** | the source did not expose enough evidence | do not invent and present as source truth; make an explicit adapter decision |

### 0.1 System boundary

| This Design Pack owns | Product Binding / UX Preset owns |
| --- | --- |
| visual and editorial character, hierarchy expression, density, type, color, geometry, data presentation, imagery treatment, motion tone | human goal, objects and data truth, workflow, selection policy, validation, commitment, recovery, outcomes, permissions |

The pack may change how comparison, progress, status, warning, and recovery look. It must not remove any required meaning because the source aesthetic prefers restraint or technical minimalism.

### 0.2 Required manifest

```yaml
design_pack:
  id: pack:90s-bmw-system
  name: 90s BMW System
  version: 0.1.0
  status: experimental
  canonical_source:
    type: markdown
    location: design-packs/90s-bmw-system/90s-bmw-system.md
  visual_source:
    type: figma-make
    location: https://www.figma.com/make/X5ajlclkcJOOEJ7VNwsdld/90s-BMW-Design-System
  character:
    intent: archival technical precision with restrained motorsport authority
    emotional_range: [precise, engineered, authoritative, focused, archival]
    anti_characteristics: [playful, soft, bubbly, glassy, ornamental, luxurious-for-luxury-sake]
  expression:
    hierarchy: indexed section, condensed statement, mono qualifier, readable body, aligned value
    density: compact metadata inside generous structural fields
    typography: Barlow Condensed display, Barlow body, JetBrains Mono technical metadata
    color: midnight field, ivory text, bounded blue active state, chrome boundary, amber warning
    imagery: documentary product detail with technical caption and controlled negative space
    shape_and_surface: 0-2px corners, cool hairlines, dark panels, minimal elevation
    motion_and_rhythm: short, damped, mechanical, state-led
    spatial_behavior: aligned rails, specification rows, instrument-like grouping
  information_rules:
    emphasis:
      - one dominant statement or action per decision region
      - blue indicates active, selected, focus, or primary action
      - amber indicates attention or warning and always has text
    grouping:
      - prefer rules, rails, and aligned rows over floating rounded cards
      - keep label, value, unit, and status in a stable relationship
    sequence:
      - use numbered sections or explicit previous and next controls
      - preserve current position and safe back behavior
    comparison:
      - align identical attributes and units
      - highlight meaningful differences without hiding the full value
    status_and_feedback:
      - pair indicator with object, text state, consequence, and next action
      - expose freshness for live or stale data
  capabilities:
    - hierarchy
    - collection
    - comparison-with-adaptation
    - sequence-with-adaptation
    - planning-with-adaptation
    - quantitative-data
    - status-with-adaptation
    - validation-with-adaptation
    - recovery-with-adaptation
    - empty-loading-error-with-adaptation
  approved_alternatives:
    - specification table or synchronized comparison cards
    - gauge with text equivalent or numeric value with linear scale
    - blue underline or selected rule with text label
    - amber indicator or accessible icon and message
  accessibility_floor:
    - essential meaning is never color-only
    - focus is visible and redundant with color
    - every gauge has metric, value, unit, range, and text equivalent
    - fields retain safe input and connect labels, hints, and errors
    - target projection verifies contrast, zoom, reflow, keyboard, and assistive technology
  supported_media:
    - web
    - app
    - editorial
    - print
    - signage
    - packaging
    - physical-control-panel
    - motion
  gaps:
    - exact spacing scale
    - responsive and touch behavior
    - motion durations and easing
    - non-dark color mode
    - screen-reader and keyboard validation
    - print color and paper specification
  evidence:
    - Figma Make Version 1 preview inspected on 2026-08-24
    - source CSS variables and Google Font imports inspected on 2026-08-24
    - four source tabs and component specimens inspected on 2026-08-24
```

---

## 1. Character thesis

### 1.1 Intent

**Observed:** The source explicitly frames the character around the E36/E34/E38 era, German engineering precision, dark navy, chrome/silver, condensed typography, corporate motorsport, technical documentation, and dashboard instrumentation.

**Derived:** The portable character is not “put a BMW logo on a dark screen.” It is a system of:

1. a midnight technical field;
2. narrow, decisive display typography;
3. compact mono metadata and reference codes;
4. chrome-like boundaries rather than decorative gradients;
5. instrument-style quantitative feedback;
6. disciplined blue and amber signaling;
7. almost-square geometry and visible structural alignment.

### 1.2 Use when

- the product or artifact benefits from engineered authority, technical clarity, archival documentation, or instrument-panel precision;
- structured specifications and quantitative state are central;
- an automotive, industrial, mobility, audio-equipment, tools, sports, exhibition, or technical editorial context is appropriate;
- dark, focused environments are compatible with the use context.

### 1.3 Do not use when

- warmth, care, childhood, casual community, or soft lifestyle expression is the primary requirement;
- a dark high-density surface would impair field use or environmental readability;
- the project would depend on unlicensed BMW marks or imply official BMW affiliation;
- decorative gauges would be added where no real measurement or state exists.

### 1.4 Anti-characteristics

- no pill-heavy consumer dashboard;
- no broad glassmorphism or glowing cyberpunk effects;
- no rounded lifestyle cards;
- no ornamental speedometer metaphors for unrelated data;
- no blue accent on every interactive element;
- no all-condensed or all-mono body copy;
- no status conveyed by color or gauge position alone.

---

## 2. Source inventory and coverage gate

| Source area | Observed contents | Contract destination |
| --- | --- | --- |
| Shell | system lockup, reference code, draft/version, four-tab rail, indexed sections, technical footer | §3 |
| Color | 10 displayed tokens plus foreground/semantic companions in CSS | §4 |
| Typography | Barlow Condensed, Barlow, JetBrains Mono; five scale specimens | §5 |
| Components | four button variants, four badge families, fields/select, three card anatomies, four divider weights | §7 |
| Instrument panel | speed/RPM/temp/fuel gauges, four progress rows, eight status indicators, vehicle summary | §8 |
| Portability | no explicit source specification | §§9–11 derived mappings |

### 2.1 Completeness test

A projection is not pack-complete until:

- every used source token has a semantic destination;
- each required UX meaning has a supported expression or declared gap;
- the assembly preserves hierarchy, not only palette and radius;
- exact source facts are distinguishable from adapter choices;
- trademarked imagery and naming have an explicit rights decision.

---

## 3. Composition grammar

### 3.1 Page and artifact shell

| Region | Observed anatomy | Pack rule |
| --- | --- | --- |
| Canvas | deep midnight full field | use a dark structural base where the medium permits; do not fake dark mode when environmental contrast requires light |
| Header | compact system name, `REF` line, `DRAFT`, version | place identity, provenance, and state in one disciplined utility rail |
| Navigation | four plain text tabs with thin active-blue underline | use rails and rules, not rounded pills |
| Section | two-digit index, condensed English heading, mono sidecar | preserve index → title → technical qualifier hierarchy |
| Footer | long system reference plus font/technology labels | close with quiet provenance or specification metadata |

### 3.2 Spatial rules

- **Observed:** Content is separated by horizontal rules and open space rather than nested floating cards.
- **Observed:** The active navigation state is a narrow blue underline.
- **Derived:** Prefer aligned columns, specification rows, rails, and bounded technical panels.
- **Derived:** Keep one dominant information object per section; supporting metadata is smaller, quieter, and aligned.
- **Derived:** Use asymmetric editorial composition only when alignment and reading order remain explicit.
- **Unresolved:** Exact maximum width, grid, spacing scale, header height, and breakpoints are not defined by the source.

### 3.3 Hierarchy recipe

```text
REFERENCE / STATUS
SECTION INDEX
CONDENSED PRIMARY TITLE
mono qualifier or unit
body explanation
aligned value / control / state
```

Do not flatten this into equally weighted cards. The pack's character depends on contrast between large condensed statements, compact technical metadata, and quiet body text.

---

## 4. Color system

### 4.1 Observed source tokens

| Source name | Value | CSS token | Role |
| --- | --- | --- | --- |
| Midnight | `#0A0F1A` | `--background` | primary canvas |
| Navy Deep | `#001E50` | `--roundel-dark` | deep identity field, bounded emphasis |
| Roundel Blue | `#0063B1` | `--primary`, `--roundel-blue`, `--ring` | primary action, active state, focus |
| Steel | `#182235` | `--secondary` | secondary structural surface |
| Panel | `#0F1724` | `--card` | panel/card surface |
| Chrome | `#B8C4D0` | `--accent` | chrome-like edge, high-value secondary emphasis |
| Ivory | `#E2DDD0` | `--foreground`, `--card-foreground` | primary text |
| Signal | `#E8A020` | `--signal` | warning/attention signal |
| Slate | `#5A6A7A` | `--muted-foreground` | nonessential metadata only pending contrast check |
| Graphite | `#8A9AAA` | `--chrome-dark` | subdued chrome/detail |

### 4.2 Observed companion tokens

| Token | Value | Use |
| --- | --- | --- |
| `--primary-foreground` | `#FFFFFF` | text/icon on primary |
| `--secondary-foreground` | `#A0AFBE` | text on secondary surface |
| `--muted` | `#141E2E` | quiet structural surface |
| `--accent-foreground` | `#0A0F1A` | dark text on chrome accent |
| `--border` | `rgba(184, 196, 208, 0.12)` | default separator/boundary |
| `--chrome` | `#C8D4DC` | brighter chrome highlight |

### 4.3 Semantic constraints

- Blue is the primary/selected/focus signal, not generic decoration.
- Signal amber is reserved for attention, warning, due, or caution; pair it with text and an icon/shape/position cue.
- Chrome is a material and boundary cue. It must not become a low-contrast body-text color.
- Essential body text uses Ivory or a tested accessible equivalent.
- Muted Slate cannot carry required instructions, errors, dates, or state without contrast verification.
- Error and success colors are **Unresolved** in the source. A medium adapter must declare accessible semantic tokens without replacing the source's amber warning role.

### 4.4 Source contrast claims

The preview displays these claims: Primary on White `8.3:1`, Background/Foreground `14.1:1`, Secondary/Chrome `5.2:1`, and Signal on Dark `7.6:1`.

**Evidence caution:** These are source-displayed values, not independently reproduced measurements. Recalculate contrast in the actual projection, font size, opacity, display mode, and print process.

---

## 5. Typography

### 5.1 Observed families and weights

| Role | Family | Imported weights/styles | Use |
| --- | --- | --- | --- |
| Display and heading | Barlow Condensed | 300–800; selected italics | identity, section title, numeric impact |
| Body and UI | Barlow | 300–600; selected italics | paragraph, field, button, navigation |
| Technical metadata | JetBrains Mono | 300–600 | reference codes, VIN-like IDs, units, status, labels |

### 5.2 Observed type specimens

| Scale label | Size | Family | Use |
| --- | --- | --- | --- |
| `DISPLAY / 80` | 80 px | Barlow Condensed | one identity statement |
| `HEADLINE / 48` | 48 px | Barlow Condensed | major title |
| `SUBHEAD / 32` | 32 px | Barlow Condensed | section or model heading |
| `BODY / 16` | 16 px | Barlow | readable explanation |
| `CAPTION / 12` | 12 px | Barlow | secondary descriptive text |
| `MONO / 12` | 12 px | JetBrains Mono | technical record or data line |

### 5.3 Type rules

- **Observed:** Condensed headings use strong uppercase or title-case statements and close, engineered rhythm.
- **Observed:** Technical strings use uppercase labels, separators, units, dates, model codes, and reference prefixes.
- **Derived:** Long Korean body copy must use a readable Korean sans fallback; do not force Barlow or JetBrains Mono where glyph coverage is inadequate.
- **Derived:** Mono is a semantic signal for machine-readable or record-like information, not decoration.
- **Derived:** Large condensed type can carry a single product promise; supporting claims remain smaller and evidence-led.
- **Unresolved:** Exact line-height, tracking scale, Korean fallback, fluid typography, and print font licensing/substitution.

### 5.4 Portable fallback declaration

Every adapter declares:

```yaml
typography_adapter:
  display: Barlow Condensed
  body: Barlow
  mono: JetBrains Mono
  korean_display_fallback: required
  korean_body_fallback: required
  unavailable_font_substitution: documented
```

---

## 6. Geometry, border, surface, and imagery

### 6.1 Geometry discrepancy and resolution

Two source facts coexist:

- **Observed preview statement:** component character uses `border-radius: 1px`.
- **Observed CSS:** `--radius: 2px`, with `sm = radius - 2px`, `md = radius`, `lg = radius + 2px`.

Use this resolved mapping rather than erasing the discrepancy:

| Semantic shape | Value | Use |
| --- | --- | --- |
| `sharp` | `0px` | rails, dividers, tables, instrument panels |
| `control` | `1px` | source-character buttons and inputs |
| `surface` | `2px` | standard cards/panels |
| `large-surface` | `4px` maximum | large bounded media panel only |

No pill radius belongs to the base character.

### 6.2 Dividers and material

**Observed divider variants:** hairline `0.5px`; subtle `1px`; standard `1px`; emphasis `1px + blue`.

- Use hairlines for grouping and chrome-like precision.
- Use blue emphasis only for active or selected structure.
- Chrome is expressed through cool neutral contrast and aligned edges, not photorealistic bevels.
- Shadows and elevation are **Unresolved** and should remain minimal; prefer border and field contrast.

### 6.3 Imagery contract

The source includes automotive/roundel imagery but does not define a reusable image system.

**Derived portable treatment:**

- documentary or product-detail framing;
- decisive crop, generous dark negative space, aligned caption/specification block;
- cool-neutral color balance with restrained saturation;
- image captions include subject, date/version, source, or technical context when relevant;
- diagrams use thin chrome lines, blue active values, amber warnings, and explicit labels/units;
- avoid faux VHS noise, racing stripes, carbon-fibre texture, lens flare, and retro stickers unless separately authorized.

**Rights rule:** BMW logos, roundels, model badges, photographs, and trade dress require a project-level rights decision. The character must remain recognizable without them.

---

## 7. Component contracts

### 7.1 Buttons

**Observed variants:** Primary, Secondary, Ghost, Chrome. The source also shows a disabled state and previous/next directional actions.

| Variant | Expression | Semantic constraint |
| --- | --- | --- |
| Primary | Roundel Blue field or dominant blue boundary | one dominant safe next action per decision moment |
| Secondary | Steel/Panel surface with restrained chrome text | clearly actionable but subordinate |
| Ghost | open field with minimal rule | utility only; never conceal destructive impact |
| Chrome | bright neutral emphasis with midnight foreground | special high-value neutral action, not a second primary by default |
| Disabled | reduced availability | must expose why unavailable and how to repair |
| Previous / Next | linear directional pair | preserve step position and back safety |

Required states for implementation: resting, hover, focus-visible, pressed, disabled, loading, and success/error consequence when applicable. Only resting/disabled specimens are directly evidenced; the others are UX-required adapter work.

### 7.2 Badges and status labels

**Observed examples:** `M SPORT`, `PRODUCTION`, `RECALL`, `ARCHIVED`, `E36`, `IN SERVICE`, `DRAFT`.

- Mono or compact uppercase styling is appropriate for categorical status.
- Badge text must state the meaning; color is redundant.
- `RECALL`, warning, error, and due states require explanation and action beyond the badge.
- Product-specific vocabulary comes from Product Binding, not this pack.

### 7.3 Inputs and select

**Observed fields:** VIN number, registration year, owner, model-series select.

Required anatomy:

- compact uppercase/mono label;
- dark panel field with chrome boundary;
- explicit expected format and unit;
- retained user input after validation failure;
- field-local error, cause, and repair instruction;
- visible focus ring using `--ring` or an accessible medium equivalent.

Error, valid, loading, and disabled specimens are not fully evidenced by the source and remain adapter obligations.

### 7.4 Card families

| Source family | Observed anatomy | Portable use |
| --- | --- | --- |
| Spec card | identifier plus aligned label/value/unit rows | factual specification, comparison, audit record |
| Feature card | category, condensed promise, body explanation, explore action | editorial feature or capability explanation |
| Stat card | compact label, large numeric value, supporting context | one meaningful metric with source/time basis |

Do not use the three families as generic decorative tiles. A metric card must name the metric, unit, comparison/time basis, and freshness where applicable.

### 7.5 Navigation and rules

- Active location uses text plus a thin blue underline.
- The rail may collapse for narrow media, but current location remains explicit.
- Dividers group content; they must not simulate unavailable or completed state.
- Index numbers (`01`–`08`) identify ordered system sections, not ornament on every block.

---

## 8. Instrument and data-expression contracts

### 8.1 Observed inventory

- analog gauges: speed, RPM, temperature, fuel;
- progress rows: throttle response, brake efficiency, fuel economy, engine load;
- status indicators: oil pressure, battery, check engine, ABS, airbag, brake fluid, coolant, service;
- record summary: model, plant/reference string, odometer, service distance, year.

### 8.2 Gauge rule

A gauge is allowed only when the information has a meaningful range, current value, unit, and threshold. It must include a readable text equivalent.

```yaml
gauge:
  metric: required
  current_value: required
  unit: required
  range: required
  thresholds: required_if_semantic
  freshness: required_if_live
  text_equivalent: required
```

Do not turn completion, confidence, popularity, or unrelated ranking into a speedometer merely to look automotive.

### 8.3 Progress and comparison

- Percent is paired with a metric label.
- Fractions include current, total, and unit when ambiguous.
- Delta includes direction, baseline, and time/comparison basis.
- Comparison uses aligned attributes and units; the pack may use spec rows or technical tables.
- Generated or uncertain values are labeled; precision must not imply certainty.

### 8.4 Status and warning

| Status class | Required expression |
| --- | --- |
| OK / available | text value plus affected object |
| WARN / LOW / DUE | amber or adapter semantic color plus text, object, consequence, and next action |
| Error / unsafe | distinct accessible error expression, consequence, and recovery |
| Offline / stale | state plus last-known time and retry/alternative |
| Loading | label/skeleton plus what is loading and whether prior data remains valid |

The source's `OK`, `WARN`, `LOW`, and `DUE` vocabulary demonstrates visual treatment, not a universal state model. Product Binding defines the real states.

---

## 9. Information rules and capability matrix

| Capability | Pack expression | Status |
| --- | --- | --- |
| hierarchy | index, condensed title, mono qualifier, body, aligned value | `supported` |
| collection | rails, specification rows, disciplined grid, technical panel | `supported` |
| comparison | aligned spec rows/tables with units and highlighted differences | `supported-with-adaptation` |
| sequence | numbered sections, previous/next controls, progress row | `supported-with-adaptation` |
| planning | timeline/service intervals using indexed rows | `supported-with-adaptation` |
| quantitative data | gauge, progress, spec, stat card, unit-bearing record | `supported` |
| status | badge, indicator, text value, amber attention | `supported-with-adaptation` |
| validation | field-local technical message and blue focus | `supported-with-adaptation` |
| recovery | back/edit/retry/alternative expressed as explicit technical actions | `supported-with-adaptation` |
| empty state | technical cause + next action in open field | `supported-with-adaptation` |
| loading | labeled progress/retained last-known data | `supported-with-adaptation` |
| accessibility | redundant text/state and contrast floor | `limited` until manual validation |
| spatial/physical | labeled panel, scale, units, tactile/visual redundancy | `limited` until physical adapter exists |

### 9.1 Approved alternate representations

| Required meaning | Preferred expression | Alternate when preferred is unsuitable |
| --- | --- | --- |
| comparison | aligned specification table | synchronized side-by-side cards with identical field order |
| progress | labeled linear indicator | numeric fraction or ordered steps |
| live range | analog-style gauge plus text | numeric value plus linear scale |
| warning | amber indicator plus message/action | high-contrast icon/shape plus message/action |
| current navigation | blue underline plus text | left rule or high-contrast selected row plus text |
| print interaction | button-like CTA | numbered instruction, URL/QR, response channel, next-step block |

---

## 10. Medium and fidelity projections

### 10.1 Low-fi

Low-fi preserves the hierarchy and component anatomy without brand color or polished imagery.

- use grayscale midnight/panel/chrome fields;
- preserve index, rail, condensed-title region, spec alignment, status text, units, and actions;
- represent blue/amber roles with labels such as `[ACTIVE]` and `[WARN]`;
- do not introduce rounded cards merely because the projection is a wireframe.

### 10.2 High-fi web/app

- apply the observed palette and font roles;
- use controls with `0–2px` corner treatment;
- retain focus, validation, empty/loading/error, and recovery states from the UX Preset;
- adapt large 80px display type fluidly; never allow truncation of required content;
- verify keyboard, screen reader, zoom, reduced motion, small viewport, touch target, and contrast behavior.

### 10.3 Editorial, book, and pamphlet

- use a strong condensed cover/title, mono catalog/reference line, and aligned specification tables;
- treat chrome as cool paper/ink contrast, not a fake metallic gradient;
- pair product photography with technical captions and generous dark negative space;
- use amber sparingly for warning, annotation, or one callout;
- declare CMYK/spot color, paper, ink coverage, minimum type, binding, bleed, and image rights in the print adapter.

### 10.4 Signage and exhibition

- one primary instruction or identity statement per viewing zone;
- large condensed heading, short body, unambiguous arrows/icons, distance-tested contrast;
- status and direction use text/shape as well as color;
- gauges are reserved for real exhibit data with readable numeric values.

### 10.5 Packaging and physical object

- use reference codes, model/spec labels, and aligned rules for factual hierarchy;
- keep safety, compliance, serial, and operation information independent from decorative character;
- tactile state, control affordance, lighting, material finish, viewing angle, and manufacturing tolerance require a physical adapter;
- do not imply BMW manufacture or endorsement.

### 10.6 Motion

**Derived tone:** short, damped, mechanical, and state-led. Movement should feel like a precise instrument settling, not a cinematic race montage.

- values update with readable numeric continuity;
- active rails and gauges may transition only when change aids comprehension;
- warnings appear promptly without decorative overshoot;
- reduced-motion mode removes nonessential travel and gauge sweeps;
- duration and easing are **Unresolved** and must be declared by the target adapter.

---

## 11. Accessibility floor

- All text and essential graphics meet the target medium's contrast requirement after opacity and font size are applied.
- Focus is visible and redundant with color.
- Every field has a persistent label and programmatic relationship to hint/error text.
- Status, progress, selection, warning, error, and completion are not color-only.
- Gauges have text equivalents and units; live data exposes freshness.
- Minimum touch target, zoom/reflow, keyboard order, and assistive technology are tested in app/web projections.
- Print uses legible minimum type, line length, ink contrast, and non-color-only warning notation.
- Physical/spatial projections consider reach, viewing distance, lighting, glare, tactile cues, and emergency recovery.

The Figma preview's contrast cards are not a substitute for projection-specific accessibility evidence.

---

## 12. AI generation contract

### 12.1 Required input

Before generating an artifact, provide:

```yaml
composition:
  product_binding: required
  ux_preset: required
  design_pack: pack:90s-bmw-system@0.1.0
  medium: required
  projection: low-fi|high-fi|implementation|print-ready|prototype
  target_users: required
  required_states: []
  content_and_data: required
  rights_constraints: required
  accessibility_target: required
  adapter_decisions: []
```

### 12.2 Generation instruction

```text
Apply pack:90s-bmw-system@0.1.0 as a character and expression grammar.
Preserve Product Binding objects, UX Preset meaning, validation, commitment,
result, and recovery. Use midnight technical fields, condensed heading hierarchy,
mono reference metadata, cool chrome rules, bounded blue active signals, and
amber warnings. Express real quantitative information with labeled units and
text equivalents. Do not add automotive gauges without meaningful ranges.
Do not rely on BMW trademarks, roundels, badges, or photographs unless the
Product Binding explicitly declares rights. Record every unresolved source value
as an adapter decision; never invent it as observed source truth.
```

### 12.3 AI rejection conditions

Reject or revise generated output when:

- only palette, font, and radius changed while hierarchy and component anatomy stayed generic;
- the design uses a logo or racing motif as the main source of character;
- UX-required error, loading, empty, confirmation, result, or recovery meaning disappeared;
- gauges visualize arbitrary data;
- multiple blue/amber elements compete without semantic priority;
- essential information uses low-contrast Slate;
- the artifact implies official BMW affiliation without authorization;
- the agent claims responsive, accessible, print-ready, or runtime validation without evidence.

---

## 13. Evidence, gaps, and promotion gate

### 13.1 Evidence ledger

| Evidence | Status | Notes |
| --- | --- | --- |
| Figma Make preview shell and four tabs | inspected | Version 1, preview `v0.9.2` |
| 10 displayed color tokens | inspected | names and values recorded |
| source CSS variables/font imports | inspected | includes semantic companions and geometry |
| typography specimens | inspected | 80/48/32/16/12/12 roles |
| component inventory | inspected | resting examples; runtime states not proved |
| instrument/status inventory | inspected | visual/data examples only |
| contrast ratios | source claim only | independent calculation pending |
| responsive behavior | unresolved | no viewport evidence recorded |
| keyboard/screen reader | unresolved | manual QA pending |
| print/physical production | unresolved | adapters not yet authored |
| trademark/image rights | project-specific | no rights granted by this pack |

### 13.2 Promotion gate

The pack remains `experimental` until:

- [ ] at least one non-automotive product preserves the character without BMW marks;
- [ ] one interactive and one non-screen projection are reviewed;
- [ ] comparison, validation, warning, empty, loading, result, and recovery mappings are evidenced;
- [ ] accessible state tokens and essential-text contrast are independently verified;
- [ ] responsive, keyboard, screen-reader, and reduced-motion behavior is tested for web/app use;
- [ ] print or physical adapters declare their production constraints when used;
- [ ] the radius discrepancy and all other adapter decisions are recorded in each Composition Manifest;
- [ ] rights and naming are cleared for public distribution.

---

## 14. Trademark and attribution boundary

This is an unofficial design study derived from a user-provided Figma Make artifact inspired by 1990s BMW visual culture. It is not BMW AG's official design system and is not endorsed by BMW AG.

- The Markdown contract may preserve source references for provenance.
- The pack does not grant rights to BMW, M, roundel, model names, vehicle photography, or trade dress.
- Public non-BMW work should use a neutral projection name such as `90s German Precision`.
- A valid projection must remain coherent after trademarked assets are removed.

---

## 15. Change policy

- Preserve the Pack ID and semantic token meaning across minor versions.
- Mark source additions as `Observed`; portable rules as `Derived`; missing evidence as `Unresolved`.
- Do not silently convert an adapter choice into a source fact.
- Breaking changes to character, token roles, or capability mappings require a major version.
- Figma and Markdown may coexist, but this file is canonical until a hybrid synchronization manifest replaces that decision.

### Changelog

| Version | Date | Change |
| --- | --- | --- |
| `0.1.0` | 2026-08-24 | Converted the Figma Make 90s BMW source into a reusable, medium-aware Design Pack contract. |
