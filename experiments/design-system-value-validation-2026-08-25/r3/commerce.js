(function initCommerceSample() {
  'use strict';

  const data = window.CommonSurfaceData;
  if (!data) throw new Error('COMMON SURFACE catalog data is unavailable.');

  const { products, system } = data;
  const body = document.body;
  const bindingStorageKey = `cs-r3:binding:${system.composition}`;
  const uiStorageKey = `cs-r3:commerce-ui:${system.composition}`;
  const mediumTargets = ['moodboard', 'packaging', 'shop', 'merch', 'ooh', 'ads', 'web'];
  const byId = (id) => products.find((product) => product.id === id) || null;
  const el = (selector) => document.querySelector(selector);
  const els = (selector) => [...document.querySelectorAll(selector)];

  function holdBinding() {
    return {
      composition: system.composition,
      revision: system.holdBindingRevision,
      authorityState: 'hold-active',
      holdActive: true,
      affectedProductId: system.affectedProductId,
      affectedBatchId: system.batch,
      claimState: 'withdrawn-from-use',
      releaseEventId: null,
      releaseEffectiveAt: null,
      releaseRecord: null,
    };
  }

  const state = {
    mode: 'hold',
    draftId: null,
    confirmedId: null,
    confirmedRecord: null,
    batchStatus: 'unverified',
    lastBatchCode: '',
    binding: holdBinding(),
    lookupRequestId: 0,
    commitRequestId: 0,
  };

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

  function persistUiState() {
    safeJsonStorage(sessionStorage, uiStorageKey, 'set', {
      composition: system.composition,
      mode: state.mode,
      draftId: state.draftId,
      confirmedId: state.confirmedId,
      confirmedRecord: state.confirmedRecord,
      batchStatus: state.batchStatus,
      lastBatchCode: /^CS03-SYN-[A-Z0-9-]+$/.test(state.lastBatchCode) ? state.lastBatchCode : '',
    });
  }

  function restoreUiState() {
    const saved = safeJsonStorage(sessionStorage, uiStorageKey, 'get');
    if (!saved || saved.composition !== system.composition) return false;
    if (['baseline', 'hold'].includes(saved.mode)) state.mode = saved.mode;
    if (saved.draftId === null || byId(saved.draftId)) state.draftId = saved.draftId;
    if (saved.confirmedId === null || byId(saved.confirmedId)) state.confirmedId = saved.confirmedId;
    if (saved.confirmedRecord
      && saved.confirmedRecord.composition === system.composition
      && byId(saved.confirmedRecord.productId)
      && (saved.confirmedRecord.batchId === null || /^CS03-SYN-[A-Z0-9-]+$/.test(saved.confirmedRecord.batchId))) {
      state.confirmedRecord = saved.confirmedRecord;
      state.confirmedId = saved.confirmedRecord.productId;
    }
    if (['unverified', 'affected', 'unknown', 'invalid', 'partial', 'stale', 'unaffected', 'released'].includes(saved.batchStatus)) state.batchStatus = saved.batchStatus;
    if (typeof saved.lastBatchCode === 'string' && /^CS03-SYN-[A-Z0-9-]+$/.test(saved.lastBatchCode)) state.lastBatchCode = saved.lastBatchCode;
    return true;
  }

  function consumeSharedBinding(source = 'initial') {
    const shared = safeJsonStorage(localStorage, bindingStorageKey, 'get');
    if (!bindingIsValid(shared)) {
      if (!bindingIsValid(state.binding)) state.binding = holdBinding();
      return false;
    }
    const previousRevision = state.binding.revision;
    state.binding = shared;
    if (previousRevision !== shared.revision) state.commitRequestId += 1;
    if (state.lastBatchCode === system.batch) {
      state.batchStatus = shared.holdActive ? 'affected' : 'released';
      if (shared.holdActive && state.confirmedId === 'CS-03') {
        state.confirmedId = null;
        state.confirmedRecord = null;
      }
    } else if (state.lastBatchCode === system.unaffectedBatch) {
      state.batchStatus = 'unaffected';
    } else if (!state.lastBatchCode) {
      state.batchStatus = 'unverified';
    } else if (!['invalid', 'partial', 'stale'].includes(state.batchStatus)) {
      state.batchStatus = 'unknown';
    }
    const batchInput = el('#commerce-batch');
    if (batchInput) batchInput.value = state.lastBatchCode;
    body.dataset.bindingState = shared.authorityState;
    body.dataset.bindingRevision = shared.revision;
    if (state.mode === 'hold') {
      renderDraft();
      renderModeChrome({ announceChange: previousRevision !== shared.revision, source });
    }
    persistUiState();
    return true;
  }

  function projectionState() {
    if (state.mode === 'baseline') return 'baseline';
    return state.binding.holdActive ? 'hold' : 'released';
  }

  function commitPolicy(product) {
    if (!product) return { blocked: true, state: 'invalid' };
    if (state.mode !== 'hold' || product.id !== 'CS-03') return { blocked: false, state: 'selectable' };
    const enteredCode = el('#commerce-batch')?.value.trim().toUpperCase() || '';
    if (enteredCode && enteredCode !== state.lastBatchCode) return { blocked: true, state: 'unverified-input' };
    if (['loading', 'unknown', 'invalid', 'partial', 'stale'].includes(state.batchStatus)) return { blocked: true, state: state.batchStatus };
    if (!state.binding.holdActive) {
      if (state.batchStatus === 'affected') return { blocked: true, state: 'hold' };
      return { blocked: false, state: state.batchStatus === 'released' ? 'released' : 'selectable' };
    }
    if (state.batchStatus === 'affected') return { blocked: true, state: 'hold' };
    return { blocked: false, state: state.batchStatus };
  }

  function renderModeChrome(options = {}) {
    const projection = projectionState();
    body.dataset.mode = state.mode;
    body.dataset.projectionState = projection;
    body.dataset.bindingState = state.binding.authorityState;
    body.dataset.bindingRevision = state.binding.revision;
    els('[data-commerce-mode]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.commerceMode === state.mode)));

    const notice = el('#hold-commerce-notice');
    const noticeCopy = el('#commerce-notice-copy');
    const noticeLink = el('#commerce-notice-link');
    const revision = el('#commerce-binding-revision');
    notice.hidden = projection === 'baseline';
    notice.dataset.state = projection;
    if (revision) revision.textContent = `${state.binding.revision} · ${state.binding.authorityState}`;

    if (projection === 'hold') {
      noticeCopy.textContent = `CS-03 전체가 아닌 exact 합성 batch ${system.batch}만 HOLD · 실제 안전 판단이 아닙니다.`;
      noticeLink.textContent = 'batch 확인 →';
      noticeLink.href = '#batch-commerce';
    } else if (projection === 'released') {
      noticeCopy.textContent = system.releaseCustomerCopy;
      noticeLink.textContent = '검증 범위 보기 →';
      noticeLink.href = '#support';
    }

    els('[data-cs03-status]').forEach((node) => {
      node.textContent = projection === 'hold'
        ? '일부 합성 batch 확인 필요 · 실제 안전 판단이 아님'
        : projection === 'released'
          ? 'exact H01 local release 검증 · claim·fulfillment 미복원'
          : 'BARRIER는 작업명 · 장벽 회복 효능 미확정';
    });

    if (options.announceChange) {
      announce(projection === 'released'
        ? `내부 Product Binding의 ${state.binding.revision}을 ${options.source || 'shared storage'}에서 소비했습니다. 로컬 commit만 복원합니다.`
        : `내부 Product Binding의 ${state.binding.revision}을 소비해 exact H01 HOLD를 적용했습니다.`);
    }
  }

  function setMode(mode, options = {}) {
    state.lookupRequestId += 1;
    state.commitRequestId += 1;
    state.mode = mode === 'baseline' ? 'baseline' : 'hold';
    if (!options.preserveState) {
      state.batchStatus = 'unverified';
      state.lastBatchCode = '';
      el('#commerce-batch').value = '';
    }
    if (state.mode === 'hold') consumeSharedBinding('mode-control');
    renderModeChrome();
    if (state.draftId === 'CS-03') renderDraft();
    if (!options.silent) {
      const projection = projectionState();
      announce(projection === 'released'
        ? '검증된 합성 release 적용 보기입니다. exact H01의 로컬 선택만 복원하며 claim·fulfillment는 복원하지 않습니다.'
        : projection === 'hold'
          ? `HOLD / 01 적용 보기입니다. 영향 범위는 CS-03 / ${system.batch}입니다.`
          : '정규화 기준선 보기입니다. 변경 전 로컬 선택 흐름을 표시합니다.');
    }
    persistUiState();
  }

  function selectProduct(id) {
    const product = byId(id);
    if (!product) return;
    state.lookupRequestId += 1;
    state.commitRequestId += 1;
    if (state.draftId !== id || id !== 'CS-03') {
      state.batchStatus = 'unverified';
      state.lastBatchCode = '';
      el('#commerce-batch').value = '';
    }
    state.draftId = id;
    renderDraft();
    persistUiState();
    el('#reserve-commerce').scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  }

  function renderDraft() {
    const product = byId(state.draftId);
    const commitButton = el('#commerce-commit');
    if (!product) {
      el('#commerce-selected-label').textContent = '제품을 직접 선택하세요.';
      el('#commerce-selected-name').textContent = 'NO DRAFT';
      el('#commerce-selected-authority').textContent = '재고·가격·개인 적합성은 판단하지 않습니다.';
      commitButton.disabled = true;
      return;
    }

    const policy = commitPolicy(product);
    const scoped = state.mode === 'hold' && product.id === 'CS-03';
    el('#commerce-selected-label').textContent = scoped ? `사용자 초안 · batch ${state.batchStatus}` : '사용자 초안 · commit 전';
    el('#commerce-selected-name').textContent = `${product.id} / ${product.name}`;
    if (scoped && !state.binding.holdActive) {
      if (state.batchStatus === 'released') {
        el('#commerce-selected-authority').textContent = 'exact H01은 검증된 합성 release로 로컬 선택만 복원됐습니다. U01 비영향 fixture가 아니며 claim·fulfillment는 미복원입니다.';
      } else if (state.batchStatus === 'unaffected') {
        el('#commerce-selected-authority').textContent = `${system.unaffectedBatch}는 별도의 비영향 합성 fixture입니다. H01 release와 동일시하지 않으며 실제 안전·재고·판매 가능을 뜻하지 않습니다.`;
      } else if (['unknown', 'invalid', 'partial', 'stale'].includes(state.batchStatus)) {
        el('#commerce-selected-authority').textContent = `H01 release는 입력한 ${state.lastBatchCode || '미확인 코드'}에 적용되지 않습니다. 이 batch는 계속 차단됩니다.`;
      } else {
        el('#commerce-selected-authority').textContent = 'H01 local release가 존재하지만 현재 선택은 batch 없는 제품 수준 초안입니다. claim·fulfillment는 미복원입니다.';
      }
    } else if (scoped && state.batchStatus === 'affected') {
      el('#commerce-selected-authority').textContent = `입력한 exact 합성 batch ${system.batch}만 HOLD / 01 범위입니다. 실제 안전 판단이 아닙니다.`;
    } else if (scoped && state.batchStatus === 'unaffected') {
      el('#commerce-selected-authority').textContent = `${system.unaffectedBatch}는 비영향 합성 fixture입니다. 실제 안전·재고·판매 가능을 뜻하지 않습니다.`;
    } else if (scoped && ['unknown', 'invalid', 'partial', 'stale'].includes(state.batchStatus)) {
      el('#commerce-selected-authority').textContent = '입력 batch의 권한 상태는 미확인입니다. 영향 없음이나 안전으로 판정하지 않습니다.';
    } else if (scoped) {
      el('#commerce-selected-authority').textContent = `CS-03 전체가 아닌 ${system.batch}만 HOLD입니다. 현재 선택은 batch 없는 로컬 제품 후보입니다.`;
    } else {
      el('#commerce-selected-authority').textContent = product.authority;
    }
    commitButton.disabled = policy.blocked;
    commitButton.textContent = policy.blocked ? '현재 batch · 저장 불가' : '로컬 선택 저장';
    if (policy.blocked) {
      result(policy.state, state.batchStatus === 'affected' ? 'exact batch HOLD' : 'batch 상태 미확인', '현재 batch의 local commit은 차단됩니다. 입력 유지·다른 제품·지원 경로를 이용하세요.');
    } else if (scoped && state.batchStatus === 'released') {
      result('released', 'exact H01 · local release', '로컬 선택만 복원됐습니다. U01 비영향 판정이나 실제 판매·재고·fulfillment 복원이 아닙니다.');
    } else if (scoped && state.batchStatus === 'unaffected') {
      result('unaffected', '비영향 합성 fixture', '로컬 선택은 가능하지만 실제 안전·재고·판매 가능 판정이 아닙니다.');
    } else if (scoped) {
      result('draft', 'batch 없는 제품 수준 초안', 'CS-03 제품 후보만 로컬 저장할 수 있습니다. 구매·예약·재고·fulfillment를 확정하지 않습니다.');
    } else {
      result('draft', '사용자 초안', '아직 저장되지 않았습니다. 사용자가 직접 바꾸거나 명시적으로 commit할 수 있습니다.');
    }
  }

  function commit() {
    const product = byId(state.draftId);
    if (!product) {
      result('invalid', '제품을 먼저 선택하세요', '현재 입력과 페이지 맥락은 유지됩니다.');
      return;
    }
    const policy = commitPolicy(product);
    if (policy.blocked) {
      result(policy.state, state.batchStatus === 'affected' ? 'exact batch HOLD' : 'batch 상태 미확인', '현재 입력한 batch는 로컬 선택을 진행할 수 없습니다. 실제 안전 판단이 아닙니다.');
      return;
    }
    const candidateRecord = {
      composition: system.composition,
      productId: product.id,
      batchId: product.id === 'CS-03' && ['unaffected', 'released'].includes(state.batchStatus) ? state.lastBatchCode : null,
      batchAuthorityState: product.id === 'CS-03' ? state.batchStatus : 'not-applicable',
      bindingRevision: state.binding.revision,
      result: 'local-selection-confirmed',
      synthetic: true,
    };
    const previousRecord = state.confirmedRecord;
    if (previousRecord
      && previousRecord.composition === candidateRecord.composition
      && previousRecord.productId === candidateRecord.productId
      && previousRecord.batchId === candidateRecord.batchId
      && previousRecord.batchAuthorityState === candidateRecord.batchAuthorityState
      && previousRecord.bindingRevision === candidateRecord.bindingRevision) {
      result('success', '기존 로컬 결과 확인', `${product.id}의 중복 record를 만들지 않았습니다.`);
      return;
    }
    const requestId = ++state.commitRequestId;
    const expectedProductId = product.id;
    const expectedBatchCode = state.lastBatchCode;
    result('loading', '로컬 선택 확인 중', '결과를 확정하기 전에 현재 후보와 상태를 다시 검증합니다.');
    window.setTimeout(() => {
      const settledProduct = byId(state.draftId);
      const settledPolicy = commitPolicy(settledProduct);
      if (requestId !== state.commitRequestId
        || settledProduct?.id !== expectedProductId
        || state.lastBatchCode !== expectedBatchCode
        || settledPolicy.blocked) {
        renderDraft();
        result(settledPolicy.state, '상태 변경으로 저장 중단', '현재 Product Binding과 batch를 다시 확인하세요. 로컬 선택은 저장하지 않았습니다.');
        return;
      }
      const settledRecord = {
        composition: system.composition,
        productId: settledProduct.id,
        batchId: settledProduct.id === 'CS-03' && ['unaffected', 'released'].includes(state.batchStatus) ? state.lastBatchCode : null,
        batchAuthorityState: settledProduct.id === 'CS-03' ? state.batchStatus : 'not-applicable',
        bindingRevision: state.binding.revision,
        result: 'local-selection-confirmed',
        synthetic: true,
      };
      state.confirmedId = settledProduct.id;
      state.confirmedRecord = settledRecord;
      persistUiState();
      result('success', `${settledProduct.id} 로컬 선택 완료`, state.batchStatus === 'released'
        ? '검증된 합성 release 범위의 local-only 결과입니다. 실제 판매·재고·fulfillment가 아닙니다.'
        : '실제 구매·예약·계정·재고 결과가 아닙니다.');
    }, reducedMotion() ? 10 : 380);
  }

  function result(nextState, title, message) {
    const container = el('#commerce-result');
    container.dataset.state = nextState;
    container.innerHTML = `<strong id="commerce-result-title">${title}</strong><p>${message}</p>`;
  }

  function announce(message) {
    const projection = projectionState();
    result(projection === 'hold' ? 'hold' : projection === 'released' ? 'released' : 'default', projection === 'hold' ? 'HOLD / 01 적용' : projection === 'released' ? 'LOCAL RELEASE 적용' : '정규화 기준선', message);
  }

  function checkBatch(code) {
    const requestId = ++state.lookupRequestId;
    state.commitRequestId += 1;
    if (state.mode !== 'hold') {
      result('default', '변경 전 기준선', 'HOLD batch 조회는 R3-B 적용 보기에서 확인할 수 있습니다.');
      return;
    }
    if (!code || !/^[A-Z0-9-]{5,}$/.test(code)) {
      state.batchStatus = 'invalid';
      state.lastBatchCode = code;
      el('#commerce-batch').setAttribute('aria-invalid', 'true');
      result('invalid', 'batch 코드 형식 확인', '입력은 유지됩니다. 문자·숫자·하이픈만 사용하세요.');
      persistUiState();
      return;
    }
    el('#commerce-batch').removeAttribute('aria-invalid');
    state.lastBatchCode = code;
    state.batchStatus = 'loading';
    if (state.draftId === 'CS-03') renderDraft();
    result('loading', '합성 fixture 확인 중', '개인정보나 외부 서비스로 전송하지 않습니다.');
    window.setTimeout(() => {
      if (requestId !== state.lookupRequestId || code !== state.lastBatchCode) return;
      if (code === system.batch && state.binding.holdActive) {
        state.batchStatus = 'affected';
        state.draftId = 'CS-03';
        renderDraft();
        result('hold', 'HOLD / 01 대상 일치', `${system.batch}의 local commit이 차단됩니다. 실제 안전 판정이 아닙니다.`);
      } else if (code === system.batch && !state.binding.holdActive) {
        state.batchStatus = 'released';
        state.draftId = 'CS-03';
        renderDraft();
        result('released', 'exact H01 · local release 일치', '검증된 합성 release로 로컬 commit만 복원됐습니다. U01 판정이나 실제 fulfillment가 아닙니다.');
      } else if (code === system.unaffectedBatch) {
        state.batchStatus = 'unaffected';
        state.draftId = 'CS-03';
        renderDraft();
        result('unaffected', '비영향 합성 fixture 일치', `${system.unaffectedBatch}는 로컬 선택만 가능합니다. 실제 안전·재고·판매 가능 판정이 아닙니다.`);
      } else {
        state.batchStatus = 'unknown';
        if (code.startsWith('CS03-')) state.draftId = 'CS-03';
        renderDraft();
        result('unknown', 'HOLD 대상과 일치하지 않음', '실제 제품 상태는 미확인입니다. 영향 없음이나 안전으로 판정하지 않습니다.');
      }
      persistUiState();
    }, reducedMotion() ? 10 : 420);
  }

  function reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function bindEvents() {
    els('[data-commerce-mode]').forEach((button) => button.addEventListener('click', () => setMode(button.dataset.commerceMode)));
    els('[data-choose-product]').forEach((button) => button.addEventListener('click', () => selectProduct(button.dataset.chooseProduct)));
    el('#commerce-commit').addEventListener('click', commit);
    el('#commerce-alternative').addEventListener('click', () => {
      selectProduct('CS-02');
      result('alternative', '사용자가 고른 다른 제품', 'CS-02를 안전·효능·적합 제품으로 자동 추천하지 않습니다.');
    });
    el('#commerce-reset').addEventListener('click', () => {
      state.lookupRequestId += 1;
      state.commitRequestId += 1;
      state.draftId = null;
      state.confirmedId = null;
      state.confirmedRecord = null;
      state.batchStatus = 'unverified';
      state.lastBatchCode = '';
      el('#commerce-batch').value = '';
      renderDraft();
      persistUiState();
      result('default', '선택 기록 초기화', 'HOLD event와 Product Binding은 변경되지 않습니다.');
    });
    el('#commerce-help').addEventListener('click', () => result('help', '지원 경로 미연결', '합성 실험에서는 실제 고객센터를 만들지 않습니다. 현재 제품과 입력은 유지됩니다.'));
    el('#batch-commerce').addEventListener('submit', (event) => {
      event.preventDefault();
      checkBatch(el('#commerce-batch').value.trim().toUpperCase());
    });
    el('#commerce-batch').addEventListener('input', () => {
      if (state.draftId === 'CS-03') renderDraft();
    });
    el('#language-button').addEventListener('click', (event) => {
      const pressed = event.currentTarget.getAttribute('aria-pressed') !== 'true';
      event.currentTarget.setAttribute('aria-pressed', String(pressed));
      result('language', pressed ? 'KR / EN 구조 확인' : 'KR 우선 구조', pressed
        ? '제품 ID와 핵심 상태는 유지하며 장문 번역 슬롯을 확인합니다.'
        : '한글의 자연스러운 자간과 행간을 기본으로 표시합니다.');
    });
    window.addEventListener('storage', (event) => {
      if (event.key === bindingStorageKey) consumeSharedBinding('storage-event');
    });
    window.addEventListener('pageshow', () => {
      restoreUiState();
      consumeSharedBinding('pageshow');
      el('#commerce-batch').value = state.lastBatchCode;
      renderModeChrome();
      renderDraft();
      persistUiState();
    });
  }

  window.CommonSurfaceCommerceQA = Object.freeze({
    snapshot: () => ({
      mode: state.mode,
      draftId: state.draftId,
      confirmedId: state.confirmedId,
      confirmedRecord: state.confirmedRecord ? { ...state.confirmedRecord } : null,
      batchStatus: state.batchStatus,
      lastBatchCode: state.lastBatchCode,
      binding: { ...state.binding },
      projection: projectionState(),
    }),
  });

  restoreUiState();
  consumeSharedBinding('initial-load');
  bindEvents();
  el('#commerce-batch').value = state.lastBatchCode;
  setMode(state.mode, { preserveState: true, silent: true });
  renderDraft();
})();
