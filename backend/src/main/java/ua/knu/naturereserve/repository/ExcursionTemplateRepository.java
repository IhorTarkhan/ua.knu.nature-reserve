package ua.knu.naturereserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.naturereserve.entity.ExcursionTemplate;

public interface ExcursionTemplateRepository extends JpaRepository<ExcursionTemplate, Long> {}
