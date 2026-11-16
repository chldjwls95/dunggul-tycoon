
const $=s=>document.querySelector(s);
function hasBatchim(w){ const c=w.charCodeAt(w.length-1)-44032; return c>=0&&c<11172&&c%28!==0; }
const iga=w=>w+(hasBatchim(w)?'이':'가');
const catGa=w=>w+(hasBatchim(w)?'이가':'가');
const ro=w=>{ const c=w.charCodeAt(w.length-1)-44032; const b=c>=0&&c<11172?c%28:0; return w+(b===0||b===8?'로':'으로'); };
// 저장 키: 원스토어판은 시작 코드가 사용자별 키(window.__saveKey)를 넣어 줌. 없으면 기본 키
const KEY=(typeof window.__saveKey==='string'&&window.__saveKey)||'ibul-v1';

const GENS=[
  {id:'pillow',ico:'☁️',name:'베개 하나 더',desc:'푹신함 두 배, 의지는 절반',rate:0.2,cost:15},
  {id:'cable',ico:'🔌',name:'3m 충전 케이블',desc:'이제 폰 때문에 일어날 일 없음',rate:1,cost:100},
  {id:'potty',ico:'🪣',name:'침대 옆 요강',desc:'화장실 신호를 10% 확률로 누워서 해결. 생리현상 30% 천천히',rate:2.5,cost:260},
  {id:'snack',ico:'🍪',name:'과자 산더미',desc:'부스러기는 내일의 내가 치운다',rate:4,cost:500},
  {id:'mat',ico:'🔥',name:'전기장판',desc:'한번 켜면 끝이다',rate:10,cost:2000},
  {id:'water',ico:'🚰',name:'머리맡 정수기',desc:'목마름을 50% 확률로 누워서 해결. 생리현상 30% 천천히',rate:20,cost:6400},
  {id:'tv',ico:'📺',name:'OTT 4개 구독',desc:'다음 화 자동재생은 사랑이다',rate:36,cost:18000},
  {id:'flush',ico:'🚽',name:'침대 옆 수세식 변기',desc:'화장실 해결 확률 40%. 물 내리는 소리가 자장가',rate:65,cost:32000},
  {id:'deliv',ico:'🍕',name:'배달앱 VIP',desc:'현관까지가 하루 최대 이동거리',rate:120,cost:96000},
  {id:'cat',ico:'🐈',name:'고양이 입양',desc:'고양이가 위에 있으면 일어날 수 없다 (법). 1개당 손님이 3% 자주 옴',rate:400,cost:480000},
  {id:'fridge',ico:'🧊',name:'침대 옆 미니 냉장고',desc:'손만 뻗으면 콜라. 목마름 해결 확률 100%',rate:1300,cost:2500000},
  {id:'robot',ico:'🤖',name:'로봇청소기',desc:'청소도 누워서 지휘한다',rate:4500,cost:13500000},
  {id:'bidet',ico:'🛁',name:'비데 달린 침대',desc:'화장실 해결 확률 70%. 따뜻한 물 모드 탑재',rate:8500,cost:36000000},
  {id:'bladder',ico:'💧',name:'방광 단련',desc:'화장실 해결 확률 100%. 생리현상 절반 속도',rate:15000,cost:72000000},
  {id:'remote',ico:'💻',name:'재택근무',desc:'출근도 침대에서. 카메라는 끄고',rate:50000,cost:385000000},
  {id:'wheels',ico:'🛞',name:'침대 바퀴',desc:'침대째로 나가면 그건 외출일까?',rate:180000,cost:2200000000},
  {id:'kingdom',ico:'👑',name:'이불 왕국',desc:'온 세상을 이불로 덮어버렸다',rate:700000,cost:13300000000},
  {id:'galaxy',ico:'🌌',name:'우주 이불',desc:'은하 단위로 눕는다',rate:3000000,cost:90000000000},
];
const UPS=[
  {id:'u1',ico:'👆',name:'손가락 스트레칭',desc:'뒹굴 파워 x2',cost:50,kind:'tap',mult:2},
  {id:'u2',ico:'🌀',name:'360도 뒹굴기',desc:'뒹굴 파워 x2',cost:400,kind:'tap',mult:2},
  {id:'g1',ico:'🌑',name:'암막 커튼',desc:'장비 생산량 x2. 지금 몇 시인지 모름',cost:4000,kind:'gen',mult:2},
  {id:'u3',ico:'🍙',name:'이불 김밥 말기',desc:'뒹굴 때마다 초당 생산량의 3% 추가',cost:15000,kind:'pct',pct:.03},
  {id:'g2',ico:'🎧',name:'백색소음',desc:'장비 생산량 x2',cost:1000000.0,kind:'gen',mult:2},
  {id:'u4',ico:'💪',name:'뒹굴 근육',desc:'뒹굴 파워 x5',cost:1e6,kind:'tap',mult:5},
  {id:'g3',ico:'📅',name:'영원한 일요일',desc:'장비 생산량 x3. 월요일이 사라졌다',cost:300000000.0,kind:'gen',mult:3},
  {id:'u5',ico:'🌯',name:'이불 부리또 장인',desc:'뒹굴 때마다 초당 생산량의 6% 추가',cost:5000000000.0,kind:'pct',pct:.06},
  {id:'g4',ico:'👖',name:'수면바지 정장 인정',desc:'장비 생산량 x3',cost:300000000000.0,kind:'gen',mult:3},
  {id:'g5',ico:'🛌',name:'인류 수평화 법안',desc:'장비 생산량 x5',cost:80000000000000.0,kind:'gen',mult:5},
];
const RANKS=[[0,'이불 입문자'],[100,'아침잠 많은 사람'],[1e3,'주말 전문가'],[1e4,'프로 뒹굴러'],[1e5,'이불 귀족'],[1e6,'침대와 한 몸'],[1e7,'매트리스의 정령'],[1e8,'수평 생활자'],[1e9,'이불 밖을 모르는 자'],[1e10,'이불의 신'],[1e12,'우주 최강 누워있는 자']];
const MOODS_CAT=['고양이가 다리 위에서 자는 중. 움직이면 안 됨','고양이 골골송 듣는 중','고양이한테 이불 절반 뺏김'];
const MOODS=['눈은 떴지만 몸은 아직 자는 중','화장실 가야 하는데 참는 중','5분만... (3시간째)','천장 무늬 세는 중 (482개째)','일어날까 고민만 40분째','폰 배터리 3%, 충전기는 저 멀리','이불 안 온도 완벽. 움직이면 깨짐','배고픈데 냉장고가 너무 멀다','일어나면 지는 거다','발 하나만 이불 밖에 내놓는 중 (위험)','쇼츠 2시간째','오늘 할 일: 눕기. 진행률 100%','누운 채로 물 마시기 도전 중','이불 속에서 계획만 세우는 중'];

const COS={
  blanket:[
    {id:'blue',cat:'blanket',name:'별밤 이불',def:true},
    {id:'berry',cat:'blanket',name:'딸기우유 이불',cond:{t:'own',g:'pillow',n:3},react:'딸기우유 냄새 나는 기분... 더 못 일어나겠다'},
    {id:'flower',cat:'blanket',name:'할머니 꽃이불',cond:{t:'own',g:'mat',n:1},react:'이 꽃무늬... 할머니 집 냄새가 난다'},
    {id:'catb',cat:'blanket',name:'발바닥 이불',cond:{t:'cats',n:5},react:'고양이 발바닥 무늬... 귀여움 과다'},
    {id:'cloud',cat:'blanket',name:'구름 솜이불',cond:{t:'sleeps',n:1},react:'꿈에서 가져온 구름이다. 폭신하다'},
    {id:'rainbow',cat:'blanket',name:'무지개 출석 이불',cond:{t:'attend',n:7},react:'일주일 출석의 증거. 반짝반짝'},
  ],
  pj:[
    {id:'tee',cat:'pj',name:'늘어난 티셔츠',def:true},
    {id:'dino',cat:'pj',name:'공룡 후드',cond:{t:'ach',n:5},react:'크앙. 공룡은 원래 하루 종일 잔다'},
    {id:'cap',cat:'pj',name:'고깔 수면모자',cond:{t:'ev',n:5},react:'모자까지 쓰면 이건 그냥 잠의 정장이지'},
    {id:'bear',cat:'pj',name:'곰돌이 후드',cond:{t:'mis',n:10},react:'곰은 겨울잠을 잔다. 나도 잔다'},
    {id:'frog',cat:'pj',name:'개구리 후드',cond:{t:'cats',n:10},react:'개굴. 고양이들이 신기하게 쳐다본다'},
    {id:'stripe',cat:'pj',name:'줄무늬 수면잠옷',cond:{t:'attend',n:5},react:'클래식한 잠옷. 숙면 각이다'},
  ],
  room:[
    {id:'night',cat:'room',name:'기본 자취방',def:true},
    {id:'wood',cat:'room',name:'우드톤 오두막',cond:{t:'own',g:'cable',n:1},react:'나무 냄새... 캠핑 온 것 같은데 안 나가도 됨'},
    {id:'mint',cat:'room',name:'민트 파스텔룸',cond:{t:'own',g:'tv',n:1},react:'방이 상큼해졌다. 나는 여전히 누워있다'},
    {id:'sky',cat:'room',name:'구름 위 하늘방',cond:{t:'sleeps',n:2},react:'꿈속 하늘에 방을 차렸다'},
    {id:'pink',cat:'room',name:'핑크 파자마룸',cond:{t:'mis',n:20},react:'파자마 파티다. 참석자는 나 혼자'},
    {id:'cafe',cat:'room',name:'고양이 카페',cond:{t:'cats',n:15},react:'고양이 카페 개업. 손님은 고양이'},
  ],
  prop:[
    {id:'p_plant',cat:'prop',name:'창가 화분',cond:{t:'mis',n:5},react:'초록 친구가 생겼다. 물은... 나중에'},
    {id:'p_cush',cat:'prop',name:'하트 쿠션',cond:{t:'cats',n:3},react:'바닥에도 폭신함을'},
    {id:'p_lights',cat:'prop',name:'꼬마전구',cond:{t:'mis',n:15},react:'방이 반짝반짝. 분위기 맛집'},
    {id:'p_catbed',cat:'prop',name:'고양이 방석',cond:{t:'cats',n:8},react:'고양이 전용 침대. 나보다 좋은 듯'},
    {id:'p_poster',cat:'prop',name:'고양이 포스터',cond:{t:'ach',n:10},react:'벽에 고양이를 걸었다'},
    {id:'p_teddy',cat:'prop',name:'곰인형',cond:{t:'attend',n:3},react:'같이 누워있을 친구가 생겼다'},
  ],
};
const COS_ORDER=['berry','wood','dino','cap','p_plant','flower','p_cush','mint','catb','bear','p_lights','cloud','p_catbed','p_poster','sky','pink','frog','cafe','p_teddy','stripe','rainbow'];
const COS_CAT={blanket:'이불',pj:'잠옷',room:'방 테마',prop:'소품'};
const cosAll=()=>[...COS.blanket,...COS.pj,...COS.room,...COS.prop];
const cosById=id=>cosAll().find(x=>x.id===id);
function cosUnlocked(it){ return it.def||!!S.unl[it.id]; }
function cosProg(it){
  const c=it.cond;
  if(c.t==='own'){ const g=GENS.find(x=>x.id===c.g); const cur=Math.min(c.n,S.owned[c.g]||0); return {cur,need:c.n,txt:c.n>1?`${g.name} ${cur}/${c.n}개`:`${g.name} 구매하기`}; }
  if(c.t==='ach'){ const cur=Math.min(c.n,Object.keys(S.ach).length); return {cur,need:c.n,txt:`업적 ${cur}/${c.n}개 달성`}; }
  if(c.t==='ev'){ const cur=Math.min(c.n,S.stats.ev||0); return {cur,need:c.n,txt:`사건 ${cur}/${c.n}번 해결`}; }
  if(c.t==='cats'){ const cur=Math.min(c.n,catCount()); return {cur,need:c.n,txt:`고양이 ${cur}/${c.n}마리 입양`}; }
  if(c.t==='mis'){ const cur=Math.min(c.n,S.stats.missions||0); return {cur,need:c.n,txt:`미션 ${cur}/${c.n}개 완료`}; }
  if(c.t==='attend'){ const cur=Math.min(c.n,S.attendDays||0); return {cur,need:c.n,txt:`출석 ${cur}/${c.n}일`}; }
  if(c.t==='sleeps'){ const cur=Math.min(c.n,S.sleeps||0); return {cur,need:c.n,txt:`꿈 ${c.n}장 보기 (${cur}/${c.n})`}; }
}
function cosCondText(it){ const c=it.cond; if(c.t==='own'){ const g=GENS.find(x=>x.id===c.g); return c.n>1?`${g.name} ${c.n}개`:`${g.name} 구매`; } if(c.t==='ach') return `업적 ${c.n}개`; if(c.t==='ev') return `사건 ${c.n}번 해결`; if(c.t==='cats') return `고양이 ${c.n}마리`; if(c.t==='mis') return `미션 ${c.n}개`; if(c.t==='attend') return `출석 ${c.n}일`; if(c.t==='sleeps') return `꿈 ${c.n}장 보기`; }
const ACH=[
  {id:'t1',name:'첫 뒹굴',desc:'처음으로 뒹굴기',ok:()=>S.taps>=1},
  {id:'t100',name:'손가락 워밍업',desc:'100번 뒹굴기',ok:()=>S.taps>=100},
  {id:'t1000',name:'뒹굴 마스터',desc:'1,000번 뒹굴기',ok:()=>S.taps>=1000},
  {id:'t5000',name:'손목 조심하세요',desc:'5,000번 뒹굴기',ok:()=>S.taps>=5000},
  {id:'r1k',name:'천 뒹굴',desc:'총 1,000 뒹굴 모으기',ok:()=>S.total>=1e3},
  {id:'r1m',name:'백만 뒹굴',desc:'총 100만 뒹굴 모으기',ok:()=>S.total>=1e6},
  {id:'r1b',name:'억 소리 나는 뒹굴',desc:'총 1억 뒹굴 모으기',ok:()=>S.total>=1e8},
  {id:'rate100',name:'자동화의 시작',desc:'초당 100 뒹굴 달성',ok:()=>baseRate()>=100},
  {id:'p10',name:'베개 산',desc:'베개 10개 모으기',ok:()=>(S.owned.pillow||0)>=10},
  {id:'cat',name:'집사 등극',desc:'고양이 입양하기',ok:()=>has('cat')},
  {id:'catpet',name:'냥냥펀치 맞음',desc:'방에 있는 고양이 20번 쓰다듬기',ok:()=>(S.stats.cat||0)>=20},
  {id:'gold',name:'황금 베개 사냥꾼',desc:'날아가는 황금 베개 잡기',ok:()=>(S.stats.gold||0)>=1},
  {id:'gold10',name:'황금 수집가',desc:'황금 베개 10개 잡기',ok:()=>(S.stats.gold||0)>=10},
  {id:'mom5',name:'불효자',desc:'엄마 잔소리 5번 무시하기',ok:()=>(S.stats.mom||0)>=5},
  {id:'ev20',name:'핑계 장인',desc:'사건 20번 해결하기',ok:()=>(S.stats.ev||0)>=20},
  {id:'all',name:'풀옵션 침대',desc:'모든 장비 1개 이상 갖기',ok:()=>GENS.every(g=>has(g.id))},
  {id:'dream1',name:'첫 꿈나라',desc:'처음으로 잠들기 (환생)',ok:()=>(S.dream||0)>0},
  {id:'combo50',name:'광클의 신',desc:'콤보 50 달성',ok:()=>(S.stats.maxCombo||0)>=50},
  {id:'relief5',name:'존엄보다 이불',desc:'생리현상을 누운 채로 5번 해결',ok:()=>(S.stats.relief||0)>=5},
  {id:'deep3',name:'꿀잠 전문가',desc:'꿀잠 모드 3번',ok:()=>(S.stats.deep||0)>=3},
  {id:'bubble20',name:'꿈 방울 수집가',desc:'꿀잠 중 꿈 방울 20개 터뜨리기',ok:()=>(S.stats.bubble||0)>=20},
  {id:'mini3',name:'연기 대상',desc:'엄마한테 안 들키고 3번 성공',ok:()=>(S.stats.miniWin||0)>=3},
  {id:'ending',name:'이불의 진실',desc:'꿈 3장을 모두 보고 엔딩 보기',ok:()=>(S.sleeps||0)>=3},
  {id:'cats5',name:'고양이 친구들',desc:'고양이 5마리 입양',ok:()=>catCount()>=5},
  {id:'cats20',name:'고양이 도감 완성',desc:'고양이 20마리 전부 입양',ok:()=>catCount()>=20},
  {id:'mis30',name:'미션 중독',desc:'미션 30개 완료',ok:()=>(S.stats.missions||0)>=30},
  {id:'cosall',name:'이불 패셔니스타',desc:'꾸미기 전부 모으기',ok:()=>cosAll().every(cosUnlocked)},
  {id:'night',name:'올빼미',desc:'새벽 2~5시에 뒹굴기',ok:()=>!!S.stats.nightTap},
  {id:'morning',name:'일어나긴 했다',desc:'아침 6~9시에 뒹굴기 (누운 채로)',ok:()=>!!S.stats.morningTap},
];
function freshState(){ return {v:7,cats:{},seenCats:{},roomCats:[],props:{},missions:[],attendDays:0,goals:{},sleeps:0,need:0,sleepy:0,cos:{blanket:'blue',pj:'tee',room:'night'},unl:{},newCos:{},life:0,dream:0,rankI:0,mute:false,streak:0,lastDay:'',pts:0,total:0,owned:{},ups:{},taps:0,t:Date.now(),started:Date.now(),ach:{},stats:{},tut:0}; }
const S=freshState();
let buyN=1,boostMult=1,boostEnd=0,lastWall=Date.now();

function fmt(n){
  n=Math.floor(n);
  if(n<10000) return n.toLocaleString('ko-KR');
  const U=[[1e20,'해'],[1e16,'경'],[1e12,'조'],[1e8,'억'],[1e4,'만']];
  for(const [v,u] of U){ if(n>=v){ const x=n/v; return (x>=100?Math.floor(x).toLocaleString('ko-KR'):x.toFixed(x>=10?1:2).replace(/\.?0+$/,''))+u; } }
}
function fmtRate(n){ return n<10 ? (Math.round(n*10)/10).toString() : fmt(n); }
let loadBroken=false;
function load(){
  let raw=null;
  try{ raw=localStorage.getItem(KEY); }catch(e){ return; }
  if(!raw) return;
  try{ const d=JSON.parse(raw); if(d&&typeof d==='object'){ normSave(d); Object.assign(S,d); } else throw 0; }
  catch(e){ loadBroken=true; try{ localStorage.setItem(KEY+'-broken-'+Date.now(),raw); }catch(e2){} }
}
function normSave(d){ if(typeof d.sleeps!=='number'){ d.sleeps=0; if(d.dream>0) d.legacyDream=1; } if(typeof d.attendDays!=='number') d.attendDays=d.lastDay?1:0; return d; }
function fix(){
  S.cats=(S.cats&&typeof S.cats==='object')?S.cats:{}; S.seenCats=(S.seenCats&&typeof S.seenCats==='object')?S.seenCats:{};
  S.roomCats=Array.isArray(S.roomCats)?S.roomCats.filter(id=>S.cats[id]).slice(0,3):[]; S.props=(S.props&&typeof S.props==='object')?S.props:{};
  S.missions=Array.isArray(S.missions)?S.missions:[]; if(typeof S.attendDays!=='number') S.attendDays=S.lastDay?1:0;
  if((S.owned&&S.owned.cat>0)&&!Object.keys(S.cats).length){ ['cheese','mackerel','snow'].slice(0,Math.min(3,S.owned.cat)).forEach(id=>{ S.cats[id]=1; S.seenCats[id]=1; S.roomCats.push(id); }); } if(typeof S.sleeps!=='number'){ S.sleeps=0; if(S.dream>0) S.legacyDream=1; } S.goals=(S.goals&&typeof S.goals==='object')?S.goals:{}; if(typeof S.need!=='number'||!(S.need>=0)) S.need=0; if(typeof S.sleepy!=='number'||!(S.sleepy>=0)) S.sleepy=0; S.need=Math.min(S.need,95); S.sleepy=Math.min(S.sleepy,95);
  S.unl=(S.unl&&typeof S.unl==='object')?S.unl:{}; S.newCos=(S.newCos&&typeof S.newCos==='object')?S.newCos:{};
  S.cos=Object.assign({blanket:'blue',pj:'tee',room:'night'},(S.cos&&typeof S.cos==='object')?S.cos:{});
  for(const cat of ['blanket','pj','room']){ const it=COS[cat].find(x=>x.id===S.cos[cat]); if(!it||!cosUnlocked(it)) S.cos[cat]=COS[cat][0].id; } if(S.tut==null&&S.total>0) S.tut=1; S.ach=S.ach||{}; S.stats=S.stats||{}; if(!S.life||S.life<S.total) S.life=S.total; S.dream=S.dream||0; if(S.rankI==null||S.rankI===0){ let ri=0; RANKS.forEach(([v],i)=>{ if(S.life>=v) ri=i; }); S.rankI=ri; } S.owned=S.owned||{}; S.ups=S.ups||{}; }
