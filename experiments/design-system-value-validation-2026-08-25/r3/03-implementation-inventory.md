# COMMON SURFACE R3 — 구현 인벤토리

> **상태:** `0.2.0 implemented-local-prototype / independent-recheck-pending`  
> **기준일:** 2026-08-26  
> **적용 시나리오:** `HOLD / 01`  
> **Composition:** `composition.common-surface.r3-hold-01@0.2.0-experiment`  
> **카탈로그 범위:** `CS-01–CS-11`, `OBJ-06` — 추가·삭제·재번호화 금지  
> **브랜드/Pack:** `COMMON SURFACE` / `pack:industrial-swiss@1.0.0` 유지  
> **증거 ceiling:** 이 문서는 `E1` 구현 계약이다. 아래 산출물·런타임·캡처가 실제로 만들어지기 전에는 `E2/E3`, production-ready, 실제 판매 보류를 주장하지 않는다.

이 인벤토리는 [R2 기준선 감사](00-r2-baseline-audit.md), [R3 사전 평가 계약](02-evaluation-contract.md), [Composition Manifest](contracts/composition-manifest.md), [R3 Catalog Binding](contracts/product-binding-catalog.md), [Identity & Token Migration](contracts/identity-token-migration.md)을 구현 가능한 단위로 연결한다. 새로운 아키텍처나 rebrand를 제안하지 않는다.

## 0. 구현 원칙과 산출물 구조

R3-A와 R3-B를 하나의 결과처럼 섞지 않는다.

```text
R3-A normalized baseline
→ hard gate와 Stage ≥80 통과
→ 동일 템플릿·동일 데이터 구조에 HOLD / 01만 적용
→ R3-B hold-active
→ 7개 매체 전파·회귀·rollback 증거
```

사용자용 비교 화면은 두 개다.

| View | 계획 파일 | 고정 상태 | 목적 |
| --- | --- | --- | --- |
| Baseline | `preview-baseline.html` | `not-activated` (`before-hold` 비교 label) | R2의 시각 자산을 정본·상태·접근성·성능 계약에 맞춰 정상화한 비교 기준 |
| HOLD | `preview-hold.html` | `hold-active` | 같은 구조와 카탈로그에 `EVENT-HOLD-01-CS03`만 적용한 변경 결과 |

두 HTML은 별도 디자인을 복제하지 않는다. 동일한 HTML 구조, CSS, 컴포넌트, JS state reducer를 공유하고 frozen fixture만 바꾼다. 빌드 도구가 없으면 같은 source block에서 두 정적 HTML을 생성한다. 직접 복사한 두 파일을 따로 수정하는 방식은 금지한다.

R1/R2 파일은 읽기 전용 역사 증거다. 현재 R3 HTML이 R1/R2 HTML 페이지를 active dependency로 링크하지 않는다. R1/R2 이미지 파일은 Catalog/Asset Registry가 stable R3 asset ID, hash, source revision을 등록한 경우에만 재사용할 수 있으며, 단순히 파일명에 `r1`이 있다는 이유로 바이너리를 복제하지 않는다.

## 1. Source of truth와 정확한 버전

### 1.1 계층과 우선순위

| 우선 | 계층 | 정확한 ID / version | 정본 | 구현에서 소유하는 것 |
| ---: | --- | --- | --- | --- |
| 1 | UES | `0.5.0-draft` | [`docs/04-universal-experience-system.md`](../../../docs/04-universal-experience-system.md) | 의미·계층·증거 ceiling |
| 2 | Product Binding | `binding.common-surface.catalog.r3@0.2.0-experiment` | [Product Binding Catalog](contracts/product-binding-catalog.md) | 제품·batch·claim·availability·commit 차단·local-only release 사실 |
| 3 | UX Preset | `decision.reserve@0.1.0` | [`ux-presets/decision.reserve.md`](../../../ux-presets/decision.reserve.md) | 선택·draft·commit·confirmed outcome·retention·recovery 의미 |
| 4 | Brand Experience | `brand-experience.common-surface@0.1.0-experiment` | [COMMON SURFACE fixture](../fixtures/common-surface-fixture.md) | 설명 우선, visible uncertainty, quiet control, recovery is care |
| 5 | Design Pack | `pack:industrial-swiss@1.0.0` | [Industrial Swiss System](../../../design-packs/industrial-swiss-system/industrial-swiss-system.md) | grid·type·material·component/state 표현 capability |
| 6 | Identity migration | `migration.common-surface.identity-r2-to-r3@0.2.0-experiment` | [Identity & Token Migration](contracts/identity-token-migration.md) | R2 logo 보존, token alias, HOLD/local-only release 표현 경계 |
| 7 | Change contract | `change.common-surface.hold-01@0.2.0-experiment` | `contracts/hold-01-change-contract.md` | `before-hold → hold-active → release-verified-local-only → restored-local-only`의 동결 요구·SLA·rollback |
| 8 | Composition | `composition.common-surface.r3-hold-01@0.2.0-experiment` | [Composition Manifest](contracts/composition-manifest.md) | 위 계층을 COMMON SURFACE의 7개 매체와 카피로 결합 |
| 9 | Medium / Projection | Composition과 change contract의 `MB/PKG/SHOP/MERCH/OOH/ADS/WEB-01–05` | 7개 sample frame과 evidence manifest | 거리·비율·재질·상태·기술 제약에 맞춘 변환 |
| 10 | Implementation | 두 preview와 7-medium proof build | 이 문서 | 실제 DOM/CSS/JS, asset loading, 캡처·테스트 |

충돌 시 제품·batch·claim 값은 Product Binding, interaction 의미는 UX Preset, voice는 Brand Experience, 표현은 Pack/Identity migration, 매체 제약은 Medium/Projection이 이긴다. HTML, 생성 이미지, mockup 또는 편집 편의가 상위 계층을 덮어쓸 수 없다.

### 1.2 활성 snapshot

두 preview는 별도 Composition이 아니라 같은 Composition의 동결 전후 snapshot이다.

