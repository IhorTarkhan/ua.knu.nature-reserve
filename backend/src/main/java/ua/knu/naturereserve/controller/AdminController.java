package ua.knu.naturereserve.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.naturereserve.dto.request.LoginRequest;
import ua.knu.naturereserve.dto.response.JwtResponse;
import ua.knu.naturereserve.dto.response.admin.CurrentAdminResponse;
import ua.knu.naturereserve.service.AdminAuthorisationService;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/admin")
public class AdminController {
  private final AdminAuthorisationService service;

  @PostMapping("/login")
  public JwtResponse login(@RequestBody LoginRequest request) {
    return service.login(request);
  }

  @GetMapping("/me")
  public CurrentAdminResponse getMe() {
    return service.getMe();
  }
}