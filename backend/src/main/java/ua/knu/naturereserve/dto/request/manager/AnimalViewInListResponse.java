package ua.knu.naturereserve.dto.request.manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnimalViewInListResponse {
  private Long id;
  private String nickname;
  private String lookup;
  private String behavioral;
  private boolean isMigration;
  private boolean isAlive;
}
