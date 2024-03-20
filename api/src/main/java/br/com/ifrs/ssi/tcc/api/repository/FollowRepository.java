package br.com.ifrs.ssi.tcc.api.repository;

import br.com.ifrs.ssi.tcc.api.model.Follow;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface FollowRepository extends JpaRepository<Follow, Long> {

    Follow findByFollowerAndFollowing(Users follower, Users following);

    Optional<Follow> findByFollowerIdAndFollowingId(Long followerId, Long followingId);
}
