# COMMON SURFACE R3 — Product Binding Catalog

> **Binding ID:** `binding.common-surface.catalog.r3`  
> **Version:** `0.2.0-experiment`  
> **Status:** `experimental-contract / HOLD-01-applied`  
> **Evidence:** 정본 계약 `E1`; 로컬 R3-A/R3-B 화면·상호작용 parity `E2/E3`  
> **Authority ceiling:** 모든 행은 `experiment-approved-synthetic` 또는 `unresolved`다. 실제 제품·시장·재고·안전·규제 사실이 아니다.

## 1. 역할

이 문서는 R3 Composition이 사용하는 제품·오브젝트 catalog의 유일한 합성 source of truth다. 시각 정본이나 이미지가 제품 사실을 소유하지 않는다.

필수 필드:

```text
stable ID
product name / working name
form
catalog state
claim authority
market
availability
asset link
```

성분, 용량, 가격, 효능, 재고 수량, 제조, 실제 batch, 안전성, 시장 적합성은 제공되지 않았다. 빈칸을 그럴듯한 값으로 채우지 않고 `unresolved`로 유지한다.

## 2. Authority와 field state

| 값 | 의미 | 허용 행동 |
| --- | --- | --- |
| `experiment-approved-synthetic` | 내부 실험에서 stable fixture로 고정한 가상 데이터 | 합성 상태를 드러내는 R3 prototype과 계약에서 사용 |
| `unresolved` | 실제 권한·근거·값이 없음 | gap과 차단 이유로만 사용; 설득·추천·생산 근거 금지 |

### Catalog state

| State | 의미 |
| --- | --- |
| `synthetic-catalog-active` | 합성 catalog에서 정체성과 탐색이 유지됨 |
| `synthetic-batch-partial-hold` | 제품 정체성은 유지되나 지정 합성 batch의 commit/fulfillment를 차단 |
| `synthetic-object-reference` | 화장품이 아닌 합성 object; 실제 제품 안전·조향·권리 미확정 |

### Availability

| State | 의미 |
| --- | --- |
| `local-prototype-selectable` | 실제 판매 없이 로컬 prototype 후보로만 선택 가능 |
| `local-prototype-batch-blocked` | 지정 합성 batch는 선택·commit·fulfillment 불가 |
| `unresolved-market-availability` | 실제 재고·판매·시장 availability를 알 수 없음 |

### Batch authority state

| State | exact fixture | 의미 |
| --- | --- | --- |
| `affected` | `CS03-SYN-2608-H01` + active HOLD Binding | local commit 차단; 실제 안전 판정 아님 |
| `released` | `CS03-SYN-2608-H01` + 완전 검증된 local-only release Binding | H01의 local commit만 복원; claim·실제 판매·재고·fulfillment 미복원 |
| `unaffected` | `CS03-SYN-2608-U01` | 비영향 합성 QA fixture; 실제 안전·재고·판매 가능 판정 아님 |
| `unknown` | 그 밖의 입력 | 거짓 해제 금지; local commit 차단과 다음 확인 경로 제공 |

`released`와 `unaffected`는 서로 대체할 수 없다. H01 release 결과를 U01 비영향 상태로 저장하거나 표시하면 P1이다.

`IN STOCK`, `SOLD OUT`, `SAFE`, `APPROVED`, `RECALLED`는 실제 권한과 시스템 증거 없이 사용하지 않는다.

## 3. Canonical catalog

