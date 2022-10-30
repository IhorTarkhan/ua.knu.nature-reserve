package ua.knu.naturereserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface ManagedByAdminRepository<T> extends JpaRepository<T, Long> {
  Optional<T> findByUsername(String username);

  List<T> findByOrderById();
}
