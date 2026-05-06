# docs/README.md - 문서 통합 허브 (Spring Boot + JPA 기반)

Aigram 프로젝트의 모든 기술 문서, 가이드, 아키텍처 설계를 통합 관리하는 허브입니다. 본 프로젝트는 **Next.js (Frontend)와 Spring Boot (Backend)**를 분리한 현대적인 풀스택 아키텍처를 따릅니다.

## 🧭 문서 지도

### 1. [문서 디렉토리 구조](./docs-directory-structure.md)
- 프로젝트 내 모든 문서 파일의 위치와 목적을 정의합니다.

### 2. 기술 가이드 (guides/)
- [로드맵 가이드](./guides/01-instagram-roadmap-guide.md): Aigram의 핵심 기능 구현 단계.
- [Skeleton UI](./guides/02-skeleton-ui.md): 로딩 성능 최적화 가이드.
- [낙관적 업데이트](./guides/03-optimistic-updates.md): 무지연 인터랙션 구현법.
- [무한 스크롤](./guides/04-infinite-scroll.md): Intersection Observer 활용법.
- [ERD 정규화](./guides/05-erd-normalization.md): 데이터베이스 설계 원칙.
- [DDL SQL](./guides/06-ddl-sql.md): 실제 SQL 생성 및 관리.

### 3. 환경 설정 (setup/)
- [개발 환경 구축](./setup/01-dev-environment.md): JDK 17, Node.js 등 필수 도구 설치.
- [데이터베이스 설정](./setup/02-database-setup.md): MySQL/PostgreSQL 설치 및 DBeaver 연결.
- [시드 데이터 주입](./setup/03-seed-data.md): 초기 더미 데이터 생성 및 로드 방법.

### 4. 시스템 아키텍처 (architecture/)
- [시스템 개요](./architecture/01-system-overview.md): Spring Boot + JPA 기반 전체 기술 스택.
- [API 엔드포인트](./architecture/02-api-endpoints.md): REST API 및 보안 명세.
- [데이터 흐름](./architecture/03-data-flow.md): 클라이언트-서버-DB 간 데이터 순환 구조.
- [성능 최적화](./architecture/04-performance.md): JPA 쿼리 최적화 및 로딩 속도 전략.

### 5. 데이터베이스 (database/)
- [ERD 명세서](./database/ERD_SPEC.md): 상세 테이블 설계도.
- [스키마 다이어그램](./database/schema-diagram.md): 시각화된 DB 구조.
- [Mermaid 다이어그램](./database/mermaid-diagrams.md): ERD 및 비즈니스 흐름도.
- [데이터 생성기](./database/dummy-data-generator.py): 대량 더미 데이터 생성 스크립트.

### 6. 기획 및 체크리스트 (planning/)
- [프로젝트 로드맵](./planning/ROADMAP.md): 전체 개발 일정 및 마일스톤.
- [추천 워크플로우](./planning/recommended-workflow.md): AI 협업 및 단계별 구현 가이드.
- [프론트엔드 태스크](./planning/frontend-tasks.md): UI/UX 구현 세부 항목.
- [백엔드 태스크](./planning/backend-tasks.md): Spring Boot API 구현 항목.
