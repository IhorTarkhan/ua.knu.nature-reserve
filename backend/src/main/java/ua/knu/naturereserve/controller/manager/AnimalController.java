package ua.knu.naturereserve.controller.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.naturereserve.dto.request.manager.ManagerCreateAnimalRequest;
import ua.knu.naturereserve.dto.request.manager.ManagerRecoverAnimalRequest;
import ua.knu.naturereserve.dto.request.manager.ManagerSickAnimalRequest;
import ua.knu.naturereserve.dto.response.AnimalInfoResponse;
import ua.knu.naturereserve.service.manager.AnimalService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/manager/animals")
public class AnimalController {
  private final AnimalService service;

  @GetMapping
  public List<AnimalInfoResponse> getAll() {
    return service.getAll();
  }

  @PostMapping
  public void create(@RequestBody ManagerCreateAnimalRequest request) {
    service.create(request);
  }

  @PutMapping("/sick")
  public void sick(@RequestBody ManagerSickAnimalRequest request) {
    service.sick(request);
  }

  @PutMapping("/recover")
  public void recover(@RequestBody ManagerRecoverAnimalRequest request) {
    service.recover(request);
  }

  @PutMapping("/die/{id}")
  public void die(@PathVariable Long id) {
    service.die(id);
  }
}
