// docs/code-examples/skeleton-ui-example.jsx - 스켈레톤 UI 컴포넌트 예제

// React와 Tailwind CSS를 활용한 부드러운 로딩 애니메이션 예제입니다.


// jsx
// import React from "react";

// // 1. 기본 스켈레톤 원형 (프로필용)
// export const SkeletonCircle = ({ size = "w-10 h-10" }) => (
//   <div className={`${size} rounded-full bg-gray-200 dark:bg-zinc-800 animate-pulse`} />
// );

// // 2. 기본 스켈레톤 바 (텍스트용)
// export const SkeletonBar = ({ width = "w-full", height = "h-4" }) => (
//   <div className={`${width} ${height} rounded bg-gray-200 dark:bg-zinc-800 animate-pulse`} />
// );

// // 3. 포스트 카드 스켈레톤 구성
// export const PostSkeleton = () => (
//   <div className="border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden mb-4">
//     <div className="flex items-center gap-3 p-4">
//       <SkeletonCircle />
//       <SkeletonBar width="w-24" />
//     </div>
//     <div className="aspect-square bg-gray-100 dark:bg-zinc-900 animate-pulse" />
//     <div className="p-4 space-y-2">
//       <SkeletonBar width="w-3/4" />
//       <SkeletonBar width="w-1/2" />
//     </div>
//   </div>
// );

