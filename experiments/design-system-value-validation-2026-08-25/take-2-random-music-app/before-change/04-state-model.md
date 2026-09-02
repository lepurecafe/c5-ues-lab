# State Model

> Model: `state.battle-beat-randomizer@1.0.0`

## Playback state machine

```text
READY
  → REQUESTING
    → RECOMMENDED
      → STARTING
        → PLAYING ↔ PAUSED
        → ERROR → REQUESTING | FALLBACK_STARTING
    → EMPTY → REQUESTING
```

## State contract

| State ID | Authority | Required UI | Allowed actions | Forbidden claim |
| --- | --- | --- | --- | --- |
| `S-READY` | user-draft | battleType, energy, randomize | change condition, request | track selected/playing |
| `S-REQUESTING` | pending system work | attempt status, retained condition | cancel pending | success/playing |
| `S-RECOMMENDED` | system-recommendation | track, reason, `SYSTEM PICK` | automatic playback attempt | user chose/confirmed outcome |
| `S-STARTING` | user-commitment executing | track + `STARTING` text | cancel, wait | Playing |
| `S-PLAYING` | confirmed-outcome in synthetic runtime | track, `PLAYING`, progress, pause | reroll, save, exclude, pause | real audio proof |
| `S-PAUSED` | retained confirmed track | track, position, `PAUSED` | resume, reroll | currently Playing |
| `S-SAVED` | local effect | saved text/icon | unsave, continue | cloud persistence |
| `S-EXCLUDED` | local preference | affected track + exclusion count | undo, next request | global ban |
| `S-EMPTY` | unavailable-or-invalid | affected condition, count, reason | relax, undo exclusion | hidden fallback success |
| `S-ERROR` | unavailable-or-invalid | failing scope, last safe state, retry | retry, fallback | success or lost-safe-state |
| `S-RECOVERING` | pending system work | recovery source and retained condition | cancel | recovered outcome |
| `S-FALLBACK` | confirmed synthetic fallback | `LOCAL FALLBACK`, track, Playing | reroll, save, exclude | network recommendation |

## Single source of truth

```js
appState = {
  phase,
  battleType,
  energy,
  activeTrackId,
  recommendationId,
  attemptId,
  elapsedSeconds,
  savedIds,
  excludedIds,
  recentIds,
  failureCount,
  recoverySource
}
```

현재 카드, 상태 rail, progress, action availability, recent list는 모두 이 객체에서 파생한다. DOM 요소별로 별도 truth를 보유하지 않는다.

## Transition invariants

1. `attemptId`가 current attempt와 일치하지 않는 완료 이벤트는 무시한다.
2. `PLAYING` 진입은 추천 결과 존재와 synthetic playback success event를 모두 요구한다.
3. `exclude(activeTrack)`는 exclusion set 반영 후 새 요청을 시작한다.
4. `save(activeTrack)`는 playback phase를 바꾸지 않는다.
5. `reroll`은 조건을 보존하고 recent history를 갱신한다.
6. error는 이전 confirmed Playing을 파괴하지 않는다.
7. session resume 시 실제 Playing으로 복구하지 않고 `PAUSED`로 복구한다.

## Test cases

| Test ID | Given | When | Then |
| --- | --- | --- | --- |
| `ST-01` | READY | randomize | REQUESTING→RECOMMENDED→STARTING→PLAYING |
| `ST-02` | PLAYING | reroll double tap | 한 attempt만 유효, 하나의 새 track만 Playing |
| `ST-03` | PLAYING | save | PLAYING 유지 + savedIds 갱신 |
| `ST-04` | PLAYING | exclude | 제외 표시 후 다른 track request |
| `ST-05` | 후보 0 | request | EMPTY + relax/undo controls |
| `ST-06` | request failure | retry | 조건 보존 + 새 attemptId |
| `ST-07` | 3회 실패 | fallback | FALLBACK 표시 + synthetic Playing |
| `ST-08` | PLAYING | session resume | PAUSED로 복구 |

