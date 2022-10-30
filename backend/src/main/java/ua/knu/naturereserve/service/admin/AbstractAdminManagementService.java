package ua.knu.naturereserve.service.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import ua.knu.naturereserve.dto.request.admin.AdminChangePasswordRequest;
import ua.knu.naturereserve.dto.request.admin.CreateAdminRequest;
import ua.knu.naturereserve.dto.response.admin.CurrentAuthorisationInfoResponse;
import ua.knu.naturereserve.entity.ManagedByAdmin;
import ua.knu.naturereserve.exception.ConflictException;
import ua.knu.naturereserve.exception.ForbiddenException;
import ua.knu.naturereserve.exception.NotFoundException;
import ua.knu.naturereserve.repository.ManagedByAdminRepository;
import ua.knu.naturereserve.security.SecurityService;

import java.util.Comparator;
import java.util.List;

@RequiredArgsConstructor
public abstract class AbstractAdminManagementService<T extends ManagedByAdmin> {
  private final ManagedByAdminRepository<T> repository;
  private final SecurityService securityService;
  private final PasswordEncoder passwordEncoder;

  public List<CurrentAuthorisationInfoResponse> getAll() {
    return repository.findByOrderById().stream()
        .sorted(Comparator.comparing(T::getId))
        .map(
            x ->
                CurrentAuthorisationInfoResponse.builder()
                    .id(x.getId())
                    .username(x.getUsername())
                    .active(x.isEnabled())
                    .build())
        .toList();
  }

  public void changePassword(AdminChangePasswordRequest request) {
    if (securityService.getCurrentAdmin().getId().equals(request.getId())) {
      throw new ForbiddenException("Can not change password for yourself");
    }
    T admin = getAdmin(request.getId());
    admin.setPassword(passwordEncoder.encode(request.getNewPassword()));
    repository.save(admin);
  }

  public void deactivate(Long adminId) {
    if (securityService.getCurrentAdmin().getId().equals(adminId)) {
      throw new ForbiddenException("Can not deactivate yourself");
    }
    T admin = getAdmin(adminId);
    admin.setEnabled(false);
    repository.save(admin);
  }

  public void reactivate(Long adminId) {
    if (securityService.getCurrentAdmin().getId().equals(adminId)) {
      throw new ForbiddenException("Can not reactivate yourself");
    }
    T admin = getAdmin(adminId);
    admin.setEnabled(true);
    repository.save(admin);
  }

  private T getAdmin(Long id) {
    return repository
        .findById(id)
        .orElseThrow(() -> new NotFoundException("Admin doesn't exists with id " + id));
  }

  public void create(CreateAdminRequest request) {
    if (repository.findByUsername(request.getUsername()).isPresent()) {
      throw new ConflictException(
          "Admin with username %s already exist".formatted(request.getUsername()));
    }
    T instance = createEmptyInstance();
    instance.setUsername(request.getUsername());
    instance.setPassword(passwordEncoder.encode(request.getPassword()));
    instance.setEnabled(true);
    repository.save(instance);
  }

  protected abstract T createEmptyInstance();
}
