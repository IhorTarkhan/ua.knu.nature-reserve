package ua.knu.naturereserve;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ua.knu.naturereserve.entity.Admin;
import ua.knu.naturereserve.repository.AdminRepository;

import javax.annotation.PostConstruct;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SetUp {
  private final AdminRepository adminRepository;
  private final PasswordEncoder passwordEncoder;

  @PostConstruct
  public void setUp() {
    Optional<Admin> admin = adminRepository.findByUsername("my_admin");
    if (admin.isEmpty()) {
      adminRepository.save(
          Admin.builder()
              .username("my_admin")
              .password(passwordEncoder.encode("password"))
              .enabled(true)
              .build());
    }
  }
}
