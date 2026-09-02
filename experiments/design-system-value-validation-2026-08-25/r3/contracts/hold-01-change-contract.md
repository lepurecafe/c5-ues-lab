# COMMON SURFACE R3 — `HOLD / 01` Change Contract

> **Change ID:** `change.common-surface.hold-01`  
> **Version:** `0.2.0-experiment`  
> **Composition:** `composition.common-surface.r3-hold-01@0.2.0-experiment`  
> **Binding:** `binding.common-surface.catalog.r3@0.2.0-experiment`  
> **Status:** `activated-in-synthetic-prototype / external-not-activated`  
> **Evidence:** 계약 `E1`, 7매체·전후 캡처 `E2`, 로컬 affected/unknown/unaffected/released, authority-negative, shared-Web 전파, Back/reload `E3`; 실제 외부 운영 `E4 unresolved`  
> **Scenario authority:** `experiment-approved-synthetic`; 실제 제품 위험, recall, 판매 보류, 규제 또는 고객 사건이 아니다.

## 1. Change request

합성 품질 권한자가 `CS-03`의 특정 합성 batch `CS03-SYN-2608-H01`을 예방적 판매 보류 상태로 지정한다. 동시에 근거가 확보되지 않은 `피부 장벽 회복/복구/repair` 효능 표현 `CLAIM-CS03-RECOVERY-01`을 사용 중지한다.

R3는 다음을 수행해야 한다.

1. 영향 batch의 selection·commit·fulfillment를 차단한다.
2. `CS-03`의 정체성과 영향받지 않은 catalog context는 보존한다.
3. 근거 미확보 claim을 7개 매체에서 suppress한다.
4. 고객이 batch를 확인하거나, 다른 제품을 살펴보거나, 합성 지원 경로로 이동할 수 있게 한다.
5. 입력·후보·비영향 context를 안전하게 유지한다.
6. 명시적 release authority가 있을 때만 HOLD를 해제한다.
7. claim 복원과 판매 상태 복원을 별도 승인으로 관리한다.

## 2. Scope

| Field | Frozen value |
| --- | --- |
| Product | `CS-03 / BARRIER / 세럼` |
| Affected batch | `CS03-SYN-2608-H01` |
| Known-unaffected QA fixture | `CS03-SYN-2608-U01`; 실제 안전·재고·판매 가능 근거가 아님 |
| Hold event | `EVENT-HOLD-01-CS03` |
| Claim action | `CLAIM-CS03-RECOVERY-01 → unresolved / withdrawn-from-use` |
| Other catalog objects | `CS-01–02`, `CS-04–11`, `OBJ-06` preserve |
| Market | `unresolved`; 실제 시장 판단 없음 |
| Customer/order data | 없음; local synthetic fixture only |
| UX Preset | `decision.reserve@0.1.0`, Commerce/Reserve web에만 적용 |
| Medium denominator | 7 media × 5 checks = `35` |
| Activation clock | 승인 record가 frozen된 시각 `T0` |
| Actual legal/safety meaning | `unresolved / outside experiment` |
| Release ceiling | exact H01의 `localCommit`만 복원; `claimRestore = false`, `fulfillment = false` |

## 3. Invariants

[`composition-manifest.md`](composition-manifest.md)의 `R3-BI-01–12`와 기존 fixture `BI-01–08`을 모두 적용한다. HOLD 특화 불변조건은 다음과 같다.

