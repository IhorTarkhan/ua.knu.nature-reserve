package ua.knu.naturereserve.dto.request.manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerCreateAnimalRequest {
  private String nickname;
  private String lookup;
  private String behavioral;
}
