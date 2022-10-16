package ua.knu.naturereserve.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "animal_illness")
public class AnimalIllness {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "animal_id", nullable = false)
  private Animal animal;

  @Column(name = "description", nullable = false)
  private String description;
}
