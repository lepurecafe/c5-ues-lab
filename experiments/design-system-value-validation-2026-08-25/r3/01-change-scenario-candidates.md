# R3 통제 변경 시나리오 후보

> **선택 전 상태:** 미동결  
> **공통 전제:** R3-A에서 기존 P1 결함을 정상화한 뒤 하나의 시나리오만 R3-B에 적용한다.  
> **금지:** 시나리오 결과를 본 뒤 변경 요구·불변조건·분모를 축소하지 않는다.

## 선택 원칙

좋은 R3 변경은 로고 색이나 제품 하나를 바꾸는 요청이 아니다. 하나의 권한 있는 변경이 Product Binding, Brand Experience, UX Preset, Design Pack, Composition, Medium, Projection에 올바르게 분배되고, 물리·디지털 접점에서 같은 결과를 만드는지 시험해야 한다.

## 후보 비교

| 후보 | 현재 시스템 활용 | 전파·rollback 검증 | 상업적 관련성 | 새 정책 발명 위험 | 첫 R3 적합성 |
| --- | ---: | ---: | ---: | ---: | ---: |
| `HOLD / 01` | 5/5 | 5/5 | 5/5 | 2/5 | **5/5** |
| `LAUNCH / KR-01` | 4/5 | 4/5 | 5/5 | 4/5 | 4/5 |
| `CYCLE / 01` | 5/5 | 5/5 | 4/5 | 5/5 | 3/5 |

`새 정책 발명 위험`은 높을수록 R3 결과가 기존 시스템 능력보다 새 정책 설계 능력에 좌우된다는 뜻이다.

## 후보 1 — `HOLD / 01` · 추천

### 변경 요청

외부 품질 권한자가 `CS-03`의 특정 synthetic batch를 예방적 판매 보류로 지정하고, `BARRIER`와 `REPAIR` 표현 중 효능으로 오해될 수 있는 문구를 근거 확보 전 철회한다. 영향 제품의 선택·광고·판매를 중단하면서 영향받지 않은 제품은 정상 운영한다. 사용자는 batch 확인, 대안 탐색, 반품·지원 경로를 이용할 수 있어야 하며, 해제 시 rollback할 수 있어야 한다.

이 시나리오는 실제 안전 판정을 만들지 않는다. 영향 batch, 조치, 문구, 종료 조건은 `experiment-approved-synthetic` 변경 fixture로만 동결한다.

### 사업·사용자 이유

- 잘못된 claim과 판매 가능 상태를 빠르게 제거해야 한다.
- 사용자는 공포를 조장하지 않는 명확한 상태, 자신이 영향받는지 확인하는 경로, 다음 안전 행동이 필요하다.
- 브랜드는 한 제품의 hold가 전체 브랜드·제품군의 붕괴로 번지지 않게 해야 한다.

### 시스템 계층

| 계층 | 책임 |
| --- | --- |
| Product Binding / 외부 권한 fixture | 영향 batch, 제품 상태, commit 차단, 대체 가능 조건, 종료 시점 |
| Brand Experience | calm status, visible uncertainty, recovery is care, 비의료적 안내 |
| UX Preset | Reserve의 unavailable candidate, alternative, retained context, retry, confirmed outcome |
| Design Pack | status·disabled·focus·recovery의 비색상 표현 capability |
| Composition | claim 철회 카피와 브랜드 메시지의 우선순위 |
| Medium / Projection | 패키지 insert, 선반·테스터, 광고 중지, 웹 cache, 직원 도구, 지원 경로 |
| Governance | 변경·승인·전파·해제 시각, rollback, stale audit |

### 보존 불변조건

- all-gender·비진단·비수치심 원칙
- `COMMON SURFACE`, 제품 코드, Industrial Swiss grid·material honesty
- 추천·사용자 선택·판매 가능·commit·confirmed outcome 구분
- 상태를 적색이나 이미지 하나로만 전달하지 않음
- 영향받지 않은 제품의 사실·선택 가능 상태 보존
- 미확정 정보를 의료·안전 사실로 확대하지 않음
- 물리·디지털에서 같은 product/batch/status ID 사용

### 영향 접점

- canonical catalog와 claim ledger
- 제품 카드·PDP·Reserve flow
- 패키지 insert·배송 hold
- 매장 선반·테스터·직원 안내
- OOH·디지털 광고·캠페인 목적지
- batch lookup·반품·지원·상태 해제

### 성공 기준

- 영향 제품이 모든 commit 경로에서 차단됨
- 영향받지 않은 제품은 정상 경로 유지
- 철회 claim 잔존 0건
- batch를 확인할 수 없을 때 거짓 판정 대신 지원 경로 제공
- unavailable → alternative/retry/help에서 입력과 맥락 보존
- stale-state SLA 안에서 7개 매체 전파 완료
- 해제 시 안전한 rollback과 감사 로그 재현
- 사용자에게 상태·원인·영향·다음 행동이 색 외 단서로 전달

### 주요 위험

- 적색과 경고 표현 남용
- 디자인이 법무·의료 권한을 침범
- 인쇄물·cache·매장 signage에 stale claim 잔존
- 대체 추천이 새로운 효능 claim으로 변질
- batch lookup에서 불필요한 개인정보 수집