| ID | HOLD invariant |
| --- | --- |
| `HBI-01` | 영향 범위는 `CS-03 + CS03-SYN-2608-H01`을 넘지 않는다. |
| `HBI-02` | `CS-03` working name은 identity로 보존하되 효능 증거처럼 사용하지 않는다. |
| `HBI-03` | HOLD는 선택·판매 가능·추천·확정 결과와 구별된다. |
| `HBI-04` | 영향 batch는 commit과 fulfillment에서 차단된다. |
| `HBI-05` | batch unknown은 `영향 없음`으로 자동 판정하지 않는다. |
| `HBI-06` | 영향받지 않은 제품을 안전·대체 적합 제품으로 자동 추천하지 않는다. |
| `HBI-07` | 고객 입력·비영향 후보·현재 제품 context를 안전하게 유지한다. |
| `HBI-08` | HOLD·claim 상태는 텍스트, ID, 영향, 다음 행동을 포함한다. |
| `HBI-09` | static 광고는 완료된 확인·반품·안전 판정을 모사하지 않는다. |
| `HBI-10` | release와 claim reauthorization은 서로 다른 decision이다. |
| `HBI-11` | 실제 의료·안전·법무 안내를 생성하지 않는다. |
| `HBI-12` | 활성화·변경·해제·rollback history를 삭제하지 않는다. |
| `HBI-13` | release authority의 필수 의미 필드와 nested permission leaf 13종을 exact 검증하고 malformed record는 HOLD로 거부한다. |
| `HBI-14` | 고객 Web은 내부 preview와 동일한 shared Product Binding revision을 소비한다. |
| `HBI-15` | released H01과 known-unaffected U01을 서로 다른 batch authority state로 유지한다. |
| `HBI-16` | 유효한 draft·filter·batch input·검증 상태는 Back·reload·pageshow에서 tab-local로 복구한다. |

## 4. Change vector

| ID | Requirement | Owner layer | Decision |
| --- | --- | --- | --- |
| `HCR-01` | 합성 HOLD event와 affected batch 등록 | Product Binding | change |
| `HCR-02` | 근거 미확보 claim 사용 중지 | Product Binding / content authority | change |
| `HCR-03` | 로고·raw palette·제품 stable ID 유지 | Identity / Composition | preserve |
| `HCR-04` | HOLD semantic aliases와 component 추가 | Composition / Pack mapping | change |
| `HCR-05` | Reserve flow에서 affected commit 차단·context retention | UX Preset / Projection | change |
| `HCR-06` | 7-medium claim·availability 전파 | Medium / Projection | change/preserve/suppress/route |
| `HCR-07` | 고객 확인·대체·지원 경로 | Product Binding / Brand Experience | change |
| `HCR-08` | SLA·acknowledgement·evidence ledger | Governance | change |
| `HCR-09` | explicit release와 claim 분리 | Product Binding / authority | change |
| `HCR-10` | versioned rollback과 stale-state audit | Governance / Implementation | change |

## 5. Impact map

`Result`는 실행 전 변경하지 않는다. 사전 등록한 모든 `expected` 셀이 전파율 분모에 들어간다.

