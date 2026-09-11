# COMMON SURFACE R3 — Composition Manifest

> **Composition ID:** `composition.common-surface.r3-hold-01`  
> **Version:** `0.2.0-experiment`  
> **Status:** `executed-experimental-composition / synthetic-prototype`  
> **Evidence:** 계약·ledger `E1`, R3 정적 투영·브라우저 캡처 `E2`, 로컬 affected/unknown/alternative/commit/rollback 상호작용 `E3`. 실제 매체·권리·대표 사용자·보조기술은 `E4 unresolved`.  
> **Authority ceiling:** 이 문서의 브랜드·제품·batch·운영 데이터는 `experiment-approved-synthetic` 또는 `unresolved`뿐이다. 실제 판매, 제조, 규제, 안전, 법무 승인을 의미하지 않는다.

## 1. 목적과 변경 단위

이 Manifest는 COMMON SURFACE R2의 시각·브랜드 기준선을 보존하면서 `HOLD / 01`을 독립된 R3 운영 변경으로 결합한다.

```text
composition.common-surface.r2
+ binding.common-surface.catalog.r3@0.2.0-experiment
+ migration.common-surface.identity-r2-to-r3@0.2.0-experiment
+ change.common-surface.hold-01@0.2.0-experiment
= composition.common-surface.r3-hold-01@0.2.0-experiment
```

`HOLD / 01`의 합성 사건은 `CS-03`의 특정 합성 batch에 대한 판매 보류와 근거 미확보 효능 표현의 철회다. 제품군이나 로고를 새로 디자인하는 작업이 아니라, 변경을 일곱 매체에 정확히 전파하고 고객 복구와 해제·rollback을 통제하는 실험이다.

## 2. 고정 입력

| 계층 | ID / version | 상태 | 역할 |
| --- | --- | --- | --- |
| UES | `0.5.0-draft` | experimental | 계층·의미·증거 경계 |
| Design Pack | `pack:industrial-swiss@1.0.0` | experimental | grid, type, material, component/state 표현 |
| UX Preset | `decision.reserve@0.1.0` | experimental | 대표 웹 선택 과업에만 적용 |
| Brand Experience | `brand-experience.common-surface@0.1.0-experiment` | experiment-approved-synthetic | 설명 우선, visible uncertainty, quiet control, recovery is care |
| Brand Source of Truth | `brand.common-surface.source-of-truth@0.1.0-synthetic-brief` | synthetic brief | 포지셔닝, 고객, 제품 역할, 캠페인, 콘텐츠·에셋·UX 운영 원장 |
| R2 Composition | `composition.common-surface.r2` | visual baseline | 현재 이름·로고 개념·제품 코드·매체 문법 |
| R3 Catalog Binding | `binding.common-surface.catalog.r3@0.2.0-experiment` | E1 | 제품·batch·claim·availability와 local-only release의 합성 source of truth |
| Identity migration | `migration.common-surface.identity-r2-to-r3@0.2.0-experiment` | E1 | R2 identity 보존 및 HOLD/release 상태 token alias 추가 |
| Change contract | `change.common-surface.hold-01@0.2.0-experiment` | E1 | 활성화·전파·검증·local-only 해제·rollback |

### Source register

| Source | 사용 범위 | Evidence |
| --- | --- | --- |
| `../../artifacts/common-surface-commercial-r2.md` | R2 브랜드·제품·컴포넌트·매체 기준선 | `E1` |
| `../../artifacts/preview.html` | R2 웹 시각·로컬 선택 참조 | `E2` 정적 렌더/상호작용 기록; R3 증거 아님 |
| `../../artifacts/logo-system-r2.html` | R2 logo family와 응용 참조 | `E2` 정적 렌더; 생산 proof 아님 |
| `../../fixtures/common-surface-fixture.md` | Brand Experience, 35개 medium check, BI-01–08 | `E1` |
| `../../../../design-packs/industrial-swiss-system/industrial-swiss-system.md` | Pack contract | `E1` |
| `../../../../ux-presets/decision.reserve.md` | 대표 selection contract | `E1` |

## 3. Composition 경계

### 이 Composition이 소유하는 것

- COMMON SURFACE에만 적용되는 제품 코드·콘텐츠 mapping;
- HOLD 상태의 브랜드 voice와 cross-touchpoint 표현;
- R2 identity를 유지한 상태 component·campaign suppression·대체 경로 규칙;
- 일곱 매체의 영향·증거·version 연결;
- HOLD 활성화, 해제, rollback에 따른 Composition revision 기록.

### 이 Composition이 소유하지 않는 것

- 화장품 성분, 효능, 안전, 제조, 실제 batch 또는 규제 판단;
- 실제 판매·재고·결제·반품·배송·상담 정책;
- 법적 recall 등급, 고객 위험 판단 또는 의료 조언;
- Pack의 canonical raw token과 공통 UX Preset의 의미;
- 실제 인쇄·원단·간판·광고 vendor의 생산 승인;
- 상표, 도메인, 폰트, 이미지, 모델, 제품·용기 권리.

