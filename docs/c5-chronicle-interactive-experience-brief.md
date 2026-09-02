# C5 연대기 인터랙티브 경험 — 설계 브리프와 제작 프롬프트

> 상태: 제작 전 조사·설계 정본  
> 범위: 2026-08-10 ~ 2026-08-26의 C5 작업을, 실제 파일·검증 기록·일지에 근거해 한 페이지 HTML 경험으로 설명한다.  
> 목표: “무엇을 만들었나”보다 **어떻게 가설을 세우고, 무엇이 실패했고, 그 실패가 어떤 시스템 원칙을 낳았는가**를 누구나 따라갈 수 있게 만든다.

## 1. 한 문장 서사

**C5는 디자인을 더 많이 만드는 실험에서 시작해, 디자인이 UX의 의미를 바꾸지 않게 만드는 재사용 가능한 계약을 찾고, 이를 다시 하나의 인터랙티브 음악 앱으로 검증해 본 과정이다.**

## 2. 관객과 경험 목표

- **처음 보는 사람:** C5가 단순한 스타일 수집이 아니라, 실패를 통해 검증 규칙을 만든 프로젝트임을 3분 안에 이해한다.
- **디자이너/개발자:** `Product Binding → UX Preset → Design Pack → Projection → Evidence`가 왜 필요한지, 실제 실패 사례와 함께 이해한다.
- **BK 자신:** 어떤 산출물이 “예쁘다”를 넘어 어느 증거 수준까지 왔는지, 다음 실험이 무엇인지 빠르게 판단한다.

첫 화면의 질문은 한 가지다.

> **"같은 UX를 다른 디자인으로 바꾸면, 정말 같은 경험이 남을까?"**

## 3. 연대기 초안 — 각 장면의 주장과 증거

8/10~8/19에는 Vault 일지상 실질적인 C5 작업 근거가 없다. 이 구간은 페이지의 짧은 `기록 공백 — 이 연대기는 증거가 남은 8/20부터 시작한다` 표식으로 남긴다. 날짜는 파일·감사 문서·일지로 다시 대조한 뒤 확정한다. `성공`은 해당 산출물/실험의 성공이며, 제품 출시나 사람 대상 검증을 뜻하지 않는다.