let saveFailed=false, saveWarned=false;
function save(){
  S.t=Date.now();
  const json=JSON.stringify(S); let ok=true; try{ localStorage.setItem(KEY,json); }catch(e){ ok=false; }
  try{ if(window.__tossStore) window.__tossStore.set(KEY,json); }catch(e){}
  if(ok!==!saveFailed){ saveFailed=!ok; const w=document.getElementById('saveWarn'); if(w) w.classList.toggle('show',saveFailed); }
  if(!ok&&!saveWarned){ saveWarned=true;
    setTimeout(()=>modal('⚠️','저장이 안 되고 있어요','이 브라우저에서 게임 기록을 저장할 수 없어요. 창을 닫으면 진행이 사라질 수 있으니 [기록 내보내기]로 복사해 두세요.',[['나중에',null,true],['내보내기',()=>openExport()]]),300); }
  return ok;
}
const SAVE_VER=2;
function encodeSave(){ S.t=Date.now(); return btoa(unescape(encodeURIComponent(JSON.stringify({v:SAVE_VER,game:'dunggul',s:S})))); }
function decodeSave(str){
  const o=JSON.parse(decodeURIComponent(escape(atob(str.trim().replace(/\s+/g,'')))));
  if(!o||o.game!=='dunggul'||typeof o.s!=='object') throw new Error('형식');
  const d=o.s;
  if(typeof d.pts!=='number'||typeof d.total!=='number'||typeof d.owned!=='object'||d.owned===null) throw new Error('값');
  return normSave(d);
}
function closeIO(){ $('#ioModal').classList.remove('show'); }
function openExport(){
  $('#ioTitle').textContent='기록 내보내기';
  $('#ioText').textContent='아래 글자를 복사해서 메모장이나 카톡 나에게 보내기에 보관하세요. 다른 기기에서도 불러올 수 있어요.';
  $('#ioArea').value=encodeSave(); $('#ioArea').readOnly=true; $('#ioMsg').textContent='';
  $('#ioAct').textContent='복사하기';
  $('#ioAct').onclick=async()=>{
    try{ await navigator.clipboard.writeText($('#ioArea').value); $('#ioMsg').textContent='복사했어요!'; }
    catch(e){ $('#ioArea').focus(); $('#ioArea').select(); $('#ioMsg').textContent='자동 복사가 안 돼요. 글자를 길게 눌러 직접 복사해 주세요.'; }
  };
  $('#ioModal').classList.add('show');
}
function openImport(){
  $('#ioTitle').textContent='기록 불러오기';
  $('#ioText').textContent='내보내기로 복사해 둔 글자를 붙여넣으세요. 지금 진행은 덮어써져요.';
  $('#ioArea').value=''; $('#ioArea').readOnly=false; $('#ioMsg').textContent='';
  $('#ioAct').textContent='불러오기';
  $('#ioAct').onclick=()=>{
    let d; try{ d=decodeSave($('#ioArea').value); }catch(e){ $('#ioMsg').textContent='올바른 기록이 아니에요. 전체를 빠짐없이 붙여넣었는지 확인해 주세요.'; return; }
    closeIO();
    modal('📥','이 기록으로 덮어쓸까요?',`평생 ${fmt(d.life||d.total)} 뒹굴 · 꿈 조각 ${d.dream||0}개 기록이에요. 지금 진행은 사라져요.`,[
      ['취소',null,true],
      ['덮어쓰기',()=>{ for(const k of Object.keys(S)) delete S[k]; Object.assign(S,freshState(),d); fix(); boostEnd=0; tapBoostEnd=0; gold=null; combo=0; tutEndSilent(); buildCos(); renderGoal(); save(); refresh(); draw(); toast('기록을 불러왔어요'); }]]);
  };
  $('#ioModal').classList.add('show');
}


const has=id=>(S.owned[id]||0)>0, up=id=>!!S.ups[id];
function boostOn(){ return Date.now()<boostEnd; }
let tapBoostMult=1, tapBoostEnd=0; const tapLog=[];
function tapBoostOn(){ return Date.now()<tapBoostEnd; }
function tapIncomeRate(){ const now=Date.now(); while(tapLog.length&&now-tapLog[0][0]>10000) tapLog.shift(); let s=0; for(const x of tapLog) s+=x[1]; return s/10; }
function catCount(){ return S.cats?Object.keys(S.cats).length:0; }
function achMult(){ return (1+0.02*Object.keys(S.ach).length)*(1+0.1*(S.dream||0))*(1+0.02*catCount()); }
function genMult(){ let m=achMult(); for(const u of UPS) if(S.ups[u.id]&&u.kind==='gen') m*=u.mult; return m; }
const MILES=[10, 25, 50];
function mileMult(id){ const o=S.owned[id]||0; let m=1; for(const t of MILES) if(o>=t) m*=2; return m; }
function baseRate(){ let r=0; for(const g of GENS) r+=(S.owned[g.id]||0)*g.rate*mileMult(g.id); return r*genMult(); }
let outUntil=0, outType='', deepUntil=0;
const isOut=()=>Date.now()<outUntil, deepOn=()=>Date.now()<deepUntil;
function rate(){ if(isOut()) return 0; return baseRate()*(boostOn()?boostMult:1)*(deepOn()?2:1); }
function tapPower(){ let m=1,pct=0; for(const u of UPS) if(S.ups[u.id]){ if(u.kind==='tap') m*=u.mult; if(u.kind==='pct') pct+=u.pct; } return (m*achMult()+baseRate()*pct)*(tapBoostOn()?tapBoostMult:1); }
function add(v){ S.pts+=v; S.total+=v; S.life+=v; }
const GROWTH=1.16;
function genCost(g,n){ const o=S.owned[g.id]||0; return Math.ceil(g.cost*Math.pow(GROWTH,o)*(Math.pow(GROWTH,n)-1)/(GROWTH-1)); }

/* ================= PIXEL SCENE ================= */
const cv=$('#cv'), mainCtx=cv.getContext('2d'); let ctx=mainCtx;
function withCtx(c,fn){ const o=ctx; ctx=c; try{ fn(); } finally{ ctx=o; } }
const C={ink:'#1a1c2c',plum:'#5d275d',plum2:'#4a1f4a',red:'#b13e53',orange:'#ef7d57',yellow:'#ffcd75',lime:'#a7f070',green:'#38b764',navy:'#29366f',wall2:'#2f3e7c',night:'#1b2550',blue:'#3b5dc9',blue2:'#3350b0',sky:'#41a6f6',cyan:'#73eff7',white:'#f4f4f4',lgray:'#94b0c2',gray:'#566c86',dgray:'#333c57',brown:'#8b5e3c',pink:'#ff8fb1',lbrown:'#b5835a',dbrown:'#6b4529',skin:'#f6c9a4',hair:'#3b2a24',blush:'#f29c8a'};
function r(x,y,w,h,c){ ctx.fillStyle=c; ctx.fillRect(x,y,w,h); }
function spr(map,x,y,pal){ for(let j=0;j<map.length;j++){ const row=map[j]; for(let i=0;i<row.length;i++){ const c=pal[row[i]]; if(c) r(x+i,y+j,1,1,c); } } }
const HEAD=[
 '..HHHHHH..',
 '.HHHHHHHH.',
 'HHHSSSSHHH',
 'HHSSSSSSHH',
 'HSSSSSSSSH',
 'HSEESSEESH',
 'HSSSSSSSSH',
 '.SBSSSSBS.',
 '..SSSSSS..'];
const HEAD_OPEN=[
 '..HHHHHH..',
 '.HHHHHHHH.',
 'HHHSSSSHHH',
 'HHSSSSSSHH',
 'HSESSSSESH',
 'HSESSSSESH',
 'HSSSSSSSSH',
 '.SBSMMSBS.',
 '..SSSSSS..'];
const HPAL={H:C.hair,S:C.skin,E:C.ink,B:C.blush,M:C.red};
const CROWN=['Y.Y.Y.Y','YYYYYYY','YRYYYRY'];
const WHEEL=['.KKK.','KGGGK','KGWGK','KGGGK','.KKK.'];
const Z=['ZZZZZ','...Z.','..Z..','.Z...','ZZZZZ'];
const STARS=[[5,4],[14,11],[22,3],[33,8],[47,5],[55,13],[3,20],[28,17],[40,26],[52,22],[60,30],[18,30],[8,38],[45,40]];
let particles=[], wiggle=0, blinkT=0;

const CAT=[
 '.O...O......',
 '.OO.OO......',
 'OOOOOOO.....',
 'OEOOOEOOOOO.',
 'OOOPOOOOOOOO',
 '.OOOOOOOOOOT',
 '..OOOOOOOOTT'];
const GOLD=['..W....','.YYYYY.','YYYYYYY','YYYYYYY','.YYYYY.'];
let gold=null, nextGold=Date.now()+45000, rainUntil=0, nextRain=Date.now()+90000;
function sky(){
  const h=new Date().getHours();
  if(h>=6&&h<17) return {k:'day',sky:'#73b8f0',wall:'#34478a',dot:'#3c51a0'};
  if(h>=17&&h<20) return {k:'eve',sky:'#ef7d57',wall:'#3a3570',dot:'#45407e'};
  return {k:'night',sky:'#1b2550',wall:'#29366f',dot:'#2f3e7c'};
}
const ROOMS={
  night:{floor:'#333c57',ftop:'#566c86',line:'#1a1c2c',line2:'#2c334b',rug:['#5d275d','#7a3a6e']},
  wood:{wall:'#c98c5a',dot:'#b97c4c',wain:'#8f563b',wainTop:'#b07040',floor:'#6b4529',ftop:'#9a6a3e',line:'#45291a',line2:'#573722',rug:['#2f6f4f','#46916a']},
  mint:{wall:'#86d1c2',dot:'#aee9dc',floor:'#8a7cc4',ftop:'#a99be0',line:'#6c5fa6',line2:'#7a6cb6',rug:['#ff8fb1','#ffb8cb']},
  sky:{wall:'#9fd4ff',dot:'#ffffff',floor:'#e8f4ff',ftop:'#ffffff',line:'#c8e0f8',line2:'#d6e8fa',rug:['#ffcd75','#fff0c8']},
  pink:{wall:'#f7b6c8',dot:'#ffe0ea',floor:'#d98aa0',ftop:'#f0a8bc',line:'#b86880',line2:'#c87890',rug:['#ffffff','#ffd6e0']},
  cafe:{wall:'#e8d5b0',dot:'#c9ad80',floor:'#8b5e3c',ftop:'#b5835a',line:'#6b4529',line2:'#7a5030',rug:['#ef7d57','#ffcd75'],check:'#a2734d'},
};
const BLK={
  blue:{base:'#3b5dc9',hi:'#41a6f6',sh:'#3350b0',stripes:true,pat:'stars'},
  berry:{base:'#ff9eb5',hi:'#ffd6e0',sh:'#e47d99',stripes:false,pat:'berry'},
  flower:{base:'#c8323c',hi:'#f0c040',sh:'#9a2430',stripes:false,pat:'flower'},
  catb:{base:'#ffcd75',hi:'#fff0c8',sh:'#e0a040',stripes:false,pat:'paw'},
  cloud:{base:'#cfe6ff',hi:'#ffffff',sh:'#a8c8f0',stripes:false,pat:'cloud'},
  rainbow:{base:'#ef7d57',hi:'#ffffff',sh:'#5d275d',stripes:false,pat:'rainbow'},
};
const PJ={
  tee:{shirt:'#94b0c2',collar:'#f4f4f4'},
  dino:{shirt:'#38b764',collar:'#a7f070',hood:'#38b764'},
  cap:{shirt:'#3b5dc9',collar:'#f4f4f4',stripe:'#f4f4f4',cap:true},
  bear:{shirt:'#8b5e3c',collar:'#d9a066',hood:'#8b5e3c',ears:'#8b5e3c'},
  frog:{shirt:'#5ac85a',collar:'#a7f070',hood:'#5ac85a',frog:true},
  stripe:{shirt:'#29366f',collar:'#f4f4f4',stripe:'#f4f4f4',stripe2:true},
};
function drawWall(roomId,sk,f,w,h){
  const R=ROOMS[roomId]||ROOMS.night;
  if(roomId==='night'){ r(0,0,w,h,sk.wall); for(let x=4;x<w;x+=8) for(let y=2;y<h;y+=6) r(x,y,1,1,sk.dot); return; }
  r(0,0,w,h,R.wall);
  if(roomId==='wood'){ for(let x=0;x<w;x+=12) r(x,0,1,h,R.dot); r(0,h-14,w,14,R.wain); r(0,h-14,w,1,R.wainTop); for(let x=6;x<w;x+=12) r(x,h-13,1,13,'#7a4930'); }
  else if(roomId==='sky'){ [[6,5],[30,14],[54,6],[78,16],[16,28],[66,30]].forEach(([x,y])=>{ if(x<w&&y<h){ r(x,y,8,2,R.dot); r(x+2,y-1,4,1,R.dot); } }); }
  else if(roomId==='pink'){ for(let x=4;x<w;x+=10) for(let y=4;y<h;y+=9){ const xx=x+((y/9|0)%2)*5; r(xx,y,1,1,R.dot); r(xx+2,y,1,1,R.dot); r(xx,y+1,3,1,R.dot); r(xx+1,y+2,1,1,R.dot); } }
  else if(roomId==='cafe'){ for(let x=5;x<w;x+=12) for(let y=5;y<h;y+=10){ const xx=x+((y/10|0)%2)*6; r(xx,y+1,2,2,R.dot); r(xx-1,y-1,1,1,R.dot); r(xx+1,y-2,1,1,R.dot); r(xx+3,y-1,1,1,R.dot); } r(0,h-12,w,12,'#a2734d'); r(0,h-12,w,1,'#c9955e'); }
  else { for(let x=3;x<w;x+=8) for(let y=3;y<h;y+=8){ r(x+((y/8|0)%2)*4,y,2,2,R.dot); } }
  if(sk.k==='night'){ ctx.globalAlpha=.32; r(0,0,w,h,'#1a1c2c'); ctx.globalAlpha=1; }
  else if(sk.k==='eve'){ ctx.globalAlpha=.12; r(0,0,w,h,'#ef7d57'); ctx.globalAlpha=1; }
}
function drawFloor(roomId,y0,w,rugX){
  const R=ROOMS[roomId]||ROOMS.night;
  r(0,y0,w,16,R.floor); r(0,y0,w,1,R.ftop);
  for(let x=0;x<w;x+=16){ r(x,y0+4,1,4,R.line); r(x+8,y0+9,1,5,R.line); }
  r(0,y0+8,w,1,R.line2);
  if(R.check){ for(let x=0;x<w;x+=8) for(let y=y0+1;y<y0+16;y+=8){ r(x+((y-y0)/8|0)%2*4,y,4,4,R.check); } }
  if(rugX!=null){ r(rugX,y0+9,30,6,R.rug[0]); r(rugX+1,y0+10,28,4,R.rug[1]); for(let x=rugX+2;x<rugX+28;x+=4) r(x,y0+11,2,2,R.rug[0]); }
}
function drawBlanket(id,bx,by,f){
  const B=BLK[id]||BLK.blue;
  r(bx+5,by-1,30,1,B.base); r(bx+3,by,34,1,B.base); r(bx+1,by+1,44,1,B.base);
  r(bx,by+2,47,11,B.base); r(bx+5,by-1,30,1,B.hi);
  r(bx,by+12,47,1,B.sh); r(bx,by+2,3,11,B.hi); r(bx+3,by+2,1,11,B.sh);
  if(B.stripes) for(let x=bx+8;x<bx+46;x+=8) r(x,by+3,1,9,B.sh);
  if(B.pat==='stars') [[10,5],[22,9],[33,4],[41,8],[16,1]].forEach(([x,y],i)=>r(bx+x,by+y,1,1,(f+i)%8<6?'#ffcd75':'#f4f4f4'));
  else if(B.pat==='berry'){
    [[8,4],[19,8],[29,3],[39,7],[14,1],[34,10]].forEach(([x,y])=>{ r(bx+x,by+y,2,2,'#d43a4f'); r(bx+x,by+y-1,2,1,'#38b764'); });
    [[12,7],[24,4],[36,3],[44,9],[6,9]].forEach(([x,y])=>r(bx+x,by+y,1,1,'#f4f4f4'));
  } else if(B.pat==='paw'){
    [[7,4],[19,8],[30,3],[40,7],[13,9],[25,1]].forEach(([x,y])=>{ r(bx+x,by+y+1,2,2,'#8b5e3c'); r(bx+x-1,by+y,1,1,'#8b5e3c'); r(bx+x+1,by+y-1,1,1,'#8b5e3c'); r(bx+x+3,by+y,1,1,'#8b5e3c'); });
  } else if(B.pat==='cloud'){
    [[6,4],[20,8],[32,3],[40,9]].forEach(([x,y])=>{ r(bx+x,by+y,6,2,'#ffffff'); r(bx+x+1,by+y-1,3,1,'#ffffff'); });
  } else if(B.pat==='rainbow'){
    const cols=['#ef7d57','#ffcd75','#a7f070','#41a6f6','#73eff7','#b48cf2']; for(let i=0;i<6;i++) r(bx+4,by+2+i*2-(i===0?1:0),43,2,cols[i]);
    r(bx+5,by-1,30,1,'#ef7d57'); r(bx+3,by,34,1,'#ef7d57'); r(bx+1,by+1,44,1,'#ef7d57'); [[10,5],[30,9],[40,3]].forEach(([x,y],i)=>r(bx+x,by+y,1,1,'#ffffff'));
  } else if(B.pat==='flower'){
    [[7,4],[19,8],[30,3],[40,7],[13,9],[25,1]].forEach(([x,y],i)=>{ const pc=i%2?'#ffb3c9':'#f4f4f4';
      r(bx+x+1,by+y,1,1,pc); r(bx+x,by+y+1,1,1,pc); r(bx+x+2,by+y+1,1,1,pc); r(bx+x+1,by+y+2,1,1,pc); r(bx+x+1,by+y+1,1,1,'#ffcd75'); r(bx+x+3,by+y+2,1,1,'#38b764'); });
  }
}
function drawSleeper(pjId,dx,dy,awake){
  const P=PJ[pjId]||PJ.tee;
  r(14+dx,33+dy,12,4,P.shirt); r(18+dx,33+dy,4,1,P.collar);
  if(P.stripe) r(14+dx,35+dy,12,1,P.stripe);
  if(P.stripe2) r(14+dx,33+dy,12,1,P.stripe);
  const pal=Object.assign({},HPAL); if(P.hood) pal.H=P.hood;
  spr(awake?HEAD_OPEN:HEAD,15+dx,25+dy,pal);
  if(P.hood&&!P.ears&&!P.frog){ r(16+dx,24+dy,2,1,'#a7f070'); r(19+dx,23+dy,2,2,'#a7f070'); r(22+dx,24+dy,2,1,'#a7f070'); }
  if(P.ears){ r(15+dx,23+dy,3,3,P.ears); r(22+dx,23+dy,3,3,P.ears); r(16+dx,24+dy,1,1,'#f29c8a'); r(23+dx,24+dy,1,1,'#f29c8a'); }
  if(P.frog){ r(15+dx,22+dy,4,3,'#ffffff'); r(21+dx,22+dy,4,3,'#ffffff'); r(16+dx,23+dy,2,2,'#1a1c2c'); r(22+dx,23+dy,2,2,'#1a1c2c'); }
  if(P.cap){ const red='#b13e53',wh='#f4f4f4';
    r(15+dx,24+dy,10,1,red); r(16+dx,23+dy,9,1,wh); r(18+dx,22+dy,7,1,red); r(20+dx,21+dy,5,1,wh); r(22+dx,20+dy,4,1,red); r(24+dx,19+dy,3,1,red); r(26+dx,17+dy,3,3,wh); }
}
function drawProp(id,x,y,f){
  if(id==='p_plant'){ r(x,y+4,5,3,'#b5835a'); r(x,y+4,5,1,'#d9a066'); r(x+2,y,1,4,'#38b764'); r(x,y+1,2,1,'#38b764'); r(x+3,y+2,2,1,'#38b764'); r(x+1,y-1,1,1,'#a7f070'); r(x+3,y,1,1,'#a7f070'); }
  else if(id==='p_cush'){ r(x,y,2,2,'#ff8fb1'); r(x+3,y,2,2,'#ff8fb1'); r(x,y+1,5,2,'#ff8fb1'); r(x+1,y+3,3,1,'#ff8fb1'); r(x+2,y+4,1,1,'#ff8fb1'); r(x+1,y,1,1,'#ffd6e0'); }
  else if(id==='p_lights'){ const cols=['#ff8fb1','#ffcd75','#a7f070','#73eff7']; for(let i=0;i<12;i++){ const xx=x+i*4, yy=y+Math.round(Math.sin(i/11*Math.PI)*2); r(xx,yy,4,1,'#566c86'); r(xx+1,yy+1,2,2,(i+(f>>1))%4<3?cols[i%4]:'#333c57'); } }
  else if(id==='p_catbed'){ r(x,y+1,14,4,'#b13e53'); r(x+1,y,12,1,'#b13e53'); r(x+2,y+1,10,2,'#ef7d57'); r(x,y+5,14,1,'#7a2a3a'); }
  else if(id==='p_poster'){ r(x,y,8,11,'#f4f4f4'); r(x+1,y+1,6,9,'#ffcd75'); r(x+2,y+4,4,4,'#ef7d57'); r(x+2,y+3,1,1,'#ef7d57'); r(x+5,y+3,1,1,'#ef7d57'); r(x+3,y+5,1,1,'#1a1c2c'); r(x+5,y+5,1,1,'#1a1c2c'); }
  else if(id==='p_teddy'){ r(x+1,y+3,6,5,'#b5835a'); r(x+2,y,4,4,'#b5835a'); r(x+1,y,1,1,'#b5835a'); r(x+6,y,1,1,'#b5835a'); r(x+3,y+1,1,1,'#1a1c2c'); r(x+5,y+1,1,1,'#1a1c2c'); r(x+3,y+2,2,1,'#8b5e3c'); r(x+3,y+5,2,2,'#d9a066'); }
}
function cosPreview(it){
  const c=document.createElement('canvas'); c.width=36; c.height=20;
  withCtx(c.getContext('2d'),()=>{
    const sk={k:'day',wall:'#29366f',dot:'#2f3e7c'};
    if(it.cat==='room'){ drawWall(it.id,{k:'day',wall:'#29366f',dot:'#2f3e7c'},0,36,13); drawFloor(it.id,13,36,null); r(24,2,9,7,'#b5835a'); r(25,3,7,5,'#73b8f0'); r(28,3,1,5,'#b5835a'); r(3,9,8,6,'#8b5e3c'); r(4,10,6,2,'#f4f4f4'); }
    else if(it.cat==='blanket'){ r(0,0,36,20,'#1a1c2c'); drawBlanket(it.id,-6,5,0); }
    else if(it.cat==='prop'){ r(0,0,36,20,'#29366f'); const o={p_plant:[15,7],p_cush:[15,8],p_lights:[-6,4],p_catbed:[11,9],p_poster:[14,4],p_teddy:[14,6]}[it.id]||[14,6]; drawProp(it.id,o[0],o[1],0); }
    else { r(0,0,36,20,'#29366f'); r(6,14,24,6,'#f4f4f4'); drawSleeper(it.id,3,-17,false); }
  });
  return c;
}

