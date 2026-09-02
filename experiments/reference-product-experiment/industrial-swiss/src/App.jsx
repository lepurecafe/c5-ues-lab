import { useMemo, useState } from 'react'

const sessions = [
  { id: 'graphic', category: 'DESIGN', title: 'Graphic Systems That Scale', host: 'Minjae Kim', place: 'Seongsu', time: '10:00 — 13:00', date: 'SAT, AUG 22', price: 120000, seats: 6, image: '/assets/poster-texture.png' },
  { id: 'street', category: 'PHOTOGRAPHY', title: 'Street Light Study', host: 'Jihoon Park', place: 'Hapjeong', time: '11:30 — 14:30', date: 'SAT, AUG 22', price: 110000, seats: 8, image: '/assets/night-walk.png' },
  { id: 'voice', category: 'WRITING', title: 'Write Your Voice', host: 'Eunji Lee', place: 'Yongsan', time: '13:30 — 16:30', date: 'SAT, AUG 22', price: 95000, seats: 7, image: '/assets/workbench.png' },
  { id: 'brand', category: 'DESIGN', title: 'Brand Identity Workshop', host: 'Seungyoon Bae', place: 'Seongsu', time: '15:00 — 18:00', date: 'SAT, AUG 22', price: 130000, seats: 4, image: '/assets/poster-texture.png' },
  { id: 'sampling', category: 'MUSIC', title: 'Sampling Foundations', host: 'Woojin Choi', place: 'Hongdae', time: '14:00 — 17:00', date: 'SUN, AUG 23', price: 90000, seats: 6, image: '/assets/workbench.png' },
  { id: 'makers', category: 'CRAFT', title: 'Leather Essentials', host: 'Sung-hwan Jo', place: 'Ikseon-dong', time: '10:30 — 13:30', date: 'SUN, AUG 23', price: 80000, seats: 10, image: '/assets/night-walk.png' },
  { id: 'motion', category: 'DESIGN', title: 'Motion for Small Screens', host: 'Hana Lee', place: 'Euljiro', time: '12:00 — 15:00', date: 'SUN, AUG 23', price: 100000, seats: 5, image: '/assets/poster-texture.png' },
  { id: 'radio', category: 'MUSIC', title: 'Build a Tiny Radio', host: 'Sora Han', place: 'Mangwon', time: '16:00 — 19:00', date: 'SUN, AUG 23', price: 105000, seats: 9, image: '/assets/workbench.png' },
]

const profiles = {
  reserve: { label: 'RESERVE', description: '하나의 적합한 세션을 빠르게 발견하고 바로 예약합니다.', max: 1, cta: 'RESERVE' },
  compare: { label: 'COMPARE', description: '최대 두 세션의 조건을 비교한 뒤 선택합니다.', max: 2, cta: 'COMPARE & RESERVE' },
  plan: { label: 'PLAN', description: '주말의 시간 흐름을 고려해 세션을 조합합니다.', max: 3, cta: 'HOLD PLAN' },
}
const won = (amount) => `₩${amount.toLocaleString('ko-KR')}`

