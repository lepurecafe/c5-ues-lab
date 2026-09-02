# Hi-fi Preview Fidelity Ledger

> Ledger ID: `ledger.battle-beat-randomizer.hifi@1.1.0`
>
> Snapshot: 2026-08-26, `composition.random-music-app.take-2.r2`, QA `final-r3`
>
> Targets: [`05-low-fi.html`](05-low-fi.html) → [`06-hi-fi-preview.html`](06-hi-fi-preview.html), iPhone 16 Pro portrait web prototypes
>
> Sources: `pack:industrial-swiss@1.0.0` + `decision.reserve@0.1.0` + `binding.battle-beat-randomizer@1.1.0`
>
> Evidence ceiling: **E2**. 실제 오디오 출력, 실제 iPhone/Simulator, VoiceOver·외부 보조기술, 실제 네트워크 서비스, 대표 배틀 사용자는 검증하지 않았다.

## 1. 판독 규칙과 계층 경계

이 ledger는 구현에 언급된 규칙 수가 아니라 **적용 대상 분모 중 현재 증거로 완전히 입증된 규칙 수**를 센다. `부분`은 addressed coverage에는 포함하지만 strict 적용률의 분자에는 넣지 않는다.

| 표기 | 의미 |
| --- | --- |
| `관찰됨` | Design Pack 또는 UX Preset 정본 Markdown에서 직접 확인한 계약 |
| `추론됨` | 정본 근거를 iPhone·배틀 앱에 투영한 adapter 판단 |
| `제품 결정` | 사용자 확인 또는 Product Binding 실험 가정으로 정한 서비스 정책. Pack/Preset의 사실로 승격하지 않음 |
| `완전` | 해당 규칙의 구현과 현재 증거가 모두 있음 |
| `부분` | 구현 일부, canonical drift, 또는 필요한 검증 증거가 남음 |
| `N/A` | 현재 Product Binding에서 상태 자체가 발생하지 않음. 분모에서 제외하고 이유를 남김 |

계층 소유권은 다음처럼 유지됐다.

| 계층 | 적용된 책임 | 이번 앱에서 소유하지 않는 것 | 근거 |
| --- | --- | --- | --- |
| Design Pack | 색·타입 역할·hard grid 감각·spacing·사각 표면·bounded red/gold·이미지/재질·모션 분위기 | round 정책, 추첨 권한, 저장·제외·복구의 사업 규칙 | `관찰됨` — Industrial Swiss canonical contract |
| UX Preset | recommendation/commitment/outcome 분리, pending·error·empty·recovery·retention·idempotency | 배틀 taxonomy, track pool, round 번호, fallback 임계치 | `관찰됨` — `decision.reserve@0.1.0` |
| Product Binding | RAP/DANCE, RAW/BOUNCE/DRIVE, synthetic tracks, 즉시 playback attempt, Fair Round Lock, deferred exclusion, session-local event log | Pack 토큰과 Preset authority 의미의 변경 | `제품 결정 (관찰됨/추론됨)` — 사용자 확인 + `CR-01` |

## 2. 화면·상태별 양방향 추적

### `HF-READY` — 조건과 첫 commitment

| 추적 축 | 적용 |
| --- | --- |
| Stable IDs | `FR-READY`; `F-00`, `F-10`, `F-20`; `S-READY`, `S-REQUESTING`; `ACT-RANDOMIZE`; `OBJ-SESSION` |
| HTML | `#readyView`, `#battleTypeControls`, `#energyControls`, `#drawButton`, `.microcopy` |
| Design Pack | `DP-VIS-01`, `DP-TYPE-01`, `DP-GEO-01`, `DP-SIG-01`, `DP-ARCH-01`, `DP-BTN-01`, `DP-RIGHTS-01`, `DP-L10N-01` |
| UX Preset | 최소 조건 뒤 단일 명시 commit, 조건을 `user-draft`로 유지, REQUESTING을 성공과 분리 |
| Product Binding | RAP/DANCE와 energy 선택, 기본 유효값, `RANDOM BEAT`, 추천 뒤 별도 Start 없음, 실제 오디오 없음 표기 |
| Evidence | [`hi-fi-ready-402x874.png`](evidence/hi-fi-ready-402x874.png), `ST-01`, FigJam `1:7` / `7:121` |
| 판단 | `관찰됨`: one dominant headline·direct verb·single red primary. `추론됨`: 12-column을 단일 iPhone operational stack으로 투영. `제품 결정`: battle taxonomy와 자동 playback attempt |

### `HF-ROUND-LOCKED` — confirmed synthetic Playing과 공정 라운드

