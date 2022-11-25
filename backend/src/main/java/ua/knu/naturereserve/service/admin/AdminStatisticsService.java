package ua.knu.naturereserve.service.admin;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.naturereserve.dto.response.admin.AdminStatisticsResponse;
import ua.knu.naturereserve.dto.response.admin.AdminStatisticsResponse.AnimalResponse;
import ua.knu.naturereserve.dto.response.admin.AdminStatisticsResponse.ExcursionResponse;
import ua.knu.naturereserve.entity.Animal;
import ua.knu.naturereserve.entity.AnimalIllness;
import ua.knu.naturereserve.entity.Excursion;
import ua.knu.naturereserve.repository.AnimalRepository;
import ua.knu.naturereserve.repository.ExcursionRepository;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class AdminStatisticsService {
  private final AnimalRepository animalRepository;
  private final ExcursionRepository excursionRepository;

  @Transactional
  public List<AdminStatisticsResponse> getStatistics(LocalDate startDate, LocalDate endDate) {
    List<Animal> animals = animalRepository.findAll();
    List<Excursion> excursions = excursionRepository.findAll();
    return Stream.iterate(startDate, date -> date.plusDays(1))
        .limit(ChronoUnit.DAYS.between(startDate, endDate))
        .map(
            day ->
                AdminStatisticsResponse.builder()
                    .day(day)
                    .animals(getAnimals(animals, day))
                    .exceptions(getExcursions(excursions, day))
                    .build())
        .toList();
  }

  private List<AnimalResponse> getAnimals(List<Animal> animals, LocalDate day) {
    return animals.stream()
        .map(
            a ->
                AnimalResponse.builder()
                    .nickname(a.getNickname())
                    .keeping(a.getKeeping())
                    .illnessKeeping(
                        a.getIllnesses().stream()
                            .filter(
                                i -> {
                                  LocalDate start = i.getStart();
                                  LocalDate end = i.getEnd();
                                  return !start.isAfter(day) && (end == null || !end.isBefore(day));
                                })
                            .collect(
                                Collectors.toMap(
                                    AnimalIllness::getDescription, AnimalIllness::getKeeping)))
                    .build())
        .toList();
  }

  private List<ExcursionResponse> getExcursions(List<Excursion> excursions, LocalDate day) {
    return excursions.stream()
        .filter(e -> e.getTime().toLocalDate().isEqual(day))
        .map(
            e ->
                ExcursionResponse.builder()
                    .time(e.getTime().toLocalTime())
                    .title(e.getExcursionTemplate().getTitle())
                    .visitors(e.getClients().size())
                    .build())
        .toList();
  }
}
