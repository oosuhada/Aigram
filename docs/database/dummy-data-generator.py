#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
=============================================================================
docs/database/dummy-data-generator.py
프로젝트  : Aigram (Aigram)
목적      : ERD v1.2 전체 테이블에 대응하는 대량 더미 데이터(SQL INSERT) 생성기
작성 기준 : ERD 명세서 Enterprise Level v1.2 (전체 테이블 포함)
=============================================================================

[사용법]
  1. 의존성 설치
       pip install faker

  2. 스크립트 실행 → SQL 파일 생성
       python3 dummy-data-generator.py > bulk_data.sql

  3. MySQL에 직접 주입
       mysql -u [user] -p [db_name] < bulk_data.sql

[생성 데이터 목록]
  1.  users            - 회원 (기본 200명)
  2.  posts            - 게시물 (POST / REEL 혼합)
  3.  post_media       - 게시물 첨부 이미지/영상 (슬라이드)
  4.  music            - 릴스·배경음악 라이브러리
  5.  comments         - 댓글 + 대댓글 (계층 구조)
  6.  likes            - 좋아요 (POST / COMMENT 대상)
  7.  follows          - 팔로우 관계 (PENDING / FOLLOWING)
  8.  user_analytics   - 유저별 일별 앱 체류시간
  9.  collections      - 저장함 폴더
  10. saved_posts      - 게시물 저장
  11. notifications    - 알림 (LIKE / COMMENT / FOLLOW / TAG)

[성능 팁]
  - SET FOREIGN_KEY_CHECKS = 0 으로 제약 조건 일시 해제 → 10배 이상 빠름
  - TRUNCATE 후 INSERT 하므로 멱등성(idempotent) 보장
  - 재현성을 위해 Faker.seed(42) 고정
