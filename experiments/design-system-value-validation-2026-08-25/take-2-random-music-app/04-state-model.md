# State Model

> Model: `state.battle-beat-randomizer@1.1.0`
>
> Product Binding: `binding.battle-beat-randomizer@1.1.0` (`CR-01`)

## Playback state machine

```text
READY
  → REQUESTING
    → RECOMMENDED
      → STARTING
        ├─ success → PLAYING + ROUND_LOCKED (atomic)
        └─ failure → ERROR
    → EMPTY → REQUESTING (same authorized draw after recovery choice)

ROUND_LOCKED (PLAYING/PAUSED/ERROR와 공존하는 Product Binding state)
  ├─ with PLAYING ↔ PAUSED
  → RESTARTING
      ├─ success → PLAYING + same ROUND_LOCKED
      └─ failure → ERROR → RESTARTING (same track only)
  → NEW_ROUND_REQUESTING → RECOMMENDED → STARTING
      ├─ success → PLAYING + new ROUND_LOCKED (round +1, new track lock)
      └─ EMPTY | ERROR (last-safe round/track retained)

ERROR (initial/new-round draw scope)
  → REQUESTING (same draw) | RECOVERING → FALLBACK + ROUND_LOCKED
```

## State contract

| State ID | Authority | Required UI | Allowed actions | Forbidden claim |
| --- | --- | --- | --- | --- |
| `S-READY` | user-draft | battleType, energy, randomize | change condition, request | track selected/playing |
| `S-REQUESTING` | pending system work | attempt status, retained condition | cancel pending | success/playing |
| `S-RECOMMENDED` | system-recommendation | track, reason, `SYSTEM PICK` | automatic playback attempt | user chose/confirmed outcome |
| `S-STARTING` | user-commitment executing | track + `STARTING` text | cancel, wait | Playing |
| `S-PLAYING` | confirmed-outcome in synthetic runtime | track, `PLAYING`, progress, no post-recommendation Start | restart track, new round/reroll, save, deferred exclude, pause | real audio proof or separately rendered unlocked Playing |
| `S-ROUND-LOCKED` | `S-PLAYING`과 atomic하게 공존하는 Product Binding state | `ROUND NN · LOCKED`, lockedTrackId, event reference | Playing/Paused/Error 동안 lock retention | silently replaced current track or second lock event on same-track restart |
| `S-PAUSED` | retained confirmed round/track | round, track, position, `PAUSED` | resume, same-track restart, new round/reroll | currently Playing |
| `S-RESTARTING` | user-commitment executing | same roundId/lockedTrackId, elapsed reset, new attemptId | cancel, wait | new recommendation/draw/round |
| `S-NEW-ROUND-REQUESTING` | pending system work | targetRoundNumber, new drawId, visible last-safe lock | cancel pending | round increment or track replacement before success |
| `S-SAVED` | local effect | saved text/icon | unsave, continue | cloud persistence |
| `S-EXCLUDED` | deferred local preference | affected track, `NEXT ROUND`, effectiveFromRound | undo before application, new round/reroll | current-round replacement or global ban |
| `S-EMPTY` | unavailable-or-invalid | affected condition, count, reason, last-safe lock when present | relax, undo applied exclusion | hidden fallback success or cleared current lock |
| `S-ERROR` | unavailable-or-invalid | failing scope, lastSafeRound/track, retry/restart | draw scope: retry/fallback; locked-track scope: same-track restart | success, lost-safe round/track, or cross-scope fallback |
| `S-RECOVERING` | pending system work | recovery source and retained condition | cancel | recovered outcome |
| `S-FALLBACK` | confirmed synthetic fallback | `LOCAL FALLBACK`, track, Playing, resulting round lock | new round/reroll, restart, save, deferred exclude | network recommendation |

## Single source of truth

```js
appState = {
  phase,
  battleType,
  energy,
  roundId,
  roundNumber,
  roundStatus,
  lockedTrackId,
  lastSafeRound,
  targetRoundNumber,
  drawId,
  activeTrackId,
  recommendationId,
  attemptId,
  elapsedSeconds,
  savedIds,
  excludedIds,
  pendingExcludedIds,
  recentIds,
  failureCount,
  recoverySource,
  eventSequence,
  eventLog
}
```

현재 카드, 상태 rail, progress, action availability, recent list는 모두 이 객체에서 파생한다. DOM 요소별로 별도 truth를 보유하지 않는다.

## Transition invariants

