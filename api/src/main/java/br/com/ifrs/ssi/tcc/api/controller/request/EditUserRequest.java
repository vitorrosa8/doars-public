package br.com.ifrs.ssi.tcc.api.controller.request;

import br.com.ifrs.ssi.tcc.api.security.model.DonationType;
import lombok.Data;

import java.util.List;

@Data
public class EditUserRequest {

    private String email;

    private String name;

    private String city;

    private String uf;

    private String cep;

    private String location;

    private byte[] image;

    private String description;

    private String contact;

    private String history;

    private List<DonationType> donationNeeds;
}

