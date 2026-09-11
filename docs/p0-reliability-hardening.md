# P0 — Doctor 신뢰성과 현재 결과 정합성

> 실행일: 2026-09-11 · 범위: 운영 검사 보강, 문서 정정
> Take 2는 폐기된 실험 계획이다. 새 실험 설계·실행은 하지 않는다.

## 구현 결과

1. [Manifest 0.3 입력 Schema](../schemas/c5-manifest-v0.3.schema.json)를 검사 대상 Manifest 밖에 분리했다. Doctor 설치 위치의 고정 계약을 읽으므로 `C5_DOCTOR_ROOT`나 Manifest의 `required*Fields`·`validStatuses` 수정으로 필수 검사를 완화할 수 없다. 생성 형식은 `0.3.0` 그대로 유지한다.
2. [계약 검사기](../scripts/manifest-contract.mjs)는 최상위 object, 필수 필드, 타입, 비어 있지 않은 Registry·문자열·검사 목록, 지원 버전, 고정 정책, 알 수 없는 필드를 검사한다. bundled Schema에서 사용하는 키워드만 구현한 제한된 검사기이며 임의의 JSON Schema 전체 지원 도구는 아니다. 미지원 Schema 키워드는 조용히 무시하지 않는다.
3. [Doctor](../scripts/c5-doctor.mjs)는 누락·비어 있는 검사 경로, Markdown이 아닌 증거 파일, 파일 대신 디렉터리, workspace 밖 경로·symlink를 FAIL로 처리한다. 디렉터리 symlink 순환은 방문 집합으로 종료한다. I/O·검사 오류도 JSON FAIL로 반환한다.
4. 입력·검사 범위 오류로 실행하지 못한 OPEN/링크 검사는 `SKIP_CHECK_NOT_RUN`, `level: SKIP`, `data.status: NOT_RUN`으로 표시한다. FAIL이 하나라도 있으면 포괄적 `OK_MANIFEST_VALID`를 출력하지 않는다. 종료 코드는 FAIL `1`, PASS/WARN `0`이다.
5. 정본의 필수 Version 및 Pack ID 누락도 FAIL로 검출한다. Preset 정본의 기존 ID 표기 형식은 변경하지 않았다. [오류 코드](error-codes.md)에 새 상태를 문서화했다.

### 호환성과 한계

- 기존 생성기·Manifest 데이터·CI 실행 명령은 변경하지 않았다. 게시 준비에서 CI의 push/PR 경로 필터에 `schemas/**`를 추가해 Schema 단독 변경도 검사하게 했다. 기존 CI가 Doctor와 회귀 테스트를 실행한다. 이 문서의 구현 검증 결과는 로컬 실행이며 원격 CI 결과는 해당 PR에서 별도로 확인한다.
- Manifest 0.3은 Pack/Preset이 각각 1개 이상인 workspace 계약이다. 빈 프로젝트·다른 버전은 명시적 새 계약 없이 허용하지 않는다. 고정 정책 배열의 순서도 생성 계약의 일부다.
- OPEN은 여전히 선택한 Pack 정본/QA·evidence·validation 파일의 표식 탐지다. 전체 backlog나 실제 미해결 결함 수가 아니다. 링크 검사는 현재 선언된 Markdown 범위의 inline 경로 존재 검사이며 앵커·reference-style 링크·모든 실험·HTML 링크까지 검사하지 않는다.
- 이 Schema와 Doctor는 상태 전이 의미, 매체 동등성, 오디오/기기/생산/접근성/사용자 성공을 검증하지 않는다. 정본 메타데이터는 기존 정규식 표기 규칙을 따른다.
- 대용량 입력의 전면적 resource-limit, 파일 읽기 중 동시 변경, 모든 filesystem failure 조합에 대한 보안·내결함성 감사는 이번 범위가 아니다.

## 문서 정합성 수정

