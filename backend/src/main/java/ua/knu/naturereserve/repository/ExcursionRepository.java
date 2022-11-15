package ua.knu.naturereserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.naturereserve.entity.Excursion;

public interface ExcursionRepository extends JpaRepository<Excursion, Long> {}
