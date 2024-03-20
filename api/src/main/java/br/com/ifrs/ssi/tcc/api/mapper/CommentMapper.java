package br.com.ifrs.ssi.tcc.api.mapper;

import br.com.ifrs.ssi.tcc.api.controller.response.CommentResponse;
import br.com.ifrs.ssi.tcc.api.model.Comment;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CommentMapper {

    public static CommentResponse toResponse(Comment comment) {
        return CommentResponse.builder()
                .id(comment.getId())
                .user(UserMapper.toResponse(comment.getUser()))
                .text(comment.getText())
                .build();
    }

}
