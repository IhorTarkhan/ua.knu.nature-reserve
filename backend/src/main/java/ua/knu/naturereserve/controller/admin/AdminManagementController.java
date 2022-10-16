package ua.knu.naturereserve.controller.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.knu.naturereserve.dto.request.admin.AdminChangePasswordRequest;
import ua.knu.naturereserve.dto.request.admin.CreateAdminRequest;
import ua.knu.naturereserve.dto.response.admin.AdminInfoResponse;
import ua.knu.naturereserve.service.admin.AdminManagementService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/admin/management")
public class AdminManagementController {
  private final AdminManagementService service;

  @GetMapping("/")
  public List<AdminInfoResponse> getAll() {
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
