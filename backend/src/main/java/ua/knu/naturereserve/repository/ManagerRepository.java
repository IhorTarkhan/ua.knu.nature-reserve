package ua.knu.naturereserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.naturereserve.entity.Manager;

import java.util.Optional;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
  Optional<Manager> findByEmail(String email);
}
