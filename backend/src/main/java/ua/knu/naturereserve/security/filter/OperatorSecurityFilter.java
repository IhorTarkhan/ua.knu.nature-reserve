package ua.knu.naturereserve.security.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.repository.OperatorRepository;
import ua.knu.naturereserve.security.JwtTokenProvider;

@Service
public class OperatorSecurityFilter extends AbstractSecurityFilter {
  public OperatorSecurityFilter(
      @Autowired OperatorRepository repository, @Autowired JwtTokenProvider jwtTokenProvider) {
    super(repository, jwtTokenProvider, "Authorization-Operator");
  }
}
