package ua.knu.naturereserve.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "animal")
public class Animal {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "nickname", nullable = false)
  private String nickname;

  @Column(name = "lookup", nullable = false)
  private String lookup;

  @Column(name = "behavioral", nullable = false)
  private String behavioral;

  @Column(name = "is_migration", nullable = false)
  private boolean isMigration;

  @Builder.Default
  @Column(name = "is_alive", nullable = false)
  private boolean isAlive = true;

  @OneToMany(fetch = FetchType.EAGER, mappedBy = "animal", cascade = CascadeType.ALL)
  private List<AnimalIllness> illnesses = new ArrayList<>();
}