| 장면 | 날짜 | 실제로 한 일 | 결과 / 실패 | 이 일이 남긴 의미 | 우선 사용할 증거 |
| --- | --- | --- | --- | --- | --- |
| 0. 출발점 | 8/20 | 한 시각 Design Pack과 UX preset을 결합해 목표 적합한 결과를 낼 수 있는지 검증하는 쪽으로 C5 범위를 전환. 제품 제작은 웹형 UX/UI 샘플 검증 뒤로 미룸 | 당시 일지의 검증란은 미기록 | 화면 제작보다 먼저 무엇을 고정하고 무엇을 변형할지 정해야 했다 | Vault `2026-08-20.md` 501–535, `docs/00-ux-ui-learning-plan.md` |
| 1. Figma Make에서 발견한 가능성 | 8/20 | UX System / Experience Composer / Adapter Reference / Commercial Design System 공개 미리보기를 관찰·감사 | Composer에는 goal/context 입력과 preset 선택 규칙이 부족했고, 디자인 시스템의 상태 커버리지는 미검증 | 좋은 Figma 화면은 출발점이지 런타임 증거가 아니다 | `artifacts/figma-make-system-audit/*.png`, `audit.md` |
| 2. 첫 반증: 테마 교체는 번역이 아니었다 | 8/20 | USPS·Apple·Royal Mail을 같은 어댑터 실험에 적용 | 색·글꼴·radius만 바뀌고 grid/정보 밀도/컴포넌트 구조가 같았다 | Design Pack은 팔레트가 아니라 정보 구조와 컴포넌트 문법까지 바꿔야 한다 | `artifacts/design-pack-audit-2026-08-20/audit.md`, source/implementation 쌍 이미지 |
| 3. 프리셋을 ‘화면 공식’에서 ‘결정 방식’으로 | 8/21 | Industrial Swiss 워크숍 탐색/예약에서 Reserve·Compare·Plan을 시험 | profile이 CTA·문구만 바꾸고 비교/계획의 실제 결정 구조는 충분히 바꾸지 못함; 선택이 필터에 가려지는 결함 | UX Preset은 테마도, 카피도 아니다. 선택·검증·복구를 바꾸는 구조 계약이다 | `artifacts/reference-product-audit-2026-08-21/*`, `ux-presets/*.md` |
| 4. 작은 성공: 한 Pack, 세 가지 정보 구조 | 8/21 | Royal Mail에서 Reserve=상세/커밋, Compare=비교표, Plan=타임라인으로 다시 투영 | 구조적 분리는 보였지만 추천과 선택 불일치, 계획 복구의 거짓 상태 갱신이 남음 | 구조 변화만으로는 부족하다. 모든 추천·선택·충돌·결과는 하나의 상태 모델에서 나와야 한다 | `artifacts/royal-mail-profile-audit-2026-08-21/*`, `docs/03-ux-system.md` |
| 5. 계약의 정리 | 8/24 | UX System v2를 보존하고 UES와 `Reserve/Compare/Plan` 프리셋, 여러 MD-first Design Pack으로 재구성 | 완성된 제품이 아니라 experimental canonical foundation | 시각 표현과 UX 의미를 분리하고, 증거 수준도 분리하는 시스템이 생겼다 | `docs/04-universal-experience-system.md`, `ux-presets/`, `design-packs/` |
| 6. Figma Make → Rasterline → Markdown | 8/24 | Figma Make를 `get_design_context`와 iframe 관찰로 읽고, Rasterline System으로 이름·문서화·프리뷰화 | source resource 직접 읽기는 `Unknown resource`, iframe 최상위 selector는 timeout; 처음 여러 MD로 쪼갠 방식은 단일 정본 기대와 충돌 | Figma는 관찰 가능한 시각 원본, Markdown은 AI/개발/QA를 위한 계약 정본, HTML은 표현 검증 레이어다 | `design-packs/rasterline-system/rasterline-system.md`, `preview.html`, `runtime-evidence.md` |
| 7. 증거의 한계도 시스템에 넣기 | 8/25 | MD-first workflow와 디자인 시스템 가치 실험을 문서화 | scorecard 결과는 아직 `not started`; Preview/문서만으로 accessibility·runtime·상업 가치를 주장할 수 없음 | '미검증'은 빈칸이 아니라 다음 실험을 지시하는 데이터다 | `design-packs/00-md-first-experiment-workflow.md`, `experiments/design-system-value-validation-2026-08-25/` |
| 8. 다시 제품으로: Take 2 | 8/26 | 랜덤 음악 앱을 Product Binding → Reserve preset → Rasterline → Flowchart → Low-fi → High-fi로 투영 | 상호작용 HTML과 traceability는 확인. 실제 오디오·권리·모바일 보조기술·사람 대상 이해는 미검증 | 시스템의 가치는 완성 주장에 있지 않고, 경계를 지키며 한 번의 제품 투영을 가능하게 한 데 있다 | `experiments/take2-random-music-pipeline-2026-08-26/` |

## 4. 한 페이지 정보 구조와 상호작용

1. **Opening / 질문** — 전체 기간, 한 문장 서사, `탐험 시작`.
2. **Scroll-driven living timeline** — 가로 스크롤이나 슬라이드 넘김이 아닌, 한 방향으로 내려가는 세로 여정이다. 각 장면은 최소 한 화면 높이의 `chapter`이며, 스크롤 진입 시 날짜·단계명이 왼쪽 고정 진행 축에서 활성화된다. 본문은 `시도 → 마찰/결과 → 판단 → 남은 규칙` 순으로 순차 노출하고, 우측 증거 이미지는 그 장면에만 머문다. 장면 카드는 클릭·키보드로도 이동할 수 있지만, **스크롤만으로 전체 원인과 결과를 이해할 수 있어야 한다.**
3. **Failure → rule 변환기** — 실패 카드의 `무슨 일이었나 → 왜 문제가 되었나 → 이후 어떤 규칙으로 바뀌었나` 3단 전환. 최소 5개: 테마화, 가짜 profile 변화, 상태 불일치, Figma source 접근, 단일 파일 기대/로컬 서버 권한.
4. **Layer telescope** — `Product Binding / UX Preset / Design Pack / Projection / Evidence` 다섯 층을 클릭하면 같은 Take 2 앱에서 각 층이 무엇을 담당하는지 하이라이트한다. 층을 섞으면 경고 문구가 보인다.
5. **Artifact drawer** — 각 장면에서 실제 PNG/HTML/Markdown을 ‘증거’로 열 수 있다. 로컬 파일을 새 탭으로 직접 여는 대신, 페이지 안에는 축소 이미지와 짧은 캡션·신뢰도 라벨만 쓴다.
6. **Final verdict** — 3개의 확보된 것, 4개의 아직 모르는 것, 다음 실험 3개. ‘끝’이 아니라 근거 있는 다음 출발점으로 닫는다.

