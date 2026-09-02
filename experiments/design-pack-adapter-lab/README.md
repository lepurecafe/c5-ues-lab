# Design Pack Adapter Lab

UX System 하나를 고정하고, 무작위로 선택한 세 디자인 팩을 적용하는 비교용 인터랙티브 샘플이다.

## Fixed UX system

| UX layer | PULSE DECK application |
| --- | --- |
| User goal | 현장에서 설명 없이 첫 비트를 시작하고, 다음 비트를 안전하게 전환한다. |
| Experience | 진입 → 준비 → 재생 → 전환 → 종료/복구 |
| Step types | Inform → Select → Process → Confirm → Result |
| Semantic primitives | primary action, select, status, timer, cue, lock, feedback, recovery |

## Variable design adapters

| Pack | Changes | Does not change |
| --- | --- | --- |
| USPS | navy/red, dense grid, squared controls, operational status tone | flow, steps, action labels, state transitions |
| Apple | light surfaces, rounded controls, reduced density, calm tone | flow, steps, action labels, state transitions |
| Royal Mail | cream/red, editorial serif, ticket/itinerary cues | flow, steps, action labels, state transitions |

## Run

Open `index.html` directly, or from this directory run `python3 -m http.server 4173` and visit `http://localhost:4173`.

## What to evaluate

1. Is the first beat still reachable in three actions or fewer?
2. Is current state readable without color alone?
3. Can the host understand the next-beat cue and safe transition in each pack?
4. Which visual changes improve or weaken live-performance use?
