package br.com.ifrs.ssi.tcc.api.controller;

import br.com.ifrs.ssi.tcc.api.service.follow.FollowInstitutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/follow")
public class FollowController {
    @Autowired
    private FollowInstitutionService followInstitutionService;

    @PostMapping("/{userId}")
    public void follow(@PathVariable Long userId) {
        followInstitutionService.followUser(userId);
    }

    @DeleteMapping("/{userId}")
    public void unfollow(@PathVariable Long userId) {
        followInstitutionService.unfollowUser(userId);
    }

    @GetMapping("/isFollowing/{followerId}/{followeeId}")
    public Boolean isFollowing(@PathVariable Long followerId, @PathVariable Long followeeId) {
        return followInstitutionService.isFollowing(followerId, followeeId);
    }

}
