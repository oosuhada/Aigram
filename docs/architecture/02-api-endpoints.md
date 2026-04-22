# docs/architecture/02-api-endpoints.md - API 엔드포인트 명세서

InstaClone에서 사용하는 Spring Boot REST API 엔드포인트 목록입니다.

## 🔑 REST API (Backend)
백엔드 서버(Spring Boot)에서 제공하는 주요 API 목록입니다. 모든 요청은 JSON 형식을 사용하며, 인증이 필요한 경우 JWT 토큰이 필요합니다.

| 엔드포인트 | 메서드 | 설명 | 주요 파라미터 |
| :--- | :--- | :--- | :--- |
| `/api/posts` | GET | 피드 게시물 목록 조회 (페이징) | `page`, `size` |
| `/api/posts` | POST | 새 게시물 생성 (미디어 포함) | `caption`, `files` |
| `/api/posts/{id}/like` | POST | 게시물 좋아요/취소 토글 | `postId` |
| `/api/users/{id}` | GET | 특정 유저 프로필 조회 | `userId` |
| `/api/users/{id}/follow`| POST | 유저 팔로우/언팔로우 토글 | `targetUserId` |
| `/api/search` | GET | 유저 및 게시물 통합 검색 | `q` |

## 🌐 Next.js Route Handlers (Frontend Proxy)
프론트엔드(Next.js)에서 백엔드 API를 호출할 때 사용하는 프록시 또는 서버 사이드 캐싱용 엔드포인트입니다.

### 1. 게시물 관련
- `GET /api/posts`: 프론트엔드에서 백엔드 `/api/posts`로 요청을 전달하고 결과를 캐싱합니다.

### 2. 인증 관련
- `POST /api/auth/login`: 사용자 로그인을 처리하고 JWT 토큰을 세션에 저장합니다.
