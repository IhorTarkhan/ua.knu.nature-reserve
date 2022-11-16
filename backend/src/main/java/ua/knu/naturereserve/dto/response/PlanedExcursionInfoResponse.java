package ua.knu.naturereserve.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanedExcursionInfoResponse {
  private Long id;
  private String operatorNickname;
  private LocalDateTime time;
}
