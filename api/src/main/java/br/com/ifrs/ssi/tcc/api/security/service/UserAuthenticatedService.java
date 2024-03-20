package br.com.ifrs.ssi.tcc.api.security.service;

import br.com.ifrs.ssi.tcc.api.security.model.Users;
import br.com.ifrs.ssi.tcc.api.service.user.FindUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserAuthenticatedService {

    @Autowired
    private FindUserService findUserService;

    public Long getId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserSecurity userSecurity = (UserSecurity) authentication.getPrincipal();
        return userSecurity.getId();
    }

    public Users get() {
        return findUserService.findById(getId());
    }
}
