# docs/guides/02-skeleton-ui.md - Skeleton UI 구현 가이드

데이터 로딩 중에 사용자에게 구조화된 레이아웃을 미리 보여주어 체감 대기 시간을 줄이는 Skeleton UI 구현 방법입니다.

## 🛠 기본 원리
기존의 스피너(Spinner)는 전체 화면이 텅 비어 보이지만, Skeleton은 실제 컨텐츠가 들어갈 자리를 회색 박스로 채워 시각적 안정감을 줍니다.

## 📋 구현 단계
1. **공통 컴포넌트 생성**: `Skeleton.jsx`
   ```jsx
   const Skeleton = ({ className }) => (
     <div className={`bg-gray-200 dark:bg-zinc-800 animate-pulse rounded ${className}`} />
   );
   ```
2. **피드 스켈레톤 디자인**: `PostCardSkeleton.jsx`
   - 헤더(원형 프로필, 아이디 바)
   - 메인 미디어(정사각형 박스)
   - 액션 바 및 캡션 바
3. **조건부 렌더링**:
   ```jsx
   {isLoading ? <PostCardSkeleton /> : <PostCard data={post} />}
   ```

## 🎨 스타일 팁
- **애니메이션**: `animate-pulse`를 사용하여 부드럽게 깜빡이는 효과를 줍니다.
- **다크 모드**: `dark:bg-zinc-800` 설정을 통해 다크 모드에서도 자연스럽게 보이도록 합니다.