| Impact ID | Source | Target | Expected action | Retain | SLA class | Evidence | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `IMP-01` | Catalog Binding | `CS-03` catalog record | batch-partial-hold | stable ID·working name | `SLA-P0` | binding diff | prototype-pass |
| `IMP-02` | Claim ledger | product/campaign/staff copy | `CLAIM-CS03-RECOVERY-01` suppress | factual identity | `SLA-P0` | text search + review | prototype-pass |
| `IMP-03` | Identity migration | all media | HOLD component alias 추가 | logo/raw tokens | `SLA-P1` | token diff | prototype-pass |
| `IMP-04` | Product Binding | Reserve candidate | exact H01 affected commit block; batch 없는 product-level draft 유지; Back/reload 복원 | inputs·other candidates | `SLA-P0` | `E3-INT-01/02`, `E3-COM-01/02`, retention replay | independent-E3-pass; Stage REVISE |
| `IMP-05` | Product Binding | batch unknown / known-unaffected / released fixture | unknown false clearance 금지; U01 `unaffected`와 released H01 분리 | entered batch context | `SLA-P0` | `E3-INT-03/04`, `E3-COM-03/04`, release replay | independent-E3-pass; Stage REVISE |
| `IMP-06` | Brand Experience | HOLD copy | calm cause/scope/next action | non-diagnostic voice | `SLA-P1` | copy review | prototype-pass |
| `IMP-07` | HOLD state | packaging | production quarantine + batch/insert route | existing physical truth | `SLA-P0/P1` | proof + gap record | sample-frame-pass / production unresolved |
| `IMP-08` | HOLD state | offline shop | shelf/tester quarantine + staff route | other products | `SLA-P0` | timestamped store proof | sample-frame-pass / store unresolved |
| `IMP-09` | Claim state | merch | affected claim graphics suppress; otherwise preserve | garment identity/care | `SLA-P1` | art inventory | sample-frame-pass / production unresolved |
| `IMP-10` | Claim state | OOH | affected creative pause/replace | generic brand identity | `SLA-P1` | vendor request/removal proof | sample-frame-pass / vendor unresolved |
| `IMP-11` | Claim state | digital ads | pause/replace + destination parity | approved generic creative | `SLA-P1` | platform/cache trace | sample-frame-pass / platform unresolved |
| `IMP-12` | HOLD state | Commerce/Reserve web | alert/disabled/batch/help/recovery | input·selection context | `SLA-P0` | E3 runtime trace | local-E3-pass |
| `IMP-13` | HOLD rules | Moodboard/guidance | anti-moodboard + incident expression rules | source/rights ledger | `SLA-P2` | MD/board diff | prototype-pass |
| `IMP-14` | Release event | internal 7 projections + customer Web | complete authority validation → Binding-first shared publish → 7/7 + customer consume; claim/fulfillment remain withdrawn | audit history | `SLA-ROLLBACK` | malformed `13/13` reject + HOLD/release cross-tab replay | independent-E3-pass; Stage REVISE |
| `IMP-15` | Governance | manifest/scorecard | versions, ack, defects, stale refs | R2 archive | `SLA-P1` | audit report | prototype-pass |

```text
Change Propagation Rate
= verified expected impact rows ÷ 15 × 100
```

## 6. 35 medium checks

각 check는 `PASS / FAIL / BLOCKED`로 판정한다. `PASS`에는 증거 링크가 필요하며, 증거 없는 항목은 통과로 계산하지 않는다.

### Moodboard / guidance — `MB-01–05`

| ID | HOLD / 01 pass criterion |
| --- | --- |
| `MB-01` | HOLD 관련 reference와 R3 synthetic status·출처가 연결됨 |
| `MB-02` | reference가 `상태는 identity 변형이 아니라 별도 component`라는 규칙으로 번역됨 |
| `MB-03` | calm, non-diagnostic, non-shaming 고객 표현과 real-skin/material 원칙 유지 |
| `MB-04` | red flood, warning-logo 변형, 공포 이미지, medical theater, 전후 비교가 anti-moodboard에 명시됨 |
| `MB-05` | reference rights와 실제 incident/campaign 사용 권한이 분리되고 모두 `unresolved`로 표시됨 |

### Packaging — `PKG-01–05`

| ID | HOLD / 01 pass criterion |
| --- | --- |
| `PKG-01` | product ID와 합성 batch 확인 위치·경로가 HOLD record와 일치 |
| `PKG-02` | identity, 제품 사실, HOLD scope, next action, authority gap의 위계가 분리됨 |
| `PKG-03` | KR/EN, long batch ID, 지원 fallback이 sample scale에서 읽히며 실제 법정 크기 미확정 표시 |
| `PKG-04` | existing pack 수정 불가, 신규 생산 quarantine, insert/dieline/bleed/vendor proof의 evidence 경계 명시 |
| `PKG-05` | package·shelf·web의 product/batch/claim status가 동일 |

### Offline shop — `SHOP-01–05`

| ID | HOLD / 01 pass criterion |
| --- | --- |
| `SHOP-01` | 10m identity, 3m affected product route, arm-length batch·next action 위계 유지 |
| `SHOP-02` | shelf/tester/checkout에서 affected product가 정상 판매 경로로 이어지지 않음 |
| `SHOP-03` | unavailable/hold, batch unknown, alternative, staff help의 원인·보존·next action이 표현됨 |
| `SHOP-04` | staff acknowledgement, quarantine, signage installation, access, 실제 운영 증거 gap 기록 |
| `SHOP-05` | 매장 product/event ID와 Commerce web·staff aid가 일치 |

