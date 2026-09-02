# Take 2 — Random Music App Projection Pipeline

> Status: HTML runtime + editable Figma source complete; independent human-use/audio runtime review pending  
> Date: 2026-08-26  
> Scope isolation: this folder is independent from `COMMON SURFACE` and its R1/R2/R3 work. No existing artifact was modified.

## Purpose

Validate whether the Markdown-first system maintains its layer boundaries while one random-music product is projected through `Flowchart → Low-fi → High-fi interactive HTML`.

```text
Product Binding → what this music app is and why it exists
UX Preset       → how selection, commitment, state and recovery behave
Design Pack     → how that behavior is visually expressed in High-fi
```

## Frozen Take 2 input

| Input | Status | Source / decision |
| --- | --- | --- |
| Primary users | confirmed | User: event host **and** hobby listener; no separate persona priority was provided. |
| First task | confirmed | Choose `댄스` or `랩`, receive one random candidate, then explicitly start playback. |
| Repeat policy | confirmed | The current selection repeats until the person intentionally changes it. |
| Recovery | confirmed | `다시 뽑기` is the required primary recovery. |
| Fidelity | confirmed | Minimum viable interactive HTML; high-fi does not claim real audio playback. |
| Content / rights | experiment-assumption | Synthetic fictional beat metadata and generated abstract covers only; no artist, song, logo, or audio file is represented as real. |
| Platform | experiment-assumption | Responsive browser HTML, keyboard/pointer/touch equivalent. |
| Pack application | confirmed | No Pack in Flow/Low-fi; one Pack applied in High-fi only. |

## Chosen composition

- Product Binding: [`docs/composition-and-binding.md`](docs/composition-and-binding.md)
- UX Preset: `decision.reserve@0.1.0`
- Design Pack: `pack:rasterline@0.3.0`, High-fi only
- Medium: `digital-interactive.web`
- Projection: flowchart, low-fi wireframe, responsive high-fi interactive HTML

`Reserve` was selected because this minimal product asks for one appropriate random beat quickly; it does not require a multi-candidate comparison or multi-round planning surface. `Compare` and `Plan` remain deliberately out of scope.

## Outputs

- [Composition and Product Binding](docs/composition-and-binding.md)
- [Flowchart](docs/flowchart.md)
- [Low-fi wireframe](lowfi/index.html)
- [High-fi interactive preview](highfi/index.html)
- [Editable Figma source and mapping](figma.md)
- [High-fi visual and interaction QA](highfi/design-qa.md)
- [Traceability ledger](docs/traceability.md)
- [Evidence-based scorecard](evaluation-scorecard.md)
- [Final result](final-summary.md)

## How to review

Open `highfi/index.html` in a browser. Try: choose mode → `랜덤 선택` → `이 곡 재생` → `다시 뽑기`; then trigger `콘텐츠 오류` or `네트워크 오류` from the utility controls and recover. Playback is a visible state simulation only.

For visual editing, use the [Take 2 Figma file](https://www.figma.com/design/XIgf5Lzy16r036Be0AakkL). Figma contains editable local tokens, component variants, desktop Ready/Playing/Error frames, and a Mobile Ready frame. The HTML remains the behavioral source for interaction.

## Asset provenance

`assets/pulse-grid.png` and `assets/relay-strike.png` are built-in image-generation outputs for fictional abstract beat covers. They contain no real artist, album, or service identity. See [`assets/README.md`](assets/README.md).
