package ua.knu.naturereserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.naturereserve.entity.Admin;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
  Optional<Admin> findByEmail(String email);
}
