# COMMON SURFACE R2 기준선 감사

> **판정:** `STOP`  
> **작업 기준 점수:** **39/100 · 3.9/10**  
> **증거:** 문서·HTML·자산 정적 검사 `E1`, 대표 자산 5개 직접 검사 `E2-limited`  
> **신뢰도:** `C1` — 최종 R3 점수에는 독립 검토와 허용된 브라우저 경로의 신규 화면 증거가 필요  
> **주의:** 이 점수는 비어 있는 공식 결과지를 대신하지 않는다. R2의 현재 상태를 R3 시작 전에 동결하기 위한 builder audit이다.

## 1. 감사 범위

### 시스템 계약

- `fixtures/common-surface-fixture.md`
- `01-brand-maintenance-experiment.md`
- `evaluation-framework.md`
- `design-packs/industrial-swiss-system/industrial-swiss-system.md`
- `ux-presets/decision.reserve.md`
- `results/01-maintenance-scorecard.md`

### R2 산출물

- `artifacts/common-surface-commercial-r2.md`
- `artifacts/r2-self-evaluation.md`
- `artifacts/preview.html`
- `artifacts/logo-system-r2.html`
- `artifacts/assets/`

### 시각 증거 한계

이번 감사에서 in-app Browser의 `file://` 보안 제한 때문에 R2 전체 페이지의 신규 화면 캡처를 만들지 못했다. 따라서 전체 페이지의 미감·반응형·상호작용을 화면 증거로 확정하지 않는다. 대표 로고·제품·인물·패키지·매장 자산 5개는 로컬 원본을 직접 검사했다. R3의 `STRONG PASS`에는 허용된 브라우저 경로로 만든 데스크톱·모바일·상태별 신규 캡처가 필수다.

### 검토 기록

- Main agent: 문서·HTML·자산을 통합 감사하고 측정값과 점수를 검산했다.
- Read-only reviewer 1: 실험 동결, 계층 소유권, 평가 무결성, 상업·권리 경계를 독립 검토했다.
- Read-only reviewer 2: HTML 상태, 반응형·접근성·성능, 로고 SVG, 자산·버전 추적성을 독립 검토했다.
- Read-only reviewer 3: 브랜드 불변조건과 변경 시나리오의 실제 운영 적합성을 독립 검토했다.
- 보조 검토자는 파일을 수정하지 않았다. 세 검토 모두 `R2는 공식 유지관리 실험으로 STOP이며 약 4/10 판단이 타당하다`는 결론에 수렴했다. 다만 전체 페이지의 신규 화면 증거가 없으므로 현재 신뢰도는 보수적으로 `C1`을 유지한다.

## 2. 결론

R2에는 시각적 탐색 가치와 올바른 윤리·권리 경계가 있다. 그러나 Track 1의 질문인 “동결된 변경 요청을 시스템이 일관되게 전파하고 검증했는가”에는 답하지 못한다.

가장 큰 문제는 완성도 부족이 아니라 **실험 계약과 산출물의 분리**다.

- 공식 결과지는 여전히 `Status: not started`다.
- R2가 동결된 `OUTSIDE / 01` 변경 요청을 수행하지 않았다.
- Product Binding과 UX Preset이 요구하는 상태·복구가 구현되지 않았다.
- R2 정본이 R1 파생물을 현재 결과로 다시 참조한다.
- 자기평가는 사후에 평가 기준을 바꾸고 hard gate·독립 검토·매체별 점수를 생략했다.

따라서 R2의 `9.1/10`은 Track 1 시스템 평가가 아니라, 별도의 시각적 자기평가로만 보존한다.

## 3. 동결 요구와 실제 R2의 불일치

| 항목 | 동결된 revision 2 요구 | 실제 R2 | 판정 |
| --- | --- | --- | --- |
| Sun-care 제품 | `CS-05 SCREEN` | `CS-05 SHIELD` | 불일치 |
| Merch | `OBJ-06 OUTSIDE TEE`, `OBJ-07 FIELD CAP` | `OBJ-06 AIR` 오브젝트, OBJ-07 없음 | 실패 |
| 캠페인 | `OUTSIDE / 01` lockup | 해당 캠페인·CR 추적 없음 | 실패 |
| 제품 확장 | CS-05만 Product Binding에 진입 | CS-06–11이 Binding revision 없이 추가 | wrong layer |
| Brand Experience | BX/UX/BI 보존표 | 짧은 브랜드 태도로 축약 | 미검증 |
| Reserve | default/focus/invalid/loading/success/unavailable/alternative와 retention/recovery | 필터, 제품 선택, 로컬 선택 완료 중심 | 실패 |
| 다중 매체 | 같은 캠페인의 패키지·매장·merch·OOH·ads·web 전파 | R1 공간·캠페인·머천다이즈 자산 재참조 | 실패 |
| Governance | changelog, impact map, manifest, stale audit, rollback | 없음 | 실패 |

