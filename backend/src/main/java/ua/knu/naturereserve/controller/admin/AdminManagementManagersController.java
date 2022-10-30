package ua.knu.naturereserve.controller.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.naturereserve.dto.request.admin.AdminChangePasswordRequest;
import ua.knu.naturereserve.dto.request.admin.CreateAdminRequest;
import ua.knu.naturereserve.dto.response.admin.CurrentAuthorisationInfoResponse;
import ua.knu.naturereserve.service.admin.AdminManagementManagersService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/admin/managers")
public class AdminManagementManagersController {
  private final AdminManagementManagersService service;

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
