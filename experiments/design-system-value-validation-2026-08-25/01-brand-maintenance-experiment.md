# Track 1 — Brand Maintenance Experiment

## 1. Decision

**판단할 것:** 현재 Markdown-first Design Pack 체계가 통제된 브랜드 업데이트를 일관되게 계획·전파·검증·기록할 수 있는가?

**단위:** [`pack:industrial-swiss@1.0.0`, COMMON SURFACE Brand Experience Profile, 대표 `decision.reserve@0.1.0`을 적용한 revision 1 → revision 2](fixtures/common-surface-fixture.md)

## 2. 실험 설계

- 독립변수: `CR-01`–`CR-10` 브랜드·경험·다중 매체 업데이트 요청
- 고정변수: `pack:industrial-swiss@1.0.0`, `brand-experience.common-surface@0.1.0-experiment`, `binding.common-surface-starter-selection@0.1.0-experiment`, 대표 인터랙티브 표본의 `decision.reserve@0.1.0`, `BI-01`–`BI-08`, 제품 fixture, 매체·테스트 프레임, 평가표
- 관찰값: 기준선/최종 품질, Brand UX 불변조건 보존, 매체별 전파율·적합성, 제품 사실 일치, 컴포넌트 재사용, claim/권리 추적, 수정 시간·건수, 계층 귀속, 결함 수
- 금지: 평가가 끝나기 전에 변경 요구나 배점을 결과에 맞춰 수정

## 3. 실행 단계

### M0 — Freeze

완료 조건:

- [ ] `pack:industrial-swiss@1.0.0`, 대표 Product Binding, `decision.reserve@0.1.0`을 고정
- [ ] Brand Experience Profile ID/version, BX/UX design signature, BI-01–BI-08을 고정
- [ ] fixture의 baseline application과 CR-01–CR-10을 링크로 고정
- [ ] 사용할 UES/Preset/Pack/Composition/Medium/Projection 버전 기록
- [ ] 무드보드, 패키지, 매장, T-shirt, OOH, 디지털 광고, 웹의 테스트 프레임·문구·SKU·언어를 고정
- [ ] 웹은 desktop `1440 × 1000`, mobile `390 × 844`와 `default`, `focus-visible`, `invalid`, `loading`, `success`, `unavailable`, `alternative`를 고정
- [ ] 정적 매체에는 interaction state를 강제하지 않고 거리·비율·정보·재질·생산 gap 조건을 고정
- [ ] fixture의 `MB/PKG/SHOP/MERCH/OOH/ADS/WEB-01–05` 총 35개 Medium Fitness check를 고정
- [ ] 시작시각과 기준 파일 목록 기록

M0에서 조건이 바뀌면 실험 revision을 올리고 사유를 남긴다.

### M1 — Baseline audit

생성할 것:

- [`common-surface-brand-application-r1.md`](artifacts/common-surface-brand-application-r1.md) canonical Composition/application baseline
- [`common-surface-identity-r1.md`](artifacts/common-surface-identity-r1.md) 브랜드명·워드마크·축약 마크·사용 규칙
- [`common-surface-r1-completion-manifest.md`](artifacts/common-surface-r1-completion-manifest.md) r1 산출물 범위와 평가 전 동결 기록
- Brand Experience Profile, moodboard Source Register, anti-moodboard
- representative Product Binding과 Reserve state/retention mapping
- CS-01/CS-03 packaging, shop/signage, OBJ-01 T-shirt, OOH, digital ads, web product/Reserve flow의 inspectable artifact
- Industrial Swiss capability → COMMON SURFACE component/medium mapping
- Brand Governance Core 60 + Maintenance Module 40 기준 점수와 매체별 최저 점수
- P0–P3 결함 목록

기준선이 70점 미만이거나 Core 항목이 2점 미만이면 먼저 baseline을 정상화한다. 불완전한 기준선을 업데이트 품질과 혼동하지 않는다.

