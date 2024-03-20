package br.com.ifrs.ssi.tcc.api.repository;

import br.com.ifrs.ssi.tcc.api.model.PostLike;
import br.com.ifrs.ssi.tcc.api.model.Post;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    PostLike findByUserAndPost(Users loggedUser, Post post);
}