### 스크롤 연출 원칙

- 상단에는 `8/10 → 8/26`의 가는 고정 시간 축과 현재 날짜/장면명이 있다. 스크롤 위치에 따라 축의 진행선이 채워진다.
- 전환은 **앞 장면의 문제 문장**이 다음 장면의 질문으로 이어지게 한다. 예: `테마 교체는 번역이 아니었다`가 다음 장의 `그렇다면 무엇을 고정해야 하는가?`로 이어진다.
- 각 chapter의 첫 20~30%는 맥락, 중간은 증거, 마지막은 “그래서 다음에 바뀐 것”을 보여 준다. 즉 사용자는 내려갈수록 산출물 목록이 아니라 판단의 누적을 읽는다.
- 이미지·도표는 해당 chapter의 스크롤 구간에만 sticky로 유지하고, 다음 chapter에 들어가면 교체한다. 과도한 parallax·자동 재생·스크롤 납치는 금지한다.
- `prefers-reduced-motion`에서는 sticky/opacity 이동을 즉시 전환으로 바꾸며, 정보 순서와 진행 축은 그대로 유지한다.

### 상태 라벨

모든 주장에 하나만 붙인다: `OBSERVED`(소스에서 관찰), `BUILT`(파일/프로토타입 존재), `CHECKED`(테스트·감사 확인), `OPEN`(미검증), `REJECTED`(실패/폐기).  
색만으로 구분하지 않고 아이콘+텍스트+짧은 설명을 제공한다.

## 5. 제작 전 자료 수집 체크리스트

- [ ] BK-Vault 8/10~8/26 일지에서 해당 날짜의 대화/판단을 한 줄씩 추출하고, 파일 산출물과 충돌하면 파일/감사 기록을 우선한다.
- [ ] 8/10~8/19의 C5 근거가 없다는 사실도 보존한다. 후속 자료가 발견되기 전에는 회고용 문장으로 채워 넣지 않는다.
- [ ] 각 장면마다 `주장 1개`, `증거 1~2개`, `정직한 한계 1개`를 확보한다. 근거 없는 장면은 삭제하거나 `OPEN`으로 남긴다.
- [ ] 이미지 후보는 원본을 복제하지 않고, 아래 자산 중 12~18개만 큐레이션한다.
- [ ] 외부 브랜드 레퍼런스는 “연구/번역 실험”으로 표기한다. 실제 제휴·브랜드 사용·상업 권리를 암시하지 않는다.
- [ ] Figma Make는 source-of-truth/런타임을 주장하지 않는다. `관찰된 화면` 및 `편집 가능 구조`의 증거로만 쓴다.
- [ ] 현재 페이지가 링크하는 모든 HTML/PNG/MD의 존재 여부를 자동 점검한다.

### 우선 자산 묶음

- Figma Make 관찰: `artifacts/figma-make-system-audit/01-ux-system-overview.png` ~ `04-commercial-design-system-overview.png`
- 첫 실패 전/후: `artifacts/design-pack-audit-2026-08-20/01-source-usps.png`, `01-implementation-usps.png`, `03-source-royal.png`, `03-implementation-royal.png`
- 프리셋 실험: `artifacts/reference-product-audit-2026-08-21/02-compare-design.png`, `03-empty-state.png`
- 구조적 개선: `artifacts/royal-mail-profile-audit-2026-08-21/01-reserve.png` ~ `05-plan-resolved.png`
- Rasterline/최종 제품: `design-packs/rasterline-system/preview.html`, `experiments/take2-random-music-pipeline-2026-08-26/highfi/qa-desktop.png`, `qa-mobile.png`, `assets/pulse-grid.png`, `assets/relay-strike.png`

### 권장 시각 편집표 — 17개로 충분한 이유

각 이미지는 장식이 아니라 해당 판단의 `전/후`, `성공/한계`, 또는 `원칙/적용`을 보여 주는 증거다. 첫 구현에서는 아래 17개만 사용하고, 나머지 에셋은 drawer의 추가 근거로 둔다.

