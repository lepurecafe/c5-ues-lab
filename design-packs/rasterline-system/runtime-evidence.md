# Rasterline — Runtime evidence plan

> This plan complements [rasterline-system.md](rasterline-system.md) §§6–11 and [qa.md](qa.md). It turns the remaining verification gaps into repeatable evidence; it does not claim those tests have run.

## Four-step onboarding test matrix

| ID | Scenario | Expected result |
| --- | --- | --- |
| RAS-01 | Begin with no values; choose Next | handle and name errors are field-linked; focus supports repair |
| RAS-02 | Enter invalid handle | lowercase/numbers/underscore rule is explicit; safe input remains |
| RAS-03 | Complete steps 1–2, attempt future-step navigation | incomplete step cannot be silently skipped; reason/repair is visible |
| RAS-04 | Complete final agreement requirement | completion control is enabled only when requirement is met |
| RAS-05 | Cancel with unsaved progress | interruption consequence is named; return preserves state; confirm follows product policy |
| RAS-06 | Completion succeeds | durable result, next action, and any persisted state are visible—not only transient animation |
| RAS-07 | persistence/load failure | existing safe input is retained where possible; cause/retry/fallback is named |

## Access and motion runs

- [ ] Keyboard-only: rail, tabs, buttons, all form fields, step controls, cancel/confirm, completion.
- [ ] Screen reader: status labels, progress values, field error association, current step, disabled-step reason, modal/confirmation focus return.
- [ ] Contrast: actual `--readable-muted` and `--foreground` pairs measured at shipped type sizes; decorative `--muted-foreground` cannot carry essential copy.
- [ ] Responsive: smallest supported viewport plus 390px reference; dense labels, grid textures, and focus rings remain usable.
- [ ] Reduced motion: texture/hover/transition examples do not conceal action, status, or completion meaning.

## Evidence record

| Date / build | Case | Platform / input | Result | Artifact / issue |
| --- | --- | --- | --- | --- |
| YYYY-MM-DD | RAS-01 | browser + keyboard | pending | — |

Close a line only with a target build/URL and observed result. A Figma Make state or a static preview is source evidence, not runtime proof.
