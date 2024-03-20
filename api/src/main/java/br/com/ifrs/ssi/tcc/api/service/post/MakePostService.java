package br.com.ifrs.ssi.tcc.api.service.post;

import br.com.ifrs.ssi.tcc.api.controller.request.PostRequest;
import br.com.ifrs.ssi.tcc.api.model.Post;
import br.com.ifrs.ssi.tcc.api.repository.PostRepository;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import br.com.ifrs.ssi.tcc.api.security.service.UserAuthenticatedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static br.com.ifrs.ssi.tcc.api.mapper.PostMapper.toEntity;
import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;

@Service
public class MakePostService {

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserAuthenticatedService userAuthenticatedService;

    public void make(PostRequest request){

        Users loggedUser = userAuthenticatedService.get();

        Post post = toEntity(request);

        post.setInstitution(loggedUser);
        post.setDateCreated(LocalDateTime.now());
        postRepository.save(post);
        post.setShareLink(generateShareLink(post.getId()));
        postRepository.save(post);
    }

    private static String generateShareLink(Long postId) {
        return "http://localhost:3000/post/share/" + postId;
    }

}
