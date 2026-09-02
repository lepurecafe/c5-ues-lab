# COMMON SURFACE R3 실행 기록

> **실행일:** 2026-08-26  
> **현재 Composition:** `composition.common-surface.r3-hold-01@0.2.0-experiment`  
> **이력:** §1–9의 `0.1.1` Builder 기록은 독립 `63 / 60 · STOP`으로 무효화된 chronology이며, 현재 근거는 §10이다.  
> **시나리오:** `HOLD / 01`  
> **최대 주장:** 합성 데이터와 로컬 프로토타입에서의 `E1–E3`; 실제 화장품·판매·안전·규제·권리·외부 매체 작동은 `unresolved`

## 1. 동결값

| 필드 | 값 |
| --- | --- |
| 합성 T0 | `2026-08-26T17:08:00+09:00` |
| 활성 event | `EVENT-HOLD-01-CS03` |
| 영향 제품 | `CS-03 / BARRIER` |
| 영향 batch | `CS03-SYN-2608-H01` |
| 비영향 QA fixture | `CS03-SYN-2608-U01` · 실제 안전·재고·판매 가능 근거 아님 |
| 사용 중지 claim | `CLAIM-CS03-RECOVERY-01` |
| release fixture | `EVENT-RELEASE-01-CS03` |
| 제품 분모 | `CS-01–11 + OBJ-06 = 12` |
| 매체 분모 | `7 × 5 = 35` |
| impact 분모 | `15` |
| asset registry | `asset-registry.common-surface.r3@0.1.0-experiment` |

## 2. 실제 실행 순서

| 시각(KST) | 단계 | 산출·검증 |
| --- | --- | --- |
| 15:30–16:06 | R2 감사·시나리오·평가표·구현 인벤토리 동결 | `00–03` 문서 |
| 15:55–16:41 | Composition, Binding, identity migration, HOLD contract 작성 | `contracts/` |
| 16:20–16:45 | 토큰·catalog·경로형 identity·75개 asset registry 정규화 | `tokens.css`, `catalog.js`, `assets/` |
| 16:31–17:01 | 동일 template로 R3-A/R3-B/비교 허브 생성 | `preview-baseline.html`, `preview-hold.html`, `preview.html` |
| 16:38–16:55 | 고객용 상업 웹사이트 샘플 구현 | `sample-commerce.html`, `commerce.css`, `commerce.js` |
| 16:45–17:02 | 정적 validator, 브라우저 상호작용, desktop/mobile 캡처, 결함 수정 | `tools/`, `evidence/screenshots/` |
| 17:19 | 독립 1차 검토 | R3-A `60`, R3-B `57`, exact-batch·baseline 접근성·rollback P0/P1로 `STOP` |
| 17:20–17:38 | `0.1.1` 의미 수정·재검증 | product-level과 exact batch 분리, mode별 alt/hidden copy, Binding-first 7매체 rollback, 고객 웹 정합화 |

파일 수정 시각은 실행 순서를 보조하는 로컬 증거다. 실제 조직 승인·배포·vendor 전파 시각으로 사용하지 않는다.

## 3. 결과물 형태

- 내부 운영·증거 허브: [`../preview.html`](../preview.html)
- R3-A 정규화 기준선: [`../preview-baseline.html`](../preview-baseline.html)
- R3-B HOLD 적용본: [`../preview-hold.html`](../preview-hold.html)
- 실제 고객 접점 형태의 웹사이트 샘플: [`../sample-commerce.html`](../sample-commerce.html)
- 정본 계약: [`../contracts/composition-manifest.md`](../contracts/composition-manifest.md), [`../contracts/product-binding-catalog.md`](../contracts/product-binding-catalog.md), [`../contracts/identity-token-migration.md`](../contracts/identity-token-migration.md), [`../contracts/hold-01-change-contract.md`](../contracts/hold-01-change-contract.md)
- asset source of truth: [`../assets/asset-registry.json`](../assets/asset-registry.json)
- 반복 validator: [`../tools/validate-r3.mjs`](../tools/validate-r3.mjs)

## 4. 사용한 디자인 시스템 계층

