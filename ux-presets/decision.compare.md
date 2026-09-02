# `decision.compare` — Evidence-led Choice

> **Version:** 0.1.0  
> **Status:** experimental  
> **UES compatibility:** `0.5.0-draft`

## Contract

| Field | Requirement |
| --- | --- |
| Goal shape | Differences among a small candidate set are the decision itself. |
| Primary task | Assemble a comparable candidate set, inspect meaningful differences, choose a winner, then commit. |
| Primary commitment | Commit one winner after evidence-led evaluation. |
| Dominant decision aid | Shared attributes, meaningful differences, rationale, and declared limitations. |
| Required topology | discovery → candidate set → shared comparison surface → winner → confirmation (when applicable) → result. |
| Result evidence | Chosen winner, the decisive context/rationale, and committed result are visible. |
| Must not become | A browse grid with a different heading, CTA, or selection count. |

## Required state and retention

| State / event | Required consequence | Retain |
| --- | --- | --- |
| set below minimum / above limit | explain limit and replacement rule; prevent misleading comparison/commit | existing candidates and comparison context |
| incomparable / partial data | identify missing or non-equivalent attributes; do not imply a fair comparison | candidate set and known values |
| changed filter / sort / mode | preserve selected candidates or visibly explain hidden/invalid ones | candidate set and comparison context |
| recommendation changes | update criteria/rationale and keep user choice distinct | user draft unless invalid |
| candidate becomes unavailable | name affected candidate and rule; offer replacement or revise-set path | remaining set and comparison context |
| Back / Cancel / Resume | follow declared draft persistence; never silently collapse the set | candidate set, sort/filter context where safe |
| winner confirmed | preserve the decisive evidence or a stable reference to it | winner and result reference |

## Authority and commitment

- `system-recommendation` must state its criteria, limitations, and freshness when they materially affect the decision.
- `user-draft` is the candidate set plus a tentative winner; neither is a commitment.
- A user may override a recommendation. The override must remain visible after the result where rationale matters.
- A `confirmed-outcome` must not be represented by a highlighted candidate alone.

## Required expression capabilities

The active Design Pack and Medium Adapter must express: a bounded candidate set; common attribute labels; meaningful differences; missing/incomparable values; selection and tentative winner; recommendation basis/limitation; comparison-context preservation; commit/revision/recovery actions; non-color-only status and focus cues.

## Minimum semantic test suite

- [ ] A small valid set is compared through an equivalently scannable shared surface.
- [ ] The set limit and replacement behavior are visible before a candidate is lost.
- [ ] Filter, sort, or mode changes cannot silently hide an actionable selection.
- [ ] Missing, stale, or incomparable data is distinguished from a favorable value.
- [ ] Recommendation criteria change visibly when source state changes.
- [ ] Revising the candidate set preserves useful comparison context.
- [ ] A winner is committed with evidence distinct from selection highlighting.
- [ ] Keyboard/platform-equivalent access reaches candidate-set revision, comparison content, commitment, and recovery.

## Product Binding must supply

Candidate eligibility, comparable attributes, source/provenance/freshness rules, set limits, recommendation logic and authority, commitment side effects, confirmation threshold, and result/undo/support policy.
