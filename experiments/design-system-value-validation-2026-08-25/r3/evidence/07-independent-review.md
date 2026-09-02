# COMMON SURFACE R3 독립 검토

> **검토 역할:** builder 점수를 입력으로 사용하지 않은 read-only reviewer  
> **검토 기준:** [`../02-evaluation-contract.md`](../02-evaluation-contract.md)의 frozen rubric  
> **검토 스냅샷:** 2026-08-26 17:19 KST, strict validator 실행 시점  
> **증거 ceiling:** 전체 `E2`, 로컬 웹 상호작용 일부 `E3`, 실제 매체·보조기술·대표 사용자·권리·vendor는 `E4 unresolved`  
> **신뢰도:** `C1` — 독립 점수는 먼저 기록했으나 builder와의 차이 조정, 실제 대상/사용 증거, 동결 revision의 불변 감사가 아직 없다.

## 1. 독립 판정

| 단계 | Brand Governance Core | Maintenance | 합계 | P0 / P1 | Hard gate | 공식 판정 |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| R3-A 정상화 | `37 / 60` | `23 / 40` | **`60 / 100`** | `0 / 2 open` | FAIL | **STOP** |
| R3-B HOLD / 01 | `37 / 60` | `20 / 40` | **`57 / 100`** | `1 / 2 open` | FAIL | **STOP** |

가중점수는 결함 위치를 보여주는 진단값일 뿐이다. 두 단계 모두 open P1이 있고, R3-B에는 계약이 직접 P0로 정의한 scope 위반이 있다. 따라서 점수와 정적 validator PASS로 hard gate를 상쇄할 수 없다.

최종 허용 문장은 **`현재 구조 재설계 필요`**다. 이는 브랜드·시각 결과 전체를 폐기하라는 뜻이 아니라, batch authority와 commit predicate, release/rollback, 상태별 접근성 DOM, 원자적 증거 연결을 같은 source of truth에서 다시 결합해야 한다는 뜻이다.

## 2. 점수 산식

반점 없이 `항목 점수 = anchor ÷ 4 × 배점`을 적용했다.

### 2.1 R3-A 정상화

| ID | 배점 | Anchor | 환산 | 독립 근거 |
| --- | ---: | ---: | ---: | --- |
| B1 | 16 | 3 | 12 | all-gender, 비진단, 설명 우선, visible uncertainty가 Manifest·Brand Experience·두 웹 표면에 연결된다. 다만 대표 사용자 관찰은 없고 매체 증거는 합성 sample 중심이다. |
| B2 | 12 | 2 | 6 | 12개 stable ID와 제품 역할은 정리됐지만 `catalog.js`는 canonical `catalog_state`, `claim_authority_state`, `market`, `availability`, `last_updated_at`를 구조화해 담지 않는다. R3-A DOM에도 활성 HOLD 설명이 섞인다. |
| B3 | 12 | 2 | 6 | 계층과 owner 문서는 선명하지만, T0 placeholder를 같은 revision에서 정정했고 impact/check 행의 직접 증거 ID가 부족하다. 문서·runtime·평가 분모를 한 번에 재생성하는 경로도 없다. |
| B4 | 12 | 3 | 9 | 권리·claim·실데이터·production 경계를 과장하지 않고 all-gender 표현을 유지한다. 다만 200% zoom, screen reader, 실제 keyboard traversal과 실사용 권리는 미검증이다. |
| B5 | 8 | 2 | 4 | 정적 ID·링크·asset hash는 강하지만 상태별 alt와 hidden copy가 mode에 맞지 않고, 증거의 sample 이미지·사용 asset 분모가 최신 validator와 어긋난다. |
| **Core** | **60** |  | **37** |  |
| M1 | 12 | 3 | 9 | identity와 Brand UX의 시각 연속성은 보이지만 사용자·실매체 확인은 없다. |
| M2 | 12 | 2 | 6 | 7개 매체 섹션은 있으나 frozen size의 매체별 baseline/HOLD 전후 capture와 원자적 proof가 없다. |
| M3 | 8 | 2 | 4 | 선택·commit·unknown·대안의 정상 경로는 있으나 상태 token 존재가 실제 전이 검증을 대신하고, baseline의 접근성 상태가 모순된다. |
| M4 | 4 | 2 | 2 | 권리·claim·생산 gap은 정직하게 분리됐지만 실제 rights, vendor proof, assistive-tech evidence는 없다. |
| M5 | 4 | 2 | 2 | 수정 결함 네 건과 역할은 기록됐지만 전체 생성/수정 분모, 사람 수정 시간, correction/reuse/override 원자료가 없다. |
| **Maintenance** | **40** |  | **23** |  |
| **합계** | **100** |  | **60** | **STOP** |

### 2.2 R3-B HOLD / 01

| ID | 배점 | Anchor | 환산 | 독립 근거 |
| --- | ---: | ---: | ---: | --- |
| B1 | 16 | 3 | 12 | calm incident voice, identity preservation, non-shaming recovery는 전 표면에 유지된다. 실제 사용자 정성 평가는 대기 중이다. |
| B2 | 12 | 2 | 6 | 핵심 객체가 `CS-03 + exact batch`여야 하나 두 runtime은 batch 확인 전 모든 CS-03 선택을 HOLD로 처리한다. canonical fact field도 runtime catalog에 완전하지 않다. |
| B3 | 12 | 2 | 6 | 계약과 impact map은 상세하지만 generic CS-03 차단을 PASS로 기록해 계약·구현·증거가 충돌한다. claim/fact/reuse/override 분모도 재계산 가능한 원자료가 부족하다. |
| B4 | 12 | 3 | 9 | 실제 사건·안전·권리·상업 출시로 과장하지 않는 경계는 강하다. 접근성·실권리·vendor·대표 사용자 증거는 unresolved다. |
| B5 | 8 | 2 | 4 | ID/version/asset registry는 대체로 일치하지만 runtime 상태 vocabulary, mode별 alt, 증거 분모가 정적 계약과 완전히 일치하지 않는다. |
| **Core** | **60** |  | **37** |  |
| M1 | 12 | 3 | 9 | 시각·voice·identity의 의도적 연속성은 확인되지만 실제 사용과 물리 매체 증거가 없다. |
| M2 | 12 | 1 | 3 | 7개 매체의 형태는 있으나 핵심 delta가 잘못된 scope로 전파됐고, 35행은 매체별 exact-size 전후 proof와 직접 연결되지 않는다. |
| M3 | 8 | 2 | 4 | affected/unknown/alternative/local commit의 일부 경로는 작동한다. 그러나 exact-batch predicate와 binding-first rollback이 없고 rollback 후 매체 상태가 서로 갈린다. |
| M4 | 4 | 2 | 2 | sample-frame와 production 경계는 명시했지만 실제 접근성·권리·vendor·production proof가 없다. |
| M5 | 4 | 2 | 2 | 수정 기록은 있으나 사람 부담과 attribution/reuse의 재현 가능한 전체 분모가 없다. |
| **Maintenance** | **40** |  | **20** |  |
| **합계** | **100** |  | **57** | **STOP** |

