package ua.knu.naturereserve.service.client;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.naturereserve.dto.request.client.RegistrationRequest;
import ua.knu.naturereserve.entity.*;
import ua.knu.naturereserve.repository.ClientRepository;
import ua.knu.naturereserve.repository.ExcursionRepository;

import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClientRegistrationService {
  private final ClientRepository clientRepository;
  private final ExcursionRepository excursionRepository;
  private final JavaMailSender javaMailSender;

  @SneakyThrows
  @Transactional
  public void registration(RegistrationRequest request) {
    var client =
        clientRepository
            .findByEmail(request.getEmail())
            .orElseGet(
                () ->
                    clientRepository.save(
                        Client.builder()
                            .firstName(request.getFirstName())
                            .lastName(request.getLastName())
                            .email(request.getEmail())
                            .phone(request.getPhone())
                            .build()));
    Excursion excursion = excursionRepository.findById(request.getExcursionId()).orElseThrow();
    if (client.getExcursions() == null) {
      client.setExcursions(new ArrayList<>());
    }
    client.getExcursions().add(excursion);

    log.info("start send email");
    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
    helper.setTo(request.getEmail());
    helper.setSubject("Lorem Ipsum nature-reserve");
    helper.setText(getHtml(excursion), true);
    javaMailSender.send(mimeMessage);
    log.info("finish send email");
  }

  private String getHtml(Excursion excursion) {
    ExcursionTemplate excursionTemplate = excursion.getExcursionTemplate();
    Operator operator = excursion.getOperator();
    return """
           <table
             style="
               border: 1px solid black;
               background: #147481;
               text-align: center;
               border-radius: 10%%;
               color: aliceblue;
               padding: 10px;
             "
           >
             <tr>
               <td><h1>%s</h1></td>
             </tr>
             <tr>
               <td><h2>Animals:</h2></td>
             </tr>
             <tr>
               <td>%s</td>
             </tr>
             <tr>
               <td>
                 <br />
                 <h2>Price: %s$</h2>
               </td>
             </tr>
             <tr>
               <td style="font-size: x-large">Operator: <b>%s</b></td>
             </tr>
             <tr>
               <td>%s</td>
             </tr>
           </table>
           """
        .formatted(
            excursionTemplate.getTitle(),
            excursionTemplate.getAnimals().stream()
                .map(Animal::getNickname)
                .collect(Collectors.joining(", ")),
            excursionTemplate.getPrice(),
            operator.getUsername(),
            getString(excursion.getTime()));
  }

  private String getString(LocalDateTime time) {
    return "%d.%d.%d %d:%s"
        .formatted(
            time.getDayOfMonth(),
            time.getMonth().getValue(),
            time.getYear(),
            time.getHour(),
            time.getMinute() < 10 ? "0" + time.getMinute() : time.getMinute());
  }
}
