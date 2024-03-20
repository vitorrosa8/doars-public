package br.com.ifrs.ssi.tcc.api.service.user;

import br.com.ifrs.ssi.tcc.api.controller.request.UserRequest;
import br.com.ifrs.ssi.tcc.api.repository.UserRepository;
import br.com.ifrs.ssi.tcc.api.security.model.Permission;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import br.com.ifrs.ssi.tcc.api.service.LengthValidatorService;
import br.com.ifrs.ssi.tcc.api.validator.UniqueEmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import static br.com.ifrs.ssi.tcc.api.mapper.UserMapper.toEntity;

@Service
public class CreateUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UniqueEmailValidator uniqueEmailValidator;

    @Autowired
    private LengthValidatorService lengthValidatorService;

    public void create(UserRequest request) {

        lengthValidatorService.valid(request.getName(),2, 256, "Nome com tamanho inválido, favor preencher novamente");
        lengthValidatorService.valid(request.getEmail(),2, 256, "E-mail com tamanho inválido, favor preencher novamente");
        uniqueEmailValidator.valid(request.getEmail());

        Users user = toEntity(request);
        user.setPermissions(getDefaultPermission());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
    }

    private List<Permission> getDefaultPermission() {
        Permission permission = new Permission();
        permission.setName("USER");
        return List.of(permission);
    }
}