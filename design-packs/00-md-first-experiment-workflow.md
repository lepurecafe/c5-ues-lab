# MD-first Design Pack 실험 운영 가이드

> **목표:** 제품 UI를 먼저 만들지 않고, Markdown 정본을 중심으로 Design Pack의 형식·추출 품질·UX Preset 호환성·검증 체계를 반복 개선한다.
>
> 이 문서는 [상업용 작성 표준](00-commercial-design-pack-authoring-prompt.md)의 실행 절차다. 규칙이 충돌하면 UES와 Product Binding이 더 높은 우선순위를 가진다.

## 1. 현재 단계의 정의

현재는 `MD-first experimental library` 단계다.

- 생산물: canonical Markdown, 선택적 보조 Markdown, Preview HTML, 증거/검수 기록
- 목적: 어떤 입력을 어떤 구조로 추출해야 재사용 가능한지 학습
- 금지 주장: 문서만으로 런타임 완성, 접근성 준수, 브랜드 사용 허가, 실제 서비스 동작을 주장하지 않음
- 제품화 보류 기준: 동일한 규칙이 최소 두 팩과 두 매체에서 반복 검증되기 전에는 별도 편집 앱을 만들지 않음

## 2. 하나의 실험 단위

각 실험은 아래 질문 하나를 해결해야 한다.

```text
Experiment = Source + Question + Pack Revision + Projection + Evidence + Decision
```

| 필드 | 예 |
| --- | --- |
| Source | 웹사이트, 앱, 사진, Figma, 인쇄물 |
| Question | 사진에서 물성 문법과 UI 토큰을 어디까지 분리할 수 있는가? |
| Pack Revision | `pack-id@0.2.0` |
| Projection | web / mobile / editorial / service / physical |
| Evidence | 원본 캡처, Preview, 상태표, 접근성 점검, 사용자 관찰 |
| Decision | 유지 / 수정 / 미확정 / 승격 보류 |

한 번에 여러 문제를 해결하려 하지 않는다. 실험 질문이 바뀌면 새 실험 기록을 만든다.

## 3. 반복 루프

### Stage A — Register

- 원본 경로/URL, 파일명, 앱 버전, 관찰 날짜와 조건을 기록한다.
- 사용 권한과 접근 제한을 선언한다.
- 대상 제품, 매체, 핵심 과업, UX Preset을 명시한다.

### Stage B — Extract

- 관찰값과 추론값을 분리한다.
- 시각 문법, 토큰, 컴포넌트 후보, 상태 후보, 흐름 후보를 추출한다.
- 입력원이 말할 수 없는 내용은 `미확정`으로 남긴다.

### Stage C — Normalize

- raw token → semantic token → component token으로 정리한다.
- 제품 데이터·정책·권리는 Product Binding/외부 권한으로 보낸다.
- Pack이 UX Preset의 의미를 표현할 수 있는지 capability gap을 작성한다.

### Stage D — Project

- 최소 한 개의 과업 레시피와 한 개의 edge-state 세트를 만든다.
- Preview는 정상 화면만이 아니라 loading, empty, invalid, error, success 중 적용 상태를 보여준다.
- 다른 viewport·입력 방식·긴 콘텐츠에서 표현이 유지되는지 확인한다.

### Stage E — Review

- 출처·증거·권리·상태·접근성·반응형을 문서 검수한다.
- Preset의 최소 의미 테스트를 실행한다.
- 수정 사항을 Core, Binding, Preset, Pack, Medium, Projection, Implementation 중 하나로 귀속한다.

### Stage F — Decide

- `experimental`: 문서와 Preview는 있으나 적용 증거가 제한됨
- `candidate`: 서로 다른 두 투영에서 핵심 의미가 유지됨
- `validated`: 선언한 범위의 런타임·접근성·사용 증거가 있음
- `archived`: 새 사용의 기본값에서는 제외하되 학습 자료로 보존

## 4. 실험 기록 템플릿

각 팩 또는 주요 변경에 아래 블록을 추가한다.

```md
## Experiment Record

- ID: `EXP-YYYY-MM-DD-short-name`
- Question: [이번 실험이 답하려는 한 가지 질문]
- Sources: [경로/URL/파일/앱 버전]
- Observation conditions: [viewport, login, network, lighting, device]
- Pack revision: [pack-id@version]
- UX Preset: [preset id/version 또는 not-applicable]
- Projection: [medium/fidelity]
- Evidence: [캡처, Preview, 테스트, 사용자 관찰]
- Findings: [확인된 것]
- Unresolved: [미확정/권한 필요/출시 검증 필요]
- Decision: [keep / revise / promote / archive]
- Next experiment: [다음에 검증할 한 가지]
```

## 5. 품질 게이트

### Gate 1 — 문서 정합성

- [ ] canonical MD가 존재한다.
- [ ] Source Register와 확인일이 있다.
- [ ] 관찰됨/도출됨/미확정/권한 필요가 구분된다.
- [ ] 토큰·컴포넌트·상태·레시피의 링크와 명칭이 일치한다.
- [ ] Preview와 문서의 버전이 일치한다.

### Gate 2 — 의미 보존

- [ ] 선택·검증·커밋·결과·복구 의미가 유지된다.
- [ ] 시스템 추천과 사용자 선택이 구분된다.
- [ ] 로딩·빈 상태·실패·충돌·취소·재시도 중 적용 상태가 정의된다.
- [ ] Design Pack × UX Preset capability gap이 선언된다.

### Gate 3 — 상업 준비도

- [ ] 브랜드 자산 사용 권한이 분리되어 있다.
- [ ] 실데이터·정책·개인정보의 책임자가 명시되어 있다.
- [ ] 키보드/플랫폼 입력, focus, 비색상 단서, 긴 문자열을 검토했다.
- [ ] 실제 런타임 검증이 필요한 항목을 문서 주장과 분리했다.

## 6. 변경과 버전 규칙

- `PATCH`: 오탈자, 출처 보강, 의미를 바꾸지 않는 Preview 수정
- `MINOR`: 새 컴포넌트·상태·레시피·매체 투영 추가
- `MAJOR`: 토큰 의미, 상태 계약, Preset 호환성, 기존 사용법을 깨는 변경
- 정본을 직접 덮어쓸 때는 Experiment Record와 변경 이유를 남긴다.
- Preview에서 먼저 발견한 문제도 반드시 Markdown 정본에 반영한 후 닫는다.

## 7. 현재 우선순위

1. 여섯 팩 모두 Source Register·Experiment Record 형식을 통일한다.
2. 각 팩에 하나의 `Reserve`, `Compare`, `Plan` 투영을 선택해 capability gap을 비교한다.
3. Preview에 정상 화면 외 대표 edge-state를 추가한다.
4. 두 개의 서로 다른 팩을 같은 UX Preset에 적용해 의미 보존을 검증한다.
5. 반복 규칙이 확인된 뒤에만 CLI·시각 Workbench를 만든다.

## 8. 하지 않을 일

- 단순 색상/폰트 교체를 새로운 UX Preset 검증으로 간주하지 않는다.
- Preview 하나를 실제 제품·접근성·법무 검증으로 간주하지 않는다.
- 원본에 없는 정책·가격·재고·실시간 상태를 채워 넣지 않는다.
- 파일 분리를 완성도의 증거로 사용하지 않는다.
- 실험 질문과 무관한 대규모 앱/플러그인 제작으로 흐름을 확장하지 않는다.
