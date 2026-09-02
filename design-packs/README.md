# Design Pack Library

이 폴더는 다양한 원본을 Markdown 중심의 재사용 가능한 Design Pack으로 정규화하는 실험 라이브러리다.

## 현재 운영 규칙

- 정본은 항상 Markdown이다. HTML Preview, 캡처, Figma 파일은 파생 검증물이다.
- 각 팩은 출처·확인일·버전·증거 등급·권리 경계를 선언한다.
- Design Pack은 UX Preset을 대체하지 않는다. 상태·검증·커밋·복구 의미는 [Universal Experience System](../docs/04-universal-experience-system.md)과 [UX Preset Registry](../ux-presets/README.md)를 따른다.
- 작은 팩은 단일 Markdown으로 시작하고, 컴포넌트·흐름·검증 기록이 커질 때만 혼합형으로 분리한다.
- 문서 준비도와 실제 런타임/접근성/법무 검증을 별도로 평가한다.

## 팩 목록

| Pack | Canonical MD | Preview | 상태 |
| --- | --- | --- | --- |
| Rasterline | [MD](rasterline-system/rasterline-system.md) | [Preview](rasterline-system/preview.html) | experimental |
| Korean Commercial | [MD](korean-commercial-system/korean-commercial-system.md) | [Preview](korean-commercial-system/preview.html) | experimental |
| Industrial Swiss | [MD](industrial-swiss-system/industrial-swiss-system.md) | [Preview](industrial-swiss-system/preview.html) | experimental |
| 90s BMW | [MD](90s-bmw-system/90s-bmw-system.md) | [Preview](90s-bmw-system/preview.html) | experimental |
| Royal Mail Service | [MD](royal-mail-system/royal-mail-system.md) | [Preview](royal-mail-system/preview.html) | experimental |
| La Poste Civic Service | [MD](la-poste-system/la-poste-system.md) | [Preview](la-poste-system/preview.html) | experimental |

## 공통 기준

- [상업용 작성 표준과 마스터 프롬프트](00-commercial-design-pack-authoring-prompt.md)
- [MD-first 실험 운영 가이드](00-md-first-experiment-workflow.md)

## 상태 정의

| 상태 | 의미 |
| --- | --- |
| `experimental` | 문서와 Preview가 존재하지만 실제 제품 투영·사용성·접근성 증거가 제한됨 |
| `candidate` | 두 개 이상의 제품/매체 투영과 의미 검증이 진행됨 |
| `validated` | 호환성·접근성·대표 사용자/런타임 증거가 선언된 범위에서 확보됨 |
| `archived` | 학습 가치나 출처는 보존하지만 새 투영의 기본값으로 사용하지 않음 |