## 3. C1–C4 보조 진단

`C1–C4`는 공통 프레임에서 Track 2 Product UX Core다. Track 1의 공식 `B + M` 총점에 섞지 않고, 이번 두 인터랙티브 표면의 의미 보존을 확인하는 보조 anchor로만 기록한다.

| Core | R3-A | R3-B | 근거 |
| --- | ---: | ---: | --- |
| C1 목표·객체·commit·결과 의미 | 2 | 1 | R3-A는 로컬 선택 의미가 있으나 hidden HOLD copy가 상태를 오염시킨다. R3-B는 exact batch 객체가 product-wide predicate로 축약된다. |
| C2 상태·전이·검증·복구 | 2 | 2 | 정상 경로는 있으나 실제 state suite가 불완전하고 release/rollback이 Binding 및 7매체보다 먼저 로컬 boolean을 바꾼다. |
| C3 계층 귀속·추적성 | 2 | 2 | owner 문서는 명확하지만 runtime shadow data와 PASS ledger가 상위 계약을 정확히 재현하지 못한다. |
| C4 접근성·신뢰·권리·데이터 경계 | 3 | 3 | 거짓 production·안전·권리 주장은 피했지만 screen reader, zoom, 실권리, 대표 사용자 증거가 없다. |

모든 활성 Core anchor가 3 이상이어야 한다는 출구 조건을 만족하지 않는다.

## 4. Hard-gate 결함 원장

### 4.1 P0

| ID | 단계 | 결함 | 직접 근거 | 판정 |
| --- | --- | --- | --- | --- |
| `R3-P0-SCOPE-01` | R3-B | 계약은 `CS-03 + CS03-SYN-2608-H01`만 차단하라고 하지만, 두 UI는 batch를 모르는 제품 선택 시점부터 모든 `CS-03` commit을 차단한다. 이는 계약의 “잘못된 product/batch 차단 또는 scope 숨김” P0 정의에 해당한다. | [`hold-01-change-contract.md`](../contracts/hold-01-change-contract.md) HBI-01, activation, P0 §11; [`preview.js`](../preview.js) `held`/commit predicate; [`commerce.js`](../commerce.js) `held`/commit predicate; [`03-interaction-tests.md`](03-interaction-tests.md) generic CS-03 PASS 행 | **OPEN / STOP** |

이 결함은 “안전하게 더 넓게 막았다”로 통과시킬 수 없다. 실험의 평가 대상은 exact-batch truth continuity이며, 계약 자체가 범위 확대를 P0로 동결했다.

### 4.2 P1

| ID | 노출 단계 | 결함 | 직접 근거 | 판정 |
| --- | --- | --- | --- | --- |
| `R3-P1-BASE-A11Y-01` | R3-A | baseline은 `not-activated`인데 unconditional `.sr-only` HOLD 요약은 exact batch가 판매 보류이고 commit 차단·claim 철회가 활성이라고 읽힌다. screen-reader 사용자에게 보이는 상태와 다른 사실을 제공한다. | [`preview-baseline.html`](../preview-baseline.html) 마지막 `HOLD 상태 계약 요약`; [`02-evaluation-contract.md`](../02-evaluation-contract.md) fact/status hard gate | **OPEN / STOP** |
| `R3-P1-ALT-STATE-01` | R3-A ↔ R3-B | HOLD 전환 시 모든 교체 이미지에 하나의 generic HOLD alt를 덮어쓰고, baseline 복귀 때 원래 alt를 복원하지 않는다. product still·packaging·shop의 접근성 상태가 시각 mode와 달라진다. | [`preview.js`](../preview.js) `setMode()`의 `image.alt` 처리 | **OPEN / STOP** |
| `R3-P1-ROLLBACK-01` | R3-B | release/rollback은 Product Binding state를 먼저 갱신하지 않고 `holdReleased` boolean으로 commit만 복원한다. hero/status rail/Packaging/Web projection은 HOLD에 남고 고객 sample에는 rollback 경로가 없다. | [`hold-01-change-contract.md`](../contracts/hold-01-change-contract.md) §9–10; [`preview.js`](../preview.js) `issueRelease()`/`runRollback()`; [`03-interaction-tests.md`](03-interaction-tests.md) “scoped restore” PASS 행 | **OPEN / STOP** |

단계별 open P1 수는 R3-A `2`, R3-B `2`다. `ALT-STATE-01`은 두 mode 사이의 공통 transition 결함이므로 두 단계 노출에 각각 반영했다.

## 5. P2/P3와 미측정

다음은 P0/P1을 닫아도 남는 단계 결함이다.

1. **접근성 P2:** 200% browser zoom과 screen reader를 실행하지 않았다. 실제 Tab/Shift+Tab/Enter/Space traversal, live-region 발표, Commerce invalid error association도 완결 증거가 없다. 일부 mobile control은 frozen 44×44 target보다 작다.
2. **매체 증거 P2:** screenshot 묶음은 웹 viewport `1440×1000`, `390×844` 중심이다. Packaging `60×120mm`, Shop 거리 단계, Merch 인쇄면, OOH `2:1/1:2`, Ads 3종의 frozen-size baseline/HOLD 전후 proof와 manifest가 없다. 따라서 `34/35`는 HTML projection checklist 결과이지 실제 production 또는 완결된 매체 sample proof가 아니다.
3. **분모·추적성 P2:** 15 impact row와 35 check row에 원자적 evidence ID가 없고, Product-fact Parity는 runtime에 없는 canonical fact field를 포함하지 않는다. Claim Traceability의 market/renewal, component reuse/override의 전체 분모도 재계산할 수 없다.
4. **동결 chronology P2:** 미승인 `09:00` T0 placeholder를 발견한 뒤 `17:08`로 정정한 사실은 기록했다. 그러나 같은 `0.1.0-experiment` revision 안에서 activation identity를 바꿨으므로 “결과 전 동결”의 불변 감사는 약해졌다.
5. **성능 P2:** responsive markup과 파일 크기 구조는 좋아졌지만 throttled LCP/CLS, 실제 전송량 budget, decode behavior를 검증하지 않았다.
6. **내부 preview navigation P2:** sticky header에 대응하는 scroll offset이 없어 `#media`/`#reserve` anchor heading 일부가 header 뒤에 가려진다.
7. **증거 drift P2:** strict validator의 현재 sample image 수는 `12`, registry used asset 수는 `57`인데 기존 evidence에는 `10/10`, `55/55`가 남아 있다. 정적 PASS 자체는 유효하지만 기록 분모가 최신 snapshot과 일치하지 않는다.
8. **시각 정리 P3:** mobile capture에서 merch micro-label과 본문이 붙어 보이는 등 소규모 조판 결함이 남는다.

