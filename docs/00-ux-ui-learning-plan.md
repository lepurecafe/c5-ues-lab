# C5 랜덤 비트 메이커 — AI 활용 UX/UI 학습 및 제작 계획

> 상태: 실행 계획 v0.1  
> 작성일: 2026-08-07  
> 프로젝트 성격: C5 개인 챌린지  
> 최종 방향: 댄스배틀·랩배틀 현장에서 DJ 대신 사용할 수 있는 랜덤 비트 메이커의 UX/UI를 설계하며, AI와 함께 반복 가능한 디자인 방법을 익힌다.

## 1. 이 챌린지의 진짜 목표

이번 목표는 예쁜 화면 한 장을 만드는 것이 아니다. 다음 능력을 실제 산출물로 증명하는 것이 목표다.

1. 사용 환경과 핵심 과업을 근거로 UX 구조를 설계한다.
2. 설명을 거의 읽지 않아도 전체 목적과 현재 상태를 이해할 수 있는 UI를 만든다.
3. AI를 리서치, 발산, 비평, Figma 제작, QA에 역할별로 사용한다.
4. 결과를 Figma에서 사람이 계속 수정할 수 있는 구조로 남긴다.
5. 이번에 만든 프롬프트, 체크리스트, 화면 계약, 토큰을 다음 프로젝트에도 재사용한다.

### 성공 문장

처음 보는 사용자가 별도 설명 없이 앱을 열고 30초 안에 첫 비트를 재생하며, 배틀 도중에는 현재 상태를 한눈에 파악하고 다음 비트로 안전하게 전환할 수 있다. 모든 핵심 화면은 Figma의 Auto Layout, Variables, Components로 편집 가능하며 설계 결정과 검증 근거가 문서로 남는다.

## 2. 제품 가설과 초기 범위

### 핵심 사용자

- 1차: 전문 DJ 없이 댄스·랩 배틀을 진행하는 호스트 또는 진행자
- 2차: 연습 세션에서 즉시 랜덤 비트가 필요한 댄서·래퍼

### 사용 환경

- 시끄럽고 어두울 수 있는 현장
- 한 손 조작, 짧은 시선 체류, 실수 복구가 중요함
- 음악이 멈추거나 잘못 전환되는 순간의 비용이 큼
- 기능 탐색보다 `재생 중 상태`와 `다음 행동`이 우선함

### 첫 MVP가 답해야 할 질문

`어떤 비트를 틀까?`를 고민하지 않고도 적절한 비트를 즉시 재생하고, 라운드가 끝날 때까지 흐름을 끊지 않을 수 있는가?

### P0 핵심 과업

1. 앱을 열고 바로 랜덤 비트를 시작한다.
2. 재생 중 BPM, 장르/무드, 남은 시간 또는 라운드 상태를 확인한다.
3. 다음 비트를 미리 확인하거나 즉시 넘긴다.
4. 일시정지·재개·종료를 실수 없이 수행한다.
5. 배틀 형식에 맞는 최소 설정을 바꾼다.

### 초기 비목표

- DAW 수준의 편집, 믹싱, 이펙터
- 복잡한 플레이리스트 관리
- 계정, 소셜 피드, 크리에이터 마켓
- AI가 매 순간 새 음원을 생성하는 기술 구현
- 완전한 브랜드 시스템 또는 모든 플랫폼 대응

음원 생성 기술 자체는 UX 학습과 분리하되, 재생 구조와 권리 조건은 제품 구조에 포함한다. 현재 권장안은 [음원 소스 및 재생 전략](01-audio-source-and-playback-strategy.md)을 따른다.

### 시작 전에 확정할 제품 결정

현재는 플랫폼, 오디오 출력 방식, 진행자의 양손 사용 가능 여부가 미정이다. Sprint 0에서 다음을 결정 로그로 고정한다.

