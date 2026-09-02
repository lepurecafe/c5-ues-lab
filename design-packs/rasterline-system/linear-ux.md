# Rasterline Linear UX

Rasterline expresses a staged flow; it does not mandate that every product use a wizard. Select a linear pattern only when the Product Binding has meaningful order, validation gates, or consequences between steps.

## 1. Step indicator

**Observed source structure:** horizontal and vertical four-step examples: `Initialization → Configuration → Validation → Deployment`, with an explicit current marker and previous/next controls.

| Required element | Contract |
| --- | --- |
| Current position | identify the current step in text and visual structure |
| Step count | show the total when it helps completion expectations |
| Completion | distinguish completed from current and future without color only |
| Navigation | previous/next behavior is visible; direct step navigation follows the product’s validation policy |
| Step purpose | vertical forms may add a short one-line description |

## 2. Four-step onboarding pattern

The source’s interactive demo uses `Identity → System → Protocol → Confirmation` with step labels, previous/next navigation, and a `1 / 4` progress cue.

### Required behavior

1. Inputs remain intact when a user moves backward or visits another permitted step.
2. A next action is available only when the current step’s validation conditions are understood; disabled state exposes the shortest repair path.
3. Any irreversible final action uses an explicit confirmation step.
4. The final screen provides result evidence and the next safe action.
5. The user can cancel, save, or otherwise exit safely when the Product Binding indicates interruption cost.

### State model

```text
draft → editing(step n) → invalid(step n) → valid(step n)
  → review → confirming → complete
                    ↘ error → recover → editing/review
```

Every transition records: `trigger → state change → visible consequence → recovery/undo`.

## 3. Source principles rendered as pack rules

| Source principle | Rasterline requirement |
| --- | --- |
| Clear entry point | make the current mode and first safe action perceptible at entry |
| Irreversible warning | name consequence before an irreversible action and require confirmation where appropriate |
| Progressive disclosure | reveal complexity stepwise without making earlier choices mysterious |
| Exit path | provide cancel/save/fallback behavior proportionate to lost work or commitment cost |

## 4. Boundary

Rasterline may render a linear flow through numbered rails, mono labels, progress bars, or status panels. It must not remove required comparison, planning, validation, recovery, or outcome evidence merely because they do not fit a sparse linear composition.

