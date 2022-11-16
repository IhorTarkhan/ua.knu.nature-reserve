package ua.knu.naturereserve.entity;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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

  @OneToMany(
      targetEntity = AnimalsInExcursionTemplate.class,
      fetch = FetchType.EAGER,
      mappedBy = "excursionTemplate")
  private List<AnimalsInExcursionTemplate> animalsInExcursionTemplateList;

  @OneToMany(mappedBy = "excursionTemplate")
  private List<Excursion> excursions = new ArrayList<>();

  public List<Animal> getAnimals() {
    return animalsInExcursionTemplateList.stream()
        .map(AnimalsInExcursionTemplate::getAnimal)
        .toList();
  }
}
