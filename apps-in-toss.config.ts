import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'dunggul-tycoon', // ← 앱인토스 콘솔에 등록한 앱 이름과 똑같이 바꿔야 해요
  brand: {
    displayName: '뒹굴뒹굴 타이쿤',
    primaryColor: '#FFCD75',
    icon: '', // 콘솔에 올린 아이콘 URL (선택)
  },
  webView: {
    bounces: false,
    pullToRefreshEnabled: false,
  },
  permissions: [],
  webBundleDir: 'dist',
});
