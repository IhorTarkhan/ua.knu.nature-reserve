package ua.knu.naturereserve.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDate;

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
  private LocalDate start;

  @Column(name = "ended")
  private LocalDate end;

  @Column(name = "description", nullable = false)
  private String description;

  @Column(name = "keeping", nullable = false)
  private BigDecimal keeping;
}
