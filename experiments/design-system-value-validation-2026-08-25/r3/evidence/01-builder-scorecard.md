# COMMON SURFACE R3 Builder 평가

> **평가자:** Builder  
> **Rubric:** [`../02-evaluation-contract.md`](../02-evaluation-contract.md) 사전 동결본  
> **현재 평가 revision:** `composition.common-surface.r3-hold-01@0.2.0-experiment`  
> **이력 경계:** §1–6의 `0.1.1` self-score는 독립 `63 / 60 · STOP`으로 무효화됐고, 현재 self-score는 §7이다.  
> **증거 상한:** `E1 + E2 + local E3`; 실제 E4 unresolved

## 0. 점수 수정 이력

`0.1.0` 최초 self-score `R3-A 92 / R3-B 95`는 독립 검토 전에 기록됐지만 exact-batch P0와 baseline alt/hidden copy·rollback P1을 놓쳤다. 그 점수는 성공 근거로 사용하지 않는다. 1차 독립 검토의 `60 / 57 · STOP`을 보존한 채, 결함을 수정한 새 revision을 아래에서 다시 평가한다.

## 1. `0.1.1` 결과 요약

| 단계 | Builder 점수 | P0/P1 자체 감사 | Stage 조건 | 판정 |
| --- | ---: | ---: | --- | --- |
| R3-A 정규화 | **84/100** | `0 / 0` | `≥80` 충족 | 독립 재검토 대기 |
| R3-B HOLD / 01 | **88/100** | `0 / 0` | `≥90` 미달 | **조건부 유효 상한** |

P0/P1 `0`은 builder의 수정 후 자체 감사다. 독립 reviewer가 닫기 전에는 공식 hard-gate 통과로 승격하지 않는다.

## 2. R3-A 세부 점수

| ID | 배점 | Anchor | 획득 | 근거 |
| --- | ---: | ---: | ---: | --- |
| B1 | 16 | 3 | 12 | all-gender, 비진단, 설명 우선, visible uncertainty를 Manifest·Brand Experience·두 웹 표면에 연결; 대표 사용자 관찰 없음 |
| B2 | 12 | 4 | 12 | 12개 stable ID와 runtime의 `catalog_state`, `claim_authority_state`, `market`, `availability`, `last_updated_at` 구조화 |
| B3 | 12 | 4 | 12 | Pack/Preset/Binding/Brand/Composition/Medium/Implementation 소유권, `0.1.0→0.1.1` 결함·수정 이력, 반복 validator |
| B4 | 12 | 3 | 9 | 비수치심·거짓 안전 금지·권리 ceiling은 명확; screen reader·실권리·대표 사용자 미검증 |
| B5 | 8 | 4 | 8 | version, stable ID, mode별 alt, build-time hidden summary, local link, registry가 같은 snapshot에서 검증됨 |
| M1 | 12 | 3 | 9 | R2 identity·raw token 보존과 의도적 정규화; 실제 장기 운영·사용 데이터 없음 |
| M2 | 12 | 3 | 9 | 7개 매체 구조와 동일 viewport 전후 14개 E2 pair; 물리·vendor proof 없음 |
| M3 | 8 | 4 | 8 | suggestion/draft/commit/result, mode 왕복, invalid/unknown/retry/idempotency의 local E3 |
| M4 | 4 | 2 | 2 | sample/production 경계는 분명하지만 실제 권리·생산·보조기술 E4 없음 |
| M5 | 4 | 3 | 3 | 1차 STOP 결함·owner·수정·재검증은 추적; 사람 수정 시간·장기 correction rate 없음 |
| **합계** | **100** |  | **84** |  |

## 3. R3-B 세부 점수