## 4. R3 불변조건

| ID | 불변조건 | 위반 시 |
| --- | --- | --- |
| `R3-BI-01` | `COMMON SURFACE` 이름과 현재 R2 logo concept·SVG family를 유지한다. | P1 |
| `R3-BI-02` | `CS-01–CS-11`과 `OBJ-06`의 stable ID를 삭제·재사용·재번호화하지 않는다. | P1 |
| `R3-BI-03` | Industrial Swiss의 grid-first, hard utility, material honesty, bounded signal을 유지한다. | P2; 의미 손실 동반 시 P1 |
| `R3-BI-04` | all-gender 언어와 탐색을 유지하며 성별로 제품·위험·추천을 추정하지 않는다. | P1 |
| `R3-BI-05` | 제품·batch·claim·availability 상태는 Catalog Binding과 모든 적용 접점에서 동일하다. | P0/P1 |
| `R3-BI-06` | 판매 보류·선택·추천·commit·confirmed outcome을 서로 다른 상태로 표현한다. | P1 |
| `R3-BI-07` | HOLD와 오류·제한은 색만으로 전달하지 않는다. | P1 |
| `R3-BI-08` | 근거 미확보 claim은 persuasion, eligibility, recommendation, commitment 근거로 사용하지 않는다. | P0/P1 |
| `R3-BI-09` | 영향받지 않은 제품은 HOLD처럼 보이거나 불필요하게 차단되지 않는다. | P1 |
| `R3-BI-10` | 입력·선택·제품 맥락을 안전하게 보존하고 확인·대체·지원 경로를 제공한다. | P1 |
| `R3-BI-11` | 합성 사건과 실제 시장·안전 사실을 혼동하지 않는다. | P0 |
| `R3-BI-12` | 해제는 명시적 release authority 없이 시간 경과·추정·디자인 판단으로 수행하지 않는다. | P0 |
| `R3-BI-13` | release record는 event·product·batch·scope·effective time·approver·permissions·customer copy·authority disclaimer·7-medium map을 모두 exact 검증한다. | P0 |
| `R3-BI-14` | 내부 preview와 고객 Web은 같은 revision-namespaced `localStorage` Product Binding을 소비하며, 서로 다른 HOLD/release 상태로 남지 않는다. | P1 |
| `R3-BI-15` | 해제된 H01의 상태 `released`와 비영향 QA fixture U01의 상태 `unaffected`를 합치지 않는다. | P1 |
| `R3-BI-16` | Back·reload·pageshow 뒤에도 유효한 synthetic draft·filter·batch input·검증 상태는 tab-local `sessionStorage`에서 복원한다. | P1 |

기존 fixture의 `BI-01–08`도 계속 적용한다. 충돌 시 더 엄격하고 구체적인 R3 불변조건을 사용하되 상위 계층 의미를 약화할 수 없다.

## 5. 적용 매체와 35개 check

일곱 매체와 각 5개 check의 분모 `35`를 동결한다. 세부 판정은 [`hold-01-change-contract.md`](hold-01-change-contract.md)에 있다.

| Medium | Check IDs | HOLD / 01 적용 |
| --- | --- | --- |
| Moodboard / guidance | `MB-01–05` | crisis/hold 표현 원칙, anti-moodboard, 권리·증거 경계 |
| Packaging | `PKG-01–05` | affected batch 식별, 기존 포장 한계, insert/지원 경로, 생산 격리 |
| Offline shop | `SHOP-01–05` | 선반·tester 격리, 직원 안내, 지원·대체 경로 |
| T-shirt / merch | `MERCH-01–05` | CS-03 claim 사용 금지, shared commerce/checkout parity, preserve 판단 |
| OOH | `OOH-01–05` | CS-03 creative 중지·교체, false reassurance 금지, vendor proof gap |
| Digital ads | `ADS-01–05` | pause/replace, destination parity, cache/version 증거 |
| Commerce / Reserve web | `WEB-01–05` | affected selection 차단, batch/help 확인, context retention, recovery |

`not-applicable`로 사후 분모를 줄이지 않는다. 직접 변경이 필요 없는 매체도 `preserve`, `suppress`, `replace`, `route` 중 하나의 결정과 증거를 남긴다.

## 6. 계층별 소유권

| 결정 | 소유 계층 | R3 규칙 |
| --- | --- | --- |
| 영향 제품·batch·상태 | Product Binding / synthetic authority fixture | Composition이 임의 확대·축소 금지 |
| claim 철회 범위 | Product Binding / content authority | working name과 효능 claim을 분리 |
| hold voice·설명·지원 tone | Brand Experience / Composition | 공포·수치심·거짓 안심 금지 |
| unavailable candidate·대체·retry | UX Preset + Product Binding | 추천과 사용자 선택·결과 구분 |
| alert·badge·disabled·focus 표현 | Design Pack mapping | Pack canonical token 의미 변경 금지 |
| 인쇄·공간·광고·화면 변환 | Medium / Projection | 거리·크기·설치·cache·vendor 한계 기록 |
| 실제 주문·inventory·batch lookup | Implementation / external system | R3 MD·Preview로 작동 주장 금지 |

