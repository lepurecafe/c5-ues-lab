# Royal Mail Service System

> **ID:** `pack:royal-mail-service`  
> **Version:** 1.0.0  
> **Visual source:** [Figma Make — Royal Mail](https://www.figma.com/make/fHy4z58SSXR2KKYrtiHisw/Royal-Mail?t=3qaHz60UBGR3Y4TW-1)  
> **Source inspected:** 2026-08-24, Figma Make version 1 / preview label `v2.4.0`  
> **Evidence status:** visual inventory, visible tab/component labels, and source-described interaction inventory inspected. Real postal data, accessibility technology, and service recovery remain release gates.

> **Preview:** [preview.html](preview.html) demonstrates the visual system, local tracking validation, service selection, status timeline, and recovery presentation. It does not query a carrier or create a shipment.

## 0. Intent, scope, and trademark boundary

Royal Mail Service System translates an observed **British institutional postal** expression into a portable service design pack: dignified serif hierarchy, crisp white fields, a bounded postal red, practical data records, and a calm sense of public-service reliability.

This is an unofficial study derived from a user-provided Figma Make file. It is **not** Royal Mail Group's official system and grants no right to Royal Mail names, crown/postal marks, logos, vehicle/worker imagery, service names, prices, tracking codes, address data, or customer communications. A non-authorized implementation uses a neutral public-service name and replaces every protected asset and factual service claim.

| This pack owns | Product Binding / UX Preset owns |
| --- | --- |
| visual character, hierarchy, token roles, component expression, density, timeline/data treatment | shipment truth, eligibility, address validation, price, delivery promise, consent, identity, payment, commitment, recovery, legal/service policy |

### Use when

- a trustworthy, civic, institutional, or logistics-service tone is appropriate;
- tracking records, service selection, collection, handoff, and delivery status must be clear;
- an editorial serif headline plus utilitarian sans UI fits the product.

### Do not use when

- a project has no legitimate relationship to institutional or logistics service and would borrow the visual language mechanically;
- fast-changing operational data cannot be sourced or time-stamped;
- a reference mark would imply an official postal service relationship.

---

## 1. Visual grammar

### 1.1 Character rules

| Principle | Contract | Do not |
| --- | --- | --- |
| Institutional warmth | combine quiet white/stone surfaces with an authoritative serif title and direct task language | turn the system into a luxury editorial site or cheerful consumer app |
| Bounded red | reserve red for primary commitment, active service identity, and clearly named error/destructive context | paint every card, icon, or status red |
| Record clarity | keep reference, date, destination, status, and next action in stable rows | bury a shipment state in decorative badges |
| Purposeful utility | crisp dividers, modest radius, concise labels, direct navigation | use floating glass panels or excessive animation |
| Timeline truth | a stage visual always has text state, event time/source, and next available action | treat a dotted line as proof of movement or delivery |

### 1.2 Observed page anatomy

| Region | Observed source | Pack rule |
| --- | --- | --- |
| Header | red brand rail; `Send`, `Track`, `Receive`, `Business`, `Help` | short service-oriented navigation; current route remains textually identifiable |
| Hero | dark charcoal field; red mono system label; large serif title | establish trust/voice before component inventory |
| Section system | numbered sections, generous white field, strong horizontal rule | number → title → concise explanation → specimen |
| Service controls | sharp, purpose-driven buttons and service-choice tabs | action label names the task and consequence |
| Operational data | timeline, table, reference strings, status badges | data has context/freshness and a readable fallback at narrow widths |

---

## 2. Foundation

### 2.1 Observed raw tokens

| Token | Value | Role |
| --- | --- | --- |
| `--color-rm-red` | `#E3001B` | primary service/action signal |
| `--color-rm-red-dark` | `#B0001A` | pressed/deep red context |
| `--color-rm-red-light` | `#F5C6CC` | low-emphasis red surface |
| `--color-rm-charcoal` | `#1A1A1A` | hero, primary text, deep structure |
| `--color-rm-slate` | `#4A4A4A` | secondary text after contrast validation |
| `--color-rm-stone` | `#F5F2EE` | warm neutral surface |
| `--color-rm-warm-gray` | `#E8E3DC` | quiet fill |
| `--color-rm-border` | `#D0C9C0` | divider/control boundary |
| `--color-rm-white` | `#FAFAF8` | main reading field |
| `--success` | `#1D6B40` | confirmed/healthy status |
| `--warning` | `#C46200` | attention/delay status |
| `--error` | `#E3001B` | failure/destructive status |
| `--info` | `#1A5276` | informational status |

### 2.2 Semantic adapter

| Semantic token | Default mapping | Rule |
| --- | --- | --- |
| `--color-page` | `var(--color-rm-white)` | primary reading field |
| `--color-surface-muted` | `var(--color-rm-stone)` | quiet content group |
| `--color-text` | `var(--color-rm-charcoal)` | essential copy |
| `--color-text-muted` | `var(--color-rm-slate)` | nonessential supporting copy only until measured |
| `--color-action-primary` | `var(--color-rm-red)` | one primary commit in a decision region |
| `--color-focus` | **ADAPTER-TESTED** | visible focus must meet contrast on its actual surface |
| `--color-status-*` | success/warning/error/info | text + icon/order/placement remain required |

### 2.3 Typography and spacing

| Role | Observed family / scale | Use |
| --- | --- | --- |
| Display | Libre Baskerville, `3rem / 700` | one authoritative statement |
| H1 | Libre Baskerville, `2rem / 700` | task/page title |
| H2 | Libre Baskerville, `1.5rem / 700` | major group |
| H3 | Libre Baskerville, `1.25rem / 600` | local group |
| Body | Source Sans 3, `1rem / 400` | readable service explanation |
| Small | Source Sans 3, `.875rem / 400` | supporting information |
| Label | Source Sans 3, `.75rem / 600` | visible field/status label |
| Record | JetBrains Mono, `.875rem / 400` | tracking/reference code only |

**Observed spacing:** 4px base unit; `4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96px`.

**Derived:** localize fonts and type scale for target scripts; never force a tracking/reference font on explanatory text. Test long name/address, code, date/time, currency, and localized service labels before fixing a layout.

---

## 3. Component and data contract

### 3.1 Source coverage

| Area | Observed inventory | Required implementation states |
| --- | --- | --- |
| Buttons | primary, secondary, ghost, danger; small/medium/large; disabled | default, hover, focus-visible, pressed, disabled, loading, consequence/result |
| Badges/status | delivered, in transit, delayed and service-status examples | text state, affected object, update/freshness, next action if needed |
| Form elements | label/helper/error input, checkbox, prefix input | entered, invalid, valid, disabled, processing, retained safe input |
| Cards | delivery status, service, alert | loading, empty, error, no-decision dead end |
| Tabs | standard/tracked/special/international service selection | selected text state, keyboard operation, panel relationship |
| Timeline | parcel tracking stages | current/completed/future/exception; event time/source and accessible text equivalent |
| Data table | sending history, row hover, badges | loading/empty/error, sort/filter context, responsive record layout |
| Utilities | breadcrumb, pagination, export action | current location/page, unavailable reason, action outcome |

### 3.2 Status vocabulary

`Delivered`, `In transit`, and `Delayed` are not merely visual badges. Product policy defines the source-of-truth state model.

| State | Required outcome |
| --- | --- |
| Delivered | identify parcel/order, final event time/location policy, receipt/proof route if available |
| In transit | last confirmed scan and freshness; no unsupported delivery promise |
| Delayed | cause category when known, revised expectation if authoritative, help/rebook/claim route where applicable |
| Exception / unable to deliver | what was attempted, retained shipment state, next eligible action, support route |
| Unknown / stale | state explicitly that the source is unavailable or old; show last-known time and retry |

### 3.3 Form feedback

```text
resting → input → field-local validation → valid
                    ↓
             invalid: text + association + retained safe value
                    ↓
submit → processing lock → confirmed / recoverable failure / blocking failure
```

The source displays accessible-focus intent. Treat this as a requirement to verify, not proof of a manual assistive-technology run.

---

## 4. Composition recipes

| Recipe | Assembly rule | Never omit |
| --- | --- | --- |
| Track a parcel | reference field, submit, local validation, latest authoritative event, timeline, clear recovery/help | tracking-data freshness and exception state |
| Service selection | comparable service tabs/cards, price/eligibility source, selected state, next commit | conditions, delivery promise basis, unavailable explanation |
| Delivery status card | status text + date/context + next action in a quiet surface | affected shipment identity |
| Sending history | data table at wide widths; labeled records at narrow widths | row state, filter/sort context, empty/error route |
| Collection/rebook | consequence, eligibility, available slots/source, confirmation/receipt | cancellation/change policy and retained selection |
| Public-service hero | white/nav/red identity; dark editorial lead; direct task choice | claims that are not approved product data |

---

## 5. Service flow and recovery

### 5.1 Tracking flow

| Step | Entry | Commit | Recovery |
| --- | --- | --- | --- |
| Enter reference | no verified state yet | submit valid reference | explain format; preserve safe input |
| Retrieve status | authority/data source available | show returned data with freshness | loading, unavailable, malformed, and stale routes |
| Interpret event | event exists | expose current state and next action | exception/delay route does not invent a new ETA |
| Act | eligible action exists | rebook, collect, help, or return | result receipt/confirmation and cancellation policy |

### 5.2 Booking and cancellation

- The primary button is unavailable until the actual required conditions are satisfied; explain the shortest repair route.
- A price, collection point, delivery date, or slot is reconfirmed at commitment if it may have changed.
- Cancel/rebook warns about affected selection, fees/eligibility where applicable, and retains safe input/context on cancellation or recoverable failure.
- A toast is supplementary. Confirmation requires a durable result, reference, or next safe action.

---

## 6. Accessibility, responsive, and public-service floor

- Use labels, not placeholders, for tracking/reference and address/service fields.
- Focus-visible is high-contrast, keyboard reachable, and not color-only.
- Timeline, badges, error, status, and active tabs expose text state; status updates use proportionate live announcements.
- Tables become labeled records before critical cells are inaccessible horizontally.
- Test 200% zoom/reflow, small viewport, keyboard-only path, screen reader, low-bandwidth/image failure, long localized content, and reduced motion.
- Public/essential services must provide a support/fallback channel where the digital path cannot complete a task; the actual channel is product policy, not pack decoration.

---

## 7. Evidence and release gate

| Evidence | Current status |
| --- | --- |
| visual tokens, typography, components, timeline/table inventory | OBSERVED in Figma Make version 1 |
| service flow/recovery/accessibility floor | DERIVED portable contract |
| real status data, delivery/service policy, price/eligibility, rights | EXTERNAL REQUIRED |
| runtime keyboard, screen-reader, responsive, loading/error, human-use evidence | RELEASE REQUIRED |

- [ ] Approved names, marks, service claims, imagery, and customer communications replace or clear every reference asset.
- [ ] Tracking, delayed/exception, unavailable, stale, and no-result fixtures are tested against the target data authority.
- [ ] Service selection, collection/rebook, cancel, and confirmation paths retain context and expose recovery.
- [ ] Shipped contrast, keyboard, zoom/reflow, screen-reader, reduced-motion, and localized content runs are recorded.
- [ ] A non-branded deployment remains coherent after Royal Mail reference assets are removed.

### Change policy

Visual adaptation may alter raw colors, typefaces, or surface detail only through the semantic layer. It must preserve shipment truth, status meaning, validation, eligibility, commitment, confirmation, and recovery meaning.