## 6. Validator 독립 재실행

다음 명령을 read-only로 재실행했다.

```sh
node tools/validate-r3.mjs --json --strict-warnings
```

결과는 `PASS`, error/warning `0/0`이다.

| 정적 검사 | 결과 |
| --- | ---: |
| baseline/hold image alt·loading·dimensions·responsive | 각 `20/20`, `100%` |
| sample-commerce image alt·loading·dimensions·responsive | `12/12`, `100%` |
| baseline/hold button type/name | 각 `27/27`, `100%` |
| sample-commerce button type/name | `12/12`, `100%` |
| 7 medium / 12 object token | `100% / 100%` |
| local reference | `228` 검사, missing/outside `0/0` |
| registry | `75/75` valid, used `57/57` registered |
| forbidden R1 reference | `0` |

이 PASS는 정적 파일 무결성에 한정된다. validator 설명대로 JS predicate, state transition, keyboard, live announcement, 200% reflow, screen reader, contrast, 성능, 권리·규제·production truth는 증명하지 않는다. 이번 hard-gate 결함은 바로 그 의미 계층에서 발견됐다.

## 7. 증거·상업 경계

| 대상 | 현재 인정 | 인정하지 않는 것 |
| --- | --- | --- |
| 내부 preview / customer sample | 신규 browser render `E2`; 일부 local click/state trace `E3` | production commerce, 실제 inventory/batch/fulfillment, 완전한 접근성 |
| Moodboard·Packaging·Shop·Merch·OOH·Ads | HTML sample-frame와 시각 projection `E1/E2` | dieline, print/fabric/signage proof, 실제 거리 가독성, vendor 배포·철거, platform cache propagation |
| Asset registry | 파일·hash·dimensions·source field 추적 `100%` | 상표·폰트·모델·이미지·용기·campaign 상업권리 승인 |
| Product/claim | synthetic ID·working name·withdrawn claim 계약 `E1` | INCI, 용량, 가격, 재고, 실제 batch, 안전·효능·규제 승인 |
| 사용자 평가 | template 존재 | 점수·선호·이해·실사용 근거; 현재 [`08-user-evaluation.md`](08-user-evaluation.md)는 전 항목 대기 |

따라서 sample-frame을 production proof로, validator PASS를 상업 승인으로, 로컬 rollback을 외부 incident 복구로 표현해서는 안 된다.

## 8. 유지할 성과

- Pack / UX Preset / Product Binding / Brand Experience / Composition의 소유권 문장은 이전보다 명확하다.
- 12개 ID, 경로형 identity family, token alias, 75개 asset registry, local reference는 정적 검증에서 안정적이다.
- all-gender, 비진단, no-shaming, unknown ≠ safe, local result ≠ commerce 경계가 일관되게 보인다.
- 1440/390 화면에서 page-level horizontal overflow 0, 이미지 로드, console error 0 증거가 있다.
- 권리·실데이터·생산·사용자·보조기술 gap을 숨기지 않고 `unresolved`로 둔 판단은 유지해야 한다.

## 9. 재평가 전 최소 수정 조건

1. Product Binding의 exact batch state를 runtime source에 구조화하고, commit/fulfillment predicate가 `productId + batchId + authority state`를 함께 평가하게 한다.
2. release record를 Binding에 먼저 적용하고 exact product/batch/scope/effective time/approver를 검증한 뒤, 7매체 projection과 고객 sample을 같은 revision으로 rollback한다.
3. baseline/HOLD의 hidden copy와 alt를 mode별 source에서 재생성하고 HOLD → baseline → HOLD 왕복 접근성 회귀 테스트를 추가한다.
4. 15 impact, 35 medium, fact/claim/state/reuse/override 분모마다 evidence ID와 실제 numerator를 연결한다.
5. 각 매체의 frozen-size baseline/HOLD sample capture와 manifest를 만들고, sample proof와 vendor/production proof를 계속 분리한다.
6. 실제 keyboard traversal, 200% zoom, screen reader, live/error association, 44×44 target, reduced motion, throttled performance를 검증한다.
7. T0 정정과 의미 변경은 새 revision으로 동결하고 strict validator 결과·분모·evidence를 같은 snapshot에서 재생성한다.
8. P0/P1 수정 후 builder가 먼저 새 점수를 기록하고, 이 reviewer가 같은 frozen rubric으로 재평가한다. 대표 사용자 평가는 그 뒤에도 별도 표로 유지한다.

---

## 10. 0.1.1 재평가

> **재평가 스냅샷:** 2026-08-26 19:10 KST  
> **대상:** `composition.common-surface.r3-hold-01@0.1.1-experiment`  
> **평가 독립성:** builder 점수는 입력으로 사용하지 않고 frozen rubric, 현재 contract/runtime, 보존된 브라우저 기록·캡처, strict validator 결과로 다시 산정했다.  
> **증거 ceiling:** 계약·정적 구조 `E1`, sample-frame·캡처 `E2`, 기존 로컬 상호작용 기록 일부 `E3 claimed`; 실제 권리·보조기술·물리 매체·vendor·production·대표 사용자 증거는 `E4 unresolved`.  
> **Confidence:** 전체 `C1`. H01/U01/unknown과 baseline alt/hidden 수정은 현재 source와 보존 증거가 일치하지만, reviewer 환경에서 브라우저 상호작용을 새로 재생하지 못했고 release PASS 기록은 현재 source와 일치하지 않는다.

### 10.1 독립 판정

| 단계 | Brand Governance Core | Maintenance | 합계 | P0 / P1 | Hard gate | Stage 판정 |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| R3-A 정상화 | `40 / 60` | `23 / 40` | **`63 / 100`** | `0 / 1 open` | **FAIL** | **STOP** — draft·입력의 Back/reload retention P1, `80` 미만, B3·B5 및 보조 C2·C3 anchor가 `3` 미만 |
| R3-B HOLD / 01 | `37 / 60` | `23 / 40` | **`60 / 100`** | `1 / 3 open` | **FAIL** | **STOP** |

0.1.1은 1차 검토의 exact-batch P0와 baseline alt/hidden P1을 실제로 닫았다. 그러나 두 웹 surface에서 draft·입력의 Back/reload retention이 구현되지 않았고, release record가 frozen 필수 조건을 충족·검증하지 않은 채 HOLD를 해제하며, customer Web과 persisted batch authority가 같은 Binding revision을 따르지 않는다. 점수로 상쇄할 수 없는 hard gate가 남으므로 전체 최종 허용 문장은 **`현재 구조 재설계 필요`**다.

### 10.2 0–4 anchor와 가중점수

`환산점수 = anchor ÷ 4 × 배점`을 반점 없이 적용했다.