| Field | Baseline | HOLD |
| --- | --- | --- |
| `composition_id` | `composition.common-surface.r3-hold-01` | 동일 |
| `composition_version` | `0.2.0-experiment` | 동일 |
| `change_id` | `change.common-surface.hold-01@0.2.0-experiment` | 동일 |
| `change_state` | `not-activated` | `hold-active` |
| `event_id` | 표시하지 않음 | `EVENT-HOLD-01-CS03` |
| `affected_product_id` | 없음 | `CS-03` |
| `affected_batch_id` | 없음 | `CS03-SYN-2608-H01` |
| `claim_state` | unresolved claim은 persuasion에 사용하지 않음 | `CLAIM-CS03-RECOVERY-01 = unresolved / withdrawn-from-use` |
| 실제 시장·안전 의미 | 없음 | 없음 |

`T0`와 `last_updated_at`은 변경 계약 실행 시 동결한다. 문서 수정 시각, preview 생성 시각 또는 현재 시각으로 추정하지 않는다.

### 1.3 활성/비활성 계약 경계

- 기존 `binding.common-surface-starter-selection@0.1.0-experiment`는 역사적 R1 fixture다. R3 제품 사실과 local-only release는 `binding.common-surface.catalog.r3@0.2.0-experiment`만 소유한다.
- R2 Composition은 이름·logo concept·제품 코드·시각 문법의 입력이다. R2의 자기평가, 제품 사실, 상태 구현을 R3 정본으로 승계하지 않는다.
- `BARRIER`, `REPAIR`, `SHIELD`, `RESET`, `DRY`는 synthetic working name이다. 실제 효능 claim이 아니며, 같은 단어를 설명·추천·광고 효능으로 확장하지 않는다.
- `HOLD / 01`은 `CS-03` 정체성을 삭제하지 않는다. 지정 합성 batch의 commit/fulfillment만 차단한다.

## 2. 두 Preview 잠금

### 2.1 공통 섹션 순서

두 preview는 아래 DOM 순서와 anchor를 공유한다.

| 순서 | Anchor / component | 필수 내용 | HOLD delta |
| ---: | --- | --- | --- |
| 0 | `skip-link`, `header` | skip link, R2 horizontal lockup SVG, revision badge, `Identity / Products / Reserve / Media / Evidence` | badge와 첫 CTA만 HOLD 상태로 변경 |
| 1 | `#overview` / Hero | 기존 `CARE IS A COMMON SURFACE.` 브랜드 명제, 합성 데이터·권리 ceiling | hero 아래 독립 `HoldStatusBanner` 추가; logo/hero를 경고 그래픽으로 변형 금지 |
| 2 | `#identity` | wordmark/symbol/lockup master, raw/semantic token specimen, logo conflict gap | 동일; 변경 0건이어야 함 |
| 3 | `#products` | 12개 stable ID, ALL/FACE/BODY/CARRY 필터, Product Card, authority/status line | `CS-03`만 partial hold; 나머지는 정상 prototype 탐색 유지 |
| 4 | `#reserve` | 하나의 draft 선택, 명시적 local commit, 결과·edit/reset/help | `CS-03` commit 차단, batch lookup, alternative/retry/context retention |
| 5 | `#people` | 8개 R2 장면, all-gender·real skin·비진단 카피 | 동일; 공포·위기 이미지 추가 금지 |
| 6 | `#media` | 7개 매체의 baseline/결정/증거 링크와 sample frame | 각 매체의 `preserve/suppress/replace/route` 결과 표시 |
| 7 | `#evidence` | ID/version, event/claim state, evidence level, rights·production gaps | event ID, affected batch, `T0`, stale/rollback 상태 추가 |
| 8 | `footer` | `COMMON SURFACE`, Pack ID, synthetic/not-commerce/rights ceiling | 동일 |

### 2.2 공통 보이는 카피

아래 문자열은 임의로 다시 쓰지 않는다.

| 위치 | 잠금 카피 |
| --- | --- |
| Hero | `CARE IS A COMMON SURFACE.` |
| Hero body | `피부를 고치는 브랜드가 아니라, 서로 다른 몸과 하루에 맞는 관리의 순서를 만든다.` |
| Global ceiling | `가상 실험 데이터 · 실제 판매, 재고, 안전, 리콜 또는 제품 승인을 의미하지 않습니다.` |
| Identity title | `A Sign That Stays.` |
| Identity body | `두 표면이 맞물린 C/S 심벌은 이름이 읽히기 전에도 브랜드를 남긴다.` |
| Products title | `Eleven Useful Forms.` |
| Brand Experience title | `Real Skin. Different Days.` |
| Brand Experience statement | `COMMON SURFACE는 피부의 결점을 교정한다는 이야기를 만들지 않는다.` |
| Reserve label | `LOCAL STARTER / NOT COMMERCE` |
| Reserve initial | `시작할 제품을 고르세요.` |
| Reserve boundary | `제품 사실·재고·가격·개인 적합성은 판단하지 않습니다.` |
| Footer | `Industrial Swiss System · 제품 사실과 권리는 출시 전 별도 검증` |

카탈로그 이름·형태·authority 문구는 [Product Binding Catalog](contracts/product-binding-catalog.md)에서 그대로 가져온다. 이미지 속 읽기 어려운 라벨을 카피 source로 사용하지 않는다.

### 2.3 Baseline 전용 카피와 행동

