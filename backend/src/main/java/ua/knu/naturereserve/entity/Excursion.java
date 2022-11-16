package ua.knu.naturereserve.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "excursion")
public class Excursion {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne(targetEntity = Operator.class)
  @JoinColumn(name = "operator_id", nullable = false)
  private Operator operator;

  @ManyToOne(targetEntity = ExcursionTemplate.class)
  @JoinColumn(name = "excursion_template_id", nullable = false)
  private ExcursionTemplate excursionTemplate;

  @Column(name = "time")
  private LocalDateTime time;

  @ManyToMany(targetEntity = Client.class)
  private List<Client> clients;
}
