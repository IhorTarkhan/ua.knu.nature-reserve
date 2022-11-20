package ua.knu.naturereserve.controller.client;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.knu.naturereserve.dto.request.client.RegistrationRequest;
import ua.knu.naturereserve.dto.response.operator.OperatorExcursionTemplateResponse;
import ua.knu.naturereserve.service.client.ClientRegistrationService;
import ua.knu.naturereserve.service.operator.ExcursionTemplateService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/client/templates")
public class ClientExcursionController {
  private final ExcursionTemplateService service;
  private final ClientRegistrationService clientRegistrationService;

  @GetMapping
  public List<OperatorExcursionTemplateResponse> getAll() {
    return service.getAll();
  }

  @PostMapping("/registration")
  public void registration(@RequestBody RegistrationRequest request) {
    clientRegistrationService.registration(request);
  }
}