| 위치 / state | 잠금 카피 | 행동 |
| --- | --- | --- |
| Revision badge | `R3 / NORMALIZED BASELINE` | 비인터랙티브 |
| Baseline notice | `이 화면은 HOLD / 01 적용 전 비교 기준입니다.` | evidence anchor 제공 |
| Product default | `합성 catalog 활성 · 실제 availability 미확정` | 제품 탐색 가능 |
| CS-03 authority | `BARRIER는 작업명입니다. 장벽 회복 효능은 확인되지 않았습니다.` | 효능 근거로 추천 금지 |
| CS-07 authority | `REPAIR는 작업명입니다. 손상 회복·치료 효능은 확인되지 않았습니다.` | 효능 근거로 추천 금지 |
| Draft selected | `{product_id}을(를) 로컬 스타터 후보로 선택했습니다.` | commit 전; 다른 후보로 교체 가능 |
| Commit button | `스타터로 저장` | eligible draft 하나만 local commit |
| Loading | `로컬 선택을 확인하고 있습니다.` | 중복 활성화 차단 |
| Confirmed | `{product_id}이(가) 로컬 스타터로 저장되었습니다.` | `변경`, `초기화`, `도움말` 제공 |
| Invalid | `제품을 먼저 선택하세요. 입력한 내용은 유지됩니다.` | 선택 필드로 focus 이동 |
| Reset | `로컬 선택을 초기화했습니다.` | HOLD/event audit와 무관 |

### 2.4 HOLD 전용 카피와 행동

Identity와 catalog working name은 유지한다. HOLD를 rebrand 또는 전면 적색 화면으로 표현하지 않는다.

| 위치 / state | 잠금 카피 | 행동 |
| --- | --- | --- |
| Revision badge | `HOLD / 01 · SYNTHETIC EVENT` | event metadata로 연결 |
| Status label | `판매 보류` | 텍스트 + 2px 경계 + 4px accent rail; 색만 사용 금지 |
| Scope | `CS-03 일부 합성 batch` | `CS03-SYN-2608-H01`을 사람 읽기 가능한 텍스트로 병기 |
| Reason | `근거와 상태를 확인 중입니다.` | 의료·안전 원인 생성 금지 |
| Consequence | `이 batch는 현재 선택하거나 진행할 수 없습니다.` | 영향 batch commit 차단 |
| Context | `입력과 다른 제품 후보는 유지됩니다.` | draft·filter·form 맥락 유지 |
| Next actions | `batch 확인` · `다른 제품 보기` · `지원 경로 확인` | 하나의 primary와 두 secondary action |
| CS-03 Product Card | `일부 합성 batch 판매 보류 · 실제 안전 판단이 아닙니다.` | 상세 탐색은 가능, local commit은 차단 |
| CS-03 commit | `보류 중 · 선택 불가` | disabled 이유를 버튼 근처에 표시 |
| CS-07 Product Card | `REPAIR는 작업명 · 회복·치료 효능 주장 사용 금지` | 제품 탐색/로컬 선택은 유지 |
| Batch field label | `합성 batch 코드` | 실제 주문번호·연락처·피부 정보 입력 금지 |
| Batch helper | `제품 또는 포장의 코드를 입력하세요. 개인정보는 입력하지 않습니다.` | `aria-describedby` 연결 |
| Affected result | `이 합성 batch는 HOLD / 01 대상입니다. 실제 안전 판정이 아니며, 실험용 지원 경로만 안내합니다.` | commit 차단, support/other products 제공 |
| No-match result | `이 코드는 HOLD / 01 대상과 일치하지 않습니다. 실제 제품 상태는 확인되지 않았습니다.` | `영향 없음`, `안전`이라고 판정 금지 |
| Invalid result | `batch 코드 형식을 확인하세요. 입력은 유지됩니다.` | field error와 retry |
| Stale result | `현재 상태를 갱신할 수 없습니다. 이전 정보로 선택을 확정하지 않습니다.` | 마지막 안전한 맥락 유지, retry/help |
| Release pending | `해제 권한이 확인되지 않았습니다.` | HOLD 유지 |
| Restored | `합성 해제 이벤트가 확인되어 선택 상태를 다시 점검합니다.` | `EVENT-RELEASE-01-CS03`와 새 `T0` 없이는 노출 금지 |

`CLAIM-CS03-RECOVERY-01`은 광고·추천·설명·직원 안내·selection rationale에서 0건이어야 한다. `BARRIER` working name은 보존하되 인접한 authority label로 identity와 효능을 분리한다.

### 2.5 상호작용과 상태 잠금

| Interaction | Baseline | HOLD | 공통 불변조건 |
| --- | --- | --- | --- |
| Category filter | ALL/FACE/BODY/CARRY | 동일 | 선택한 카드가 필터 밖이면 Selection Summary에 계속 보이고 `현재 필터 밖에 유지됨`을 알림; 보이지 않는 선택을 조용히 commit 금지 |
| Product selection | eligible card → `user-draft` | CS-03 탐색 가능, commit draft는 `hold-blocked`; 다른 제품은 정상 | system suggestion, user draft, commitment 분리 |
| Commit | idle → validating → `local-selection-confirmed` | affected CS-03는 진입 불가 | 한 번의 명시적 action; 연속 클릭은 같은 local record로 idempotent |
| Cancel | uncommitted draft 삭제 | 동일 | confirmed outcome과 event audit는 삭제하지 않음 |
| Reset | confirmed local selection 삭제 | 동일 | HOLD event·claim ledger를 해제하지 않음 |
| Batch lookup | 숨김 또는 비활성 안내 | invalid → loading → affected/no-match/stale | local fixture only; 외부 전송·PII 없음 |
| Alternative | 다른 product card로 사용자 이동 | 영향받지 않은 catalog 탐색 | 자동 `safe/approved/recommended` 승격 금지 |
| Retry | 입력 유지, 재검증 | 입력·마지막 안전 상태 유지 | 중복 local record 금지 |
| Release/rollback | 표시 안 함 | QA fixture에서만 `release-pending/release-approved/restored` | release event 없이는 HOLD 해제 금지; claim 자동 복원 금지 |

반복 가능한 상태 캡처를 위해 `?qa=1&state={state-id}` test fixture를 허용한다. QA mode에는 `QA FIXTURE · 실제 서비스 상태가 아님`을 항상 표시하고 사용자용 기본 화면에서는 state switcher를 숨긴다.

필수 state ID:

```text
default
focus-visible
invalid
loading
partial
stale
success
hold-unavailable
alternative
retry
release-pending
restored
released
unaffected-product
```

