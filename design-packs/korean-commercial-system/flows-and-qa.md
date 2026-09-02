# Korean Commercial — Flows and QA evidence

> 정본 참조: [korean-commercial-system.md](korean-commercial-system.md) §§3, 5–6. Complete this evidence before assigning a 10/10 implementation rating.

## Registration state model

```text
empty
  → submit attempt
  → invalid (name / email / role / agreement errors remain local)
  → valid
  → processing (duplicate submit blocked)
  → success (summary + edit)
  → reset request → confirm reset → toast + empty
                  └→ cancel → valid data retained
```

| Scenario | Expected evidence |
| --- | --- |
| Blank submit | all four field errors named and linked; focus supports repair |
| Invalid email | entered values retained; concise valid-format help |
| Valid submission | processing label, disabled duplicate commit, durable result summary |
| Edit after success | prior data restored according to policy; no false success state |
| Reset cancel | data remains unchanged and focus returns to reset invoker |
| Reset confirm | destructive consequence stated, fields cleared only after confirmation, toast announced |

## Required QA runs

- [ ] Keyboard-only: skip link → nav → all fields → radio/checkbox/toggle → submit → edit/reset/dialog.
- [ ] Screen reader: label/error association, current step, toast, dialog title/consequence, focus return.
- [ ] Responsive: `390px`, `768px`, and desktop; no critical overflow; hero reads before red field.
- [ ] Contrast: measured shipped pairs, including text on red/blue/gold and muted copy on hanji.
- [ ] Reduced motion: no essential outcome relies on transition/spinner animation.
- [ ] Cultural/brand review: context is approved; images, claims, translations, and motifs are authorized.

## Evidence log template

| Date / build | Scenario | Platform / input | Result | Gap / owner / due date |
| --- | --- | --- | --- | --- |
| YYYY-MM-DD | blank-submit validation | browser + keyboard | pass/fail | — |

Do not mark a Figma screenshot or a passing layout snapshot as proof of the screen-reader, recovery, or cultural-approval rows.