| 추적 축 | 적용 |
| --- | --- |
| Stable IDs | `FR-PLAYING`, `FR-ROUND-LOCKED`, `FR-PAUSED`; `F-40`–`F-87`; `S-RECOMMENDED`, `S-STARTING`, `S-PLAYING`, `S-ROUND-LOCKED`, `S-PAUSED`, `S-RESTARTING`, `S-NEW-ROUND-REQUESTING`, `S-SAVED`, `S-EXCLUDED`; `ACT-RESTART-TRACK`, `ACT-NEW-ROUND-REROLL`, `ACT-EXCLUDE-NEXT-ROUND`, `INFO-ROUND-LOCK` |
| HTML | `#transientView`, `#beatCard`, `#roundBadge`, `#trackCode`, `#transport`, `#restartButton`, `#newRoundButton`, `#saveButton`, `#excludeButton` |
| Design Pack | condensed display + mono specimen metadata, hard bordered card/transport, one red new-round action per local group, non-color status text, low-contrast cover material |
| UX Preset | `SYSTEM PICK → STARTING → PLAYING` 권한 분리, confirmed object/status/consequence/next action, duplicate commit guard, retained round/track |
| Product Binding | `roundId`, `drawId`, `attemptId`, atomic lock, same-track restart, new-round-only draw, `pendingExcludedIds/effectiveFromRound`, session save/pause |
| Evidence | [`hi-fi-playing-round-lock-402x874.png`](evidence/hi-fi-playing-round-lock-402x874.png), [`hi-fi-paused-402x874.png`](evidence/hi-fi-paused-402x874.png), [`hi-fi-playing-375x812.png`](evidence/hi-fi-playing-375x812.png), `ST-01`–`ST-04`, `ST-08`–`ST-12`, `ST-16`–`ST-17`, FigJam `1:7` / `7:122` |
| 판단 | `관찰됨`: pending/confirmed 분리와 durable result. `추론됨`: commerce product card를 synthetic beat operations card로 투영. `제품 결정`: Fair Round Lock과 next-round exclusion |

### `HF-ERROR-RECOVERY` — 실패 범위와 last-safe 보존

| 추적 축 | 적용 |
| --- | --- |
| Stable IDs | `FR-ERROR`, `FR-RECOVERED`; `F-E2`, `F-R3`, `F-R4`, `F-R5`; `S-ERROR`, `S-RECOVERING`, `S-FALLBACK`, `S-RESTARTING`; `EV-FAILURE`, `EV-RECOVERED`, `EV-FALLBACK` |
| HTML | `#errorPanel`, `#errorCode`, `#errorDetail`, `#retryButton`, `#fallbackButton`, `failureScope`, `failureCount`, `useFallback()`, `restartTrack()` |
| Design Pack | cause/retained context/next action을 함께 보이는 recoverable failure, red primary 1개, 텍스트 기반 scope·status |
| UX Preset | 실패와 success를 분리, retry idempotency, last-safe context retention, draw retry와 execution retry 분리 |
| Product Binding | draw failure는 같은 `drawId`; 3회 뒤에만 local fallback; restart failure는 다른 track fallback 금지; 기존 round/track 유지 |
| Evidence | [`hi-fi-error-last-safe-402x874.png`](evidence/hi-fi-error-last-safe-402x874.png), [`hi-fi-recovered-fallback-402x874.png`](evidence/hi-fi-recovered-fallback-402x874.png), `ST-06`, `ST-07`, `ST-13`–`ST-16`, FigJam `1:7` / `7:123` |
| 판단 | `관찰됨`: safe retry/recovery. `추론됨`: failure scope를 Preset의 preparation/execution 구분으로 표현. `제품 결정`: 3회 threshold와 same-track-only recovery |

### `HF-EMPTY` — 후보 부족과 안전한 pool 복구

| 추적 축 | 적용 |
| --- | --- |
| Stable IDs | `FR-EMPTY`; `F-E1`, `F-R1`, `F-R2`; `S-EMPTY`, `S-RECOVERING`; `OBJ-EXCLUDED` |
| HTML | `#emptyPanel`, `#emptyDetail`, `#relaxButton`, `#undoExcludeButton`, `effectiveExclusions()`, `undoLastExclusion()` |
| Design Pack | 원인·retained filters·recovery가 있는 operations empty state, 사각 CTA, color-only가 아닌 상태 제목 |
| UX Preset | unavailable candidate에서 affected constraint와 safe replacement path를 제공하고 last-safe context 유지 |
| Product Binding | 같은 authorized `drawId`에서 energy 완화 또는 마지막 제외 취소; 성공 전 round 증가 없음 |
| Evidence | [`hi-fi-empty-402x874.png`](evidence/hi-fi-empty-402x874.png), `ST-05`, `ST-14`, `ST-18`, FigJam `1:7` / `7:124` |
| 판단 | `관찰됨`: candidate unavailable/recovery. `제품 결정`: ALL 완화와 exclusion undo 정책 |