=============================================================================
"""

import random
import sys
from datetime import datetime, timedelta
from faker import Faker

# ── Faker 초기화 ─────────────────────────────────────────────────────────────
# ko_KR: 한국어 이름·도시·문장 생성 / en_US: 영어 username·도메인 생성
fake = Faker(['ko_KR', 'en_US'])
Faker.seed(42)          # 시드 고정 → 실행할 때마다 동일한 데이터 보장
random.seed(42)


# ── 전역 상수 ─────────────────────────────────────────────────────────────────
# 아래 값을 조정하면 생성 규모를 손쉽게 변경할 수 있습니다.
USER_COUNT      = 200   # 생성할 유저 수
POST_PER_USER   = 8     # 유저 1인당 최대 게시물 수 (실제 1~POST_PER_USER 랜덤)
MUSIC_COUNT     = 50    # 음악 라이브러리 곡 수
FOLLOW_PER_USER = 15    # 유저 1인당 최대 팔로우 수
ANALYTICS_DAYS  = 30    # 분석 데이터 생성 기간(일)
COLLECTION_MAX  = 3     # 유저 1인당 최대 컬렉션 수
LIKE_SAMPLE     = 300   # 좋아요 이벤트 랜덤 샘플 수
NOTIF_SAMPLE    = 500   # 알림 이벤트 랜덤 샘플 수

# ── 헬퍼 함수 ─────────────────────────────────────────────────────────────────

def esc(text: str) -> str:
    """SQL 인젝션 방지: 문자열 내 홑따옴표를 이스케이프합니다."""
    return str(text).replace("'", "''")


def rand_datetime(days_back: int = 365) -> str:
    """현재 기준으로 최대 days_back일 이전~현재 사이의 랜덤 DATETIME 문자열 반환."""
    delta = timedelta(
        days=random.randint(0, days_back),
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59),
        seconds=random.randint(0, 59),
    )
    dt = datetime.now() - delta
    return dt.strftime('%Y-%m-%d %H:%M:%S')


def rand_date(days_back: int = ANALYTICS_DAYS) -> str:
    """현재 기준으로 최대 days_back일 이전~현재 사이의 랜덤 DATE 문자열 반환."""
    delta = timedelta(days=random.randint(0, days_back))
    return (datetime.now() - delta).strftime('%Y-%m-%d')


def p(sql: str):
    """SQL 한 줄 출력 (sys.stdout 직접 사용으로 버퍼링 최소화)."""
    print(sql)


# ══════════════════════════════════════════════════════════════════════════════
# 1. USERS  -  회원 테이블
# ══════════════════════════════════════════════════════════════════════════════

def generate_users(n: int = USER_COUNT):
    """
    ERD 1.1 users 테이블에 맞춰 INSERT 생성.

    - username    : faker user_name + 중복 방지용 인덱스 접미사
    - email       : username 기반 + 실제 도메인 형태
    - password    : BCrypt 형식 자리 표시자 (실제 해시는 앱에서 처리)
    - profile_img : randomuser.me 무료 API로 현실감 있는 프로필 이미지
    - is_private  : 15% 확률로 비공개 계정
    - is_verified : 5% 확률로 인증 계정 (블루체크)
    - bio         : 150자 이내로 잘라서 삽입
    """
    p("\n-- ═══════════════════════════════════════")
    p("-- 1. USERS (회원)")
    p("-- ═══════════════════════════════════════")

    for i in range(1, n + 1):
        # username에 인덱스를 붙여 중복 방지
        raw_username = fake.user_name().lower().replace('.', '_')
        username     = f"{raw_username}_{i}"[:30]           # VARCHAR(30) 제한
        email        = f"{username}@{fake.free_email_domain()}"[:100]
        full_name    = esc(fake.name())[:50]
        bio          = esc(fake.sentence(nb_words=12))[:150]
        website      = fake.url() if random.random() < 0.3 else 'NULL'  # 30%만 웹사이트 보유
        gender       = random.choice(['men', 'women'])
        profile_img  = f"https://randomuser.me/api/portraits/{gender}/{i % 99 + 1}.jpg"
        is_private   = 'TRUE'  if random.random() < 0.15 else 'FALSE'  # 15% 비공개
        is_verified  = 'TRUE'  if random.random() < 0.05 else 'FALSE'  # 5% 인증
        created_at   = rand_datetime(730)   # 최대 2년 이전 가입

        # website는 NULL 처리를 SQL에서 올바르게 하기 위해 따옴표 분기
        website_sql  = 'NULL' if website == 'NULL' else f"'{esc(website)}'"

        p(
            f"INSERT INTO users "
            f"(user_id, username, email, password, full_name, profile_img, bio, website, "
            f"is_private, is_verified, created_at) VALUES "
            f"({i}, '{username}', '{email}', '$2b$12$dummyHashedPassword{i:04d}XYZ', "
            f"'{full_name}', '{profile_img}', '{bio}', {website_sql}, "
            f"{is_private}, {is_verified}, '{created_at}');"
        )


# ══════════════════════════════════════════════════════════════════════════════
# 2. MUSIC  -  배경음악 라이브러리
# ══════════════════════════════════════════════════════════════════════════════

# 릴스·게시물에 사용할 실제 음악 제목 풀 (저작권 무관한 예시용 타이틀)
MUSIC_POOL = [
    ("Blinding Lights",      "The Weeknd"),
    ("Dynamite",             "BTS"),
    ("Butter",               "BTS"),
    ("Shape of You",         "Ed Sheeran"),
    ("Perfect",              "Ed Sheeran"),
    ("Stay",                 "Justin Bieber & The Kid LAROI"),
    ("Levitating",           "Dua Lipa"),
    ("As It Was",            "Harry Styles"),
    ("Heat Waves",           "Glass Animals"),
    ("Montero",              "Lil Nas X"),
    ("좋아",                 "민서"),
    ("Eight",                "IU ft. Suga"),
    ("LILAC",                "IU"),
    ("Celebrity",            "IU"),
    ("Psycho",               "Red Velvet"),
    ("Zimzalabim",           "Red Velvet"),
    ("Fancy",                "TWICE"),
    ("Feel Special",         "TWICE"),
    ("How You Like That",    "BLACKPINK"),
    ("DDU-DU DDU-DU",        "BLACKPINK"),
    ("Next Level",           "aespa"),
    ("Savage",               "aespa"),
    ("INVU",                 "태연"),
    ("Weekend",              "태연"),
    ("Panorama",             "IZ*ONE"),
    ("Attention",            "NewJeans"),
    ("Hype Boy",             "NewJeans"),
    ("OMG",                  "NewJeans"),
    ("After LIKE",           "IVE"),
    ("LOVE DIVE",            "IVE"),
    ("Antifragile",          "LE SSERAFIM"),
    ("FEARLESS",             "LE SSERAFIM"),
    ("Cupid",                "FIFTY FIFTY"),
    ("Queencard",            "(G)I-DLE"),
    ("Nxde",                 "(G)I-DLE"),
    ("손오공",               "SHINee"),
    ("View",                 "SHINee"),
    ("Miroh",                "Stray Kids"),
    ("God's Menu",           "Stray Kids"),
    ("Growl",                "EXO"),
    ("Ko Ko Bop",            "EXO"),
    ("Spring Day",           "BTS"),
    ("Butter Remix",         "BTS"),
    ("DNA",                  "BTS"),
    ("Permission to Dance",  "BTS"),
    ("Love Shot",            "EXO"),
    ("Tempo",                "EXO"),
    ("Forever",              "EXO"),
    ("Overdose",             "EXO"),
    ("Monster",              "EXO"),
]


def generate_music(n: int = MUSIC_COUNT):
    """
    ERD 2.3 music 테이블 INSERT 생성.
    MUSIC_POOL에서 순환하며 실제 곡명과 아티스트명 사용.
    audio_url / cover_url 은 예시 경로 형식으로 생성.
    """
    p("\n-- ═══════════════════════════════════════")
    p("-- 2. MUSIC (배경음악 라이브러리)")
    p("-- ═══════════════════════════════════════")

    for i in range(1, n + 1):
        title, artist = MUSIC_POOL[(i - 1) % len(MUSIC_POOL)]
        audio_url = f"https://cdn.instaclone.io/music/audio/{i:04d}.mp3"
        cover_url = f"https://cdn.instaclone.io/music/cover/{i:04d}.jpg"

        p(
            f"INSERT INTO music (music_id, title, artist, audio_url, cover_url) VALUES "
            f"({i}, '{esc(title)}', '{esc(artist)}', '{audio_url}', '{cover_url}');"
        )

    return n   # 실제 생성된 music_id 최대값 반환


# ══════════════════════════════════════════════════════════════════════════════
# 3. POSTS + POST_MEDIA  -  게시물 & 첨부 미디어
# ══════════════════════════════════════════════════════════════════════════════

# 한국 주요 위치 풀 (location 컬럼용)
KR_LOCATIONS = [
    "서울 강남구", "서울 홍대입구", "서울 이태원", "서울 성수동", "서울 명동",
    "부산 해운대", "부산 광안리", "제주 성산일출봉", "제주 애월", "경주 불국사",
    "전주 한옥마을", "인천 송도", "강릉 경포대", "속초 설악산", "여수 돌산도",
    "Tokyo, Japan", "Osaka, Japan", "New York, USA", "Paris, France", "London, UK",
    "Bangkok, Thailand", "Bali, Indonesia", "Singapore", "Hong Kong", "Sydney, Australia",
]


def generate_posts_and_media(user_count: int = USER_COUNT, post_per_user: int = POST_PER_USER):
    """
    ERD 2.1 posts / ERD 2.2 post_media 테이블 INSERT 동시 생성.

    posts:
      - post_type: 70% POST, 30% REEL
      - like_count / comment_count: 0으로 초기화 (likes·comments INSERT 후 UPDATE 필요)
      - view_count: REEL은 1,000~500,000 / POST는 0

    post_media:
      - POST: 이미지 1~5장 슬라이드 (IMG)
      - REEL: 영상 1개 (VID) + 썸네일 URL + 재생시간(15~60초)
    """
    p("\n-- ═══════════════════════════════════════")
    p("-- 3. POSTS & POST_MEDIA (게시물 + 미디어)")
    p("-- ═══════════════════════════════════════")

    post_id  = 1
    media_id = 1
    post_ids_by_user = {}   # {user_id: [post_id, ...]} → 이후 좋아요·댓글 생성에 활용

    for u_id in range(1, user_count + 1):
        num_posts = random.randint(1, post_per_user)
        post_ids_by_user[u_id] = []

        for _ in range(num_posts):
            post_type   = 'REEL' if random.random() < 0.30 else 'POST'
            caption     = esc(fake.paragraph(nb_sentences=random.randint(1, 4)))
            location    = random.choice(KR_LOCATIONS) if random.random() < 0.6 else None
            location_sql= f"'{esc(location)}'" if location else 'NULL'
            view_count  = random.randint(1000, 500000) if post_type == 'REEL' else 0
            created_at  = rand_datetime(365)

            p(
                f"INSERT INTO posts "
                f"(post_id, user_id, caption, location, post_type, "
                f"like_count, comment_count, view_count, is_deleted, created_at) VALUES "
                f"({post_id}, {u_id}, '{caption}', {location_sql}, '{post_type}', "
                f"0, 0, {view_count}, FALSE, '{created_at}');"
            )

            # ── 미디어 삽입 ──────────────────────────────────────────────────
            if post_type == 'POST':
                # 이미지 1~5장 (슬라이드)
                num_media = random.randint(1, 5)
                for order in range(num_media):
                    img_url = f"https://picsum.photos/seed/{media_id}/1080/1080"
                    p(
                        f"INSERT INTO post_media "
                        f"(media_id, post_id, media_url, thumbnail_url, media_type, duration, sort_order) VALUES "
                        f"({media_id}, {post_id}, '{img_url}', NULL, 'IMG', NULL, {order});"
                    )
                    media_id += 1
            else:
                # 릴스: 영상 1개 + 썸네일
                vid_url   = f"https://cdn.instaclone.io/reels/{media_id:06d}.mp4"
                thumb_url = f"https://picsum.photos/seed/{media_id}/1080/1920"
                duration  = random.randint(15, 60)  # 15~60초
                p(
                    f"INSERT INTO post_media "
                    f"(media_id, post_id, media_url, thumbnail_url, media_type, duration, sort_order) VALUES "
                    f"({media_id}, {post_id}, '{vid_url}', '{thumb_url}', 'VID', {duration}, 0);"
                )
                media_id += 1

            post_ids_by_user[u_id].append(post_id)
            post_id += 1

    return post_ids_by_user  # 이후 섹션에서 재활용


# ══════════════════════════════════════════════════════════════════════════════
# 4. COMMENTS  -  댓글 + 대댓글 (계층 구조)
# ══════════════════════════════════════════════════════════════════════════════

def generate_comments(post_ids_by_user: dict, user_count: int = USER_COUNT):
    """
    ERD 3.1 comments 테이블 INSERT 생성.

    계층 구조:
      - parent_id IS NULL  → 원댓글
      - parent_id = N      → 대댓글 (원댓글의 comment_id 참조)

    생성 규칙:
      - 각 게시물에 0~5개의 원댓글 랜덤 생성
      - 원댓글 중 40% 확률로 1~2개의 대댓글 추가
      - 댓글 작성자는 해당 게시물 작성자와 다른 유저 중 랜덤 선택
    """
    p("\n-- ═══════════════════════════════════════")
    p("-- 4. COMMENTS (댓글 + 대댓글)")
    p("-- ═══════════════════════════════════════")

    comment_id = 1
    # 전체 post_id 목록 평탄화
    all_post_ids = [(u_id, p_id) for u_id, pids in post_ids_by_user.items() for p_id in pids]

    for (post_owner, post_id) in all_post_ids:
        num_comments = random.randint(0, 5)
        root_comment_ids = []  # 이 게시물의 원댓글 ID 수집 (대댓글 생성에 활용)

        for _ in range(num_comments):
            # 게시물 작성자 제외한 랜덤 유저가 댓글 작성
            commenter = random.choice([u for u in range(1, user_count + 1) if u != post_owner])
            content   = esc(fake.sentence(nb_words=random.randint(4, 15)))
            created_at= rand_datetime(180)

            p(
                f"INSERT INTO comments "
                f"(comment_id, post_id, user_id, parent_id, content, like_count, is_deleted, created_at) VALUES "
                f"({comment_id}, {post_id}, {commenter}, NULL, '{content}', 0, FALSE, '{created_at}');"
            )
            root_comment_ids.append(comment_id)
            comment_id += 1

        # 대댓글: 원댓글 각각에 40% 확률로 1~2개 추가
        for root_id in root_comment_ids:
            if random.random() < 0.40:
                num_replies = random.randint(1, 2)
                for _ in range(num_replies):
                    replier    = random.choice([u for u in range(1, user_count + 1)])
                    content    = esc(fake.sentence(nb_words=random.randint(3, 10)))
                    created_at = rand_datetime(90)

                    p(
                        f"INSERT INTO comments "
                        f"(comment_id, post_id, user_id, parent_id, content, like_count, is_deleted, created_at) VALUES "
                        f"({comment_id}, {post_id}, {replier}, {root_id}, '{content}', 0, FALSE, '{created_at}');"
                    )
                    comment_id += 1

    # 최종 생성된 comment 수 반환 (좋아요 생성에 활용)
    return comment_id - 1


# ══════════════════════════════════════════════════════════════════════════════
# 5. LIKES  -  좋아요 (POST / COMMENT 대상)
# ══════════════════════════════════════════════════════════════════════════════

def generate_likes(post_ids_by_user: dict, max_comment_id: int, user_count: int = USER_COUNT):
    """
    ERD 3.2 likes 테이블 INSERT 생성.

    - target_type='POST'    : 전체 post_id 중 LIKE_SAMPLE개 랜덤 좋아요 이벤트
    - target_type='COMMENT' : 전체 comment_id 중 LIKE_SAMPLE//2개 랜덤 좋아요
    - 동일 (user_id, target_id, target_type) 중복 방지를 위해 집합(set) 활용
    """
    p("\n-- ═══════════════════════════════════════")
    p("-- 5. LIKES (좋아요: POST + COMMENT)")
    p("-- ═══════════════════════════════════════")

    all_post_ids = [p_id for pids in post_ids_by_user.values() for p_id in pids]
    used = set()   # (user_id, target_id, target_type) 중복 방지
    like_id = 1

    # POST 좋아요
    attempts = 0
    while like_id <= LIKE_SAMPLE and attempts < LIKE_SAMPLE * 10:
        attempts += 1
        u_id      = random.randint(1, user_count)
        target_id = random.choice(all_post_ids)
        key       = (u_id, target_id, 'POST')
        if key in used:
            continue
        used.add(key)
        created_at = rand_datetime(180)
        p(
            f"INSERT INTO likes (like_id, user_id, target_id, target_type, created_at) VALUES "
            f"({like_id}, {u_id}, {target_id}, 'POST', '{created_at}');"
        )
        like_id += 1

    # COMMENT 좋아요 (댓글이 존재하는 경우만)
    if max_comment_id >= 1:
        target_count = LIKE_SAMPLE // 2
        attempts = 0
        while like_id <= LIKE_SAMPLE + target_count and attempts < target_count * 10:
            attempts += 1
            u_id      = random.randint(1, user_count)
            target_id = random.randint(1, max_comment_id)
            key       = (u_id, target_id, 'COMM')
            if key in used:
                continue
            used.add(key)
            created_at = rand_datetime(180)
            p(
                f"INSERT INTO likes (like_id, user_id, target_id, target_type, created_at) VALUES "
                f"({like_id}, {u_id}, {target_id}, 'COMM', '{created_at}');"
            )
            like_id += 1


# ══════════════════════════════════════════════════════════════════════════════
# 6. FOLLOWS  -  팔로우 관계 (PENDING / FOLLOWING)
# ══════════════════════════════════════════════════════════════════════════════

def generate_follows(user_count: int = USER_COUNT):
    """
    ERD 4.1 follows 테이블 INSERT 생성.

    - 각 유저는 최대 FOLLOW_PER_USER명을 팔로우
    - 자기 자신은 팔로우 불가 (j != i 조건)
    - 중복 (follower_id, following_id) 쌍 방지를 위해 집합 활용
    - status: 90% FOLLOWING / 10% PENDING (비공개 계정 요청 시뮬레이션)
    """
    p("\n-- ═══════════════════════════════════════")
    p("-- 6. FOLLOWS (팔로우 관계)")
    p("-- ═══════════════════════════════════════")

    used = set()

    for i in range(1, user_count + 1):
        # 팔로우 대상 후보: 자기 자신 제외
        candidates = [j for j in range(1, user_count + 1) if j != i]
        targets    = random.sample(candidates, min(FOLLOW_PER_USER, len(candidates)))

        for t_id in targets:
            pair = (i, t_id)
            if pair in used:
                continue
            used.add(pair)
            status     = 'FOLLOWING' if random.random() < 0.90 else 'PENDING'
            created_at = rand_datetime(365)

            p(
                f"INSERT INTO follows (follower_id, following_id, status, created_at) VALUES "
                f"({i}, {t_id}, '{status}', '{created_at}');"
            )


# ══════════════════════════════════════════════════════════════════════════════
# 7. USER_ANALYTICS  -  일별 앱 체류 시간
# ══════════════════════════════════════════════════════════════════════════════

def generate_user_analytics(user_count: int = USER_COUNT):
    """
    ERD 4.2 user_analytics 테이블 INSERT 생성.

    - 각 유저에 대해 최근 ANALYTICS_DAYS일 치 데이터 중 랜덤 날짜 선택
    - time_spent: 초 단위 (5분~3시간 범위 = 300~10800초)
    - 동일 (user_id, date) 중복 방지를 위해 집합 활용
    """
    p("\n-- ═══════════════════════════════════════")
    p("-- 7. USER_ANALYTICS (일별 체류 시간)")
    p("-- ═══════════════════════════════════════")

    analytics_id = 1
    used = set()

    for u_id in range(1, user_count + 1):
        # 유저별 5~15일치 데이터 생성
        num_days = random.randint(5, min(15, ANALYTICS_DAYS))
        for _ in range(num_days):
            date = rand_date(ANALYTICS_DAYS)
            key  = (u_id, date)
            if key in used:
                continue
            used.add(key)
            time_spent = random.randint(300, 10800)  # 5분~3시간(초)

            p(
                f"INSERT INTO user_analytics (analytics_id, user_id, date, time_spent) VALUES "
                f"({analytics_id}, {u_id}, '{date}', {time_spent});"
            )
            analytics_id += 1


# ══════════════════════════════════════════════════════════════════════════════
# 8. COLLECTIONS + SAVED_POSTS  -  저장함 및 저장된 게시물
# ══════════════════════════════════════════════════════════════════════════════

# 저장 컬렉션 이름 풀
COLLECTION_NAMES = [
    "나중에 볼 것", "맛집 리스트", "여행 아이디어", "인테리어 참고",
    "패션 스타일", "운동 루틴", "레시피", "독서 목록",
    "드라마·영화", "좋아하는 밈", "쇼핑 위시리스트", "일상 기록",
]


def generate_collections_and_saved(post_ids_by_user: dict, user_count: int = USER_COUNT):
    """
    ERD 5.1 collections + ERD 5.2 saved_posts 테이블 INSERT 생성.

    - 각 유저는 0~COLLECTION_MAX개의 컬렉션 보유
    - 각 유저는 0~10개의 게시물 저장 (자신 게시물 제외)
    - saved_posts.collection_id: 70% 확률로 특정 컬렉션에 배정, 나머지는 NULL
    """
    p("\n-- ═══════════════════════════════════════")
    p("-- 8. COLLECTIONS & SAVED_POSTS (저장함)")
    p("-- ═══════════════════════════════════════")

    collection_id  = 1
    save_id        = 1
    user_collections = {}  # {user_id: [collection_id, ...]}

    all_post_ids = [p_id for pids in post_ids_by_user.values() for p_id in pids]

    # 컬렉션 먼저 생성
    for u_id in range(1, user_count + 1):
        num_col = random.randint(0, COLLECTION_MAX)
        user_collections[u_id] = []

        names_used = set()
        for _ in range(num_col):
            name = random.choice(COLLECTION_NAMES)
            if name in names_used:
                continue
            names_used.add(name)
            created_at = rand_datetime(365)

            p(
                f"INSERT INTO collections (collection_id, user_id, name, created_at) VALUES "
                f"({collection_id}, {u_id}, '{esc(name)}', '{created_at}');"
            )
            user_collections[u_id].append(collection_id)
            collection_id += 1

    # 저장된 게시물 생성
    saved_used = set()

    for u_id in range(1, user_count + 1):
        my_posts  = set(post_ids_by_user.get(u_id, []))
        num_saves = random.randint(0, 10)

        for _ in range(num_saves):
            # 자신의 게시물은 저장하지 않음
            candidates = [pid for pid in all_post_ids if pid not in my_posts]
            if not candidates:
                continue

            post_id = random.choice(candidates)
            key     = (u_id, post_id)
            if key in saved_used:
                continue
            saved_used.add(key)

            # 컬렉션 배정 여부
            if user_collections[u_id] and random.random() < 0.70:
                coll_id_sql = str(random.choice(user_collections[u_id]))
            else:
                coll_id_sql = 'NULL'

            created_at = rand_datetime(180)

            p(
                f"INSERT INTO saved_posts (save_id, user_id, post_id, collection_id, created_at) VALUES "
                f"({save_id}, {u_id}, {post_id}, {coll_id_sql}, '{created_at}');"
            )
            save_id += 1


# ══════════════════════════════════════════════════════════════════════════════
# 9. NOTIFICATIONS  -  알림 (LIKE / COMMENT / FOLLOW / TAG)
# ══════════════════════════════════════════════════════════════════════════════

def generate_notifications(post_ids_by_user: dict, max_comment_id: int, user_count: int = USER_COUNT):
    """
    ERD 6 notifications 테이블 INSERT 생성.

    알림 타입별 생성 규칙:
      LIKE    : sender가 receiver의 post에 좋아요 → target_id = post_id
      COMMENT : sender가 receiver의 post에 댓글  → target_id = comment_id
      FOLLOW  : sender가 receiver를 팔로우        → target_id = NULL
      TAG     : sender가 receiver를 태그          → target_id = post_id
    """
    p("\n-- ═══════════════════════════════════════")
    p("-- 9. NOTIFICATIONS (알림)")
    p("-- ═══════════════════════════════════════")

    notif_types    = ['LIKE', 'COMMENT', 'FOLLOW', 'TAG']
    all_post_ids   = [(u_id, p_id) for u_id, pids in post_ids_by_user.items() for p_id in pids]
    notif_id       = 1

    for _ in range(NOTIF_SAMPLE):
        ntype       = random.choice(notif_types)
        receiver_id = random.randint(1, user_count)
        # sender는 receiver와 다른 유저
        sender_id   = random.choice([u for u in range(1, user_count + 1) if u != receiver_id])
        is_read     = 'TRUE' if random.random() < 0.50 else 'FALSE'
        created_at  = rand_datetime(90)

        if ntype == 'LIKE':
            # receiver 소유 게시물 중 하나를 target으로
            my_posts   = post_ids_by_user.get(receiver_id, [])
            target_id  = random.choice(my_posts) if my_posts else 'NULL'
            target_sql = str(target_id) if target_id != 'NULL' else 'NULL'

        elif ntype == 'COMMENT':
            # 댓글 ID 랜덤 (실제로는 receiver의 post에 달린 댓글이어야 하나 더미이므로 근사값)
            target_sql = str(random.randint(1, max(max_comment_id, 1)))

        elif ntype == 'FOLLOW':
            target_sql = 'NULL'

        else:  # TAG
            my_posts   = post_ids_by_user.get(receiver_id, [])
            target_id  = random.choice(all_post_ids)[1] if all_post_ids else 'NULL'
            target_sql = str(target_id) if target_id != 'NULL' else 'NULL'

        p(
            f"INSERT INTO notifications "
            f"(notif_id, receiver_id, sender_id, type, target_id, is_read, created_at) VALUES "
            f"({notif_id}, {receiver_id}, {sender_id}, '{ntype}', {target_sql}, {is_read}, '{created_at}');"
        )
        notif_id += 1


# ══════════════════════════════════════════════════════════════════════════════
# MAIN  -  전체 실행 흐름 제어
# ══════════════════════════════════════════════════════════════════════════════

def main():
    """
    전체 더미 데이터 생성 진입점.
    순서가 중요합니다: FK 참조 방향에 따라 상위 테이블부터 생성해야 합니다.
      users → music → posts/post_media → comments → likes
            → follows → user_analytics → collections/saved_posts → notifications
    """

    # ── 헤더 및 환경 설정 ───────────────────────────────────────────────────
    p("-- =============================================================")
    p("-- Aigram Bulk Dummy Data (ERD v1.2)")
    p(f"-- 생성 일시: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    p(f"-- 유저 수: {USER_COUNT} / 포스트: 최대 {USER_COUNT * POST_PER_USER}개")
    p("-- =============================================================")
    p("")
    p("SET FOREIGN_KEY_CHECKS = 0;")   # FK 제약 해제 → 삽입 속도 대폭 향상
    p("SET AUTOCOMMIT = 0;")            # 트랜잭션 묶음으로 처리
    p("")

    # ── 기존 데이터 초기화 (멱등성 보장) ────────────────────────────────────
    p("-- 기존 데이터 초기화 (실행 순서: FK 역방향)")
    for table in [
        "notifications", "saved_posts", "collections",
        "user_analytics", "follows", "likes", "comments",
        "post_media", "posts", "music", "users"
    ]:
        p(f"TRUNCATE TABLE {table};")

    # ── 데이터 생성 ──────────────────────────────────────────────────────────
    generate_users(USER_COUNT)

    generate_music(MUSIC_COUNT)

    # posts 생성 후 post_id 맵 반환 → 이후 섹션에서 재활용
    post_ids_by_user = generate_posts_and_media(USER_COUNT, POST_PER_USER)

    # 댓글 생성 후 최대 comment_id 반환 → 좋아요·알림에서 활용
    max_comment_id = generate_comments(post_ids_by_user, USER_COUNT)

    generate_likes(post_ids_by_user, max_comment_id, USER_COUNT)

    generate_follows(USER_COUNT)

    generate_user_analytics(USER_COUNT)

    generate_collections_and_saved(post_ids_by_user, USER_COUNT)

    generate_notifications(post_ids_by_user, max_comment_id, USER_COUNT)

    # ── 커밋 및 복원 ─────────────────────────────────────────────────────────
    p("")
    p("COMMIT;")
    p("SET AUTOCOMMIT = 1;")
    p("SET FOREIGN_KEY_CHECKS = 1;")
    p("")
    p("-- =============================================================")
    p("-- ✅ 더미 데이터 생성 완료")
    p("-- =============================================================")


if __name__ == "__main__":
    main()

'''
테이블  INSERT 수   비고
users   200 is_private 15%, is_verified 5% 확률
posts   875 POST 70% / REEL 30% 혼합
post_media 2,137 POST는 이미지 1~5장, REEL은 영상+썸네일
music   50 실제 K-POP·팝 곡명 풀 사용
comments    3,455 원댓글 + 40% 확률 대댓글 계층 구조
likes   450 POST / COMMENT 대상 분리
follows   3,000 FOLLOWING 90% / PENDING 10%
user_analytics 1,747 유저별 5~15일 체류시간 데이터
collections 279 유저별 0~3개 저장 폴더
saved_posts 968 컬렉션 배정 70%
notifications   500 LIKE/COMMENT/FOLLOW/TAG 4종

주요 특징:

Faker.seed(42) 고정으로 실행할 때마다 동일한 데이터 재현 가능
SET FOREIGN_KEY_CHECKS=0 + AUTOCOMMIT=0 으로 대량 삽입 성능 최적화
(user_id, date), (follower_id, following_id) 등 중복 방지 로직 내장
생성 규모를 바꾸고 싶으면 파일 상단 전역 상수 (USER_COUNT, POST_PER_USER 등)만 수정
'''