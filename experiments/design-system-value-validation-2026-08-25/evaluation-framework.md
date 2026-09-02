# 공통 평가 프레임

## 1. 평가 원칙

1. 점수는 산출물의 현재 단계 적합성을 평가하며, 다른 conformance level을 대신하지 않는다.
2. 총점보다 hard gate를 먼저 확인한다. 의미·복구·권리·접근성의 중대한 회귀는 높은 평균으로 상쇄할 수 없다.
3. 점수와 증거 강도는 분리해 보고한다. 예: `84/100 · E2 · C2`.
4. 기준선과 최종본에는 같은 표를 사용한다.
5. 작성자와 검토자가 한 항목에서 2 anchor 이상 다르면 합의 전까지 낮은 점수를 사용한다.

## 2. 0–4 anchor

반점은 사용하지 않는다.

| 점수 | 공통 의미 |
| ---: | --- |
| 0 | 없거나 상위 계약과 모순됨 |
| 1 | 언급·모양만 있고 과업에 사용할 수 없음 |
| 2 | 정상 경로는 성립하지만 중요한 상태·일관성·증거 공백이 있음 |
| 3 | 현재 단계의 명시 범위를 충족하고 검증 가능하며 사소한 gap만 있음 |
| 4 | 추적 가능한 증거로 반복 확인됐고 중요한 미해결 결함이 없음 |

```text
항목 점수 = anchor ÷ 4 × 배점
Stage Score = 모든 항목 점수의 합
```

배점은 4의 배수로 구성해 반올림 없이 정수 점수가 나오게 한다.

## 3. 60점 Core profile

두 트랙은 같은 0–4 anchor와 증거 규칙을 쓰지만 서로 다른 대상을 평가한다. 정적 OOH나 티셔츠에 커밋·복구를 강제하지 않고, 반대로 앱의 상태·복구를 단순 브랜드 일관성으로 대체하지 않는다. 따라서 두 트랙의 총점을 직접 비교하거나 평균내지 않는다.

### 3.1 Brand Governance Core — Track 1, 60점

| ID | 항목 | 배점 | 4점 기준 |
| --- | --- | ---: | --- |
| B1 | 브랜드 철학·대상·Brand Experience 불변조건 | 16 | 약속, 비판단적 all-gender 관점, voice, interaction/service 원칙이 BI와 증거로 전 접점에 추적됨 |
| B2 | 제품·컴포넌트·접점 정보 구조 | 12 | 제품 ID와 authority-state가 표시된 사실, 컴포넌트, 접점별 역할이 매체 제약에 맞게 일관됨 |
| B3 | 계층 귀속·변경 추적성 | 12 | 모든 변경·결함이 Binding/Brand Experience/Preset/Pack/Composition/Medium/Projection/Implementation 중 하나에 귀속됨 |
| B4 | 포용성·접근성·신뢰·권리·주장 경계 | 12 | 성별 고정관념, 무근거 효능, 권리 불명 자산, production 과장이 없고 미확정 권한이 표시됨 |
| B5 | 명칭·버전·자산·참조 일관성 | 8 | stale reference 없이 브랜드·제품·컴포넌트·manifest ID/version이 정본과 파생물에 일치함 |

Brand Experience Profile은 Track 1 Composition의 소유물이다. 표현 방식은 Design Pack, 제품 사실과 유효성은 Product Binding, 인터랙티브 결정·상태·커밋·복구는 UX Preset이 계속 소유한다. 두 개 이상의 독립 브랜드에서 재사용 증거가 생기기 전에는 UES 공통 계층으로 승격하지 않는다.

### 3.2 Product UX Core — Track 2, 60점

Flowchart, Low-fi, High-fi에서 같은 의미를 평가한다. 단계 총점보다 이 Core와 Semantic Carryover를 함께 비교한다.