`restored`와 `released`는 완전한 `EVENT-RELEASE-01-CS03` synthetic fixture를 exact 검증한 뒤에만 활성화한다. H01은 `released`, U01은 `unaffected`이며, 허용 복원은 local commit뿐이다. malformed release는 `release-pending`에서 HOLD를 유지한다.

## 3. 7개 매체 구현 산출물

모든 매체는 baseline과 HOLD를 같은 frame/content fixture로 비교한다. 직접 변화가 없는 경우에도 사후 `N/A`로 빼지 않고 `preserve` 증거를 만든다.

| Medium | Baseline 실제 산출물 | HOLD 실제 산출물 | Asset 역할 / 금지 |
| --- | --- | --- | --- |
| Moodboard / guidance | 16:9 brand/experience board, Source Register, anti-moodboard | calm status, visible uncertainty, recovery reference lane과 crisis anti-moodboard delta | 기존 people/product/material 이미지는 `reference`; 출처·권리·prompt/hash 등록. 경고등·병원·공포 얼굴로 위기 연출 금지 |
| Packaging | `CS-03` 60×120mm front/back sample canvas, batch/authority reserved zone | 기존 패키지를 바꾼 척하지 않는 별도 insert, batch ID block, support/fallback card, production isolation note | 제품 사진은 context image; logo·제품 ID·batch·상태·카피는 code-native overlay. dieline/bleed/vendor proof 주장 금지 |
| Offline shop | 3:1 façade, 9:16 window, A6 shelf ticket/tester/staff card | CS-03 shelf/tester quarantine, 직원용 event card, 다른 제품 탐색과 지원 경로 | R2 store image는 spatial reference. 실제 설치·직원 실행 증거로 사용 금지; arm-length status copy는 code-native |
| T-shirt / merch | 300×400mm front/back brand sample + care/material reserved area; catalog 상품이 아니라 `MERCH SAMPLE / NOT A CATALOG OBJECT`로 표시 | CS-03/withdrawn claim이 없는지 검사한 `preserve` 결과; 포함 시 해당 graphic suppress | R2 merch PNG는 application reference. 새 SKU·OBJ ID·소재·원산지·판매 가능성을 만들지 않음 |
| OOH | 2:1, 1:2의 CS-03 product/identity sample과 generic brand fallback | affected creative `suppress`; generic brand creative `replace`; 사람 읽기 가능한 목적지/fallback | public creative에는 미확정 효능 금지. pause/removal은 request sample일 뿐 vendor 실행 증거가 아님 |
| Digital ads | 1200×628, 1080×1080, 1080×1920 baseline family + destination ID | affected creative pause record, generic replacement, destination HOLD parity, cache/version evidence slot | copy/logo/CTA는 code-native. platform pause·cache invalidation을 실제 완료로 주장 금지 |
| Commerce / Reserve web | `preview-baseline.html`의 collection, catalog, Reserve default/focus/invalid/loading/success | `preview-hold.html`과 `sample-commerce.html`의 alert, exact CS-03 block, batch lookup, shared Binding release, alternative, stale/retry/release guard | 실제 commerce 없음. interaction은 DOM/CSS/JS native; generated screenshot을 runtime 증거로 사용 금지 |

### 3.1 매체 공통 데이터 필드

적용되는 각 frame은 동일 source에서 다음 값을 가져온다.

```text
product_id
working_name
binding_revision
catalog_state
claim_authority_state
availability_state
hold_event_id
affected_batch_id
batch_authority_state
release_event_id
support_route_state
last_updated_at
authority_state
evidence_level
```

QR은 단독 경로가 될 수 없다. `CS-03`, `EVENT-HOLD-01-CS03`, 사람 읽기 가능한 fallback을 함께 제공한다. 실제 URL·고객센터가 없으면 `지원 경로 미연결 · unresolved`로 표시한다.

### 3.2 Impact와 synthetic SLA 구현

[HOLD Change Contract](contracts/hold-01-change-contract.md)의 `IMP-01–15`를 구현 backlog와 evidence manifest의 고정 row ID로 사용한다. 별도 구현 티켓 번호를 만들더라도 IMP ID를 제거하지 않는다.

| 구현군 | Impact / SLA | 구현 증거 |
| --- | --- | --- |
| Binding·claim·Reserve 차단 | `IMP-01/02/04/05/12`, `SLA-P0 ≤15 min` | before/after Binding diff, claim search, affected/unknown runtime trace |
| Owned web·feed·내부 안내 | `IMP-03/06/15`, `SLA-P1-owned ≤30 min` | build/version acknowledgement, token/copy diff, evidence ledger |
| Packaging guidance·격리 | `IMP-07`, source 차단 `SLA-P0 ≤15 min`, owned guidance `SLA-P1-owned ≤30 min` | insert/guidance diff와 실제 production gap을 분리 |
| Digital ads | `IMP-11`, request/destination `≤4 h` | pause/replace request, cache/destination version trace |
| Shop·fulfillment | `IMP-08`, acknowledgement `≤4 h` | synthetic quarantine acknowledgement와 실제 설치 gap 분리 |
| OOH | `IMP-10`, request `≤4 h`, replacement target `≤24 h` | vendor request와 actual removal proof 상태 분리 |
| Moodboard·merch·governance | `IMP-09/13/15`, `SLA-P2 ≤1 business day` | source/art inventory, anti-moodboard, stale audit |
| 7-medium audit | `IMP-07–15`, `SLA-AUDIT ≤24 h` | 35-check scorecard와 timestamp ledger |
| Release/rollback | `IMP-14`, owned digital `≤4 h`, physical target `≤1 business day` | release authority, before/after capture, stale-state audit |

이 시간은 실제 법적·안전 SLA가 아니다. `T0`, acknowledged, blocked, verified를 각각 기록한다. Impact map의 일반 `SLA-P1` 표기는 대상에 따라 `owned / ads / retail / OOH`로 구체화하며 원래 ID와 시간을 모두 보존한다. Evaluation Contract의 Change Propagation 목표 `≥95%`가 Change Contract의 `IMP ≥90%`보다 엄격하므로, 분모 15에서는 완료 기준을 **15/15 검증**으로 잠근다.