| Stable ID | 제품명 / working name | Form | Catalog state | Claim authority | Market | Availability | Asset |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `CS-01` | `RINSE / 젤 클렌저` | 알루미늄 펌프 · `experiment-approved-synthetic` | `synthetic-catalog-active` | 제품 역할·이름은 synthetic; 세정·성분·효능은 `unresolved` | `unresolved` | `local-prototype-selectable`; 실제 availability `unresolved` | [`cs-01-1120.jpg`](../assets/products/cs-01-1120.jpg) |
| `CS-02` | `BALANCE / 에센스` | 프로스티드 유리 보틀 · synthetic | `synthetic-catalog-active` | 준비 단계·이름은 synthetic; 균형·성분·효능은 `unresolved` | `unresolved` | `local-prototype-selectable`; 실제 availability `unresolved` | [`cs-02-1120.jpg`](../assets/products/cs-02-1120.jpg) |
| `CS-03` | `BARRIER / 세럼` | 드로퍼 보틀 · synthetic | `synthetic-batch-partial-hold` | 이름은 synthetic identity; 장벽 회복·강화·repair 효능은 `unresolved`이며 `CLAIM-CS03-RECOVERY-01` 사용 중지 | `unresolved` | 일반 실제 availability `unresolved`; `CS03-SYN-2608-H01`은 `local-prototype-batch-blocked` | [`cs-03-1120.jpg`](../assets/products/cs-03-1120.jpg) |
| `CS-04` | `SEAL / 데일리 크림` | 알루미늄 자 · synthetic | `synthetic-catalog-active` | 보습 단계·이름은 synthetic; 보습·밀폐·성분·효능은 `unresolved` | `unresolved` | `local-prototype-selectable`; 실제 availability `unresolved` | [`cs-04-1120.jpg`](../assets/products/cs-04-1120.jpg) |
| `CS-05` | `SHIELD / 선스틱` | 사각 알루미늄 스틱 · synthetic | `synthetic-catalog-active` | 야외 휴대·이름은 synthetic; SPF·PA·UV·효능·안전은 `unresolved`이며 추천 근거 사용 금지 | `unresolved` | `local-prototype-selectable` only without SPF/PA claim; 실제 availability `unresolved` | [`cs-05-1120.jpg`](../assets/products/cs-05-1120.jpg) |
| `CS-06` | `FIELD / 바디 워시` | 리필형 알루미늄 펌프 · synthetic | `synthetic-catalog-active` | 바디 세정 역할·이름은 synthetic; 리필 가능성·성분·효능은 `unresolved` | `unresolved` | `local-prototype-selectable`; 실제 availability `unresolved` | [`cs-06-1120.jpg`](../assets/products/cs-06-1120.jpg) |
| `CS-07` | `REPAIR / 핸드 밤` | 크림프 알루미늄 튜브 · synthetic | `synthetic-catalog-active` | 손 관리·이름은 synthetic; repair·치료·효능은 `unresolved`이며 claim으로 사용 금지 | `unresolved` | `local-prototype-selectable`; 실제 availability `unresolved` | [`cs-07-1120.jpg`](../assets/products/cs-07-1120.jpg) |
| `CS-08` | `CARRY / 립 밤` | 아노다이징 스틱 · synthetic | `synthetic-catalog-active` | 휴대 역할·이름은 synthetic; 성분·효능·섭취/안전은 `unresolved` | `unresolved` | `local-prototype-selectable`; 실제 availability `unresolved` | [`cs-08-1120.jpg`](../assets/products/cs-08-1120.jpg) |
| `CS-09` | `LENGTH / 바디 로션` | 로우 프로파일 펌프 · synthetic | `synthetic-catalog-active` | 바디 보습 역할·이름은 synthetic; 보습·지속·성분·효능은 `unresolved` | `unresolved` | `local-prototype-selectable`; 실제 availability `unresolved` | [`cs-09-1120.jpg`](../assets/products/cs-09-1120.jpg) |
| `CS-10` | `RESET / 스칼프 린스` | 코발트 노즐 보틀 · synthetic | `synthetic-catalog-active` | 두피 세정 보조·이름은 synthetic; 탈모·비듬·치료·효능은 `unresolved`이며 사용 금지 | `unresolved` | `local-prototype-selectable`; 실제 availability `unresolved` | [`cs-10-1120.jpg`](../assets/products/cs-10-1120.jpg) |
| `CS-11` | `DRY / 데오도란트` | 알루미늄 롤온 · synthetic | `synthetic-catalog-active` | 데일리 바디 역할·이름은 synthetic; 냄새·발한·지속·안전 성능은 `unresolved` | `unresolved` | `local-prototype-selectable`; 실제 availability `unresolved` | [`cs-11-1120.jpg`](../assets/products/cs-11-1120.jpg) |
| `OBJ-06` | `AIR / 미스트 오브젝트` | 유리·금속 케이지 · synthetic | `synthetic-object-reference` | 오브젝트 역할·이름은 synthetic; 조향·흡입·피부·화재·안전은 `unresolved` | `unresolved` | `local-prototype-selectable` as object reference; 실제 availability `unresolved` | [`obj-06-1120.jpg`](../assets/products/obj-06-1120.jpg) |

### Preservation rule

- 12개 stable ID를 R3에서 유지한다.
- HOLD는 `CS-03` 전체 정체성을 삭제하지 않고 지정 합성 batch의 commit 가능성만 변경한다.
- 영향받지 않은 제품을 `safe`, `approved`, `recommended alternative`로 자동 승격하지 않는다.
- Working name은 identity label이다. `BARRIER`, `REPAIR`, `SHIELD`, `RESET`, `DRY`가 실제 효능 증거를 대신할 수 없다.

## 4. HOLD / 01 synthetic authority records

