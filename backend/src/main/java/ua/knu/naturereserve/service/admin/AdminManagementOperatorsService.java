package ua.knu.naturereserve.service.admin;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.entity.Operator;
import ua.knu.naturereserve.repository.ManagedByAdminRepository;
import ua.knu.naturereserve.security.SecurityService;

@Service
public class AdminManagementOperatorsService extends AbstractAdminManagementService<Operator> {
  public AdminManagementOperatorsService(
      ManagedByAdminRepository<Operator> repository,
      SecurityService securityService,
      PasswordEncoder passwordEncoder) {
    super(repository, securityService, passwordEncoder);
  }

  @Override
  protected Operator createEmptyInstance() {
    return new Operator();
  }
}
