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
@Table(name = "client")
public class Client {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "first_name", nullable = false)
  private String firstName;

  @Column(name = "last_name", nullable = false)
  private String lastName;

  @Column(name = "phone", nullable = false)
  private String phone;

  @Column(name = "email", nullable = false)
  private String email;

  @ManyToMany(targetEntity = Excursion.class)
  private List<Excursion> excursions = new ArrayList<>();
}