### `HF-EVENT-LOG` — 변경 계약의 visible audit surface

| 추적 축 | 적용 |
| --- | --- |
| Stable IDs | `FR-EVENT-LOG`, `INFO-EVENT-LOG`, `OBJ-EVENT`; `EV-DRAW-REQUESTED`, `EV-ROUND-LOCKED`, `EV-TRACK-RESTARTED`, `EV-EXCLUDE-DEFERRED`, `EV-FAILURE`, `EV-RECOVERED`, `EV-FALLBACK` |
| HTML | `#contractProbe`, `#eventLogList`, `logEvent()`, `renderEventLog()`, `eventId`, `sequence`, round/track/draw/attempt references |
| Design Pack | labeled operations list, stable codes, dense mono metadata, no color-only event meaning |
| UX Preset | authority 전환과 confirmed outcome을 event 순서로 검토 가능 |
| Product Binding | session-local append-only synthetic audit log, 최근 50개 저장·최근 6개 표시 |
| Evidence | [`hi-fi-contract-event-log-402x874.png`](evidence/hi-fi-contract-event-log-402x874.png), `ST-15`, FigJam change/evidence section `1:8` |
| 판단 | `추론됨`: Pack operations surface를 상태 계약 probe로 사용. `제품 결정`: event schema·보존 범위 |

### Low-fi → hi-fi semantic continuity

등록되지 않았던 low-fi drift `U-01`은 최종 [`05-low-fi.html`](05-low-fi.html)에서 해소됐다.

| Carryover | Low-fi 증거 | Hi-fi/문서 연결 | 결과 |
| --- | --- | --- | --- |
| Frame spine | `FR-READY`, `FR-TRANSIENT`, `FR-PLAYING`, `FR-EMPTY`, `FR-ERROR` 5개 | `FR-READY`, `FR-PLAYING`, `FR-ROUND-LOCKED`, `FR-PAUSED`, `FR-EMPTY`, `FR-ERROR`, `FR-RECOVERED`, `FR-EVENT-LOG` | 완전 |
| Transient authority | `FR-TRANSIENT` 안의 `S-REQUESTING`, `S-NEW-ROUND-REQUESTING`, `S-RECOMMENDED`, `S-STARTING`, `S-RESTARTING`, `S-RECOVERING` 6/6 | hi-fi `phaseCopy()`, `renderTransient()`, LAB state controls | 완전 |
| Canonical IDs | `ROUND-*`, `DRAW-*`, `EVENT-*`, `SYN-BB-*`, `ATTEMPT *`; stale `RND-*`/`DRW-*`/`EVT-*` 0 | Product Binding v1.1과 hi-fi ID grammar | 완전 |
| CR-01 action semantics | same-track restart, new-round-only draw, deferred exclusion, EMPTY same-draw recovery, draw/restart error scope, fallback 3/3 | `ACT-*`, `F-*`, `S-*`, `ST-01`–`ST-18` | 완전 |

Low-fi continuity는 frame `5/5`, transient `6/6`, canonical prefix drift `0`으로 E2 pass다. [`low-fi-transient-new-round-402x874.png`](evidence/low-fi-transient-new-round-402x874.png)은 pending work, last-safe round/draw/track, authorized draw, `NOT SUCCESS · NOT PLAYING`을 한 wireframe에 보인다. FigJam low-fi section `1:6`도 주요 four-state storyboard와 editable `FR-TRANSIENT` 6-state rail을 함께 보유한다. Transient proof는 FigJam nodes, HTML capture, rendered QA가 공동으로 담당한다.

유지보수 비용은 별도다. Low-fi baseline 837 lines → final 1498 lines, diff `+750/-89`로 보존 proxy는 89.4%지만 final의 baseline 비중은 49.9%다. 따라서 `U-01` 해결은 continuity pass이면서 동시에 **미등록 영향의 큰 후속 보정 부담**이며, 낮은 변경 비용의 증거로 계산하지 않는다.

## 3. Design Pack 적용 register

아래 `DP-*`는 이 ledger의 안정 평가 ID다. Pack 정본에 원래 존재하는 ID라고 주장하지 않는다. 분모는 commerce/print 전용 규칙을 제외하고 이 iPhone prototype에 적용 가능한 22개다.

