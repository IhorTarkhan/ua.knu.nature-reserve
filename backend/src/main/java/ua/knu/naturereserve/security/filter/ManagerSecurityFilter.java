package ua.knu.naturereserve.security.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.repository.ManagerRepository;
import ua.knu.naturereserve.security.JwtTokenProvider;

@Service
public class ManagerSecurityFilter extends AbstractSecurityFilter {
  public ManagerSecurityFilter(
      @Autowired ManagerRepository repository, @Autowired JwtTokenProvider jwtTokenProvider) {
    super(repository, jwtTokenProvider, "Authorization-Manager");
  }
}
