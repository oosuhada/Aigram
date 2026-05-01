# docs/guides/06-ddl-sql.md - SQL 데이터 정의어(DDL) 관리 가이드

데이터베이스 스키마를 생성하고 관리하기 위한 표준 SQL 가이드입니다. Spring Data JPA 사용 시 하이버네이트가 자동으로 처리할 수도 있지만, 수동 관리 및 마이그레이션 시 다음 표준을 따릅니다.

## 🏗 테이블 생성 (Create)
ERD 명세서(`ERD_SPEC.md`)를 기준으로 작성된 테이블 생성 예시입니다.
```sql
CREATE TABLE users (
  user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 테이블 수정 (Alter)
컬럼 추가 시 기존 데이터 보존을 위해 `DEFAULT` 값을 지정하거나 `NULL` 허용 여부를 신중히 결정합니다.
```sql
ALTER TABLE users ADD COLUMN is_private BOOLEAN DEFAULT FALSE;
```

## 🧹 삭제 (Drop/Truncate)
- `DROP`: 테이블 자체를 삭제. (주의 요망)
- `TRUNCATE`: 구조는 남기고 모든 행(Row)만 삭제. (데이터 초기화 시 사용)