let react=null; const REACT_MS=2800;
function reactOn(id){ return react&&react.id===id&&Date.now()-react.t0<REACT_MS; }
function reactK(){ return react?Math.min(1,(Date.now()-react.t0)/REACT_MS):1; }
function drawScene(t){
  const f=Math.floor(t/120), now=Date.now();
  const galaxy=has('galaxy'), sk=sky();
  // wall
  if(galaxy) r(0,0,96,48,C.ink); else drawWall(S.cos.room,sk,f,96,48);
  if(galaxy){
    for(const [x,y] of STARS){ const tw=(f+x)%7; r(x,y,1,1,tw<2?C.cyan:C.white); }
    for(const [x,y] of STARS){ r(95-x,47-y,1,1,(f+y)%5<2?C.yellow:C.lgray); }
    r(30,6,6,6,C.plum); r(31,5,4,8,C.plum); r(29,7,8,4,C.plum); r(32,7,2,1,C.red); r(26,9,14,1,C.orange);
  }
  // floor + rug
  drawFloor(S.cos.room,48,96,40);
  // window
  const wx=66,wy=7, wsky=galaxy?C.ink:sk.sky;
  r(wx-1,wy-1,22,18,C.lbrown); r(wx,wy,20,16,wsky);
  if(sk.k==='night'||galaxy){ r(wx+13,wy+3,4,4,C.yellow); r(wx+15,wy+3,2,2,wsky);
    [[3,4],[7,11],[16,12],[4,9]].forEach(([x,y],i)=>r(wx+x,wy+y,1,1,(f+i)%6<3?C.white:C.lgray)); }
  else if(sk.k==='day'){ r(wx+12,wy+2,5,5,C.yellow); r(wx+11,wy+3,7,3,C.yellow); r(wx+13,wy+1,3,7,C.yellow);
    const cx=(Math.floor(t/400)%30)-6; r(wx+cx,wy+9,6,2,C.white); r(wx+cx+1,wy+8,3,1,C.white); }
  else { r(wx+4,wy+10,6,4,C.yellow); r(wx+3,wy+11,8,3,C.yellow); r(wx,wy+13,20,3,C.plum); }
  if(now<rainUntil){ for(let i=0;i<10;i++){ const x=(i*7+f*2)%20, y=(i*5+f*3)%16; r(wx+x,wy+y,1,2,C.cyan); } }
  r(wx+9,wy,1,16,C.lbrown); r(wx,wy+7,20,1,C.lbrown);
  r(wx-5,wy-3,30,1,C.gray);
  if(up('g1')){ r(wx-3,wy-2,26,20,C.plum); for(let x=wx-1;x<wx+23;x+=4) r(x,wy-2,1,20,C.plum2); }
  else { r(wx-4,wy-2,4,21,C.plum); r(wx-3,wy-2,1,21,C.plum2); r(wx+20,wy-2,4,21,C.plum); r(wx+22,wy-2,1,21,C.plum2); }
  if(!guest&&tutStep<0&&nextGuest-now<15000&&nextGuest>now){ const sw=Math.floor(t/300)%4, tc='#ef9a6a', dx=sw<2?0:1;
    r(82+dx,21,2,2,tc); r(83+dx,18,2,3,tc); r(84+dx,16,2,2,tc); r(85+dx*2,15,1,1,tc);
    if(nextGuest-now<7000){ const ey=21-(Math.floor(t/400)%2); r(72,ey,2,2,tc); r(76,ey,2,2,tc); r(72,ey+1,6,1,tc); } }
  knocks=knocks.filter(k=>now-k.t<4000); for(const k of knocks){ ctx.globalAlpha=Math.max(0,1-(now-k.t)/4000)*.8; r(k.x,k.y+1,2,2,C.white); r(k.x-1,k.y-1,1,1,C.white); r(k.x+1,k.y-2,1,1,C.white); r(k.x+3,k.y-1,1,1,C.white); ctx.globalAlpha=1; }
  if(guest){ const gd=catDef(guest.id); drawCat(gd,70,15,f); r(81,8,5,6,C.white); r(82,7,3,1,C.white); r(83,9,1,2,'#b13e53'); r(83,12,1,1,'#b13e53'); }
  if(S.props.p_poster) drawProp('p_poster',0,19,f);
  if(S.props.p_lights) drawProp('p_lights',14,0,f);
  if(mini){ const st=mini.state, sh=st==='warn'?(f%2):0;
    r(0,12,11,36,'#6b4529'); r(1,13,9,34,'#8b5e3c'); r(2,15,7,12,'#a2734d'); r(2,30,7,14,'#a2734d');
    if(st==='look'){ r(1,13,6,34,'#1a1c2c'); r(1,16,6,3,'#3b2a24'); r(0,15,8,2,'#3b2a24'); r(1,19,6,6,'#f6c9a4'); r(2,21,2,1,'#1a1c2c'); r(5,21,2,1,'#1a1c2c'); r(2,20,2,1,'#3b2a24'); r(5,20,2,1,'#3b2a24'); r(3,23,3,1,'#b13e53'); r(1,25,6,6,'#b13e53'); r(7,13,3,34,'#a2734d'); }
    else { r(8,28+sh,2,2,'#ffcd75'); }
    if(mini.caught===false&&st==='warn'&&f%2){ r(12,24,1,1,C.white); r(14,23,1,1,C.white); r(16,24,1,1,C.white); } }
  // wall clock
  if(!mini){r(2,6,9,9,C.white); r(3,5,7,1,C.white); r(3,15,7,1,C.white); r(1,7,1,7,C.white); r(11,7,1,7,C.white);
  r(6,8,1,3,C.ink); const hm=Math.floor(now/1000)%4; r(6+(hm===1?1:hm===3?-1:0),10+(hm===2?1:hm===0?-1:0),1,1,C.red); r(6,10,1,1,C.ink); }
  // calendar
  if(up('g3')){ r(17,4,10,11,C.white); r(17,4,10,3,C.red); r(19,3,1,2,C.gray); r(24,3,1,2,C.gray);
    for(let j=0;j<2;j++) for(let i=0;i<3;i++) r(18+i*3,8+j*3,2,2,C.red); }
  // TV
  if(has('tv')){ r(42,8,17,12,C.ink); r(43,9,15,10,C.dgray);
    const sc=[C.sky,C.lime,C.orange,C.cyan][Math.floor(t/900)%4]; r(44,10,13,8,sc);
    r(45,12,4,4,C.white); r(51,11,4,2,C.ink); r(50,15,6,1,C.ink); r(49,20,3,2,C.ink); }
  if(S.props.p_plant) drawProp('p_plant',67,17,f);
  if(S.props.p_cush) drawProp('p_cush',42,57,f);
  if(S.props.p_catbed) drawProp('p_catbed',54,56,f);
  // outlet + cable
  if(has('cable')){ r(2,38,5,6,C.white); r(3,40,1,2,C.ink); r(5,40,1,2,C.ink); r(4,44,1,9,C.ink); r(4,52,10,1,C.ink); }
  // snacks on floor
  if(has('snack')){ r(18,53,6,7,C.yellow); r(18,53,6,1,C.orange); r(19,55,4,2,C.red); r(25,58,3,2,C.lbrown); r(28,59,2,1,C.lbrown); r(16,59,2,1,C.lbrown); }
  // water bottle under bed
  if(has('bidet')||has('flush')){ r(50,47,4,6,C.white); r(50,47,4,1,C.lgray); r(43,52,10,5,C.white); r(42,51,12,2,C.lgray); r(44,56,8,1,C.lgray); r(51,49,1,1,C.gray);
    if(has('bidet')){ r(52,53,2,2,C.sky); r(52,53,1,1,f%6<3?C.lime:C.green); if(f%8<2) r(47,50,1,1,C.cyan); } }
  else if(has('potty')){ r(45,51,8,6,C.white); r(44,50,10,2,C.lgray); r(47,49,4,1,C.lgray); r(45,56,8,1,C.lgray); r(48,53,2,2,C.sky); }
  if(has('bladder')){ r(34,49,4,8,C.sky); r(34,49,4,1,C.cyan); r(35,47,2,2,C.white); r(35,52,2,3,C.cyan); }
  if(!has('wheels')){ r(11,46,3,7,C.dbrown); r(69,46,3,7,C.dbrown); }
  // headboard & footboard
  r(8,19,6,34,C.brown); r(9,21,4,12,C.lbrown); r(8,19,6,1,C.lbrown); r(13,19,1,34,C.dbrown);
  r(72,31,5,22,C.brown); r(72,31,5,1,C.lbrown); r(76,31,1,22,C.dbrown);
  if(has('wheels')){ const wf=f%2; spr(WHEEL,9,50,{K:C.ink,G:C.gray,W:wf?C.white:C.lgray}); spr(WHEEL,72,50,{K:C.ink,G:C.gray,W:wf?C.lgray:C.white}); }
  // mattress
  r(14,38,58,8,C.white); r(14,44,58,2,C.lgray); r(14,46,58,1,C.gray);
  if(has('mat')){ r(14,42,58,2,C.orange); for(let i=0;i<6;i++) if((f+i)%3===0) r(18+i*9,42,2,1,C.yellow); }
  // pillows
  if(has('pillow')){ r(12,30,15,5,C.lgray); r(13,29,13,1,C.lgray); }
  r(12,33,16,6,C.white); r(13,32,14,1,C.white); r(12,38,16,1,C.lgray);
  // head
  const awake=wiggle>0||evOn, out=isOut();
  const sinkDy=(reactOn('pillow')||reactOn('mat'))?1:0;
  const chew=reactOn('snack')?(f%2===0):awake;
  if(!out) drawSleeper(S.cos.pj,0,sinkDy,chew);
  if(!out&&reactOn('tv')){ ctx.globalAlpha=.28; r(15,25,10,9,f%2?C.cyan:C.sky); ctx.globalAlpha=1; }
  else { r(17,33,8,2,C.lgray); }
  if(!out&&up('g2')){ r(14,24,12,1,C.gray); r(14,24,1,3,C.gray); r(25,24,1,3,C.gray); r(13,27,2,4,C.red); r(25,27,2,4,C.red); }
  if(!out&&has('kingdom')) spr(CROWN,16,21,{Y:C.yellow,R:C.red});
  // blanket
  const wg=wiggle>0?(wiggle%2?1:-1):0, br=Math.floor(t/700)%2;
  const bx=25+wg, by=31+(out?2:br);
  drawBlanket(S.cos.blanket,bx,by,f);
  if(S.props.p_teddy) drawProp('p_teddy',70,24,f);
  if(mini&&mini.state==='look'){ r(25,26,1,2,C.sky); r(26,28,1,1,C.sky); }
  // phone, laptop
  r(27,29,3,5,C.ink); r(28,30,1,3,unread?(f%8<4?C.yellow:C.white):(has('cable')?(f%10<5?C.cyan:C.sky):C.dgray));
  if(has('remote')){ r(45,24,11,8,C.gray); r(46,25,9,6,f%8<4?C.cyan:C.sky); r(47,26,4,1,C.white); r(47,28,6,1,C.white); r(43,32,15,2,C.lgray); }
  // cat on blanket
  catSpots(by).forEach((c,i)=>{ const j=catJump>0&&catJumpI===i; let cy=c.y+(j?-2:0), cx=c.x;
    if(i===0&&reactOn('cat')){ const k=reactK(); const kk=Math.min(1,k*2); cx=Math.round(84-25*kk); cy=Math.round((c.y)+(1-kk)*20-Math.sin(kk*Math.PI)*12); }
    c={...c,x:cx}; drawCat(c.d,cx,cy,f);
    if(j){ r(c.x-2,cy-4,2,2,C.pink); r(c.x-3,cy-3,4,1,C.pink); }
    else if((f+i*9)%30<12){ r(c.x+11,cy-3,1,1,C.white); r(c.x+12,cy-4,1,1,C.white); } });
  // fridge
  if(has('fridge')){ r(80,33,13,19,C.white); r(80,33,13,1,C.lgray); r(80,41,13,1,C.lgray); r(80,51,13,1,C.lgray); r(91,35,1,4,C.gray); r(91,44,1,5,C.gray); r(82,35,3,2,C.red);
    if(reactOn('fridge')){ r(81,34,11,7,'#cfe8ff'); r(83,36,2,4,C.red); r(86,36,2,4,C.lime); r(89,37,2,3,C.orange); r(76,33,4,8,C.white); } }
  // delivery
  if(has('deliv')){ r(77,53,11,7,C.orange); r(77,53,11,1,C.yellow); r(81,55,3,3,C.red); r(77,59,11,1,C.red); }
  // robot vacuum
  if(has('robot')){ const per=(t/(reactOn('robot')?20:60))%160, rx=Math.round(per<80?4+per:84-(per-80)); r(rx,59,8,3,C.gray); r(rx+1,58,6,1,C.lgray); r(rx+3,59,2,1,f%4<2?C.lime:C.green); r(rx,62,8,1,C.ink); }
  // Zz / ! balloon
  if(evOn){ r(23,11,9,9,C.white); r(24,10,7,1,C.white); r(24,20,7,1,C.white); r(25,21,2,2,C.white); r(27,12,2,5,C.red); r(27,18,2,1,C.red); }
  else if(!awake){ const p=f%20; if(p<14) spr(Z,27+Math.floor(p/2),20-p,{Z:C.lgray}); const q=(f+10)%20; if(q<14) spr(Z,30+Math.floor(q/2),18-q,{Z:'#7c8ba3'}); }
  // golden pillow
  if(gold){ const k=(now-gold.t0)/gold.dur; if(k>=1) gold=null; else { gold.x=-8+k*104; gold.y=8+Math.sin(k*12)*5;
      spr(GOLD,Math.round(gold.x),Math.round(gold.y),{Y:C.yellow,W:C.white});
      if(f%3===0) particles.push({x:gold.x+3,y:gold.y+5,vx:-.3,vy:.2,life:8,c:f%2?C.yellow:C.white}); } }
  const sl=S.sleeps||0;
  if(sl>=1&&!galaxy){ [[33,4],[38,9],[58,3],[30,12],[52,8]].forEach(([x,y],i)=>{ const c=(f+i)%10<7?'#d9ffb0':'#a7f070'; r(x,y,1,1,c); r(x-1,y,1,1,c); r(x+1,y,1,1,c); r(x,y-1,1,1,c); r(x,y+1,1,1,c); }); }
  if(sl>=2){ r(62,2,1,6,C.lgray); r(60,8,5,5,C.lbrown); r(61,9,3,3,sk.k==='day'&&!galaxy?'#73b8f0':C.night); r(61,13,1,4,C.white); r(63,13,1,3,C.pink); r(62,13,1,5,C.cyan); }
  if(sl>=3){ const gl=f%20<14; r(88,52,6,6,gl?C.yellow:'#e0b050'); r(89,51,4,1,gl?C.yellow:'#e0b050'); r(89,58,4,2,C.lbrown); if(gl){ ctx.globalAlpha=.15; r(82,44,18,18,C.yellow); ctx.globalAlpha=1; } }
  if(has('water')){ r(0,44,7,14,C.white); r(0,44,7,1,C.lgray); r(1,38,5,6,C.sky); r(2,39,1,4,C.cyan); r(1,37,5,1,C.blue); r(2,49,3,2,C.red); r(5,49,1,2,C.sky); r(0,57,7,1,C.gray); }
  if(deepOn()){ ctx.globalAlpha=.18; r(0,0,96,64,'#5d3fa0'); ctx.globalAlpha=1;
    // thought cloud
    r(27,24,2,2,C.white); r(30,20,3,3,C.white);
    r(34,6,18,12,C.white); r(33,8,20,8,C.white); r(36,5,14,1,C.white); r(36,18,14,1,C.white);
    const dm=Math.floor(now/2500)%4;
    if(dm===0){ r(39,9,7,5,C.white); r(39,9,7,5,'#e6e6e6'); r(38,10,1,3,'#e6e6e6'); r(46,10,2,3,C.ink); r(40,14,1,2,C.ink); r(44,14,1,2,C.ink); }
    else if(dm===1){ r(39,9,6,5,C.orange); r(44,8,3,3,C.orange); r(38,13,2,2,C.yellow); r(45,13,2,2,C.lbrown); }
    else if(dm===2){ r(38,11,10,4,C.sky); r(40,9,5,3,C.sky); r(44,10,3,2,C.cyan); }
    else { r(41,8,2,8,C.yellow); r(38,11,8,2,C.yellow); r(39,9,6,6,C.yellow); r(41,11,2,2,C.white); }
    for(const bb of dreamBubbles){ const k=(now-bb.born)/bb.life; const x=Math.round(bb.x+Math.sin((now-bb.born)/400+bb.ph)*3), y=Math.round(bb.y0-k*26);
      bb.cx=x+3; bb.cy=y+3;
      spr(['..WWW..','.W...W.','W.....W','W.....W','W.....W','.W...W.','..WWW..'],x,y,{W:'#e8d8ff'});
      const ic={star:C.yellow,sheep:C.white,chicken:C.orange,gold:'#ffe066'}[bb.type]; r(x+2,y+2,3,3,ic); if(bb.type==='gold'&&f%2) r(x+3,y+1,1,1,C.white); }
  }
  if(out){ const k=f%6; r(26,22-(k<3?0:1),1,4,C.white); r(28,21-(k<3?1:0),1,4,C.white); }
  // first-purchase reactions
  if(react&&Date.now()-react.t0<REACT_MS){ const k=reactK(), id=react.id;
    if(id==='pillow'){ for(let i=0;i<3;i++){ const y=Math.round(24-k*14-i*3), x=17+i*4; r(x,y,1,1,C.pink); r(x+2,y,1,1,C.pink); r(x,y+1,3,1,C.pink); r(x+1,y+2,1,1,C.pink); } }
    else if(id==='cable'){ r(23,26,3,6,C.ink); r(24,27,1,4,f%2?C.cyan:C.white); if(f%4<2){ r(28,22,1,3,C.yellow); r(29,22,2,1,C.yellow); } }
    else if(id==='mat'){ for(let i=0;i<5;i++){ const x=33+i*8, y=29-((f+i*2)%5); r(x,y,1,1,C.orange); r(x+1,y-1,1,1,C.yellow); } }
    else if(id==='water'){ const x=Math.round(4+k*16), y=Math.round(38-Math.sin(k*Math.PI)*14+k*-6); if(k<.9){ r(x,y,2,2,C.cyan); r(x,y-1,1,1,C.white); } }
    else if(id==='snack'){ if(f%3===0) particles.push({x:22,y:31,vx:(Math.random()-.5),vy:-.6,life:10,c:C.lbrown}); }
    else if(id==='robot'){ const ax=27, ay=31; r(ax,ay,5,1,C.yellow); r(ax+4,ay-1,1,3,C.yellow); r(ax+5,ay,1,1,C.yellow); }
    else if(id==='cat'&&k<.6){ r(23,11,9,9,C.white); r(24,10,7,1,C.white); r(24,20,7,1,C.white); r(27,12,2,5,C.red); r(27,18,2,1,C.red); }
    else if(id==='deliv'){ ctx.globalAlpha=.6; r(76,52-Math.round(Math.abs(Math.sin(k*Math.PI*3))*3),12,1,C.yellow); ctx.globalAlpha=1; }
    else if(id==='remote'&&f%2) r(47,30,6,1,C.white);
    else if(id==='wheels'){ /* shake handled by wiggle */ }
  }
  // particles
  particles=particles.filter(p=>p.life>0);
  for(const p of particles){ p.x+=p.vx; p.y+=p.vy; p.vy+=0.08; p.life--; r(Math.round(p.x),Math.round(p.y),1,1,p.c); }
  if(f!==drawScene.lf){ if(wiggle>0) wiggle--; if(catJump>0) catJump--; }
  drawScene.lf=f;
}
const CAT_CD=12000; let catReadyAt=0;
let catJump=0, catJumpI=0, combo=0, lastTap=0;
const CAT_DEFS=[
  {id:'cheese',name:'치즈',rar:'c',O:'#ef7d57',T:'#c9603f',v:'tabby',desc:'이불 위가 제일 좋은 터줏대감',line:'치즈가 이불 위 명당을 차지했다'},
  {id:'mackerel',name:'고등어',rar:'c',O:'#94b0c2',T:'#566c86',v:'tabby',desc:'창가에서 졸기 장인',line:'고등어는 바로 창가로 가서 잠들었다'},
  {id:'tux',name:'턱시도',rar:'c',O:'#333c57',T:'#1a1c2c',E:'#ffcd75',v:'tux',desc:'정장 입고 늘어지는 신사',line:'턱시도가 정중하게 누웠다'},
  {id:'calico',name:'삼색이',rar:'c',O:'#f4f4f4',T:'#333c57',v:'calico',desc:'기분파. 쓰다듬는 건 3번까지',line:'삼색이가 기분 좋게 꼬리를 흔든다'},
  {id:'snow',name:'흰둥이',rar:'c',O:'#f4f4f4',T:'#c2c3c7',v:'plain',desc:'하얀 이불과 구분이 안 됨',line:'흰둥이가 베개에 섞여버렸다'},
  {id:'coal',name:'까망이',rar:'c',O:'#1a1c2c',T:'#000000',E:'#ffcd75',v:'plain',desc:'밤이 되면 눈만 보인다',line:'까망이가 어둠 속에서 눈을 반짝인다'},
  {id:'cream',name:'크림',rar:'c',O:'#ffd9a8',T:'#e8b880',v:'plain',desc:'말랑말랑 크림빵 같은 아이',line:'크림이 말랑하게 녹아내린다'},
  {id:'cow',name:'젖소',rar:'c',O:'#f4f4f4',T:'#1a1c2c',v:'cow',desc:'우유는 안 나옴. 애교는 나옴',line:'젖소가 음메... 아니 야옹'},
  {id:'siam',name:'샴',rar:'u',O:'#f0e2c8',T:'#5b3a29',v:'point',desc:'따뜻한 곳만 찾아다님',line:'샴이 전기장판 위로 직행했다',hint:'전기장판이 있으면 와요',cond:()=>has('mat')},
  {id:'blue',name:'러시안블루',rar:'u',O:'#7a8ca6',T:'#5b6b82',E:'#a7f070',v:'plain',desc:'수줍음 많은 밤의 손님',line:'러시안블루가 조용히 발끝에 자리 잡았다',hint:'밤(22시~6시)에만 와요',cond:()=>isNight()},
  {id:'munch',name:'먼치킨',rar:'u',O:'#d9a066',T:'#b07a40',v:'tabby',desc:'다리가 짧아서 침대 오르기 3트',line:'먼치킨이 세 번 만에 침대에 올라왔다',hint:'과자 산더미가 있으면 와요',cond:()=>has('snack')},
  {id:'forest',name:'노르웨이숲',rar:'u',O:'#8b5e3c',T:'#5d3a1a',v:'fluffy',desc:'털이 이불만큼 두꺼움',line:'노르웨이숲 털에 파묻혔다',hint:'비 오는 날에만 와요',cond:()=>Date.now()<rainUntil},
  {id:'sphynx',name:'스핑크스',rar:'u',O:'#f2b8b0',T:'#d99088',v:'hairless',desc:'털이 없어서 이불이 꼭 필요함',line:'스핑크스가 이불 속으로 쏙 들어왔다',hint:'정수기가 있으면 와요',cond:()=>has('water')},
  {id:'chonk',name:'뚱냥이',rar:'u',O:'#ef9a3c',T:'#c9702c',v:'fat',desc:'배달 음식 냄새 추적 전문가',line:'뚱냥이가 올라오자 침대가 출렁',hint:'배달앱 VIP가 있으면 와요',cond:()=>has('deliv')},
  {id:'galaxy',name:'우주냥',rar:'r',O:'#3b2a6b',T:'#1f1640',E:'#73eff7',v:'galaxy',desc:'꿈속 우주에서 따라온 아이',line:'우주냥 털에서 별이 떨어진다',hint:'꿈 1장을 본 뒤에 와요',cond:()=>(S.sleeps||0)>=1},
  {id:'cloudcat',name:'구름냥',rar:'r',O:'#e8f4ff',T:'#a8c8f0',v:'cloud',desc:'만지면 사르르 녹을 것 같음',line:'구름냥이 둥실 떠서 내려앉았다',hint:'꿈 2장을 본 뒤에 와요',cond:()=>(S.sleeps||0)>=2},
  {id:'sheepcat',name:'양냥이',rar:'r',O:'#f4f4f4',T:'#d0d0d0',v:'sheep',desc:'세다 보면 잠이 옴',line:'양냥이 한 마리... 스르르',hint:'꿈 2장을 본 뒤에 와요',cond:()=>(S.sleeps||0)>=2},
  {id:'goldcat',name:'황금냥',rar:'r',O:'#ffcd75',T:'#e0a030',v:'gold',desc:'황금 베개 냄새를 맡고 옴',line:'황금냥이 번쩍번쩍 빛난다',hint:'황금 베개를 10번 잡으면 와요',cond:()=>(S.stats.gold||0)>=10},
  {id:'blanketcat',name:'이불냥',rar:'l',O:'#3b5dc9',T:'#3350b0',v:'blanket',desc:'이불의 진실을 아는 전설의 고양이',line:'이불냥: "너도 결국 이불이구나"',hint:'엔딩을 본 사람에게만 와요',cond:()=>(S.sleeps||0)>=3},
  {id:'dreamcat',name:'꿈냥',rar:'l',O:'#c9a8ff',T:'#9b7ae0',v:'dream',desc:'꿀잠 속에서만 만날 수 있음',line:'꿈냥이 꿈 밖으로 나와버렸다',hint:'꿀잠 중에만 나타나요',cond:()=>deepOn()},
];
const RAR={c:{w:10,lab:'흔함',sec:60},u:{w:5,lab:'가끔',sec:180},r:{w:2.5,lab:'희귀',sec:420},l:{w:1.2,lab:'전설',sec:900}};
const catDef=id=>CAT_DEFS.find(c=>c.id===id);
function drawCat(d,x,y,f){
  ctx.globalAlpha=d.v==='dream'?.8:1;
  spr(CAT,x,y,{O:d.O,E:d.E||'#1a1c2c',P:'#f29c8a',T:d.T});
  const T=d.T, W='#f4f4f4';
  if(d.v==='tabby'){ r(x+6,y+3,1,3,T); r(x+8,y+3,1,3,T); r(x+2,y+2,1,1,T); r(x+4,y+2,1,1,T); }
  else if(d.v==='tux'){ r(x+1,y+4,3,3,W); r(x+3,y+3,1,1,W); }
  else if(d.v==='calico'){ r(x+6,y+2,3,2,'#ef7d57'); r(x+8,y+4,3,2,T); r(x+1,y+1,1,1,'#ef7d57'); }
  else if(d.v==='cow'){ r(x+2,y+2,2,2,T); r(x+7,y+3,2,2,T); r(x+9,y+5,1,1,T); }
  else if(d.v==='point'){ r(x+1,y,1,2,T); r(x+5,y,1,2,T); r(x+2,y+3,3,2,T); r(x+11,y+5,1,2,T); r(x+10,y+6,1,1,T); r(x+1,y+3,1,1,d.E||'#41a6f6'); r(x+5,y+3,1,1,'#41a6f6'); }
  else if(d.v==='fluffy'){ r(x-1,y+3,1,3,d.O); r(x+3,y+7,7,1,T); r(x+11,y+3,1,2,d.O); }
  else if(d.v==='hairless'){ r(x+6,y+3,3,1,T); r(x+7,y+5,3,1,T); }
  else if(d.v==='fat'){ r(x+2,y+7,8,1,d.O); r(x+11,y+3,1,3,d.O); }
  else if(d.v==='galaxy'){ [[3,2],[7,4],[9,3],[5,5],[10,6]].forEach(([a,b],i)=>r(x+a,y+b,1,1,(f+i)%4<2?'#ffcd75':'#ffffff')); }
  else if(d.v==='cloud'){ r(x+2,y+1,3,1,'#ffffff'); r(x+6,y+1,4,1,'#ffffff'); r(x+8,y,2,1,'#ffffff'); }
  else if(d.v==='sheep'){ for(let i=1;i<11;i+=2) r(x+i,y+1+(i%4===1?0:1),2,1,'#ffffff'); r(x+1,y+3,1,1,'#333c57'); r(x+5,y+3,1,1,'#333c57'); }
  else if(d.v==='gold'){ if(f%3===0) r(x+3+(f%6),y+1,1,1,'#ffffff'); }
  else if(d.v==='blanket'){ r(x+3,y+2,8,1,'#41a6f6'); r(x+6,y+4,1,1,'#ffcd75'); r(x+9,y+5,1,1,'#ffcd75'); }
  else if(d.v==='dream'){ if(f%4<2){ r(x+2,y-2,1,1,'#ffffff'); r(x+9,y-1,1,1,'#ffffff'); } }
  ctx.globalAlpha=1;
}
function catPreview(d,silhouette){
  const c=document.createElement('canvas'); c.width=16; c.height=10;
  withCtx(c.getContext('2d'),()=>{ r(0,0,16,10,'#1a1c2c'); if(silhouette){ spr(CAT,2,2,{O:'#333c57',E:'#333c57',P:'#333c57',T:'#333c57'}); } else drawCat(d,2,2,0); });
  return c;
}
let guest=null, nextGuest=Date.now()+90000;
function guestInterval(){ const red=Math.min(.5,0.03*(S.owned.cat||0)); return (200000+Math.random()*100000)*(1-red); }
let knocks=[], lastKnock=0;
function knockWindow(x,y,e){
  if(Date.now()-lastKnock<1200) return; lastKnock=Date.now();
  knocks.push({x:Math.round(x),y:Math.round(y),t:Date.now()}); if(knocks.length>6) knocks.shift();
  nextGuest=Math.max(Date.now()+3000,nextGuest-12000); sfx('tap'); floatAt(e,'똑똑');
  const left=Math.max(0,Math.ceil((nextGuest-Date.now())/1000));
  if(left<=20) sayText('창밖에서 냥 소리가 들린다...?',2200,true);
}
function spawnGuest(){
  const pool=CAT_DEFS.filter(d=>!d.cond||d.cond()); if(!pool.length) return;
  let tot=0; const ws=pool.map(d=>{ const w=RAR[d.rar].w*(S.cats[d.id]?.5:2); tot+=w; return w; });
  let k=Math.random()*tot, pick=pool[0]; for(let i=0;i<pool.length;i++){ k-=ws[i]; if(k<=0){ pick=pool[i]; break; } }
  guest={id:pick.id,t0:Date.now(),until:Date.now()+(pick.id==='dreamcat'?Math.max(20000,deepUntil-Date.now()):75000)};
  sfx('cat'); toast(S.cats[pick.id]?`🐱 ${catGa(pick.name)} 창밖에 놀러 왔어요! 창문을 눌러봐요`:`🐱 창밖에 처음 보는 고양이 손님이! 창문을 눌러봐요`);
}
function openGuest(){
  if(!guest) return; const d=catDef(guest.id); S.stats.guestMet=(S.stats.guestMet||0)+1;
  if(S.cats[d.id]){ const v=Math.max(20,worth(30)); add(v); sfx('cat'); burst(76,15,C.pink,10); toast(`🐱 ${catGa(d.name)} 선물을 두고 갔어요 +${fmt(v)}`); guest=null; nextGuest=Date.now()+guestInterval(); draw(); return; }
  S.seenCats[d.id]=1; const cost=Math.max(50,Math.ceil(worth(RAR[d.rar].sec)));
  const g0=guest;
  modal('🐱',`${RAR[d.rar].lab} 손님 · ${d.name}`,`${d.desc}\n간식을 주면 우리 집 고양이가 돼요. (고양이 1마리당 생산 +2%)`,[
    ['다음에',null,true],
    [S.pts>=cost?`간식 주기 (${fmt(cost)})`:`뒹굴 부족 (${fmt(cost)})`,()=>{
      if(guest!==g0||!guest){ toast('손님이 이미 떠났어요'); return; }
      if(S.pts<cost){ toast(`간식값이 ${fmt(cost-S.pts)} 부족해요. 손님은 조금 더 기다려줘요`); return; }
      S.pts-=cost; S.cats[d.id]=1; S.stats.guestFed=(S.stats.guestFed||0)+1; if(S.roomCats.length<3) S.roomCats.push(d.id);
      guest=null; nextGuest=Date.now()+guestInterval(); sfx('first'); burst(60,30,C.pink,20);
      toast(`🎉 ${d.name} 입양! 도감 ${catCount()}/${CAT_DEFS.length}`); sayText(d.line,3200); catJump=6; catJumpI=Math.max(0,S.roomCats.indexOf(d.id));
      buildCats(); checkAch(); checkCos(); save(); }]]);
}
function updateGuest(){
  const now=Date.now();
  if(guest&&now>guest.until){ guest=null; nextGuest=now+guestInterval(); }
  if(!guest&&!mini&&tutStep<0&&now>nextGuest&&!document.hidden){ spawnGuest(); knocks=[]; }
  if(!guest&&tutStep<0&&nextGuest-now<15000&&nextGuest-now>14000) sayText('창밖에서 바스락... 뭔가 온다',2400,true);
  $('#dotK').classList.toggle('show',!!guest&&curTab!=='cat');
}
function buildCats(){
  const g=$('#catGrid'); if(!g) return; g.innerHTML='';
  $('#catHead').innerHTML=`모은 고양이 <b>${catCount()}/${CAT_DEFS.length}</b> · 생산 <b>+${catCount()*2}%</b><br>창밖에 손님이 오면 창문을 눌러 간식을 줘요. 입양한 고양이를 누르면 방에 둘 수 있어요 (최대 3마리).`;
  for(const d of CAT_DEFS){
    const own=!!S.cats[d.id], seen=own||!!S.seenCats[d.id], inRoom=S.roomCats.includes(d.id);
    const b=document.createElement('button'); b.className='catc'+(inRoom?' room':'')+(seen?'':' unseen');
    b.innerHTML=`<span class="rb ${d.rar}">${RAR[d.rar].lab}</span>`; b.appendChild(catPreview(d,!seen));
    const st=own?(inRoom?'✔ 방에 있어요':'눌러서 방에 두기'):seen?'간식이 필요해요':(d.hint||'창밖을 지켜봐요');
    b.insertAdjacentHTML('beforeend',`<div class="cn">${seen?d.name:'???'}</div><div class="cs">${own?d.desc+'<br>':''}${st}</div>`);
    b.addEventListener('click',()=>{ if(!own){ toast(seen?`${d.name}: 창밖에 다시 오면 간식을 줘요`:`??? : ${d.hint||'언젠가 창밖에 찾아와요'}`); return; }
      if(inRoom) S.roomCats=S.roomCats.filter(x=>x!==d.id); else { if(S.roomCats.length>=3){ toast('방에는 3마리까지! 다른 고양이를 먼저 빼주세요'); return; } S.roomCats.push(d.id); sayText(d.line,2400); }
      sfx('cat'); buildCats(); save(); });
    g.appendChild(b);
  }
}
function catSpots(by){ const sp=[{x:59,y:by-6},{x:56,y:51},{x:31,y:by-6}]; return S.roomCats.slice(0,3).map((id,i)=>({...sp[i],d:catDef(id)})).filter(c=>c.d); }
setInterval(()=>{ if(Date.now()-lastTap>700){ combo=0; $('#combo').classList.remove('show','hot'); } },200);

