package br.com.ifrs.ssi.tcc.api.service.follow;

import br.com.ifrs.ssi.tcc.api.model.Follow;
import br.com.ifrs.ssi.tcc.api.repository.FollowRepository;
import br.com.ifrs.ssi.tcc.api.repository.UserRepository;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import br.com.ifrs.ssi.tcc.api.security.service.UserAuthenticatedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FollowInstitutionService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserAuthenticatedService userAuthenticatedService;

    public void followUser(Long userIdToFollow) {
        Users loggedUser = userAuthenticatedService.get();
        Users userToFollow = userRepository.findById(userIdToFollow).get();

        Follow follow = followRepository.findByFollowerAndFollowing(loggedUser, userToFollow);

        if (follow == null) {
            follow = new Follow();
            follow.setFollower(loggedUser);
            follow.setFollowing(userToFollow);

            followRepository.save(follow);
        }
    }

    public void unfollowUser(Long userIdToUnfollow) {
        Users loggedUser = userAuthenticatedService.get();
        Users userToUnfollow = userRepository.findById(userIdToUnfollow).get();

        Follow follow = followRepository.findByFollowerAndFollowing(loggedUser, userToUnfollow);

        if (follow != null) {
            followRepository.delete(follow);
        }
    }

    public boolean isFollowing(Long followerId, Long followingId) {
        Optional<Follow> follow = followRepository.findByFollowerIdAndFollowingId(followerId, followingId);
        return follow.isPresent();
    }
}
