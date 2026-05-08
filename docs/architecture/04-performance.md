# docs/architecture/04-performance.md - 성능 최적화 전략

사용자 경험(UX) 극대화를 위한 Aigram의 성능 최적화 기법입니다.

## 🚀 렌더링 최적화
- **Server Components**: 자바스크립트 번들 크기를 줄이기 위해 대부분의 정적 컨텐츠를 서버 컴포넌트로 구현.
- **Streaming**: `loading.js`와 `Suspense`를 활용하여 중요한 컨텐츠(피드)를 먼저 보여주고 무거운 컴포넌트는 나중에 로드.

## 🖼 이미지 및 미디어 최적화
- **Next/Image**: `WebP` 변환, 지연 로딩(Lazy Loading), 화면 크기에 맞는 리사이징 자동화.
- **Video Preloading**: 릴스/스토리 진입 전 썸네일을 먼저 보여주고 실제 비디오는 사용자가 도달했을 때 재생.

## 💾 캐싱 전략
- **Full Route Cache**: 자주 바뀌지 않는 프로필 페이지 등을 서버에 캐싱.
- **Request Memoization**: 한 번의 렌더링 사이클 동안 중복된 API 요청 제거.
- **Data Revalidation**: 신규 게시물 작성 시 `revalidatePath`를 통해 캐시 갱신.

## 📉 체감 속도 (Perceived Performance)
- **Skeleton UI**: 로딩 중 레이아웃 흔들림 방지.
- **Optimistic UI**: 네트워크 지연 시간 무시.
- **Prefetching**: 유저가 클릭할 가능성이 높은 링크(다음 스토리 등)를 미리 백그라운드에서 로드.
