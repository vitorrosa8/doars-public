package br.com.ifrs.ssi.tcc.api.security.service;

import br.com.ifrs.ssi.tcc.api.security.model.Users;
import br.com.ifrs.ssi.tcc.api.service.user.FindUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class FindUserSecurityService implements UserDetailsService {

    @Autowired
    private FindUserService findUserService;

    @Override
    public UserDetails loadUserByUsername(String email) {
        Users users = findUserService.findByEmail(email);
        return new UserSecurity(users);
    }
}

