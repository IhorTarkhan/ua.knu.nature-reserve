package ua.knu.naturereserve.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.knu.naturereserve.entity.ExcursionTemplate;

import java.util.List;

public interface ExcursionTemplateRepository extends JpaRepository<ExcursionTemplate, Long> {
//  @Query(
//      value =
//          "select et from ExcursionTemplate et join fetch et.animalsInExcursionTemplateList")
//  List<ExcursionTemplate> lazyLoad();
}
