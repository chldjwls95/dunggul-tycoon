// 원스토어 웹게임 시작 코드 (원스토어판 빌드에서만 쓰임: npm run build:onestore)
// 토스판은 src/toss-boot.js를 그대로 씀. 이 파일은 그 대신 index.html에 들어감 (vite.config.js 참고)
//
// 순서: 이벤트 등록 → initializeAsync → setLoadingProgress(0~100) → startGameAsync → 게임 스크립트 실행
// 일반 브라우저(원스토어 앱 밖)에서는 SDK가 err로 응답하므로, SDK 없이 게임만 실행함
//
// SDK 버전: 원스토어에서 따로 받은 버전이 없으면 최신 v1.1.0. 바꿀 땐 아래 주소의 v1.1.0 부분만 교체
import { createSDK } from 'https://h5sdk.onestore.net/lib/v1.1.0/onestore-h5-sdk.min.js';

const BASE_KEY = 'ibul-v1';       // public/game.js의 기본 저장 키와 같게
const SCRIPTS = ['game.js'];     // 상대 경로: 하위 경로(GitHub Pages 등)에 올려도 동작
const GAME_RATING = '';           // ← 등급분류 받은 뒤 '전체이용가 · 등급분류번호 CC-XX-XXXXXX' 처럼 채우면 왼쪽 위에 표시돼요

const sdk = createSDK();
let ctx = {};                     // initializeAsync 결과 (playerId, safeArea 등)
let paused = false, silent = false, started = false;

// 게임 스크립트(public/game.js)가 실행된 뒤에만 게임을 부름. 그 전이면 상태만 기억했다가 실행 직후 반영
function game() { return window.DunggulTycoon || null; }
function applyState() {
  const g = game(); if (!g) return;
  try { g.setSilent(silent); } catch {}
  try { g.setPaused(paused); } catch {}
}

/* ---------- 생명주기: 반드시 initializeAsync() 전에 등록 ---------- */
sdk.on('pause', () => {
  // reason: background | ad | payment. 여러 번 와도 결과가 같게 처리
  paused = true; applyState();
});
sdk.on('resume', (e) => {
  paused = false;
  if (e && typeof e.ringerSilent === 'boolean') silent = e.ringerSilent; // 무음 모드가 바뀐 경우에만 옴
  applyState();
});
sdk.on('exit', () => {
  // 저장만. quit()를 다시 부르지 않음. 0.5초 안에 끝나야 해서 동기 저장(localStorage)만 씀
  const g = game(); if (g) { try { g.save(); } catch {} }
});
sdk.onBackPressed(() => {
  // 반드시 동기 함수 (앱이 200ms만 기다림). 게임 안 창을 닫았으면 true, 아니면 false → 앱의 종료 확인창
  const g = game(); if (!g) return false;
  try { return g.back() === true; } catch { return false; }
});

/* ---------- 화면 안전 영역(노치·시스템 바) ---------- */
function applySafeArea(sa) {
  if (!sa) return;
  const r = document.documentElement.style;
  for (const k of ['top', 'bottom', 'left', 'right']) {
    const v = Number(sa[k]); if (isFinite(v) && v > 0) r.setProperty('--sa-' + k, v + 'px');
  }
}

/* ---------- 게임 실행 ---------- */
function loadScripts(list) {
  return list.reduce((p, src) => p.then(() => new Promise((resolve, reject) => {
    const s = document.createElement('script'); s.src = src;
    s.onload = resolve; s.onerror = () => reject(new Error('load failed: ' + src));
    document.body.appendChild(s);
  })), Promise.resolve());
}
function startGame() {
  if (started) return; started = true;
  // 원스토어 사용자별로 기록을 따로 저장 (같은 기기에서 계정을 바꿔도 섞이지 않게)
  if (ctx.playerId) window.__saveKey = BASE_KEY + '-' + ctx.playerId;
  try { if (GAME_RATING) { const r = document.getElementById('ratingBadge'); if (r) { r.textContent = GAME_RATING; r.hidden = false; } } } catch {}
  loadScripts(SCRIPTS).then(applyState).catch((e) => console.error(e));
}
// SDK 없이 실행 (일반 브라우저에서 개발할 때 등). 광고는 원래 토스 연결이 없으면 버튼이 안 보임
function runWithoutSdk(why) {
  console.info('[onestore] SDK 없이 실행:', why);
  startGame();
}

/* ---------- 로딩 진행률: 실제 로딩(글꼴, 게임 스크립트)에 맞춰 보고 ---------- */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function loadAssets() {
  sdk.setLoadingProgress(10);
  try { if (document.fonts && document.fonts.ready) await Promise.race([document.fonts.ready, wait(3000)]); } catch {}
  sdk.setLoadingProgress(50);
  // 게임 스크립트를 미리 받아 두면(브라우저 캐시) 시작 직후 바로 실행됨
  try { await Promise.race([Promise.all(SCRIPTS.map((s) => fetch(s, { cache: 'force-cache' }))), wait(5000)]); } catch {}
  sdk.setLoadingProgress(100);
}

/* ---------- 시작: init → 로딩 → start ---------- */
sdk.initializeAsync()
  .then((info) => {
    if (info.err) { runWithoutSdk(info.err); return; } // 지원 안 되는 환경은 reject가 아니라 err로 옴
    ctx = info;
    applySafeArea(info.safeArea);
    silent = !!info.ringerSilent;
    return loadAssets()
      .then(() => sdk.startGameAsync())
      .then(() => startGame()); // 시작이 성공한 뒤에 게임 실행
  })
  .catch((e) => {
    console.error('[onestore] 시작 실패', e && e.reason, e && e.message);
    runWithoutSdk(e && e.reason);
  });
