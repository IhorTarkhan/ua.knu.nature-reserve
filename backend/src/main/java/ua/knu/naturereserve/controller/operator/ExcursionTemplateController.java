package ua.knu.naturereserve.controller.operator;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.knu.naturereserve.dto.request.operator.OperatorCreateExcursionTemplateRequest;
import ua.knu.naturereserve.dto.request.operator.OperatorPlaneExcursionRequest;
import ua.knu.naturereserve.dto.response.operator.OperatorExcursionTemplateResponse;
import ua.knu.naturereserve.service.operator.ExcursionTemplateService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/operator/templates")
public class ExcursionTemplateController {
  private final ExcursionTemplateService service;

  @GetMapping
  public List<OperatorExcursionTemplateResponse> getAll() {
    return service.getAll();
  }

  @PostMapping
  public void create(OperatorCreateExcursionTemplateRequest request) {
    service.create(request);
  }

  @PostMapping("/excursion")
  public void planeExcursion(@RequestBody OperatorPlaneExcursionRequest request) {
    service.planeExcursion(request);
  }
}