### 추천 이유

현재 시스템의 핵심인 변경 전파, 상태·복구, 권한 경계, 불변조건, rollback을 모두 사용한다. 동시에 완전히 새로운 UX Preset이나 상업 정책을 먼저 설계할 필요가 가장 적다.

## 후보 2 — `LAUNCH / KR-01`

### 변경 요청

`CS-01–04`를 한국 시장 출시 후보로 전환한다. 제품명·용량·전성분·사용법·주의·제조 책임·claim을 권한 상태와 연결하고, 승인되지 않은 항목은 패키지·추천·광고에서 노출 또는 의사결정 근거로 사용할 수 없게 한다. `CS-05`의 SPF 관련 표현은 외부 권한 전까지 출시 범위에서 제외한다.

실제 규제 승인이나 상업 사실을 발명하지 않는다. 이번 실험에서는 권한 상태와 콘텐츠 슬롯의 동작만 synthetic fixture로 검증한다.

### 시스템 계층

- Product Binding: 제품 사실, claim, 시장, 유효기간, eligibility
- Brand Experience: 설명 우선, visible uncertainty, 언어 동등성
- Composition: KR/EN 정보 위계와 campaign copy
- Medium: 패키지 안전 영역, 선반, 광고, OOH, web
- Design Pack: 정보 밀도와 status 표현

### 보존 불변조건

- 제품 코드와 비성별 탐색
- Industrial Swiss hard utility와 material honesty
- 승인 사실과 실험용 사실의 명확한 구분
- fact before persuasion
- 패키지·선반·웹·광고 목적지의 동일 사실

### 성공 기준

- 모든 claim·제품 사실에 stable ID, 권한자, 시장, 상태, 갱신일 존재
- 승인되지 않은 claim 노출 0건
- product-fact parity 100%
- 제외 제품이 추천·commit 근거로 사용되지 않음
- KR/EN 긴 정보가 실제 sample frame에서 위계·가독성 유지
- 시장 출시 증거와 synthetic fixture를 혼동하지 않음

### 주요 위험

- 가상 권한을 실제 규제 승인처럼 표현
- 필수 정보 증가로 브랜드 위계 붕괴
- 시장별 차이를 공통 Pack 규칙으로 잘못 승격
- 제품 작업명이 효능 claim처럼 작동

### 실험 가치

상업 준비도와 claim governance를 직접 시험한다. 다만 외부 규제·제품 정보가 없는 상태에서는 실제 출시 가능성보다 권한 모델의 구조만 검증할 수 있다.

## 후보 3 — `CYCLE / 01`

### 변경 요청

COMMON SURFACE를 일회 구매에서 용기 회수·검수·리필·보증금 반환이 이어지는 순환 서비스로 확장한다.

```text
eligible
→ received
→ inspection
→ accepted / damaged / contaminated / unknown
→ refill-ready
→ completed / refund-pending / failed
```

### 시스템 계층

- Product Binding: 대상 용기, 위생·검수, 보증금, 재고, 환불, 개인정보
- Brand Experience: 비난 없는 거절, material honesty, calm recovery
- UX Preset: Reserve 외 lifecycle preset 필요 여부
- Medium: 내구 라벨, return station, 운송, 스캔·문자 fallback
- Design Pack: 단계·상태·경고·결과 표현

### 보존 불변조건

- 동일 제품·용기 ID
- 근거 없는 환경 claim 금지
- product fact와 service status의 전 접점 일치
- 맥락 보존과 비난 없는 복구
- QR·색·앱만 의존하지 않는 대안 경로

### 성공 기준

- 용기 ID와 상태가 매장·웹·라벨에서 100% 일치
- 손상·오염·미등록·품절·환불 지연의 복구 경로 존재
- 중복 접수·중복 환불 방지
- QR 실패 시 문자 코드와 직원 지원 경로 제공
- 실제 근거 없이 `sustainable`, `zero waste`, `recycled`를 사용하지 않음
- 기존 Preset이 감당하지 못하는 의미가 정확한 gap으로 귀속됨

### 주요 위험

- greenwashing과 위생·안전 정책의 임의 결정
- 현재 UX Preset 범위를 넘어서는 lifecycle
- 보증금·주문 정보로 개인정보 범위 확대
- 예외 상태가 브랜드의 단순성을 훼손

### 실험 가치

시스템 확장성과 Preset 경계를 가장 강하게 시험한다. 그러나 변경 자체가 새 제품·서비스 설계 프로젝트에 가까워 첫 R3에서 기존 시스템의 효과와 신규 정책 설계 비용이 섞일 위험이 크다.

## 추천 결정

첫 R3는 `HOLD / 01`을 권장한다.

권장 순서는 다음과 같다.

```text
R3-A 기준선 정상화
→ R3-B HOLD / 01
→ 후속 LAUNCH / KR-01
→ 후속 CYCLE / 01
```

이 순서는 변경 관리 → 상업 사실성 → 서비스 확장성을 단계적으로 검증한다.
