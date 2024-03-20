package br.com.ifrs.ssi.tcc.api.controller.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CommentPostRequest {

    @NotBlank
    private String text;
}
