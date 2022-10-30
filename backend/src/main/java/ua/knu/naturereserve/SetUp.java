package ua.knu.naturereserve;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ua.knu.naturereserve.entity.Admin;
import ua.knu.naturereserve.entity.Animal;
import ua.knu.naturereserve.entity.AnimalIllness;
import ua.knu.naturereserve.entity.Manager;
import ua.knu.naturereserve.entity.Operator;
import ua.knu.naturereserve.repository.AdminRepository;
import ua.knu.naturereserve.repository.AnimalIllnessRepository;
import ua.knu.naturereserve.repository.AnimalRepository;
import ua.knu.naturereserve.repository.ManagerRepository;
import ua.knu.naturereserve.repository.OperatorRepository;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SetUp {
  private final AdminRepository adminRepository;
  private final ManagerRepository managerRepository;
  private final OperatorRepository operatorRepository;
  private final AnimalRepository animalRepository;
  private final AnimalIllnessRepository animalIllnessRepository;
  private final PasswordEncoder passwordEncoder;

  @PostConstruct
  public void setUp() {
    if (adminRepository.count() > 0) {
      return;
    }
    String encodePassword = passwordEncoder.encode("password");
    adminRepository.save(
        Admin.builder().username("my_admin").password(encodePassword).enabled(true).build());
    managerRepository.save(
        Manager.builder().username("my_manager").password(encodePassword).enabled(true).build());
    operatorRepository.save(
        Operator.builder().username("my_operator").password(encodePassword).enabled(true).build());
    List<Animal> animals =
        animalRepository.saveAll(
            List.of(
                Animal.builder().nickname("snow").lookup("white").behavioral("lazy").build(),
                Animal.builder().nickname("sun").lookup("yellow").behavioral("hot").build(),
                Animal.builder()
                    .nickname("avocado")
                    .lookup("green")
                    .behavioral("delicious")
                    .isAlive(false)
                    .build()));
    animalIllnessRepository.save(
        AnimalIllness.builder()
            .animal(animals.get(0))
            .description("chickenpox")
            .start(LocalDate.now())
            .build());
  }
}
