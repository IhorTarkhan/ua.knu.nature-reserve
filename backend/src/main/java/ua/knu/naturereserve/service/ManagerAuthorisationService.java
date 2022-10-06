package ua.knu.naturereserve.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.dto.request.LoginRequest;
import ua.knu.naturereserve.dto.response.JwtResponse;
import ua.knu.naturereserve.entity.Manager;
import ua.knu.naturereserve.exception.NotFoundException;
import ua.knu.naturereserve.repository.ManagerRepository;
import ua.knu.naturereserve.security.JwtTokenProvider;
import ua.knu.naturereserve.security.SecurityService;

@Service
@RequiredArgsConstructor
public class ManagerAuthorisationService {
  private final AuthenticationManager authenticationManager;
  private final ManagerRepository repository;
  private final JwtTokenProvider jwtTokenProvider;
  private final SecurityService securityService;

  public JwtResponse login(LoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    Manager manager =
        repository
            .findByUsername(request.getUsername())
            .orElseThrow(() -> new NotFoundException("Manager doesn't exists"));
    return JwtResponse.builder()
        .authorization(jwtTokenProvider.generateToken(manager.getId().toString()))
        .build();
  }
}
