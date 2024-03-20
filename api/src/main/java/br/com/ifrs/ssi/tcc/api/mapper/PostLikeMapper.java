package br.com.ifrs.ssi.tcc.api.mapper;

import br.com.ifrs.ssi.tcc.api.controller.response.LikeResponse;
import br.com.ifrs.ssi.tcc.api.model.PostLike;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class PostLikeMapper {

    public static LikeResponse toResponse(PostLike postLike) {
        return LikeResponse.builder()
                .id(postLike.getId())
                .build();
    }
}

