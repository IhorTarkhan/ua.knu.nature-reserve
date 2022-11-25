package ua.knu.naturereserve.controller.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.naturereserve.service.admin.AdminStatisticsService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/admin/statistics")
public class AdminStatisticsController {
  private final AdminStatisticsService service;

  @GetMapping("/{startDate}/{endDate}")
  public List<?> getStatistics(
      @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
      @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
    return service.getStatistics(startDate, endDate);
  }
}