## 4. 구현 목록

### 4.1 Design token

Raw token은 migration 계약대로 값 변경 없이 보존한다.

```css
--cs-paper: #F3EFE7;
--cs-ink: #1A1713;
--cs-blue: #315B78;
--cs-red: #C7382C;
--cs-stone: #746D63;
--cs-line: #B9B0A3;
```

구현은 아래 semantic alias만 소비한다.

```css
--cs-color-page: var(--cs-paper);
--cs-color-text: var(--cs-ink);
--cs-color-border: var(--cs-line);
--cs-color-brand-field: var(--cs-blue);
--cs-color-action-primary: var(--cs-red);
--cs-color-focus: var(--cs-red);
--cs-status-hold-surface: var(--cs-paper);
--cs-status-hold-text: var(--cs-ink);
--cs-status-hold-border: var(--cs-ink);
--cs-status-hold-accent: var(--cs-red);
--cs-status-information-accent: var(--cs-blue);
--cs-status-muted-border: var(--cs-line);
--hold-border-width: 2px;
--hold-accent-width: 4px;
--hold-icon-size: 1em;
--hold-focus-outline: 2px;
--hold-message-measure: 48ch;
```

- 기존 `--cs-signal`은 `--cs-red`, `--cs-field-blue`는 `--cs-blue`의 deprecated compatibility alias로만 한 revision 유지하고 사용처를 registry에 기록한다.
- `--cs-stone`은 현재 paper 위 일반 본문 대비가 경계값이므로 필수 상태·오류·지원 카피에 사용하지 않는다. 필수 카피는 `--cs-ink`를 사용하고 실제 크기·굵기별 대비를 캡처/검사한다.
- HOLD, focus, unavailable, confirmed는 텍스트·아이콘/마크·boundary와 함께 표현한다. color-only 상태는 P1이다.
- Typography: HOLD headline은 CJK sans bold, 원인·다음 행동은 body `16/26`, product/event/batch ID만 mono. 한글을 영문 condensed처럼 강제 압축하지 않는다.
- Grid: desktop 12열, 24px gutter, 최대 1440px; body spacing은 `4, 8, 12, 16, 24, 32, 48, 64, 80, 96`만 사용한다.
- Logo clear-space와 minimum-size 충돌은 생산 단계 blocking gap이다. 디지털 preview는 R2 SVG master를 변경 없이 쓰고 임의 숫자를 새 정본처럼 선언하지 않는다.

### 4.2 Component inventory

| Component | 필수 variant/state | Owner / 필수 데이터 |
| --- | --- | --- |
| `BrandHeader` | baseline / hold metadata | Composition; R2 horizontal lockup master |
| `RevisionBadge` | normalized-baseline / synthetic-hold | Governance; revision/change state |
| `HoldStatusBanner` | active / stale / release-pending / restored-local-only | Binding + Brand Experience; event/product/batch/reason/next action/updated time |
| `BrandSignature` | wordmark / symbol / lockup / mono / inverse | Identity migration; SVG master only |
| `ProductFilter` | all / face / body / carry; pressed/focus | Projection; visible result count와 selection invariant |
| `ProductCard` | active / selected-draft / hold-partial / disabled / filter-hidden | Binding; stable ID/name/form/authority/availability |
| `SelectionSummary` | empty / draft / validating / confirmed / held | UX Preset + Binding; 필터와 무관하게 현재 선택을 계속 노출 |
| `CommitAction` | disabled-with-reason / enabled / pending / idempotent-confirmed | UX Preset; explicit consequence와 local-only boundary |
| `BatchLookupForm` | empty / invalid / loading / affected / unknown / unaffected-U01 / released-H01 / stale | Binding; local synthetic code only, PII 없음 |
| `OutcomePanel` | confirmed-local / hold-blocked / release-pending / restored-local-only | UX Preset + change contract; evidence와 next safe action |
| `RecoveryActions` | retry / other-products / support / edit / reset | UX Preset + Brand Experience; retained context 선언 |
| `AuthorityTag` | experiment-approved-synthetic / unresolved / withdrawn | Binding; `approved` 단독 사용 금지 |
| `MediumProofCard` | preserve / suppress / replace / route | Medium/Projection; before/after/evidence/gap |
| `GapNotice` | rights / production / runtime / accessibility | Governance; evidence ceiling |
| `EvidenceLedger` | baseline / hold / release/rollback | Governance; ID/version/time/hash/test links |

재사용 가능한 인스턴스를 임의 클래스 override로 만들지 않는다. 새 variant가 필요하면 위 component registry에 상태, owner, evidence를 먼저 추가한다.

### 4.3 Runtime state와 retention

```text
idle
→ user-draft
→ validating
→ local-selection-confirmed

CS-03 selected during hold
→ hold-blocked
→ batch-check / other-products / support
→ affected / no-match / stale
→ retry or replace
```

- 내부 preview는 filter·draft·confirmed local record·batch input·검증 상태를 `cs-r3:ui:${composition}`에, 고객 Web은 draft·confirmed local record·batch input·검증 상태를 `cs-r3:commerce-ui:${composition}` tab-local `sessionStorage`에 저장한다. 외부 전송, cookie, analytics, 계정·건강 데이터는 금지한다.
- Back/reload/pageshow는 allowlist 검증을 통과한 유효 synthetic 맥락만 복원한다. Cancel은 uncommitted draft만, Reset은 confirmed local selection만 지운다.
- 내부 preview는 authority 검증을 통과한 Product Binding만 same-origin `cs-r3:binding:${composition}` `localStorage` key에 publish한다. 고객 Web은 같은 key를 `storage` event와 `pageshow`에서 consume해 HOLD/release parity를 유지한다. UI session과 shared Binding을 서로 대체하지 않는다.
- commit record key는 `composition_version + product_id + local-session`으로 중복 생성을 막는다. 실제 주문·예약 ID처럼 표현하지 않는다.
- HOLD가 draft 이후 활성화되면 commit을 재검증하고 차단한다. 기존 draft/입력은 유지하고 상태 변화 이유를 알린다.
- Filter가 선택을 숨겨도 Selection Summary는 계속 보인다. 숨은 카드만 보고 사용자가 모르는 product를 commit하는 상태는 허용하지 않는다.
- `EVENT-RELEASE-01-CS03`의 exact event/product/batch/scope/effective time/approver/permissions/copy/disclaimer/7-medium map/claim decision이 모두 맞지 않으면 시간 경과·reload·Reset으로 HOLD가 해제되지 않는다.