### T-shirt / merch — `MERCH-01–05`

| ID | HOLD / 01 pass criterion |
| --- | --- |
| `MERCH-01` | garment identity는 유지하고 HOLD를 장식 그래픽으로 소비하지 않음 |
| `MERCH-02` | size/material/care hierarchy가 claim notice나 shared checkout 변경으로 훼손되지 않음 |
| `MERCH-03` | 로고·정보의 print/contrast/scale이 R2 identity를 보존 |
| `MERCH-04` | garment/print rights와 생산 상태는 `unresolved`; claim 포함 재고가 있으면 suppress/quarantine 결정 기록 |
| `MERCH-05` | shared web/매장 checkout에서 CS-03 HOLD와 merch 정상 상태가 혼동되지 않음 |

### OOH — `OOH-01–05`

| ID | HOLD / 01 pass criterion |
| --- | --- |
| `OOH-01` | 한 메시지·한 대상·한 next step; CS-03 claim creative는 중지/교체 |
| `OOH-02` | 거리와 2:1/1:2 비율에서 status를 작은 disclaimer에 숨기지 않음 |
| `OOH-03` | authority 없는 안전·효능·영향 없음 claim 0건 |
| `OOH-04` | 실제 확인이 필요한 경우 사람 읽기 가능한 목적지/fallback을 제공하고 완료를 모사하지 않음 |
| `OOH-05` | vendor request, 실제 removal, placement, print proof의 서로 다른 증거 상태 기록 |

### Digital ads — `ADS-01–05`

| ID | HOLD / 01 pass criterion |
| --- | --- |
| `ADS-01` | 1200×628, 1080×1080, 1080×1920 crop에서 affected claim 잔존 0건 |
| `ADS-02` | pause/replace creative의 메시지·CTA·destination이 같은 event scope를 가리킴 |
| `ADS-03` | KR/EN와 긴 제품/event ID가 잘리지 않고 핵심 상태를 축소 disclaimer로 숨기지 않음 |
| `ADS-04` | claim·asset·platform 권리는 `unresolved`; 합성 creative임을 evidence ledger에 표시 |
| `ADS-05` | ad cache/click destination의 HOLD state와 last-updated version이 일치 |

### Commerce / Reserve web — `WEB-01–05`

| ID | HOLD / 01 pass criterion |
| --- | --- |
| `WEB-01` | system suggestion, user draft, HOLD/unavailable, local commitment, confirmed local result가 구분됨 |
| `WEB-02` | focus-visible, keyboard, 390px reflow, 200% zoom, non-color cues가 R3 state에 적용됨 |
| `WEB-03` | batch unknown, unavailable, invalid, loading, failure, alternative에서 입력과 맥락을 보존하고 recovery 제공 |
| `WEB-04` | affected batch commit이 차단되고 local result가 실제 구매·안전 확인처럼 표현되지 않음 |
| `WEB-05` | Product Binding의 ID·claim·availability와 화면·runtime ceiling이 일치 |

### 판정

```text
Medium Fitness = passed checks ÷ 5 × 100
Overall Medium Coverage = passed checks ÷ 35 × 100
```

- 각 medium `4/5` 이상;
- 전체 `28/35` 이상;
- `P0/P1 = 0`;
- `HBI-01–16 = 100%` 보존;
- `IMP-01–15` 전파율 `≥ 90%`;
- `BLOCKED` 항목은 owner·next evidence·deadline이 있어도 해당 medium의 PASS로 계산하지 않음.

## 7. Synthetic operational SLA

아래는 실제 법적·안전 SLA가 아니라 HOLD 전파 성능을 측정하기 위한 `experiment-approved-synthetic` 목표다.

### Clock

