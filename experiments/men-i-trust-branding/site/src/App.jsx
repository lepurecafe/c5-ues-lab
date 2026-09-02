import { useState } from 'react';

const plans = {
  balance: { title: 'Balance / 01', description: '피부 상태와 생활 리듬을 먼저 읽고, 필요한 것만 남기는 기본 루틴입니다.', steps: ['Cleanse — 저자극 세정', 'Treat — 수분·결 정돈', 'Protect — 낮 동안의 보호'] },
  reset: { title: 'Reset / 02', description: '면도·야근·건조함으로 흐트러진 컨디션을 짧고 정확하게 되돌립니다.', steps: ['Soften — 각질·결 완화', 'Repair — 집중 보습', 'Restore — 저녁 회복'] },
  maintain: { title: 'Maintain / 03', description: '이미 맞는 루틴을 계절과 환경 변화에 맞춰 미세 조정합니다.', steps: ['Review — 현재 제품 점검', 'Refine — 사용량 조정', 'Repeat — 유지 주기 설정'] },
};

function Wordmark({ inverse = false }) {
  return <span className={`wordmark ${inverse ? 'wordmark--inverse' : ''}`}>men <i>I</i> trust</span>;
}

export function App() {
  const [activePlan, setActivePlan] = useState('balance');
  const [submitted, setSubmitted] = useState(false);
  const plan = plans[activePlan];

  function submitRoutine(event) { event.preventDefault(); setSubmitted(true); }

  return <main>
    <header className="site-header">
      <a className="brand-link" href="#top" aria-label="men I trust 처음으로"><Wordmark /></a>
      <nav aria-label="주요 메뉴"><a href="#method">방법</a><a href="#routine">루틴</a><a href="#objects">오브젝트</a></nav>
      <a className="header-action" href="#consultation">상담 예약</a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="reference">REF. MIT / GROOMING STANDARD / 01</p>
        <h1>당신의 루틴을<br />믿을 수 있게.</h1>
        <p className="hero-summary">피부와 생활의 리듬을 읽고, 과한 선택 없이 오래 유지할 수 있는 남성 그루밍 루틴을 설계합니다.</p>
        <a className="button button--navy" href="#consultation">나에게 맞는 루틴 찾기</a>
        <p className="hero-note">서울 · 예약 기반 컨설테이션 · 45 min</p>
      </div>
      <div className="hero-media"><img src="/assets/hero-products.png" alt="석회석 위에 놓인 네이비 그루밍 제품과 앰버 유리병, 면도 브러시" /></div>
    </section>

    <section className="principle" id="method">
      <div className="section-index">01</div><div><p className="reference">THE METHOD</p><h2>더 많이 권하지 않습니다.</h2></div>
      <p className="principle-copy">Men I Trust는 “무엇을 더 살까”보다 “무엇을 계속할 수 있을까”에서 시작합니다. 피부 상태, 면도 습관, 수면과 업무 환경을 한 장의 루틴 시트로 정리합니다.</p>
    </section>

    <section className="routine" id="routine">
      <div className="routine-intro"><p className="reference">ROUTINE PROTOCOL</p><h2>현재 상태에서<br />가장 필요한 세 단계.</h2><p>서비스는 한 번의 진단으로 끝나지 않습니다. 다음 계절과 일상 변화에도 수정 가능한 기준을 남깁니다.</p></div>
      <div className="routine-console">
        <div className="plan-tabs" role="tablist" aria-label="루틴 유형">
          {Object.entries(plans).map(([key], index) => <button type="button" role="tab" aria-selected={activePlan === key} className={activePlan === key ? 'is-active' : ''} key={key} onClick={() => setActivePlan(key)}>0{index + 1} {key}</button>)}
        </div>
        <div className="plan-sheet" aria-live="polite"><div><p className="reference">RECOMMENDED START</p><h3>{plan.title}</h3><p>{plan.description}</p></div><ol>{plan.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}</ol></div>
      </div>
    </section>

    <section className="objects" id="objects">
      <div className="objects-heading"><p className="reference">OBJECTS / DAILY USE</p><h2>매일 쓰는 물건도<br />루틴의 일부입니다.</h2></div>
      <article className="object-card"><img src="/assets/tumbler-mockup.png" alt="men I trust 로고와 앰버 라인이 있는 스테인리스 텀블러" /><div><p className="reference">OBJECT 01</p><h3>Daily Tumbler</h3><p>스테인리스, 네이비 밴드, 하루의 수분 리듬을 기록하는 얇은 앰버 라인.</p></div></article>
      <article className="object-card object-card--dark"><img src="/assets/tote-mockup.png" alt="men I trust 로고가 인쇄된 아이보리 에코백" /><div><p className="reference">OBJECT 02</p><h3>Field Tote</h3><p>두꺼운 내추럴 코튼과 최소한의 표기로 구성한 이동용 루틴 키트.</p></div></article>
    </section>

    <section className="consultation" id="consultation">
      <div><p className="reference">CONSULTATION DESK</p><h2>당신의 기준을<br />한 장으로 정리합니다.</h2><p>첫 상담 후에는 제품 목록이 아니라, 생활에 맞춘 루틴 시트를 전달합니다.</p></div>
      <form onSubmit={submitRoutine}>
        <label htmlFor="email">이메일</label><input id="email" name="email" type="email" placeholder="name@email.com" required />
        <label htmlFor="focus">현재 가장 신경 쓰이는 것</label><select id="focus" name="focus" defaultValue=""><option value="" disabled>선택하세요</option><option>면도 후 자극</option><option>건조함과 결</option><option>피지와 모공</option><option>기존 루틴 점검</option></select>
        <button className="button button--ivory" type="submit">상담 일정 받기</button>{submitted && <p className="form-success" role="status">기준을 남겼습니다. 가능한 시간대를 곧 보내드릴게요.</p>}
      </form>
    </section>

    <footer><Wordmark inverse /><p>CARE WITH A CLEAR STANDARD.</p><p>© 2026 men I trust — initial brand study</p></footer>
  </main>;
}
