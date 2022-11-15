package ua.knu.naturereserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.naturereserve.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {}
