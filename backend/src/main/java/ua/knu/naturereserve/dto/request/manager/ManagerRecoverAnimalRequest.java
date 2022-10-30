package ua.knu.naturereserve.dto.request.manager;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ManagerRecoverAnimalRequest {
  private Long id;
  private LocalDate date;
}