/* ================= pixel icons ================= */
function pixIcon(emoji){
  try{
    const c=document.createElement('canvas'); c.width=c.height=14;
    const x=c.getContext('2d'); x.font='12px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
    x.textAlign='center'; x.textBaseline='middle'; x.fillText(emoji,7,8);
    const d=x.getImageData(0,0,14,14); let any=false;
    for(let i=3;i<d.data.length;i+=4){ if(d.data[i]>100){ d.data[i]=255; any=true; } else d.data[i]=0; }
    if(!any) return null;
    x.putImageData(d,0,0); return c;
  }catch(e){ return null; }
}
const ICONS={"pillow":["............","............","..wwwwwwww..",".wwwwwwwwww.","wwwwwwwwwwww","wwwwgwwwwwww","wwwwwgwwwwww","wwwwwwwwwwww","gwwwwwwwwwwg",".gggggggggg.","............","............"],"cable":["...G...G....","...G...G....","..wwwwwww...","..wwwwwww...","..gwwwwwg...","...ggggg....",".....g......",".....g......","......g.....",".......g....","..yy....g...","..yyggggg..."],"potty":[".....GG.....","...GGGGGG...","..wwwwwwww..","..ssssssss..",".wwwwwwwwww.",".wwwwwwwwww.",".wwwwwwwwww.",".ssssssssss.","..wwwwwwww..","..gwwwwwwg..","...gggggg...","............"],"snack":["............",".....LL.....","....LLDL....","...LDLLLL...","..LLLLLDLL..","..LDLLLLLL..",".LLLLLDLLLL.",".LDLLLLLLDL.","LLLLDLLLLLLL","LLLLLLLDLLLL","BBBBBBBBBBBB","............"],"mat":["..o...o...o.",".o...o...o..","..o...o...o.","............","rrrrrrrrrrrr","roooooooooor","royyyyyyyyor","roooooooooor","royyyyyyyyor","rrrrrrrrrrrr",".d..........",".ddGG......."],"water":["....cccc....","...cssssc...","...cssssc...","...cssssc...","...cccccc...","..wwwwwwww..","..wwrwwbww..","..wwwwwwww..","..wwG..Gww..","..wwwwwwww..","..wwwwwwww..","..gggggggg.."],"tv":["...d....d...","....d..d....",".....dd.....","GGGGGGGGGGGG","GssssssssssG","GssssswssssG","GssssswwsssG","GssssswwwssG","GssssswwsssG","GssssswssssG","GGGGGGGGGGGG","....GGGG...."],"flush":["wwww........","wwsw........","wwww........","wwww........","wwwwwwwwwww.","gwwwwwwwwwg.",".gwwwwwwwg..","..gwwwwwg...","...wwwww....","...wwwww....","..wwwwwww...","..ggggggg..."],"deliv":["LLLLLLLLLLLL","LLLLLLLLLLLL",".yyryyyyryy.",".yyyyyyyyyy.","..yyyryyyy..","..yyyyyyry..","...yyyyyy...","...yryyyy...","....yyyy....","....yyyy....",".....yy.....",".....yy....."],"cat":["............",".o........o.",".oo......oo.",".opoooooopo.",".oooooooooo.","oookooookooo","oookooookooo","oooooppooooo","wooooooooow.",".oooooooooo.","..oooooooo..","............"],"fridge":["............","..gggggggg..","..wwwwwwwg..","..wwwwwGwg..","..wwwwwGwg..","..gggggggg..","..wwwwwwwg..","..wwwwwGwg..","..wwwwwGwg..","..wwwwwwwg..","..gggggggg..","...G....G..."],"robot":["............","............","....gggg....","..gggggggg..",".ggGGGGGGgg.","gggGGcGGGggg","gggGGGGGGggg",".gggggggggg.",".GGGGGGGGGG.","..GGGGGGGG..","............","............"],"bidet":["..s......s..",".s.s....s.s.","..s......s..","............","LL..........","LLwwwbbbbbb.","LLwwwbbbbbbL","LLbbbbbbbbbL","LLLLLLLLLLLL","LD........DL","............","............"],"bladder":[".....s......",".....s...y..","....sss.yyy.","....sss..y..","...sssss....","..sscssss...","..scsssss...","..scsssss...","..sssssss...","...sssss....","....sss.....","............"],"remote":["............","............",".GGGGGGGGGG.",".GssssssssG.",".GswwwwsssG.",".GssssssssG.",".GswwwwwwsG.",".GssssssssG.",".GGGGGGGGGG.","gggggggggggg",".gggggggggg.","............"],"wheels":["....GGGG....","..GGGGGGGG..",".GGGddddGGG.",".GGdggggdGG.","GGdggwwggdGG","GGdgwddwgdGG","GGdgwddwgdGG","GGdggwwggdGG",".GGdggggdGG.",".GGGddddGGG.","..GGGGGGGG..","....GGGG...."],"kingdom":["............","............",".y...yy...y.",".yy..yy..yy.",".yyy.yy.yyy.",".yyyyyyyyyy.",".yryyssyyry.",".yyyyyyyyyy.",".oooooooooo.","............","............","............"],"galaxy":["y...........",".....PPPP...","...PPpppPP..","..PpPPPPpPP.",".PpPPwwPPpP.",".PpPwyywPpP.",".PpPwyywPpP.",".PPpPwwPPpP.","..PPpPPPpP..","...PPpppP...","....PPPP...y","..y........."],"u1":[".....KK.....",".....KK.....",".....KK.....",".....KK.....",".....KKKK...","...KKKKKKK..","..KKKKKKKKK.","..KKKKKKKKK.","..KKKKKKKK..","...KKKKKKK..","....KKKKK...","....bbbbb..."],"u2":["....cccc....","..cc....c...",".c.....ccc..",".c......c...","c...........","c..........c","c..........c","c..........c",".c........c.",".c........c.","..cc....cc..","....cccc...."],"g1":["GGGGGGGGGGGG","PPPNNNNNNPPP","PqPNNNNNNPqP","PqPNNyNNNPqP","PqPNNNNNNPqP","PqPPNNNNPPqP","PqPPNNNNPPqP","PqPPPNNPPPqP","PqPPPNNPPPqP","PqPPPPPPPPqP","PqPPPPPPPPqP","PPPPPPPPPPPP"],"u3":["....dddd....","..dddddddd..",".ddwwwwwwdd.",".dwwwwwwwwd.","ddwwyynnwwdd","ddwwyynnwwdd","ddwwooppwwdd","ddwwooppwwdd",".dwwwwwwwwd.",".ddwwwwwwdd.","..dddddddd..","....dddd...."],"g2":["............","...GGGGGG...","..G......G..",".G........G.",".G........G.",".G........G.","rrr......rrr","rrrr....rrrr","rrrr....rrrr","rrrr....rrrr","rrr......rrr","............"],"u4":["............","............","............","GG........GG","GGG......GGG","GGGggggggGGG","GGGggggggGGG","GGG......GGG","GG........GG","............","............","............"],"g3":["..G......G..",".rGrrrrrrGr.",".rrrrrrrrrr.",".wwwwwwwwww.",".wrrwrrwrrw.",".wwwwwwwwww.",".wrrwrrwrrw.",".wwwwwwwwww.",".wrrwrrwrrw.",".wwwwwwwwww.",".gggggggggg.","............"],"u5":["............","............","............","..LLLLLLLLL.",".HLyyLyyLyyL","HKKLLLLLLLLL","HKKLyyLyyLyL",".KLLLLLLLLL.","..LLLLLLLLL.","............","............","............"],"g4":["............",".wwwwwwwwww.",".bbbbbbbbbb.",".bbwbbbbwbb.",".bbbbbbbbbb.",".bbbb..bbbb.",".bwbb..bbwb.",".bbbb..bbbb.",".bbbb..bbbb.",".bbwb..bwbb.",".bbbb..bbbb.",".ssss..ssss."],"g5":["............","............","L..........L","L..........L","LwwHHbbbbbbL","LwwKKbbbbbbL","LbbbbbbbbbbL","LLLLLLLLLLLL","LD........DL","............","............","............"]};
const ICON_PAL={"w":"#f4f4f4","g":"#94b0c2","G":"#566c86","d":"#333c57","r":"#b13e53","o":"#ef7d57","y":"#ffcd75","n":"#38b764","b":"#3b5dc9","s":"#41a6f6","c":"#73eff7","N":"#1b2550","p":"#ff8fb1","P":"#5d275d","q":"#4a1f4a","B":"#8b5e3c","L":"#b5835a","D":"#6b4529","K":"#f6c9a4","H":"#6b4529","k":"#1a1c2c"};
function drawIcon(id){
  const m=ICONS[id]; if(!m) return null;
  const c=document.createElement('canvas'); c.width=c.height=14; const x=c.getContext('2d');
  m.forEach((row,j)=>{ for(let i=0;i<12;i++){ const col=ICON_PAL[row[i]]; if(col){ x.fillStyle=col; x.fillRect(i+1,j+1,1,1); } } });
  return c;
}
function setIcon(el,emoji,id){
  const key=id&&emoji!=='?'?id:emoji;
  if(el.dataset.e===key) return; el.dataset.e=key; el.innerHTML='';
  const c=emoji==='?'?null:(drawIcon(id)||pixIcon(emoji));
  if(c) el.appendChild(c); else el.textContent=emoji;
}

