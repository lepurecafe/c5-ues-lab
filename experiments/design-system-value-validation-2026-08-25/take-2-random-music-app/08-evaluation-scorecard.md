# Take 2 — Evaluation Scorecard

> Verdict snapshot: **8.6/10 · E2 · C2 — 9/10 미달, 보정 조건부 지속 가치**
>
> Composition: `composition.random-music-app.take-2.r2`
>
> System: `pack:industrial-swiss@1.0.0` + `decision.reserve@0.1.0` + `binding.battle-beat-randomizer@1.1.0`
>
> QA: `qa.take-2.battle-beat.2026-08-26.final-r3`

## 1. 판정 요약

Flowchart, Low-fi, High-fi는 각각 `90`, `92`, `94`점이며 가중 Artifact Quality는 **`92.4/100`**다. P0/P1과 blocking capability gap은 열려 있지 않고, 브라우저 렌더·상태 계약·캡처·정적 검사는 E2로 재현됐다. 그러나 다음 네 가지가 9/10 선언을 막는다.

1. Flowchart `F4`와 Low-fi `L4`의 수정 부담 anchor가 각각 `2/4`다. 한 번의 correction pass 안에서 끝났다고 보기 어려운 drift와 미등록 영향 `U-01`이 있었다.
2. Design Pack strict 적용은 `11/22 = 50.0%`, UX Preset strict semantic test는 `3/6 = 50.0%`다. 구현에서 모두 다뤘어도 canonical contract를 완전히 입증한 것은 아니다.
3. 공식 Reuse Rate, 광의 Semantic Carryover, Human Correction Rate, 실제 작업 시간의 분모를 사전 동결하지 않았다. 따라서 공식 Pipeline Tool Value는 **미측정**이다.
4. 실제 iPhone·오디오 출력·VoiceOver/보조기술·대표 배틀 사용자의 E3/E4 검증이 없다.

최종 `8.6/10`은 산출물의 시각 완성도만이 아니라 **시스템 유효성 증거의 완전성**을 함께 평가한 실험 판정이다.

## 2. Hard gate

| Gate | 결과 | 증거 |
| --- | --- | --- |
| 열린 P0/P1 | `0` · 통과 | [`qa-report.md`](evidence/qa-report.md), [`07-change-log.md`](07-change-log.md) |
| blocking Preset × Pack × Medium gap | `0` · 통과 | [`06-hi-fi-preview-fidelity-ledger.md`](06-hi-fi-preview-fidelity-ledger.md) |
| 추천·커밋·Playing·실패의 거짓 합성 | 없음 · 통과 | `S-REQUESTING → S-RECOMMENDED → S-STARTING → S-PLAYING`; `ST-01`, `ST-06`, `ST-13` |
| 실패/빈 상태의 복구 불능 | 없음 · 통과 | same-draw retry, gated fallback, same-track restart recovery, relax/undo |
| 권리·실데이터·런타임 과장 | 없음 · 통과 | synthetic fixture 및 `실제 오디오 없음` 표기; 실제 기기·AT 미검증 명시 |
| 핵심 의미 유실 | 없음 · 통과 | stable action/information `6/6`, object `8/8`, state-contract `18/18` |

Hard gate는 통과했지만, 이것만으로 9/10 또는 production-ready를 뜻하지 않는다.

## 3. 단계별 점수

점수는 [공통 평가 프레임](../evaluation-framework.md)의 `0–4` anchor와 [Track 2 실험 계약](../02-projection-pipeline-experiment.md)을 사용한다. 반점 anchor는 사용하지 않았다.

### Stage F — Flowchart