| Rule ID | 적용 계약 | 상태 | 근거와 한계 |
| --- | --- | --- | --- |
| `DP-VIS-01` | Swiss grid discipline + workwear material + street-scale hierarchy | 완전 | 한 개의 dominant headline, dense metadata, calm hard surface가 모든 주요 frame에 유지됨. E2 captures |
| `DP-TOK-01` | canonical raw palette | 부분 | 핵심 10색 역할은 사용하지만 `--stone`이 정본 `#7A7060`이 아닌 `#62594c`; `#b9b0a3`, `#51493f`, `#8f0910`, `white`가 local literal로 존재 |
| `DP-TOK-02` | `--color-*` semantic adapter | 부분 | 의미 역할은 보이지만 component가 raw token을 직접 참조하며 canonical semantic adapter 변수가 없음 |
| `DP-TYPE-01` | Barlow Condensed / DM Sans / Space Mono 역할 | 부분 | display/body/mono 역할은 분리했으나 source family를 load하지 않고 Arial Narrow/Roboto Condensed, Pretendard/system, SFMono/Roboto Mono fallback을 사용 |
| `DP-GRID-01` | 12-column, grid-first alignment | 부분 | iPhone stack과 내부 2/3-column 구조는 일관되나 명시적 12-column token/grid는 없음. `추론됨` medium adapter |
| `DP-SPC-01` | 4–96px spacing scale | 부분 | 4/8/12/16/24/32 토큰을 사용하지만 10/14/20px 등 local spacing도 직접 사용 |
| `DP-GEO-01` | squared/near-squared, hairline-first, sparse shadow | 완전 | 1px borders, 2px corners, no decorative shadow/pills |
| `DP-SIG-01` | bounded red/gold + non-color state cues | 완전 | local decision group의 red primary 1개; gold는 round lock; 모든 상태에 text/code/position cue 병행 |
| `DP-MAT-01` | restrained canvas/grid/noise outside critical reading zones | 완전 | 전역 critical overlay 제거; grid는 hero 장식, noise는 cover image treatment에 한정; opaque stamp/gradient가 상태 텍스트를 보호 |
| `DP-ARCH-01` | utility/hero/linear flow/operations surface | 완전 | utility header, status rail, condition lead, beat card, operations/recovery/log 구조 |
| `DP-VOICE-01` | direct verbs, factual/catalog voice | 완전 | RANDOM, RESTART, NEW ROUND, RETRY, affected/retained facts; lifestyle 과장 없음 |
| `DP-RIGHTS-01` | sample/reference rights boundary | 완전 | synthetic fixture만 사용, 실제 아티스트·음악·앨범·상표·graffiti 없음 |
| `DP-CARD-01` | image → identity → decision data → action/feedback | 부분 | track card 순서와 비이미지 정보는 유지되지만 broken-image layout을 실제로 강제한 증거는 없음 |
| `DP-BTN-01` | one red primary + secondary/utility hierarchy | 완전 | READY, round actions, error, empty 각각에 우선순위가 분리됨 |
| `DP-BTN-02` | default/hover/focus/pressed/disabled/loading states | 부분 | focus-visible/active/disabled와 phase guard는 있으나 전 variant hover·`aria-busy`·loading button 계약은 불완전 |
| `DP-FDBK-01` | processing/error/recovery/durable success | 완전 | REQUESTING/STARTING/RESTARTING/RECOVERING, scoped error, last-safe, durable Playing/lock 구현 |
| `DP-A11Y-01` | native control, focus, live announcement, keyboard/AT | 부분 | E2 baseline 10/10이나 수동 keyboard-only 전체 경로와 VoiceOver/외부 AT는 미실행 |
| `DP-IMG-01` | descriptive alt + failure-safe information | 부분 | dynamic alt와 SVG title/desc는 있으나 이미지 load-failure 시나리오는 미실행 |
| `DP-RWD-01` | narrow stack, no critical overflow, touch/focus | 완전 | 402×874·375×812 overflow 0, 44px 미만 target 0, safe-area 적용 |
| `DP-MOT-01` | purposeful motion + reduced motion + no ornamental loop | 완전 | drawer/toast/progress에 180ms 상태 피드백, `prefers-reduced-motion` 0.01ms, 장식 loop 없음 |
| `DP-L10N-01` | Korean/CJK·long text·line break validation | 부분 | 한국어/영문 혼용을 402·375 captures에서 확인했지만 200% text, 더 긴 번역, RTL은 미검증 |
| `DP-LAYER-01` | base < drawer < toast numeric layer tokens | 부분 | 실제 z-order 1/20/30은 명확하지만 `--z-*` semantic layer token으로 정의하지 않음 |

