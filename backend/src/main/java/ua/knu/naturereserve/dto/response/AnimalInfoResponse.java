package ua.knu.naturereserve.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnimalInfoResponse {
  private Long id;
  private String nickname;
  private String lookup;
  private String behavioral;
  private boolean isAlive;
  private boolean isHealthy;
  private BigDecimal keeping;
  private Map<String, BigDecimal> illnessKeeping;
}
