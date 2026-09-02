# COMMON SURFACE R3 validator

`validate-r3.mjs` `1.3.0`은 R3의 두 HTML preview, 고객 Web sample, Markdown 계약·증거, 로컬 asset, asset registry를 한 번에 검사하는 정적 gate다. Node.js 내장 모듈만 사용하며 R3 산출물이 아직 없는 상태에서도 누락 항목을 나열하고 종료 코드 `1`을 반환한다.

## 실행

R3 디렉터리에서:

```sh
cd experiments/design-system-value-validation-2026-08-25/r3
node tools/validate-r3.mjs
```

구조화된 결과가 필요하면:

```sh
node tools/validate-r3.mjs --json
node tools/validate-r3.mjs --json --strict-warnings
```

다른 fixture를 같은 계약으로 검사하려면:

```sh
node tools/validate-r3.mjs --root /absolute/path/to/r3-fixture
```

종료 코드는 다음과 같다.

- `0`: 모든 error gate 통과
- `1`: 하나 이상의 validation error, 또는 `--strict-warnings`에서 warning 발생
- `2`: 잘못된 CLI 인자 또는 validator 내부 오류

`--json`은 stdout에 JSON 객체 하나만 출력한다. CI에서는 프로세스 종료 코드와 `status`, `summary`, `metrics`, `findings`를 함께 보존한다.

## 필수 구조

```text
r3/
├── preview-baseline.html
├── preview-hold.html
├── sample-commerce.html
├── assets/
│   ├── asset-registry.json
│   └── ...registered assets
├── contracts/
│   └── ...at least one .md
├── evidence/
│   └── ...at least one .md
└── tools/
    └── validate-r3.mjs
```

HTML과 Markdown의 로컬 링크는 R3 안에서 실제 파일로 해석되어야 한다. R3 밖으로 나가는 로컬 경로, 존재하지 않는 링크, R1 asset 경로는 error다. URL, `data:`, `mailto:` 같은 외부 scheme은 파일 존재 검사에서 제외한다.

## 고정 HTML 계약

두 preview 모두 아래 section ID 7개를 가져야 한다.

```text
media-moodboard
media-packaging
media-shop
media-merch
media-ooh
media-ads
media-web
```

두 preview의 source에는 frozen product/object ID `CS-01`–`CS-11`, `OBJ-06`이 모두 있어야 한다.

각 preview는 최소 한 개의 `<img>`와 완결된 `<button>...</button>`을 가져야 한다. 모든 image에는 `alt`, `loading="lazy|eager"`, 양의 정수 `width`와 `height`가 필요하다. 전체 image 중 80% 이상은 `srcset`을 직접 갖거나 responsive `<picture>` 안에 있어야 한다. 모든 button에는 명시적 `type="button|submit|reset"`과 accessible name이 있어야 한다. 이름은 visible text, non-empty `aria-label`, 유효한 `aria-labelledby`, 또는 내부 image의 non-empty alt 중 하나로 판정한다.

`preview-hold.html`에는 `:focus-visible` 스타일과 다음 `data-state` token이 모두 있어야 한다.

```text
default hold affected unknown unaffected released invalid loading partial stale
success unavailable alternative retry rollback
```

또한 화면에 보이는 텍스트로 다음 개념을 모두 설명해야 한다.

- HOLD/판매 보류 상태
- 정확한 영향 batch `CS03-SYN-2608-H01`
- 영향 제품 `CS-03`
- batch unknown/미확인 경로
- claim 철회
- 선택·commit·fulfillment 차단
- 대안, support, release/rollback
- unaffected product의 정상 경로
- 실제 사건이 아닌 `experiment-approved-synthetic` 시나리오라는 경계

정규식은 KR/EN 표현을 일부 허용하지만, 의미가 같은지에 대한 최종 판단은 reviewer가 한다.

## 의미 회귀 gate revision

1차 독립 검토에서 정적 파일 검사는 통과했지만 exact batch, 접근성 mode 왕복, rollback 의미 결함을 놓쳤다. `1.1.0`은 아래 8개 구조를 추가했다.

