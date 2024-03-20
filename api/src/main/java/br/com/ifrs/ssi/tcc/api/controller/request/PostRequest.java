package br.com.ifrs.ssi.tcc.api.controller.request;

import br.com.ifrs.ssi.tcc.api.security.model.DonationType;
import lombok.Data;

import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class PostRequest {

    @NotBlank
    private String text;

    @Lob
    private byte[] image;

}