| ID | 배점 | Anchor | 획득 | 근거 |
| --- | ---: | ---: | ---: | --- |
| B1 | 16 | 3 | 12 | calm incident voice와 `recovery is care`를 exact scope·다음 행동에 유지; 사용자 평가는 대기 |
| B2 | 12 | 4 | 12 | `productId + batchStatus + Binding authority` predicate, H01 affected/U01 known-unaffected/unknown 분리 |
| B3 | 12 | 4 | 12 | exact release record, Binding-first revision, 7/7 propagation ledger, 15 impact·35 check·브라우저 E3 추적 |
| B4 | 12 | 3 | 9 | false clearance·공포·권리 과장 없음; 200%·screen reader·실권리 미측정 |
| B5 | 8 | 4 | 8 | event/product/batch/claim/version, mode alt, 75 registry entry, semantic gate 8/8 일치 |
| M1 | 12 | 3 | 9 | rebrand 없이 상태 변화만 진화; 실제 현장 운영 연속성은 미검증 |
| M2 | 12 | 4 | 12 | 7매체 모두 독립 구조·결정·propagation state와 baseline/HOLD capture pair 보유 |
| M3 | 8 | 4 | 8 | product-level/affected/unknown/unaffected/alternative/idempotency/release guard/Binding-first rollback local E3 |
| M4 | 4 | 2 | 2 | 실제 권리·물리 생산·외부 플랫폼·보조기술 증거 없음 |
| M5 | 4 | 4 | 4 | 독립 결함을 semantic validator 1.1.0의 반복 gate로 환원하고 runtime·계약·증거를 같은 revision으로 수정 |
| **합계** | **100** |  | **88** |  |

## 4. 수정 후 정량 지표

| 지표 | 결과 | 목표 | 판정 |
| --- | ---: | ---: | --- |
| Change Requirement Completion | `10/10` | 100% | PASS in local experiment |
| Change Propagation Rate | `15/15` prototype impact row | ≥95% | PASS; external execution 제외 |
| Cross-medium Propagation | `7/7` runtime ledger + 14 paired captures | ≥95% | PASS at E2/E3 |
| Invariant Preservation | R3-BI `12/12` + HBI `12/12` 자체 감사 | ≥95% | PASS; reviewer 대기 |
| Product-fact Parity | 12 ID + canonical fields + exact event/batch/claim | 100% | PASS |
| State/Recovery Coverage | product-level, affected, unknown, unaffected, invalid, partial, stale, alternative, retry, success, release/rollback | 100% | PASS in local runtime |
| Medium Fitness | `34/35`; Web `4/5` | 각 4/5, 전체 28/35 | PASS with WEB-02 BLOCKED |
| Static + semantic gate | error/warning `0/0`; semantic `8/8` | 100% | PASS |
| Asset registry | `75/75` valid; used `55/55` registered | 100% | PASS for traceability, rights 아님 |

## 5. 남은 결함과 외부 gate

| ID | Severity | 내용 | 판정 영향 |
| --- | --- | --- | --- |
| R3-P2-T0-01 | P2 | 최초 `09:00` placeholder를 실제 synthetic T0 `17:08`로 정정; 새 `0.1.1` revision과 이력으로 보존 | 동결 chronology 신뢰도 감점 |
| R3-P2-WEB-02 | P2 | 200% browser zoom과 screen reader 미측정 | 접근성 완료 주장 금지, 34/35 |
| R3-P2-RIGHTS-01 | external gate | 상표·font·생성 이미지·모델·용기·공간·광고 권리 unresolved | 상업 배포 금지 |
| R3-P2-PROD-01 | external gate | 실제 제품 사실·dieline·매장·OOH·광고 플랫폼·vendor 실행 proof 없음 | production-ready 금지 |
| R3-P2-USER-01 | evidence gap | 대표 사용자·사용자 정성표 미입력 | `유효성 강하게 입증` 금지 |

## 6. `0.1.1` Builder 최종 판정 · 독립 검토로 무효화

**당시 self 판정 `조건부 유효` · 현재 사용 금지**

`0.1.1`은 디자인 시스템이 exact product/batch 변경을 두 웹 표면과 7개 매체 sample에 일관되게 전파하고, 잘못된 1차 구현을 계약·runtime·validator·증거 차원에서 다시 고칠 수 있음을 보여준다. 그러나 R3-B는 self-score `88`로 frozen `90` 기준에 미달하며, 실제 권리·물리 매체·보조기술·대표 사용자 E4가 없다. 따라서 “유효성 강하게 입증”이나 “상업 출시 가능”으로 올리지 않는다.

## 7. `0.2.0` Builder 재평가 tranche

### 7.1 점수의 지위

`0.1.1`의 Builder `84 / 88`과 자체 P0/P1 `0 / 0`은 독립 재평가의 **`63 / 60 · STOP`**으로 무효화됐다. `0.2.0`은 그 뒤의 새 self-score이며, 최신 독립 E3는 P0/P1 `0/0`, hard gate PASS를 확인했다. 공식 점수는 R3-A/R3-B 각각 `63`, Stage는 `REVISE`다.