**Strict Design Pack 적용률: `11/22 = 50.0%`.** 11개 `부분`을 포함한 addressed coverage는 `22/22`이나, 이를 적용 완료로 계산하지 않는다. 9/10 계획의 `≥95%` 기준은 이 snapshot에서 미달이다. 가장 큰 원인은 시각 방향이 아니라 canonical token/type/grid adapter와 release-grade accessibility/image/localization 증거다.

## 4. UX Preset 적용 register

### 상태 커버리지

`04-state-model.md`의 적용 상태 15개 모두 HTML phase/local effect와 `ST-01`–`ST-18`에 연결됐다.

| 상태 묶음 | Stable IDs | 구현/증거 |
| --- | --- | --- |
| Draft·request | `S-READY`, `S-REQUESTING`, `S-NEW-ROUND-REQUESTING` | 조건, commit, retained lock, explicit transient phases |
| Recommendation·execution | `S-RECOMMENDED`, `S-STARTING`, `S-RESTARTING`, `S-RECOVERING` | authority labels와 pending copy; success와 분리 |
| Confirmed·retained | `S-PLAYING`, `S-ROUND-LOCKED`, `S-PAUSED`, `S-FALLBACK` | synthetic outcome, round/track ID, progress, next actions |
| Local effects | `S-SAVED`, `S-EXCLUDED` | session save와 next-round exclusion; current lock 불변 |
| Exception | `S-EMPTY`, `S-ERROR` | affected scope, retained context, scope-gated recovery |

**UX Preset 상태 커버리지: `15/15 = 100%` (E2, synthetic runtime).** 실제 audio outcome 또는 external authority confirmation을 검증했다는 뜻은 아니다.

### `decision.reserve` 최소 semantic tests

| Test | 상태 | 증거/해석 |
| --- | --- | --- |
| valid candidate → minimal config → commit → evidence | 완전 | `ST-01`, `ACT-RANDOMIZE`, atomic Playing+lock |
| recommendation identifiable and replaceable before commitment | 부분 | `SYSTEM PICK`은 식별되지만, 승인된 no-Start autoplay adapter에서는 recommendation 이후 pre-commit replace 단계가 없음 |
| missing/invalid input blocks commitment | N/A | segmented values에 항상 유효 default가 있어 invalid configuration을 만들지 않음; future free input에는 재검증 필요 |
| unavailable/failed preparation has safe replacement/retry | 완전 | `ST-05`–`ST-07`, `ST-13`–`ST-14`, `ST-18` |
| double activation/retry cannot duplicate commitment | 완전 | `ST-02`, `ST-11`, `ST-16` |
| Back/Cancel/Exit retention policy | 부분 | 문서 정책과 session resume `ST-08`은 있으나 browser Back·pending cancel·exit 전체 경로의 독립 test record는 없음 |
| keyboard/platform-equivalent path | 부분 | native buttons와 focus-visible은 있으나 수동 keyboard-only end-to-end run은 없음 |

Strict semantic test pass는 `3/6 applicable = 50.0%`, 부분 포함 addressed는 `6/6`; invalid-input 1건은 N/A다. 따라서 이 Preset 사용은 계획대로 `supported-with-adaptation`이며, semantic suite 전체 충족으로 승격하지 않는다.

### expression capabilities

- 완전 `5/6 applicable`: one active selection, fit rationale, pending/confirmed 구분, recovery action, non-color focus/selection/risk cue.
- 부분 `1/6`: enabled/disabled commitment with reason은 duplicate guard와 disabled state가 있으나 invalid configuration 이유 표면이 없음.
- N/A `1`: field-local invalid validation은 closed segmented defaults 때문에 발생하지 않음.

## 5. Product Binding 추적

### Stable action/information IDs

| ID | HTML/State 연결 | 결과 |
| --- | --- | --- |
| `ACT-RANDOMIZE` | `#drawButton` → `drawBeat("draw")` → `EV-DRAW-REQUESTED` | 완전 |
| `ACT-RESTART-TRACK` | `#restartButton` → `restartTrack()`; round/draw/track 불변 | 완전 |
| `ACT-NEW-ROUND-REROLL` | `#newRoundButton` → `drawBeat("new-round")`; 성공 시에만 round +1 | 완전 |
| `ACT-EXCLUDE-NEXT-ROUND` | `#excludeButton` → pending `{trackId,effectiveFromRound}` → 다음 round promotion | 완전 |
| `INFO-ROUND-LOCK` | `#roundBadge`, `#trackCode`, error/empty last-safe detail | 완전 |
| `INFO-EVENT-LOG` | `#eventLogList`, stable `EVENT-*` sequence와 `EV-*` types | 완전 |

**Stable action/information 적용률: `6/6 = 100%` (E2).**

