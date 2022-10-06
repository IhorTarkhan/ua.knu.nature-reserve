package ua.knu.naturereserve.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.dto.request.LoginRequest;
import ua.knu.naturereserve.dto.response.JwtResponse;
import ua.knu.naturereserve.entity.Operator;
import ua.knu.naturereserve.exception.NotFoundException;
import ua.knu.naturereserve.repository.OperatorRepository;
import ua.knu.naturereserve.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
public class OperatorAuthorisationService {
  private final AuthenticationManager authenticationManager;
  private final OperatorRepository repository;
  private final JwtTokenProvider jwtTokenProvider;

  public JwtResponse login(LoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
    Operator operator =
        repository
            .findByUsername(request.getUsername())
            .orElseThrow(() -> new NotFoundException("Operator doesn't exists"));
    return JwtResponse.builder()
        .authorization(jwtTokenProvider.generateToken(operator.getId().toString()))
        .build();
  }
}
