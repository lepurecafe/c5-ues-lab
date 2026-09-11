# C5 Graphify 갱신 기록 — 2026-09-11

> 목적: 초기 Random Beat Maker 중심 그래프를 현재 UES 정본·운영·대표 실험 관계로 갱신한다.
> 범위: 이 C5 저장소의 선택된 텍스트. Vault 전체 그래프와 자동화 설정은 대상이 아니다.
>
> **후속 상태: STALE.** 아래 수치는 같은 날 P0 구현·Take 2 폐기 정정 **이전** snapshot이다. [P0 현재 상태](p0-reliability-hardening.md)와 [실험 상태](experiment-status.md)가 우선한다. 해당 변경을 의미 재추출하지 않았으며 이전 해시·그래프는 역사 snapshot으로 유지한다.
>
> **2026-09-12 후속 갱신 완료:** [최신 갱신·PR #2 병합 기록](graphify-refresh-2026-09-12.md). 이 문서의 STALE 표시는 아래의 이전 snapshot에 해당한다.

## 원본과 갱신 범위

기존 `graphify-out/graph.json`은 2026-08-07 생성본이며 90개 노드·116개 연결이었다. 현재 README의 UES 정체성, Pack/Preset Registry, Manifest/Doctor/CI, 이후 실험을 충분히 다루지 못했다.

선택한 기존 파일은 60개다. 정본·Registry·운영 설정·대표 실험 문서/데이터 57개를 의미 추출하고, 운영 JavaScript 3개를 AST로 추출했다. 이번 [개선안](ues-general-purpose-tool-roadmap.md)과 [PR 검토 기록](pr-1-review-2026-09-11.md) 2개를 추가하고 README를 최신 내용으로 다시 읽었다. 최종 범위는 62개 파일이다.

포함:

- README, UES 및 선행 학습/음원 전략 문서, 오류 코드
- Design Pack Markdown, UX Preset Markdown, `c5-manifest.json`, Doctor CI 설정
- 생성기·Doctor·회귀 테스트의 코드 구조
- COMMON SURFACE의 대표 Composition/Binding/변경 계약/검증, R4 평가
- 배틀 중심 Take 2와 최소 음악 앱의 Binding·의미 추적·검증 범위
- 1M Electric 웹·접지물 계약/QA, Royal Mail Preset QA
- 2026-09-11 제안 로드맵과 미병합 PR #1 검토 기록

제외:

- 이미지·영상·오디오·PDF·HTML/CSS의 시각/실행 해석
- 의존성·빌드 출력, `.git`, 과거 Graphify 생성물
- 개인 원문·일상 기록 source packet, 모든 실험 revision의 전체 역사
- Vault 전체, M1 현재 장비 상태, 실제 기기·인쇄·현장·사용자 재검증

선택 범위 밖 파일은 미검증/범위 외이며 “없는 파일”이나 “완료된 결과”로 취급하지 않는다. 이 갱신 기록 자체는 빌드 후 기록이므로 순환 참조를 피하기 위해 이번 의미 추출 범위에 넣지 않는다.

## 방법과 품질 관리

Graphify의 증분 갱신 절차를 사용하되, 오래된 의미를 재사용하지 않도록 선택된 문서를 다시 추출했다. 실제 설치된 Graphify의 탐지·AST·merge·cluster·진단·JSON/HTML export 기능을 사용한다. 의미 추출은 3개 기본 묶음과 신규 문서 보강 1개 묶음의 총 4개 에이전트가 담당했다.

메인 Codex의 통합 검사는 JSON 파싱, 원본 파일 목록, ID, 연결 양끝, 출처 줄 범위, 파일별 포함 여부를 확인한다. 추출 결과의 저장소 경로 오타는 해당 파일의 정확한 목록과 대조해 보정했다. 같은 두 노드를 잇는 여러 관계는 하나의 표시 연결에 원래 관계·출처를 `evidence_records`로 보존한다. 원본 추출 JSON도 유지한다.

기존 결과는 `graphify-out/backup-2026-09-11/`에 보존한다. 새 결과에는 `main@586a6af`에 이번 미커밋 문서가 더해졌다는 메타데이터를 넣는다. PR #1은 문서화된 검토를 통해 연결하며, PR 코드가 main에 병합됐다고 표시하지 않는다. 로드맵의 미구현 항목은 제안으로 기록한다.

## 결과

| 항목 | 확인 결과 |
| --- | --- |
| 선택 원문 | 62개 파일, 공백 구분 약 74,934단어 |
| 최종 그래프 | 337개 노드 / 702개 연결 / 16개 군집 |
| 입력→출력 보존 | 337개 노드와 집계 후 702개 연결 모두 유지 |
| 구조 무결성 | 누락 endpoint 0, dangling edge 0, self-loop 0 |
| 출처 | 선택 파일 62개 SHA-256 일치, 노드·연결의 명시된 출처 줄 범위 오류 0 |
| 중복 관계 | 원래 병렬 기록 24개를 `evidence_records`에 추가 보존 |
| 운영 검사 | Manifest PASS, Doctor PASS 2 / WARN 2 / FAIL 0, 링크 42개 문서, 회귀 테스트 PASS, diff 공백 검사 PASS |

AST에서 빠진 외부 모듈 노드 `node:fs`, `node:path`, `node:child_process`는 실제 import 줄과 대조해 참조 노드로 보강했다. 외부 라이브러리 구현을 읽었다는 뜻은 아니다. 첫 통합에서 Graphify가 동일 라벨의 파일 허브와 문서 노드를 합치는 현상을 발견했다. 파일 허브를 `File: 상대경로`로 구별한 뒤 다시 생성하여 노드 16개·연결 64개가 사라지던 문제를 해소했고, 입력/출력 개수 일치 assertion을 추가했다.

검색 확인:

- `UES Doctor`: 34개 관련 노드, Manifest·CI·동일 SHA 검증·P0 입력 검증 개선안 연결 확인.
- `product binding composition medium`: 40개 관련 노드, UES 정본과 COMMON SURFACE/웹·접지물 계약 연결 확인.
- `범용 경험 설계 도구 개선안`: 37개 관련 노드, 최소 Brief·Registry·변경 추적·검증·인수인계 제안 연결 확인.
- 범용 키워드 `manifest doctor`는 테스트 코드 변수 `doctor`를 우선 선택했고, `proposed roadmap`은 과거 음원 제안까지 포함했다. 정확한 라벨로 좁힌 조회를 권한다. 1,500-token 예산에서는 일부 결과가 잘리므로 전체성 판단에 사용하지 않는다.

가장 연결이 많은 항목은 개선안 파일(30), README(28), UES 정본 파일(19)이다. 이는 탐색 허브라는 뜻이며 제안 문서가 정본보다 우선한다는 뜻은 아니다. 추론 관계에서는 우편 상태의 authoritative event와 COMMON SURFACE의 batch authority가 연결된다. 동일 사실/권한을 여러 표현에 보존한다는 공통점에 대한 **해석**이지 실행 검증이 아니다. R3의 과거 STOP·후속 REVISE·남아 있는 pending 요약 사이의 모호한 관계는 삭제하지 않았다. 후속 질문은 “어느 revision의 어떤 범위까지 확인했는가?”다.

Graphify 기본 benchmark는 원문 크기를 `노드 수×50단어`로 추정해 3.4배를 출력했다. 실제 선택 범위의 공백 구분 단어 수 74,934를 API에 넘기면 기본 4개 질문 평균 추정 6,690 tokens, 전체 읽기 대비 14.9배가 나온다. 둘 다 휴리스틱 계산이며 실제 모델 토큰 사용량·정답률·사용자 작업시간 절감 실험이 아니다. 이를 UES 도구 가치의 입증으로 인용하지 않는다. 검색 결과와 어휘 선택 교훈은 로컬 Graphify query memory/reflection에 기록했다.

## 로컬 출력과 다음 갱신

`graphify-out/`는 기존 `.gitignore` 정책에 따라 로컬 파생물이다. 이 Markdown 기록은 저장소에서 관리할 수 있지만 그래프 파일 자체가 GitHub에 올라갔다는 뜻은 아니다.

| 로컬 경로 | 용도 |
| --- | --- |
| `graphify-out/graph.json` | 질의 가능한 노드·관계 |
| `graphify-out/graph.html` | 인터랙티브 관계 지도 |
| `graphify-out/GRAPH_REPORT.md` | 구조·군집·관계·무결성 보고서 |
| `graphify-out/refresh-sources.json` | 선택된 파일과 SHA-256 내용 해시 |
| `graphify-out/refresh-summary.json` | 갱신 수치와 무결성 결과 |
| `graphify-out/refresh-raw-extraction.json` | 병렬 관계를 포함한 원 추출 기록 |
| `graphify-out/prepare_refresh.py` | 이번 선택 범위와 추출 묶음 정의 |
| `graphify-out/build_refresh.py` | 검토된 추출 결과의 병합·생성 절차 |

다음 갱신은 source hash를 현재 파일과 비교하고, 변경된 문서를 다시 의미 추출한 뒤 병합·검증한다. `build_refresh.py`만 재실행하면 새 의미가 추출되는 것은 아니다. 문서가 바뀌었는데 추출을 생략하고 해시만 갱신해서는 안 된다. 이 로컬 절차는 현재 세션의 재현 자료이며 아직 배포 가능한 범용 자동 갱신 기능은 아니다.

재사용 가능한 조회 예:

```sh
graphify query "UES Doctor" --budget 1500
graphify query "product binding composition medium" --budget 1500
graphify query "범용 경험 설계 도구 개선안" --budget 1500
```

현재 상태는 여전히 README·Manifest·Doctor 실제 결과·git/PR·최신 Evidence에서 판단하고, 그래프는 관계 탐색과 원본으로 이동하는 데 사용한다. 에이전트 인터페이스가 실제 토큰 사용량을 제공하지 않아 비용 수치는 `unavailable`로 기록하며, 0 토큰으로 추정하지 않는다.
