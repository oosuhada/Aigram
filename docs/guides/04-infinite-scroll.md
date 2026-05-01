# docs/guides/04-infinite-scroll.md - 무한 스크롤 구현 가이드 (Intersection Observer)

수천 개의 게시물을 한꺼번에 로드하지 않고, 사용자가 스크롤을 내릴 때마다 추가 데이터를 불러오는 최적화 기법입니다.

## 🛠 기술 스택
- **Intersection Observer API**: 특정 요소가 화면에 노출되는지를 감지하는 브라우저 표준 API.
- **React useRef/useEffect**: 관찰 대상을 지정하고 이벤트를 연결합니다.

## 📋 구현 순서
1. **Sentinel(감시자) 요소 배치**: 피드 리스트의 맨 마지막에 빈 `div`를 둡니다.
2. **Observer 설정**:
   ```javascript
   const observer = new IntersectionObserver((entries) => {
     if (entries[0].isIntersecting && !isLoading) {
       fetchNextPage(); // 다음 페이지 데이터 요청
     }
   });
   ```
3. **연결 및 해제**: 컴포넌트 마운트 시 `observe()`, 언마운트 시 `unobserve()`를 호출합니다.

## 🚀 장점
- **메모리 절약**: 현재 보이는 데이터만 렌더링하여 성능 향상.
- **UX 향상**: 버튼 클릭 없이 끊김 없는 컨텐츠 탐색 가능.
