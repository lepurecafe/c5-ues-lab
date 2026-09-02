# Design System Tool Value Validation — 2026-08-25

> **Status:** ready to run  
> **UES:** `0.5.0-draft`  
> **Shared foundation:** the existing Markdown Design Pack Library, UX Preset Registry, UES, and evaluation rules  
> **Track 1 fixture:** fictional all-gender skincare and merchandise brand `COMMON SURFACE`  
> **Track 2 product:** the independently scoped random-music playback app discussed at the beginning of C5  
> **Purpose:** establish a measured baseline for whether the current Markdown-first system works as (1) a maintainable brand system and (2) a reusable design-production pipeline.

## 산출물 언어 원칙

이 실험에서 새로 만드는 정본 문서, 결과지, 프리뷰의 사용자용 문장은 한글을 기본으로 한다. Pack/Preset/Binding ID, 토큰, 코드, 권한 상태처럼 추적이 필요한 안정 식별자는 원문을 유지한다.

## 오늘 답할 질문

### Q1 — 유지관리 도구로 쓸 수 있는가?

기존 Design Pack을 적용한 가상 브랜드의 기준선을 고정한 뒤 통제된 업데이트 요청을 적용한다. Brand Experience 철학, 제품 정보, 컴포넌트, 무드보드, 패키지, 매장, 의류, OOH, 배너, 웹 표본에 변경이 일관되게 전파되고, 바꾸지 말아야 할 브랜드·UX 원칙과 상업적 경계가 보존되는지 평가한다.

### Q2 — 지속적인 제작 도구로 가치가 있는가?

초기 단계에서 논의했던 랜덤 음악 재생 앱을 독립 Product Binding으로 정의하고 `Flowchart → Low-fi → High-fi`로 순차 투영한다. 앱의 Design Pack, Brand Application 유무, 기존 UX Preset은 별도 질답 뒤 선택·동결하며, 각 단계의 품질과 이전 단계 의미의 손실률을 평가한다. Track 1의 스킨케어 브랜드를 자동 상속하지 않는다.

## 가설

- **H1 유지관리성:** `pack:industrial-swiss@1.0.0`, 대표 Product Binding과 `decision.reserve@0.1.0`, COMMON SURFACE Brand Experience Profile을 고정하고 변경 요청을 영향 분석하면, revision 1을 revision 2로 개선하면서 브랜드·UX 불변조건을 95% 이상 보존하고 필수 매체에 90% 이상 전파할 수 있다.
- **H2 재사용성:** Product Binding·UX Preset·Pack 버전을 고정하면 Flowchart의 필수 의미 중 90% 이상이 Low-fi와 High-fi까지 추적 가능하다.
- **H3 도구 가치:** 기존 규칙으로 해결되는 결정의 비율이 높고, 사람의 수정이 명확한 계층에 귀속되면 반복 사용 가치가 있다.

이 수치는 과거 데이터가 없는 첫 실험의 **잠정 목표**다. 오늘 결과로 기준선을 만들고, 두 번째 실행부터 임계값을 보정한다.

## 실험 구조

```text
공통 UES / Pack Library / Preset Registry / 평가 규칙
        ├─ Track 1 — Brand maintenance
        │  Industrial Swiss + Brand Experience Profile + representative Reserve flow
        │  → COMMON SURFACE r1 → A/B update → canonical r2 → cross-medium regression
        │
        └─ Track 2 — Projection pipeline
           Random-music context Q&A → independent Binding/Pack/Preset freeze
           → Flowchart → Low-fi → High-fi → semantic regression

두 결과를 별도 점수로 판정 → 공통 규칙의 지속 사용 가치 종합
```

두 트랙은 공통 시스템과 평가법만 공유하고 Composition은 공유하지 않는다. Track 1의 성공은 랜덤 음악 앱에 대한 브랜드 적합성을 증명하지 않는다. 각 트랙이 시작된 뒤에는 그 트랙에서 동결한 Pack/Preset/Binding/Application을 평가 중 임의로 바꾸지 않고, 문제를 adaptation/gap으로 기록한다.

## 문서 세트

- [공통 평가 프레임](evaluation-framework.md)
- [Take 01 종합 실험 보고서](take-1-complete-history.md)
- [COMMON SURFACE 브랜드·Brand Experience·다중 매체 fixture](fixtures/common-surface-fixture.md)
- [Track 2 시작 전 랜덤 음악 앱 질답](03-random-music-app-context-interview.md)
- [Track 1 — 브랜드 유지관리 실험](01-brand-maintenance-experiment.md)
- [Track 2 — Flowchart→Low-fi→High-fi 실험](02-projection-pipeline-experiment.md)
- [Track 1 결과지](results/01-maintenance-scorecard.md)
- [Track 2 결과지](results/02-pipeline-scorecard.md)
- [종합 결과](results/results-summary.md)

