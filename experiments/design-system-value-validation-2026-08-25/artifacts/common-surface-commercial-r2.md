# COMMON SURFACE — Commercial System r2

> **상태:** 상업 디자인 기준선 정본 · 시장 출시 승인 전  
> **Composition:** `composition.common-surface.r2`  
> **Design Pack:** `Industrial Swiss System / pack:industrial-swiss@1.0.0`  
> **원칙:** Pack은 시각 표현을, Product Binding은 사실·선택·결과를, Medium은 제작 조건을 소유한다.

## 1. 브랜드 전략과 아이덴티티

### 브랜드 역할

COMMON SURFACE는 성별이 아닌 **일상의 루틴**으로 피부 관리를 설명하는 스킨케어·오브젝트 브랜드다. 브랜드는 피부를 교정하거나 진단하지 않는다. 제품군은 `01–04` 순서로 읽히고, 머천다이즈는 같은 물성·정보 구조를 공유한다.

| 항목 | r2 결정 |
| --- | --- |
| 이름 | `COMMON SURFACE` / 커먼 서피스 |
| 핵심 문장 | `피부를 위한 일상의 순서.` |
| 브랜드 태도 | 정확함, 물성의 정직성, 비성별성, 차분한 통제감 |
| 금지 | 치료·진단 언어, 결점·수치심, 과장 효능, 성별 고정관념, 장식적 럭셔리 |
| 상표 상태 | `unresolved` — 외부 공개·출원·제조 전 선행 검토 필수 |

### 로고 패밀리

| 자산 | 용도 | 금지 |
| --- | --- | --- |
| [`primary wordmark`](assets/common-surface-wordmark-r2.svg) | 첫 노출, 패키지 전면, 캠페인 엔드프레임 | 변형·기울임·패턴 마스킹 |
| [`CS symbol`](assets/common-surface-symbol-r2.svg) | 패키지 측면, 자수, 패치, 각인, 앱 아이콘 | 마스터 형태 재해석·생성 이미지 변형 사용 |
| [`horizontal lockup`](assets/common-surface-lockup-horizontal-r2.svg) | 파사드, 웹 헤더, 긴 규격 | 심벌과 글자 간격 임의 변경 |
| 보호 여백 | 워드마크 적색 기준점 폭의 2배 | 다른 코드·텍스트·테두리 침범 |

## 2. 토큰·타이포그래피·그리드

### 토큰

| 역할 | 값 | 쓰임 |
| --- | --- | --- |
| `--cs-paper` | `#F3EFE7` | 주 읽기 바탕, 패키지 라벨 |
| `--cs-ink` | `#1A1713` | 제목, 본문, 구조선 |
| `--cs-blue` | `#315B78` | 제품군·공간의 제한된 면 |
| `--cs-red` | `#C7382C` | 주 행동·정렬 기준 하나 |
| `--cs-stone` | `#746D63` | 보조 설명·구분선 |
| `--cs-line` | `#B9B0A3` | hairline 테두리 |

### 한국어 조판 규칙

- 본문: `Pretendard` 또는 라이선스가 확인된 동급 CJK 산세리프, `16/26`, 자간 `0 ~ -0.012em`.
- 제목: 같은 CJK 계열의 `700–800`, 자간 `0 ~ -0.03em`, 행간 `1.0–1.12`. 한글에 영문 응축체의 `-0.07em` 자간과 `0.8` 행간을 적용하지 않는다.
- 영문 Display: 라이선스가 확인된 condensed display 계열, `COMMON SURFACE`, SKU, 짧은 캠페인 라인에만 사용.
- Mono: 코드·일자·권한·규격에만 사용하며 설명 문단에 사용하지 않는다.

### 공간 규칙

12열 / 1400px 최대폭 / 24px 거터 / `4, 8, 12, 16, 24, 32, 48, 64, 80, 96` 간격을 쓴다. 매체가 좁아지면 열을 줄이되, 정보 위계를 줄이지 않는다. 패키지·선반·OOH에서도 **코드 → 제품명 → 사실 → 행동** 순서를 유지한다.

## 3. 제품·SKU·패키지 시스템

제품 이름과 코드는 실험용이며, 제형·성분·용량·가격·효능은 `unresolved`다. 이 정보는 디자인을 채우기 위한 가짜 문구로 바꾸지 않는다.

