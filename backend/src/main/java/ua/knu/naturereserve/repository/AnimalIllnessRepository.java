package ua.knu.naturereserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.naturereserve.entity.AnimalIllness;

public interface AnimalIllnessRepository extends JpaRepository<AnimalIllness, Long> {}