### 4.4 Responsive implementation

| 조건 | 구현 계약 |
| --- | --- |
| `≥901px` | 12열; hero 5/7, identity 5/7, product card 3열 span, wide 6 span, 비교 가능한 desktop 구조 |
| `621–900px` | 주요 2-column을 1-column으로 전환; product 2열; header 비핵심 anchor 축약하되 상태·revision은 숨기지 않음 |
| `≤620px` | 1열; 16px page inset; product/medium card 1열; CTA stack; 상태·batch·next action 순서 유지 |
| `200% zoom` | 가로 스크롤 0, 필수 카피 잘림 0, fixed height 제거, sticky가 focused content를 가리지 않음 |
| 긴 KR/EN | 제품명·event ID·batch ID가 줄바꿈되어도 `제품 → 상태 → 다음 행동` 순서 유지 |
| touch | web adapter floor `44×44 CSS px`; 물리 매체 minimum은 unresolved로 유지 |

baseline과 HOLD는 같은 breakpoint와 같은 이미지 crop rule을 쓴다. HOLD에서만 레이아웃을 넓히거나 별도 모바일 구조를 만드는 것은 비교 오염이다.

### 4.5 Accessibility implementation

- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`와 순차 heading; `#main` skip link 제공.
- Product selection은 native radio semantics 또는 동일 수준의 single-selection semantics를 사용한다. 필터는 button + `aria-pressed`다.
- focus-visible은 2px/3px offset을 기본으로 실제 surface별 대비를 검사한다. focus를 hover로 대체하지 않는다.
- field error는 `aria-invalid`, `aria-describedby`; 상태 갱신은 적절한 `role="status"`/`aria-live="polite"`; 차단 이유는 disabled control 인접 텍스트로 노출한다.
- loading/partial/stale/success/unavailable을 같은 live region에서 명시적으로 구분한다. 성공 전 성공 문구를 표시하지 않는다.
- 색·이미지·위치만으로 HOLD를 표현하지 않고 `판매 보류`, 대상, 영향, 차단 행동, next action을 텍스트로 제공한다.
- 의미 있는 이미지는 구체적인 alt, 반복/장식 logo는 빈 alt를 사용한다. 피부 이미지 alt가 성별·외모를 추정하거나 효능을 증명하지 않게 한다.
- keyboard만으로 filter, product selection, commit, batch lookup, retry, alternative, reset에 도달한다.
- `prefers-reduced-motion`에서 scroll/entrance/hover motion을 제거하고 정보 손실이 없어야 한다.
- screen reader와 대표 사용자 평가는 아직 `E4 unresolved`; 자동 검사 통과로 대체하지 않는다.

### 4.6 Performance implementation

R2의 약 49.79 MiB unique image transfer를 그대로 승계하지 않는다.

| Budget / check | 동결 목표 |
| --- | ---: |
| Desktop first viewport image transfer | `≤1.8 MiB` |
| Mobile first viewport image transfer | `≤1.2 MiB` |
| Full-page responsive image transfer | desktop `≤12 MiB`, mobile `≤8 MiB` |
| CSS + JS compressed | 각각 `≤60 KiB`, `≤40 KiB` |
| LCP / CLS | test HTTP + 합의한 throttling에서 `≤2.5s` / `≤0.1` 목표; 측정 조건과 함께 기록 |
| Runtime quality | console error 0, broken link/image 0, horizontal overflow 0 |

- hero/preload 1개를 제외한 below-fold raster는 `loading="lazy"`, `decoding="async"`.
- 모든 raster에 intrinsic `width`/`height` 또는 고정 `aspect-ratio`를 둔다.
- `srcset`/`sizes`와 최소 390/768/1200/1600px 파생본을 만든다. AVIF/WebP와 원본 fallback을 등록한다.
- raster 파생은 deterministic transcoding이다. 새로운 ImageGen 창작으로 간주하지 않지만 source hash와 변환 명령/version은 Asset Registry에 기록한다.
- 외부 CDN·analytics·webfont를 runtime 필수조건으로 두지 않는다. 폰트는 라이선스가 확인되기 전 시스템 fallback과 `font-display: swap` 전략만 사용한다.

## 5. ImageGen과 code-native 자산 경계

| 분류 | 허용 | 금지 / 처리 |
| --- | --- | --- |
| Identity master | 기존 R2 wordmark/symbol/lockup SVG | ImageGen logo, mockup 속 변형, raster symbol을 master로 사용 금지 |
| 제품·인물·재료 장면 | 기존 R1/R2 synthetic raster; 필요 시 등록된 새 reference scene | 이미지가 제품 사실·권리·효능·실제 생산을 증명한다고 주장 금지 |
| Packaging/shop/OOH/ad mockup context | 무문자 또는 최소 문자의 재료·공간 context image | batch, status, claim, CTA, 법정정보를 이미지 안에 생성하지 않음 |
| 제품 ID·batch·event·claim/status | HTML/CSS/SVG/text layer | 생성 이미지의 왜곡된 글자를 source로 읽지 않음 |
| Logo application | SVG overlay와 code-native clear-space frame | 생성 이미지에 baked logo가 다르면 가리거나 reference-only로 격리 |
| Component·form·state·icon | semantic HTML/CSS/SVG | screenshot-only interaction 또는 color-only icon 금지 |
| Charts/impact/evidence | HTML table, JSON-derived text, deterministic SVG | 수치를 이미지로 생성하거나 수동 전사 금지 |

