# Take 2 — 실험 계획

> 상태: **사용자 검토·구현·CR-01 변경·최종 평가 완료. 최종 판정 `8.6/10 · E2 · C2`.**
>
> 목표: 예쁜 단일 시안을 평가하지 않고, 선택한 Markdown Design Pack·UX Preset·Product Binding의 분리가 고품질 제품 설계와 변경 대응을 실제로 개선하는지 측정한다.

> Pack 경계: 확정한 `pack:industrial-swiss@1.0.0`을 유지한다. 제품별 개선과 변주는 Product Binding 투영으로 기록하되, Pack 정본의 토큰·타입·그리드·컴포넌트 계약을 이 실험에서 수정하거나 새 Pack으로 대체하지 않는다.

## 1. 실험 질문과 가설

| 질문 | 검증 방법 | 통과 방향 |
| --- | --- | --- |
| 시스템이 일관된 경험을 만드는가? | flow/state/low-fi/hi-fi의 stable ID와 authority·recovery 추적 | 단계 간 의미 손실 없이 같은 핵심 과업을 유지 |
| 화면·매체가 늘어도 품질을 유지하는가? | iPhone portrait와 populated/empty/failure/playing 상태의 token·component·a11y 점검 | 상태와 viewport가 달라도 위계·행동·복구가 유지 |
| 요구 변경을 체계적으로 개선하는가? | 사전 영향 목록, 변경 전 보존, 변경 후 전파/불변조건 측정 | 전면 재작업 없이 영향 범위가 추적되고 일관되게 반영 |
| 제3자가 평가할 수 있는가? | ledger, 캡처, interaction test, scorecard, qualitative review | 점수마다 링크 가능한 증거와 한계가 있음 |
| 시스템이 없을 때보다 나은가? | 시스템이 해결한 결정, local override, human correction, 결함 귀속 기록 | 반복 가능한 규칙이 임의 결정을 줄이고 누락을 발견 |

## 2. 단계별 실행 설계

| 단계 | 목적 | 착수 조건 | 산출물/증거 | 출구 기준 |
| --- | --- | --- | --- | --- |
| 0. 시스템 적용 | 계층과 proposed composition을 분리 | 현재 문서 검토 | `00`, `01` | 사용자 승인 + 미확정 Binding 결정 |
| F. 플로우차트 | 정상·예외·복구 전이와 authority를 고정 | composition freeze + FigJam 대상 확인 | `03-user-flow.md`, `04-state-model.md`, FigJam flowchart, manifest/retention table | ≥80/100, C1–C5 ≥3, P0/P1 0, E1 이상 |
| L. 로우파이 | iPhone 정보 위계를 wireframe으로 검증 | F 통과 | `01-product-brief.md`, `02-information-architecture.md`, `05-low-fi.html`, FigJam iPhone wireframes | ≥80/100, Flow→Low-fi carryover ≥90%, orphan frame/action 0, P0/P1 0 |
| H. 하이파이 | iPhone용 Pack/Preset을 실제 체험 가능한 인터랙션으로 투영 | L 통과 | `06-hi-fi-preview.html`, `assets/`, ledger, iPhone state captures, FigJam hi-fi storyboard | ≥80/100, Low-fi→High-fi carryover ≥90%, E2 이상, P0/P1 0 |
| C. 변경 실험 | maintainability 및 불변조건을 측정 | H 통과 및 baseline 보존 | `07-change-request.md`, before/after, change log, propagation table | 전파/불변조건/누락을 증거로 평가 |
| E. 평가·판정 | 정량과 정성을 분리하여 시스템 한계를 기록 | C 완료 | `08`, `09`, `10` | 미측정 항목을 숨기지 않은 최종 verdict |

## 3. 하이파이의 최소 체험 범위

다음은 제품 정책이 아니라 구현 범위를 고정하기 위한 최소 capability 목록이다. 구체적인 행동·문구·데이터는 Product Binding 결정 후에만 작성한다.

1. 상황 또는 의도 선택
2. 가상 랜덤 음악 제안
3. 재생/일시정지 및 현재 재생 상태
4. 다시 뽑기
5. 저장 및 제외
6. 콘텐츠 부족/빈 상태
7. 네트워크·추천 실패와 복구
8. iPhone portrait viewport와 touch 입력 대응

모든 콘텐츠는 synthetic fixture임을 UI·문서에서 명확히 하고, 실제 음악·아티스트·앨범 커버·상표를 데이터처럼 사용하지 않는다.

## 4. 평가 지표와 9/10 판정

### 정량 지표