/* ================= UI ================= */
function buildList(){
  const ub=$('#ups');
  UPS.forEach(u=>{
    const b=document.createElement('button'); b.className='item up';
    b.innerHTML=`<div class="ico"></div><div class="meta"><div class="name">${u.name}</div><div class="desc">${u.desc}</div></div><div class="right"><div class="cost">${fmt(u.cost)}</div></div>`;
    setIcon(b.querySelector('.ico'),u.ico,u.id);
    b.addEventListener('click',()=>buyUp(u)); ub.appendChild(b); u.el=b;
  });
  $('#ups').style.cssText='display:flex;flex-direction:column';
  const ab=$('#achs');
  ACH.forEach(a=>{ const d=document.createElement('div'); d.className='ach'; d.innerHTML=`<div class="badge">?</div><div><div class="an">${a.name}</div><div class="ad">${a.desc}</div></div>`; ab.appendChild(d); a.el=d; });
  const gb=$('#gens');
  GENS.forEach(g=>{
    const b=document.createElement('button'); b.className='item';
    b.innerHTML=`<div class="ico"></div><div class="meta"><div class="name"></div><div class="desc"></div><div class="prod"></div><div class="mile"></div></div><div class="right"><div class="owned"></div><div class="cost"></div></div>`;
    b.addEventListener('click',()=>buyGen(g)); gb.appendChild(b);
    g.el=b; g.q={mile:b.querySelector('.mile'),ico:b.querySelector('.ico'),name:b.querySelector('.name'),desc:b.querySelector('.desc'),prod:b.querySelector('.prod'),owned:b.querySelector('.owned'),cost:b.querySelector('.cost')};
  });
}
function refresh(){
  let anyUp=false;
  let upAfford=false;
  UPS.forEach(u=>{ const got=!!S.ups[u.id]; const show=got||S.total>=u.cost*0.3; u.el.style.display=show?'':'none'; if(show) anyUp=true;
    u.el.classList.toggle('done',got); u.el.disabled=got||S.pts<u.cost; u.el.querySelector('.cost').textContent=got?'보유':fmt(u.cost);
    if(!got&&S.pts>=u.cost) upAfford=true; u.el.style.order=got?1:0; });
  $('#upsEmpty').style.display=anyUp?'none':'';
  $('#dotU').classList.toggle('show',upAfford&&curTab!=='ups');
  const nAch=Object.keys(S.ach).length; $('#achCnt').textContent=`달성 ${nAch}/${ACH.length}`;
  $('#achBonus').textContent=`1개당 +2% · 현재 +${nAch*2}%`;
  ACH.forEach(a=>{ const got=!!S.ach[a.id]; a.el.classList.toggle('got',got); a.el.querySelector('.badge').textContent=got?'★':'?'; });
  let teaser=false, genAfford=false; const gm=genMult();
  GENS.forEach((g,i)=>{
    const o=S.owned[g.id]||0, q=g.q;
    const unlocked=i===0||o>0||S.total>=g.cost*0.4;
    if(unlocked){
      g.el.style.display='';
      setIcon(q.ico,g.ico,g.id); q.name.textContent=g.name; q.desc.textContent=g.desc;
      const mm=mileMult(g.id), per=g.rate*gm*mm; q.prod.textContent=o>0?`+${fmtRate(per)}/초씩 · 지금 합계 +${fmtRate(per*o)}/초`:`1개당 +${fmtRate(per)}/초`;
      const nm=MILES.find(t=>o<t); q.mile.textContent=nm?`🎯 ${nm}개 모으면 이 장비 생산 x2 (${o}/${nm})`+(mm>1?` · 현재 x${mm}`:''):`🏆 마일스톤 완료 · 이 장비 x${mm}`;
      q.owned.textContent=o||''; const c=genCost(g,buyN); q.cost.textContent=(buyN>1?'10개 ':'')+fmt(c); g.el.disabled=S.pts<c; if(S.pts>=c) genAfford=true;
    } else if(!teaser){
      teaser=true; g.el.style.display='';
      setIcon(q.ico,'?'); q.name.textContent='???'; q.desc.textContent='뒹굴을 더 모으면 정체가 밝혀진다'; q.prod.textContent='';
      q.owned.textContent=''; q.mile.textContent=''; q.cost.textContent=fmt(g.cost); g.el.disabled=true;
    } else g.el.style.display='none';
  });
  const nx=GENS.find(g=>!has(g.id)); $('#nextHint').textContent=nx?(S.pts>=nx.cost?`새 장비 「${nx.name}」 살 수 있어요!`:`새 장비까지 ${fmt(nx.cost-S.pts)}`):'모든 장비 보유!';
  $('#dotG').classList.toggle('show',genAfford&&curTab!=='gens');
  let ri=0; RANKS.forEach(([v],i)=>{ if(S.life>=v) ri=i; }); $('#rank').textContent=RANKS[ri][1];
  if(ri>S.rankI){ S.rankI=ri; sfx('rank'); notify('💼 누워링크드인',`새 직함 「${RANKS[ri][1]}」 추가됨. 일촌 0명이 축하합니다`); sayText(['승급했다. 누운 채로.','칭호가 늘었다. 몸무게는 그대로','이불 커리어 순항 중','더 높이 올라간다 (누운 채로)'][ri%4],2500,true); burst(48,8,C.yellow,14); }
  $('#dShards').textContent=S.dream; $('#dMult').textContent=`현재 꿈 보너스: 모든 생산량 +${S.dream*10}% · 잠든 횟수 ${S.sleeps||0}번`+(S.legacyDream?' (이전 버전 기록이라 그 전 횟수는 알 수 없어요. 꿈 이야기는 1장부터 볼 수 있게 했어요)':'');
  renderDream();
  const mins=Math.floor((Date.now()-S.started)/60000);
  $('#stats').textContent=`평생 ${fmt(S.life)} 뒹굴 · ${fmt(S.taps)}번 뒹굴 · 누운 지 ${mins>=60?Math.floor(mins/60)+'시간 '+(mins%60)+'분':mins+'분'}`;
  $('#tapHint').style.display=(S.taps>15||tutStep>=0)?'none':'';
  updateChip();
}
function draw(){
  $('#pts').textContent=fmt(S.pts);
  let h=`${fmtRate(rate())}/초`;
  if(boostOn()) h+=`<span class="boost">전체 x${boostMult} · ${Math.ceil((boostEnd-Date.now())/1000)}초</span>`;
  if(deepOn()) h+=`<span class="zz">꿀잠 x2 · ${Math.ceil((deepUntil-Date.now())/1000)}초</span>`;
  if(isOut()) h=`<span class="boost">자리 비움 · 생산 멈춤</span>`;
  if(tapBoostOn()) h+=`<span class="tb">뒹굴 x${tapBoostMult} · ${Math.ceil((tapBoostEnd-Date.now())/1000)}초</span>`;
  $('#rate').innerHTML=h;
}
const GEN_REACT={flush:['변기를 침대 옆에 놨다. 물 내리는 소리가 자장가',48,52],bidet:['비데 달린 침대 도착. 인류의 정점',48,52],potty:['요강을 들였다. 존엄보다 이불이 중요해',47,52],water:['물 마시러 일어날 일이 사라졌다',3,48],pillow:['푹신함 두 배... 일어날 의지는 절반',20,32],cable:['콘센트가 드디어 내 편이 됐다',4,40],snack:['과자 산이 생겼다. 등산은 안 함',22,55],mat:['등이 따뜻해... 이제 끝났다',40,42],tv:['다음 화 버튼이 내 인생의 유일한 버튼',50,13],deliv:['현관까지 3걸음. 오늘의 운동 끝',82,55],cat:['고양이가 올라왔다. 이제 법적으로 못 일어남',65,26],fridge:['손만 뻗으면 콜라. 문명의 승리',86,40],robot:['청소는 너에게 맡긴다, 동료여',30,60],bladder:['화장실... 나중에 가도 되는 몸이 됐다',36,52],remote:['출근 완료. 누운 채로',50,28],wheels:['침대에 바퀴를 달았다. 이게 외출이지',12,52],kingdom:['이불 왕국의 왕이 되었다',20,22],galaxy:['우주까지 덮었다. 더 덮을 데가 없다',48,10]};
const UP_REACT={u1:'손가락이 말랑해졌다',u2:'이제 360도로 구른다',g1:'낮인지 밤인지 몰라도 되는 방 완성',u3:'이불 김밥 말기 장인 등극',g2:'세상 소리가 사라졌다... 좋아',u4:'뒹굴 근육이 붙었다 (누워서)',g3:'달력이 전부 빨간 날이 됐다',u5:'부리또처럼 말려버렸다',g4:'수면바지로 어디든 갈 수 있다 (안 감)',g5:'인류가 드디어 수평이 됐다'};
function buyGen(g){
  const c=genCost(g,buyN); if(S.pts<c) return;
  const first=!has(g.id); S.pts-=c; S.owned[g.id]=(S.owned[g.id]||0)+buyN;
  sfx('buy');
  const prevO=S.owned[g.id]-buyN; const hit=MILES.filter(t=>prevO<t&&S.owned[g.id]>=t);
  if(hit.length){ setTimeout(()=>{ sfx('ach'); notify('📈 뒹굴뱅크',`${g.name} ${hit[hit.length-1]}개 돌파! 이 장비 생산 x${mileMult(g.id)}. 이자는 없어요`); burst(48,30,C.cyan,20); },250); }
  const rc=GEN_REACT[g.id];
  if(rc){ burst(rc[1],rc[2],C.yellow,first?16:6); }
  if(g.id==='cat'&&!S.cats.cheese&&!catCount()){ S.cats.cheese=1; S.seenCats.cheese=1; S.roomCats.push('cheese'); }
  S.stats.buys=(S.stats.buys||0)+buyN;
  if(first){ react={id:g.id,t0:Date.now()}; if(g.id==='wheels') wiggle=12; setTimeout(()=>sfx('first'),120); }
  if(first&&rc){ sayText(rc[0],3400); }
  else if(g.id==='cat'&&(S.owned.cat===2||S.owned.cat===3)){ sayText(S.owned.cat===2?'고양이가 한 마리 더! 이불 지분이 고양이 쪽이 더 크다':'세 마리째... 이제 이 침대는 고양이 거다',3400); }
  checkCos(); refresh(); draw(); save();
}
function buyUp(u){
  if(S.ups[u.id]||S.pts<u.cost) return;
  S.pts-=u.cost; S.ups[u.id]=1; sfx('buy'); sayText(UP_REACT[u.id]||u.desc,3000); burst(48,30,C.yellow,12); notify('🛒 이불팡',`${u.name} 침대까지 배송 완료 · ${u.desc}`);
  refresh(); draw(); save();
}

