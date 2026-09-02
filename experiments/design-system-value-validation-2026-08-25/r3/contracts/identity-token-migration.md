# COMMON SURFACE R3 — Identity & Token Migration

> **Migration ID:** `migration.common-surface.identity-r2-to-r3`  
> **Version:** `0.2.0-experiment`  
> **From:** `composition.common-surface.r2`  
> **To:** `composition.common-surface.r3-hold-01@0.2.0-experiment`  
> **Status:** `preserve-identity / add-semantic-state-contract`  
> **Evidence:** 계약·token diff `E1`; 신규 R3 path master와 화면 렌더 `E2`; 실제 인쇄·자수·간판·권리는 unresolved.

## 1. Migration decision

R3는 rebrand가 아니다. 다음을 유지한다.

- `COMMON SURFACE` / `커먼 서피스` 이름;
- 현재 맞물린 `C/S` symbol concept;
- primary wordmark, independent symbol, horizontal lockup의 세 family;
- Industrial Swiss의 12-column grid, hard utility, material honesty;
- warm paper / ink / bounded blue / bounded red의 R2 visual character;
- `CS-01–11`, `OBJ-06` code language.

HOLD를 로고 변형, 붉은 점멸, 검은 띠, 경고 패턴 또는 “위기용 브랜드”로 표현하지 않는다. Identity는 안정된 출처를 제공하고, 상태는 별도 semantic component가 설명한다.

## 2. Preserved production references

| Asset role | R2 reference | R3 action | Authority / evidence |
| --- | --- | --- | --- |
| Primary wordmark | [`common-surface-wordmark-path.svg`](../assets/identity/common-surface-wordmark-path.svg) | R2 개념 보존 + 경로형 정규화 | experiment-approved-synthetic / R3 E2 target |
| Independent symbol | [`common-surface-symbol-primary.svg`](../assets/identity/common-surface-symbol-primary.svg) | R2 geometry 보존 | experiment-approved-synthetic / R3 E2 target |
| Horizontal lockup | [`common-surface-lockup-path.svg`](../assets/identity/common-surface-lockup-path.svg) | R2 개념 보존 + 경로형 정규화 | experiment-approved-synthetic / R3 E2 target |
| Logo application imagery | packaging, merch, store, collateral R2 PNG | reference-only; master로 사용 금지 | experiment-approved-synthetic / R2 E2 |

상표·폰트·인쇄·자수·간판·제품 적용 권리는 모두 `unresolved`다.

## 3. R2 conflict ledger

R3에서 조용히 하나를 선택하지 않고 충돌을 명시한다.

| Conflict ID | R2 sources | Conflict | R3 state | Resolution owner |
| --- | --- | --- | --- | --- |
| `ID-CONFLICT-01` | Commercial r2 vs Logo System r2 | 보호 여백이 `적색 기준점 폭 2배`와 `symbol width 1/4`로 다름 | `unresolved / blocking-for-production` | Identity owner |
| `ID-CONFLICT-02` | Commercial r2 vs Logo System r2 | 최소 크기의 canonical 단위·매체 proof가 한 정본에 통합되지 않음 | `unresolved / production-gap` | Identity + Medium owner |
| `ID-CONFLICT-03` | R2 generated applications vs SVG masters | 생성 이미지 속 심벌 세부가 master와 달라질 수 있음 | `experiment rule: SVG wins` | Composition owner |

실험용 디지털 R3 projection에서는 SVG master를 사용한다. 물리 생산은 `ID-CONFLICT-01/02`가 닫히기 전 승인할 수 없다.

## 4. Raw token preservation

R3는 새 raw palette를 만들거나 R2 값을 변경하지 않는다.

| Raw token | R2 value | R3 action | Evidence boundary |
| --- | ---: | --- | --- |
| `--cs-paper` | `#F3EFE7` | preserve | 문서 값 E1; 실제 substrate/렌더 proof unresolved |
| `--cs-ink` | `#1A1713` | preserve | 문서 값 E1 |
| `--cs-blue` | `#315B78` | preserve as bounded brand field | 상태의 유일 단서 금지 |
| `--cs-red` | `#C7382C` | preserve as primary action/alignment signal | HOLD의 유일 단서 금지 |
| `--cs-stone` | `#746D63` | preserve | 작은 필수 안내에 단독 사용 금지 |
| `--cs-line` | `#B9B0A3` | preserve | 실제 대비·인쇄 hairline proof unresolved |

## 5. Semantic token migration

아래는 새 raw color가 아니라 R2 token을 역할별로 다시 묶는 R3 Composition alias다. 값은 `derived-contract / E1`이며 실제 contrast 통과를 증명하지 않는다.