- Primary form factor: iPhone portrait / iPhone landscape / iPad / desktop 중 하나
- 진행자가 앱만 조작하는지, 마이크·타이머·무대 진행을 동시에 하는지
- 음원이 즉시 전환되는지, 현재 비트 종료 후 전환되는지
- random의 범위: 전체 / BPM / 장르 / 에너지 / 즐겨찾기 pool
- 예측 가능성 장치: next cue, lock, hold, reroll, undo 중 무엇이 필요한지
- 오디오 출력·네트워크 오류가 발생했을 때 안전한 기본 상태

## 3. 핵심 UX 원칙

### 3.1 Zero-explanation core

첫 화면은 제품 설명보다 `랜덤 비트 시작`이라는 핵심 행동을 먼저 보여준다. 온보딩은 긴 슬라이드가 아니라 최초 사용 시 필요한 설정만 받고, 나머지는 실제 조작 순간에 짧게 드러낸다.

### 3.2 Performance mode first

재생 중 화면은 탐색 화면이 아니라 공연용 컨트롤러다. 핵심 상태, 주 행동, 위험 행동의 시각적 위계를 고정한다.

### 3.3 Recognition over recall

사용자가 기능이나 설정을 기억하게 하지 않는다. 현재 선택, 다음 비트, 전환 결과, 비활성화 이유를 화면에 직접 보여준다.

### 3.4 Error prevention and recovery

종료, 즉시 스킵처럼 흐름을 끊는 행동은 우발 터치를 막고 되돌릴 수 있게 한다. 반대로 재생·다음 비트처럼 빈도가 높은 행동은 빠르게 실행할 수 있어야 한다.

### 3.5 Progressive disclosure

BPM 범위, 장르, 라운드 길이 같은 설정은 기본값으로 즉시 시작할 수 있게 하고, 세부 제어는 필요할 때만 펼친다.

### 3.6 Explain the choice

랜덤 결과만 보여주지 말고 왜 이 비트가 선택되었는지 이해 가능한 단서를 준다. 예: `92 BPM · Boom bap · 60초 라운드에 적합`. 기능의 존재보다 선택 이유가 보여야 사용자가 시스템을 신뢰한다.

## 4. 학습 구조: 여섯 개의 스프린트

기간은 고정 주차보다 각 스프린트의 통과 조건으로 관리한다. 한 스프린트는 1~3회의 집중 세션을 권장한다.

학습 순서는 다음 축을 따른다.

```text
Mental Model → Conceptual Model → Information Architecture → OOUX
→ Discoverability → Information Scent → Wayfinding → Progressive Disclosure
→ Contextual Onboarding → Time to Value → Cognitive Walkthrough → Comprehension Testing
```

화면을 단순하게 보이게 만드는 것보다 사용자의 머릿속 구조와 제품의 실제 상태 구조를 먼저 맞추는 순서다.

### Sprint 0 — 문제와 현장 이해

학습 주제:

- 사용자 목표, 맥락, 제약, 실패 비용
- 사용자 인터뷰와 관찰을 AI로 정리하는 방법
- 가설과 사실을 분리하는 방법

활동:

- 댄스배틀·랩배틀 진행자 또는 참가자 3~5명에게 짧은 인터뷰
- 실제 배틀 영상 3개를 보며 `비트 선택 → 재생 → 전환 → 종료` 행동 기록
- 경쟁/유사 도구 5개 이내를 같은 과업 기준으로 비교
- 내부 선례를 서로 다른 목적의 레퍼런스로 비교
  - `Synth 02`: 많은 음악 파라미터를 한 화면의 신호 흐름으로 설명하는 방법
  - `HAND//BEAT`: 플레이 중 설명을 줄이면서 상태와 타이밍을 중복 부호로 보여주는 방법
  - `C4 Figma lo-fi`: AI 생성물을 편집 가능한 Figma 구조로 남기는 방법과 library import 제약
  - `RapWar`: 선택 가능한 기능보다 선택 이유와 결과의 가시성이 중요했던 사례
