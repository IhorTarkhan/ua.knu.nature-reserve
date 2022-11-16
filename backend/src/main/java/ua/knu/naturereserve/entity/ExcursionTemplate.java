package ua.knu.naturereserve.entity;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "excursion_template")
public class ExcursionTemplate {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "price")
  private BigDecimal price;

  @OneToMany(mappedBy = "excursionTemplate", fetch = FetchType.EAGER)
  private Set<AnimalsInExcursionTemplate> animalsInExcursionTemplateList = new HashSet<>();

  @OneToMany(mappedBy = "excursionTemplate", fetch = FetchType.EAGER)
  private Set<Excursion> excursions = new HashSet<>();

  public List<Animal> getAnimals() {
    return animalsInExcursionTemplateList.stream()
        .sorted(Comparator.comparing(AnimalsInExcursionTemplate::getOrder))
        .map(AnimalsInExcursionTemplate::getAnimal)
        .toList();
  }

  public List<Excursion> getExcursions() {
    return excursions.stream().sorted(Comparator.comparing(Excursion::getTime)).toList();
  }
}
