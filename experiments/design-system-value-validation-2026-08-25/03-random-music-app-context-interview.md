# Track 2 시작 전 질답 — 랜덤 음악 재생 앱

> **상태:** unanswered  
> **목적:** 이전 대화의 맥락을 자동으로 확정 사실로 취급하지 않고, Flowchart를 만들기 전에 Product Binding·UX Preset·데이터/권리 경계를 사용자와 함께 동결한다.

이 질답은 Track 1 COMMON SURFACE 스킨케어 브랜드와 독립적이다. Track 1의 Pack, Preset, Brand Experience Profile을 자동 상속하지 않는다.

## 진행 방식

- 한 번에 3–5개의 짧은 질문으로 진행한다.
- 기존 문서에서 발견한 내용은 `제안값`으로만 제시하고 사용자가 확인해야 `확정`이 된다.
- 모르는 항목은 추정하지 않고 `미확정`, `실험 가정`, `범위 밖` 중 하나로 분류한다.
- 아래 필수 질문이 끝나기 전에는 Flowchart를 제작하지 않는다.

## A. 사용자와 성공

| ID | 질문 | 답변 | 상태 |
| --- | --- | --- | --- |
| Q-A1 | 이 앱을 가장 먼저 쓰는 사람은 누구인가? DJ, 행사 진행자, 배틀 운영자, 개인 청취자 중 어디에 가까운가? | — | unanswered |
| Q-A2 | 어떤 장소·소음·조명·시간 압박에서 쓰는가? | — | unanswered |
| Q-A3 | 사용자가 앱을 연 뒤 가장 빨리 달성해야 하는 결과는 무엇인가? | — | unanswered |
| Q-A4 | 성공을 무엇으로 확인하는가? 실제 소리, Playing 상태, 곡 정보, 다음 큐 중 무엇이 필수인가? | — | unanswered |
| Q-A5 | 실패했을 때 가장 큰 비용은 무엇인가? 침묵, 잘못된 곡, 반복, 지연, 중단 중 우선순위는? | — | unanswered |

## B. 랜덤과 음악 모델

| ID | 질문 | 답변 | 상태 |
| --- | --- | --- | --- |
| Q-B1 | 랜덤 선택 단위는 완성곡, loop, stem 조합, 구간 중 무엇인가? | — | unanswered |
| Q-B2 | 사용자가 랜덤 전에 정하는 조건은 무엇인가? BPM, 장르, 에너지, 길이, explicit 여부 등 | — | unanswered |
| Q-B3 | 최근 재생 반복 방지, seed, 공정성, 수동 제외 규칙이 필요한가? | — | unanswered |
| Q-B4 | 한 곡 즉시 재생인가, 다음 곡 queue인가, 여러 라운드 계획인가? | — | unanswered |
| Q-B5 | ‘랜덤 추천’과 사용자가 최종 선택한 곡을 어떻게 구분할 것인가? | — | unanswered |

## C. 재생과 커밋

| ID | 질문 | 답변 | 상태 |
| --- | --- | --- | --- |
| Q-C1 | 곡이 선택되면 즉시 재생되는가, 사용자가 Start를 눌러야 하는가? | — | unanswered |
| Q-C2 | Next, Skip, Stop, Hold, Undo, crossfade 가운데 필요한 행동은 무엇인가? | — | unanswered |
| Q-C3 | 실수 방지가 필요한 고비용 행동은 무엇인가? | — | unanswered |
| Q-C4 | 재생 중 조건 변경은 현재 곡과 다음 곡에 각각 어떻게 적용되는가? | — | unanswered |
| Q-C5 | 중복 탭·재시도·앱 재개 시 재생 side effect를 어떻게 막는가? | — | unanswered |

## D. 음원·권리·기술 경계

| ID | 질문 | 답변 | 상태 |
| --- | --- | --- | --- |
| Q-D1 | 음원은 로컬 권리 확보 pack, 사용자가 가져온 파일, 생성 음악, 외부 서비스 중 무엇인가? | — | unanswered |
| Q-D2 | 오프라인 동작은 필수인가? 네트워크가 없어도 어떤 기능까지 동작해야 하는가? | — | unanswered |
| Q-D3 | 실제 음악 재생을 구현할 것인가, synthetic prototype으로 상태만 검증할 것인가? | — | unanswered |
| Q-D4 | 타깃 플랫폼은 iOS, 웹, macOS, 기타 중 무엇인가? | — | unanswered |
| Q-D5 | 오디오 출력 route·권한·파일 오류 시 안전 기본값은 무엇인가? | — | unanswered |

