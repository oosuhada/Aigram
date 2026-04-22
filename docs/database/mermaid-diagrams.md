# Instagram 클론 - Mermaid 다이어그램 (Spring Boot & JPA 기반)

---

## 📊 1. ERD (Entity Relationship Diagram)
엔티티 간의 관계를 BIGINT PK와 Spring Data JPA 매핑 구조에 맞춰 설계했습니다.

```mermaid
erDiagram
  USERS ||--o{ POSTS : creates
  USERS ||--o{ LIKES : gives
  USERS ||--o{ COMMENTS : writes
  USERS ||--o{ FOLLOWS : initiates
  POSTS ||--o{ POST_MEDIA : contains
  POSTS ||--o{ LIKES : receives
  POSTS ||--o{ COMMENTS : contains

  USERS {
    bigint user_id PK
    string username UK
    string email UK
    string password
    string full_name
    text profile_img
    boolean is_private
    timestamp created_at
  }

  POSTS {
    bigint post_id PK
    bigint user_id FK
    text caption
    int like_count
    int comment_count
    timestamp created_at
  }

  POST_MEDIA {
    bigint media_id PK
    bigint post_id FK
    string media_url
    string media_type
    int sort_order
  }

  LIKES {
    bigint like_id PK
    bigint user_id FK
    bigint target_id
    string target_type
    timestamp created_at
  }

  COMMENTS {
    bigint comment_id PK
    bigint post_id FK
    bigint user_id FK
    bigint parent_id FK
    text content
    timestamp created_at
  }

  FOLLOWS {
    bigint follower_id FK
    bigint following_id FK
    string status
    timestamp created_at
  }
```

---

## 🔄 2. 데이터 흐름도 (피드 로드)
Next.js 프론트엔드가 Spring Boot 백엔드로부터 데이터를 가져오는 흐름입니다.

```mermaid
graph TD
    A["👤 사용자 피드 페이지 접속"] --> B["로딩 시작<br/>(Skeleton UI 표시)"]
    B --> C["Next.js API 요청<br/>GET /api/posts"]
    C --> D["Spring Boot REST API 호출<br/>GET /api/posts?page=0"]
    D --> E{"응답 대기"}
    E -->|성공| F["데이터 받음<br/>(DTO 객체)"]
    E -->|실패| G["에러 메시지 표시"]
    F --> H["Skeleton 제거<br/>실제 데이터 렌더링"]
    H --> I["사용자 스크롤"]
    I --> J{"화면 끝에<br/>도달했나?"}
    J -->|예| K["다음 페이지 로드<br/>GET /api/posts?page=1"]
    K --> L["기존 데이터에 추가"]
    L --> I
```

---

## ⚡ 3. Optimistic Update 흐름
사용자 경험을 극대화하기 위해 백엔드 API 응답 전 UI를 먼저 변경하는 로직입니다.

```mermaid
graph LR
    A["❤️ 좋아요 버튼<br/>클릭"] --> B["UI 즉시 변경<br/>(좋아요 카운트 +1)"]
    B --> C["백엔드 API 요청<br/>POST /api/posts/{id}/like"]
    C --> D{"응답 확인"}
    D -->|성공| E["UI 최종 확정<br/>✅"]
    D -->|실패| F["UI 롤백<br/>에러 메시지"]
    E --> G["빠른 응답 경험"]
    F --> G
```

---

## 🗄️ 4. 1:N 관계 시각화 (User → Posts)
JPA의 `@OneToMany` 관계를 시각화한 구조입니다.

```mermaid
graph TB
    U["👤 User (Entity)<br/>id: 1<br/>username: alice"] --> P1["📝 Post (Entity)<br/>id: 101<br/>caption: 멋진 사진!"]
    U --> P2["📝 Post (Entity)<br/>id: 102<br/>caption: 여행 중"]
    U --> P3["📝 Post (Entity)<br/>id: 103<br/>caption: 맛있는 음식"]
    
    style U fill:#e1f5ff
    style P1 fill:#fff3e0
    style P2 fill:#fff3e0
    style P3 fill:#fff3e0
```

---

## 🔗 5. M:N 관계 시각화 (Likes)
좋아요 기능을 위한 다대다 관계 처리(중간 테이블) 구조입니다.

```mermaid
graph TB
    subgraph Users["Users"]
        U1["👤 user_1"]
        U2["👤 user_2"]
    end
    
    subgraph Likes["Likes (Mapping Table)"]
        L1["post_1, user_1"]
        L2["post_1, user_2"]
        L3["post_2, user_1"]
    end
    
    subgraph Posts["Posts"]
        P1["📝 post_1"]
        P2["📝 post_2"]
    end
    
    U1 --> L1
    U2 --> L2
    U1 --> L3
    
    L1 --> P1
    L2 --> P1
    L3 --> P2
    
    style U1 fill:#e1f5ff
    style U2 fill:#e1f5ff
    style L1 fill:#f3e5f5
    style L2 fill:#f3e5f5
    style L3 fill:#f3e5f5
    style P1 fill:#fff3e0
    style P2 fill:#fff3e0
```

---

## 🔍 6. SQL 정규화 및 JPA 매핑 전략

```mermaid
graph TB
    A["JPA Entity 구조"] --> B["정규화된 테이블"]
    B --> C["✅ 장점:<br/>1. 데이터 중복 제거<br/>2. 복합 인덱스 최적화<br/>3. 객체지향적 모델링"]
    
    style C fill:#e8f5e9
```

---

## 🚀 7. Spring Data JPA CRUD 사이클
리포지토리를 통한 데이터 접근 생명주기입니다.

