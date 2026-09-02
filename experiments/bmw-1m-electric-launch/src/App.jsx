import { useEffect, useState } from "react";
import { ArrowRight, List, X } from "@phosphor-icons/react";

const sections = [
  { id: "identity", index: "01", ko: "정체성", en: "IDENTITY" },
  { id: "transition", index: "02", ko: "전환", en: "TRANSITION" },
  { id: "feel", index: "03", ko: "주행 감각", en: "DRIVING FEEL" },
  { id: "architecture", index: "04", ko: "구조", en: "ARCHITECTURE" },
  { id: "spec", index: "05", ko: "사양 확인", en: "SPEC CHECK" },
  { id: "updates", index: "06", ko: "출시 소식 신청", en: "UPDATES SIGN-UP" },
];

function MenuIcon({ open }) {
  return open ? <X aria-hidden="true" size={24} weight="thin" /> : <List aria-hidden="true" size={24} weight="thin" />;
}

function SectionLabel({ index, ko, en, light = false }) {
  return (
    <div className={`section-label ${light ? "section-label--light" : ""}`}>
      <span>[{index}]</span>
      <div><strong>{ko}</strong><small>{en}</small></div>
    </div>
  );
}

function UpdateForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  function submit(event) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 650);
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="success-check">✓</span>
        <div><strong>신청이 완료되었습니다.</strong><small>업데이트 소식을 이메일로 보내드릴게요.</small></div>
      </div>
    );
  }

  return (
    <form className="update-form" onSubmit={submit} noValidate>
      <label className="sr-only" htmlFor="updates-email">이메일 주소</label>
      <input
        id="updates-email"
        type="email"
        placeholder="이메일 주소 입력"
        value={email}
        onChange={(event) => { setEmail(event.target.value); setStatus("idle"); }}
        aria-invalid={status === "error"}
        aria-describedby={status === "error" ? "updates-email-error" : undefined}
      />
      <button type="submit" disabled={status === "loading"} aria-label="출시 소식 신청">
        {status === "loading" ? <span className="loading-mark" /> : <ArrowRight aria-hidden="true" size={20} weight="thin" />}
      </button>
      {status === "error" && <small className="form-error" id="updates-email-error">올바른 이메일 주소를 입력해 주세요.</small>}
    </form>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("identity");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-35% 0px -55%", threshold: 0.01 },
    );
    sections.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main>
      <header className="site-header">
        <button className="wordmark" onClick={() => goTo("identity")} aria-label="맨 위로 이동">
          <span>1M ELECTRIC STUDY</span><small>UNOFFICIAL CONCEPT</small>
        </button>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {sections.slice(0, 4).map((item) => (
            <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => goTo(item.id)}>{item.ko}</button>
          ))}
        </nav>
        <button className="signal-button header-cta" onClick={() => goTo("updates")}>소식 받기</button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="메뉴 열기">
          <MenuIcon open={menuOpen} />
        </button>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="모바일 메뉴">
            {sections.map((item) => <button key={item.id} onClick={() => goTo(item.id)}><span>[{item.index}]</span>{item.ko}</button>)}
          </nav>
        )}
      </header>

      <section className="hero" id="identity">
        <img className="hero-car" src="/assets/1m-electric-hero.png" alt="검은색 전기 퍼포먼스 쿠페의 후면 3/4 이미지" />
        <div className="hero-content">
          <p className="archive-line">ARCHIVE 0.1&nbsp;&nbsp; / &nbsp;&nbsp;STUDY-1M-0001</p>
          <h1><span>1M</span><strong>ELECTRIC<br />STUDY</strong></h1>
          <p className="hero-copy">익숙한 균형. 새로운 동력.</p>
          <p className="unofficial">비공식 콘셉트 디자인</p>
        </div>
        <div className="sequence-stamp"><small>SIGNAL<br />SEQUENCE</small><strong>01 → 06</strong></div>
        <div className="principle-rail" aria-label="설계 원칙">
          <span>[PRINCIPLES]</span>
          <b>즉각적인 응답</b><i />
          <b>낮은 무게중심</b><i />
          <b>후륜 중심 제어</b>
        </div>
        <div className="sequence-nav" aria-label="콘텐츠 순서">
          {sections.map((item) => (
            <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => goTo(item.id)}>
              <small>[{item.index}]</small><strong>{item.ko}</strong><span>{item.en}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="transition-section" id="transition">
        <div className="transition-copy">
          <SectionLabel index="02" ko="전환" en="TRANSITION" />
          <h2>남겨야 할 것과<br />바꿔야 할 것을<br />분리했습니다.</h2>
          <p>짧은 휠베이스, 넓은 트랙, 운전자 중심의 균형은 유지합니다. 동력 전달 방식과 에너지 배치는 전기 구동에 맞춰 처음부터 다시 설계합니다.</p>
        </div>
        <div className="signal-field" aria-hidden="true"><span>02</span><small>COMBUSTION<br />TO ELECTRIC</small></div>
        <div className="transition-image"><img src="/assets/1m-electric-hero.png" alt="전동화 전환을 상징하는 검은색 쿠페 측후면" /></div>
      </section>

      <section className="feel-section" id="feel">
        <div className="feel-heading">
          <SectionLabel index="03" ko="주행 감각" en="DRIVING FEEL" light />
          <h2>숫자가 아니라<br />반응으로 기억되는 차.</h2>
        </div>
        <div className="principles-list">
          <article><span>01</span><h3>즉각적인 응답</h3><p>페달 입력과 구동력 사이의 지연을 줄여 운전자의 의도가 바로 차체 움직임으로 이어집니다.</p></article>
          <article><span>02</span><h3>낮은 무게중심</h3><p>배터리를 낮고 중앙에 배치해 빠른 방향 전환에서도 차체의 자세를 안정적으로 유지합니다.</p></article>
          <article><span>03</span><h3>후륜 중심 제어</h3><p>후륜에 우선 배분되는 토크와 정교한 제어로 컴팩트 쿠페 특유의 회전 감각을 남깁니다.</p></article>
        </div>
      </section>

      <section className="architecture-section" id="architecture">
        <div className="architecture-image"><img src="/assets/electric-architecture.png" alt="전기차 차체, 모터, 배터리, 서스펜션의 분해 구조" /></div>
        <div className="architecture-copy">
          <SectionLabel index="04" ko="구조" en="ARCHITECTURE" />
          <h2>낮게 배치하고,<br />뒤에서 밀어냅니다.</h2>
          <p>차체 바닥 전체를 채우는 배터리와 후륜 중심의 구동 모듈이 낮은 관성과 민첩한 회두성을 만듭니다.</p>
          <dl>
            <div><dt>STRUCTURE</dt><dd>고강성 차체 구조</dd></div>
            <div><dt>BATTERY</dt><dd>저중심 플랫 팩</dd></div>
            <div><dt>DRIVE</dt><dd>후륜 중심 듀얼 모터</dd></div>
          </dl>
        </div>
      </section>

      <section className="spec-section" id="spec">
        <div className="spec-head">
          <SectionLabel index="05" ko="사양 확인" en="SPEC CHECK" light />
          <p>아래 수치는 실제 출시 사양이 아닌 UX·디자인 검증을 위한 콘셉트 목표값입니다.</p>
        </div>
        <div className="spec-table" role="table" aria-label="콘셉트 목표 사양">
          <div role="row"><span role="cell">SYSTEM OUTPUT</span><strong role="cell">350 kW</strong><small role="cell">CONCEPT TARGET</small></div>
          <div role="row"><span role="cell">PEAK TORQUE</span><strong role="cell">700 Nm</strong><small role="cell">CONCEPT TARGET</small></div>
          <div role="row"><span role="cell">BATTERY</span><strong role="cell">75 kWh</strong><small role="cell">USABLE TARGET</small></div>
          <div role="row"><span role="cell">DRIVE LAYOUT</span><strong role="cell">REAR-BIASED AWD</strong><small role="cell">CONTROL MODEL</small></div>
        </div>
      </section>

      <section className="updates-section" id="updates">
        <div>
          <SectionLabel index="06" ko="출시 소식 신청" en="UPDATES SIGN-UP" />
          <h2>STAY IN THE<br />SEQUENCE.</h2>
          <p>이 비공식 스터디의 디자인 업데이트와 새로운 자료가 공개되면 이메일로 안내해 드립니다.</p>
        </div>
        <UpdateForm />
      </section>

      <footer>
        <div><strong>1M ELECTRIC STUDY</strong><small>UNOFFICIAL CONCEPT DESIGN PROJECT</small></div>
        <a href="/pamphlet.html">팜플렛 HTML 보기 <ArrowRight aria-hidden="true" size={20} weight="thin" /></a>
        <span>ARCHIVE 0.1&nbsp;&nbsp; 2026.08</span>
      </footer>
    </main>
  );
}