## E. 범위와 평가

| ID | 질문 | 답변 | 상태 |
| --- | --- | --- | --- |
| Q-E1 | 오늘 High-fi는 정적 화면, 클릭 가능한 HTML, 실제 오디오 prototype 중 어디까지인가? | — | unanswered |
| Q-E2 | 반드시 포함할 화면/상태와 제외할 기능은 무엇인가? | — | unanswered |
| Q-E3 | 테스트할 viewport·기기·입력 방식은 무엇인가? | — | unanswered |
| Q-E4 | 첫 재생 시간, 반복 재생 시간, 오류 복구 시간 등 수치 목표를 둘 것인가? | — | unanswered |
| Q-E5 | 오늘 결과를 누가 평가하며, 사용자의 최종 승인 단계를 어디에 둘 것인가? | — | unanswered |
| Q-E6 | 기존 여섯 Design Pack 중 어떤 Pack/version을 사용할 것인가? 한 개를 주 적용 대상으로 고정할 것인가? | — | unanswered |
| Q-E7 | `Reserve`, `Compare`, `Plan` 중 어떤 기존 Preset이 실제 목표 구조와 맞는가? | — | unanswered |
| Q-E8 | 이 앱에 별도 브랜드/Brand Experience Profile이 필요한가, 아니면 이번 실험은 `none`과 local-neutral 표현으로 진행할 것인가? | — | unanswered |

## F. Brand and experience — E8이 `needed`일 때 필수

E8이 `none`이면 Q-F1–F5를 `not-applicable`로 닫고 이유를 남긴다. 브랜드가 없어도 과업·신뢰·안전 원칙은 Product Binding에 기록한다.

| ID | 질문 | 답변 | 상태 |
| --- | --- | --- | --- |
| Q-F1 | 이 앱의 브랜드 약속과 사용자가 느껴야 할 경험은 무엇인가? | — | conditional |
| Q-F2 | 어떤 태도·문화·사용자를 존중하고, 어떤 이미지·언어·행동을 금지할 것인가? | — | conditional |
| Q-F3 | voice, motion, sound feedback, visual intensity가 Ready·Playing·error·recovery에서 어떻게 달라져야 하는가? | — | conditional |
| Q-F4 | 추천 이유, 랜덤성, 권리, Playing 증거, 실패를 어떤 신뢰 원칙으로 설명할 것인가? | — | conditional |
| Q-F5 | 선택한 Design Pack을 그대로 쓰는가, 별도 app Brand Application이 필요한가? 필요한 adaptation과 금지 override는 무엇인가? | — | conditional |

## 질답 완료 후 생성할 동결 문서

- [ ] Product Binding ID/version
- [ ] 기존 Design Pack ID/version과 선택 이유
- [ ] 기존 UX Preset 선택과 선택하지 않은 대안의 이유
- [ ] Track 2 전용 Brand Application/Profile ID/version 또는 명시적 `none`
- [ ] 브랜드가 있으면 약속·voice·interaction/sound·trust·금지 패턴, 없으면 local product experience principles
- [ ] 객체·상태·전이·authority vocabulary
- [ ] Product/rights/data/technical boundaries
- [ ] Back/Cancel/Retry/Resume/Exit retention
- [ ] Stable Step ID와 state set
- [ ] Composition Manifest revision
- [ ] scope, non-goals, evidence ceiling

## 시작 게이트

다음 조건을 모두 충족해야 Flowchart로 진행한다.

- Q-A1–A5, Q-B1–B5, Q-C1–C5, Q-D1–D5가 `confirmed` 또는 명시적 `experiment-assumption`;
- UX Preset과 primary commitment가 확정;
- 음원 권리·외부 서비스·실제 재생 여부가 명확;
- 기존 Design Pack/UX Preset ID와 버전이 고정되고 호환성 초안이 있음;
- Brand Application/Profile 유무가 결정되고 Track 1과 독립임을 manifest에 기록;
- E8이 `needed`이면 Q-F1–F5 확정, `none`이면 모두 `not-applicable`과 이유 기록;
- failure cost와 안전 기본값이 확정;
- 오늘의 High-fi 및 검증 범위가 확정;
- 미확정 항목이 Flow 구조를 바꾸지 않는다는 검토 완료.
