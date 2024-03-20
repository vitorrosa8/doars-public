package br.com.ifrs.ssi.tcc.api.controller.request;

import br.com.ifrs.ssi.tcc.api.security.model.DonationType;
import br.com.ifrs.ssi.tcc.api.security.model.Permission;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;


@Data
public class UserRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private String name;

    @NotBlank
    private String city;

    @NotBlank
    private String uf;

    @NotBlank
    private String cep;

    @NotBlank
    private String location;

    @NotNull
    private boolean isInstitution;

    private byte[] image;

    private String description;

    private String contact;

    private String history;

    private List<DonationType> donationNeeds;

}





