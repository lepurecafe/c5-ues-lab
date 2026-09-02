# R3 시각 충실도 ledger

> **비교 대상:** 승인된 image concept 4종 ↔ 브라우저 렌더  
> **목표:** pixel copy가 아니라, 디자인 시스템의 시각·정보·상태 의도를 유지하면서 구현 가능한 구조로 번역

## 비교

| # | 비교 항목 | Concept의 핵심 | 구현 결과 | 판정·의도적 차이 |
| --- | --- | --- | --- | --- |
| 1 | Identity/header | C/S symbol, COMMON SURFACE lockup, hard-grid utility nav | path 기반 symbol/wordmark/lockup, 고정 utility header | HIGH. concept의 생성 로고를 master로 복사하지 않고 path family로 정규화 |
| 2 | 운영 hero | warm paper, black type, bounded red, hold object scene, mode control | 동일 색·type·grid, baseline/HOLD 직접 전환, 정확한 event/batch | HIGH. concept의 임의 version/date는 frozen contract ID/T0로 교체 |
| 3 | Reserve state lab | catalog, hold, verification, recovery를 한 화면에 밀도 있게 표현 | 12-product catalog, product-level/unverified·affected·unknown·known-unaffected, idempotency, Binding-first 7/7 rollback | HIGH. 구현에서는 상태를 장식이 아니라 실제 버튼·입력·live status로 전환 |
| 4 | 7매체 board | 7개의 독립 투영과 evidence rail | Moodboard/Packaging/Shop/Merch/OOH/Ads/Web를 각기 다른 구조·비율·행동으로 구현 | HIGH. 한 이미지 crop 반복을 피하고 sample-frame 한계를 노출 |
| 5 | 고객 hero | 제품군·실제 피부·제품 탐색이 한 첫 화면에서 같은 브랜드로 보임 | 제품 still + 실제 피부 편집 이미지 + 두 CTA + HOLD notice | HIGH. 권한 없는 가격·재고·효능 copy는 제거 |
| 6 | 고객 routine | 4-step catalog, affected CS-03, object/merch 확장 | CS-01–04와 OBJ-06/merch를 별도 정보 구조로 구현 | MEDIUM-HIGH. concept의 추가 towel/tumbler SKU는 Binding에 없어 발명하지 않음 |
| 7 | 고객 decision flow | system suggestion→draft→commit→result→alternative | 실제 local state와 disabled/alternative/reset/help/batch lookup | HIGH. 실제 구매처럼 보이는 결과를 만들지 않음 |
| 8 | responsive | concept는 desktop 중심 | 1440×1000과 390×844에서 재배치, overflow 0 | HIGH. mobile에서는 sticky header를 static으로 바꾸고 utility를 두 줄로 유지 |

## Copy diff

| Concept 표현 | 구현 표현 | 이유 |
| --- | --- | --- |
| 합성 배치 보류 중 | `CS-03 전체가 아닌 exact 합성 batch CS03-SYN-2608-H01만 HOLD` | 제품 수준 차단과 exact batch 차단을 구별 |
| 대안 유지 | `다른 제품 보기`, 자동 추천 아님 | 상태가 아니라 사용자가 실행할 수 있는 행동으로 전환 |
| 로컬 확인 결과 | `LOCAL RESULT / NOT COMMERCE` | 구매·재고·안전 결과로 오인 방지 |
| 배치 확인 | `batch 확인 · 실제 안전 판정이 아닙니다` | unknown과 false clearance 방지 |
| 일반 제품·효능 copy | 작업명·역할은 합성, 성분·효능 미확정 | Product Binding authority와 일치 |

## 시각 검토 결과

- 대형 영문 display는 상업적인 editorial/industrial 인상을 유지한다.
- 한글은 영문 condensed imitation을 강제하지 않고 별도 bold sans rhythm으로 처리했다.
- red는 HOLD와 primary action의 bounded signal이며 전체 화면 공포 연출로 확대하지 않았다.
- blue는 brand field와 user draft를 구분하지만 모든 상태는 텍스트·경계·행동과 중복 표현한다.
- 사람 이미지는 성별·연령·장소를 다양화하고 피부 보정·before/after·의료 연출을 피한다.

## 확인한 이미지

