package ua.knu.naturereserve.service.operator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.naturereserve.dto.request.operator.OperatorCreateExcursionTemplateRequest;
import ua.knu.naturereserve.dto.request.operator.OperatorPlaneExcursionRequest;
import ua.knu.naturereserve.dto.response.operator.OperatorExcursionTemplateResponse;
import ua.knu.naturereserve.entity.Animal;
import ua.knu.naturereserve.entity.AnimalsInExcursionTemplate;
import ua.knu.naturereserve.entity.Excursion;
import ua.knu.naturereserve.entity.ExcursionTemplate;
import ua.knu.naturereserve.exception.NotFoundException;
import ua.knu.naturereserve.mapper.AnimalMapper;
import ua.knu.naturereserve.mapper.ExcursionMapper;
import ua.knu.naturereserve.repository.AnimalRepository;
import ua.knu.naturereserve.repository.AnimalsInExcursionTemplateRepository;
import ua.knu.naturereserve.repository.ExcursionRepository;
import ua.knu.naturereserve.repository.ExcursionTemplateRepository;
import ua.knu.naturereserve.security.SecurityService;

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
  private final ExcursionRepository excursionRepository;
  private final SecurityService securityService;

  @Transactional
  public List<OperatorExcursionTemplateResponse> getAll() {
    return excursionTemplateRepository.findAll().stream()
        .map(
            et ->
                OperatorExcursionTemplateResponse.builder()
                    .id(et.getId())
                    .title(et.getTitle())
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
            ExcursionTemplate.builder()
                .title(request.getTitle())
                .price(request.getPrice())
                .build());
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

  public void planeExcursion(OperatorPlaneExcursionRequest request) {
    ExcursionTemplate excursionTemplate =
        excursionTemplateRepository
            .findById(request.getExcursionTemplateId())
            .orElseThrow(
                () ->
                    new NotFoundException(
                        "Excursion Template doesn't exists with id = "
                            + request.getExcursionTemplateId()));
    excursionRepository.save(
        Excursion.builder()
            .operator(securityService.getCurrentOperator())
            .excursionTemplate(excursionTemplate)
            .time(request.getTime().withSecond(0))
            .build());
  }
}