Change Requirement Completion은 공식 결과지에 기록되지 않았으며, 현재 증거로 완전 충족을 확인할 수 있는 CR은 `0/10`이다.

## 4. 공식 프레임 작업 점수

점수보다 hard gate가 우선한다. 반점 없이 0–4 anchor를 적용했다.

| ID | 배점 | Anchor | 점수 | 근거 |
| --- | ---: | ---: | ---: | --- |
| B1 브랜드 철학·경험 불변조건 | 16 | 3 | 12 | all-gender, 비진단, 사실 우선, 권리 경계가 문서와 일부 표현에 존재 |
| B2 제품·컴포넌트·접점 구조 | 12 | 2 | 6 | 제품·컴포넌트 목록은 있으나 fixture·Binding·실제 매체와 불일치 |
| B3 계층 귀속·변경 추적성 | 12 | 1 | 3 | R2에 Binding/Preset/Brand Experience version과 CR별 변경 기록 부재 |
| B4 포용성·접근성·신뢰·권리 | 12 | 3 | 9 | 권리·효능 경계는 강점이나 접근성·실사용 권리 증거는 미완료 |
| B5 버전·자산·참조 일관성 | 8 | 1 | 2 | R1/R2 혼합, 제품명·토큰·로고 규칙 충돌 |
| M1 브랜드·Brand UX 연속성 | 12 | 1 | 3 | 시각적 연속성은 있으나 BI/BX/UX 보존을 측정하지 않음 |
| M2 다중 매체 영향·전파 | 12 | 0 | 0 | frozen impact map 결과와 동일 캠페인 전파 증거 없음 |
| M3 여정·사실·상태·복구 | 8 | 1 | 2 | 정상 선택 표본만 있고 필수 예외·복구·fact parity 없음 |
| M4 claim·권리·접근성·생산 증거 | 4 | 2 | 2 | 경계는 기록했으나 ledger와 외부 증거 없음 |
| M5 사람 수정·귀속 부담 | 4 | 0 | 0 | 시간·수정·결함 귀속 기록 없음 |
| **합계** | **100** |  | **39** | `STOP`, 합계는 통과 판정을 대체하지 않음 |

## 5. Hard gate와 결함 원장

| ID | 심각도 | 결함 | 소유 계층 | R3 요구 |
| --- | --- | --- | --- | --- |
| R2-P1-01 | P1 | 동결된 CR-01–10과 다른 제품·merch·캠페인을 제작 | Governance / Composition | R2를 결함 기준선으로 보존하고 canonical catalog revision과 change map 재작성 |
| R2-P1-02 | P1 | 필수 매체에 같은 controlled update가 전파되지 않음 | Medium / Projection | 7개 매체의 동일 content fixture와 35개 check 증거 필요 |
| R2-P1-03 | P1 | Reserve의 invalid/loading/unavailable/alternative/retry/retention/result evidence 부재 | Product Binding / UX Preset / Projection | 전체 state matrix와 반복 가능한 테스트 필요 |
| R2-P2-01 | P2 | Product Binding revision 없이 CS-06–11과 OBJ-06 의미 변경 | Product Binding | catalog ID/version과 authority state 정본화 |
| R2-P2-02 | P2 | 로고 보호 여백이 `적색 기준점 폭 2배`와 `심벌 폭 1/4`로 충돌 | Brand Identity | 하나의 로고 계약과 측정 fixture 필요 |
| R2-P2-03 | P2 | 마스터 `C/S`와 생성 mockup의 C형·엠보싱형 실루엣이 일치하지 않음 | Brand Identity / Asset | 마스터 일치율과 금지 변형 검사 필요 |
| R2-P2-04 | P2 | r1 `--cs-signal/--cs-field-blue`가 r2 `--cs-red/--cs-blue`로 migration 없이 갈림 | Design Pack adapter / Composition | semantic token migration과 deprecated alias 정책 필요 |
| R2-P2-05 | P2 | Preview가 Reserve를 쓰면서 완료 문구에서 `비교 후보`라고 표현 | UX Preset / Content | 추천·draft·commit·confirmed outcome 용어 분리 |
| R2-P2-06 | P2 | 필터 변경 후 숨겨진 기존 선택을 그대로 확정할 수 있음 | Projection / Implementation | selection-filter invariant와 회귀 테스트 필요 |
| R2-P2-07 | P2 | 49.79 MiB 이미지, lazy/srcset/명시 크기 0으로 상업 웹 성능 근거 부족 | Implementation | responsive asset pipeline과 성능 budget 필요 |
| R2-P2-08 | P2 | muted/paper 대비 `4.46:1`로 일반 텍스트 AA 기준 4.5:1에 근소 미달 | Design token / Projection | 실제 크기·굵기별 contrast test 필요 |
| R2-P2-09 | P2 | wordmark/lockup이 live SVG text와 Arial Narrow fallback에 의존 | Brand Identity / Asset | outline 또는 배포 font 전략과 단색·소형 master 필요 |
| R2-P2-10 | P2 | asset별 source, hash, dimensions, prompt/provenance, rights scope, 교체 이력 없음 | Asset governance | versioned asset registry 필요 |

