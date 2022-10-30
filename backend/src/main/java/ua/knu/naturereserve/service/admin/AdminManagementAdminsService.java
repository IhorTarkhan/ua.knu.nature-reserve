package ua.knu.naturereserve.service.admin;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.entity.Admin;
import ua.knu.naturereserve.repository.ManagedByAdminRepository;
import ua.knu.naturereserve.security.SecurityService;

@Service
public class AdminManagementAdminsService extends AbstractAdminManagementService<Admin> {
  public AdminManagementAdminsService(
      ManagedByAdminRepository<Admin> repository,
      SecurityService securityService,
      PasswordEncoder passwordEncoder) {
    super(repository, securityService, passwordEncoder);
  }

  @Override
  protected Admin createEmptyInstance() {
    return new Admin();
  }
}
