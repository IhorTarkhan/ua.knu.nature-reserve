package ua.knu.naturereserve.dto.request.operator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OperatorPlaneExcursionRequest {
  private LocalDateTime time;
  private Long excursionTemplateId;
}
