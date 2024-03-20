package br.com.ifrs.ssi.tcc.api.model;

import br.com.ifrs.ssi.tcc.api.security.model.Users;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(of = "id") @ToString(of = "id")
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follower_id", nullable = false)
    private Users follower;

    @ManyToOne
    @JoinColumn(name = "following_id", nullable = false)
    private Users following;
}
