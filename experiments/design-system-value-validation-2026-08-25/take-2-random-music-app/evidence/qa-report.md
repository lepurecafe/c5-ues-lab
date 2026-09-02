# Rendered QA Report

> Run: `qa.take-2.battle-beat.2026-08-26.final-r3`
>
> Evidence: E2 — rendered browser, DOM/state inspection, static asset validation, PNG captures
>
> Browser: Codex in-app browser

## Flow under test

`READY → 조건 선택 → RANDOM BEAT → REQUESTING → SYSTEM PICK → STARTING → PLAYING + ROUND LOCK → RESTART 또는 NEW ROUND → ERROR/EMPTY → 범위가 제한된 복구`

## Outcome

| Check | Result | Evidence |
| --- | --- | --- |
| Required interactions | pass | 8/8 |
| State-contract cases | pass | `ST-01`–`ST-18`, 18/18 |
| Console | pass | error 0, warning 0 |
| Local assets | pass | SVG 10/10 XML valid, missing reference 0 |
| 402×874 | pass | horizontal overflow 0px, visible target under 44px 0 |
| 375×812 | pass | horizontal overflow 0px, visible target under 44px 0 |
| Accessibility baseline | pass | 10/10 static/rendered checks; assistive-technology run은 미실행 |
| Low-fi continuity | pass | frame 5개 + transient 6/6, canonical ID, CR-01 행동 계약 |
| Capture integrity | pass | `.png` 21개가 실제 PNG로 확인됨 |

## Contract proof

- 최초 draw는 `DRAW-0001`을 만들고 synthetic Playing 확인 뒤 `ROUND-01-DRAW-0001`을 원자적으로 잠갔다.
- same-track restart는 `roundId`, `trackId`, `drawId`를 유지하고 `attemptId`만 증가시켰다. `EV-TRACK-RESTARTED`는 기록됐지만 추가 `EV-ROUND-LOCKED`는 없었다.
- 현재 곡 제외는 Playing을 유지하면서 `pendingExcludedIds`에 `trackId@effectiveFromRound`를 기록했다. 다음 round 성공 때 적용 제외로 승격됐다.
- new-round 실패는 last-safe round/track을 유지했다. `RETRY SAME DRAW`는 같은 `drawId`로 새 attempt를 만들고 성공 뒤 `EV-RECOVERED`를 남겼다.
- draw 실패 1/3과 2/3에서는 fallback이 숨겨졌고 3/3에서만 나타났다. restart 실패에서는 횟수와 무관하게 fallback이 숨겨지고 same-track 복구만 노출됐다.
- 중복 활성화는 하나의 새 draw/round만 만들었고, 취소된 비동기 요청의 늦은 완료는 현재 UI와 event outcome을 바꾸지 않았다.
- session-local `INFO-EVENT-LOG`는 `EVENT-*` 증가 sequence와 `EV-*` 안정 type, round/track/draw/attempt 참조를 표시했다.

## Product interaction proof

- `DANCE + BOUNCE` 선택은 `DANCE · BOUNCE` 조건과 BOUNCE 가상 트랙으로 연결됐다.
- 추천 후 별도 Start 버튼 없이 `PLAYING / SIM`으로 진행됐다.
- play/pause, save, restart, new round, deferred exclude가 실제 버튼으로 동작했다.
- 콘텐츠 부족은 가짜 Playing 대신 조건 완화와 제외 취소를 제공했다.
- 추천 실패와 restart 실패는 서로 다른 scope와 복구 CTA를 사용했다.
- 실제 오디오 파일은 없으며 모든 트랙·커버는 synthetic 데이터/에셋이다.

## Low-fi continuity proof

- `FR-TRANSIENT`에서 `S-REQUESTING`, `S-NEW-ROUND-REQUESTING`, `S-RECOMMENDED`, `S-STARTING`, `S-RESTARTING`, `S-RECOVERING` 6개를 실제 wireframe state로 검토했다.
- 모든 transient는 authority, retained round/draw/track, `NOT SUCCESS · NOT PLAYING`, 허용·금지 행동을 표시하고 review control을 제품 CTA와 분리했다.
- low-fi ID를 high-fi와 같은 `ROUND-*`, `DRAW-*`, `EVENT-*`, `SYN-BB-*`, `ATTEMPT *`로 동기화했으며 stale `RND-*`/`DRW-*`/`EVT-*`는 0건이다.
- same-track restart, new-round-only draw, deferred exclude, EMPTY same-draw recovery, draw/restart 오류 scope와 fallback 3/3 gate를 인앱 브라우저에서 다시 실행했다.
- 402×874와 375×812의 READY/TRANSIENT/PLAYING/EMPTY/ERROR에서 overflow 0, 가시 활성 button 44px 미만 0, console error/warning 0이었다.

## Accessibility and responsive checks

- `lang=ko`, 이름 없는 button 0/33, alt 없는 img 0/1, live region 3개, progressbar label 존재.
- `:focus-visible`, `prefers-reduced-motion`, safe-area inset을 구현했다.
- 닫힌 LAB drawer는 `inert`와 `aria-hidden=true`로 접근성 트리에서 제거되고 열릴 때만 복원된다.
- 대표 대비: ground/canvas 15.33, canvas/red-dark 5.94, gold/ground 6.97, stone-light/ground 6.84.

## Captures

- Low-fi: `low-fi-ready-402x874.png`, `low-fi-transient-new-round-402x874.png`, `low-fi-playing-402x874.png`, `low-fi-empty-402x874.png`, `low-fi-error-375x812.png`
- Hi-fi: `hi-fi-ready-402x874.png`, `hi-fi-playing-round-lock-402x874.png`, `hi-fi-paused-402x874.png`, `hi-fi-recovered-fallback-402x874.png`, `hi-fi-error-last-safe-402x874.png`, `hi-fi-empty-402x874.png`, `hi-fi-playing-375x812.png`
- Contract trace: `hi-fi-contract-event-log-402x874.png`
- FigJam: `figjam-user-flow.png`, `figjam-low-fi.png`, `figjam-hi-fi-storyboard.png`, `figjam-change-evidence.png`
- Baseline: `before-change/evidence/`의 PNG 4개

## Remaining risk

이 결과는 상업 수준의 디자인 제안과 시스템 유지보수 실험을 평가하는 E2 증거다. 실제 오디오 출력, 실제 iPhone/Simulator 런타임, VoiceOver, 네트워크 서비스, 대표 사용자 관찰은 실행하지 않았다. 따라서 synthetic Playing은 음향 출력 증거가 아니며, 실제 배틀 현장 적합성은 아직 검증되지 않았다.
