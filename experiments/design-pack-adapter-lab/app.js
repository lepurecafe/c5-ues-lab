const deck = document.querySelector('#deck');
const statusText = document.querySelector('#statusText');
const stepLabel = document.querySelector('#stepLabel');
const timerNode = document.querySelector('#timer');
const roundNumber = document.querySelector('#roundNumber');
const screenMap = { entry: ['STEP 01 · INFORM', 'READY TO PLAY'], ready: ['STEP 02 · SELECT', 'CONFIGURE ROUND'], playing: ['STEP 03 · PROCESS', 'LIVE · AUDIO OUTPUT OK'], transition: ['STEP 04 · CONFIRM', 'NEXT BEAT ARMED'], ended: ['STEP 05 · RESULT', 'ROUND COMPLETE'] };
const beats = [
  { name: 'Chrome Bounce', meta: '98 BPM · Hip-hop · High energy', reason: '현재 비트보다 4 BPM 상승해 에너지를 자연스럽게 올립니다.' },
  { name: 'Concrete Rhythm', meta: '96 BPM · Breaks · Mid energy', reason: '같은 에너지 구간에서 그루브만 바꿔 흐름을 유지합니다.' },
  { name: 'Night Runner', meta: '100 BPM · Electro · High energy', reason: '파이널 라운드에 맞는 명확한 상승 전환입니다.' }
];
let state = 'entry'; let isPlaying = true; let seconds = 60; let timerId; let nextIndex = 0; let locked = false;

function setState(next) {
  state = next;
  deck.dataset.state = next;
  document.querySelectorAll('[data-screen]').forEach((screen) => { screen.hidden = screen.dataset.screen !== next; });
  document.querySelectorAll('[data-flow]').forEach((item) => item.classList.toggle('active', item.dataset.flow === next));
  stepLabel.textContent = screenMap[next][0]; statusText.textContent = screenMap[next][1];
  if (next === 'playing') { startTimer(); } else { stopTimer(); }
}
function startTimer() { stopTimer(); timerId = setInterval(() => { if (!isPlaying) return; seconds = Math.max(0, seconds - 1); timerNode.textContent = `00:${String(seconds).padStart(2, '0')}`; if (!seconds) setState('ended'); }, 1000); }
function stopTimer() { clearInterval(timerId); }
function renderNext() { const beat = beats[nextIndex]; document.querySelector('#nextBeat').textContent = beat.name; document.querySelector('#nextMeta').textContent = beat.meta.replace(' · High energy', '').replace(' · Mid energy', ''); document.querySelector('#transitionNext').textContent = beat.name; }
function setCurrentFromNext() { const beat = beats[nextIndex]; document.querySelector('#beatName').textContent = beat.name; document.querySelector('#beatMeta').textContent = beat.meta; document.querySelector('#beatReason').textContent = beat.reason; document.querySelector('#transitionNow').textContent = beat.name; }

document.querySelectorAll('.pack-button').forEach((button) => button.addEventListener('click', () => { document.body.dataset.pack = button.dataset.pack; document.querySelectorAll('.pack-button').forEach((item) => item.classList.toggle('active', item === button)); }));
document.querySelector('#startButton').addEventListener('click', () => setState('ready'));
document.querySelector('#armButton').addEventListener('click', () => { seconds = Number(document.querySelector('#roundSelect').value.replace('초', '')); timerNode.textContent = `0${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; setState('playing'); });
document.querySelector('#pauseButton').addEventListener('click', (event) => { isPlaying = !isPlaying; event.currentTarget.textContent = isPlaying ? '일시정지' : '재개'; document.querySelector('#playButton').textContent = isPlaying ? 'Ⅱ' : '▶'; statusText.textContent = isPlaying ? 'LIVE · AUDIO OUTPUT OK' : 'PAUSED · HOLDING BEAT'; });
document.querySelector('#playButton').addEventListener('click', () => document.querySelector('#pauseButton').click());
document.querySelector('#endButton').addEventListener('click', () => setState('ended'));
document.querySelector('#rerollButton').addEventListener('click', () => { if (locked) return; nextIndex = (nextIndex + 1) % beats.length; renderNext(); });
document.querySelector('#lockButton').addEventListener('click', (event) => { locked = !locked; event.currentTarget.setAttribute('aria-pressed', locked); event.currentTarget.textContent = locked ? '다음 비트 잠금됨' : '다음 비트 잠금'; });
document.querySelector('#transitionButton').addEventListener('click', () => setState('transition'));
document.querySelector('#confirmTransition').addEventListener('click', () => { setCurrentFromNext(); nextIndex = (nextIndex + 1) % beats.length; renderNext(); seconds = Number(document.querySelector('#roundSelect').value.replace('초', '')); roundNumber.textContent = String(Number(roundNumber.textContent) + 1).padStart(2, '0'); setState('playing'); });
document.querySelector('#cancelTransition').addEventListener('click', () => setState('playing'));
document.querySelector('#nextRoundButton').addEventListener('click', () => { seconds = Number(document.querySelector('#roundSelect').value.replace('초', '')); setState('playing'); });
document.querySelector('#finishButton').addEventListener('click', () => setState('entry'));
document.querySelector('#resetButton').addEventListener('click', () => { seconds = 60; roundNumber.textContent = '01'; isPlaying = true; setState('entry'); });
const dialog = document.querySelector('#helpDialog'); document.querySelector('#helpButton').addEventListener('click', () => dialog.showModal()); document.querySelector('#closeHelp').addEventListener('click', () => dialog.close());
renderNext(); setState('entry');
