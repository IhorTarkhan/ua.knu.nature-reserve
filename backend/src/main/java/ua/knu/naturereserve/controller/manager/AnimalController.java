package ua.knu.naturereserve.controller.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.naturereserve.dto.request.manager.AnimalViewInListResponse;
import ua.knu.naturereserve.service.manager.AnimalService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/manager/animals")
public class AnimalController {
  private final AnimalService service;

  @GetMapping
  public List<AnimalViewInListResponse> getAll() {
    return service.getAll();
  }
}