- `T0`: `EVENT-HOLD-01-CS03`의 product, batch, scope, action, 승인 copy가 freeze되고 activation 승인자가 기록된 시각.
- `acknowledged`: 대상 owner가 event/version을 확인한 시각.
- `blocked`: commit/fulfillment path가 합성 fixture에서 차단된 시각.
- `verified`: 독립 점검자가 target state와 evidence를 확인한 시각.

| SLA class | Target from T0 | Required outcome | Ceiling |
| --- | ---: | --- | --- |
| `SLA-P0` | `≤ 15 min` | Catalog/Reserve/checkout/fulfillment synthetic commit 차단, claim source suppress | 실제 시스템 작동 주장 금지 |
| `SLA-P1-owned` | `≤ 30 min` | owned web, product feed, staff/internal notice update request·version ack | 실제 광고 플랫폼·매장 증거 unresolved |
| `SLA-P1-ads` | `≤ 4 h` | digital ads pause/replace request와 destination parity 확인 | platform propagation은 E3 필요 |
| `SLA-P1-retail` | `≤ 4 h` | store/fulfillment quarantine acknowledgement·replacement signage 준비 | 실제 설치 E3/E4 필요 |
| `SLA-P1-OOH` | request `≤ 4 h`, replacement target `≤ 24 h` | vendor takedown/replacement 요청과 proof 상태 분리 | vendor capability·actual removal unresolved |
| `SLA-P2` | `≤ 1 business day` | Moodboard/guidance, merch inventory, long-copy, governance update | 실제 production proof unresolved |
| `SLA-AUDIT` | `≤ 24 h` | 7-medium/35-check parity audit와 stale reference report | 전체 E3 없이 complete 주장 금지 |
| `SLA-ROLLBACK` | release 후 owned digital `≤ 4 h`, physical target `≤ 1 business day` | scoped restore + stale-state audit | claim 자동 복원 금지 |

SLA miss는 숨기지 않고 severity와 owner를 기록한다. P0 path의 SLA miss는 그 자체로 P1 이상 결함이다.

## 8. Activation approval

HOLD는 다음 필드가 모두 존재할 때만 활성화한다.

| Field | Requirement |
| --- | --- |
| Event | `EVENT-HOLD-01-CS03` |
| Product | exact `CS-03` |
| Batch | exact `CS03-SYN-2608-H01` |
| Claim action | `CLAIM-CS03-RECOVERY-01 withdrawn-from-use` |
| Effective time | `2026-08-26T17:08:00+09:00` (`T0`) |
| Commit consequence | affected batch selection/commit/fulfillment block |
| Customer message | scope, uncertainty, retained context, next action |
| Activation approver | `experiment-owner/common-surface-r3`; 실제 규제 권한이 아님 |
| Evidence state | `experiment-approved-synthetic / E1 + E2 + local E3` |

제품·batch·scope가 불명확하면 전 제품 HOLD로 확대하지 않고 `activation-blocked`로 남긴다.

제품 수준의 로컬 starter 선택에는 batch가 연결되지 않는다. 따라서 `CS-03` 제품 후보 자체는 HOLD로 표시하거나 차단하지 않는다. exact affected batch가 입력되면 해당 batch의 local commit을 차단하고, unknown/partial/stale 입력은 거짓 해제 없이 진행을 멈춘다. `CS03-SYN-2608-U01`은 이 분기를 검증하는 비영향 합성 fixture일 뿐 실제 안전·재고·판매 가능 판정이 아니다.

## 9. Release approval

HOLD 해제에는 별도 합성 record `EVENT-RELEASE-01-CS03`가 필요하다.

필수 frozen record:

| Field | Exact required value |
| --- | --- |
| `eventId` | `EVENT-RELEASE-01-CS03` |
| `productId` / `batchId` | `CS-03` / `CS03-SYN-2608-H01` |
| `scope` | `local-selection-and-seven-medium-projections` |
| `effectiveAt` | `2026-08-26T17:31:00+09:00` |
| `approver` | `experiment-reviewer/common-surface-r3`; 외부 authority 아님 |
| `permissions` | `{ localCommit: true, fulfillment: false, claimRestore: false }` |
| `customerFacingCopy` | `합성 release 검증으로 exact H01 batch의 로컬 선택만 복원했습니다. 철회 claim과 실제 판매·재고·fulfillment는 복원하지 않았습니다.` |
| `authorityDisclaimer` | `experiment-approved-synthetic/not-external-authority` |
| `mediumImpactMap` | `[moodboard, packaging, shop, merch, ooh, ads, web]` exact order |
| `claimDecision` | `do-not-restore` |

