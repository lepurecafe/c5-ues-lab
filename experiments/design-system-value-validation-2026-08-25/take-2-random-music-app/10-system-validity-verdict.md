# Take 2 — System Validity Verdict

> **최종 판정: 8.6/10 · E2 · C2 — 지속 운영 가치 있음, 보정 조건부**
>
> Artifact Quality: `92.4/100` (`Flow 90 · Low-fi 92 · High-fi 94`)
>
> 9/10 미달: `F4=2`, `L4=2`, Design Pack strict `50%`, UX Preset strict semantic `50%`, 공식 Reuse/Carryover/Human Correction/time 미측정, 실기기·오디오·AT·대표 사용자 미검증

## 1. 시스템이 실제로 해낸 일

- `pack:industrial-swiss@1.0.0`, `decision.reserve@0.1.0`, `binding.battle-beat-randomizer@1.1.0`의 책임을 혼합하지 않고 끝까지 추적했다.
- 랩·댄스 배틀의 동일 core flow를 iPhone용 flowchart → state model → low-fi → interactive hi-fi → FigJam에 stable ID로 연결했다.
- street/industrial Swiss 시각 언어를 warm canvas, hard grid, condensed type, mono metadata, bounded red, round gold, synthetic print material로 일관되게 투영했다.
- 추천, 자동 playback attempt, confirmed synthetic Playing, failure를 분리해 “추천됨=재생 성공”이라는 거짓 상태를 막았다.
- RANDOM BEAT, play/pause, restart, new round/reroll, save, deferred exclude, empty, recommendation/restart failure와 복구를 실제 HTML interaction으로 구현했다.
- CR-01 Fair Round Lock을 Product Binding 변경으로 국소화하고, first Playing lock·same-track restart·new-round-only draw·next-round exclusion·visible event log를 전파했다.
- 사전 영향 `12/12`, 발견 영향 `13/13`, 불변조건 `8/8`, 상태 계약 `18/18`, 필수 interaction `8/8`을 E2 증거로 닫았다.
- 문서/화면/FigJam/asset/capture mismatch를 ledger와 독립 검토로 찾아 최종 결과에 반영했다.

## 2. 시스템이 해내지 못한 일

- canonical Design Pack을 strict implementation contract로 완전히 적용하지 못했다. `11/22 = 50%`만 strict pass이고 나머지는 부분 적용이다.
- UX Preset은 상태 `15/15`를 다뤘지만 strict semantic test는 `3/6 = 50%`다. Back/Cancel/Exit와 keyboard/platform path가 불완전하다.
- CR-01 영향 분석에서 low-fi를 사전 등록하지 못했다. 종료 전 수정했지만 영향 등록 완전성은 `12/13 = 92.3%`다.
- 공식 Reuse Rate, 광의 Semantic Carryover, Human Correction Rate, 실제 작업/보정 시간을 사전 계측하지 못했다.
- 시스템이 없었을 때보다 비용·속도·사용자 결과가 좋아졌다는 통제 비교를 만들지 못했다.
- 실제 iPhone/Simulator, 실제 오디오 route/output, 네트워크, VoiceOver, 대표 랩/댄스 배틀 사용자와 현장 운영을 검증하지 못했다.
- 따라서 production-ready, 현장 공정성 보장, 실제 음원 서비스라고 주장할 수 없다.

## 3. 단계별 정량 점수와 증거

| 단계 | 점수 | 핵심 증거 | 판정 |
| --- | ---: | --- | --- |
| Flowchart | `90/100` | [`03-user-flow.md`](03-user-flow.md), [`04-state-model.md`](04-state-model.md), FigJam `1:5`, recovery IDs | STRONG PASS · `F4=2` gap |
| Low-fi | `92/100` | [`05-low-fi.html`](05-low-fi.html), frame `5/5`, transient `6/6`, two viewport QA, FigJam `1:6` | STRONG PASS · `L4=2` gap |
| High-fi | `94/100` | [`06-hi-fi-preview.html`](06-hi-fi-preview.html), `ST-01`–`ST-18`, interaction `8/8`, capture `8/8` | STRONG PASS |
| 가중 Artifact Quality | **`92.4/100`** | `90×.25 + 92×.30 + 94×.45` | 산출물 품질은 9점대 |
| 시스템 유효성 | **`8.6/10`** | strict coverage, 수정 부담, 계측/현장 증거를 함께 반영 | 9/10 미달 |