- AI에게 요약을 맡기되, 원문 발언과 관찰 증거를 함께 보존

산출물:

- `01-research-plan.md`
- `02-observation-notes.md`
- `03-user-problem-map.md`
- 사실 / 해석 / 가설 표

통과 조건:

- 핵심 사용자 1명, 핵심 상황 1개, P0 과업 5개 이하가 문장으로 확정됨
- `있으면 좋음`과 `현장에서 실패하면 안 됨`이 구분됨

### Sprint 1 — 정보 구조와 최소 온보딩

학습 주제:

- Task flow, information architecture, mental model
- 온보딩이 아니라 제품 자체가 설명하게 만드는 방법

활동:

- 핵심 과업을 `진입 → 준비 → 재생 → 전환 → 종료/복구`로 모델링
- 첫 사용자와 반복 사용자의 경로를 분리
- 기능 목록을 화면 목록으로 바로 바꾸지 않고 상태와 의사결정으로 변환
- 종이 또는 FigJam 수준의 저해상도 흐름 3안 비교

산출물:

- 한 장짜리 Experience Map
- First-run / Repeat-use flow
- 상태 모델: idle, ready, playing, paused, transition, ended, error
- 온보딩 제거 테스트: 안내 문구를 가린 상태에서도 과업이 가능한지 확인

통과 조건:

- 첫 비트 재생까지 3개 이하의 사용자 행동
- 핵심 과업을 막는 사전 가입·설정 없음
- 각 상태에서 `지금 무엇이 일어나고 있는가`와 `다음에 무엇을 할 수 있는가`가 하나의 화면에서 답해짐

### Sprint 2 — AI 와이어프레임과 구조 비교

학습 주제:

- AI를 정답 생성기가 아니라 대안 생성기와 비평가로 사용하는 법
- 저해상도에서 정보 위계와 상호작용을 먼저 검증하는 법

활동:

- 동일한 요구사항으로 서로 다른 정보 구조 3안 생성
- 각 안을 `즉시성`, `상태 가시성`, `오조작 위험`, `학습 비용`으로 평가
- 선택한 한 안만 Figma wireframe으로 정리
- Happy path뿐 아니라 pause, skip, no audio, permission failure 상태 포함

Figma 산출물:

- `00 Cover & Decisions`
- `01 User Flow`
- `02 Lo-fi Options`
- `03 Selected Wireframe`
- 클릭 가능한 핵심 과업 프로토타입

통과 조건:

- 완성도보다 구조가 다른 3안이 존재함
- 선택 이유와 버린 이유가 기록됨
- 5명 내외의 짧은 과업 테스트에서 첫 재생 성공률 80% 이상
- Figma 연결 권한, Variables/Components 생성, library import 가능 여부를 이 단계에서 작은 샌드박스로 확인

### Sprint 3 — UI와 라이브 퍼포먼스 디자인 시스템

학습 주제:

- Foundation → semantic token → component → pattern 구조
- 색, 타입, 간격, 상태, 모션, 접근성의 시스템화
- 기존 시스템을 제품 맥락에 맞게 확장하는 법

전략:

- 기존 `BK Character Design System`의 구조·가독성·접근성 원칙을 기준선으로 사용
- `Quiet Authority / Electric Edge`의 시각 스타일을 그대로 복제할지는 레퍼런스·사용성 검증 뒤 결정
- 랜덤 비트 메이커 전용 확장은 별도 namespace로 격리
- 기존 BKDS나 `GYEOL`의 정본 token, release chain을 직접 수정하지 않음

우선 만들 토큰:

- Semantic color: surface, content, action, focus, warning, destructive
- Playback state: idle, armed, playing, paused, transitioning, failed
- Spacing과 최소 터치 영역
- Type role: status, timer, control label, metadata, helper
- Motion: play transition, next cue, error feedback, reduced-motion 대체

우선 만들 컴포넌트:

- Primary transport control
- Current beat status panel
- Next beat cue
- BPM / genre / mood filter chip
- Lock / hold / reroll control
- Round timer
- Destructive stop confirmation
- Empty, loading, audio failure state