- baseline의 `data-hold-only` 요약이 build-time `hidden`인지;
- mode 교체 image마다 `data-baseline-alt`와 `data-hold-alt`가 모두 있는지;
- 7개 매체 모두 `data-medium-propagation` target을 갖는지;
- runtime catalog가 `catalog_state`, `claim_authority_state`, `market`, `availability`, `last_updated_at`을 갖는지;
- H01 affected와 U01 known-unaffected fixture가 source에 함께 고정됐는지;
- preview/customer runtime이 `batchStatus === affected`를 exact 차단 predicate로 사용하고 unknown을 거짓 해제하지 않는지;
- release Binding revision 선적용과 7매체 propagation 경로가 있는지;
- legacy `holdReleased` product-wide boolean이 재유입되지 않는지.

`0.1.1` 독립 재평가는 이 8개 gate 통과 뒤에도 incomplete release authority, customer Web 미전파, H01/U01 상태 혼동, Back/reload retention 부재를 찾아 STOP했다. `1.2.0`은 분모를 `16`으로 확장했고, `1.3.0`은 독립 `0.2.0` 감사에서 발견된 전이·기록 결함을 반영해 `29`개 source contract로 확장했다.

- Catalog에 release scope·effective time·approver·customer copy·authority disclaimer·7-medium map·local/fulfillment permission이 모두 구조화됐는지;
- preview가 complete release record의 scope·time·approver·copy·disclaimer·medium map을 exact 검증하는지;
- Binding-first publish가 projection 갱신보다 먼저 실행되는지;
- exact H01 `released`와 U01 `unaffected`가 별도 상태인지, rollback 함수가 H01을 `unaffected`로 다시 분류하지 않는지;
- malformed release negative audit path가 있는지;
- preview가 revision-namespaced `sessionStorage` persist/restore와 `pageshow`를 구현하는지;
- 고객 Web이 같은 `localStorage` Product Binding을 `storage`/`pageshow`에서 소비하는지;
- 고객 Web이 `released`/`unaffected`를 분리하고 자체 `sessionStorage` retention을 구현하는지.
- release 뒤 내부 H01 재조회와 고객 Web HOLD 재적용이 현재 Binding으로 재분류되는지;
- canonical Binding write·readback 성공 전에는 rollback projection을 실행하지 않는지;
- HOLD 재적용도 shared Binding write·readback 성공 전에 내부 projection을 바꾸지 않는지;
- lookup·commit 비동기 작업이 request token과 settlement 재검증으로 오래된 결과를 폐기하는지;
- 입력했지만 검증하지 않은 batch가 양쪽 Web에서 fail-closed인지;
- 대안 전이와 전체 감사 ledger가 reload 뒤 보존되는지;
- 고객 Web commit record가 product뿐 아니라 batch·authority state·Binding revision을 구분하는지;
- release negative audit이 claim decision과 세 permission leaf를 포함한 `13/13`을 검사하는지.

이는 source-pattern regression gate다. 실제 클릭 순서와 접근성 tree를 증명하지 않으므로 [`../evidence/03-interaction-tests.md`](../evidence/03-interaction-tests.md)의 브라우저 E3와 결합한다.

## 임계치

| 검사 | 통과 기준 |
| --- | ---: |
| image alt | 100% |
| image loading | 100% |
| image width/height | 100% |
| `srcset` 또는 responsive `picture` | 80% 이상 |
| button type | 100% |
| button accessible name | 100% |
| 7 medium section ID | 100% |
| `CS-01`–`CS-11` + `OBJ-06` | 100% |
| HOLD state와 필수 visible text | 각각 100% |
| 의미 회귀 source contract | 29/29 = 100% |
| 실제 사용 asset의 registry 등록 | 100% |
| R1 path reference | 0건 |

분모가 0인 coverage는 100%로 계산하지만 image와 button 자체가 0개이면 별도의 required error가 발생한다. Registry 파일이 없으면 coverage는 `null`이며 `MISSING`으로 보고한다.

## asset registry 계약

최상위에는 non-empty `revision`과 `assets` 배열이 필요하다. 각 asset의 필수 형태는 다음과 같다.

