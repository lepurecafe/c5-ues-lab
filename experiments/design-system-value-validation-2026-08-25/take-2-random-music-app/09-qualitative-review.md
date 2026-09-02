# Take 2 — Qualitative Review

> 대상: iPhone용 랩·댄스 배틀 랜덤 비트 앱의 Markdown Design System 투영
>
> 판정 경계: E2 렌더·정적·상태 계약 증거. 실제 음향, 실기기, 보조기술, 현장 사용성은 평가하지 않았다.

## 1. 한 문장 평가

Industrial Swiss의 거리·인쇄·운영 콘솔 감각과 `decision.reserve`의 authority/recovery 규칙은 배틀 라운드용 랜덤 비트라는 제품 목적을 하나의 시스템처럼 묶는 데 성공했다. 다만 canonical Pack/Preset의 strict coverage가 각각 50%이고 실제 현장 증거가 없으므로, 결과는 **설득력 있는 상업 제안 및 반복 실험의 기반**이지 production-ready 제품은 아니다.

## 2. 브랜드와 제품 경험의 결합

### 잘된 점

- Warm canvas, deep ink, hard border, condensed display, mono metadata, bounded red, round gold가 하나의 operational visual language를 만든다.
- street 표현을 장식적 graffiti나 실재 문화 자산 차용으로 해결하지 않고, screenprint/photocopy/grid/tape의 합성 재질과 직접적인 명령형 문구로 번역했다.
- `ROUND`, `DRAW`, `TRACK`, `ATTEMPT`, event type을 같은 정보 위계로 표시해 시각 언어가 공정성 계약을 읽는 도구로 작동한다.
- RAP/DANCE와 RAW/BOUNCE/DRIVE는 Product Binding에 남고, Pack이 장르나 추천 정책을 소유하지 않는다.

### 한계

- canonical semantic token, 정확한 12-column adapter, spacing scale, font loading, 전체 component state가 strict하게 입증되지 않았다.
- 현재 표현은 iPhone portrait 두 viewport에 최적화됐고, 큰 글자·200% 확대·가로 모드·다른 Apple form factor에서는 같은 hierarchy가 유지되는지 모른다.
- 거리감의 문화적 적절성과 랩/댄스 현장의 진정성은 대표 사용자 관찰 없이 평가할 수 없다.

## 3. 랜덤 추천 핵심 가치

핵심 가치인 “배틀에서 쓸 비트를 고르느라 흐름을 끊지 않고 즉시 하나를 받는다”는 READY의 단일 `RANDOM BEAT` commit부터 synthetic Playing까지 일관된다. 추천 후 별도 Start를 두지 않되 `REQUESTING → SYSTEM PICK → STARTING → PLAYING / SIM`을 분리해, 자동 시도가 곧 성공이라는 거짓 신호를 만들지 않았다.

CR-01 이후에는 랜덤의 목적도 더 선명해졌다.

- 첫 confirmed Playing이 현재 round와 원자적으로 잠긴다.
- `RESTART TRACK`은 같은 트랙·round·draw를 유지한다.
- `NEW ROUND / REROLL`만 새 후보를 권한 있게 요청한다.
- 제외는 현재 round를 흔들지 않고 다음 round부터 적용된다.

이 구조는 랜덤 추천을 단순한 “새 카드 보여주기”가 아니라 배틀 운영 계약으로 바꾼다.

## 4. 오류·빈 상태·복구의 품질

오류와 빈 상태는 서비스 품질을 크게 훼손하지 않는다.

- Draw failure는 last-safe round/track을 유지하고 같은 `drawId`로 retry한다.
- Local fallback은 draw failure `3/3` 뒤에만 허용된다.
- Restart failure는 다른 트랙으로 우회하지 않고 same-track recovery만 허용한다.
- Empty는 가짜 Playing을 만들지 않고 energy 완화 또는 마지막 exclusion 취소를 제공한다.
- Event log는 실패·복구·fallback을 stable `EVENT-*` sequence로 남겨 제3자가 결과를 검토할 수 있게 한다.

다만 이 복구가 실제 네트워크 지연, audio route 실패, Bluetooth/스피커 전환, 오프라인 현장에서 유효한지는 미검증이다.

## 5. 변경 뒤의 동일성

CR-01은 Product Binding 변화였고 Pack/Preset 정본을 수정하지 않았다. 그 결과 색·타입·표면·local red hierarchy, recommendation/commitment/outcome 분리, synthetic boundary, empty/error recovery는 유지됐다. 변경 후에도 동일한 제품으로 느껴지는 이유는 시각 장식을 보존했기 때문만이 아니라, core action topology와 authority language가 유지됐기 때문이다.

불변조건 `8/8`과 asset `10/10` 재사용은 이를 지지한다. 동시에 low-fi가 영향 분석에서 빠지고 FigJam recovery 의미가 한 차례 어긋났다는 사실은, 시스템이 자동으로 일관성을 보장한 것이 아니라 ledger와 review gate가 drift를 찾아 보정했다는 뜻이다.

## 6. 시스템이 줄여 준 결정

### 실제로 줄인 결정

- Pack이 canvas/ground/signal/type/surface/material 방향을 제한해 화면마다 새 스타일을 고르는 일을 줄였다.
- Preset이 recommendation, commitment, confirmed outcome, failure, retry, retention을 분리해 “실패를 Playing처럼 보이지 않게” 하는 기준을 제공했다.
- Product Binding 경계가 round fairness, reroll authority, deferred exclusion, fallback threshold를 시각 토큰과 분리했다.
- stable ID와 ledger가 flow→low-fi→hi-fi→FigJam→QA의 mismatch를 찾는 공통 언어가 됐다.
- change request의 invariant와 impact table이 전면 재작업 없이 영향을 국소화하는 기준을 제공했다.

