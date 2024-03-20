package br.com.ifrs.ssi.tcc.api.service.user;

import br.com.ifrs.ssi.tcc.api.controller.response.UserResponse;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import br.com.ifrs.ssi.tcc.api.security.service.UserAuthenticatedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static br.com.ifrs.ssi.tcc.api.mapper.UserMapper.toResponse;

@Service
public class DetailUserService {

    @Autowired
    private UserAuthenticatedService userAuthenticatedService;

    public UserResponse details() {

        Users users = userAuthenticatedService.get();
        return toResponse(users);
    }
}
