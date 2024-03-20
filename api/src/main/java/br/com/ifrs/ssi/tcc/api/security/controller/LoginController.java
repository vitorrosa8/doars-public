package br.com.ifrs.ssi.tcc.api.security.controller;

import br.com.ifrs.ssi.tcc.api.security.controller.response.LoginResponse;
import br.com.ifrs.ssi.tcc.api.security.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public LoginResponse login() {
        return loginService.login();
    }
}