- [`../concepts/01-r3-operational-preview-concept.png`](../concepts/01-r3-operational-preview-concept.png)
- [`../concepts/04-customer-commerce-website-concept.png`](../concepts/04-customer-commerce-website-concept.png)
- [`screenshots/r3-preview-desktop.png`](screenshots/r3-preview-desktop.png)
- [`screenshots/r3-reserve-hold-desktop.png`](screenshots/r3-reserve-hold-desktop.png)
- [`screenshots/r3-reserve-exact-batch-desktop.png`](screenshots/r3-reserve-exact-batch-desktop.png)
- [`screenshots/sample-commerce-final-desktop-top.png`](screenshots/sample-commerce-final-desktop-top.png)
- [`screenshots/sample-commerce-final-exact-hold-desktop.png`](screenshots/sample-commerce-final-exact-hold-desktop.png)
- [`screenshots/sample-commerce-final-exact-hold-mobile.png`](screenshots/sample-commerce-final-exact-hold-mobile.png)
- [`screenshots/sample-commerce-020-hold-desktop-1440x1000.png`](screenshots/sample-commerce-020-hold-desktop-1440x1000.png)
- [`screenshots/sample-commerce-026-hold-notice-mobile-390x844.png`](screenshots/sample-commerce-026-hold-notice-mobile-390x844.png)
- [`screenshots/sample-commerce-020-release-desktop-1440x1000.png`](screenshots/sample-commerce-020-release-desktop-1440x1000.png)
- [`screenshots/sample-commerce-026-release-notice-mobile-390x844.png`](screenshots/sample-commerce-026-release-notice-mobile-390x844.png)
- [`screenshots/r3-020-release-reserve-desktop-1440x1000.png`](screenshots/r3-020-release-reserve-desktop-1440x1000.png)
- [`screenshots/r3-020-release-controls-desktop-1440x1000.png`](screenshots/r3-020-release-controls-desktop-1440x1000.png)

기존 `sample-commerce-020-*-mobile-390x844.png` 두 장은 상태 고지가 보이지 않고 byte-identical이어서 비교 증거에서 제외했다. 위 `026-*-notice-mobile` 두 장은 같은 scroll 위치에서 HOLD와 release 고지를 직접 담았고 SHA-256가 서로 다르다.

## 남은 시각 gap

- 실제 font license와 production font rendering은 미검증이다.
- 물리 패키지, 간판, 옥외광고의 실물 거리·재료·출력 proof는 없다.
- 200% 확대와 screen reader 상태를 브라우저 캡처로 검증하지 못했다.
- 고객 사이트는 실제 재고·가격·checkout을 의도적으로 포함하지 않는다. 이는 결함이 아니라 현재 authority ceiling이다.

## `0.2.0` 상태·복구 fidelity addendum

시각 방향은 변경하지 않았다. 이번 tranche는 concept의 “상태가 장식이 아니라 운영 가능한 결정 구조여야 한다”는 의도를 두 Web surface의 실제 전이와 복구에 더 충실하게 번역했는지를 기록한다.

| 비교 항목 | 이전 누수 | `0.2.0` 구현 | fidelity 판정 |
| --- | --- | --- | --- |
| Release authority | 완전하지 않은 record도 release로 오인 가능 | claim decision·세 permission leaf를 포함한 필수 13개 축을 exact 비교, malformed `13/13` 거부와 HOLD 유지 | HIGH at local E3 |
| Web projection | 내부 ledger의 Web과 고객 사이트가 별도 상태 | shared Product Binding revision을 고객 Web이 자동 소비 | HIGH at same-origin E3 |
| Batch semantics | released H01과 unaffected U01 혼동 가능 | H01=`released/local-only`, U01=`unaffected`; 서로 다른 문구·결정·기록 | HIGH |
| Reapply | 내부 HOLD만 되돌아갈 수 있음 | HOLD Binding 재발행 시 고객 Web도 자동 복귀 | HIGH at local E3 |
| Context recovery | 현재 session 안의 retry만 보존 | 내부와 고객 Web에서 draft·input·차단·Binding을 reload+Back 뒤 재생성 | HIGH; 저장 HTML이 아닌 canonical copy로 정규화 |

이 보강은 레이아웃을 더 화려하게 만들기 위한 변경이 아니다. 동일 red/blue/paper·hard-grid·calm incident voice 안에서 authority와 상태 차이를 더 정확히 보이게 한다. 실제 다른 기기·브라우저 간 동기화, backend, 물리 매체, vendor cache와 screen reader fidelity는 여전히 검증하지 않았다.
