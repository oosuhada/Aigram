# docs/guides/01-instagram-roadmap-guide.md - Aigram 구현 가이드

인스타그램의 핵심 기능을 프론트엔드와 백엔드로 나누어 구현하는 상세 가이드입니다.

## 🚀 단계별 구현 전략

### Phase 1: 기본 UI 및 인터랙션 (Frontend)
- **핵심 작업**: Next.js 14 App Router 설정, Tailwind CSS 스타일링.
- **주요 기능**: 피드 슬라이더 UI, 모바일 반응형 헤더/푸터, 검색 바.

### Phase 2: 데이터베이스 엔티티 설계 (Backend)
- **핵심 작업**: Spring Data JPA를 활용한 엔티티(Entity) 정의 및 관계 설정.
- **주요 엔티티**: User, Post, Comment, Like, Follow.
- **관계 설정**: `@OneToMany`, `@ManyToOne`, `@ManyToMany`를 통한 매핑.

### Phase 3: REST API 서버 구축 (Backend)
- **핵심 작업**: RESTful API 엔드포인트 구현 (Controller/Service).
- **데이터 처리**: 
  - **게시물**: Spring Boot + Cloudinary 연동하여 이미지 업로드 및 URL 저장.
  - **피드**: `Pageable`을 사용한 페이징 처리.
  - **상호작용**: 좋아요, 댓글, 팔로우 로직 구현 및 트랜잭션 관리.

### Phase 4: 프론트엔드 API 연동 (Fullstack)
- **핵심 작업**: Next.js에서 백엔드 API 호출 (fetch API/SWR).
- **UX 개선**: Skeleton UI, Optimistic Updates 적용.

### Phase 5: 인증 및 권한 관리 (Security)
- **핵심 작업**: Spring Security와 JWT를 활용한 로그인 시스템.
- **기능**: 토큰 기반 인증, 권한별 리소스 접근 제한.

## 🛠 주요 기술 포인트
1. **미디어 처리**: Cloudinary SDK를 통한 이미지/비디오 자동 최적화 및 URL 관리.
2. **페이징**: `Slice` 또는 `Page` 객체를 사용한 무한 스크롤 구현.
3. **보안**: BCrypt 암호화 및 JWT 필터 체인 설정.
