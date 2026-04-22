# docs/code-examples/jpa-examples.java - Spring Data JPA 쿼리 예제

Spring Data JPA 및 QueryDSL을 사용한 주요 비즈니스 로직 예제입니다.

```java
// 1. 피드 조회 (내가 팔로우한 사람의 게시물 우선 + 최신순 + 페이징)
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
    @Query("SELECT p FROM Post p " +
           "JOIN p.user u " +
           "JOIN u.followers f " +
           "WHERE f.follower.id = :userId " +
           "ORDER BY p.createdAt DESC")
    Page<Post> findFeedByUserId(@Param("userId") Long userId, Pageable pageable);
}

// 2. 비공개 계정 체크 후 스토리 조회
@Service
@Transactional(readOnly = true)
public class StoryService {
    
    public List<StoryDTO> getStories(Long viewerId, Long targetUserId) {
        User targetUser = userRepository.findById(targetUserId)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (targetUser.isPrivate()) {
            boolean isFollowing = followRepository.existsByFollowerIdAndFollowingId(viewerId, targetUserId);
            if (!isFollowing) {
                return Collections.emptyList();
            }
        }

        return storyRepository.findAllActiveStoriesByUserId(targetUserId, LocalDateTime.now())
            .stream().map(StoryDTO::from).toList();
    }
}

// 3. 좋아요 토글 (Optimistic Locking 고려 가능)
@Transactional
public void toggleLike(Long userId, Long postId) {
    Optional<Like> existingLike = likeRepository.findByUserIdAndPostId(userId, postId);
    
    if (existingLike.isPresent()) {
        likeRepository.delete(existingLike.get());
    } else {
        User user = userRepository.getReferenceById(userId);
        Post post = postRepository.getReferenceById(postId);
        likeRepository.save(new Like(user, post));
    }
}
```
