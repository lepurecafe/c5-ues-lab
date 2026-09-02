# Battle Context Research

- 확인일: 2026-08-26 (Asia/Seoul)
- 대상: iPhone용 랩배틀·댄스배틀 랜덤 비트 선택 프로토타입
- 목적: 배틀 현장의 음악 운영 요구를 제품 바인딩에 반영하기 위한 외부 근거 정리
- 범위: round/time, DJ 음악 선택, 예측 불가능성, clean/instrumental, 실패·복구, 공정성

이 문서는 제품 맥락을 보강하는 연구 자료다. 시각 언어와 경험 규칙의 정본은 각각 선택된 Markdown 디자인팩과 UX 프리셋이며, 외부 자료가 이를 대체하지 않는다. 모든 프로토타입 트랙은 가상 데이터로 유지한다.

## 증거 표기

- `직접 확인됨`: 링크된 주최사·대회 운영 주체·경기 단체의 문서나 페이지에서 직접 확인한 사실
- `설계 추론`: 직접 확인된 사실을 이번 제품에 적용하기 위한 결정 후보. 원문 규정 자체가 아님
- `결정 필요`: 제품 책임자 또는 사용자 검증이 필요한 범위

## 직접 확인된 규정과 운영 사실

### 1. 랩배틀과 댄스배틀은 같은 핵심 운영 골격을 공유한다

