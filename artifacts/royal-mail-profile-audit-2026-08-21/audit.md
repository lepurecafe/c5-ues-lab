# Royal Mail Goal Profile Lab — Product Audit

Date: 2026-08-21
Scope: Reserve → confirmation, Compare → winner selection, Plan → conflict resolution

## Verdict

**The UX System v2 is directionally validated, but not yet behaviorally complete.**

The lab now proves an important distinction that the previous Industrial Swiss experiment did not: one Design Pack can project Reserve, Compare, and Plan as three different information architectures. It does not yet prove that every visible decision aid is live and internally consistent.

## Evidence steps

1. `01-reserve.png` — **Good.** A single candidate detail, fit explanation, reservation summary, and one commitment action align with Reserve.
2. `02-reserve-confirmed.png` — **Good.** Commitment gives a locally visible result: confirmation text and ticket reference.
3. `03-compare.png` — **Mixed.** The table, two candidates, and radio choice form a genuine Compare structure. However, after Street Light Study is selected, the recommendation still favors Graphic Systems That Scale.
4. `04-plan-conflict.png` — **Good structural start.** A time grid, itinerary rail, named conflict, and alternatives make Plan materially different from Reserve and Compare.
5. `05-plan-resolved.png` — **Incomplete recovery.** The warning disappears and the CTA becomes available, but the selected suggested swap does not visibly move the session, recalculate totals, or explain the new valid schedule.

## Scorecard

| Criterion | Score | Assessment |
| --- | ---: | --- |
| Royal Mail character fidelity | 8.5 | Red masthead, paper surface, serif hierarchy, rules, operational form/table language are coherent. |
| Goal Profile structural separation | 8 | Detail, comparison table, and timeline are clearly different main surfaces. |
| Reserve integrity | 7.5 | Direct and understandable; confirmation is visible. |
| Compare integrity | 5 | Recommendation and final selection can disagree. |
| Plan integrity | 5.5 | Conflict detection is clear; the resolution is not yet a truthful model update. |
| State/recovery | 5.5 | Visible recovery exists, but its consequence is partially simulated rather than explained. |
| Accessibility evidence | 6 | Labels, semantic tables, radios and states are present; small mono labels and keyboard/focus behavior need dedicated testing. |
| Responsive quality | 5 | 390px retains readable controls but forces filters before the primary decision surface. |

## Highest-priority fixes

1. **P1 — Make Compare recommendation reactive.** Change its rationale and visual emphasis when the user chooses Street Light Study, or make recommendation informational but separate it from the selected winner.
2. **P1 — Make Plan resolution truthful.** The selected alternative must visibly reschedule/replace the conflicted block, update the itinerary and totals if relevant, and state what changed.
3. **P2 — Mobile decision priority.** Collapse filters behind a disclosure so Reserve’s candidate and commitment remain first.
4. **P2 — Make input filters affect the candidate set or label them explicitly as static experiment controls.**

## System consequence

The `Goal Profiles` chapter in `docs/03-ux-system.md` is useful: it successfully forced distinct product surfaces. Its next revision should add a rule that every recommendation, conflict resolution, price, duration, and selected winner must derive from the same state model. Structural variation alone is not sufficient evidence of UX integrity.

## Limits

This audit is based on the local prototype’s visible states and interactions. It does not verify complete keyboard navigation, screen-reader output, contrast ratios, persistence, or a real booking transaction.