| 단계 | `0.2.0` Builder self-score | Builder P0/P1 | Frozen Stage 조건 | 현재 판정 |
| --- | ---: | ---: | --- | --- |
| R3-A 정규화 | **84/100** | `0 / 0 claimed` | `≥80`, Core anchor `≥3`, 독립 hard gate | 독립 `63` · hard gate PASS · **REVISE** |
| R3-B HOLD / 01 | **87/100** | `0 / 0 claimed` | `≥90`, Core anchor `≥3`, 독립 hard gate | 독립 `63` · hard gate PASS · **REVISE** |

hard-gate 결함을 수정했다고 기존의 과대 점수를 가산점처럼 이어받지 않았다. frozen anchor를 다시 적용하고, 권리·보조기술·대표 사용자·물리/vendor 증거와 사람 수정 부담 원자료가 없는 항목은 `4`로 올리지 않았다.

### 7.2 Anchor 재산정

| ID | 배점 | R3-A anchor / 점수 | R3-B anchor / 점수 | `0.2.0` 근거 |
| --- | ---: | ---: | ---: | --- |
| B1 | 16 | `3 / 12` | `3 / 12` | 설명 우선·비진단·quiet recovery는 유지; 대표 사용자 관찰 없음 |
| B2 | 12 | `4 / 12` | `4 / 12` | exact H01=`released`, U01=`unaffected`, unknown 분리와 canonical fields |
| B3 | 12 | `4 / 12` | `4 / 12` | `0.2.0` 의미 revision, complete release record, same-Binding consumer, 증거 이력 |
| B4 | 12 | `3 / 9` | `3 / 9` | false clearance·권리 과장 방지; AT·실권리·규제 미검증 |
| B5 | 8 | `4 / 8` | `4 / 8` | validator `1.3.0`, semantic `29/29`, local refs `259`, registry `75/75`, HTML coverage `100%` |
| M1 | 12 | `3 / 9` | `3 / 9` | 시각·언어 연속성은 보존; 실제 장기 운영 없음 |
| M2 | 12 | `3 / 9` | `4 / 12` | R3-A 7매체 sample, R3-B shared Binding의 내부 7/7+customer Web 전파; 물리 proof 없음 |
| M3 | 8 | `4 / 8` | `4 / 8` | 두 surface의 reload+Back 맥락 보존과 release/HOLD 양방향 E3 |
| M4 | 4 | `2 / 2` | `2 / 2` | sample/production 경계는 명확하지만 E4 없음 |
| M5 | 4 | `3 / 3` | `3 / 3` | 독립 결함을 validator `1.3.0`과 Browser/IAB 회귀 경로로 환원했지만 운영 effort 원자료는 없음 |
| **합계** | **100** | **84** | **87** |  |

### 7.3 새 정량 근거

| 지표 | `0.2.0` 관찰 | Builder 판정 |
| --- | --- | --- |
| malformed release rejection | `13/13`, HOLD retained | local E3 PASS |
| cross-surface release | 내부 Binding-first → 내부 7/7 + 고객 Web same revision | local E3 PASS |
| released/unaffected 분리 | H01=`released/local-only`, U01=`unaffected` | local E3 PASS |
| HOLD reapply | 고객 Web까지 shared Binding 자동 복귀 | local E3 PASS |
| retention | 내부·고객 Web reload+Back에서 draft/input/차단/Binding 보존 | local E3 PASS; 복구 copy는 canonical state로 재생성 |
| validator | `1.3.0`, error/warning `0/0`, semantic `29/29`, refs `259`, registry `75/75`, HTML coverage `100%` | static/semantic PASS |

### 7.4 Hard-gate 적용

Builder 점수는 독립 점수를 대체하지 않는다. 최신 독립 E3는 P0/P1 `0/0`을 확인했지만 총점·Core·E4가 출구 조건에 못 미친다. 따라서 현재 허용 결론은 다음으로 제한한다.

> `0.2.0은 합성·로컬 환경의 독립 E3 hard gate를 통과했지만 점수 63/63과 E4 부재로 REVISE다. 상업 운용 승인이나 유효성 강한 입증이 아니다.`
