package br.com.ifrs.ssi.tcc.api.service.institution;

import br.com.ifrs.ssi.tcc.api.controller.response.UserResponse;
import br.com.ifrs.ssi.tcc.api.repository.UserRepository;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import br.com.ifrs.ssi.tcc.api.security.service.UserAuthenticatedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static br.com.ifrs.ssi.tcc.api.mapper.UserMapper.toResponse;

@Service
public class GetInstitutionInfosService {

    @Autowired
    UserRepository userRepository;

    public UserResponse getInstitutionInfos(Long userId) {

        Users users = userRepository.findById(userId).get();
        return toResponse(users);
    }
}