```css
:root {
  /* preserved brand roles */
  --cs-color-page: var(--cs-paper);
  --cs-color-text: var(--cs-ink);
  --cs-color-border: var(--cs-line);
  --cs-color-brand-field: var(--cs-blue);
  --cs-color-action-primary: var(--cs-red);
  --cs-color-focus: var(--cs-red);

  /* HOLD / 01 semantic roles */
  --cs-status-hold-surface: var(--cs-paper);
  --cs-status-hold-text: var(--cs-ink);
  --cs-status-hold-border: var(--cs-ink);
  --cs-status-hold-accent: var(--cs-red);
  --cs-status-information-accent: var(--cs-blue);
  --cs-status-muted-border: var(--cs-line);
}
```

### Required redundancy

`status-hold-accent`만으로 HOLD를 표현할 수 없다. 모든 적용 surface는 다음을 함께 가진다.

1. 텍스트 label `판매 보류`;
2. 영향 object `CS-03`과 합성 batch 범위;
3. 원인 범위 또는 `확인 중` 상태;
4. 차단된 행동;
5. 보존된 맥락;
6. 확인·대체·지원 중 가능한 다음 행동;
7. 마지막 갱신과 합성 event ID.

## 6. Component token additions

| Component token | Value / mapping | Required behavior |
| --- | --- | --- |
| `--hold-border-width` | `2px` derived test value | 인쇄·화면에서 의미 있는 boundary; production proof unresolved |
| `--hold-accent-width` | `4px` derived test value | 보조 accent rail; 텍스트·아이콘 대체 불가 |
| `--hold-icon-size` | `1em` minimum derived | label과 함께 사용; icon-only 금지 |
| `--hold-focus-outline` | `2px` + `3px` offset derived | 실제 surface 대비 측정 필요 |
| `--hold-message-measure` | `48ch` maximum derived | 원인·영향·다음 행동이 분리되는 읽기 폭 |
| `--hold-touch-target` | target Medium의 access floor | 값 `unresolved` until adapter; 축소 금지 |

`2px`, `4px`, `1em`, `48ch`는 R3 prototype용 `experiment-approved-synthetic` 값이다. 실제 포장·간판·보조기술 적합성을 의미하지 않는다.

## 7. Content-state tokens

| Token | Synthetic canonical copy | 사용 경계 |
| --- | --- | --- |
| `status.hold.label` | `판매 보류` | 실제 recall·위험 등급을 암시하지 않음 |
| `status.hold.scope` | `CS-03 일부 합성 batch` | 실제 batch가 아님을 R3 evidence에서 명시 |
| `status.hold.reason` | `근거와 상태를 확인 중입니다.` | 의료·안전 원인 생성 금지 |
| `status.hold.selection` | `이 batch는 현재 선택하거나 진행할 수 없습니다.` | commit 차단을 명확히 표현 |
| `status.hold.context` | `입력과 다른 제품 후보는 유지됩니다.` | 실제 시스템에서 검증 전 E3 주장 금지 |
| `status.hold.next` | `batch 확인 · 다른 제품 보기 · 지원 경로 확인` | 실제 고객센터처럼 위장 금지 |
| `claim.withdrawn.label` | `근거 미확보 표현 사용 중지` | `BARRIER` working name과 효능 claim을 분리 |
| `status.release.pending` | `해제 권한이 확인되지 않았습니다.` | 시간 경과로 정상화 금지 |
| `status.release.local-only` | `exact H01의 로컬 선택만 복원했습니다.` | 실제 판매·재고·fulfillment·claim 복원으로 확장 금지 |
| `status.batch.released` | `H01 · local release` | H01 release authority 상태; U01 비영향 상태와 구분 |
| `status.batch.unaffected-fixture` | `U01 · 비영향 합성 fixture` | 실제 안전·재고·판매 가능 판정 금지 |

Copy는 번역·법무·실제 incident 승인이 아니다. R3 experiment 내 E1 기준선이다.

## 8. Identity behavior during HOLD

### Do

- 정상 wordmark/lockup을 유지하고 HOLD component를 별도 영역에 배치;
- product ID와 event ID를 mono metadata로 표시;
- HOLD action과 일반 brand CTA를 시각·문구로 구분;
- OOH·광고에서 영향 claim creative를 suppress하고 승인된 generic brand creative로 교체;
- store에서 10m identity, 3m product category, arm-length hold detail의 거리 위계를 유지.

### Do not

- symbol을 깨뜨리거나 회전·점멸·경고 삼각형으로 변형;
- 모든 화면·매체를 빨간색으로 채워 영향받지 않은 제품까지 위험하게 보이게 함;
- `BARRIER` 이름을 안전·효능 증거로 사용;
- OOH에 작은 글자로 HOLD 정보를 숨김;
- 기존 포장 이미지를 수정해 실제 인쇄물이 바뀐 것처럼 제시;
- logo application 생성 이미지를 생산 master로 사용.

## 9. Typography and localization migration

R2 한국어·영문 조판 규칙을 유지한다.

