package br.com.ifrs.ssi.tcc.api.service.post;

import br.com.ifrs.ssi.tcc.api.controller.request.CommentPostRequest;
import br.com.ifrs.ssi.tcc.api.model.Comment;
import br.com.ifrs.ssi.tcc.api.model.Post;
import br.com.ifrs.ssi.tcc.api.repository.CommentRepository;
import br.com.ifrs.ssi.tcc.api.repository.PostRepository;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import br.com.ifrs.ssi.tcc.api.security.service.UserAuthenticatedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentPostService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserAuthenticatedService userAuthenticatedService;

    public void comment(Long postId, CommentPostRequest request) {

        Users loggedUser = userAuthenticatedService.get();

        Post post = postRepository.findById(postId).get();

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setUser(loggedUser);
        comment.setText(request.getText());

        commentRepository.save(comment);
    }
}
