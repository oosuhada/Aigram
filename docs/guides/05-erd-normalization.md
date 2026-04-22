# docs/guides/05-erd-normalization.md - 데이터베이스 정규화 및 설계 원칙

InstaClone의 확장성과 데이터 무결성을 위한 DB 설계 원칙 가이드입니다.

## 📏 정규화 전략
1. **제1정규형 (1NF)**: 모든 컬럼은 원자 값을 가짐. (예: `post_media` 테이블 분리로 다중 이미지 처리)
2. **제2정규형 (2NF)**: 기본키에 완전 함수 종속. (예: `likes` 테이블에서 유저와 게시물 관계 정의)
3. **제3정규형 (3NF)**: 이행적 종속성 제거. (예: 게시물 정보와 작성자 정보를 별도 테이블로 관리)

## 🔗 관계 정의 (Relationships)
- **1:N (일대다)**: `User` -> `Posts`, `Post` -> `Comments`
- **M:N (다대다)**: `User` -> `User` (Follow), `User` -> `Post` (Likes)
  - 다대다 관계는 중간 연결 테이블(`follows`, `likes`)을 통해 구현합니다.

## 🛡️ 무결성 유지
- **Foreign Key**: 참조 무결성을 위해 외래키 제약 조건을 엄격히 사용합니다.
- **Indexes**: 검색 성능을 위해 `username`, `created_at` 컬럼에 인덱스를 설정합니다.
