# R3 에셋 검증

> **Registry:** [`../assets/asset-registry.json`](../assets/asset-registry.json)  
> **결과:** 75개 등록 / 75개 구조·hash·dimensions 유효 / 세 HTML surface 사용 asset 55개 중 55개 등록 / 중복 ID·path 0

## 구성

| 분류 | 내용 | 사용 원칙 |
| --- | --- | --- |
| Identity master | symbol primary/mono/inverse/small, wordmark, lockup | code-native path SVG; 생성 mockup 표식보다 우선 |
| Product | CS-01–11, OBJ-06의 640/1120 responsive pair | 제품 사실이 아니라 synthetic visual fixture |
| People | 8개 장면의 720/1440 pair | 실제 피부·다양한 연령/장소; 효능 proof 금지 |
| Medium | product still, retail, facade, campaign, merch, objects, logo application, HOLD kit, shop HOLD, support scene | 매체별 독립 사용; 같은 crop 반복 금지 |

## 자동 검사

- SHA-256가 실제 파일과 일치;
- SVG/JPEG/PNG intrinsic dimensions가 registry와 일치;
- format, source date/reference, asset class, authority, rights, usage, history 필드 존재;
- HTML/CSS에서 참조한 asset이 registry에 존재;
- asset 폴더의 파일이 registry 밖에 남지 않음;
- R1 경로 참조가 R3 active artifact에 없음.

## 권한 해석

모든 신규 에셋의 authority ceiling은 `experiment-approved-synthetic`이고 권리 상태는 `unresolved`다. registry 100%는 파일 추적 완결성을 의미할 뿐, 상업적 권리 확보율 100%를 의미하지 않는다.

## 교체 전략

실제 촬영·제품 사진·vendor proof를 받으면 stable asset ID의 새 revision을 추가하고 source/rights/history를 갱신한다. 기존 합성 fixture는 삭제하지 않고 `superseded-for-production` 이력으로 보존한다.
