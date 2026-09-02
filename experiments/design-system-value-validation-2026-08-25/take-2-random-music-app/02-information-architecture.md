# Information Architecture

> Binding: `binding.battle-beat-randomizer@1.1.0`

## Object model

| ID | 객체 | 핵심 필드 | 소유 계층 |
| --- | --- | --- | --- |
| `OBJ-SESSION` | 현재 배틀 세션 | battleType, energy, history, exclusionSet, pendingExcludedIds, currentRoundId | Product Binding |
| `OBJ-ROUND` | 잠긴 배틀 라운드 | roundId, roundNumber, status, lockedTrackId, startedAt | Product Binding |
| `OBJ-TRACK` | 가상 배틀 비트 | id, title, alias, bpm, energy, battleFit, coverAsset | Product Binding |
| `OBJ-RECOMMENDATION` | 시스템이 고른 후보 | drawId, trackId, reason, createdAt, authority, targetRoundNumber | UX Preset + Binding |
| `OBJ-PLAYBACK` | synthetic 재생 상태 | state, trackId, elapsed, attemptId, failure | UX Preset + implementation |
| `OBJ-SAVED` | 저장 항목 | trackId, savedAt | Product Binding |
| `OBJ-EXCLUDED` | 제외 항목 | trackId, excludedAt, reason, effectiveFromRound | Product Binding |
| `OBJ-EVENT` | synthetic 감사 이벤트 | eventId, sequence, type, roundId, trackId, drawId, attemptId, outcome, createdAt | Product Binding + implementation |

## Navigation model

단일 과업 앱이므로 tab bar를 두지 않는다. 화면은 하나의 vertical operational surface이며 상태에 따라 다음 영역을 유지한다.

```text
STATUS RAIL
  현재 모드 / synthetic 표시 / ROUND NN · LOCKED / track ID

CONDITION FIELD
  RAP | DANCE
  RAW | BOUNCE | DRIVE
  ACT-RANDOMIZE (첫 round가 없을 때만)

ACTIVE BEAT
  recommendation reason
  cover / title / alias / BPM
  REQUESTING | STARTING | PLAYING | ROUND LOCKED | PAUSED | ERROR
  progress / elapsed

ROUND ACTIONS
  RESTART TRACK / NEW ROUND / REROLL

LOCAL ACTIONS
  pause-resume / save / exclude next round

EVENT + RECOVERY
  round/draw/restart/failure/recovery log
  최근 4곡 / 적용 제외 / 다음 round 제외 / empty·failure·fallback
```

## Priority rules

1. `Playing`, `ROUND NN · LOCKED`, `lockedTrackId`를 최상위 상태로 함께 유지한다.
2. 첫 `ACT-RANDOMIZE`는 Round 01 후보를 만들고 별도 Start 없이 Playing을 시도한다.
3. round lock 뒤 `RESTART TRACK`은 같은 track/round로 새 playback attempt만 만들며 elapsed를 0으로 되돌린다.
4. round lock 뒤 새 draw는 `NEW ROUND / REROLL`만 만든다. 새 Playing이 확인될 때까지 기존 round/track을 last safe로 유지한다.
5. 제외는 현재 Playing을 바꾸지 않고 `pendingExcludedIds`에 넣어 다음 round 후보 pool부터 적용한다.
6. 저장은 재생·round lock을 중단하지 않는 local effect다.
7. 추천·재생·restart 실패는 이전 confirmed round/track을 거짓으로 지우지 않는다. fallback은 최초/new-round draw 실패에만, same-track restart는 locked-track 실패에만 노출한다.
8. 빈 상태는 조건을 완화하거나 적용 제외를 되돌리는 두 복구 경로를 제공하며 current lock이 있으면 유지한다. 두 복구 모두 기존 authorized drawId 안에서 pool만 재평가한다.
9. draw, lock, restart, failure, recovery는 `OBJ-EVENT`에 append-only로 기록한다.

## Stable action and information IDs

| ID | 역할 | 새 draw | round/track 영향 |
| --- | --- | --- | --- |
| `ACT-RANDOMIZE` | 세션의 첫 round 요청 | 예 | 첫 Playing 성공 시 Round 01과 track lock |
| `ACT-RESTART-TRACK` | 현재 track을 0초부터 복구 재생 | 아니오 | roundId·lockedTrackId 유지 |
| `ACT-NEW-ROUND-REROLL` | 다음 round용 새 track 요청 | 예 | 성공 시에만 round +1 및 새 lock |
| `ACT-EXCLUDE-NEXT-ROUND` | 현재 track을 다음 round pool에서 제외 | 아니오 | 현재 lock 유지; `effectiveFromRound = current + 1` |
| `INFO-ROUND-LOCK` | round 번호·잠금 상태·track ID | 해당 없음 | 모든 Playing/Paused/Error 복구 표면에 유지 |
| `INFO-EVENT-LOG` | synthetic event sequence | 해당 없음 | eventId/type/roundId/trackId/outcome 표시 |

## Screen/state coverage

| Frame ID | 목적 | 필수 상태/행동 |
| --- | --- | --- |
| `FR-READY` | 첫 조건과 랜덤 요청 | battleType, energy, randomize |
| `FR-PLAYING` | 추천된 비트의 confirmed Playing | reason, track, progress, no post-recommendation Start |
| `FR-ROUND-LOCKED` | 현재 round의 공정성 기준 | `ROUND NN · LOCKED`, track ID, restart, new-round reroll, deferred exclude |
| `FR-PAUSED` | 중단된 동일 round/track | retained position, resume, same-track restart, new-round reroll |
| `FR-EMPTY` | 적용 조건에서 후보 부족 | relax filter, undo exclusion |
| `FR-ERROR` | 추천/재생/restart 시도 실패 | cause scope, last-safe round/track, scope-gated retry/fallback/restart |
| `FR-RECOVERED` | 재시작·재시도 또는 fallback 성공 | recovered label, confirmed Playing, retained/new round lock, next safe action |
| `FR-EVENT-LOG` | 변경 흐름 검토 | ordered round/draw/restart/failure/recovery events |

## Mobile constraints

- 기준: iPhone 16 Pro portrait `402×874 CSS px`.
- 최소 검증 폭: `375px`.
- 핵심 상태, 트랙 이름, pause/resume, reroll은 첫 viewport 안에서 접근 가능해야 한다.
- touch target은 최소 `44×44px`.
- dynamic text 200%에서 상태와 복구 action이 사라지지 않아야 한다.
- safe-area padding을 적용하되 화면 공간을 장식적 chrome으로 소모하지 않는다.
