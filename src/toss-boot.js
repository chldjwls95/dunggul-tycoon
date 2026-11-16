// 토스 미니앱 시작 코드 (공통)
// 1) 토스 저장소에서 기록 불러오기 → 2) 광고·공유 연결 → 3) 게임 스크립트 실행
import { Storage, loadFullScreenAd, showFullScreenAd, Share } from '@apps-in-toss/web-framework';

const KEY = 'ibul-v1';
const APP = 'dunggul-tycoon';                       // apps-in-toss.config.ts의 appName과 같게
const AD_GROUP_ID = 'ait-ad-test-rewarded-id'; // ← 출시 전 콘솔에서 만든 보상형 광고 그룹 ID로 교체 (테스트 중엔 이 값 유지)
const SCRIPTS = ["/game.js"];
const GAME_RATING = ''; // ← 등급분류 받은 뒤 '전체이용가 · 등급분류번호 CC-XX-XXXXXX' 처럼 채우면 접속 화면 왼쪽 위에 표시돼요

/* ---------- 저장 (5초에 한 번만 토스 저장소에 씀) ---------- */
// 저장 시각은 별도 키(KEY-t)에 기록해서 토스 저장소와 브라우저 저장 중 더 최신 것을 고름
const TKEY = KEY + '-t';
let pending = null, timer = null;
function flush() { timer = null; if (pending == null) return; const v = pending; pending = null; Storage.setItem(KEY, JSON.stringify({ t: Date.now(), v })).catch(() => {}); }
function queueSave(k, v) { if (k !== KEY) return; pending = v; try { localStorage.setItem(TKEY, String(Date.now())); } catch {} if (!timer) timer = setTimeout(flush, 5000); }

/* ---------- 보상형 광고 ---------- */
let adReady = false, adLoading = false, cleanupLoad = null, showing = false;
function preloadAd() {
  try {
    if (adReady || adLoading) return;
    if (!loadFullScreenAd.isSupported || !loadFullScreenAd.isSupported()) return;
    adLoading = true;
    if (cleanupLoad) { try { cleanupLoad(); } catch {} }
    cleanupLoad = loadFullScreenAd({
      options: { adGroupId: AD_GROUP_ID },
      onEvent: (e) => { if (e && e.type === 'loaded') { adReady = true; adLoading = false; } },
      onError: () => { adReady = false; adLoading = false; setTimeout(preloadAd, 15000); },
    });
    setTimeout(() => { if (adLoading) { adLoading = false; } }, 20000); // 로드 응답이 없으면 다시 시도 가능하게
  } catch { adReady = false; adLoading = false; }
}
// 반환: true(보상 지급) / false(사용자가 안 봄·실패) / 'notready'(아직 로드 중: 잠시 후 다시)
function rewarded() {
  return new Promise((resolve) => {
    let done = false; const settle = (v) => { if (done) return; done = true; showing = false; resolve(v); };
    try {
      if (!showFullScreenAd.isSupported || !showFullScreenAd.isSupported()) return settle(true); // 구버전 토스: 광고 없이 보상
      if (showing) return settle('notready');
      if (!adReady) { preloadAd(); return settle('notready'); }
      showing = true; let earned = false;
      showFullScreenAd({
        options: { adGroupId: AD_GROUP_ID },
        onEvent: (e) => {
          const ty = e && e.type;
          if (ty === 'userEarnedReward') earned = true;
          if (ty === 'dismissed' || ty === 'failedToShow') { adReady = false; setTimeout(preloadAd, 500); settle(earned); }
        },
        onError: () => { adReady = false; setTimeout(preloadAd, 500); settle(false); },
      });
      // 안드로이드 일부 버전에서 dismissed가 안 오는 문제 대비: 보상 받았으면 10초 뒤, 아니면 90초 뒤 종료
      setTimeout(() => { if (earned) settle(true); }, 10000);
      setTimeout(() => { adReady = false; setTimeout(preloadAd, 500); settle(earned); }, 90000);
    } catch { settle(false); }
  });
}

/* ---------- 공유 ---------- */
async function share(dataUrl) {
  try {
    if (!Share || !Share.createLink) throw new Error('no share');
    const link = await Share.createLink({ path: 'intoss://' + APP });
    await Share.sendMessage({ message: link });
  } catch {
    // 토스 밖이거나 공유 미지원: 이미지 보기로 대체
    const w = document.createElement('div'); w.style.cssText = 'position:fixed;inset:0;background:#0009;z-index:20;display:flex;align-items:center;justify-content:center;padding:20px';
    const img = document.createElement('img'); img.src = dataUrl; img.style.cssText = 'max-width:100%;max-height:80vh;border-radius:16px;border:3px solid #1f2a52';
    w.appendChild(img); w.addEventListener('click', (e) => { if (e.target === w) w.remove(); }); document.body.appendChild(w);
  }
}

/* ---------- 시작 ---------- */
function loadScripts(list, done) { if (!list.length) return done(); const s = document.createElement('script'); s.src = list[0]; s.onload = () => loadScripts(list.slice(1), done); document.body.appendChild(s); }
async function boot() {
  try {
    const raw = await Storage.getItem(KEY);
    let remoteT = 0, remoteV = null;
    if (raw) { try { const o = JSON.parse(raw); if (o && typeof o === 'object' && 'v' in o) { remoteT = o.t || 0; remoteV = o.v; } else { remoteV = raw; remoteT = 1; } } catch { remoteV = raw; remoteT = 1; } }
    let localT = 0; try { localT = +(localStorage.getItem(TKEY) || 0); } catch {}
    let hasLocal = false; try { hasLocal = !!localStorage.getItem(KEY); } catch {}
    // 토스 저장소가 더 최신이거나(다른 기기), 이 기기에 기록이 없을 때만 덮어씀
    if (remoteV != null && (!hasLocal || remoteT > localT)) { try { localStorage.setItem(KEY, remoteV); localStorage.setItem(TKEY, String(remoteT)); } catch {} }
    window.__tossStore = { set: queueSave };
    window.__tossAd = { rewarded };
    window.__tossShare = share;
    document.addEventListener('visibilitychange', () => { if (document.hidden) flush(); });
    window.addEventListener('pagehide', flush);
    preloadAd();
  } catch (e) {
    // 토스 밖(일반 브라우저): 브라우저 저장만, 광고 없이 보상
  }
  try { if (GAME_RATING) { const r = document.getElementById('ratingBadge'); if (r) { r.textContent = GAME_RATING; r.hidden = false; } } } catch {}
  loadScripts(SCRIPTS, () => {});
}
boot();