| ID | 항목 | 배점 | 4점 기준 |
| --- | --- | ---: | --- |
| C1 | 목표·객체·커밋·결과 의미 보존 | 16 | Product Binding의 핵심 의미가 stable ID와 증거로 추적됨 |
| C2 | 상태·전이·검증·복구 무결성 | 16 | 적용 edge state와 Back/Cancel/Retry/Resume/Exit 정책이 모순 없이 연결됨 |
| C3 | 계층 귀속과 추적성 | 12 | 모든 변경·결함이 Core/Binding/Preset/Pack/Medium/Projection/Implementation 중 하나에 귀속됨 |
| C4 | 접근성·신뢰·권리·데이터 경계 | 8 | 현재 단계에서 검증한 것과 이후 검증할 것이 구분되고 거짓 주장이 없음 |
| C5 | 명칭·버전·토큰·참조 일관성 | 8 | stale reference 없이 버전과 canonical ID가 전 산출물에 일치함 |

## 4. 증거와 신뢰도

### Evidence level

| 등급 | 증거 |
| --- | --- |
| E0 | 주장 또는 계획만 있음 |
| E1 | Markdown, 표, flowchart처럼 추적 가능한 명세 |
| E2 | 렌더, 캡처, 전후 비교, 정적 측정 |
| E3 | 반복 가능한 인터랙션·런타임 테스트 |
| E4 | 실제 매체, 보조기술, 대표 사용자 관찰 |

증거 링크가 없는 항목은 최대 2점이다. E0만 있는 상태에서 ‘검증됨’이라고 쓰지 않는다.

### Confidence

| 등급 | 조건 |
| --- | --- |
| C1 | 작성자 단독 평가 또는 증거 불완전 |
| C2 | 재현 가능한 증거와 독립 검토가 일치 |
| C3 | 독립 검토와 실제 대상/사용 증거가 일치 |

## 5. 결함 심각도와 hard gate

| 심각도 | 정의 | 행동 |
| --- | --- | --- |
| P0 | 위험·권리·개인정보·파괴적 결과 또는 핵심 과업 불가능 | 즉시 STOP |
| P1 | 거짓 상태, 커밋/결과 혼동, 복구 불능, 핵심 의미 유실, blocking 호환성 | STOP 후 수정·재평가 |
| P2 | 중요한 일관성·반응형·접근성·추적성 결함이나 우회 가능 | 단계 통과 전 수정 또는 책임자 지정 |
| P3 | 경미한 시각·문구·문서 정리 결함 | 기록 후 진행 가능 |

다음은 총점과 무관하게 STOP이다.

- P0/P1이 열려 있음;
- `blocking` Preset × Pack × Medium gap;
- 추천·사용자 선택·커밋·확정 결과를 같은 상태로 표현;
- 화면은 성공으로 보이지만 실제 상태는 실패/미확정;
- 권리, 실데이터, 접근성, 런타임을 근거 없이 완료로 주장;
- 위험하거나 중단 가능한 행동에 필요한 복구 경로가 없음.

Track 1에는 다음 hard gate도 적용한다.

- 성별 이분법·결함 수치심·과도한 보정 이미지가 all-gender 약속을 훼손;
- 치료·효능·성분·SPF·지속가능성·가격·재고·원산지를 권한 없이 사실로 제시;
- 권리 상태가 불명확한 로고, 사진, 모델, 폰트, 텍스처를 승인 자산처럼 사용;
- 필수 매체 하나 이상에 통제 변경이 누락되거나 authority-tagged 제품 사실이 불일치;
- 실제 dieline, 인쇄 proof, 원단 sample, signage 설치 검증 없이 production-ready라고 주장.

## 6. 단계 판정

| 판정 | 기준 |
| --- | --- |
| STOP | hard gate 위반 |
| REVISE | 70점 미만 또는 활성 Core 항목 하나가 2점 미만 |
| PROCEED WITH GAPS | 70–79점이며 각 gap의 소유자·다음 검증이 기록됨 |
| STAGE PASS | 80점 이상, 모든 활성 Core 항목 3점 이상, 해당 단계의 최소 증거 확보 |
| STRONG PASS | 90점 이상, P0/P1 없음, E2 이상 |

