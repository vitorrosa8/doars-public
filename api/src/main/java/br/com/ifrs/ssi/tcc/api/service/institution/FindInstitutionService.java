package br.com.ifrs.ssi.tcc.api.service.institution;

import br.com.ifrs.ssi.tcc.api.controller.response.UserResponse;
import br.com.ifrs.ssi.tcc.api.mapper.UserMapper;
import br.com.ifrs.ssi.tcc.api.repository.UserRepository;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class FindInstitutionService {

    @Autowired
    private UserRepository userRepository;

    public List<UserResponse> find(String text) {


        return userRepository.find(true, text).stream()
                .map(UserMapper::toResponse)
                .collect(Collectors.toList());
    }


}
