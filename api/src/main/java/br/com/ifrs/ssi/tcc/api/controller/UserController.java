package br.com.ifrs.ssi.tcc.api.controller;

import br.com.ifrs.ssi.tcc.api.controller.request.EditUserRequest;
import br.com.ifrs.ssi.tcc.api.controller.request.UserRequest;
import br.com.ifrs.ssi.tcc.api.controller.response.UserResponse;
import br.com.ifrs.ssi.tcc.api.service.user.CreateUserService;
import br.com.ifrs.ssi.tcc.api.service.user.DetailUserService;
import br.com.ifrs.ssi.tcc.api.service.user.EditUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired  
    private CreateUserService createUserService;

    @Autowired
    private EditUserService editUserService;

    @Autowired
    private DetailUserService detailUserService;

    @PostMapping
    @ResponseStatus(CREATED)
    public void create(@RequestBody @Valid UserRequest request) {
        createUserService.create(request);
    }

    @PutMapping
    public void edit(@RequestBody EditUserRequest request){
        editUserService.edit(request);
    }

    @GetMapping
    public UserResponse details() {
        return detailUserService.details();
    }


}
