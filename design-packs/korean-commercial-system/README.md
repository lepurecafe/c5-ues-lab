# Korean Commercial Design System — 운영 문서 맵

[`korean-commercial-system.md`](korean-commercial-system.md)가 배포·평가·AI 전달에 사용하는 **단일 정본**이다. 아래 문서는 정본을 대체하거나 별도의 토큰 진실을 만들지 않는다. 구현/QA 중 발견한 변경은 먼저 정본의 증거·GAP·릴리스 게이트에 반영한다.

| 문서 | 소유 영역 | 사용할 때 |
| --- | --- | --- |
| [korean-commercial-system.md](korean-commercial-system.md) | 전체 계약, 문화적 경계, 정본 평가 | 새 구현/리뷰/디자인 전달 |
| [preview.html](preview.html) | 정본의 시각·검증 흐름을 탐색하는 로컬 프리뷰 | 빠른 시각 검토와 데모 |
| [foundation.md](foundation.md) | 토큰, 타입, 기하, 표면 | 디자인 토큰/스타일 어댑터 구현 |
| [components.md](components.md) | 컴포넌트 상태, 다이얼로그/진행/툴팁 | UI 라이브러리 구현과 상태 검수 |
| [patterns.md](patterns.md) | 화면 조합 레시피와 콘텐츠 규칙 | 화면 설계·Figma 투영 |
| [flows-and-qa.md](flows-and-qa.md) | 등록 흐름, 복구, 접근성·런타임 증거 | QA와 출시 판정 |

## 운영 규칙

1. 원본의 단청·보자기·한지 논리는 구조와 위계에 사용한다. 단순 장식 또는 범문화적 “동양풍”으로 일반화하지 않는다.
2. 토큰의 raw 값과 semantic 역할을 분리한다. 원색 교체가 상태 의미를 바꾸면 안 된다.
3. Figma 화면, 정적 코드, 런타임, 접근성, 사용자 검증은 서로 다른 증거다. 하나를 다른 하나의 증명으로 취급하지 않는다.
4. 추가 컴포넌트나 패턴은 이 문서 맵에 연결하고, 정본의 Coverage status와 Release gate도 갱신한다.