## 7. Authority와 evidence vocabulary

### Authority state

| 값 | R3 사용 |
| --- | --- |
| `experiment-approved-synthetic` | 합성 제품 ID, 합성 batch ID, 합성 HOLD event, 실험용 copy·SLA |
| `unresolved` | 실제 제품 사실, 실제 시장·규제·법무·제조·고객·안전·권리 |

R3 계약에는 `externally-authorized`, `approved`, `safe`, `recalled`, `clinically proven`을 실제 상태로 기록하지 않는다.

### Evidence level

| Level | 허용 주장 |
| --- | --- |
| `E1` | Markdown 계약·impact map·scorecard 추적 |
| `E2` | R3 동일 상태의 정적 렌더·캡처·전후 비교 |
| `E3` | 반복 가능한 인터랙션·mock authority·cache/propagation 테스트 |
| `E4` | 실제 매체·보조기술·대표 사용자·외부 권한 증거 |

현재 R3는 계약 `E1`, 신규 렌더 `E2`, 로컬 합성 웹 상호작용 `E3`까지 가진다. R2 렌더를 R3 증거로 승계하지 않았고, 실제 매체·권리·대표 사용자·보조기술은 `E4 unresolved`다.

## 8. 필수 R3 산출물

- 이 Composition Manifest;
- [`product-binding-catalog.md`](product-binding-catalog.md);
- [`identity-token-migration.md`](identity-token-migration.md);
- [`hold-01-change-contract.md`](hold-01-change-contract.md);
- [`../evidence/02-medium-35-checks.md`](../evidence/02-medium-35-checks.md)의 7-medium impact evidence;
- HOLD 활성화·해제·rollback decision log;
- 35-check 결과와 P0–P3 ledger;
- R2 → R3 전후 diff, stale reference audit, 링크·asset audit.

## 9. Revision과 평가 연대기

| Revision | 의미 변경 | 독립 평가 상태 |
| --- | --- | --- |
| `0.1.0-experiment` | 초기 HOLD / 01 합성 계약 | 역사 snapshot |
| `0.1.1-experiment` | exact H01/U01/unknown 분기와 baseline hidden/alt 왕복 보강 | 독립 재평가에서 R3-A `63/100`, R3-B `60/100`, P0/P1 open으로 **STOP**. 결과를 덮어쓰지 않는다. |
| `0.2.0-experiment` | release authority 완전 검증, 양방향 verified Binding, `released`/`unaffected` 분리, async settlement, batch-aware record, Back/reload retention | 독립 E3 P0/P1 `0/0`, hard gate PASS. R3-A/B `63/63`, Stage `REVISE`; E4·상업 증거 미충족. |

0.1.1의 STOP 판정과 근거는 [`../evidence/07-independent-review.md`](../evidence/07-independent-review.md)에 보존한다. 0.2.0은 이를 소급 수정하지 않는 새 semantic revision이다.

## 10. Freeze와 변경 규칙

다음 값은 HOLD / 01 평가가 끝날 때까지 고정한다.

- Composition, Binding, migration, change contract의 ID와 `0.2.0-experiment` version;
- `CS03-SYN-2608-H01` 합성 batch scope;
- `CLAIM-CS03-RECOVERY-01` 철회 대상;
- 12개 catalog object의 stable ID;
- 7개 medium / 35개 check 분모;
- SLA clock의 `T0` 정의;
- P0/P1 정의와 pass threshold.

실험 중 요구가 바뀌면 기존 결과를 덮어쓰지 않고 `0.2.0-experiment` 이상의 새 revision을 만든다. 오탈자·링크 정정만 의미 변경 없는 patch로 허용한다.

## 11. Completion ceiling

현재 기록된 허용 주장은 `R3 0.2.0 qa=029 · independent local E3 hard gate PASS · P0/P1 0/0 · R3-A/B 63/63 · Stage REVISE · 조건부 유효 · C2`다. 근거는 [`../evidence/07-independent-review.md`](../evidence/07-independent-review.md) §11의 **2026-08-26 20:28 KST** 독립 재평가다. 이는 해당 snapshot의 기록이며, 2026-09-11 문서 정정을 새 runtime 재검증으로 세지 않는다. 같은 `0.2.0`의 감사 중 의미 변경·증거 분모 drift와 전체 recovery suite 미완결은 남아 있고, `0.1.1`의 STOP도 역사 판정으로 보존한다.

release는 exact H01의 **로컬 commit만** 복원하며 claim·실제 판매·재고·fulfillment를 복원하지 않는다. [사용자 평가](../evidence/08-user-evaluation.md)는 계속 대기다. 실제 제품 HOLD, 고객 통지, 안전, recall, 광고 철회, 전체 접근성 또는 실제 rollback 성공은 E4 증거 없이 완료로 표기하지 않는다. 상세 gap은 [`../evidence/05-rights-production-gaps.md`](../evidence/05-rights-production-gaps.md)와 독립 검토 §11.6–11.8에 있다.
