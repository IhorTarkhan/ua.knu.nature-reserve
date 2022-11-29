package ua.knu.naturereserve.dto.request.manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerSickAnimalRequest {
  private Long id;
  private LocalDate date;
  private String description;
  private BigDecimal price;
}
