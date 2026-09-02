# COMMON SURFACE — Synthetic Brand Application Fixture

> **Working name:** `COMMON SURFACE`  
> **Status:** internal fictional brand; trademark, domain, formula, claims, manufacturing, model, image, font, and retail rights have not been cleared.  
> **Experiment role:** test whether an existing Markdown Design Pack can support coherent brand maintenance across skincare, merchandise, retail, advertising, and digital experience.

## 1. Brand definition

COMMON SURFACE is an all-gender daily skincare and everyday-object brand. It treats skin care as a practical, learnable routine rather than a gendered beauty correction or medical diagnosis.

- **Brand idea:** `Care for the surface you live in.`
- **Promise:** understandable daily care, honest information, and objects worth keeping.
- **Audience:** adults of all genders, skin tones, and levels of skincare knowledge.
- **Character:** precise, tactile, direct, inclusive, quietly expressive.
- **Avoid:** gender-coded “for men/women,” shame or flaw language, unverified clinical authority, miraculous results, over-retouched skin, luxury vagueness.

The working name must not be published until an external name/trademark review is complete.

## 2. Starting system

### Design Pack

- **Selected:** [`pack:industrial-swiss@1.0.0`](../../../design-packs/industrial-swiss-system/industrial-swiss-system.md)
- **Why:** its grid discipline, catalog hierarchy, material honesty, merchandise/physical-label grammar, and dense product/operations components can span skincare packaging, garments, signage, advertising, and commerce.
- **Known tension:** the Pack explicitly warns against soft therapeutic or luxury-minimal use. COMMON SURFACE therefore adopts an honest utilitarian/cultural-object position, not spa softness or pseudo-clinical luxury.
- **Rights boundary:** no Supreme, Carhartt, collaboration marks, product imagery, SKU, origin, price, or copy from the source may enter COMMON SURFACE.

### UX Preset

- **Representative interactive task:** [`decision.reserve@0.1.0`](../../../ux-presets/decision.reserve.md) for choosing one suitable routine starter/product and making a reversible local selection.
- **Scope:** the Preset applies only to the representative interactive product-selection flow. Packaging, moodboard, T-shirt, shop, OOH, and static banners use Medium/Projection contracts rather than pretending to be interactive UX.
- **Boundary:** Brand Experience principles shape voice, explanation, interaction tone, and service continuity. Product Binding and UX Preset still own objects, validity, commitment, result, and recovery.

### Representative Product Binding

| Field | Frozen value |
| --- | --- |
| ID / version | `binding.common-surface-starter-selection@0.1.0-experiment` |
| User and goal | an adult chooses one understandable starter product without gender segmentation or medical diagnosis |
| Candidate objects | `CS-01`–`CS-04`; `CS-05` enters only in revision 2 with unresolved SPF/PA/efficacy authority |
| Inputs | routine step, texture/use preference, fragrance preference if known, and explicitly optional non-medical context |
| Eligibility | candidate exists in the frozen synthetic fixture, required comparison facts are present, and no unresolved claim is used as fit evidence |
| Recommendation authority | local synthetic rule; rationale and limitations stay visible and the user may replace the suggestion |
| Primary commitment | save one product ID as the local experiment's starter selection |
| Side effect | local prototype state only; no purchase, reservation, account, inventory, consultation, or fulfillment action |
| Confirmed outcome | selected product ID, `local-selection-confirmed` status, rationale snapshot, and edit/reset/help next actions |
| Retention | preserve valid inputs and draft selection on Back; Cancel discards the uncommitted draft; Reset clears the confirmed local selection |
| Failure/recovery | incomplete facts block commitment; unavailable/removed candidates retain inputs and offer a labeled alternative; retry cannot duplicate the local record |
| Data and privacy | synthetic catalog and local ephemeral inputs; no diagnosis, sensitive skin profile, account, or external service |

### Authority-state vocabulary

Never use `approved` alone for product facts, claims, or assets.

| State | Meaning | Allowed use |
| --- | --- | --- |
| `experiment-approved-synthetic` | frozen fictional content accepted only for this experiment | visible in the prototype with synthetic status; never evidence of market truth |
| `externally-authorized` | source owner, regulator, vendor, or rights holder supplied evidence for the declared scope | use only within the documented market, medium, term, and claim scope |
| `unresolved` | authority or evidence is absent or incomplete | may appear as a labeled gap; cannot support persuasion, eligibility, or production readiness |
| `prohibited` | known to violate the fixture, rights boundary, or safety rule | must not enter an output |

## 3. Brand Experience Profile

