package ua.knu.naturereserve.service.operator;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.naturereserve.dto.request.operator.OperatorCreateExcursionTemplateRequest;
import ua.knu.naturereserve.dto.response.operator.OperatorExcursionTemplateResponse;
import ua.knu.naturereserve.entity.Animal;
import ua.knu.naturereserve.entity.AnimalsInExcursionTemplate;
import ua.knu.naturereserve.entity.ExcursionTemplate;
import ua.knu.naturereserve.mapper.AnimalMapper;
import ua.knu.naturereserve.mapper.ExcursionMapper;
import ua.knu.naturereserve.repository.AnimalRepository;
import ua.knu.naturereserve.repository.AnimalsInExcursionTemplateRepository;
import ua.knu.naturereserve.repository.ExcursionTemplateRepository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExcursionTemplateService {
  private final ExcursionTemplateRepository excursionTemplateRepository;
  private final AnimalRepository animalRepository;
  private final AnimalMapper animalMapper;
  private final ExcursionMapper excursionMapper;
  private final AnimalsInExcursionTemplateRepository animalsInExcursionTemplateRepository;

  @Transactional
  public List<OperatorExcursionTemplateResponse> getAll() {
    return excursionTemplateRepository.findAll().stream()
        .map(
            et ->
                OperatorExcursionTemplateResponse.builder()
                    .id(et.getId())
                    .price(et.getPrice())
                    .animals(et.getAnimals().stream().map(animalMapper::toDtoResponse).toList())
                    .excursions(
                        et.getExcursions().stream().map(excursionMapper::toDtoResponse).toList())
                    .build())
        .toList();
  }

  public void create(OperatorCreateExcursionTemplateRequest request) {
    ExcursionTemplate template =
        excursionTemplateRepository.save(
            ExcursionTemplate.builder().price(request.getPrice()).build());
    List<Animal> animals = animalRepository.findAllById(request.getAnimalIds());
    animals.sort(Comparator.comparingInt(a -> request.getAnimalIds().indexOf(a.getId())));
    List<AnimalsInExcursionTemplate> mappers = new ArrayList<>();
    for (int i = 0; i < animals.size(); i++) {
      mappers.add(
          AnimalsInExcursionTemplate.builder()
              .excursionTemplate(template)
              .animal(animals.get(i))
              .order((long) (i + 1))
              .build());
    }
    animalsInExcursionTemplateRepository.saveAll(mappers);
  }

  @SneakyThrows
  @PostConstruct
  public void test() {
    log.info(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(getAll()));
    //    create(
    //        OperatorCreateExcursionTemplateRequest.builder()
    //            .price(BigDecimal.valueOf(120))
    //            .animalIds(List.of(2L))
    //            .build());
    //    create(
    //        OperatorCreateExcursionTemplateRequest.builder()
    //            .price(BigDecimal.valueOf(100))
    //            .animalIds(List.of(3L, 1L))
    //            .build());
    log.info(new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(getAll()));
  }
}
