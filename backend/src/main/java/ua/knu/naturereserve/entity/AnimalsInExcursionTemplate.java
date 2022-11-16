package ua.knu.naturereserve.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(
    name = "animals_in_excursion_template",
    uniqueConstraints =
        @UniqueConstraint(columnNames = {"animal_id", "excursion_template_id", "orders"}))
public class AnimalsInExcursionTemplate {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne(targetEntity = Animal.class)
  @JoinColumn(name = "animal_id", nullable = false)
  private Animal animal;

  @ManyToOne(targetEntity = ExcursionTemplate.class)
  @JoinColumn(name = "excursion_template_id", nullable = false)
  private ExcursionTemplate excursionTemplate;

  @Column(name = "orders")
  private Long order;
}