주요 운영 수치는 다음과 같다.

- Design Pack: strict `11/22`, addressed `22/22`.
- UX Preset: state `15/15`, strict semantic `3/6`, addressed `6/6`.
- Product Binding: action/information `6/6`, object model `8/8`.
- Layout: 402×874와 375×812에서 horizontal overflow `0`, 44px 미만 visible enabled target `0`.
- Asset/link: local SVG `10/10` XML valid, broken asset `0`; 평가 문서를 포함한 Markdown local link 45개 중 missing `0`.
- 접근성 baseline: `10/10`, 단 AT run은 미실행.
- Evidence: final low-fi 5, high-fi 8, FigJam 4, before 4의 true PNG `21/21`.
- P0/P1: `0/0`; blocking gap 없음.

상세 anchor와 미측정 경계는 [`08-evaluation-scorecard.md`](08-evaluation-scorecard.md)에 있다. 공식 Pipeline Tool Value는 Reuse Rate 분모가 없으므로 **미측정**이다. `89.1`은 Design Pack strict 50%를 reuse proxy로 대입한 민감도 값일 뿐 공식 점수가 아니다.

## 4. 정성 평가

브랜드와 제품 경험은 하나의 시스템처럼 느껴진다. Industrial Swiss의 hard operational language가 배틀 앱의 빠른 scanning과 round authority를 강화하고, 장식이 핵심 행동을 압도하지 않는다. 랜덤 추천은 모든 화면에서 “새 카드를 보는 재미”가 아니라 “현재 round에 쓸 비트를 공정하게 받는 행동”으로 읽힌다.

오류와 empty는 원인, retained context, 허용 복구를 가까이 보여주고 false Playing을 만들지 않는다. 변경 후에도 동일한 제품으로 느껴지는 이유는 시각 토큰뿐 아니라 action topology와 authority language가 보존됐기 때문이다.

시스템은 실제로 판단 범위를 줄이고 drift를 귀속하는 데 기여했다. 그러나 시스템이 자동으로 완성도를 만들지는 않았다. Hi-fi object/event 계약, FigJam recovery scope, low-fi continuity, capture format은 review 과정에서 추가 보정이 필요했다. 상세 평가는 [`09-qualitative-review.md`](09-qualitative-review.md)에 있다.

## 5. 변경 실험 결과

CR-01은 “첫 confirmed Playing을 round에 잠그고, restart와 new round를 분리하며, exclude는 다음 round부터 적용한다”는 Product Binding 변경이다.

### 결과

- before 버전과 4개 baseline capture를 보존했다.
- 문서, IA, flow, state, low-fi, hi-fi, ledger, FigJam, evidence, change log에 실제 변경을 전파했다.
- 사전 등록 영향은 `12/12 = 100%`, 발견 영향은 보정 후 `13/13 = 100%`다.
- 불변조건은 `8/8 = 100%`로 유지됐다.
- Hi-fi는 baseline 1052 lines 중 93 lines를 삭제해 line-retention proxy `91.2%`, asset `10/10`을 재사용했다.
- Low-fi는 사전 누락 후 `+750/-89`가 필요했고 final의 절반가량이 additive sync였다. 이를 low-cost reuse 증거로 사용하지 않는다.

### 판정

기존 hi-fi를 전면 재작성하지 않고 변경한 점은 유지보수성의 긍정 증거다. 반면 low-fi 미등록과 여러 correction round는 영향 분석과 one-pass maintainability의 한계를 드러냈다. 상세 추적은 [`07-change-log.md`](07-change-log.md)에 있다.

