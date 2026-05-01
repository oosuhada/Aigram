// docs/code-examples/optimistic-updates-example.jsx - 낙관적 업데이트 로직 예제

// 좋아요 버튼 클릭 시 즉각적인 피드백을 주는 React 패턴 예제입니다.

```jsx
import React, { useState } from "react";
import { Heart } from "lucide-react";

const LikeButton = ({ post, onLikeApi }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleLike = async () => {
    // 1. 현재 상태 백업
    const previousIsLiked = isLiked;
    const previousCount = likeCount;

    // 2. UI 즉시 업데이트 (낙관적 변경)
    setIsLiked(!previousIsLiked);
    setLikeCount(prev => previousIsLiked ? prev - 1 : prev + 1);

    try {
      // 3. 실제 API 호출
      await onLikeApi(post.id, !previousIsLiked);
    } catch (error) {
      // 4. 실패 시 롤백
      setIsLiked(previousIsLiked);
      setLikeCount(previousCount);
      alert("요청 처리에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <button onClick={handleLike} className="flex items-center gap-2">
      <Heart className={isLiked ? "fill-red-500 text-red-500" : ""} />
      <span>{likeCount}</span>
    </button>
  );
};
```
