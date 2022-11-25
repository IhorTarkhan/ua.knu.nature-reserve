package ua.knu.naturereserve.dto.response.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatisticsResponse {
  private LocalDate day;
  private List<AnimalResponse> animals;
  private List<ExcursionResponse> excursions;

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class AnimalResponse {
    private String nickname;
    private BigDecimal keeping;
    private Map<String, BigDecimal> illnessKeeping;
  }

  @Data
  @Builder
  @NoArgsConstructor
  @AllArgsConstructor
  public static class ExcursionResponse {
    private LocalTime time;
    private String title;
    private Integer visitors;
  }
}