| ID | 배점 | R3-A anchor | R3-A 환산 | R3-B anchor | R3-B 환산 | 독립 근거 |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| B1 | 16 | 3 | 12 | 3 | 12 | all-gender, 비진단, 설명 우선, visible uncertainty, quiet recovery가 계약과 표면에 유지된다. 실제 대표 사용자 관찰은 없다. |
| B2 | 12 | 3 | 9 | 2 | 6 | R3-A는 12 stable ID와 필수 runtime field를 갖췄다. R3-B는 불완전한 release authority, customer Web 미전파, H01의 `unaffected` 오분류라는 중요한 상태 gap이 남는다. |
| B3 | 12 | 2 | 6 | 2 | 6 | 계층 owner와 revision은 보이지만 의미 변경을 patch version에 덮었고, release PASS ledger가 실제 두 웹 surface 및 persisted record와 충돌한다. |
| B4 | 12 | 3 | 9 | 3 | 9 | 합성 사건·claim·실데이터·권리 ceiling을 명시하고 unknown을 safe로 표현하지 않는다. 200% zoom, screen reader, 실제 권리·규제·vendor는 미검증이다. |
| B5 | 8 | 2 | 4 | 2 | 4 | strict validator의 ID·link·asset 일관성은 강하다. 다만 freeze rule과 0.1.1 의미 변경, canonical truth key의 runtime 축약, 증거 snapshot drift가 중요 gap이다. |
| **Core** | **60** |  | **40** |  | **37** |  |
| M1 | 12 | 3 | 9 | 3 | 9 | Industrial Swiss와 Brand Experience의 voice·identity 연속성은 sample에서 보존된다. 실제 사용자·실매체 검증은 없다. |
| M2 | 12 | 2 | 6 | 2 | 6 | 7매체 전후 sample-frame은 있으나 실제 크기·재료·vendor proof가 없고, release의 Web projection은 customer sample까지 도달하지 않는다. |
| M3 | 8 | 2 | 4 | 2 | 4 | 현재 session의 draft·commit·cancel·reset은 실행 가능하지만 Back/reload에서 유효 draft·입력을 보존하지 않는다. R3-B의 release authority와 post-release state도 잘못 처리한다. |
| M4 | 4 | 2 | 2 | 2 | 2 | claim·권리·접근성·생산 gap은 정직하게 분리했지만 실제 proof는 없다. |
| M5 | 4 | 2 | 2 | 2 | 2 | 역할·수정 이력은 있으나 사람 수정 시간, 전체 correction/reuse/override 분모와 실제 운영 부담 원자료가 없다. |
| **Maintenance** | **40** |  | **23** |  | **23** |  |
| **합계** | **100** |  | **63** |  | **60** |  |

### 10.3 보조 Product UX Core

공식 `B + M` 총점과 섞지 않는다.

| Core | R3-A | R3-B | 근거 |
| --- | ---: | ---: | --- |
| C1 목표·객체·commit·결과 의미 | 3 | 3 | batch 없는 제품 초안, exact H01, U01, unknown, local result 경계는 이제 분리된다. |
| C2 상태·전이·검증·복구 | 2 | 2 | 공통 Back/reload retention과 접근성 상태 검증이 불완전하고, R3-B release는 필수 authority 검증·customer projection·persisted state가 끊긴다. |
| C3 계층 귀속·추적성 | 2 | 2 | owner 문서는 있으나 runtime 축약, patch revision, PASS evidence와 실제 source의 불일치가 남는다. |
| C4 접근성·신뢰·권리·데이터 경계 | 3 | 3 | false-safe와 production 과장은 피하지만 실제 보조기술·권리·production·사용자 증거는 없다. |

모든 활성 Core anchor가 `3` 이상이어야 하는 출구 조건을 두 단계 모두 충족하지 않는다.

### 10.4 요청된 수정 항목별 검증

#### A. exact-batch decision matrix

| 상태 | 내부 preview | customer sample | 독립 판정 |
| --- | --- | --- | --- |
| batch 없는 `CS-03` | `batchless-local-product-selection`, commit enabled, 판매·재고·fulfillment 아님 | 제품 수준 local draft, commit enabled, commerce 아님 | **PASS** |
| exact H01 | `affected`, commit disabled | `affected`, commit disabled | **PASS** |
| U01 | `unaffected`, local commit 가능, 실제 안전·재고·판매 가능 아님 | 동일 | **PASS** |
| unknown/invalid/partial/stale | false clearance 없이 commit disabled, 입력·후보 보존 | unknown/invalid false clearance 없이 disabled; partial/stale는 customer fixture에 직접 경로 없음 | **PASS with gap** |

직접 근거는 [`preview.js`](../preview.js)의 `commitPolicy()`·`runBatchLookup()`, [`commerce.js`](../commerce.js)의 `commitPolicy()`·`checkBatch()`, [`03-interaction-tests.md`](03-interaction-tests.md)의 `E3-INT-01–04`, `E3-COM-01–04`, exact H01 캡처다. 1차 `R3-P0-SCOPE-01`은 **CLOSED**다.

#### B. baseline hidden copy와 alt 왕복

- [`preview-baseline.html`](../preview-baseline.html)의 HOLD 요약은 build-time `hidden`이다.
- [`preview-hold.html`](../preview-hold.html)은 같은 요약을 HOLD mode에서 노출한다.
- 교체 이미지 3개는 각각 `data-baseline-alt`와 `data-hold-alt`를 갖고, [`preview.js`](../preview.js)는 현재 visual mode의 `src`, `srcset`, `alt`를 함께 적용한다.
- 따라서 1차 `R3-P1-BASE-A11Y-01`, `R3-P1-ALT-STATE-01`은 **CLOSED**다. 다만 실제 screen reader 발표 검증은 여전히 없다.

#### C. release·rollback

내부 preview에서 Binding revision을 먼저 `binding.common-surface.catalog.r3@0.1.1-release-verified`로 바꾸고, 일곱 개 DOM projection node를 `release-restored / claim-withdrawn`으로 갱신하는 순서는 존재한다. 이 부분만 **PASS**다.

그러나 전체 recovery 계약은 **FAIL**이다.

1. release record에는 frozen 계약이 요구한 commit/fulfillment restore permission, customer-facing update copy, unresolved authority disclaimer, 7-medium rollback impact map이 구조화돼 있지 않다.
2. `scopeMatches`는 `scope`, `effectiveAt`, `approver`를 비교하지 않는데도 Binding을 `release-verified`로 바꾼다.
3. customer [`sample-commerce.html`](../sample-commerce.html)은 별도의 `commerce.js` state machine을 매번 HOLD로 시작하고 release event/Binding revision을 소비하지 않는다. 내부 Web ledger가 restored여도 customer Web은 H01을 계속 HOLD로 본다.
4. rollback 뒤 내부 state는 H01을 `batchStatus = 'unaffected'`로 바꾼다. 이후 commit record는 H01과 `batchAuthorityState: 'unaffected'`를 함께 저장할 수 있어 U01과 `release-restored`를 혼동한다.

#### D. runtime canonical catalog

