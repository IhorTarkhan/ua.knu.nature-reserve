package ua.knu.naturereserve.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.dto.response.AnimalInfoResponse;
import ua.knu.naturereserve.entity.Animal;
import ua.knu.naturereserve.entity.AnimalIllness;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AnimalMapper {
  public AnimalInfoResponse toDtoResponse(Animal animal) {
    return AnimalInfoResponse.builder()
        .id(animal.getId())
        .nickname(animal.getNickname())
        .lookup(animal.getLookup())
        .behavioral(animal.getBehavioral())
        .isAlive(animal.isAlive())
        .isHealthy(
            animal.getIllnesses().stream().map(AnimalIllness::getEnd).noneMatch(Objects::isNull))
        .build();
  }
}
