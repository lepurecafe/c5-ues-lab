# Product Brief — Battle Beat Randomizer

> Product Binding: `binding.battle-beat-randomizer@1.1.0`
>
> Composition: `composition.random-music-app.take-2.r2` (baseline `r1` preserved in `before-change/`)
>
> Status: CR-01 Fair Round Lock applied; frozen for change validation

## Product proposition

랩배틀과 댄스배틀에서 참가자·DJ·운영자가 곡을 오래 탐색하지 않고, 배틀 조건에 맞는 가상 비트 트랙을 랜덤으로 받아 즉시 재생 상태로 전환하는 iPhone 앱이다.

첫 synthetic Playing이 확인되면 해당 track ID를 현재 round에 잠근다. 중단 복구는 같은 track을 처음부터 재시작하고, 새 track은 사용자가 `NEW ROUND / REROLL`을 명시적으로 실행할 때만 추첨한다.

이 실험은 음악 스트리밍 제품을 만드는 것이 아니다. `Industrial Swiss` Design Pack과 `decision.reserve` UX Preset이 현장성 있는 배틀 과업을 일관된 화면·상태·변경 체계로 만들 수 있는지 검증한다.

## 사용자와 맥락

| 항목 | 결정 | 근거 |
| --- | --- | --- |
| 1차 역할 | 참가자, DJ/음악 담당자, 현장 운영자 모두 | `관찰됨` — 사용자 확인 |
| 사용 상황 | 랩배틀 또는 댄스배틀에서 사용할 비트를 빠르게 확보 | `관찰됨` — 사용자 확인 |
| 공통 흐름 | 두 배틀 유형은 같은 추천·재생·재선택 흐름을 사용 | `관찰됨` — 사용자 확인 |
| 입력 환경 | iPhone 16 Pro portrait, touch 우선 | `관찰됨` — 사용자 확인 |
| 데이터 | 모든 트랙·아티스트·커버·메타데이터는 synthetic fixture | `관찰됨` — 사용자 확인 및 실험 경계 |

## 사용자 문제

- 배틀 직전 또는 진행 중 여러 곡을 탐색하는 선택 피로가 크다.
- 추천 결과와 실제 Playing 상태가 불명확하면 침묵이나 잘못된 재생 대응이 늦어진다.
- 같은 비트가 반복되거나 부적합한 트랙이 다시 나오면 흐름과 공정성이 훼손될 수 있다.
- 네트워크·추천 실패가 dead end가 되면 현장 운영 품질이 급격히 떨어진다.

## 핵심 가치

1. **Fast fit:** 배틀 유형·에너지에 맞는 한 곡을 빠르게 받는다.
2. **Immediate evidence:** 추천 요청 직후 재생을 시도하되, `추천됨`, `재생 시도`, `Playing`, `실패`를 구분한다.
3. **Fair round:** 확인된 track ID를 현재 round에 잠가 참가자·DJ·운영자가 같은 기준을 본다.
4. **Same-track recovery:** cue·재생 중단은 새 음악 추첨 없이 잠긴 track을 0초부터 재시작한다.
5. **Controlled change:** 첫 draw 이후 새 track draw는 `NEW ROUND / REROLL`에만 귀속하고, 현재 track 제외는 다음 round부터 적용한다.
6. **Safe continuity:** 실패·콘텐츠 부족에서도 현재 조건, last-safe round/track, 저장·제외를 보존한다.
7. **Auditable session:** round, draw, restart, failure, recovery를 synthetic event log로 추적한다.

## Primary commitment

`ACT-RANDOMIZE`: round가 아직 없을 때 사용자가 현재 조건으로 첫 랜덤 비트를 요청하는 행동이다. 추천 후보 생성과 재생 시도를 함께 시작하며, 추천 뒤 별도 Start를 요구하지 않는다.

첫 `confirmed-outcome: playing` 이후에는 다음 행동 계약을 적용한다.

- `ACT-RESTART-TRACK`: 현재 `roundId`와 `lockedTrackId`를 유지하고 elapsed를 0으로 되돌려 같은 synthetic track을 재시작한다. 새 draw/recommendation을 만들지 않는다.
- `ACT-NEW-ROUND-REROLL`: 새 `drawId`를 만드는 유일한 post-lock 행동이다. 새 synthetic Playing이 확인될 때만 round를 1 증가시키고 그 track을 잠근다.
- `ACT-EXCLUDE-NEXT-ROUND`: 현재 잠긴 track을 계속 유지하면서 `effectiveFromRound = currentRound + 1`로 제외를 예약한다.