| 계층 | 사용 ID | 실제 적용 |
| --- | --- | --- |
| Design Pack | `pack:industrial-swiss@1.0.0` | 12-column grid, condensed display type, hard border, material honesty, bounded red/blue |
| UX Preset | `decision.reserve@0.1.0` | system suggestion → user draft → local commit → local result, cancel/reset/retry/alternative |
| Product Binding | `binding.common-surface.catalog.r3@0.2.0-experiment` | 12 stable ID, canonical fact field, exact batch/claim/availability/authority 상태 |
| Brand Experience | `brand-experience.common-surface@0.1.0-experiment` | 설명 우선, visible uncertainty, quiet control, recovery is care |
| Composition | `composition.common-surface.r3-hold-01@0.2.0-experiment` | 위 네 계층을 COMMON SURFACE의 7매체와 두 웹 surface에 결합 |

## 5. 역할 분해와 주 검토

| 역할 | 범위 | 파일 소유 | 주 검토 결과 |
| --- | --- | --- | --- |
| Euler / fixture worker | composition, binding, identity migration, HOLD contract 초안 | `contracts/` 4개 | 주 에이전트가 링크·권한·T0·현재 구현과 대조 |
| Mendel / tooling worker | 반복 validator와 사용법 | `tools/validate-r3.mjs`, `tools/README.md` | 주 에이전트가 실제 실행하고 실패 원인을 evidence 누락으로 확인 |
| Noether / explorer | R2 결함과 구현 인벤토리 | `03-implementation-inventory.md` | 주 에이전트가 구현 범위·forbidden R1 참조 기준에 반영 |
| Noether / independent reviewer | 동결 rubric 기반 builder-blind 1차·재검토 | `evidence/07-independent-review.md` | 1차 `STOP` 결함을 주 에이전트가 구현·브라우저 증거와 대조해 수정; `0.1.1` 재검토 별도 요청 |
| 주 에이전트 | 요구 해석, 시각 방향, 에셋 생성, 구현, 통합, 브라우저 QA, 최종 판정 | 나머지 R3 파일 | 모든 하위 결과를 live file과 validator로 재검토 |

하위 작업은 권한·아키텍처·최종 판정을 소유하지 않는다. 최종 결론과 남은 gap은 이 증거 묶음이 소유한다.

## 6. 브라우저 검증 환경

- 표면: Codex 인앱 브라우저의 로컬 HTTP 렌더
- desktop: `1440×1000`
- mobile: `390×844`
- 검증 대상: 3개 내부 프리뷰와 고객용 웹사이트 샘플
- 확인: 이미지 로드, 가로 overflow, baseline/HOLD 상태, product-level/unverified·exact affected·unknown·known-unaffected·alternative, filter retention, local commit idempotency, release guard, Binding-first 7/7 rollback, mode/alt 왕복, focus-visible, console error
- 미측정: 200% 실제 브라우저 확대, screen reader, 실제 보조기술, 외부 광고/매장/vendor 시스템

## 7. 실행 중 발견·수정한 결함

1. 고객 사이트 로고의 `#commerce-main` anchor가 sticky header 아래로 hero를 숨김. `#page-top`과 scroll padding으로 수정 후 `scrollY=0`, `heroTop=headerBottom`을 재확인했다.
2. Reserve catalog의 제품명과 category code 사이 간격이 부족했다. `column-gap`과 수직 정렬을 추가했다.
3. 최초 화면의 `35/35` 표시는 200% 확대·screen reader 미측정을 숨겼다. `34/35`, `WEB-02 BLOCKED`로 정정했다.
4. `catalog.js`에 승인 record 없는 `09:00` placeholder가 남아 있었다. Change Contract가 `not-activated`인 동안의 값이므로 SLA 결과로 사용하지 않고 `R3-P2-T0-01`로 기록했다. 실제 synthetic activation에서 approver·scope와 함께 `17:08:00`을 동결하고 두 surface를 새로 로드해 재검증했다. 이 chronology 정정은 독립 reviewer의 감점·신뢰도 판단 대상이다.
5. 1차 독립 검토가 `CS-03` 제품 수준 초안을 exact batch HOLD처럼 차단하는 P0를 발견했다. `productId + batchStatus + Binding authority state` predicate로 교체해 batch 없는 제품 수준 초안은 local-only로 허용하고, exact affected만 차단하며 unknown은 거짓 해제 없이 중단한다.
6. baseline DOM의 unconditional HOLD 요약과 mode 왕복 alt 오염 P1을 발견했다. build-time `hidden`과 mode별 `src/srcset/alt` source를 추가했으며 baseline → HOLD → baseline snapshot이 byte-equivalent field set으로 복원됨을 브라우저에서 확인했다.
7. `0.1.1`에서 release가 local boolean만 바꾸던 P1을 내부 7개 projection ledger로 보강했으나, 독립 검토에서 authority record·고객 Web 소비·H01 상태가 불완전해 **수정 미완료**로 판정됐다. 완전한 수정 증거는 §10의 `0.2.0` tranche에만 귀속한다.

