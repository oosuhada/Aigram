# docs/docs-directory-structure.md - 문서 디렉토리 가이드

InstaClone 프로젝트의 `docs/` 폴더 구조와 각 파일의 목적을 설명합니다. 문서를 추가하거나 수정할 때 이 규칙을 준수해 주세요.

## 📂 폴더 구조

```text
docs/
├── README.md                          # 모든 문서의 시작점 (허브)
├── docs-directory-structure.md        # [현재 파일] 문서 구조 안내
│
├── guides/                            # 핵심 기술 구현 가이드
│   ├── 01-instagram-roadmap-guide.md  # 기능별 단계별 로드맵
│   ├── 02-skeleton-ui.md              # 로딩 애니메이션 구현법
│   ├── 03-optimistic-updates.md       # 즉각적 상태 반영 로직
│   ├── 04-infinite-scroll.md          # 페이징 및 무한 스크롤
│   ├── 05-erd-normalization.md        # DB 정규화 전략
│   └── 06-ddl-sql.md                  # SQL 데이터 정의어 가이드
│
├── setup/                             # 초기 설정 및 설치
│   ├── 01-dev-environment.md          # 개발 도구 및 패키지 설치
│   ├── 02-database-setup.md           # MySQL 설정 가이드
│   └── 03-seed-data.md                # 초기 데이터 주입 가이드
├── architecture/                       # 시스템 설계 및 아키텍처
│   ├── 01-system-overview.md          # 전체 시스템 구성도
│   ├── 02-api-endpoints.md            # API 통신 규격
│   ├── 03-data-flow.md                # 데이터 흐름도
│   └── 04-performance.md              # 성능 최적화 전략
│
├── code-examples/                      # 코드 스니펫 및 예제
│   ├── instagram-code-examples.md     # 핵심 기능 예제 모음
│   ├── skeleton-ui-example.jsx        # 스켈레톤 UI 컴포넌트 예제
│   ├── optimistic-updates-example.jsx # 낙관적 업데이트 로직 예제
│   ├── infinite-scroll-example.jsx    # 무한 스크롤 구현 예제
│   ├── api-routes-example.js          # API Route Handler 예제
│   └── jpa-examples.java              # 주요 Spring Data JPA 예제
│
├── database/                           # 데이터베이스 상세
│   ├── ERD_SPEC.md                    # 상세 테이블 명세서
│   ├── schema-diagram.md              # 시각화된 스키마 다이어그램
│   ├── relationships.md               # 테이블 간 관계 상세
│   ├── mermaid-diagrams.md            # Mermaid 기반 ERD 및 흐름도
│   └── dummy-data-generator.py        # 대량 데이터 생성 스크립트
│
└── planning/                           # 진행 상황 및 워크플로우
    ├── ROADMAP.md                      # 통합 프로젝트 일정
    ├── frontend-tasks.md              # 프론트엔드 상세 태스크
    ├── backend-tasks.md               # 백엔드 상세 태스크
    ├── deployment-checklist.md        # 배포 전 최종 점검표
    ├── NEXTJS_MIGRATION.md            # 마이그레이션 기록 및 장점
    └── recommended-workflow.md        # AI 에이전트 개발 협업 가이드
```

## 📝 작성 규칙
1. **헤더 명시**: 모든 `.md` 파일 최상단에 `docs/경로/파일명 - 목적`을 한 줄로 작성합니다.
2. **한글 작성**: 모든 기술 설명과 가이드는 한국어로 작성하는 것을 원칙으로 합니다.
3. **코드 블록**: 설명에 필요한 코드는 반드시 적절한 언어 설정을 포함한 마크다운 코드 블록으로 감쌉니다.
