# COMMON SURFACE — R4 최소 브랜딩 검증

R4는 R3의 시스템 운영 검증을 반복하지 않고, 브랜드 입력의 밀도가 결과물의 설득력과 식별성에 미치는 영향을 최소 단위로 확인하는 실험이다.

- [최소 브랜딩 검증 브리프](brand-minimum-validation-brief.md)
- [전후 비교 프리뷰](preview.html)
- [평가 기록](01-evaluation.md)

## 실행

실험 폴더의 상위 디렉터리에서 다음을 실행한다.

```bash
python3 -m http.server 8765 --directory experiments/design-system-value-validation-2026-08-25
```

그 뒤 `http://127.0.0.1:8765/r4/preview.html`을 연다. 이 프리뷰는 `pack:industrial-swiss@1.0.0`, `decision.reserve@0.1.0`, R3의 `CS-04` 제품 이미지를 읽기 전용으로 사용한다.

프리뷰에는 기준선 콘셉트 보드와 연결되는 후속 라이프스타일 에셋(`assets/r4-seal-after-shower-lifestyle.png`)도 포함되어 있다. 이 보강 에셋은 최초 점수에 소급하지 않는다.