| Field | Frozen value |
| --- | --- |
| ID | `brand-experience.common-surface` |
| Version | `0.1.0-experiment` |
| Owner | COMMON SURFACE Composition |
| Experience mission | make everyday care understandable, non-judgmental, and controllable across physical and digital touchpoints |
| Primary trust signal | authority-tagged facts, visible limits, and consistent next actions—not clinical theater or urgency |
| Promotion rule | keep local until equivalent rules prove reusable in at least two independent brands |

This profile is a behavioral bridge between brand expression and product experience, not a replacement for either. It governs voice, service attitude, sensory continuity, and cross-touchpoint truth. Design Pack still owns visual capability; Product Binding owns facts and validity; UX Preset owns interactive decision, commitment, result, and recovery semantics; Medium/Projection owns physical and technical constraints.

### Philosophy

| ID | Principle | Behavioral contract |
| --- | --- | --- |
| BX-01 | Care without gender assumptions | Never infer routine, concern, color, copy, imagery, or product from gender. Ask only task-relevant questions. |
| BX-02 | Explain before persuade | Ingredient, use, limitation, price/unit, and claim authority precede aspirational copy when they affect choice. |
| BX-03 | Routine, not diagnosis | Help users form a routine; do not diagnose conditions or present cosmetic guidance as medical fact. |
| BX-04 | Visible uncertainty | Unverified claims, incomplete compatibility, stock, tester availability, and advice limits remain explicit. |
| BX-05 | Quiet control | One clear primary action, reversible exploration, preserved input, and no urgency pattern without product authority. |
| BX-06 | Same truth across surfaces | Packaging, shelf label, staff prompt, web card, banner destination, and post-purchase guide use the same authority-tagged product facts. |
| BX-07 | Real skin, real material | Photography preserves visible texture and varied skin; physical material and finish are documented, not simulated as proof. |
| BX-08 | Recovery is care | Errors, unavailable items, irritation/support boundaries, return/help paths, and alternative routines use calm, specific next actions. |

### UX design signature

| ID | Design rule | Observable test |
| --- | --- | --- |
| UX-01 | One clear task per surface | each package panel, shelf block, banner, or screen has one declared primary reading/action priority |
| UX-02 | Facts before persuasion | decision-critical use, quantity, limitation, price/status, and authority are reachable before commitment |
| UX-03 | Explore before commit | browse, compare, tester use, recommendation, user selection, and commitment are visibly distinct where interactive |
| UX-04 | Context-preserving disclosure | expanded ingredients, directions, or limitations do not erase the current product, comparison, or next action |
| UX-05 | Calm status and recovery | unavailable, incomplete, invalid, and failed states name cause, retained context, and next safe action without blame |
| UX-06 | Physical/digital continuity | product ID, authority-tagged facts, claim status, and support destination match across package, shelf, staff aid, web, and QR fallback |
| UX-07 | Inclusive perception | meaning is not encoded by gender, color alone, retouching, tiny legal text, or assumed skincare literacy |
| UX-08 | Deliberate sensory restraint | motion, sound, texture, gloss, and accent serve orientation or feedback and have accessible/static alternatives |

## 4. Experience voice and interaction design

### Voice

- Lead with the task or status: `세안 후 2–3방울`, `현재 품절`, `성분 정보 확인`.
- Prefer specific limits over absolute promises: `보습을 돕도록 설계` rather than `장벽을 완벽히 회복`.
- Use neutral body language: `피부 타입/현재 상태/사용 환경`, never gendered assumptions.
- Error copy names cause, retained data, and next action.
- Promotional copy cannot outrank required ingredients, quantity, price, warnings, and claim qualifications.

### Interaction character

| Area | Brand behavior |
| --- | --- |
| Selection | system suggestion is labeled and replaceable; user choice remains distinct |
| Disclosure | essential product facts stay visible; ingredients, directions, limitations expand without losing context |
| Motion | short functional transitions; no pulsing urgency; reduced-motion equivalent |
| Feedback | factual status + icon/text; brand red/gold cannot be the only success/warning signal |
| Forms | preserve valid input, associate errors with fields, avoid unnecessary personal data |
| Commitment | one dominant local action; price/quantity/availability and consequence visible before commitment |
| Result | selected item or local prototype result, status, next action, edit/undo/help path |

## 5. Cross-touchpoint journey

| Stage | Touchpoints | Experience requirement |
| --- | --- | --- |
| Discover | OOH, banner, social crop, shop window, T-shirt | one recognizable brand signal and one truthful proposition; destination/next step visible |
| Orient | façade, wayfinding, landing, collection index | explain product/merch distinction and where to start without gender segmentation |
| Understand | packaging, tester card, product page, shelf ticket | consistent name/code/quantity/use/ingredients/limitations/source |
| Choose | staff handoff, routine card, product detail, `Reserve` flow | suggestion rationale, alternatives, user control, no diagnostic claim |
| Commit | cart or local experiment selection | price/quantity/status/consequence, reversible correction, explicit commitment |
| Use | package, regimen card, care label, QR destination | sequence, amount, frequency, material/product care, warning/help continuity |
| Return | refill/reorder/support/store visit | previous context when permitted, unavailable alternative, returns/help authority |

