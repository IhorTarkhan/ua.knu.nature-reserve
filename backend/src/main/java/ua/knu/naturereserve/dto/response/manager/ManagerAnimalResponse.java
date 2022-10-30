package ua.knu.naturereserve.dto.response.manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerAnimalResponse {
  private Long id;
  private String nickname;
  private String lookup;
  private String behavioral;
  private boolean isAlive;
  private boolean isHealthy;
}