각 12개 runtime object에 `catalog_state`, `claim_authority_state`, `market`, `availability`, `last_updated_at`이 존재하므로 1차 누락은 **구조적으로 CLOSED**다.

다만 canonical parity 전체는 **부분 PASS**다. Cross-touchpoint truth contract의 `market_state`, `availability_state`, `hold_event_id`, `affected_batch_id`, `support_route_state`가 제품 object별 동일 key/source로 완결되지 않고 일부는 `system` object나 화면 copy로 흩어져 있다. `CS-03`·`CS-06` form도 정본의 `드로퍼 보틀`, `리필형 알루미늄 펌프`보다 runtime에서 각각 `코발트 드로퍼 보틀`, `알루미늄 펌프`로 달라 `WEB-05 canonical parity 100%` 주장은 재산정이 필요하다.

#### E. Back/reload retention

[`03-implementation-inventory.md`](../03-implementation-inventory.md)는 draft와 confirmed local record를 revision-namespaced `sessionStorage`에 저장하고, Back/reload에서 유효 draft와 입력을 보존하도록 동결했다. 현재 [`preview.js`](../preview.js)는 confirmed record만 저장하고 reload 시 `confirmedId`만 복원하며 draft·batch input을 복원하지 않는다. [`commerce.js`](../commerce.js)는 local storage 자체가 없어 reload마다 draft·입력·confirmed result가 모두 초기화된다. 현재 session 안의 retry 보존과 Back/reload recovery는 같은 검증이 아니므로 **FAIL**이다.

### 10.5 0.1.1 hard-gate 원장

#### P0

| ID | 단계 | 결함 | 직접 근거 | 판정 |
| --- | --- | --- | --- | --- |
| `R3-P0-RELEASE-AUTH-02` | R3-B | 불완전한 release record를 유효 authority로 받아 HOLD를 해제한다. 필수 필드 일부가 없고 exact scope/effective time/approver를 검증하지 않으므로 frozen P0의 `release authority 없이 HOLD 해제`에 해당한다. | [`hold-01-change-contract.md`](../contracts/hold-01-change-contract.md) §9–10·P0, [`product-binding-catalog.md`](../contracts/product-binding-catalog.md) §9, [`preview.js`](../preview.js) `issueRelease()`·`runRollback()` | **OPEN / STOP** |

#### P1

| ID | 단계 | 결함 | 직접 근거 | 판정 |
| --- | --- | --- | --- | --- |
| `R3-P1-RELEASE-WEB-PARITY-02` | R3-B | 내부 7-node ledger의 Web은 restored지만 customer sample은 같은 release Binding을 소비하지 않고 HOLD에 남는다. 두 owned Web surface의 HOLD/claim 상태가 달라진다. | [`preview.js`](../preview.js) `updatePropagationLedger()`·`runRollback()`, [`commerce.js`](../commerce.js) 초기 state와 event binding | **OPEN / STOP** |
| `R3-P1-RELEASE-BATCH-STATE-02` | R3-B | release-restored H01을 `unaffected`로 저장할 수 있어 known-unaffected U01과 복원 권한 상태를 혼동한다. | [`preview.js`](../preview.js) `runRollback()`과 `commitSelection()` | **OPEN / STOP** |
| `R3-P1-RELOAD-RETENTION-02` | R3-A·R3-B | frozen contract는 valid draft와 입력을 Back/reload에서 보존하라고 하지만 내부 preview는 confirmed ID만 부분 복원하고 customer sample은 아무것도 복원하지 않는다. 실패·back·retry 맥락 보존 P1에 해당한다. | [`03-implementation-inventory.md`](../03-implementation-inventory.md) §4.3, [`preview.js`](../preview.js) storage·`restoreLocalRecord()`, [`commerce.js`](../commerce.js) 초기 state | **OPEN / STOP** |

### 10.6 잔여 P2/P3

1. **P2 — freeze/version:** 의미가 바뀐 exact-batch predicate·accessibility state·rollback을 `0.1.1` patch에 적용했다. Manifest는 의미 변경 시 `0.2.0-experiment` 이상을 요구한다. 평가 문서 상단도 아직 `동결 후보`이며, 공통 전파 목표 `≥95%`와 change contract exit의 `≥90%`가 공존한다.
2. **P2 — catalog denominator:** runtime 필수 5개 field의 존재는 확인됐지만 11개 cross-touchpoint truth field와 화면별 동일 source 분모가 없다. Product-fact Parity·Claim Traceability 100%를 재계산할 원자 자료가 부족하다.
3. **P2 — evidence atomization:** 15 impact row, 35 check, fact/claim/state/reuse/override 분모에 독립 evidence ID가 모두 연결되지 않았다. release 후 7/7과 customer surface를 함께 보여주는 durable trace/capture도 없다.
4. **P2 — 접근성:** 200% browser zoom, screen reader, 실제 보조기술, complete Tab/Shift+Tab/Enter/Space traversal, invalid error association과 target-size matrix가 미검증이다.
5. **P2 — 매체·상업 proof:** 14개 전후 캡처는 동일 웹 viewport의 sample-frame이다. 실제 packaging dieline/print, shop 거리·설치, merch 원단, OOH placement, ad platform/cache, vendor 전파·철거 evidence는 없다.
6. **P2 — chronology/SLA:** 미승인 `09:00` placeholder를 `17:08` T0로 교체한 이력 때문에 사전 동결 신뢰도가 낮다. `17:38` 수정 확인은 chronology-only이며 실제 SLA 성공으로 환산할 수 없다.
7. **P2 — performance/effort/user:** throttled LCP·CLS·decode budget, 사람 수정 시간·횟수·reuse burden, 대표 사용자 정성 평가는 미측정이다.
8. **P3 — evidence hygiene:** `r3-reserve-exact-batch-mobile.png`은 이름과 달리 `1440×1000`이다. 현재 핵심 판정 링크에는 쓰이지 않지만 다음 snapshot에서 이름 또는 캡처를 정리해야 한다.

### 10.7 strict validator 재실행

다음 명령을 0.1.1 현재 snapshot에서 read-only로 다시 실행했다.

```sh
node tools/validate-r3.mjs --json --strict-warnings
```

결과: validator `1.1.0`, **PASS**, error/warning `0/0`.

| 정적 검사 | 결과 |
| --- | ---: |
| baseline / HOLD 이미지 | 각 `19`, alt·loading·dimensions·responsive `100%` |
| customer sample 이미지 | `12`, 네 항목 `100%` |
| baseline / HOLD button type·name | 각 `29`, `100%` |
| customer sample button type·name | `12`, `100%` |
| medium ID / product ID | `100% / 100%` |
| local reference | `250` 검사, missing/outside `0/0` |
| registry | `75/75` valid, used `55/55` registered |
| semantic source pattern | `8/8` |
| forbidden R1 reference | `0` |

