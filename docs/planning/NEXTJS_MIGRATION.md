# docs/planning/NEXTJS_MIGRATION.md - Next.js App Router 마이그레이션 결과 보고서

Vite/React SPA 환경에서 Next.js 14 App Router로 전환한 과정과 그에 따른 기술적 이점을 정리합니다.

## 📈 마이그레이션 주요 성과

### 1. SEO (검색 엔진 최적화) 및 AEO (AI 답변 엔진 최적화) 강화
- **기존 문제**: 클라이언트 사이드 렌더링(CSR) 특성상 자바스크립트 실행 전까지 빈 페이지가 노출되어 검색 엔진 크롤링에 불리했음.
- **개선 결과**:
  - **Server-Side Rendering (SSR)**: 모든 게시물 상세 페이지(`p/[id]`)를 서버에서 미리 렌더링하여 검색 로봇이 즉시 인덱싱 가능.
  - **Dynamic Metadata**: `generateMetadata` API를 사용하여 게시물의 본문과 해시태그를 기반으로 고유한 `<title>`, `<meta description>`을 실시간 생성.
  - **JSON-LD (Structured Data)**: Schema.org 표준에 맞춘 구조화 데이터를 삽입하여 ChatGPT, Perplexity 등 AI 답변 엔진이 컨텐츠의 맥락(작성자, 이미지, 좋아요 수 등)을 정확히 파악하도록 최적화.

### 2. 성능 및 사용자 경험 (UX) 향상
- **이미지 최적화**: `next/image`를 도입하여 디바이스 크기에 맞는 최적의 이미지 서빙 및 WebP 변환 자동화.
- **하이드레이션 전략**: 서버 컴포넌트를 최대한 활용하여 클라이언트로 전송되는 JS 번들 크기를 획기적으로 절감.
- **부드러운 네비게이션**: App Router의 인터셉팅 라우트(Intercepting Routes) 등을 고려한 설계로 인스타그램 특유의 모달 기반 상세 페이지 전환 기틀 마련.

## 🛠 아키텍처 변화
- **Routing**: `react-router-dom` 기반에서 파일 시스템 기반의 `app/` 디렉토리 구조로 전환.
- **Data Fetching**: `useEffect` 기반 페칭에서 서버 컴포넌트의 `async/await` 및 `fetch` 캐싱 전략으로 변경.
- **State Management**: 전역 상태는 Context API를 유지하되, 서버 사이드 데이터는 최대한 서버 컴포넌트에서 직접 처리하여 상태 복잡도 감소.

## 🚀 향후 기대 효과
- **AEO 가독성**: AI 에이전트가 우리 서비스의 게시물을 신뢰도 높은 정보원으로 인식하여 답변에 인용될 확률 증가.
- **초기 로딩 속도 (LCP)**: 서버에서 이미 구성된 HTML을 전송하므로 첫 화면 로딩 속도가 획기적으로 개선됨.
