package ua.knu.naturereserve.service.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.naturereserve.dto.request.manager.ManagerCreateAnimalRequest;
import ua.knu.naturereserve.dto.request.manager.ManagerRecoverAnimalRequest;
import ua.knu.naturereserve.dto.request.manager.ManagerSickAnimalRequest;
import ua.knu.naturereserve.dto.response.manager.ManagerAnimalResponse;
import ua.knu.naturereserve.entity.Animal;
import ua.knu.naturereserve.entity.AnimalIllness;
import ua.knu.naturereserve.exception.NotFoundException;
import ua.knu.naturereserve.repository.AnimalIllnessRepository;
import ua.knu.naturereserve.repository.AnimalRepository;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AnimalService {
  private final AnimalRepository animalRepository;
  private final AnimalIllnessRepository illnessRepository;

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

  public void create(ManagerCreateAnimalRequest request) {
    animalRepository.save(
        Animal.builder()
            .nickname(request.getNickname())
            .lookup(request.getLookup())
            .behavioral(request.getBehavioral())
            .build());
  }

  public void sick(ManagerSickAnimalRequest request) {
    Animal animal = getById(request.getId());
    illnessRepository.save(
        AnimalIllness.builder()
            .animal(animal)
            .start(request.getDate())
            .description(request.getDescription())
            .build());
  }

  @Transactional
  public void recover(ManagerRecoverAnimalRequest request) {
    getById(request.getId()).getIllnesses().stream()
        .filter(x -> x.getEnd() == null)
        .forEach(x -> x.setEnd(request.getDate()));
  }

  @Transactional
  public void die(Long id) {
    Animal animal = getById(id);
    animal.setAlive(false);
  }

  private Animal getById(Long id) {
    return animalRepository
        .findById(id)
        .orElseThrow(() -> new NotFoundException("Animal doesn't exists with id " + id));
  }
}
