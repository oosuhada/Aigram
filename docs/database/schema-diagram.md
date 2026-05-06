# docs/database/schema-diagram.md - 스키마 다이어그램 (Mermaid)

Aigram의 데이터베이스 구조를 시각화한 다이어그램입니다.

## 📊 ER 다이어그램

```mermaid
erDiagram
    USERS ||--o{ POSTS : writes
    USERS ||--o{ COMMENTS : writes
    USERS ||--o{ LIKES : "gives"
    USERS ||--o{ FOLLOWS : "follower/following"
    USERS ||--o{ COLLECTIONS : owns
    USERS ||--o{ SAVED_POSTS : saves
    USERS ||--o{ NOTIFICATIONS : "receives/sends"

    POSTS ||--o{ POST_MEDIA : "has multiple"
    POSTS ||--o{ COMMENTS : "has multiple"
    POSTS ||--o{ LIKES : "has multiple"
    POSTS ||--o{ SAVED_POSTS : "is saved in"
    POSTS }o--|| MUSIC : "uses background"

    COMMENTS ||--o{ COMMENTS : "parent of (replies)"
    COMMENTS ||--o{ LIKES : "has multiple"

    COLLECTIONS ||--o{ SAVED_POSTS : "contains"

    USERS {
        bigint user_id PK
        string username UK
        string email UK
        string password
        boolean is_private
    }

    POSTS {
        bigint post_id PK
        bigint user_id FK
        text caption
        int like_count
        int comment_count
    }

    POST_MEDIA {
        bigint media_id PK
        bigint post_id FK
        string media_url
        string thumbnail_url
        string media_type
    }
```

## 🛠 다이어그램 보는 법
- `||--o{`: 일대다 (1:N) 관계
- `PK`: Primary Key (기본키)
- `FK`: Foreign Key (외래키)
- `UK`: Unique Key (고유키)