const stage=$('#stage');
stage.addEventListener('pointerdown',e=>{
  const rect=stage.getBoundingClientRect();
  const lx0=(e.clientX-rect.left)/rect.width*96, ly0=(e.clientY-rect.top)/rect.height*64;
  if(mini&&miniTap(e)) return;
  if(gold && Math.abs(lx0-(gold.x+3))<8 && Math.abs(ly0-(gold.y+2))<7){ catchGold(lx0,ly0); return; }
  if(deepOn()){ const bi=dreamBubbles.findIndex(b=>b.cx!=null&&Math.abs(lx0-b.cx)<=6&&Math.abs(ly0-b.cy)<=6); if(bi>=0){ popBubble(bi,e); return; } }
  if(guest&&lx0>=63&&lx0<=90&&ly0>=4&&ly0<=26){ openGuest(); return; }
  const calm=Date.now()-lastTap>700;
  if(calm&&!guest&&tutStep<0&&lx0>=64&&lx0<=88&&ly0>=6&&ly0<=24){ knockWindow(lx0,ly0,e); return; }
  if(calm&&lx0>=25&&lx0<=34&&ly0>=25&&ly0<=36&&tutStep<0){ openInbox(); return; }
  const hitCat=isOut()?-1:catSpots(31).findIndex(c=>lx0>=c.x-1&&lx0<=c.x+13&&ly0>=c.y-2&&ly0<=c.y+8);
  if(hitCat>=0){
    S.stats.cat=(S.stats.cat||0)+1; catJump=6; catJumpI=hitCat; sfx('cat');
    for(let i=0;i<5;i++) particles.push({x:lx0,y:ly0,vx:(Math.random()-.5)*1.2,vy:-Math.random()-.5,life:16,c:C.pink});
    const nowC=Date.now();
    if(nowC>=catReadyAt){ catReadyAt=nowC+CAT_CD; const v=Math.max(10,tapPower()*5); add(v); floatAt(e,'냥~ +'+fmt(v)); }
    else floatAt(e,'골골...');
    return;
  }
  if(isOut()){ outUntil=Math.max(Date.now(),outUntil-1000); lastTap=Date.now(); floatAt(e,'빨리빨리!'); sfx('tap'); return; }
  S.sleepy=Math.max(0,S.sleepy-4);
  const nowT=Date.now(); combo = nowT-lastTap<450 ? combo+1 : 1; lastTap=nowT;
  const cm=1+Math.min(combo,50)/100;
  if(combo>(S.stats.maxCombo||0)){ S.stats.maxCombo=combo; if(combo===50) checkAch(); }
  { const hh=new Date().getHours(); if(hh>=2&&hh<5&&!S.stats.nightTap){ S.stats.nightTap=1; checkAch(); } if(hh>=6&&hh<9&&!S.stats.morningTap){ S.stats.morningTap=1; checkAch(); } }
  const p=tapPower()*cm; add(p); S.taps++; sfx('tap'); tapLog.push([nowT,p]);
  const ce=$('#combo'); if(combo>=5){ ce.textContent=`COMBO x${combo}`+(combo>=20?` (+${Math.round((cm-1)*100)}%)`:''); ce.classList.add('show'); ce.classList.toggle('hot',combo>=30); }
  if(combo===25||combo===50||combo===100){ burst(lx0,ly0,combo>=100?C.pink:combo>=50?C.orange:C.yellow,combo/5); if(combo>=50&&Date.now()-(window._comboSay||0)>180000){ window._comboSay=Date.now(); sayText(combo>=100?'손가락이 전설이 됐다':'손가락에 불났다!',1600,true); } }
  const fl=document.createElement('div'); fl.className='float';
  fl.textContent='+'+(p<10?(Math.round(p*10)/10):fmt(p));
  fl.style.left=(e.clientX-rect.left-14)+'px'; fl.style.top=(e.clientY-rect.top-24)+'px';
  stage.appendChild(fl); setTimeout(()=>fl.remove(),800);
  const lx=(e.clientX-rect.left)/rect.width*96, ly=(e.clientY-rect.top)/rect.height*64;
  const cols=[C.yellow,C.white,C.cyan,C.orange];
  for(let i=0;i<6;i++) particles.push({x:lx,y:ly,vx:(Math.random()-.5)*1.6,vy:-Math.random()*1.4-.4,life:14+Math.random()*8,c:cols[i%4]});
  wiggle=4; draw();
});
let curTab='gens';
function switchTab(t){
  curTab=t; document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('on',x.dataset.t===t));
  document.querySelectorAll('.panel').forEach(p=>p.classList.toggle('on',p.id==='p-'+t));
  if(t==='ach'){ $('#dotA').classList.remove('show'); renderMissions(); } if(t==='cos') buildCos(); if(t==='cat') buildCats(); refresh();
}
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>switchTab(b.dataset.t)));
function dreamGain(){ return Math.floor(Math.sqrt(S.total/1e7)*2); }
const CHAPTERS=[
  {need:2e7,title:'1장 · 구름 이불 나라',ico:'☁️',story:'눈을 떠보니 온 세상이 구름 이불이었다.\n구름 주민들이 말했다. "여기선 일어나는 게 불법이에요."\n...처음으로 법을 지키는 사람이 되었다.'},
  {need:1e9,title:'2장 · 양 세기 대소동',ico:'🐑',story:'잠들려고 양을 세기 시작했다.\n1마리, 2마리... 3,000마리째 양들이 파업을 선언했다.\n"우리도 좀 눕자!" 양들이 이불 속으로 들어왔다. 따뜻하다.'},
  {need:1e12,title:'3장 · 이불 밖은...',ico:'🚪',story:'드디어 이불 밖으로 나가는 문을 찾았다.\n용기를 내서 문을 열었다.\n...문 밖도 이불이었다. 세상은 처음부터 거대한 이불이었던 것이다.\n\n🎉 엔딩 · 「영원한 이불」\n당신은 이불의 진실을 본 첫 번째 사람입니다.'},
];
function dreamNeed(){ const k=S.sleeps||0; return k<CHAPTERS.length?CHAPTERS[k].need:1e7; }
function renderDream(){
  const k=S.sleeps||0, need=dreamNeed(), dg=dreamGain(), can=S.total>=need&&dg>0;
  $('#chaps').innerHTML=CHAPTERS.map((c,i)=>`<div class="chap ${i<k?'done':''} ${i===k?'next':''}"><div class="cb">${i<k?c.ico:(i===k?'?':'🔒')}</div><div><div class="ct2">${i<=k?c.title:`${i+1}장 · ???`}</div><div class="cd">${i<k?'다 봤어요 (다시 보려면 누르기)':`이번 판 ${fmt(c.need)} 뒹굴 모으고 잠들기`}</div></div></div>`).join('')+(k>=3?'<div class="chap done"><div class="cb">🏆</div><div><div class="ct2">엔딩 달성!</div><div class="cd">이제부터는 1,000만 뒹굴마다 자유롭게 잠들 수 있어요</div></div></div>':'');
  $('#chaps').querySelectorAll('.chap.done').forEach((el,i)=>{ if(CHAPTERS[i]) el.onclick=()=>showStory(i); el.style.cursor='pointer'; });
  $('#dBar').style.width=Math.min(100,S.total/need*100)+'%';
  $('#dGain').innerHTML=can?`지금 잠들면 꿈 조각 <b style="color:var(--yellow)">+${dg}</b>${k<3?` · <b style="color:var(--yellow)">${CHAPTERS[k].title.split(' · ')[0]}</b> 공개`:''}`:`잠들려면 이번 판에서 ${fmt(need)} 뒹굴 필요 (지금 ${fmt(S.total)})`;
  $('#dreamBtn').disabled=!can; $('#dotD').classList.toggle('show',can&&curTab!=='dream');
}
function showStory(i){ const c=CHAPTERS[i]; modal(c.ico,c.title,c.story,[['계속 눕기',null]],'story'); }
$('#dreamBtn').addEventListener('click',()=>{
  const g=dreamGain(); if(S.total<dreamNeed()||g<=0) return; const k=S.sleeps||0;
  modal('🌙','꿈나라로 갈까요?',`뒹굴·장비·특수 아이템이 사라지고 꿈 조각 ${g}개를 얻어요. (모든 생산량 +${g*10}%)`,[
    ['아직 안 졸려',null,true],
    ['잠들기',()=>{ S.dream+=g; S.sleeps=k+1; const keepUps={}; ['u1','u2'].forEach(id=>{ if(S.ups[id]) keepUps[id]=1; });
      Object.assign(S,{pts:0,total:0,owned:{pillow:10,cable:1},ups:keepUps,need:0}); boostEnd=0; tapBoostEnd=0; outUntil=0; deepUntil=0; sfx('dream'); save(); refresh(); draw();
      if(k<CHAPTERS.length) showStory(k);
      modal('✨','좋은 꿈 꿨다',`꿈 조각 ${g}개 획득! 이제 모든 생산량 +${S.dream*10}%.\n베개 10개·충전 케이블을 선물로 받았어요.`+(k===2?'\n엔딩을 봤어요! 이제 자유롭게 계속 누워요.':''),[['일어나지 않기',null]]);
      checkAch(); }]]);
});
let tutStep=-1, tutFocus=null, tutGoldTries=0;
const TUT=[
  {t:'환영해! 오늘은 <b>절대 안 일어나는 날</b>이야.<br>이불을 톡톡 눌러서 <b>뒹굴 15개</b>를 모아봐!', target:()=>$('.stageWrap'), check:()=>S.pts>=15, prog:()=>`${Math.min(15,Math.floor(S.pts))}/15`},
  {t:'좋아! 이제 아래에서 <b>베개 하나 더</b>를 사보자', target:()=>GENS[0].el, start:()=>switchTab('gens'), check:()=>has('pillow')},
  {t:'방을 봐! <b>베개가 생겼지?</b><br>장비를 사면 방이 꾸며지고, <b>가만히 있어도</b> 뒹굴이 쌓여', target:()=>$('.stageWrap'), btn:'오호'},
  {t:'앗, <b>황금 베개</b>가 날아간다!<br>화면에서 눌러서 잡아봐!', target:()=>$('.stageWrap'), start:()=>{ gold={t0:Date.now(),dur:10000,x:-8,y:8}; }, check:()=>(S.stats.gold||0)>0},
  {t:'완벽해! 가끔 <b>사건</b>도 터지니까 잘 골라봐.<br>목표는 칭호 <b>"이불의 신"</b>. 이제 마음껏 누워! 💤', btn:'눕기 시작'},
];
function tutGo(i){
  if(tutFocus) tutFocus.classList.remove('focus'); tutFocus=null;
  tutStep=i;
  if(i>=TUT.length){ endTut(); return; }
  const st=TUT[i]; st.start&&st.start();
  $('#cText').innerHTML=st.t; $('#cStep').textContent=`${i+1}/${TUT.length}`; $('#cProg').textContent=st.prog?st.prog():'';
  $('#cBtn').style.display=st.btn?'':'none'; $('#cBtn').textContent=st.btn||'';
  $('#coach').classList.add('show');
  if(st.target){ tutFocus=st.target(); tutFocus.classList.add('focus'); const el=tutFocus, t0=Date.now();
    const go=()=>{ if(tutFocus!==el) return; if(Date.now()-lastTap>900||Date.now()-t0>6000) el.scrollIntoView({behavior:'smooth',block:'center'}); else setTimeout(go,200); }; go(); }
}
function tutTick(){
  if(tutStep<0) return; const st=TUT[tutStep];
  if(st.prog) $('#cProg').textContent=st.prog();
  if(tutStep===3 && !gold && !(S.stats.gold>0)){ tutGoldTries++; toast('아깝다! 한 번 더 날아온다'); gold={t0:Date.now(),dur:Math.min(14000,10000+tutGoldTries*2000),x:-8,y:8}; }
  if(st.check&&st.check()){ sfx('buy'); tutGo(tutStep+1); }
}
function tutEndSilent(){ if(tutFocus) tutFocus.classList.remove('focus'); tutFocus=null; tutStep=-1; $('#coach').classList.remove('show'); if(S.total>0) S.tut=1; }
function endTut(){
  if(tutFocus) tutFocus.classList.remove('focus'); tutFocus=null;
  tutStep=-1; S.tut=1; $('#coach').classList.remove('show'); nextEvent=Date.now()+15000; nextGold=Date.now()+60000; save();
}
$('#cBtn').addEventListener('click',()=>{ sfx('tap'); tutGo(tutStep+1); });
$('#cSkip').addEventListener('click',()=>endTut());
function checkCos(){
  const got=[];
  for(const it of cosAll()){ if(!cosUnlocked(it)){ const pr=cosProg(it); if(pr.cur>=pr.need){ S.unl[it.id]=1; S.newCos[it.id]=1; got.push(it); } } }
  if(!got.length) return;
  sfx('ach'); burst(48,20,C.pink,18);
  if(got.length===1){ toast(`🎁 새 꾸미기: ${got[0].name}! 꾸미기 탭에서 바꿔봐`); if(!(react&&Date.now()-react.t0<3000)) sayText(got[0].react||'새 꾸미기다!',3400); }
  else toast(`🎁 새 꾸미기 ${got.length}개 해금! 꾸미기 탭에서 확인해봐`);
  buildCos(); renderGoal(); save();
}
function buildCos(){
  const w=$('#cosWrap'); w.innerHTML='';
  for(const cat of ['blanket','pj','room','prop']){
    const have=COS[cat].filter(cosUnlocked).length;
    const sec=document.createElement('div'); sec.className='cosSec'; sec.innerHTML=`<span>${COS_CAT[cat]}</span><small>${have}/${COS[cat].length} 모음</small>`; w.appendChild(sec);
    const g=document.createElement('div'); g.className='cosGrid'; w.appendChild(g);
    for(const it of COS[cat]){
      const b=document.createElement('button'); const un=cosUnlocked(it), on=cat==='prop'?!!S.props[it.id]:S.cos[cat]===it.id;
      b.className='cos'+(on?' on':'')+(un?'':' lock')+(S.newCos[it.id]?' isnew':'');
      b.appendChild(cosPreview(it));
      const pr=un?null:cosProg(it);
      b.insertAdjacentHTML('beforeend',`<span class="newb">NEW</span><div class="cn">${it.name}</div><div class="cs">${on?(cat==='prop'?'✔ 놓여 있음':'✔ 적용 중'):un?(cat==='prop'?'눌러서 놓기':'눌러서 적용'):'🔒 '+cosCondText(it)+(pr&&pr.need>1?` (${pr.cur}/${pr.need})`:'')}</div>${pr?`<div class="cbar"><i style="width:${Math.round(pr.cur/pr.need*100)}%"></i></div>`:''}`);
      b.addEventListener('click',()=>applyCos(it));
      g.appendChild(b);
    }
  }
}
function applyCos(it){
  if(!cosUnlocked(it)){ const pr=cosProg(it); toast(`🔒 ${it.name}: ${pr.txt}`); return; }
  delete S.newCos[it.id];
  if(it.cat==='prop'){ S.props[it.id]=!S.props[it.id]; if(!S.props[it.id]) delete S.props[it.id]; sfx('buy'); if(S.props[it.id]){ sayText(it.react||'좋은 소품이다',2400); burst(48,30,C.pink,10); } buildCos(); renderGoal(); save(); refresh(); return; }
  if(S.cos[it.cat]!==it.id){ S.cos[it.cat]=it.id; sfx('buy'); sayText(it.def?'역시 기본이 최고지':`${it.name}... 마음에 든다`,2600); burst(it.cat==='room'?48:40,it.cat==='room'?10:34,C.pink,10); }
  buildCos(); renderGoal(); save(); refresh();
}
function nextCos(){ for(const id of COS_ORDER){ const it=cosById(id); if(!cosUnlocked(it)) return it; } return null; }
function renderGoal(){
  const el=$('#goal'); const fresh=Object.keys(S.newCos);
  const ic=$('#goalIco').getContext('2d'); ic.clearRect(0,0,36,20);
  el.classList.remove('done');
  if(fresh.length){ $('#goalIco').style.display=''; const it=cosById(fresh[0]); el.classList.add('new'); goalTgt={tab:'cos'};
    $('#goalT').textContent='새 꾸미기 도착!'; $('#goalN').textContent=it.name; $('#goalC').textContent='눌러서 입어보기 ▶'; $('#goalBar').style.width='100%';
    ic.drawImage(cosPreview(it),0,0); return; }
  el.classList.remove('new');
  const q=tutStep<0?curQuest():null;
  if(q){ const [c,n]=q.prog(); $('#goalIco').style.display='none'; goalTgt=q.tgt;
    $('#goalT').textContent=`작은 목표 · ${QUESTS.filter(x=>S.goals[x.id]).length+1}번째`; $('#goalN').textContent=q.txt; $('#goalC').textContent=(n>1?`${c}/${n} · `:'')+'달성하면 뒹굴 보상 ▶'; $('#goalBar').style.width=Math.round(c/n*100)+'%'; return; }
  const it=nextCos();
  $('#goalIco').style.display=it||fresh.length?'':'none';
  if(!it){
    let best=null; for(const g of GENS){ const o=S.owned[g.id]||0; if(!o) continue; const t=MILES.find(x=>o<x); if(!t) continue; const left=genCost(g,t-o); if(!best||left<best.left) best={g,t,o,left}; }
    if(best){ goalTgt={tab:'gens',gen:best.g.id}; $('#goalIco').style.display='none'; $('#goalT').textContent='다음 목표 · 장비 마일스톤'; $('#goalN').textContent=`${best.g.name} ${best.t}개 → 생산 x2`; $('#goalC').textContent=`지금 ${best.o}/${best.t}개`; $('#goalBar').style.width=Math.round(best.o/best.t*100)+'%'; return; }
    goalTgt={tab:'dream'}; el.classList.add('done'); $('#goalT').textContent='꾸미기 수집 완료'; $('#goalN').textContent='9종 전부 모았어요!'; $('#goalC').textContent='꾸미기 탭에서 언제든 갈아입기'; return; }
  const pr=cosProg(it); goalTgt={tab:'cos'};
  $('#goalT').textContent=`다음 꾸미기 · ${COS_CAT[it.cat]}`; $('#goalN').textContent=it.name; $('#goalC').textContent=pr.txt;
  $('#goalBar').style.width=Math.round(pr.cur/pr.need*100)+'%';
  withCtx(ic,()=>{}); ic.drawImage(cosPreview(it),0,0); ic.globalAlpha=.55; ic.fillStyle='#1a1c2c'; ic.fillRect(0,0,36,20); ic.globalAlpha=1;
  ic.fillStyle='#ffcd75'; ic.fillRect(16,7,4,5); ic.fillStyle='#1a1c2c'; ic.fillRect(17,9,2,2); ic.strokeStyle='#ffcd75'; ic.strokeRect(16.5,4.5,3,3);
}
let goalTgt=null;
$('#goal').addEventListener('click',()=>goGoal(goalTgt));
let lastGoalKey='';
setInterval(()=>{ const it=nextCos(); const pr=it?cosProg(it):null; const qq=tutStep<0?curQuest():null; const k=(qq?qq.id+qq.prog()[0]:'')+(it?it.id+pr.cur:'x'+Object.values(S.owned).join('.'))+Object.keys(S.newCos).join(); if(k!==lastGoalKey&&(Object.keys(S.newCos).length||Date.now()-(window._goalAt||0)>2000)){ lastGoalKey=k; window._goalAt=Date.now(); renderGoal(); if(curTab==='cos') buildCos(); } $('#dotC').classList.toggle('show',Object.keys(S.newCos).length>0&&curTab!=='cos'); },500);
const kindsOwned=()=>GENS.filter(g=>has(g.id)).length;
const milesHit=t=>GENS.filter(g=>(S.owned[g.id]||0)>=t).length;
const genVisible=id=>{ const g=GENS.find(x=>x.id===id); return has(id)||S.total>=g.cost*0.4; };
const QUESTS=[
  {id:'q_pillow3',txt:'베개 3개 모으기',prog:()=>[Math.min(3,S.owned.pillow||0),3],tgt:{tab:'gens',gen:'pillow'},react:'베개 탑 완성. 높이가 딱 좋다'},
  {id:'q_up1',txt:'특수 아이템 하나 사기',prog:()=>[Math.min(1,Object.keys(S.ups).length),1],avail:()=>S.total>=15,tgt:{tab:'ups'},react:'특별한 힘이 생겼다 (누워서)'},
  {id:'q_potty',txt:'침대 옆 요강 들이기',prog:()=>[has('potty')?1:0,1],avail:()=>genVisible('potty'),tgt:{tab:'gens',gen:'potty'},react:'이제 화장실도 두렵지 않다'},
  {id:'q_dress',txt:'꾸미기 하나 입어보기',prog:()=>[(S.cos.blanket!=='blue'||S.cos.pj!=='tee'||S.cos.room!=='night')?1:0,1],avail:()=>Object.keys(S.unl).length>0,tgt:{tab:'cos'},react:'오늘 이불 좀 예쁜데?'},
  {id:'q_ev2',txt:'돌발 사건 2번 해결하기',prog:()=>[Math.min(2,S.stats.ev||0),2],avail:()=>S.tut===1,tgt:{tab:'stage'},react:'핑계 실력이 늘고 있다'},
  {id:'q_mile10',txt:'베개 10개로 첫 마일스톤',prog:()=>[Math.min(10,S.owned.pillow||0),10],tgt:{tab:'gens',gen:'pillow'},react:'베개 10개! 푹신함이 두 배가 됐다'},
  {id:'q_bubble3',txt:'꿀잠 중 꿈 방울 3개 터뜨리기',prog:()=>[Math.min(3,S.stats.bubble||0),3],avail:()=>(S.stats.deep||0)>=1,tgt:{tab:'stage'},react:'꿈속에서도 바쁘다'},
  {id:'q_kind5',txt:'장비 5종 갖추기',prog:()=>[Math.min(5,kindsOwned()),5],tgt:{tab:'gens',gen:'next'},react:'방이 꽤 그럴듯해졌다'},
  {id:'q_water',txt:'머리맡 정수기 들이기',prog:()=>[has('water')?1:0,1],avail:()=>genVisible('water'),tgt:{tab:'gens',gen:'water'},react:'물도 누워서 마신다. 완벽'},
  {id:'q_cat',txt:'고양이 쓰다듬기',prog:()=>[Math.min(1,S.stats.cat||0),1],avail:()=>has('cat'),tgt:{tab:'stage'},react:'골골골... 서로 행복하다'},
  {id:'q_gold',txt:'날아가는 황금 베개 잡기',prog:()=>[Math.min(1,S.stats.gold||0),1],avail:()=>(S.stats.goldSeen||0)>=1,tgt:{tab:'stage'},react:'반짝이는 건 잡아야지'},
  {id:'q_mile3',txt:'마일스톤 3개 달성 (장비 10개씩)',prog:()=>[Math.min(3,milesHit(10)),3],tgt:{tab:'gens',gen:'mile'},react:'모으는 재미가 있다'},
  {id:'q_kind10',txt:'장비 10종 갖추기',prog:()=>[Math.min(10,kindsOwned()),10],tgt:{tab:'gens',gen:'next'},react:'이 방, 거의 우주정거장이다'},
  {id:'q_mile25',txt:'장비 하나를 25개까지',prog:()=>[Math.min(25,Math.max(0,...GENS.map(g=>S.owned[g.id]||0))),25],tgt:{tab:'gens',gen:'mile'},react:'25개... 이건 집착이다. 좋은 쪽으로'},
  {id:'q_guest',txt:'창밖 고양이 손님에게 간식 주기',prog:()=>[Math.min(1,S.stats.guestFed||0),1],avail:()=>(S.stats.guestMet||0)>=1,tgt:{tab:'cat'},react:'새 식구가 생겼다'},
  {id:'q_dream',txt:'꿈나라에서 한 번 자기',prog:()=>[Math.min(1,S.sleeps||0),1],avail:()=>S.total>=dreamNeed()*0.3||(S.sleeps||0)>=1,tgt:{tab:'dream'},react:'꿈 이야기가 시작됐다'},
];
const qSnooze={}; let qShown=null, qShownAt=0, qLastProg=-1;
function curQuest(){
  const now=Date.now();
  const list=QUESTS.filter(q=>!S.goals[q.id]&&(!q.avail||q.avail()));
  let q=list.find(q=>!(qSnooze[q.id]>now))||list[0]||null;
  if(q&&qShown===q.id){ const pr=q.prog()[0]; if(pr!==qLastProg){ qLastProg=pr; qShownAt=now; }
    else if(now-qShownAt>240000&&list.length>1){ qSnooze[q.id]=now+600000; qShown=null; return curQuest(); } }
  else if(q){ qShown=q.id; qShownAt=now; qLastProg=q.prog()[0]; }
  return q;
}
function checkGoals(){
  const done=[];
  for(const q of QUESTS){ if(S.goals[q.id]) continue; const [c,n]=q.prog(); if(c>=n){ S.goals[q.id]=1; done.push(q); } }
  if(!done.length) return;
  const v=Math.max(10,worth(20))*done.length; add(v); sfx('ach'); burst(48,14,C.lime,14);
  if(done.length===1){ toast(`🎯 작은 목표 달성: ${done[0].txt}! +${fmt(v)}`); sayText(done[0].react,3000); }
  else toast(`🎯 작은 목표 ${done.length}개 달성! +${fmt(v)}`);
  renderGoal(); save();
}
function goGoal(tgt){
  if(!tgt) return;
  if(tgt.tab==='stage'){ $('.stageWrap').scrollIntoView({behavior:'smooth',block:'center'}); return; }
  switchTab(tgt.tab);
  let el=null;
  if(tgt.tab==='gens'){
    let gid=tgt.gen;
    if(gid==='next'){ const g=GENS.find(g=>!has(g.id)&&g.el.style.display!=='none'); gid=g&&g.id; }
    if(gid==='mile'){ let best=null; for(const g of GENS){ const o=S.owned[g.id]||0; if(!o) continue; const t=MILES.find(x=>o<x); if(!t) continue; const left=genCost(g,t-o); if(!best||left<best.left) best={g,left}; } gid=best&&best.g.id; }
    const g=GENS.find(x=>x.id===gid); el=g&&g.el.style.display!=='none'?g.el:$('#p-gens');
  } else el=$('#p-'+tgt.tab);
  setTimeout(()=>{ el.scrollIntoView({behavior:'smooth',block:'center'}); if(el.classList.contains('item')){ el.classList.add('focus'); setTimeout(()=>el.classList.remove('focus'),1800); } },60);
}
const MIS_TYPES=[
  {k:'taps',txt:n=>`뒹굴 ${n}번 하기`,stat:()=>S.taps,amts:[60,120,200]},
  {k:'buys',txt:n=>`장비 ${n}개 사기`,stat:()=>S.stats.buys||0,amts:[5,10,20]},
  {k:'ev',txt:n=>`돌발 사건 ${n}번 해결`,stat:()=>S.stats.ev||0,amts:[2,3]},
  {k:'bubble',txt:n=>`꿈 방울 ${n}개 터뜨리기`,stat:()=>S.stats.bubble||0,amts:[3,5],avail:()=>(S.stats.deep||0)>=1},
  {k:'gold',txt:n=>`황금 베개 ${n}개 잡기`,stat:()=>S.stats.gold||0,amts:[1,2]},
  {k:'relief',txt:n=>`생리현상 누워서 ${n}번 해결`,stat:()=>S.stats.relief||0,amts:[1,2],avail:()=>has('potty')||has('water')},
  {k:'deep',txt:n=>`꿀잠 ${n}번 자기`,stat:()=>S.stats.deep||0,amts:[1,2]},
  {k:'pet',txt:n=>`고양이 ${n}번 쓰다듬기`,stat:()=>S.stats.cat||0,amts:[3,6],avail:()=>S.roomCats.length>0},
  {k:'guest',txt:n=>`고양이 손님 ${n}번 맞이하기`,stat:()=>S.stats.guestMet||0,amts:[1,2]},
  {k:'mini',txt:n=>`엄마한테 안 들키기 ${n}번`,stat:()=>S.stats.miniWin||0,amts:[1],avail:()=>(S.stats.miniSeen||0)>=1},
  {k:'earn',txt:n=>`뒹굴 ${fmt(n)} 모으기`,stat:()=>S.life,dyn:()=>Math.max(300,Math.ceil(baseRate()*180))},
];
function newMission(exclude){
  const used=new Set([...(exclude||[]),...S.missions.map(m=>m.k)]);
  const pool=MIS_TYPES.filter(t=>!used.has(t.k)&&(!t.avail||t.avail()));
  const t=pool[Math.floor(Math.random()*pool.length)]||MIS_TYPES[0];
  const n=t.dyn?t.dyn():t.amts[Math.floor(Math.random()*t.amts.length)];
  return {k:t.k,n,base:t.stat()};
}
function misType(k){ return MIS_TYPES.find(t=>t.k===k); }
function ensureMissions(){ while(S.missions.length<3) S.missions.push(newMission()); S.missions=S.missions.filter(m=>misType(m.k)); while(S.missions.length<3) S.missions.push(newMission()); }
function checkMissions(){
  if(tutStep>=0) return; ensureMissions(); let doneAny=false;
  S.missions.forEach((m,i)=>{ const t=misType(m.k); const cur=t.stat()-m.base; if(cur>=m.n){ const v=Math.max(30,worth(45)); add(v); S.stats.missions=(S.stats.missions||0)+1; doneAny=true;
      toast(`📋 미션 완료: ${t.txt(m.n)} +${fmt(v)}`); S.missions[i]=newMission([m.k]); } });
  if(doneAny){ sfx('ach'); burst(48,12,C.lime,12); checkCos(); checkAch(); save(); }
  if(curTab==='ach') renderMissions();
}
function renderMissions(){
  const el=$('#misList'); if(!el) return; ensureMissions();
  el.innerHTML=S.missions.map((m,i)=>{ const t=misType(m.k); const cur=Math.max(0,Math.min(m.n,t.stat()-m.base));
    return `<div class="mis"><div class="mm"><div class="mt">${t.txt(m.n)}</div><div class="mr">보상 약 ${fmt(Math.max(30,worth(45)))} 뒹굴 · ${t.k==='earn'?fmt(cur)+'/'+fmt(m.n):cur+'/'+m.n}</div><div class="mb"><i style="width:${Math.round(cur/m.n*100)}%"></i></div></div><button class="rr" data-i="${i}">다른 미션</button></div>`; }).join('')
    +`<div class="misHead">지금까지 완료한 미션 <b>${S.stats.missions||0}개</b> · 미션을 깨면 꾸미기가 열려요</div>`;
  el.querySelectorAll('.rr').forEach(b=>b.onclick=()=>{ const i=+b.dataset.i; S.missions[i]=newMission([S.missions[i].k]); sfx('tap'); renderMissions(); save(); });
  const days=S.attendDays||0; const icons=['🎁','🎁','🧸','🎁','👕','🎁','🌈'];
  $('#attBoard').innerHTML=icons.map((ic,i)=>`<div class="${i<days?'got':''} ${i===Math.min(days,7)-1?'today':''}"><b>${i<days?'✓':ic}</b>${i+1}일</div>`).join('');
  $('#attNote').innerHTML=days>=7?'출석판 완료! 앞으로도 들어올 때마다 출석 보상은 계속 받아요.':`출석 <b>${days}/7일</b> · 3일째 곰인형, 5일째 줄무늬 잠옷, 7일째 무지개 이불`;
}
function checkAch(){
  for(const a of ACH){ if(!S.ach[a.id]){ let ok=false; try{ ok=a.ok(); }catch(e){} if(ok){ S.ach[a.id]=1; sfx('ach'); notify('🏆 뒹굴업적',`「${a.name}」 달성! 모든 생산 +2%`); if(curTab!=='ach') $('#dotA').classList.add('show'); } } }
}
document.querySelectorAll('.toggle button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.toggle button').forEach(x=>x.classList.remove('on')); b.classList.add('on'); buyN=+b.dataset.n; refresh();
}));

function floatAt(e,txt){ const rect=stage.getBoundingClientRect(); const fl=document.createElement('div'); fl.className='float'; fl.textContent=txt;
  fl.style.left=(e.clientX-rect.left-14)+'px'; fl.style.top=(e.clientY-rect.top-24)+'px'; stage.appendChild(fl); setTimeout(()=>fl.remove(),800); }