## 오늘의 실행 순서

1. 공통 평가 규칙과 두 트랙의 독립성 원칙을 먼저 동결한다.
2. Track 1의 Pack, 대표 Product Binding/UX Preset, Brand Experience Profile, 매체, 콘텐츠, 불변조건을 동결한다.
3. Track 1 기준선을 만들고 **업데이트 전에** 기준 점수를 기록한다.
4. 같은 입력으로 서로 보지 않은 COMMON SURFACE 업데이트 제안 A/B를 만든다.
5. 채택 결정과 이유를 기록해 canonical brand application revision 2를 만든다.
6. 같은 테스트 프레임으로 무드보드·패키지·매장·의류·OOH·배너·웹의 전후 전파와 회귀를 판정한다.
7. Track 2는 별도 질답으로 랜덤 음악 앱의 Product Binding, 독립 Pack/Application, Preset 적합성을 확정한다.
8. Track 2 Composition Manifest를 동결한 뒤 Flowchart를 시작한다.
9. Flowchart, Low-fi, High-fi 각각 `초안 평가 → 1회 수정 → 출구 평가`를 수행한다.
10. 두 트랙의 점수를 직접 평균내지 않고, 의미 보존·전파·수정량·소요시간·결함 귀속을 함께 해석한다.

## 고정 축과 변경 축

| 트랙 | 고정 | 변경 |
| --- | --- | --- |
| Track 1 | `pack:industrial-swiss@1.0.0`, 대표 Binding/`decision.reserve@0.1.0`, Brand Experience Profile, BI, 매체·테스트 프레임·콘텐츠·평가표 | COMMON SURFACE brand application r1 → r2 |
| Track 2 | 질답 후 동결한 Product Binding, 별도 Pack/Application, 기존 UX Preset, 데이터·권리·오디오·매체 경계 | Projection fidelity: Flowchart → Low-fi → High-fi |

## 오늘 내릴 수 있는 결론의 한계

오늘 한 번의 성공은 `validated` 또는 상업 출시 가능을 증명하지 않는다. 오늘 확인할 수 있는 것은 다음뿐이다.

- 문서와 파생물 수준의 유지관리 가능성;
- 한 Product Binding에서의 단계 간 의미 보존;
- AI 생성과 사람 수정의 비용·결함 유형;
- 다음 반복 실험을 할 가치가 있는지.

지속 사용 가치는 최소 두 번째 Product Binding 또는 다른 Design Pack/Medium에서 동일 절차를 반복하고, 품질을 유지하면서 수정 시간과 결함이 감소할 때 강하게 주장할 수 있다.

## 준비 기록

- Main agent: 요구 해석, 문서 구조·가상 fixture 결정, 통합, 사용자 수정 반영, 최종 검증.
- Read-only reviews: 유지관리 실험, Projection pipeline, 평가 체계, 스킨케어 fixture, 트랙 분리를 독립 검토했으며 보조 검토자에게 파일 편집은 맡기지 않았다.
- Rework: 초기 공유 브랜드·세션 플래너 가정을 폐기하고, Track 1은 COMMON SURFACE 스킨케어/머천다이즈 브랜드로, Track 2는 사전 질답을 거치는 독립 랜덤 음악 앱으로 분리했다.
- Brand UX: 철학 문구를 Brand Experience Profile로 구조화해 카피, 선택, 상태, 복구, 서비스, 접근성, 매체 간 사실 일치의 평가 대상으로 만들었다.
- Validation: Track 1 Brand Governance Core `60` + Maintenance Module `40`, Track 2 Product UX Core `60` + 단계 Module `40`, CR/BI 분모, 링크, Track 2 context gate와 Composition 독립성을 확인한다.

## 최종 결정 매트릭스

| Track 1 | Track 2 | 해석 |
| --- | --- | --- |
| 통과 | 통과 | MD-first 도구를 계속 운영하고 두 번째 제품으로 반복 |
| 통과 | 실패 | 유지관리 라이브러리로는 가치가 있으나 전체 제작 파이프라인은 보완 필요 |
| 실패 | 통과 | 일회성 제작 보조에는 유용하지만 시스템 유지관리성은 부족 |
| 실패 | 실패 | 현재 형식은 연구 자료로 보존하고 구조를 재설계 |
