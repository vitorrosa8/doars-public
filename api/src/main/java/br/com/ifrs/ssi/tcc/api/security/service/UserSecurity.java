package br.com.ifrs.ssi.tcc.api.security.service;

import br.com.ifrs.ssi.tcc.api.security.model.Users;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.stream.Collectors;


public class UserSecurity implements UserDetails {

    private Long id;
    private String email;
    private String password;
    private List<SimpleGrantedAuthority> permissions;

    public UserSecurity(Users users) {
        this.id = users.getId();
        this.email = users.getEmail();
        this.password = users.getPassword();
        this.permissions = convertePermissions(users);
    }

    private List<SimpleGrantedAuthority> convertePermissions(Users users) {
        return users.getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority("ROLE_" + permission.getName()))
                .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    @Override
    public List<SimpleGrantedAuthority> getAuthorities() {
        return this.permissions;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
