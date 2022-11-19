package ua.knu.naturereserve.dto.request.operator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OperatorCreateExcursionTemplateRequest {
  private String title;
  private BigDecimal price;
  private List<Long> animalIds;
}
