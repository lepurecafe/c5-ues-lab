# Rasterline Conformance QA

Use this checklist before calling a Rasterline application ready. Mark unsupported items as gaps; a Figma source alone is not runtime, accessibility, or human-use proof.

## Foundation

- [ ] Only documented semantic color tokens are used, or additions are declared.
- [ ] Accent is bounded to meaningful emphasis; it is not the only state signal.
- [ ] Essential text has measured contrast in its actual size and surface.
- [ ] Typography roles preserve readable body copy and do not use mono display styling for long text.
- [ ] Spacing uses the documented scale or records an adapter exception.

## Components

- [ ] Every button has an action label, visible enabled/disabled state, focus treatment, and appropriate consequence/recovery behavior.
- [ ] Inputs have labels, constraints, field-linked errors, and retained safe input after validation failure.
- [ ] Cards with texture preserve essential text readability.
- [ ] Progress exposes a text equivalent for percent, fraction, or change.
- [ ] Status badges/panels have explicit textual meaning.

## Linear flow

- [ ] Current step, completed steps, remaining steps, and allowed navigation are understandable without color.
- [ ] Backward navigation preserves safe input.
- [ ] Validation gates explain why progression is unavailable and how to repair it.
- [ ] Irreversible action has a consequence warning and proportionate confirmation/undo.
- [ ] Cancellation, saving, or fallback matches the Product Binding’s interruption cost.
- [ ] Completion supplies result evidence and a next action.

## Interaction and adaptation

- [ ] Keyboard focus is visible and can reach primary, destructive, and recovery actions.
- [ ] Touch targets and dense texture have been tested at the smallest supported viewport.
- [ ] Hover-only feedback has keyboard and touch equivalents.
- [ ] Reduced-motion/no-motion behavior is implemented and verified.
- [ ] Empty, loading, error, and offline/capability failure states expose cause and recovery.

## Evidence record

| Evidence type | Minimum record |
| --- | --- |
| Source visual | screenshot/frame or Figma revision link |
| Static implementation | token/component checks and build/test result |
| Runtime | target platform, flow exercised, observed state/result |
| Accessibility | method, viewport/input mode, issues and resolution |
| Human-use | participant/context, task, outcome, findings |