통과 조건:

- Figma Variables와 Components로 주요 화면을 재구성할 수 있음
- 색상값이 아니라 semantic role로 상태를 표현함
- 색만으로 재생 상태를 구분하지 않음
- 큰 글자, 고대비, reduced motion 조건을 포함한 접근성 검토가 있음

### Sprint 4 — 고해상도 프로토타입과 사용성 검증

학습 주제:

- 시각적 완성도와 조작 효율의 균형
- 실제 소음·조명·시간 압박을 반영한 테스트
- AI 디자인 비평을 사람 테스트의 보조로 사용하는 방법

활동:

- 선택한 wireframe을 고해상도 Figma prototype으로 발전
- AI에게 휴리스틱, 접근성, 일관성 검토를 각각 독립 요청
- 사용자에게 기능을 설명하지 않고 과업 수행을 관찰
- 일반 환경과 `소음 + 어두움 + 시간 압박` 환경을 나눠 테스트
- Figma에서 증명할 수 없는 오디오 타이밍, press-and-hold, haptic, 전환 상태는 얇은 동작 프로토타입으로 별도 검증

핵심 측정값:

| 지표 | 목표 |
| --- | ---: |
| 첫 비트 재생 성공률 | 90% 이상 |
| 첫 비트 재생 시간 | 30초 이하 |
| 반복 사용자의 재생 시작 | 10초 이하 |
| 핵심 과업 오류 없는 완료 | 80% 이상 |
| 위험 행동의 우발 실행 | 0회 |
| 현재 재생 상태 식별 | 2초 이내 |
| System Usability Scale | 75 이상을 목표로 관찰 |

통과 조건:

- 가장 큰 문제 3개가 관찰 증거와 함께 기록됨
- 수정 전/후 프로토타입과 판단 근거가 남음
- 테스트 참가자의 말보다 실제 행동을 우선해 결론을 냄

### Sprint 5 — 재사용 도구와 최종 회고

학습 주제:

- 일회성 산출물을 반복 가능한 작업 시스템으로 바꾸는 법
- 프로젝트 전용 규칙과 범용 규칙을 구분하는 법

만들 도구:

- `UX Experiment Card`: 가설, 과업, 참가자, 관찰, 결정 템플릿
- `Figma Screen Contract`: 화면 목적, 입력, 상태, 행동, 접근성, 완료 기준
- `AI UX Critic Prompt`: 휴리스틱·접근성·정보 위계를 분리해 평가하는 프롬프트
- `Reference Extraction Worksheet`: 레퍼런스에서 취향이 아니라 규칙을 추출하는 양식
- `Design QA Checklist`: Auto Layout, component, token, contrast, state, copy, prototype 검사
- 필요성이 3회 이상 반복된 작업만 Codex skill 또는 자동화 preset 후보로 승격

최종 산출물:

- 편집 가능한 Figma 파일
- 핵심 과업 프로토타입
- 디자인 결정 로그
- 사용자 테스트 보고서
- Random Beat Maker UI kit v0.1
- 재사용 템플릿과 프롬프트 묶음
- `무엇을 AI가 잘했고, 어디서 사람 판단이 필요했는가` 회고

통과 조건:

- 새 프로젝트에서 템플릿 하나를 실제로 재사용해 봄
- 프로젝트 전용 토큰과 범용 도구가 분리됨
- Figma 산출물을 다른 사람이 열어 수정할 수 있음
- skill에는 검증된 절차만 넣고, 아직 검증하지 않은 미적 취향이나 제품 가설은 넣지 않음

## 5. Figma 파일 구조와 편집 가능성 계약

Figma는 스크린샷 저장소가 아니라 설계 정본으로 운영한다.

```text
00 Cover & Decision Log
01 Research Evidence
02 User Flow & State Model
03 Lo-fi Alternatives
04 Selected Wireframes
05 Foundations
06 Components
07 Patterns
08 Hi-fi Screens
09 Prototype
10 Usability Test Archive
99 Scratch
```