- 시스템 추천은 `system-recommendation`이다.
- 사용자의 조건·저장·제외는 `user-draft` 또는 local preference다.
- 재생 시도는 `user-commitment`의 실행 단계다.
- UI 상태 엔진이 재생 성공을 확인했을 때만 `confirmed-outcome: playing`이다.
- round lock은 confirmed Playing 결과에 파생되는 제품 상태이며 추천·STARTING보다 먼저 표시하지 않는다.
- 이 prototype은 실제 오디오를 출력하지 않으므로 Playing은 **synthetic runtime state evidence**이며 실음원 성공 증거가 아니다.

## 성공 조건

- 첫 랜덤 요청까지 ≤ 3개 사용자 행동.
- 랜덤 요청 후 synthetic Playing 상태 표시까지 ≤ 600ms.
- 첫 Playing에서 `ROUND 01 · LOCKED`와 track ID가 함께 보인다.
- `RESTART TRACK`은 track ID·round를 바꾸지 않고 elapsed를 0으로 되돌린다.
- `NEW ROUND / REROLL` 후 다음 Playing 상태까지 ≤ 600ms이며, 성공 시에만 round가 1 증가한다.
- 현재 track 제외는 Playing을 중단하지 않고 다음 round pool에만 반영된다.
- 저장·제외·일시정지·재시도 피드백이 한 입력 안에 보인다.
- 정상·빈 상태·추천 실패·복구 흐름이 모두 체험 가능하다.
- 추천·재생 시도·Playing·실패가 시각적으로 같은 상태로 표현되지 않는다.
- 실패 뒤 last-safe round/track이 유지되고 same-track restart가 가능하다.
- round/draw/restart/failure/recovery 이벤트가 안정 ID와 함께 순서대로 기록된다.

## 실험 가정

| ID | 가정 | 이번 구현값 | 향후 검증 |
| --- | --- | --- | --- |
| `A-01` | 두 배틀 유형은 공통 제어 구조를 공유 | `RAP` / `DANCE` segmented choice | 대표 사용자 관찰 |
| `A-02` | 조건은 배틀 유형과 에너지로 충분 | `RAW`, `BOUNCE`, `DRIVE` | 현장 인터뷰 |
| `A-03` | 최근 4곡 반복 방지가 충분 | shuffle bag + exclusion set | 실제 세트 길이 분석 |
| `A-04` | 저장과 제외는 기기 세션 동안 유지 | `sessionStorage` | 계정/영구 저장 정책 |
| `A-05` | 3회 연속 추천 실패 후 local fallback이 안전 | synthetic fallback queue | 실제 오프라인·권리 확보 pack |
| `A-06` | 배틀용 기본 트랙은 clean instrumental이어야 함 | 모든 fixture에 `CLEAN · INSTRUMENTAL` 고정 | 행사별 콘텐츠 정책 |
| `A-07` | 한 라운드에서는 같은 선택 기록이 공정성 검토에 필요 | roundId·drawId·recommendationId·trackId·createdAt 기록 | 실제 운영 규정/사용자 관찰 |
| `A-08` | confirmed Playing을 round에 잠그면 임의 교체를 줄일 수 있음 | 첫 성공은 `ROUND 01`; 이후 성공한 new-round draw만 +1 | 대표 배틀 운영 테스트 |
| `A-09` | 현재 track 제외는 다음 round부터 적용하는 편이 공정함 | `pendingExcludedIds` + `effectiveFromRound` | 대회별 규칙 검토 |
| `A-10` | synthetic event log가 제3자 검토에 충분 | session-local append-only event sequence | 감사·보존·개인정보 정책 |

## 제외 범위

- 실재 음악·아티스트·앨범 커버·상표.
- 실제 오디오 파일, 음악 생성, 스트리밍 서비스 연결, DRM·라이선스 획득.
- 계정, 결제, 소셜 공유, 배틀 대진표, 심사·점수.
- 실기기 오디오 route·권한·볼륨·지연 검증.
- App Store 출시 가능성 주장.

## 불변조건

- 동일한 Industrial Swiss 정체성과 `decision.reserve` authority vocabulary.
- 한 화면 지역에 하나의 dominant commit/action signal.
- 색만으로 Playing·오류·선택을 구분하지 않음.
- 오류가 현재 조건·저장·제외를 침묵적으로 지우지 않음.
- synthetic 데이터와 실제 서비스 증거의 경계를 모든 산출물에 명시.
- 추천 뒤 post-recommendation Start 버튼을 추가하지 않음.
- 첫 Playing 뒤 round/track lock을 침묵적으로 바꾸지 않음.
- `ACT-RESTART-TRACK`은 draw/round/track을 변경하지 않음.
- `ACT-NEW-ROUND-REROLL` 외 post-lock 행동은 새 draw를 만들지 않음.
- failure/retry/fallback 동안 `lastSafeRound`는 새 Playing이 확인되기 전까지 불변임.
- local fallback은 최초 또는 `ACT-NEW-ROUND-REROLL`로 이미 승인된 draw 안에서만 동작하며, same-track restart 실패를 다른 track으로 대체하지 않음.
