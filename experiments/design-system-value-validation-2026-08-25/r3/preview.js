(function initR3Preview() {
  'use strict';

  const data = window.CommonSurfaceData;
  if (!data) throw new Error('COMMON SURFACE catalog data is unavailable.');

  const { products, system } = data;
  const body = document.body;
  const initialMode = body.dataset.mode === 'baseline' ? 'baseline' : 'hold';
  const selectionStorageKey = `cs-r3:selection:${system.composition}`;
  const uiStorageKey = `cs-r3:ui:${system.composition}`;
  const bindingStorageKey = `cs-r3:binding:${system.composition}`;
  const mediumTargets = ['moodboard', 'packaging', 'shop', 'merch', 'ooh', 'ads', 'web'];

  function bindingForMode(mode) {
    const holdActive = mode === 'hold';
    return {
      composition: system.composition,
      revision: holdActive ? system.holdBindingRevision : system.baselineBindingRevision,
      authorityState: holdActive ? 'hold-active' : 'not-activated',
      holdActive,
      affectedProductId: system.affectedProductId,
      affectedBatchId: system.batch,
      claimState: 'withdrawn-from-use',
      releaseEventId: null,
      releaseEffectiveAt: null,
      releaseRecord: null,
    };
  }

  const state = {
    mode: initialMode,
    filter: 'all',
    draftId: null,
    confirmedId: null,
    reserveState: 'default',
    releaseIssued: false,
    releaseRecord: null,
    binding: bindingForMode(initialMode),
    batchStatus: 'unverified',
    lastBatchCode: '',
    eventSequence: 0,
    eventLog: [],
    lookupRequestId: 0,
    commitRequestId: 0,
  };

  const modeCopy = {
    baseline: {
      hero: '정규화된 카탈로그와 동일한 컴포넌트로 일곱 매체의 기준선을 연결합니다.',
      'hero-status': '정규화 기준선 · 변경 전',
      'hero-code': 'R3-A / E2 TARGET',
      affected: '없음',
      commit: '로컬 선택 가능',
      rollback: '변경 전 기준 보존',
      'decision-moodboard': 'PRESERVE + REGISTER',
      'decision-packaging': 'PRESERVE / RESERVED ZONE',
      'packaging-overlay': '정보 예약 영역 · 실제 표시 미확정',
      'packaging-copy': '용량·성분·제조·규제 사실을 발명하지 않는다.',
      'decision-shop': 'PRESERVE NORMAL ROUTE',
      'shop-overlay': '제품 설명과 선택 동선',
      'shop-copy': '설치·직원 실행·실재 재고는 미검증이다.',
      'decision-ooh': 'GENERIC BRAND / ACTIVE',
      'ooh-label': 'COMMON SURFACE / DAILY ORDER',
      'ooh-title': 'CARE IS A COMMON SURFACE.',
      'ooh-body': '제품 사실은 목적지에서 확인합니다.',
      'decision-ads': 'ACTIVE / DESTINATION PARITY',
      'decision-merch': 'PRESERVE',
      'ad-title': 'EVERYDAY ORDER.',
      'ad-body': '제품 보기 →',
      'decision-web': 'LOCAL SELECTION / ACTIVE',
      'web-result': '로컬 선택 결과와 수정·초기화·도움 경로.',
    },
    hold: {
      hero: `CS-03 전체가 아닌 exact 합성 batch ${system.batch}만 예방적으로 보류하고 모든 접점의 사실·선택·복구를 함께 갱신합니다.`,
      'hero-status': 'exact 합성 batch만 판매 보류 · 해당 batch commit 차단',
      'hero-code': `${system.batch} / HOLD`,
      affected: `CS-03 + ${system.batch}`,
      commit: 'exact 영향 batch만 차단',
      rollback: '해제 권한 대기',
      'decision-moodboard': 'CHANGE / CALM INCIDENT RULES',
      'decision-packaging': 'ROUTE / DETACHED INSERT',
      'packaging-overlay': 'CS-03 · exact H01 batch HOLD insert',
      'packaging-copy': `${system.batch} · 합성 상태 · 지원 경로 미연결`,
      'decision-shop': 'SUPPRESS + ROUTE',
      'shop-overlay': 'CS-03 · H01 batch shelf·tester 격리',
      'shop-copy': `${system.batch}만 격리 · 다른 batch·제품은 상태 확인 후 정상 탐색.`,
      'decision-ooh': 'AFFECTED CREATIVE / REPLACED',
      'ooh-label': `${system.batch} / HOLD 01 / SYNTHETIC`,
      'ooh-title': 'STATUS BEFORE PERSUASION.',
      'ooh-body': 'batch 확인 · 실제 안전 판정이 아닙니다.',
      'decision-ads': 'PAUSE + REPLACE / CACHE CHECK',
      'decision-merch': 'PRESERVE / HOLD AS DECORATION 금지',
      'ad-title': 'H01 EXACT BATCH / HOLD 01',
      'ad-body': 'batch 확인 →',
      'decision-web': 'UNAVAILABLE + RETAINED CONTEXT',
      'web-result': `${system.batch} exact commit 차단 · 대안·지원·재시도 제공.`,
    },
    released: {
      hero: `Product Binding에 ${system.releaseEvent}를 먼저 적용한 뒤 일곱 매체의 합성 HOLD 표면을 함께 복원했습니다. 철회 claim은 복원하지 않습니다.`,
      'hero-status': '합성 release 검증 · 7매체 rollback',
      'hero-code': `${system.releaseEvent} / RELEASED`,
      affected: '해제된 exact batch',
      commit: '로컬 선택 복원',
      rollback: '7 / 7 반영 · claim 철회 유지',
      'decision-moodboard': 'RESTORED / HISTORY PRESERVED',
      'decision-packaging': 'RESTORE ROUTE / STALE CHECK',
      'packaging-overlay': 'release record 적용 · HOLD insert 해제',
      'packaging-copy': `${system.batch} · 합성 release · 철회 claim 미복원`,
      'decision-shop': 'RESTORE + STALE SIGNAGE CHECK',
      'shop-overlay': 'exact batch 로컬 경로 복원',
      'shop-copy': '실제 선반·재고·직원 실행은 미검증이다.',
      'decision-merch': 'PRESERVE / CLAIM STILL WITHDRAWN',
      'decision-ooh': 'GENERIC BRAND / RESTORED',
      'ooh-label': 'COMMON SURFACE / RELEASE VERIFIED',
      'ooh-title': 'STATUS, THEN RETURN.',
      'ooh-body': '철회 claim 없이 일반 브랜드 경로로 복원합니다.',
      'decision-ads': 'GENERIC CREATIVE / RESTORED',
      'ad-title': 'EVERYDAY ORDER.',
      'ad-body': '상태 기록 보기 →',
      'decision-web': 'LOCAL SELECTION / RESTORED',
      'web-result': 'exact batch release 적용 · claim은 withdrawn-from-use 유지.',
    },
  };

  const reserveMessages = {
    default: '기본 상태입니다. 사용자 초안은 아직 없습니다.',
    invalid: '입력 오류입니다. 입력한 내용과 현재 제품 맥락은 유지됩니다.',
    loading: '로컬 합성 fixture를 검증하고 있습니다. 중복 commit은 만들지 않습니다.',
    partial: '일부 정보만 확인되었습니다. 불완전한 상태로 선택을 확정하지 않습니다.',
    stale: '현재 상태를 갱신할 수 없습니다. 이전 정보로 선택을 확정하지 않습니다.',
    unverified: `CS-03 제품 수준의 로컬 후보입니다. 특정 batch와 판매·재고 상태는 연결되지 않았습니다.`,
    'hold-unavailable': `입력한 exact 합성 batch ${system.batch}는 HOLD / 01 대상입니다. 이 batch의 commit은 차단되며 실제 안전 판정이 아닙니다.`,
    alternative: 'CS-02를 사용자가 검토할 대안으로 열었습니다. 안전·효능·적합성을 자동 추천하지 않습니다.',
    success: '로컬 선택이 확정되었습니다. 실제 구매·예약·재고·안전 결과가 아닙니다.',
    retry: '입력과 선택 맥락을 유지한 채 다시 검증할 수 있습니다.',
    affected: `입력한 합성 batch는 ${system.event} 범위와 일치합니다. 선택·commit·fulfillment가 차단됩니다.`,
    unknown: '이 코드는 HOLD / 01 대상과 일치하지 않습니다. 실제 제품 상태는 미확인입니다. 지원 경로를 확인하세요.',
    unaffected: `입력한 코드는 비영향 합성 fixture ${system.unaffectedBatch}와 일치합니다. 로컬 선택만 가능하며 실제 안전·재고·판매 가능 판정이 아닙니다.`,
    released: `exact 합성 batch ${system.batch}는 검증된 release fixture로 로컬 선택만 복원되었습니다. U01 비영향 fixture와 다르며, 실제 판매·재고·fulfillment·철회 claim은 복원되지 않습니다.`,
    'release-pending': '해제 권한이 확인되지 않았습니다. HOLD 상태와 claim 철회는 그대로 유지됩니다.',
    restored: `합성 해제 이벤트 ${system.releaseEvent}를 확인해 선택 가능 상태를 재검증했습니다. 철회 claim은 복원하지 않습니다.`,
  };

  const el = (selector) => document.querySelector(selector);
  const els = (selector) => [...document.querySelectorAll(selector)];
  const productById = (id) => products.find((product) => product.id === id) || null;

  function projectionState() {
    if (state.mode === 'baseline') return 'baseline';
    return state.binding.holdActive ? 'hold' : 'released';
  }

  function commitPolicy(product) {
    if (!product) return { blocked: true, state: 'invalid', reason: '제품을 먼저 선택해야 합니다.' };
    if (state.mode !== 'hold' || product.id !== state.binding.affectedProductId) {
      return { blocked: false, state: 'selectable', reason: 'local-product-selection' };
    }
    const enteredCode = el('#batch-code')?.value.trim().toUpperCase() || '';
    if (enteredCode && enteredCode !== state.lastBatchCode) {
      return { blocked: true, state: 'unverified', reason: '입력한 batch를 아직 검증하지 않아 진행하지 않습니다.' };
    }
    if (['loading', 'unknown', 'invalid', 'partial', 'stale'].includes(state.batchStatus)) {
      return { blocked: true, state: state.batchStatus, reason: '입력한 batch의 권한 상태를 확인할 수 없어 진행하지 않습니다.' };
    }
    if (!state.binding.holdActive) {
      if (state.batchStatus === 'affected') return { blocked: true, state: 'affected', reason: 'release 적용 전 affected 상태가 남아 있어 진행하지 않습니다.' };
      return { blocked: false, state: state.batchStatus === 'released' ? 'released' : 'selectable', reason: state.batchStatus === 'released' ? 'synthetic-exact-batch-local-release' : 'local-product-selection' };
    }
    if (state.batchStatus === 'affected') {
      return { blocked: true, state: 'affected', reason: `exact batch ${system.batch}가 HOLD / 01 범위와 일치합니다.` };
    }
    if (state.batchStatus === 'unaffected') {
      return { blocked: false, state: 'unaffected', reason: 'synthetic-unaffected-fixture' };
    }
    return { blocked: false, state: 'unverified', reason: 'batchless-local-product-selection' };
  }

  function applyProjectionState() {
    const projection = projectionState();
    body.dataset.projectionState = projection;
    const copy = modeCopy[projection];
    els('[data-mode-copy]').forEach((node) => {
      const key = node.dataset.modeCopy;
      if (copy[key]) node.textContent = copy[key];
    });

    const visualMode = projection === 'hold' ? 'hold' : 'baseline';
    els('[data-baseline-src]').forEach((image) => {
      image.src = image.dataset[`${visualMode}Src`];
      image.srcset = image.dataset[`${visualMode}Srcset`];
      image.alt = image.dataset[`${visualMode}Alt`];
    });
    els('source[data-baseline-srcset]').forEach((sourceNode) => {
      sourceNode.srcset = sourceNode.dataset[`${visualMode}Srcset`];
    });
    els('[data-hold-only]').forEach((node) => {
      node.hidden = projection !== 'hold';
    });
    updatePropagationLedger(projection);
  }

  function updatePropagationLedger(projection) {
    const labels = {
      baseline: 'baseline / not-activated',
      hold: 'hold-active / claim-withdrawn',
      released: 'release-restored / claim-withdrawn',
    };
    const revision = el('#binding-revision');
    if (revision) revision.textContent = `${state.binding.revision} · ${state.binding.authorityState}`;
    mediumTargets.forEach((target) => {
      const status = labels[projection];
      const ledger = el(`[data-propagation-target="${target}"] code`);
      const chip = el(`[data-medium-propagation="${target}"] [data-propagation-status]`);
      const article = el(`[data-medium-propagation="${target}"]`);
      if (ledger) ledger.textContent = status;
      if (chip) chip.textContent = status.toUpperCase();
      if (article) article.dataset.propagationState = projection;
    });
  }

  function safeJsonStorage(storage, key, action, value) {
    try {
      if (action === 'get') return JSON.parse(storage.getItem(key) || 'null');
      if (action === 'set') {
        storage.setItem(key, JSON.stringify(value));
        return true;
      }
      if (action === 'remove') {
        storage.removeItem(key);
        return true;
      }
    } catch (_error) {
      return null;
    }
    return null;
  }

  function safeStorage(action, value) {
    return safeJsonStorage(sessionStorage, selectionStorageKey, action, value);
  }

  function releaseRecordIsValid(release) {
    return Boolean(release
      && release.eventId === system.releaseEvent
      && release.productId === system.affectedProductId
      && release.batchId === system.batch
      && release.scope === system.releaseScope
      && release.effectiveAt === system.releaseEffectiveAt
      && release.approver === system.releaseApprover
      && release.claimDecision === system.releaseClaimDecision
      && release.customerFacingCopy === system.releaseCustomerCopy
      && release.authorityDisclaimer === system.releaseAuthorityDisclaimer
      && release.permissions?.localCommit === system.localCommitRestoreAllowed
      && release.permissions?.fulfillment === system.fulfillmentRestoreAllowed
      && release.permissions?.claimRestore === system.claimRestoreAllowed
      && Array.isArray(release.mediumImpactMap)
      && release.mediumImpactMap.length === mediumTargets.length
      && mediumTargets.every((target, index) => release.mediumImpactMap[index] === target));
  }

  function bindingIsValid(binding) {
    const common = binding
      && binding.composition === system.composition
      && binding.affectedProductId === system.affectedProductId
      && binding.affectedBatchId === system.batch
      && binding.claimState === 'withdrawn-from-use';
    if (!common) return false;
    if (binding.holdActive === true) {
      return binding.revision === system.holdBindingRevision
        && binding.authorityState === 'hold-active'
        && binding.releaseRecord === null;
    }
    return binding.holdActive === false
      && binding.revision === system.releaseBindingRevision
      && binding.authorityState === 'release-verified-local-only'
      && binding.releaseEventId === system.releaseEvent
      && binding.releaseEffectiveAt === system.releaseEffectiveAt
      && releaseRecordIsValid(binding.releaseRecord);
  }

  function batchStatusAfterRelease(code, currentStatus) {
    if (code === system.batch) return 'released';
    if (code === system.unaffectedBatch) return 'unaffected';
    if (['unknown', 'invalid', 'partial', 'stale'].includes(currentStatus)) return currentStatus;
    return 'unverified';
  }

  function publishBinding(reason, binding = state.binding) {
    if (!bindingIsValid(binding)) return false;
    const payload = {
      ...binding,
      publishedAt: new Date().toISOString(),
      reason,
    };
    const stored = safeJsonStorage(localStorage, bindingStorageKey, 'set', payload);
    const echoed = stored === true ? safeJsonStorage(localStorage, bindingStorageKey, 'get') : null;
    if (!bindingIsValid(echoed) || echoed.revision !== binding.revision || echoed.reason !== reason) return false;
    body.dataset.bindingState = binding.authorityState;
    return true;
  }

  function persistUiState() {
    safeJsonStorage(sessionStorage, uiStorageKey, 'set', {
      composition: system.composition,
      mode: state.mode,
      filter: state.filter,
      draftId: state.draftId,
      confirmedId: state.confirmedId,
      reserveState: state.reserveState,
      batchStatus: state.batchStatus,
      lastBatchCode: /^CS03-SYN-[A-Z0-9-]+$/.test(state.lastBatchCode) ? state.lastBatchCode : '',
      releaseIssued: state.releaseIssued,
      releaseRecord: releaseRecordIsValid(state.releaseRecord) ? state.releaseRecord : null,
      binding: bindingIsValid(state.binding) ? state.binding : bindingForMode(state.mode),
      eventLog: state.eventLog,
    });
  }

  function restoreUiState() {
    const saved = safeJsonStorage(sessionStorage, uiStorageKey, 'get');
    if (!saved || saved.composition !== system.composition) return false;
    const allowedModes = ['baseline', 'hold'];
    const allowedFilters = ['all', 'face', 'body', 'carry'];
    const allowedReserveStates = ['default', 'user-draft', 'invalid', 'loading', 'partial', 'stale', 'unverified', 'hold-unavailable', 'alternative', 'success', 'retry', 'affected', 'unknown', 'unaffected', 'release-pending', 'restored'];
    const allowedBatchStates = ['unverified', 'affected', 'unknown', 'invalid', 'partial', 'stale', 'unaffected', 'released'];
    if (allowedModes.includes(saved.mode)) state.mode = saved.mode;
    if (allowedFilters.includes(saved.filter)) state.filter = saved.filter;
    if (saved.draftId === null || productById(saved.draftId)) state.draftId = saved.draftId;
    if (saved.confirmedId === null || productById(saved.confirmedId)) state.confirmedId = saved.confirmedId;
    if (allowedReserveStates.includes(saved.reserveState)) state.reserveState = saved.reserveState;
    if (allowedBatchStates.includes(saved.batchStatus)) state.batchStatus = saved.batchStatus;
    if (typeof saved.lastBatchCode === 'string' && /^CS03-SYN-[A-Z0-9-]+$/.test(saved.lastBatchCode)) state.lastBatchCode = saved.lastBatchCode;
    if (releaseRecordIsValid(saved.releaseRecord)) {
      state.releaseIssued = saved.releaseIssued === true;
      state.releaseRecord = saved.releaseRecord;
    }
    if (bindingIsValid(saved.binding)) state.binding = saved.binding;
    if (Array.isArray(saved.eventLog)) {
      state.eventLog = saved.eventLog.filter((entry) => entry
        && Number.isInteger(entry.sequence)
        && typeof entry.action === 'string'
        && typeof entry.detail === 'string');
      state.eventSequence = state.eventLog.reduce((max, entry) => Math.max(max, entry.sequence), 0);
    }
    return true;
  }

  function restoreSharedBinding() {
    const shared = safeJsonStorage(localStorage, bindingStorageKey, 'get');
    if (!bindingIsValid(shared)) return false;
    state.binding = shared;
    if (!shared.holdActive) {
      const priorReserveState = state.reserveState;
      state.releaseIssued = true;
      state.releaseRecord = shared.releaseRecord;
      state.batchStatus = batchStatusAfterRelease(state.lastBatchCode, state.batchStatus);
      if (['unknown', 'invalid', 'partial', 'stale'].includes(state.batchStatus)) state.reserveState = state.batchStatus;
      else if (['alternative', 'user-draft', 'success', 'retry'].includes(priorReserveState)) state.reserveState = priorReserveState;
      else state.reserveState = 'restored';
    } else {
      state.releaseIssued = false;
      state.releaseRecord = null;
      if (state.lastBatchCode === system.batch) {
        state.batchStatus = 'affected';
        state.reserveState = 'hold-unavailable';
        if (state.confirmedId === system.affectedProductId) state.confirmedId = null;
      } else if (state.lastBatchCode === system.unaffectedBatch) {
        state.batchStatus = 'unaffected';
      } else if (!state.lastBatchCode && !['alternative', 'user-draft', 'success', 'retry'].includes(state.reserveState)) {
        state.batchStatus = 'unverified';
        state.reserveState = state.draftId ? 'user-draft' : 'default';
      }
    }
    return true;
  }

  function dimensions(product) {
    if (product.id === 'CS-09') return { width: 1120, height: 746 };
    if (product.id === 'CS-11') return { width: 1120, height: 1120 };
    return { width: 896, height: 1120 };
  }

  function productImage(product, loading = 'lazy') {
    const { width, height } = dimensions(product);
    const alt = `${product.id} ${product.name} ${product.ko} 합성 제품 이미지`;
    return `<picture><source srcset="assets/products/${product.image}-640.jpg 640w, assets/products/${product.image}-1120.jpg 1120w"><img src="assets/products/${product.image}-640.jpg" srcset="assets/products/${product.image}-640.jpg 640w, assets/products/${product.image}-1120.jpg 1120w" sizes="(max-width: 620px) 42vw, (max-width: 1080px) 33vw, 25vw" width="${width}" height="${height}" loading="${loading}" alt="${alt}"></picture>`;
  }

  function statusFlag(product) {
    if (state.mode === 'hold' && product.id === 'CS-03' && state.binding.holdActive) return '특정 batch만 HOLD · 제품 탐색 유지';
    if (state.mode === 'hold' && product.id === 'CS-03' && !state.binding.holdActive) return 'exact batch 해제 · claim 미복원';
    return '합성 catalog 활성';
  }

  function renderProducts() {
    const grid = el('#product-grid');
    grid.innerHTML = products.map((product) => {
      const selected = state.draftId === product.id;
      const hidden = state.filter !== 'all' && product.category !== state.filter;
      return `<button class="product-card" type="button" data-product-id="${product.id}" data-category="${product.category}" aria-pressed="${selected}" ${hidden ? 'hidden' : ''}>
        <span class="product-card-image">${productImage(product)}<span class="product-status-flag">${statusFlag(product)}</span></span>
        <span class="product-card-copy"><span class="product-card-code">${product.id} / ${product.role}</span><h3>${product.name}</h3><p>${product.ko} · ${product.form}</p><span class="authority-copy">${product.authority}</span></span>
      </button>`;
    }).join('');

    els('.product-card').forEach((card) => {
      card.addEventListener('click', () => selectProduct(card.dataset.productId, 'catalog'));
    });
    renderCompactCatalog();
  }

  function renderCompactCatalog() {
    const compact = el('#reserve-compact-list');
    compact.innerHTML = products.map((product) => {
      const selected = state.draftId === product.id;
      const scoped = state.mode === 'hold' && product.id === 'CS-03' && state.binding.holdActive;
      return `<button class="state-button" type="button" data-compact-product="${product.id}" aria-pressed="${selected}"><span>${product.id} / ${product.name}${scoped ? ' · batch 확인' : ''}</span><code>${product.category.toUpperCase()}</code></button>`;
    }).join('');
    els('[data-compact-product]').forEach((button) => button.addEventListener('click', () => selectProduct(button.dataset.compactProduct, 'reserve-list')));
  }

  function setMode(mode, source = 'control', options = {}) {
    state.lookupRequestId += 1;
    state.commitRequestId += 1;
    const previousMode = state.mode;
    const previousReserveState = state.reserveState;
    const previousBatchStatus = state.batchStatus;
    const previousBatchCode = state.lastBatchCode;
    const nextMode = mode === 'baseline' ? 'baseline' : 'hold';
    const candidateBinding = options.preserveState ? state.binding : bindingForMode(nextMode);
    if (nextMode === 'hold' && !options.skipPublish && !publishBinding(source, candidateBinding)) {
      body.dataset.bindingPublishState = 'failed';
      setReserveState('release-pending', '공유 Product Binding에 HOLD를 기록·재확인하지 못해 모드를 전환하지 않았습니다. 내부와 고객 Web은 이전 revision을 유지합니다.');
      logEvent('hold-publish-failed', `${source} / previous:${state.binding.revision} retained`);
      return false;
    }
    state.mode = nextMode;
    if (!options.preserveState) {
      state.releaseIssued = false;
      state.releaseRecord = null;
      state.binding = candidateBinding;
      const holdReapply = nextMode === 'hold' && previousMode === 'hold';
      if (holdReapply && previousBatchCode === system.batch) {
        state.batchStatus = 'affected';
        state.lastBatchCode = previousBatchCode;
        state.reserveState = 'hold-unavailable';
        if (state.confirmedId === system.affectedProductId) state.confirmedId = null;
      } else if (holdReapply && previousBatchCode === system.unaffectedBatch) {
        state.batchStatus = 'unaffected';
        state.lastBatchCode = previousBatchCode;
        state.reserveState = previousReserveState;
      } else if (holdReapply && ['alternative', 'user-draft', 'success', 'retry'].includes(previousReserveState)) {
        state.batchStatus = previousBatchStatus;
        state.lastBatchCode = previousBatchCode;
        state.reserveState = previousReserveState;
      } else {
        state.batchStatus = 'unverified';
        state.lastBatchCode = '';
        state.reserveState = state.draftId ? 'user-draft' : 'default';
      }
    }
    body.dataset.mode = state.mode;
    body.dataset.bindingState = state.binding.authorityState;
    body.dataset.bindingPublishState = 'verified';

    els('[data-set-mode]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.setMode === state.mode));
    });
    els('[data-filter]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === state.filter)));
    els('[data-revision]').forEach((block) => block.classList.toggle('active', block.dataset.revision === state.mode));
    applyProjectionState();

    const batchInput = el('#batch-code');
    batchInput.disabled = state.mode === 'baseline';
    batchInput.value = state.lastBatchCode;
    el('#batch-form button[type="submit"]').disabled = state.mode === 'baseline';
    if (state.mode === 'baseline') {
      updateLiveStatus(source === 'control' ? 'R3-A 정규화 기준선으로 전환했습니다. batch 조회는 변경 전 상태에서 비활성입니다.' : (reserveMessages[state.reserveState] || reserveMessages.default));
    } else if (!state.binding.holdActive) {
      if (['alternative', 'success', 'retry'].includes(state.reserveState)) {
        updateLiveStatus(reserveMessages[state.reserveState]);
      } else if (state.reserveState === 'user-draft') {
        updateLiveStatus('사용자 초안을 유지하고 있습니다. 검증된 release는 선택 권한만 설명하며 사용자의 결정을 대신하지 않습니다.');
      } else {
        updateLiveStatus(`${reserveMessages.restored} Product Binding ${state.binding.revision}을 소비 중입니다.`);
      }
    } else if (state.draftId === 'CS-03') {
      updateLiveStatus(reserveMessages[state.batchStatus] || reserveMessages.unverified);
    } else {
      updateLiveStatus(source === 'control' ? `R3-B HOLD / 01을 적용했습니다. 영향 범위는 CS-03 / ${system.batch}입니다.` : (reserveMessages[state.reserveState] || reserveMessages.default));
    }
    renderProducts();
    const visibleCount = products.filter((product) => state.filter === 'all' || product.category === state.filter).length;
    const selectedProduct = productById(state.draftId);
    const retainedDraft = selectedProduct && state.filter !== 'all' && selectedProduct.category !== state.filter;
    el('#filter-status').textContent = `${state.filter.toUpperCase()} 필터에서 ${visibleCount}개를 표시합니다.${retainedDraft ? ` 현재 초안 ${selectedProduct.id}은 필터 밖에 있지만 선택 요약에 유지됩니다.` : ''}`;
    renderSelection();
    updateStateRail();
    logEvent('mode-change', `${source} → ${state.mode}`);
    return true;
  }

  function selectProduct(id, source) {
    const product = productById(id);
    if (!product) return;
    state.lookupRequestId += 1;
    state.commitRequestId += 1;
    if (state.draftId !== id || id !== 'CS-03') {
      state.batchStatus = 'unverified';
      state.lastBatchCode = '';
      const batchInput = el('#batch-code');
      if (batchInput) batchInput.value = '';
    }
    state.draftId = id;
    state.reserveState = 'user-draft';
    renderProducts();
    renderSelection();
    updateStateRail();
    updateLiveStatus(state.mode === 'hold' && id === 'CS-03'
      ? reserveMessages.unverified
      : `${id}을(를) 로컬 스타터 후보로 선택했습니다. commit 전이며 다른 후보로 바꿀 수 있습니다.`);
    logEvent('draft-selected', `${id} / ${source}`);
  }

  function renderSelection() {
    const product = productById(state.draftId);
    const summary = el('#selection-summary');
    const kicker = el('#selection-kicker');
    const name = el('#selection-name');
    const authority = el('#selection-authority');
    const commit = el('#commit-button');
    const reason = el('#commit-reason');
    const currentFilteredOut = product && state.filter !== 'all' && product.category !== state.filter;
    const policy = commitPolicy(product);

    summary.dataset.state = state.reserveState;
    if (!product) {
      kicker.textContent = '시작할 제품을 고르세요.';
      name.textContent = 'NO DRAFT';
      authority.textContent = '제품 사실·재고·가격·개인 적합성은 판단하지 않습니다.';
      commit.disabled = true;
      reason.textContent = '제품을 먼저 선택해야 합니다.';
      return;
    }

    kicker.textContent = currentFilteredOut
      ? '사용자 초안 · 현재 필터 밖에 유지됨'
      : state.mode === 'hold' && product.id === 'CS-03'
        ? `사용자 초안 · batch ${state.batchStatus}`
        : '사용자 초안 · commit 전';
    name.textContent = `${product.id} / ${product.name}`;
    if (state.mode === 'hold' && product.id === 'CS-03' && state.binding.holdActive) {
      if (state.batchStatus === 'affected') {
        authority.textContent = `입력한 exact 합성 batch ${system.batch}만 HOLD / 01 범위입니다. 실제 안전 판단이 아닙니다.`;
      } else if (state.batchStatus === 'unaffected') {
        authority.textContent = `${system.unaffectedBatch}는 비영향 합성 fixture입니다. 실제 안전·재고·판매 가능을 뜻하지 않습니다.`;
      } else if (['unknown', 'invalid', 'partial', 'stale'].includes(state.batchStatus)) {
        authority.textContent = '입력 batch의 권한 상태는 미확인입니다. 영향 없음이나 안전으로 판정하지 않습니다.';
      } else {
        authority.textContent = `CS-03 전체가 아닌 ${system.batch}만 HOLD입니다. 현재 선택은 batch 없는 로컬 제품 후보이며 판매·fulfillment가 아닙니다.`;
      }
    } else if (state.mode === 'hold' && product.id === 'CS-03' && !state.binding.holdActive) {
      if (state.batchStatus === 'released') {
        authority.textContent = `${system.releaseEvent}가 exact H01 batch에 적용되어 로컬 선택만 복원됐습니다. U01 비영향 fixture가 아니며 ${system.claim}은 withdrawn-from-use 상태를 유지합니다.`;
      } else if (state.batchStatus === 'unaffected') {
        authority.textContent = `${system.unaffectedBatch}는 별도의 비영향 합성 fixture입니다. release H01과 동일시하지 않으며 실제 안전·재고·판매 가능을 뜻하지 않습니다.`;
      } else if (['unknown', 'invalid', 'partial', 'stale'].includes(state.batchStatus)) {
        authority.textContent = `H01 release는 입력한 ${state.lastBatchCode || '미확인 코드'}에 적용되지 않습니다. 이 batch의 권한 상태는 계속 미확인입니다.`;
      } else {
        authority.textContent = `H01 local release가 존재하지만 현재 선택은 batch 없는 제품 수준 초안입니다. ${system.claim}과 fulfillment는 미복원입니다.`;
      }
    } else {
      authority.textContent = product.authority;
    }
    commit.disabled = policy.blocked;
    commit.textContent = policy.blocked ? '현재 batch · 저장 불가' : '스타터로 저장';
    reason.textContent = policy.blocked
      ? `${policy.reason} 입력 유지·다른 제품·지원 경로를 사용할 수 있습니다.`
      : state.batchStatus === 'unaffected' && product.id === 'CS-03'
        ? '비영향 합성 fixture에 한해 로컬 선택이 가능합니다. 실제 구매·안전·재고 확정은 아닙니다.'
        : state.batchStatus === 'released' && product.id === 'CS-03'
          ? '검증된 exact H01 release로 로컬 선택만 복원했습니다. 실제 판매·재고·fulfillment와 철회 claim은 복원하지 않습니다.'
        : currentFilteredOut
          ? '현재 초안이 필터 밖에 있습니다. 제품 이름과 결과를 확인한 뒤 명시적으로 저장할 수 있습니다.'
          : 'batch 없는 제품 수준의 로컬 prototype 결과만 생성합니다. 구매·예약·재고·fulfillment 동작은 없습니다.';
  }

  function setFilter(filter) {
    state.filter = filter;
    els('[data-filter]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    renderProducts();
    const visible = products.filter((product) => filter === 'all' || product.category === filter).length;
    const selected = productById(state.draftId);
    const retained = selected && filter !== 'all' && selected.category !== filter;
    el('#filter-status').textContent = `${filter.toUpperCase()} 필터에서 ${visible}개를 표시합니다.${retained ? ` 현재 초안 ${selected.id}은 필터 밖에 있지만 선택 요약에 유지됩니다.` : ''}`;
    renderSelection();
    logEvent('filter', filter);
  }

  function updateLiveStatus(message) {
    el('#reserve-live-status').textContent = message;
  }

  function updateStateRail() {
    els('[data-qa-state]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.qaState === state.reserveState)));
  }

  function setReserveState(nextState, message = reserveMessages[nextState]) {
    state.reserveState = nextState;
    el('#selection-summary').dataset.state = nextState;
    updateStateRail();
    updateLiveStatus(message || nextState);
    logEvent('state', nextState);
  }

  function commitSelection() {
    const product = productById(state.draftId);
    if (!product) {
      setReserveState('invalid', '제품을 먼저 선택하세요. 입력한 내용은 유지됩니다.');
      el('#product-grid').focus?.();
      return;
    }
    const policy = commitPolicy(product);
    if (policy.blocked) {
      setReserveState(policy.state === 'affected' ? 'hold-unavailable' : policy.state, `${policy.reason} 입력과 후보는 유지됩니다.`);
      return;
    }

    const recordBatchId = product.id === 'CS-03' && ['unaffected', 'released'].includes(state.batchStatus) ? state.lastBatchCode : null;
    const previous = safeStorage('get');
    if (previous?.productId === product.id && previous?.batchId === recordBatchId && previous?.composition === system.composition) {
      state.confirmedId = product.id;
      setReserveState('success', `${product.id}의 기존 로컬 결과를 확인했습니다. 중복 record는 생성하지 않았습니다.`);
      return;
    }

    const requestId = ++state.commitRequestId;
    const expectedProductId = product.id;
    const expectedBatchCode = state.lastBatchCode;
    setReserveState('loading');
    el('#commit-button').disabled = true;
    window.setTimeout(() => {
      const settledProduct = productById(state.draftId);
      const settledPolicy = commitPolicy(settledProduct);
      if (requestId !== state.commitRequestId
        || settledProduct?.id !== expectedProductId
        || state.lastBatchCode !== expectedBatchCode
        || settledPolicy.blocked) {
        setReserveState(settledPolicy.state === 'affected' ? 'hold-unavailable' : settledPolicy.state, '상태가 바뀌어 commit을 중단했습니다. 현재 batch를 다시 확인하세요.');
        renderSelection();
        return;
      }
      const settledBatchId = settledProduct.id === 'CS-03' && ['unaffected', 'released'].includes(state.batchStatus) ? state.lastBatchCode : null;
      const record = {
        composition: system.composition,
        productId: settledProduct.id,
        batchId: settledBatchId,
        batchAuthorityState: settledProduct.id === 'CS-03' ? state.batchStatus : 'not-applicable',
        bindingRevision: state.binding.revision,
        result: 'local-selection-confirmed',
        synthetic: true,
      };
      safeStorage('set', record);
      state.confirmedId = settledProduct.id;
      setReserveState('success', `${settledProduct.id}이(가) 로컬 스타터로 저장되었습니다. 실제 구매·예약·재고 결과가 아닙니다.`);
      renderSelection();
    }, reducedMotion() ? 10 : 420);
  }

  function cancelDraft() {
    state.lookupRequestId += 1;
    state.commitRequestId += 1;
    if (!state.draftId) {
      setReserveState('invalid', '취소할 미확정 초안이 없습니다. 로컬 확정 결과는 유지됩니다.');
      return;
    }
    state.draftId = null;
    state.batchStatus = 'unverified';
    state.lastBatchCode = '';
    setReserveState('default', '미확정 초안을 취소했습니다. 이미 확정한 로컬 결과가 있다면 그대로 유지됩니다.');
    renderProducts();
    renderSelection();
  }

  function resetConfirmed() {
    state.commitRequestId += 1;
    safeStorage('remove');
    state.confirmedId = null;
    setReserveState(state.draftId ? 'user-draft' : 'default', '로컬 선택 결과를 초기화했습니다. HOLD event와 claim ledger는 변경되지 않습니다.');
    renderSelection();
  }

  function reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function validateBatchCode(code) {
    if (!code || code.length < 5 || !/^[A-Z0-9-]+$/.test(code)) return 'invalid';
    if (code === system.batch) return state.binding.holdActive ? 'affected' : 'released';
    if (code === system.unaffectedBatch) return 'unaffected';
    if (code === 'CS03-SYN-STALE') return 'stale';
    if (code === 'CS03-SYN-PARTIAL') return 'partial';
    return 'unknown';
  }

  function runBatchLookup(code, immediate = false) {
    const input = el('#batch-code');
    const error = el('#batch-error');
    const requestId = ++state.lookupRequestId;
    state.commitRequestId += 1;
    state.lastBatchCode = code;
    input.value = code;
    error.textContent = '';
    input.removeAttribute('aria-invalid');
    if (state.mode !== 'hold') {
      setReserveState('default', 'R3-A 비교 기준에서는 HOLD batch 조회가 활성화되지 않습니다.');
      return;
    }
    const result = validateBatchCode(code);
    if (result === 'invalid') {
      state.batchStatus = 'invalid';
      input.setAttribute('aria-invalid', 'true');
      error.textContent = 'batch 코드 형식을 확인하세요. 입력은 유지됩니다.';
      setReserveState('invalid');
      input.focus();
      return;
    }
    state.batchStatus = 'loading';
    setReserveState('loading');
    renderSelection();
    window.setTimeout(() => {
      if (requestId !== state.lookupRequestId || code !== state.lastBatchCode) return;
      const settledResult = validateBatchCode(code);
      state.batchStatus = settledResult;
      if (['affected', 'unaffected', 'released'].includes(settledResult) || code.startsWith('CS03-')) {
        state.draftId = 'CS-03';
        renderProducts();
      }
      setReserveState(settledResult, reserveMessages[settledResult]);
      renderSelection();
    }, immediate || reducedMotion() ? 10 : 520);
  }

  function openAlternative() {
    state.lookupRequestId += 1;
    state.commitRequestId += 1;
    state.filter = 'face';
    els('[data-filter]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === 'face')));
    state.draftId = 'CS-02';
    state.batchStatus = 'unverified';
    state.lastBatchCode = '';
    state.reserveState = 'alternative';
    renderProducts();
    renderSelection();
    updateStateRail();
    updateLiveStatus(reserveMessages.alternative);
    persistUiState();
    el('#selection-summary').scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
  }

  function qaState(nextState) {
    if (nextState === 'hold-unavailable') {
      if (state.mode !== 'hold' || !state.binding.holdActive) setMode('hold', 'qa-state');
      state.draftId = 'CS-03';
      state.batchStatus = 'affected';
      state.lastBatchCode = system.batch;
      renderProducts();
      renderSelection();
    } else if (nextState === 'unknown') {
      if (state.mode !== 'hold') setMode('hold', 'qa-state');
      state.draftId = 'CS-03';
      state.batchStatus = 'unknown';
      state.lastBatchCode = 'CS03-SYN-UNKNOWN';
      renderProducts();
      renderSelection();
    } else if (nextState === 'unaffected') {
      if (state.mode !== 'hold') setMode('hold', 'qa-state');
      state.draftId = 'CS-03';
      state.batchStatus = 'unaffected';
      state.lastBatchCode = system.unaffectedBatch;
      renderProducts();
      renderSelection();
    } else if (nextState === 'alternative') {
      openAlternative();
      return;
    } else if (nextState === 'success') {
      state.draftId = 'CS-02';
      renderProducts();
      renderSelection();
    } else if (nextState === 'default') {
      state.draftId = null;
      state.batchStatus = 'unverified';
      state.lastBatchCode = '';
      renderProducts();
      renderSelection();
    }
    setReserveState(nextState);
  }

  function releaseGuard() {
    if (!state.releaseIssued) {
      setReserveState('release-pending');
      return;
    }
    updateLiveStatus(`${system.releaseEvent}가 합성 fixture로 존재합니다. 아직 scoped rollback을 실행하지 않았습니다.`);
  }

  function issueRelease() {
    if (state.mode !== 'hold') setMode('hold', 'release-fixture');
    state.releaseIssued = true;
    state.releaseRecord = Object.freeze({
      eventId: system.releaseEvent,
      productId: state.binding.affectedProductId,
      batchId: state.binding.affectedBatchId,
      scope: system.releaseScope,
      effectiveAt: system.releaseEffectiveAt,
      approver: system.releaseApprover,
      claimDecision: system.releaseClaimDecision,
      permissions: Object.freeze({
        localCommit: system.localCommitRestoreAllowed,
        fulfillment: system.fulfillmentRestoreAllowed,
        claimRestore: system.claimRestoreAllowed,
      }),
      customerFacingCopy: system.releaseCustomerCopy,
      authorityDisclaimer: system.releaseAuthorityDisclaimer,
      mediumImpactMap: Object.freeze([...system.releaseMediumMap]),
    });
    setReserveState('release-pending', `${system.releaseEvent} 합성 QA record를 발행했습니다. 로컬 commit 권한·고객 고지·면책·7매체 map을 exact 검증하기 전까지 HOLD를 유지합니다.`);
    logEvent('release-record', `${state.releaseRecord.productId} / ${state.releaseRecord.batchId} / local:${state.releaseRecord.permissions.localCommit} / fulfillment:${state.releaseRecord.permissions.fulfillment}`);
  }

  function runRollback() {
    const release = state.releaseRecord;
    if (!state.releaseIssued || !releaseRecordIsValid(release)) {
      setReserveState('release-pending', 'release record의 event·product·batch·scope·effectiveAt·approver·permission·고객 고지·면책·7매체 map이 모두 일치하지 않아 HOLD를 유지합니다.');
      logEvent('release-rejected', 'incomplete-or-mismatched-authority-record / HOLD retained');
      return;
    }

    const candidateBinding = {
      ...state.binding,
      composition: system.composition,
      revision: system.releaseBindingRevision,
      authorityState: 'release-verified-local-only',
      holdActive: false,
      releaseEventId: release.eventId,
      releaseEffectiveAt: release.effectiveAt,
      claimState: 'withdrawn-from-use',
      releaseRecord: release,
    };
    if (!publishBinding('verified-release-binding-first', candidateBinding)) {
      setReserveState('release-pending', '공유 Product Binding 저장을 검증하지 못해 HOLD를 유지합니다. 내부 7매체와 고객 Web 복원을 실행하지 않았습니다.');
      logEvent('binding-publish-failed', 'localStorage write-or-readback failed / HOLD retained');
      return;
    }
    state.binding = candidateBinding;
    state.lookupRequestId += 1;
    state.commitRequestId += 1;
    logEvent('binding-first', `${state.binding.revision} / exact:${state.binding.affectedProductId}+${state.binding.affectedBatchId} / customer-web-published`);

    state.batchStatus = batchStatusAfterRelease(state.lastBatchCode, state.batchStatus);
    state.reserveState = ['unknown', 'invalid', 'partial', 'stale'].includes(state.batchStatus) ? state.batchStatus : 'restored';
    applyProjectionState();
    renderProducts();
    renderSelection();
    const rollbackMessage = ['unknown', 'invalid', 'partial', 'stale'].includes(state.batchStatus)
      ? `H01 local release는 적용됐지만 입력한 ${state.lastBatchCode || '미확인 batch'}에는 확장하지 않습니다. Product Binding ${state.binding.revision}을 내부 7/7과 고객 Web이 공유하며 이 입력은 계속 차단합니다.`
      : `${state.batchStatus === 'released' ? reserveMessages.released : reserveMessages.restored} Product Binding ${state.binding.revision}을 먼저 발행했고 내부 7/7과 고객 Web consumer가 같은 revision을 소비합니다.`;
    setReserveState(state.reserveState, rollbackMessage);
    logEvent('propagation', '7/7 + customer-web consumer / release-restored-local-only / claim:withdrawn-from-use');
  }

  function renderEventLog() {
    const container = el('.release-control');
    if (!container || state.eventLog.length === 0) return;
    let log = el('#local-event-log');
    if (!log) {
      log = document.createElement('ol');
      log.id = 'local-event-log';
      log.setAttribute('aria-label', '로컬 상호작용 이벤트 기록');
      log.style.cssText = 'margin:1rem 0 0;padding-left:1.25rem;font:0.65rem/1.5 var(--font-mono);';
      container.append(log);
    }
    log.replaceChildren(...state.eventLog.slice(-5).reverse().map((entry) => {
      const item = document.createElement('li');
      item.textContent = `${String(entry.sequence).padStart(2, '0')} / ${entry.action} / ${entry.detail}`;
      return item;
    }));
  }

  function logEvent(action, detail) {
    state.eventSequence += 1;
    state.eventLog.push({ sequence: state.eventSequence, action, detail });
    renderEventLog();
    persistUiState();
  }

  function restoreLocalRecord() {
    const record = safeStorage('get');
    if (record?.composition === system.composition && productById(record.productId)) {
      state.confirmedId = record.productId;
    }
  }

  function bindEvents() {
    els('[data-set-mode]').forEach((button) => button.addEventListener('click', () => setMode(button.dataset.setMode)));
    els('[data-filter]').forEach((button) => button.addEventListener('click', () => setFilter(button.dataset.filter)));
    el('#commit-button').addEventListener('click', commitSelection);
    el('#cancel-button').addEventListener('click', cancelDraft);
    el('#reset-button').addEventListener('click', resetConfirmed);
    el('#help-button').addEventListener('click', () => setReserveState('retry', '지원 경로 미연결 · unresolved. 현재 제품·입력·초안은 유지됩니다.'));
    el('#alternative-button').addEventListener('click', openAlternative);
    el('#retry-button').addEventListener('click', () => runBatchLookup(state.lastBatchCode || el('#batch-code').value.trim().toUpperCase()));
    el('#batch-form').addEventListener('submit', (event) => {
      event.preventDefault();
      runBatchLookup(el('#batch-code').value.trim().toUpperCase());
    });
    el('#batch-code').addEventListener('input', () => {
      if (state.draftId === 'CS-03') renderSelection();
    });
    els('[data-qa-state]').forEach((button) => button.addEventListener('click', () => qaState(button.dataset.qaState)));
    el('#release-check-button').addEventListener('click', releaseGuard);
    el('#release-issue-button').addEventListener('click', issueRelease);
    el('#rollback-button').addEventListener('click', runRollback);
    el('#release-negative-audit-button').addEventListener('click', () => {
      const outcomes = auditMalformedReleaseRecords();
      const passed = Object.values(outcomes).filter(Boolean).length;
      el('#release-negative-audit-output').textContent = `${passed} / ${Object.keys(outcomes).length} malformed records rejected · HOLD retained`;
    });
  }

  function applyQueryFixture() {
    const params = new URLSearchParams(location.search);
    const requested = params.get('state');
    if (params.get('qa') === '1' && requested) qaState(requested);
  }

  function auditMalformedReleaseRecords() {
    const corruptions = {
      eventId: (record) => { record.eventId = 'EVENT-UNKNOWN'; },
      productId: (record) => { record.productId = 'CS-02'; },
      batchId: (record) => { record.batchId = system.unaffectedBatch; },
      scope: (record) => { record.scope = 'seven-medium-projections-only'; },
      effectiveAt: (record) => { record.effectiveAt = ''; },
      approver: (record) => { record.approver = ''; },
      claimDecision: (record) => { record.claimDecision = 'restore'; },
      permissionsLocalCommit: (record) => { record.permissions.localCommit = false; },
      permissionsFulfillment: (record) => { record.permissions.fulfillment = true; },
      permissionsClaimRestore: (record) => { record.permissions.claimRestore = true; },
      customerFacingCopy: (record) => { record.customerFacingCopy = ''; },
      authorityDisclaimer: (record) => { record.authorityDisclaimer = ''; },
      mediumImpactMap: (record) => { record.mediumImpactMap = record.mediumImpactMap.slice(0, 6); },
    };
    const outcomes = {};
    Object.entries(corruptions).forEach(([field, corrupt]) => {
      setMode('hold', `qa-negative-${field}`);
      issueRelease();
      const malformed = JSON.parse(JSON.stringify(state.releaseRecord));
      corrupt(malformed);
      state.releaseRecord = Object.freeze(malformed);
      runRollback();
      outcomes[field] = state.binding.holdActive === true && state.binding.authorityState === 'hold-active';
    });
    setMode('hold', 'qa-negative-complete');
    return outcomes;
  }

  window.CommonSurfaceR3QA = Object.freeze({
    auditMalformedReleaseRecords,
    snapshot: () => ({
      mode: state.mode,
      filter: state.filter,
      draftId: state.draftId,
      confirmedId: state.confirmedId,
      reserveState: state.reserveState,
      batchStatus: state.batchStatus,
      lastBatchCode: state.lastBatchCode,
      binding: { ...state.binding },
      eventLog: state.eventLog.map((entry) => ({ ...entry })),
    }),
  });

  const uiRestored = restoreUiState();
  restoreLocalRecord();
  const sharedBindingRestored = initialMode === 'hold' && restoreSharedBinding();
  bindEvents();
  const pinnedBaseline = /preview-baseline\.html$/u.test(location.pathname);
  const pinnedHold = /preview-hold\.html$/u.test(location.pathname);
  const restoredMode = pinnedBaseline ? 'baseline' : pinnedHold ? 'hold' : (uiRestored ? state.mode : initialMode);
  if (pinnedBaseline) {
    state.binding = bindingForMode('baseline');
    state.releaseIssued = false;
    state.releaseRecord = null;
    state.batchStatus = 'unverified';
    state.lastBatchCode = '';
  } else if (restoredMode === 'hold' && !sharedBindingRestored && !bindingIsValid(state.binding)) {
    state.binding = bindingForMode('hold');
  }
  setMode(restoredMode, 'initial', { preserveState: uiRestored || sharedBindingRestored, skipPublish: pinnedBaseline });
  applyQueryFixture();
  window.addEventListener('pageshow', () => {
    if (state.mode === 'hold' && restoreSharedBinding()) {
      applyProjectionState();
      renderProducts();
      renderSelection();
      updateStateRail();
      persistUiState();
    }
  });
})();
