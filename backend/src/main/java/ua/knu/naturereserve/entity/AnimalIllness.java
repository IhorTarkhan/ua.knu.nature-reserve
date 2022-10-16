package ua.knu.naturereserve.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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

  @ManyToOne(targetEntity = Animal.class)
  @JoinColumn(name = "animal_id", nullable = false)
  private Animal animal;

  @Column(name = "started", nullable = false)
  private LocalDateTime start;

  @Column(name = "ended")
  private LocalDateTime end;

  @Column(name = "description", nullable = false)
  private String description;
}
