package br.com.ifrs.ssi.tcc.api.repository;

import br.com.ifrs.ssi.tcc.api.security.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Transactional
public interface UserRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("select u from Users u where u.isInstitution = :isInstitution " +
            "and lower(u.name) like lower(concat('%', :text, '%')) order by u.name")
    List<Users> find(@Param("isInstitution") boolean isInstitution, @Param("text") String text);

    @Query("select u from Users u where u.isInstitution = :isInstitution ")
    List<Users> getAll(@Param("isInstitution") boolean isInstitution);

}