각 필드는 존재만이 아니라 canonical 값·배열 순서·boolean을 exact match한다. 하나라도 다르면 `release-rejected`로 HOLD를 유지한다. 이 검증을 독립 검토자 approval 자체로 오인하지 않는다.

시간 경과, HOLD 화면 완성, 내부 요청, 다른 제품의 정상 상태, complaint 부재는 release authority가 아니다.

## 10. Rollback protocol

1. Release record의 event/product/batch/scope/effective time/approver/permissions/copy/disclaimer/medium map/claim decision을 모두 exact 검증한다.
2. 검증 성공 후 Product Binding을 `release-verified-local-only`로 먼저 바꾸고 revision-namespaced same-origin `localStorage`에 publish한다.
3. 고객 Web이 같은 Binding revision을 `storage` event 또는 `pageshow`에서 소비한 뒤 Owned web·ads·shop·packaging guidance·merch·OOH·Moodboard impact ledger를 갱신한다.
4. HOLD component instance는 해제하되 semantic token·component contract·audit history는 보존한다.
5. Claim은 별도 authority 없으면 withdrawn 상태를 유지한다.
6. cache·printed material·store signage·staff aid의 stale state를 검색한다.
7. release 전후 capture와 timestamp를 보존한다.
8. rollback 후 affected/released H01, batch unknown, unaffected U01, unaffected product를 각각 재검증한다.
9. 내부 preview와 고객 Web의 draft·filter·batch input·검증 상태가 `sessionStorage`에서 reload·Back 뒤 복구되는지 재검증한다.

로컬 runtime은 `binding.common-surface.catalog.r3@0.2.0-hold-active`에서 시작해 complete release record를 검증한 뒤 `binding.common-surface.catalog.r3@0.2.0-release-verified-local-only`를 먼저 적용한다. 그 다음 내부 7개 projection과 고객 Web을 `release-restored-local-only / claim-withdrawn / fulfillment-not-restored`로 재생성한다. exact H01은 `released`, U01은 `unaffected`로 기록한다.

Rollback 도중 scope mismatch, stale claim, false confirmed result가 발견되면 restore를 중단하고 HOLD 상태로 되돌린다.

## 11. P0 / P1 definitions

### P0 — 즉시 STOP

- affected 합성 batch가 selection·commit·fulfillment 가능한 상태;
- 근거 미확보 claim이 효능·안전·추천·대체 적합성 근거로 노출;
- batch unknown 또는 상태 미확인을 `영향 없음`, `안전`, `confirmed`로 표현;
- release authority 없이 HOLD 해제;
- release record의 exact scope/effective time/approver/permissions/copy/disclaimer/7-medium map 중 하나라도 불일치하는데 HOLD 해제;
- 실제 위험·recall·의료·규제 사실인 것처럼 합성 사건을 표시;
- 지원을 위해 불필요한 실제 건강·피부·주문·연락처 데이터를 수집;
- 잘못된 product/batch를 차단하거나 영향 범위를 숨김.

### P1 — STOP 후 수정·재평가

- 웹·매장·광고·포장 guidance에서 HOLD/claim 상태가 서로 다름;
- 영향 제품을 색만으로 구분하거나 focus·텍스트·행동 제한이 없음;
- 입력·선택 context가 실패·back·retry에서 사라지고 복구 경로가 없음;
- 영향받지 않은 제품까지 HOLD 처리되거나 자동 대체 추천됨;
- 활성 CS-03 claim creative가 SLA 이후 남아 있음;
- OOH/digital ad가 stale destination으로 연결;
- release와 claim reauthorization을 하나의 상태로 처리;
- 내부 preview와 고객 Web이 서로 다른 Binding revision/HOLD 상태를 소비;
- released H01을 U01의 `unaffected` 상태로 저장·표시;
- Back·reload·pageshow에서 유효한 synthetic draft·batch input·검증 맥락이 소실;
- R2 logo/raw token/product ID를 HOLD 때문에 임의 변경;
- P0 path SLA miss 또는 증거 없는 완료 주장.

