package br.com.ifrs.ssi.tcc.api.model;

import br.com.ifrs.ssi.tcc.api.security.model.DonationType;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id") @ToString(of = "id")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    private Users institution;

    private String text;

    @Lob
    private byte[] image;

    private LocalDateTime dateCreated;

    @OneToMany(mappedBy = "post")
    private List<PostLike> postLikes;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments;

    private String shareLink;

}
