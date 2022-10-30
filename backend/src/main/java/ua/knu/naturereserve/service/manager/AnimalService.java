package ua.knu.naturereserve.service.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.dto.response.manager.ManagerAnimalResponse;
import ua.knu.naturereserve.entity.AnimalIllness;
import ua.knu.naturereserve.repository.AnimalRepository;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AnimalService {
  private final AnimalRepository animalRepository;

  public List<ManagerAnimalResponse> getAll() {
    return animalRepository.findByOrderById().stream()
        .map(
            animal -> {
              var isHealthy =
                      animal.getIllnesses().stream()
                          .map(AnimalIllness::getEnd)
                          .noneMatch(Objects::isNull);
              return ManagerAnimalResponse.builder()
                  .id(animal.getId())
                  .nickname(animal.getNickname())
                  .lookup(animal.getLookup())
                  .behavioral(animal.getBehavioral())
                  .isAlive(animal.isAlive())
                  .isHealthy(isHealthy)
                  .build();
            })
        .toList();
  }
}
