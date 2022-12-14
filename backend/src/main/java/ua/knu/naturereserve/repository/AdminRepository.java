package ua.knu.naturereserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.naturereserve.entity.Admin;

import java.util.List;
import java.util.Optional;

public interface AdminRepository
    extends JpaRepository<Admin, Long>, ManagedByAdminRepository<Admin> {
  Optional<Admin> findByUsername(String username);

  List<Admin> findByOrderById();
}
