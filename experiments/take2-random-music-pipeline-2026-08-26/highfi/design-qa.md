# High-fi QA — Take 2

> Result: **pass with declared runtime gaps**  
> Browser method: Codex in-app Browser, local server `http://127.0.0.1:4180/`  
> The source is the Rasterline Markdown contract plus its generated asset language; this is a system projection, not a pixel clone of a single screen.

## Captures

- Source asset inspected: `../assets/pulse-grid.png`
- Desktop render: `qa-desktop.png` (in-app Browser default desktop viewport)
- Mobile render: `qa-mobile-entry.png` (390 × 844 viewport override)
- Secondary mobile content capture: `qa-mobile.png`

## Visual and semantic ledger

| Check | Source / contract evidence | Render evidence | Result |
| --- | --- | --- | --- |
| Palette | Rasterline Foundation: near-black `#0A0A0A`, foreground, one acid accent | desktop/mobile captures use black grid field, ivory text, one lime active signal | pass |
| Typography | Space Mono for display/labels; DM Sans for body | `ONE BEAT.`, status/metadata, Korean body and controls show distinct roles | pass |
| Surface / geometry | visible borders, squared corners, grid/scanline texture | status rail, mode controls, candidate sheet and error panel use bounded square surfaces | pass |
| Asset treatment | raster/halftone-compatible imagery, no generic placeholders | generated abstract covers sit in stable square media frame with fiction label | pass |
| Status redundancy | Pack and UES require non-color-only state | Ready/Playing/error have named text plus dot, section placement, and control availability | pass |
| Korean reflow | narrow viewport preserves primary action/state ahead of secondary controls | 390 px capture preserves brand, Ready status, mode choice, candidate cover/title in order | pass |
| Interaction | `decision.reserve`: recommendation → explicit commitment → result; reroll recovery | Browser run: rap → play → Playing simulation → reroll → network error → retry | pass |

## Copy check

Above-the-fold visible copy is drawn from the frozen binding: product name, goal, runtime limitation, dance/rap mode, one recommendation, explicit play action, and generated/fictional disclosure. No real artist, track, label, audio output, or network claim is shown.

## Browser interaction evidence

| Action | Observed result |
| --- | --- |
| Select `랩` | mode changed and Rap candidate context appeared |
| `이 곡 재생` | `PLAYING / SIMULATION` appeared |
| `다시 뽑기` while Playing | current candidate changed to `NIGHT COUNT`; Playing ended |
| `네트워크 오류` | named recoverable error panel appeared |
| `다시 시도` | status became `SYSTEM RECOMMENDATION / 새 후보를 준비했습니다` |

## Remaining intentional deviations / gaps

1. The preview does not play audio. It intentionally displays simulated playback state and says so in the UI.
2. It contains no audio output route, permission, true offline cache, real network request, account, or persistence.
3. The pack source is a design-system contract, not a complete accepted app-screen design; fidelity is judged to its documented character and capability rules.

No P0/P1 visual or semantic mismatch was found in this scoped preview. Real audio and representative-user tests remain P2 evidence gaps, not completed features.