| ID | 항목 | 배점 | Anchor | 적용 점수 | 근거 |
| --- | --- | ---: | ---: | ---: | --- |
| C1 | 목표·객체·커밋·결과 의미 보존 | 16 | 4 | 16 | `ACT-*`, `OBJ-*`, Round/Draw/Event ID가 flow와 state model에 연결 |
| C2 | 상태·전이·검증·복구 무결성 | 16 | 3 | 12 | 정상·empty·draw error·restart error·recovery가 연결됐으나 Back/Cancel/Exit 전 경로는 독립 검증 부족 |
| C3 | 계층 귀속과 추적성 | 12 | 4 | 12 | CR-01과 drift가 Pack/Preset/Binding/Projection에 귀속 |
| C4 | 접근성·신뢰·권리·데이터 경계 | 8 | 4 | 8 | synthetic boundary와 E2 한계가 명시됨 |
| C5 | 명칭·버전·토큰·참조 일관성 | 8 | 4 | 8 | final canonical ID drift `0` |
| F1 | 진입·도달성·종료 완결성 | 16 | 3 | 12 | 주요 step은 도달 가능하나 실제 Back/Exit/중단의 end-to-end 기록이 완전하지 않음 |
| F2 | 분기·상태·복구 | 12 | 4 | 12 | same-draw, same-track, fallback gate, retained last-safe 분기 완전 |
| F3 | 권한·선택·커밋·Playing 결과 | 8 | 4 | 8 | authority state와 confirmed synthetic Playing이 분리됨 |
| F4 | 수정 부담 | 4 | 2 | 2 | FigJam recovery 의미 drift와 후속 보정이 있어 one-pass 증거가 약함 |
|  | **Stage F 합계** | **100** |  | **90** | **STRONG PASS · E2 · C2** |

### Stage L — Low-fi

| ID | 항목 | 배점 | Anchor | 적용 점수 | 근거 |
| --- | --- | ---: | ---: | ---: | --- |
| C1 | 목표·객체·커밋·결과 의미 보존 | 16 | 4 | 16 | `FR-READY/TRANSIENT/PLAYING/EMPTY/ERROR`와 canonical IDs |
| C2 | 상태·전이·검증·복구 무결성 | 16 | 3 | 12 | transient `6/6`과 error scope는 완전, 실제 Back/Exit 검증은 부족 |
| C3 | 계층 귀속과 추적성 | 12 | 4 | 12 | `U-01`이 Product Binding 변경 + Preset continuity로 귀속 |
| C4 | 접근성·신뢰·권리·데이터 경계 | 8 | 3 | 6 | 2 viewport와 touch target은 확인했지만 AT·확대·실기기 미검증 |
| C5 | 명칭·버전·토큰·참조 일관성 | 8 | 4 | 8 | stale `RND/DRW/EVT` prefix `0` |
| L1 | IA와 핵심 과업 위계 | 16 | 4 | 16 | Ready/authority/Playing/recovery hierarchy 유지 |
| L2 | Flow/Pattern/control 적합성 | 12 | 4 | 12 | action과 상태가 traceable frame/control에 연결 |
| L3 | edge-state와 복구 위치 | 8 | 4 | 8 | 원인·retained context·복구 행동이 같은 frame에 위치 |
| L4 | 수정 부담 | 4 | 2 | 2 | low-fi가 CR-01 영향 분석에서 누락되어 `+750/-89`의 후속 보정 발생 |
|  | **Stage L 합계** | **100** |  | **92** | **STRONG PASS · E2 · C2** |

### Stage H — High-fi

| ID | 항목 | 배점 | Anchor | 적용 점수 | 근거 |
| --- | --- | ---: | ---: | ---: | --- |
| C1 | 목표·객체·커밋·결과 의미 보존 | 16 | 4 | 16 | action/information `6/6`, object model `8/8` |
| C2 | 상태·전이·검증·복구 무결성 | 16 | 4 | 16 | `ST-01`–`ST-18 = 18/18` |
| C3 | 계층 귀속과 추적성 | 12 | 4 | 12 | 화면별 Pack/Preset/Binding 양방향 ledger |
| C4 | 접근성·신뢰·권리·데이터 경계 | 8 | 4 | 8 | synthetic UI, 권리 경계, E2 ceiling, AT 미검증을 명시 |
| C5 | 명칭·버전·토큰·참조 일관성 | 8 | 4 | 8 | canonical version과 stable ID가 HTML/문서/FigJam에 연결 |
| H1 | 기존 Pack 캐릭터와 의미 보존 | 16 | 4 | 16 | Industrial Swiss가 battle operations hierarchy를 강화하며 authority 의미를 왜곡하지 않음 |
| H2 | 컴포넌트·상태 표현 | 12 | 3 | 9 | 핵심 상태는 구현됐으나 canonical token/component strict coverage가 50% |
| H3 | reflow·긴 콘텐츠·접근 표현 | 8 | 3 | 6 | 402/375 viewport는 통과, 200%/Dynamic Type/AT/실기기 미검증 |
| H4 | 수정 부담 | 4 | 3 | 3 | baseline 91.2% line-retention proxy와 asset `10/10` 재사용; 초기 contract drift 보정은 필요했음 |
|  | **Stage H 합계** | **100** |  | **94** | **STRONG PASS · E2 · C2** |

