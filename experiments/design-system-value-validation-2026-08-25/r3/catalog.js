(function registerCommonSurfaceData() {
  const products = [
    { id: 'CS-01', name: 'RINSE', ko: '젤 클렌저', role: '세정 단계', category: 'face', form: '알루미늄 펌프', image: 'cs-01', authority: '제품명·역할은 합성 실험값 · 성분·효능 미확정' },
    { id: 'CS-02', name: 'BALANCE', ko: '에센스', role: '준비 단계', category: 'face', form: '프로스티드 유리 보틀', image: 'cs-02', authority: '제품명·역할은 합성 실험값 · 성분·효능 미확정' },
    { id: 'CS-03', name: 'BARRIER', ko: '세럼', role: '보조 단계', category: 'face', form: '코발트 드로퍼 보틀', image: 'cs-03', authority: 'BARRIER는 작업명 · 장벽 회복 효능은 미확정' },
    { id: 'CS-04', name: 'SEAL', ko: '데일리 크림', role: '보습 단계', category: 'face', form: '알루미늄 자', image: 'cs-04', authority: '제품명·역할은 합성 실험값 · 성분·효능 미확정' },
    { id: 'CS-05', name: 'SHIELD', ko: '선스틱', role: '야외 휴대', category: 'carry', form: '사각 알루미늄 스틱', image: 'cs-05', authority: 'SPF·PA·UV 효능·안전 미확정 · 추천 근거 사용 금지' },
    { id: 'CS-06', name: 'FIELD', ko: '바디 워시', role: '바디 세정', category: 'body', form: '알루미늄 펌프', image: 'cs-06', authority: '리필·성분·효능 미확정' },
    { id: 'CS-07', name: 'REPAIR', ko: '핸드 밤', role: '손 관리', category: 'carry', form: '크림프 알루미늄 튜브', image: 'cs-07', authority: 'REPAIR는 작업명 · 회복·치료 효능은 미확정' },
    { id: 'CS-08', name: 'CARRY', ko: '립 밤', role: '이동 중 관리', category: 'carry', form: '아노다이징 스틱', image: 'cs-08', authority: '성분·섭취·안전·효능 미확정' },
    { id: 'CS-09', name: 'LENGTH', ko: '바디 로션', role: '바디 보습', category: 'body', form: '로우 프로파일 펌프', image: 'cs-09', authority: '성분·효능·지속 시간 미확정' },
    { id: 'CS-10', name: 'RESET', ko: '스칼프 린스', role: '두피 세정 보조', category: 'body', form: '코발트 노즐 보틀', image: 'cs-10', authority: '탈모·비듬·치료 효능 사용 금지' },
    { id: 'CS-11', name: 'DRY', ko: '데오도란트', role: '데일리 바디', category: 'body', form: '알루미늄 롤온', image: 'cs-11', authority: '발한·냄새·지속·안전 성능 미확정' },
    { id: 'OBJ-06', name: 'AIR', ko: '미스트 오브젝트', role: '일상 오브젝트', category: 'carry', form: '유리·금속 케이지', image: 'obj-06', authority: '조향·흡입·피부·화재 안전 미확정' },
  ].map((product) => Object.freeze({
    ...product,
    catalog_state: product.id === 'CS-03'
      ? 'synthetic-batch-partial-hold'
      : product.id === 'OBJ-06'
        ? 'synthetic-object-reference'
        : 'synthetic-catalog-active',
    claim_authority_state: product.id === 'CS-03'
      ? 'unresolved/withdrawn-from-use'
      : 'unresolved/never-authorized',
    market: 'unresolved',
    availability: product.id === 'CS-03'
      ? 'product-level-local-selectable/exact-affected-batch-blocked'
      : 'local-prototype-selectable/market-unresolved',
    last_updated_at: '2026-08-26T17:31:00+09:00',
  }));

  const system = Object.freeze({
    composition: 'composition.common-surface.r3-hold-01@0.2.0-experiment',
    designPack: 'pack:industrial-swiss@1.0.0',
    uxPreset: 'decision.reserve@0.1.0',
    brandExperience: 'brand-experience.common-surface@0.1.0-experiment',
    productBinding: 'binding.common-surface.catalog.r3@0.2.0-experiment',
    change: 'change.common-surface.hold-01@0.2.0-experiment',
    event: 'EVENT-HOLD-01-CS03',
    batch: 'CS03-SYN-2608-H01',
    unaffectedBatch: 'CS03-SYN-2608-U01',
    claim: 'CLAIM-CS03-RECOVERY-01',
    releaseEvent: 'EVENT-RELEASE-01-CS03',
    baselineBindingRevision: 'binding.common-surface.catalog.r3@0.2.0-baseline',
    holdBindingRevision: 'binding.common-surface.catalog.r3@0.2.0-hold-active',
    releaseBindingRevision: 'binding.common-surface.catalog.r3@0.2.0-release-verified-local-only',
    claimAuthorityState: 'unresolved/withdrawn-from-use',
    unknownBatchPolicy: 'no-false-clearance',
    t0: '2026-08-26T17:08:00+09:00',
    authority: 'experiment-approved-synthetic',
    affectedProductId: 'CS-03',
    releaseScope: 'local-selection-and-seven-medium-projections',
    releaseEffectiveAt: '2026-08-26T17:31:00+09:00',
    releaseApprover: 'experiment-reviewer/common-surface-r3',
    releaseClaimDecision: 'do-not-restore',
    releaseCustomerCopy: '합성 release 검증으로 exact H01 batch의 로컬 선택만 복원했습니다. 철회 claim과 실제 판매·재고·fulfillment는 복원하지 않았습니다.',
    releaseAuthorityDisclaimer: 'experiment-approved-synthetic/not-external-authority',
    releaseMediumMap: Object.freeze(['moodboard', 'packaging', 'shop', 'merch', 'ooh', 'ads', 'web']),
    localCommitRestoreAllowed: true,
    fulfillmentRestoreAllowed: false,
    claimRestoreAllowed: false,
  });

  window.CommonSurfaceData = Object.freeze({ products: Object.freeze(products), system });
})();
