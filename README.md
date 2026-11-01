# DeepFence

> 올리기 전에 DeepFence가 먼저 살펴볼게요

SNS에 사진을 올리기 전에 **얼굴에는 딥페이크 방어 노이즈를 입히고**, **차량 번호·신분증 같은 개인정보는 블러 처리**해 주는 모바일 웹 서비스입니다.
보호한 뒤에도 새로운 딥페이크 모델이 나와 기존 보호가 뚫리면 **취약해진 사진을 알려 주고 재점검**하게 합니다.

이 저장소는 DeepFence의 **프론트엔드(Next.js)** 입니다.

- 서비스: https://www.deepfence.site
- API 서버: `https://api.deepfence.site` ([Swagger](https://api.deepfence.site/swagger-ui/index.html))

---

## 목차

1. [문제 정의 및 목표 사용자](#1-문제-정의-및-목표-사용자)
2. [해결 방안 및 주요 기능](#2-해결-방안-및-주요-기능)
3. [활용 AI 기술 및 직접 개발 범위](#3-활용-ai-기술-및-직접-개발-범위)
4. [개발 환경 및 기술 스택](#4-개발-환경-및-기술-스택)
5. [실행 방법](#5-실행-방법)
6. [팀원별 역할 분담 및 협업 방식](#6-팀원별-역할-분담-및-협업-방식)
7. [외부 자원 활용 내역](#7-외부-자원-활용-내역)
8. [기대 효과 및 확장 가능성](#8-기대-효과-및-확장-가능성)
9. [현재 한계](#9-현재-한계)

---

## 1. 문제 정의 및 목표 사용자

### 해결하려는 문제

| 문제                  | 설명                                                                                                        |
| --------------------- | ----------------------------------------------------------------------------------------------------------- |
| 딥페이크 합성         | SNS에 공개한 얼굴 사진 몇 장만으로 AI가 얼굴을 합성할 수 있습니다. 한 번 올린 사진은 회수하기 어렵습니다.   |
| 사진 속 개인정보 노출 | 차량 번호판, 신분증, 간판·주소처럼 나를 특정할 수 있는 단서가 사진에 함께 찍혀 올라갑니다.                  |
| 보호의 유효기간       | 오늘 안전했던 보호 방식도 새로운 생성 모델이 나오면 무력화될 수 있습니다. 사용자는 이를 알 방법이 없습니다. |

### 목표 사용자

- 일상 사진을 SNS·커뮤니티에 자주 올리는 사용자
- 얼굴이 노출되는 직업(크리에이터, 강사 등)이라 딥페이크 피해 위험이 큰 사용자
- 자녀·가족 사진을 공유하는 보호자

## 2. 해결 방안 및 주요 기능

사진을 올리기 **전**에 한 번 거치는 보호 단계를 제공하고, 올린 **후**에도 계속 관리합니다.

```
사진 선택 → 1:1 편집 → 등록 → 보호 처리(얼굴 노이즈 + 개인정보 블러)
        → 필터링 전/후 비교 → 저장·공유
        → 새 취약점 발견 시 알림 → 재점검
```

| 기능               | 내용                                                                         | 화면               |
| ------------------ | ---------------------------------------------------------------------------- | ------------------ |
| 카카오 간편 로그인 | 온보딩 슬라이드 후 카카오 계정으로 시작                                      | `/`                |
| 사진 등록          | 앨범·카메라에서 사진을 고르고 1:1 자르기, 회전, 좌우 반전 후 등록            | `/photo/edit`      |
| 보호 현황 홈       | 취약점 발생 / 모델링 진행중 / 전체 목록을 상태 배지와 함께 표시, 무한 스크롤 | `/home`            |
| 필터링 전·후 비교  | 원본과 보호 처리된 사진을 탭으로 비교하고 보호 결과 안내                     | `/photo/[photoId]` |
| 저장·공유          | 보호된 사진 다운로드, 링크 공유(Web Share API, 미지원 시 링크 복사)          | 상세               |
| 재점검             | 취약해진 사진을 다시 보호 처리하도록 요청                                    | 상세               |
| 취약점 알림        | 보호 완료, 처리 오류, 새 취약점 발견 알림 목록                               | `/notifications`   |
| 내 정보            | 프로필, 알림 권한, 로그아웃, 회원 탈퇴                                       | `/myPage`          |

## 3. 활용 AI 기술 및 직접 개발 범위

### AI 기술 (백엔드·AI 서버)

<!-- TODO: AI 담당자가 실제 모델·알고리즘·적용 방식으로 채워 주세요 -->

| 영역                       | 적용 방식                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| 딥페이크 방어 (FaceShield) | 얼굴 영역에 사람 눈에는 보이지 않는 적대적 노이즈를 입혀 생성 모델이 얼굴을 학습·합성하지 못하게 함 |
| 개인정보 블러              | 번호판, 신분증, 간판 등 식별 단서를 검출해 블러 처리                                                |
| 취약점 추적                | 새 딥페이크 모델에 대해 기존 보호가 유효한지 점검하고, 취약해진 사진을 사용자에게 알림              |

### 프론트엔드 직접 개발 범위 (이 저장소)

외부 템플릿이나 사전 보유 코드 없이 대회 기간 중 직접 구현했습니다.

- **사진 편집기**: `react-easy-crop`으로 자르기 영역만 받고, 회전·반전·원본 해상도 크롭·JPEG 출력은 Canvas로 직접 구현 (`src/utils/image.ts`, `src/hooks/photo/usePhotoEditor.ts`)
- **S3 Presigned URL 업로드**: `presigned-url 발급 → S3 직접 PUT → 업로드 완료 통보` 3단계 흐름 (`src/apis/photo/upload.ts`)
- **재점검**: 상세 조회로 받은 원본 `objectKey`로 업로드 완료 통보를 다시 보내 보호 처리를 재시작 (`src/apis/photo/api.ts`)
- **쿠키 기반 인증 클라이언트**: `fetch` 래퍼에서 401 응답 시 토큰 재발급을 한 번만 요청(single-flight)하고 실패한 요청을 재시도 (`src/lib/api/http-client.ts`)
- **상태 배지 산출**: 전체 목록 API에 상태값이 없어, 진행중·취약 목록과 비교해 배지를 계산하고 상세 진입 전 보호 이미지 유무를 확인 (`src/app/(main)/home/page.tsx`)
- **디자인 시스템**: Figma 토큰을 Tailwind CSS v4 테마로 옮기고, Base UI + cva로 공통 컴포넌트 구성, Storybook 스토리와 접근성 검사
- **온보딩 일러스트**: 서비스 기능을 설명하는 SVG 일러스트 직접 제작 (`src/assets/images/onboarding/`)

```mermaid
sequenceDiagram
    participant U as 사용자(브라우저)
    participant F as Front (Next.js)
    participant B as API 서버 (Spring)
    participant S as AWS S3
    U->>F: 사진 선택·편집 후 등록
    F->>B: POST /images/presigned-url
    B-->>F: uploadUrl, objectKey
    F->>S: PUT uploadUrl (이미지)
    S-->>F: 200 OK
    F->>B: POST /images/complete (objectKey)
    B-->>F: 200 OK → 보호 처리 시작
```

## 4. 개발 환경 및 기술 스택

| 구분        | 사용 기술                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------- |
| 언어        | TypeScript 5.9                                                                                |
| 프레임워크  | Next.js 16 (App Router, Turbopack, React Compiler), React 19                                  |
| 상태·데이터 | TanStack Query 5 (서버 상태), Zustand 5 (편집 중 사진)                                        |
| UI          | Tailwind CSS 4, Base UI, class-variance-authority, lucide-react, Pretendard                   |
| 품질        | Oxlint, Oxfmt, TypeScript strict, Storybook 10 + Vitest(브라우저 테스트), Husky + lint-staged |
| CI          | GitHub Actions (PR마다 린트·포맷·타입 검사·빌드)                                              |
| 배포        | Vercel (`main` 브랜치 자동 배포, PR마다 Preview 배포)                                         |
| 인프라      | AWS S3 + CloudFront (이미지), 카카오 OAuth (로그인)                                           |
| 런타임      | Node.js 22 이상, pnpm 11                                                                      |

```
src/
├── app/          # 페이지 (App Router), 공통 loading / error / not-found
├── apis/         # 도메인별 API 함수와 Query Key (auth, user, photo, notification)
├── assets/       # 로고, 온보딩 일러스트 등 이미지
├── components/   # common(공통 UI), home, photo, notification, onboarding
├── const/        # 서비스 공통 상수
├── hooks/        # 도메인별 커스텀 훅
├── lib/api/      # fetch 기반 HTTP 클라이언트
├── store/        # Zustand 스토어 (편집 중 사진, 토스트)
├── styles/       # Tailwind 테마와 디자인 토큰
├── types/        # DTO 타입
└── utils/        # 이미지 처리 등 유틸
```

## 5. 실행 방법

### 사전 준비

- Node.js **22 이상**
- pnpm **11** (`corepack enable`로 활성화 가능)

### 설치

```bash
git clone https://github.com/Codyssey-ROOT/codyssey-front.git
cd codyssey-front
pnpm install
```

### 환경 변수

```bash
cp .env.example .env.local
```

| 변수                       | 설명          | 예시                         |
| -------------------------- | ------------- | ---------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | API 서버 주소 | `https://api.deepfence.site` |

### 실행

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.
로그인 없이도 온보딩 화면은 볼 수 있습니다. 로그인 이후 기능은 아래 로컬 HTTPS 환경에서 확인해 주세요.

### 로그인까지 확인하려면 (로컬 HTTPS)

인증 토큰은 `deepfence.site` 도메인의 HttpOnly 쿠키로 발급됩니다. 브라우저가 쿠키를 보내도록 같은 사이트(`local.deepfence.site`)의 HTTPS로 실행합니다.

1. `/etc/hosts`에 한 줄 추가

   ```
   127.0.0.1 local.deepfence.site
   ```

2. [mkcert](https://github.com/FiloSottile/mkcert)로 인증서 생성

   ```bash
   mkcert -install
   mkdir -p certificates
   mkcert -key-file certificates/local.deepfence.site-key.pem -cert-file certificates/local.deepfence.site.pem local.deepfence.site
   ```

3. 실행 후 `https://local.deepfence.site:3000` 접속

   ```bash
   pnpm dev:local
   ```

### 빌드 및 검사

```bash
pnpm build && pnpm start   # 프로덕션 빌드 후 실행
pnpm lint                  # 린트
pnpm type-check            # 타입 검사
pnpm test                  # Storybook 스토리 테스트 (Vitest + Playwright)
pnpm storybook             # 컴포넌트 문서 (http://localhost:6006)
```

## 6. 팀원별 역할 분담 및 협업 방식

<!-- TODO: 권창범·김민수 담당 업무를 채워 주세요 -->

| 이름   | 역할         | 담당 업무                                                                      |
| ------ | ------------ | ------------------------------------------------------------------------------ |
| 권창범 | AI · Backend |                                                                                |
| 김민수 | AI · Backend |                                                                                |
| 조희우 | Frontend     | 디자인 시스템, 전 화면 UI, 사진 편집·업로드, 인증·이미지 API 연동, Vercel 배포 |

### 협업 방식

- **이슈 기반 개발**: 기능마다 이슈를 만들고 `type/#이슈번호-작업내용` 브랜치에서 작업 (예: `feat/#30-upload-image`)
- **커밋 컨벤션**: `feat: 제목` 형식, Husky가 브랜치의 이슈 번호를 커밋 끝에 자동으로 붙임
- **PR 리뷰**: PR 템플릿(관련 이슈, 구현 내용, 구현 영상, 확인 사항) 작성 후 `develop`에 Squash Merge
- **CI**: 모든 PR에서 린트·포맷·타입 검사·빌드가 통과해야 머지
- **배포**: `develop`에서 검증한 내용을 `main`으로 Merge Commit 하면 Vercel이 운영 환경에 자동 배포
- **문서화**: 폴더 구조, 네이밍, API, 훅, 디자인 시스템, 아이콘, 커밋 규칙을 `.claude/rules/`에 정리하여 팀 공통 기준으로 사용

## 7. 외부 자원 활용 내역

| 구분           | 명칭                                        | 용도                                          | 라이선스                      |
| -------------- | ------------------------------------------- | --------------------------------------------- | ----------------------------- |
| 오픈소스       | Next.js 16.4                                | 웹 프레임워크                                 | MIT                           |
| 오픈소스       | React 19.3                                  | UI 라이브러리                                 | MIT                           |
| 오픈소스       | TanStack Query 5.105                        | 서버 상태 관리, 무한 스크롤                   | MIT                           |
| 오픈소스       | Zustand 5.0                                 | 클라이언트 상태 관리                          | MIT                           |
| 오픈소스       | Base UI 1.9                                 | 접근성 기반 UI 컴포넌트(다이얼로그, 탭, 토글) | MIT                           |
| 오픈소스       | react-easy-crop 6.2                         | 사진 자르기 영역 선택                         | MIT                           |
| 오픈소스       | Tailwind CSS 4.3, tw-animate-css 1.4        | 스타일링, 애니메이션                          | MIT                           |
| 오픈소스       | class-variance-authority 0.7                | 컴포넌트 변형 스타일                          | Apache 2.0                    |
| 오픈소스       | lucide-react 1.63                           | 아이콘                                        | ISC                           |
| 오픈소스       | Pretendard 1.3                              | 폰트                                          | OFL 1.1                       |
| 오픈소스       | shadcn 4.23                                 | 컴포넌트 구성 CLI                             | MIT                           |
| 오픈소스       | Storybook 10.6, Vitest 4.1, Playwright 1.64 | 컴포넌트 문서화, 테스트                       | MIT / MIT / Apache 2.0        |
| 오픈소스       | Oxlint 1.90, Oxfmt 0.75, Husky 9.1          | 린트, 포맷, Git 훅                            | MIT                           |
| 외부 API       | 카카오 로그인 (OAuth 2.0)                   | 소셜 로그인                                   | 상용 API (카카오 개발자 약관) |
| 외부 API       | AWS S3, CloudFront                          | 이미지 업로드·저장·배포                       | 상용 API                      |
| 외부 서비스    | Vercel                                      | 프론트엔드 호스팅, 자동 배포                  | 상용                          |
| 사전 보유 코드 | 해당 없음                                   | 첫 커밋 2026-10-30 12:46 (주제 공개 이후)     | -                             |
| 기타           | Figma                                       | UI 디자인, 디자인 토큰                        | 상용                          |
| 기타           | Claude Code (Anthropic)                     | AI 코딩 보조 도구                             | 상용                          |

<!-- TODO: 백엔드·AI 서버에서 쓴 모델, 오픈소스, 외부 API도 같은 표에 추가해 주세요 -->

## 8. 기대 효과 및 확장 가능성

### 기대 효과

- **예방 중심 보호**: 피해가 생긴 뒤 신고·삭제하는 대신, 사진이 퍼지기 전에 합성과 신상 노출을 막습니다.
- **쉬운 사용**: 사진 한 장을 고르면 얼굴 보호와 개인정보 블러가 함께 처리되어, 보안 지식이 없어도 쓸 수 있습니다.
- **지속적인 관리**: 새 딥페이크 모델이 나오면 이미 올린 사진까지 다시 점검하여 "보호의 유효기간" 문제를 줄입니다.

### 확장 방향

- **모바일 앱·공유 확장**: 갤러리 공유 시트에서 바로 보호 후 SNS로 업로드
- **푸시 알림**: FCM 토큰 등록 API를 연동해 취약점 발견을 실시간으로 알림
- **일괄 처리**: 여러 장을 한 번에 보호하고, 취약 사진을 한 번에 재점검
- **기관·기업용**: 학교·기관 홍보 사진, 커뮤니티 업로드 단계에 보호 API로 연동

## 9. 현재 한계

- 사진 삭제 API가 아직 없어 삭제 버튼은 실패 안내만 표시합니다.
- 재점검은 별도 API 없이 업로드 완료 통보를 다시 보내는 방식으로 동작합니다.
- 알림 목록은 알림 API가 준비되기 전까지 예시 데이터로 표시합니다.
- 알림 토글은 브라우저 알림 권한만 요청하며, 푸시 구독(FCM)은 연동 예정입니다.
- 회원 탈퇴(`DELETE /users/me`)는 API가 준비되어 있으나 아직 연결하지 않았습니다.
