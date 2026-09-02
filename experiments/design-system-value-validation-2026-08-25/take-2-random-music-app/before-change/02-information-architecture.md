# Information Architecture

> Binding: `binding.battle-beat-randomizer@1.0.0`

## Object model

| ID | 객체 | 핵심 필드 | 소유 계층 |
| --- | --- | --- | --- |
| `OBJ-SESSION` | 현재 배틀 세션 | battleType, energy, history, exclusionSet | Product Binding |
| `OBJ-TRACK` | 가상 배틀 비트 | id, title, alias, bpm, energy, battleFit, coverAsset | Product Binding |
| `OBJ-RECOMMENDATION` | 시스템이 고른 후보 | trackId, reason, createdAt, authority | UX Preset + Binding |
| `OBJ-PLAYBACK` | synthetic 재생 상태 | state, trackId, elapsed, attemptId, failure | UX Preset + implementation |
| `OBJ-SAVED` | 저장 항목 | trackId, savedAt | Product Binding |
| `OBJ-EXCLUDED` | 제외 항목 | trackId, excludedAt, reason | Product Binding |

## Navigation model

단일 과업 앱이므로 tab bar를 두지 않는다. 화면은 하나의 vertical operational surface이며 상태에 따라 다음 영역을 유지한다.

```text
STATUS RAIL
  현재 모드 / synthetic 표시 / 연결 상태

CONDITION FIELD
  RAP | DANCE
  RAW | BOUNCE | DRIVE
  ACT-RANDOMIZE

ACTIVE BEAT
  recommendation reason
  cover / title / alias / BPM
  REQUESTING | PLAYING | PAUSED | ERROR
  progress / elapsed

FAST ACTIONS
  pause-resume / reroll / save / exclude

RECENT + RECOVERY
  최근 4곡 / 제외 수 / empty·failure·fallback
```

## Priority rules

1. `Playing` 여부와 affected track을 최상위 상태로 유지한다.
2. 다시 뽑기는 현재 조건을 유지하고 새 attempt를 만든다.
3. 제외는 현재 트랙을 exclusion set에 넣고 즉시 다음 트랙을 요청한다.
4. 저장은 재생을 중단하지 않는 local effect다.
5. 추천 실패는 이전 confirmed Playing을 거짓으로 지우지 않는다. 재생 중이었다면 그 상태를 보존하고 다음 요청의 실패만 알린다.
6. 빈 상태는 조건을 완화하거나 제외를 되돌리는 두 복구 경로를 제공한다.

## Screen/state coverage

| Frame ID | 목적 | 필수 상태/행동 |
| --- | --- | --- |
| `FR-READY` | 첫 조건과 랜덤 요청 | battleType, energy, randomize |
| `FR-PLAYING` | 추천된 비트의 confirmed Playing | reason, track, progress, pause, reroll, save, exclude |
| `FR-PAUSED` | 중단된 동일 트랙 | retained position, resume, reroll |
| `FR-EMPTY` | 적용 조건에서 후보 부족 | relax filter, undo exclusion |
| `FR-ERROR` | 추천/재생 시도 실패 | cause scope, retry, safe retained state |
| `FR-RECOVERED` | 재시도 또는 fallback 성공 | recovered label, confirmed Playing, next safe action |

## Mobile constraints

- 기준: iPhone 16 Pro portrait `402×874 CSS px`.
- 최소 검증 폭: `375px`.
- 핵심 상태, 트랙 이름, pause/resume, reroll은 첫 viewport 안에서 접근 가능해야 한다.
- touch target은 최소 `44×44px`.
- dynamic text 200%에서 상태와 복구 action이 사라지지 않아야 한다.
- safe-area padding을 적용하되 화면 공간을 장식적 chrome으로 소모하지 않는다.