편집 가능성 기준:

- 주요 레이아웃은 Auto Layout 사용
- 색·간격·반경·타입·상태는 Variables 또는 Styles로 연결
- 반복 요소는 Component / Variant로 구성
- component property 이름은 역할을 설명함
- 화면 이름은 `FLOW-STATE-VARIANT` 형식으로 일관되게 작성
- 결정된 화면과 실험 중 화면을 페이지 또는 section으로 분리
- 플러그인/API로 생성한 노드도 사람이 이해할 수 있는 이름과 계층을 가짐
- 각 핵심 화면에 목적, 진입 조건, 주요 행동, 예외 상태를 짧게 기록

## 6. AI 활용 운영 방식

### 역할 분리

| 단계 | AI 역할 | 사람이 책임질 것 |
| --- | --- | --- |
| 리서치 | 자료 수집, 인터뷰 요약, 패턴 후보 추출 | 질문 설계, 출처 확인, 해석 승인 |
| 구조 설계 | task flow 대안, 누락 상태 탐색 | 핵심 과업과 우선순위 결정 |
| 와이어프레임 | 서로 다른 3안 생성, 장단점 비교 | 선택 기준과 최종 방향 결정 |
| UI 시스템 | token/component 초안, naming 점검 | 브랜드 의미, 플랫폼 적합성, 접근성 승인 |
| Figma | frame/component/variable 생성 보조 | 구조 검수와 최종 편집 |
| QA | 휴리스틱, 대비, 일관성, 누락 상태 탐지 | 실제 사용자 행동 관찰과 수정 결정 |

### 한 사이클의 기본 프롬프트 구조

```text
Context: 사용자, 환경, 기기, 현재 화면
Goal: 사용자가 완료해야 할 단일 과업
Constraints: 시간, 소음, 한 손 조작, 실수 비용, 접근성
Evidence: 인터뷰·관찰·기존 테스트 결과
Request: 생성 / 비교 / 비평 중 하나만 요청
Output contract: 표, flow, Figma 구조 등 원하는 형식
Evaluation: 성공 지표와 금지사항
```

### AI 사용 규칙

- 한 번에 생성과 평가를 동시에 맡기지 않는다.
- 같은 AI의 첫 결과를 기준안으로 확정하지 않는다.
- 시각안은 정확히 3개 방향을 비교한 뒤 하나를 선택한다.
- 레퍼런스에서 보이는 UI를 그대로 복제하기보다 어떤 문제를 어떤 규칙으로 해결했는지 추출한다.
- AI가 만든 근거 없는 사용자 발언이나 통계를 사용하지 않는다.
- 사람 사용성 테스트를 AI 평가로 대체하지 않는다.
- Figma 자동 생성 후 반드시 계층, 이름, Auto Layout, component 연결을 사람이 검수한다.

## 7. 디자인 시스템을 다루는 학습 전략

이번 프로젝트에서는 `새 디자인 시스템 완성`을 먼저 목표로 삼지 않는다. 한 제품의 반복 문제를 해결하며 필요한 시스템을 추출한다.

```text
현장 문제
  → 화면 상태와 상호작용 패턴
  → 반복되는 component
  → semantic token
  → 문서화된 규칙
  → 다른 화면에서 재사용 검증
```

승격 규칙:

- 한 번만 등장하면 화면 로컬 스타일
- 두 번 등장하면 component 후보
- 세 번 이상 같은 의미로 반복되면 system component/token 후보
- 다른 프로젝트에서도 유효하면 범용 preset/skill 후보

이 방식으로 과도한 시스템 구축을 피하면서도 실제 사용 근거가 있는 디자인 시스템을 만든다.

## 8. 권장 화면 세트 v0

와이어프레임 단계에서 최소 다음 상태를 다룬다.

