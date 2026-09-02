# COMMON SURFACE — Take 1 / R3

> **상태:** `0.2.0` 독립 E3 hard gate PASS · R3-A/R3-B 각 `63/100` · Stage `REVISE` · 사용자 평가 대기  
> **기준일:** 2026-08-26  
> **대상:** `COMMON SURFACE` Track 1  
> **R2 처리:** 읽기 전용 `observed-defective-baseline`  
> **목적:** Markdown 중심 디자인 시스템이 결함 있는 기준선을 정상화하고, 통제된 운영 변경을 전 매체에 일관되게 전파·검증할 수 있는지 시험한다.

## 이번 R3가 증명해야 하는 것

R3의 성공은 제품과 이미지를 더 많이 만드는 것이 아니다. 다음 연쇄를 증거로 남기는 것이다.

```text
동결된 R2 결함
→ 올바른 시스템 계층에 귀속
→ 정본 규칙 정상화
→ 선택된 변경 요청 적용
→ 7개 필수 매체 전파
→ 불변조건·사실·상태 회귀 검사
→ 독립 평가와 사용자 정성 평가
```

## 두 단계 구조

### R3-A — 기준선 정상화

R2는 공식 평가상 `STOP` 조건을 가진다. 따라서 먼저 변경 실험과 무관한 기존 결함을 정상화한다.

- Composition, Product Binding, Brand Experience, UX Preset, Pack의 ID/version을 다시 연결한다.
- 동결 fixture와 제품·캠페인·머천다이즈 명칭을 일치시킨다.
- 하나의 로고 마스터, 토큰 adapter, 컴포넌트·상태 계약을 정본화한다.
- R2 이름을 붙인 R1 파생물 참조를 분리한다.
- `decision.reserve`의 정상·실패·복구 상태를 실제로 증명한다.
- asset/claim/rights/medium registry, changelog, rollback과 영향 지도를 만든다.

R3-A가 hard gate를 통과하지 못하면 R3-B를 시작하지 않는다. 정상화만으로는 유지보수 가치가 검증됐다고 판단하지 않는다.

### R3-B — 통제된 변경 실험

사용자가 선택한 변경 시나리오 하나를 사전 동결한 뒤, 같은 시스템과 평가표로 전파·회귀·수정 부담을 측정한다.

## 현재 문서

- [브랜드 원장](contracts/brand-source-of-truth.md)
- [R2 기준선 감사](00-r2-baseline-audit.md)
- [R3 변경 시나리오 후보](01-change-scenario-candidates.md)
- [R3 사전 평가 계약](02-evaluation-contract.md)
- [구현 인벤토리](03-implementation-inventory.md)
- [Composition Manifest](contracts/composition-manifest.md)
- [Product Binding](contracts/product-binding-catalog.md)
- [Identity & Token Migration](contracts/identity-token-migration.md)
- [HOLD / 01 Change Contract](contracts/hold-01-change-contract.md)

## 실행 결과

| 결과물 | 용도 |
| --- | --- |
| [비교·증거 허브](preview.html) | R3-A/R3-B 전환, identity, catalog, Reserve, 7매체, 영향 지도 확인 |
| [R3-A 기준선](preview-baseline.html) | HOLD 활성화 전 정규화 상태 |
| [R3-B HOLD](preview-hold.html) | exact CS-03 batch 차단과 복구 상태 |
| [고객용 웹사이트 샘플](sample-commerce.html) | 제품·루틴·오브젝트·공간·지원과 exact batch Reserve를 갖춘 고객 접점 sample; 내부 preview의 shared Product Binding을 소비 |
| [실행·브라우저 증거](evidence/00-execution-record.md) | T0, 역할, 테스트, SLA, 수정 기록 |
| [7매체 35 검사](evidence/02-medium-35-checks.md) | 34 PASS / 1 BLOCKED의 근거 |
| [상호작용 테스트](evidence/03-interaction-tests.md) | affected/unknown/unaffected/rollback/반응형 결과 |
| [시각 충실도](evidence/04-fidelity-ledger.md) | concept와 실제 브라우저 구현 비교 |
| [권리·생산 gap](evidence/05-rights-production-gaps.md) | 상업 배포 전 외부 승인·증거 경계 |
| [에셋 검증](evidence/06-asset-validation.md) | 75개 registry와 사용 asset coverage |
| [사용자 평가표](evidence/08-user-evaluation.md) | builder 점수와 분리한 사용자 정성 평가 |