| 구간 | 핵심 이미지 | 읽히게 할 것 | 수 |
| --- | --- | --- | ---: |
| Figma Make의 가능성 | `01-ux-system-overview.png`, `02-ux-experience-composer.png`, `03-ux-adapter-reference.png`, `04-commercial-design-system-overview.png` | 시스템의 매력과 빠져 있던 context/preset 규칙 | 4 |
| 첫 실패 | `01-source-usps.png` ↔ `01-implementation-usps.png`, `03-source-royal.png` ↔ `03-implementation-royal.png` | 레퍼런스의 구조가 단순 테마에 머문 전/후 대비 | 4 |
| 프리셋의 반증 | `02-compare-design.png`, `03-empty-state.png` | 비교가 실제 비교 구조가 아니고 선택이 숨었던 문제 | 2 |
| 작은 성공과 남은 결함 | `01-reserve.png`, `03-compare.png`, `04-plan-conflict.png`, `05-plan-resolved.png` | Detail/Table/Timeline의 실제 분리와 상태 정합성 결함 | 4 |
| 다시 제품으로 | `pulse-grid.png`, `relay-strike.png`, `highfi/qa-desktop.png` | 추상 커버 자산이 아니라 최종 interactive projection까지 이어진 흐름 | 3 |

`Rasterline preview.html`은 정적 썸네일을 새로 만들기보다 해당 chapter의 작동 가능한 embedded/inline preview 또는 새 탭 링크로 쓴다. `men i trust` 및 이전 21-slide chronicle의 자산은 이 서사의 주 증거가 아니므로 기본 흐름에서는 제외하고, “이전 적용 사례” drawer에만 둔다. 이렇게 해야 이번 페이지가 포트폴리오 콜라주가 아니라 C5의 논증으로 남는다.

### Vault 대조 지점

- 8/20 범위 전환 및 첫 테마 실험의 반증: `/Users/bk/Documents/BK-Vault/06 작업 히스토리/2026-08-20.md` 501–535, 791–832, 972–983
- 8/21 Markdown 정본/Goal Profile/Royal Mail 재시도/상태 정합성: `/Users/bk/Documents/BK-Vault/06 작업 히스토리/2026-08-21.md` 1716–1738, 1805–1834, 1933–1960
- 8/24 Rasterline, 기존 연대기, UX Preset Registry: `/Users/bk/Documents/BK-Vault/06 작업 히스토리/2026-08-24.md` 2360, 3597–3650, 4103–4145
- 8/26 Track 1 회고: `/Users/bk/Documents/BK-Vault/06 작업 히스토리/2026-08-26.md` 1270–1298

Vault에 `검증: 미기록`으로 남은 항목은 `CHECKED`가 아니라 `BUILT` 또는 `판단/학습`으로 표기한다. 반대로 현재 C5 폴더의 테스트·감사·스크린샷은 원본을 읽고 별도로 확인한다.

## 6. HTML 제작용 마스터 프롬프트

아래 프롬프트는 자료 수집을 마친 뒤 실행한다. 모든 `[대괄호]`는 수집한 사실로 치환한다.

