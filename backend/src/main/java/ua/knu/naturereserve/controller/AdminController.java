package ua.knu.naturereserve.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.naturereserve.dto.request.LoginRequest;
import ua.knu.naturereserve.dto.response.JwtResponse;
import ua.knu.naturereserve.service.AdminAuthorisationService;

@RestController
@RequiredArgsConstructor
public class AdminController {
  private final AdminAuthorisationService service;

  @PostMapping("/admin/login")
  public JwtResponse login(@RequestBody LoginRequest request) {
    return service.login(request);
  }

  @GetMapping("/admin/getMyId")
  public Object getMyId() {
    return service.getMyId();
  }
}