### 입증하지 못한 것

- 시스템이 없었을 때보다 실제 작업 시간이 짧았다는 비교.
- 사람의 meaningful correction 수가 감소했다는 Human Correction Rate.
- 다른 제품/매체에서도 같은 Pack/Preset 항목이 수정 없이 재사용된다는 공식 Reuse Rate.
- 실제 사용자에게 더 빠르거나 공정한 선택을 제공한다는 행동 지표.

따라서 “더 나은 의사결정”은 drift detection과 attribution 측면에서는 관찰됐지만, 비용/속도/사용자 성과의 인과 우위는 아직 미측정이다.

## 7. Design Pack 개선 필요 항목

1. **Canonical semantic token adapter**  
   Raw palette와 앱별 local variable 사이의 표준 mapping을 제공하고, strict/partial/override 판정을 자동 검사할 수 있어야 한다.

2. **iPhone grid와 spacing adapter**  
   12-column 원칙을 좁은 operational stack에 투영하는 공식 규칙, safe-area, dense metadata, touch target의 예시가 필요하다.

3. **Font contract**  
   상업적 사용권, 실제 로딩 파일, Korean/Latin fallback, condensed display의 대체 동작을 canonical asset로 제공해야 한다.

4. **Component state matrix**  
   Button/card/segmented/status/error/image의 default, focus, pressed, disabled, loading, unavailable, selected, failed 상태를 같은 계약으로 정의해야 한다.

5. **Image failure와 material fallback**  
   photocopy/screenprint 재질이 실패하거나 reduced-data가 필요한 경우의 대체 표현과 권리 provenance 표준이 필요하다.

6. **CJK·확대·보조기술 검증**  
   한국어 줄바꿈, 200% zoom, Dynamic Type, VoiceOver, reduced motion에 대한 승인 fixture를 Pack evidence에 포함해야 한다.

7. **Layer/z-order token**  
   drawer, alert, transient overlay, sticky operation rail의 layer contract를 token화해 local z-index 판단을 줄여야 한다.

## 8. UX Preset 개선 필요 항목

1. **Random + autoplay adapter**  
   recommendation 뒤 별도 Start가 없는 제품에서 recommendation/attempt/confirmed outcome을 어떻게 분리하는지 정식 pattern으로 추가한다.

2. **Back/Cancel/Exit transition suite**  
   pending draw, starting, restart, recovering 중 취소·뒤로가기·앱 종료·재진입 시 보존/폐기 규칙을 executable test로 제공한다.

3. **Scoped recovery pattern**  
   draw preparation failure와 locked-track execution failure처럼 실패 범위가 다른 경우, retry identity와 fallback 허용 범위를 명시한다.

4. **Fair Round Lock candidate pattern**  
   round-scoped atomic lock, same-track restart, new-round-only reroll을 특정 제품 binding이 아닌 재사용 가능한 adapter 후보로 검토한다. 독립 제품 증거 전에는 canonical Preset으로 승격하지 않는다.

5. **Deferred exclusion candidate pattern**  
   현재 확정 결과를 깨지 않고 다음 cycle부터 제외를 적용하는 상태/피드백/undo 규칙을 정리한다.

6. **Keyboard/platform-equivalent path**  
   native button 사용 여부가 아니라 focus order, keyboard-only completion, assistive action을 포함한 실행 검증을 요구한다.

## 9. Product Binding에 남겨야 할 결정

다음은 Design Pack이나 UX Preset이 정할 수 없으며 제품 책임자·법률/권리 담당·현장 사용자 검증이 필요하다.

- 실제 음원 소스, 제작자 계약, 스트리밍/다운로드/공연·배틀 현장 사용권.
- DJ·참가자·주최자 중 누가 draw/new round/exclude를 실행할 수 있는지와 reroll 합의 규칙.
- 랜덤성의 seed, 재현 가능성, 조작 방지, event log 공개 범위와 개인정보/보존 정책.
- instrumental/clean/explicit 기준, 보컬 샘플·가사·문화적 적절성 정책.
- round 길이, cue/stop/fade, 시간 초과, 심판/MC 신호와의 연동.
- 오프라인 cache, latency 상한, audio route/volume, 무음·끊김 시 backup 정책.
- 저장·제외·history의 계정/기기/session 범위와 동기화·삭제 정책.
- 라이브러리 부족 시 energy/type 완화 우선순위와 local fallback의 승인 주체.
- 현장 조명·소음·한 손 사용·장갑/땀·급박한 상황에서의 UI 우선순위.

## 10. 정성 결론

이 실험의 가장 강한 성과는 “거리 느낌이 나는 앱”이 아니라, 거리·운영 시각 언어와 배틀 공정성 상태 계약을 분리하면서도 하나의 경험으로 결합한 것이다. 가장 큰 한계는 Pack/Preset 정본이 아직 strict implementation kit가 아니며, 프로토타입의 E2 증거를 실제 현장 품질로 일반화할 수 없다는 점이다.

따라서 시스템은 **지속 운영 가치가 있다. 다만 canonical adapter, 사전 metric freeze, 실제 iPhone/audio/AT/user validation을 보정 조건으로 둔다.**
