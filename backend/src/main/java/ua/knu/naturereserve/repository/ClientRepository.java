package ua.knu.naturereserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.naturereserve.entity.Client;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Optional<Client> findByEmail(String email);
}
