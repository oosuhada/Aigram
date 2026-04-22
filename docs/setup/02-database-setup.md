# docs/setup/02-database-setup.md - 데이터베이스 설치 및 연결

InstaClone에서 사용하는 관계형 데이터베이스(RDBMS) 설정 가이드입니다.

## 💾 데이터베이스 선택
프로젝트는 **PostgreSQL** (권장) 또는 **MySQL**을 사용합니다.

## 🚀 Docker를 이용한 설치 (권장)
### PostgreSQL
```bash
docker run --name insta-db \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_DB=instagram \
  -p 5432:5432 \
  -d postgres
```

## 🔗 Spring Boot 연결 설정
`src/main/resources/application.yml` 파일에 다음 설정을 추가합니다.

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/instagram
    username: postgres
    password: password123
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update # 개발 환경: update / 운영: validate
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

## 🛠 DB Tool (DBeaver)
- **DBeaver**를 사용하여 위 연결 정보를 등록하고 스키마를 확인합니다.
