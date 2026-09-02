# COMMON SURFACE R3 사전 평가 계약

> **상태:** `0.2.0` 평가 동결본 · 시나리오 `HOLD / 01` 선택 이전 기준 · 독립 E3 재평가에 사용  
> **목적:** 결과를 본 뒤 점수와 기준을 바꾸는 일을 막고, 객관적 측정과 사용자 정성 평가를 분리한다.

## 1. 판정 단위

R3는 두 번 판정한다.

| 단계 | 질문 | 출구 조건 |
| --- | --- | --- |
| R3-A 정상화 | 결함 있는 기준선을 변경 실험 가능한 상태로 회복했는가 | hard gate 통과, Stage `≥80`, 모든 활성 Core anchor `≥3`, E2 이상 |
| R3-B 변경 실험 | 선택된 변경을 일관되게 전파하고 불변조건을 유지했는가 | Stage `≥90`, P0/P1 0, 모든 활성 Core anchor `≥3`, E2 이상, C2 목표 |

R3-A만 통과하면 “기준선 정상화 성공”이다. 유지보수 가치의 입증은 R3-B까지 통과해야 한다.

## 2. 평가자와 점수 처리

1. Builder가 먼저 증거 링크와 함께 점수를 기록한다.
2. 독립 read-only reviewer가 같은 frozen rubric으로 점수를 기록한다.
3. 한 항목에서 2 anchor 이상 차이가 나면 합의 전 낮은 점수를 적용한다.
4. 사용자는 별도 정성 평가를 기록한다. 사용자 평가를 builder 점수에 산술 혼합하지 않는다.
5. 사용자 정성 평가가 `8/10` 미만이면 시스템 점수가 90 이상이어도 “사용자 체감 9/10”이라고 표현하지 않는다.

## 3. Hard gate

다음 중 하나라도 열려 있으면 `STOP`이다.

- P0/P1 결함
- Product Binding 사실과 표현 간 충돌
- 추천·draft·commit·confirmed outcome 혼동
- 영향 제품의 commit 경로가 하나라도 열려 있음
- 필수 recovery 또는 rollback 부재
- 권리·실데이터·규제·접근성·런타임의 거짓 완료 주장
- 필수 매체에 변경 누락 또는 product/status ID 불일치
- unresolved claim·asset이 externally-authorized처럼 사용됨
- 실제 proof 없이 production-ready 선언

## 4. 공식 100점 평가

기존 공통 평가 프레임의 배점과 0–4 anchor를 그대로 사용한다.

| ID | 항목 | 배점 |
| --- | --- | ---: |
| B1 | 브랜드 철학·대상·Brand Experience 불변조건 | 16 |
| B2 | 제품·컴포넌트·접점 정보 구조 | 12 |
| B3 | 계층 귀속·변경 추적성 | 12 |
| B4 | 포용성·접근성·신뢰·권리·claim | 12 |
| B5 | 명칭·버전·자산·참조 일관성 | 8 |
| M1 | 브랜드·Brand UX 연속성과 의도적 진화 | 12 |
| M2 | 다중 매체 영향 식별과 전파 | 12 |
| M3 | 접점 여정·제품 사실·상태·복구 | 8 |
| M4 | claim·권리·접근성·생산 증거 | 4 |
| M5 | 사람 수정 부담과 귀속 | 4 |

점수 anchor:

- `0`: 없음 또는 상위 계약과 모순
- `1`: 언급·모양만 있고 실행 불가
- `2`: 정상 경로는 있으나 중요한 상태·증거 공백
- `3`: 선언 범위를 충족하고 검증 가능하며 사소한 gap만 존재
- `4`: 반복 가능한 증거가 연결되고 중요한 미해결 결함 없음

## 5. R3-A 정상화 지표

| 지표 | 분모 동결 방법 | 목표 |
| --- | --- | ---: |
| Manifest completeness | Pack/Binding/Preset/Brand Experience/Composition/Medium/Projection/Asset 필수 항목 | 100% |
| Existing P1 closure | R2-P1-01–03 | 100% |
| Catalog parity | frozen product/object ID와 정본·파생물 적용 항목 | 100% |
| Token migration | r1/r2 token 사용 인스턴스와 alias/deprecation 등록 | 100% |
| Logo master concordance | 적용 로고 중 master geometry·mode·minimum 규칙 통과 | 100% |
| Reserve state coverage | 적용 상태와 retention/recovery test | 100% |
| R2/R3 version purity | 현재 정본이 현재 revision 파생물만 active로 참조 | 100% |
| Asset registry coverage | 실제 사용 asset의 ID/hash/dimensions/source/authority/usage/revision | 100% |

## 6. R3-B 변경 지표

시나리오 선택 직후 impact map의 분자를 채우기 전에 정확한 분모를 동결한다.

