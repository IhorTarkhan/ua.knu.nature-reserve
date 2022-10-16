package ua.knu.naturereserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.naturereserve.entity.Animal;

public interface AnimalRepository extends JpaRepository<Animal, Long> {}
