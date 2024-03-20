package br.com.ifrs.ssi.tcc.api.service.post;

import br.com.ifrs.ssi.tcc.api.model.Post;
import br.com.ifrs.ssi.tcc.api.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SharePostService {

    @Autowired
    PostRepository postRepository;

    public String share(Long postId){
        Post post = postRepository.findById(postId).get();

        return post.getShareLink();
    }

}
