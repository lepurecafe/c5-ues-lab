# R3 권리·생산·외부 증거 gap

> 이 문서는 점수를 낮추기 위한 부록이 아니라, 상업용으로 오인하면 안 되는 경계를 명시하는 hard-gate 보호 장치다.

| 영역 | 현재 증거 | 상태 | 상업 배포 전 필요한 것 | Owner |
| --- | --- | --- | --- | --- |
| 상표·도메인 | 합성 브랜드명·경로형 logo | unresolved | 상표 검색, 법무 승인, 도메인 소유 확인 | Brand/Legal |
| font | 로컬 CSS stack과 path wordmark | unresolved | UI/display font license와 language coverage | Brand/Legal/Dev |
| 생성 이미지 | image generation + local asset registry | experiment-only | 생성 서비스 약관·모델/인물·campaign/market 사용권 검토 | Legal/Content |
| 제품·용기 | 합성 mockup | unresolved | 용기 디자인·공급·제품 사진 사용권 | Product/Legal |
| 제품 사실 | synthetic working name/role only | unresolved | INCI, 용량, 제조, PAO, 가격, 재고, 시장별 표시 승인 | Product/Regulatory |
| 효능·안전 claim | 모두 unresolved 또는 withdrawn | blocked for claim use | substantiation, regulatory, safety authority | Regulatory/Safety |
| Packaging | sample canvas E2 | unresolved | dieline, bleed, legal copy, substrate, print proof, vendor approval | Packaging/Vendor |
| Offline Shop | spatial sample E2 | unresolved | 실제 10m/3m/arm-length test, 접근성, 설치, staff SOP | Retail/Ops |
| Merch | art sample E2 | unresolved | 원단·사이즈·care·원산지·인쇄/자수 proof | Merch/Vendor |
| OOH | ratio sample E2 | unresolved | media plan, placement, legibility, vendor takedown/replacement proof | Marketing/Vendor |
| Digital Ads | creative family E2 | unresolved | platform status, cache invalidation, live destination parity | Growth/Platform |
| Web | local prototype E3 | experiment-pass | production data, backend, auth/privacy, analytics, security, performance | Product/Engineering |
| 접근성 | focus/keyboard/390px/non-color 일부 | partial | 200% zoom, screen reader, representative assistive-tech QA | Accessibility |
| 사용자 평가 | template만 존재 | pending | 사용자의 8개 항목 1–10 평가와 근거 | User/Research |

## 금지 주장

- `production-ready`, `상업 출시 승인`, `안전 확인`, `리콜 완료`, `판매 차단 완료`;
- 실제 인물·제품·매장·광고·고객센터가 존재한다는 표현;
- unknown batch를 영향 없음 또는 안전으로 해석;
- 생성 mockup의 label·logo를 제품 사실이나 production master로 사용;
- 사용자 평가 없이 `사용자 체감 9/10`이라고 표현.

## 현재 허용 주장

`COMMON SURFACE R3는 합성 fixture와 로컬 프로토타입에서 디자인 시스템의 정규화, 상태 전파, 선택 차단, 맥락 보존, 대안, 제한된 rollback을 반복 검증할 수 있다.`

## `0.2.0` gap 재확인

`0.2.0`은 complete release authority의 malformed `13/13` rejection, 내부 7매체와 고객 Web의 same-Binding release/HOLD 전파, H01 released/U01 unaffected 분리, async settlement와 두 Web surface의 reload+Back retention을 Browser/IAB에서 추가로 입증했다. validator `1.3.0`도 error/warning `0/0`, semantic `29/29`, local refs `259`, registry `75/75`, HTML 이미지·button 필수 coverage `100%`를 기록했다.

이 증거로 바뀌는 것은 **합성·동일 origin·로컬 prototype의 상태 전파와 복구 신뢰도**뿐이다. 아래 상업 ceiling은 닫히지 않는다.

| 계속 열린 gate | `0.2.0`이 대신하지 못하는 이유 |
| --- | --- |
| 권리 | 상표·font·생성 이미지·인물·제품·공간·campaign 사용권 검토가 없음 |
| 보조기술 | 200% zoom, screen reader, representative assistive-technology 실행이 없음 |
| 대표 사용자 | 실제 대상 사용자의 과업 수행·이해·신뢰 평가가 없음 |
| 실제 제품·규제 | 합성 H01/U01은 실제 batch·안전·효능·INCI·표시·규제 authority가 아님 |
| 물리 매체 | dieline·print·거리·설치·원단·옥외 placement의 실제 proof가 없음 |
| vendor/platform | 외부 cache, 광고 플랫폼, 매장, 고객센터, vendor rollback trace가 없음 |
| production Web | backend, 계정, 개인정보, 보안, 성능, 실제 재고·판매·fulfillment가 없음 |

따라서 허용 문장도 다음 이상으로 확장하지 않는다.

> `COMMON SURFACE 0.2.0은 합성 fixture와 동일 origin 로컬 prototype에서 complete release authority, cross-surface Binding, batch 상태 분리, reload/Back 맥락 보존을 반복 검증할 수 있는 독립 재검토 후보이다.`

독립 `0.1.1`의 **`63 / 60 · STOP`**은 이력으로 보존한다. 최신 `0.2.0`은 독립 E3 hard gate PASS, `63 / 63 · REVISE`이므로 `production-ready`, `상업 사용 가능`, `접근성 완료`, `실제 rollback 성공`, `유효성 강하게 입증`은 계속 금지한다.
