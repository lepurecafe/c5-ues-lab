# Reference Product Audit — Industrial Swiss

Date: 2026-08-21
Surface: workshop discovery and booking prototype
Scope: browse → compare → empty recovery → hold and email validation

## Overall verdict

**6.5 / 10 — visually persuasive experiment, not yet a dependable UX-system proof.**

The Industrial Swiss pack is clearly active: dense poster cards, workwear imagery, condensed display type, thin rules, red operational CTA, and a three-rail information layout all form one recognizable character. However, the Goal Profile experiment is still a stateful demo inside a shared browsing screen rather than three genuinely different decision flows.

## Evidence

1. `01-browse-reserve.png` — Reserve browse state. **Healthy visual foundation; footer is visibly unstyled/stacked.**
2. `02-compare-design.png` — Compare profile + Design filter. **Profile copy and CTA change, but one selected workshop becomes invisible after filtering.**
3. `03-empty-state.png` — Empty recovery. **Clear recovery action; selected sessions remain visible and financially actionable despite zero results.**
4. `04-email-validation.png` — Booking validation. **Inline email error is clear and near the field.**

## Scorecard

| Criterion | Score | Why |
| --- | ---: | --- |
| Character fidelity | 8.5 | Industrial hierarchy and component anatomy remain coherent. |
| Goal fit | 7 | Fast browsing and selection are understandable. |
| UX integrity | 5 | Compare/Plan alter copy, defaults and cap, not enough of the decision structure. |
| State/recovery | 6.5 | Empty and validation exist; selection is not reconciled with filtered results. |
| Accessibility evidence | 5 | Visible labels and alert exist, but small text, language mixing, focus and keyboard order need testing. |
| Responsive quality | 2 | At the inspected 1205px layout, footer base styling is absent and contents collapse to unstructured lines. |
| Figma ↔ HTML portability | 3 | HTML is structured, but no token/adapter schema or Figma projection was tested. |
| Manual correction cost | 6 | Visual character is easy to tune; structural behavior is still encoded as page-specific conditionals. |

## Highest-priority fixes

1. Restore the footer's base grid rule. This is a visible P1 layout defect in every captured state.
2. Reconcile selection with filters: either keep selected workshops visibly pinned in Compare, remove incompatible selections, or show a clear “2 selected, 1 hidden by filters” state.
3. Make Goal Profiles structural adapters. For example, Compare needs a side-by-side comparison surface and differences; Plan needs an ordered time rail with conflict handling. They should not only change the heading, default selected IDs and CTA label.
4. Replace test-only state buttons with product-real states triggered by ordinary operations, then preserve the state contracts separately in the UX preset.

## Accessibility limits

This is screenshot and interaction evidence, not a compliance audit. Keyboard navigation, focus visibility/order, screen-reader naming, contrast ratios, touch sizes, reduced motion, and mobile breakpoints were not independently verified.
