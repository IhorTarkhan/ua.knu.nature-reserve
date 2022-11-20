package ua.knu.naturereserve.dto.request.client;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequest {
  private Long excursionId;
  private String firstName;
  private String lastName;
  private String email;
  private String phone;
}
