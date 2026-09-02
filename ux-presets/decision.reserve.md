# `decision.reserve` — Fast Single Commitment

> **Version:** 0.1.0  
> **Status:** experimental  
> **UES compatibility:** `0.5.0-draft`

## Contract

| Field | Requirement |
| --- | --- |
| Goal shape | One appropriate option should be committed quickly. |
| Primary task | Evaluate a candidate against active constraints and commit one valid choice. |
| Primary commitment | A single explicit commit, after minimum necessary configuration. |
| Dominant decision aid | Fit explanation: why this candidate is suitable, unavailable, or limited. |
| Required topology | discovery → single selection → minimum configuration → confirmation (when applicable) → result. |
| Result evidence | The committed object, status, material consequence, and next safe action are visible. |
| Must not become | A hidden multi-item cart, comparison task, or irreversible action without proportional prevention/recovery. |

## Required state and retention

| State / event | Required consequence | Retain |
| --- | --- | --- |
| candidate unavailable | show reason, affected constraint, and replacement/retry path; block commitment | active constraints and safe draft |
| invalid configuration | identify field and repair condition near the field | valid input and selected candidate |
| loading / partial / stale | distinguish each from success; state scope and safe next action | last known safe candidate/context |
| Back | return to discovery or configuration without silently replacing selection | selected candidate unless invalidated |
| Cancel / Exit | state whether the uncommitted draft is saved or discarded | only declared, safe draft data |
| Retry | prevent duplicate commit; distinguish retrying preparation from retrying execution | input, selected candidate, idempotency context |
| confirmed result | present evidence, next action, and applicable undo/support path | receipt/reference and safe result context |

## Authority and commitment

- A `system-recommendation` may be prominent but remains distinct from a `user-draft`.
- A candidate becomes a `user-commitment` only through the declared commit action.
- The UI must not report success until a `confirmed-outcome` exists. Pending execution is a distinct state.
- If the commitment has high cost, require confirmation or reliable undo proportional to that cost.

## Required expression capabilities

The active Design Pack and Medium Adapter must express: one active selection; fit rationale/limitations; validation near input; enabled/disabled commitment with reason; pending versus confirmed status; recovery action; non-color-only focus/selection/risk cue.

## Minimum semantic test suite

- [ ] A valid candidate can be selected, minimally configured, committed, and evidenced.
- [ ] A recommendation is identifiable and can be replaced before commitment.
- [ ] Missing or invalid input blocks commitment and preserves correctable input.
- [ ] Unavailable candidate or failed preparation provides a safe replacement/retry path.
- [ ] Double activation or retry cannot create an unintended duplicate commitment.
- [ ] Back, Cancel, and Exit follow the declared retention policy.
- [ ] Keyboard/platform-equivalent input reaches selection, commitment, and recovery actions.

## Product Binding must supply

Candidate data, eligibility/availability rules, commitment side effects, confirmation threshold, idempotency policy, outcome evidence, undo/support policy, and data freshness authority.
