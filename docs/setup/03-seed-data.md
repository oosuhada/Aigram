# docs/setup/03-seed-data.md - 초기 데이터 주입 가이드

Aigram 프로젝트의 개발 및 테스트를 위한 대량 더미 데이터(Seed Data) 주입 방법입니다.

## 🐍 1단계: Python 데이터 생성 (선택 사항)
`docs/database/dummy-data-generator.py`를 실행하여 JSON 또는 SQL 형식의 데이터를 생성합니다.

## ☕ 2단계: Spring Boot CommandLineRunner (권장)
Spring Boot의 `CommandLineRunner` 인터페이스를 사용하여 애플리케이션 시작 시 데이터를 주입합니다.

```java
@Component
@Profile("dev") // 개발 환경에서만 실행
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // 유저 및 게시물 생성 로직
            User user = new User("alice", "alice@example.com");
            userRepository.save(user);
            
            Post post = new Post(user, "Hello Aigram!");
            postRepository.save(post);
            
            System.out.println("Seed Data Loaded Successfully!");
        }
    }
}
```

## 🛠 3단계: SQL 스크립트 활용
`src/main/resources/data.sql` 파일에 INSERT 문을 작성하여 하이버네이트 초기화 시 자동 실행할 수 있습니다.
