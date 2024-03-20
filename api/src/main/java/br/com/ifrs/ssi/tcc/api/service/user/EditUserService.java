package br.com.ifrs.ssi.tcc.api.service.user;

import br.com.ifrs.ssi.tcc.api.controller.request.EditUserRequest;
import br.com.ifrs.ssi.tcc.api.repository.UserRepository;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import br.com.ifrs.ssi.tcc.api.security.service.UserAuthenticatedService;
import br.com.ifrs.ssi.tcc.api.service.LengthValidatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EditUserService {

    @Autowired
    private UserAuthenticatedService userAuthenticatedService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LengthValidatorService lengthValidatorService;

    public void edit(EditUserRequest request){

        Users loggedUser = userAuthenticatedService.get();

        if (request.getEmail() != null){
            loggedUser.setEmail(request.getEmail());
        }

        if (request.getName() != null){
            loggedUser.setName(request.getName());
        }

        if (request.getCity() != null) {
            loggedUser.setCity(request.getCity());
        }

        if (request.getUf() != null) {
            loggedUser.setUf(request.getUf());
        }

        if (request.getCep() != null) {
            loggedUser.setCep(request.getCep());
        }

        if (request.getLocation() != null) {
            loggedUser.setLocation(request.getLocation());
        }

        if (request.getImage() != null){
            loggedUser.setImage(request.getImage());
        }


        if (request.getDescription() != null){
            loggedUser.setDescription(request.getDescription());
        }

        if (request.getContact() != null){
            loggedUser.setContact(request.getContact());
        }

        if (request.getHistory() != null){
            loggedUser.setHistory(request.getHistory());
        }

        if (request.getDonationNeeds() != null){
            loggedUser.setDonationNeeds(request.getDonationNeeds());
        }

        userRepository.save(loggedUser);
    }
}
