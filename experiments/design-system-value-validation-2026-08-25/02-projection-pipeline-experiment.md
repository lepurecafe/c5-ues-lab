# Track 2 — Random Music App: Flowchart → Low-fi → High-fi

## 1. Decision

**판단할 것:** 현재 시스템이 초기 논의의 랜덤 음악 재생 앱을 기존 Markdown Design Pack과 UX Preset으로 설계하면서, Product Binding의 의미를 Flowchart·Low-fi·High-fi에 걸쳐 보존하고 반복 가능한 품질과 수정 비용으로 생산할 수 있는가?

## 2. Context gate — Flowchart 이전 필수

Track 2는 [랜덤 음악 앱 질답](03-random-music-app-context-interview.md)으로 시작한다. 지금 단계에서는 다음을 확정하지 않는다.

- 사용자와 현장;
- 랜덤의 의미와 필터/반복 규칙;
- 즉시 재생·확정 재생·큐/라운드 구조;
- 음원 출처와 권리·오프라인 정책;
- 실제 오디오 구현 범위;
- 플랫폼·viewport·접근성 증거 범위;
- 별도 앱 Brand Application/Profile 필요 여부와 experience principles;
- primary commitment와 failure cost.

질답 시작 게이트를 통과하면 아래 frozen composition을 채운다. 그 전에는 Flow Step, 화면, CTA를 생성하지 않는다.

## 3. Frozen composition template

```yaml
composition:
  id: composition.random-music-app.r1
  ues_version: 0.5.0-draft
  product_binding: pending-after-interview
  ux_preset:
    id: decision.reserve|decision.compare|decision.plan
    version: 0.1.0
  design_pack:
    id: existing-library-pack-id
    version: pinned-version
  brand_application: pending-after-interview|none
  brand_experience_profile: pending-after-interview|none
  medium_adapter: pending-after-interview
  projection: flowchart|lowfi|highfi
  compatibility:
    status: pending
    adaptations: []
    limitations: []
    blocking_gaps: []
```

### 선택 원칙

- Design Pack은 [기존 라이브러리](../../design-packs/README.md)에서 한 개를 선택한다.
- UX Preset은 [기존 Registry](../../ux-presets/README.md)의 세 후보를 먼저 평가한다.
- `Reserve`: 하나의 적절한 랜덤 결과를 빠르게 선택·재생하는 과업.
- `Compare`: 여러 후보를 근거와 함께 비교한 뒤 재생하는 과업.
- `Plan`: 여러 곡·라운드·순서를 큐나 시간에 배치하는 과업.
- 기존 Preset이 맞지 않는다고 바로 새 Preset을 만들지 않는다. `limited`, `blocking`, 또는 local neutral 필요성을 근거와 함께 기록하고 진행 여부를 결정한다.
- 앱 브랜드가 필요하면 Track 2 전용 Brand Application/Profile을 만들고 버전을 고정한다. 브랜드 표현이 실험 질문에 불필요하면 `none`과 local-neutral 이유를 기록한다.
- Track 1의 COMMON SURFACE, Industrial Swiss 선택, Reserve 표본은 자동 상속하지 않는다. 같은 Pack/Preset을 다시 선택하더라도 앱의 질답과 호환성 평가가 근거여야 한다.

Track 2 시작 후 Product Binding, 선택한 Pack/Preset, Brand Application/Profile 유무를 변경하면 Composition Manifest revision과 이유가 필요하다. Pack/Preset 문제는 실험 종료 전까지 즉시 고치지 않고 gap으로 기록한다.

## 4. 절대 불변조건

질답 후 ID와 내용을 채운다.

- [ ] Product Binding과 UX Preset ID/version
- [ ] 사용자 목표와 primary commitment
- [ ] 음악 객체·랜덤 규칙·제약·권한·데이터·실패 비용
- [ ] 질답 후 부여한 stable Step/Transition ID
- [ ] 시스템 랜덤 결과/추천 → 사용자 선택 → 재생 커밋 → 실제 Playing 결과의 권한 차이
- [ ] Back/Cancel/Retry/Resume/Exit retention
- [ ] 현재 재생·다음 곡·필터·CTA·결과가 하나의 상태 원천에서 동기화됨
- [ ] 음원 권리·오프라인·외부 서비스 경계
- [ ] 접근성 및 안전한 출력 실패 기본값

## 5. 공통 단계 루프

각 단계에서 다음을 한 번 수행한다.

```text
Draft → Builder score → One correction pass → Independent review → Exit decision
```

무제한 polish는 수정 비용을 숨긴다. 두 번째 수정이 필요하면 rework로 기록한다.

## 6. Stage F — Flowchart

### 산출물

1. Pattern Flow
2. Step Flow
3. Semantic Composition
4. State/transition table
5. Back/Cancel/Retry/Resume/Exit retention table
6. Composition Manifest 초안

필수 의미는 질답에서 확정한다. 최소한 entry, primary success, alternative, failure, interruption, safe exit를 평가하고, 모든 interactive semantic을 transition 또는 명시적 local effect에 연결한다.

### Flowchart Module — 40점

| ID | 항목 | 배점 | 4점 기준 |
| --- | --- | ---: | --- |
| F1 | 진입·도달성·종료 완결성 | 16 | 모든 Step 도달·종료·의도적 loop exit가 검증됨 |
| F2 | 분기·상태·복구 | 12 | 재생·랜덤·중단·실패 path와 retention/side-effect가 모순 없이 연결됨 |
| F3 | 권한·선택·커밋·Playing 결과 | 8 | 각 authority state가 transition과 실제 결과 증거에 명확히 매핑됨 |
| F4 | 수정 부담 | 4 | 한 correction pass 내 구조 결함이 해결되고 로그가 완전함 |