## 6. Product and merchandise lineup

Product codes and working names are `experiment-approved-synthetic`. Formulas, materials, prices, quantities, ingredient lists, availability, and performance claims remain `unresolved` unless a row explicitly says otherwise; none are `externally-authorized` at fixture freeze.

### Skincare core line

| Code | Working product | Role |
| --- | --- | --- |
| CS-01 | RINSE / GEL CLEANSER | cleanse |
| CS-02 | BALANCE / ESSENCE | prepare |
| CS-03 | BARRIER / SERUM | treat/support |
| CS-04 | SEAL / DAILY CREAM | moisturize |

### Merchandise line

| Code | Working product | Required information |
| --- | --- | --- |
| OBJ-01 | FIELD TEE | size, material, fit, care, origin authority |
| OBJ-02 | FACE TOWEL | material, dimensions, care |
| OBJ-03 | ZIP POUCH | material, dimensions, use/care |
| OBJ-04 | STEEL BOTTLE | capacity, material, care/safety |
| OBJ-05 | ROUTINE ZINE | edition, language, contents, rights |

## 7. Brand design system outputs

### Brand foundation and moodboard

- brand thesis, audience, non-goals, voice, experience principles;
- Industrial Swiss capability mapping and recorded COMMON SURFACE adaptations;
- typography/CJK fallback, grid, color roles, material/finish, photography, iconography;
- moodboard Source Register with `observed / derived / unresolved / permission-required` labels;
- moodboard lanes: real skin/casting, lab/utility, paper/metal/cotton, retail architecture, editorial grid, outdoor scale;
- explicit anti-moodboard showing prohibited gender stereotypes, retouching, pseudo-clinical claims, distressed texture over required information.

### Reusable brand components

`Brand Signature`, `Collection/Campaign Lockup`, `Product Code`, `Product Card`, `Regimen Step`, `Ingredient/Claim Strip`, `Quantity/Price Unit`, `Status`, `CTA`, `Package Label`, `Shelf Ticket`, `Tester Card`, `Wayfinding Sign`, `Garment Graphic`, `Care Label`, `Ad End-frame`, `QR/Next-step Block`.

Each applicable component declares content authority, required fields, scale variants, localization, material/screen adaptation, and interactive states where relevant.

### Required projection set

| Medium | Required artifact | Test frame; not production specification |
| --- | --- | --- |
| Packaging | CS-01 and CS-03 front/back label systems | 60 × 120 mm sample canvas; dieline/bleed pending |
| Offline shop | façade, window, shelf/ticket, tester/wayfinding set | 3:1 sign, 9:16 window, A6 shelf/tester samples |
| T-shirt | OBJ-01 front/back graphic + care label | 300 × 400 mm sample art area; print method pending |
| OOH | campaign headline/product/next step | 2:1 landscape and 1:2 portrait ratios |
| Digital ads | responsive campaign family | 1200×628, 1080×1080, 1080×1920 |
| Commerce/brand web | collection, product, representative Reserve flow | 1440×1000 and 390×844 |
| Moodboard | source-backed visual/experience direction | 16:9 board plus Markdown Source Register |

### Frozen medium-fitness contract

Every required medium has five binary checks fixed before revision 1. `Medium Fitness = passed checks ÷ 5 × 100`; the total denominator is `35`. A mandatory check cannot become `not-applicable` after M0.

