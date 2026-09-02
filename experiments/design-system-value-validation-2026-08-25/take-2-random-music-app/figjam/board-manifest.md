# FigJam Board Manifest

> Team: `bk.choi의 팀`
>
> File: [Take 2 — Battle Beat Randomizer — Design System Validation](https://www.figma.com/board/Gn9Y91QDkfnoli7JP81Znk)
>
> File key: `Gn9Y91QDkfnoli7JP81Znk`
>
> Editor: FigJam; Take 2 전용 신규 보드

## Section map

| Purpose | Node ID | Content |
| --- | --- | --- |
| Root board | `1:2` | Take 2 title and four-stage experiment rail |
| Flowchart | `1:5` | success, empty, draw retry/fallback, locked-track restart recovery, pause/resume, CR-01 round lock/new-round paths |
| iPhone low-fi | `1:6` | `FR-READY`, `FR-PLAYING + ROUND LOCK`, `FR-EMPTY + last-safe`, `FR-ERROR + scoped recovery`, `FR-TRANSIENT` 6상태 rail |
| iPhone high-fi | `1:7` | final editable Industrial Swiss state storyboard |
| Change/evidence | `1:8` | CR-01 before/after, attribution, rendered QA, artifact trace |

## High-fi nodes

| Screen | Node ID | Final state |
| --- | --- | --- |
| `HF-READY` | `7:121` | RAP/DANCE, energy, `RANDOM BEAT`, synthetic boundary |
| `HF-ROUND-LOCKED` | `7:122` | `PLAYING / SIM`, Round 01 locked, restart, new round, save, deferred exclude |
| `HF-ERROR-RECOVERY` | `7:123` | draw failure 3/3, same-draw retry, last-safe round/track, draw-only fallback gate; restart failure is annotated as same-track-only |
| `HF-EMPTY` | `7:124` | affected condition, relax, undo exclusion, retained context |

## Low-fi transient nodes

| Contract | Node ID | Final state |
| --- | --- | --- |
| `FR-TRANSIENT` parent | `19:204` | wireframe review rail; 제품 CTA가 아님 |
| `S-REQUESTING` | `19:207` | pending authority, `DRAW-0001`, 성공/Playing 아님 |
| `S-NEW-ROUND-REQUESTING` | `19:210` | last-safe Round 01 유지, authorized `DRAW-0002` |
| `S-RECOMMENDED` | `19:213` | system pick 식별, 자동 `STARTING`, 별도 Start 없음 |
| `S-STARTING` | `19:216` | commitment 실행 중, 확인 전 Playing 금지 |
| `S-RESTARTING` | `19:219` | same round/draw/track, elapsed 00:00, 새 draw 금지 |
| `S-RECOVERING` | `19:222` | last-safe와 authorized draw 유지, cross-scope fallback 금지 |

`FR-TRANSIENT` rail은 HTML low-fi에서 발견된 단계 간 의미 압축을 해소하기 위해 후속 추가했다. 이는 `U-01`의 최종 동기화이며 사전 등록 12개 분모에 소급 편입하지 않는다.

## CR-01 trace nodes

| Trace | Node ID |
| --- | --- |
| Before comparison | `8:245` |
| After comparison | `8:246` |
| Layer attribution | `8:247` |
| Browser QA metrics | `8:248` |
| Deliverable trace | `8:249` |

The flowchart was first created from Binding v1.0, then updated for CR-01. Existing nodes `2:25`, `3:50`, `3:58`, `3:74`, `3:90`, `3:110`, `3:114` were revised; `F-85/86 RESTART SAME TRACK` (`13:203`) and `F-R5 LOCKED TRACK RECOVERY` (`13:207`) plus three connectors (`13:211`, `13:215`, `13:219`) were added. `F-R3` now means same-draw retry rather than restart. This keeps the board as the final flow while `before-change/` preserves the baseline HTML and documents.

## Local capture evidence

- `evidence/figjam-user-flow.png`
- `evidence/figjam-low-fi.png`
- `evidence/figjam-hi-fi-storyboard.png`
- `evidence/figjam-change-evidence.png`

## Evidence boundary

FigJam proves editable design/storyboard presence and visual consistency. It does not prove HTML interaction, real audio output, iPhone runtime, or assistive-technology behavior. Those boundaries and rendered HTML evidence are recorded separately in `evidence/qa-report.md`.
