package ua.knu.naturereserve.service.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.dto.response.manager.AnimalViewInListResponse;
import ua.knu.naturereserve.repository.AnimalRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnimalService {
  private final AnimalRepository animalRepository;

  public List<AnimalViewInListResponse> getAll() {
    return animalRepository.findAll().stream()
        .map(
            x ->
                AnimalViewInListResponse.builder()
                    .id(x.getId())
                    .nickname(x.getNickname())
                    .lookup(x.getLookup())
                    .behavioral(x.getBehavioral())
                    .isMigration(x.isMigration())
                    .isAlive(x.isAlive())
                    .build())
        .toList();
  }
}
