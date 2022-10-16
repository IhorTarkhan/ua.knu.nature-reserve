package ua.knu.naturereserve;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ua.knu.naturereserve.entity.Admin;
import ua.knu.naturereserve.entity.Manager;
import ua.knu.naturereserve.entity.Operator;
import ua.knu.naturereserve.repository.AdminRepository;
import ua.knu.naturereserve.repository.ManagerRepository;
import ua.knu.naturereserve.repository.OperatorRepository;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class SetUp {
  private final AdminRepository adminRepository;
  private final ManagerRepository managerRepository;
  private final OperatorRepository operatorRepository;
  private final PasswordEncoder passwordEncoder;

  @PostConstruct
  public void setUp() {
    String defaultPassword = "password";
    var admin = adminRepository.findByUsername("my_admin");
    if (admin.isEmpty()) {
      adminRepository.save(
          Admin.builder()
              .username("my_admin")
              .password(passwordEncoder.encode(defaultPassword))
              .enabled(true)
              .build());
    }
    var manager = managerRepository.findByUsername("my_manager");
    if (manager.isEmpty()) {
      managerRepository.save(
          Manager.builder()
              .username("my_manager")
              .password(passwordEncoder.encode(defaultPassword))
              .enabled(true)
              .build());
    }
    var operator = operatorRepository.findByUsername("my_operator");
    if (operator.isEmpty()) {
      operatorRepository.save(
          Operator.builder()
              .username("my_operator")
              .password(passwordEncoder.encode(defaultPassword))
              .enabled(true)
              .build());
    }
  }
}
