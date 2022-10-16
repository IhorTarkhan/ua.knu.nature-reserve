package ua.knu.naturereserve.controller.manager;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.knu.naturereserve.dto.request.LoginRequest;
import ua.knu.naturereserve.dto.response.JwtResponse;
import ua.knu.naturereserve.dto.response.admin.CurrentAuthorisationInfoResponse;
import ua.knu.naturereserve.service.manager.ManagerAuthorisationService;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/manager/authorisation")
public class ManagerAuthorisationController {
  private final ManagerAuthorisationService service;

  @PostMapping("/login")
  public JwtResponse login(@RequestBody LoginRequest request) {
    return service.login(request);
  }

  @GetMapping("/current")
  public CurrentAuthorisationInfoResponse getCurrent() {
    return service.getCurrent();
  }
}
