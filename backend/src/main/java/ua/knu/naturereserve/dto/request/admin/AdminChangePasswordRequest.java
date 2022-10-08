package ua.knu.naturereserve.dto.request.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminChangePasswordRequest {
  private Long id;
  private String newPassword;
}
