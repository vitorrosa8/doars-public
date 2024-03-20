package br.com.ifrs.ssi.tcc.api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
public class LengthValidatorService {

    public void valid(String text,int minLength, int maxLength, String msgError) {
        if (text.length() > maxLength || text.length() < minLength) {
            throw new ResponseStatusException(BAD_REQUEST, msgError);
        }
    }

    public void validOptional(String text, String fieldName , int minLength, int maxLength, String msgError, boolean isValid) {
        if (isValid && Objects.nonNull(text)) {
            valid(text,minLength,maxLength,msgError);
        } else if (isValid) {
            throw new ResponseStatusException(BAD_REQUEST, fieldName + " está vazio, favor preencher novamente");
        }
    }
}