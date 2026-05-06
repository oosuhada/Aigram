# Aigram

AI 기능을 붙인 Instagram 스타일 SNS 포트폴리오 프로젝트입니다. 처음에는 프론트엔드 클론 학습으로 시작했지만, 이후 feed, stories, reels, messages, search, notifications, profile, dark/light theme, AI 댓글 요약, 캡션 번역, 검색/백엔드 구조까지 확장했습니다.

[Live demo](https://aigram.oosu.dev)

![Aigram live feed](.github/assets/aigram-live-feed.png)

## What This Shows

- Instagram과 유사한 정보 구조를 직접 구현하며 feed, story, reel, DM, profile, saved, settings 화면을 구성했습니다.
- light/dark mode를 전역 theme state와 Tailwind `dark:` 스타일로 지원했습니다.
- Spring Boot + PostgreSQL 기반의 fullstack 설계 문서를 함께 정리했습니다.
- Groq/Gemini 기반 AI 댓글 요약, DeepL 기반 캡션 번역, Meilisearch 검색 인덱싱 같은 확장 기능을 구현/문서화했습니다.
- 공개 repo에는 secret, private env, raw DB dump 없이 포트폴리오용 snapshot과 안전한 문서만 남겼습니다.

## Screenshots

### Main App Surfaces

| Feed light | Feed dark |
| --- | --- |
| ![Aigram feed light mode](.github/assets/aigram-feed-light.png) | ![Aigram feed dark mode](.github/assets/aigram-feed-dark.png) |

| Explore | Reels |
| --- | --- |
| ![Explore grid](.github/assets/aigram-explore.png) | ![Reels dark mode](.github/assets/aigram-reels-dark.png) |

| Messages | Profile |
| --- | --- |
| ![Messages page](.github/assets/aigram-messages.png) | ![Profile page](.github/assets/aigram-profile.png) |

| Settings dark | Post detail |
| --- | --- |
| ![Settings dark mode](.github/assets/aigram-settings-dark.png) | ![Post detail page](.github/assets/aigram-post-detail.png) |

### AI Features

| AI comment summary | Caption translation |
| --- | --- |
| ![AI comment summary](.github/assets/aigram-ai-comments-summary.png) | ![Caption translation](.github/assets/aigram-ai-translation.png) |

| Feature | Implementation note |
| --- | --- |
| AI comment summary | 댓글과 대댓글을 수집해 `/ai/comments/summary`로 보내고, Groq/Gemini provider를 env 기반으로 전환할 수 있게 설계했습니다. 동일 댓글 묶음은 `ai_comment_summaries` 캐시 구조로 비용과 지연을 줄입니다. |
| Caption translation | 게시물 caption을 `POST /translations` 흐름으로 요청하고, 번역 중/원문 보기/오류 상태를 게시물별 state로 관리합니다. |
| Search and indexing | users/posts/comments를 Meilisearch index로 나누어 검색하고, recent search와 검색 결과 화면 UX를 문서화했습니다. |
| AI-safe public sharing | provider key, Cloudinary secret, JWT secret, DB password는 repo에 넣지 않고 env/example/ops template 기준으로 분리했습니다. |

## Architecture

```text
Aigram/
├── app/                       # Next.js App Router public snapshot pages
│   ├── page.js                # feed route
│   ├── explore/page.js
│   ├── reels/page.js
│   ├── messages/page.js
│   ├── profile/page.js
│   ├── settings/page.js
│   └── p/[id]/page.js         # post detail route
├── src/
│   ├── components/            # feed, story, reel, sidebar, modal UI
│   ├── views/                 # earlier Vite route/view implementation
│   ├── context/               # theme/user/language shared state
│   └── data/                  # public-safe mock data
├── docs/                      # backend, DB, roadmap, AI/search notes
└── public/                    # local public assets
```

```mermaid
flowchart LR
  ui["Next.js social UI"] --> api["Spring Boot API plan"]
  api --> db["PostgreSQL domain model"]
  api --> search["Meilisearch users/posts/comments"]
  api --> ai["Groq/Gemini comment summary"]
  api --> translate["DeepL caption translation"]
  ui --> theme["Light/Dark theme state"]
```

## Public Sharing Boundary

- 실제 provider key는 `GROQ_API_KEY`, `GEMINI_API_KEY`, `DEEPL_API_KEY`, `CLOUDINARY_API_SECRET`, `JWT_SECRET` 같은 env로만 주입합니다.
- 공개 repo에는 `.env`, production DB dump, private media, 운영 credential을 포함하지 않습니다.
- `NEXT_PUBLIC_*` 값은 브라우저에 노출되는 public config로만 사용하고, secret으로 취급되는 값은 서버 env에서만 읽도록 분리합니다.

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Validate

```bash
npm run build
```