export function App() {
  const [profile, setProfile] = useState('reserve')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('ALL')
  const [chosen, setChosen] = useState(['graphic'])
  const [feedback, setFeedback] = useState('')
  const [bookingState, setBookingState] = useState('idle')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const activeProfile = profiles[profile]
  const visibleSessions = useMemo(() => sessions.filter((session) => `${session.title} ${session.category} ${session.place}`.toLowerCase().includes(query.toLowerCase()) && (category === 'ALL' || session.category === category)), [query, category])
  const selectedSessions = sessions.filter((session) => chosen.includes(session.id))
  const total = selectedSessions.reduce((sum, session) => sum + session.price, 0)

  function changeProfile(nextProfile) { setProfile(nextProfile); setChosen(nextProfile === 'plan' ? ['graphic', 'sampling'] : nextProfile === 'compare' ? ['graphic', 'street'] : ['graphic']); setFeedback(`${profiles[nextProfile].label} GOAL PROFILE ACTIVE`) }
  function toggleSession(id) { setChosen((current) => { if (current.includes(id)) return current.filter((entry) => entry !== id); if (current.length >= activeProfile.max) { setFeedback(`MAX ${activeProfile.max} SESSION${activeProfile.max > 1 ? 'S' : ''} FOR THIS GOAL`); return current } return [...current, id] }) }
  function reserve() {
    if (!selectedSessions.length) return setFeedback('SELECT A SESSION FIRST')
    if (bookingState === 'idle') { setBookingState('held'); setFeedback('SEATS HELD FOR 10:00'); return }
    if (!/^\S+@\S+\.\S+$/.test(email)) { setEmailError('ENTER A VALID EMAIL TO RECEIVE YOUR TICKET'); return }
    setEmailError(''); setBookingState('confirmed'); setFeedback('BOOKING CONFIRMED · MOBILE TICKET READY')
  }

  return <main className="field-notes">
    <header className="topbar"><a className="wordmark" href="#top">FIELD NOTES</a><label className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events, topics, instructors, locations" /></label><nav aria-label="예약 여정"><span className="active">BROWSE</span><span>—</span><span>SELECT</span><span>—</span><span>CONFIGURE</span><span>—</span><span>CONFIRM</span></nav><button className="compare-link" onClick={() => setFeedback(`${chosen.length} SESSION${chosen.length === 1 ? '' : 'S'} SELECTED`)}>COMPARE ({chosen.length})</button></header>
    <section className="experiment-strip" aria-label="Goal Profile 비교"><div><span>EXPERIMENT AXIS 02</span><strong>Same character · three goal profiles</strong></div><div className="profile-buttons">{Object.entries(profiles).map(([key, item]) => <button key={key} className={profile === key ? 'active' : ''} onClick={() => changeProfile(key)}>{item.label}</button>)}</div><p>{activeProfile.description}</p></section>
    <div className="product-grid" id="top"><aside className="filters"><p className="eyebrow">FIND YOUR SESSION</p><Filter label="LOCATION"><button>SEOUL, KOREA <b>⌄</b></button></Filter><Filter label="DATE"><Check label="SAT, AUG 22, 2026" checked /><Check label="SUN, AUG 23, 2026" checked /></Filter><Filter label="CATEGORY">{['ALL', 'DESIGN', 'PHOTOGRAPHY', 'WRITING', 'CRAFT', 'MUSIC'].map((item) => <Check key={item} label={item} checked={category === item} onChange={() => setCategory(item)} />)}</Filter><Filter label="LEVEL"><Check label="ALL LEVELS" checked /><Check label="BEGINNER" /><Check label="INTERMEDIATE" /></Filter><Filter label="PRICE"><div className="range-line"></div><div className="range-label"><span>₩0</span><span>₩200,000+</span></div></Filter><button className="clear-button" onClick={() => { setQuery(''); setCategory('ALL'); setFeedback('FILTERS CLEARED') }}>CLEAR ALL <span>↶</span></button><div className="state-tools"><span>STATE TEST</span><button onClick={() => setFeedback('LOADING SESSIONS…')}>LOADING</button><button onClick={() => { setQuery('no-result'); setFeedback('NO SESSIONS FOUND') }}>EMPTY</button><button onClick={() => setFeedback('WE COULDN’T LOAD SESSIONS. TRY AGAIN.')}>ERROR</button></div></aside>
      <section className="browse-area" aria-live="polite"><div className="browse-heading"><div><p className="eyebrow">{activeProfile.label} / SEOUL</p><h1>{profile === 'plan' ? 'BUILD YOUR WEEKEND' : profile === 'compare' ? 'COMPARE THE FIELD' : 'SELECT A SESSION'}</h1><p>SAT, AUG 22 — SUN, AUG 23, 2026</p></div><span>{visibleSessions.length} OF 18 SESSIONS</span></div>{feedback && <div className="feedback" role="status">{feedback}<button onClick={() => setFeedback('')}>×</button></div>}{visibleSessions.length ? <div className="poster-grid">{visibleSessions.map((session) => <SessionCard key={session.id} session={session} selected={chosen.includes(session.id)} onToggle={() => toggleSession(session.id)} />)}</div> : <div className="empty-state"><strong>NO SESSIONS FOUND</strong><p>Try resetting your search or category conditions.</p><button onClick={() => { setQuery(''); setCategory('ALL') }}>CLEAR FILTERS</button></div>}<button className="load-more" onClick={() => setFeedback('ALL 18 SESSIONS ARE AVAILABLE IN THIS PROTOTYPE')}>LOAD MORE <span>⌄</span></button></section>
      <aside className="selection-rail"><div className="rail-heading"><p className="eyebrow">YOUR SELECTION</p><button onClick={() => setChosen([])}>CLEAR</button></div>{selectedSessions.length ? selectedSessions.map((session) => <article className="selection-item" key={session.id}><img src={session.image} alt="" /><div><span>{session.category}</span><h2>{session.title}</h2><p>{session.date} · {session.time}</p><p>{session.place}</p><strong>{won(session.price)}</strong></div><button aria-label={`${session.title} 선택 해제`} onClick={() => toggleSession(session.id)}>×</button></article>) : <div className="selection-empty">SELECT A SESSION<br />TO BUILD YOUR PATH.</div>}<div className="reserve-box"><p>TOTAL ({selectedSessions.length} SESSION{selectedSessions.length === 1 ? '' : 'S'})</p><strong>{won(total)}</strong>{bookingState === 'held' && <label className="ticket-email">TICKET EMAIL<input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setEmailError('') }} placeholder="you@email.com" aria-invalid={Boolean(emailError)} /></label>}{emailError && <p className="validation-error" role="alert">{emailError}</p>}<button className="reserve-button" onClick={reserve}>{bookingState === 'idle' ? activeProfile.cta : bookingState === 'held' ? 'CONFIRM BOOKING' : 'BOOKING CONFIRMED'}<span>›</span></button><p className="hold-status">{bookingState === 'confirmed' ? 'MOBILE TICKET SENT' : bookingState === 'held' ? 'HELD UNTIL 10:00 AM' : 'SELECTED SEATS HELD FOR 10:00'}</p></div><div className="schedule"><div><p className="eyebrow">UPCOMING SCHEDULE</p><button>VIEW ALL</button></div>{selectedSessions.map((session) => <p key={session.id}><b>{session.date.replace(', ', '\n')}</b><span>{session.time}<br />{session.title}<br /><small>{session.place}</small></span></p>)}</div></aside></div>
    <footer>{[['CURATED','Real instructors.\nSmall classes.'],['CLEAR CONDITIONS','Time, location, what to bring.'],['FAIR CANCELLATION','Cancel up to 48 hours before.'],['MOBILE TICKET','QR check-in. No printing.'],['NEED HELP?','Talk to our field team.']].map(([title, body]) => <div key={title}><b>{title}</b><span>{body}</span></div>)}</footer>
  </main>
}
function Filter({ label, children }) { return <section className="filter"><p>{label}</p>{children}</section> }
function Check({ label, checked = false, onChange }) { return <label className="check"><input type="checkbox" checked={checked} onChange={onChange} readOnly={!onChange} /><span>{label}</span></label> }
function SessionCard({ session, selected, onToggle }) { return <article className={`session-card ${selected ? 'selected' : ''}`} style={{ backgroundImage: `linear-gradient(180deg, transparent 20%, rgba(13,13,12,.12) 45%, #171715 100%), url(${session.image})` }}><button className="save" aria-label={`${session.title} 저장`}>⌑</button><button className="card-action" onClick={onToggle} aria-pressed={selected}>{selected ? '✓ SELECTED' : 'SELECT SESSION'}</button><div className="card-content"><span>{session.category}</span><p>{session.time}</p><h2>{session.title}</h2><p>WITH {session.host.toUpperCase()}</p><div><b>{session.place.toUpperCase()}</b><b>{won(session.price)}</b></div><div><small>SEATS LEFT</small><strong>{session.seats}</strong></div></div></article> }
