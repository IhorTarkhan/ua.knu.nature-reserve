package ua.knu.naturereserve.service.operator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.dto.request.operator.OperatorCreateExcursionTemplateRequest;
import ua.knu.naturereserve.dto.response.operator.OperatorExcursionTemplateResponse;
import ua.knu.naturereserve.entity.ExcursionTemplate;
import ua.knu.naturereserve.mapper.AnimalMapper;
import ua.knu.naturereserve.repository.AnimalRepository;
import ua.knu.naturereserve.repository.ExcursionTemplateRepository;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExcursionTemplateService {
  private final ExcursionTemplateRepository excursionTemplateRepository;
  private final AnimalRepository animalRepository;
  private final AnimalMapper animalMapper;

  public List<OperatorExcursionTemplateResponse> getAll() {
    return excursionTemplateRepository.findAll().stream()
        .map(
            et ->
                OperatorExcursionTemplateResponse.builder()
                    .id(et.getId())
                    .price(et.getPrice())
                    .animals(et.getAnimals().stream().map(animalMapper::toDtoResponse).toList())
                    .build())
        .toList();
  }

  public void create(OperatorCreateExcursionTemplateRequest request) {
    excursionTemplateRepository.save(
        ExcursionTemplate.builder()
            .price(request.getPrice())
            .animals(animalRepository.findAllById(request.getAnimalIds()))
            .build());
  }
}
