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
public class ListAllPostsService {

    @Autowired
    PostRepository postRepository;

    public Page<PostResponse> listAllPosts(Pageable pageable) {

        Page<Post> allPosts = postRepository.findAllOrderByDateCreatedDesc(pageable);

        List<PostResponse> response = allPosts.stream().map(PostMapper::toResponse).collect(Collectors.toList());

        return new PageImpl<>(response);
    }
}