| 지표 | 산식 | 목표 |
| --- | --- | ---: |
| Change Requirement Completion | 완료된 동결 요구 ÷ 전체 동결 요구 | 100% |
| Change Propagation Rate | 검증된 영향 셀 ÷ 사전 등록 영향 셀 | `≥95%` |
| Cross-medium Propagation | 검증된 매체 영향 셀 ÷ 사전 등록 매체 영향 셀 | `≥95%` |
| Invariant Preservation | 보존된 BI/BX/UX ÷ 적용 BI/BX/UX | `≥95%` |
| Product-fact Parity | 일치한 동일 사실 ÷ 적용 동일 사실 | `100%` |
| Claim Traceability | ID·권한·상태·시장·갱신이 연결된 claim ÷ 제시 claim | `100%` |
| State/Recovery Coverage | 구현·검증한 적용 상태 ÷ 선택 시나리오 필수 상태 | `100%` |
| Registered Component Reuse | 등록 컴포넌트 인스턴스 ÷ 재사용 가능 인스턴스 | `≥90%` |
| Unregistered Override Rate | 정본 밖 override ÷ 전체 적용 인스턴스 | `≤5%` |
| Attribution Rate | 한 계층에 명확히 귀속된 수정 ÷ 전체 수정 | `≥95%` |
| Semantic Regression Rate | P1/P2 의미 회귀 ÷ 검증 의미 항목 | `0% / ≤5%` |
| Evidence Coverage | 증거가 연결된 평가 항목 ÷ 전체 적용 평가 항목 | `100%` |

## 7. 매체별 객관 검증

기존 `MB/PKG/SHOP/MERCH/OOH/ADS/WEB-01–05` 35개 check를 유지한다.

- 각 매체 `4/5`, 즉 `80%` 이상
- 한 매체라도 `70%` 미만이면 `REVISE`
- 한 매체라도 hard gate 위반이면 `STOP`
- 같은 이미지를 비율만 바꾼 것은 medium propagation으로 인정하지 않음
- packaging·merch·OOH·signage는 실제 생산 proof가 아니라 sample-frame evidence로 표시

## 8. 웹·인터랙션 검증

최소 증거:

- desktop `1440×1000`, mobile `390×844`
- default, focus-visible, invalid, loading/partial/stale, success, unavailable, alternative, retry/rollback
- 키보드로 선택·commit·recovery 도달
- 필터 변경 시 selection invariant 유지
- 중복 commit 방지
- live status와 error association
- 200% 확대, 긴 KR/EN, reduced motion, 비색상 단서
- console error 0, 깨진 link/image 0, 가로 overflow 0
- 이미지 lazy loading·responsive source·dimensions 및 동결한 성능 budget

화면 캡처가 허용되지 않으면 해당 시각·반응형 항목은 `미측정`으로 남고 `STRONG PASS`를 부여하지 않는다.

## 9. 에셋·아이덴티티 검증

각 사용 asset에 다음을 기록한다.

- stable asset ID와 revision
- 파일명·hash·dimensions·format
- 생성·촬영·제작 source와 날짜
- master/reference/mockup 구분
- 권리 상태와 허용 medium/market/기간
- 사용 컴포넌트·crop·대체 text
- 교체·폐기 이력

로고는 다음을 별도로 검사한다.

- wordmark/symbol/lockup master geometry
- clear space와 minimum size의 단일 계약
- monochrome, inverse, small-size 파일
- live text/font dependency 또는 outline 전략
- 생성 mockup 속 변형이 master로 재유입되지 않음

## 10. 정성 평가

사용자와 reviewer가 각각 1–10으로 평가하고 근거를 한 문장 이상 기록한다.

| 항목 | 질문 |
| --- | --- |
| 식별력 | COMMON SURFACE가 한 번의 노출 뒤 이름과 형태로 기억되는가 |
| 일관성 | 제품·패키지·매장·광고·웹이 같은 브랜드이면서 매체별로 적합한가 |
| 표현의 폭 | 같은 분위기의 반복이 아니라 동일 원칙의 의도적 변주인가 |
| 정보 신뢰 | 무엇이 사실·미확정·선택·결과인지 즉시 이해되는가 |
| 복구 품질 | 오류·hold·품절·철회에서 공포·비난 없이 다음 행동이 명확한가 |
| 상업 설득력 | 실제 팀이 다음 제작·검증 단계에 사용할 만큼 구체적인가 |
| 시스템 유효성 | 결과가 개인 감각이 아니라 문서 규칙과 재사용 컴포넌트에서 나왔는가 |
| 개선 가능성 | 변경을 다시 적용할 때 어디를 고치고 무엇을 보존할지 분명한가 |

정성 평가는 평균뿐 아니라 최저 항목과 이유를 함께 보고한다.

## 11. 편향 방지 규칙

- 같은 content fixture, 화면 크기, 매체 비율, 필수 상태로 전후 비교
- 변경 시작 전 impact map, 불변조건, 분모, 목표 동결
- builder와 reviewer가 서로의 점수를 보기 전에 독립 기록
- 미측정을 통과로 환산하지 않음
- 파일 수·에셋 수를 품질 점수로 직접 환산하지 않음
- 평균이 hard gate 또는 최저 매체 점수를 가리지 못함
- 사용자가 지적한 문제를 사후에 낮은 가중치로 이동하지 않음
- 수정 시간·횟수·AI turn·사람 개입을 원자료로 기록

## 12. 최종 판정 문장

최종 보고는 아래 중 하나만 사용한다.

- `유효성 강하게 입증`: R3-A/R3-B 모두 통과, Stage ≥90, E2+, C2, 사용자 정성 ≥8
- `조건부 유효`: 시스템 개선은 확인했으나 점수·증거·사용자 평가 중 하나가 미달
- `시각 제작 보조로만 유효`: 결과물은 개선됐으나 변경 전파·복구·추적성을 입증하지 못함
- `현재 구조 재설계 필요`: hard gate 실패 또는 R3-A 정상화 불가