새 ImageGen 자산이 꼭 필요하면 먼저 `asset_id`, source/prompt, 생성 일시·도구, dimensions/hash, master/reference/mockup 구분, authority, 허용 medium, crop, alt, 교체 이력을 등록한다. 이 레지스트리 없이 preview에 연결하지 않는다.

## 6. 전후 증거 캡처

### 6.1 동일 frame 크기

| Medium / state | Baseline과 HOLD 공통 캡처 크기 |
| --- | --- |
| Web desktop | viewport `1440×1000`; 동일 scroll anchor의 viewport clip + full-page 보조 캡처 |
| Web mobile | viewport `390×844`; 동일 scroll anchor의 viewport clip + full-page 보조 캡처 |
| Moodboard | `1600×900` (16:9) |
| Packaging | front/back/insert 각각 `1200×2400` (60×120mm sample ratio; print spec 아님) |
| Shop façade / window | `1800×600` (3:1), `1080×1920` (9:16) |
| Shelf/tester/staff card | `1240×1748` A6 sample frame; print proof 아님 |
| T-shirt graphic | front/back 각각 `1200×1600` (300×400 sample ratio) |
| OOH | `2000×1000` (2:1), `1000×2000` (1:2) |
| Digital ads | `1200×628`, `1080×1080`, `1080×1920` |

파일명 규칙:

```text
evidence/{baseline|hold}/{medium}-{state}-{width}x{height}.png
```

각 캡처 옆 manifest에는 Composition/Binding/change ID, state ID, product/event/batch ID, viewport, browser/build, timestamp, source asset hash, evidence level을 기록한다. baseline과 HOLD 캡처 사이에 unrelated content, crop, viewport, font, browser를 바꾸지 않는다.

### 6.2 최소 fidelity 비교 지점

아래 10개를 전후 overlay 또는 side-by-side로 검사한다. 최소 통과 요구는 10개 모두 증거 링크가 있는 것이다.

1. **Identity concordance:** wordmark/symbol/lockup geometry와 raw palette가 전후 동일하며 HOLD가 logo를 변형하지 않음.
2. **Catalog parity:** `CS-01–11`, `OBJ-06` stable ID·working name·asset mapping이 전후 누락/재번호화 0건.
3. **Scoped delta:** `CS-03`, 지정 batch, 철회 claim 외 제품의 action/status가 불필요하게 바뀌지 않음.
4. **Claim removal:** `CLAIM-CS03-RECOVERY-01` 효능 해석 문구가 HOLD의 광고·추천·설명·직원 도구에 0건.
5. **State semantics:** recommendation, draft, commit, confirmed outcome, hold/unavailable, release가 문구·행동으로 분리됨.
6. **Context retention:** filter, Back/reload, invalid, stale, retry에서 입력과 안전한 draft가 계약대로 보존됨.
7. **Cross-medium truth:** product/event/batch/claim/status/updated 값이 7개 매체 적용 지점에서 동일함.
8. **Typography/localization:** 긴 KR/EN·batch ID에서 위계, 줄바꿈, 최소 본문, CTA가 잘리지 않음.
9. **Responsive/accessibility:** 1440/390/200%에서 overflow 0, keyboard/focus/live status/비색상 단서가 유지됨.
10. **Asset/performance:** master/reference 경계, responsive image pipeline, CLS·전송 budget이 전후 모두 계약 안에 있음.

## 7. Deliberate deviations와 known gaps

### 7.1 Deliberate deviations

| ID | 의도적 결정 | 이유 / 영향 |
| --- | --- | --- |
| `DEV-R3-01` | 과거 `OUTSIDE / 01`, `CS-05 SCREEN`, `OBJ-06/07 merch` 요구를 R3 active scope로 복원하지 않는다. | 승인된 R3는 R2의 `CS-01–11 + OBJ-06`을 versioned Catalog로 정상화하고 `HOLD / 01`을 시험한다. 과거 불일치는 감사 기록으로 보존한다. |
| `DEV-R3-02` | R2 `C/S` SVG family와 COMMON SURFACE 이름을 유지한다. | R3는 rebrand가 아니라 변경 전파 실험이다. clear-space/minimum-size 충돌은 생산 gap으로 남긴다. |
| `DEV-R3-03` | `BARRIER`, `REPAIR` working name을 삭제하지 않는다. | identity label과 효능 claim을 분리한다. 효능 설명·추천·광고 사용만 금지한다. |
| `DEV-R3-04` | T-shirt/merch sample에 새 catalog SKU/OBJ ID를 부여하지 않는다. | 승인 catalog에는 OBJ-06만 있다. 의류는 brand application sample이며 실제 상품·판매 가능성을 주장하지 않는다. |
| `DEV-R3-05` | Merch처럼 직접 delta가 없는 매체도 `preserve`로 평가한다. | 사후 N/A로 35개 분모를 줄이지 않고 HOLD 표현의 불필요한 누출을 검사한다. |
| `DEV-R3-06` | R1/R2 source raster를 hash 등록 후 재사용할 수 있다. | 파일명 revision과 asset provenance를 구분하고, 불필요한 바이너리 복제를 피한다. 현재 HTML은 R1/R2 HTML을 active dependency로 삼지 않는다. |

### 7.2 Known gaps / blockers

