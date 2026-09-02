# Product Brief — Battle Beat Randomizer

> Product Binding: `binding.battle-beat-randomizer@1.0.0`
>
> Composition: `composition.random-music-app.take-2.r1`
>
> Status: frozen for Take 2 implementation

## Product proposition

랩배틀과 댄스배틀에서 참가자·DJ·운영자가 곡을 오래 탐색하지 않고, 배틀 조건에 맞는 가상 비트 트랙을 랜덤으로 받아 즉시 재생 상태로 전환하는 iPhone 앱이다.

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
3. **Fast correction:** 다시 뽑기·제외·저장으로 다음 결정을 짧게 만든다.
4. **Safe continuity:** 실패·콘텐츠 부족에서도 현재 조건과 안전한 문맥을 보존한다.

## Primary commitment

`ACT-RANDOMIZE`: 사용자가 현재 조건으로 랜덤 비트를 요청하는 행동이다. 이 행동은 추천 후보 생성과 재생 시도를 함께 시작한다.

- 시스템 추천은 `system-recommendation`이다.
- 사용자의 조건·저장·제외는 `user-draft` 또는 local preference다.
- 재생 시도는 `user-commitment`의 실행 단계다.
- UI 상태 엔진이 재생 성공을 확인했을 때만 `confirmed-outcome: playing`이다.
- 이 prototype은 실제 오디오를 출력하지 않으므로 Playing은 **synthetic runtime state evidence**이며 실음원 성공 증거가 아니다.

## 성공 조건

- 첫 랜덤 요청까지 ≤ 3개 사용자 행동.
- 랜덤 요청 후 synthetic Playing 상태 표시까지 ≤ 600ms.
- 다시 뽑기 후 다음 Playing 상태까지 ≤ 600ms.
- 저장·제외·일시정지·재시도 피드백이 한 입력 안에 보인다.
- 정상·빈 상태·추천 실패·복구 흐름이 모두 체험 가능하다.
- 추천·재생 시도·Playing·실패가 시각적으로 같은 상태로 표현되지 않는다.

## 실험 가정

| ID | 가정 | 이번 구현값 | 향후 검증 |
| --- | --- | --- | --- |
| `A-01` | 두 배틀 유형은 공통 제어 구조를 공유 | `RAP` / `DANCE` segmented choice | 대표 사용자 관찰 |
| `A-02` | 조건은 배틀 유형과 에너지로 충분 | `RAW`, `BOUNCE`, `DRIVE` | 현장 인터뷰 |
| `A-03` | 최근 4곡 반복 방지가 충분 | shuffle bag + exclusion set | 실제 세트 길이 분석 |
| `A-04` | 저장과 제외는 기기 세션 동안 유지 | `sessionStorage` | 계정/영구 저장 정책 |
| `A-05` | 3회 연속 추천 실패 후 local fallback이 안전 | synthetic fallback queue | 실제 오프라인·권리 확보 pack |
| `A-06` | 배틀용 기본 트랙은 clean instrumental이어야 함 | 모든 fixture에 `CLEAN · INSTRUMENTAL` 고정 | 행사별 콘텐츠 정책 |
| `A-07` | 한 라운드에서는 같은 선택 기록이 공정성 검토에 필요 | recommendationId·trackId·createdAt 기록 | 실제 운영 규정/사용자 관찰 |

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
