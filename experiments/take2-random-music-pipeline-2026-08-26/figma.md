# Take 2 Figma Source

## Source

- Figma: [Take 2 — Random Music App / Rasterline](https://www.figma.com/design/XIgf5Lzy16r036Be0AakkL)
- State ledger: [`figma-state.json`](figma-state.json)
- Runtime counterpart: [`highfi/index.html`](highfi/index.html)

## Role split

| Layer | Figma | HTML |
| --- | --- | --- |
| Design Pack | Editable Rasterline tokens, typography, borders, component appearance | Same tokens expressed as CSS custom properties |
| UX Preset | Named Ready / Playing / Error comparison frames | Clickable selection, replay, reroll, save/exclude and recovery simulation |
| Product Binding | Dance/Rap mode, fictional beat labels, loop policy and runtime boundary copy | Same content and interaction priority |

Figma is an editable visual/specification source. HTML is the interactive evidence. Neither claims actual audio, network, output routing, or a real music catalog.

## Figma contents

- `01 Foundations` — 20 local variables across Primitive, Semantic, Spacing collections; five text styles.
- `02 Components` — Button (four visual variants + editable Label), Mode selector (two state variants + editable Mode/Tempo), Status bar (three state variants + editable Message).
- `03 Screens` — Desktop Ready, Desktop Playing, Desktop Error, Mobile Ready.

All covers in the screens are editable geometric compositions labelled `GENERATED / FICTIONAL`. The HTML uses the local generated abstract cover assets described in [`assets/README.md`](assets/README.md).

## Figma-to-HTML change rule

1. Adjust visual values in Figma Semantic tokens first.
2. Mirror approved values in the CSS custom properties at the top of [`highfi/index.html`](highfi/index.html).
3. If a state or flow changes, update the UX traceability document before adding Figma variants or HTML behavior.

This preserves the experiment's separation: Pack controls expression; Preset controls transitions; Binding controls the service context.