P2/P3는 공통 평가 프레임을 따른다. P0/P1은 총점으로 상쇄할 수 없다.

## 12. Required evidence record

| Evidence ID | Required artifact | Minimum level |
| --- | --- | --- |
| `EV-HOLD-01` | frozen activation record | E1 |
| `EV-BIND-01` | Catalog Binding before/after diff | E1 |
| `EV-CLAIM-01` | 7-medium withdrawn-claim search | E1; rendered proof E2 |
| `EV-WEB-01` | affected/unknown/unaffected/released, shared Binding propagation, Back/reload runtime paths | target E3 |
| `EV-MEDIA-01` | 35-check scorecard with links | E1/E2 |
| `EV-SLA-01` | T0, ack, block, verify timestamps | E1; system trace E3 |
| `EV-ACCESS-01` | keyboard, focus, zoom, non-color, screen reader | target E3/E4 |
| `EV-ROLLBACK-01` | release/rollback before-after trace | target E3 |
| `EV-RIGHTS-01` | actual market/legal/asset authority | `unresolved`, E4 required outside experiment |

## 13. Exit decisions

| Decision | Criteria |
| --- | --- |
| `STOP` | P0/P1 open, wrong scope, false authority, blocking gap |
| `REVISE` | medium <4/5, overall <28/35, impact propagation <90%, invariant loss |
| `PROCEED-WITH-GAPS` | E1/E2 contract projection passes but E3/E4 runtime/external evidence remains explicitly open |
| `STAGE-PASS` | 35-check threshold, HBI 100%, impact ≥90%, P0/P1 0, evidence links complete |
| `STRONG-PASS` | Stage Pass + SLA targets met + affected/unknown/unaffected/released, shared-Web rollback, retention E3 evidence |

`STAGE-PASS`도 실제 화장품 incident, recall, 고객 안전 또는 시장 출시 검증을 의미하지 않는다.

## 14. Execution checklist

- [x] R2 known gaps와 R3 freeze revision 기록
- [x] activation approval fields complete
- [x] Catalog Binding and claim ledger diff
- [x] identity/raw token preservation check
- [x] impact rows 15개 owner·SLA·evidence 연결
- [x] 7 medium / 35 checks frozen
- [x] affected batch / unknown batch / unaffected product paths
- [x] claim search across MD, HTML, image copy inventory, staff guidance
- [ ] keyboard/focus/390px/non-color는 확인; 200% zoom과 screen reader는 외부 접근성 검증 대기
- [x] synthetic SLA timestamp ledger
- [ ] independent reviewer score
- [x] release-not-authorized negative test
- [x] release and rollback test when synthetic release event is issued
- [x] malformed release record `13/13` rejection, shared HOLD/release customer Web propagation, H01 `released` / U01 `unaffected` 분리
- [x] 내부 preview와 고객 Web의 reload·Back retention 브라우저 재생
- [x] stale reference and link/asset audit
- [ ] final decision은 독립 reviewer와 사용자 평가를 반영해 확정

## 15. Revision chronology

- `0.1.1-experiment` 재평가는 R3-A `63/100`, R3-B `60/100`, P0/P1 open으로 STOP이었다. 해당 score와 결함 원장은 [`../evidence/07-independent-review.md`](../evidence/07-independent-review.md)에 그대로 남긴다.
- `0.2.0-experiment`는 release authority, shared customer Web Binding, released/unaffected 분리, retention을 수정한 새 semantic revision이다. validator와 브라우저 E3 통과는 builder 증거이며 독립 acceptance가 아니다.