`semantic source pattern 8/8`은 문자열·정규식 존재 검사다. release record 필드 완전성, malformed scope negative path, 실제 state transition, customer Web rollback, persisted record 의미, keyboard·screen reader·권리·production truth는 검사하지 않는다. 따라서 validator PASS는 위 P0/P1을 닫지 않는다.

### 10.8 상업·증거 경계와 허용 결론

| 현재 인정 | 아직 인정하지 않음 |
| --- | --- |
| 합성 Product Binding, exact-batch branch, local-only draft/commit, sample-frame 전후, 내부 7-node projection 구조 | 실제 화장품 batch·안전·재고·fulfillment, 실제 incident/recall, 상업 권리, 물리 제작, vendor/platform 배포, 보조기술 적합성, 대표 사용자 수용성 |

따라서 현재 허용 가능한 최댓값은 다음과 같다.

> `COMMON SURFACE 0.1.1은 합성 로컬 prototype에서 exact-batch 선택 정책과 일부 상태 투영을 반복 검토할 수 있음을 보여준다. 그러나 release authority, cross-surface rollback, canonical persisted state가 아직 hard gate를 통과하지 못해 유지보수 시스템의 유효성이나 상업 운용 준비를 입증하지 못했다.`

공식 최종 문장은 **`현재 구조 재설계 필요`**다. 실제 권리·보조기술·물리 매체·vendor·production·대표 사용자 증거가 추가되기 전에는 `production-ready`, `상업 출시 승인`, `접근성 완료`, `실제 rollback 성공`, `유효성 강하게 입증`을 사용할 수 없다.

---

## 11. `0.2.0` 제3차 독립 재평가

> **재평가 스냅샷:** 2026-08-26 20:28 KST · `qa=029`  
> **대상:** `composition.common-surface.r3-hold-01@0.2.0-experiment`  
> **동결 SHA-256:** `preview.js f7cd7c353d6d626f67fbbb5e6478a00f728b2de4e97b473697dc8d3a96e9b35f` · `commerce.js 6c5f96c9bb0680227cc657b0f0e060610a1014c9a77b5d1667ee576bbb0fcb41` · `validate-r3.mjs 23c4663fb36aae48c01e189482e9e616126ba1fdfe629fbba9794ccf659e0649` · generated HTML `baseline 5e959baa1436d36f6e4e5681f68032cd39cb516767e88d753f67508c23724117 / hold dcacb8e1d86e4eb90667c437d066ff417b36175b30a9a4ac63e4a99819f0790b / commerce 1cff56e9cd820172bd226b0f0c2b7252907661e5cbd86b266c508d7282da551c`  
> **평가 독립성:** builder 점수 문서를 열거나 점수 입력으로 사용하지 않았다. frozen rubric, 현재 계약·runtime·generated HTML·README, `00/02–06/08` 증거, 보존 Browser/IAB 기록·캡처, 독립 headless-browser 재생과 strict validator 결과만 사용했다.  
> **증거 ceiling:** 계약·source `E1`, sample-frame·캡처 `E2`, 동일 origin 로컬 브라우저 상태 전이 `E3`; 실제 backend·권리·보조기술·물리 매체·vendor·대표 사용자 `E4 unresolved`.  
> **Confidence:** 전체 `C2`. 최종 20:27 source를 고정한 뒤 reviewer가 same-origin headless browser에서 `13/13` malformed release, 내부·고객 H01/U01/UNKNOWN, 7/7 release·HOLD 재적용, 양쪽 commit/lookup race, HOLD Binding write-failure 주입, 내부 alternative와 고객 UNKNOWN의 reload·Back을 독립 재생했고 보존 Browser/IAB 결과와 일치했다. 실제 backend·권리·보조기술·물리 매체·vendor·대표 사용자 `E4`는 여전히 없다.

### 11.1 독립 판정

| 단계 | Brand Governance Core | Maintenance | 합계 | P0 / P1 | Hard gate | Stage 판정 |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| R3-A 정상화 | `40 / 60` | `23 / 40` | **`63 / 100`** | `0 / 0 open` | PASS | **REVISE** — 총점 `80` 미만, 보조 C2 anchor `3` 미만. |
| R3-B HOLD / 01 | `40 / 60` | `23 / 40` | **`63 / 100`** | `0 / 0 open` | PASS | **REVISE** — 총점 `90` 미만, 보조 C2/C3 anchor `3` 미만. |

최종 20:27 source는 post-release H01, HOLD reapply, async settlement, 양방향 Binding write-readback, alternative retention의 확인된 결함을 닫았고 독립 E3도 일치했다. 따라서 현재 snapshot에서 open P0/P1은 확인하지 못했다. 다만 새 revision 없이 같은 `0.2.0`이 감사 중 반복 변경됐고 점수·Core anchor·상업 증거가 출구 조건에 미달한다. 공식 문장은 **`조건부 유효`**다.

### 11.2 0–4 anchor와 가중점수

`환산점수 = anchor ÷ 4 × 배점`을 반점 없이 적용했다. Core `60`, Maintenance `40`, 합계 `100`이다.

| ID | 배점 | R3-A anchor | R3-A 환산 | R3-B anchor | R3-B 환산 | 독립 근거 |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| B1 | 16 | 3 | 12 | 3 | 12 | all-gender, 비진단, visible uncertainty, quiet recovery가 Brand Experience·Composition·두 Web surface에 유지된다. 대표 사용자 관찰은 대기 중이다. |
| B2 | 12 | 3 | 9 | 3 | 9 | 12 stable ID, H01/U01/UNKNOWN 분기와 batch-aware customer confirmed record가 구조화됐다. 다만 cross-touchpoint parity의 원자 분모는 여전히 얇다. |
| B3 | 12 | 2 | 6 | 2 | 6 | 계층 owner와 exact record는 추적 가능하지만 같은 `0.2.0` runtime이 검토 중 여러 번 바뀌고 일부 README·evidence의 validator 분모가 final `29/29`와 동결되지 않았다. |
| B4 | 12 | 3 | 9 | 3 | 9 | claim·실데이터·권리·production ceiling과 unknown false-clearance 금지는 유지된다. 200% zoom, screen reader, 실권리·규제·vendor는 미검증이다. |
| B5 | 8 | 2 | 4 | 2 | 4 | 정적 ID/link/asset은 강하지만 동일 version의 runtime semantics와 validator 분모가 `16→17→19→23→26→27→29`로 변했고 canonical form 두 값도 축약·확장된다. |
| **Core** | **60** |  | **40** |  | **40** |  |
| M1 | 12 | 3 | 9 | 3 | 9 | COMMON SURFACE·Industrial Swiss·calm-incident voice의 연속성은 sample에서 유지된다. 실제 사용자·실매체 수용은 없다. |
| M2 | 12 | 2 | 6 | 2 | 6 | final same-origin Binding failure와 7/7 Web projection은 독립 E3가 있으나 물리 매체·vendor propagation proof가 없다. |
| M3 | 8 | 2 | 4 | 2 | 4 | final snapshot의 핵심 Back/race/write-failure E3는 통과했지만 cancel/retry/partial/stale/success/exit 전체 상태 분모를 하나의 동결 suite로 실행하지 않았다. |
| M4 | 4 | 2 | 2 | 2 | 2 | gap을 정직하게 분리했지만 권리·보조기술·physical/vendor/production 증거는 없다. |
| M5 | 4 | 2 | 2 | 2 | 2 | owner와 수정 이력은 있으나 사람 수정 시간·횟수, reuse/override 전체 분모와 운영 부담 원자료가 없다. |
| **Maintenance** | **40** |  | **23** |  | **23** |  |
| **합계** | **100** |  | **63** |  | **63** |  |