| Content | Required role | HOLD rule |
| --- | --- | --- |
| HOLD headline | CJK sans bold / equivalent | condensed uppercase imitation으로 한글을 압축하지 않음 |
| Product / batch ID | mono | 설명 문단에 mono 사용 금지 |
| Cause and next action | body `16/26` reference | 실제 Medium에서 최소 크기·행간 검증 필요 |
| OOH short state | display + body | 한 메시지, 한 대상, 한 next step; 상세는 읽을 수 있는 fallback에 연결 |
| Packaging insert | body + mono identifiers | 법정·안전 문구 크기는 `unresolved`, vendor proof 필요 |

긴 한국어, 영문, 제품 코드, 합성 batch ID가 동시에 있을 때 제품·상태·다음 행동 순서를 보존한다.

## 10. Medium migration decisions

| Medium | Identity action | State action | Evidence needed |
| --- | --- | --- | --- |
| Moodboard | logo unchanged | crisis/hold anti-moodboard 추가 | E1 board/source map |
| Packaging | SVG master unchanged | 신규 생산 격리; 기존 패키지는 batch ID·insert/지원 경로로 보완 | E2 print proof; actual production E4 |
| Offline shop | distance hierarchy 유지 | shelf/tester quarantine component | E2 spatial proof; staff/runtime E3/E4 |
| Merch | garment graphic 유지 | withdrawn claim 포함 graphic suppress; 직접 HOLD decoration 금지 | E2 art review |
| OOH | lockup 유지 | affected creative pause/replace; generic brand message만 허용 | vendor request E2; removal E3/E4 |
| Digital ads | lockup/crop 유지 | affected claim creative pause + destination parity | cache/ad platform trace E3 |
| Web | header identity 유지 | HOLD alert, disabled state, batch/help, alternative, local-only rollback; 내부 preview와 customer sample이 shared Binding revision 소비 | keyboard/runtime·cross-tab E3 |

## 11. Migration and rollback protocol

### Activate

1. R2 identity asset hashes/links를 inventory한다.
2. raw token 값이 바뀌지 않았는지 확인한다.
3. semantic HOLD aliases와 content tokens를 추가한다.
4. affected instances에만 HOLD component를 연결한다.
5. 7-medium proof와 stale reference audit를 수행한다.

### Release / rollback

- release authority의 event/product/batch/scope/effective time/approver/permissions/customer copy/disclaimer/7-medium map/claim decision을 exact 검증하기 전에는 HOLD instance를 제거하지 않는다;
- release 후에도 semantic token과 component contract는 library에 남겨 재현·감사를 지원한다;
- Product Binding을 `hold-active → release-verified-local-only`로 먼저 전환·공유한 뒤 instance state만 `hold-active → release-approved → restored-local-only`로 전환한다;
- 내부 preview와 고객 Web은 같은 revision-namespaced `localStorage` Binding을 소비하며, Web별 상태 사본을 별도 authority로 취급하지 않는다;
- exact H01은 `released`, U01은 `unaffected`로 유지한다;
- 유효한 synthetic UI 맥락은 tab-local `sessionStorage`에서 Back·reload·pageshow 뒤 복원한다;
- withdrawn claim은 별도 claim authority 없이는 복원하지 않는다;
- local commit 외 실제 판매·재고·fulfillment는 복원하지 않는다;
- logo, raw palette, product ID를 rollback 과정에서 바꾸지 않는다;
- rollback 전후 capture와 version ID를 보존한다.

## 12. Acceptance checks

- [x] R2 logo family 3종 링크와 identity concept이 유지됨
- [x] raw token 값 변경 0건
- [x] HOLD semantic alias가 raw token과 분리됨
- [x] HOLD가 텍스트·대상·영향·다음 행동으로 표현됨
- [x] 영향받지 않은 제품의 identity/action 의미가 변하지 않음
- [x] `ID-CONFLICT-01/02`가 production-ready로 오인되지 않음
- [x] withdrawn claim이 어느 identity/marketing token에도 들어가지 않음
- [x] KR/EN·batch ID·long copy stress test가 code-native text와 390px에서 수행됨
- [x] release와 claim restoration이 분리됨
- [x] complete release authority exact validation과 local-only permission이 token/state copy에 반영됨
- [x] released H01과 unaffected U01이 서로 다른 content state로 표현됨
- [x] 내부 preview/customer Web shared Binding과 두 surface의 Back/reload retention이 로컬 브라우저에서 재생됨
- [x] R3 evidence level이 E1/E2/E3 local과 E4 unresolved로 분리됨

## 13. Revision chronology

`0.1.1-experiment` Composition 재평가의 STOP은 보존한다. 이 migration의 `0.2.0-experiment`는 release/Binding/retention 의미가 바뀐 별도 semantic revision이며, 로컬 구현 증거를 독립 acceptance로 올리지 않는다.