## 8. Synthetic SLA ledger

| Event | 시각(KST) | T0 대비 | 결과 |
| --- | --- | ---: | --- |
| activation freeze / T0 | `17:08:00` | `0:00` | product·batch·claim·copy·approver 동결 |
| owned prototype acknowledgement | `17:08:00` | `0:00` | Catalog/Composition revision 일치 |
| preview + customer sample initial block verified | `17:10:15` | `2:15` | 1차 구현의 generic CS-03 차단이 뒤늦게 P0로 판정됨; 성공 근거로 사용하지 않음 |
| exact-batch predicate reverified | `17:38` | chronology-only | 두 surface에서 product-level CS-03 local commit enabled, H01 disabled, U01 enabled, unknown disabled; console error 0 |
| Binding-first rollback reverified | `17:38` | chronology-only | **0.1.1 내부-only self-pass · 독립 검토에서 무효화**. 고객 Web·완전한 authority·state 분리가 없었음 |
| stale link/asset validator | 최종 실행 기록 참조 | `≤24h` | error/warning 0 목표 |

`SLA-P0 ≤15분`은 이미 준비된 합성 surface를 활성화하고 차단 상태를 재검증하는 시간으로만 측정한다. 제작 소요시간, 실제 주문/fulfillment, 광고 플랫폼, 매장, vendor 전파 시간을 대신하지 않는다.

## 9. 현재 판정 경계

`0.1.1`은 1차 결함을 닫았다고 자체 판정했으나 독립 재검토에서 release authority·고객 Web·released/U01·retention P0/P1이 남아 **STOP**이었다. `0.2.0`이 이를 수정했지만 새 독립 재검토 전에는 STOP을 해제하지 않는다. 실제 제품·실데이터·대표 사용자·보조기술·권리·vendor 전파가 없으므로 상업 출시 승인이나 실제 incident 대응 완료로 해석할 수 없다.

## 10. `0.2.0` 증거 tranche · 독립 재검토 전

### 10.1 판정 이력 보존

`0.1.1` Builder의 `84 / 88`과 당시 P0/P1 자체 감사 `0 / 0`은 독립 검토가 발견한 release authority·cross-surface Binding·released/U01 상태 분리·Back/reload retention 결함을 반영하지 못했다. 성공 근거로 재사용하지 않는다. 독립 `0.1.1` 판정인 **R3-A `63`, R3-B `60`, STOP**은 그대로 유효하며, 아래 기록은 그 결함을 수정한 `composition.common-surface.r3-hold-01@0.2.0-experiment`의 새 증거다. 독립 reviewer가 같은 frozen rubric으로 다시 닫기 전에는 STOP을 해제하지 않는다.

### 10.2 Browser/IAB 재실행

