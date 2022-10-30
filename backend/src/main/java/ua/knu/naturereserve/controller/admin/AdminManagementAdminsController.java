package ua.knu.naturereserve.controller.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.knu.naturereserve.dto.request.admin.AdminChangePasswordRequest;
import ua.knu.naturereserve.dto.request.admin.CreateAdminRequest;
import ua.knu.naturereserve.dto.response.admin.CurrentAuthorisationInfoResponse;
import ua.knu.naturereserve.service.admin.AdminManagementAdminsService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/admin/admins")
public class AdminManagementAdminsController {
  private final AdminManagementAdminsService service;

  @GetMapping("/")
  public List<CurrentAuthorisationInfoResponse> getAll() {
    return service.getAll();
  }

  @PutMapping("/change-password")
  public void changePassword(@RequestBody AdminChangePasswordRequest request) {
    service.changePassword(request);
  }

  @PutMapping("/deactivate/{adminId}")
  public void deactivate(@PathVariable Long adminId) {
    service.deactivate(adminId);
  }

  @PutMapping("/reactivate/{adminId}")
  public void reactivate(@PathVariable Long adminId) {
    service.reactivate(adminId);
  }

  @PostMapping("/")
  public void create(@RequestBody CreateAdminRequest request) {
    service.create(request);
  }
}
