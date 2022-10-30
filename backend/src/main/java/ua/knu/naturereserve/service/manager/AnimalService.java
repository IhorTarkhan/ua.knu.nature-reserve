package ua.knu.naturereserve.service.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.dto.response.manager.AnimalViewInListResponse;
import ua.knu.naturereserve.entity.AnimalIllness;
import ua.knu.naturereserve.repository.AnimalRepository;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AnimalService {
  private final AnimalRepository animalRepository;

  public List<AnimalViewInListResponse> getAll() {
    return animalRepository.findByOrderById().stream()
        .map(
            animal -> {
              var isIllnessNow =
                  animal.getIllnesses().stream()
                      .map(AnimalIllness::getEnd)
                      .anyMatch(Objects::isNull);
              return AnimalViewInListResponse.builder()
                  .id(animal.getId())
                  .nickname(animal.getNickname())
                  .lookup(animal.getLookup())
                  .behavioral(animal.getBehavioral())
                  .isAlive(animal.isAlive())
                  .isIllnessNow(isIllnessNow)
                  .build();
            })
        .toList();
  }
}
