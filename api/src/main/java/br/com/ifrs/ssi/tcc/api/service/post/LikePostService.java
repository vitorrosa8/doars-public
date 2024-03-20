package br.com.ifrs.ssi.tcc.api.service.post;

import br.com.ifrs.ssi.tcc.api.model.PostLike;
import br.com.ifrs.ssi.tcc.api.model.Post;
import br.com.ifrs.ssi.tcc.api.repository.PostLikeRepository;
import br.com.ifrs.ssi.tcc.api.repository.PostRepository;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import br.com.ifrs.ssi.tcc.api.security.service.UserAuthenticatedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikePostService {

    @Autowired
    PostLikeRepository postLikeRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserAuthenticatedService userAuthenticatedService;

    public void like(Long postId){

        Users loggedUser = userAuthenticatedService.get();

        Post post = postRepository.findById(postId).get();

        PostLike postLike = postLikeRepository.findByUserAndPost(loggedUser, post);

        if(postLike != null){
            postLikeRepository.delete(postLike);
        }else{
            PostLike newPostLike = new PostLike();
            newPostLike.setPost(post);
            newPostLike.setUser(loggedUser);

            postLikeRepository.save(newPostLike);
        }
    }
}