## 로컬 실행

두 Web surface의 shared Product Binding과 Back/reload 증거는 같은 HTTP origin을 전제로 한다. `r3/`에서 아래처럼 실행한 뒤 `http://127.0.0.1:8765/preview.html`과 `http://127.0.0.1:8765/sample-commerce.html`을 함께 연다.

```bash
python3 -m http.server 8765
```

`file://`로 직접 열어도 시각 프리뷰는 보이지만 브라우저의 file-origin 정책에 따라 교차 표면 상태 전파는 보장하지 않는다.

## 변경 전 금지 사항

- 기존 R1/R2 파일 덮어쓰기·삭제
- 선택 전 R3 시각 결과물 또는 신규 에셋 제작
- 결과를 본 뒤 평가 배점·분모·hard gate 변경
- COMMON SURFACE 전용 결정을 공통 Pack/UX Preset으로 자동 승격
- 생성 mockup을 실제 생산·규제·권리 승인 증거로 표현
- Take 2 랜덤 음악 앱 파일 수정

## Revision 연대기

| Revision | 결과 |
| --- | --- |
| `0.1.1-experiment` | exact batch와 baseline 접근성 결함 일부 수정 후 독립 재평가에서 R3-A `63/100`, R3-B `60/100`, P0/P1 open으로 **STOP**. [`독립 검토`](evidence/07-independent-review.md)에 보존한다. |
| `0.2.0-experiment` | complete release authority, 양방향 verified Binding, H01/U01/UNKNOWN 분리, async settlement, batch-aware record, reload/Back retention을 구현. 독립 E3 hard gate PASS, 점수 `63/63`, Stage `REVISE`. |

## 현재 게이트

- 정적·의미 validator `1.3.0`: 통과, error/warning `0/0`, semantic gate `29/29`, local refs `259`, asset registry `75/75`;
- 7매체: `34/35`, 모든 매체 `4/5` 이상, 동일 `1440×1000` baseline/HOLD 전후 캡처 `14개`;
- 로컬 prototype: batch 없는 CS-03 제품 draft, exact H01 affected, U01 `unaffected`, unknown, H01 `released`, alternative, idempotency, Binding-first 7/7 local-only rollback 검증;
- release guard: claim decision·세 permission leaf를 포함한 malformed record `13/13` 거부; local commit만 복원하고 claim·실제 판매·재고·fulfillment는 미복원;
- Web parity: 내부 preview가 revision-namespaced `localStorage`에 Product Binding을 publish하고 고객 sample이 `storage`/`pageshow`에서 consume해 HOLD/release를 자동 전파;
- retention: 내부 preview는 filter `body`, draft `CS-03`, unknown input/state를, 고객 sample은 draft `CS-03`, unknown input, disabled commit을 `sessionStorage`로 reload·Back 뒤 복원;
- 고객 웹사이트 시각/기초 QA: desktop/390px overflow `0`, visible interactive target under 44px `0`, 이미지 `12/12`, console error `0`;
- Builder 과거 self-score `84/88`과 최초 `92/95`는 독립 hard gate를 대체하지 않는다. 0.2.0 최종 점수는 독립 재평가 뒤 확정한다;
- 접근성: focus/keyboard/390px/non-color 확인, 200% zoom·screen reader 미측정;
- 실제 상업 권리·화장품 사실·생산·매장·광고 플랫폼·vendor 증거: unresolved;
- 최종 판정: 0.1.1 STOP 이력은 보존한다. 0.2.0은 독립 E3에서 P0/P1 `0/0`, hard gate PASS지만 Core·총점·E4가 부족해 `REVISE`다. 실제 상업 출시 가능 주장은 금지.