### 11.3 보조 Product UX Core

공식 `B + M` 총점에 섞지 않는다.

| Core | R3-A | R3-B | 근거 |
| --- | ---: | ---: | --- |
| C1 목표·객체·commit·결과 의미 | 3 | 3 | final source는 product, batch, authority, commit/result를 구분하고 settlement에서 expected product/batch를 재확인한다. |
| C2 상태·전이·검증·복구 | 2 | 2 | final snapshot의 핵심 race/Back/write-failure는 독립 E3를 통과했지만 적용 상태 전체와 recovery policy를 완전한 동결 분모로 실행하지 않았다. |
| C3 계층 귀속·추적성 | 3 | 2 | owner는 명확하지만 E3/validator PASS 범위가 실제 runtime branch보다 넓고 검토 중 같은 revision source가 바뀌었다. |
| C4 접근성·신뢰·권리·데이터 경계 | 3 | 3 | false-safe와 외부 authority 과장은 피하지만 실제 screen reader·zoom·권리·production·사용자 증거는 없다. |

두 단계 모두 open P0/P1은 없지만 각 단계에 `3` 미만 Core가 있고 점수·Core anchor가 출구 조건에 미달한다.

### 11.4 prior P0/P1 수정 항목 검증

#### A. complete release authority — P0 CLOSED at local synthetic scope

- `contracts/hold-01-change-contract.md:240–259`는 event/product/batch/scope/effectiveAt/approver/permissions/customer copy/disclaimer/7-medium map/claim decision exact 값을 동결한다.
- `preview.js:243–260`과 `commerce.js:60–76`은 위 값과 세 permission boolean, map 순서를 모두 비교한다.
- `preview.js:833–871`은 valid record 뒤 Binding을 먼저 publish하고 7개 projection을 갱신하며 claim을 withdrawn으로 유지한다.
- `preview.js:939–966`은 event/product/batch/scope/time/approver/claim decision/세 permission/customer copy/disclaimer/medium map의 `13`개 leaf를 각각 훼손한다. 최종 snapshot의 독립 E3에서 **`13/13` rejection과 HOLD retained**를 확인했다.

구현 predicate와 negative matrix가 같은 complete release authority를 검사하므로 release authority 없이 HOLD가 해제되는 P0는 현재 source에서 재현되지 않았다. 이는 실제 외부 release authority가 존재한다는 뜻이 아니다.

#### B. shared customer Binding·HOLD/release — latest source CLOSED, final independent E3 PASS

- `preview.js:289–300, 423–472, 833–871`은 HOLD와 release 모두 동일 composition key의 candidate Binding을 canonical write-readback한 뒤 내부 projection을 바꾼다.
- `commerce.js:129–160, 474–484`은 같은 key를 initial load, `storage`, `pageshow`에서 소비한다.
- 보존 `E3-020-XWEB-01/02`와 독립 브라우저 재생에서 customer surface는 `release-verified-local-only`를 소비했고 HOLD 재적용도 같은 revision으로 복귀했다.

최종 E3에서 valid release 뒤 HOLD Binding `setItem` 실패를 주입했다. 내부는 `bindingPublishState=failed`와 명시적 실패 문구를 내고, 내부·고객 모두 이전 `release-verified-local-only` revision을 유지했으며 부분 HOLD projection은 발생하지 않았다. source 수준 split-brain P0는 **CLOSED**다.

#### C. released H01 / U01 / UNKNOWN — 최신 source PASS

독립 headless-browser 재생 결과:

| 경로 | customer sample | 내부 preview | 판정 |
| --- | --- | --- | --- |
| valid release 뒤 H01 조회 | `released`, commit enabled | `released`, commit enabled | PASS |
| valid release 뒤 U01 조회 | `unaffected`, commit enabled | `unaffected`, commit enabled | PASS |
| valid release 뒤 UNKNOWN 조회 | `unknown`, commit disabled | `unknown`, commit disabled | PASS |

최신 `preview.js:698–705`는 H01을 `state.binding.holdActive ? affected : released`로 분기하고 customer `commerce.js:387–431`과 맞춘다. 최종 독립 재생에서도 양쪽 H01은 `released`/enabled, U01은 `unaffected`/enabled, UNKNOWN은 `unknown`/disabled였다. 따라서 직전 source에서 발견한 post-release H01 P1은 **CLOSED**다.

이 변경은 검토 중 같은 `0.2.0`에 추가됐다. 이전 실패와 최신 source 통과를 구분해 보존했으며 immutable revision의 단일 E3로 합치지 않는다.

#### D. release → HOLD 재적용 — latest source CLOSED

독립 재생은 다음 순서를 사용했다.

1. customer Web에서 valid release Binding을 소비하고 H01을 조회해 `released`, commit enabled를 확인했다.
2. 내부 preview에서 HOLD를 재적용했다.
3. 20:05 이전 source에서는 customer model만 `unverified`로 지우고 visible H01 input을 남겨 commit이 열렸다. 이 독립 P0 재현 뒤 source가 수정됐다.
4. 최신 `preview.js:423–461`과 `commerce.js:129–160`은 H01을 `affected`로 재분류하고 input/model을 맞춘다. 최종 독립 재생 결과는 양쪽 `hold-active`, `batchStatus=affected`, commit disabled다.

따라서 직전 source의 HOLD-reapply P0는 최신 source에서 **CLOSED**다. 이 수정이 같은 `0.2.0`에 추가된 revision chronology gap은 남는다.

#### E. overlapping lookup/commit — latest source CLOSED, final independent E3 PASS

두 runtime의 lookup과 commit은 각각 독립 `setTimeout`을 사용하지만 최신 source는 request token과 settlement 재검증을 추가했다.

- 내부 `preview.js:617–668,707–742`는 lookup/commit ID, expected product/batch, settled policy를 검사하고 새 lookup이 pending commit을 무효화한다.
- 고객 `commerce.js:313–373,387–431`도 동일하게 stale callback을 폐기하고 loading을 fail-closed 처리한다.

최종 독립 E3에서 양쪽 commit race는 confirmed record 없이 `affected`/disabled로 종료했고, 겹친 H01→U01 lookup은 양쪽 모두 마지막 U01만 `unaffected`로 적용했다. 따라서 affected-H01 race P0는 **CLOSED**다.