- [R3 Composition](../experiments/design-system-value-validation-2026-08-25/r3/contracts/composition-manifest.md)과 [변경 계약](../experiments/design-system-value-validation-2026-08-25/r3/contracts/hold-01-change-contract.md): `0.2.0 qa=029`의 독립 hard gate PASS와 Stage REVISE를 분리했다. R3-A/B는 각각 `63/100`, 신뢰도 C2, 허용 결론은 조건부 유효다. 과거 `0.1.1 STOP`과 사용자·전체 recovery·실제 환경 미검증을 유지했다. 문서 정정일은 새 runtime 검증일이 아니다.
- [R4 평가](../experiments/design-system-value-validation-2026-08-25/r4/01-evaluation.md): 원점수를 보존하고 같은 8항목의 평균 `51/8=6.375 → 64/8=8.0`, 변화 `+1.625`로 정정했다. 개선본 전용 2항목까지 포함한 `81/10=8.1`은 별도의 기술값이다. 기존 `6.2→8.1/+1.9` 표기는 정정 이력으로 남겼다.
- [결과 요약](../experiments/design-system-value-validation-2026-08-25/results/results-summary.md): 미시작 템플릿을 revision·증거 범위별 역사 결과로 정리했다. Take 2 점수는 현재 도구의 benchmark에서 제외했다.
- [UES 정본](04-universal-experience-system.md) §14·§15: 구현된 운영 검사와 미구현 의미 검증을 구분하고 현재 버전을 `0.5.0-draft`로 맞췄다. Core 규칙 변경이나 검증 성숙도 승격은 없다.
- [실험 상태 결정](experiment-status.md), README, Take 2 두 묶음의 시작점·최종 판정, 개선안에 **RETIRED**를 반영했다. 자료 삭제·이동·새 실험 착수는 하지 않았다.

## 검증

```sh
node scripts/generate-c5-manifest.mjs --check
node scripts/test-c5-doctor.mjs
node scripts/c5-doctor.mjs --json
git diff --check
```

회귀 테스트 **104개 PASS** (2026-09-12 후속 수정 포함): 기존 정상·중복 ID·버전·OPEN·링크 사례와 `{}`, `null`, 배열/primitive, 잘못된 JSON, 모든 필수 항목 누락, 잘못된 타입·정책·버전·상태, 비어 있거나 누락된 범위, 파일/디렉터리·symlink, 깊이 12,000의 잘못된 중첩 입력을 포함한다. 실패 사례는 종료 코드 1과 포괄 PASS 부재를 함께 확인한다. 원래 생성된 Manifest의 drift check는 PASS다.

2026-09-12 병합 전 리뷰에서 확장자 없는 symlink를 먼저 방문하면 원본 Markdown을 검사하지 않고 PASS를 반환하는 회귀를 발견했다. 방문 중복 방지는 디렉터리에만 적용하고, 일반 Markdown 파일은 경로별로 검사하도록 수정했다. 새 회귀 3개는 확장자 없는 alias 뒤의 원본, 확장자 없는 원본을 가리키는 Markdown alias, 서로 다른 디렉터리의 Markdown alias에 대한 상대 링크 기준을 검사한다. 첫 사례가 수정 전 실패하고 수정 후 전체 104개가 통과했으며 기존 디렉터리 순환·외부 경로 차단 사례도 유지했다.

현재 workspace의 실제 Doctor는 `PASS 2 / WARN 2 / FAIL 0 / NOT_RUN 0`, 링크 검사 **44개 문서**다. Pack 표식 `94`와 그중 런타임·접근성 키워드 `36`은 닫지 않았다. 별도 변경 문서 감사는 Markdown 18개에서 상대 링크 146개와 R4 원점수 8개 행의 산술을 확인해 오류 0이었다. `git diff --check`도 통과했다.

## 검토와 다음 경계

문서 worker 1개가 허용된 결과/계약/평가 파일 4개만 수정했다. 메인이 원점수·독립 검토 snapshot·변경 diff를 대조했다. 읽기 전용 reviewer 1개가 Doctor를 독립 점검하여 깊은 JSON의 `JSON.stringify` stack overflow를 재현했다. 메인이 비직렬화 비교와 오류 경계를 적용하고 2개 회귀 사례를 추가해 해결했으며 reviewer가 남긴 실제 fixture도 구조화된 FAIL로 반환하는지 재확인했다. 코드·Schema·README·상태 결정은 메인이 작성·통합했다. 후속 작업에서도 독립 파일 소유권과 실패 사례 리뷰를 유지한다.

이전 [Graphify 갱신](graphify-refresh-2026-09-11.md)은 **이번 P0 및 Take 2 폐기 정정 전 snapshot**이다. 변경된 문서를 의미 재추출하지 않은 채 최신 해시로 덮어쓰지 않았다. 로컬 `.needs_update`와 보고서에 stale을 표시했으며 현재 상태는 이 문서와 실험 상태 결정을 우선한다. 그래프 전체 재생성·PR 병합·새 commit/push는 이번 완료 주장에 포함하지 않는다.

다음 도구 개선 후보는 최소 Brief/Recipe와 조합 등록이다. 새 실험의 대상·가설·표본·결과물·합격 기준은 사용자가 추후 별도로 설계할 때 결정한다.