| Record | Value | Authority state | Evidence |
| --- | --- | --- | --- |
| Event ID | `EVENT-HOLD-01-CS03` | `experiment-approved-synthetic` | E1 |
| Affected product | `CS-03` | `experiment-approved-synthetic` | E1 |
| Affected batch | `CS03-SYN-2608-H01` | `experiment-approved-synthetic` | E1 |
| Known-unaffected QA fixture | `CS03-SYN-2608-U01` | `experiment-approved-synthetic`; 실제 안전·재고·판매 가능 판정 금지 | E1/E3 |
| Event class | `synthetic-precautionary-sales-hold` | `experiment-approved-synthetic` | E1 |
| Effective time | `2026-08-26T17:08:00+09:00` (`T0`) | `experiment-approved-synthetic` | E1 |
| Actual safety meaning | 없음; 실제 안전·위험·recall 사실이 아님 | `unresolved` | — |
| Commit consequence | 지정 합성 batch 선택·commit·fulfillment 차단 | `experiment-approved-synthetic` | E1 |
| Customer consequence | batch 확인, 맥락 보존, 합성 return/support 경로 | `experiment-approved-synthetic` | E1 |
| Release event | `EVENT-RELEASE-01-CS03` | `experiment-approved-synthetic / local QA only` | E1/E3 |
| Release scope | `local-selection-and-seven-medium-projections` | exact match required | E1/E3 |
| Release effective time | `2026-08-26T17:31:00+09:00` | exact match required | E1/E3 |
| Release approver | `experiment-reviewer/common-surface-r3` | 합성 reviewer, 외부 규제·제조 권한 아님 | E1/E3 |
| Permissions | `localCommit: true`, `fulfillment: false`, `claimRestore: false` | local-only 경계 | E1/E3 |
| Customer-facing copy | `합성 release 검증으로 exact H01 batch의 로컬 선택만 복원했습니다. 철회 claim과 실제 판매·재고·fulfillment는 복원하지 않았습니다.` | exact match required | E1/E3 |
| Authority disclaimer | `experiment-approved-synthetic/not-external-authority` | actual authority unresolved | E1/E3 |
| 7-medium map | `moodboard, packaging, shop, merch, ooh, ads, web` | 순서·분모 `7/7` exact match required | E1/E3 |

`T0`는 [`hold-01-change-contract.md`](hold-01-change-contract.md)의 승인 필드가 동결된 시각이다. 문서 작성 시각이나 UI 배포 시각으로 추정하지 않는다.

## 5. Claim authority ledger

| Claim ID | 대상 | 표현 범위 | R3 상태 | 허용 행동 |
| --- | --- | --- | --- | --- |
| `CLAIM-CS03-RECOVERY-01` | `CS-03` | `피부 장벽 회복`, `장벽 복구`, `repair`, 동등한 효능 해석 | `unresolved / withdrawn-from-use` | 광고·추천·제품 설명·직원 안내·selection rationale에서 제거; working name `BARRIER`는 효능이 아닌 synthetic identity로만 표시 |
| `CLAIM-CS05-SPF-01` | `CS-05` | SPF/PA/UV 보호 수치·효능 | `unresolved / never-authorized` | 값 생성·추천 근거·야외 안전 안내 금지 |
| `CLAIM-CS07-REPAIR-01` | `CS-07` | 상처·손상 회복·치료 | `unresolved / never-authorized` | working name 외 효능 표현 금지 |
| `CLAIM-CS10-SCALP-01` | `CS-10` | 탈모·비듬·두피 치료 | `unresolved / never-authorized` | 사용 금지 |
| `CLAIM-CS11-PERFORMANCE-01` | `CS-11` | 발한 억제·지속 시간·냄새 제거 | `unresolved / never-authorized` | 사용 금지 |

그 밖의 제품도 성분·효능·저자극·피부과·알레르기·환경·재활용 claim authority가 모두 `unresolved`다.

## 6. Selection and availability contract

대표 웹 과업은 `decision.reserve@0.1.0`을 사용한다.

| 상태 | 필수 결과 |
| --- | --- |
| system suggestion | synthetic criteria와 한계를 표시하고 사용자 선택과 구분 |
| user draft | 제품 ID를 임시 후보로 보존; commit 아님 |
| affected `CS-03` batch | 선택·commit 차단, batch 범위와 확인/지원 경로 표시, 기존 입력 보존 |
| batch 없는 `CS-03` 제품 초안 | 제품 수준 local starter만 선택 가능; 판매·재고·fulfillment·특정 batch 상태를 암시하지 않음 |
| known-unaffected synthetic fixture | local selection 가능; 실제 안전·재고·판매 가능으로 표현하지 않음 |
| released H01 synthetic fixture | 완전 검증된 release Binding에서 exact H01의 local commit만 가능; U01·실제 판매·재고·fulfillment·claim 복원과 구분 |
| `CS-03` batch unknown | `영향 없음`으로 판정하지 않음; 확인 불가와 다음 안전한 synthetic support route 표시 |
| alternative | 영향받지 않았다는 이유만으로 적합하거나 안전하다고 추천하지 않음; 사용자가 비교·교체 |
| confirmed local outcome | 실제 구매·재고·안전 확인이 아닌 로컬 synthetic selection임을 표시 |
| retry | 입력과 마지막 안전한 맥락을 유지하고 중복 local record 방지 |
| reset | 로컬 selection만 제거; HOLD event·audit history는 삭제하지 않음 |

