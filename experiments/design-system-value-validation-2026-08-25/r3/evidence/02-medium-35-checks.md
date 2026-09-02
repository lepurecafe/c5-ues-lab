# R3-B 7매체 / 35개 검사표

> **분모:** 결과 확인 전에 동결한 `7 media × 5 checks = 35`  
> **결과:** `34 PASS / 1 BLOCKED / 0 FAIL` = `97.14%`  
> **최저 매체:** Web `4/5 = 80%`  
> **증거 경계:** 물리·외부 매체는 sample-frame `E2`; 웹의 로컬 상호작용은 prototype `E3`; 실제 생산·배포는 미검증

## 판정

| 매체 | PASS | BLOCKED | Fitness | 근거 |
| --- | ---: | ---: | ---: | --- |
| Moodboard / Guidance | 5 | 0 | 100% | [`preview-hold.html#media-moodboard`](../preview-hold.html#media-moodboard) |
| Packaging | 5 | 0 | 100% | [`preview-hold.html#media-packaging`](../preview-hold.html#media-packaging) |
| Offline Shop | 5 | 0 | 100% | [`preview-hold.html#media-shop`](../preview-hold.html#media-shop) |
| Merchandise | 5 | 0 | 100% | [`preview-hold.html#media-merch`](../preview-hold.html#media-merch) |
| OOH | 5 | 0 | 100% | [`preview-hold.html#media-ooh`](../preview-hold.html#media-ooh) |
| Digital Ads | 5 | 0 | 100% | [`preview-hold.html#media-ads`](../preview-hold.html#media-ads) |
| Commerce / Reserve Web | 4 | 1 | 80% | [`preview-hold.html#media-web`](../preview-hold.html#media-web), [`sample-commerce.html`](../sample-commerce.html) |

## 35개 개별 판정

| ID | 판정 | 증거와 해석 |
| --- | --- | --- |
| MB-01 | PASS | synthetic source와 표현 규칙을 한 board에서 연결 |
| MB-02 | PASS | 실제 피부·종이·금속·면 reference를 규칙으로 번역 |
| MB-03 | PASS | 비진단·비수치심·실제 피부 방향을 사람 asset 8종에 반영 |
| MB-04 | PASS | red flood, medical theater, before/after를 anti-moodboard로 명시 |
| MB-05 | PASS | reference rights와 campaign use를 registry에서 분리; 권리는 unresolved |
| PKG-01 | PASS | `CS-03`와 `CS03-SYN-2608-H01` parity |
| PKG-02 | PASS | identity, status, next action을 분리한 detached insert sample |
| PKG-03 | PASS | KR/EN·긴 ID가 code-native text로 표시됨 |
| PKG-04 | PASS | sample canvas이며 dieline·bleed·vendor gap임을 표시 |
| PKG-05 | PASS | package·shop·web에서 동일 product/batch/event 사용 |
| SHOP-01 | PASS | 10m/3m/arm-length 정보 위계 규칙을 별도 투영 |
| SHOP-02 | PASS | sample에서 shelf·tester·checkout 격리 경로를 명시 |
| SHOP-03 | PASS | unavailable·unknown·help를 분리 |
| SHOP-04 | PASS | 설치·접근·운영은 외부 증거 gap으로 표시 |
| SHOP-05 | PASS | 매장·웹·staff route의 stable ID가 일치 |
| MERCH-01 | PASS | HOLD를 장식으로 사용하지 않고 identity를 preserve |
| MERCH-02 | PASS | size·material·care 예약 영역과 claim notice를 분리 |
| MERCH-03 | PASS | path master와 mono/inverse/small family 사용 |
| MERCH-04 | PASS | 원단·인쇄·권리 미확정 표시 |
| MERCH-05 | PASS | 제품 HOLD와 merch normal state를 분리 |
| OOH-01 | PASS | 한 메시지·한 대상·한 next step |
| OOH-02 | PASS | 2:1과 1:2 거리·비율 위계 규칙 |
| OOH-03 | PASS | 사용 중지 claim과 안전·효능 claim 0 |
| OOH-04 | PASS | 사람 읽기 가능한 product/batch fallback |
| OOH-05 | PASS | vendor request와 실제 removal proof를 분리 |
| ADS-01 | PASS | 1200×628, 1080×1080, 1080×1920을 독립 frame으로 구성 |
| ADS-02 | PASS | message·CTA·destination parity |
| ADS-03 | PASS | KR/EN·긴 ID code-native text |
| ADS-04 | PASS | asset·platform rights unresolved 표시 |
| ADS-05 | PASS | cache version·last update 필요성을 계약과 projection에 연결 |
| WEB-01 | PASS | suggestion, draft, commit, local result, HOLD를 시각·문구·행동으로 분리 |
| WEB-02 | BLOCKED | focus-visible·키보드 focus·390px·비색상 단서는 확인. 200% 실제 확대와 screen reader는 현재 브라우저 경로에서 미측정 |
| WEB-03 | PASS | invalid/loading/partial/stale/unknown/alternative/retry에서 입력·후보 보존 |
| WEB-04 | PASS | batch 없는 CS-03 local draft는 유지하고 exact H01만 차단; U01·unknown을 분리하며 local-only 결과 명시 |
| WEB-05 | PASS | Product Binding의 12 ID·canonical fact field·exact batch·claim·availability·authority ceiling과 화면 일치 |

## 캡처 증거

### 매체별 동일 viewport 전후 쌍

아래 14개 파일은 동일한 `1440×1000` 브라우저 viewport에서 각 `#media-*` section을 `scroll-padding-top: 6rem` 기준으로 정렬한 E2 sample-frame이다. 물리 크기·인쇄·설치·vendor proof는 아니다.

| 매체 | Baseline | HOLD / 01 |
| --- | --- | --- |
| Moodboard | [`media-moodboard-baseline-1440x1000.png`](screenshots/media-moodboard-baseline-1440x1000.png) | [`media-moodboard-hold-1440x1000.png`](screenshots/media-moodboard-hold-1440x1000.png) |
| Packaging | [`media-packaging-baseline-1440x1000.png`](screenshots/media-packaging-baseline-1440x1000.png) | [`media-packaging-hold-1440x1000.png`](screenshots/media-packaging-hold-1440x1000.png) |
| Offline Shop | [`media-shop-baseline-1440x1000.png`](screenshots/media-shop-baseline-1440x1000.png) | [`media-shop-hold-1440x1000.png`](screenshots/media-shop-hold-1440x1000.png) |
| Merchandise | [`media-merch-baseline-1440x1000.png`](screenshots/media-merch-baseline-1440x1000.png) | [`media-merch-hold-1440x1000.png`](screenshots/media-merch-hold-1440x1000.png) |
| OOH | [`media-ooh-baseline-1440x1000.png`](screenshots/media-ooh-baseline-1440x1000.png) | [`media-ooh-hold-1440x1000.png`](screenshots/media-ooh-hold-1440x1000.png) |
| Digital Ads | [`media-ads-baseline-1440x1000.png`](screenshots/media-ads-baseline-1440x1000.png) | [`media-ads-hold-1440x1000.png`](screenshots/media-ads-hold-1440x1000.png) |
| Commerce / Reserve Web | [`media-web-baseline-1440x1000.png`](screenshots/media-web-baseline-1440x1000.png) | [`media-web-hold-1440x1000.png`](screenshots/media-web-hold-1440x1000.png) |

### 대표 전체 흐름 캡처

- [`screenshots/r3-seven-media-desktop.png`](screenshots/r3-seven-media-desktop.png)
- [`screenshots/r3-reserve-hold-desktop.png`](screenshots/r3-reserve-hold-desktop.png)
- [`screenshots/sample-commerce-desktop-top.png`](screenshots/sample-commerce-desktop-top.png)
- [`screenshots/sample-commerce-reserve-hold-desktop.png`](screenshots/sample-commerce-reserve-hold-desktop.png)
- [`screenshots/sample-commerce-mobile.png`](screenshots/sample-commerce-mobile.png)
- [`screenshots/sample-commerce-reserve-workspace-mobile.png`](screenshots/sample-commerce-reserve-workspace-mobile.png)
- [`screenshots/r3-exact-batch-hold-desktop.png`](screenshots/r3-exact-batch-hold-desktop.png)
- [`screenshots/r3-reserve-exact-batch-desktop.png`](screenshots/r3-reserve-exact-batch-desktop.png)

## 판정

모든 매체가 `4/5` 이상이고 전체가 `28/35`를 넘는다. 따라서 frozen medium gate는 통과한다. 단, `WEB-02`가 BLOCKED이므로 “접근성 완료”나 `35/35`를 주장하지 않는다.

## `0.2.0` 전파 증거 addendum

기존 `34 PASS / 1 BLOCKED` 분모와 판정은 바꾸지 않는다. 아래는 release/rollback이 sample-frame의 내부 Web node에서 끝나지 않고 고객 Web consumer까지 같은 Binding revision으로 이어지는지를 Browser/IAB에서 재검증한 별도 E3 tranche다.

| ID | 시작 상태 | 동작 | 내부 7매체 | 고객 Web | 판정 |
| --- | --- | --- | --- | --- | --- |
| `E3-020-MEDIA-REL-01` | exact H01 HOLD | complete synthetic release record 검증 후 rollback | `7/7 release-restored / claim-withdrawn` | 같은 release Binding revision 자동 소비, H01=`released/local-only` | PASS at local prototype |
| `E3-020-MEDIA-REL-02` | release-restored | HOLD 재적용 | `7/7 hold-active / claim-withdrawn` | shared Binding event로 `hold-active` 자동 복귀 | PASS at local prototype |
| `E3-020-MEDIA-NEG-01` | HOLD | release 필수 leaf 13종을 각각 훼손 | 모든 case에서 HOLD 유지 | release Binding 미발행, HOLD 유지 | `13/13` PASS |

H01의 `released`는 U01의 `unaffected`와 다른 authority state이며 로컬 commit만 복원한다. claim·실제 판매·재고·fulfillment는 복원하지 않는다. 위 결과는 동일 origin 로컬 Web E3이고, Packaging·Shop·Merch·OOH·Ads의 실제 vendor 전파나 물리 교체 증거가 아니다. 따라서 `WEB-02` BLOCKED, 실매체 E4 unresolved, 전체 `34/35`는 그대로 유지한다.
