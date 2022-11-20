package ua.knu.naturereserve.service.client;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.naturereserve.dto.request.client.RegistrationRequest;
import ua.knu.naturereserve.entity.Client;
import ua.knu.naturereserve.entity.Excursion;
import ua.knu.naturereserve.repository.ClientRepository;
import ua.knu.naturereserve.repository.ExcursionRepository;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ClientRegistrationService {
  private final ClientRepository clientRepository;
  private final ExcursionRepository excursionRepository;

  @Transactional
  public void registration(RegistrationRequest request) {
    var client =
        clientRepository
            .findByEmail(request.getEmail())
            .orElseGet(
                () ->
                    clientRepository.save(
                        Client.builder()
                            .firstName(request.getFirstName())
                            .lastName(request.getLastName())
                            .email(request.getEmail())
                            .phone(request.getPhone())
                            .build()));
    Excursion excursion = excursionRepository.findById(request.getExcursionId()).orElseThrow();
    if (client.getExcursions() == null) {
      client.setExcursions(new ArrayList<>());
    }
    client.getExcursions().add(excursion);
  }
}
