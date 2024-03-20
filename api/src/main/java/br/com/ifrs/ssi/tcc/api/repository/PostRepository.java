package br.com.ifrs.ssi.tcc.api.repository;

import br.com.ifrs.ssi.tcc.api.model.Post;
import br.com.ifrs.ssi.tcc.api.security.model.DonationType;
import br.com.ifrs.ssi.tcc.api.security.model.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Transactional
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p FROM Post p WHERE p.institution = :institution ORDER BY p.dateCreated DESC")
    Page<Post> findByInstitutionOrderByDateCreatedDesc(@Param("institution") Users institution, Pageable pageable);

    @Query("SELECT p FROM Post p ORDER BY p.dateCreated DESC")
    Page<Post> findAllOrderByDateCreatedDesc(Pageable pageable);

    @Query("SELECT p FROM Post p JOIN p.institution u WHERE :donationType MEMBER OF u.donationNeeds ORDER BY p.dateCreated DESC")
    Page<Post> findByCategory(@Param("donationType") DonationType donationType, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.institution.id IN (:institutionIds) ORDER BY p.dateCreated DESC")
    Page<Post> findByInstitutionInOrderByDateCreatedDesc(@Param("institutionIds") List<Long> institutionIds, Pageable pageable);

}