### M2 — Independent A/B proposals

같은 frozen input으로 두 제안을 서로 보지 않게 만든다.

- Proposal A: 계층 귀속, Brand Experience/claim 영향, capability/adaptation map, component/state delta, moodboard·매체별 Projection delta
- Proposal B: 동일 형식
- 공통 결정 벡터: 각 CR의 `change / preserve / unresolved / wrong-layer`

```text
Independent Agreement
= A와 B가 같은 결정 벡터를 낸 CR 수 ÷ 10 × 100
```

문구가 같은지가 아니라 **무엇을 어느 계층에서 바꿀지**가 같은지를 평가한다. 불일치는 사람이 판단하고 채택 이유를 남긴다.

### M3 — Canonical revision 2

생성할 것:

- `common-surface-brand-application-r2.md`
- revision 1 → revision 2 changelog
- Brand Experience Profile 보존/변경 판정
- Pack capability mapping, recorded adaptations, limitations, gaps
- 제품 사실·claim·asset authority ledger
- impact map 확정본
- open questions와 출시 검증 필요 항목

모든 변경은 `Core / Product Binding / Brand Experience / UX Preset / Design Pack / Composition / Medium / Projection / Implementation` 중 하나에 귀속한다. COMMON SURFACE에만 필요한 수정은 canonical Pack, UES, 공통 Preset으로 승격하지 않는다. Brand Experience 규칙도 다른 독립 브랜드에서 재현되기 전에는 Composition-local로 유지한다.

### M4 — Projection and edge states

동일 콘텐츠와 fixture test frame으로 revision 1/revision 2를 비교한다.

- moodboard source/status와 anti-moodboard parity;
- packaging 60×120mm sample front/back 정보 위계와 authority safe zone;
- shop façade 3:1, window 9:16, A6 shelf/tester/wayfinding의 거리·상태 표현;
- T-shirt 300×400mm front/back graphic, care/size/material hierarchy;
- OOH 2:1, 1:2의 한 메시지·다음 단계·장거리 가독성;
- digital ads 1200×628, 1080×1080, 1080×1920의 crop·message·destination parity;
- web 1440×1000, 390×844의 default/focus-visible/invalid/loading/success/unavailable/alternative;
- 긴 한국어/영어, 200% 확대, 비색상 단서, reduced-motion 대안;
- product code/name/quantity/use/claim status의 cross-touchpoint parity.

Pack Preview는 시각·정적 상태 증거다. 실제 키보드, 스크린리더, 비동기 실행을 검증하지 않았다면 E3/E4로 기록하지 않는다.

### M5 — Regression and decision

- CR-01–CR-10 전파 확인
- BI-01–BI-08와 BX/UX signature 보존 확인
- stale token/name/version/link 검색
- moodboard·각 매체 Projection ↔ canonical MD parity 확인
- product-fact parity, claim/rights traceability, unregistered override 확인
- 7개 필수 매체 각각 Medium Fitness `≥80`; `<70`은 REVISE, hard-gate 위반은 STOP
- 사람이 수정한 모든 항목과 소요시간 기록
- 기준선과 최종 점수 비교
- `adopt / adopt-with-gaps / revise / rollback` 결정

## 4. Impact map

M2 전에 예상 대상을 등록하고, M5에서 실제 결과를 채운다.

| CR | Binding / Brand UX | Moodboard | Components | Packaging | Shop | Merch | OOH | Digital ads | Web UX | QA / manifest | Result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CR-01 | expected | — | expected | expected | expected | — | expected | expected | expected | expected | pending |
| CR-02 | expected | — | expected | — | expected | expected | expected | expected | expected | expected | pending |
| CR-03 | expected | expected | expected | expected | expected | expected | expected | expected | expected | expected | pending |
| CR-04 | expected | expected | expected | expected | expected | expected | expected | expected | expected | expected | pending |
| CR-05 | expected | expected | expected | expected | expected | expected | expected | expected | expected | expected | pending |
| CR-06 | expected | — | expected | expected | expected | — | expected | expected | expected | expected | pending |
| CR-07 | expected | expected | expected | expected | expected | expected | expected | expected | expected | expected | pending |
| CR-08 | expected | — | expected | — | expected | — | — | — | expected | expected | pending |
| CR-09 | — | — | expected | expected | expected | expected | expected | — | — | expected | pending |
| CR-10 | expected | expected | expected | expected | expected | expected | expected | expected | expected | expected | pending |

