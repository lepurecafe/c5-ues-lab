# La Poste Civic Service System

> **ID:** `pack:la-poste-civic-service`  
> **Version:** 1.0.0  
> **Visual source:** [Figma Make — La Poste](https://www.figma.com/make/nEHeeaQ2oVw3w4JPwE80sE/La-Poste?t=wPOhKNCodh7NS8yf-1)  
> **Source inspected:** 2026-08-24, Figma Make version 1 / preview label `v1.0`  
> **Evidence status:** visual tokens, typography, component inventory, and visible navigation/tab labels inspected. Real postal operations, assistive technology, and legal/service policy remain release gates.

> **Preview:** [preview.html](preview.html) demonstrates the visual system, local send-form validation, account tabs, and alert/recovery presentation. It does not transmit address data or create a postal request.

## 0. Intent, scope, and trademark boundary

La Poste Civic Service System expresses a modern French public-service character: **luminous yellow task signal**, **deep blue institutional structure**, generous white space, direct sans-serif typography, and explicit service feedback.

It is an unofficial study of a user-provided Figma Make source—not La Poste's official system. It grants no use of La Poste name, logo, yellow/blue trade dress, service names, tracking codes, pricing, customer data, address data, vehicle/worker imagery, or public-service claims. A non-authorized projection uses neutral naming and approved assets/data.

| This pack owns | Product Binding / UX Preset owns |
| --- | --- |
| visual expression, hierarchy, token roles, interaction tone, component anatomy, route/data presentation | eligibility, address/identity truth, shipment lifecycle, price, payment, consent, commitment, cancellation, notification policy, recovery |

### Use when

- a clear, optimistic civic/service interface is appropriate;
- sending, tracking, collection, account, or branch information needs strong task orientation;
- yellow action signal plus blue institutional navigation suits the approved brand.

### Do not use when

- yellow would impair the environment, contrast, or user expectation;
- the product lacks a legitimate civic/logistics/service relationship;
- brand reference could be mistaken for official La Poste service.

---

## 1. Visual grammar

| Principle | Contract | Anti-pattern |
| --- | --- | --- |
| Service-forward clarity | place the current task and next action above decorative expression | generic marketing hero with hidden task path |
| Yellow with discipline | yellow creates a bounded action/highlight field; blue carries navigation/structure | yellow text on white or yellow everywhere |
| Public-service order | clean bands, section numbers, plain labels, predictable feedback | glassy panels, playful sticker UI, visual noise |
| Spacious but factual | generous white space surrounds concise operational facts | vague copy without status/time/source |
| Red is exceptional | red signals named error/report-problem context, not generic accent decoration | use red to supply the only warning/error cue |

### Observed source anatomy

| Region | Observed source | Pack rule |
| --- | --- | --- |
| Header | blue rail, yellow brand/task lockup, `Suivi`, `Envoyer`, `Colis`, `Mon compte`, yellow `Connexion` | show current route in text plus visual selection; navigation remains keyboard usable |
| Hero | `SYSTÈME DE DESIGN` context, high-scale sans headline with yellow text field | one decisive service statement; no unsupported claim |
| Inventory | numbered color/type/component sections in open white field | section code → title → specimen |
| Task modules | shipment tracking, service price, branch cards, tabs, alerts | task, status, next action, and recovery remain connected |
| Footer | blue institutional close | quiet provenance/help, not a second competing navigation system |

---

## 2. Foundation

### 2.1 Observed raw tokens

| Token | Value | Role |
| --- | --- | --- |
| `--primary` / Jaune La Poste | `#FFCD00` | primary action/highlight field |
| `--secondary` / Bleu Profond | `#003189` | navigation, secondary action, institutional structure |
| `--accent` / Rouge Urgence | `#E63312` | error/report-problem context |
| `--background` / Blanc | `#FFFFFF` | main reading field |
| `--muted` / Gris Léger | `#F4F4F2` | quiet surface |
| `--muted-fg` / Gris Texte | `#6B6B6B` | supporting copy after actual-size contrast check |
| `--foreground` / Noir Texte | `#0D0D0D` | essential text |
| `--border` / Bordure | `#E0E0DC` | divider/control boundary |

### 2.2 Observed tonal scales

| Yellow | Value | Blue | Value |
| --- | --- | --- | --- |
| 100 | `#FFFBE0` | 100 | `#E6EAF3` |
| 200 | `#FFF0A3` | 200 | `#99AACC` |
| 300 | `#FFE566` | 300 | `#4D6BB3` |
| 400 | `#FFDB33` | 400 | `#1A3A7A` |
| 500 | `#FFCD00` | 500 | `#003189` |
| 600 | `#D4A900` | 600 | `#002470` |
| 700 | `#A88400` | 700 | `#001857` |
| 800 | `#7D6300` | 800 | `#0C1A3A` |

### 2.3 Semantic constraints

- Use dark text on yellow only after contrast verification; yellow must not carry essential text merely because it is brand-primary.
- `--secondary` is not automatically informational status; map information/success/warning/error as product-level semantic tokens.
- Essential muted text uses a tested darker adapter if `#6B6B6B` fails at actual size/surface.
- Red requires text, icon/shape, affected object, consequence, and repair route.

### 2.4 Typography

| Role | Observed family | Source scale / use |
| --- | --- | --- |
| Headline | Libre Franklin | Display 56px, H1 40px, H2 28px, H3 20px; weights 300–800 |
| Body | Source Sans 3 | Body LG 18px, Body 15px; weights 300–700 |
| Label/data | JetBrains Mono | Label 12px; status/reference strings |

**Derived:** maintain readable local-script fallback, real line-height, and content wrapping. Uppercase labels support scanning but never become the sole readable instruction.

---

## 3. Components and feedback contract

### 3.1 Observed inventory

| Component | Source variants/examples | Required behavior |
| --- | --- | --- |
| Button | primary yellow, secondary blue, ghost, red report-problem, disabled; LG/MD/SM/XS | focus-visible, pressed, disabled reason, loading/duplicate-commit prevention, result/recovery |
| Form | text input, select, error input, checkbox, radio, toggle | labels, hint/error association, retained safe input, keyboard semantics |
| Badge/status | `En transit`, `Livré`, `Retard` and service labels | text state, affected shipment, event/freshness, next action when relevant |
| Cards | live tracking, service price, branch information | loading/empty/error as well as populated state |
| Tabs/navigation | `Aperçu`, `Historique`, `Factures`, `Paramètres`; breadcrumb | selected state, keyboard operation, panel relationship, current route text |
| Alerts | success, information, warning, error | severity/message/action/dismiss/announcement policy |

### 3.2 Button priority

| Variant | Use | Constraint |
| --- | --- | --- |
| Yellow primary | one local task commitment, e.g. send/continue | never compete with multiple equal yellow CTAs |
| Blue secondary | safe alternative, navigation, review | cannot disguise an irreversible action |
| Ghost | low-risk utility | cannot be the only path to a critical outcome |
| Red | report/cancel/destructive route | consequence and confirmation proportional to cost |
| Disabled | unavailable task | explain condition and shortest repair route |

### 3.3 Feedback state model

```text
resting → entered → local validation → valid
                    ↓
             invalid: text + field relation + preserved value
                    ↓
submit → processing → confirmed / recoverable failure / blocking failure
```

An alert/toast does not make an operational action complete. The durable result must identify the confirmed action, reference/context, and next safe route.

---

## 4. Composition recipes

| Recipe | Assembly | Required truth boundary |
| --- | --- | --- |
| Send a parcel | service/eligibility input, selected option, explicit cost/conditions, commit, receipt | price, delivery timing, address and eligibility come from authority |
| Track shipment | reference, validation, current event, historical route, exception help | no invented location/ETA; freshness visible |
| Branch card | location/service/hours/accessibility info + route action | location/hours must be authoritative and stale-aware |
| Service-price card | name, eligibility, cost, delivery basis, selection state | terms/fees/availability do not live only in design copy |
| Account tabs | overview/history/invoices/settings with stable selected route | sensitive account data and session policy are product-owned |
| Alert surface | named severity, message, affected object, action/dismiss behavior | red/yellow/blue alone never conveys severity |

---

## 5. Postal-service flow and recovery

### 5.1 Send flow

| Step | Required entry/commit | Recovery |
| --- | --- | --- |
| Prepare | package/service inputs are visible with format/eligibility help | field-local invalid state preserves safe data |
| Choose | comparable options show conditions and selected state | unavailable option explains why and offers valid alternative |
| Confirm | cost, service, address/collection facts are current | changed price/eligibility triggers clear reconfirmation |
| Result | authority confirms action and provides durable reference | failed/pending route explains what was committed, retained, or needs retry/support |

### 5.2 Track and exception flow

```text
reference → retrieve authority record → current event + freshness
  ├─ normal → eligible next action / historical events
  ├─ delayed → cause category + revised data if authoritative + help
  ├─ no result → format/help/retry without exposing private data
  └─ unavailable/stale → last-known context + retry/fallback
```

### 5.3 Privacy and consent

Tracking, address, account, and notification information can be personal data. This pack does not authorize its collection or transmission. Target products define minimization, masking, session, consent, notification, and support policy; the UI makes the selected policy comprehensible rather than hiding it behind visual style.

---

## 6. Accessibility, responsive, and release evidence

- Verify foreground/background contrast on yellow, blue, white, muted, red, and focus surfaces after font/opacity is applied.
- Keyboard path covers global navigation, service tabs, inputs, radio/checkbox/toggle, selected service, submit, alert action/dismiss, and result/recovery.
- Use persistent labels and programmatic error relationships. Do not rely on placeholder copy.
- At narrow width, task action remains near its relevant information; tables/history become labeled records before critical data is lost.
- Support 200% zoom/reflow, long French/localized content, reduced motion, screen reader, low-bandwidth/image failure, and no-result/error fixtures.

| Evidence | Status |
| --- | --- |
| palette, type scale, component/category inventory | OBSERVED in Figma Make version 1 |
| service state/recovery/accessibility/privacy policy | DERIVED portable contract |
| delivery data, claims, personal-data/notification policy, trademarks | EXTERNAL REQUIRED |
| runtime interaction, manual assistive technology, responsive/human-use test | RELEASE REQUIRED |

- [ ] Protected names/assets and factual La Poste-like claims are approved or replaced.
- [ ] Send, track, delayed, no-result, stale, unavailable, cancel, changed-price, confirmation, and retry fixtures pass.
- [ ] Semantic states have actual contrast and redundant text/icon/position cues.
- [ ] Keyboard, screen-reader, zoom/reflow, reduced-motion, and localization evidence is recorded.
- [ ] The neutral, non-branded projection remains coherent without La Poste trade dress.

### Change policy

Raw yellow/blue/red values and font choices can change through a documented semantic adapter. No visual adaptation may remove address/data validation, service conditions, selected-state clarity, confirmation, privacy/consent information, exception handling, or recovery meaning.
