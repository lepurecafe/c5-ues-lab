# C5 Graphify 갱신 및 PR #2 병합 — 2026-09-12

## 완료된 변경

- [PR #2](https://github.com/lepurecafe/c5-ues-lab/pull/2)를 병합했다. 수정 커밋은 `5c075dc`, 병합 main은 `c3f7880`이다.
- Doctor의 심볼릭 링크 검사 누락을 수정했다. 확장자 없는 alias가 Markdown 원본을 숨기지 않으며, Markdown alias마다 상대 링크 기준을 유지한다. 디렉터리 순환 방지·외부 경로 차단은 유지했다.
- 새 회귀 3개를 포함해 **104개 테스트 PASS**. 수정 전 첫 회귀의 실패와 수정 후 통과를 확인했고, 독립 reviewer가 추가 blocker 없음을 확인했다.
- 수정 SHA의 [push CI](https://github.com/lepurecafe/c5-ues-lab/actions/runs/34621834287), [PR CI](https://github.com/lepurecafe/c5-ues-lab/actions/runs/34621837760), 병합 후 [main CI](https://github.com/lepurecafe/c5-ues-lab/actions/runs/34621934769)가 모두 성공했다.
- [Draft PR #1](https://github.com/lepurecafe/c5-ues-lab/pull/1)은 OPEN/Draft 그대로다. Take 2의 RETIRED 결정과 새 실험 미설계·미착수도 유지한다.
- 이 갱신 기록을 추가한 뒤에도 Manifest check와 회귀 104개가 통과했다. Doctor는 PASS 2 / WARN 2 / FAIL 0 / NOT_RUN 0, 내부 링크 검사 45문서이며 선택 원문 67개 해시도 일치한다.

## Graphify 결과

| 항목 | 결과 |
| --- | --- |
| 원본 범위 | 선택 텍스트 67파일, 공백 구분 약 78,415단어 |
| 변경 의미 추출 | 18파일을 다시 읽음; 나머지 문서는 이전 해시 일치 확인 후 재사용 |
| 코드 구조 추출 | 운영 JavaScript 4파일 |
| 결과 | 320노드 / 658연결 / 17군집 |
| 이전 snapshot | 337노드 / 702연결 / 62파일 |
| 무결성 | source hash 67/67 일치, 출처 줄 범위 오류 0, 누락 endpoint 0, self-loop 0 |
| 관계 보존 | 같은 노드 쌍의 병렬 기록 42개를 `evidence_records`에 보존 |
| 비용 | 에이전트 사용량 미제공으로 `unavailable`; 0 비용을 의미하지 않음 |

이전 그래프는 `graphify-out/backup-2026-09-12/`에 보존했다. 오래된 개념을 현재 상태 중심으로 재추출해 노드 수가 줄었지만, 선택된 67개 파일은 모두 대표 노드와 출처로 확인했다. 입력과 출력의 노드·연결 수 일치 assertion을 통과한 뒤 의도적인 축소를 허용했다.

의미 추출 에이전트 Bacon의 44노드·38연결·3개 그룹 관계를 메인이 검토했다. 원본 목록과 대조하여 출처 경로 prefix 오타·보이지 않는 ID 문자를 보정하고 실제 줄 범위를 검사했다. R3의 `63/63`은 R3-A/B **각각 63/100**으로 명료화했다. Take 2 원본 파일과 관계는 보존하되 `docs/experiment-status.md:6–16`에 근거한 RETIRED 표시를 더했다. 코드·테스트는 메인이 수정하고 Darwin이 독립 재검토했다.

## 조회 확인과 해석 제한

- `graphify query 'retired' --budget 1000`: 두 Take 2 자료 묶음과 폐기 결정이 연결됨을 확인했다. 과거 점수와 `pending`은 현행 benchmark·backlog가 아니다.
- `graphify query 'implemented schema' --budget 1000`: 실제 Schema/검사기와 P0 문서의 연결을 확인했다. `schema` 변수 노드가 먼저 선택되므로 개념 탐색에서는 정확한 라벨도 함께 확인한다.
- 그래프는 **무방향 관계 탐색 지도**다. query 출력의 화살표는 실제 import/call 방향의 증거가 아니다. 원본 AST의 방향 있는 import 선언으로 별도 검사했으며 내부 import cycle은 없다. 혼합 그래프의 자동 cycle 오탐은 보고서에서 실제 코드 결함으로 표시하지 않았다.
- 기본 benchmark는 320노드×50단어를 원문 크기로 가정하여 16,000단어, 평균 조회 약 7,444 tokens, 2.9배 감소를 출력했다. 실제 원문 크기나 모델 토큰 사용량·정답률·작업시간 절감을 측정한 실험이 아니다.
- 이미지·오디오·영상·HTML 화면 해석·실제 기기·접근성·인쇄·사용자 검증·Vault 전체 그래프 갱신은 수행하지 않았다. 실제 OPEN 94개와 그중 runtime/accessibility 키워드 36개는 닫지 않았다.

## 산출물과 최신성

`graphify-out/`는 기존 정책대로 git에서 제외하는 로컬 파생물이다. 이 기록만 저장소에 게시하며 대용량 그래프·개인 원문을 GitHub에 올리지 않는다.

- `graphify-out/graph.json`, `graph.html`, `GRAPH_REPORT.md`: 그래프와 관계/무결성 보고서
- `graphify-out/refresh-sources.json`: 67개 선택 원문의 SHA-256
- `graphify-out/latest-refresh-status.txt`: 선택 범위 갱신 SUCCESS
- `graphify-out/prepare_refresh_20260912.py`, `build_refresh.py`, `validate_refresh_20260912.py`: 로컬 재현·검증 절차

그래프의 source snapshot은 병합 커밋 `c3f7880`이다. 이 갱신 기록과 이전 갱신 기록의 안내 수정은 순환 참조를 피하려고 의미 추출 범위에서 제외했다. 이후 문서 기록 커밋과 HEAD가 다르더라도 선택 원문 해시가 모두 일치하는지 함께 판단한다. [이전 기록](graphify-refresh-2026-09-11.md)과 [P0 기록](p0-reliability-hardening.md)의 수치는 각 검사 시점의 snapshot이다.

다음 후보는 최소 Brief/Recipe와 조합 등록이다. 새 실험의 설계·실행은 별도 사용자 결정이 필요하다.
