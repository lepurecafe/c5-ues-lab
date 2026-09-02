# Take 2 — 시스템 적용 계획

> 상태: **제품 바인딩 확정 — 구현 착수.**
>
> 경계: 이 Take 2는 `COMMON SURFACE` R1/R2/R3 및 기존 `artifacts/`, `fixtures/`, `results/`, `design-packs/`를 수정하거나 계승하지 않는 독립 실험이다.

## 1. 목적과 출발점

랜덤 음악 재생 앱에서 Markdown 중심 디자인 시스템이 제품 설계의 의미를 `플로우차트 → 로우파이 → 하이파이 → 변경 실험`까지 보존하는지 검증한다. 기존 Track 2 결과지는 context interview 미완료로 차단되어 있으며, 이를 성공 사례나 고득점 기준선으로 사용하지 않는다.

사용자 검토에서 Pack, iPhone medium, FigJam 대상 팀, 배틀 목적과 핵심 playback 정책이 확정되었다. 따라서 composition `r1`을 동결하고 구현 단계에 착수한다. 검토 전 생성 금지 조건은 충족했으며, 이후 산출물도 Take 2 전용 폴더와 전용 FigJam board에만 만든다.

## 2. 제안 composition

```yaml
composition:
  id: composition.random-music-app.take-2.r2
  previous: composition.random-music-app.take-2.r1@preserved-in-before-change
  status: frozen-after-cr-01
  ues_version: 0.5.0-draft
  design_pack: pack:industrial-swiss@1.0.0
  ux_preset: decision.reserve@0.1.0
  product_binding: binding.battle-beat-randomizer@1.1.0
  change_request: CR-01-fair-round-lock@applied
  brand_application: none
  brand_experience_profile: none
  medium_adapter: iphone-16-pro-portrait-web-prototype@confirmed
  figjam_board: new-take-2-board@confirmed
  figjam_team: bk.choi의 팀@confirmed
  data: synthetic-fixture-only@confirmed
  battle_context: rap-and-dance-battle-common-flow@confirmed
  primary_roles: participant|dj|operator@confirmed
  playback_commitment: immediate-playback-on-recommendation@confirmed
```

`brand_application: none`과 `brand_experience_profile: none`은 이번 검증에서 기존 Industrial Swiss를 새 브랜드팩으로 교체·분기하지 않겠다는 결정이다. 앱 이름·보이스·자산 아트디렉션의 제품별 변주는 승인 후 `제품 바인딩`에 기록하며, Pack의 정본 토큰·타입·그리드·컴포넌트 문법을 바꾸지 않는다.

## 3. 세 계층의 책임과 이번 적용

| 층 | 책임 | 이번 앱에서 결정하는 것 | 근거 |
| --- | --- | --- | --- |
| 디자인팩 | 시각 언어 | Industrial Swiss의 12-column grid, warm canvas/deep-ground 대비, condensed display/DM Sans/Space Mono 역할, 4–96px spacing, 사각 경계, canvas/grid 재질, 절제된 motion과 컴포넌트 외형 | `관찰됨` — `pack:industrial-swiss@1.0.0`의 canonical contract |
| 디자인팩 | 시각 언어 | red는 하나의 primary commit 또는 긴급 신호로 제한하고, 상태·위험·선택은 텍스트/아이콘/위치와 함께 표기 | `추론됨` — Pack의 bounded signal 및 non-color-only 규칙을 배틀 음악 상태에 적용 |
| UX 프리셋 | 경험 규칙 | `decision.reserve@0.1.0`: 발견 → 단일 후보 → 최소 조건 → 명시적 재생 커밋 → 확인된 결과; 추천/초안/커밋/확정 결과를 분리 | `관찰됨` — Reserve contract |
| UX 프리셋 | 경험 규칙 | loading/partial/stale, 후보 부족, 추천 실패, Back/Cancel/Retry/Resume/Exit에서 안전한 문맥과 재시도 경로를 유지 | `관찰됨` — Reserve retention 및 UES 공통 계약 |
| UX 프리셋 | 경험 규칙 | 추천 직후 자동 재생이므로 recommendation과 user-commitment를 동일시하지 않고, 재생 요청·재생 중·재생 실패·복구를 분리 | `추론됨` — 확정된 자동재생 정책을 Reserve authority contract에 안전하게 적용 |
| 제품 바인딩 | 서비스 맥락 | 랩배틀 또는 댄스배틀의 특정 목적에서 사용자는 선택 피로 없이 상황·취향에 맞는 가상 음악을 빠르게 발견하고, 재생·재선택·저장·제외한다 | `관찰됨` — 사용자 확인 |
| 제품 바인딩 | 서비스 맥락 | 가상 배틀 비트 트랙, 의도/상황 taxonomy, 추천/반복 방지, 저장·제외 범위, 콘텐츠 부족 기준, 가상 데이터 스키마 | `추론됨` — 확정된 배틀 목적과 가상트랙 경계에서 파생 |
| 제품 바인딩 | 서비스 맥락 | iPhone 16 Pro portrait 기준 HTML prototype, 실제 오디오 없이 UI 상태만 검증, 외부 서비스·권리 확보 음원·실제 오디오 출력은 범위 밖 | `관찰됨` — 사용자 확인 |

## 4. 시스템 선택 근거

### `pack:industrial-swiss@1.0.0` — 확정

