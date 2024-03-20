package br.com.ifrs.ssi.tcc.api.service.institution;

import br.com.ifrs.ssi.tcc.api.controller.response.UserResponse;
import br.com.ifrs.ssi.tcc.api.mapper.UserMapper;
import br.com.ifrs.ssi.tcc.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllInstitutionsService {

    @Autowired
    private UserRepository userRepository;

    public List<UserResponse> get() {


        return userRepository.getAll(true).stream()
                .map(UserMapper::toResponse)
                .collect(Collectors.toList());
    }
}