### Object model fidelity

| Object ID | 상태 | 차이 |
| --- | --- | --- |
| `OBJ-SESSION` | 완전 | condition/history/applied·pending exclusion/current round를 single state에서 파생 |
| `OBJ-ROUND` | 완전 | `roundId`, number, `roundLocked` status, `roundTrackId`, `roundStartedAt` 기록 |
| `OBJ-TRACK` | 완전 | id/title/`alias`/bpm/energy/types/fit/cover fixture 8건 |
| `OBJ-RECOMMENDATION` | 완전 | object-level ID/draw/track/reason/`createdAt`/authority/target round 기록 |
| `OBJ-PLAYBACK` | 완전 | phase/track/elapsed/attempt/failure scope 구현 |
| `OBJ-SAVED` | 완전 | `savedIds`와 `{trackId,savedAt}` `savedRecords` 동기화 |
| `OBJ-EXCLUDED` | 완전 | pending의 `excludedAt/reason/effectiveFromRound`와 applied `excludedRecords/appliedAt/outcome` 유지 |
| `OBJ-EVENT` | 완전 | eventId/sequence/type/round/track/draw/attempt/outcome/createdAt 구현 |

**Object model strict fidelity는 `8/8 = 100%`.** alias, round start timestamp, recommendation object timestamp/authority, saved records, pending/applied exclusion records까지 Product Binding schema와 session persistence에 연결됐다.

## 6. CR-01 변경 전파

| 영향 | 상태 | 증거 |
| --- | --- | --- |
| `I-01`–`I-04` | 완료 | Product Brief, IA, flow, state model v1.1 |
| `I-05`–`I-08` | 완료 | HTML round/action/error/save/deferred exclusion + `ST-01`–`ST-18` |
| `I-09` | 완료 | 이 ledger의 Product Binding attribution |
| `I-10` | 완료 | FigJam `1:7`, `1:8`; hi-fi `7:121`–`7:124`; PNG evidence |
| `I-11` | 완료 | after-state PNG, `qa-report.md`, `qa-results.json` |
| `I-12` | 완료 | `07-change-log.md` propagation/measurement와 `U-01` 해결 기록 |

- 사전 등록 변경 전파 완료율: `12/12 = 100%`. `CR-01` 목표 `≥95%`를 충족했다. 사전 목록 밖에서 발견된 `U-01` low-fi drift도 canonical ID/transient authority/action semantics로 보정되어 발견 영향 전체 전파는 `13/13 = 100%`다.
- 영향 등록 완전성은 `12/13 = 92.3%`다. `U-01`을 종료 전에 해소했어도 low-fi를 사전 영향 분석에서 누락한 사실은 유지보수성 감점으로 남긴다.
- 등록 불변조건: `8/8 = 100%` E2 확인. Industrial Swiss identity, local red primary, authority-state 분리, no-Start, retention, synthetic boundary, 402/375 layout, empty/error/fallback가 유지됐다.
- HTML baseline 보존: `before-change/06-hi-fi-preview.html` 1052 lines → final 1405 lines. 현재 파일 기준 diff는 `+446/-93`; 전면 CSS/DOM 교체 없이 기존 구조에 상태 계약과 Product Binding record schema를 확장했다.
- hard-gate 해소: stable round/draw/event/sequence, visible event log, explicit restarting/new-round-requesting/recovering, pending exclusion promotion, failure-scope fallback guard, critical-region texture 제거가 HTML과 `ST-01`–`ST-18`에 연결됐다.

## 7. Asset provenance

| Asset | 수량/사용 | Provenance와 역할 | 검증 |
| --- | --- | --- | --- |
| `assets/beat-01.svg`–`beat-08.svg` | 8/8 track fixtures | Take 2 안에서 직접 만든 synthetic cover. warm canvas/deep ink/red-dark/gold, hard grid, screenprint/photocopy/court/tape 계열 재질. 실제 이름·상표·artist·graffiti 없음 | `role="img"`, `<title>`, `<desc>`, visible `SYNTHETIC`; XML 8/8 |
| `assets/texture-grid.svg` | hero 장식 | low-contrast hard grid + red registration corner | CSS background이므로 AT에는 노출되지 않음; XML valid |
| `assets/texture-noise.svg` | cover image treatment | low-contrast photocopy/screenprint noise | cover 내부에만 사용; critical app overlay 제거; XML valid |

HTML local SVG references는 `10/10`, missing 0, XML failure 0다. 외부 이미지·실재 앨범·실재 음악 데이터는 사용하지 않았다. Asset correctness는 E2이고, 실제 권리 음원/공연 라이선스 증거와 무관하다.