### 가중 산출물 품질

```text
Artifact Quality
= 90 × 0.25
+ 92 × 0.30
+ 94 × 0.45
= 92.4 / 100
```

세 단계 모두 90점 이상이지만 `F4`, `L4`가 anchor 2이므로 사전 등록한 9/10 gate를 통과하지 않는다.

## 4. 정량 지표

| 지표 | 결과 | 판정/경계 | 증거 |
| --- | ---: | --- | --- |
| Design Pack strict 규칙 적용률 | `11/22 = 50.0%` | 9/10 목표 95% 미달 | fidelity ledger §3 |
| Design Pack addressed coverage | `22/22 = 100%` | 모든 적용 규칙을 다뤘으나 부분을 strict pass로 세지 않음 | fidelity ledger §3 |
| UX Preset 적용 상태 커버리지 | `15/15 = 100%` | 목표 충족 · synthetic E2 | fidelity ledger §4 |
| UX Preset strict semantic tests | `3/6 = 50.0%` | `supported-with-adaptation`; 6/6 addressed | fidelity ledger §4 |
| Product Binding action/information | `6/6 = 100%` | 좁게 동결한 stable-ID trace | fidelity ledger §5 |
| Product Binding object fidelity | `8/8 = 100%` | session fixture 범위 | fidelity ledger §5 |
| 필수 상태 계약 | `18/18 = 100%` | `ST-01`–`ST-18` | [`qa-results.json`](evidence/qa-results.json) |
| 필수 인터랙션 | `8/8 = 100%` | 등록한 product interaction 모두 동작 | [`qa-report.md`](evidence/qa-report.md) |
| Low-fi frame / transient | `5/5`, `6/6` | 정상·예외·복구와 pending authority | low-fi captures, FigJam `1:6` |
| High-fi 주요 capture | `8/8` | Ready/Playing/Paused/Recovered/Error/Empty/mobile/log | `evidence/` |
| Mobile viewport | `2/2` | 402×874, 375×812 overflow `0px`; 44px 미만 target `0` | QA |
| 깨진 local asset | `0` | SVG `10/10` XML valid, missing reference `0` | QA |
| Markdown local link | `45` checked, missing `0` | 평가 문서를 포함한 로컬 상대 링크 정적 검사; 외부 URL 가용성은 미측정 | 최종 링크 검사 |
| CR 사전 등록 전파 | `12/12 = 100%` | 목표 충족 | [`07-change-log.md`](07-change-log.md) |
| 영향 등록 완전성 | `12/13 = 92.3%` | `U-01` low-fi 사전 누락 | change log §3 |
| 발견 영향 최종 전파 | `13/13 = 100%` | 종료 전 drift 해소 | change log §3 |
| 불변조건 유지 | `8/8 = 100%` | E2 범위 | change log §5 |
| 접근성 기본 점검 | `10/10 = 100%` | 정적/렌더 baseline; AT run 제외 | QA |
| Capture integrity | `21/21` true PNG | final 17 + before 4 | QA inventory |
| P0/P1 | `0/0` | hard gate 통과 | QA + 독립 검토 |
| 광의 Semantic Carryover | **미측정** | 단계별 전체 의미의 분모를 사전 동결하지 않음 | narrow action/info `6/6`만 별도 보고 |
| 공식 Reuse Rate | **미측정** | 적용 가능한 상위 승인 항목 분모를 사전 동결하지 않음 | line retention은 근사치일 뿐 |
| Human Correction Rate | **미측정** | 전체 생성·수정 항목 및 사람 보정 건수 미계측 | 감점 사유 |
| 실제 작업/보정 시간 | **미측정** | 시작·종료·사람별 시간이 없음 | 감점 사유 |
| 실기기·오디오·AT·대표 사용자 | **미측정** | E3/E4가 아닌 E2 실험 | 최종 제한 |

