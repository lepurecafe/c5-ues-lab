# CR-01 Change Propagation Log — Fair Round Lock

> Change request: [`CR-01`](07-change-request.md)
>
> Baseline: `binding.battle-beat-randomizer@1.0.0`
>
> Final: `binding.battle-beat-randomizer@1.1.0`
>
> Registered / closed: 2026-08-26
>
> Evidence ceiling: **E2 — rendered browser, DOM/state inspection, static asset validation, FigJam node inspection, capture**

## 1. 종료 판정

`CR-01 Fair Round Lock`은 사전 등록한 영향 `I-01`–`I-12`와, 종료 검토에서 추가로 발견한 미등록 영향 `U-01`에 모두 전파됐다.

- 사전 등록 영향 전파율: **`12/12 = 100%`** — 목표 `≥95%` 통과
- 영향 등록 완전성: **`12/13 = 92.3%`** — `05-low-fi.html`을 사전 영향 분석에서 누락
- 발견된 전체 영향의 최종 전파율: **`13/13 = 100%`** — `U-01` 발견 뒤 low-fi·FigJam·증거까지 보정
- 불변조건 유지율: **`8/8 = 100%`** — 목표 `100%` 통과
- 상태 계약: **`ST-01`–`ST-18 = 18/18`** 통과
- 필수 상호작용: **`8/8`** 통과
- low-fi 연속성: frame `5/5`, transient `6/6`, canonical ID와 CR-01 행동 계약 통과
- hi-fi와 low-fi의 402×874 / 375×812: 수평 overflow `0px`, 가시 활성 target `<44px` `0`
- console error / warning: `0 / 0`
- local asset: 참조 누락 `0`, SVG XML 실패 `0`, 기존 10개 변경 없음
- 최종 증거: low-fi 5, hi-fi 8, FigJam 4, before-change 4 — 실제 PNG `21/21`
- 변경 방식: hi-fi baseline line 보존 proxy **91.2%**, low-fi **89.4%**, asset churn `0/10`. 단 low-fi는 final file의 baseline 비중이 49.9%에 불과해 **저비용 변경의 증거가 아니라 미등록 영향의 보정 부담**으로 해석

이 판정은 **CR-01의 전파와 유지보수성에 대한 E2 판정**이다. 전체 Design System이 9/10이라는 뜻은 아니다. fidelity ledger의 strict Design Pack 적용률과 UX semantic test에는 partial이 남아 있다. Product Binding object schema는 final hardening으로 8개 object 모두 구현 surface에 연결했지만 실제 production persistence/API 계약을 검증한 것은 아니다. 실제 audio, physical iPhone, VoiceOver/AT, 대표 배틀 사용자 증거도 없다.

## 2. 계층 귀속

| 계층 | 이번 변경 판정 | 실제로 바뀐 것 | 바뀌지 않은 것 / 증거 |
| --- | --- | --- | --- |
| Design Pack | **비대상·불변조건으로 검증** | 없음 | `pack:industrial-swiss@1.0.0`의 palette 역할, condensed/mono hierarchy, hard grid, 사각 control, bounded red/gold, material direction 유지. Pack 원본 파일과 `assets/` 10개는 수정하지 않음 |
| UX Preset | **원본 규칙 재사용** | 새로운 preset 규칙 없음 | recommendation/commitment/outcome 분리, last-safe retention, retry idempotency, scope-aware recovery를 그대로 투영. UX Preset 원본 파일은 수정하지 않음 |
| Product Binding | **변경 대상** | round/draw/attempt ID, atomic round lock, same-track restart, new-round-only draw, deferred exclusion, failure-scope fallback gate, visible synthetic event log | battle taxonomy, synthetic-only boundary, no-Start 즉시 playback attempt, save/pause, empty/error recovery는 유지 |