## 7. Cross-touchpoint truth contract

아래 필드는 적용 접점에서 같은 source value를 사용한다.

```text
product_id
working_name
form_status
binding_revision
catalog_state
claim_authority_state
market_state
availability_state
hold_event_id
affected_batch_id
batch_authority_state
release_event_id
release_effective_at
support_route_state
last_updated_at
```

- Packaging image나 generated asset의 가독 불가능한 label을 source data로 읽지 않는다.
- OOH·Digital ad는 제품 사실을 새로 쓰지 않고 Binding의 허용 claim만 참조한다.
- Staff/tester card는 별도 안전 판단을 만들지 않는다.
- QR은 단독 정보 경로가 아니며 동일 product/event ID의 사람 읽기 가능한 fallback이 필요하다.

## 8. Data retention and privacy ceiling

R3 contract는 실제 고객·주문·건강·피부 정보를 수집하지 않는다. 합성 batch lookup은 로컬 fixture 입력만 사용한다.

- 실제 주문번호, 연락처, 피부 상태, 증상, 사진, 위치 수집: `unresolved / prohibited-in-this-experiment`;
- 입력·draft·filter·검증 상태 보존: 내부 `cs-r3:ui:${composition}`, 고객 Web `cs-r3:commerce-ui:${composition}` tab-local `sessionStorage`에서만, Back·reload·pageshow 복구용이며 외부 전송 없음;
- shared Binding 전파: same-origin `cs-r3:binding:${composition}` `localStorage`에 authority가 검증된 HOLD 또는 release Binding만 직렬화한다. 고객 Web은 `storage` event와 `pageshow`에서 이를 소비하되 개인·주문 데이터는 저장하지 않는다;
- support escalation: 실제 채널은 `unresolved`; Preview에서 실재하는 고객센터처럼 표시 금지;
- 의료·안전 안내: 외부 권한 제공 전 생성 금지.

## 9. Release and rollback binding

HOLD 해제는 다음을 모두 요구한다.

1. 합성 release event `EVENT-RELEASE-01-CS03`의 명시적 생성;
2. exact product `CS-03`, batch `CS03-SYN-2608-H01`, scope, effective time, approver가 canonical record와 일치;
3. `permissions.localCommit = true`, `permissions.fulfillment = false`, `permissions.claimRestore = false` exact match;
4. customer-facing copy, unresolved authority disclaimer, 순서가 고정된 7-medium rollback impact map exact match;
5. `CLAIM-CS03-RECOVERY-01`은 별도 claim authority 없이 자동 복원하지 않음;
6. commit 복원 전에 `binding.common-surface.catalog.r3@0.2.0-release-verified-local-only`가 먼저 적용·공유됨.

Release event가 없거나 scope가 불명확하면 HOLD를 유지한다. 디자인 완성, 시간 경과, 판매 요청, 다른 제품의 정상 상태는 해제 근거가 아니다.

Runtime source는 각 catalog object에 `catalog_state`, `claim_authority_state`, `market`, `availability`, `last_updated_at`을 구조화해 보유한다. `CS-03` commit predicate는 `productId + batchStatus + Binding authority state`를 함께 평가한다. 내부 preview는 검증된 Binding을 revision-namespaced `localStorage`에 publish하고 고객 [`sample-commerce.html`](../sample-commerce.html)은 같은 key를 consume한다. malformed record는 release가 아니라 HOLD 유지로 처리한다.

Release 후 exact H01은 `batch_authority_state = released`이며 U01의 `unaffected`와 다르다. 허용 복원은 local selection/commit뿐이다. 실제 checkout, payment, inventory, fulfillment, safety 또는 철회 claim을 복원하지 않는다.

## 10. Revision chronology

- `0.1.1-experiment`: exact batch 분기를 보강했으나 독립 재평가에서 incomplete release authority, customer Web 미전파, H01/U01 상태 혼동, Back/reload retention 부재로 STOP.
- `0.2.0-experiment`: 위 semantic defect와 후속 async·write-failure·commit identity 결함을 수정. 독립 E3 hard gate PASS이나 `63/63 · REVISE`이며 E4·실제 상업 acceptance를 주장하지 않는다.

## 11. Open unresolved fields

- 실제 시장과 표시 기준;
- 실제 formulation, INCI, amount, price, manufacturer, lot, PAO, expiry;
- 실제 stock, order, payment, fulfillment, return, customer-support policy;
- 실제 claim substantiation, regulatory classification, safety action;
- 상표, 이미지, 모델, 폰트, 용기, 제품, 광고, 공간 권리;
- 실제 runtime, accessibility, vendor takedown, cache invalidation 증거.