`미측정`은 0점으로 바꾸지 않았다. 대신 시스템 유효성 점수와 9/10 eligibility에서 증거 부족으로 감점했다.

## 5. Pipeline Tool Value 경계

공식 산식은 Reuse Rate를 요구하지만 그 분모를 사전 동결하지 않았으므로 **공식 Pipeline Tool Value는 미측정**이다. 다음 값은 공식 지표가 아니라 민감도 확인용 보수적 proxy다.

```text
보수적 proxy 전제
Artifact Quality = 92.4
Invariant Preservation = 100
Reuse proxy = Design Pack strict coverage 50
Attribution proxy = 100

92.4 × 0.45 + 100 × 0.25 + 50 × 0.15 + 100 × 0.15
= 89.08 ≈ 89.1
```

`89.1`을 공식 Tool Value나 재사용률로 인용해서는 안 된다. 정식 후속 실험에서 승인 항목 분모와 재사용 판정을 먼저 freeze해야 한다.

## 6. 9/10 판정표

| 사전 조건 | 결과 | 9/10 적격 |
| --- | --- | --- |
| 각 Stage ≥90 | `90 / 92 / 94` | 예 |
| 모든 C1–C5 및 단계 module anchor ≥3 | `F4=2`, `L4=2` | **아니오** |
| Design Pack 적용률 ≥95% | strict `50.0%` | **아니오** |
| UX 상태 커버리지 100% | `15/15` | 예 |
| 필수 흐름·인터랙션 100% | `18/18`, `8/8` | 예 |
| Mobile layout P1/P2 0 | 두 viewport에서 `0` | 예 · 지원 범위 한정 |
| 변경 전파 ≥95% / 불변조건 100% | `12/12`, `8/8` | 예 |
| 문서–화면–에셋 추적 ≥95% | narrow stable trace는 충족, 광의 분모 미동결 | **증거 부족** |
| Semantic Carryover ≥95% | narrow `6/6`; 공식 광의 지표 미측정 | **아니오** |
| E2 이상 | E2 | 예 |
| P0/P1 0 | `0` | 예 |
| 미측정 핵심 지표 없음 | Reuse/Human Correction/time/광의 carryover 미측정 | **아니오** |

따라서 **9/10 미달**이며 `8.6/10 · E2 · C2`가 최종 판정이다.

## 7. 보정 이력과 남은 결함

| 발견 | 최종 상태 | 평가 영향 |
| --- | --- | --- |
| Hi-fi event/object contract 축약 | 해결 | `ST-01`–`ST-18`, object `8/8`로 닫았지만 one-pass 주장 불가 |
| FigJam recovery scope drift | 해결 | same-draw retry와 same-track restart를 분리; F4 감점 |
| `U-01` low-fi 영향 미등록 | 해결 | 전체 `13/13`은 닫았으나 등록 완전성 92.3%, L4 감점 |
| 캡처 `.png`의 JPEG signature 및 상태 증거 부족 | 해결 | true PNG `21/21`, Paused/Recovered/transient 추가 |
| 실제 iPhone·audio·AT·대표 사용자 검증 | 미해결/다음 실험 | E2 ceiling, production readiness 불가 |
| 공식 Reuse/Human Correction/time/carryover 분모 | 미해결/다음 실험 | Tool Value 미측정, 9/10 불가 |

## 8. 최종 점수 해석

**8.6/10**은 “높은 완성도지만 핵심 증거나 유지보수 검증이 부족함” 구간이다. 시스템은 일관된 산출물과 추적 가능한 변경을 만들었고, drift를 발견·귀속·수정하는 데 실질적으로 기여했다. 그러나 시스템이 없었을 때보다 시간·보정량·재사용률이 개선됐다는 인과 비교는 아직 측정하지 못했다.

다음 실험에서 공식 분모와 시간/보정 로그를 사전 동결하고, 실제 iPhone·오디오·VoiceOver·대표 배틀 사용자를 포함해야 9/10 재도전이 가능하다.
