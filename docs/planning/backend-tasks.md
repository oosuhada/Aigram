# docs/planning/backend-tasks.md - 백엔드 개발 태스크 (Spring Boot & JPA)

Aigram 백엔드 서버(REST API) 구축을 위한 세부 작업 항목입니다.

## 📋 개발 태스크 목록

### 1. 프로젝트 설정 및 인프라 (Setup)
- [ ] Spring Boot 3.x 프로젝트 초기화 (Gradle/Java 17).
- [ ] 데이터베이스 연결 설정 (PostgreSQL/MySQL).
- [ ] Cloudinary SDK 의존성 추가 및 설정.
- [ ] Spring Security 및 JWT 기초 설정.

### 2. 도메인 및 데이터베이스 설계 (Domain)
- [ ] User, Post, Comment, Like, Follow 엔티티 설계.
- [ ] JPA 연관관계 매핑 및 공통 BaseEntity 작성.
- [ ] 각 도메인별 Repository(Spring Data JPA) 인터페이스 작성.

### 3. 미디어 및 게시물 기능 (Content)
- [ ] Cloudinary 연동 이미지/비디오 업로드 서비스 구현.
- [ ] 게시물 생성/조회/삭제 REST API 구현.
- [ ] 피드 조회 페이징 처리 (`Slice` 기반 무한 스크롤 최적화).

### 4. 사용자 인터랙션 (Interaction)
- [ ] 좋아요(Like) 토글 및 카운트 캐싱 로직 구현.
- [ ] 댓글(Comment) 및 대댓글(Nested Comments) CRUD API 구현.
- [ ] 팔로우(Follow) 시스템 및 맞팔로잉 관계 조회 구현.

### 5. 보안 및 인증 (Security)
- [ ] JWT 기반 로그인/회원가입 API 구현.
- [ ] 비밀번호 해싱(BCrypt) 및 토큰 만료 처리.
- [ ] 비공개 계정에 따른 게시물 접근 권한 필터링.

### 6. 성능 최적화 및 배포 (Deployment)
- [ ] JPA N+1 문제 해결을 위한 Fetch Join 적용.
- [ ] 데이터베이스 인덱싱 전략 수립 및 적용.
- [ ] JAR 빌드 및 클라우드(AWS/Railway/Render 등) 배포.

## ✅ 완료 기준
- 모든 API 엔드포인트가 RESTful 규칙을 준수하며 200 OK 응답을 반환함.
- JWT 인증이 없으면 접근이 차단되는 보안 로직이 정상 작동함.
- 대량의 데이터 조회 시 페이징과 캐싱을 통해 응답 속도가 200ms 이하를 유지함.