변경의 시각적 표현은 Design Pack을 사용하고, 전이·복구 방식은 UX Preset을 재사용했지만, `라운드 공정성 정책` 자체는 Product Binding의 결정으로 남겼다. 이를 Pack 또는 Preset의 원본 사실로 승격하지 않았다.

## 3. 사전 영향 목록 전파 결과

상태 정의:

- `완료`: 대상에 변경이 반영되고 지정 증거로 검증됨
- `완료·후속 동기화`: 첫 반영 뒤 drift를 발견해 수정하고 다시 검증함
- `미완료`: 구현 또는 증거 중 하나 이상 없음

| ID | 대상 | 계층 귀속 | 상태 | 실제 반영 | 증거 |
| --- | --- | --- | --- | --- | --- |
| `I-01` | [`01-product-brief.md`](01-product-brief.md) | Product Binding | 완료 | v1.1 binding, Fair Round 가치, `ACT-RANDOMIZE`, `ACT-RESTART-TRACK`, `ACT-NEW-ROUND-REROLL`, `ACT-EXCLUDE-NEXT-ROUND`, `A-08`–`A-10`, 불변조건 | before/final diff `+34/-8`; 문서 stable ID 리뷰 |
| `I-02` | [`02-information-architecture.md`](02-information-architecture.md) | Product Binding | 완료 | `OBJ-ROUND`, `OBJ-EVENT`, pending exclusion/effective round, Round Lock/Restart/New Round 위계, `FR-ROUND-LOCKED`, `FR-EVENT-LOG` | before/final diff `+43/-22`; object/frame/action trace |
| `I-03` | [`03-user-flow.md`](03-user-flow.md) | Product Binding 변경 + UX Preset 재사용 | 완료 | `F-70`, `F-80`–`F-87`, `F-R3`–`F-R5`, deferred exclude, same-draw retry, scope-gated fallback, `EV-*` contract | before/final diff `+55/-24`; Mermaid와 stable flow/event IDs |
| `I-04` | [`04-state-model.md`](04-state-model.md) | Product Binding 변경 + UX Preset 재사용 | 완료 | `S-ROUND-LOCKED`, `S-RESTARTING`, `S-NEW-ROUND-REQUESTING`, explicit round/draw/event fields, invariant와 `ST-01`–`ST-18` | before/final diff `+66/-24`; QA `18/18` |
| `I-05` | [`06-hi-fi-preview.html`](06-hi-fi-preview.html) | Product Binding 변경; Pack/Preset 재사용 | 완료·후속 동기화 | round/draw/attempt contract, explicit transient phases, deferred exclusion promotion, failure scope, stable visible event log, IA object schema fields | diff `+446/-93`; final 1405 lines; browser `8/8`, `ST 18/18` |
| `I-06` | 하이파이 컴포넌트 | Product Binding의 화면 투영; Design Pack 불변 | 완료 | `#roundBadge`, `#trackCode`, `#roundActions`, `#restartButton`, `#newRoundButton`, `#contractProbe`, `#eventLogList` | `hi-fi-playing-round-lock-402x874.png`, `hi-fi-contract-event-log-402x874.png`; FigJam `7:122` |
| `I-07` | 오류·복구 상태 | UX Preset 재사용 + Product Binding failure scope | 완료·후속 동기화 | draw failure는 같은 draw retry, 3/3에서만 fallback; restart failure는 same-track recovery만 허용; last-safe round/track 유지 | `ST-06`, `ST-07`, `ST-13`–`ST-16`; `hi-fi-error-last-safe-402x874.png`; FigJam `7:123` |
| `I-08` | 저장·제외 상태 | Product Binding | 완료·후속 동기화 | save 즉시 적용; exclude는 `{trackId,effectiveFromRound}`로 pending 저장, current lock 유지, 다음 round 성공 시 applied로 승격 | `ST-03`, `ST-04`, `ST-11`, `ST-12`, `ST-17`; `EV-EXCLUDE-DEFERRED` |
| `I-09` | [`06-hi-fi-preview-fidelity-ledger.md`](06-hi-fi-preview-fidelity-ledger.md) | 세 계층 추적; 변경 소유는 Product Binding | 완료·final sync 확인 | Pack unchanged / UX reused / Binding changed를 분리하고 화면·state·action·object·asset·FigJam을 양방향 추적 | final-r3 ledger: hi-fi 1405 lines, object `8/8`, captures `8/8`, PNG `21/21`, `U-01`, `I-12` 확인 |
| `I-10` | FigJam high-fi / evidence | 세 계층의 editable projection | 완료·후속 동기화 | flow `1:5`, hi-fi `1:7`, change/evidence `1:8`; same-draw retry와 locked-track recovery를 최종 계약으로 재동기화 | [FigJam board](https://www.figma.com/board/Gn9Y91QDkfnoli7JP81Znk), [`figjam/board-manifest.md`](figjam/board-manifest.md); nodes `3:74`, `13:203`, `13:207`, `7:123`, `8:245`–`8:249` |
| `I-11` | `evidence/` | 세 계층의 검증 증거 | 완료·후속 동기화 | final hi-fi 8, low-fi 5, FigJam 4, before-change 4, QA JSON/MD. 현재 PNG inventory 21/21이 실제 PNG signature | [`qa-results.json`](evidence/qa-results.json), [`qa-report.md`](evidence/qa-report.md), capture files |
| `I-12` | 이 문서 | 세 계층의 변경 거버넌스 | 완료 | 실제 영향, diff, 불변조건, QA, 보정 round, 미검증 범위와 잔여 부채 기록 | 본 propagation table과 최종 검수 |

### 미등록 발견 영향

| ID | 발견 | 계층 귀속 | 상태 | 보정 | 증거 |
| --- | --- | --- | --- | --- | --- |
| `U-01` | [`05-low-fi.html`](05-low-fi.html)과 FigJam low-fi `1:6`이 baseline의 즉시 reroll/exclude 의미를 유지 | Product Binding 변경 + UX Preset 상태 연속성 | 완료·후속 동기화 | `before-change/05-low-fi.html` 보존; Round/Draw/Event canonical ID, `FR-TRANSIENT` 6상태, restart/new-round 분리, deferred exclude, same-draw retry, 3/3 fallback gate, restart same-track-only 복구 적용 | low-fi diff `+750/-89`; browser 5 frames + transient `6/6`; FigJam `1:6`; low-fi capture 5개 |

사전 등록 완료율은 `12/12 = 100%`다. 다만 실제 관련 영향은 13개였으므로 등록 완전성은 `12/13 = 92.3%`다. `U-01` 보정 후 발견 영향 전체 전파는 `13/13 = 100%`다. `I-09`는 이 문서와 final-r3 ledger의 상호 참조를 다시 읽어 동기화 완료를 확인했다.

## 4. 변경된 문서·화면·상태·ID

### 문서와 코드

| Surface | Before | Final | 변경 내용 |
| --- | --- | --- | --- |
| Product Brief | `before-change/01-product-brief.md` | `01-product-brief.md` | v1.1 가치·행동·가정·불변조건 |
| IA | `before-change/02-information-architecture.md` | `02-information-architecture.md` | round/event object, action/info frame |
| Flow | `before-change/03-user-flow.md` | `03-user-flow.md` | new-round/restart/retry/fallback/deferred-exclude 분기 |
| State | `before-change/04-state-model.md` | `04-state-model.md` | atomic lock, transient/recovery states, `ST-01`–`ST-18` |
| Low-fi continuity (`U-01`) | `before-change/05-low-fi.html` | `05-low-fi.html` | frame 5개, transient 6상태, canonical ID와 CR-01 행동 계약 |
| Interactive hi-fi | `before-change/06-hi-fi-preview.html` | `06-hi-fi-preview.html` | visible round contract, object schema와 실제 상호작용 |
| Fidelity trace | 없음 | `06-hi-fi-preview-fidelity-ledger.md` | Pack/Preset/Binding와 화면·증거 연결 |
| Change trace | `07-change-request.md` | `07-change-log.md` | 사전 등록 대비 실제 전파와 유지보수 측정 |

### 최종 화면과 정보 surface

| Frame / surface | 핵심 final contract |
| --- | --- |
| `HF-READY` / `FR-READY` | 조건 선택, `ACT-RANDOMIZE`, no-Start, synthetic boundary |
| `HF-ROUND-LOCKED` / `FR-ROUND-LOCKED` | round/track/draw 표시, same-track restart, new-round-only draw, save, deferred exclude |
| `HF-ERROR-RECOVERY` / `FR-ERROR` | draw/restart failure scope 분리, retained last-safe, same-draw retry, gated fallback |
| `HF-EMPTY` / `FR-EMPTY` | affected pool, condition relax, exclusion undo, false Playing 금지 |
| `HF-EVENT-LOG` / `FR-EVENT-LOG` | 증가하는 `EVENT-*`, 안정된 `EV-*`, round/track/draw/attempt 참조 |
| Low-fi `FR-TRANSIENT` | `S-REQUESTING`, `S-NEW-ROUND-REQUESTING`, `S-RECOMMENDED`, `S-STARTING`, `S-RESTARTING`, `S-RECOVERING`; authority/retained context/금지 행동 표시 |

### stable contract IDs

- Actions: `ACT-RANDOMIZE`, `ACT-RESTART-TRACK`, `ACT-NEW-ROUND-REROLL`, `ACT-EXCLUDE-NEXT-ROUND`
- Information: `INFO-ROUND-LOCK`, `INFO-EVENT-LOG`
- States: `S-ROUND-LOCKED`, `S-RESTARTING`, `S-NEW-ROUND-REQUESTING`, `S-RECOVERING`, `S-FALLBACK`
- Recovery flow: `F-R3` same-draw retry, `F-R4` draw-only fallback, `F-R5` locked-track recovery
- Events: `EV-DRAW-REQUESTED`, `EV-ROUND-LOCKED`, `EV-TRACK-RESTARTED`, `EV-EXCLUDE-DEFERRED`, `EV-FAILURE`, `EV-RECOVERED`, `EV-FALLBACK`
- Tests: `ST-01`–`ST-18`

## 5. 불변조건 유지 검증

| # | 불변조건 | 결과 | 증거 |
| ---: | --- | --- | --- |
| 1 | Industrial Swiss warm canvas/deep ground, hard grid, 사각 control, limited red signal 유지 | 통과 | ledger `DP-VIS-01`, `DP-GEO-01`, `DP-SIG-01`, `DP-ARCH-01`; hi-fi/ FigJam captures |
| 2 | 한 local decision region에 red primary 하나 | 통과 | READY draw, round New Round, error recovery, empty recovery의 local hierarchy; ledger `DP-BTN-01` |
| 3 | recommendation, STARTING, confirmed synthetic PLAYING, ERROR 분리 | 통과 | explicit phases와 status rail; `ST-01`, `ST-06`, `ST-13` |
| 4 | 추천 뒤 별도 Start 버튼 없음 | 통과 | QA product interaction proof; `RANDOM BEAT` 이후 자동 synthetic attempt |
| 5 | failure에서 조건·저장·제외·last-safe track/round 보존 | 통과 | `ST-06`, `ST-13`, `ST-14`; error capture와 contract probe |
| 6 | synthetic 상태를 실제 audio 증거처럼 표현하지 않음 | 통과 | `SYNTHETIC`, `PLAYING / SIM`, `실제 오디오 없음`; audio asset 없음 |
| 7 | 402×874 / 375×812 overflow 0, 가시 target 44×44px 이상 | 통과 | QA viewport 2/2; target under 44px `0` |
| 8 | empty, recommendation failure, local fallback 복구 유지 | 통과 | `ST-05`, `ST-07`, `ST-14`, `ST-18`; empty/error captures |

유지율은 **`8/8 = 100%`**다. 이는 E2에서 관찰한 유지율이며 실제 iPhone·audio·AT·대표 사용자 환경의 불변조건 유지율은 미측정이다.

## 6. 브라우저·상태 계약 검증

| 검증 | 결과 | 대표 증거 |
| --- | ---: | --- |
| 첫 draw → atomic Round 01 lock | 통과 | `DRAW-0001` → `ROUND-01-DRAW-0001`; `EV-DRAW-REQUESTED` → `EV-ROUND-LOCKED` |
| double New Round activation | 통과 | 하나의 새 draw/round만 생성; `ST-02` |
| same-track restart | 통과 | roundId/trackId/drawId 유지, attempt만 증가, elapsed reset, 추가 lock event 없음; `ST-09` |
| save / pause / resume | 통과 | 새 draw 없음, current contract 유지; `ST-03`, `ST-10`, `ST-11` |
| deferred exclude | 통과 | current Playing 유지, pending 기록, 다음 round 성공 때 applied 승격; `ST-04`, `ST-12`, `ST-17` |
| failed new round | 통과 | last-safe 유지, same draw retry, recovered event; `ST-06`, `ST-14` |
| fallback gate | 통과 | draw failure 3/3에서만 노출; restart failure에서는 비노출; `ST-07`, `ST-13` |
| stale async result | 통과 | 취소 뒤 늦은 완료가 UI/event outcome을 변경하지 않음; `ST-16` |
| empty recovery | 통과 | false Playing 없이 relax/undo; 같은 authorized draw 유지; `ST-05`, `ST-18` |
| visible audit log | 통과 | stable `EVENT-*` sequence와 `EV-*`, round/track/draw/attempt 참조; `ST-15` |

브라우저 QA 요약:

| Metric | Result |
| --- | ---: |
| Required interactions | `8/8` |
| State-contract cases | `18/18` |
| 402×874 horizontal overflow | `0px` |
| 375×812 horizontal overflow | `0px` |
| Visible target under 44px | `0` at both viewports |
| Console errors / warnings | `0 / 0` |
| Broken local asset references | `0` |
| SVG XML failures | `0/10` |
| Accessibility baseline | `10/10`; AT run 제외 |
| Low-fi frame states | `5/5` |
| Low-fi transient states | `6/6` |
| Low-fi stale ID prefixes | `0` |
| Low-fi 402×874 / 375×812 overflow | `0px / 0px` |
| Low-fi visible enabled target under 44px | `0` at both viewports |
| Capture integrity | actual PNG `21/21` |

Low-fi `U-01` 브라우저 증거:

- same-track restart는 `ROUND-01-DRAW-0001`과 `DRAW-0001`을 유지하고 `00:00`으로 복귀했다.
- `NEW ROUND / REROLL`만 `ROUND-02-DRAW-0002`를 만들었다.
- exclude는 Round 02부터 적용하도록 대기시키고 current lock을 유지했다.
- EMPTY와 draw retry는 같은 authorized `DRAW-0002`를 재사용했고 false Playing을 만들지 않았다.
- fallback은 draw failure `1/3`에서 잠기고 `3/3`에서만 열렸다.
- restart failure scope는 same-track recovery만 허용하고 fallback을 금지했다.

## 7. 전면 재작업 회피 측정

### 텍스트 diff

| File | Added | Removed | Net |
| --- | ---: | ---: | ---: |
| `01-product-brief.md` | 34 | 8 | +26 |
| `02-information-architecture.md` | 43 | 22 | +21 |
| `03-user-flow.md` | 55 | 24 | +31 |
| `04-state-model.md` | 66 | 24 | +42 |
| `05-low-fi.html` (`U-01`) | 750 | 89 | +661 |
| `06-hi-fi-preview.html` | 446 | 93 | +353 |
| **합계** | **1,394** | **260** | **+1,134** |

Hi-fi 유지보수 proxy:

- baseline `1052` lines → final `1405` lines
- baseline 삭제율: `93 / 1052 = 8.8%`
- baseline line 보존 proxy: `(1052 - 93) / 1052 = 91.2%`
- final에서 보존 baseline이 차지하는 proxy: `959 / 1405 = 68.3%`
- net growth: `353 / 1052 = 33.6%`
- asset churn: `0 / 10`; 기존 synthetic SVG 10개 재사용

Low-fi `U-01` 보정 부담:

- baseline `837` lines → final `1498` lines
- baseline 삭제율: `89 / 837 = 10.6%`
- baseline line 보존 proxy: `(837 - 89) / 837 = 89.4%`
- final에서 보존 baseline이 차지하는 proxy: `748 / 1498 = 49.9%`
- net growth: `661 / 837 = 79.0%`
- asset churn: `0 / 10`

Hi-fi는 기존 utility/status rail, ready/active view, track card, transport, save/exclude, empty/error panel, Lab drawer를 버리지 않고 round contract와 recovery/event/object surface를 추가했다. 반면 low-fi는 baseline line의 89.4%를 보존했어도 final의 절반가량이 새 additive sync다. 따라서 `U-01`은 **미등록 영향이 뒤늦게 발견될 때 생기는 상당한 correction burden**이며 low-cost reuse의 증거로 사용하지 않는다. 삭제율·line retention은 모두 **텍스트 기반 근사치**로, semantic DOM 재사용률 또는 실제 작업 시간으로 해석하지 않는다.

실제 작업 시간, 설계자 시간, Figma 편집 시간은 계측하지 않아 `미측정`이다. 이 실험은 file churn과 전파 결과로 재작업 회피를 증명하지만 시간 절감률을 주장하지 않는다.

## 8. 보정과 누락 기록

### 종료 전에 발견해 해결한 drift

| Drift | 발견 | 해소 |
| --- | --- | --- |
| Hi-fi 상태 계약 축약 | event type/sequence, pending exclusion/effective round, failure scope가 문서보다 약함 | stable `EVENT-*`/`EV-*`, visible log, explicit transient phases, promotion, scope gate로 보정 후 `ST-01`–`ST-18` 재검증 |
| Hi-fi object schema drift | IA의 round `startedAt`, track `alias`, recommendation record/`createdAt`, saved record/`savedAt`, applied exclusion metadata가 축약됨 | final HTML에 8개 object의 필요한 fixture field/record를 연결하고 fidelity ledger final snapshot에서 재산정 |
| FigJam recovery 의미 drift | `F-R3`를 locked-track restart로 표시하고 draw failure CTA를 last-safe restart로 표시 | `F-R3 SAME-DRAW RETRY`, `F-85/86 RESTART SAME TRACK`, `F-R5 LOCKED TRACK RECOVERY`로 분리; hi-fi `7:123`을 `RETRY SAME DRAW`로 동기화 |
| `U-01` 미등록 low-fi 영향 | `05-low-fi.html`과 FigJam `1:6`이 즉시 reroll/exclude와 구식 ID를 유지 | before 보존 후 canonical Round/Draw/Event, transient 6상태, CR actions/recovery로 동기화; 2 viewports 재검증 |
| capture format mismatch/coverage | 초기 hi-fi `.png` 일부가 JPEG signature이고 Paused/Recovered·low-fi transient 증거가 없음 | 재캡처와 전용 frame 추가로 현재 PNG `21/21` signature, hi-fi major capture `8/8`, low-fi `5` 확보 |

최종 [`qa-results.json`](evidence/qa-results.json)은 `qa.take-2.battle-beat.2026-08-26.final-r3`이며 low-fi 5, hi-fi 8, FigJam 4, before-change 4를 같은 evidence inventory로 기록한다.

### 남은 누락·부채

- impact analysis가 low-fi를 등록하지 못했다. 현재 구현은 해소됐지만 영향 등록 완전성은 `12/13 = 92.3%`이며, 향후 Product Binding 변경 템플릿은 flow→low-fi→hi-fi를 자동 영향 surface로 포함해야 한다.
- Design Pack canonical semantic token/type/grid/spacing adapter, 전체 button/image/localization/accessibility proof가 부분 상태다.
- Product object fixture는 final HTML에 연결됐지만 production persistence, schema migration, 개인정보/보존 정책, API compatibility는 검증하지 않았다.
- 실제 소요 시간과 사람별 재작업 시간은 기록하지 않았다.

이 항목들은 CR-01의 12개 사전 영향과 8개 불변조건을 실패시키지는 않지만, 전체 시스템의 9/10 유효성 증거에는 감점 요인이다.

## 9. 증거 인덱스

- Baseline: `before-change/01-product-brief.md`, `02-information-architecture.md`, `03-user-flow.md`, `04-state-model.md`, `05-low-fi.html`, `06-hi-fi-preview.html`, `before-change/evidence/` 4개
- Final code/docs: `01-product-brief.md`, `02-information-architecture.md`, `03-user-flow.md`, `04-state-model.md`, `05-low-fi.html`, `06-hi-fi-preview.html`
- Fidelity: [`06-hi-fi-preview-fidelity-ledger.md`](06-hi-fi-preview-fidelity-ledger.md)
- Rendered QA: [`evidence/qa-results.json`](evidence/qa-results.json), [`evidence/qa-report.md`](evidence/qa-report.md)
- Final low-fi captures: `low-fi-ready`, `low-fi-transient-new-round`, `low-fi-playing`, `low-fi-empty`, `low-fi-error`
- Final hi-fi captures: `hi-fi-ready`, `hi-fi-playing-round-lock`, `hi-fi-paused`, `hi-fi-recovered-fallback`, `hi-fi-playing-375x812`, `hi-fi-error-last-safe`, `hi-fi-empty`, `hi-fi-contract-event-log`
- FigJam: [Take 2 board](https://www.figma.com/board/Gn9Y91QDkfnoli7JP81Znk), [`figjam/board-manifest.md`](figjam/board-manifest.md), `figjam-user-flow`, `figjam-low-fi`, `figjam-hi-fi-storyboard`, `figjam-change-evidence`
- Asset inventory: `assets/beat-01.svg`–`beat-08.svg`, `texture-grid.svg`, `texture-noise.svg`; 10개 모두 기존 파일 재사용

## 10. 유지보수성 결론

CR-01은 Product Binding 하나의 변경을 문서, 상태, low-fi, hi-fi interaction, editable FigJam, evidence, fidelity ledger에 전파하면서 Design Pack과 UX Preset 원본 계약을 바꾸지 않았다. hi-fi는 baseline line의 91.2%와 asset 10/10을 보존했고, 사전 영향 12/12와 불변조건 8/8을 E2에서 닫았다. 따라서 **“기존 hi-fi를 전면 재작성하지 않고 체계적으로 변경할 수 있는가”에는 E2 범위에서 통과**다.

동시에 이 변경은 시스템의 결함도 드러냈다. hi-fi contract와 FigJam recovery semantics가 첫 반영에서 어긋났고, low-fi는 아예 사전 영향 목록에서 빠졌다. `U-01` 보정은 final low-fi의 50.1%에 해당하는 additive/change lines를 요구했으므로 “시스템 덕분에 모든 surface가 저비용으로 바뀌었다”고 말할 수 없다. 영향 등록 완전성은 92.3%였고 actual time도 미측정이다. 그러므로 이 결과는 hard gate가 drift를 발견하고 최종 13/13을 닫은 유지보수 실험의 성공 증거이지만, Design System 전체가 9/10 또는 production-ready라는 증거는 아니다.