분모에는 사전에 `expected`로 등록한 셀만 포함한다. 동결 분모는 전체 `85`, 7개 매체 열 `56`이다. 사후에 분모를 줄이지 않는다.

## 5. Maintenance Module — 40점

공통 [평가 프레임](evaluation-framework.md)의 Brand Governance Core 60점에 아래를 합친다.

| ID | 항목 | 배점 | 4점 기준 |
| --- | --- | ---: | --- |
| M1 | 브랜드·Brand UX 연속성과 의도적 진화 | 12 | BI/BX/UX signature를 보존하면서 CR 변화가 접점별로 명확하고 일관됨 |
| M2 | 다중 매체 영향 식별과 전파 | 12 | 사전 impact map의 모든 적용 셀이 해당 매체 결과·manifest에 추적됨 |
| M3 | 접점 여정·제품 사실·상태/복구 일치 | 8 | 물리/디지털 접점의 제품 사실과 적용 상태·다음 행동이 모순 없이 일치 |
| M4 | claim·권리·접근성·생산 증거 경계 | 4 | 미확정 권한과 증거 ceiling이 명확하고 거짓 commercial readiness가 없음 |
| M5 | 사람 수정 부담과 귀속 | 4 | correction log가 완전하고 수정이 한 소유 계층에 귀속됨 |

## 6. Maintenance Value Index

품질 점수와 별도로 운영성을 계산한다.

```text
MVI =
  Brand UX Invariant Preservation × 0.20
+ Change Requirement Completion × 0.15
+ Cross-medium Propagation × 0.15
+ Medium Fitness × 0.10
+ Cross-artifact Consistency × 0.10
+ Claim Traceability × 0.10
+ Attribution Rate × 0.10
+ Independent Agreement × 0.05
+ (100 - Semantic Regression Rate) × 0.05
```

| 판정 | 잠정 기준 |
| --- | --- |
| 반복 사용 가치 강함 | MVI ≥85, Stage ≥80, P0/P1 0, C2 이상 |
| 보정 후 재실험 | MVI 75–84 또는 Stage 70–79 |
| 유지관리 도구 가치 약함 | MVI <75 또는 hard gate 실패 |

추가 목표: CR Completion ≥90, Brand UX Invariant Preservation ≥95, Cross-medium Propagation ≥90, Product-fact Parity =100, Claim Traceability =100, Independent Agreement ≥75. 필수 매체 하나가 hard gate를 위반하면 평균 점수와 무관하게 실패다. 첫 실행 뒤 현실적인 기준으로 재조정한다.

## 7. 필요한 증거

- [ ] frozen input, Brand Experience Profile, 매체 test frame, 시작 전 파일 목록/버전
- [ ] 고정한 Pack/대표 Preset 버전과 revision 1 기준선·매체별 점수
- [ ] 격리된 Proposal A/B
- [ ] canonical MD 전후 diff와 결정 이유
- [ ] 동일 콘텐츠·크기·상태의 7개 필수 매체 전후 증거
- [ ] Pack mapping, recorded adaptation, component reuse, version, stale reference 점검
- [ ] product-fact parity와 claim/asset/rights authority ledger
- [ ] builder 점수와 independent reviewer 점수
- [ ] 사람 수정 시간·건수·결함 귀속
- [ ] 최종 채택/롤백 결정

결과는 [Track 1 결과지](results/01-maintenance-scorecard.md)에 기록한다.
