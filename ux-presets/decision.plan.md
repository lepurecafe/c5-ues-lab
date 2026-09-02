# `decision.plan` — Constraint-aware Composition

> **Version:** 0.1.0  
> **Status:** experimental  
> **UES compatibility:** `0.5.0-draft`

## Contract

| Field | Requirement |
| --- | --- |
| Goal shape | Multiple objects must form a feasible arrangement across time, sequence, space, resources, or rules. |
| Primary task | Select, place, order, and repair objects until the composition is valid. |
| Primary commitment | Commit a valid multi-object composition. |
| Dominant decision aid | Order, placement, gaps, conflicts, totals, feasibility, and reasoned repair options. |
| Required topology | discovery → multi-selection → composition view → conflict resolution → confirmation → result. |
| Result evidence | Confirmed arrangement, material constraints/totals, and actionable next step are visible. |
| Must not become | `Reserve` with a higher selection cap or a list that hides sequence and conflict. |

## Required state and retention

| State / event | Required consequence | Retain |
| --- | --- | --- |
| placement / order changes | recompute conflicts, totals, feasibility, CTA availability, and all dependent cues together | current draft composition |
| conflict | name the objects/rule; offer at least one feasible repair or explain why none exists | composition and conflict context |
| partial / stale constraints | distinguish from valid feasibility; identify uncertain elements | last known safe composition/context |
| object unavailable | identify affected placement and provide swap, remove, reorder, or fallback path | unaffected composition |
| Back / Cancel / Exit | describe whether the draft plan persists and when it expires | declared safe draft and constraint snapshot |
| Retry / Resume | prevent duplicate commitment and revalidate changed constraints before commit | plan plus freshness/identity context |
| confirmed result | provide arrangement evidence, references, and applicable edit/undo/support path | result reference and safe summary |

## Authority and commitment

- A system-suggested arrangement is a `system-recommendation`, not a commitment.
- The composed plan is a `user-draft` until the user confirms it and current constraints validate it.
- If constraints change between confirmation and execution, show the difference and require an appropriate repair or reconfirmation.
- A result is `confirmed-outcome` only with execution evidence; otherwise expose pending/failure/retry safely.

## Required expression capabilities

The active Design Pack and Medium Adapter must express: multiple selected objects; order/placement; conflict source and severity; feasibility and total consequences; repair options; a composition-level commitment state; draft versus confirmed outcome; non-color-only priority, focus, and risk cues.

## Minimum semantic test suite

- [ ] Adding, removing, reordering, or placing an object synchronizes every dependent total, conflict, feasibility, CTA, and cue.
- [ ] A conflict names the relevant rule/objects and offers a visible repair path.
- [ ] The composition view exposes sequence, placement, or resource relationship—not only selected items.
- [ ] Unavailable or changed constraints trigger safe revalidation before commitment.
- [ ] A system-generated plan remains distinguishable from the user's confirmed plan.
- [ ] Back, Cancel, Resume, and Exit obey declared draft persistence and expiry rules.
- [ ] Retry or repeated activation cannot duplicate execution.
- [ ] Keyboard/platform-equivalent input reaches composition, repair, commitment, and recovery actions.

## Product Binding must supply

Objects, placement/sequence model, constraints and conflict rules, totals/feasibility calculation, availability/freshness authority, suggestion logic, commitment side effects, confirmation threshold, and edit/undo/support policy.
