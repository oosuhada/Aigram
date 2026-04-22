# docs/database/relationships.md - 데이터베이스 관계 정의서

각 테이블 간의 연결 고리와 참조 무결성 규칙을 정의합니다.

## 🔗 주요 관계 상세

### 1. 사용자 및 콘텐츠 (User - Post)
- **관계**: 1:N
- **설명**: 한 명의 사용자는 여러 개의 게시물을 작성할 수 있습니다.
- **FK**: `posts.user_id` -> `users.user_id`
- **삭제 정책**: `ON DELETE CASCADE` (사용자 탈퇴 시 모든 게시물 삭제)

### 2. 다중 미디어 (Post - Media)
- **관계**: 1:N
- **설명**: 한 게시물은 최대 10개의 이미지나 비디오를 가질 수 있습니다.
- **FK**: `post_media.post_id` -> `posts.post_id`
- **정렬**: `sort_order` 컬럼을 통해 슬라이드 순서를 보장합니다.

### 3. 소셜 상호작용 (User - User, User - Post)
- **팔로우 (M:N)**: `follows` 테이블을 통해 자기 참조 다대다 관계를 구현합니다.
- **좋아요 (M:N)**: `likes` 테이블이 사용자(`user_id`)와 대상(`target_id`)을 연결합니다.

### 4. 알림 (Notification)
- **다중 참여자**: `receiver_id`(수신자)와 `sender_id`(발신자) 두 개의 FK가 `users` 테이블을 참조합니다.

## 🛡️ 데이터 무결성 규칙
- 모든 외래키는 인덱싱되어 Join 성능을 최적화합니다.
- 삭제 정책은 비즈니스 로직에 따라 `SET NULL` 또는 `CASCADE`를 신중히 선택합니다.
