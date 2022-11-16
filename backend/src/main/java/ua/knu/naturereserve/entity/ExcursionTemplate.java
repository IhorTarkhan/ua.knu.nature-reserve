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

  @ManyToMany(targetEntity = Animal.class, fetch = FetchType.EAGER)
  private List<Animal> animals;

  @OneToMany(mappedBy = "excursionTemplate")
  private List<Excursion> excursions = new ArrayList<>();
}