- `관찰됨`: Swiss grid discipline, workwear material honesty, streetwear-scale graphic hierarchy, hard utility가 명시되어 있으며, 스트릿 배틀의 현장성·빠른 스캔·직접 행동에 적합한 시각 문법을 제공한다.
- `관찰됨`: one dominant headline, factual labels, direct verbs, squared controls, limited red signal이 Pack contract에 정의되어 있다.
- `추론됨`: 랩/댄스 배틀의 음악 선택을 catalog/operations 성격의 명확한 상태 표면으로 표현하면, 추천·사용자 선택·재생 결과의 authority 분리를 더 쉽게 평가할 수 있다.
- 제한: Pack은 배틀 규칙, 음악 추천 정책, 음원 권리, 재생 성공을 정의하지 않는다. 한국어 폴백, touch/mobile, reduced motion은 구현 뒤 별도 검증한다.

### 기존 Pack 유지와 허용 변주

- `관찰됨`: Industrial Swiss의 색/타입/spacing/grid/border/material language 및 컴포넌트 contract는 정본 Pack이 소유한다.
- `추론됨`: 앱 고유의 상황 라벨, 가상 음악 metadata, 추천 이유, 상태 문구, 화면별 조합은 Product Binding이 정한다. 이는 Pack의 개선이 아니라 동일 Pack 안에서의 제품 투영이다.
- `결정 필요`: 구현 중 Pack contract의 실제 결함이 발견되면 이 Take 2 안에서 Pack을 고치지 않고 gap으로 기록할지, 이후 별도 Pack 개선 작업으로 분리할지.

### `decision.reserve@0.1.0` — 확정 (`supported-with-adaptation`)

- `관찰됨`: 핵심 과업이 “하나의 적절한 후보를 빠르게 커밋”하는 구조여서, 다수 후보 비교나 여러 곡 큐 편성보다 현재 제품 목표에 가장 가깝다.
- `추론됨`: 자동재생은 recommendation 직후의 재생 요청이며, 카드 강조나 재생 요청만으로 Playing 성공을 주장하지 않는다. confirmed Playing은 별도 상태 증거로 표현한다.
- 배제 이유: `decision.compare`는 비교 자체가 목적일 때, `decision.plan`은 다곡/순서/제약 조합일 때 적합하다. 둘 다 이번 제안의 “빨리 한 곡” 흐름을 불필요하게 확장한다.
- 호환성: `ACT-RANDOMIZE`가 현재 조건으로 한 후보를 요청하는 명시적 primary commitment이고, 추천 후보를 별도로 미리 들어보거나 승인하는 Start 단계 없이 즉시 synthetic playback attempt로 전이하므로 `supported-with-adaptation`이다. 조건은 `user-draft`, 저장·제외는 별도 local effect/preference이며, retry는 playback side effect를 중복하지 않도록 설계한다.

## 5. 제품 바인딩에서 새로 결정해야 하는 항목

아래 항목은 문서에 없는 사실을 만들지 않기 위해 모두 **결정 필요**로 유지한다.

1. `확정`: 랩배틀과 댄스배틀에 공통인 단일 흐름이며, 참가자·DJ·운영자가 모두 사용한다.
2. `확정`: 가상 배틀 비트 트랙을 랜덤으로 추천하며, 추천 직후 재생을 요청한다.
3. `확정`: Start CTA는 두지 않는다. Playing/failed/retry 상태는 recommendation과 분리한다.
4. `확정`: 실제 오디오 없이 synthetic fixture와 UI 상태만 검증한다. 실음원·외부 서비스·권리/출력 route는 범위 밖이다.
5. `확정`: iPhone 16 Pro portrait를 기준으로 하고, 작은 iPhone 폭까지 함께 검증한다.
6. `확정`: Take 2 전용 FigJam board를 새로 만들며 flowchart·wireframe·hi-fi state/storyboard를 구현한다.
   - 대상 팀: `bk.choi의 팀`
   - 보드: `Take 2 — Battle Beat Randomizer — Design System Validation`
7. `결정 필요`: 의도 taxonomy, 반복 방지 window, 저장·제외의 지속 범위, Skip/Stop/Undo의 세부 정책은 flowchart 전에 제한된 experiment assumption으로 선언한다.

## 6. 고정될 불변조건과 hard gate

- `관찰됨`: system recommendation → user draft → user commitment → confirmed outcome은 같은 상태로 표시하지 않는다.
- `관찰됨`: 실패·빈 상태·재시도는 원인, 영향을 받는 객체, 다음 안전 행동을 함께 제공한다.
- `추론됨`: 화면에 쓰는 트랙·아티스트·커버·메타데이터는 모두 `가상 데이터`로 표기하고 실재 서비스 데이터처럼 보이게 하지 않는다.
- `결정 필요`: 실제 오디오를 구현할 경우의 권리, 출력 route, 권한, 파일 오류 및 silence 방지 정책.
- hard gate: P0/P1, blocking Pack×Preset×Medium gap, 권한/런타임 완료의 무근거 주장, 추천과 확정 재생의 혼동이 있으면 점수와 관계없이 중단·수정한다.

## 7. 검토 이후의 생성 순서

```text
제품 바인딩 결정 및 composition freeze
  → 03-user-flow.md + 04-state-model.md + FigJam flowchart
  → 01-product-brief.md + 02-information-architecture.md + 05-low-fi.html + FigJam iPhone wireframes
  → 06-hi-fi-preview.html + assets/ + fidelity ledger + iPhone state captures + FigJam hi-fi storyboard
  → 07-change-request.md + 변경 전 보존 + 변경 적용/추적
  → 08–10 평가 및 최종 판정
```

순서는 의도적으로 `플로우차트 → 로우파이 → 하이파이 → 변경 실험`이다. 각 단계는 Draft → builder score → 1회 수정 → review → exit decision을 거치며, 이전 단계 stable ID가 다음 단계에 추적되지 않으면 진행하지 않는다. FigJam은 시각적인 설계·추적 보드이고, 실제 탭·재생 상태·오류 복구의 체험 증거는 iPhone-sized HTML preview에서 검증한다.
