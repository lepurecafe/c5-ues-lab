# Royal Mail Goal Profile Lab — Design QA

## Targets

| Goal Profile | Source concept | Render evidence |
| --- | --- | --- |
| Reserve | `../../artifacts/royal-mail-profile-experiment/01-reserve-concept.png` | `../../artifacts/royal-mail-profile-experiment/04-reserve-render.png` |
| Compare | `../../artifacts/royal-mail-profile-experiment/02-compare-concept.png` | `../../artifacts/royal-mail-profile-experiment/05-compare-render.png` |
| Plan | `../../artifacts/royal-mail-profile-experiment/03-plan-concept.png` | `../../artifacts/royal-mail-profile-experiment/06-plan-conflict-render.png` |

## Result

**final result: passed**

The coded projections preserve the Royal Mail pack's red masthead, warm paper surface, editorial serif hierarchy, black document rules, operational mono labels, forms, selection controls, and status-oriented layout. The experiment bar is an intentional deviation: it exposes the active UX System v2 profile so the lab can be evaluated as a system rather than presented as a production booking page.

## Structural adapter verification

| Profile | Required main surface | Verified implementation |
| --- | --- | --- |
| Reserve | selected detail + single commitment | workshop detail, fit explanation, reservation summary and confirmation state |
| Compare | side-by-side evidence + winner selection | comparison table, rationale strip, persistent two-candidate radio choice |
| Plan | timeline + conflict resolution | two-day time grid, conflict state, suggested swap, resolved itinerary state |

## Interaction checks

- `COMPARE` rendered one semantic comparison table and kept both candidate choices visible.
- `PLAN` rendered `CONFLICT DETECTED`; resolving it exposed `Itinerary ready`.
- `RESERVE` changes the commitment result from `No booking yet` to a confirmed ticket state.
- Mobile Reserve at 390 × 844 preserved readable controls and a single-column flow.
- No build or test errors: Sites worker tests passed 4/4.

## Fidelity ledger

| Area | Evidence | Assessment |
| --- | --- | --- |
| Royal Mail character | Source and all three renders | Pass — system expression is coherent rather than a palette swap. |
| Reserve hierarchy | reserve source/render | Pass — detail is dominant and one commitment is explicit. |
| Compare hierarchy | compare source/render | Pass — real table and rationale replace a browse-grid variation. |
| Plan hierarchy | plan source/render | Pass — time arrangement and conflict recovery replace a higher selection cap. |
| Intentional difference | all renders | Experiment-control strip replaces the source concepts' secondary header space; retained to make profile switching inspectable. |

## Follow-up (P3)

- On mobile, filters precede the main decision surface; a future performance-oriented mobile projection should collapse them behind a disclosure control.
- The lab demonstrates structural change for one pack. The next required proof is the character axis: keep one profile fixed and project it through two additional unused Design Packs.