기준선 대비 변화는 다음과 같이 기록한다.

- `개선`: `+5점 이상`, 활성 Core anchor 하락 없음, 새 P0/P1 없음
- `유지`: `-4~+4점`, 활성 Core anchor 하락 없음
- `회귀`: `-5점 이하` 또는 활성 Core anchor 하나라도 1단계 하락

## 7. 공통 운영 지표

| 지표 | 산식 | 해석 |
| --- | --- | --- |
| Change Propagation Rate | 검증 완료 영향 항목 ÷ 사전 등록 영향 항목 × 100 | 계획한 변경이 실제 산출물에 반영된 정도 |
| Invariant Preservation | 보존된 불변조건 ÷ 적용 불변조건 × 100 | 바꾸지 말아야 할 의미의 보존율 |
| Semantic Carryover | 다음 단계에 stable ID로 추적된 필수 의미 ÷ 이전 단계 필수 의미 × 100 | Fidelity 전환 중 의미 손실 |
| Reuse Rate | 수정 없이 상속된 승인 항목 ÷ 적용 가능한 상위 단계 항목 × 100 | 재사용 가능성 |
| Attribution Rate | 한 계층에 명확히 귀속된 수정 ÷ 전체 수정 × 100 | 시스템 경계의 실용성 |
| Human Correction Rate | 사람의 의미 있는 수정 건수 ÷ 전체 생성·수정 항목 × 100 | AI 결과의 보정 부담 |
| Evidence Coverage | 증거가 연결된 평가 항목 ÷ 전체 적용 평가 항목 × 100 | 점수의 재현 가능성 |

Track 1은 아래 지표를 추가한다.

| 지표 | 산식 | 해석 |
| --- | --- | --- |
| Cross-medium Propagation | 검증 완료 매체 영향 셀 ÷ 사전 등록 매체 영향 셀 × 100 | 변경이 모든 필수 매체에 도달했는가 |
| Medium Fitness | 매체별 제약을 충족한 필수 항목 ÷ 적용 매체 제약 × 100 | 같은 그림을 축소한 것이 아니라 매체에 맞게 번역했는가 |
| Product-fact Parity | 동일해야 하는 승인 제품 사실 중 일치 항목 ÷ 적용 사실 × 100 | 패키지·선반·웹·광고 목적지의 truth continuity |
| Claim Traceability | 권한·출처·상태가 연결된 claim ÷ 제시된 claim × 100 | 광고·제품 주장의 상업적 통제 가능성 |
| Registered Component Reuse | 등록 컴포넌트로 해결한 적용 인스턴스 ÷ 재사용 가능 인스턴스 × 100 | 브랜드 시스템의 실제 재사용성 |
| Unregistered Override Rate | 정본 밖 local override ÷ 전체 적용 인스턴스 × 100 | 매체별 임의 변형과 부채 |

평균 총점이 한 매체의 실패를 숨겨서는 안 된다. Track 1은 fixture의 35개 frozen check로 각 매체를 평가하며 모든 필수 매체가 Medium Fitness `≥80`이어야 통과한다. `<70`은 REVISE, hard gate 위반은 STOP이다.

원자료로 단계별 시작/종료시각, AI turn 수, 사람 수정 시간, 수정 건수, 파일 수, P0–P3 수를 남긴다. 시간 단축은 품질 hard gate를 통과했을 때만 긍정 지표다.

## 8. 잠정 목표

역사적 기준선이 없으므로 오늘은 아래를 탐색적 목표로 사용한다.

- Stage Score `80 이상`;
- Invariant Preservation `95 이상`;
- Semantic Carryover `90 이상`;
- Attribution Rate `90 이상`;
- P0/P1 `0건`;
- C2 이상의 독립 검토;
- Track 1 Cross-medium Propagation `90 이상`, Product-fact Parity `100`, 제시 claim의 Traceability `100`.

첫 실행 결과로 분포를 얻은 뒤 두 번째 실험 전 임계값을 보정한다. 목표를 맞추기 위해 점수 정의를 사후 변경하지 않는다.
