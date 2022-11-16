package ua.knu.naturereserve.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.dto.response.PlanedExcursionInfoResponse;
import ua.knu.naturereserve.entity.Excursion;

@Service
@RequiredArgsConstructor
public class ExcursionMapper {
  public PlanedExcursionInfoResponse toDtoResponse(Excursion excursion) {
    return PlanedExcursionInfoResponse.builder()
        .id(excursion.getId())
        .operatorNickname(excursion.getOperator().getUsername())
        .time(excursion.getTime())
        .build();
  }
}
