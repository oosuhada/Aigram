# docs/setup/01-dev-environment.md - 개발 환경 구축

Aigram 프로젝트 개발을 위한 필수 도구 및 언어 설정 가이드입니다.

## 🛠 필수 소프트웨어
1. **Java Development Kit (JDK) 17+**: 백엔드(Spring Boot 3) 실행을 위해 필수입니다.
2. **Node.js 18+**: 프론트엔드(Next.js 14) 실행을 위해 필요합니다.
3. **IDE**: 
   - **IntelliJ IDEA**: 백엔드 개발 권장 (Lombok, Spring 부트 지원).
   - **VS Code**: 프론트엔드 개발 권장 (Tailwind, React 지원).
4. **Docker**: 데이터베이스(PostgreSQL/MySQL) 및 Redis 실행용.

## 📦 패키지 설치
### Frontend
```bash
cd Development/instagram-project
npm install
```

### Backend (Spring Boot)
- `build.gradle` 파일을 IntelliJ로 열어 의존성을 로드합니다.
- 주요 의존성: Spring Data JPA, Spring Security, Validation, MySQL/PostgreSQL Driver, Cloudinary SDK.
