# UES Doctor Error Codes

UES Doctor와 향후 C5 UES Lab 도구가 같은 문제를 같은 이름으로 보고하기 위한 정본이다.
사람에게 보여주는 설명은 바뀔 수 있지만, 한 번 사용한 `code`의 의미는 바꾸지 않는다.

| Code | 의미 | 기본 대응 |
| --- | --- | --- |
| `ERR_MANIFEST_NOT_FOUND` | 루트 Manifest가 없음 | `c5-manifest.json` 확인 |
| `ERR_MANIFEST_INVALID` | Manifest JSON을 읽을 수 없음 | JSON 문법 확인 |
| `ERR_MANIFEST_STALE` | Manifest가 현재 Markdown 정본과 다름 | Manifest 생성기 재실행 |
| `ERR_REGISTRY_INVALID` | Registry 표나 링크를 읽을 수 없음 | Registry 형식 확인 |
| `ERR_CANONICAL_META_MISSING` | 정본 문서에 ID 또는 Version이 없음 | 정본 메타데이터 보완 |
| `ERR_REQUIRED_FIELD_MISSING` | 필수 항목이 없음 | 해당 항목 보완 |
| `ERR_DUPLICATE_ID` | 같은 ID가 두 번 등록됨 | ID 통합 또는 이름 변경 |
| `ERR_INVALID_STATUS` | 허용되지 않은 상태값 사용 | 상태값 수정 |
| `ERR_FILE_NOT_FOUND` | Manifest가 가리키는 파일이 없음 | 경로 또는 파일 확인 |
| `ERR_SOURCE_OF_TRUTH_MISSING` | C5 정본 문서 경로가 없음 | 정본 경로 확인 |
| `ERR_SOURCE_ID_MISMATCH` | Manifest ID와 정본 문서 ID가 다름 | 정본 ID 또는 Manifest ID 확인 |
| `ERR_VERSION_MISMATCH` | Manifest 버전과 정본 문서 버전이 다름 | 버전 하나를 정본으로 맞춤 |
| `ERR_EVIDENCE_OPEN` | 검증이 아직 열려 있음 | `OPEN` 상태 유지 및 다음 증거 기록 |
| `ERR_RUNTIME_UNVERIFIED` | 실제 런타임 증거가 없음 | 검증 전까지 완료 주장 금지 |
| `ERR_MARKDOWN_LINK_BROKEN` | 관리 범위의 내부 Markdown 링크가 깨짐 | 링크 대상 경로 수정 |

## 사용 원칙

- 오류 문장보다 `code`를 자동화의 기준으로 사용한다.
- 기존 코드의 의미를 바꾸지 않는다. 새 문제에는 새 코드를 추가한다.
- `WARN`은 계속할 수 있지만 주의가 필요한 상태다.
- `FAIL`은 계약을 신뢰하기 전에 수정해야 하는 상태다.