Rendered evidence inventory는 low-fi 5, hi-fi/contract 8, FigJam 4, before-change 4로 **21/21 true PNG**다. 확장된 hi-fi 증거에는 PAUSED와 RECOVERED/FALLBACK이 포함된다.

## 8. 접근성·반응형·모션·한국어

| 축 | 구현/측정 | 현재 판정 |
| --- | --- | --- |
| Semantics | `lang=ko`, named buttons 33/33, img alt 1/1, live regions 3, labeled progressbar | E2 baseline pass |
| Focus/drawer | `:focus-visible`, LAB `inert` + `aria-hidden`, open/close focus restoration, Escape close | 구현 확인. modal focus trap은 요구하지 않는 non-modal evidence drawer로 사용 |
| Contrast | ground/canvas 15.33, canvas/red-dark 5.94, gold/ground 6.97, stone-light/ground 6.84 | 측정 pair pass. 전체 state/disabled pair 전수 측정은 아님 |
| Responsive | 402×874 및 375×812: horizontal overflow 0, visible target <44px 0 | E2 pass. physical safe-area/device rotation 미검증 |
| Motion | drawer/toast/progress 180ms; reduced-motion rule; ornamental loop 없음 | code/static pass. 실제 OS reduced-motion mode 미실행 |
| Korean | `word-break: keep-all`, body fallback chain, Korean/English mixed copy를 402/375 capture로 확인 | 기본 pass. Dynamic Type/200%, 장문 번역, VoiceOver 발음 미검증 |

접근성 기본 점검은 `10/10`이지만 **보조기술 검증률로 재해석하지 않는다**. VoiceOver·Switch Control·외부 keyboard-only E2/E4 session은 없으며, 실제 iOS Dynamic Type를 쓰는 native app도 아니다.

## 9. FigJam node register

| Purpose | Node ID | Local corroboration | Evidence boundary |
| --- | --- | --- | --- |
| User flow parent | `1:5` | `figjam-user-flow.png`; `F-R3` same-draw와 `F-R5` locked-track recovery 분리 | flow structure; HTML runtime 증거 아님 |
| Low-fi parent | `1:6` | `figjam-low-fi.png`; four-state iPhone storyboard + editable transient rail | low-fi visual hierarchy와 state inventory; interaction은 HTML/QA |
| `FR-TRANSIENT` rail | `19:204` | wireframe review rail; 제품 CTA와 분리 | editable state comparison; runtime 전이 증거 아님 |
| `S-REQUESTING` | `19:207` | pending authority, `DRAW-0001`, success/Playing 아님 | HTML `FR-TRANSIENT`와 양방향 추적 |
| `S-NEW-ROUND-REQUESTING` | `19:210` | last-safe Round 01 + authorized `DRAW-0002` | early round/track replacement 금지 표현 |
| `S-RECOMMENDED` | `19:213` | system pick, 자동 STARTING, 별도 Start 없음 | recommendation과 confirmed outcome 분리 |
| `S-STARTING` | `19:216` | commitment 실행 중, 확인 전 Playing 금지 | pending execution 표현 |
| `S-RESTARTING` | `19:219` | same round/draw/track, 00:00, 새 draw 금지 | same-track recovery contract 표현 |
| `S-RECOVERING` | `19:222` | last-safe + authorized draw, cross-scope fallback 금지 | recovery pending과 outcome 분리 |
| High-fi parent section | `1:7` | `figjam-hi-fi-storyboard.png` | editable board/storyboard presence; HTML runtime 증거 아님 |
| `HF-READY` | `7:121` | ready screenshot + `FR-READY` mapping | state capture와 node pointer 연결 |
| `HF-ROUND-LOCKED` | `7:122` | playing/lock screenshots + CR after state | interactive restart/reroll 증거는 QA가 담당 |
| `HF-ERROR-RECOVERY` | `7:123` | draw failure 3/3, `RETRY SAME DRAW`, draw-only fallback; restart는 same-track-only annotation | actual network failure 증거 아님 |
| `HF-EMPTY` | `7:124` | empty screenshot + pool tests | production catalog availability 증거 아님 |
| Change/evidence parent | `1:8` | `figjam-change-evidence.png`, contract event-log capture | CR attribution/evidence index; runtime 자체 아님 |

