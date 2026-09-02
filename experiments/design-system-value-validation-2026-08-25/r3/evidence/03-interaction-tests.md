# R3 웹·상호작용 검증 기록

> **환경:** 로컬 HTTP + Codex 인앱 브라우저  
> **화면:** `1440×1000`, `390×844`  
> **대상:** `preview.html`, `preview-baseline.html`, `preview-hold.html`, `sample-commerce.html`

## 1. 내부 운영 프리뷰

| Test | 기대 | 실제 결과 | 판정 |
| --- | --- | --- | --- |
| HOLD에서 batch 없는 CS-03 선택 | product-level local draft만 허용 | `commitEnabled=true`; `CS-03 전체가 아닌 H01만 HOLD`, 판매·fulfillment 아님 표시 | PASS · `E3-INT-01` |
| exact affected batch H01 | affected + 해당 batch 차단 | H01 입력 유지, `commitEnabled=false`, `EVENT-HOLD-01-CS03` 일치, commit/fulfillment 차단 | PASS · `E3-INT-02` |
| known-unaffected fixture U01 | local-only 진행·거짓 안전 금지 | U01 입력 유지, `commitEnabled=true`, 실제 안전·재고·판매 가능 판정 아님 | PASS · `E3-INT-03` |
| unknown batch | 거짓 해제 금지 | `실제 제품 상태는 미확인`, 입력 `CS03-SYN-2608-X99` 유지, `commitEnabled=false` | PASS · `E3-INT-04` |
| alternative | 자동 추천 아님 | CS-02를 사용자 검토 후보로 열고 안전·효능·적합 자동 추천 금지 표시 | PASS |
| filter 변경 | draft 보존 | BODY filter에서도 CS-02 draft가 `현재 필터 밖에 유지됨`으로 보존 | PASS |
| baseline CS-03 | HOLD 차단 없음 | commit enabled, batch lookup disabled | PASS |
| duplicate commit | 중복 record 방지 | 두 번째 실행이 기존 로컬 결과를 반환 | PASS |
| release 권한 없음 | HOLD 유지 | projection=`hold`, Binding=`hold-active`, claim 철회 유지 | PASS · `E3-INT-09` |
| 합성 release + rollback | Binding-first exact restore | `0.1.1` 내부 7-node까지만 관찰했고 고객 Web·완전한 authority·released state를 누락 | **HISTORICAL SELF-PASS INVALIDATED** · 새 증거는 §5 |
| HOLD 재적용 | Binding·7매체 원래 HOLD 복원 | Binding=`hold-active`, 7/7=`hold-active / claim-withdrawn` | PASS · `E3-INT-11` |
| baseline ↔ HOLD 왕복 | 접근성 DOM·alt 완전 복원 | baseline initial과 HOLD→baseline 후 3개 교체 이미지 `src/srcset/alt` 및 HOLD 요약 hidden 상태 동일 | PASS · `E3-A11Y-01` |
| 분리 파일 초기 상태 | baseline/hold parity | baseline=batch lookup disabled/HOLD 요약 hidden, hold=exact scope 표시/batch lookup enabled | PASS · `E3-INT-12` |

## 2. 고객용 웹사이트 샘플

| Test | 실제 결과 | 판정 |
| --- | --- | --- |
| batch 없는 CS-03 선택 | 제품 수준 local draft commit 가능; 전체 제품 HOLD·판매 가능을 암시하지 않음 | PASS · `E3-COM-01` |
| exact batch H01 | `HOLD / 01 대상 일치`, local commit 차단, 입력 유지 | PASS · `E3-COM-02` |
| known-unaffected U01 | local commit 가능, 실제 안전·재고·판매 가능 판정 아님 | PASS · `E3-COM-03` |
| unknown batch | 입력 유지, commit 차단, 실제 안전·영향 없음으로 판정하지 않음 | PASS · `E3-COM-04` |
| 다른 제품 보기 | CS-02 draft, commit 가능, 안전·적합 자동 추천 금지 | PASS |
| baseline 전환 | notice hidden, CS-03 local commit 가능 | PASS |
| 상단 복귀 | 수정 후 `scrollY=0`, `heroTop=headerBottom`; sticky header가 hero를 가리지 않음 | PASS |