| Medium | IDs and frozen checks | Denominator |
| --- | --- | ---: |
| Moodboard | `MB-01` source/status; `MB-02` reference-to-rule mapping; `MB-03` inclusive real-skin/material direction; `MB-04` anti-moodboard; `MB-05` reference-rights vs campaign-use boundary | 5 |
| Packaging | `PKG-01` identity/product facts; `PKG-02` information hierarchy/authority safe zone; `PKG-03` KR/EN legibility at sample scale; `PKG-04` material/finish/dieline evidence boundary; `PKG-05` cross-touchpoint parity | 5 |
| Offline shop | `SHOP-01` 10m/3m/arm-length hierarchy; `SHOP-02` zoning/wayfinding; `SHOP-03` tester/unavailable/recovery; `SHOP-04` access/installation/operations gaps; `SHOP-05` product/service parity | 5 |
| T-shirt/merch | `MERCH-01` graphic placement/brand grammar; `MERCH-02` size/material/care hierarchy; `MERCH-03` print/contrast/scale; `MERCH-04` rights/production gap; `MERCH-05` product/brand continuity | 5 |
| OOH | `OOH-01` one message; `OOH-02` distance/ratio hierarchy; `OOH-03` authority-tagged claim; `OOH-04` next-step/fallback; `OOH-05` vendor/placement/proof gap | 5 |
| Digital ads | `ADS-01` ratio/crop; `ADS-02` message/CTA/destination; `ADS-03` localization/readability; `ADS-04` claim/asset/platform rights; `ADS-05` destination parity | 5 |
| Commerce/Reserve web | `WEB-01` candidate/authority state; `WEB-02` focus/keyboard/reflow/non-color cues; `WEB-03` unavailable/invalid/loading/alternative recovery; `WEB-04` local commit/result evidence; `WEB-05` product/claim parity and runtime ceiling | 5 |

Exit rule: every mandatory medium must score at least `80` (`4/5`). Any medium below `70` is `REVISE`; any medium hard-gate violation is `STOP` regardless of score.

## 8. Brand invariants

| ID | Invariant |
| --- | --- |
| BI-01 | Industrial Swiss grid, hard utility, material honesty, and bounded signal remain recognizable |
| BI-02 | all-gender language and casting; no gender-based product logic |
| BI-03 | product code/name/quantity/use/claim authority remain identical across applicable touchpoints |
| BI-04 | status, safety, selection, and limitations are never color-only or promotional decoration |
| BI-05 | skincare and merchandise share one brand grammar but preserve category-specific required information |
| BI-06 | static advertising points to a truthful next step and never simulates completed interaction |
| BI-07 | brand character cannot remove selection, validation, commitment, result, recovery, or accessibility meaning |
| BI-08 | reference-brand marks/assets and unverified cosmetic/medical/environmental claims never enter output |

## 9. Baseline — revision 1

Canonical baseline: [`common-surface-brand-application-r1.md`](../artifacts/common-surface-brand-application-r1.md).

It specifies:

- brand/experience foundation and moodboard;
- CS-01/CS-03 packaging samples;
- one shop sign, shelf ticket, and tester card;
- OBJ-01 T-shirt and care-label sample;
- one OOH and digital banner family;
- web product card and representative `decision.reserve` flow;
- component catalogue, source/evidence register, rights/claims gaps.

## 10. Controlled update — `OUTSIDE / 01`, revision 2

The fictional update introduces an outdoor-care campaign and expands the merchandise/retail system without changing the underlying Design Pack or UX Preset.

| ID | Change request | Expected ownership |
| --- | --- | --- |
| CR-01 | Add working sun-care product `CS-05 SCREEN`; all SPF/PA/efficacy copy remains authority-pending | Product Binding/content authority |
| CR-02 | Add `OBJ-06 OUTSIDE TEE` and `OBJ-07 FIELD CAP` with size/material/care hierarchy | Brand application/product data |
| CR-03 | Create `OUTSIDE / 01` campaign lockup and a bounded seasonal use of Pack accent | Brand application/Pack mapping |
| CR-04 | Update moodboard with daylight, real skin texture, cotton/metal/paper, shop exterior, outdoor-scale references | Brand application/evidence |
| CR-05 | Propagate the campaign to packaging, shop window/shelf, T-shirt, OOH, and digital banner ratios | Medium/Projection |
| CR-06 | Preserve `experiment-approved-synthetic` facts and all authority-state labels across package, shelf, web, ad destination, and staff/tester card | Binding/Composition |
| CR-07 | Add Korean/English long-copy and CJK fallback checks without corrupting condensed display hierarchy | Pack capability/Medium |
| CR-08 | Complete web focus-visible, unavailable, invalid, loading, success, alternative-product recovery | Pack capability/Projection |
| CR-09 | Add print/fabric/signage production-gap register: bleed, color profile, ink, fabric, durability, installation | Medium/production evidence |
| CR-10 | Record manifest revision, decision log, stale references, rights/claim gaps, and rollback path | Governance |

## 11. Commercial and safety boundaries

- Cosmetic ingredient, allergy, dermatological, SPF/PA, “tested,” “clean,” sustainability, origin, and recycling claims require external authority.
- Model and photographer releases, image licenses, font licenses, garment blank/print rights, store/sign installation permissions, and advertising placement rules are unresolved.
- Moodboard images are references, not automatically reusable campaign assets.
- Packaging canvas is not a manufacturing dieline; T-shirt art is not a production separation; OOH ratios are not vendor proofs.
- Interactive Preview cannot prove checkout, inventory, accessibility, consultation, or medical suitability.