- `직접 확인됨` FMS 2025/26 규정은 event organizer, artist, judge, speaker, DJ 등 복수 역할을 경기 운영 주체로 다룬다. 경기에는 Random Mode, 60초 자유 랩의 ida/vuelta, instrumental이 포함된 Deluxe가 있다. [FMS 2025/26 공식 규정](https://urbanroosters.news/reglamento-disciplinario-freestyle-master-series-2025-26/)
- `직접 확인됨` Red Bull의 프리스타일 배틀 가이드는 DJ를 MC가 즉흥 랩에 사용할 음악 기반을 선택·믹스하는 역할로, Host를 경기 진행 역할로 설명한다. [Red Bull 프리스타일 배틀 가이드](https://www.redbull.com/pe-es/guia-para-seguir-batallas-freestyle)
- `직접 확인됨` HHI All Styles Battle은 두 참가자가 라이브 DJ의 음악에 즉흥적으로 반응하는 1대1 구조다. [HHI All Styles Battles](https://hiphopinternational.com/rulesregulations-allstyles/)

따라서 두 종목 모두 `운영자 또는 DJ가 음악 조건을 준비 → 트랙이 제시·재생됨 → 참가자가 즉흥 수행 → 라운드 종료·다음 선택`이라는 공통 골격을 갖는다. 단, 랩과 댄스에 적합한 비트의 특성은 같다고 볼 수 없다.

### 2. 라운드는 짧고 재생 시작이 경기 시간을 좌우한다

- `직접 확인됨` HHI All Styles의 첫 라운드는 참가자당 약 45초이며, 동률이면 참가자당 45초의 추가 라운드가 진행된다. 결승은 참가자당 1분씩 두 라운드다. [HHI All Styles Battles](https://hiphopinternational.com/rulesregulations-allstyles/)
- `직접 확인됨` FMS 2025/26의 자유 랩은 각 60초이며, 정확한 동점이면 120초 4×4 réplica가 진행된다. [FMS 2025/26 공식 규정](https://urbanroosters.news/reglamento-disciplinario-freestyle-master-series-2025-26/)
- `직접 확인됨, 구판 참고` WDSF Hip-Hop 1v1 v1.15는 DJ가 재생을 시작하면 경기 시계가 시작되고 표준 수행 시간은 참가자당 60초라고 명시한다. 현재 WDSF 규정 페이지는 Breaking Manual v15를 정본으로 안내하므로, 이 문서는 현장 cue의 중요성을 보여 주는 구판 운영 근거로만 사용한다. [WDSF Hip-Hop 1v1 v1.15 PDF](https://srbijaples.rs/wp-content/uploads/2021/11/1.15-version-WDSF-Rules-and-Regulations-Manual-for-Hip-Hop-1v1.pdf), [WDSF 현재 규정 목록](https://www.worlddancesport.org/Rules)

### 3. DJ 선택과 예측 불가능성은 배틀의 핵심 조건이다

- `직접 확인됨` HHI All Styles는 Battle DJ가 음악을 라이브로 고르며, 참가자는 예측 불가능하고 동적인 비트에 대응해야 한다고 설명한다. 음악은 rap, pop, breakbeats, funk, electronica, house 등으로 달라질 수 있고, 한 배틀에는 한 트랙을 사용한다. [HHI All Styles Battles](https://hiphopinternational.com/rulesregulations-allstyles/)
- `직접 확인됨` Red Bull Dance Your Style 2026은 최근의 글로벌 히트부터 클래식 비트까지 예측 불가능한 음악에 대한 freestyle과 musicality를 시험한다. [Red Bull Dance Your Style 2026](https://www.redbull.com/us-en/red-bull-dance-your-style)
- `직접 확인됨, 2023 포맷 설명` Red Bull은 Dance Your Style을 사전 선택된 음악이나 안무 없이, 무작위로 선택된 음악에 맞춰 진행하는 형식으로 설명했다. [Red Bull Dance Your Style 2023 format](https://www.redbull.com/us-en/red-bull-dance-your-style-2023-line-up)
- `직접 확인됨` HHI Breaking은 모든 음악을 competition DJ가 선택하며 musicality와 energy를 평가 요소로 둔다. [HHI Breaking Battles](https://hiphopinternational.com/rulesregulations-breaking/)

### 4. 장르·BPM·편곡 밀도는 수행 난도와 직접 연결된다

- `직접 확인됨` Red Bull Batalla의 참가 안내는 자신의 musicality에 맞는 instrumental 선택을 권하고, BPM에 따라 비트 패턴과 화면 자극의 정렬이 달라져 즉흥 판단이 더 복잡해질 수 있다고 설명한다. [Red Bull Batalla 참가 가이드](https://www.redbull.com/car-es/consejos-inscripcion-batalla)
- `직접 확인됨, 주최사 인터뷰` Red Bull의 배틀 비트 프로듀서 인터뷰는 MC가 전면에 설 수 있도록 단순한 구성, 적은 변화, 많은 여백을 가진 비트가 사용되어 왔다고 설명한다. [Red Bull: La Banda Sonora del Freestyle](https://www.redbull.com/pe-es/la-banda-sonora-del-freestyle)
- `직접 확인됨` HHI All Styles는 다양한 장르의 변화와 musicality를 경기 조건·평가 요소로 명시한다. [HHI All Styles Battles](https://hiphopinternational.com/rulesregulations-allstyles/)

### 5. Clean 정책과 백업은 실제 대회 운영 요구다

- `직접 확인됨` HHI 2025/26 규정은 욕설처럼 들리는 표현, 부적절·성적·공격적 가사를 금지하며 주최자가 부적절한 음악을 거부할 수 있게 한다. 또한 재생 장치가 정상이어야 하고 백업 장치를 항상 준비하도록 요구한다. [HHI 2025/26 Full Rules PDF](https://hiphopinternational.com/wp-content/uploads/2025/12/HHI2025-2026-RULES-REGULATIONS-COMPLETE.pdf)
- `직접 확인됨` FMS 2025/26은 인종차별, 동성애 혐오, 살인·테러·성폭력 등 민감한 내용을 조장하는 발화를 심사상 제재할 수 있다고 명시한다. 이는 트랙보다 참가자 발화에 대한 규정이지만, 현장 서비스에 명시적 콘텐츠 정책이 필요하다는 맥락을 제공한다. [FMS 2025/26 공식 규정](https://urbanroosters.news/reglamento-disciplinario-freestyle-master-series-2025-26/)

### 6. 잘못된 cue와 장비 고장은 별도 복구 절차가 필요한 사건이다

- `직접 확인됨` HHI 2025/26은 잘못 재생·cue된 음악, 장비 고장에 따른 음악 문제, 일반 음향 장애를 extraordinary circumstance로 분류한다. 문제를 확인하고 수정한 뒤 참가자를 다시 무대로 불러 루틴을 재시작하도록 한다. [HHI 2025/26 Full Rules PDF](https://hiphopinternational.com/wp-content/uploads/2025/12/HHI2025-2026-RULES-REGULATIONS-COMPLETE.pdf)
- `직접 확인됨` Red Bull Batalla 앱 FAQ는 Bluetooth 헤드폰의 지연, 음성과 비트의 잘못된 음량 균형, 연결 품질을 실제 음향·업로드 실패 요인으로 안내한다. [Red Bull Batalla App FAQ](https://www.redbull.com/co-es/event-series/red-bull-batalla/batalla-app-faq)

### 7. 공정성은 무작위성만이 아니라 동일 조건과 비편향 운영을 포함한다

- `직접 확인됨` HHI All Styles는 한 배틀에 한 트랙을 사용한다고 명시한다. [HHI All Styles Battles](https://hiphopinternational.com/rulesregulations-allstyles/)
- `직접 확인됨, 구판 참고` WDSF Breaking v8은 한 라운드의 두 참가자에게 같은 break track을 처음부터 재생하고, DJ가 어느 참가자에게도 유리하거나 불리하게 행동해서는 안 된다고 규정했다. 현재 규정 준수 주장에는 WDSF v15 원문 재확인이 필요하다. [WDSF 현재 규정 목록](https://www.worlddancesport.org/Rules), [WDSF Breaking v8 참고본](https://www.scribd.com/document/773513697/Clean-Version-WDSF-Breaking-Rules-and-Regulations-Manual-Version-8-April-2024)
- `직접 확인됨` FMS 2025/26은 심판과 운영 주체가 특정 참가자를 조작·유리·불리하게 만드는 행위를 금지하고 투명성과 meritocracy를 규정의 목표로 둔다. [FMS 2025/26 공식 규정](https://urbanroosters.news/reglamento-disciplinario-freestyle-master-series-2025-26/)

## 이번 제품에 대한 설계 추론

아래 항목은 위 출처에서 직접 규정된 앱 요구가 아니라, 이번 가상 트랙 프로토타입에 적용하기 위한 제품 바인딩 후보이다.

### 공통 핵심 흐름

1. 운영자가 `Rap Battle` 또는 `Dance Battle`을 고른다.
2. 최소 조건만 조정한다: BPM 대역, 장르, 에너지, Clean/Instrumental.
3. `Draw` 한 번으로 조건 안에서 가상 트랙을 추첨하고 즉시 재생한다. 별도 Start 단계는 두지 않는다.
4. 재생 중에는 현재 트랙, BPM, 장르, 에너지, Clean/Instrumental, 라운드 귀속, 재생 상태를 크게 표시한다.
5. 운영자는 일시정지, 같은 트랙 처음부터 재시작, 저장, 제외, 합의된 다시 뽑기를 수행할 수 있다.
6. 라운드 종료 후 같은 조건으로 다음 트랙을 받거나 조건 화면으로 돌아간다.

### 종목별 기본값

- `설계 추론` Rap Battle은 vocal-free, 낮은 편곡 밀도, 명확한 마디 시작점, MC가 들어갈 여백을 기본으로 한다.
- `설계 추론` Dance Battle은 장르 범위와 리듬 변화가 넓고, 신체적으로 읽기 쉬운 accent와 energy 대비가 있는 비트를 기본으로 한다.
- `설계 추론` 두 종목은 정보 구조와 상태 모델을 공유하되 추천 필터의 기본값만 다르게 둔다.

### 시간 압박 대응

- `설계 추론` 현장 주 경로는 한 손 기준 1–2회 탭 안에 추첨·재생되어야 한다.
- `설계 추론` 재생 중 핵심 조작은 화면 전환 없이 도달 가능해야 한다.
- `설계 추론` 곡 설명보다 현재 상태와 다음 행동의 우선순위를 높인다.

### Clean/Instrumental 정책

- `설계 추론` 프로토타입 라이브러리는 전곡을 가상 instrumental로 표시한다.
- `설계 추론` `Clean / Instrumental` 상태를 현재 재생 화면에서 숨기지 않는다.
- `결정 필요` 향후 실서비스가 보컬 트랙을 포함할 경우, 언어별 가사 검수 주체와 explicit 허용 정책을 별도 결정해야 한다.

### 실패와 복구 우선순위

1. `설계 추론` 같은 트랙을 처음부터 다시 재생한다.
2. `설계 추론` 사전 로드된 동일 트랙 또는 백업 소스로 전환한다.
3. `설계 추론` 그래도 실패하면 현재 라운드·추첨 기록을 보존한 채 오류 상태를 표시한다.
4. `설계 추론` 새 트랙 추첨은 자동 실행하지 않고 운영자가 명시적으로 선택한다. 오류가 공정 조건을 임의로 바꾸지 않게 하기 위함이다.
5. `설계 추론` 추천 실패와 오디오 재생 실패는 서로 다른 오류로 기록·표시한다.

### 공정성 로그

외부 규정은 이번 앱의 로그 형식을 직접 요구하지 않는다. 아래는 제3자가 추첨과 변경을 사후 검토할 수 있게 만드는 `설계 추론`이다.

- battle/round ID
- 모드: Rap 또는 Dance
- 추첨 시각
- 적용된 BPM·장르·에너지·Clean 조건
- 가상 track ID와 seed 또는 selection event ID
- 최초 재생, 일시정지, 같은 트랙 재시작, 실패, 복구 시각
- 다시 뽑기 요청 주체와 사유
- 제외된 track ID와 제외 사유

`결정 필요`: 로그를 참가자에게 실시간 공개할지, 운영자 기록으로만 보존할지, 그리고 양측 합의가 필요한 다시 뽑기 기준은 제품 정책으로 확정해야 한다.

## 출처 한계와 사용 원칙

- 대회마다 랩·댄스 포맷과 음악 권한이 다르다. 위 자료는 보편 법칙이 아니라 공통 운영 요구를 찾기 위한 표본이다.
- WDSF의 직접 세부 규칙 중 일부는 v8 또는 Hip-Hop 1v1 v1.15 참고본에서 확인했다. WDSF 공식 페이지가 현재 안내하는 정본은 Breaking Manual v15이므로, 실제 대회 규정 준수나 공인 fairness claim에는 v15 원문을 다시 확인해야 한다.
- HHI의 clean·백업·extraordinary circumstance 조항은 crew routine 운영에도 적용되는 규정이다. 이번 1대1 랜덤 비트 앱에는 안전한 운영 패턴의 근거로만 확장한다.
- 본 실험은 실제 음원 라이선스, 스트리밍 서비스 연동, 공연권 처리의 유효성을 검증하지 않는다.
