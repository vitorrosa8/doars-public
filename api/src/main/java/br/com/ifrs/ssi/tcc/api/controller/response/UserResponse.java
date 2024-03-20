package br.com.ifrs.ssi.tcc.api.controller.response;

import br.com.ifrs.ssi.tcc.api.security.model.DonationType;
import br.com.ifrs.ssi.tcc.api.security.model.Permission;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Builder @Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponse {

    private Long id;
    private String email;
    private String password;
    private String name;
    private String city;
    private String uf;
    private String cep;
    private String location;
    private boolean isInstitution;
    private byte[] image;
    private String description;
    private String contact;
    private String history;
    private String permission;
    private List<DonationType> donationNeeds;

}