## 6. Design Pack 개선 필요 항목

- Raw palette에서 semantic app token으로 가는 canonical adapter와 자동 conformance 판정.
- iPhone 좁은 화면용 12-column/spacing/safe-area/touch-target 투영 규칙.
- 상업 사용권과 실제 loading asset이 있는 Latin/Korean font stack.
- button/card/segmented/status/error/image의 전체 state matrix.
- image/material failure, reduced-data, provenance fallback.
- CJK 줄바꿈, 200% zoom, Dynamic Type, VoiceOver, reduced-motion 승인 fixture.
- drawer/alert/transient/sticky surface용 layer token.

이 항목은 Pack의 시각 정체성을 바꾸자는 뜻이 아니라, 현재 Industrial Swiss를 더 엄격하고 반복 가능하게 적용하기 위한 개선이다.

## 7. UX Preset 개선 필요 항목

- no-Start random/autoplay에서 recommendation→attempt→confirmed outcome을 분리하는 공식 adapter.
- pending 중 Back/Cancel/Exit/재진입 retention을 검증하는 executable transition suite.
- draw failure와 locked-track execution failure를 구분하는 scoped recovery/idempotency 규칙.
- Fair Round Lock, same-track restart, new-round-only reroll을 재사용 candidate pattern으로 검증.
- confirmed current outcome을 보존하는 deferred exclusion/undo candidate pattern.
- keyboard-only, focus order, platform-equivalent, assistive action의 end-to-end evidence 요구.

독립 제품 증거가 생기기 전 Fair Round Lock과 deferred exclusion은 canonical Preset이 아니라 candidate adapter로 유지한다.

## 8. 제품 바인딩에 남겨야 할 결정

- 실제 음악/비트 출처와 제작자 계약, 배포·스트리밍·공연·배틀 현장 사용권.
- 참가자, DJ, 주최자 모두가 사용 가능할 때의 역할·권한·reroll 합의 규칙.
- 랜덤 seed, 재현성, 조작 방지, event log 공개·보존·개인정보 정책.
- instrumental/clean/explicit, 샘플·가사·문화적 적절성 정책.
- round 길이, cue/stop/fade, MC/심판 신호와의 관계.
- 오프라인 cache, latency, audio route, volume, 무음/끊김 backup.
- 저장·제외·history의 session/device/account scope와 동기화·삭제.
- 후보 부족 시 조건 완화와 local fallback의 승인 기준.
- 실제 현장의 조명·소음·한 손 사용에서 요구되는 우선순위.

이 항목은 `결정 필요`이며 Pack 또는 Preset 사실로 승격하지 않는다.

## 9. 이 시스템을 지속적으로 운영할 가치가 있는가

**있다 — 보정 조건부다.**

지속 가치의 근거는 세 단계가 모두 90점 이상이고, core flow와 예외 flow가 동작하며, change request가 문서·화면·FigJam·증거에 추적 가능하게 전파됐다는 점이다. 시스템의 경계가 drift를 찾아 한 계층에 귀속시키고, 같은 시각/행동 identity를 유지한 채 Product Binding을 바꾸는 데 실질적으로 유용했다.

그러나 `8.6/10`은 9점 판정이 아니다. 다음 실험은 시작 전에 다음을 반드시 동결해야 한다.

1. Reuse Rate와 광의 Semantic Carryover의 승인 항목 분모.
2. builder/reviewer 시작·종료 시각, 사람 correction 건수와 시간.
3. 두 번째 Product Binding 또는 다른 medium에서의 동일 시스템 재사용 조건.
4. 실제 iPhone/Simulator, audio route/output, VoiceOver, 대표 랩/댄스 배틀 사용자의 E3/E4 검증 계획.

이 네 조건을 충족한 반복 실험에서 strict Pack/Preset coverage와 one-pass correction이 개선되어야 “시스템이 없었을 때보다 낫다”와 9/10을 설득력 있게 선언할 수 있다.
