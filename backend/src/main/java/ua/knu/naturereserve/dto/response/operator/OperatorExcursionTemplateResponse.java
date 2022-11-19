package ua.knu.naturereserve.dto.response.operator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.knu.naturereserve.dto.response.AnimalInfoResponse;
import ua.knu.naturereserve.dto.response.PlanedExcursionInfoResponse;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OperatorExcursionTemplateResponse {
  private Long id;
  private String title;
  private BigDecimal price;
  private List<AnimalInfoResponse> animals;
  private List<PlanedExcursionInfoResponse> excursions;
}
