# UX System v2

> Status: Historical predecessor; preserved as C5 experiment evidence
>
> Superseded by: [Universal Experience System v0.2](04-universal-experience-system.md)
>
> Purpose: make UX behavior portable across products and independent from visual Design Packs.
>
> Inherits: [UX System v1 in Figma Make](https://www.figma.com/make/ehh8VJoRn8e5xEgbYif72V/UX-System?t=gqwnhFi7E3RLiWk6-1)
>
> Evidence basis: the Design Pack Adapter Lab and the 2026-08-21 workshop reference-product experiment.

## 0. What this system is

This file is a decision contract, not a screen inventory, wireframe, component library, or visual style guide.

It defines:

- what a person is trying to decide;
- the product objects and states needed to make that decision;
- how a Goal Profile changes information architecture and interaction;
- how empty, loading, error, validation, confirmation, and recovery behave;
- the boundary between UX behavior and a Design Pack.

It does **not** define colors, fonts, imagery, card geometry, spacing scale, or a brand voice. Those belong to a Design Pack.

## 1. Inheritance from UX System v1

The original Figma UX System remains the visual research and presentation source. This v2 document inherits its intent while making the adapter rules testable.

| v1 asset | v2 decision | Reason |
| --- | --- | --- |
| Goal-oriented UX framing | Keep | A product should be organized around the decision a person needs to make. |
| Shared flow vocabulary | Keep and normalize | `Inform → Select → Process → Confirm → Result` remains useful across products. |
| Screen and flow examples | Keep in Figma only | Examples help discussion but cannot enforce behavior. |
| Goal Profiles | Rewrite as contracts | A profile must change structure and rules, not just labels or colors. |
| Visual examples | Move to Design Pack responsibility | Visual character is intentionally variable. |

## 2. System model

Every product binds its own nouns to the following generic model.

| Generic concept | Meaning | Workshop binding | Random Beat Maker binding |
| --- | --- | --- | --- |
| Candidate | an option that may be chosen | workshop session | playable beat / next-beat option |
| Selection | a candidate intentionally kept for a decision | reservation candidate | queued / locked beat |
| Constraint | condition that limits valid choices | date, price, location | BPM, genre, energy, round length, output availability |
| Commitment | an action that makes the choice effective | booking confirmation | start playback / commit transition |
| Result | evidence that commitment succeeded | ticket / booking state | playing state / transition completed |
| Recovery | safe path after a problem | amend selection / retry | undo, fallback beat, retry audio route |

### 2.1 Shared semantic units

All implementations must be able to project these units, even if a product does not expose all of them at once.

| Unit | User question it answers |
| --- | --- |
| Context | “Where am I and what mode am I in?” |
| Candidate | “What can I choose?” |
| Constraint / filter | “What is allowed or relevant?” |
| Selection | “What have I kept or committed to?” |
| Primary action | “What is the one safe next move?” |
| Status | “What is happening now?” |
| Cue / preview | “What happens next?” |
| Validation | “What must I fix before continuing?” |
| Feedback | “Did my action work?” |
| Recovery | “How do I safely continue after a problem?” |

### 2.2 Shared state contract

Every state must expose: current status, available next action, and recovery path when failure is possible.

```text
idle → informed → selecting → configured → committing → result
                   ↘ loading / empty / invalid / error → recovery → selecting
```

Required rules:

1. Do not rely on color alone for status, selection, risk, or validation.
2. A commitment cannot appear available when required selection or validation is incomplete.
3. A visible selection must remain understandable after a filter, search, or mode change.
4. If a selection is hidden by a constraint, the system must choose one explicit policy: reveal it, preserve it with a “hidden by filter” explanation, or remove it with an undo path.
5. Error and empty are product states, not test-only buttons. Each must state the cause when known and present the shortest safe recovery.
6. Destructive or interruption-prone actions require prevention and recovery proportional to their cost.

### 2.3 System invariants

These rules survive every Goal Profile, Design Pack, viewport, and platform projection.

1. **One source of truth:** candidate data, active selections, constraints, recommendations, prices/durations, eligibility, and CTA availability derive from one explicit state model.
2. **Truthful consequence:** after a user action, every dependent surface updates together. A visible recommendation, total, conflict, ticket, cue, or CTA may never describe an older state.
3. **Known authority:** when the system recommends something, it must distinguish `system recommendation`, `user selection`, and `unavailable/invalid` rather than presenting them as the same fact.
4. **Safe commitment:** the primary CTA is enabled only when the current state is valid. If not valid, the reason and shortest repair action are visible.
5. **Reversible cost:** selecting, replacing, reordering, stopping, or committing a high-cost action provides an appropriate undo, confirmation, or safe fallback.
6. **Field resilience:** when the operating context has time pressure, unreliable network, hardware output, permissions, or low attention, the system exposes a known-safe fallback before optional variety.

### 2.4 State derivation and transition contract

For each product binding, declare the state fields and the effects they derive. Do not encode these effects as disconnected page-specific conditionals.

| State field | Must derive from it | Example |
| --- | --- | --- |
| active selection | selected detail, winner, reservation/queue summary, commitment target | choosing Street Light changes the chosen-winner summary |
| constraints / filters | visible candidates, hidden-selection explanation, eligibility | a filter cannot silently hide an actionable selected candidate |
| recommendation | rationale, confidence/limitations, visual emphasis | recommendation changes or is explicitly separated from user choice |
| plan composition | order, time/resource placement, totals, conflicts, confirm eligibility | moving a session recomputes the itinerary and totals |
| commitment state | CTA label, disabled state, receipt/ticket/result, available undo | reservation confirmation creates a visible ticket reference |
| capability state | loading, fallback, error/retry path | unavailable audio route enables the safe fallback rather than an inert play button |

Every transition records: **trigger → state change → visible consequence → recovery/undo**.

### 2.5 Recovery and reversibility contract

| Situation | Required response |
| --- | --- |
| Input invalid | identify the affected field, explain the condition, retain safe input, offer correction |
| Empty result | state what constrained the result, preserve understandable selection context, offer reset/relax actions |
| Conflict | name the conflicting objects and rule, offer at least one valid alternative, apply the chosen alternative visibly |
| Async/loading failure | distinguish pending from failed, preserve last known safe state, expose retry/fallback |
| Destructive/interruption action | prevent accidental execution and offer undo or confirmation proportional to cost |
| Device/permission/output failure | explain the affected capability and route to a product-specific safe default |

## 3. Goal Profiles

A Goal Profile controls decision behavior. It is not a visual theme, a CTA label, or a preselected item list.

### 3.1 Reserve — fast single commitment

**Use when:** the user wants one appropriate option quickly and the cost of comparing alternatives is greater than the benefit.

| Contract | Rule |
| --- | --- |
| Primary decision | choose one candidate and commit |
| Required information architecture | discovery → single selection → minimum configuration → confirmation → result |
| Selection model | exactly one active candidate; replacement is explicit |
| Primary surface | candidate detail with one dominant action |
| Required explanation | why this candidate fits the active constraints |
| Recovery | edit constraints, replace candidate, undo when feasible |
| Success | commitment evidence and next action are immediately visible |

**Must not degrade into:** a multi-item cart, hidden configuration, or an irreversible action without confirmation/recovery.

### 3.2 Compare — evidence-led choice

**Use when:** differences between a small number of candidates are the decision itself.

| Contract | Rule |
| --- | --- |
| Primary decision | choose one candidate after evaluating differences |
| Required information architecture | discovery → candidate set → comparison surface → decision → confirmation → result |
| Selection model | 2–3 comparable candidates; the limit and replacement behavior are visible |
| Primary surface | side-by-side or equivalently scannable comparison of shared attributes and differences |
| Required explanation | common fields, meaningful differences, and a recommendation or decision rationale when the system can provide one |
| Constraint behavior | selected candidates must remain visible, or their hidden/invalid state must be explained before commitment |
| Recovery | revise candidate set without losing comparison context |
| Success | selected winner, rationale, and committed result are visible |

**Must not degrade into:** a standard browse grid whose heading, CTA, and selection count merely changed.

### 3.3 Plan — constraint-aware composition

**Use when:** the user is arranging multiple candidates across time, sequence, resources, or rules.

| Contract | Rule |
| --- | --- |
| Primary decision | create a valid multi-item arrangement |
| Required information architecture | discovery → multi-selection → plan/timeline → conflict resolution → confirmation → result |
| Selection model | multiple candidates with order, time, or priority where relevant |
| Primary surface | timeline, schedule, queue, or other composition view—not only a selection list |
| Required explanation | conflicts, gaps, total cost/duration, and the reason an option cannot fit |
| Constraint behavior | recompute plan validity after every relevant change |
| Recovery | resolve conflict, swap candidate, reorder, or revert safely |
| Success | a coherent plan plus an actionable next step |

**Must not degrade into:** “Reserve with a higher selection cap.”

## 4. Adapter contract

An implementation is a valid projection only when it makes the following changes as the Goal Profile changes.

| Adapter dimension | Reserve | Compare | Plan |
| --- | --- | --- |
| Main content frame | candidate/detail | comparison surface | plan/timeline surface |
| Selection limit | 1 | 2–3 | product-defined multiple |
| Dominant decision aid | fit explanation | differences + rationale | conflict + sequencing guidance |
| CTA meaning | commit one | choose winner then commit | validate/commit arrangement |
| Filter interaction | refine replacement candidate | preserve comparison visibility | recalculate plan feasibility |
| Error recovery | choose/retry one | repair candidate set | resolve conflict/fallback |
| Result | committed candidate | chosen winner + evidence | confirmed arrangement |

### 4.1 Design Pack boundary

| A Design Pack may change | A Design Pack must not change |
| --- | --- |
| visual hierarchy and data density | Goal Profile’s primary decision |
| navigation frame and component anatomy | selection limits and validity rules |
| type, color, surfaces, motion tone | required comparison, plan, validation, and recovery meaning |
| card/list/table/timeline visual expression | commitment requirements and success evidence |
| how status is visually represented | whether status, next action, and recovery are available |

The pack may express a Compare surface as a dense operational table, editorial comparison cards, or a minimal spec sheet. It may not remove comparison merely because its character favors simplicity.

### 4.2 Accessibility and platform floor

Every projection must provide:

- visible text or icon-plus-text state cues; never color-only state;
- keyboard or platform-equivalent access to primary, destructive, and recovery actions;
- perceptible focus/selection indication;
- labeled input and validation connected to the relevant field;
- touch targets and hierarchy suitable for the intended operating context;
- reduced-motion or no-motion equivalent for meaningful transitions;
- a safe state when output, permission, network, or hardware prerequisites fail.

### 4.3 Responsive and platform adapter

Responsive adaptation preserves decision priority; it does not merely compress desktop columns.

| Rule | Contract |
| --- | --- |
| Primary decision first | On constrained screens, keep the active candidate/decision surface and primary action ahead of secondary filters or reference material. |
| Progressive disclosure | Collapse filters, metadata, and secondary navigation only when their current values and a way to reopen them remain perceptible. |
| Input fit | Declare the primary input mode: touch, pointer, keyboard, voice, hardware control, or one-handed/field operation. |
| Context fit | Declare environmental constraints such as noise, darkness, network uncertainty, motion, time pressure, and shared displays. |
| Platform failure | Bind permission, audio/video, offline, output-route, and OS interruption failures to the recovery contract. |

### 4.4 Recommendation and trust contract

Recommendations are decision aids, not decorative copy.

1. State the criteria and data used for a recommendation when it materially affects the decision.
2. Update the rationale when relevant constraints or candidate data change.
3. When the user selects an option different from the recommendation, preserve both facts: `your choice` and `system recommendation`.
4. Do not imply certainty when data is incomplete, stale, inferred, or preference-based.
5. Provide an explanation or comparison route before irreversible commitment when the recommendation has material impact.

## 5. Product binding procedure

Before generating a Figma Make file or HTML prototype, write a short binding block.

```md
## Product binding: {product}

- Primary user:
- Operating context:
- Candidate:
- Constraints:
- Commitment:
- Result evidence:
- Failure cost:
- Selected Goal Profile:
- Required semantic units:
- Explicit recovery policy:
```

### Example: C5 Random Beat Maker

- Primary user: battle host without a dedicated DJ.
- Operating context: noisy, dark, time-pressured performance setting.
- Candidate: a rights-cleared beat with BPM, genre, energy, duration, and cue metadata.
- Constraints: round format, BPM/mood range, output route, playback availability.
- Commitment: begin current beat or commit next-beat transition.
- Result evidence: audible playback plus redundant on-screen `playing` state, current beat metadata, and next cue.
- Failure cost: lost battle flow, accidental stop, silent output, wrong next beat.
- Default Goal Profile: Reserve for immediate playback; Plan only when the host is arranging a multi-round set.
- Recovery: undo/hold next transition, fallback beat, audio-route recovery, and safe stop confirmation.

## 6. Experiment protocol

### 6.1 Fixed elements

For one experiment, keep constant:

- product binding and candidate data;
- task script and success condition;
- state inventory;
- accessibility floor;
- viewport/platform target;
- evaluation rubric.

### 6.2 Variable elements

Run both axes separately.

1. **Character axis:** one Goal Profile × three strongly different Design Packs. Verify that the decision meaning and state contract survive character changes.
2. **Goal axis:** one Design Pack × Reserve, Compare, and Plan. Verify that information architecture, decision aid, selection behavior, and recovery change—not just colors, headings, CTA labels, or default selections.

### 6.3 Pass/fail checks

| Check | Pass condition | Fail signal |
| --- | --- | --- |
| Goal fit | a first-time viewer can state the decision and next action | profile needs explanatory copy to be understood |
| UX integrity | profile changes main surface and decision aid | only labels, CTA, and selection count change |
| Character fidelity | pack changes visual/component expression coherently | only palette, font, and corner radius change |
| Selection consistency | filtering/mode changes preserve or explain selection | selected candidates disappear without explanation |
| State/recovery | empty/error/invalid have a causal message and recovery | test-only state toggles or dead-end messages |
| Accessibility | semantic labels, focus, redundancy, and validation are demonstrable | color-only / unlabeled / unreachable controls |
| Portability | the same contract can be projected to Figma and HTML | behavior exists only as page-specific conditional code |
| Manual correction cost | correction is local to pack or profile rules | every projection requires bespoke layout logic |

### 6.4 Measurement contract

Every experiment records only metrics relevant to its product binding and Goal Profile.

| Metric | What it proves |
| --- | --- |
| time to first valid commitment | immediacy and onboarding cost |
| decision reversal / undo rate | uncertainty, poor fit, or unsafe commitment |
| recommendation acceptance and override reason | recommendation usefulness without treating compliance as success |
| invalid / conflict resolution rate and time | recovery clarity and state-model quality |
| accidental destructive action | risk prevention quality |
| visible-state identification time | performance-mode legibility |
| manual correction count by layer | whether defects belong to product binding, Goal Profile, Design Pack, or platform adapter |

Record the task script, viewport/platform, data fixture, and whether the evidence is AI critique, automated test, or human observation.

## 7. Current evidence and consequences

### 7.1 What passed

- The Design Pack can actively alter hierarchy, layout anatomy, density, and component expression.
- Reserve browsing, empty recovery, and inline validation can be projected as reusable semantic units.

### 7.2 What failed or remains unproven

- Compare and Plan were initially rendered as the same browse screen with different text, selection defaults, and CTA labels.
- Filtering could hide a selected comparison candidate while it remained actionable in the selection rail.
- State controls were exposed as test tools rather than being caused by ordinary product actions.
- Figma ↔ HTML portability and independent accessibility verification remain unproven.
- In the Royal Mail Goal Profile Lab, Compare recommendation did not update after the winner changed, and Plan recovery removed a warning without visibly applying the selected alternative. These are state-derivation failures, not visual defects.

### 7.3 Promotion rule

No rule becomes a stable UX-system rule after one attractive prototype. Promote it only after it survives:

1. at least two product bindings;
2. at least two Design Packs;
3. a valid HTML and Figma projection where applicable;
4. state/recovery and accessibility checks;
5. a recorded manual-correction review.

### 7.4 Potential contract backlog

These are expected cross-product needs, but remain hypotheses until a product binding requires and tests them.

| Candidate contract | Promotion trigger |
| --- | --- |
| multi-user authority and handoff | two or more people can alter the same selection/plan or a host hands control to a participant |
| privacy and data-retention disclosure | a binding collects personal, location, recording, payment, or behavioral data |
| localization and content-length resilience | a projection targets multiple languages/scripts or variable legal/content copy |
| saved drafts and cross-device continuity | a commitment can span sessions, devices, or intermittent connectivity |
| notification and reminder policy | the product must re-enter the user’s attention after the current task |
| Design Pack capability matrix | a pack cannot express a required decision aid without an approved alternate representation |
| machine-readable projection schema | rules are repeated reliably enough across Figma/HTML/AI prompts to justify JSON/YAML extraction |

## 8. Change log

| Version | Date | Change | Evidence |
| --- | --- | --- | --- |
| v2.0-draft | 2026-08-21 | Converted UX System v1 concepts into behavior, adapter, and experiment contracts. | Design Pack Adapter Lab; workshop reference-product audit |
| v2.1-experiment | 2026-08-21 | Validated the Goal axis with an unused Royal Mail Design Pack: Reserve/detail, Compare/table, and Plan/timeline became separate structural projections. | `experiments/royal-mail-goal-profile-lab/`; `artifacts/royal-mail-profile-experiment/` |
| v2.2-contracts | 2026-08-21 | Added system invariants, state derivation, reversibility, responsive/platform, trust, measurement, and a hypothesis backlog after Royal Mail audit findings. | `artifacts/royal-mail-profile-audit-2026-08-21/audit.md` |