| 코드 | 작업명 | 역할 | 이미지 | 패키지 형태 |
| --- | --- | --- | --- | --- |
| `CS-01` | RINSE / 젤 클렌저 | 세정 | [asset](assets/cs-01-r1.png) | 알루미늄 펌프 |
| `CS-02` | BALANCE / 에센스 | 준비 | [asset](assets/cs-02-r1.png) | 프로스티드 유리 보틀 |
| `CS-03` | BARRIER / 세럼 | 보조 | [asset](assets/cs-03-r1.png) | 드로퍼 보틀 |
| `CS-04` | SEAL / 데일리 크림 | 보습 | [asset](assets/cs-04-r1.png) | 알루미늄 자 |
| `CS-05` | SHIELD / 선스틱 | 야외 휴대 | [asset](assets/cs-05-r2.png) | 사각 알루미늄 스틱 |
| `CS-06` | FIELD / 바디 워시 | 바디 세정 | [asset](assets/cs-06-r2.png) | 리필형 알루미늄 펌프 |
| `CS-07` | REPAIR / 핸드 밤 | 손 관리 | [asset](assets/cs-07-r2.png) | 크림프 알루미늄 튜브 |
| `CS-08` | CARRY / 립 밤 | 이동 중 관리 | [asset](assets/cs-08-r2.png) | 아노다이징 스틱 |
| `CS-09` | LENGTH / 바디 로션 | 바디 보습 | [asset](assets/cs-09-r2.png) | 로우 프로파일 펌프 |
| `CS-10` | RESET / 스칼프 린스 | 두피 세정 보조 | [asset](assets/cs-10-r2.png) | 코발트 노즐 보틀 |
| `CS-11` | DRY / 데오도란트 | 데일리 바디 | [asset](assets/cs-11-r2.png) | 알루미늄 롤온 |
| `OBJ-06` | AIR / 미스트 오브젝트 | 휴대 오브젝트 | [asset](assets/obj-06-r2.png) | 유리·금속 케이지 |

### 패키지 정보 구조

| 면 | 필수 정보 구조 | r2 경계 |
| --- | --- | --- |
| 전면 | 워드마크 → 코드·STEP → 제품 작업명 → 승인된 용량 | 용량은 `reserved` 영역으로만 표시 |
| 측면 | 루틴 역할 → QR/URL 다음 단계 → 축약 마크 | QR은 단독 정보 경로가 아님 |
| 후면 | 사용법·전성분·주의·제조/책임판매·재활용/분리배출 | 시장별 검증 전에는 빈 영역과 권한 상태만 표기 |

## 4. 컴포넌트 라이브러리

| 컴포넌트 | 변형 | 필수 정보·상태 |
| --- | --- | --- |
| Brand Signature | wordmark / mark / inverse label | 최소 크기, 보호 여백, 배경 대비 |
| Product Tile | 1:1 / 4:5 / shelf | 이미지, SKU, 작업명, STEP, 사실 상태 |
| Product Detail | desktop / mobile | 제품 이미지, 코드, 비교 사실, 보조 설명, 행동 |
| Package Label | front / side / back | 사실 영역, 언어 우선순위, 안전 여백 |
| Shelf Ticket | A6 / narrow shelf | 코드, 이름, 상태, 테스터/대체 경로 |
| Tester Card | available / unavailable | 위생 상태, 다음 행동, 도움 경로 |
| CTA | primary / secondary / disabled / loading | 텍스트 행동, 포커스, 결과 문구 |
| Reserve Selection | default / focus / invalid / loading / success / unavailable / alternative | 제안과 사용자 선택의 분리, 로컬 결과, 수정/초기화 |
| Campaign Lockup | OOH / ad / window | 한 메시지, 워드마크, 목적지 |
| Garment Graphic | front / back / care label | 그래픽과 법정 케어 정보 분리 |

## 5. 에셋·매체 제작물

| 매체 | 핵심 에셋 | 결과물 |
| --- | --- | --- |
| 제품군 | CS-01–04 개별 에셋, 제품 정물 | 패키지, 카탈로그, PDP, 선반 |
| 공간 | [외관](assets/common-surface-facade-r1.png), [매장](assets/common-surface-retail-r1.png) | 파사드, 윈도, 선반, 안내 |
| 캠페인 | [인물](assets/common-surface-campaign-r1.png) | OOH 2:1·1:2, 광고 3규격, 웹 히어로 |
| 머천다이즈 | [티셔츠](assets/common-surface-merch-r1.png), [오브젝트](assets/common-surface-objects-r1.png) | OBJ-01–05 카탈로그, 케어 라벨 |