| ID | 관찰한 경로 | 실제 결과 | 경계 |
| --- | --- | --- | --- |
| `E3-020-REL-NEG-01` | release record의 event·product·batch·scope·effectiveAt·approver·claim decision·세 permission leaf·customer copy·authority disclaimer·7매체 map을 한 필드씩 훼손 | **13/13 거부**, 모든 case에서 Binding `hold-active`와 HOLD 유지 | 합성 fixture와 로컬 runtime만 증명 |
| `E3-020-XWEB-01` | 내부 HOLD → 유효 release 발행 → scoped rollback | Binding-first 뒤 내부 7/7과 고객 Web에 같은 release Binding revision이 자동 전파됨 | 실제 backend·외부 배포·fulfillment 아님 |
| `E3-020-BATCH-01` | 고객 Web에서 H01·U01 비교 | H01=`released / local-only`, U01=`unaffected synthetic fixture`; claim·fulfillment 미복원 | 실제 안전·재고·판매 가능 판정 아님 |
| `E3-020-XWEB-02` | 내부에서 HOLD 재적용 | 같은 shared Binding 경로로 고객 Web도 `hold-active`에 자동 복귀 | 다른 브라우저·기기·외부 cache 미검증 |
| `E3-020-RET-INT-01` | 내부에서 filter BODY, CS-03 draft, `CS03-SYN-UNKNOWN`, unknown 상태 설정 → reload → 다른 페이지 이동 후 Back | 네 상태가 모두 복원되고 commit 차단·HOLD Binding이 유지됨 | 동일 origin의 synthetic `sessionStorage` |
| `E3-020-RET-COM-01` | 고객 Web에서 CS-03, 같은 unknown input, disabled commit/HOLD Binding 설정 → reload → Back | 제품·입력·차단·Binding이 유지됨. restore 시 result 문구는 현재 canonical state로 정규화됨 | form 원문 전체 보존이 아니라 검증된 상태 재생성 |
| `E3-020-POSTREL-H01-01` | release 뒤 내부·고객 H01 반복 조회 | 양쪽 모두 `released/local-only`, commit enabled; U01은 별도 `unaffected`, UNKNOWN은 blocked | 실제 batch authority 아님 |
| `E3-020-REHOLD-H01-01` | released H01 입력 상태에서 HOLD 재적용 | 양쪽 H01 `affected`, 입력 유지, commit disabled | same-origin localStorage |
| `E3-020-RACE-01` | H01 commit 대기 중 HOLD 재적용 및 H01→U01 lookup 중첩 | settlement에서 저장 중단; stale lookup 폐기, 마지막 U01만 적용 | 인위적 로컬 timing fixture |
| `E3-020-COMMIT-ID-01` | 고객 Web에서 U01과 released H01을 차례로 저장 | batch·authority·Binding revision이 다른 두 record를 product ID 하나로 합치지 않음 | session-local synthetic record |
| `E3-020-RET-ALT-AUDIT-01` | release 상태의 대안 선택과 감사 ledger → reload·Back | FACE/CS-02/alternative live copy 동일, 이전 event sequence 보존 | sessionStorage 범위 |
| `E3-020-BINDING-FAIL-01` | 독립 reviewer가 HOLD `setItem` 실패 주입 | 내부·고객 모두 이전 release revision 유지; 내부에 publish failure 표시, 부분 HOLD 없음 | 실패 주입 E3; 실제 backend 아님 |

### 10.3 Validator `1.3.0`

`node tools/validate-r3.mjs --json --strict-warnings` 재실행 결과는 **PASS, error/warning `0 / 0`**이다.

| 항목 | 결과 |
| --- | ---: |
| local reference | `259`, missing/outside `0 / 0` |
| asset registry | `75 / 75` valid |
| baseline/HOLD/customer HTML 이미지 alt·loading·dimensions·responsive | `100%` |
| baseline/HOLD/customer HTML button type·accessible name | `100%` |

Validator `1.3.0`은 complete release authority, exhaustive malformed negative audit, 양방향 verified Binding publish, async settlement, batch-aware customer record, distinct `released`, 두 surface의 session·감사 이력 retention source를 검사한다. 다만 실제 state transition의 증거는 위 Browser/IAB 재실행이며, validator PASS만으로 독립 hard gate나 E4를 닫지 않는다.

Semantic contract는 `29 / 29`을 통과했다.

### 10.4 `0.2.0` 현재 판정 경계

독립 reviewer는 최신 `0.2.0` snapshot을 같은 frozen rubric과 별도 E3로 재생해 P0/P1 `0/0`, hard gate PASS를 확인했다. 공식 점수는 R3-A/R3-B 각각 **`63 / 100`**, Stage는 **`REVISE`**다. 실제 권리, 실제 화장품·batch·안전·규제·재고·fulfillment, 보조기술, 대표 사용자, 물리 매체, vendor 및 production 증거는 여전히 unresolved다.
