package br.com.ifrs.ssi.tcc.api.security.service;

import br.com.ifrs.ssi.tcc.api.security.controller.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UserAuthenticatedService userAuthenticatedService;

    public LoginResponse login() {
        LoginResponse response = new LoginResponse();

        response.setUserId(userAuthenticatedService.getId());

        return response;
    }
}