각 이미지는 `experiment-approved-synthetic` 아트디렉션 자산이다. 상업 집행 전에 인물·사진·제품·제조·폰트·매체별 권리와 사용 범위를 분리 승인한다.

### 인물 아트디렉션 매트릭스

인물 이미지는 피부 톤이나 성별만 바꾼 동일 포즈를 반복하지 않는다. 각 컷은 **인물 특성 + 시간 + 장소 + 행동 + 제품 역할 + 프레이밍** 중 최소 네 항목이 다른 장면이어야 한다.

| 컷 | 장면 | 표현 역할 | 에셋 |
| --- | --- | --- | --- |
| `P-01` | 60대 여성 · 아침 욕실 · 크림 | 나이를 지우지 않은 일상 | [asset](assets/people-01-r2.png) |
| `P-02` | 30대 남성 · 도시 이동 · 선스틱 | 이동 중의 휴대 루틴 | [asset](assets/people-02-r2.png) |
| `P-03` | 안드로지너스 인물 · 야간 욕실 · 세럼 | 성별 고정관념 없는 자기 관리 | [asset](assets/people-03-r2.png) |
| `P-04` | 70대 남성 · 작업실 세면대 · 세안 | 손에 익은 반복 행동 | [asset](assets/people-04-r2.png) |
| `P-05` | 주근깨·잔주름 피부 클로즈업 | 보정하지 않은 표면 | [asset](assets/people-05-r2.png) |
| `P-06` | 40대 여성 · 야간 버스 정류장 · 립밤 | 도시 생활 속 휴대성 | [asset](assets/people-06-r2.png) |
| `P-07` | 40·50대 친구 · 수영 후 · 바디 로션 | 함께 쓰는 물건과 관계 | [asset](assets/people-07-r2.png) |
| `P-08` | 매장 직원·고객 · 제품 비교 | 주장이 아닌 설명과 서비스 | [asset](assets/people-08-r2.png) |

금지: 전후 비교, 피부 결점 강조, 나이 삭제, 성별·인종 고정관념, 과도한 뷰티 리터칭, 제품 성능을 인물 이미지가 증명하는 구성.

### 로고 응용 에셋

| 매체 | 생산 방식 | 아트디렉션 기준 |
| --- | --- | --- |
| [배송 패키지](assets/logo-packaging-r2.png) | 인쇄·테이프·씰 | 개봉 순서마다 심벌이 다른 크기로 드러남 |
| [의류·오브젝트](assets/logo-merch-r2.png) | 대형 프린트·자수·패치·각인 | 같은 위치 반복 없이 재질별 표현 사용 |
| [매장](assets/logo-store-r2.png) | 타공 금속·유리·윈도 그래픽 | 10m 심벌, 3m 이름, 1m 제품 정보 |
| [인쇄·서비스 도구](assets/logo-collateral-r2.png) | 엠보싱·스탬프·다이컷·각인 | 단색에서도 외곽과 음각이 유지됨 |

## 6. r2 출시 전 품질 게이트

| 게이트 | r2 완료 판단 |
| --- | --- |
| Pack fidelity | 12열, 하드 유틸리티, 물성의 정직성, 하나의 주 메시지, 제한된 신호색이 매체별로 보이는가 |
| Identity | 로고·타입·코드·언어·이미지가 동일한 브랜드로 인식되는가 |
| Product truth | 작업명과 사실 상태가 모든 접점에서 같고, 가짜 상업 사실이 없는가 |
| Medium craft | 패키지·공간·의류·OOH·광고·웹에 각자의 크기·거리·제작 제약이 보이는가 |
| UX | 선택·검증·저장·결과·수정이 색만에 의존하지 않고 작동하는가 |
| Commercial gaps | 권리·성분·효능·표시·제조·재고·광고 집행의 미확정 항목이 숨겨지지 않는가 |

이 정본과 [Brand Universe r2 프리뷰](preview.html), [로고 시스템 r2](logo-system-r2.html), [제품 카탈로그](product-catalog-r1.html), [물리 시스템](physical-system-r1.html), [캠페인 시스템](campaign-system-r1.html)을 함께 평가한다. 평균이 9.0/10 미만이거나 로고·에셋 다양성·제품군·매체 일관성 중 하나가 8.5 미만이면 r2를 계속 보강한다. 최종 점수·근거·잔여 위험은 `r2-self-evaluation.md`에 기록한다.
