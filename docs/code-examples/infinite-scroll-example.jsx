// docs/code-examples/infinite-scroll-example.jsx - 무한 스크롤 구현 예제

//Intersection Observer를 활용하여 스크롤 시 데이터를 추가 로드하는 예제입니다.

```jsx
import React, { useEffect, useRef } from "react";

const FeedList = ({ posts, loadMore, hasMore, isLoading }) => {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      // 감시 요소가 화면에 나타나면 다음 페이지 로드
      if (entries[0].isIntersecting && !isLoading) {
        loadMore();
      }
    }, { threshold: 1.0 });

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  return (
    <div className="flex flex-col gap-4">
      {posts.map(post => <PostCard key={post.id} data={post} />)}
      
      {/* 감시용 요소 (Sentinel) */}
      <div ref={sentinelRef} className="h-10 flex justify-center items-center">
        {isLoading && <p>Loading more posts...</p>}
      </div>
    </div>
  );
};
```