Hard gate decision: **STOP**. `R2-P1-01–03`이 닫히기 전에는 R3 변경 결과를 시스템 성공으로 평가하지 않는다.

## 6. 정적 측정값

| 측정 | 결과 | 해석 |
| --- | ---: | --- |
| `artifacts/assets/` 파일 | 37 | 파일 수는 품질·권리·추적성을 증명하지 않음 |
| R2 commercial 문서의 고유 asset 참조 | 32 | 누락 파일 0, 그중 R1 이름 참조 9 |
| R2 preview의 고유 asset 참조 | 27 | 누락 파일 0, 그중 R1 이름 참조 4 |
| Preview 이미지 태그 | 36 | 고유 이미지 27 |
| Preview 고유 이미지 전송량 | 49.79 MiB | 상업 웹 preview로는 최적화 필요 |
| `loading="lazy"` / `srcset` / width·height | 0 / 0 / 0 | 지연 로드·반응형 소스·레이아웃 안정성 근거 없음 |
| 버튼 | 17 | 필터 4, 제품 12, commit 1 |
| event listener 계열 | 3 | 필터·제품·commit의 정상 경로 중심 |
| R2 정본이 함께 평가하라고 지정한 HTML 중 R2 파일 | 2/5 | 나머지 catalog/physical/campaign은 R1 |
| 공식 scorecard 입력 | 0% | status, hard gate, 점수, 매체, 운영 지표 모두 pending |

## 7. R2 자기평가가 9.1을 증명하지 못하는 이유

1. 공식 `Brand Governance Core 60 + Maintenance 40`을 쓰지 않았다.
2. CR completion, 85/56 impact map, 35 medium check, BI/BX/UX 24개를 측정하지 않았다.
3. 독립 reviewer와 builder/reviewer 불일치 처리 규칙을 적용하지 않았다.
4. 작업 후 시각 항목 가중치를 올리고 R1 점수를 다시 바꿨다.
5. 에셋의 폭과 수를 시스템 전파·복구·변경 추적의 대체 지표로 사용했다.
6. 실제 R1 재평가 9개 점수의 산술 평균은 문서의 7.2가 아니라 약 7.1이다.
7. 상업 출시 준비도 6.8을 별도로 둔 것은 정직하지만, Track 1 유지관리 실험이 완료됐다는 증거는 아니다.

## 8. R3-A 필수 정상화 우선순위

1. **정본 회복:** Composition, Binding, Brand Experience, UX Preset, Pack, catalog, campaign의 ID/version을 하나의 manifest에 연결한다.
2. **변경 추적 회복:** frozen CR, impact map, changelog, decision log, rollback을 실제 파일과 연결한다.
3. **경험 계약 회복:** Reserve의 추천·draft·commit·confirmed outcome과 예외·복구·retention을 구현·검증한다.
4. **매체 증거 회복:** moodboard, packaging, shop, merch, OOH, digital ads, web을 같은 content fixture로 다시 투영한다.
5. **상업 통제 회복:** asset/claim/rights/production-gap registry와 실제 검증 ceiling을 연결한다.

## 9. 이번 감사에서 해결하지 않는 것

- 상표·도메인·폰트·모델·사진 권리 승인
- 화장품 성분·효능·SPF·표시·규제 승인
- 실제 dieline, 원단, 인쇄, 간판, OOH vendor proof
- 실제 재고·주문·결제·고객지원 연동
- 스크린리더·대표 사용자 평가

이 항목은 가짜 데이터로 채우지 않고 R3 평가의 외부 검증 필요 항목으로 유지한다.
