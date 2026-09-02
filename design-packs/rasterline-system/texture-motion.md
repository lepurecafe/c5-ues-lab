# Rasterline Texture and Motion

## 1. Texture vocabulary

**Observed source patterns:** `Dots SM`, `Dots MD`, `Dots LG`, `Accent Dots`, `Grid`, `Scanlines`, `Grid + Dots`, `Accent Grid`.

| Pattern | Role | Guardrail |
| --- | --- | --- |
| Small/medium/large dots | atmospheric depth, bounded emphasis | keep behind text and never reduce text contrast |
| Accent dots | one focused highlight | do not use for more than one competing region |
| Grid | structural field / grouping | retain adequate whitespace for content |
| Scanlines | archival/technical texture | avoid on small text, charts, inputs, or dense data |
| Grid + dots | high-character visual panel | reserve for non-critical or strongly bounded content |
| Accent grid | active or highlighted frame | do not make this the only selected-state cue |

## 2. Hover and transition grammar

The source demonstrates three interaction expressions:

| Expression | Observed direction | Meaning |
| --- | --- | --- |
| Border transition | `transparent → foreground` | pointer attention/focus-ready surface |
| Accent transition | `foreground → accent` | bounded active emphasis |
| Background inversion | fill reversal on hover | direct affordance on a discrete control |

### Motion rules

- Use a short, discrete transition that confirms a change in attention or state.
- Do not use auto-playing texture, flicker, or scanline motion as ambient decoration.
- Meaningful motion requires a reduced-motion/no-motion equivalent.
- Hover is additive: keyboard focus and touch activation require equivalent visible feedback.

## 3. Composition examples

The source combines the grammar into a `Stat Tile` (value, delta, time basis) and a `System Status` panel (module label plus `RUNNING`, `IDLE`, `WARN`).

For status compositions, pair the visual treatment with readable status text, last-update context when relevant, and an actionable recovery/inspection route for non-healthy states.

