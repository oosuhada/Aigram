# 🗄️ Aigram 초정밀 ERD 명세서 (Enterprise Level v1.2)

본 문서는 인스타그램의 핵심 기능을 완벽히 구현하기 위한 데이터베이스 설계도입니다. 모든 CRUD 작업과 데이터 추적(Audit) 기능을 포함합니다.

---

## 1. 회원 및 보안 (Identity & Security)

### 1.1 `users`
| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `user_id` | BIGINT (PK) | AI | 고유 식별자 |
| `username` | VARCHAR(30) | Unique, NN | 아이디 (@id) |
| `email` | VARCHAR(100) | Unique, NN | 로그인 이메일 |
| `password` | VARCHAR(255) | NN | BCrypt 암호화 해시 |
| `full_name` | VARCHAR(50) | NN | 실명 |
| `profile_img`| TEXT | Default | 프로필 이미지 URL |
| `bio` | VARCHAR(150) | Null | 자기소개 |
| `website` | VARCHAR(255) | Null | 링크 |
| `is_private` | BOOLEAN | Def: FALSE | 비공개 계정 여부 |
| `is_verified`| BOOLEAN | Def: FALSE | 인증 마크(블루 체크) 여부 |

#### 비공개 계정 데이터 노출 정책 (Data Visibility Policy)
1. **Public Account**: 모든 유저가 `posts`, `stories`, `highlights` 데이터에 접근 가능.
2. **Private Account**:
   - `follows` 테이블에 `follower_id`와 `following_id` 관계가 `status='FOLLOWING'`인 경우에만 전체 데이터 반환.
   - 관계가 없거나 `PENDING`인 경우, `posts` 배열은 빈 값으로 처리하며 UI에서 `Lock` 레이아웃 출력.
   - 프로필 상단 메타데이터(게시물 수, 팔로워 수, 팔로잉 수)는 상시 노출.
| `created_at` | DATETIME | Default | 가입일 |
| `updated_at` | DATETIME | ON UPDATE | 정보 수정일 |

---

## 2. 콘텐츠 및 메타데이터 (Content & Media)

### 2.1 `posts`
게시물 본체입니다. 성능을 위해 좋아요와 댓글 수를 카운트 컬럼으로 가집니다.
| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `post_id` | BIGINT (PK) | AI | 게시물 고유 ID |
| `user_id` | BIGINT (FK) | Users | 작성자 |
| `caption` | TEXT | Null | 게시물 본문 |
| `location` | VARCHAR(100) | Null | 위치 정보 |
| `post_type` | ENUM | 'POST', 'REEL' | 콘텐츠 타입 구분 |
| `like_count` | INT | Def: 0 | 좋아요 수 (캐싱용) |
| `comment_count`| INT | Def: 0 | 댓글 수 (캐싱용) |
| `view_count` | BIGINT | Def: 0 | 조회수 (Reels 필수) |
| `is_deleted` | BOOLEAN | Def: FALSE | 삭제 여부 (Soft Delete) |
| `created_at` | DATETIME | Default | 작성일 |
| `updated_at` | DATETIME | ON UPDATE | 수정일 |

### 2.2 `post_media` (다중 이미지/비디오)
인스타그램의 '슬라이드' 기능을 위한 테이블입니다.
| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `media_id` | BIGINT (PK) | AI | 고유 ID |
| `post_id` | BIGINT (FK) | Posts | 대상 게시물 |
| `media_url` | TEXT | NN | S3 등 저장소 URL |
| `thumbnail_url`| TEXT | Null | 비디오인 경우 대표 이미지 URL |
| `media_type` | ENUM | 'IMG', 'VID' | 이미지/비디오 구분 |
| `duration` | INT | Null | 비디오 길이 (초 단위, 최대 60초) |
| `sort_order` | INT | NN | 슬라이드 순서 (0, 1, 2...) |

