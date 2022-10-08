package ua.knu.naturereserve.controller.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.naturereserve.dto.request.LoginRequest;
import ua.knu.naturereserve.dto.response.JwtResponse;
import ua.knu.naturereserve.dto.response.admin.AdminInfoResponse;
import ua.knu.naturereserve.service.admin.AdminAuthorisationService;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/admin/authorisation")
public class AdminAuthorisationController {
  private final AdminAuthorisationService service;

  @PostMapping("/login")
  public JwtResponse login(@RequestBody LoginRequest request) {
    return service.login(request);
  }

  @GetMapping("/current")
  public AdminInfoResponse getCurrent() {
    return service.getCurrent();
  }
}