- [HOLD Change Contract](contracts/hold-01-change-contract.md)는 `0.2.0-experiment` 로컬 합성 prototype에 활성화됐다. `0.1.1` 독립 STOP과 최초 T0 정정 이력 `R3-P2-T0-01`은 보존한다. 실제 제품·외부 운영 활성화는 여전히 금지한다.
- Logo clear-space와 minimum-size 계약 충돌은 `ID-CONFLICT-01/02`; 디지털 실험은 가능하지만 production-ready는 차단한다.
- R2 wordmark/lockup의 live SVG text와 font fallback 의존은 deterministic identity·생산 gap이다. R3 preview는 현 SVG를 E2 후보로 보존하되, outline master 또는 권한 있는 배포 font가 생긴 것처럼 주장하지 않는다.
- 실제 상표·도메인·폰트·모델·이미지·용기·제품·공간·광고 권리는 모두 unresolved다.
- 실제 formulation, INCI, 용량, 가격, 제조, 재고, batch, 안전, 규제, claim substantiation이 없다.
- 실제 주문·결제·반품·배송·고객지원·광고 플랫폼·cache invalidation 연동이 없다.
- Packaging/merch/OOH/shop은 sample-frame evidence이며 dieline·분판·원단·내구·설치·vendor proof가 아니다.
- 자동 접근성 검사와 keyboard test는 E3 후보일 뿐, screen reader·대표 사용자·실물 사용 E4를 대신하지 않는다.
- 새 ImageGen이 없어도 기존 synthetic 이미지의 prompt/provenance/권리 범위는 registry에서 보완해야 한다.
- `restored-local-only`는 완전한 `EVENT-RELEASE-01-CS03` synthetic authority가 exact 검증될 때만 구현된다. claim·실제 판매·재고·fulfillment는 복원되지 않는다. 독립 E3 hard gate는 PASS했지만 Stage는 `REVISE`이며 실제 상업 authority를 주장하지 않는다.

### 7.3 Revision과 독립 평가 경계

- `0.1.1-experiment` 독립 재평가: R3-A `63/100`, R3-B `60/100`, release authority P0와 Web parity·batch state·retention P1 때문에 STOP. 이 snapshot은 소급 수정하지 않는다.
- `0.2.0-experiment` 구현 증거: validator `1.3.0` error/warning `0/0`, semantic `29/29`, local refs `259`, registry `75/75`; malformed release `13/13` 거부, 양방향 verified Binding, async settlement, batch-aware commit identity, 두 Web surface의 reload·Back retention을 독립 E3로 재생했다.
- 위 0.2.0 builder evidence는 [`evidence/07-independent-review.md`](evidence/07-independent-review.md)의 독립 E3와 대조됐다. P0/P1 `0/0`, hard gate PASS지만 R3-A/B `63/63`, Stage `REVISE`이며 E4·상업 acceptance는 미충족이다.

## 8. 완료 정의

### 8.1 R3-A — Normalized baseline done

- [ ] Section 1의 모든 활성 ID/version과 source link가 manifest와 HTML metadata에서 일치한다.
- [x] `preview-baseline.html`이 공통 섹션·카탈로그 12개·visible copy·상태 계약을 구현한다.
- [ ] R2 logo SVG master 3종, raw token 6개, semantic aliases, deprecated alias registry가 연결된다.
- [x] Product/filter/Reserve의 default, focus-visible, invalid, loading, success, Back/reload, Cancel, Reset, idempotency를 로컬 브라우저에서 반복 테스트한다.
- [ ] 필터 밖 선택이 Selection Summary에서 사라지지 않고 조용히 commit되지 않는다.
- [ ] 모든 active asset에 ID/hash/dimensions/source/authority/usage/revision/alt가 있다.
- [ ] desktop/mobile/200%/long KR·EN/reduced-motion과 performance budget 증거가 있다.
- [ ] R2 P1 세 건이 닫히고 hard gate 통과, Stage `≥80`, 활성 Core anchor `≥3`, E2 이상이다.
- [ ] 독립 read-only reviewer가 같은 frozen rubric으로 점수와 결함을 기록한다.

### 8.2 R3-B — HOLD / 01 done

- [x] `change.common-surface.hold-01@0.2.0-experiment`, `T0`, impact map, SLA, rollback 요구와 0.1.1 STOP→0.2.0 수정 이력이 기록되어 있다.
- [x] `preview-hold.html`이 동일 템플릿에서 `hold-active` fixture만 적용한다.
- [x] `CS03-SYN-2608-H01`의 selection/commit 표현 경로가 차단되고 다른 제품의 정상 prototype 경로는 유지된다. 실제 fulfillment 연동은 없으며 차단 표현만 검증했다.
- [x] affected/no-match/invalid/loading/partial/stale/alternative/retry/release-pending/released 상태가 입력·맥락을 보존하며 로컬 브라우저에서 검증된다.
- [ ] `CLAIM-CS03-RECOVERY-01` 철회 대상이 7개 매체의 적용 지점에서 0건이다.
- [ ] 7개 매체 각각 baseline/HOLD actual sample frame, `preserve/suppress/replace/route`, gap, evidence가 있고 35개 check 분모를 유지한다.
- [ ] 각 매체가 최소 4/5, 전체가 최소 28/35이며 `BLOCKED`를 PASS로 계산하지 않는다.
- [ ] product/event/batch/claim/status/updated 값의 cross-touchpoint parity가 100%다.
- [ ] `IMP-01–15`가 15/15 evidence와 연결되고, affected batch·batch unknown·unaffected product 경로를 각각 검증한다.
- [ ] synthetic SLA의 `T0 / acknowledged / blocked / verified` 시각과 miss/owner가 기록된다.
- [x] malformed release `13/13`이 차단된다. 완전한 synthetic release는 내부 7/7과 고객 Web에 자동 전파되며 H01 local commit만 복원하고 claim·fulfillment는 복원하지 않는다.
- [ ] Section 6의 동일 크기 전후 캡처와 10개 fidelity 비교가 모두 연결된다.
- [ ] console error·broken link/image·horizontal overflow 0, frozen performance budget 충족 또는 측정 gap이 정직하게 기록된다.
- [ ] R3-B hard gate 통과, Stage `≥90`, P0/P1 0, 활성 Core anchor `≥3`, E2 이상, C2 목표를 충족한다.
- [ ] 사용자 정성 평가는 builder 점수와 섞지 않고 별도로 기록한다. `8/10` 미만이면 사용자 체감 9/10을 주장하지 않는다.

### 8.3 완료 후 허용되는 주장

- R3-A만 통과: `결함 기준선 정상화 성공`.
- R3-A와 R3-B 모두 통과: `HOLD / 01 합성 변경의 전파·복구·추적성이 선언 범위에서 검증됨`.
- 실제 판매 보류, 안전, recall, 고객 지원, 생산, 광고 철회, 접근성 또는 상업 출시 완료 주장은 외부 E3/E4 증거 없이는 금지한다.