출구 게이트: Stage ≥80, Core 각 항목 ≥3, unreachable Step 0, P0/P1 0, E1 이상.

## 7. Stage L — Low-fi

화면 수를 미리 고정하지 않는다. 질답 후 stable Step을 필요한 frame에 매핑한다.

필수 검토:

- 과업 시작과 Ready 상태;
- 랜덤 조건 또는 바로 재생의 우선순위;
- 시스템이 고른 결과와 사용자의 재생 커밋 구분;
- Playing, 다음 행동, 중단/복구;
- 적용되는 empty, unavailable, permission/output, loading, failure 상태;
- 좁은 화면에서 핵심 상태·commit·safe stop 접근성.

최종 Design Pack 캐릭터를 적용하지 않는다. 각 frame은 Step ID와 transition을 기록하며 Low-fi에서 새로운 음악 정책이나 데이터 출처를 발명하지 않는다.

### Low-fi Module — 40점

| ID | 항목 | 배점 | 4점 기준 |
| --- | --- | ---: | --- |
| L1 | IA와 핵심 과업 위계 | 16 | Ready/Playing/commit/status/recovery 우선순위가 매체에 맞게 일관됨 |
| L2 | Flow/Pattern/control 적합성 | 12 | 모든 Step과 action이 traceable frame/control로 매핑됨 |
| L3 | edge-state와 복구 위치 | 8 | 원인·영향·수정 행동이 가까이 있고 안전한 상태를 보존함 |
| L4 | 수정 부담 | 4 | 한 correction pass 내 구조 결함이 해결되고 로그가 완전함 |

출구 게이트: Stage ≥80, Flow→Low-fi Semantic Carryover ≥90, orphan frame/action 0, P0/P1 0, E1 이상.

## 8. Stage H — High-fi

### 산출물

- Low-fi와 같은 task/state/transition set;
- 선택한 canonical Pack token/component mapping;
- Track 2에서 동결한 앱 Brand Application/Profile mapping 또는 명시적 `none`;
- 질답에서 적용하기로 한 default/focus/disabled/loading/unavailable/error/playing 상태;
- 확정 viewport, 긴 한국어 라벨, 확대/reflow, non-color cue 점검;
- Design Pack × Preset × Medium capability/gap report;
- Pack 표현 때문에 바뀐 것과 유지된 것의 diff.

Design Pack Preview는 Pack 표본이고, 앱 High-fi는 Product Binding 투영이다. 실제 소리와 오디오 route를 검증하지 않았다면 Playing UI만으로 runtime 성공을 주장하지 않는다.

### High-fi Module — 40점

| ID | 항목 | 배점 | 4점 기준 |
| --- | --- | ---: | --- |
| H1 | 기존 Pack 캐릭터와 의미 보존 | 16 | 선택한 Pack이 랜덤·선택·재생·Playing·복구 의미를 왜곡 없이 표현함 |
| H2 | 컴포넌트·상태 표현 | 12 | 적용 상태가 canonical Pack contract와 Track 2의 동결된 application/profile 선택에 일치함 |
| H3 | reflow·긴 콘텐츠·접근 표현 | 8 | 확정 viewport/확대에서 commit·Playing·safe recovery가 보존됨 |
| H4 | 수정 부담 | 4 | 한 correction pass 내 결함이 해결되고 로그가 완전함 |

출구 게이트: Stage ≥80, Low-fi→High-fi Semantic Carryover ≥90, P0/P1 0, E2 이상.

## 9. Carryover matrix template

질답 후 stable ID를 추가하고 `preserved / changed-with-manifest / lost / newly-invented / not-applicable`로 기록한다.

| Semantic ID | Meaning | Flowchart | Low-fi | High-fi | Evidence | Result |
| --- | --- | --- | --- | --- | --- | --- |
| pending | primary goal | pending | pending | pending | — | pending |
| pending | random result/selection authority | pending | pending | pending | — | pending |
| pending | playback commitment | pending | pending | pending | — | pending |
| pending | confirmed Playing evidence | pending | pending | pending | — | pending |
| pending | failure/safe fallback | pending | pending | pending | — | pending |
| pending | retention | pending | pending | pending | — | pending |

## 10. Pipeline Tool Value

```text
Artifact Quality
= Flowchart Stage × 0.25
+ Low-fi Stage × 0.30
+ High-fi Stage × 0.45

Pipeline Tool Value
= Artifact Quality × 0.45
+ Invariant Preservation × 0.25
+ Reuse Rate × 0.15
+ Attribution Rate × 0.15
```

| 판정 | 잠정 기준 |
| --- | --- |
| 강한 잠정 가치 | 모든 Stage ≥80, Tool Value ≥90, carryover ≥95, P0/P1 0 |
| 계속 실험할 가치 | 모든 Stage ≥80, Tool Value 80–89, carryover ≥90, P0/P1 0 |
| 보정 필요 | Tool Value 70–79 또는 한 Stage가 70–79 |
| 현재 가치 약함 | Tool Value <70 또는 hard gate 실패 |

한 번의 통과는 지속 가치의 최종 증명이 아니다. 두 번째 Product Binding 또는 다른 기존 Pack/Medium에서 Reuse Rate가 유지되고 Human Correction Rate와 시간이 감소해야 한다.

결과는 [Track 2 결과지](results/02-pipeline-scorecard.md)에 기록한다.
