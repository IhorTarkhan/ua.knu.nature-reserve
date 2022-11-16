package ua.knu.naturereserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.naturereserve.entity.AnimalsInExcursionTemplate;

public interface AnimalsInExcursionTemplateRepository
    extends JpaRepository<AnimalsInExcursionTemplate, Long> {}
