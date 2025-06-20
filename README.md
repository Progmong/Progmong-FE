# Progmong FE – 디렉토리 구조 안내

> **Progmong FE**는 React 19 + Vite 6 기반의 프론트엔드 레포지토리다.  
> 스타일은 **styled-components** 중심으로 작성하고, 전역 CSS 변수·리셋은 별도 `Styles` 폴더에 분리하였다.  
> 코드 품질을 위해 **ESLint + Prettier + Commitlint + Husky**를 사용하며, 자동 import·아이콘 플러그인도 Vite에 적용했다. 

## 1. 프로젝트 트리
      
```
Progmong-FE
├─ .github/                  # GitHub Actions·Issue 템플릿 등 CI/CD 설정
├─ .husky/                   # Git hook 스크립트 (commit-msg 등)
├─ public/                   # 정적 자산(HTML 템플릿·파비콘 등)
│   └─ favicon.ico
├─ src/                      # 애플리케이션 소스
│   ├─ assets/               # 이미지·폰트·오디오 등 정적 리소스
│   │   └─ fonts/            # Binggrae 서체 (variables.css에서 사용)
│   ├─ components/           # 재사용 UI 컴포넌트
│   │   └─ BaseButton.jsx
│   ├─ hooks/                # 커스텀 React Hook
│   │   └─ useNeonColor.js
│   ├─ pages/                # 라우팅 단위 페이지
│   │   └─ ExamplePage.jsx
│   ├─ router/               # react-router v7 설정 모듈
│   │   └─ routes.jsx
│   ├─ Styles/               # 전역 스타일
│   │   ├─ reset.css
│   │   ├─ base.css
│   │   └─ variables.css
│   ├─ App.jsx               # 최상위 UI 컴포넌트
│   └─ main.jsx              # 앱 엔트리 (React DOM 마운트)
├─ .eslintrc-auto-import.json
├─ eslint.config.js          # Flat Config 방식 ESLint 설정
├─ commitlint.config.js      # Conventional Commits 규칙
├─ .prettierrc.json          # Prettier 코드 포맷 규칙
├─ vite.config.js            # Vite 플러그인·별칭·CSS 설정
├─ package.json              # 의존성·스크립트 정의
└─ README.md
```

## 2. 주요 폴더 상세

| 경로                  | 용도                                                                                                                                                |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`.github/`**        | GitHub Actions 워크플로, Issue/PR 템플릿을 저장한다. CI·배포 자동화를 이곳에서 정의한다.                                                            |
| **`.husky/`**         | `husky install` 이후 생성되는 Git hook. `commit-msg` 훅으로 Commitlint를 실행해 커밋 메시지 규칙을 강제한다.                                        |
| **`public/`**         | Vite가 빌드 시 그대로 복사하는 정적 파일. 최상위 `index.html` 템플릿이 이곳에 위치하며, 파비콘·OG 이미지를 함께 둔다.                               |
| **`src/assets/`**     | 런타임에 import 하거나 URL로 접근할 정적 리소스. 현재는 Binggrae 서체가 포함된다.                                                                   |
| **`src/components/`** | 프레젠테이션 & 재사용 목적의 UI 컴포넌트. 예) `BaseButton.jsx`—전역 네온 버튼 스타일.                                                               |
| **`src/hooks/`**      | 커스텀 Hook. 예) `useNeonColor.js`—hover 상태에 따라 네온 컬러를 바꿔준다.                                                                          |
| **`src/pages/`**      | 라우터에 매핑되는 페이지 단위 컴포넌트. 예) `ExamplePage.jsx` – 데모용 페이지.                                                                      |
| **`src/router/`**     | `react-router-dom` v7의 경로 정의를 한 곳에 모은다(`routes.jsx`).                                                                                   |
| **`src/Styles/`**     | 전역 CSS.<br>• `reset.css` – 브라우저 기본 스타일 초기화.<br>• `variables.css` – 색상·폰트·여백 변수 정의.<br>• `base.css` – HTML 태그 기본 스타일. |

## 3. 설정 파일 요약

| 파일                             | 역할                                                                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`package.json`**               | 스크립트: `dev`, `build`, `lint`, `format`, `preview`, `postinstall`. 의존성: React 19, Vite 6, styled-components, Tailwind CSS(실험), Husky 등. |
| **`vite.config.js`**             | • `@vitejs/plugin-react-swc`로 HMR 적용<br>• `unplugin-auto-import`, `unplugin-icons` 설정<br>• 경로 별칭 `@` → `/src`                           |
| **`eslint.config.js`**           | Flat Config 기반 ESLint. Prettier·React Hook 규칙 포함.                                                                                          |
| **`commitlint.config.js`**       | Conventional Commits 프리셋으로 커밋 메시지 linting.                                                                                             |
| **`.eslintrc-auto-import.json`** | 자동 import된 전역 심벌을 ESLint에 알려 경고를 방지.                                                                                             |
| **`.prettierrc.json`**           | 세미콜론 ❌, 싱글 쿼트 ✅, `printWidth 100` 등 코드 포맷 지정.                                                                                   |

## 4. 개발·배포 흐름

1. **로컬 개발**

   ```bash
   npm install       # postinstall → husky install
   npm run dev       # Vite 로컬 서버 (HMR)
   ```

2. **커밋**

   ```bash
   git commit        # Husky → commitlint 실행, 규칙 위반 시 커밋 차단
   ```

3. **정적 코드 검사 & 포맷**

   ```bash
   npm run lint      # ESLint 캐시 모드
   npm run format    # Prettier 일괄 포맷
   ```

4. **빌드 & 미리보기**

   ```bash
   npm run build     # /dist 생성
   npm run preview   # 빌드 결과 로컬 서버 확인
   ```

---

이 README는 **2025-06-20** 기준 **main** 브랜치의 구조를 토대로 작성됐다.  
이후 디렉토리나 설정 파일이 변경될 수 있으므로, 최신 내용은 레포지토리 트리를 확인하기 바란다.