```json
{
  "revision": "R3.0.0",
  "assets": [
    {
      "id": "AST-CS-01-HERO",
      "revision": "1",
      "path": "assets/cs-01-r3.png",
      "sha256": "0000000000000000000000000000000000000000000000000000000000000000",
      "width": 1600,
      "height": 1200,
      "format": "png",
      "source": {
        "type": "generated",
        "date": "2026-08-26",
        "reference": "generation-run-or-source-id"
      },
      "assetClass": "production",
      "authority": "experiment-approved-synthetic",
      "rights": {
        "status": "synthetic-only",
        "media": ["WEB", "ADS"],
        "markets": ["experiment"],
        "validFrom": "2026-08-26",
        "validUntil": null
      },
      "usage": [
        {
          "surface": "preview-baseline.html",
          "component": "CS-01 card",
          "crop": "4:3 center",
          "alt": "COMMON SURFACE CS-01 product sample"
        }
      ],
      "history": []
    }
  ]
}
```

예시의 `sha256` 0 값은 placeholder다. 아래처럼 실제 파일 hash로 교체해야 한다.

```sh
shasum -a 256 assets/cs-01-r3.png
```

추가 규칙:

- `id`와 `path`는 대소문자/정규화 기준으로 중복될 수 없다.
- `path`는 `assets/` 내부 상대 경로여야 하며 실제 파일이 있어야 한다.
- `sha256`은 선택적 `sha256:` prefix 뒤 64자리 hexadecimal이다. 실제 파일 hash와 일치해야 한다.
- `width`, `height`는 양의 정수다. PNG/JPEG/GIF/SVG는 intrinsic dimensions와 대조한다.
- `assetClass`: `master`, `reference`, `mockup`, `sample`, `production` 중 하나다.
- `authority`: `externally-authorized`, `experiment-approved-synthetic`, `unresolved`, `prohibited` 중 하나다.
- `source`는 `type`, `date`, `reference`를 가지며 date는 `YYYY-MM-DD`다.
- `rights`는 `status`, `media`, `markets`, `validFrom`, `validUntil`을 가진다. `media`와 `markets`는 배열이다.
- `usage`는 하나 이상의 `{surface, component, crop, alt}` 기록을 가진다.
- `history`는 배열이다.
- `assets/`의 registry JSON 이외 파일은 모두 등록되어야 하며, preview/contract/evidence에서 실제 참조된 asset은 100% 등록되어야 한다.

## 검사 범위의 한계

이 도구는 정적 markup/파일 gate이지 브라우저 runtime 또는 시각 QA가 아니다.

- source-level exact-batch·mode-alt·complete release·shared Binding·distinct released state·retention 계약은 검사하지만, 키보드로 실제 선택·commit·recovery가 가능한지, 중복 commit 방지, live region 발표, cross-tab storage event·Back/reload 상태 전이는 직접 실행하지 않는다.
- 390px/1440px reflow, 200% zoom, overflow, contrast, non-color cue, reduced motion, console error, 성능 budget은 측정하지 않는다.
- `srcset`/`picture`는 markup 적용 여부만 세며 적절한 후보 크기·crop·전송량은 판단하지 않는다.
- accessible name 판정은 정적 근사치이며 브라우저 accessibility tree를 대체하지 않는다.
- HTML/Markdown은 일반적인 quoted attribute와 표준 Markdown inline-link 형태를 전제로 한다. 동적으로 생성되는 URL·image와 복잡한 reference-style link는 놓칠 수 있다.
- intrinsic dimension 검증은 PNG/JPEG/GIF/SVG만 지원한다. 다른 format은 warning이며 `--strict-warnings`에서 실패한다.
- 실제 권리, claim, 규제, production readiness는 registry 필드의 존재만 확인할 뿐 진위를 인증하지 않는다.
- symlink의 실제 대상 경계까지 추적하지 않는다.

현재 frozen 0.2.0 실행 결과는 error/warning `0/0`, semantic `29/29`, local refs `259`, registry `75/75`다. 이 숫자는 해당 snapshot의 정적 결과이며 파일 변경 뒤에는 다시 실행해야 한다.

따라서 validator `PASS`는 R3 정적 계약 통과를 뜻하며 R3 평가 계약의 E3/E4 runtime·외부 증거, 독립 acceptance 또는 상업 출시 승인을 뜻하지 않는다.
