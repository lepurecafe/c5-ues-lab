# Take 2 Composition and Product Binding

## Composition manifest

```yaml
composition:
  id: composition.take2.random-music.minimal.r1
  ues_version: 0.5.0-draft
  product_binding: binding.take2.random-music.minimal@0.1.0
  ux_preset: decision.reserve@0.1.0
  design_pack: pack:rasterline@0.3.0
  pack_application: highfi-only
  medium_adapter: digital-interactive.web@0.1.0-local
  projections: [flowchart, lowfi, highfi-interactive-html]
  compatibility:
    status: supported-with-adaptation
    adaptations:
      - Rasterline linear notation becomes a persistent mode/status rail, not a forced wizard.
      - Audio output is represented as an explicit simulation state; no audible-output success is claimed.
    limitations:
      - no actual audio route, permission, offline file cache, or human-use evidence
  brand_application: none
  evidence_ceiling: interactive UI state only
```

## Product Binding — `binding.take2.random-music.minimal@0.1.0`

| Field | Value | Classification |
| --- | --- | --- |
| Primary users | event host or hobby listener | confirmed |
| Goal | choose dance or rap and start one random beat quickly | confirmed |
| Context | event use and personal use are both supported; the exact environmental priority is not split | confirmed / decision retained |
| Candidate | fictional rights-safe beat metadata with generated abstract cover | experiment-assumption |
| Constraint | selected mode: dance or rap | confirmed |
| Random rule | one candidate is proposed per mode; reroll intentionally replaces it | confirmed + local implementation detail |
| Repeat rule | current selection remains/repeats until changed | confirmed |
| Commitment | explicit `이 곡 재생` action | confirmed |
| Result evidence | visible `재생 중` state, candidate metadata, and simulated elapsed time | experiment-assumption; not audible proof |
| Recovery | `다시 뽑기` retains mode and replaces the uncommitted/current candidate | confirmed |
| Data/rights | all metadata and cover art are fictional; no real audio is present | experiment-assumption |
| Non-goals | account, payment, social sharing, playlist planning, real streaming, real audio output | scope boundary |

## Layer ownership

| Layer | Decides in this Take 2 | Must not decide |
| --- | --- | --- |
| Product Binding | dance/rap choice, synthetic content boundary, repeat rule, explicit start, reroll recovery | colors, card geometry, font style |
| `decision.reserve` | one active candidate, distinct recommendation/draft/commit/result, explicit commit, retry/retention | beat metadata or whether the app is branded |
| Rasterline Pack | near-black canvas, acid signal, mono labels, raster texture, squared controls, visible status | whether reroll exists or what playback success means |
| Web adapter | responsive reflow, keyboard focus, touch-equivalent controls, simulated status disclosure | changing user goal or adding real audio |

## Preset selection rationale

| Preset | Decision | Evidence |
| --- | --- | --- |
| `decision.reserve` | selected | one candidate is chosen then explicitly started; reroll replaces it. |
| `decision.compare` | not selected | no confirmed need to compare multiple candidates on shared attributes. |
| `decision.plan` | not selected | no confirmed queue, multi-round order, schedule, or conflict model. |

## State and retention policy

| Event | Visible consequence | Retained |
| --- | --- | --- |
| Mode change | candidate returns to `ready` for the chosen mode | selected mode |
| Random select | system recommendation becomes visible | selected mode; previous candidate is replaced |
| Start | recommendation becomes user commitment, then simulated Playing result | mode + candidate |
| Reroll | playing is stopped; new recommendation replaces old candidate | mode |
| Save | local saved marker changes only | mode + candidate |
| Exclude | current candidate is removed from this session; replacement is offered | mode |
| Network/content failure | distinct unavailable/error message; no Playing claim | selected mode + last safe candidate when available |
| Retry | returns to random selection; does not duplicate a start event | selected mode |
| Exit | no persistence is claimed; local preview state may reset | none |