```mermaid
graph TD
    A["데이터베이스"] 
    
    B["SAVE<br/>repository.save(entity)"] -->|INSERT/UPDATE| A
    C["READ<br/>repository.findById()"] -->|SELECT| A
    D["QUERY<br/>@Query / QueryDSL"] -->|JOIN/Filter| A
    E["DELETE<br/>repository.delete(entity)"] -->|DELETE| A
    
    A -->|결과 반환| F["엔티티/DTO 객체"]
    
    style B fill:#c8e6c9
    style C fill:#bbdefb
    style D fill:#fff9c4
    style E fill:#ffccbc
```

---

## 📈 8. 벌크 로드 프로세스 (Spring Boot)
대량의 더미 데이터를 주입하는 효율적인 과정입니다.

```mermaid
graph TD
    A["더미 데이터 생성<br/>JSON/SQL 스크립트"] --> B["Spring Boot<br/>CommandLineRunner"]
    B --> C["JdbcTemplate<br/>Batch Update"]
    C --> D["🗄️ 데이터베이스"]
    D --> E["✅ 로드 완료"]
    
    style A fill:#e1f5ff
    style E fill:#e8f5e9
```

---

## 🏗️ 9. 전체 시스템 아키텍처
Next.js, Spring Boot, JPA, Cloudinary의 유기적인 결합도입니다.

```mermaid
graph TB
    subgraph Client["🖥️ Frontend (Next.js)"]
        UI["React Components"]
        Store["State (Context/SWR)"]
        NextAPI["Next.js Route Handlers"]
    end
    
    subgraph Server["🔧 Backend (Spring Boot)"]
        Controller["REST Controllers"]
        Service["Business Services"]
        Security["Spring Security (JWT)"]
    end
    
    subgraph Data["💾 Data Layer"]
        JPA["Spring Data JPA"]
        Hibernate["Hibernate ORM"]
    end
    
    subgraph Storage["🗄️ Database & Cloud"]
        DB["PostgreSQL/MySQL"]
        Cloudinary["Cloudinary (Media)"]
    end
    
    UI --> Store
    Store --> NextAPI
    NextAPI -->|REST API| Controller
    Controller --> Security
    Security --> Service
    Service --> JPA
    JPA --> Hibernate
    Hibernate --> DB
    Service -.->|Upload| Cloudinary
    Cloudinary -.->|URL| Service
```

---

## 🔄 10. 팔로우/언팔로우 시퀀스
인증 정보와 상태 변화를 포함한 시퀀스 다이어그램입니다.

```mermaid
sequenceDiagram
    actor User as 👤 사용자
    participant Frontend as 🖥️ Next.js
    participant Backend as 🔧 Spring Boot
    participant DB as 🗄️ Database
    
    User->>Frontend: 팔로우 버튼 클릭
    Frontend->>Frontend: UI 즉시 업데이트 (Optimistic)
    Frontend->>Backend: POST /api/users/{id}/follow (JWT 포함)
    
    Backend->>DB: Follow 엔티티 저장
    DB-->>Backend: ✅ 성공
    
    Backend-->>Frontend: 200 OK {status: "FOLLOWING"}
    Frontend->>Frontend: UI 확정
    
    alt 서버 오류
        Backend-->>Frontend: 500 Error
        Frontend->>Frontend: UI 롤백
    end
```

---

## 📊 11. 무한 스크롤 성능 (Pageable)

```mermaid
graph TB
    A["첫 로드 (page=0, size=10)"] --> B["사용자 스크롤"]
    B --> C{"끝 도달?"}
    C -->|예| D["Next page 로드 (page=1)"]
    D --> E["백엔드 Slice/Page 조회"]
    E --> F["데이터 추가 및 렌더링"]
    F --> B
```

---

## 🎯 12. REST API 엔드포인트 맵

```mermaid
graph LR
    API["REST API (Spring Boot)"] --> GET1["GET /api/posts<br/>(피드)"]
    API --> POST1["POST /api/posts<br/>(생성)"]
    API --> POST2["POST /api/posts/{id}/like<br/>(좋아요)"]
    API --> GET2["GET /api/users/{id}<br/>(프로필)"]
    API --> AUTH["POST /api/auth/login<br/>(인증)"]
    
    style API fill:#e1f5ff
```

---

## 💾 13. 데이터 일관성 (JPA Cascade)

```mermaid
graph TB
    U["User Entity"]
    P["Post Entity"]
    C["Comment Entity"]
    
    U -- "CascadeType.ALL" --> P
    P -- "CascadeType.ALL" --> C
    
    Note["✅ 유저 삭제 시<br/>작성한 모든 게시물과<br/>댓글이 자동 삭제됨"]
    
    style Note fill:#e8f5e9
```

---

## 🎬 14. 이미지 업로드 플로우 (Cloudinary 연동)

```mermaid
graph TD
    A["📷 이미지 선택"] --> B["FormData 전송"]
    B --> C["Spring Boot Controller"]
    C --> D["Cloudinary Service"]
    D --> E["Cloudinary Cloud"]
    E -->|Secure URL| D
    D --> F["JPA Entity 생성/저장"]
    F --> G["✅ 완료"]
```

---

## 📱 15. 반응형 아키텍처

```mermaid
graph TD
    A["🖥️ Desktop (Grid 3열)"]
    B["📱 Mobile (List 1열)"]
    
    A -->|Tailwind CSS| B
    B -->|Touch Optimized| C["UX 개선"]
```

---

## ⚙️ 16. 성능 최적화 체크리스트 (Spring Boot)

```mermaid
graph TD
    A["성능 최적화"] 
    A --> B["JPA Fetch Join (N+1 해결)"]
    A --> C["데이터베이스 인덱스 (FK)"]
    A --> D["Cloudinary 이미지 최적화 (f_auto, q_auto)"]
    A --> E["Client Side Caching (SWR/React Query)"]
```
