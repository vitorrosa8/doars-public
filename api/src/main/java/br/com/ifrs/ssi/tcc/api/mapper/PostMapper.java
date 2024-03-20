package br.com.ifrs.ssi.tcc.api.mapper;

import br.com.ifrs.ssi.tcc.api.controller.request.PostRequest;
import br.com.ifrs.ssi.tcc.api.controller.response.CommentResponse;
import br.com.ifrs.ssi.tcc.api.controller.response.LikeResponse;
import br.com.ifrs.ssi.tcc.api.controller.response.PostResponse;
import br.com.ifrs.ssi.tcc.api.model.Post;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostMapper {
    public static Post toEntity(PostRequest request) {
        return Post.builder()
                .text(request.getText())
                .image(request.getImage())
                .build();
    }

    public static PostResponse toResponse(Post post) {

        List<CommentResponse> commentsResponse = post.getComments().stream()
                .map(CommentMapper::toResponse)
                .collect(Collectors.toList());

        List<LikeResponse> likesResponse = post.getPostLikes().stream()
                .map(PostLikeMapper::toResponse)
                .collect(Collectors.toList());

        return PostResponse.builder()
                .id(post.getId())
                .institution(UserMapper.toResponse(post.getInstitution()))
                .text(post.getText())
                .comments(commentsResponse)
                .likes(likesResponse)
                .image(post.getImage())
                .dateCreated(post.getDateCreated())
                .shareLink(post.getShareLink())
                .build();
    }

}
