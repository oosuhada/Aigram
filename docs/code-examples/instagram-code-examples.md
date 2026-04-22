# docs/code-examples/instagram-code-examples.md - 핵심 기능 코드 예제 인덱스

InstaClone 프로젝트의 주요 기술적 해결책과 구현 패턴을 모은 인덱스입니다.

## 📂 카테고리별 예제

### 1. 로딩 최적화
- [Skeleton UI 컴포넌트](./skeleton-ui-example.jsx): 로딩 중 레이아웃 흔들림을 방지하는 스켈레톤 패턴.
- **이미지 지연 로딩**: `next/image`를 활용한 뷰포트 기반 로딩 최적화 패턴.

### 2. 사용자 인터랙션 (UX)
- [낙관적 업데이트 (Optimistic Updates)](./optimistic-updates-example.jsx): 좋아요/팔로우 클릭 시 서버 응답 전 UI를 먼저 변경하는 패턴.
- [무한 스크롤 (Infinite Scroll)](./infinite-scroll-example.jsx): Intersection Observer API를 활용한 페이징 처리 로직.

### 3. 데이터베이스 및 API (Backend)
- [Spring Data JPA 예제](./jpa-examples.java): 엔티티 매핑, 레포지토리 쿼리(JPQL), 서비스 로직 예제.
- [API 호출 패턴 (Frontend)](./api-routes-example.js): Next.js 14에서 Spring Boot REST API를 호출하는 방법.

## 💡 코드 작성 시 유의사항
1. **서버/클라이언트 구분**: `'use client'` 지시어를 적절히 사용하여 컴포넌트의 역할을 명확히 구분합니다.
2. **타입 안전성**: 프론트엔드에서는 API 응답(DTO)에 대한 타입을 정의하고, 백엔드에서는 Spring Data JPA의 타입 추론 기능을 활용합니다.
3. **재사용성**: 반복되는 UI 패턴은 `src/components/common` 아래에 공통 컴포넌트로 추출하여 관리합니다.