#### F. reload·Back retention — latest source CLOSED, final independent E3 PASS

- 내부는 `preview.js:303–375, 745–759, 1002–1010`, 고객 surface는 `commerce.js:99–160, 477–484`에서 revision-namespaced `sessionStorage` restore와 `pageshow`를 구현한다.
- 보존 `E3-020-RET-INT-01/COM-01`은 unknown draft/input/disabled decision을 reload와 Back 뒤 확인했다.
- 독립 재생에서도 customer UNKNOWN은 release Binding이 존재해도 reload 뒤 `unknown`, 입력 유지, commit disabled로 남았다.

최신 `preview.js:349–375, 423–500, 745–759`은 release Binding restore가 alternative/user-draft/success/retry를 덮지 않게 한다. 최종 독립 E3에서 release+alternative의 FACE/CS-02/`alternative`/live copy가 reload와 Back 전후 exact 일치했고 customer UNKNOWN도 입력·disabled 상태를 유지했다. 기존 retention P1은 **CLOSED**다.

### 11.5 hard-gate 원장

#### P0

최종 `qa=029` source와 독립 E3에서 open P0는 확인하지 못했다. 검토 중 확인한 post-release H01, HOLD reapply, async commit race, HOLD publish split-brain은 현재 predicate·transaction·settlement guard에서 닫혔다.

#### P1

최종 `qa=029` source와 독립 E3에서 open P1은 확인하지 못했다. alternative release reload·Back의 의미 보존도 닫혔다. 단, 아래 P2 증거·freeze gap 때문에 Stage는 통과하지 않는다.

### 11.6 잔여 P2/P3

1. **P2 — validator coverage:** `tools/validate-r3.mjs:673–718`은 정규식 존재를 검사한다. semantic `29/29`는 독립 E3와 결합해야 하며 storage read exception, 모든 cancel/retry/partial/stale/success/exit 조합, 실제 accessibility tree를 직접 실행하지 않는다.
2. **P2 — freeze/governance:** `02-evaluation-contract.md:3`은 아직 `동결 후보`이고 평가 목표 `≥95%`와 change contract exit `≥90%`가 공존한다. 독립 검토 중 같은 `0.2.0` 아래 runtime과 validator가 20:27 KST까지 의미 변경됐고, `03-implementation-inventory.md`는 아직 `1.2.0·16/16·10/10`, 일부 R3 README·evidence는 `27/27`, 현재 validator는 `1.3.0·29/29`라 revision evidence가 동결되지 않았다.
3. **P2 — canonical parity:** `catalog.js:5,8`의 `코발트 드로퍼 보틀`·`알루미늄 펌프`는 Product Binding 정본의 `드로퍼 보틀`·`리필형 알루미늄 펌프`와 축약·확장 관계다. cross-touchpoint truth field도 product object와 system/copy에 흩어져 있어 Product-fact Parity 100%의 원자 분모가 없다.
4. **P2 — medium evidence:** 35 check와 전후 Web captures는 sample-frame/viewport 증거다. packaging dieline, shop 거리·설치, merch 원단, OOH placement, ad platform/cache, vendor propagation/rollback은 없다.
5. **P2 — accessibility:** keyboard/focus/390px 일부 기록은 있으나 200% zoom, screen reader, 실제 보조기술, complete traversal·announcement·error association은 미검증이다.
6. **P2 — effort/performance/user:** 사람 수정 시간·횟수·AI turn·reuse burden, throttled LCP/CLS/decode budget, 대표 사용자 8항목 평가는 미측정이다.
7. **P2 — chronology:** 미승인 `09:00` placeholder를 승인 T0 `17:08`로 교체한 한계는 보존돼 있다. 실제 SLA 또는 운영 대응 성공으로 환산할 수 없다.
8. **P2 — mobile evidence:** `sample-commerce-020-hold-mobile-390x844.png`와 `sample-commerce-020-release-mobile-390x844.png`는 SHA-256가 동일하다. dimensions는 맞지만 release/HOLD 차이를 입증하는 두 증거로 셀 수 없다.
9. **P3 — historical evidence hygiene:** 이전의 이름과 dimensions가 다른 mobile 캡처는 핵심 0.2.0 판정에서 제외해야 한다.

### 11.7 strict validator `1.3.0` 독립 재실행

다음 명령을 최신 20:28 `qa=029` source와 review append가 포함된 snapshot에서 실행했다.

```sh
node tools/validate-r3.mjs --json --strict-warnings
```

결과: validator `1.3.0`, **PASS**, error/warning `0/0`.

| 정적 검사 | 결과 |
| --- | ---: |
| baseline / HOLD 이미지 | 각 `19`, alt·loading·dimensions·responsive `100%` |
| customer sample 이미지 | `12`, 네 항목 `100%` |
| baseline / HOLD button | 각 `30`, type·accessible name `100%` |
| customer sample button | `12`, 두 항목 `100%` |
| local reference | `259` 검사, missing/outside `0/0` |
| registry | `75/75` valid, used `55/55` registered |
| semantic source pattern | `29/29` |
| forbidden R1 reference | `0` |

`tools/README.md:211–226`이 명시하듯 이 validator는 정적 source pattern gate다. 이번 독립 E3가 selected lookup/commit, write-failure와 Back을 보충했지만 validator 자체가 accessibility tree, 200% reflow, 모든 recovery 조합, 권리·규제·production truth를 증명하지는 않는다.

### 11.8 증거·상업 경계와 허용 결론

| 현재 인정 | 아직 인정하지 않음 |
| --- | --- |
| exact synthetic release predicate, shared same-origin Binding, 양쪽 H01/U01/UNKNOWN 분리, safe H01 HOLD reapply, selected lookup/commit race와 HOLD write-failure E3, alternative·UNKNOWN reload/Back, 13/13 malformed rejection, 정적 asset/reference 무결성 | exhaustive recovery suite, 실제 backend·화장품 batch·안전·재고·fulfillment, 상표/font/이미지 권리, 보조기술, physical/vendor/platform 전파, 대표 사용자 수용성 |

허용 가능한 최댓값은 다음과 같다.

> `COMMON SURFACE 0.2.0 qa=029는 합성 동일-origin prototype에서 complete release predicate, shared Product Binding, H01/U01/UNKNOWN 분리, HOLD 재적용, async settlement, alternative retention과 write-failure guard를 독립 E3로 재현했다. 다만 같은 version이 감사 중 반복 변경됐고 현재 문서 분모도 final 29/29와 완전히 동결되지 않았으며 실제 상업·접근성·물리·사용자 증거는 없다.`

따라서 공식 최종 문장은 **`조건부 유효`**다. `production-ready`, `상업 출시 승인`, `접근성 완료`, `실제 rollback 성공`, `유효성 강하게 입증`은 사용할 수 없다.
