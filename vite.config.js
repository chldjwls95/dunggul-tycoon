import { defineConfig } from 'vite';

// 원스토어판: `--mode onestore`로 빌드/실행할 때만 index.html을 원스토어용으로 바꿈
// (토스판 빌드 결과는 그대로)
// - 시작 코드를 src/toss-boot.js → src/onestore-boot.js 로 교체
// - 노치 대응(viewport-fit=cover), 모바일 높이(100dvh), 튕김 방지, 원스토어 safeArea 값 반영
const ONESTORE_CSS = `<style>
/* 원스토어판 전용 화면 설정. --sa-* 값은 src/onestore-boot.js가 SDK의 safeArea로 채움 */
html,body{overscroll-behavior:none}
body{min-height:100vh;min-height:100dvh}
.event{max-height:calc(100dvh - 120px);bottom:calc(14px + max(env(safe-area-inset-bottom),var(--sa-bottom,0px)))}
.app{padding-top:calc(16px + max(env(safe-area-inset-top),var(--sa-top,0px)));padding-bottom:calc(60px + max(env(safe-area-inset-bottom),var(--sa-bottom,0px)));padding-left:calc(14px + var(--sa-left,0px));padding-right:calc(14px + var(--sa-right,0px))}
.toast{top:calc(10px + max(env(safe-area-inset-top),var(--sa-top,0px)))}
.coach{bottom:calc(18px + max(env(safe-area-inset-bottom),var(--sa-bottom,0px)))}
#ratingBadge{top:calc(8px + max(env(safe-area-inset-top),var(--sa-top,0px)))!important}
</style>
`;

function onestoreHtml() {
  return {
    name: 'onestore-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!html.includes('/src/toss-boot.js')) throw new Error('index.html에서 /src/toss-boot.js를 찾지 못했어요');
        return html
          .replace('/src/toss-boot.js', '/src/onestore-boot.js')
          // 글꼴 경로를 상대 경로로: 하위 경로(예: GitHub Pages의 /저장소이름/)에 올려도 찾을 수 있게
          .replaceAll("url('/fonts/", "url('fonts/")
          .replace(/(<meta name="viewport" content="[^"]*?)"/, (m, a) => (a.includes('viewport-fit') ? m : a + ', viewport-fit=cover"'))
          .replace('</head>', ONESTORE_CSS + '</head>');
      },
    },
    // 호스팅(Netlify·Cloudflare Pages)용 응답 헤더: 원스토어 화면(등록 검증 도구 포함)에서만 게임을 끼워 넣을 수 있게 허용
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: '_headers',
        source: '/*\n  Content-Security-Policy: frame-ancestors https://*.onestore.co.kr https://*.onestore.net\n',
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const onestore = mode === 'onestore';
  return {
    // 원스토어판은 상대 경로(./)로 빌드: 사이트 맨 위 주소든 하위 경로든 그대로 동작
    base: onestore ? './' : '/',
    plugins: onestore ? [onestoreHtml()] : [],
    build: { outDir: onestore ? 'dist-onestore' : 'dist', assetsInlineLimit: 0 },
  };
});
