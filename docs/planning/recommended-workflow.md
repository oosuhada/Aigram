# 🗺️ Instagram 클론 프로젝트 - 추천 작업 순서 & 마일스톤

---

## 📊 전체 작업 개요

| Phase | 기간 | 주요 작업 | 상태 |
|-------|------|---------|------|
| **Phase 1: 기초 설정** | 1-2주 | DB 설계, Spring Boot 환경 구축 | 🔴 미시작 |
| **Phase 2: Frontend 완성도** | 2-3주 | Skeleton, Optimistic, Scroll | 🔴 미시작 |
| **Phase 3: Backend API 구현** | 2-3주 | JPA Entity, Repository, Controller | 🔴 미시작 |
| **Phase 4: 성능 최적화** | 1-2주 | 캐싱, DB 인덱싱, API 최적화 | 🔴 미시작 |
| **Phase 5: 배포 & 모니터링** | 1주 | 클라우드 배포, 성능 모니터링 | 🔴 미시작 |

---

## 🎯 Phase 1: 기초 설정 (1-2주)

### 목표
- ✅ 데이터베이스 설계 완료 (PostgreSQL/MySQL)
- ✅ Spring Boot 프로젝트 초기화
- ✅ JPA Entity 모델링 기초
- ✅ DBeaver 연결 확인

### 1-1️⃣ 데이터베이스 설계 (2-3일)

#### 작업 내용
- [ ] ERD 작성 (Mermaid 활용)
- [ ] 테이블 정의 (Users, Posts, Likes, Follows, Comments)
- [ ] 관계 설정 (1:N, M:N)
- [ ] 참고 파일: `docs/database/mermaid-diagrams.md`

#### 산출물
```
Users ──1:N──> Posts
Posts <──M:N──> Likes
Posts <──M:N──> Comments
Users <──M:N──> Follows (Self-referencing)
```

---

### 1-2️⃣ Spring Boot 프로젝트 초기화 (2일)

#### 작업 내용
- [ ] Spring Initializr (start.spring.io) 설정
  - Java 17+, Spring Boot 3.x
  - Dependencies: Spring Web, Spring Data JPA, Spring Security, Validation, Lombok, MySQL/PostgreSQL Driver
- [ ] 프로젝트 구조 설정 (Controller, Service, Repository, Entity, DTO)

#### 체크리스트
```markdown
- [ ] JDK 17+ 설치 및 설정
- [ ] IDE (IntelliJ 권장) 설정
- [ ] application.yml (또는 properties) DB 연결 설정
- [ ] DBeaver로 데이터베이스 접속 확인
```

---

### 1-3️⃣ JPA 엔티티 모델링 기초 (3-4일)

#### 작업 내용
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();
    
    // ...
}
```

#### 체크리스트
```markdown
- [ ] 기본 엔티티 정의 (User, Post, Like, Follow, Comment)
- [ ] 연관관계 매핑 (@OneToMany, @ManyToOne, @ManyToMany)
- [ ] 하이버네이트 ddl-auto 설정 (create/update) 확인
- [ ] 공통 BaseEntity (createdAt, updatedAt) 적용
```

---

## 🎨 Phase 2: Frontend 완성도 (2-3주)

### 목표
- ✅ Skeleton UI 구현
- ✅ Optimistic Updates 적용
- ✅ Infinite Scroll 구현 (Backend 연동 준비)

*(기존 Phase 2 내용과 동일하되, API 호출 주소를 Spring Boot 서버로 맞춤)*

---

## ⚙️ Phase 3: Backend API 구현 (2-3주)

### 목표
- ✅ REST API 엔드포인트 완성
- ✅ JPA Repository 및 Service 로직 구현
- ✅ Spring Security & JWT 인증
- ✅ DTO 기반 요청/응답 처리

### 3-1️⃣ REST API 설계 (2-3일)

#### 필수 API 목록
```
GET    /api/posts              # 피드 조회 (Pageable)
POST   /api/posts              # 게시물 생성 (MultipartFile + Cloudinary 연동)
GET    /api/posts/{id}         # 게시물 상세
DELETE /api/posts/{id}         # 게시물 삭제

POST   /api/posts/{id}/like    # 좋아요 토글
POST   /api/posts/{id}/comments # 댓글 추가

POST   /api/users/{id}/follow  # 팔로우 토글
GET    /api/users/{id}         # 사용자 프로필
```

---

### 3-2️⃣ JPA 비즈니스 로직 및 미디어 처리 (5-7일)

#### 주요 작업
- [ ] Spring Data JPA Repository 작성
- [ ] Cloudinary SDK 연동 (이미지/비디오 업로드 및 URL 관리)
- [ ] Service 레이어 트랜잭션 처리 (@Transactional)
- [ ] 글로벌 예외 처리기 (@RestControllerAdvice)

#### 체크리스트
```markdown
- [ ] Repository 인터페이스 정의
- [ ] 페이징 처리를 위한 Pageable 활용
- [ ] N+1 문제 해결을 위한 Fetch Join 적용
- [ ] 유효성 검사 (@Valid) 적용
```

---

### 3-3️⃣ Spring Security & JWT (4-5일)

#### 구현 항목
- [ ] JWT 토큰 발급 및 검증 필터
- [ ] 커스텀 UserDetailsService
- [ ] 권한별 API 접근 제어
- [ ] 비밀번호 암호화 (BCryptPasswordEncoder)

---

## ⚡ Phase 4: 성능 최적화 (1-2주)

### 목표
- ✅ DB 인덱싱 최적화
- ✅ Redis 캐싱 (선택)
- ✅ API 응답 속도 개선

---

## 🚀 Phase 5: 배포 & 모니터링 (1주)

### 목표
- ✅ JAR 빌드 및 배포
- ✅ AWS/Railway/Render 등 백엔드 호스팅
- ✅ Next.js (Vercel)와 CORS 설정 및 연동
