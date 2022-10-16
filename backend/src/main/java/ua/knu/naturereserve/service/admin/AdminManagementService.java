package ua.knu.naturereserve.service.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.dto.request.admin.AdminChangePasswordRequest;
import ua.knu.naturereserve.dto.request.admin.CreateAdminRequest;
import ua.knu.naturereserve.dto.response.admin.CurrentAuthorisationInfoResponse;
import ua.knu.naturereserve.entity.Admin;
import ua.knu.naturereserve.exception.ConflictException;
import ua.knu.naturereserve.exception.ForbiddenException;
import ua.knu.naturereserve.exception.NotFoundException;
import ua.knu.naturereserve.repository.AdminRepository;
import ua.knu.naturereserve.security.SecurityService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminManagementService {
  private final AdminRepository repository;
  private final SecurityService securityService;
  private final PasswordEncoder passwordEncoder;

  public List<CurrentAuthorisationInfoResponse> getAll() {
    return repository.findByOrderById().stream()
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
    Admin admin = getAdmin(request.getId());
    admin.setPassword(passwordEncoder.encode(request.getNewPassword()));
    repository.save(admin);
  }

  public void deactivate(Long adminId) {
    if (securityService.getCurrentAdmin().getId().equals(adminId)) {
      throw new ForbiddenException("Can not deactivate yourself");
    }
    Admin admin = getAdmin(adminId);
    admin.setEnabled(false);
    repository.save(admin);
  }

  public void reactivate(Long adminId) {
    if (securityService.getCurrentAdmin().getId().equals(adminId)) {
      throw new ForbiddenException("Can not reactivate yourself");
    }
    Admin admin = getAdmin(adminId);
    admin.setEnabled(true);
    repository.save(admin);
  }

  private Admin getAdmin(Long id) {
    return repository.findById(id).orElseThrow(() -> new NotFoundException("Admin doesn't exists"));
  }

  public void create(CreateAdminRequest request) {
    if (repository.findByUsername(request.getUsername()).isPresent()) {
      throw new ConflictException(
          "Admin with username %s already exist".formatted(request.getUsername()));
    }
    repository.save(
        Admin.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .enabled(true)
            .build());
  }
}
