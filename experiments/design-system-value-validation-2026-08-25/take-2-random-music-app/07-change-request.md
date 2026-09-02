# Change Request — Fair Round Lock

> Request ID: `CR-01`
>
> Registered: 2026-08-26, **before implementation**
>
> Baseline: `binding.battle-beat-randomizer@1.0.0`
>
> Target: `binding.battle-beat-randomizer@1.1.0`

## 변경 배경

기준 하이파이는 배틀 조건으로 한 트랙을 뽑아 즉시 가상 재생 상태로 전환하고, 재생 중 `REROLL`로 곧바로 다음 트랙을 받을 수 있다. 외부 배틀 맥락 조사에서는 한 배틀에 한 트랙을 사용하거나 양 참가자에게 같은 음악 조건을 주는 규정·운영 관행, 잘못된 cue/장비 고장에서는 문제를 수정한 뒤 동일 수행을 재시작하는 복구 원칙이 확인되었다.

따라서 실제 현장 사용 가능성을 높이기 위해 **재생이 확인된 트랙을 현재 라운드에 잠그고, 같은 트랙 재시작과 새 라운드 추첨을 분리**한다. 이는 디자인팩의 street 표현을 강화하기 위한 변경이 아니라 배틀의 공정성과 운영 연속성을 다루는 제품 바인딩 변경이다.

근거와 한계는 [`research/battle-context-research.md`](research/battle-context-research.md)에 기록했다. 대회마다 규칙이 다르므로 이 변경은 공인 규정 준수 주장이 아니라 실험용 제품 정책이다.

## 바뀌어야 하는 사용자 가치

1. 참가자·DJ·운영자가 현재 라운드의 동일한 트랙 ID와 상태를 함께 확인할 수 있다.
2. 잘못된 cue나 중단은 새 음악을 임의로 뽑지 않고 같은 트랙을 처음부터 재시작해 복구할 수 있다.
3. 새 음악은 `NEW ROUND / REROLL`이라는 명시적 행동에서만 뽑힌다.
4. 현재 트랙 제외는 다음 라운드에만 적용되며 진행 중 라운드를 침묵적으로 교체하지 않는다.
5. round, draw, restart, failure, recovery가 synthetic event log에 남아 제3자가 흐름을 검토할 수 있다.

## 변경 소유 계층

| 계층 | 판정 | 이유 |
| --- | --- | --- |
| 디자인팩 | 비대상 | 색·타입·spacing·grid·재질·컴포넌트 외형 계약은 바꾸지 않는다. |
| UX 프리셋 | 비대상, 기존 규칙 재사용 | commitment/outcome 분리, last-safe retention, retry idempotency를 그대로 사용한다. |
| 제품 바인딩 | **변경 대상** | 라운드 귀속, 새 추첨 정책, 제외 적용 시점, event log는 서비스 맥락과 운영 정책이다. |

## 바뀌면 안 되는 정체성 및 경험 불변조건

- `pack:industrial-swiss@1.0.0`의 warm canvas/deep ground, hard grid, 사각 control, limited red signal을 유지한다.
- 한 지역에서 red primary action은 하나만 둔다.
- recommendation, STARTING, confirmed synthetic PLAYING, ERROR를 같은 상태로 합치지 않는다.
- 첫 추첨 뒤 별도 Start 버튼을 추가하지 않는다.
- 현재 조건, 저장, 제외, 직전 안전 트랙은 실패에서 보존한다.
- 가상 트랙·가상 재생 상태를 실제 오디오 증거처럼 표현하지 않는다.
- 402×874와 375px에서 수평 overflow 0, 가시 touch target 44×44px 이상을 유지한다.
- 빈 상태·추천 실패·local fallback 복구 흐름을 삭제하지 않는다.

## 사전 영향 목록

| 영향 ID | 대상 | 예정 변경 | 검증 증거 |
| --- | --- | --- | --- |
| `I-01` | `01-product-brief.md` | v1.1 binding, Fair Round 가치·가정·불변조건 | diff/문서 리뷰 |
| `I-02` | `02-information-architecture.md` | round object, Round Lock/Restart/New Round 정보 위계 | diff/추적 표 |
| `I-03` | `03-user-flow.md` | Playing 이후 restart 또는 new-round 분기; exclude 지연 적용 | Mermaid/stable ID |
| `I-04` | `04-state-model.md` | round fields, `S-ROUND-LOCKED`, restart/new-round 전이·테스트 | state table/test |
| `I-05` | `06-hi-fi-preview.html` | round strip, restart, new-round reroll, delayed exclusion, event log | browser interaction |
| `I-06` | 하이파이 컴포넌트 | `ROUND LOCK`, `RESTART TRACK`, `NEW ROUND / REROLL` | 캡처 |
| `I-07` | 오류·복구 상태 | 실패 시 직전 locked track과 round 유지 | 오류→restart test |
| `I-08` | 저장·제외 상태 | save 즉시, exclude 다음 round부터 적용 | interaction test |
| `I-09` | `06-hi-fi-preview-fidelity-ledger.md` | Product Binding change attribution | ledger |
| `I-10` | FigJam high-fi/evidence section | 변경 전/후와 전파 결과 | FigJam node IDs/캡처 |
| `I-11` | `evidence/` | 402px/375px after-state 및 QA 기록 | PNG/JSON/MD |
| `I-12` | `07-change-log.md` | 실제 영향, 소요·재작업·누락 기록 | propagation table |

## 성공 판정 기준

- 사전 등록한 12개 영향 항목 중 검증 완료율 `≥95%`.
- 불변조건 유지율 `100%`.
- 첫 Playing 이후 `ROUND 01 · LOCKED`와 track ID가 보인다.
- `RESTART TRACK`은 track ID·round를 바꾸지 않고 elapsed를 0으로 되돌린다.
- `NEW ROUND / REROLL`만 새 track attempt를 만들며 성공 시 round를 1 증가시킨다.
- locked track 제외는 현재 Playing을 유지하고 다음 round pool에 반영된다.
- 실패 후 same-track restart가 가능하며 last safe round/track이 보존된다.
- 기존 정상·빈·오류·fallback·저장·일시정지 상호작용이 회귀하지 않는다.
- 402×874와 375px에서 layout error 0, 깨진 asset/link 0, console error 0.
- 전면 CSS/DOM 재작성 없이 기존 token과 주요 컴포넌트 구조를 재사용한다.

## 변경 전 보존 위치

- `before-change/06-hi-fi-preview.html`
- `before-change/01-product-brief.md`
- `before-change/02-information-architecture.md`
- `before-change/03-user-flow.md`
- `before-change/04-state-model.md`
- `before-change/evidence/*.png`

