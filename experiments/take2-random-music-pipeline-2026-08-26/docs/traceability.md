# Cross-stage Traceability

| Semantic ID | Flowchart | Low-fi evidence | High-fi evidence | Result |
| --- | --- | --- | --- | --- |
| ST-01 Ready | Entry node | F-01 mode-first entry | `#status`, mode buttons | preserved |
| ST-02 Mode | decision node | F-01 `댄스/랩` control | mode segmented buttons | preserved |
| ST-03 Recommendation | random node | F-02 candidate sheet | `#candidate` and `랜덤 선택` | preserved |
| ST-04 Commitment | explicit start | F-02 dominant start action | `이 곡 재생` button | preserved |
| ST-05 Playing | result node | F-03 playing strip | timer, `재생 중`, stop/reroll | preserved |
| ST-06 Exclude | replacement branch | F-02 secondary action | `제외` control + fresh candidate | preserved |
| ER-01 Empty | empty branch | F-04 empty state | `콘텐츠 오류` trigger and retry | preserved |
| ER-02 Network | recoverable error | F-05 error state | `네트워크 오류` trigger and retry/wait | preserved |
| LF-01 Saved | local effect | F-02 marker | `저장됨` local marker | preserved |

## Pack application trace

| High-fi element | Rasterline source rule | Semantic preserved |
| --- | --- | --- |
| black canvas, grid/scanline texture | Foundation color / surface grammar | no semantic change |
| lime single active signal | accent only for active primary action/current state | state also includes text and icon |
| mono status rail / IDs | Space Mono label rule | Ready, recommendation, commitment and error remain named |
| squared bordered controls | component contracts | button action cost and state remain explicit |
| inline error panel | input/state/recovery contract | cause + retry near affected candidate |
