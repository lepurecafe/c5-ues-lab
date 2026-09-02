# C5 UES Lab

> **Evidence-driven Experience System Laboratory**

이 작업공간은 제품 맥락, UX 행동 계약, 시각 표현, 매체 투영, 검증 증거를 분리하고 다시 조합하는 **Universal Experience System (UES)** 개인 연구 랩이다. 댄스배틀·랩배틀용 랜덤 비트 메이커 `Take 2`는 이 시스템을 검증하는 첫 번째 Product Binding이다.

## C5 운영 도구

- [UES Manifest](c5-manifest.json) — Pack, Preset, 정본 문서, 버전, 상태를 AI와 도구가 읽는 색인
- [UES Doctor Error Codes](docs/error-codes.md) — 검사 결과의 고정 코드와 대응 규칙

Manifest 생성과 Doctor 실행:

```bash
# Registry와 각 정본 Markdown에서 Manifest를 다시 생성
node scripts/generate-c5-manifest.mjs
# 생성된 Manifest가 최신인지 쓰기 없이 확인
node scripts/generate-c5-manifest.mjs --check
# 사람용 또는 자동화용 검사 결과
node scripts/c5-doctor.mjs
node scripts/c5-doctor.mjs --json
# 자동화 회귀 테스트
node scripts/test-c5-doctor.mjs
```

`c5-manifest.json`의 Pack/Preset 목록·ID·버전·경로는 Registry와 정본 Markdown에서 생성하므로 직접 수정하지 않는다. `PASS`는 정상, `WARN`은 문서에 실제 미완료 증거가 남은 상태, `FAIL`은 경로·구조·링크·계약을 수정해야 하는 상태다. GitHub 저장소에서는 같은 검사가 `.github/workflows/c5-doctor.yml`로 자동 실행된다.

현재 정본 문서:

- [UX/UI 학습 및 제작 계획](docs/00-ux-ui-learning-plan.md)
- [음원 소스 및 재생 전략](docs/01-audio-source-and-playback-strategy.md)
- [재생 중 영상·오디오 녹음 기술 검토](docs/02-playback-recording-feasibility.md)
- [Universal Experience System v0.5](docs/04-universal-experience-system.md) — Product Binding 위에서 UX Preset과 Design Pack을 조합하고 매체·유저플로우·로우파이·하이파이·구현 투영으로 연결하는 experimental canonical foundation
- [UX Preset Registry](ux-presets/README.md) — Reserve·Compare·Plan을 상태 보존, 권한/커밋, 호환성, 최소 검증까지 갖춘 재사용 가능한 행동 계약으로 운영
- [UX System v2](docs/03-ux-system.md) — C5 실험에서 검증된 행동·상태·복구 계약을 보존한 선행 문서

첫 번째 실행 단위는 코드 구현이 아니라 `관찰 → 핵심 과업 정의 → 와이어프레임 → 사용성 검증`이다.

현재 디자인 시스템 검증용 구현 샘플:

- [Design Pack Adapter Lab](experiments/design-pack-adapter-lab/README.md) — UX System을 고정하고 USPS, Apple, Royal Mail 디자인 팩을 전환해 비교하는 인터랙티브 프로토타입
- [2026-08-25 Design System Tool Value Validation](experiments/design-system-value-validation-2026-08-25/README.md) — COMMON SURFACE 스킨케어·머천다이즈 브랜드의 다중 매체 유지관리와 독립 랜덤 음악 앱의 Flowchart→Low-fi→High-fi 파이프라인 가치를 수치화하는 실행 계획

추가 디자인팩 문서:

- [Design Pack Library](design-packs/README.md) — 현재 팩 목록, 상태 정의, 정본/파생물 운영 규칙
- [MD-first 실험 운영 가이드](design-packs/00-md-first-experiment-workflow.md) — 원본 등록부터 추출·투영·검수·승격까지의 반복 절차
- [상업용 Design Pack 작성 표준과 마스터 프롬프트](design-packs/00-commercial-design-pack-authoring-prompt.md) — Figma·웹·앱·사진·인쇄물 등 모든 입력을 권리·상태·접근성·운영 경계까지 갖춘 Markdown 정본으로 전환하는 공통 기준
- [Rasterline System](design-packs/rasterline-system/rasterline-system.md) · [Preview](design-packs/rasterline-system/preview.html) — 디더링·격자·운영형 레이블과 선형 UX를 결합한 Figma Make 기반 Markdown 디자인팩
- [Korean Commercial Design System](design-packs/korean-commercial-system/korean-commercial-system.md) · [Preview](design-packs/korean-commercial-system/preview.html) — 단청 색상·보자기 기하·한지 표면을 상업적 인터페이스 규칙으로 번역한 Figma Make 기반 Markdown 디자인팩
- [Industrial Swiss System](design-packs/industrial-swiss-system/industrial-swiss-system.md) · [Preview](design-packs/industrial-swiss-system/preview.html) — Swiss grid·workwear material·streetwear hierarchy를 상품·운영·물성·구매 흐름 계약까지 확장한 Figma Make 기반 Markdown 디자인팩
- [90s BMW System](design-packs/90s-bmw-system/90s-bmw-system.md) · [Preview](design-packs/90s-bmw-system/preview.html) — 90년대 독일 정밀공학·계기판·기술문서 문법을 매체별 표현 계약으로 확장한 Markdown 디자인팩
- [Royal Mail Service System](design-packs/royal-mail-system/royal-mail-system.md) · [Preview](design-packs/royal-mail-system/preview.html) — 적색·세리프·기관형 배송 추적 문법을 상태·서비스·복구 계약으로 번역한 Figma Make 기반 디자인팩
- [La Poste Civic Service System](design-packs/la-poste-system/la-poste-system.md) · [Preview](design-packs/la-poste-system/preview.html) — 황색·청색·현대 공공서비스 문법을 발송·추적·알림·회복 계약으로 번역한 Figma Make 기반 디자인팩