| 지표 | 산식 또는 검증법 | 9/10 목표 |
| --- | --- | ---: |
| Design Pack 규칙 적용률 | 검증된 Pack rule ÷ 적용 대상 Pack rule | ≥95% |
| UX Preset 상태 커버리지 | 구현·증거가 있는 적용 상태 ÷ Binding에 적용된 Preset 상태 | 100% |
| 필수 사용자 흐름 완성률 | 성공/대안/빈/오류/복구 흐름 완성 수 ÷ 등록 흐름 수 | 100% |
| 인터랙션 동작률 | 통과한 필수 interaction ÷ 등록 interaction | 100% |
| Mobile layout 오류 | 지원 viewport에서 확인된 P1/P2 layout 결함 수 | 0 |
| 깨진 이미지·링크 | 정적 검사와 렌더 점검의 실패 수 | 0 |
| 변경 요청 전파 완료율 | 검증 완료 영향 항목 ÷ 사전 등록 영향 항목 | ≥95% |
| 불변조건 유지율 | 보존된 불변조건 ÷ 적용 불변조건 | 100% |
| 문서–화면–에셋 추적성 | stable ID/ledger로 양방향 추적되는 항목 ÷ 적용 항목 | ≥95% |
| 접근성 기본 점검 | 통과한 기본 점검 ÷ 적용 기본 점검 | 100% |
| Semantic Carryover | 다음 단계에 stable ID로 추적된 필수 의미 ÷ 이전 단계 필수 의미 | ≥95% |
| Attribution Rate | 한 계층에 귀속된 변경/결함 ÷ 전체 변경/결함 | ≥95% |

### 9/10의 판정 규칙

- 최종 9.0 이상은 각 단계가 `90/100` 이상이고, C1–C5 및 해당 단계 모듈의 모든 anchor가 3 이상이며, P0/P1이 0건일 때만 가능하다.
- 위 정량 목표 중 하나라도 미측정이면 그 항목은 0점으로 환산하지 않지만, 9/10 판정의 증거 부족으로 남긴다. 최종 평점에는 미측정 사유와 감점 영향을 별도로 기록한다.
- E2(렌더/캡처/정적 측정)보다 낮은 증거로는 9/10을 선언하지 않는다. 실제 오디오, 보조기술, 대표 사용자 검증을 하지 않았다면 해당 범위의 상한과 한계를 명시한다.
- 변경 실험은 사전 등록 영향 범위, before 버전, after 검증, 불변조건 확인이 모두 있어야 9/10 증거에 포함한다.

## 5. 정성 평가 질문

- 브랜드/시각 언어와 제품 경험이 하나의 시스템처럼 느껴지는가?
- Industrial Swiss 표현이 랜덤 추천의 핵심 가치를 강화하며, 읽기·선택·재생을 방해하지 않는가?
- 추천, 사용자 선택, 재생 커밋, 확정 Playing/실패가 명료하게 분리되는가?
- 빈 상태와 오류 상태가 서비스 품질을 떨어뜨리거나 dead end를 만들지 않는가?
- 변경 뒤에도 같은 제품의 정체성과 경험 불변조건이 유지되는가?
- Pack/Preset이 실제 결정을 줄였는가, 아니면 local override가 규칙을 대체했는가?
- 시스템의 미비가 무엇이며 Pack/Preset/Binding 중 어디에 귀속되는가?

## 6. 의도적 변경 실험 — `CR-01 Fair Round Lock`

기준 하이파이를 보존한 뒤 **제품 바인딩 변경**을 적용했다. 첫 confirmed synthetic Playing을 현재 round에 잠그고, 같은 트랙 재시작과 `NEW ROUND / REROLL`을 분리하며, 제외는 다음 round부터 적용한다.

- 적합성: round 귀속·새 draw 권한·제외 적용 시점·event log는 Product Binding 소유다. Pack의 색/타입과 Preset의 authority/recovery 계약은 바꾸지 않았다.
- 불변조건: 한 후보를 빠르게 재생하는 topology, recommendation/commitment/outcome 분리, bounded accent, non-color state cue, synthetic 경계를 유지했다.
- 증거: `07-change-request.md`, `before-change/`, `07-change-log.md`, `evidence/`, FigJam `1:7`·`1:8`.

## 7. 예상 최종 산출물

```text
00-system-application-plan.md                 # 현재 작성됨
01-experiment-plan.md                         # 현재 작성됨
01-product-brief.md
02-information-architecture.md
03-user-flow.md
04-state-model.md
05-low-fi.html
06-hi-fi-preview.html
06-hi-fi-preview-fidelity-ledger.md
assets/                                       # 실제 화면 사용 자산만
evidence/                                     # 상태별 캡처와 테스트 근거
figjam/                                       # board URL, node IDs, 캡처 및 추적 기록
07-change-request.md
before-change/                                # 변경 전 보존본
07-change-log.md
08-evaluation-scorecard.md
09-qualitative-review.md
10-system-validity-verdict.md
```

사용자 검토가 완료되었으므로 위 산출물 생성을 진행한다. 대상 FigJam team은 `bk.choi의 팀`이며, 보드 URL과 node ID는 `figjam/` 추적 문서에 기록한다.
