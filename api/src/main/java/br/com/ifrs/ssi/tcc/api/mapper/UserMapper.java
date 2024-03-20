package br.com.ifrs.ssi.tcc.api.mapper;

import br.com.ifrs.ssi.tcc.api.controller.request.UserRequest;
import br.com.ifrs.ssi.tcc.api.controller.response.UserResponse;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class UserMapper {

    public static Users toEntity(UserRequest request) {
        return Users.builder()
                .email(request.getEmail())
                .password(request.getPassword())
                .name(request.getName())
                .city(request.getCity())
                .uf(request.getUf())
                .cep(request.getCep())
                .location(request.getLocation())
                .isInstitution(request.isInstitution())
                .image(request.getImage())
                .description(request.getDescription())
                .contact(request.getContact())
                .history(request.getHistory())
                .donationNeeds(request.getDonationNeeds())
                .build();
    }

    public static UserResponse toResponse(Users users) {
        return UserResponse.builder()
                .id(users.getId())
                .email(users.getEmail())
                .password(users.getPassword())
                .name(users.getName())
                .city(users.getCity())
                .uf(users.getUf())
                .cep(users.getCep())
                .location(users.getLocation())
                .isInstitution(users.isInstitution())
                .image(users.getImage())
                .description(users.getDescription())
                .contact(users.getContact())
                .history(users.getHistory())
                .donationNeeds(users.getDonationNeeds())
                .permission(users.getPermissions().get(0).getName())
                .build();
    }
}

