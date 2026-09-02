# Design Pack Adapter Lab — 객관 비교 감사

## 판정

현재 구현은 **디자인 시스템 어댑터 실험으로는 불충분**하다. UX System은 고정됐지만 디자인 팩의 적용 범위가 foundation token(색, 글꼴, radius) 수준에 거의 머문다. 세 화면은 같은 grid, header, left rail, content geometry, information density, component anatomy를 공유한다.

따라서 이 결과는 `같은 UI를 세 가지 테마로 입힌 데모`이지, `같은 UX semantic을 세 디자인 시스템으로 번역한 결과`는 아니다.

## Evidence

| Adapter | Source evidence | Implementation evidence | What transferred |
| --- | --- | --- | --- |
| USPS | `01-source-usps.png`: federal service header, task grid, semantic state, timeline, table | `01-implementation-usps.png`: red/navy and squared controls only | colour, small radius, mono labels |
| Apple | `02-source-apple.png`: HIG navigation, grouped controls, semantic colors, layers, native control family | `02-implementation-apple.png`: blue, white, rounded controls only | colour, radius, softened elevation |
| Royal Mail | `03-source-royal.png`: red service bar, editorial hero, cards, status timeline, data table | `03-implementation-royal.png`: cream, serif heading, red accent only | colour, display type, dotted edge |

## Layer score (0–5)

| Layer | USPS | Apple | Royal Mail | Why |
| --- | ---: | ---: | ---: | --- |
| Foundation tokens | 3 | 3 | 3 | palette, type and shape change are visible |
| Component anatomy | 1 | 1 | 1 | buttons and panels retain the same composition |
| Information layout | 0 | 0 | 0 | identical shell and density in all three outputs |
| Pattern translation | 0 | 0 | 0 | cue, transition and completion do not use each pack's native patterns |
| Design-character fidelity | 1 | 1 | 1 | the packs are recognisable only through styling cues |

## Specific design-system gaps

### USPS

The source's useful assets are operational: a hard authority header, action tiles, explicit status colour, a tracking timeline and dense table. The app should turn `current / next / transition` into an operational status board: a state strip, a round timeline, a cue table, and distinct warning/error treatments. The current large editorial result screen gives up the source system's strongest characteristic: structured operations.

### Apple

The source's useful assets are a navigation hierarchy, grouped settings, system controls, semantic colours and layer-based disclosure. The app should make setup a settings-group flow, use segmented controls for format/energy, place optional controls in an action sheet, and reduce persistent chrome while playing. Merely rounding the same dashboard does not use the HIG-like system.

### Royal Mail

The source's useful assets are a bold red service bar, editorial hierarchy, trackable journey, status badges and service/data modules. The app should express a session as a journey: `armed → playing → cue ready → switched → completed`, with a visible route/timeline and ticket-like round records. The current serif result screen borrows mood but not the system's service structure.

## Fixed vs adaptable contract for the next pass

**Fixed by UX System:** user goal, state machine, action labels, success/error meaning, the availability of next cue/lock/reroll/recovery.

**Adaptable by Design Pack:** information grouping, navigation framing, component family, state representation, data density, hierarchy, motion, control disclosure and component geometry.

## Recommendation

Do not patch the present CSS themes incrementally. Keep the shared state model in `app.js`, then create three separate view adapters rather than one shared HTML tree with CSS variables. The next pass should prove that the same semantic primitive maps to a different component/pattern for each design pack.
