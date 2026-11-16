# 뒹굴뒹굴 타이쿤 · 앱인토스(토스 미니앱) 프로젝트

게임 내용은 웹 버전(2026-11-02 최신판)과 똑같고, 토스용으로 세 가지만 달라요.

- **저장:** 브라우저 저장 + 토스 앱 저장소에 함께 저장돼요. 토스 저장소 호출은 5초에 한 번만 해요(과도한 호출 방지). 앱을 내릴 때는 바로 저장해요.
- **화면:** 토스 상단 바·아이폰 노치에 가리지 않게 위아래 여백을 줬어요.
- **글꼴:** `public/fonts/`에 글꼴 파일을 넣으면 외부 요청 없이 동작해요(아래 2번 참고). 파일이 없으면 Google Fonts에서 받아와요.

## 폴더 구성

| 파일 | 하는 일 |
|---|---|
| `index.html` | 게임 화면 |
| `public/game.js` | 게임 본체 (수정하지 않아도 됨) |
| `src/toss-boot.js` | 토스 저장소 불러오기 → 게임 시작 |
| `apps-in-toss.config.ts` | 앱인토스 설정 (appName, 대표 색) |
| `package.json`, `vite.config.js` | 빌드 설정 |

## 1. 콘솔에 미니앱 등록 (먼저)

1. 앱인토스 콘솔 가입 → 워크스페이스 만들기 → 미니앱 등록 (카테고리: 게임)
2. 등록한 **앱 이름(영문 ID)** 을 `apps-in-toss.config.ts`의 `appName`에 그대로 적어요. 다르면 업로드가 안 돼요.

## 2. 글꼴 파일 넣기 (권장)

Google Fonts에서 두 글꼴을 내려받아 `public/fonts/`에 아래 이름으로 넣어요.
- `Silkscreen-Regular.woff2` (Silkscreen)
- `DoHyeon-Regular.woff2` (Do Hyeon)

두 글꼴 모두 SIL Open Font License라 게임에 넣어 배포해도 돼요.
(터미널이 편하면: `npx google-fonts-helper`류 대신 fonts.google.com 에서 Download 후 ttf → woff2 변환, 또는 `npm i @fontsource/silkscreen @fontsource/do-hyeon` 후 `node_modules/@fontsource/*/files/*-400-normal.woff2`를 복사)

## 3. 내 컴퓨터에서 빌드

준비물: Node.js LTS

```sh
npm install
npx ait init        # 설정 파일을 새로 만들자고 하면 "기존 파일 유지"
npm run dev         # 브라우저 오른쪽 아래 AIT 버튼으로 토스 환경 미리보기
npm run build       # dist/ 생성
```

빌드 결과를 콘솔에 업로드 → 토스 앱에서 QR로 직접 테스트 → 출시 요청.

## 4. 출시 전 직접 할 일

- [ ] **게임 등급분류**: 전체이용가 수준 → 게임물관리위원회 간소화 신청(수수료 있음) 또는 앱스토어 등급 활용. 접속 화면에 등급 표시 필요.
- [ ] 개인정보처리방침 (개인정보를 모으지 않는다는 내용이라도 준비)
- [ ] 광고 수익화: 콘솔에 사업자(지니바이브) 정보 등록 → 광고 ID 발급

## 5. 토스 앱에서 꼭 확인할 것

- 오른쪽 위 닫기(X)가 보이고 동작하는지
- 안드로이드 뒤로가기로 나갈 수 있는지
- 아이폰 노치·다이내믹 아일랜드에 안 가리는지
- 앱 내리고 돌아왔을 때 소리·기록이 유지되는지

## 다음 단계 (광고)

출시 후 반응이 있으면 보상형 광고를 넣어요: "광고 보고 오프라인 보상 2배" 버튼. 앱인토스 광고 SDK(`@apps-in-toss/web-framework`의 광고 API)를 `src/`에 붙이면 되고, 게임 쪽은 `game.js`의 오프라인 보상 함수에 배수만 넘기면 돼요.

## 광고 ID 교체 (출시 전 필수)
`src/toss-boot.js` 맨 위 `AD_GROUP_ID`가 테스트용(`ait-ad-test-rewarded-id`)으로 되어 있어요. 콘솔 > 수익화 > 인앱 광고에서 **보상형 광고 그룹**을 만들고 그 ID로 바꾼 뒤 빌드하세요. 테스트 중에 실제 ID를 쓰면 정책 위반으로 잡힐 수 있어요. 보상은 `userEarnedReward` 이벤트에서만 지급되도록 되어 있어요.