## 3. 렌더·반응형·접근성 기초

| 항목 | 내부 프리뷰 | 고객 사이트 | 판정 |
| --- | --- | --- | --- |
| desktop width | 1440, horizontal overflow 0 | 1440, horizontal overflow 0 | PASS |
| mobile width | 390, horizontal overflow 0 | 390, horizontal overflow 0 | PASS |
| 이미지 | lazy 영역 순차 로드 후 실패 0 | 12/12 load, 실패 0 | PASS |
| console warn/error | 0 | 0 | PASS |
| focus-visible | 2px solid outline 확인 | 2px solid outline 확인 | PASS |
| code-token 대비 | ink/paper 15.57:1, red/paper 4.54:1, white/red 5.21:1, blue/paper 6.32:1 | 같은 token 사용 | PASS for code colors; 실제 물리 출력 제외 |
| 키보드 대상 | native link/button/input/submit, explicit type/name | native link/button/input/submit | PASS |
| non-color HOLD | HOLD label, product/batch, disabled action, reason, next path | notice, text label, disabled button, result state | PASS |
| 44×44 target | 주요 내부 control `min-height:2.75rem` | 390px에서 visible button/link 0건 under 44px | PASS · DOM geometry |
| 200% browser zoom | 브라우저 제어 경로로 수치 검증 실패 | 미측정 | BLOCKED |
| screen reader | 실행하지 않음 | 실행하지 않음 | BLOCKED |

## 4. 정적 validator와 결합한 근거

최종 validator는 다음을 자동 검사한다.

- baseline/hold와 고객용 sample의 이미지 alt/loading/dimensions/responsive `100%`;
- button explicit type/accessibile name `100%`;
- 7 medium ID, 12 product ID, HOLD states/copy `100%`;
- local reference missing/outside `0`;
- forbidden R1 reference `0`;
- 사용 asset registry coverage `100%`.
- semantic contract `29/29`.

브라우저 검증은 자동 validator가 증명할 수 없는 실제 layout, scroll, state transition과 console 상태를 보완한다.

## 5. `0.2.0` Browser/IAB 회귀 tranche

> 이 tranche는 독립 `0.1.1`의 `63 / 60 · STOP` 이후 수정본을 같은 로컬 HTTP origin에서 다시 실행한 관찰 기록이다. 독립 acceptance나 실제 운영 증거가 아니다.

### 5.1 Release authority negative matrix

기준 complete record에서 아래 필드를 하나씩 훼손하고 rollback을 시도했다. 각 case 전후에 HOLD mode를 재설정했으며, 기대값은 Binding `hold-active`, HOLD retained다.

| 훼손 필드 | 결과 |
| --- | --- |
| `eventId` | REJECT / HOLD retained |
| `productId` | REJECT / HOLD retained |
| `batchId` | REJECT / HOLD retained |
| `scope` | REJECT / HOLD retained |
| `effectiveAt` | REJECT / HOLD retained |
| `approver` | REJECT / HOLD retained |
| `claimDecision` | REJECT / HOLD retained |
| `permissions.localCommit` | REJECT / HOLD retained |
| `permissions.fulfillment` | REJECT / HOLD retained |
| `permissions.claimRestore` | REJECT / HOLD retained |
| `customerFacingCopy` | REJECT / HOLD retained |
| `authorityDisclaimer` | REJECT / HOLD retained |
| `mediumImpactMap` | REJECT / HOLD retained |

결과는 **`13/13` PASS · `E3-020-REL-NEG-01`**이다. complete record만 Binding-first release 경로에 진입했다.