1. `attemptId`가 current attempt와 일치하지 않는 완료 이벤트는 무시한다.
2. `PLAYING` 진입은 추천 결과 존재와 synthetic playback success event를 모두 요구한다.
3. 첫 `PLAYING`은 Round 01을 만들고, 이후에는 `ACT-NEW-ROUND-REROLL`에서 시작된 성공만 round를 1 증가시킨다.
4. confirmed `S-PLAYING`과 `S-ROUND-LOCKED`는 한 reducer event에서 함께 반영한다. 별도의 unlocked Playing frame은 렌더링하지 않는다.
5. 새 round lock만 roundId·roundNumber·lockedTrackId·lastSafeRound를 한 번에 갱신하고 `EV-ROUND-LOCKED`를 기록한다. same-track restart는 두 번째 lock event를 만들지 않는다.
6. `ACT-RESTART-TRACK`은 drawId·recommendationId·roundId·roundNumber·lockedTrackId를 바꾸지 않고 새 attemptId와 elapsed=0만 만든다.
7. round lock 뒤 새 draw는 `ACT-NEW-ROUND-REROLL`만 만들며, double activation은 하나의 drawId로 합친다. retry·조건 완화·제외 취소는 기존 authorized drawId를 재사용한다.
8. `exclude(lockedTrack)`는 `pendingExcludedIds`와 effectiveFromRound만 갱신하고 현재 playback/lock을 바꾸지 않는다. target round 성공 시 적용 항목으로 승격한다.
9. `save(activeTrack)`는 playback phase와 round lock을 바꾸지 않는다.
10. EMPTY/ERROR/retry/fallback 준비는 `lastSafeRound`를 파괴하지 않는다. 새 confirmed Playing 전에는 round/track을 바꾸지 않는다.
11. local fallback은 최초/new-round에서 이미 승인된 draw에만 속하며, restart failure에서 다른 track을 시도하지 않는다. fallback도 confirmed Playing 뒤에만 target round를 잠근다.
12. session resume 시 실제 Playing으로 복구하지 않고 같은 round/track의 `PAUSED`로 복구한다.
13. eventLog는 session-local append-only이며 sequence를 되감거나 기존 event를 덮어쓰지 않는다.

## Test cases

| Test ID | Given | When | Then |
| --- | --- | --- | --- |
| `ST-01` | READY | randomize | REQUESTING→RECOMMENDED→STARTING→PLAYING+ROUND_LOCKED가 atomic; Round 01과 track ID 표시 |
| `ST-02` | ROUND_LOCKED | new-round/reroll double tap | 한 draw/attempt만 유효; 성공 시 round가 정확히 1 증가하고 새 track lock |
| `ST-03` | ROUND_LOCKED | save | current Playing/lock 유지 + savedIds 갱신 |
| `ST-04` | ROUND_LOCKED | exclude | current track/round 유지 + pendingExcludedIds/effectiveFromRound 갱신; 새 request 없음 |
| `ST-05` | 후보 0 | request | EMPTY + relax/undo controls |
| `ST-06` | new-round request failure | retry | lastSafeRound/track·조건 보존 + 같은 draw의 새 attemptId |
| `ST-07` | 최초/new-round draw 3회 실패 | fallback | 같은 drawId와 last safe 유지; fallback 성공 후에만 FALLBACK 표시 + target round lock |
| `ST-08` | ROUND_LOCKED | session resume | 같은 round/track의 PAUSED로 복구 |
| `ST-09` | ROUND_LOCKED at elapsed 23 | restart track | draw/round/track 불변 + elapsed 0 + RESTARTING→PLAYING; 추가 `EV-ROUND-LOCKED` 없음 |
| `ST-10` | ROUND_LOCKED | pause→resume | 같은 round/track/position을 유지하고 lock으로 복귀 |
| `ST-11` | ROUND_LOCKED | save, pause, restart, exclude 각각 실행 | 어떤 행동도 새 drawId를 만들지 않음 |
| `ST-12` | pending exclusion 존재 | new round/reroll | pending 제외를 후보 pool에 적용; current round는 성공 전까지 유지 |
| `ST-13` | locked track restart failure | error action 확인 후 same-track restart 재시도 | fallback 비노출 + lastSafeRound/lockedTrackId 유지 + 새 attemptId |
| `ST-14` | Round 03 locked | new-round draw 실패/empty | Round 03과 locked track 유지; roundNumber 증가 없음 |
| `ST-15` | draw→lock→restart→failure→recovery | event log 확인 | stable event type, 증가 sequence, round/track/draw/attempt 참조가 순서대로 존재 |
| `ST-16` | 이전 attempt 완료 이벤트 도착 | current attemptId 불일치 | UI·round lock·event outcome을 변경하지 않음 |
| `ST-17` | 다음 round pending exclusion과 성공 후보 존재 | new-round Playing 확인 | effectiveFromRound 항목을 applied exclusion으로 승격 + pending 제거 + 새 round lock |
| `ST-18` | authorized draw가 EMPTY | 조건 완화 또는 적용 제외 취소 | 같은 drawId로 pool 재평가; current/target round와 last-safe lock 불변 |
