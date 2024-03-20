package br.com.ifrs.ssi.tcc.api.service.post;

import br.com.ifrs.ssi.tcc.api.controller.response.PostResponse;
import br.com.ifrs.ssi.tcc.api.mapper.PostMapper;
import br.com.ifrs.ssi.tcc.api.model.Post;
import br.com.ifrs.ssi.tcc.api.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetPostByIdService {

    @Autowired
    PostRepository postRepository;

    public PostResponse getPostById(Long postId) {
        Optional<Post> postOptional = postRepository.findById(postId);

        return postOptional.map(PostMapper::toResponse).orElse(null);
    }
}
