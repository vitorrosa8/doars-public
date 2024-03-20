package br.com.ifrs.ssi.tcc.api.security.model;

import br.com.ifrs.ssi.tcc.api.model.Follow;
import lombok.*;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Builder @NoArgsConstructor @AllArgsConstructor
@Getter @Setter @EqualsAndHashCode(of = "id") @ToString(of = "id")
public class Users {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String uf;

    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private boolean isInstitution;

    @Lob
    private byte[] image;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String contact;

    @Column(columnDefinition = "TEXT")
    private String history;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private List<DonationType> donationNeeds;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private List<Permission> permissions;

    @OneToMany(mappedBy = "following", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Follow> followers;

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Follow> following;
}
