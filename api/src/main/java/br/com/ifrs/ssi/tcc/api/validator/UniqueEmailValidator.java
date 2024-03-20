package br.com.ifrs.ssi.tcc.api.validator;

import br.com.ifrs.ssi.tcc.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Component
public class UniqueEmailValidator {

    @Autowired
    private UserRepository userRepository;

    public void valid(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(BAD_REQUEST, "Este e-mail já está cadastrado.");
        }
    }
}