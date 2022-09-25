package ua.knu.naturereserve.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.dto.request.AdminLoginRequest;
import ua.knu.naturereserve.dto.response.JwtResponse;
import ua.knu.naturereserve.entity.Admin;
import ua.knu.naturereserve.exception.NotFoundException;
import ua.knu.naturereserve.repository.AdminRepository;
import ua.knu.naturereserve.security.JwtTokenProvider;

@Service
@RequiredArgsConstructor
public class AdminAuthorisationService {
  private final AuthenticationManager authenticationManager;
  private final AdminRepository repository;
  private final JwtTokenProvider jwtTokenProvider;
  private final SecurityService securityService;
  // private final PasswordEncoder passwordEncoder;

  public JwtResponse login(AdminLoginRequest request) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
    Admin admin =
        repository
            .findByEmail(request.getEmail())
            .orElseThrow(() -> new NotFoundException("Client doesn't exists"));
    return JwtResponse.builder()
        .authorization(jwtTokenProvider.generateToken(admin.getId().toString()))
        .build();
  }

  public Object getMyId() {
    return securityService.getCurrentAdmin().getId();
  }
}
