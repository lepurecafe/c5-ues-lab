# Korean Commercial — Components and state

> 정본 참조: [korean-commercial-system.md](korean-commercial-system.md) §3. 이 문서는 기존 GAP을 구현 가능한 상태 계약으로 확장한다.

## Component matrix

| Component | Required states | Semantics / recovery |
| --- | --- | --- |
| Button | primary, secondary, destructive; sm/md/lg; default, hover, focus, pressed, disabled, loading | one dominant primary action per decision; disabled reason is exposed |
| Input | label, hint, entered, valid, invalid, disabled | `aria-invalid`, field-linked error, safe value retained |
| Checkbox / radio / toggle | off/on, focus, disabled | native semantics where possible; Space operates selection |
| Toast | info/success/warning/error | concise status, `aria-live="polite"`, no transient-only success proof |
| Empty state | empty/loading/error | explains cause, retained context, primary recovery |
| Confirmation | default, consequence, cancel, confirm, committed | cancellation leaves data unchanged; committed outcome is announced |
| Dialog | open, initial focus, busy, error, close/cancel | modal semantics, focus trap, Escape only when safe, focus returns to invoker |
| Progress / stepper | current, complete, future, blocked, error | text state and reason; future steps cannot be bypassed silently |
| Tooltip | hidden, visible, keyboard focus, touch alternative | supplemental only; never sole label or validation/error delivery |

## Interaction constants

| State | Rule |
| --- | --- |
| Focus | 2px solid `--dancheong-red`, 2px offset, always visible |
| Hover | `brightness(.91)` only as feedback, not changed meaning |
| Active | `translateY(1px)` + `brightness(.84)` |
| Loading | visible processing label + duplicate-commit prevention |
| Reduced motion | global `prefers-reduced-motion` behavior |

## Dialog decision contract

Use a dialog only for a decision that needs context before commitment. The dialog includes: consequence, affected object/data, cancel, commit label, and failure/retry route. Do not use a dialog merely to restyle navigation or display a tooltip-sized message.

## Progress and tooltip addition policy

- Add a stepper only when a product flow has genuine stages; bind it to the product state model.
- Add a progress bar only when a measurable quantity or duration exists; expose text equivalent such as `3 of 4` or `72%`.
- A tooltip may clarify an unfamiliar icon, but visible label/helper text remains the primary path.
