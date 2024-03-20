package br.com.ifrs.ssi.tcc.api.service.post;

import br.com.ifrs.ssi.tcc.api.controller.response.PostResponse;
import br.com.ifrs.ssi.tcc.api.mapper.PostMapper;
import br.com.ifrs.ssi.tcc.api.model.Follow;
import br.com.ifrs.ssi.tcc.api.model.Post;
import br.com.ifrs.ssi.tcc.api.repository.PostRepository;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import br.com.ifrs.ssi.tcc.api.security.service.UserAuthenticatedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListFollowedPostsService {

    @Autowired
    UserAuthenticatedService userAuthenticatedService;

    @Autowired
    PostRepository postRepository;

    public Page<PostResponse> list(Pageable pageable) {

        Users users = userAuthenticatedService.get();

        List<Long> followedInstitutionIds = users.getFollowing().stream()
                .map(Follow::getFollowing).map(Users::getId).collect(Collectors.toList());

        Page<Post> followedPosts = postRepository
                .findByInstitutionInOrderByDateCreatedDesc(followedInstitutionIds, pageable);

        List<PostResponse> response = followedPosts.stream().map(PostMapper::toResponse).collect(Collectors.toList());

        return new PageImpl<>(response);
    }
}
