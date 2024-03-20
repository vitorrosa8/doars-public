package br.com.ifrs.ssi.tcc.api.controller;

import br.com.ifrs.ssi.tcc.api.controller.response.UserResponse;
import br.com.ifrs.ssi.tcc.api.service.institution.GetAllInstitutionsService;
import br.com.ifrs.ssi.tcc.api.service.institution.FindInstitutionService;
import br.com.ifrs.ssi.tcc.api.service.institution.GetInstitutionInfosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/institutions")
public class InstitutionController {
    @Autowired
    private GetAllInstitutionsService getAllInstitutionsService;

    @Autowired
    private FindInstitutionService findInstitutionService;

    @Autowired
    private GetInstitutionInfosService getInstitutionInfosService;

    @GetMapping("/all")
    public List<UserResponse> getAllInstitutions() {
        return getAllInstitutionsService.get();
    }

    @GetMapping("/find")
    public List<UserResponse> findInstitution(@RequestParam String text) {
        return findInstitutionService.find(text);
    }

    @GetMapping("/{userId}")
    public UserResponse getInstitutionInfos(@PathVariable Long userId) {
        return getInstitutionInfosService.getInstitutionInfos(userId);
    }

}