### 2.3 `music` (릴스 및 게시물 배경음악)
| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `music_id` | BIGINT (PK) | AI | 고유 ID |
| `title` | VARCHAR(100)| NN | 곡 제목 |
| `artist` | VARCHAR(100)| NN | 아티스트명 |
| `audio_url` | TEXT | NN | 오디오 파일 경로 |
| `cover_url` | TEXT | NN | 앨범 커버 이미지 |


---

## 3. 상호작용 (Interactions)

### 3.1 `comments` (대댓글 지원)
| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `comment_id` | BIGINT (PK) | AI | 고유 ID |
| `post_id` | BIGINT (FK) | Posts | 대상 게시물 |
| `user_id` | BIGINT (FK) | Users | 작성자 |
| `parent_id` | BIGINT (FK) | Self | **대댓글용 (NULL이면 원댓글)** |
| `content` | TEXT | NN | 댓글 내용 |
| `like_count` | INT | Def: 0 | 댓글 좋아요 수 |
| `is_deleted` | BOOLEAN | Def: FALSE | 삭제 여부 |
| `created_at` | DATETIME | Default | 작성 시간 |
| `updated_at` | DATETIME | ON UPDATE | 수정 시간 |

### 3.2 `likes` (다중 대상 좋아요)
좋아요를 누르고 취소하는 로직을 관리합니다.
| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `like_id` | BIGINT (PK) | AI | 고유 ID |
| `user_id` | BIGINT (FK) | Users | 좋아요 누른 유저 |
| `target_id` | BIGINT | NN | 대상 ID (Post 또는 Comment) |
| `target_type`| ENUM | 'POST', 'COMM'| 대상 타입 구분 |
| `created_at` | DATETIME | Default | 발생 시간 |

---

## 4. 소셜 및 활동 (Social & Activity)

### 4.1 `follows` (맞팔로잉/요청 관리)
| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `follower_id`| BIGINT (FK) | Users | 나를 따르는 유저 |
| `following_id`| BIGINT (FK) | Users | 내가 따르는 유저 |
| `status` | ENUM | 'PENDING', 'FOLLOWING' | 비공개 계정 요청 처리용 |
| `created_at` | DATETIME | Default | 팔로우 시간 |

### 4.2 `user_analytics` (내 활동 - 시간 추적)
| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `analytics_id`| BIGINT (PK) | AI | 고유 ID |
| `user_id` | BIGINT (FK) | Users | 유저 |
| `date` | DATE | NN | 활동 날짜 |
| `time_spent` | INT | Seconds | 해당 날짜 앱 체류 시간 |

---

## 5. 저장 및 컬렉션 (Saved & Collections)

### 5.1 `collections` (저장됨 폴더)
| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `collection_id`| BIGINT (PK) | AI | 고유 ID |
| `user_id` | BIGINT (FK) | Users | 소유자 |
| `name` | VARCHAR(50) | NN | 컬렉션 이름 |
| `created_at` | DATETIME | Default | 생성일 |

### 5.2 `saved_posts`
| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `save_id` | BIGINT (PK) | AI | 고유 ID |
| `user_id` | BIGINT (FK) | Users | 저장한 유저 |
| `post_id` | BIGINT (FK) | Posts | 저장된 게시물 |
| `collection_id`| BIGINT (FK) | Coll | 소속 컬렉션 (Nullable) |
| `created_at` | DATETIME | Default | 저장일 |

---

## 6. 알림 (Notifications)
| 컬럼명 | 타입 | 제약 조건 | 설명 |
| :--- | :--- | :--- | :--- |
| `notif_id` | BIGINT (PK) | AI | 고유 ID |
| `receiver_id`| BIGINT (FK) | Users | 알림 수신자 |
| `sender_id` | BIGINT (FK) | Users | 원인 제공자 |
| `type` | ENUM | 'LIKE', 'COMMENT', 'FOLLOW', 'TAG' | 알림 종류 |
| `target_id` | BIGINT | Null | 관련 Post/Comment ID |
| `is_read` | BOOLEAN | Def: FALSE | 읽음 상태 |
| `created_at` | DATETIME | Default | 발생 시간 |
