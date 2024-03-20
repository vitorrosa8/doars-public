package br.com.ifrs.ssi.tcc.api.service.user;

import br.com.ifrs.ssi.tcc.api.repository.UserRepository;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class FindUserService {

    @Autowired
    private UserRepository userRepository;

    public Users findById(Long receiverId) {
        return userRepository
                .findById(receiverId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Usuário não encontrado."));
    }

    public Users findByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Usuário não encontrado."));
    }
}