package ua.knu.naturereserve.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.dto.request.LoginRequest;
import ua.knu.naturereserve.dto.response.JwtResponse;
import ua.knu.naturereserve.dto.response.admin.AdminInfo;
import ua.knu.naturereserve.entity.Admin;
import ua.knu.naturereserve.exception.NotFoundException;
import ua.knu.naturereserve.repository.AdminRepository;
import ua.knu.naturereserve.security.JwtTokenProvider;
import ua.knu.naturereserve.security.SecurityService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminAuthorisationService {
  private final AuthenticationManager authenticationManager;
  private final AdminRepository repository;
  private final JwtTokenProvider jwtTokenProvider;
  private final SecurityService securityService;

  public JwtResponse login(LoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    Admin admin =
        repository
            .findByUsername(request.getUsername())
            .orElseThrow(() -> new NotFoundException("Admin doesn't exists"));
    return JwtResponse.builder()
        .authorization(jwtTokenProvider.generateToken(admin.getId().toString()))
        .build();
  }

  public AdminInfo getCurrent() {
    Admin currentAdmin = securityService.getCurrentAdmin();
    return AdminInfo.builder()
        .id(currentAdmin.getId())
        .username(currentAdmin.getUsername())
        .active(currentAdmin.isActive())
        .build();
  }

  public List<AdminInfo> getAll() {
    return repository.findByOrderById().stream()
        .map(
            x ->
                AdminInfo.builder()
                    .id(x.getId())
                    .username(x.getUsername())
                    .active(x.isActive())
                    .build())
        .toList();
  }
}
