package ua.knu.naturereserve.controller.operator;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.naturereserve.dto.response.AnimalInfoResponse;
import ua.knu.naturereserve.service.AnimalService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/operator/animals")
public class OperatorAnimalController {
  private final AnimalService service;

  @GetMapping
  public List<AnimalInfoResponse> getAll() {
    return service.getAll();
  }
}