1. First launch — 즉시 시작과 선택적 기본 설정
2. Ready — 현재 랜덤 조건 확인
3. Playing — 현재 비트, 라운드, 핵심 transport
4. Next cue — 다음 비트 미리보기와 전환
5. Paused — 일시정지 이유와 복귀 행동
6. End round — 다시 시작, 다음 라운드, 세션 종료
7. Quick settings — BPM/장르/무드/라운드 길이
8. Audio unavailable — 출력 장치 또는 음원 오류와 복구

초기 IA는 화면 수를 늘리는 대신 `Ready / Playing` 두 상태를 제품의 중심으로 삼는다.

## 9. 주요 검증 질문

### 이해

- 첫 화면만 보고 이 앱의 목적을 한 문장으로 말할 수 있는가?
- 지금 재생 중인지, 멈췄는지, 다음 전환을 기다리는지 2초 안에 구분하는가?
- 랜덤 결과가 어떤 조건에서 선택되었는지 이해하는가?

### 효율

- 최초 사용과 반복 사용 모두 불필요한 설정 없이 시작 가능한가?
- 가장 자주 쓰는 행동의 터치 수와 시선 이동이 최소인가?
- 다음 비트를 준비하면서 현재 재생을 방해하지 않는가?

### 안전

- 잘못 눌러도 음악이 갑자기 끊기지 않는가?
- 위험 행동과 빈번한 행동의 위치·형태가 구별되는가?
- 오류가 발생했을 때 원인과 복구 행동이 함께 보이는가?

### 현장성

- 큰 소리, 낮은 조도, 흔들리는 손에서도 조작 가능한가?
- 네트워크가 불안정하거나 화면을 잠깐 놓쳐도 상태를 복구할 수 있는가?
- 진행자가 관객을 보면서 짧게 확인해도 충분한가?

### 학습 평가 도구

- 구조 이해: Card Sorting, Tree Testing, Teach-back, Comprehension Testing
- 첫 진입: First-click Testing, Time to First Value
- 조작 효율: Task Completion Rate, Time on Task, Error Rate, Interaction Count
- 인지·행동 분석: Cognitive Walkthrough, KLM 또는 PURE
- 주관 평가: SEQ, SUS 또는 UMUX-Lite 중 프로젝트 규모에 맞는 하나

## 10. 완료 정의

다음을 모두 충족하면 이번 C5 학습 목표를 완료한 것으로 본다.

- 문제 정의와 핵심 사용자·환경이 관찰 근거와 연결됨
- 첫 비트 재생까지의 최소 흐름과 전체 상태 모델이 문서화됨
- 구조가 다른 lo-fi 3안과 선택 근거가 남음
- 편집 가능한 Figma component/variable 기반 hi-fi prototype이 있음
- 핵심 과업과 오류 상태가 클릭 가능한 prototype에서 동작함
- 최소 5명의 사용자 테스트 결과와 수정 전후 기록이 있음
- 접근성·현장성·오조작 방지 QA를 통과함
- 디자인 결정 로그와 reusable kit가 함께 남음
- AI의 기여와 한계에 대한 회고가 있음

## 11. 바로 시작할 첫 작업

첫 번째 세션에서는 Figma를 바로 그리지 않는다. 먼저 `한 경기에서 비트가 필요한 순간`을 15~20분 단위로 재구성한다.

1. 진행자 관점의 실제 배틀 흐름을 시간순으로 적는다.
2. 각 순간에 필요한 정보, 행동, 실패를 표시한다.
3. 가장 중요한 장면 하나를 선택한다.
4. 그 장면의 `사용자 / 환경 / 목표 / 제약 / 성공 기준`을 한 장짜리 brief로 만든다.
5. 이 brief가 확정되면 동일 조건의 lo-fi 3안을 AI로 생성한다.

첫 학습 질문은 이것이다.

> 진행자가 관객과 참가자를 보면서도 단 한 번의 짧은 시선으로 확인해야 하는 정보는 무엇인가?
