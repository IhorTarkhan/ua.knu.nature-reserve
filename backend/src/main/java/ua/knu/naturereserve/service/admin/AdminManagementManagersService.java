package ua.knu.naturereserve.service.admin;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.entity.Manager;
import ua.knu.naturereserve.repository.ManagedByAdminRepository;
import ua.knu.naturereserve.security.SecurityService;

@Service
public class AdminManagementManagersService extends AbstractAdminManagementService<Manager> {
  public AdminManagementManagersService(
      ManagedByAdminRepository<Manager> repository,
      SecurityService securityService,
      PasswordEncoder passwordEncoder) {
    super(repository, securityService, passwordEncoder);
  }

  @Override
  protected Manager createEmptyInstance() {
    return new Manager();
  }
}