```text
Create one self-contained interactive HTML page named `presentations/c5-chronicle/index.html`.
Language: Korean. Audience: a smart visitor who has never seen C5. Do not require a build step, server, account, or external font/library.

Project: C5 is a chronological research-and-prototyping journey from 2026-08-10 to 2026-08-26. Its core question is: “If the visual Design Pack changes, can UX meaning remain intact?” The page must explain not only outputs but decisions, failed experiments, recovered principles, verified limits, and the next evidence needed.

Non-negotiable truth rules:
1. Use only the supplied evidence register. Never invent a user test, runtime capability, Figma source access, license, commercial approval, or production readiness.
2. Put one evidence-status label on every substantive claim: OBSERVED, BUILT, CHECKED, OPEN, or REJECTED. The label must be readable in text, not color alone.
3. Separate these layers everywhere: Product Binding (facts and context), UX Preset (decision/behavior policy), Design Pack (visual expression), Projection (artifact/fidelity), Evidence (what was actually checked).
4. Call a prototype or preview “interactive HTML” or “visual preview,” not a production app. Figma Make is observed/editable visual-source evidence, not runtime proof.
5. Keep third-party visual references labeled as research/translation experiments; do not imply partnership or rights.

Narrative beats, in order:
[INSERT THE EIGHT TIMELINE ROWS FROM THE APPROVED EVIDENCE REGISTER]

Interaction design:
- Opening asks the core question and has a clear “탐험 시작” button that scrolls to the timeline.
- Make the page fundamentally scroll-driven, not a deck or click-through dashboard. Use 9 full-height-or-near-full-height chronological chapters from 8/10–8/26, beginning with the evidence gap (8/10–8/19) and ending with Take 2. As each chapter enters the viewport, activate its date on a thin sticky progress rail and update an aria-live current-chapter label. Scrolling alone must reveal: What we tried → What happened → What we learned → Evidence → What remains open.
- Keep the progress rail visible on desktop and compact it into a top rail on mobile. Each date is also a keyboard-accessible button for direct navigation, but clicking is supplementary—not required for comprehension.
- Within each chapter, stage the content in reading order: context in the first third, artifact/evidence in the middle, and the resulting rule or next question in the final third. The last sentence of every chapter should create the question answered by the following chapter.
- Use sticky evidence media inside the active chapter and restrained IntersectionObserver-driven class changes; do not hijack scroll, auto-advance, or require complex pointer gestures.
- Include a “failure becomes rule” mode. At least five interactive cards transform a concrete failure into the resulting rule; use a short, visible cause → decision → consequence chain.
- Include an explorable five-layer telescope for Product Binding → UX Preset → Design Pack → Projection → Evidence, using the Take 2 random music app as the concrete example. Clicking a layer highlights only its responsibility and explains what it must not decide.
- Add an evidence drawer/gallery with 12–18 curated local assets. Each thumbnail has alt text, source path, date, and a one-sentence caption explaining why this artifact matters. Do not bury the story under a file browser.
- Finish with two equally prominent columns: “C5가 얻은 것” and “아직 증명하지 못한 것,” followed by a grounded next-experiment list.

Visual direction:
- Quiet Authority / Electric Edge, with Rasterline-inspired dark graphite surfaces, warm off-white text, acid-lime focus/accent, faint grid/scanline texture, restrained motion, and mono metadata paired with a clear Korean body font stack.
- The page should feel like a research instrument that gradually reveals a design system—not a generic startup landing page or an endless slide deck.
- Use motion only to show causality/transition; honor `prefers-reduced-motion` and provide a no-motion equivalent.
- Responsive from 390px upward; on mobile, keep the active timeline detail above the evidence gallery.
- Meet baseline accessibility: semantic landmarks, focus-visible styles, keyboard support, no color-only status, sufficient contrast for essential text, and informative alt text.

Implementation requirements:
- Single `index.html` with embedded CSS and JavaScript. Local assets may use relative paths; use only verified paths supplied in the register.
- No CDN, remote font, analytics, or network fetch.
- Persist only optional UI preferences (e.g. reduced-detail view) in localStorage; do not store user data.
- Add a compact “Evidence & limits” footer explaining the status-label vocabulary.
- Add readable comments marking the timeline data array and asset manifest so the record can be updated later.

Before delivery, verify: the file opens without a build step; every asset path resolves; timeline buttons work via mouse and keyboard; the failure cards and layer telescope change visible content; the page is usable at desktop and 390px; and no claim exceeds its evidence label.
```

## 7. 제작 순서

1. Vault 일지와 C5 파일을 대조해 위 타임라인의 날짜·문장을 확정한다.
2. 각 장면의 증거 레지스터(경로, 캡션, 상태 라벨, 사용 허용 여부)를 JSON 또는 HTML data array로 고정한다.
3. 텍스트만으로 timeline → failure cards → layer telescope의 정보 구조를 먼저 구현한다.
4. 자산 12~18개를 추가하고, 캡션이 서사에 기여하지 않는 이미지는 제외한다.
5. 데스크톱/390px, 키보드, reduced-motion, 자산 경로를 검증한다.
6. 마지막으로 “검증됨”과 “아직 모름” 문장을 감사 문서와 다시 대조한다.

## 8. 완료 기준

- 방문자가 3분 안에 C5의 질문, 2개의 실패, 2개의 작은 성공, 현재 한계를 설명할 수 있다.
- 모든 시간대 카드가 적어도 하나의 실제 파일 또는 Vault 기록으로 연결된다.
- 아름다운 결과물보다, 실패가 어떻게 재사용 가능한 규칙으로 바뀌었는지가 더 기억에 남는다.
- 단일 HTML은 표현물이며, 그 안의 모든 검증 주장은 원래 증거 문서의 범위를 넘지 않는다.