function catchGold(x,y){
  gold=null; S.stats.gold=(S.stats.gold||0)+1; sfx('gold'); $('.stageWrap').classList.remove('shake'); void $('.stageWrap').offsetWidth; $('.stageWrap').classList.add('shake');
  for(let i=0;i<14;i++) particles.push({x,y,vx:(Math.random()-.5)*2.4,vy:-Math.random()*2,life:20,c:i%2?C.yellow:C.white});
  if(Math.random()<0.5){ boost(7,12); toast('황금 베개! 12초간 자동 생산 x7'); }
  else { const v=worth(75); add(v); toast(`황금 베개! 1분어치 뒹굴 +${fmt(v)}`); }
  draw(); save();
}
let AC=null;
// 앱이 일시정지(광고·결제·백그라운드)했거나 기기가 무음 모드면 소리를 끔. 사용자의 음소거 설정(S.mute)은 건드리지 않음
let sysPaused=false, sysSilent=false;
const sysQuiet=()=>sysPaused||sysSilent;
function sfx(type){
  if(S.mute||sysQuiet()) return;
  try{
    ensureAC();
    const t0=AC.currentTime;
    const tone=(f,st,d,wave='square',vol=.06,f2)=>{ const o=AC.createOscillator(),g=AC.createGain(); o.type=wave; o.frequency.setValueAtTime(f,t0+st); if(f2) o.frequency.exponentialRampToValueAtTime(f2,t0+st+d);
      g.gain.setValueAtTime(vol,t0+st); g.gain.exponentialRampToValueAtTime(.0001,t0+st+d); o.connect(g); g.connect(AC.destination); o.start(t0+st); o.stop(t0+st+d+.02); };
    if(type==='tap') tone(520+Math.random()*80+Math.min(combo,40)*8,0,.06,'square',.035);
    else if(type==='buy'){ tone(523,0,.07); tone(659,.06,.07); tone(784,.12,.1); }
    else if(type==='gold'){ [784,988,1175,1568].forEach((f,i)=>tone(f,i*.06,.12,'triangle',.07)); }
    else if(type==='ach'){ [523,659,784,1047].forEach((f,i)=>tone(f,i*.09,.16,'square',.05)); }
    else if(type==='rank'){ [392,523,659,784,659,1047].forEach((f,i)=>tone(f,i*.1,.18,'square',.05)); }
    else if(type==='cat'){ tone(900,0,.18,'sine',.08,600); tone(700,.18,.16,'sine',.06,1000); }
    else if(type==='event'){ tone(880,0,.08,'square',.05); tone(880,.12,.08,'square',.05); }
    else if(type==='first'){ [659,784,988,1319].forEach((f,i)=>tone(f,i*.07,.14,'triangle',.06)); tone(1568,.32,.25,'sine',.05); }
    else if(type==='dream'){ [1047,784,659,523,392].forEach((f,i)=>tone(f,i*.15,.3,'triangle',.06)); }
  }catch(e){}
}
/* ---- 배경음악: 잔잔한 자장가 (WebAudio로 직접 연주) ---- */
const BGM={on:false,next:0,step:0,master:null,echo:null,timer:null};
const midi=n=>440*Math.pow(2,(n-69)/12);
const BGM_STEP=60/72/2;
const BGM_CH=[[53,57,60],[57,60,64],[58,62,65],[52,55,60],[53,57,60],[50,53,57],[58,62,65],[52,55,60]];
const BGM_BASS=[41,45,46,48,41,50,46,48];
const BGM_MEL=[69,0,72,0,69,67,65,0, 69,0,67,0,64,0,0,0, 65,0,74,0,72,0,70,0, 69,0,67,0,0,0,0,0,
               72,0,69,0,65,0,69,0, 74,0,72,0,69,0,65,0, 62,0,65,0,70,0,69,67, 64,0,67,0,65,0,0,0];
function ensureAC(){
  if(!AC) AC=new (window.AudioContext||window.webkitAudioContext)();
  if(AC.state==='suspended') AC.resume();
  return AC;
}
function bgmNode(){
  if(BGM.master) return;
  BGM.master=AC.createGain(); BGM.master.gain.value=0; BGM.master.connect(AC.destination);
  const d=AC.createDelay(1), fb=AC.createGain(), wet=AC.createGain();
  d.delayTime.value=BGM_STEP*3; fb.gain.value=.35; wet.gain.value=.5;
  d.connect(fb); fb.connect(d); d.connect(wet); wet.connect(BGM.master);
  BGM.echo=d;
}
function bgmNote(f,t,dur,wave,vol,echo){
  const o=AC.createOscillator(), g=AC.createGain(); o.type=wave; o.frequency.value=f;
  g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(vol,t+Math.min(.08,dur*.3));
  g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  o.connect(g); g.connect(BGM.master); if(echo) g.connect(BGM.echo);
  o.start(t); o.stop(t+dur+.05);
}
function bgmTick(){
  if(!BGM.on||!AC) return;
  const dream=deepOn();
  while(BGM.next<AC.currentTime+.6){
    const st=BGM.step%64, t=BGM.next, bar=Math.floor(st/8);
    if(st%8===0){
      BGM_CH[bar].forEach(n=>bgmNote(midi(n),t,BGM_STEP*8.2,'triangle',dream?.012:.016));
      bgmNote(midi(BGM_BASS[bar]),t,BGM_STEP*6,'sine',.05);
    }
    if(st%8===4) bgmNote(midi(BGM_BASS[bar]+7),t,BGM_STEP*3,'sine',.03);
    const m=BGM_MEL[st];
    if(m) bgmNote(midi(m+(dream?12:0)),t,BGM_STEP*(dream?3:2.2),dream?'sine':'triangle',dream?.035:.04,dream);
    BGM.next+=BGM_STEP; BGM.step++;
  }
}
function bgmWanted(){ return !S.mute&&!S.bgmOff&&!document.hidden&&!mini&&!sysQuiet(); }
function bgmSync(){
  if(!AC) return;
  const want=bgmWanted();
  if(want&&!BGM.on){
    bgmNode(); BGM.on=true; BGM.next=AC.currentTime+.1;
    BGM.master.gain.cancelScheduledValues(AC.currentTime); BGM.master.gain.setTargetAtTime(.9,AC.currentTime,.8);
    clearInterval(BGM.timer); BGM.timer=setInterval(()=>{ bgmTick(); if(!bgmWanted()) bgmSync(); },200); bgmTick();
  } else if(!want&&BGM.on){
    BGM.on=false; clearInterval(BGM.timer);
    BGM.timer=setInterval(()=>{ if(bgmWanted()) bgmSync(); },500);
    BGM.master.gain.cancelScheduledValues(AC.currentTime); BGM.master.gain.setTargetAtTime(0,AC.currentTime,.15);
  }
}
function soundIcon(){ $('#muteBtn').textContent=S.mute?'🔇':(S.bgmOff?'🔉':'🔊'); }
window.addEventListener('pointerdown',()=>{ if(S.mute||sysQuiet()) return; try{ ensureAC(); bgmSync(); }catch(e){} },{passive:true});
document.addEventListener('visibilitychange',()=>{ try{ bgmSync(); }catch(e){} });
$('#muteBtn').addEventListener('click',()=>{
  if(!S.mute&&!S.bgmOff){ S.bgmOff=true; toast('🔉 배경음악 끔 · 효과음만 나와요'); }
  else if(!S.mute){ S.mute=true; toast('🔇 소리를 모두 껐어요'); }
  else { S.mute=false; S.bgmOff=false; toast('🔊 배경음악이랑 효과음 켜짐'); }
  soundIcon(); save();
  try{ ensureAC(); bgmSync(); }catch(e){}
});
const inbox=[]; let unread=0, phoneToastAt=0;
function notify(app,msg){
  inbox.unshift({app,msg,t:Date.now()}); if(inbox.length>30) inbox.pop(); unread++; updateChip();
  if(Date.now()-phoneToastAt>6000){ phoneToastAt=Date.now(); setTimeout(()=>{ toast(`📱 띠링! 폰에 알림 ${unread}개 왔어요 · 왼쪽 위 「폰 알림」을 눌러봐요`); },400); }
}
function updateChip(){ const c=$('#phoneChip'); if(!c) return; c.classList.toggle('show',unread>0&&tutStep<0); $('#phoneN').textContent=unread>9?'9+':unread; }
function openInbox(){
  sfx('tap');
  const more=inbox.length>8?`\n\n…외 ${inbox.length-8}개`:'';
  const list=inbox.slice(0,8).map(n=>`${n.app}\n  ${n.msg}`).join('\n\n')+more||'새 알림이 없어요.\n누워서 폰만 보는 중...';
  const cnt=inbox.length;
  modal('📱',`누워서 보는 폰 · 알림 ${cnt}개`,list||'새 알림이 없어요.\n누워서 폰만 보는 중...',[['다 읽음 (지우기)',()=>{ inbox.length=0; unread=0; updateChip(); toast('📱 알림을 다 지웠어요'); }]],'story'); unread=0; updateChip();
}
const tq=[]; let tBusy=false, tTimer;
function toast(m){
  if(tq.includes(m)) return;
  tq.push(m); while(tq.length>3) tq.shift();
  if(!tBusy) nextToast();
}
function nextToast(){
  const t=$('#toast'); const m=tq.shift();
  if(m===undefined){ tBusy=false; t.classList.remove('show'); return; }
  tBusy=true; t.classList.remove('show'); void t.offsetWidth; t.textContent=m; t.classList.add('show');
  clearTimeout(tTimer); tTimer=setTimeout(nextToast, tq.length?1500:2400);
}
const mq=[];
function modal(big,title,text,buttons,cls){
  if($('#modal').classList.contains('show')){ mq.push([big,title,text,buttons,cls]); return; }
  $('#mText').classList.toggle('story',cls==='story'); $('#mBig').textContent=big; $('#mTitle').textContent=title; $('#mText').innerText=text;
  const row=$('#mRow'); row.innerHTML='';
  buttons.forEach(([label,fn,sec])=>{ const b=document.createElement('button'); b.className='btn'+(sec?' sec':''); b.textContent=label; b.onclick=()=>{ $('#modal').classList.remove('show'); fn&&fn(); if(mq.length) setTimeout(()=>modal(...mq.shift()),150); }; row.appendChild(b); });
  $('#modal').classList.add('show');
}

/* ================= events ================= */
const worth=sec=>Math.max(baseRate()*sec,tapPower()*sec/3,10);
function boost(m,sec){ const now=Date.now(); if(boostOn()&&boostMult>m){ boostEnd=Math.max(boostEnd,now+sec*1000); return; } boostMult=m; boostEnd=Math.max(now,boostOn()&&boostMult===m?boostEnd:now)+sec*1000; }
function tapBoost(m,sec){ const now=Date.now(); if(tapBoostOn()&&tapBoostMult>m){ tapBoostEnd=Math.max(tapBoostEnd,now+sec*1000); return; } tapBoostMult=m; tapBoostEnd=now+sec*1000; }
const isNight=()=>{ const h=new Date().getHours(); return h>=22||h<6; };
const momStat=()=>{ S.stats.mom=(S.stats.mom||0)+1; };
// fx: inst(sec) 즉시 보상 / boost[m,sec] 전체 생산 / tap[m,sec] 뒹굴(클릭)만 / gold 황금 베개 소환 / rain(sec)
const EVENTS=[
  {q:'👩 엄마: "일어나! 해가 중천이야!"',opts:[
    {lab:'5분만...',fx:()=>({inst:50}),msg:'5분이 2시간이 됐다',pre:momStat},
    {lab:'일어나는 척 기지개',fx:()=>({tap:[3,20]}),msg:'기지개 덕분에 손가락이 풀렸다'}]},
  {q:'⏰ 알람이 울린다. 따르르르릉',opts:[
    {lab:'스누즈 (한 번만...)',fx:()=>({boost:[2,isNight()?45:30]}),msg:'스누즈의 힘'},
    {lab:'그냥 끈다',fx:()=>({inst:25}),msg:'끄고 다시 잠'}]},
  {q:'📦 "택배 왔습니다~" 딩동',opts:[
    {lab:'문 앞에 두세요!',fx:()=>({inst:60}),msg:'목소리만으로 해결'},
    {lab:'침대째로 굴러가서 받기',fx:()=>({gold:1}),msg:'가는 길에 뭔가 반짝이는 걸 봤다'}]},
  {q:'📱 친구: "야 나와, 밥 먹자"',opts:[
    {lab:'폰 엎어두기',fx:()=>({inst:32}),msg:'못 본 걸로'},
    {lab:'"영상통화로 같이 먹자"',fx:()=>({boost:[2,40]}),msg:'누운 채로 사회생활 성공'}]},
  {q:'☀️ 햇살이 커튼 틈으로 얼굴을 비춘다',opts:[
    {lab:'이불 뒤집어쓰기',fx:()=>({boost:[3,20]}),msg:'완벽한 동굴 완성'},
    {lab:'광합성 모드',fx:()=>({tap:[2,40]}),msg:'햇빛 충전 완료. 손가락에 힘이 난다'}]},
  {q:'🦶 발 하나가 이불 밖으로 나갔다...',opts:[
    {lab:'재빨리 집어넣기',fx:()=>({inst:32}),msg:'휴, 무사 귀환'},
    {lab:'시원하니까 내버려두기',fx:()=>({boost:[2,40]}),msg:'발끝 냉방의 힘'}]},
  {q:'👩 엄마: "이불 좀 개라! 몇 번을 말해!"',opts:[
    {lab:'이불째로 굴러가기',fx:()=>({inst:22}),msg:'이불 김밥 상태로 대답만 함',pre:momStat},
    {lab:'"네~" (안 함)',fx:()=>({boost:[2,25]}),msg:'대답은 했다. 마음이 편하다'}]},
  {q:'🐈 고양이가 배 위에 올라와 골골송을 부른다',need:'cat',opts:[
    {lab:'절대 안 움직인다',fx:()=>({boost:[3,25]}),msg:'고양이 법 준수'},
    {lab:'같이 골골거리기',fx:()=>({inst:42}),msg:'둘이 같이 골골. 평화롭다',pre:()=>{catJump=6;}}]},
  {q:'💬 회사 단톡방: "주말에 죄송한데요..."',opts:[
    {lab:'알림 끄기',fx:()=>({inst:40}),msg:'주말의 평화를 지켰다'},
    {lab:'"넵!" 한 글자만 보내기',fx:()=>({tap:[3,25]}),msg:'최소 노력 답장으로 손가락 예열'}]},
  {q:'🦵 다리에 쥐가 났다!',opts:[
    {lab:'이불 속에서 버틴다',fx:()=>({inst:25}),msg:'고통도 뒹굴의 일부'},
    {lab:'누운 채로 스트레칭',fx:()=>({boost:[2,30]}),msg:'오히려 개운하다'}]},
  {q:'🌧️ 창밖에 비가 오기 시작했다',opts:[
    {lab:'빗소리 ASMR 감상',fx:()=>({boost:[2,isNight()?60:40],rain:60}),msg:'완벽한 뒹굴 날씨'},
    {lab:'파전 생각하기',fx:()=>({inst:isNight()?45:32}),msg:'상상 속 파전이 맛있다'}]},
  {q:'🤖 로봇청소기가 침대 밑에 끼었다',need:'robot',opts:[
    {lab:'못 본 척',fx:()=>({inst:45}),msg:'알아서 나오겠지'},
    {lab:'발끝으로 꺼내주기',fx:()=>({tap:[3,25]}),msg:'발끝 기술이 손가락까지 전해졌다'}]},
  {q:'📺 "다음 화 재생까지 5초..."',need:'tv',opts:[
    {lab:'한 편만 더',fx:()=>({boost:[4,15]}),msg:'정주행 모드'},
    {lab:'오늘은 여기까지',fx:()=>({inst:38}),msg:'라고 하고 쇼츠를 켰다'}]},
  {q:'🚪 문 밖에서 엄마 발소리가... 들키지 않고 뒹굴 수 있을까?',mini:1,opts:[
    {lab:'도전! 엄마한테 들키지 마',fx:()=>({mini:1}),msg:'자는 척 연기 시작'},
    {lab:'이불 뒤집어쓰고 자는 척',fx:()=>({inst:25}),msg:'완벽하게 자는 척 성공'}]},
  {q:'🍗 치킨 냄새가 어디선가 난다',opts:[
    {lab:'배달앱 켜기',fx:()=>({inst:has('deliv')?80:50}),msg:'누운 채로 주문 성공'},
    {lab:'상상으로 먹기',fx:()=>({tap:[3,15]}),msg:'상상 치킨 파워'}]},
];
const EV_MS=15000;
let mini=null;
function startMini(){
  if(mini||isOut()) return; hideSay();
  const now=Date.now(); mini={t0:now,end:now+10000,state:'safe',next:now+1500+Math.random()*1000,taps:0,caught:false};
  sfx('event'); $('#miniBox').classList.add('show'); $('#phoneChip').classList.remove('show');
  $('.stageWrap').scrollIntoView({behavior:'smooth',block:'center'});
}
function updateMini(){
  if(!mini) return; const now=Date.now();
  if(now>=mini.end){ endMini(true); return; }
  if(now>=mini.next){
    if(mini.state==='safe'){ mini.state='warn'; mini.next=now+650+Math.random()*250; sfx('tap'); }
    else if(mini.state==='warn'){ mini.state='look'; mini.next=now+1100+Math.random()*700; }
    else { mini.state='safe'; mini.next=now+1100+Math.random()*1400; }
  }
  const box=$('#miniBox'); box.className='miniBox show '+mini.state;
  $('#miniT').textContent=`🙈 엄마한테 들키지 마! ${Math.ceil((mini.end-now)/1000)}초 · 뒹굴 ${mini.taps}번`;
  $('#miniS').textContent=mini.state==='safe'?'지금이야! 뒹굴뒹굴':mini.state==='warn'?'문고리가 덜컥...!':'쉿! 자는 척 (누르지 마)';
}
function miniTap(e){
  if(mini.state==='look'){ mini.caught=true; endMini(false); return true; }
  mini.taps++; return false;
}
function endMini(win){
  const m=mini; mini=null; $('#miniBox').classList.remove('show'); updateChip();
  if(win){ const v=Math.max(30,Math.min(worth(140),worth(35)+m.taps*Math.max(1,worth(1.2)))); add(v); S.stats.miniWin=(S.stats.miniWin||0)+1; sfx('first'); burst(48,30,C.yellow,24);
    toast(`🙈 완벽한 자는 척! 뒹굴 ${m.taps}번 · +${fmt(v)}`); sayText(m.taps>=25?'엄마는 아무것도 몰랐다. 연기 대상감':'휴... 들킬 뻔했다',2800); }
  else { const v=Math.max(10,worth(8)); add(v); sfx('event'); wiggle=8;
    toast(`👩 엄마: "자는 거 다 알아" · 위로금 +${fmt(v)}`); sayText('들켰다... 그래도 안 일어남',2600); }
  save();
}
function fxEst(fx){
  const parts=[]; let est=0;
  if(fx.inst){ const v=worth(fx.inst); est+=v; parts.push(`즉시 +${fmt(v)}`); }
  if(fx.boost){ const [m,sec]=fx.boost; const e=baseRate()*(m-1)*sec; est+=e; parts.push(`${sec}초간 전체 x${m}`+(e>=1?` (약 +${fmt(e)})`:'')); }
  if(fx.tap){ const [m,sec]=fx.tap; const e=tapIncomeRate()*(m-1)*sec; est+=e; parts.push(`${sec}초간 뒹굴 x${m}`+(e>=1?` (지금 속도면 약 +${fmt(e)})`:' (연타할수록 이득)')); }
  if(fx.gold) parts.push('황금 베개가 곧 날아옴');
  if(fx.mini) parts.push(`10초 미니게임 · 문이 열리면 멈추기 · 성공하면 약 +${fmt(worth(60))}`);
  return {txt:parts.join(' · '),est};
}
function applyFx(fx,msg){
  if(fx.mini){ S.stats.miniSeen=(S.stats.miniSeen||0)+1; setTimeout(startMini,600); return; }
  let tail=[];
  if(fx.inst){ const v=worth(fx.inst); add(v); tail.push(`+${fmt(v)}`); }
  if(fx.boost){ boost(fx.boost[0],fx.boost[1]); tail.push(`${fx.boost[1]}초간 x${fx.boost[0]}`); }
  if(fx.tap){ tapBoost(fx.tap[0],fx.tap[1]); tail.push(`${fx.tap[1]}초간 뒹굴 x${fx.tap[0]}`); }
  if(fx.rain) rainUntil=Date.now()+fx.rain*1000;
  if(fx.gold){ setTimeout(()=>{ if(!gold) gold={t0:Date.now(),dur:8000,x:-8,y:8}; },1500); tail.push('황금 베개를 잡아봐!'); }
  toast(`${msg}. ${tail.join(' · ')}`);
}
let nextEvent=Date.now()+20000,evOn=false,evEnd=0,evHide,lastEvQ='';
let miniInviteDone=false;
function showEvent(){
  const pool=EVENTS.filter(e=>(!e.need||has(e.need))&&e.q!==lastEvQ); let ev=pool[Math.floor(Math.random()*pool.length)];
  if(!(S.stats.miniSeen>0)&&!miniInviteDone&&S.life>3000){ miniInviteDone=true; ev=EVENTS.find(e=>e.mini); } else if(Math.random()<.12){ const me=EVENTS.find(e=>e.mini); if(me.q!==lastEvQ) ev=me; }
  lastEvQ=ev.q;
  $('#evQ').textContent=ev.q;
  const fxs=ev.opts.map(o=>o.fx()); const ests=fxs.map(fxEst);
  ['#evA','#evB'].forEach((sel,i)=>{ const o=ev.opts[i];
    $(sel).innerHTML=`<span class="bl"></span><span class="be"></span>`; $(sel).querySelector('.bl').textContent=o.lab; $(sel).querySelector('.be').textContent=ests[i].txt; $(sel).dataset.est=Math.round(ests[i].est||0);
    $(sel).onclick=()=>{ S.stats.ev=(S.stats.ev||0)+1; o.pre&&o.pre(); applyFx(fxs[i],typeof o.msg==='function'?o.msg():o.msg); sfx('buy'); hideEvent(); checkCos(); };
  });
  const tapping=tapIncomeRate()>baseRate()*0.5&&tapIncomeRate()>0;
  $('#evHint').textContent=tapping?'지금 연타 중이라 "뒹굴 x" 선택지가 이득이에요':(baseRate()<5?'초반엔 즉시 보상이 든든해요':'');
  sfx('event'); hideSay(); $('#event').classList.add('show'); document.body.classList.add('evOpen'); evOn=true; evEnd=Date.now()+EV_MS; evHide=setTimeout(hideEvent,EV_MS);
}
function hideEvent(){ clearTimeout(evHide); $('#event').classList.remove('show'); document.body.classList.remove('evOpen'); evOn=false; nextEvent=Date.now()+60000+Math.random()*50000; refresh(); draw(); save(); }

