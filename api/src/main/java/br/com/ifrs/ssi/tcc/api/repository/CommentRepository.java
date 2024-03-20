package br.com.ifrs.ssi.tcc.api.repository;

import br.com.ifrs.ssi.tcc.api.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