현재 node claims와 board URL은 [`figjam/board-manifest.md`](figjam/board-manifest.md) 및 four PNG (`figjam-user-flow.png`, `figjam-low-fi.png`, `figjam-hi-fi-storyboard.png`, `figjam-change-evidence.png`)에서 대조했다. Flow manifest는 기존 CR-01 nodes와 추가 `F-85/86` `13:203`, `F-R5` `13:207`, connectors `13:211`/`13:215`/`13:219`를 기록한다. Low-fi manifest는 `FR-TRANSIENT` parent `19:204`와 six state nodes `19:207`–`19:222`를 기록한다. FigJam node/capture는 editable visual contract의 증거이며, 실제 탭·상태 전이·retention은 HTML/QA 증거가 담당한다. 이 ledger 작업에서는 Figma MCP로 node 속성을 다시 fetch하지 않았으므로 editable-node runtime 자체를 독립 검증했다는 주장은 하지 않는다.

## 10. 정량 snapshot과 미적용 한계

| Metric | Result | Evidence/해석 |
| --- | ---: | --- |
| Design Pack strict 적용률 | `11/22` = **50.0%** | canonical adapter drift/검증 미완료를 부분으로 유지 |
| Design Pack addressed coverage | `22/22` = 100% | 부분을 pass로 계산하지 않음 |
| UX Preset state coverage | `15/15` = **100%** | synthetic runtime states |
| UX Preset semantic tests | `3/6 applicable` = **50.0%** | 3 partial, invalid-input 1 N/A |
| Product stable action/info | `6/6` = **100%** | HTML + ST evidence |
| Product object model strict fidelity | `8/8` = **100%** | alias/timestamps/saved/exclusion records hardening |
| State-contract cases | `18/18` = **100%** | `qa-results.json`, E2 |
| Required interactions | `8/8` = **100%** | `qa-results.json`, E2 |
| Low-fi frame continuity | `5/5` = **100%** | READY/TRANSIENT/PLAYING/EMPTY/ERROR |
| Low-fi transient continuity | `6/6` = **100%** | six canonical `S-*` pending/authority states |
| Mobile viewport checks | `2/2` pass | 402×874, 375×812 |
| SVG reference/validity | `10/10` pass | missing 0, XML failure 0 |
| True PNG evidence inventory | `21/21` pass | low-fi 5 + hi-fi 8 + FigJam 4 + baseline 4 |
| Accessibility baseline | `10/10` pass | static/rendered baseline; AT not run |
| Major frame dedicated capture | `8/8` = **100%** | PAUSED와 RECOVERED/FALLBACK capture 추가 |
| CR-01 impact propagation | `12/12` = **100%** | change log + `U-01` unregistered drift resolved |
| All discovered impact propagation | `13/13` = **100%** | registered 12 + `U-01` final sync |
| Impact registration completeness | `12/13` = **92.3%** | low-fi was omitted before implementation |
| CR-01 invariant retention | `8/8` = **100%** | E2; real medium/user acceptance 제외 |

### 이 ledger가 증명하지 않는 것

- synthetic `PLAYING / SIM`은 실제 음악, 음향 출력, silence 방지, route, latency, volume의 증거가 아니다.
- physical iPhone 또는 iOS Simulator에서 실행하지 않았다. HTML의 402/375 viewport 검사는 real-device proof가 아니다.
- VoiceOver, Switch Control, screen reader, 실제 external keyboard end-to-end, 대표 사용자 접근성 검증을 하지 않았다.
- 실제 추천 API·네트워크·오프라인 pack·저작권/공연권을 검증하지 않았다.
- 참가자·DJ·운영자의 현장 사용성, 공정성 수용, 실제 배틀 규정 적합성을 검증하지 않았다.
- 현재 evidence는 `qa-report.md`가 선언한 E2다. 반복 가능한 E3 또는 real-medium/user E4로 임의 승격하지 않는다.

## 11. Fidelity 결론

하이파이는 핵심 제품 계약에서는 강하다. `ST-01`–`ST-18`, action/info `6/6`, Product object `8/8`, UX state `15/15`, required interaction `8/8`이 round lock·same-track restart·new-round-only draw·deferred exclusion·scope-gated fallback·visible event log까지 연결한다. Low-fi frame `5/5`와 transient `6/6`, major hi-fi frame capture `8/8`, 네 주요 FigJam hi-fi node와 four FigJam PNG도 추적된다.

그러나 현재 상태를 9/10 Design System 적용으로 판정할 수는 없다. Industrial Swiss의 시각 정체성은 일관되지만 semantic token adapter, exact type/grid/spacing contract, complete button/image/accessibility/localization evidence가 부분이다. CR log, object schema, low-fi continuity, paused/recovered capture 누락은 해소됐지만 real-device·AT·audio·대표 사용자 증거는 여전히 없다. 따라서 이 ledger의 판정은 **상업 제안 수준의 시각·상태 prototype과 CR-01 유지보수 추적은 성립하나, strict system validity 9/10 증거는 아직 미달**이다.
