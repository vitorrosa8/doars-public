package br.com.ifrs.ssi.tcc.api.service.post;

import br.com.ifrs.ssi.tcc.api.controller.response.PostResponse;
import br.com.ifrs.ssi.tcc.api.mapper.PostMapper;
import br.com.ifrs.ssi.tcc.api.model.Post;
import br.com.ifrs.ssi.tcc.api.repository.PostRepository;
import br.com.ifrs.ssi.tcc.api.repository.UserRepository;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListUsersPostService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    public Page<PostResponse> list(Long userId, Pageable pageable) {

        Users users = userRepository.findById(userId).get();

        Page<Post> posts = postRepository.findByInstitutionOrderByDateCreatedDesc(users, pageable);

        List<PostResponse> response = posts.stream().map(PostMapper::toResponse).collect(Collectors.toList());

        return new PageImpl<>(response);
    }


}