### 5.2 Cross-surface Binding과 상태 의미

| Test | 실제 결과 | 판정 |
| --- | --- | --- |
| 내부 HOLD → valid release → rollback | 내부 7/7을 갱신한 release Binding revision이 열린 고객 Web에 자동 전파됨 | PASS · `E3-020-XWEB-01` |
| 고객 Web exact H01 | `released / local-only`; local commit만 복원, claim·fulfillment 미복원 | PASS · `E3-020-BATCH-REL-01` |
| 고객 Web U01 | `unaffected synthetic fixture`; H01 release와 별도 상태 | PASS · `E3-020-BATCH-U01-01` |
| 내부 HOLD 재적용 | 고객 Web이 같은 shared Binding을 소비해 자동 `hold-active` 복귀 | PASS · `E3-020-XWEB-02` |
| release 뒤 내부 H01 재조회 2회 | 양쪽 Web 모두 `released / local-only`, commit enabled 유지 | PASS · `E3-020-POSTREL-H01-01` |
| released H01 입력 상태에서 HOLD 재적용 | 고객 입력 H01 유지, `affected`, commit disabled, 저장 시도 불가 | PASS · `E3-020-REHOLD-H01-01` |
| H01 commit 대기 중 HOLD 재적용 | 내부·고객 모두 settlement에서 현재 Binding 재검증 후 저장 중단 | PASS · `E3-020-RACE-COMMIT-01` |
| H01 lookup 직후 U01 lookup | request token으로 이전 callback 폐기, 양쪽 최종 U01 `unaffected` | PASS · `E3-020-RACE-LOOKUP-01` |
| 고객 Web U01 저장 뒤 released H01 저장 | product ID는 같아도 batch·authority·Binding identity가 달라 새 record로 처리 | PASS · `E3-020-COMMIT-ID-01` |
| 대안 전이 reload | FACE filter·CS-02 draft·alternative 안내가 동일 복원 | PASS · `E3-020-RET-ALT-01` |
| 감사 ledger reload | 이전 event sequence를 보존하고 reload event를 뒤에 추가 | PASS · `E3-020-RET-AUDIT-01` |

### 5.3 Reload와 Back retention

| Surface | 설정한 상태 | reload 관찰 | 다른 페이지 이동 후 Back 관찰 | 판정 |
| --- | --- | --- | --- | --- |
| 내부 preview | filter=`BODY`, draft=`CS-03`, input=`CS03-SYN-UNKNOWN`, batch=`unknown` | 네 값과 disabled commit/HOLD Binding 유지 | 같은 값·차단·Binding 유지 | PASS · `E3-020-RET-INT-01` |
| 고객 Web | draft=`CS-03`, input=`CS03-SYN-UNKNOWN`, disabled commit, Binding=`hold-active` | 제품·입력·차단·Binding 유지 | 같은 상태 유지 | PASS · `E3-020-RET-COM-01` |

고객 Web 복원 직후 result 문구는 저장된 HTML을 그대로 재사용하지 않고 현재 canonical state에서 다시 생성되므로 표현이 정규화된다. 제품·입력·결정 가능 여부·Binding 의미는 보존된다.

### 5.4 Validator `1.3.0` 결합 결과

- strict 결과: **PASS**, error/warning `0/0`;
- local references: `259`, missing/outside `0/0`;
- asset registry: `75/75` valid;
- baseline/HOLD/customer HTML 이미지와 button 필수 coverage: 각 `100%`;
- semantic gate `29/29`: complete release authority, `13/13` negative path, release·HOLD 양방향 verified Binding publish, released/HOLD 재분류, async settlement, batch-aware commit identity, 대안 live copy·감사 이력 retention 포함.

정적 PASS는 Browser/IAB의 상태 전이를 대체하지 않으며 screen reader, 200% zoom, 실제 권리·backend·production·vendor 전파는 증명하지 않는다.