/* ================= gauges ================= */
let dreamBubbles=[], nextBubble=0;
const SLEEP_TALK=['음냐... 치킨 반반...','5분만... 아니 5년만...','양이... 삼천 마리...','이불아... 사랑해...','출근... 안 해... 음냐','고양이... 거기 내 자리...'];
function updateBubbles(){
  const now=Date.now();
  dreamBubbles=dreamBubbles.filter(b=>now-b.born<b.life);
  if(!deepOn()){ dreamBubbles=[]; return; }
  if(now>=nextBubble&&dreamBubbles.length<3){
    const r0=Math.random(); const type=r0<.08?'gold':r0<.4?'star':r0<.7?'sheep':'chicken';
    dreamBubbles.push({type,born:now,life:5500,x:30+Math.random()*36,y0:34+Math.random()*4,ph:Math.random()*6}); nextBubble=now+1800+Math.random()*900; }
}
function popBubble(i,e){
  const b=dreamBubbles[i]; dreamBubbles.splice(i,1); S.stats.bubble=(S.stats.bubble||0)+1; sfx('gold');
  burst(b.cx,b.cy,'#e8d8ff',12);
  if(b.type==='star'){ const v=worth(15); add(v); floatAt(e,'별 꿈! +'+fmt(v)); }
  else if(b.type==='sheep'){ deepUntil+=4000; floatAt(e,'양 한 마리... 꿀잠 +4초'); }
  else if(b.type==='chicken'){ tapBoost(2,10); floatAt(e,'꿈속 치킨! 10초 뒹굴 x2'); }
  else { if(!gold) gold={t0:Date.now(),dur:8000,x:-8,y:8}; floatAt(e,'황금 꿈! 황금 베개 등장'); }
  draw();
}
const NEED_FULL_SEC=150, SLEEP_FULL_SEC=45, OUT_SEC=20, DEEP_SEC=20, NEED_GRACE=200;
function needSpeed(){ let m=1; if(has('potty')) m*=.7; if(has('water')) m*=.7; if(has('flush')) m*=.9; if(has('bidet')) m*=.9; if(has('bladder')) m*=.5; return m; }
const RELIEF={wc:[['bladder',1],['bidet',.7],['flush',.4],['potty',.1]],drink:[['fridge',1],['water',.5]]};
function reliefBest(type){ const r=RELIEF[type].find(([id])=>has(id)); return r?{id:r[0],p:r[1]}:null; }
const NEED_TYPES={
  wc:{ico:'🚽',sig:'화장실 신호가 왔다!',fix:['potty','bladder'],solved:'요강 덕분에 안 일어났다!',go:'화장실 다녀오는 중',back:'다시 이불 속으로... 행복해'},
  drink:{ico:'💧',sig:'목이 마르다...',fix:['water','fridge'],solved:'손만 뻗어서 물 마심. 문명 최고',go:'물 마시러 다녀오는 중',back:'물 마시고 복귀. 이불 아직 따뜻해'},
};
function triggerNeed(){
  const type=Math.random()<.6?'wc':'drink'; const T=NEED_TYPES[type]; S.need=0;
  const best=reliefBest(type); const nFix=['potty','flush','bidet','water','bladder','fridge'].filter(has).length;
  if(best&&Math.random()<best.p){ const helper=best.id; const v=worth(15+nFix*8); add(v); S.stats.relief=(S.stats.relief||0)+1; sfx('buy');
    const g=GENS.find(x=>x.id===helper); const lucky=best.p<1?` (성공 확률 ${Math.round(best.p*100)}%${best.p<=.4?', 운 좋다!':''})`:'';
    sayText(best.p<=.1?'요강으로 해결... 아슬아슬했다':T.solved,3000);
    burst(...(GEN_REACT[helper]?GEN_REACT[helper].slice(1):[40,40]),C.cyan,12); toast(`${T.ico} ${ro(g.name)} 누워서 해결!${lucky} +${fmt(v)}`); return; }
  const failName=best?GENS.find(x=>x.id===best.id).name:null;
  outType=type; outUntil=Date.now()+OUT_SEC*1000; S.stats.wentOut=(S.stats.wentOut||0)+1; hideSay(); sfx('event');
  const tip=type==='wc'?'요강':'정수기';
  const nextUp=RELIEF[type].slice().reverse().find(([id,p])=>!has(id)&&(!best||p>best.p));
  toast(failName?`${T.ico} ${best.id==='potty'?iga(failName)+' 넘칠 것 같다':ro(failName)+'는 무리였다'}... ${OUT_SEC}초 자리 비움 (성공 확률 ${Math.round(best.p*100)}%)`:`${T.ico} ${T.sig} ${OUT_SEC}초 자리 비움 · 톡톡 누르면 빨리 와요`);
  if(failName&&nextUp){ setTimeout(()=>sayText(`${GENS.find(x=>x.id===nextUp[0]).name}만 있었어도... (${Math.round(nextUp[1]*100)}%)`,3000,true),OUT_SEC*1000+600); }
  if(!S.stats.outTip){ S.stats.outTip=1; setTimeout(()=>sayText(`${tip}만 있었어도... 장비 탭에서 사두자`,3200),OUT_SEC*1000+400); }
}
function updateGauges(dt){
  const now=Date.now();
  if(tutStep<0 && !isOut()){
    if(S.life>=NEED_GRACE&&!document.hidden) S.need=Math.min(100,S.need+dt*100/NEED_FULL_SEC*needSpeed());
    if(S.need>=100 && !evOn && !deepOn() && !mini) triggerNeed();
    if(!deepOn()){
      if(now-lastTap>3000) S.sleepy=Math.min(100,S.sleepy+dt*100/SLEEP_FULL_SEC);
      if(S.sleepy>=100){ deepUntil=now+DEEP_SEC*1000; S.sleepy=0; S.stats.deep=(S.stats.deep||0)+1; nextBubble=now+800; if(!guest&&Math.random()<0.15){ guest={id:'dreamcat',t0:now,until:now+DEEP_SEC*1000}; setTimeout(()=>toast('✨ 꿀잠 속에서 꿈냥이 창밖에 나타났어요!'),1200); } toast(`😴 꿀잠! ${DEEP_SEC}초간 생산 x2 · 떠오르는 꿈 방울을 눌러봐`); sayText(SLEEP_TALK[Math.floor(Math.random()*SLEEP_TALK.length)],2800); }
    }
  }
  if(outType && !isOut()){ const T=NEED_TYPES[outType]; outType=''; sayText(T.back,2600); burst(30,34,C.white,10); }
  // UI
  const np=Math.floor(S.need), sp=deepOn()?100:Math.floor(S.sleepy);
  $('#needBar').style.width=np+'%'; $('#needPct').textContent=isOut()?'해결 중':np+'%';
  $('#sleepBar').style.width=sp+'%'; $('#sleepPct').textContent=deepOn()?'꿀잠!':sp+'%';
  $('#gNeed').classList.toggle('warn',np>=80&&!isOut()); $('#gSleep').classList.toggle('full',deepOn());
  const bw=reliefBest('wc'), bd=reliefBest('drink');
  $('#needHint').textContent= S.life<NEED_GRACE ? '아직은 참을 만해요' : `🚽 누워서 해결 ${bw?Math.round(bw.p*100):0}% · 💧 ${bd?Math.round(bd.p*100):0}%`+(np>=80&&!isOut()?' · 곧 신호!':` · 실패하면 ${OUT_SEC}초 자리 비움`);
  $('#sleepHint').textContent= deepOn()?`꿈 방울을 눌러요! · ${Math.ceil((deepUntil-now)/1000)}초`:(sp>=70?'곧 꿀잠... 꿈 방울이 떠올라요':'가만히 두면 꿀잠 x2 · 연타하면 깸');
  const ob=$('#outBox');
  if(isOut()){ const T=NEED_TYPES[outType]||NEED_TYPES.wc; ob.innerHTML=`${T.ico} ${T.go}... ${Math.ceil((outUntil-now)/1000)}초<small>톡톡 누르면 빨리 와요</small>`; ob.classList.add('show'); }
  else ob.classList.remove('show');
}

/* ================= loop ================= */
function tick(){
  const now=Date.now(); const dt=(now-lastWall)/1000; lastWall=now;
  if(dt>10){ awayGain(dt); return; }
  add(rate()*dt);
  updateGauges(dt); updateBubbles(); updateMini();
  tutTick();
  if(tutStep<0&&!evOn&&!isOut()&&!mini&&now>nextEvent) showEvent();
  if(tutStep<0&&!gold&&now>nextGold){ gold={t0:now,dur:7000,x:-8,y:8}; S.stats.goldSeen=(S.stats.goldSeen||0)+1; nextGold=now+70000+Math.random()*60000; }
  if(now>nextRain){ if(Math.random()<0.4) rainUntil=now+40000+Math.random()*40000; nextRain=now+120000; }
  if(evOn) $('#evSec').textContent=Math.max(0,Math.ceil((evEnd-now)/1000))+'초';
  if(evOn) $('#evBar').style.width=Math.max(0,Math.round((evEnd-now)/EV_MS*20)*5)+'%';
  draw();
}
const awayAcc={sec:0,v:0};
function awayGain(sec){
  sec=Math.min(sec,8*3600-awayAcc.sec); if(sec<=0){ refresh(); draw(); return; }
  const v=baseRate()*sec; add(v); awayAcc.sec+=sec; awayAcc.v+=v;
  if(!document.hidden) showAway();
  refresh(); draw();
}
function showAway(){
  if(awayAcc.v<1){ awayAcc.sec=0; awayAcc.v=0; return; }
  const sec=awayAcc.sec, v=awayAcc.v; awayAcc.sec=0; awayAcc.v=0;
  const h=Math.floor(sec/3600),m=Math.floor(sec%3600/60);
  checkGoals(); renderGoal(); const goalTxt=$('#goalN').textContent+($('#goalC').textContent?` (${$('#goalC').textContent})`:'');
  const mins=sec/60, lines=[];
  lines.push(`💤 ${h?h+'시간 ':''}${m}분 동안 꿀잠. 뒹굴 ${fmt(v)} 모음`);
  const pool=[
    ()=>`🐱 고양이가 이불을 ${1+Math.floor(Math.random()*4)}번 뺏어감`,()=>`🗣 잠꼬대로 "치킨"을 ${2+Math.floor(Math.random()*5)}번 외침`,
    ()=>`🚪 엄마가 방문을 ${1+Math.floor(Math.random()*3)}번 열었다 닫음`,()=>`📱 알람을 ${3+Math.floor(Math.random()*6)}번 끔 (기억 안 남)`,
    ()=>'🦶 발이 이불 밖으로 나갔다가 0.3초 만에 귀환',()=>`🐑 양을 ${(50+Math.floor(Math.random()*900)).toLocaleString()}마리까지 셈`,
    ()=>'🌙 꿈에서도 누워 있었음',()=>'🍕 배달 앱을 열었다가 잠듦',()=>`🧸 베개를 ${1+Math.floor(Math.random()*3)}번 껴안음`];
  const n=Math.min(3,1+Math.floor(mins/40)); const picks=pool.sort(()=>Math.random()-.5).slice(0,n); picks.forEach(fn=>lines.push(fn()));
  // visiting cats while away
  const own=Object.keys(S.cats||{}); let gifts=0;
  for(let i=0;i<Math.min(3,Math.floor(mins/20));i++){ if(own.length&&Math.random()<.6){ const c=catDef(own[Math.floor(Math.random()*own.length)]); const g=Math.max(20,worth(30)); add(g); gifts+=g; lines.push(`🎁 ${catGa(c.name)} 놀러 와서 선물을 두고 감 (+${fmt(g)})`); } }
  if(mins>=30&&!guest){ nextGuest=Date.now()+8000; lines.push('🐾 창밖에 처음 보는 발자국이... 곧 누가 올 것 같다'); }
  const btns=[['계속 눕기',null]];
  if(window.__tossAd&&window.__tossAd.rewarded&&v>=10){ btns.unshift(['📺 광고 보고 2배',()=>{ window.__tossAd.rewarded().then(ok=>{ if(ok){ add(v); refresh(); draw(); save(); sfx('buy'); sayText('광고 보상 +'+fmt(v)+' 뒹굴!',3000); } else sayText('광고가 아직 준비 안 됐어요. 잠시 후 다시!',2500); }); }]); }
  modal('📔',`이불 일기 · ${new Date().getMonth()+1}월 ${new Date().getDate()}일`,lines.join('\n')+`\n\n🎯 다음 목표: ${goalTxt}`,btns,'story');
}
function frame(t){ drawScene(t); requestAnimationFrame(frame); }
const SAYS=['5분만...','오늘은 쉬는 날이야','일어나면 손해야','이불이 나를 놓아주지 않아','누가 나 좀 깨워줘... 아니 깨우지 마','침대가 나를 사랑해','지구 중력이 너무 세','내일의 내가 하겠지','여기가 천국이다','움직이면 이불 온도 깨진다고','배고프다... 근데 귀찮다','5분이 원래 1시간 아니었나?'];
const SAYS_CAT=['고양이가 허락 안 해줌','냥이야 나 화장실...','고양이 무게 = 일어날 수 없는 무게'];
let sayT;
function hideSay(){ $('#say').classList.remove('show'); }
let sayAt=0;
function sayText(txt,ms,low){ if(evOn||tutStep>=0) return; const now=Date.now(); if(low&&now-sayAt<2500) return; if(!low&&now-sayAt<900){ setTimeout(()=>sayText(txt,ms,true),1600); return; } sayAt=now; const el=$('#say'); el.textContent=txt; el.classList.remove('show'); void el.offsetWidth; el.classList.add('show'); clearTimeout(sayT); sayT=setTimeout(hideSay,ms||3200); }
function burst(x,y,c,n){ for(let i=0;i<(n||10);i++) particles.push({x,y,vx:(Math.random()-.5)*1.8,vy:-Math.random()*1.6-.3,life:16+Math.random()*8,c:i%3===0?C.white:c}); }
function say(){ if(evOn||tutStep>=0||Date.now()-sayAt<6000) return; sayAt=Date.now(); const pool=has('cat')&&Math.random()<.35?SAYS_CAT:SAYS; const el=$('#say'); el.textContent=pool[Math.floor(Math.random()*pool.length)]; el.classList.add('show'); clearTimeout(sayT); sayT=setTimeout(hideSay,3500); }
setInterval(()=>{ if(Math.random()<.6) say(); },14000);
let moodI=0;
setInterval(()=>{ moodI=(moodI+1+Math.floor(Math.random()*3))%MOODS.length; $('#mood').textContent=(has('cat')&&Math.random()<0.3)?MOODS_CAT[Math.floor(Math.random()*3)]:(Date.now()<rainUntil&&Math.random()<0.4?'빗소리 들으면서 뒹굴는 중. 최고':MOODS[moodI]); },7000);
$('#resetBtn').addEventListener('click',()=>{
  modal('⚠️','정말 처음부터 할까요?','뒹굴, 장비, 특수 아이템은 물론 꿈 조각, 업적, 칭호, 출석 기록까지 전부 사라져요. 되돌릴 수 없어요. (환생은 꿈나라 탭에서)',[
    ['그냥 누워있기',null,true],
    ['전부 지우기',()=>{
      const keep={mute:S.mute,bgmOff:S.bgmOff};
      for(const k of Object.keys(S)) delete S[k];
      const d=new Date();
      Object.assign(S,freshState(),keep,{lastDay:`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`,streak:1});
      boostEnd=0; tapBoostEnd=0; outUntil=0; outType=''; deepUntil=0; gold=null; guest=null; nextGuest=Date.now()+90000; combo=0; particles=[]; if(evOn) hideEvent(); buildCos(); renderGoal();
      save(); refresh(); draw(); toast('새 이불, 새 마음'); setTimeout(()=>tutGo(0),500);
    }]]);
});
$('#expBtn').addEventListener('click',openExport);
$('#impBtn').addEventListener('click',openImport);
$('#ioClose').addEventListener('click',closeIO);
$('#saveWarn').addEventListener('click',openExport);

$('#phoneChip').addEventListener('pointerdown',e=>{ e.stopPropagation(); openInbox(); });
load(); fix(); buildList(); buildCos(); buildCats(); renderGoal();
if(loadBroken) setTimeout(()=>toast('저장된 기록이 손상돼서 새로 시작해요 (원본은 따로 보관했어요)'),800);
const awaySec=(Date.now()-S.t)/1000;
if(awaySec>30&&S.total>0) awayGain(awaySec);
lastWall=Date.now(); refresh(); draw();
soundIcon();
if(!S.tut) setTimeout(()=>tutGo(0),400);
function newDayCheck(atLoad){
  const d=new Date(), today=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
  if(S.lastDay===today) return;
  const y=new Date(d-86400000), yest=`${y.getFullYear()}-${y.getMonth()+1}-${y.getDate()}`;
  const first=!S.lastDay; S.streak = S.lastDay===yest ? (S.streak||0)+1 : 1; S.lastDay=today; S.attendDays=(S.attendDays||0)+1;
  if(first){ save(); return; }
  const extra=S.attendDays===3?' · 곰인형 소품 획득!':S.attendDays===5?' · 줄무늬 잠옷 획득!':S.attendDays===7?' · 무지개 이불 획득!':'';
  const v=Math.max(100,worth(1800))*Math.min(S.streak,7);
  setTimeout(()=>{ add(v); modal('🛏️',`출석 ${S.attendDays}일째 (연속 ${S.streak}일)`,`오늘도 침대로 돌아왔군요. 출석 보상 +${fmt(v)} 뒹굴${extra}${S.streak<7?'\n(연속 출석할수록 보상이 커져요, 최대 7배)':''}`,[['받기',()=>{ sfx('buy'); checkCos(); }]]); refresh(); draw(); save(); },atLoad&&awaySec>30?600:200);
}
newDayCheck(true);
requestAnimationFrame(frame);
setInterval(tick,100); setInterval(refresh,300); setInterval(()=>{ checkAch(); checkCos(); checkGoals(); checkMissions(); updateGuest(); },1000); setInterval(()=>newDayCheck(false),60000); setInterval(save,5000);
document.addEventListener('visibilitychange',()=>{ if(document.hidden) save(); else setTimeout(showAway,300); });

/* ---- 타이틀 로고: 위로 길쭉한 손그림 픽셀 글씨 ---- */
const LOGO_G={"뒹":["####..#","#.....#","####..#","......#","#####.#","..#...#","..#...#","......#",".......","..###..",".#...#.",".#...#.","..###.."],"굴":["#######","......#","......#",".......","#######","...#...","...#...",".......","#######","......#","#######","#......","#######"],"타":[".....#.",".....#.","####.#.","#....#.","#....#.","#....#.","####.##","#....#.","#....#.","#....#.","####.#.",".....#.",".....#."],"이":[".....#.",".....#.",".....#.",".##..#.","#..#.#.","#..#.#.","#..#.#.","#..#.#.","#..#.#.",".##..#.",".....#.",".....#.",".....#."],"쿤":["######.",".....#.","######.",".....#.",".......","#######","...#...","...#...",".......","#......","#......","#......","#######"]};
(function drawLogo(){
  const cv=document.getElementById('logo'); if(!cv) return;
  const words=['뒹굴뒹굴','타이쿤'], gw=7, gh=13, gap=1.5, wgap=4, U=2, pad=2;
  let w=0; words.forEach((wd,i)=>{ const n=[...wd].length; w+=n*gw+(n-1)*gap; if(i) w+=wgap; });
  cv.width=Math.ceil(w*U)+pad*2; cv.height=gh*U+pad*2+2;
  const x=cv.getContext('2d'); const pts=[];
  let cx=0; words.forEach((wd,i)=>{ if(i) cx+=wgap; [...wd].forEach((ch,j)=>{ if(j) cx+=gap;
    LOGO_G[ch].forEach((row,ry)=>{ for(let rx=0;rx<gw;rx++) if(row[rx]==='#') pts.push([pad+Math.round((cx+rx)*U),pad+ry*U,ry]); }); cx+=gw; }); });
  x.fillStyle='#1a1c2c'; pts.forEach(([a,b])=>x.fillRect(a-1,b-1,U+2,U+3));
  x.fillStyle='#8a2f45'; pts.forEach(([a,b])=>x.fillRect(a,b+2,U,U));
  pts.forEach(([a,b,ry])=>{ x.fillStyle=ry>=10?'#ef9a57':'#ffcd75'; x.fillRect(a,b,U,U); });
  x.fillStyle='#fff6d6'; pts.forEach(([a,b,ry])=>{ if(ry===0) x.fillRect(a,b,U,1); });
})();

/* ---- 시작 코드(원스토어 등)가 부르는 창구. 이름이 요소 id와 겹치지 않게 게임 이름으로 ---- */
window.DunggulTycoon={
  // 즉시 끝나는 저장(localStorage). 종료 직전에 불려도 안전
  save(){ try{ return save(); }catch(e){ return false; } },
  // 광고·결제·백그라운드로 일시정지/재개. 생산은 실제 시간 기준이라 소리만 멈추고 기록을 저장
  setPaused(p){
    p=!!p; if(sysPaused===p) return; sysPaused=p;
    if(p){ try{ save(); }catch(e){} }
    else { try{ if(AC&&AC.state==='suspended'&&!S.mute) AC.resume(); }catch(e){} }
    try{ bgmSync(); }catch(e){}
  },
  // 기기 무음 모드
  setSilent(s){ sysSilent=!!s; try{ bgmSync(); }catch(e){} },
  // 뒤로가기: 게임 안 창을 닫았으면 true. 반드시 동기
  back(){
    if($('#ioModal').classList.contains('show')){ closeIO(); return true; }
    if($('#modal').classList.contains('show')){
      const bs=[...$('#mRow').querySelectorAll('button')];
      const b=bs.find(x=>x.classList.contains('sec'))||bs[bs.length-1];
      if(b){ b.click(); return true; }
    }
    return false;
  },
};
