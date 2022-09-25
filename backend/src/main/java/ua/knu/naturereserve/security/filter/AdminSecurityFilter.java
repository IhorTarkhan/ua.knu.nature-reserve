package ua.knu.naturereserve.security.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.repository.AdminRepository;
import ua.knu.naturereserve.security.JwtTokenProvider;

@Service
public class AdminSecurityFilter extends AbstractSecurityFilter {
  public AdminSecurityFilter(
      @Autowired AdminRepository repository, @Autowired JwtTokenProvider jwtTokenProvider) {
    super(repository, jwtTokenProvider, "Authorization-Admin");
  }
}
