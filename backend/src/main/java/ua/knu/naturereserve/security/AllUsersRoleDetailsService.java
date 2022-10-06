package ua.knu.naturereserve.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ua.knu.naturereserve.exception.NotFoundException;
import ua.knu.naturereserve.repository.AdminRepository;
import ua.knu.naturereserve.repository.ManagerRepository;
import ua.knu.naturereserve.repository.OperatorRepository;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AllUsersRoleDetailsService implements UserDetailsService {
  private final AdminRepository adminRepository;
  private final ManagerRepository managerRepository;
  private final OperatorRepository operatorRepository;

  @Override
  public UserDetails loadUserByUsername(String username) {
    Optional<? extends UserDetails> admin = adminRepository.findByUsername(username);
    if (admin.isPresent()) {
      return admin.get();
    }
    Optional<? extends UserDetails> manager = managerRepository.findByUsername(username);
    if (manager.isPresent()) {
      return manager.get();
    }
    Optional<? extends UserDetails> operator = operatorRepository.findByUsername(username);
    if (operator.isPresent()) {
      return operator.get();
    }
    throw new NotFoundException("No user with username " + username);
  }
}
