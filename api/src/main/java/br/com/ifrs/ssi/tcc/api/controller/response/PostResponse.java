package br.com.ifrs.ssi.tcc.api.controller.response;

import br.com.ifrs.ssi.tcc.api.security.model.DonationType;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostResponse {

    private Long id;

    private UserResponse institution;

    private String text;

    private byte[] image;

    private LocalDateTime dateCreated;

    private List<CommentResponse> comments;

    private List<LikeResponse> likes;

    private String shareLink;

}
